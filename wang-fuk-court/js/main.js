/* =====================================================================
   main.js: behavior for every page.
   Content lives in data.js, memorial-data.js, story-data.js and
   who-failed-data.js. This file turns it into HTML.

   HOW IT WORKS
   Every page has <body data-root="..." data-page="...">.
     data-root: path back to the site root ("" on index.html, "../" in /system/)
     data-page: "story", "subpage" or "sources"
   Shared pieces (header, 168 button, memorial, footer) are built on every page.
   Story-only pieces (hero state, scrollama, timeline...) are built only when their
   container exists, so this one file is safe to load everywhere.

   SECTIONS
   1. Helpers
   2. Header + nav + 168 button
   3. Footer (with the Theoretical framework TheoryCard)
   4. Memorial overlay (window.openMemorial)
   5. Hero state (nav hidden on the hero) + data-cite links
   6. Tower progress indicator
   7. Statements (Scrollama)
   8. Timeline (Part 0, key events + "Show full timeline")
   9. Part 1: entry cards, TheoryCard component, Part 2 lead
   10. Cross-section (Part 2), chain + node panel, owners, closing (Part 3)
   11. Part 3: vote, 2x2 chart, who paid · Part 4: scorecard, trade-off
   12. Start everything
   ===================================================================== */


/* ---------------------------------------------------------------------
   1. HELPERS
   --------------------------------------------------------------------- */
const ROOT = document.body.dataset.root || "";   // "" or "../"
const PAGE = document.body.dataset.page || "";

// true if the visitor asked their OS for less motion
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Shortcuts for querying the page
const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));

// In-text citation, site-wide style: (Author, Year; Author, Year)
// Each label links to its entry on sources.html. Labels live in js/citations.js.
//   citeHTML(["ha-2025-figures"])
//   citeHTML(["hkfp-2025-timeline", "wfc-archive"])
//   citeHTML([{ id: "hk01-2025-census", suffix: ", citing the 2021 Census" }])
function citeHTML(refs) {
  if (!refs || !refs.length) return "";
  const labels = window.CITATIONS || {};
  const links = refs.map(ref => {
    const id = typeof ref === "string" ? ref : ref.id;
    const suffix = (ref && ref.suffix) || "";
    if (!labels[id]) console.error(`[cite] Unknown citation id "${id}". Add it to js/citations.js and sources.html.`);
    return `<a href="${ROOT}sources.html#${encodeURIComponent(id)}">${esc((labels[id] || id) + suffix)}</a>`;
  });
  return `<span class="cite">(${links.join("; ")})</span>`;
}

// Create an SVG element (SVG needs its own "namespace", so createElement won't work)
function svgEl(tag, attrs = {}) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}


/* ---------------------------------------------------------------------
   2. HEADER + NAV + 168 BUTTON
   Edit the nav here; it updates on every page. On index.html the links are
   plain anchors (#fire); on subpages they point back to ../index.html#fire.
   Below 1080px wide the nav folds into a "Menu" button.
   --------------------------------------------------------------------- */
const NAV = [
  { label: "The fire",    id: "fire" },
  { label: "Responsible", id: "responsible" },
  { label: "Power",       id: "power" },
  { label: "The gap",     id: "gap" },
  { label: "Realigning?", id: "realign" },
];

function buildHeader() {
  const slot = $("#site-header");
  if (!slot) return;

  const isStory = PAGE === "story";
  const isSources = PAGE === "sources";
  watchHero();   // hides the nav on the index hero (set before the header appears)
  const base = isStory ? "" : `${ROOT}index.html`;
  const links = NAV.map(n => `<li><a href="${base}#${n.id}" data-section="${n.id}">${esc(n.label)}</a></li>`).join("")
    + `<li><a href="${ROOT}sources.html" ${isSources ? 'aria-current="page"' : ""}>Sources</a></li>`;

  slot.outerHTML = `
    <header class="site-header" id="header">
      <a class="site-title" href="${ROOT}index.html">Ownership Without Power</a>
      <button class="nav-toggle" id="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav class="site-nav" id="site-nav" aria-label="Main"><ul>${links}</ul></nav>
    </header>
    <button class="btn-168" id="btn-168" aria-haspopup="dialog" aria-controls="memorial">
      168<span class="sr-only"> people who died: open memorial</span>
    </button>`;

  // Give the header a solid background once you scroll past the top
  const header = $("#header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ----- Phone / tablet menu -----
  const toggle = $("#nav-toggle");
  const nav = $("#site-nav");
  const setOpen = open => {
    toggle.setAttribute("aria-expanded", String(open));
    header.classList.toggle("nav-open", open);
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && header.classList.contains("nav-open")) { setOpen(false); toggle.focus(); }
  });

  // ----- On index.html, mark the nav link for the part you are reading -----
  if (isStory && "IntersectionObserver" in window) {
    const navLinks = $$("a[data-section]", nav);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(a => {
          if (a.dataset.section === entry.target.id) a.setAttribute("aria-current", "location");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });   // a thin band across the middle of the screen
    NAV.forEach(n => { const s = document.getElementById(n.id); if (s) observer.observe(s); });
  }
}


/* ---------------------------------------------------------------------
   3. FOOTER (text comes from FOOTER and THEORY in data.js)
   --------------------------------------------------------------------- */
function buildFooter() {
  const slot = $("#site-footer");
  if (!slot) return;
  const f = typeof FOOTER !== "undefined" ? FOOTER : {};
  const t = typeof THEORY !== "undefined" ? THEORY : null;

  slot.outerHTML = `
    <footer class="site-footer">
      <div class="container">
        <section class="footer-methods" aria-labelledby="footer-methods-title">
          <h2 id="footer-methods-title">Methods</h2>
          <p>${esc(f.methods || "[TODO: methods]")}</p>
        </section>
        ${t ? `<div class="footer-theory">${theoryCardHTML(t.methods, { title: t.methodsTitle, headingTag: "h2" })}</div>` : ""}
        <div class="footer-grid footer-grid--3">
          <section>
            <h2>About</h2>
            <p>${esc(f.about || "[TODO: about]")}</p>
          </section>
          <section>
            <h2>Ethics</h2>
            <p>${esc(f.ethics || "[TODO: ethics note]")}</p>
          </section>
          <section>
            <h2>Sources</h2>
            <p>Every claim on this site is cited.</p>
            <p><a href="${ROOT}sources.html">See all sources →</a></p>
          </section>
        </div>
        <div class="footer-bottom">
          <span>Ownership Without Power: The Wang Fuk Court Fire</span>
          <span>[TODO: year / license / contact]</span>
        </div>
      </div>
    </footer>`;
}


/* ---------------------------------------------------------------------
   4. MEMORIAL OVERLAY
   Data: window.MEMORIAL from js/memorial-data.js
     MEMORIAL.victims: 168 × { n, name, nameZh, storyId, check }  (official-list order; `check` is never shown)
     MEMORIAL.stories: [{ id, title, people[], role, nationality, story,
                          sources[{label,url}], argumentNote? }]
     MEMORIAL.sources.officialList / officialListZh: links to the official lists
   Rules: white and grey only (no orange), and never show a null field.
   Close with the X button or Escape. Arrow keys move between squares.
   --------------------------------------------------------------------- */

