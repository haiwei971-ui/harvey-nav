// assets/data.js

export const ICON_BASE = "icons/";
export const FALLBACK_ICON = "openai.svg";

// Quotes: Curated English wisdom for high-end design feel
export const QUOTES = [
  { t: "Stay hungry, stay foolish.", a: "Steve Jobs" },
  { t: "Simplicity is the ultimate sophistication.", a: "Leonardo da Vinci" },
  { t: "Design is not just what it looks like and feels like. Design is how it works.", a: "Steve Jobs" },
  { t: "Innovation distinguishes between a leader and a follower.", a: "Steve Jobs" },
  { t: "Everything is designed. Few things are designed well.", a: "Brian Reed" }
];

/*
r:
1,2 = ESSENTIALS
3   = EXTENDED
*/

export const SITES = [

  // =========================
  // ESSENTIALS - Line 1
  // =========================

  { n:"ChatGPT",
    u:"https://chatgpt.com/",
    r:1,
    icons:["openai.svg"],
    whiteInvert:true // ✅ Ensure high contrast in night mode
  },

  { n:"Claude",
    u:"https://claude.ai/",
    r:1,
    icons:["claude-color.svg"],
    whiteInvert:true // ✅ Fixed: Claude silhouette is too dark in night mode
  },

  { n:"Copilot",
    u:"https://copilot.microsoft.com/",
    r:1,
    icons:["copilot-color.svg"]
  },

  { n:"Gemini",
    u:"https://gemini.google.com/",
    r:1,
    icons:["gemini-color.svg"],
    gemini:true,
    whiteInvert:true // ✅ Fixed: Gemini star needs to shine in the dark
  },

  { n:"Cloudflare",
    u:"https://dash.cloudflare.com/",
    r:1,
    icons:["cloudflare-color.svg"], // Suggesting color version for hover consistency
    whiteInvert:true
  },

  { n:"GitHub",
    u:"https://github.com/",
    r:1,
    icons:["github.svg"],
    whiteInvert:true
  },

  // =========================
  // ESSENTIALS - Line 2
  // =========================
  { n:"Gmail",
    u:"https://mail.google.com/",
    r:2,
    icons:["google-gmail.svg"]
  },

  { n:"Google",
    u:"https://www.google.com/",
    r:2,
    icons:["google-color.svg"]
  },

  { n:"Google Cloud",
    u:"https://console.cloud.google.com/",
    r:2,
    icons:["googlecloud-color.svg"]
  },

  { n:"Google Drive",
    u:"https://drive.google.com/",
    r:2,
    icons:["google-drive.svg"]
  },

  { n:"Google Maps",
    u:"https://maps.google.com", // ✅ Fixed: Returning to stable official entry
    r:2,
    icons:["google-maps.svg"]
  },

  { n:"YouTube",
    u:"https://youtube.com", // ✅ Fixed: Returning to stable official entry
    r:2,
    icons:["youtube_red.svg"]
  },

  // =========================
  // EXTENDED
  // =========================

  { n:"AWS",
    u:"https://aws.amazon.com/",
    r:3,
    icons:["aws.svg"],
    whiteInvert:true // ✅ Fixed: AWS dark swoosh is invisible at night
  },

  { n:"Azure",
    u:"https://portal.azure.com/",
    r:3,
    icons:["azure-color.svg"],
    whiteInvert:true // ✅ Fixed: Azure blue blends into deep blue background
  },

  { n:"Bing",
    u:"https://www.bing.com/",
    r:3,
    icons:["bing.svg"],
    whiteInvert:true
  },

  { n:"Microsoft",
    u:"https://www.microsoft.com/",
    r:3,
    icons:["microsoft-color.svg"],
    whiteInvert:true // ✅ Fixed: Microsoft gray is too low-contrast
  },

  { n:"Netflix",
    u:"https://www.netflix.com/",
    r:3,
    icons:["netflix-icon.svg"],
    whiteInvert:true // ✅ Added for high-end glowing white effect
  },

  { n:"Spotify",
    u:"https://spotify.com", // ✅ Fixed: Returning to stable official entry
    r:3,
    icons:["spotify-icon.svg"]
  },

  { n:"X",
    u:"https://x.com/",
    r:3,
    icons:["x.svg"],
    whiteInvert:true
  },

  { n:"Reddit",
    u:"https://www.reddit.com/",
    r:3,
    icons:["reddit.svg"],
    whiteInvert:true
  },

  { n:"Telegram",
    u:"https://web.telegram.org/",
    r:3,
    icons:["telegram2.svg"],
    whiteInvert:true
  }
];
