/* Shemitah · interações leves, sem dependências */
(function () {
  "use strict";

  var doc = document;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- ano no rodapé ---- */
  doc.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---- header: estado "rolado" ---- */
  var header = doc.querySelector("[data-header]");
  var onScroll = function () {
    if (!header) return;
    header.toggleAttribute("data-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- menu mobile ---- */
  var toggle = doc.querySelector(".nav-toggle");
  var menu = doc.getElementById("menu-mobile");
  if (toggle && menu) {
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      menu.hidden = !open;
    };
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* ---- reveal ao rolar ---- */
  var revealTargets = doc.querySelectorAll(
    ".section-head, .card, .shot, .stat, .step, .about-list, .hero-copy, .hero-figure, .cta-inner"
  );
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    revealTargets.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (Math.min(i % 4, 3) * 60) + "ms";
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    revealTargets.forEach(function (el) { io.observe(el); });
  }

  /* ---- link de navegação ativo conforme a seção ---- */
  var navLinks = Array.prototype.slice.call(doc.querySelectorAll(".site-nav a[href^='#']"));
  var sections = navLinks
    .map(function (a) { return doc.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          var active = a.getAttribute("href") === "#" + entry.target.id;
          a.toggleAttribute("data-active", active);
          if (active) a.setAttribute("aria-current", "page");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();
