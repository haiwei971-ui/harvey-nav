// assets/data.js

export const ICON_BASE = "icons/";
export const FALLBACK_ICON = "openai.svg";

// Quotes
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
  // ESSENTIALS
  // =========================

  { n:"ChatGPT",
    u:"https://chatgpt.com/",
    r:1,
    icons:["openai.svg"],
    whiteInvert:true
  },

  { n:"Claude",
    u:"https://claude.ai/",
    r:1,
    icons:["anthropic.svg"],
    whiteInvert:true
  },

  { n:"Copilot",
    u:"https://copilot.microsoft.com/",
    r:1,
    icons:["copilot-color.svg"]
  },

  { n:"Gemini",
    u:"https://gemini.google.com/",
    r:1,
    icons:["gemini.svg","gemini-color.svg"],
    gemini:true
  },

  { n:"Cloudflare",
    u:"https://dash.cloudflare.com/",
    r:1,
    icons:["cloudflare.svg"],
    whiteInvert:true
  },

  { n:"GitHub",
    u:"https://github.com/",
    r:1,
    icons:["github.svg"],
    whiteInvert:true
  },

  // 第二行 Essentials
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
    u:"https://maps.google.com/",
    r:2,
    icons:["google-maps.svg"]
  },

  { n:"YouTube",
    u:"https://www.youtube.com/",
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
    whiteInvert:true
  },

  { n:"Azure",
    u:"https://portal.azure.com/",
    r:3,
    icons:["azure-color.svg"]
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
    icons:["microsoft-color.svg"]
  },

  { n:"Netflix",
    u:"https://www.netflix.com/",
    r:3,
    icons:["netflix-icon.svg"]
  },

  { n:"Spotify",
    u:"https://open.spotify.com/",
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
    icons:["telegram.svg"],
    whiteInvert:true
  }

];