// Escape text before putting it into HTML (names and stories are real-world
// text and may contain characters like < or &)
function esc(value) {
  return String(value).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// true if a field should be shown (not null, undefined, empty string or empty list)
function present(value) {
  if (value === null || value === undefined) return false;
  if (Array.isArray(value)) return value.some(present);
  return String(value).trim() !== "";
}

// Only allow normal web links in href attributes
function safeUrl(url) {
  return /^https?:\/\//i.test(String(url || "").trim()) ? String(url).trim() : null;
}

// A link may be given as a plain URL string or as { label, url }
function linkHTML(link, fallbackLabel) {
  const url = safeUrl(typeof link === "string" ? link : link && link.url);
  if (!url) return "";
  const label = (link && link.label) || fallbackLabel || url;
  return `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}<span class="sr-only"> (opens in a new tab)</span> ↗</a>`;
}

// HTML for one story. Used both in the square's card and in "Their stories".
// Every field is skipped when it is null/empty.
function storyHTML(s, headingTag = "h4") {
  if (!s) return "";
  // people[] may hold plain names or objects with a name
  const people = (s.people || [])
    .map(p => (p && typeof p === "object" ? p.name : p))
    .filter(present);
  const sources = (s.sources || []).map(src => linkHTML(src)).filter(Boolean);

  const rows = [];
  if (people.length) rows.push(`<dt>People</dt><dd>${people.map(esc).join(", ")}</dd>`);
  if (present(s.role)) rows.push(`<dt>Role</dt><dd>${esc(s.role)}</dd>`);
  if (present(s.nationality)) rows.push(`<dt>Nationality</dt><dd>${esc(s.nationality)}</dd>`);

  return `
    ${present(s.title) ? `<${headingTag} class="story__title">${esc(s.title)}</${headingTag}>` : ""}
    ${rows.length ? `<dl class="story__meta">${rows.join("")}</dl>` : ""}
    ${present(s.story) ? `<p class="story__text">${esc(s.story)}</p>` : ""}
    ${sources.length ? `<ul class="story__sources">${sources.map(a => `<li>${a}</li>`).join("")}</ul>` : ""}`;
  // argumentNote is for your own analysis, so it is not shown to readers.
}

// Finds the memorial data. The ONLY source is js/memorial-data.js.
// (Also accepts `const MEMORIAL = ...`, which does not create window.MEMORIAL.)
function getMemorialData() {
  if (window.MEMORIAL) return window.MEMORIAL;
  if (typeof MEMORIAL !== "undefined") return MEMORIAL; // eslint-disable-line no-undef
  console.error(
    "[memorial] window.MEMORIAL is undefined. Check that js/memorial-data.js is saved, " +
    "defines window.MEMORIAL = { victims, stories, sources }, has no syntax errors, " +
    "and is loaded BEFORE main.js (subpages: ../js/memorial-data.js)."
  );
  return null;
}

function buildMemorial() {
  const M = getMemorialData();
  const ok = !!(M && Array.isArray(M.victims));
  if (M && !ok) console.error("[memorial] MEMORIAL.victims is missing or is not an array.");
  if (ok && M.victims.length !== 168) {
    console.warn(`[memorial] Expected 168 victims, found ${M.victims.length}.`);
  }

  const stories = M && Array.isArray(M.stories) ? M.stories : [];
  const storyById = new Map(stories.map(s => [s.id, s]));

  // One square per victim, straight from the data, in official-list order.
  // The `check` field is for your own verification and is never displayed.
  const victims = (ok ? M.victims : []).map((v, i) => ({
    n: v.n ?? i + 1,
    name: present(v.name) ? v.name : null,
    nameZh: present(v.nameZh) ? v.nameZh : null,   // only ever taken from the data, never generated
    storyId: v.storyId ?? null,
  }));
  const NO_NAME = "Name to be added";

  // Text used in a square's accessible label: "English name (中文名)"
  function labelName(v) {
    if (v.name && v.nameZh) return `${v.name} (${v.nameZh})`;
    return v.name || v.nameZh || NO_NAME;
  }

  // Credit both official lists (English + Chinese); each is skipped if missing
  const S = (M && M.sources) || {};
  const creditLinks = [
    linkHTML(S.officialList, "English"),
    S.officialListZh ? `<span lang="zh-Hant">${linkHTML(S.officialListZh, "中文")}</span>` : "",
  ].filter(Boolean);
  const creditHTML = creditLinks.length
    ? `<p class="memorial__credit">Names and order follow the official list${creditLinks.length > 1 ? "s" : ""}: ${creditLinks.join(" · ")}</p>`
    : "";

  // ----- Overlay markup -----
  const overlay = document.createElement("div");
  overlay.className = "memorial";
  overlay.id = "memorial";
  overlay.hidden = true;
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "memorial-title");
  overlay.innerHTML = `
    <button class="memorial__close" id="memorial-close" aria-label="Close memorial">×</button>
    <div class="memorial__inner">
      <h2 class="memorial__title" id="memorial-title">168</h2>
      <p class="memorial__intro">168 people died in the Wang Fuk Court fire on 26 November 2025.</p>
      ${creditHTML}

      <p class="sr-only" id="memorial-help">Use the arrow keys to move between people. Press Enter to read more.</p>
      <div class="memorial__grid" id="memorial-grid" role="group" aria-label="The 168 people who died" aria-describedby="memorial-help"></div>
      ${ok ? "" : `<p class="memorial__note">The list of names could not be loaded.</p>`}
      <p class="memorial__note">Names are taken from court documents made public on 10 June 2026. The government initially withheld them at families’ request.</p>
      <p class="memorial__legend"><span class="memorial__legend-sq" aria-hidden="true"></span> An outlined square has a story to read.</p>

      ${stories.length ? `
        <section class="memorial__stories" aria-labelledby="stories-title">
          <h3 id="stories-title">Their stories</h3>
          <div class="memorial__story-list">
            ${stories.map(s => `<article class="story-card">${storyHTML(s, "h4")}</article>`).join("")}
          </div>
        </section>` : ""}
    </div>

    <div class="memorial__card" id="memorial-card" hidden role="region" aria-labelledby="memorial-card-name">
      <button class="memorial__card-close" id="memorial-card-close" aria-label="Close card">×</button>
      <div id="memorial-card-body"></div>
    </div>`;
  document.body.appendChild(overlay);

  // ----- 168 squares -----
  // "Roving tabindex": only one square is in the Tab order at a time; the
  // arrow keys move between squares. Tab moves on to the next part of the page.
  const grid = $("#memorial-grid");
  victims.forEach((v, i) => {
    const btn = document.createElement("button");
    btn.className = "memorial__sq" + (v.storyId && storyById.has(v.storyId) ? " has-story" : "");
    btn.dataset.index = i;
    btn.dataset.n = v.n;                      // CSS shows this number on hover
    btn.tabIndex = i === 0 ? 0 : -1;
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "memorial-card");
    btn.setAttribute("aria-label",
      `${v.n}. ${labelName(v)}${btn.classList.contains("has-story") ? ", has a story" : ""}`);
    grid.appendChild(btn);
  });
  const squares = $$(".memorial__sq", grid);

  const card = $("#memorial-card");
  const cardBody = $("#memorial-card-body");
  const openBtn = $("#btn-168");
  let activeSquare = null;

  // ----- Card -----
  function showCard(square) {
    if (activeSquare) activeSquare.setAttribute("aria-expanded", "false");
    activeSquare = square;
    square.setAttribute("aria-expanded", "true");

    const v = victims[square.dataset.index];
    const story = v.storyId ? storyById.get(v.storyId) : null;
    cardBody.innerHTML = `
      <p class="memorial__card-n">${esc(v.n)}</p>
      <h3 id="memorial-card-name" tabindex="-1">
        ${v.name
          ? esc(v.name)
          : v.nameZh ? `<span lang="zh-Hant">${esc(v.nameZh)}</span>` : NO_NAME}
        ${v.name && v.nameZh
          ? `<span class="memorial__card-zh" lang="zh-Hant">${esc(v.nameZh)}</span>`
          : ""}
      </h3>
      ${story ? `<div class="memorial__card-story">${storyHTML(story, "h4")}</div>`
              : `<p class="memorial__remembered">Remembered</p>`}`;
    card.hidden = false;
    $("#memorial-card-name").focus();   // move focus into the card so its links are reachable
  }

  function hideCard() {
    if (card.hidden) return;
    card.hidden = true;
    if (activeSquare) {
      activeSquare.setAttribute("aria-expanded", "false");
      activeSquare.focus();             // return keyboard focus to the square
      activeSquare = null;
    }
  }

  // ----- Open / close the overlay -----
  // The rest of the page becomes "inert" (not clickable/focusable) while open
  const background = () => $$("body > header, body > main, body > footer, .btn-168, .tower-progress");

  let returnFocus = null;                 // the button that opened the memorial
  function open(from) {
    returnFocus = from || openBtn;
    overlay.hidden = false;
    overlay.scrollTop = 0;
    document.body.classList.add("no-scroll");
    background().forEach(el => (el.inert = true));
    $("#memorial-close").focus();
  }

  function close() {
    hideCard();
    overlay.hidden = true;
    document.body.classList.remove("no-scroll");
    background().forEach(el => (el.inert = false));
    returnFocus && returnFocus.focus();   // back to the 168 button (or "Open the memorial")
  }

  openBtn && openBtn.addEventListener("click", () => open(openBtn));
  window.openMemorial = open;             // used by the "Who paid" card
  $("#memorial-close").addEventListener("click", close);
  $("#memorial-card-close").addEventListener("click", hideCard);
  grid.addEventListener("click", e => {
    const sq = e.target.closest(".memorial__sq");
    if (sq) showCard(sq);                 // Enter and Space also "click" a button
  });

  // ----- Arrow keys inside the grid -----
  // Columns are read from the CSS, so this works at 14 (desktop) or 12 (phone).
  function columns() {
    return getComputedStyle(grid).gridTemplateColumns.split(" ").length;
  }
  function moveTo(i) {
    i = Math.max(0, Math.min(squares.length - 1, i));
    squares.forEach(s => (s.tabIndex = -1));
    squares[i].tabIndex = 0;
    squares[i].focus();
  }
  grid.addEventListener("keydown", e => {
    const sq = e.target.closest(".memorial__sq");
    if (!sq) return;
    const i = Number(sq.dataset.index);
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: columns(), ArrowUp: -columns() }[e.key];
    if (step !== undefined) { e.preventDefault(); moveTo(i + step); }
    else if (e.key === "Home") { e.preventDefault(); moveTo(0); }
    else if (e.key === "End") { e.preventDefault(); moveTo(squares.length - 1); }
  });

  // Escape closes the card first, then the whole overlay
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape" || overlay.hidden) return;
    if (!card.hidden) hideCard();
    else close();
  });
}


