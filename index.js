#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { FINGERPRINTS, SALES_SIGNALS } from "./fingerprints.js";

const WAPPALYZER_KEY = process.env.WAPPALYZER_API_KEY || null;
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// ─── Scraper ──────────────────────────────────────────────────────────────────

async function fetchPage(domain) {
  const url = domain.startsWith("http") ? domain : `https://${domain}`;
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
    redirect: "follow",
    signal: AbortSignal.timeout(12000),
  });
  const html = await res.text();
  const headers = Object.fromEntries(res.headers.entries());
  return { html, headers, finalUrl: res.url };
}

function runFingerprints(html, headers) {
  const haystack = html + JSON.stringify(headers);
  const found = [];

  for (const fp of FINGERPRINTS) {
    const matched = fp.patterns.some((p) => p.test(haystack));
    if (matched) {
      found.push({
        name: fp.name,
        category: fp.category,
        confidence: fp.confidence,
        source: "scraped",
      });
    }
  }

  // Deduplicate by name, keep highest confidence
  const map = new Map();
  for (const t of found) {
    if (!map.has(t.name) || map.get(t.name).confidence < t.confidence) {
      map.set(t.name, t);
    }
  }

  return [...map.values()].sort((a, b) => b.confidence - a.confidence);
}

// ─── Wappalyzer API ───────────────────────────────────────────────────────────

