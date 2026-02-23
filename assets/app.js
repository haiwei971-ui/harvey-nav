// assets/app.js
import { ICON_BASE, FALLBACK_ICON, QUOTES, SITES } from "./data.js";

/* ---------- helpers ---------- */

function $(id){
  return document.getElementById(id);
}

function imgTag(src, cls){
  const safe = ICON_BASE + encodeURIComponent(src || FALLBACK_ICON);
  return `
    <img class="${cls}" 
         src="${safe}" 
         onerror="this.onerror=null;this.src='${ICON_BASE + FALLBACK_ICON}'">
  `;
}

/* ---------- render icons ---------- */

function renderSites(){
  const ess = $("ess");
  const ext = $("ext");
  if(!ess || !ext) return;

  ess.innerHTML = "";
  ext.innerHTML = "";

  SITES.forEach(site => {

    const a = document.createElement("a");
    a.className = "item";
    a.href = site.u;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    if(site.color){
      a.style.setProperty("--brand-color", site.color);
    }

    if(site.s){
      a.style.setProperty("--s", site.s);
    }

    const iconHTML = site.gemini
      ? `<div class="icon gemini">${imgTag(site.icons?.[0], "")}</div>`
      : `<div class="icon">${imgTag(site.icons?.[0], "")}</div>`;

    a.innerHTML = `
      ${iconHTML}
      <div class="label">${site.n}</div>
    `;

    if(site.r === 1){
      ess.appendChild(a);
    } else {
      ext.appendChild(a);
    }

  });
}

/* ---------- greeting ---------- */

function updateGreeting(){
  const h = new Date().getHours();
  const g = $("greet");
  if(!g) return;

  if(h < 5) g.textContent = "Still awake?";
  else if(h < 12) g.textContent = "Good morning.";
  else if(h < 18) g.textContent = "Good afternoon.";
  else g.textContent = "Good evening.";
}

/* ---------- clock ---------- */

function startClock(){
  const el = $("clock");
  if(!el) return;

  function tick(){
    const d = new Date();
    const hh = String(d.getHours()).padStart(2,"0");
    const mm = String(d.getMinutes()).padStart(2,"0");
    el.textContent = `${hh}:${mm}`;
  }

  tick();
  setInterval(tick, 1000);
}

/* ---------- quotes ---------- */

function setRandomQuote(){
  const q = $("quote");
  const a = $("author");
  if(!q || !a || !QUOTES?.length) return;

  const item = QUOTES[Math.floor(Math.random()*QUOTES.length)];
  q.textContent = `"${item.t}"`;
  a.textContent = item.a;
}

/* ---------- search ---------- */

function initSearch(){
  const form = $("searchForm");
  const input = $("q");
  if(!form || !input) return;

  form.addEventListener("submit", e=>{
    e.preventDefault();
    const v = input.value.trim();
    if(!v) return;
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(v)}`;
  });
}

/* ---------- more toggle ---------- */

function initToggle(){
  const btn = $("toggleBtn");
  const area = $("moreArea");
  if(!btn || !area) return;

  btn.addEventListener("click", ()=>{
    const hidden = area.getAttribute("aria-hidden") === "true";
    area.setAttribute("aria-hidden", hidden ? "false" : "true");
    btn.textContent = hidden ? "Less Icons" : "More Icons";
  });
}

/* ---------- theme auto ---------- */

function autoTheme(){
  const h = new Date().getHours();
  if(h >= 18 || h < 6){
    document.body.classList.add("theme-night");
  }
}

/* ---------- init ---------- */

function init(){
  renderSites();
  updateGreeting();
  startClock();
  setRandomQuote();
  initSearch();
  initToggle();
  autoTheme();
}

document.addEventListener("DOMContentLoaded", init);