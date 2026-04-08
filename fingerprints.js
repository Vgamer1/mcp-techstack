// fingerprints.js — 120+ technology patterns for mcp-techstack

export const FINGERPRINTS = [
  // ─── CMS ─────────────────────────────────────────────────────────────────
  { name: "WordPress",       category: "CMS",          confidence: 0.95, patterns: [/wp-content\//i, /wp-includes\//i] },
  { name: "Webflow",         category: "CMS",          confidence: 0.97, patterns: [/webflow\.com/i, /data-wf-/i] },
  { name: "Squarespace",     category: "CMS",          confidence: 0.97, patterns: [/squarespace\.com/i, /static\.squarespace\.com/i] },
  { name: "Wix",             category: "CMS",          confidence: 0.97, patterns: [/wixstatic\.com/i, /wix-warmup-data/i] },
  { name: "Ghost",           category: "CMS",          confidence: 0.90, patterns: [/ghost\.io/i, /content\/ghost\//i] },
  { name: "HubSpot CMS",     category: "CMS",          confidence: 0.93, patterns: [/hubspotusercontent\.com/i, /hs-scripts\.com/i] },
  { name: "Contentful",      category: "CMS",          confidence: 0.88, patterns: [/ctfassets\.net/i, /contentful\.com/i] },
  { name: "Framer",          category: "CMS",          confidence: 0.93, patterns: [/framerusercontent\.com/i] },
  { name: "Sanity",          category: "CMS",          confidence: 0.88, patterns: [/cdn\.sanity\.io/i] },
  { name: "Prismic",         category: "CMS",          confidence: 0.87, patterns: [/cdn2\.prismic\.io/i, /prismic\.io/i] },
  { name: "Storyblok",       category: "CMS",          confidence: 0.87, patterns: [/a\.storyblok\.com/i] },
  { name: "Drupal",          category: "CMS",          confidence: 0.90, patterns: [/drupal\.js/i, /sites\/default\/files/i] },
  { name: "Joomla",          category: "CMS",          confidence: 0.88, patterns: [/joomla/i, /\/media\/jui\//i] },
  { name: "Notion",          category: "Productivity", confidence: 0.88, patterns: [/notion-static\.com/i, /notion\.so\/embed/i] },

  // ─── E-commerce ──────────────────────────────────────────────────────────
  { name: "Shopify",         category: "E-commerce",   confidence: 0.98, patterns: [/cdn\.shopify\.com/i, /shopify\.com\/s\//i] },
  { name: "BigCommerce",     category: "E-commerce",   confidence: 0.95, patterns: [/bigcommerce\.com/i, /cdn11\.bigcommerce\.com/i] },
  { name: "WooCommerce",     category: "E-commerce",   confidence: 0.93, patterns: [/woocommerce/i, /wc-ajax/i] },
  { name: "Magento",         category: "E-commerce",   confidence: 0.90, patterns: [/mage\//i, /magento_version/i] },
  { name: "Salesforce Commerce", category: "E-commerce", confidence: 0.87, patterns: [/demandware/i, /commercecloud\.salesforce\.com/i] },
  { name: "Recharge",        category: "E-commerce",   confidence: 0.88, patterns: [/rechargepayments\.com/i, /rechargeapps\.com/i] },
  { name: "Gorgias",         category: "Customer Support", confidence: 0.88, patterns: [/config\.gorgias\.chat/i, /gorgias\.io/i] },
  { name: "Yotpo",           category: "E-commerce",   confidence: 0.88, patterns: [/staticw2\.yotpo\.com/i, /yotpo\.com/i] },
  { name: "Attentive",       category: "E-commerce",   confidence: 0.87, patterns: [/cdn\.attn\.tv/i, /attn\.tv/i] },

  // ─── Analytics ───────────────────────────────────────────────────────────
  { name: "Google Analytics 4",  category: "Analytics", confidence: 0.97, patterns: [/gtag\('config',\s*'G-/i, /googletagmanager\.com\/gtag/i] },
  { name: "Google Analytics UA", category: "Analytics", confidence: 0.90, patterns: [/UA-\d{6,}-\d/, /google-analytics\.com\/analytics\.js/i] },
  { name: "Google Tag Manager",  category: "Tag Manager", confidence: 0.97, patterns: [/googletagmanager\.com\/gtm\.js/i, /GTM-[A-Z0-9]+/] },
  { name: "Segment",             category: "Analytics", confidence: 0.95, patterns: [/cdn\.segment\.com/i, /segment\.io/i] },
  { name: "Mixpanel",            category: "Analytics", confidence: 0.95, patterns: [/cdn\.mxpnl\.com/i, /mixpanel\.init/i] },
  { name: "Heap",                category: "Analytics", confidence: 0.95, patterns: [/heapanalytics\.com/i, /heap\.load/i] },
  { name: "Amplitude",           category: "Analytics", confidence: 0.95, patterns: [/cdn\.amplitude\.com/i] },
  { name: "PostHog",             category: "Analytics", confidence: 0.93, patterns: [/posthog\.com/i, /posthog\.init/i] },
  { name: "Hotjar",              category: "Analytics", confidence: 0.95, patterns: [/static\.hotjar\.com/i, /hjid:/i] },
  { name: "FullStory",           category: "Analytics", confidence: 0.95, patterns: [/fullstory\.com/i, /_fs_namespace/i] },
  { name: "Plausible",           category: "Analytics", confidence: 0.93, patterns: [/plausible\.io\/js/i] },
  { name: "Fathom",              category: "Analytics", confidence: 0.90, patterns: [/cdn\.usefathom\.com/i] },
  { name: "Pendo",               category: "Analytics", confidence: 0.93, patterns: [/cdn\.pendo\.io/i, /pendo\.initialize/i] },
  { name: "Datadog RUM",         category: "Analytics", confidence: 0.90, patterns: [/datadoghq\.com\/datadog-rum/i, /DD_RUM/i] },
  { name: "New Relic",           category: "Analytics", confidence: 0.88, patterns: [/nr-data\.net/i, /NREUM/i] },
  { name: "Rudderstack",         category: "Analytics", confidence: 0.88, patterns: [/cdn\.rudderlabs\.com/i] },
  { name: "Mouseflow",           category: "Analytics", confidence: 0.88, patterns: [/mouseflow\.com/i] },
  { name: "Lucky Orange",        category: "Analytics", confidence: 0.88, patterns: [/luckyorange\.net/i] },

  // ─── CRM / Marketing Automation ──────────────────────────────────────────
  { name: "HubSpot",          category: "CRM / Marketing",     confidence: 0.95, patterns: [/hs-scripts\.com/i, /hubspot\.com/i, /hbspt\./i] },
  { name: "Salesforce",       category: "CRM",                 confidence: 0.90, patterns: [/salesforce\.com/i, /force\.com/i] },
  { name: "Marketo",          category: "Marketing Automation", confidence: 0.93, patterns: [/munchkin\.marketo\.net/i] },
  { name: "Pardot",           category: "Marketing Automation", confidence: 0.92, patterns: [/pi\.pardot\.com/i, /pardot\.com/i] },
  { name: "Klaviyo",          category: "Email Marketing",     confidence: 0.95, patterns: [/static\.klaviyo\.com/i, /klaviyo\.com/i] },
  { name: "Mailchimp",        category: "Email Marketing",     confidence: 0.93, patterns: [/chimpstatic\.com/i, /list-manage\.com/i] },
  { name: "ActiveCampaign",   category: "Email Marketing",     confidence: 0.93, patterns: [/activecampaign\.com/i, /trackcmp\.net/i] },
  { name: "Brevo",            category: "Email Marketing",     confidence: 0.88, patterns: [/sendinblue\.com/i, /sibautomation\.com/i] },
  { name: "ConvertKit",       category: "Email Marketing",     confidence: 0.90, patterns: [/ck\.convertkit\.com/i, /convertkit\.com/i] },
  { name: "Customer.io",      category: "Marketing Automation", confidence: 0.88, patterns: [/assets\.customer\.io/i] },
  { name: "Iterable",         category: "Marketing Automation", confidence: 0.87, patterns: [/js\.iterable\.com/i] },
  { name: "Drip",             category: "Email Marketing",     confidence: 0.88, patterns: [/js\.getdrip\.com/i] },

  // ─── Customer Support / Chat ─────────────────────────────────────────────
  { name: "Intercom",         category: "Customer Support", confidence: 0.97, patterns: [/widget\.intercom\.io/i, /intercomSettings/i] },
  { name: "Zendesk",          category: "Customer Support", confidence: 0.95, patterns: [/zendesk\.com/i, /zdassets\.com/i, /zopim\.com/i] },
  { name: "Drift",            category: "Live Chat",        confidence: 0.95, patterns: [/js\.driftt\.com/i, /driftt\.com/i] },
  { name: "Crisp",            category: "Live Chat",        confidence: 0.93, patterns: [/client\.crisp\.chat/i] },
  { name: "Freshdesk",        category: "Customer Support", confidence: 0.93, patterns: [/freshdesk\.com/i, /freshchat\.com/i] },
  { name: "Help Scout",       category: "Customer Support", confidence: 0.90, patterns: [/beacon-v2\.helpscout\.net/i] },
  { name: "Tidio",            category: "Live Chat",        confidence: 0.90, patterns: [/code\.tidio\.co/i] },
  { name: "Tawk.to",          category: "Live Chat",        confidence: 0.90, patterns: [/embed\.tawk\.to/i] },
  { name: "LiveChat",         category: "Live Chat",        confidence: 0.88, patterns: [/cdn\.livechatinc\.com/i] },
  { name: "Gladly",           category: "Customer Support", confidence: 0.85, patterns: [/cdn\.gladly\.com/i] },
  { name: "Kustomer",         category: "Customer Support", confidence: 0.85, patterns: [/cdn\.kustomer\.com/i] },
  { name: "Qualified",        category: "AI / Chatbot",     confidence: 0.87, patterns: [/js\.qualified\.com/i] },

  // ─── Payments ────────────────────────────────────────────────────────────
  { name: "Stripe",           category: "Payments", confidence: 0.97, patterns: [/js\.stripe\.com/i, /Stripe\(/i] },
  { name: "Braintree",        category: "Payments", confidence: 0.95, patterns: [/braintreegateway\.com/i] },
  { name: "PayPal",           category: "Payments", confidence: 0.93, patterns: [/paypal\.com\/sdk/i, /paypalobjects\.com/i] },
  { name: "Recurly",          category: "Payments", confidence: 0.90, patterns: [/js\.recurly\.com/i] },
  { name: "Chargebee",        category: "Payments", confidence: 0.90, patterns: [/js\.chargebee\.com/i] },
  { name: "Paddle",           category: "Payments", confidence: 0.90, patterns: [/cdn\.paddle\.com/i, /paddle\.com/i] },
  { name: "Zuora",            category: "Payments", confidence: 0.85, patterns: [/static\.zuora\.com/i] },
  { name: "Square",           category: "Payments", confidence: 0.88, patterns: [/js\.squareup\.com/i] },

  // ─── Frontend Frameworks ─────────────────────────────────────────────────
  { name: "React",            category: "Frontend Framework", confidence: 0.80, patterns: [/__reactFiber/i, /_reactRootContainer/i] },
  { name: "Next.js",          category: "Frontend Framework", confidence: 0.93, patterns: [/__NEXT_DATA__/i, /_next\/static/i] },
  { name: "Vue.js",           category: "Frontend Framework", confidence: 0.85, patterns: [/__vue__/i, /data-v-[a-z0-9]+=/i] },
  { name: "Nuxt.js",          category: "Frontend Framework", confidence: 0.93, patterns: [/__NUXT__/i, /_nuxt\//i] },
  { name: "Angular",          category: "Frontend Framework", confidence: 0.87, patterns: [/ng-version/i, /ng-app/i] },
  { name: "Svelte",           category: "Frontend Framework", confidence: 0.85, patterns: [/__svelte/i] },
  { name: "Gatsby",           category: "Frontend Framework", confidence: 0.90, patterns: [/___gatsby/i, /gatsby-image/i] },
  { name: "Astro",            category: "Frontend Framework", confidence: 0.88, patterns: [/astro-island/i] },
  { name: "Remix",            category: "Frontend Framework", confidence: 0.87, patterns: [/__remixContext/i] },

  // ─── Hosting / CDN / Cloud ───────────────────────────────────────────────
  { name: "Cloudflare",       category: "CDN / Security", confidence: 0.90, patterns: [/cf-ray/i, /challenge-platform/i, /cloudflare\.com/i] },
  { name: "Fastly",           category: "CDN",            confidence: 0.87, patterns: [/fastly\.net/i] },
  { name: "Vercel",           category: "Hosting",        confidence: 0.90, patterns: [/x-vercel-id/i, /\.vercel\.app/i] },
  { name: "Netlify",          category: "Hosting",        confidence: 0.90, patterns: [/netlify\.app/i, /x-nf-request-id/i] },
  { name: "AWS",              category: "Cloud",          confidence: 0.80, patterns: [/amazonaws\.com/i, /x-amz-/i] },
  { name: "Google Cloud",     category: "Cloud",          confidence: 0.80, patterns: [/storage\.googleapis\.com/i] },
  { name: "Azure",            category: "Cloud",          confidence: 0.80, patterns: [/azurewebsites\.net/i, /azureedge\.net/i] },
  { name: "Heroku",           category: "Hosting",        confidence: 0.85, patterns: [/herokuapp\.com/i] },
  { name: "Render",           category: "Hosting",        confidence: 0.83, patterns: [/onrender\.com/i] },
  { name: "Fly.io",           category: "Hosting",        confidence: 0.83, patterns: [/fly\.dev/i] },

  // ─── Sales Intelligence / ABM ────────────────────────────────────────────
  { name: "6sense",           category: "ABM / Intent",       confidence: 0.93, patterns: [/6sense\.com/i, /6si\.com/i] },
  { name: "Demandbase",       category: "ABM / Intent",       confidence: 0.93, patterns: [/demandbase\.com/i] },
  { name: "Clearbit",         category: "Data Enrichment",    confidence: 0.90, patterns: [/x\.clearbit\.com/i, /clearbit\.com/i] },
  { name: "Apollo",           category: "Sales Intelligence", confidence: 0.85, patterns: [/apollo\.io/i] },
  { name: "ZoomInfo",         category: "Sales Intelligence", confidence: 0.85, patterns: [/ws\.zoominfo\.com/i] },
  { name: "Salesloft",        category: "Sales Engagement",   confidence: 0.85, patterns: [/s1\.salesloft\.com/i] },
  { name: "Outreach",         category: "Sales Engagement",   confidence: 0.85, patterns: [/outreach\.io/i] },
  { name: "Gong",             category: "Revenue Intelligence", confidence: 0.85, patterns: [/gong\.io/i] },
  { name: "LinkedIn Insight", category: "ABM / Intent",       confidence: 0.90, patterns: [/snap\.licdn\.com/i, /linkedin\.com\/insight/i] },

  // ─── A/B Testing / Feature Flags ─────────────────────────────────────────
  { name: "Optimizely",       category: "A/B Testing",   confidence: 0.93, patterns: [/cdn\.optimizely\.com/i] },
  { name: "VWO",              category: "A/B Testing",   confidence: 0.90, patterns: [/vwo\.com/i, /visualwebsiteoptimizer\.com/i] },
  { name: "LaunchDarkly",     category: "Feature Flags", confidence: 0.90, patterns: [/launchdarkly\.com/i] },
  { name: "Statsig",          category: "Feature Flags", confidence: 0.87, patterns: [/statsigapi\.net/i, /statsig\.com/i] },
  { name: "Split.io",         category: "Feature Flags", confidence: 0.87, patterns: [/cdn\.split\.io/i] },

  // ─── Video ───────────────────────────────────────────────────────────────
  { name: "Wistia",           category: "Video Hosting", confidence: 0.95, patterns: [/fast\.wistia\.com/i, /wistia\.com/i] },
  { name: "Vimeo",            category: "Video Hosting", confidence: 0.90, patterns: [/player\.vimeo\.com/i] },
  { name: "Loom",             category: "Video",         confidence: 0.87, patterns: [/loom\.com\/embed/i] },
  { name: "Mux",              category: "Video",         confidence: 0.87, patterns: [/stream\.mux\.com/i] },
  { name: "Vidyard",          category: "Video",         confidence: 0.87, patterns: [/play\.vidyard\.com/i] },

  // ─── Scheduling ──────────────────────────────────────────────────────────
  { name: "Calendly",         category: "Scheduling", confidence: 0.95, patterns: [/assets\.calendly\.com/i, /calendly\.com/i] },
  { name: "Chili Piper",      category: "Scheduling", confidence: 0.90, patterns: [/js\.chilipiper\.com/i] },
  { name: "Cal.com",          category: "Scheduling", confidence: 0.85, patterns: [/cal\.com\/embed/i] },
  { name: "SavvyCal",         category: "Scheduling", confidence: 0.85, patterns: [/savvycal\.com/i] },

  // ─── Auth / Identity ─────────────────────────────────────────────────────
  { name: "Auth0",            category: "Auth / Identity", confidence: 0.90, patterns: [/cdn\.auth0\.com/i, /auth0\.com/i] },
  { name: "Okta",             category: "Auth / Identity", confidence: 0.90, patterns: [/oktacdn\.com/i, /okta\.com/i] },
  { name: "Clerk",            category: "Auth / Identity", confidence: 0.90, patterns: [/clerk\.accounts/i, /clerk\.dev/i] },
  { name: "Firebase Auth",    category: "Auth / Identity", confidence: 0.85, patterns: [/firebaseapp\.com/i] },
  { name: "WorkOS",           category: "Auth / Identity", confidence: 0.85, patterns: [/workos\.com/i] },
  { name: "Stytch",           category: "Auth / Identity", confidence: 0.85, patterns: [/js\.stytch\.com/i] },

  // ─── Error Tracking / Observability ──────────────────────────────────────
  { name: "Sentry",           category: "Error Tracking", confidence: 0.93, patterns: [/browser\.sentry-cdn\.com/i, /Sentry\.init/i] },
  { name: "LogRocket",        category: "Session Replay", confidence: 0.90, patterns: [/cdn\.lr-in-prod\.com/i, /logrocket\.com/i] },
  { name: "Datadog",          category: "Observability",  confidence: 0.87, patterns: [/datadoghq\.com/i, /DD_LOGS/i] },
  { name: "Bugsnag",          category: "Error Tracking", confidence: 0.87, patterns: [/bugsnag\.com/i] },
  { name: "Rollbar",          category: "Error Tracking", confidence: 0.85, patterns: [/rollbar\.com/i, /rollbar\.init/i] },

  // ─── Onboarding / Customer Success ───────────────────────────────────────
  { name: "Appcues",          category: "Onboarding",       confidence: 0.90, patterns: [/fast\.appcues\.com/i] },
  { name: "Userflow",         category: "Onboarding",       confidence: 0.87, patterns: [/userflowjs\.com/i] },
  { name: "Chameleon",        category: "Onboarding",       confidence: 0.87, patterns: [/trychameleon\.com/i] },
  { name: "Gainsight PX",     category: "Customer Success", confidence: 0.87, patterns: [/gsight\.com/i, /gainsight\.com/i] },
  { name: "ChurnZero",        category: "Customer Success", confidence: 0.83, patterns: [/churnzero\.net/i] },

  // ─── Forms / Surveys ─────────────────────────────────────────────────────
  { name: "Typeform",         category: "Forms",   confidence: 0.90, patterns: [/embed\.typeform\.com/i] },
  { name: "Tally",            category: "Forms",   confidence: 0.87, patterns: [/tally\.so\/r\//i] },
  { name: "Jotform",          category: "Forms",   confidence: 0.87, patterns: [/form\.jotform\.com/i] },
  { name: "Qualtrics",        category: "Surveys", confidence: 0.87, patterns: [/iad1\.qualtrics\.com/i] },
  { name: "SurveyMonkey",     category: "Surveys", confidence: 0.87, patterns: [/smcx-sdk/i, /surveymonkey\.com/i] },

  // ─── Documentation ───────────────────────────────────────────────────────
  { name: "Readme.io",        category: "Documentation", confidence: 0.87, patterns: [/readme\.com/i] },
  { name: "Gitbook",          category: "Documentation", confidence: 0.87, patterns: [/gitbook\.io/i, /gitbook-content/i] },
  { name: "Mintlify",         category: "Documentation", confidence: 0.87, patterns: [/mintlify\.app/i] },

  // ─── Product Feedback ────────────────────────────────────────────────────
  { name: "Canny",            category: "Product Feedback", confidence: 0.88, patterns: [/canny\.io/i] },
  { name: "Productboard",     category: "Product Feedback", confidence: 0.85, patterns: [/productboard\.com/i] },

  // ─── Consent / Privacy ───────────────────────────────────────────────────
  { name: "OneTrust",         category: "Consent / Privacy", confidence: 0.88, patterns: [/cdn\.cookielaw\.org/i, /onetrust\.com/i] },
  { name: "Cookiebot",        category: "Consent / Privacy", confidence: 0.88, patterns: [/consent\.cookiebot\.com/i] },
  { name: "Osano",            category: "Consent / Privacy", confidence: 0.85, patterns: [/osano\.com/i] },
];

// Sales-intelligence signal definitions
export const SALES_SIGNALS = {
  budget: {
    enterprise: [
      "Salesforce","Marketo","Pardot","6sense","Demandbase","Optimizely","Chili Piper",
      "Okta","Gong","Outreach","ZoomInfo","Gainsight PX","Salesforce Commerce","Zuora","Salesloft"
    ],
    midmarket: [
      "HubSpot","Intercom","Drift","Segment","Amplitude","FullStory","Recurly","Chargebee",
      "Pendo","Auth0","Sentry","LogRocket","LaunchDarkly","Appcues","Help Scout","Clearbit","Paddle"
    ],
    smb: [
      "Mailchimp","ActiveCampaign","Crisp","Wix","Squarespace","Calendly",
      "Tawk.to","Tidio","Tally","Brevo","ConvertKit","Drip"
    ],
  },
  maturity: {
    sophisticated: [
      "Segment","Heap","LaunchDarkly","6sense","Demandbase","PostHog","Clearbit",
      "Statsig","Split.io","Datadog","Datadog RUM","Rudderstack","WorkOS"
    ],
    growing: [
      "Mixpanel","Amplitude","Hotjar","Intercom","HubSpot","Sentry","Pendo","Appcues","Auth0","LogRocket"
    ],
    early: [
      "Google Analytics UA","Mailchimp","Wix","Squarespace","Tawk.to","Jotform"
    ],
  },
  crm:                  ["Salesforce","HubSpot","ActiveCampaign"],
  marketing_automation: ["Marketo","Pardot","HubSpot","Klaviyo","Mailchimp","ActiveCampaign","Brevo","Customer.io","Iterable"],
  has_abm:              ["6sense","Demandbase","LinkedIn Insight"],
  has_scheduling:       ["Calendly","Chili Piper","SavvyCal","Cal.com"],
  has_onboarding:       ["Appcues","Userflow","Chameleon","Gainsight PX"],
  has_revenue_intel:    ["Gong","Chorus"],
  ecommerce_platform:   ["Shopify","BigCommerce","WooCommerce","Magento","Salesforce Commerce"],
};
