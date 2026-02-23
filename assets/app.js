// assets/app.js
import { ICON_BASE, FALLBACK_ICON, QUOTES, SITES } from "./data.js";

const $ = (id) => document.getElementById(id);

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function safeIconPath(name) {
  // 允许文件名有空格、中文等
  return ICON_BASE + encodeURIComponent(name);
}

function imgEl(file, cls) {
  const img = document.createElement("img");
  img.className = cls;
  img.src = safeIconPath(file);
  img.onerror = () => {
    img.onerror = null;
    img.src = safeIconPath(FALLBACK_ICON);
  };
  return img;
}

function setBrandColor(el, c) {
  if (c) el.style.setProperty("--brand-color", c);
}

function renderSites() {
  const ess = $("ess");
  const ext = $("ext");
  if (!ess || !ext) return;

  ess.innerHTML = "";
  ext.innerHTML = "";

  SITES.forEach((s) => {
    const a = document.createElement("a");
    a.className = `item ${s.whiteInvert ? "white-invert" : ""}`;
    a.href = s.u;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    setBrandColor(a, s.c);
    if (s.s) a.style.setProperty("--s", String(s.s));

    const icon = document.createElement("div");
    icon.className = `icon ${s.gemini ? "gemini" : ""}`;

    // === 关键：统一 class 结构，让 CSS 能命中 ===
    // 1) Gemini：双层(g0灰 + g1彩) 或者 fallback
    if (s.gemini) {
      // 推荐：你 icons 里放两张：["gemini.svg","gemini-color.svg"]
      const base = (s.icons && s.icons[0]) ? s.icons[0] : FALLBACK_ICON;
      const active = (s.icons && s.icons[1]) ? s.icons[1] : base;

      const g0 = imgEl(base, "g0 base");
      const g1 = imgEl(active, "g1 active");

      icon.appendChild(g0);
      icon.appendChild(g1);
    } else {
      // 2) 普通：单图 => single（默认灰，唤醒变彩）
      //    双图 => base/active（默认显示 base，唤醒切 active）
      const icons = (s.icons && s.icons.length) ? s.icons : [FALLBACK_ICON];

      if (icons.length >= 2) {
        icon.appendChild(imgEl(icons[0], "base"));
        icon.appendChild(imgEl(icons[1], "active"));
      } else {
        icon.appendChild(imgEl(icons[0], "single"));
      }
    }

    const label = document.createElement("div");
    label.className = "label";
    label.textContent = s.n;

    a.appendChild(icon);
    a.appendChild(label);

    // ✅ iPhone 触摸：点一下“唤醒”但不立刻跳走（再点才打开）
    // - 第一次 touch：只做 awake 效果
    // - 第二次 touch：才真正打开链接
    let armed = false;
    a.addEventListener("touchstart", (e) => {
      if (!armed) {
        e.preventDefault();
        armed = true;
        a.classList.add("awake");

        // 1.2秒后自动取消
        setTimeout(() => {
          armed = false;
          a.classList.remove("awake");
        }, 1200);
      }
    }, { passive: false });

    // 桌面鼠标离开，取消 awake
    a.addEventListener("mouseleave", () => {
      a.classList.remove("awake");
    });

    // 分类渲染
    const bucket = (s.r === 1) ? ess : ext;
    bucket.appendChild(a);
  });
}

function setupMore() {
  const btn = $("toggleBtn");
  const area = $("moreArea");
  if (!btn || !area) return;

  btn.addEventListener("click", () => {
    const hidden = area.getAttribute("aria-hidden") === "true";
    area.setAttribute("aria-hidden", hidden ? "false" : "true");
    btn.textContent = hidden ? "Less Icons" : "More Icons";
  });
}

function setupSearch() {
  const form = $("searchForm");
  const q = $("q");
  if (!form || !q) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const kw = q.value.trim();
    if (!kw) return;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(kw)}`, "_blank", "noopener");
  });
}

function setupClock() {
  const clock = $("clock");
  if (!clock) return;

  const tick = () => {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    clock.textContent = `${hh}:${mm}`;
  };

  tick();
  setInterval(tick, 1000 * 10);
}

function setupQuote() {
  const qt = $("quoteText");
  const qa = $("quoteAuthor");
  if (!qt || !qa) return;

  const { t, a } = pick(QUOTES);
  qt.textContent = `"${t}"`;
  qa.textContent = a.toUpperCase();
}

function applyThemeFromTime() {
  const h = new Date().getHours();
  // 夜间：19:00-06:59
  const night = (h >= 19 || h <= 6);
  document.body.classList.toggle("theme-night", night);
}

function boot() {
  applyThemeFromTime();
  setupClock();
  setupQuote();
  setupSearch();
  renderSites();
  setupMore();
}

document.addEventListener("DOMContentLoaded", boot);