/* ---------------------------------------------------------------------
   5. HERO STATE (index.html only)
   While the research question fills the screen, <body> has class "on-hero":
   CSS hides the nav and tower indicator and shrinks the 168 button.
   They fade in once you scroll past the hero. Keyboard focus on the nav
   still shows it (see .site-header:focus-within in style.css).
   --------------------------------------------------------------------- */
function watchHero() {
  const hero = $("#hero");
  if (!hero) return;
  let heroH = hero.offsetHeight;
  const update = () => document.body.classList.toggle("on-hero", window.scrollY < heroH * 0.6);
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", () => { heroH = hero.offsetHeight; update(); });
  update();
}

// Fill <... data-cite="id1,id2"> with (Author, Year) links (statements in #fire)
function fillDataCites() {
  $$("[data-cite]").forEach(el => {
    const ids = el.dataset.cite.split(",").map(x => x.trim()).filter(Boolean);
    if (ids.length) el.innerHTML = citeHTML(ids);
  });
}


/* ---------------------------------------------------------------------
   6. TOWER PROGRESS: 31 floors that fill as you scroll the story
   --------------------------------------------------------------------- */
function buildTowerProgress() {
  const tower = $("#tower-progress");
  if (!tower) return;

  const FLOORS = 31;
  for (let i = 0; i < FLOORS; i++) {
    const f = document.createElement("div");
    f.className = "floor";
    tower.appendChild(f);   // flex-direction: column-reverse puts floor 1 at the bottom
  }
  const floors = $$(".floor", tower);

  let ticking = false;
  function update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    const filled = Math.round(progress * FLOORS);
    floors.forEach((f, i) => f.classList.toggle("is-filled", i < filled));
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}


/* ---------------------------------------------------------------------
   7. STATEMENTS + generic Scrollama setup
   Scrollama calls onStepEnter when a step crosses the middle of the screen.
   If the Scrollama CDN fails to load, everything is simply shown.
   --------------------------------------------------------------------- */
function setupScrolly(selector, { offset = 0.55 } = {}) {
  const steps = $$(selector);
  if (!steps.length) return;

  // Fallback: no Scrollama or reduced motion → show all
  if (typeof scrollama === "undefined" || REDUCED_MOTION) {
    steps.forEach(s => s.classList.add("is-active", "was-seen"));
    return;
  }

  const scroller = scrollama();
  scroller
    .setup({ step: selector, offset })
    .onStepEnter(({ element }) => element.classList.add("is-active", "was-seen"))
    // "was-seen" stays after you scroll past, so timeline nodes don't fade back out
    .onStepExit(({ element }) => element.classList.remove("is-active"));
  // (scrollama v3 handles window resizing on its own)
}


/* ---------------------------------------------------------------------
   8. TIMELINE (data: TIMELINE, TIMELINE_PHASES, TIMELINE_TOGGLE in data.js)
   Events with key: false are hidden until "Show full timeline".
   --------------------------------------------------------------------- */
