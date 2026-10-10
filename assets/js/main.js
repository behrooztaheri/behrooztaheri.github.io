/* =========================================================
   Site engine — builds every page from the files in /data.
   You normally do NOT need to edit this file.
   ========================================================= */
(function () {
  "use strict";
  var S = window.SITE || {};
  var PUBS = window.PUBLICATIONS || [];

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function storeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function storeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var ICONS = {
    scholar: '<path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Z"/><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82Z"/>',
    linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm7 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21H10V9.5Z"/>',
    researchgate: '<path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm9.9 4.2c-1.3 0-2.1.9-2.1 2.6v1.9c0 1.7.8 2.6 2.1 2.6 1.1 0 1.8-.6 2-1.6h-1.9v-1h3v.6c0 1.9-1.2 3-3.1 3-2 0-3.2-1.3-3.2-3.6V9.8c0-2.3 1.2-3.6 3.2-3.6 1.6 0 2.7.9 3 2.4h-1.2c-.2-.9-.9-1.4-1.8-1.4ZM6.4 9.3h1.9c1.2 0 1.9.7 1.9 1.7 0 .8-.4 1.3-1 1.6l1.3 2.6H9.4l-1.1-2.3H7.4v2.3h-1V9.3Zm1 .9v1.9h.9c.6 0 .9-.4.9-1s-.3-.9-.9-.9h-.9Z"/>',
    orcid: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM8.3 17H6.8V7.9h1.5V17Zm-.75-10.4a.95.95 0 1 1 0-1.9.95.95 0 0 1 0 1.9ZM10.2 7.9h3.6c3.3 0 4.8 2.4 4.8 4.55 0 2.35-1.85 4.55-4.8 4.55h-3.6V7.9Zm1.5 1.35v6.4h2c2.6 0 3.3-1.8 3.3-3.2 0-2.1-1.35-3.2-3.35-3.2H11.7Z"/>',
    github: '<path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/>',
    scopus: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm2.9 13.3c-.8.5-1.8.8-2.9.8-2.3 0-4.1-1.8-4.1-4.1S9.7 7.9 12 7.9c1.1 0 2 .3 2.8.8l-.7 1.3c-.6-.4-1.3-.6-2.1-.6a2.6 2.6 0 0 0 0 5.2c.8 0 1.6-.2 2.2-.6l.7 1.3Z"/>'
  };
  var LINE = {
    email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/>',
    pin: '<path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/>',
    download: '<path d="M12 3v12m0 0-5-5m5 5 5-5M4 21h16"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
    file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z"/><path d="M14 3v6h6"/>',
    check: '<path d="m5 12 5 5L20 7"/>',
    cap: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
    brief: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Z"/><path d="M20 17v4H6.5a2.5 2.5 0 0 1 0-5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    hvdc: '<path d="M4 9h16M4 15h16"/><path d="M7 5v4m10-4v4M7 15v4m10-4v4"/><path d="M11 12h2"/>',
    inverter: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M6 15c1.5-4 3-4 4.5 0s3 4 4.5 0M14 8h4M6 8h4"/>',
    ai: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/><circle cx="12" cy="12" r="2"/>',
    grid: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><circle cx="12" cy="9" r="2"/><path d="M7 6.5 10 8.5M17 6.5 14 8.5M12 11v5"/>',
    wave: '<path d="M2 12c2-6 4-6 6 0s4 6 6 0 4-6 6 0"/><path d="M2 20h20" opacity=".4"/>'
  };
  function icon(name) {
    if (ICONS[name]) return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + ICONS[name] + "</svg>";
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (LINE[name] || LINE.link) + "</svg>";
  }

  var TYPE_LABEL = { journal: "Journal", persian: "Journal (Persian)", conference: "Conference" };

  /* ---------- theme ---------- */
  function currentTheme() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  var saved = storeGet("theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);

  /* ---------- header & footer ---------- */
  function renderHeader() {
    var page = document.body.getAttribute("data-page");
    var links = (S.nav || []).map(function (n) {
      return '<li><a href="' + esc(n.href) + '"' + (n.page === page ? ' class="active" aria-current="page"' : "") + ">" + esc(n.label) + "</a></li>";
    }).join("");
    var h = document.createElement("header");
    h.className = "site-header";
    h.innerHTML =
      '<nav class="container nav" aria-label="Main">' +
      '<a class="brand" href="index.html"><img src="assets/img/avatar.jpg" alt="">' + esc(S.name) + "</a>" +
      '<ul class="nav-links" id="navLinks">' + links + "</ul>" +
      '<button class="icon-btn menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false">' + icon("menu") + "</button>" +
      '<button class="icon-btn" id="themeBtn" aria-label="Toggle dark mode"></button>' +
      "</nav>";
    document.body.insertBefore(h, document.body.firstChild);

    var tb = $("#themeBtn");
    function paint() { tb.innerHTML = icon(currentTheme() === "dark" ? "sun" : "moon"); }
    paint();
    tb.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      storeSet("theme", next); paint();
    });
    var mb = $("#menuBtn"), nl = $("#navLinks");
    mb.addEventListener("click", function () {
      var open = nl.classList.toggle("open");
      mb.setAttribute("aria-expanded", open);
      mb.innerHTML = icon(open ? "close" : "menu");
    });
  }

  function renderFooter() {
    var f = document.createElement("footer");
    f.className = "site-footer";
    f.innerHTML = '<div class="container footer-inner"><span>© ' + new Date().getFullYear() + " " + esc(S.name) + " · " + esc(S.location) +
      '</span><span class="footer-links">' + (S.links || []).filter(function (l) { return l.url; }).map(function (l) {
        return '<a href="' + esc(l.url) + '"' + (/^https?:/.test(l.url) ? ' target="_blank" rel="noopener"' : "") + ">" + esc(l.icon === "email" ? S.email : l.label) + "</a>";
      }).join(" · ") + "</span></div>";
    document.body.appendChild(f);
  }

  function socials() {
    return (S.links || []).filter(function (l) { return l.url; }).map(function (l) {
      var ext = /^https?:/.test(l.url) ? ' target="_blank" rel="noopener"' : "";
      return '<a href="' + esc(l.url) + '" aria-label="' + esc(l.label) + '" title="' + esc(l.label) + '"' + ext + ">" + icon(l.icon) + "</a>";
    }).join("");
  }

  function linkOf(iconName) {
    var l = (S.links || []).filter(function (x) { return x.icon === iconName && x.url; })[0];
    return l ? l.url : "";
  }
  function profileCards() {
    return (S.links || []).filter(function (l) { return l.url && l.icon !== "email"; }).map(function (l) {
      var shown = l.display || l.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\?.*$/, "").replace(/\/$/, "");
      return '<a class="card contact-card" style="text-decoration:none" href="' + esc(l.url) + '" target="_blank" rel="noopener"><div class="ic" style="margin:0">' + icon(l.icon) +
        '</div><div><div class="label">' + esc(l.label) + '</div><div class="value" style="color:var(--ink)">' + esc(shown) + "</div></div></a>";
    }).join("");
  }

  /* ---------- publications helpers ---------- */
  function boldMe(authors) {
    var a = esc(authors);
    return a.replace(/(B\.\s?Taheri|Behrooz Taheri)/g, "<b>$1</b>");
  }
  function sortedPubs() {
    return PUBS.slice().sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
  }
  function citation(p) {
    return p.authors + ', "' + p.title + '," ' + p.venue + ", " + p.year + "." + (p.doi ? " doi: " + p.doi : "");
  }
  function pubCard(p, hl) {
    var title = esc(p.title), venue = esc(p.venue), authors = boldMe(p.authors);
    if (hl) {
      var re = new RegExp("(" + hl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
      title = title.replace(re, "<mark>$1</mark>");
      venue = venue.replace(re, "<mark>$1</mark>");
    }
    var btns = '<span class="chip' + (p.type === "conference" ? " chip-accent" : "") + '">' + esc(TYPE_LABEL[p.type] || p.type) + "</span>";
    if (p.doi) btns += '<a class="pub-btn" target="_blank" rel="noopener" href="https://doi.org/' + esc(p.doi) + '">' + icon("link") + "DOI</a>";
    if (p.url) btns += '<a class="pub-btn" target="_blank" rel="noopener" href="' + esc(p.url) + '">' + icon("link") + "Link</a>";
    if (p.pdf) btns += '<a class="pub-btn" target="_blank" rel="noopener" href="' + esc(p.pdf) + '">' + icon("file") + "PDF</a>";
    btns += '<button class="pub-btn" data-cite="' + esc(citation(p)) + '">' + icon("copy") + "Cite</button>";
    return '<li class="pub" data-type="' + esc(p.type) + '"><div class="pub-title">' + title + '</div><div class="pub-authors">' + authors +
      '</div><div class="pub-venue">' + venue + (p.year ? ", " + esc(p.year) : "") + '</div><div class="pub-meta">' + btns + "</div></li>";
  }

  var toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.classList.remove("show"); }, 1800);
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-cite]");
    if (!b) return;
    var text = b.getAttribute("data-cite");
    function done() { toast("Citation copied to clipboard"); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else { fallbackCopy(text); done(); }
  });
  function fallbackCopy(t) {
    var ta = document.createElement("textarea"); ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} ta.remove();
  }

  /* =========================================================
     PAGES
     ========================================================= */
  var pages = {};

  pages.home = function (root) {
    var stats = (S.stats || []).map(function (s) {
      var v = s.value === "auto" ? PUBS.length : s.value;
      return '<div class="stat"><div class="num">' + esc(v) + '</div><div class="lbl">' + esc(s.label) + "</div></div>";
    }).join("");
    var interests = (S.interests || []).map(function (i) {
      return '<div class="card reveal"><div class="ic">' + icon(i.icon) + "</div><h3>" + esc(i.title) + "</h3><p>" + esc(i.text) + "</p></div>";
    }).join("");
    var skills = (S.skills || []).map(function (g) {
      return '<div class="skill-group reveal"><h3>' + esc(g.group) + "</h3>" + g.items.map(function (s) {
        return '<div class="skill"><div class="skill-top"><span>' + esc(s.name) + "</span><span>" + esc(s.level) + '/6</span></div><div class="bar"><i style="width:' + Math.min(100, (s.level / 6) * 100) + '%"></i></div></div>';
      }).join("") + "</div>";
    }).join("");
    var recent = sortedPubs().filter(function (p) { return p.type === "journal"; }).slice(0, 4).map(function (p) { return pubCard(p); }).join("");
    var edu = (window.EDUCATION || [])[0];
    var facts = [
      ["Current focus", "Power system protection & AI"],
      edu ? ["Latest degree", edu.degree.replace(" in Electrical Engineering", "") + ", " + edu.period.split("–").pop().trim()] : null,
      ["Affiliation", "Qazvin Islamic Azad University"],
      ["Membership", S.badge],
      ["Based in", S.location],
      ["Languages", (S.languages || []).map(function (l) { return l.name + " (" + l.level + ")"; }).join(", ")]
    ].filter(Boolean).map(function (f) { return "<li><span>" + esc(f[0]) + "</span><span>" + esc(f[1]) + "</span></li>"; }).join("");

    var nameParts = esc(S.name).split(" ");
    var nameHtml = nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") + " <em>" + nameParts[nameParts.length - 1] + "</em>" : nameParts[0];

    root.innerHTML =
      '<section class="hero"><div class="container hero-grid">' +
        '<div><div class="eyebrow"><span>Protection</span><span>HVDC</span><span>IBR</span><span>Artificial Intelligence</span></div>' +
        "<h1>" + nameHtml + "</h1>" +
        '<p class="role">' + esc(S.title) + "</p>" +
        '<p class="tagline">' + esc(S.tagline) + "</p>" +
        '<div class="hero-actions">' +
          '<a class="btn btn-primary" href="publications.html">' + icon("book") + "Publications</a>" +
          (S.cv ? '<a class="btn btn-ghost" href="' + esc(S.cv) + '" download>' + icon("download") + "Download CV</a>" : "") +
          '<a class="btn btn-ghost" href="contact.html">' + icon("email") + "Contact</a>" +
        "</div>" +
        '<div class="socials">' + socials() + "</div></div>" +
        '<div class="portrait"><div class="portrait-frame"><img src="assets/img/profile.jpg" alt="Portrait of ' + esc(S.name) + '" width="720" height="900"></div>' +
          (S.badge ? '<div class="portrait-badge"><span class="dot">IEEE</span>' + esc(S.badge) + "</div>" : "") + "</div>" +
      "</div>" +
      '<svg class="wave" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true"><path class="w2" d="' + wavePath(0) + '"/><path class="w1" d="' + wavePath(1) + '"/></svg>' +
      "</section>" +

      '<section class="container"><div class="stats reveal">' + stats + "</div></section>" +

      '<section class="section"><div class="container about-grid">' +
        '<div class="about-text reveal"><span class="kicker">About me</span><h2 style="font-size:clamp(1.7rem,3.2vw,2.3rem);margin-bottom:22px">Protecting the grid of the future</h2>' +
          (S.about || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>" +
        '<div class="reveal"><span class="kicker">At a glance</span><ul class="facts">' + facts + "</ul></div>" +
      "</div></section>" +

      '<section class="section section-alt"><div class="container">' +
        '<div class="section-head"><div><span class="kicker">Research</span><h2>Research interests</h2></div></div>' +
        '<div class="cards">' + interests + "</div></div></section>" +

      '<section class="section"><div class="container">' +
        '<div class="section-head"><div><span class="kicker">Latest work</span><h2>Recent journal papers</h2></div>' +
        '<a class="more-link" href="publications.html">All ' + PUBS.length + " publications " + icon("arrow").replace("<svg", '<svg width="16" height="16"') + "</a></div>" +
        '<ul class="pub-list pub-mini">' + recent + "</ul></div></section>" +

      '<section class="section section-alt"><div class="container">' +
        '<div class="section-head"><div><span class="kicker">Toolbox</span><h2>Skills</h2></div><span class="chip">Scale: 0 (awareness) → 6 (expert)</span></div>' +
        '<div class="skills-grid">' + skills + "</div></div></section>" +

      '<section class="section"><div class="container"><div class="cta reveal"><div><h2>Interested in collaborating?</h2><p>Research collaboration, reviewing, teaching or industrial projects — I\'d be glad to hear from you.</p></div>' +
        '<a class="btn btn-primary" href="contact.html">' + icon("email") + "Get in touch</a></div></div></section>";
  };

  /* a power-swing style waveform: steady sine with a disturbance in the middle */
  function wavePath(variant) {
    var d = "", W = 1200, mid = 60;
    for (var x = 0; x <= W; x += 6) {
      var t = x / W;
      var env = 1 + 1.6 * Math.exp(-Math.pow((t - 0.62) / 0.12, 2));
      var amp = (variant ? 16 : 10) * env;
      var y = mid + amp * Math.sin(x / (variant ? 22 : 30) + (variant ? 0 : 1.3));
      d += (x === 0 ? "M" : "L") + x + " " + y.toFixed(1) + " ";
    }
    return d;
  }

  pages.publications = function (root) {
    var counts = { all: PUBS.length, journal: 0, persian: 0, conference: 0 };
    PUBS.forEach(function (p) { counts[p.type] = (counts[p.type] || 0) + 1; });
    var filters = [["all", "All"], ["journal", "Journals"], ["persian", "Persian journals"], ["conference", "Conferences"]]
      .filter(function (f) { return counts[f[0]]; })
      .map(function (f, i) { return '<button class="filter' + (i === 0 ? " active" : "") + '" data-filter="' + f[0] + '">' + f[1] + '<span class="n">' + counts[f[0]] + "</span></button>"; }).join("");

    root.innerHTML =
      '<section class="page-hero"><div class="container"><span class="kicker">Research output</span><h1>Publications</h1>' +
      "<p>" + counts.journal + " international journal papers, " + counts.persian + " Persian journal papers and " + counts.conference +
      ' conference papers on power system protection, microgrids, HVDC and AI. Use the search or filters to browse; click <b>Cite</b> to copy a reference.</p>' +
      (linkOf("scholar") ? '<p style="margin-top:20px"><a class="btn btn-ghost" href="' + esc(linkOf("scholar")) + '" target="_blank" rel="noopener">' + icon("scholar") + "View on Google Scholar</a></p>" : "") +
      "</div></section>" +
      '<div class="container"><div class="pub-toolbar"><label class="search"><span class="sr-only">Search publications</span>' + icon("search") +
      '<input id="q" type="search" placeholder="Search by title, venue, co-author or year…" autocomplete="off"></label><div class="filters">' + filters + "</div></div>" +
      '<p class="pub-summary" id="summary"></p><div id="pubs"></div></div>';

    var state = { type: "all", q: "" };
    var params = new URLSearchParams(location.search);
    if (params.get("type") && counts[params.get("type")]) state.type = params.get("type");
    if (params.get("q")) { state.q = params.get("q"); $("#q").value = state.q; }

    function draw() {
      root.querySelectorAll(".filter").forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-filter") === state.type); });
      var q = state.q.trim().toLowerCase();
      var list = sortedPubs().filter(function (p) {
        if (state.type !== "all" && p.type !== state.type) return false;
        if (!q) return true;
        return (p.title + " " + p.venue + " " + p.authors + " " + p.year).toLowerCase().indexOf(q) !== -1;
      });
      $("#summary").textContent = "Showing " + list.length + " of " + PUBS.length + " publications";
      if (!list.length) { $("#pubs").innerHTML = '<div class="empty">No publications match your search.</div>'; return; }
      var groups = {}, years = [];
      list.forEach(function (p) { if (!groups[p.year]) { groups[p.year] = []; years.push(p.year); } groups[p.year].push(p); });
      $("#pubs").innerHTML = years.map(function (y) {
        return '<section class="year-group"><div class="year-label">' + esc(y) + '</div><ul class="pub-list">' +
          groups[y].map(function (p) { return pubCard(p, state.q.trim()); }).join("") + "</ul></section>";
      }).join("");
    }
    root.querySelectorAll(".filter").forEach(function (b) {
      b.addEventListener("click", function () { state.type = b.getAttribute("data-filter"); draw(); });
    });
    $("#q").addEventListener("input", function (e) { state.q = e.target.value; draw(); });
    draw();
  };

  pages.experience = function (root) {
    var edu = (window.EDUCATION || []).map(function (e) {
      return '<li class="tl-item reveal"><div class="tl-period">' + esc(e.period) + '</div><div class="tl-title">' + esc(e.degree) + '</div><div class="tl-org">' + esc(e.place) + "</div>" +
        (e.thesis ? '<div class="tl-text"><b>Thesis:</b> ' + esc(e.thesis) + (e.supervisor ? "<br><b>Supervisor:</b> " + esc(e.supervisor) : "") + "</div>" : "") + "</li>";
    }).join("");
    var work = (window.WORK || []).map(function (w) {
      return '<li class="tl-item reveal"><div class="tl-period">' + esc(w.period) + '</div><div class="tl-title">' + esc(w.role) + '</div><div class="tl-org">' + esc(w.org) + (w.location ? " · " + esc(w.location) : "") + "</div>" +
        (w.text ? '<div class="tl-text">' + esc(w.text) + "</div>" : "") + "</li>";
    }).join("");
    root.innerHTML =
      '<section class="page-hero"><div class="container"><span class="kicker">Career</span><h1>Experience &amp; Education</h1><p>A path that combines academic research, university teaching and hands-on industrial protection engineering.</p>' +
      (S.cv ? '<p style="margin-top:20px"><a class="btn btn-ghost" href="' + esc(S.cv) + '" download>' + icon("download") + "Download full CV (PDF)</a></p>" : "") + "</div></section>" +
      '<section class="section"><div class="container two-col">' +
      '<div><h2 class="col-title">' + icon("brief") + 'Work experience</h2><ul class="timeline">' + work + "</ul></div>" +
      '<div><h2 class="col-title">' + icon("cap") + 'Education</h2><ul class="timeline">' + edu + "</ul></div>" +
      "</div></section>";
  };

  pages.projects = function (root) {
    var cards = (window.PROJECTS || []).map(function (p) {
      return '<article class="card project reveal"><div class="yr">' + esc(p.year) + "</div><h3>" + esc(p.title) + "</h3><p>" + esc(p.text) + "</p>" +
        (p.tags && p.tags.length ? '<div class="tags">' + p.tags.map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") + "</div>" : "") +
        (p.url ? '<p style="margin-top:12px"><a class="more-link" href="' + esc(p.url) + '" target="_blank" rel="noopener">View project</a></p>' : "") + "</article>";
    }).join("");
    root.innerHTML =
      '<section class="page-hero"><div class="container"><span class="kicker">Industry &amp; R&amp;D</span><h1>Projects</h1><p>Industrial and research projects — from relay testing at power plants and dams to software for distribution network planning.</p></div></section>' +
      '<section class="section"><div class="container"><div class="project-grid">' + cards + "</div></div></section>";
  };

  pages.honors = function (root) {
    var honors = (window.HONORS || []).map(function (h) { return '<li class="reveal"><span class="yr">' + esc(h.year) + "</span><span>" + esc(h.title) + "</span></li>"; }).join("");
    var rev = (window.REVIEWER || []).map(function (r) { return "<li>" + icon("check") + "<span>" + esc(r) + "</span></li>"; }).join("");
    var certs = (window.CERTIFICATES || []).map(function (c) {
      return '<li class="reveal"><span class="yr">' + esc(c.year) + "</span><span><b>" + esc(c.title) + "</b> — " + esc(c.issuer) +
        (c.id ? '<br><span class="mono" style="font-size:.78rem;color:var(--muted)">ID: ' + esc(c.id) + "</span>" : "") +
        (c.url ? ' · <a href="' + esc(c.url) + '" target="_blank" rel="noopener">Verify</a>' : "") + "</span></li>";
    }).join("");
    root.innerHTML =
      '<section class="page-hero"><div class="container"><span class="kicker">Recognition</span><h1>Honors &amp; Service</h1><p>Awards, professional service to the research community, and certifications.</p></div></section>' +
      '<section class="section"><div class="container two-col">' +
        '<div><h2 class="col-title">' + icon("award") + 'Honors &amp; awards</h2><ul class="list-rows">' + honors + "</ul></div>" +
        '<div><h2 class="col-title">' + icon("file") + 'Licenses &amp; certifications</h2><ul class="list-rows">' + certs + "</ul></div>" +
      "</div></section>" +
      '<section class="section section-alt"><div class="container"><div class="section-head"><div><span class="kicker">Peer review</span><h2>Reviewer for</h2></div><span class="chip">' + (window.REVIEWER || []).length + " venues</span></div>" +
      '<ul class="review-grid">' + rev + "</ul></div></section>";
  };

  pages.contact = function (root) {
    var items = [
      ["email", "Email", '<a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a>"],
      S.phone ? ["phone", "Phone", '<a href="tel:' + esc(S.phone.replace(/\s/g, "")) + '">' + esc(S.phone) + "</a>"] : null,
      ["pin", "Location", esc(S.location)]
    ].filter(Boolean).map(function (i) {
      return '<div class="card contact-card"><div class="ic" style="margin:0">' + icon(i[0]) + '</div><div><div class="label">' + i[1] + '</div><div class="value">' + i[2] + "</div></div></div>";
    }).join("");
    var refs = (window.REFERENCES || []).map(function (r) {
      return '<div class="card"><div class="ic">' + icon("user") + "</div><h3>" + esc(r.name) + '</h3><p>' + esc(r.position) + ", " + esc(r.org) + '</p><p style="margin-top:8px"><a href="mailto:' + esc(r.email) + '">' + esc(r.email) + "</a></p></div>";
    }).join("");
    root.innerHTML =
      '<section class="page-hero"><div class="container"><span class="kicker">Say hello</span><h1>Contact</h1><p>For research collaboration, reviewing invitations, teaching or industrial projects, email is the best way to reach me.</p></div></section>' +
      '<section class="section"><div class="container"><div class="contact-grid">' + items + "</div>" +
      '<div style="margin-top:36px"><span class="kicker">Online profiles</span><div class="contact-grid" style="margin-top:12px">' + profileCards() + "</div></div></div></section>" +
      (refs ? '<section class="section section-alt"><div class="container"><div class="section-head"><div><span class="kicker">Academic</span><h2>References</h2></div></div><div class="cards" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">' + refs + "</div></div></section>" : "");
  };

  /* ---------- boot ---------- */
  function revealOnScroll() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    var page = document.body.getAttribute("data-page");
    var root = document.getElementById("app");
    if (root && pages[page]) pages[page](root);
    renderFooter();
    revealOnScroll();
  });
})();
