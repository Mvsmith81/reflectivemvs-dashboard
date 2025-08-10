// Configuration for the Reflective MVS dashboard
// Modify these values to hook up your analytics, content sources and social profiles.

window.RMVS_CONFIG = {
  // Site information
  site: {
    baseUrl: "https://www.reflectivemvs.com",
    bloggerJsonFeed: "https://www.reflectivemvs.com/feeds/posts/default?alt=json"
  },

  // Looker Studio public embed URLs. Paste your GA4 and GSC report links here.
  embeds: {
    GA_LOOKER: "",
    GSC_LOOKER: ""
  },

  // Quick navigation links displayed in the header
  quickLinks: [
    { label: "Site", href: "https://www.reflectivemvs.com" },
    { label: "Substack", href: "https://reflectivemvs.substack.com" },
    { label: "Bookshop", href: "https://bookshop.org/shop/reflectivemvs" },
    { label: "Podcast", href: "https://open.spotify.com/show/reflective-voices" }
  ],

  // Your ChatGPT project workspace link. This will power the Quick Draft button.
  draftWorkspace: "https://chatgpt.com/g/g-p-67df8797664481918b6f443de911ce39-reflective/project",

  // Topics to cover – edit or add more to drive your editorial calendar
  topics: [
    "Voting Rights (Texas & beyond)",
    "Black Labor History: 1877–present",
    "Climate & Inequality",
    "Atlanta Homelessness Policy",
    "Media Accountability",
    "Courts, Power & Precedent",
    "Union Drives in the South",
    "Disinformation & Civic Literacy"
  ],

  // External news feeds for the news radar
  newsFeeds: [
    { name: "Capital B", rss: "https://feeds.feedburner.com/CapitalBNews" },
    { name: "Texas Tribune", rss: "https://www.texastribune.org/feeds/" }
  ],

  // Backlog ideas you want to keep on your radar
  backlog: [
    "Profile: John T. Smith & AFL-CIO legacy",
    "Explainer: Gerrymandering 2025, the receipts",
    "Series: From Selma to Texas (interactive timeline)"
  ],

  // Social media profiles extracted from your social page
  socialLinks: [
    { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61563764393118" },
    { name: "X (Twitter)", href: "https://x.com/ReflectiveMVS" },
    { name: "Instagram", href: "https://www.instagram.com/reflective_mvs?igsh=bHd1dDdvaHRkcm1u" },
    { name: "YouTube", href: "https://www.youtube.com/@reflectivemvs" },
    { name: "Substack", href: "https://substack.com/@reflectivemvs" },
    { name: "Bluesky", href: "https://bsky.app/profile/reflectivemvs.bsky.social" },
    { name: "Threads", href: "https://www.threads.net/@reflective_mvs" }
  ]
};