function buildTimeline() {
  const root = $("#timeline-root");
  if (!root || typeof TIMELINE === "undefined") return;

  // Returns the HTML for an optional media slot
  function mediaHTML(m) {
    if (!m) return "";
    let inner;
    if (m.type === "youtube") {
      inner = m.id
        ? `<iframe src="https://www.youtube-nocookie.com/embed/${esc(m.id)}" title="${esc(m.title || "Video")}" loading="lazy"
             allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        : `<div class="placeholder">[TODO: YouTube video id]</div>`;
    } else {
      inner = m.src
        ? `<img src="${ROOT}${esc(m.src)}" alt="${esc(m.alt || "")}" loading="lazy">`
        : `<div class="placeholder">[TODO: image] alt: ${esc(m.alt || "")}</div>`;
    }
    return `
      <details class="tl-media">
        <summary>${m.type === "youtube" ? "Watch video" : "View image"}</summary>
        <figure class="media-frame">${inner}${m.caption ? `<figcaption class="muted">${esc(m.caption)}</figcaption>` : ""}</figure>
      </details>`;
  }

  function linksHTML(links) {
    if (!links || !links.length) return "";
    return `<ul class="tl-links">${links
      .map(l => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a></li>`)
      .join("")}</ul>`;
  }

  // One group per phase, in this order
  for (const phase of ["before", "during", "after"]) {
    const events = TIMELINE.filter(e => e.phase === phase);
    if (!events.length) continue;

    const group = document.createElement("div");
    group.className = `timeline-phase phase-${phase}`;
    group.innerHTML = `
      <h3 class="timeline-phase__label">${esc(TIMELINE_PHASES[phase] || phase)}</h3>
      <ol class="timeline-list">
        ${events.map(e => `
          <li class="tl-node${e.key === false ? " tl-node--extra" : ""}"${e.key === false ? " hidden" : ""}>
            <time class="tl-date">${esc(e.date)}</time>
            ${e.title ? `<h4 class="tl-title">${esc(e.title)}</h4>` : ""}
            <p class="tl-text${e.title ? "" : " tl-text--main"}">${esc(e.text)}${e.cite && e.cite.length ? " " + citeHTML(e.cite) : ""}</p>
            ${mediaHTML(e.media)}
            ${linksHTML(e.links)}
          </li>`).join("")}
      </ol>`;
    root.appendChild(group);
  }

  // "Show full timeline" toggle (only if some events are hidden)
  const extras = $$(".tl-node--extra", root);
  if (!extras.length) return;
  const T = typeof TIMELINE_TOGGLE !== "undefined" ? TIMELINE_TOGGLE : { more: "Show full timeline", less: "Show key events only" };
  root.insertAdjacentHTML("afterend", `
    <button type="button" class="pill tl-toggle" id="tl-toggle" aria-expanded="false" aria-controls="timeline-root">
      ${esc(T.more)} <span class="tl-toggle__count">(${TIMELINE.length} events)</span>
    </button>`);
  const btn = $("#tl-toggle");
  btn.addEventListener("click", () => {
    const show = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", String(show));
    extras.forEach(li => {
      li.hidden = !show;
      li.classList.add("is-active", "was-seen");   // shown at once, no scroll fade
    });
    btn.innerHTML = show
      ? esc(T.less)
      : `${esc(T.more)} <span class="tl-toggle__count">(${TIMELINE.length} events)</span>`;
  });
}


/* ---------------------------------------------------------------------
   9. PART 1: WHO WAS MADE RESPONSIBLE (data: STORY.responsible)
      + the TheoryCard component and the Part 2 lead line
   --------------------------------------------------------------------- */

// A small green tower drawing (used on the entry cards)
function towerSVG(floors) {
  // Each floor is 6 units tall; 2 windows per floor
  const W = 40, FH = 6, H = floors * FH + 8;
  const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, "aria-hidden": "true", focusable: "false" });
  svg.appendChild(svgEl("rect", { class: "tower-body", x: 1, y: 1, width: W - 2, height: H - 2, rx: 1 }));
  for (let f = 0; f < floors; f++) {
    const y = H - 6 - f * FH;
    svg.appendChild(svgEl("rect", { class: "tower-win", x: 9, y, width: 7, height: 2.5 }));
    svg.appendChild(svgEl("rect", { class: "tower-win", x: 24, y, width: 7, height: 2.5 }));
  }
  return svg;
}

function buildResponsible() {
  const S = window.STORY;
  if (!S) return;

  const wrap = $("#entry-cards");
  if (wrap) {
    const R = S.responsible;
    // The whole card is clickable (stretched link), but the citation links stay clickable too.
    wrap.innerHTML = R.cards.map(c => `
      <article class="entry-card">
        <div class="entry-card__icon"></div>
        <div class="entry-card__body">
          <h3 class="entry-card__label"><a class="entry-card__link" href="${ROOT}${esc(c.href)}">${esc(c.label)}</a></h3>
          <p class="entry-card__takeaway">${esc(c.takeaway)} ${citeHTML(c.cite)}</p>
          <p class="entry-card__go" aria-hidden="true">${esc(R.cardCta)} →</p>
        </div>
      </article>`).join("");
    $$(".entry-card__icon", wrap).forEach(el => el.appendChild(towerSVG(31)));
    const closing = $("#responsible-closing");
    if (closing) closing.textContent = R.closing;
  }

  const lead = $("#power-lead");
  if (lead && S.power) lead.textContent = S.power.lead;
}

// Text with inline citations: "… out {cite:garland-1996,rose-1996}." → (Garland, 1996; Rose, 1996)
function richHTML(text) {
  return esc(text).replace(/\{cite:([^}]+)\}/g, (_, ids) => citeHTML(ids.split(",").map(s => s.trim())));
}

// TheoryCard: reusable grey-bordered card with the label "Theory: responsibilization".
// Used 4 times: #responsible, #gap, #realign (via <div data-theory="...">) and the footer.
function theoryCardHTML(text, { title = "", headingTag = "h3" } = {}) {
  const label = typeof THEORY !== "undefined" ? THEORY.label : "Theory";
  return `
    <aside class="theory-card" aria-label="${esc(title || label)}">
      <p class="theory-card__label">${esc(label)}</p>
      ${title ? `<${headingTag} class="theory-card__title">${esc(title)}</${headingTag}>` : ""}
      <p class="theory-card__text">${richHTML(text)}</p>
    </aside>`;
}

function renderTheoryCards() {
  if (typeof THEORY === "undefined") return;
  $$("[data-theory]").forEach(slot => {
    const text = THEORY[slot.dataset.theory];
    if (!text) { console.error(`[theory] No THEORY.${slot.dataset.theory} in js/data.js`); return; }
    slot.outerHTML = theoryCardHTML(text);
  });
}


/* ---------------------------------------------------------------------
   10. WHO FAILED
   Data: window.WHO_FAILED in js/who-failed-data.js (all words + citations).
     10a. Intro (heading + lead)
     10b. How it spread: building cross-section with hotspots + spread animation
     10c. The chain of responsibility: layer pills, 3 tiers, node panel
     10d. The owners in the middle
     10e. Closing line
   --------------------------------------------------------------------- */
