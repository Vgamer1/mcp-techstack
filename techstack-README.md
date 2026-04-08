# mcp-techstack

**Company tech stack lookup for sales agents and outreach tools.**

Give your AI agent the ability to look up any company's technology stack from a domain — and translate that raw data into actionable sales intelligence.

---

## Why this exists

Sales agents calling into accounts cold need fast answers:
- *What CRM are they on?* (determines workflow, budget, and who to target)
- *Are they enterprise or SMB?* (determines tone, deal size, stakeholders)
- *What's their analytics setup?* (signals data sophistication)
- *How do I personalize my opener?* (reference their actual stack)

This MCP server answers all of those in a single tool call.

---

## Tools

| Tool | What it does |
|---|---|
| `lookup_tech_stack` | Detect all technologies on a domain, grouped by category |
| `batch_lookup` | Lookup up to 10 domains in a single call |
| `get_sales_signals` | Returns budget tier, tech maturity, CRM, marketing stack, and personalization hooks |

---

## Setup

### No API key required (free mode)

Detects 60+ technologies via HTML scraping — CMS, analytics, CRM, payments, frontend frameworks, CDN, support tools, and more.

### With Wappalyzer API key (full mode)

Set `WAPPALYZER_API_KEY` to unlock 4,500+ technology detections, version numbers, and company metadata. [Get a key at wappalyzer.com](https://www.wappalyzer.com/api/) (free tier: 50 lookups/month).

---

### Claude Desktop configuration

```json
{
  "mcpServers": {
    "techstack": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-techstack/index.js"],
      "env": {
        "WAPPALYZER_API_KEY": "optional-your-key-here"
      }
    }
  }
}
```

---

## Example output

### `lookup_tech_stack("notion.so")`
```
🔍 Tech Stack: notion.so (scraped)

  Analytics
    Google Analytics 4, Segment, Amplitude

  Frontend Framework
    React, Next.js

  CRM / Marketing
    HubSpot

  Customer Support
    Intercom

  Payments
    Stripe

  CDN / Security
    Cloudflare

  Total detected: 7 technologies
```

### `get_sales_signals("notion.so")`
```
📊 Sales Intelligence: notion.so

  Budget Tier:   Mid-Market
  Tech Maturity: Sophisticated
  CRM:           HubSpot
  Mktg Auto:     HubSpot
  ABM Tooling:   No
  Scheduling:    No

  💬 Personalization hooks:
    · Uses HubSpot as CRM — reference their workflow in outreach
    · Running HubSpot for marketing — they understand automation
    · Heavy analytics stack (Google Analytics 4, Segment, Amplitude) — data-driven team

  Full stack (7 detected):
    Analytics: Google Analytics 4, Segment, Amplitude
    Frontend Framework: React, Next.js
    ...
```

---

## Technology categories detected (free mode)

| Category | Examples |
|---|---|
| CMS | WordPress, Webflow, Shopify, Wix, Squarespace, Framer |
| Analytics | GA4, Segment, Mixpanel, Amplitude, Heap, PostHog, Hotjar |
| CRM / Marketing | HubSpot, Salesforce, Marketo, Pardot, Klaviyo, Mailchimp |
| Customer Support | Intercom, Zendesk, Drift, Crisp, Freshdesk |
| Payments | Stripe, Braintree, PayPal, Recurly, Chargebee |
| Frontend | React, Next.js, Vue, Nuxt, Angular, Svelte |
| Hosting / CDN | Vercel, Netlify, Cloudflare, Fastly, AWS |
| ABM / Intent | 6sense, Demandbase |
| Scheduling | Calendly, Chili Piper |
| A/B Testing | Optimizely, VWO, LaunchDarkly |
| Video | Wistia, Vimeo, Loom |

---

## Sales signal logic

`get_sales_signals` infers:

**Budget tier**
- Enterprise → Salesforce, Marketo, 6sense, Demandbase, Optimizely, Chili Piper
- Mid-Market → HubSpot, Intercom, Drift, Segment, Amplitude, Chargebee
- SMB → Mailchimp, ActiveCampaign, Wix, Squarespace, Calendly

**Tech maturity**
- Sophisticated → Segment, Heap, LaunchDarkly, 6sense, PostHog, Clearbit
- Growing → Mixpanel, Amplitude, Hotjar, Intercom, HubSpot
- Early-stage → Google UA, Mailchimp, Wix

---

## License

MIT
