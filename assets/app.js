// assets/app.js
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
    
    // ✅ 专用 Gemini 生成逻辑
    const iconHTML = s.gemini 
      ? `<div class="icon gemini">${imgTag("gemini.svg", "g0")}${imgTag("gemini-color.svg", "g1")}</div>`
      : `<div class="icon">${imgTag(s.icons[0], "single")}</div>`;
    
    a.innerHTML = `${iconHTML}<div class="label">${s.n}</div>`;
    (s.r <= 2 ? ess : ext).appendChild(a);
  });
}

function updateTheme() {
  const h = new Date().getHours(), b = document.body, g = document.getElementById("greet");
  const night = (h >= 17 || h < 8);
  b.classList.toggle("theme-night", night);
  if (g) g.textContent = night ? "Good night." : (h < 12 ? "Good morning." : "Good afternoon.");
}

async function updateWeather() {
  try {
    const res = await fetch('https://wttr.in/?format=j1');
    const data = await res.json();
    const current = data.current_condition[0];
    const tempEl = document.getElementById("temp");
    const cityEl = document.getElementById("city");
    const condEl = document.getElementById("condition");
    if (tempEl) tempEl.textContent = current.temp_C + "°C";
    if (cityEl) cityEl.textContent = data.nearest_area[0].areaName[0].value.toUpperCase();
    if (condEl) condEl.textContent = current.weatherDesc[0].value;
  } catch (e) { console.warn("Weather fetch failed."); }
}

function toggleMore() {
  const area = document.getElementById("moreArea"), btn = document.getElementById("toggleBtn");
  if (!area || !btn) return;
  const isHidden = area.getAttribute("aria-hidden") === "true";
  area.setAttribute("aria-hidden", String(!isHidden));
  btn.textContent = isHidden ? "Less Icons" : "More Icons";
}

// 初始化
updateTheme(); render(); updateWeather();
const btn = document.getElementById("toggleBtn");
if (btn) btn.onclick = toggleMore;

const qEl = document.getElementById("quote"), aEl = document.getElementById("author");
const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
if (qEl) qEl.textContent = `"${q.t}"`;
if (aEl) aEl.textContent = q.a;

function tick() {
  const clockEl = document.getElementById("clock");
  if (clockEl) {
    const d = new Date();
    clockEl.textContent = `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
  }
}
tick(); setInterval(tick, 1000); setInterval(updateTheme, 60000);