function buildWhoFailed() {
  if (!$("#cross-section") && !$("#chain")) return;
  const W = window.WHO_FAILED;
  if (!W) {
    console.error("[who-failed] window.WHO_FAILED is undefined. Check that js/who-failed-data.js loads before js/main.js.");
    return;
  }
  // 10a. Intro (no longer on index.html; kept in case the container comes back)
  const intro = $("#wf-intro");
  if (intro) intro.innerHTML = `
    <span class="eyebrow ember">${esc(W.eyebrow)}</span>
    <h2 class="section-title" id="failed-title">${esc(W.title)}</h2>
    <p class="wf-lead">${esc(W.lead)}</p>`;

  buildCrossSection(W.crossSection);
  buildChain(W.chain);
  buildOwnersMiddle(W.owners);
  buildWfClosing(W.closing);
}

// "Text. (Author, Year)" from { text, cite }
function textCiteHTML(t) {
  if (!t || !present(t.text)) return "";
  return `${esc(t.text)}${t.cite && t.cite.length ? " " + citeHTML(t.cite) : ""}`;
}


/* ----- 10b. HOW IT SPREAD: cross-section -----
   Colors (set in CSS section 6.5):
     building lines = grey, bamboo + netting = green (structure),
     fire + numbered hotspots = orange (what went wrong), smoke = grey. */
function buildCrossSection(X) {
  const box = $("#cross-section");
  if (!box || !X) return;
  const D = X.drawing || {};

  box.innerHTML = `
    <h3 class="wf-h3">${esc(X.title)}</h3>
    ${present(X.lead) ? `<p class="part-lead part-lead--small">${esc(X.lead)}</p>` : ""}
    <p class="muted wf-instruction">${esc(X.intro)}</p>
    <div class="xs">
      <figure class="xs__figure">
        <svg class="xs__svg" id="xs-svg" viewBox="0 0 520 760" role="group" aria-labelledby="xs-title">
          <title id="xs-title">${esc(X.svgTitle)}</title>
          <defs>
            <linearGradient id="xs-fire" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" class="xs-stop-1"/><stop offset="1" class="xs-stop-2"/>
            </linearGradient>
          </defs>
          <rect class="xs-sky" x="0" y="0" width="520" height="700"/>
          <rect class="xs-ground" x="0" y="700" width="520" height="60"/>
          <g class="xs-scaffold" aria-hidden="true"></g>
          <g class="xs-structure" aria-hidden="true"></g>
          <g aria-hidden="true">
            <rect class="xs-fire" id="xs-fire-left"  x="110" y="80" width="30" height="560"/>
            <rect class="xs-fire" id="xs-fire-well"  x="245" y="80" width="30" height="520"/>
            <rect class="xs-smoke" id="xs-smoke"     x="290" y="80" width="40" height="600"/>
            <rect class="xs-fire" id="xs-fire-right" x="380" y="80" width="30" height="500"/>
          </g>
          <g class="xs-labels" aria-hidden="true">
            <line class="xs-dim" x1="60" y1="80" x2="60" y2="700"/>
            <line class="xs-dim" x1="54" y1="80" x2="66" y2="80"/>
            <line class="xs-dim" x1="54" y1="700" x2="66" y2="700"/>
            <text class="xs-lbl mid" transform="translate(48 390) rotate(-90)">${esc(D.storeys)}</text>
            <text class="xs-lbl end" x="106" y="614">${esc(D.floorLow)}</text>
            <text class="xs-lbl end" x="106" y="534">${esc(D.floorHigh)}</text>
            <text class="xs-lbl mid xs-lbl--green" x="125" y="718">${esc((D.scaffold || [])[0])}</text>
            <text class="xs-lbl mid xs-lbl--green" x="125" y="731">${esc((D.scaffold || [])[1])}</text>
            <text class="xs-lbl mid" x="192" y="718">${esc(D.flats)}</text>
            <text class="xs-lbl mid" x="260" y="718">${esc(D.well)}</text>
            <text class="xs-lbl mid" x="310" y="718">${esc(D.stair)}</text>
            <text class="xs-lbl mid" x="355" y="718">${esc(D.flats)}</text>
          </g>
          <g class="xs-hotspots"></g>
        </svg>
        <div class="xs__controls">
          <button type="button" class="pill" id="xs-play">${esc(X.playLabel)}</button>
          <button type="button" class="pill" id="xs-reset">${esc(X.resetLabel)}</button>
        </div>
        <div class="xs__caption" id="xs-caption" aria-live="polite"></div>
        <p class="xs__note">${esc(X.note)}</p>
      </figure>
      <aside class="xs__panel card" id="xs-panel" aria-live="polite">
        <h4 class="xs__panel-title">${esc(X.panelTitle)}</h4>
        <p>${esc(X.panelIntro)}</p>
      </aside>
    </div>`;

  const svg = $("#xs-svg", box);
  const add = (parent, tag, attrs) => parent.appendChild(svgEl(tag, attrs));

  // Geometry: 31 floors of 20 units, ground at y=700, roof at y=80
  const G = 700, FH = 20, FLOORS = 31, TOP = G - FH * FLOORS;
  const L = 140, R = 380, WELL = [245, 275], STAIR = [290, 330];

  // Bamboo poles + netting on both façades (green = structure)
  const scaffold = $(".xs-scaffold", svg);
  [[112, 138], [382, 408]].forEach(([a, b]) => {
    for (let x = a + 2; x <= b; x += 8) add(scaffold, "line", { x1: x, y1: TOP - 6, x2: x, y2: G, class: "xs-bamboo" });
    for (let i = 0; i <= FLOORS; i++) { const y = G - i * FH; add(scaffold, "line", { x1: a, y1: y, x2: b, y2: y, class: "xs-bamboo" }); }
    add(scaffold, "rect", { x: a - 2, y: TOP - 6, width: b - a + 4, height: G - TOP + 6, class: "xs-net" });
  });

  // Building: slabs (gap at the light well), walls, stairs, windows, foam boards
  const st = $(".xs-structure", svg);
  for (let i = 0; i <= FLOORS; i++) {
    const y = G - i * FH;
    add(st, "line", { x1: L, y1: y, x2: WELL[0], y2: y, class: "xs-slab" });
    add(st, "line", { x1: WELL[1], y1: y, x2: R, y2: y, class: "xs-slab" });
  }
  [L, R, WELL[0], WELL[1]].forEach(x => add(st, "line", { x1: x, y1: TOP, x2: x, y2: G, class: "xs-wall" }));
  STAIR.forEach(x => add(st, "line", { x1: x, y1: TOP, x2: x, y2: G, class: "xs-wall xs-wall--thin" }));
  for (let i = 0; i < FLOORS; i++) {               // zig-zag stair flights
    const y = G - i * FH, lr = i % 2 === 0;
    add(st, "line", { x1: lr ? STAIR[0] + 3 : STAIR[1] - 3, y1: y, x2: lr ? STAIR[1] - 3 : STAIR[0] + 3, y2: y - FH, class: "xs-stairline" });
  }
  for (let i = 1; i < FLOORS; i++) {
    const yb = G - i * FH;
    [L, R, WELL[0], WELL[1]].forEach(x => add(st, "rect", { x: x - 2, y: yb - 15, width: 4, height: 9, class: "xs-window" }));
    add(st, "rect", { x: L - 6, y: yb - 15, width: 4, height: 9, class: "xs-foam" });
    add(st, "rect", { x: R + 2, y: yb - 15, width: 4, height: 9, class: "xs-foam" });
  }
  // switched-off fire alarm (circle with a slash)
  add(st, "circle", { cx: 190, cy: 666, r: 5, class: "xs-alarm" });
  add(st, "line", { x1: 186, y1: 670, x2: 194, y2: 662, class: "xs-alarm" });

  // ----- Hotspots (orange): focusable, Enter / Space opens -----
  const panel = $("#xs-panel", box);
  const hot = $(".xs-hotspots", svg);
  const spots = X.spots || [];
  spots.forEach(s => {
    const g = add(hot, "g", {
      class: "xs-spot" + (REDUCED_MOTION ? "" : " pulse"),
      tabindex: "0", role: "button", "aria-controls": "xs-panel", "aria-pressed": "false",
      "aria-label": `${s.n}. ${s.title}`,
    });
    add(g, "circle", { class: "xs-hit", cx: s.x, cy: s.y, r: 22 });   // invisible, bigger tap target
    add(g, "circle", { class: "xs-ring", cx: s.x, cy: s.y, r: 11 });
    add(g, "circle", { class: "xs-dot", cx: s.x, cy: s.y, r: 11 });
    add(g, "text", { x: s.x, y: s.y }).textContent = s.n;
    const open = () => showSpot(s, g);
    g.addEventListener("click", open);
    g.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
  });

  function showSpot(s, g) {
    $$(".xs-spot", hot).forEach(x => { x.classList.remove("is-active", "pulse"); x.setAttribute("aria-pressed", "false"); });
    g.classList.add("is-active");
    g.setAttribute("aria-pressed", "true");
    panel.innerHTML = `
      <h4 class="xs__panel-title"><span class="xs__num" aria-hidden="true">${esc(s.n)}</span>${esc(s.title)}</h4>
      <p>${esc(s.body)} ${citeHTML(s.cite)}</p>
      ${present(s.why) ? `<p class="xs__why"><strong>${esc(X.whyLabel)}:</strong> ${esc(s.why)}</p>` : ""}`;
  }

  // ----- "Show how it spread" -----
  // Fire and smoke rects grow upward (CSS transitions, staggered delays).
  const caption = $("#xs-caption", box);
  const steps = X.steps || [];
  const stepHTML = st => `<p>${esc(st.text)} ${citeHTML(st.cite)}</p>`;
  let timers = [];

  function reset() {
    timers.forEach(clearTimeout);
    timers = [];
    svg.classList.remove("is-burning");
    caption.innerHTML = "";
  }
  $("#xs-play", box).addEventListener("click", () => {
    reset();
    void svg.getBoundingClientRect();          // force a reflow so the transition restarts
    svg.classList.add("is-burning");
    if (REDUCED_MOTION) {
      caption.innerHTML = steps.map(stepHTML).join("");   // no timing: show every step at once
    } else {
      timers = steps.map(st => setTimeout(() => (caption.innerHTML = stepHTML(st)), st.ms));
    }
  });
  $("#xs-reset", box).addEventListener("click", reset);
}