async function wappalyzerLookup(domain) {
  const url = `https://api.wappalyzer.com/v2/lookup/?urls=https://${domain}&sets=all`;
  const res = await fetch(url, {
    headers: { "x-api-key": WAPPALYZER_KEY },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Wappalyzer API error: ${res.status}`);
  const data = await res.json();
  const entry = Array.isArray(data) ? data[0] : data;
  return (entry?.technologies || []).map((t) => ({
    name: t.name,
    category: t.categories?.[0]?.name || "Uncategorized",
    confidence: 0.95,
    source: "wappalyzer",
    versions: t.versions || [],
  }));
}

// ─── Core lookup logic ────────────────────────────────────────────────────────

async function lookupDomain(domain) {
  const cleanDomain = domain.replace(/^https?:\/\//, "").replace(/\/$/, "").toLowerCase();
  const result = {
    domain: cleanDomain,
    technologies: [],
    source: "scraped",
    error: null,
    scraped_at: new Date().toISOString(),
  };

  // Try Wappalyzer first if key is set
  if (WAPPALYZER_KEY) {
    try {
      result.technologies = await wappalyzerLookup(cleanDomain);
      result.source = "wappalyzer";
      return result;
    } catch (e) {
      result.error = `Wappalyzer failed (${e.message}), falling back to scraper`;
    }
  }

  // Scrape fallback
  try {
    const { html, headers } = await fetchPage(cleanDomain);
    result.technologies = runFingerprints(html, headers);
  } catch (e) {
    result.error = (result.error ? result.error + " | " : "") + `Scrape failed: ${e.message}`;
  }

  return result;
}

function groupByCategory(technologies) {
  const groups = {};
  for (const t of technologies) {
    if (!groups[t.category]) groups[t.category] = [];
    groups[t.category].push(t.name);
  }
  return groups;
}

function buildSalesSignals(technologies) {
  const names = new Set(technologies.map((t) => t.name));

  const budgetTier = (() => {
    if (SALES_SIGNALS.budget.enterprise.some((t) => names.has(t))) return "Enterprise";
    if (SALES_SIGNALS.budget.midmarket.some((t) => names.has(t))) return "Mid-Market";
    if (SALES_SIGNALS.budget.smb.some((t) => names.has(t))) return "SMB";
    return "Unknown";
  })();

  const maturity = (() => {
    if (SALES_SIGNALS.maturity.sophisticated.some((t) => names.has(t))) return "Sophisticated";
    if (SALES_SIGNALS.maturity.growing.some((t) => names.has(t))) return "Growing";
    if (SALES_SIGNALS.maturity.early.some((t) => names.has(t))) return "Early-stage";
    return "Unknown";
  })();

  const crm = SALES_SIGNALS.crm.filter((t) => names.has(t));
  const marketingAuto = SALES_SIGNALS.marketing_automation.filter((t) => names.has(t));
  const hasABM = SALES_SIGNALS.has_abm.some((t) => names.has(t));
  const hasScheduling = SALES_SIGNALS.has_scheduling.some((t) => names.has(t));
  const hasOnboarding = SALES_SIGNALS.has_onboarding.filter((t) => names.has(t));
  const hasRevenueIntel = SALES_SIGNALS.has_revenue_intel.filter((t) => names.has(t));
  const ecommercePlatform = SALES_SIGNALS.ecommerce_platform.filter((t) => names.has(t));

  const hooks = [];
  if (crm.length) hooks.push(`Uses ${crm.join(", ")} as CRM — reference their workflow in outreach`);
  if (marketingAuto.length) hooks.push(`Running ${marketingAuto.join(", ")} for marketing — they understand automation`);
  if (hasABM) hooks.push("Has ABM tooling (6sense/Demandbase) — B2B with a defined ICP, likely mid-market or enterprise");
  if (hasScheduling) hooks.push("Has scheduling (Calendly/Chili Piper) — meeting-ready sales process, go straight to booking");
  if (hasOnboarding.length) hooks.push(`Using ${hasOnboarding.join(", ")} for onboarding — actively investing in product-led growth`);
  if (hasRevenueIntel.length) hooks.push(`Using ${hasRevenueIntel.join(", ")} for revenue intelligence — sophisticated sales org`);
  if (ecommercePlatform.length) hooks.push(`E-commerce on ${ecommercePlatform.join(", ")} — lead with revenue/conversion angle`);

  const analytics = technologies.filter((t) => t.category === "Analytics").map((t) => t.name);
  if (analytics.length > 2) hooks.push(`Heavy analytics stack (${analytics.join(", ")}) — data-driven team, lead with metrics`);

  const authStack = technologies.filter((t) => t.category === "Auth / Identity").map((t) => t.name);
  if (authStack.length) hooks.push(`Auth via ${authStack.join(", ")} — engineering team capable of integration work`);

  return { budgetTier, maturity, crm, marketingAuto, hasABM, hasScheduling, hasOnboarding, hasRevenueIntel, ecommercePlatform, personalizationHooks: hooks };
}

function formatStackOutput(result) {
  if (!result.technologies.length && result.error) {
    return `❌ ${result.domain}: ${result.error}`;
  }

  const groups = groupByCategory(result.technologies);
  const lines = [`🔍 Tech Stack: ${result.domain} (${result.source})`];
  if (result.error) lines.push(`⚠️  Note: ${result.error}`);

  for (const [category, techs] of Object.entries(groups)) {
    lines.push(`\n  ${category}`);
    lines.push(`    ${techs.join(", ")}`);
  }

  if (!result.technologies.length) lines.push("  No technologies detected.");

  lines.push(`\n  Total detected: ${result.technologies.length} technologies`);
  return lines.join("\n");
}

// ─── Server ───────────────────────────────────────────────────────────────────

const server = new McpServer({
  name: "mcp-techstack",
  version: "1.0.0",
  description:
    "Company tech stack lookup for sales intelligence. Detects 60+ technologies via scraping (free) or 4,500+ via Wappalyzer API (bring your own key).",
});

// ── Tool: lookup_tech_stack ───────────────────────────────────────────────────

server.tool(
  "lookup_tech_stack",
  "Detect the technologies a company uses given their domain. Returns tools grouped by category: CMS, analytics, CRM, payments, frontend framework, etc. Works with no API key via scraping; set WAPPALYZER_API_KEY for 4,500+ technology coverage.",
  {
    domain: z
      .string()
      .describe("Company domain to look up, e.g. 'stripe.com' or 'https://notion.so'"),
  },
  async ({ domain }) => {
    const result = await lookupDomain(domain);
    return { content: [{ type: "text", text: formatStackOutput(result) }] };
  }
);

// ── Tool: batch_lookup ────────────────────────────────────────────────────────

server.tool(
  "batch_lookup",
  "Look up tech stacks for multiple companies in one call. Returns a grouped summary per domain. Ideal for pre-call research on a list of accounts.",
  {
    domains: z
      .array(z.string())
      .min(1)
      .max(10)
      .describe("List of domains to look up (max 10 per call)."),
  },
  async ({ domains }) => {
    const results = await Promise.allSettled(domains.map(lookupDomain));
    const outputs = results.map((r, i) => {
      if (r.status === "rejected") {
        return `❌ ${domains[i]}: ${r.reason?.message || "Unknown error"}`;
      }
      return formatStackOutput(r.value);
    });

    return { content: [{ type: "text", text: outputs.join("\n\n─────────────────────────────\n\n") }] };
  }
);

// ── Tool: get_sales_signals ───────────────────────────────────────────────────

server.tool(
  "get_sales_signals",
  "Go beyond raw tech detection: returns actionable sales intelligence for a domain. Infers budget tier (SMB / Mid-Market / Enterprise), tech maturity, CRM in use, marketing stack, ABM presence, and personalization hooks to use in outreach.",
  {
    domain: z.string().describe("Company domain to analyze."),
  },
  async ({ domain }) => {
    const result = await lookupDomain(domain);

    if (!result.technologies.length) {
      const msg = result.error
        ? `Could not retrieve tech stack for ${domain}: ${result.error}`
        : `No technologies detected for ${domain}. The site may block scrapers or have minimal public JS.`;
      return { content: [{ type: "text", text: msg }] };
    }

    const signals = buildSalesSignals(result.technologies);
    const groups = groupByCategory(result.technologies);

    const lines = [
      `📊 Sales Intelligence: ${result.domain}`,
      ``,
      `  Budget Tier:    ${signals.budgetTier}`,
      `  Tech Maturity:  ${signals.maturity}`,
      `  CRM:            ${signals.crm.length ? signals.crm.join(", ") : "Not detected"}`,
      `  Mktg Auto:      ${signals.marketingAuto.length ? signals.marketingAuto.join(", ") : "Not detected"}`,
      `  E-commerce:     ${signals.ecommercePlatform.length ? signals.ecommercePlatform.join(", ") : "No"}`,
      `  ABM Tooling:    ${signals.hasABM ? "Yes" : "No"}`,
      `  Scheduling:     ${signals.hasScheduling ? "Yes" : "No"}`,
      `  Onboarding:     ${signals.hasOnboarding.length ? signals.hasOnboarding.join(", ") : "No"}`,
      `  Revenue Intel:  ${signals.hasRevenueIntel.length ? signals.hasRevenueIntel.join(", ") : "No"}`,
      ``,
    ];

    if (signals.personalizationHooks.length) {
      lines.push(`  💬 Personalization hooks:`);
      for (const h of signals.personalizationHooks) {
        lines.push(`    · ${h}`);
      }
      lines.push("");
    }

    lines.push(`  Full stack (${result.technologies.length} detected):`);
    for (const [category, techs] of Object.entries(groups)) {
      lines.push(`    ${category}: ${techs.join(", ")}`);
    }

    lines.push(`\n  Source: ${result.source}${result.error ? ` | ⚠️ ${result.error}` : ""}`);

    return { content: [{ type: "text", text: lines.join("\n") }] };
  }
);

// ─── Start ────────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
