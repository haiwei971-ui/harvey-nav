// assets/app.js
import { ICON_BASE, FALLBACK_ICON, QUOTES, SITES } from "./data.js";

function $(id){ return document.getElementById(id); }

function $(id){ return document.getElementById(id); }

function imgTag(src, cls){
  const safe = ICON_BASE + encodeURIComponent(src);
  return `<img class="${cls}" src="${safe}" loading="lazy" decoding="async"
    onerror="this.onerror=null;this.src='${ICON_BASE}${FALLBACK_ICON}'">`;
}

function renderSites(){
  const ess = $("ess");
  const ext = $("ext");
  if (!ess || !ext) return;

  ess.innerHTML = "";
  ext.innerHTML = "";

  SITES.forEach(s=>{
    const a = document.createElement("a");
    a.className = `item ${s.whiteInvert ? "white-invert" : ""}`;
    a.href = s.u;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.style.setProperty("--brand-color", s.c || "#7C5CFF");
    if (s.s) a.style.setProperty("--s", String(s.s));

    const iconHTML = s.gemini
      ? `<div class="icon gemini">${imgTag("gemini.svg", "g0")}${imgTag("gemini-color.svg", "g1")}</div>`
      : `<div class="icon">${imgTag((s.icons && s.icons[0]) ? s.icons[0] : FALLBACK_ICON, "single")}</div>`;

    a.innerHTML = `${iconHTML}<div class="label">${s.n}</div>`;

    (s.r <= 2 ? ess : ext).appendChild(a);
  });
}

function toggleMore(){
  const area = $("moreArea");
  const btn  = $("toggleBtn");
  if (!area || !btn) return;

  const expanded = area.getAttribute("aria-hidden") === "false";
  area.setAttribute("aria-hidden", String(expanded));   // expanded=true -> hide
  btn.textContent = expanded ? "More Icons" : "Less Icons";
}

function updateTheme(){
  const h = new Date().getHours();
  const night = (h >= 17 || h < 8);
  document.body.classList.toggle("theme-night", night);

  const g = $("greet");
  if (g){
    g.textContent = night ? "Good night." : (h < 12 ? "Good morning." : "Good afternoon.");
  }
}

function tick(){
  const d = new Date();
  const c = $("clock");
  if (!c) return;
  c.textContent = `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
}

function updateQuote(){
  const qEl = $("quote");
  const aEl = $("author");
  if (!qEl || !aEl || !Array.isArray(QUOTES) || QUOTES.length === 0) return;

  const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  qEl.textContent = `"${q.t}"`;
  aEl.textContent = q.a;
}

async function updateWeather(){
  // 你的页面里如果没放天气区域，也不会报错
  const tempEl = $("temp");
  const cityEl = $("city");
  const condEl = $("condition");
  if (!tempEl || !cityEl || !condEl) return;

  try{
    const res = await fetch(WEATHER?.url || "https://wttr.in/?format=j1", { cache: "no-store" });
    const data = await res.json();
    const current = data.current_condition?.[0];
    const city = data.nearest_area?.[0]?.areaName?.[0]?.value;

    if (!current || !city) throw new Error("Bad weather data");

    tempEl.textContent = `${current.temp_C}°C`;
    cityEl.textContent = String(city).toUpperCase();
    condEl.textContent = current.weatherDesc?.[0]?.value || "";
  }catch(e){
    cityEl.textContent = "OFFLINE";
    tempEl.textContent = "--";
    condEl.textContent = "";
  }
}

function bindSearch(){
  const form = $("searchForm");
  const input = $("q");
  if (!form || !input) return;

  form.onsubmit = (e)=>{
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    window.open("https://www.google.com/search?q=" + encodeURIComponent(q), "_blank");
  };
}

function init(){
  // icons & sections
  renderSites();

  // interactions
  const btn = $("toggleBtn");
  if (btn) btn.onclick = toggleMore;

  bindSearch();

  // content
  updateTheme();
  tick();
  updateQuote();
  updateWeather();

  // timers
  setInterval(tick, 1000);
  setInterval(updateTheme, 60_000);
  setInterval(updateWeather, WEATHER?.refreshMs || 600_000);
}

document.addEventListener("DOMContentLoaded", init);