/* ----- 10c. THE CHAIN OF RESPONSIBILITY -----
   Tier 1 (government, green) → Tier 2 (owners, orange) → Tier 3 (hired firms, grey).
   Layer pills set data-mode on .wf-chain; the CSS does the highlighting:
     direct = Tier 3 orange, oversight = Tier 1 orange,
     structural = tiers dimmed, owners highlighted, orange outline + caption.
   Clicking a node opens a dialog: side panel on desktop, bottom sheet on phones. */
function buildChain(C) {
  const box = $("#chain");
  if (!box || !C) return;
  const nodes = C.nodes || [];
  const byTier = t => nodes.filter(n => n.tier === t);
  const owners = byTier("owners")[0];

  const nodeBtn = n => `
    <button type="button" class="wf-node wf-node--${esc(n.tier)}" data-id="${esc(n.id)}" aria-haspopup="dialog" aria-controls="wf-sheet">
      <span class="wf-node__name">${esc(n.node)}</span>
      ${present(n.nodeSub) ? `<span class="wf-node__sub">${esc(n.nodeSub)}</span>` : ""}
    </button>`;

  box.innerHTML = `
    <h3 class="wf-h3">${esc(C.title)}</h3>
    <p class="muted wf-instruction">${esc(C.instruction)}</p>
    <div class="pills wf-pills" role="group" aria-label="Highlight a layer of responsibility">
      ${Object.entries(C.layers).map(([key, l]) =>
        `<button type="button" class="pill pill--ember" data-layer="${esc(key)}" aria-pressed="false">${esc(l.label)}</button>`).join("")}
    </div>

    <div class="wf-chain" id="wf-chain" data-mode="">
      <p class="sr-only">${esc(C.srSummary)}</p>
      <div class="wf-tier wf-tier--gov" role="group" aria-labelledby="wf-tier-gov">
        <p class="wf-tier__label" id="wf-tier-gov">${esc(C.tiers.gov)}</p>
        <div class="wf-tier__nodes">${byTier("gov").map(nodeBtn).join("")}</div>
      </div>

      <div class="wf-mid">
        <div class="wf-mid__owners">
          ${owners ? nodeBtn(owners) : ""}
          <div class="wf-arrow wf-arrow--solid" aria-hidden="true"><span>${esc(C.arrows.hires)}</span></div>
        </div>
        <!-- dashed "checks" arrow runs beside the owners node, not through it -->
        <div class="wf-arrow wf-arrow--dashed" aria-hidden="true"><span>${esc(C.arrows.checks)}</span></div>
      </div>

      <div class="wf-tier wf-tier--hired" role="group" aria-labelledby="wf-tier-hired">
        <p class="wf-tier__label" id="wf-tier-hired">${esc(C.tiers.hired)}</p>
        <div class="wf-tier__nodes">${byTier("hired").map(nodeBtn).join("")}</div>
      </div>
    </div>
    <div class="wf-caption" id="wf-caption" aria-live="polite"></div>`;

  // ----- Layer pills: one at a time; pressing the active pill turns it off -----
  const chain = $("#wf-chain", box);
  const caption = $("#wf-caption", box);
  const pills = $$(".pill[data-layer]", box);
  pills.forEach(pill => pill.addEventListener("click", () => {
    const turnOn = pill.getAttribute("aria-pressed") !== "true";
    pills.forEach(p => p.setAttribute("aria-pressed", "false"));
    if (turnOn) pill.setAttribute("aria-pressed", "true");
    const mode = turnOn ? pill.dataset.layer : "";
    chain.dataset.mode = mode;

    // Structural shows a visible caption; the others are announced to screen readers only
    const l = C.layers[mode];
    caption.classList.toggle("is-visible", !!(l && l.caption));
    caption.innerHTML = !l ? "" : l.caption
      ? `<p>${esc(l.caption)}</p>`
      : `<p class="sr-only">${esc(l.announce || "")}</p>`;
  }));

  // ----- Node panel (dialog). Lives at the end of <body> so it stays usable
  //       while the rest of the page is inert. -----
  let sheet = $("#wf-sheet");
  if (!sheet) {
    document.body.insertAdjacentHTML("beforeend", `
      <div class="wf-backdrop" id="wf-backdrop" hidden></div>
      <div class="wf-sheet" id="wf-sheet" role="dialog" aria-modal="true" aria-labelledby="wf-sheet-title" hidden>
        <button type="button" class="wf-sheet__close" id="wf-sheet-close" aria-label="${esc(C.labels.close)}">×</button>
        <div class="wf-sheet__body" id="wf-sheet-body"></div>
      </div>`);
    sheet = $("#wf-sheet");
  }
  const backdrop = $("#wf-backdrop");
  const body = $("#wf-sheet-body");
  const background = () => $$("body > header, body > main, body > footer, .btn-168, .tower-progress");
  let lastNode = null;

  function tierLabel(n) {
    if (n.tier === "gov") return C.tiers.gov;
    if (n.tier === "hired") return C.tiers.hired;
    return n.nodeSub || "";
  }

  function openNode(btn) {
    const n = nodes.find(x => x.id === btn.dataset.id);
    if (!n) return;
    lastNode = btn;
    const L = C.labels;
    const status = n.status || {};
    body.innerHTML = `
      <p class="wf-sheet__tier wf-sheet__tier--${esc(n.tier)}">${esc(tierLabel(n))}</p>
      <h3 class="wf-sheet__title" id="wf-sheet-title">${esc(n.name)}${present(n.nameZh) ? ` <span class="zh" lang="zh-Hant">${esc(n.nameZh)}</span>` : ""}</h3>
      <div class="wf-sheet__block wf-sheet__block--supposed">
        <h4>${esc(L.supposed)}</h4>
        <p>${textCiteHTML(n.supposed)}</p>
      </div>
      <div class="wf-sheet__block wf-sheet__block--happened">
        <h4>${esc(L.happened)}</h4>
        <p>${textCiteHTML(n.happened)}</p>
      </div>
      ${present(status.text) ? `
      <div class="wf-sheet__block wf-sheet__status">
        <h4>${esc(L.status)}</h4>
        <p><span class="wf-badge">${esc(status.text)}</span>${status.cite ? " " + citeHTML(status.cite) : ""}</p>
        ${status.note ? `<p class="wf-sheet__note">${textCiteHTML(status.note)}</p>` : ""}
      </div>` : ""}`;

    $$(".wf-node", box).forEach(b => b.classList.toggle("is-open", b === btn));
    sheet.hidden = false;
    backdrop.hidden = false;
    sheet.scrollTop = 0;
    document.body.classList.add("no-scroll");
    background().forEach(el => (el.inert = true));
    $("#wf-sheet-close").focus();
  }

  function closeNode() {
    if (sheet.hidden) return;
    sheet.hidden = true;
    backdrop.hidden = true;
    document.body.classList.remove("no-scroll");
    background().forEach(el => (el.inert = false));
    $$(".wf-node", box).forEach(b => b.classList.remove("is-open"));
    lastNode && lastNode.focus();        // back to the node that opened it
  }

  box.addEventListener("click", e => {
    const btn = e.target.closest(".wf-node");
    if (btn) openNode(btn);              // Enter and Space also "click" a button
  });
  $("#wf-sheet-close").addEventListener("click", closeNode);
  backdrop.addEventListener("click", closeNode);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !sheet.hidden) { e.preventDefault(); closeNode(); }
  });

  // ----- API for the 2x2 chart (section 11): show one or more nodes -----
  // One node → scroll to it and open its panel. Several → scroll, outline them, focus the first.
  let targetTimer = null;
  chainApi = {
    show(ids) {
      const btns = ids.map(id => $(`.wf-node[data-id="${id}"]`, box)).filter(Boolean);
      if (!btns.length) return;
      chain.scrollIntoView({ behavior: REDUCED_MOTION ? "auto" : "smooth", block: "center" });
      $$(".wf-node", box).forEach(b => b.classList.remove("is-target"));
      clearTimeout(targetTimer);
      if (btns.length === 1) { openNode(btns[0]); return; }
      btns.forEach(b => b.classList.add("is-target"));
      btns[0].focus({ preventScroll: true });
      const names = btns.map(b => $(".wf-node__name", b).textContent).join(", ");
      caption.classList.remove("is-visible");
      caption.innerHTML = `<p class="sr-only">Highlighted in the chain: ${esc(names)}</p>`;
      targetTimer = setTimeout(() => btns.forEach(b => b.classList.remove("is-target")), 4000);
    },
  };
}
let chainApi = null;   // set by buildChain()


