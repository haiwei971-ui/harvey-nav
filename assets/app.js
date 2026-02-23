// assets/app.js
import { ICON_BASE, FALLBACK_ICON, QUOTES, SITES } from "./data.js";

const $ = (id) => document.getElementById(id);

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function setClock() {
  const el = $("clock");
  if (!el) return;
  const d = new Date();
  el.textContent = `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function setGreet() {
  const el = $("greet");
  if (!el) return;
  const h = new Date().getHours();
  let t = "Hello.";
  if (h >= 5 && h < 12) t = "Good morning.";
  else if (h >= 12 && h < 18) t = "Good afternoon.";
  else if (h >= 18 || h < 2) t = "Good night.";
  else t = "Still awake?";
  el.textContent = t;
}

function setQuote() {
  const q = $("quote");
  const a = $("author");
  if (!q || !a) return;
  const item = pick(QUOTES || []);
  if (!item) return;
  q.textContent = `"${item.t}"`;
  a.textContent = item.a;
}

/**
 * 生成 <div class="icon">，内部叠两张图：
 *  - .icon-img.base  默认显示
 *  - .icon-img.active  交互时显示（hover/focus/active）
 */
function buildIconNode(site) {
  const wrap = document.createElement("div");
  wrap.className = site.gemini ? "icon gemini" : "icon";

  const icons = Array.isArray(site.icons) ? site.icons : [];
  const baseIcon =
    (site.gemini ? "gemini.svg" : icons[0]) || FALLBACK_ICON;
  const activeIcon =
    (site.gemini ? "gemini-color.svg" : icons[1]) || null;

  // base img
  const imgBase = document.createElement("img");
  imgBase.className = "icon-img base";
  imgBase.alt = site.n || "";
  imgBase.src = ICON_BASE + encodeURIComponent(baseIcon);
  imgBase.onerror = function () {
    this.onerror = null;
    this.src = ICON_BASE + encodeURIComponent(FALLBACK_ICON);
  };
  wrap.appendChild(imgBase);

  // active img（有才创建）
  if (activeIcon) {
    const imgActive = document.createElement("img");
    imgActive.className = "icon-img active";
    imgActive.alt = site.n || "";
    imgActive.src = ICON_BASE + encodeURIComponent(activeIcon);
    imgActive.onerror = function () {
      // active 失败就别挡住 base
      this.remove();
    };
    wrap.appendChild(imgActive);
    wrap.classList.add("has-active");
  }

  return wrap;
}

function renderSites() {
  const ess = $("ess");
  const ext = $("ext");
  if (!ess || !ext) return;

  ess.innerHTML = "";
  ext.innerHTML = "";

  (SITES || []).forEach((s) => {
    const a = document.createElement("a");
    a.className = `item ${s.whiteInvert ? "whiteInvert" : ""}`;
    a.href = s.u;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    if (s.c) a.style.setProperty("--brand-color", s.c);
    if (s.s) a.style.setProperty("--s", String(s.s));

    // icon
    const iconNode = buildIconNode(s);
    a.appendChild(iconNode);

    // label
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = s.n || "";
    a.appendChild(label);

    // group
    const r = s.r || 1;
    if (r === 1) ess.appendChild(a);
    else ext.appendChild(a);
  });
}

function setupMore() {
  const btn = $("toggleBtn");
  const area = $("moreArea");
  if (!btn || !area) return;

  const setOpen = (open) => {
    area.setAttribute("aria-hidden", open ? "false" : "true");
    area.style.display = open ? "block" : "none";
    btn.textContent = open ? "Less Icons" : "More Icons";
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  };

  let open = false;
  setOpen(open);
  btn.addEventListener("click", () => {
    open = !open;
    setOpen(open);
  });
}

/**
 * 可选：简单天气（无 key），用 Open-Meteo
 * 如果你不想要天气，把 initWeather() 整个删掉即可
 */
async function initWeather() {
  const temp = $("temp");
  const city = $("city");
  const cond = $("condition");
  if (!temp || !city) return;

  try {
    city.textContent = "Loading...";
    const pos = await new Promise((resolve, reject) => {
      if (!navigator.geolocation) reject(new Error("no geo"));
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: false,
        timeout: 6000,
        maximumAge: 300000,
      });
    });

    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    // 取当前温度
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m&timezone=auto`;

    const r = await fetch(url);
    const j = await r.json();

    const t = j?.current?.temperature_2m;
    temp.textContent = typeof t === "number" ? `${Math.round(t)}°C` : "--";

    // 城市名（反地理编码）
    const g =
      `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&language=en&count=1`;
    const rr = await fetch(g);
    const jj = await rr.json();
    const name = jj?.results?.[0]?.name || "Local";
    city.textContent = name;

    if (cond) cond.textContent = "";
  } catch (e) {
    // 失败就别挡页面
    city.textContent = "COFFEE";
    temp.textContent = "--";
    if (cond) cond.textContent = "";
  }
}

function init() {
  setClock();
  setGreet();
  setQuote();
  renderSites();
  setupMore();
  initWeather();

  setInterval(setClock, 1000 * 10);

  // 搜索框
  const form = $("searchForm");
  const q = $("q");
  if (form && q) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = (q.value || "").trim();
      if (!v) return;
      const url = "https://www.google.com/search?q=" + encodeURIComponent(v);
      window.open(url, "_blank", "noopener,noreferrer");
      q.value = "";
    });
  }
}

init();