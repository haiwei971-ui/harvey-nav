import { SITES, QUOTES, ICON_BASE, FALLBACK_ICON } from './data.js';

function imgTag(src, cls) {
  const safe = ICON_BASE + encodeURIComponent(src);
  return `<img class="${cls}" src="${safe}" onerror="this.onerror=null;this.src='${ICON_BASE}${FALLBACK_ICON}'">`;
}

function render() {
  const ess = document.getElementById("ess"), ext = document.getElementById("ext");
  ess.innerHTML = ext.innerHTML = "";
  SITES.forEach(s => {
    const a = document.createElement("a");
    a.className = `item ${s.whiteInvert ? "white-invert" : ""}`;
    a.href = s.u; a.target = "_blank"; a.rel = "noopener noreferrer";
    a.style.setProperty("--brand-color", s.c || "#7C5CFF");
    if (s.s) a.style.setProperty("--s", String(s.s));
    
    // ✅ Use separate logic for Gemini layering
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
    document.getElementById("temp").textContent = current.temp_C + "°C";
    document.getElementById("city").textContent = data.nearest_area[0].areaName[0].value.toUpperCase();
    document.getElementById("condition").textContent = current.weatherDesc[0].value;
  } catch (e) { if (document.getElementById("city")) document.getElementById("city").textContent = "OFFLINE"; }
}

function toggleMore() {
  const area = document.getElementById("moreArea"), btn = document.getElementById("toggleBtn");
  const isHidden = area.getAttribute("aria-hidden") === "true";
  area.setAttribute("aria-hidden", String(!isHidden));
  btn.textContent = isHidden ? "Less Icons" : "More Icons";
}

// Init
updateTheme(); render(); updateWeather();
const btn = document.getElementById("toggleBtn");
if (btn) btn.onclick = toggleMore;

const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
document.getElementById("quote").textContent = `"${q.t}"`;
document.getElementById("author").textContent = q.a;

function tick() {
  const d = new Date();
  document.getElementById("clock").textContent = `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
}
tick(); setInterval(tick, 1000); setInterval(updateTheme, 60000);
