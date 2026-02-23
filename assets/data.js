// assets/data.js
// 只要改这个文件，就能增删图标/改链接/改分组

export const ICON_BASE = "icons/";
export const FALLBACK_ICON = "openai.svg";

// Quotes（英文）
export const QUOTES = [
  { t: "Stay hungry, stay foolish.", a: "Steve Jobs" },
  { t: "Simplicity is the ultimate sophistication.", a: "Leonardo da Vinci" },
  { t: "The best way to predict the future is to invent it.", a: "Alan Kay" },
  { t: "Design is not just what it looks like and feels like. Design is how it works.", a: "Steve Jobs" },
  { t: "Everything is designed. Few things are designed well.", a: "Brian Reed" },
  { t: "Code is like humor. When you have to explain it, it’s bad.", a: "Cory House" },
  { t: "Innovation distinguishes between a leader and a follower.", a: "Steve Jobs" }
];

/**
 * r:
 * 1/2 -> ESSENTIALS
 * 3   -> EXTENDED
 *
 * icons: ["xxx.svg"]  普通图标
 * gemini: true        Gemini 特效（灰->彩）
 * s: 1.14             图标视觉补偿
 * whiteInvert: true   夜间把“黑色图标”反相补光
 */
export const SITES = [
  // ===== ESSENTIALS (r:1) =====
  { n:"ChatGPT",    u:"https://chatgpt.com/",           icons:["openai.svg"],        c:"#10a37f", r:1, whiteInvert:true },
  { n:"Claude",     u:"https://claude.ai/",             icons:["fireworks.svg"],     c:"#d97757", r:1, whiteInvert:true }, // 你目录里有 fireworks.svg
  { n:"Copilot",    u:"https://copilot.microsoft.com/", icons:["copilot-color.svg"], c:"#0078d4", r:1 },
  { n:"Gemini",     u:"https://gemini.google.com/",     gemini:true, s:1.14,         c:"#4e85ff", r:1, whiteInvert:true },
  { n:"Cloudflare", u:"https://dash.cloudflare.com/",   icons:["cloudflare.svg"],    c:"#f48120", r:1, whiteInvert:true }, // ✅ 修正：只有 cloudflare.svg
  { n:"GitHub",     u:"https://github.com/",            icons:["github.svg"],        c:"#ffffff", r:1, whiteInvert:true },

  // ===== ESSENTIALS (r:2) =====
  { n:"Gmail",        u:"https://mail.google.com/",          icons:["google-gmail.svg"],       c:"#ea4335", r:2 },
  { n:"Google",       u:"https://www.google.com/",           icons:["google-color.svg"],       c:"#4285f4", r:2 },
  { n:"Google Cloud", u:"https://console.cloud.google.com/", icons:["googlecloud-color.svg"],  c:"#4285f4", r:2 }, // ✅ 修正
  { n:"Google Drive", u:"https://drive.google.com/",         icons:["google-drive.svg"],       c:"#34a853", r:2 },
  { n:"Google Maps",  u:"https://www.google.com/maps",       icons:["google-maps.svg"],        c:"#4285f4", r:2 },
  { n:"YouTube",      u:"https://www.youtube.com/",          icons:["youtube_red.svg"],        c:"#ff0000", r:2 }, // ✅ 修正：你目录里是 youtube_red.svg

  // ===== EXTENDED (r:3) =====
  // 下面这些你仓库里大概率也有；如果某个仍然错，就按“icons文件名”再对一下
  { n:"Microsoft", u:"https://www.microsoft.com/", icons:["microsoft.svg"],      c:"#ffffff", r:3, whiteInvert:true },
  { n:"Netflix",   u:"https://www.netflix.com/",   icons:["netflix-icon.svg"],   c:"#e50914", r:3, whiteInvert:true },
  { n:"Spotify",   u:"https://open.spotify.com/",  icons:["spotify-icon.svg"],   c:"#1db954", r:3 },
  { n:"X",         u:"https://x.com/",             icons:["x.svg"],              c:"#ffffff", r:3, whiteInvert:true },
  { n:"Reddit",    u:"https://www.reddit.com/",    icons:["reddit.svg"],         c:"#ff4500", r:3, whiteInvert:true },
  { n:"Telegram",  u:"https://web.telegram.org/",  icons:["telegram.svg"],       c:"#2aabee", r:3, whiteInvert:true },

  // 如果你后面还有 AWS/Azure/Bing/Apple 等，保持原来写法即可；
  // 若显示错误：去 icons/ 里找到真实文件名，按同样方式把 icons:["xxx.svg"] 改成一致。
];