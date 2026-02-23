import { SITES, QUOTES, ICON_BASE, FALLBACK_ICON } from './data.js';

function imgTag(src, cls) {
  const safe = ICON_BASE + encodeURIComponent(src);
  return `<img class="${cls}" src="${safe}" onerror="this.onerror=null;this.src='${ICON_BASE}${FALLBACK_ICON}'">`;
}

function render() {
  const ess = document.getElementById("ess"), ext = document.getElementById("ext");
  if (!ess || !ext) return;
  ess.innerHTML = ext.innerHTML = "";

  SITES.forEach(s => {
    const a = document.createElement("a");
    a.className = `item ${s.whiteInvert ? "white-invert" : ""}`;
    a.href = s.u; a.target = "_blank"; a.rel = "noopener noreferrer";
    a.style.setProperty("--brand-color", s.c || "#7C5CFF");
    if (s.s) a.style.setProperty("--s", String(s.s));
    
    const iconHTML = s.gemini 
      ? `<div class="icon gemini">${imgTag("gemini.svg", "g0")}${imgTag("gemini-color.svg", "g1")}</div>`
      : `<div class="icon">${imgTag(s.icons[0], "single")}</div>`;
    
    a.innerHTML = `${iconHTML}<div class="label">${s.n}</div>`;
    (s.r <= 2 ? ess : ext).appendChild(a);
  });
}

// 自动切换主题
function updateTheme() {
  const h = new Date().getHours();
  const night = (h >= 17 || h < 8);
  document.body.classList.toggle("theme-night", night);
  const greet = document.getElementById("greet");
  if (greet) greet.textContent = night ? "Good night." : (h < 12 ? "Good morning." : "Good afternoon.");
}

// 展开/收起逻辑
let isExpanded = false;
function toggleMore() {
  isExpanded = !isExpanded;
  const area = document.getElementById("moreArea");
  const btn = document.getElementById("toggleBtn");
  if (area) area.setAttribute("aria-hidden", String(!isExpanded));
  if (btn) btn.textContent = isExpanded ? "Less Icons" : "More Icons";
}

// 初始化
updateTheme(); render();
const btn = document.getElementById("toggleBtn");
if (btn) btn.onclick = toggleMore;

setInterval(updateTheme, 60000);
