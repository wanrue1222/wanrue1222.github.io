/* =====================================================================
   housing.js: layout + behavior for system/housing.html.
   Content comes from window.HOUSING (js/housing-data.js).
   Uses helpers from main.js: esc(), citeHTML(), $, $$, REDUCED_MOTION.

   1. Small helpers
   2. Hero
   3. If Hong Kong were 100 people (icon grid)
   4. Three housing systems (cards)
   5. Who repairs? (table)
   6. A short history (mini-timeline)
   7. Where Wang Fuk Court fits
   8. End of page
   ===================================================================== */
(function () {
  const H = window.HOUSING;
  if (!H) {
    console.error("[housing] window.HOUSING is undefined. Check js/housing-data.js is loaded before js/housing.js.");
    return;
  }

  /* -------------------------------------------------------------------
     1. HELPERS
     ------------------------------------------------------------------- */
  // Fill a <section> by id
  const fill = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; return el; };

  // Chinese text in its own span (right font + lang for screen readers)
  const zh = text => (text ? ` <span class="zh" lang="zh-Hant">${esc(text)}</span>` : "");

  // Text followed by its citation
  const withCite = item => `${esc(item.text)}${item.cite ? " " + citeHTML(item.cite) : ""}`;

  // Section header: small eyebrow + h2
  const header = (s, idSuffix) => `
    <span class="eyebrow">${esc(s.eyebrow)}</span>
    <h2 class="section-title" id="${idSuffix}-title">${esc(s.title)}</h2>`;

  /* -------------------------------------------------------------------
     2. HERO
     ------------------------------------------------------------------- */
  fill("hs-hero", `
    <div class="container">
      <span class="eyebrow scaffold">${esc(H.hero.eyebrow)}</span>
      <h1 id="page-title">${esc(H.hero.title)}</h1>
      <p class="takeaway-line hs-takeaway">${esc(H.hero.takeaway)}</p>
      ${H.hero.cite ? `<p class="hs-hero-cite">${citeHTML(H.hero.cite)}</p>` : ""}
    </div>`);

  /* -------------------------------------------------------------------
     3. IF HONG KONG WERE 100 PEOPLE
     ------------------------------------------------------------------- */
  // Simple person icon: round head + rounded body
  const PERSON = `<svg viewBox="0 0 24 32" aria-hidden="true" focusable="false">
      <circle cx="12" cy="7" r="5"/><path d="M3.5 30.5v-8.5a8.5 8.5 0 0 1 17 0v8.5z"/></svg>`;

  const P = H.people;
  const cats = P.categories;
  const total = cats.reduce((sum, c) => sum + c.count, 0);
  if (total !== 100) console.warn(`[housing] People categories add up to ${total}, not 100.`);

  // One cell per person, in category order. --d = animation delay:
  // each category starts after the previous one, people fill in quickly within it.
  let n = 0;
  const cells = cats.map((c, ci) => Array.from({ length: c.count }, (_, i) => {
    n++;
    return `<span class="person-cell person--${c.style}" data-cat="${c.key}" role="img" tabindex="${n === 1 ? 0 : -1}"
              aria-label="Person ${n}: ${esc(c.label)}" style="--d:${ci * 550 + i * 14}ms">${PERSON}</span>`;
  }).join("")).join("");

  const legend = cats.map(c => `
    <li>
      <button class="people-legend__item" data-cat="${c.key}" type="button">
        <span class="person-cell person--${c.style} people-legend__swatch" aria-hidden="true">${PERSON}</span>
        <span class="people-legend__text">
          <span class="people-legend__label">${esc(c.label)}${zh(c.labelZh)}</span>
          <span class="people-legend__count">${c.count} of 100 · <strong>${esc(c.share)}</strong></span>
        </span>
      </button>
    </li>`).join("");

  const peopleSection = fill("hs-people", `
    <div class="container">
      ${header(P, "people")}
      <figure class="people">
        <div class="people__grid" id="people-grid" role="group"
             aria-label="100 people, grouped by type of housing. Use arrow keys to move between people.">${cells}</div>
        <div class="people__side">
          <p class="people__readout" id="people-readout" aria-live="polite">${esc(P.hint)}</p>
          <ul class="people-legend">${legend}</ul>
        </div>
        <figcaption class="people__caption">${withCite(P.caption)}.</figcaption>
      </figure>
    </div>`);

  if (peopleSection) {
    const grid = $("#people-grid");
    const gridCells = $$(".person-cell", grid);
    const legendItems = $$(".people-legend__item", peopleSection);
    const readout = $("#people-readout");
    const byKey = Object.fromEntries(cats.map(c => [c.key, c]));

    // Highlight one category (or clear with null)
    function highlight(key) {
      gridCells.forEach(c => c.classList.toggle("is-dim", !!key && c.dataset.cat !== key));
      legendItems.forEach(b => b.classList.toggle("is-active", b.dataset.cat === key));
      if (!key) { readout.textContent = P.hint; return; }
      const c = byKey[key];
      readout.innerHTML = `<strong>${esc(c.label)}</strong>${zh(c.labelZh)}<br>${c.count} of 100 people · ${esc(c.share)} of the population`;
    }

    // Hover and keyboard focus both highlight
    [grid, peopleSection.querySelector(".people-legend")].forEach(area => {
      area.addEventListener("mouseover", e => { const t = e.target.closest("[data-cat]"); if (t) highlight(t.dataset.cat); });
      area.addEventListener("focusin", e => { const t = e.target.closest("[data-cat]"); if (t) highlight(t.dataset.cat); });
      area.addEventListener("mouseleave", () => { if (!area.contains(document.activeElement)) highlight(null); });
      area.addEventListener("focusout", e => { if (!area.contains(e.relatedTarget)) highlight(null); });
    });

    // Arrow keys move between people (10 per row); only one is in the Tab order
    grid.addEventListener("keydown", e => {
      const i = gridCells.indexOf(document.activeElement);
      if (i < 0) return;
      const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 10, ArrowUp: -10 }[e.key];
      if (step === undefined) return;
      e.preventDefault();
      const next = Math.max(0, Math.min(gridCells.length - 1, i + step));
      gridCells.forEach(c => (c.tabIndex = -1));
      gridCells[next].tabIndex = 0;
      gridCells[next].focus();
    });

    // Fill in category by category when the grid scrolls into view
    const reveal = () => {
      grid.classList.add("is-in");
      // after the animation, drop the delays so hover-dimming feels instant
      setTimeout(() => grid.classList.add("is-done"), REDUCED_MOTION ? 0 : cats.length * 550 + 1200);
    };
    if (REDUCED_MOTION || !("IntersectionObserver" in window)) {
      reveal();
    } else {
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { reveal(); io.disconnect(); }
      }, { threshold: 0.3 });
      io.observe(grid);
    }
  }

  /* -------------------------------------------------------------------
     4. THREE HOUSING SYSTEMS
     ------------------------------------------------------------------- */
  const statHTML = s => `
    <div class="hs-stat">
      <p class="hs-stat__value">
        ${s.pre ? `<span class="hs-stat__small">${esc(s.pre)}</span> ` : ""}${esc(s.value)}${s.unit ? ` <span class="hs-stat__small">${esc(s.unit)}</span>` : ""}
      </p>
      <p class="hs-stat__label">${esc(s.label)}</p>
      ${s.cite ? `<p class="hs-stat__cite">${citeHTML(s.cite)}</p>` : ""}
    </div>`;

  const S = H.systems;
  fill("hs-systems", `
    <div class="container">
      ${header(S, "systems")}
      <div class="hs-cards">
        ${S.cards.map(c => `
          <article class="hs-card${c.focus ? " is-focus" : ""}">
            <h3 class="hs-card__name">${esc(c.name)}${zh(c.nameZh)}</h3>
            <p class="hs-card__def">${esc(c.definition)}</p>
            <div class="hs-card__stats">${c.stats.map(statHTML).join("")}</div>
            ${c.extra ? `<p class="hs-card__extra">${withCite(c.extra)}</p>` : ""}
            <div class="hs-card__repair">
              <p class="hs-card__repair-label">${esc(S.repairLabel)}</p>
              <p class="hs-card__repair-text">${withCite(c.repair)}</p>
            </div>
          </article>`).join("")}
      </div>
    </div>`);

  /* -------------------------------------------------------------------
     5. WHO REPAIRS? (table; on phones each row becomes a small card)
     ------------------------------------------------------------------- */
  const R = H.repairs;
  const colClass = i => (i === R.focusColumn ? ' class="is-focus"' : "");
  fill("hs-repairs", `
    <div class="container">
      ${header(R, "repairs")}
      <div class="hs-table-wrap">
        <table class="hs-table">
          <caption class="sr-only">Who owns, manages and repairs each type of housing</caption>
          <thead>
            <tr><td></td>${R.columns.map((c, i) => `<th scope="col"${colClass(i)}>${esc(c)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${R.rows.map(r => `
              <tr>
                <th scope="row">${esc(r.label)}${r.cite ? " " + citeHTML(r.cite) : ""}</th>
                ${r.cells.map((cell, i) => `<td data-col="${esc(R.columns[i])}"${colClass(i)}>${esc(cell)}</td>`).join("")}
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
      <p class="hs-big">${esc(R.closing)}</p>
    </div>`);

  /* -------------------------------------------------------------------
     6. A SHORT HISTORY
     ------------------------------------------------------------------- */
  const T = H.history;
  fill("hs-history", `
    <div class="container">
      ${header(T, "history")}
      <ol class="hs-timeline">
        ${T.events.map(e => `
          <li class="hs-timeline__item">
            <span class="hs-timeline__year">${esc(e.year)}</span>
            <p class="hs-timeline__text">${withCite(e)}</p>
          </li>`).join("")}
      </ol>
      <p class="hs-quiet">${esc(T.note)}</p>
    </div>`);

  /* -------------------------------------------------------------------
     7. WHERE WANG FUK COURT FITS
     ------------------------------------------------------------------- */
  const W = H.wfc;
  // 8 small towers; orange = burned (the ONLY orange on this page)
  const towersSVG = `
    <svg class="hs-towers" viewBox="0 0 ${W.towers.length * 22 - 6} 64" role="img" aria-label="${esc(W.towersAlt)}">
      ${W.towers.map((burned, i) =>
        `<rect x="${i * 22}" y="${i % 2 ? 6 : 0}" width="16" height="${i % 2 ? 58 : 64}" rx="1" class="${burned ? "is-burned" : "is-standing"}"/>`).join("")}
    </svg>`;

  fill("hs-wfc", `
    <div class="container">
      ${header(W, "wfc")}
      <article class="hs-wfc card">
        <div class="hs-wfc__head">
          ${towersSVG}
          <p class="hs-wfc__label">
            <strong>${esc(W.label.name)}</strong>${zh(W.label.nameZh)}
            <span class="hs-wfc__meta"> · ${esc(W.label.rest)}${W.label.cite ? " " + citeHTML(W.label.cite) : ""}</span>
          </p>
        </div>

        <ul class="hs-facts">
          ${W.facts.map(f => `<li>${withCite(f)}</li>`).join("")}
        </ul>

        <!-- TODO: verify in a Housing Authority source that Kwong Fuk Estate is still fully public rental housing -->
        <figure class="hs-contrast">
          <div class="hs-contrast__cols">
            ${W.contrast.map(c => `
              <div class="hs-contrast__col${c.focus ? " is-focus" : ""}">
                <h3>${esc(c.name)}${zh(c.nameZh)}${c.note ? `<span class="hs-contrast__note">, ${esc(c.note)}</span>` : ""}</h3>
                <p>${esc(c.text)}</p>
              </div>`).join("")}
          </div>
          <figcaption>${withCite(W.contrastCaption)}</figcaption>
        </figure>

        <aside class="hs-nuance" aria-label="Note on the government's remaining role">
          <p>${withCite(W.nuance)}</p>
        </aside>
      </article>
      <!-- Outside link card (js/media-data.js); hidden until complete -->
      <div class="hs-media" data-media="history-1982" hidden></div>
    </div>`);

  /* -------------------------------------------------------------------
     8. END OF PAGE
     ------------------------------------------------------------------- */
  const E = H.end;
  fill("hs-end", `
    <div class="container">
      <p class="hs-big hs-end__line">${esc(E.line)}</p>
      <div class="hs-end__links">
        <a class="back-link" href="${esc(E.back.href)}">← ${esc(E.back.label)}</a>
        <a class="back-link back-link--next" href="${esc(E.next.href)}">${esc(E.next.label)} →</a>
      </div>
    </div>`);
})();