/* ----- 10d. THE OWNERS IN THE MIDDLE ----- */
function buildOwnersMiddle(O) {
  const box = $("#owners-middle");
  if (!box || !O) return;
  const q = O.quote || {};
  box.innerHTML = `
    <article class="wf-owners" aria-labelledby="wf-owners-title">
      <h3 class="wf-h3" id="wf-owners-title">${esc(O.title)}</h3>
      <p class="wf-owners__para">${textCiteHTML(O.paraphrase)}</p>
      <blockquote class="wf-owners__quote">
        <p class="zh wf-owners__zh" lang="zh-Hant">${esc(q.zh)}</p>
        <p class="wf-owners__en">${esc(q.en)}</p>
        <footer>— ${esc(q.credit)} ${citeHTML(q.cite)}</footer>
      </blockquote>
      <p class="wf-owners__analysis">${esc(O.analysis)}</p>
    </article>`;
}


/* ----- 10e. CLOSING LINE ----- */
function buildWfClosing(K) {
  const box = $("#wf-closing");
  if (!box || !K) return;
  const src = K.source || {};
  box.innerHTML = `
    <div class="wf-closing">
      <p class="wf-closing__line">${esc(K.line)}</p>
      <p class="wf-closing__cap">${esc(K.captionBefore)}<a href="${ROOT}sources.html#${encodeURIComponent(src.id)}">${esc(src.text)}</a>${esc(K.captionAfter)}<span class="zh" lang="zh-Hant">${esc(K.original)}</span></p>
      <p><a class="wf-next" href="${esc(K.next.href)}">${esc(K.next.label)} ↓</a></p>
    </div>`;
  if (!(window.CITATIONS || {})[src.id]) console.error(`[cite] Unknown citation id "${src.id}".`);
}


/* ---------------------------------------------------------------------
   11. PART 3: THE GAP (vote, 2x2 chart, who paid) + PART 4: REALIGNING?
   Data: STORY.gap, STORY.realign (js/story-data.js), LAW.reforms.tradeoff
   --------------------------------------------------------------------- */

// The reader's vote is kept in this variable only: nothing is saved or sent.
let readerVote = null;

