// assets/data.js
export const ICON_BASE = "./icons/";
export const FALLBACK_ICON = "openai.svg";

export const QUOTES = [
  { t: "Stay hungry, stay foolish.", a: "Steve Jobs" },
  { t: "Simplicity is the ultimate sophistication.", a: "Leonardo da Vinci" },
  { t: "The best way to predict the future is to invent it.", a: "Alan Kay" },
  { t: "Everything is designed. Few things are designed well.", a: "Brian Reed" }
];

/**
 * r:
 * 1/2 -> ESSENTIALS
 * 3   -> EXTENDED
 *
 * icons:
 * - 单图：["xxx.svg"]  默认灰，唤醒去灰（变彩）
 * - 双图：["base.svg","color.svg"] 默认显示 base，唤醒切到 color
 *
 * gemini:true：由 app.js 专用渲染（gemini.svg + gemini-color.svg）
 */
export const SITES = [
  { n:"ChatGPT",      u:"https://chatgpt.com/",              icons:["openai.svg"],                 c:"#10a37f", r:1, whiteInvert:true },

  // ✅ Claude：用 claude.svg + claude-color.svg（不要 anthropic.svg）
  { n:"Claude",       u:"https://claude.ai/",                icons:["claude.svg","claude-color.svg"], c:"#d97757", r:1, whiteInvert:true },

  { n:"Copilot",      u:"https://copilot.microsoft.com/",    icons:["copilot.svg","copilot-color.svg"], c:"#0078d4", r:1, whiteInvert:true },

  // ✅ Gemini：专用逻辑（两张图叠加，唤醒才彩）
  { n:"Gemini",       u:"https://gemini.google.com/",        icons:[], gemini:true, s:1.14,       c:"#4e85ff", r:1, whiteInvert:true },

  { n:"Cloudflare",   u:"https://dash.cloudflare.com/",      icons:["cloudflare.svg","cloudflare-color.svg"], c:"#f48120", r:1, whiteInvert:true },
  { n:"GitHub",       u:"https://github.com/",               icons:["github.svg"],                 c:"#ffffff", r:1, whiteInvert:true },

  { n:"Gmail",        u:"https://mail.google.com/",          icons:["google-gmail.svg"],            c:"#ea4335", r:2 },
  { n:"Google",       u:"https://www.google.com/",           icons:["google-color.svg"],            c:"#4285f4", r:2 },
  { n:"Google Cloud", u:"https://console.cloud.google.com/", icons:["googlecloud-color.svg"],       c:"#4285f4", r:2 },
  { n:"Google Drive", u:"https://drive.google.com/",         icons:["google-drive.svg"],            c:"#34a853", r:2 },
  { n:"Google Maps",  u:"https://maps.google.com/",          icons:["google-maps.svg"],             c:"#4285f4", r:2 },
  { n:"YouTube",      u:"https://youtube.com/",              icons:["youtube_red.svg"],             c:"#ff0000", r:2 },

  { n:"AWS",          u:"https://aws.amazon.com/",           icons:["aws.svg","aws-color.svg"],     c:"#ff9900", r:3, whiteInvert:true },
  { n:"Azure",        u:"https://portal.azure.com/",         icons:["azure.svg","azure-color.svg"], c:"#0078d4", r:3, whiteInvert:true },
  { n:"Bing",         u:"https://www.bing.com/",             icons:["bing.svg","bing-color.svg"],   c:"#008373", r:3, whiteInvert:true },
  { n:"Microsoft",    u:"https://www.microsoft.com/",        icons:["microsoft.svg","microsoft-color.svg"], c:"#ffffff", r:3, whiteInvert:true },
  { n:"Netflix",      u:"https://www.netflix.com/",          icons:["netflix-icon.svg"],            c:"#e50914", r:3, whiteInvert:true },
  { n:"Spotify",      u:"https://spotify.com/",              icons:["spotify-icon.svg"],            c:"#1db954", r:3 },
  { n:"X",            u:"https://x.com/",                    icons:["x.svg"],                       c:"#ffffff", r:3, whiteInvert:true },
  { n:"Reddit",       u:"https://www.reddit.com/",           icons:["reddit.svg"],                  c:"#ff4500", r:3, whiteInvert:true },
  { n:"Telegram",     u:"https://web.telegram.org/",         icons:["telegram.svg"],                c:"#2aabee", r:3, whiteInvert:true },
  { n:"Apple",        u:"https://www.apple.com/",            icons:["apple.svg"],                   c:"#ffffff", r:3, whiteInvert:true }
];