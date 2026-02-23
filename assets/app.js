// assets/app.js
import { ICON_BASE, FALLBACK_ICON, QUOTES, SITES } from "./data.js";

const $ = (id) => document.getElementById(id);

const isTouch = () => ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);

function pad2(n){ return String(n).padStart(2, "0"); }

function setThemeAuto(){
  // 优先跟随系统
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  // 再结合时间（更自然）
  const h = new Date().getHours();
  const nightByTime = (h >= 19 || h < 7);
  const night = prefersDark || nightByTime;

  document.body.classList.toggle("theme-night", night);
}

function setGreeting(){
  const el = $("greet");
  if (!el) return;
  const h = new Date().getHours();
  let text = "Hello.";
  if (h < 5) text = "Still awake?";
  else if (h < 12) text = "Good morning.";
  else if (h < 18) text = "Good afternoon.";
  else text = "Good night.";
  el.textContent = text;
}

function startClock(){
  const el = $("clock");
  if (!el) return;
  const tick = () => {
    const d = new Date();
    el.textContent = `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
  };
  tick();
  setInterval(tick, 1000);
}

function pickQuote(){
  if (!Array.isArray(QUOTES) || QUOTES.length === 0) return;
  const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  const qt = $("quote");
  const au = $("author");
  if (qt) qt.textContent = `"${q.t}"`;
  if (au) au.textContent = q.a;
}

function setSearch(){
  const form = $("searchForm");
  const input = $("q");
  if (!form || !input) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = (input.value || "").trim();
    if (!q) return;
    // 默认 Google 搜索
    const url = `https://www.google.com/search?q=${encodeURIComponent(q)}`;
    window.location.href = url;
  });
}

async function setWeather(){
  // 轻量：拿地理位置 -> open-meteo
  const tempEl = $("temp");
  const cityEl = $("city");
  const condEl = $("condition");
  if (!tempEl || !cityEl) return;

  cityEl.textContent = "Loading...";

  try{
    const pos = await new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject(new Error("no geolocation"));
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 6000 });
    });

    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    // 反查城市：用 Nominatim（可能被限流，失败就不显示城市）
    let city = "";
    try{
      const rev = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`, {
        headers: { "Accept": "application/json" }
      });
      if (rev.ok){
        const js = await rev.json();
        city = js?.address?.city || js?.address?.town || js?.address?.village || js?.address?.state || "";
      }
    }catch(_e){}

    // open-meteo 实况
    const w = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=celsius`);
    if (!w.ok) throw new Error("weather fetch failed");
    const wj = await w.json();

    const t = wj?.current?.temperature_2m;
    const code = wj?.current?.weather_code;

    tempEl.textContent = (typeof t === "number") ? `${Math.round(t)}°C` : "--";
    cityEl.textContent = city || "Local";
    condEl.textContent = codeToText(code);

  }catch(_e){
    tempEl.textContent = "--";
    cityEl.textContent = "Local";
    if (condEl) condEl.textContent = "";
  }
}

function codeToText(code){
  // open-meteo weather_code 简化映射（不追求全覆盖）
  const map = new Map([
    [0, "Clear"],
    [1, "Mainly clear"], [2, "Partly cloudy"], [3, "Overcast"],
    [45, "Fog"], [48, "Fog"],
    [51, "Drizzle"], [53, "Drizzle"], [55, "Drizzle"],
    [61, "Rain"], [63, "Rain"], [65, "Rain"],
    [71, "Snow"], [73, "Snow"], [75, "Snow"],
    [80, "Showers"], [81, "Showers"], [82, "Showers"],
    [95, "Thunder"], [96, "Thunder"], [99, "Thunder"],
  ]);
  if (typeof code !== "number") return "";
  return map.get(code) || "";
}

function imgTag(src, cls){
  const safe = ICON_BASE + encodeURIComponent(src);
  const fallback = ICON_BASE + encodeURIComponent(FALLBACK_ICON);
  return `<img class="${cls}" src="${safe}" alt="" loading="lazy"
    onerror="this.onerror=null;this.src='${fallback}'">`;
}

function buildIconHTML(site){
  // Gemini：专用两层（g0 灰底图、g1 彩色图）
  if (site.gemini){
    return `
      <div class="icon gemini" style="--s:${site.s ? String(site.s) : "1"}">
        ${imgTag("gemini.svg", "g0")}
        ${imgTag("gemini-color.svg", "g1")}
      </div>
    `;
  }

  const icons = Array.isArray(site.icons) ? site.icons : [];

  // 双图：base + active
  if (icons.length >= 2){
    return `
      <div class="icon" style="--s:${site.s ? String(site.s) : "1"}">
        ${imgTag(icons[0], "base")}
        ${imgTag(icons[1], "active")}
      </div>
    `;
  }

  // 单图：single（默认灰，唤醒去灰）
  const one = icons[0] || FALLBACK_ICON;
  return `
    <div class="icon" style="--s:${site.s ? String(site.s) : "1"}">
      ${imgTag(one, "single")}
    </div>
  `;
}

function attachAwakeTap(a){
  // 手机：第一次 tap 唤醒，不跳转；第二次 tap 才跳转
  if (!isTouch()) return;

  a.addEventListener("click", (e) => {
    if (!a.classList.contains("awake")){
      e.preventDefault();

      // 清掉其它 awake
      document.querySelectorAll(".item.awake").forEach(x => x.classList.remove("awake"));

      a.classList.add("awake");
      setTimeout(() => a.classList.remove("awake"), 1200);
    }
  }, { passive: false });

  // 点空白处熄灭
  document.addEventListener("touchstart", (ev) => {
    const t = ev.target;
    if (!(t instanceof Element)) return;
    if (!t.closest(".item")) {
      document.querySelectorAll(".item.awake").forEach(x => x.classList.remove("awake"));
    }
  }, { passive: true });
}

function renderSites(){
  const ess = $("ess");
  const ext = $("ext");
  if (!ess || !ext) return;

  ess.innerHTML = "";
  ext.innerHTML = "";

  const essentials = SITES.filter(s => s.r === 1 || s.r === 2);
  const extended = SITES.filter(s => s.r === 3);

  const renderList = (arr, root) => {
    arr.forEach(site => {
      const a = document.createElement("a");
      a.className = `item ${site.whiteInvert ? "white-invert" : ""}`;
      a.href = site.u;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      a.style.setProperty("--brand-color", site.c || "#7C5CFF");
      if (site.s) a.style.setProperty("--s", String(site.s));

      a.innerHTML = `
        ${buildIconHTML(site)}
        <div class="label">${site.n}</div>
      `;

      attachAwakeTap(a);

      root.appendChild(a);
    });
  };

  renderList(essentials, ess);
  renderList(extended, ext);
}

function setupMoreToggle(){
  const moreArea = $("moreArea");
  const btn = $("toggleBtn");
  if (!moreArea || !btn) return;

  const setState = (open) => {
    moreArea.setAttribute("aria-hidden", open ? "false" : "true");
    btn.textContent = open ? "Less Icons" : "More Icons";
  };

  let open = false;
  setState(open);

  btn.addEventListener("click", () => {
    open = !open;
    setState(open);
  });
}

function boot(){
  setThemeAuto();
  setGreeting();
  startClock();
  pickQuote();
  setSearch();
  renderSites();
  setupMoreToggle();
  setWeather();

  // 每分钟更新一次问候/主题（更自然）
  setInterval(() => {
    setThemeAuto();
    setGreeting();
  }, 60_000);
}

boot();