function buildGap() {
  const S = window.STORY;
  if (!S || !$("#gap")) return;
  const G = S.gap;

  // ----- a. Vote: opens the section -----
  const voteBox = $("#gap-vote");
  const reveal = $("#gap-reveal");
  if (voteBox && reveal) {
    voteBox.innerHTML = `
      <div class="gap-vote">
        <h3 class="gap-vote__q" id="vote-q">${esc(G.vote.question)}</h3>
        <div class="vote" role="group" aria-labelledby="vote-q">
          ${G.vote.options.map(o => `<button type="button" class="vote__btn" data-vote="${esc(o)}" aria-pressed="false">${esc(o)}</button>`).join("")}
        </div>
        <p class="vote-result" id="vote-result" aria-live="polite">${esc(G.vote.hint)}</p>
      </div>`;
    reveal.hidden = true;            // hidden only when JS runs, so no-JS readers see everything
    const buttons = $$(".vote__btn", voteBox);
    buttons.forEach(btn => btn.addEventListener("click", () => {
      readerVote = btn.dataset.vote;
      buttons.forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
      $("#vote-result").textContent = G.vote.response.replace("{choice}", readerVote);
      if (reveal.hidden) {
        reveal.hidden = false;
        reveal.classList.add("is-revealed");
      }
    }));
  }

  // ----- b. 2x2 chart: an SVG frame (axes + dividers) with HTML labels on top,
  //          so the labels stay readable and keyboard-focusable at 375px -----
  const M = G.matrix;
  const mBox = $("#gap-matrix");
  if (mBox && M) {
    const chip = p => p.tone === "empty"
      ? `<div class="gm-chip gm-chip--empty">${esc(p.label)}</div>`
      : `<button type="button" class="gm-chip gm-chip--${esc(p.tone)}" data-target="${esc(JSON.stringify(p.target || {}))}">${esc(p.label)}<span class="sr-only">: ${esc(p.target && p.target.anchor ? M.anchorHint : M.targetHint)}</span></button>`;
    const quad = k => `
      <div class="gm-quad gm-quad--${k}">
        <p class="gm-quad__label">${esc(M.quadrants[k])}</p>
        <div class="gm-quad__chips">${M.placements.filter(p => p.quadrant === k).map(chip).join("")}</div>
      </div>`;

    mBox.innerHTML = `
      <h3 class="wf-h3" id="gm-title">${esc(M.title)}</h3>
      <p class="muted wf-instruction">${esc(M.hint)}</p>
      <figure class="gm" aria-labelledby="gm-title">
        <p class="sr-only">${esc(M.xLabel)}: ${esc(M.low)} on the left, ${esc(M.high)} on the right. ${esc(M.yLabel)}: ${esc(M.low)} at the bottom, ${esc(M.high)} at the top.</p>
        <div class="gm__frame">
          <div class="gm__y" aria-hidden="true"><span>${esc(M.low)}</span><span class="gm__axis-name">${esc(M.yLabel)} →</span><span>${esc(M.high)}</span></div>
          <div class="gm__plot">
            <svg class="gm__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <line class="gm__mid" x1="50" y1="0" x2="50" y2="100" vector-effect="non-scaling-stroke"/>
              <line class="gm__mid" x1="0" y1="50" x2="100" y2="50" vector-effect="non-scaling-stroke"/>
              <line class="gm__axis" x1="0" y1="0" x2="0" y2="100" vector-effect="non-scaling-stroke"/>
              <line class="gm__axis" x1="0" y1="100" x2="100" y2="100" vector-effect="non-scaling-stroke"/>
            </svg>
            ${quad("tl")}${quad("tr")}${quad("bl")}${quad("br")}
          </div>
          <div class="gm__x" aria-hidden="true"><span>${esc(M.low)}</span><span class="gm__axis-name">${esc(M.xLabel)} →</span><span>${esc(M.high)}</span></div>
        </div>
        <figcaption class="gm__caption">${esc(M.caption)}</figcaption>
      </figure>`;

    // Clicking a label shows the matching node(s) in the chain, or jumps to an anchor
    mBox.addEventListener("click", e => {
      const btn = e.target.closest(".gm-chip[data-target]");
      if (!btn) return;
      const target = JSON.parse(btn.dataset.target);
      if (target.nodes && chainApi) chainApi.show(target.nodes);
      else if (target.anchor) {
        const el = document.getElementById(target.anchor);
        if (!el) return;
        el.scrollIntoView({ behavior: REDUCED_MOTION ? "auto" : "smooth", block: "center" });
        const focusEl = $("[tabindex='-1']", el) || el;
        focusEl.focus({ preventScroll: true });
      }
    });
  }

  // ----- f. Who paid -----
  const P = G.whoPaid;
  const slot = $("#who-paid-slot");
  if (slot && P) {
    const facts = (window.MEMORIAL && window.MEMORIAL.facts) || {};
    if (facts.deaths !== 168 || facts.domesticWorkersKilled !== 10) {
      console.warn("[who-paid] The numbers in STORY.gap.whoPaid.text no longer match MEMORIAL.facts. Check both.");
    }
    slot.outerHTML = `
      <article class="who-paid" id="who-paid" aria-labelledby="who-paid-title">
        <h3 class="wf-h3" id="who-paid-title" tabindex="-1">${esc(P.title)}</h3>
        <p class="who-paid__text">${esc(P.text)} ${citeHTML(P.cite)}</p>
        <button type="button" class="pill who-paid__btn" id="who-paid-btn" aria-haspopup="dialog" aria-controls="memorial">${esc(P.button)}</button>
      </article>`;
    const btn = $("#who-paid-btn");
    btn.addEventListener("click", () => {
      if (typeof window.openMemorial === "function") window.openMemorial(btn);
    });
  }
}

function buildRealign() {
  const S = window.STORY;
  const box = $("#scorecard");
  if (!S || !box) return;

  // ----- a. Scorecard. The "who still carries responsibility" column has an orange header. -----
  const T = S.realign.scorecard;
  const rc = T.responsibilityColumn;
  box.innerHTML = `
    <h3 class="wf-h3">${esc(T.title)}</h3>
    <div class="hs-table-wrap">
      <table class="hs-table rf-table">
        <caption class="sr-only">${esc(T.caption)}</caption>
        <thead><tr>${T.columns.map((c, i) => `<th scope="col"${i === rc ? ' class="rf-carries"' : ""}>${esc(c)}</th>`).join("")}</tr></thead>
        <tbody>
          ${T.rows.map(r => `
            <tr>
              <th scope="row">${esc(r.reform)}</th>
              <td data-col="${esc(T.columns[1])}">${esc(r.gains)}</td>
              <td data-col="${esc(T.columns[2])}" class="rf-carries-cell">${esc(r.carries)}</td>
              <td data-col="${esc(T.columns[3])}">${textCiteHTML(r.status)}</td>
            </tr>`).join("")}
        </tbody>
      </table>
    </div>`;

  // ----- b. Trade-off box (text moved from the law page) -----
  const t = window.LAW && window.LAW.reforms && window.LAW.reforms.tradeoff;
  const tBox = $("#tradeoff");
  if (t && tBox) tBox.innerHTML = `
    <aside class="lw-tradeoff" aria-label="${esc(t.label)}">
      <p class="lw-label scaffold">${esc(t.label)}</p>
      <p>${esc(t.text)}</p>
    </aside>`;
}


/* ---------------------------------------------------------------------
   12. START EVERYTHING
   Order matters: build HTML first, then set up Scrollama on it.
   --------------------------------------------------------------------- */
buildHeader();
buildFooter();
buildMemorial();

buildTowerProgress();
fillDataCites();
buildTimeline();
buildResponsible();
buildWhoFailed();
buildGap();
buildRealign();
renderTheoryCards();

setupScrolly(".statement");
setupScrolly(".tl-node", { offset: 0.6 });
