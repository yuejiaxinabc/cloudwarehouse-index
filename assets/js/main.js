/* ============================================================
   云仓官方项目站 — 交互脚本
   功能：移动端菜单、导航吸顶、滚动渐显、锚点高亮、回到顶部
   纯原生 JS，无依赖。
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 移动端汉堡菜单 ---------- */
  var toggle = document.getElementById("menuToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // 点击菜单项后自动收起
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 导航吸顶阴影 ---------- */
  var nav = document.getElementById("navbar");
  function onScrollNav() {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }

  /* ---------- 顶部滚动进度条 ---------- */
  var progressBar = document.getElementById("progressBar");
  function onScrollProgress() {
    if (!progressBar) return;
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    progressBar.style.width = pct + "%";
  }

  /* ---------- 回到顶部按钮 ---------- */
  var toTop = document.getElementById("toTop");
  function onScrollToTop() {
    if (!toTop) return;
    if (window.scrollY > 600) toTop.classList.add("show");
    else toTop.classList.remove("show");
  }

  window.addEventListener("scroll", function () {
    onScrollNav();
    onScrollProgress();
    onScrollToTop();
  });
  onScrollNav();
  onScrollProgress();
  onScrollToTop();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 滚动渐显（IntersectionObserver） ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- 数据指标数字滚动 ---------- */
  var counters = document.querySelectorAll(".counter");
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-target"), 10) || 0;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (el.firstChild && el.firstChild.nodeType === 3) el.firstChild.nodeValue = String(target);
      return;
    }
    var duration = 1200, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      if (el.firstChild && el.firstChild.nodeType === 3) el.firstChild.nodeValue = String(val);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if ("IntersectionObserver" in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (c) { cio.observe(c); });
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* ---------- 锚点当前区块高亮（scroll spy） ---------- */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-link");
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("id");
            navLinks.forEach(function (link) {
              var href = link.getAttribute("href") || "";
              link.classList.toggle("active", href === "#" + id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) {
      spy.observe(s);
    });
  }

  /* ---------- 当前年份（页脚） ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
