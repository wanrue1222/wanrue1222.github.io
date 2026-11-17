/* =====================================================================
   law.js: layout + behavior for system/law.html AND index.html#power.
   Content comes from window.LAW (js/law-data.js).
   Each part is drawn only if its container exists on the page:
     law.html : #lw-hero, #lw-duty, #lw-end
     index.html: #lw-owners, #lw-voting, #lw-bidrig, #lw-checks
   On index.html the blocks sit inside "Who held the power", so their
   headings are <h3> instead of <h2>.
   Uses helpers from main.js: esc(), citeHTML(), $, $$, REDUCED_MOTION, svgEl().

   1. Helpers        5. Bid-rigging (flow diagram)
   2. Hero           6. The checks that failed
   3. The duty       7. The reforms
   4. Owners + votes 8. End of page
   ===================================================================== */
(function () {
  const L = window.LAW;
  if (!L) {
    console.error("[law] window.LAW is undefined. Check js/law-data.js is loaded before js/law.js.");
    return;
  }

  /* -------------------------------------------------------------------
     1. HELPERS (same as housing.js)
     ------------------------------------------------------------------- */
  const fill = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; return el; };
  const zh = text => (text ? ` <span class="zh" lang="zh-Hant">${esc(text)}</span>` : "");
  const withCite = item => `${esc(item.text)}${item.cite ? " " + citeHTML(item.cite) : ""}`;
  const HTAG = PAGE === "story" ? "h3" : "h2";   // nested under a Part heading on index.html
  const header = (s, id) => `
    <span class="eyebrow">${esc(s.eyebrow)}</span>
    <${HTAG} class="section-title${HTAG === "h3" ? " section-title--sub" : ""}" id="${id}-title">${esc(s.title)}${zh(s.titleZh)}</${HTAG}>`;
  const statHTML = s => `
    <div class="hs-stat">
      <p class="hs-stat__value">${s.pre ? `<span class="hs-stat__small">${esc(s.pre)}</span> ` : ""}${esc(s.value)}</p>
      <p class="hs-stat__label">${esc(s.label)}</p>
      ${s.cite ? `<p class="hs-stat__cite">${citeHTML(s.cite)}</p>` : ""}
    </div>`;

  /* -------------------------------------------------------------------
     2. HERO
     ------------------------------------------------------------------- */
  fill("lw-hero", `
    <div class="container">
      <span class="eyebrow scaffold">${esc(L.hero.eyebrow)}</span>
      <h1 id="page-title">${esc(L.hero.title)}</h1>
      <p class="takeaway-line hs-takeaway">${esc(L.hero.takeaway)}</p>
    </div>`);

  /* -------------------------------------------------------------------
     3. THE DUTY: three stacked green-outlined cards
     ------------------------------------------------------------------- */
  const D = L.duty;
  fill("lw-duty", `
    <div class="container">
      ${header(D, "duty")}
      <ol class="lw-duty">
        ${D.cards.map((c, i) => `
          <li class="lw-duty__card">
            <span class="lw-duty__num" aria-hidden="true">0${i + 1}</span>
            <h3 class="lw-duty__name">
              ${esc(c.name)}${c.cap ? ` <span class="lw-duty__cap">(${esc(c.cap)})</span>` : ""}
              ${c.nameZh ? `<span class="zh lw-duty__zh" lang="zh-Hant">${esc(c.nameZh)}</span>` : ""}
              ${c.nameCite ? `<span class="lw-duty__namecite">${citeHTML(c.nameCite)}</span>` : ""}
            </h3>
            <div class="lw-duty__cols">
              <div>
                <p class="lw-label">${esc(D.lawLabel)}</p>
                <p>${withCite(c.law)}</p>
                ${c.penalty ? `
                  <div class="lw-penalty">
                    <div class="lw-penalty__figs">
                      ${c.penalty.figures.map(f => `
                        <p class="lw-penalty__fig"><span class="lw-penalty__value">${esc(f.value)}</span><span class="lw-penalty__label">${esc(f.label)}</span></p>`).join("")}
                    </div>
                    <p class="lw-penalty__text">${withCite(c.penalty)}</p>
                  </div>` : ""}
              </div>
              <div class="lw-duty__wfc">
                <p class="lw-label">${esc(D.wfcLabel)}</p>
                <p>${withCite(c.wfc)}</p>
              </div>
            </div>
          </li>`).join("")}
      </ol>
      <p class="hs-big">${esc(D.closing.text)}</p>
      <p class="lw-big-cite">${citeHTML(D.closing.cite)}</p>
    </div>`);

  /* -------------------------------------------------------------------
     4a. WHO WERE THE OWNERS?
     ------------------------------------------------------------------- */
  const O = L.owners;
  fill("lw-owners", `
    <div class="container">
      ${header(O, "owners")}
      <div class="lw-tiles">${O.tiles.map(t => `<div class="lw-tile">${statHTML(t)}</div>`).join("")}</div>
      <p class="lw-argument">${withCite(O.argument)}</p>
      <p class="lw-small-note">${esc(O.note)}</p>
    </div>`);

  /* -------------------------------------------------------------------
     4b. THE VOTING RULES: one dot per flat, two thresholds
     ------------------------------------------------------------------- */
  const V = L.voting;
  const rows = Math.ceil(V.flats / V.cols);
  const GAP = 10, R = 3.3;

  // A fixed "random" order of the flats, so highlighted dots are spread out
  // (not all in the first rows) but look the same on every visit.
  const order = Array.from({ length: V.flats }, (_, i) => i);
  let seed = 1983;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  const rank = new Array(V.flats);
  order.forEach((flat, r) => (rank[flat] = r));

  const dots = Array.from({ length: V.flats }, (_, i) => {
    const x = (i % V.cols) * GAP + GAP / 2, y = Math.floor(i / V.cols) * GAP + GAP / 2;
    return `<circle cx="${x}" cy="${y}" r="${R}" data-rank="${rank[i]}" style="transition-delay:${(rank[i] % 200) * 3}ms"/>`;
  }).join("");

  // "about 100": round to the nearest 10
  const about = pct => Math.round((V.flats * pct) / 100 / 10) * 10;

  const votingSection = fill("lw-voting", `
    <div class="container">
      ${header(V, "voting")}
      <div class="pills" role="group" aria-label="Choose a voting rule">
        ${V.tabs.map((t, i) => `<button class="pill" type="button" data-tab="${t.key}" aria-pressed="${i === 0}">${esc(t.label)}</button>`).join("")}
      </div>
      <figure class="lw-dots">
        <div class="lw-dots__readout" aria-live="polite" id="lw-readout"></div>
        <svg class="lw-dots__svg" viewBox="0 0 ${V.cols * GAP} ${rows * GAP}" aria-hidden="true" focusable="false">${dots}</svg>
        <figcaption class="lw-dots__note">${withCite(V.note)}</figcaption>
      </figure>

      <ol class="lw-steps">
        ${V.timeline.map(s => `
          <li class="lw-steps__item tone-${s.tone}">
            <span class="lw-steps__date">${esc(s.date)}</span>
            <p>${esc(s.text)}</p>
          </li>`).join("")}
      </ol>
      <p class="lw-steps__cite">${citeHTML(V.timelineCite)}</p>
      <p class="lw-caption">${esc(V.caption)}</p>

      <figure class="lw-testimony">
        <figcaption class="lw-label">${esc(V.testimony.label)}</figcaption>
        <p>${withCite(V.testimony)}</p>
      </figure>
    </div>`);

  if (votingSection) {
    const circles = $$(".lw-dots__svg circle", votingSection);
    const buttons = $$(".pill[data-tab]", votingSection);
    const readout = $("#lw-readout");

    function show(key) {
      const t = V.tabs.find(x => x.key === key);
      const n = Math.round((V.flats * t.pct) / 100);         // exact count used for the dots
      circles.forEach(c => c.classList.toggle("is-on", Number(c.dataset.rank) < n));
      buttons.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.tab === key)));
      readout.innerHTML = `
        <p class="lw-dots__big"><span class="scaffold">${t.pct}%</span> <span class="lw-dots__about">= about ${about(t.pct)} of ~${V.flats.toLocaleString("en")} flats</span></p>
        <p class="lw-dots__text">${withCite(t)}</p>`;
    }
    buttons.forEach(b => b.addEventListener("click", () => show(b.dataset.tab)));
    show(V.tabs[0].key);
  }

  /* -------------------------------------------------------------------
     5. BID-RIGGING: flow diagram (SVG) + stats
     ------------------------------------------------------------------- */
  const B = L.bidrig;
  // Drawing is 400 units wide: narrow enough that the text stays readable when
  // the SVG shrinks to a phone screen (~14px titles at 375px wide).
  const W = 400, PAD = 14, TL = 22, SL = 19, ROWGAP = 36;
  const byId = Object.fromEntries(B.flow.map(s => [s.id, s]));
  const boxH = s => PAD * 2 + s.title.length * TL + s.sub.length * SL - 4;

  // Layout: rows of boxes; row 3 has two boxes side by side
  const layout = [["1"], ["2"], ["3a", "3b"], ["4"], ["5"]];
  const pos = {};
  let y = 4;
  layout.forEach(row => {
    const h = Math.max(...row.map(id => boxH(byId[id])));
    row.forEach((id, i) => {
      const w = row.length === 1 ? 340 : 192;
      const x = row.length === 1 ? (W - w) / 2 : (i === 0 ? 4 : W - 4 - w);
      pos[id] = { x, y, w, h };
    });
    y += h + ROWGAP;
  });
  const H = y - ROWGAP + 4;

  const boxSVG = id => {
    const s = byId[id], p = pos[id];
    let ty = p.y + PAD + 15;
    const lines = [
      ...s.title.map(t => { const l = `<text class="flow__title" x="${p.x + p.w / 2}" y="${ty}">${esc(t)}</text>`; ty += TL; return l; }),
      ...s.sub.map(t => { const l = `<text class="flow__sub" x="${p.x + p.w / 2}" y="${ty}">${esc(t)}</text>`; ty += SL; return l; }),
    ];
    return `<g class="flow__box is-${s.who}"><rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="8"/>${lines.join("")}</g>`;
  };
  const arrow = (from, to) => {
    const a = pos[from], b = pos[to];
    return `<line class="flow__arrow" x1="${a.x + a.w / 2}" y1="${a.y + a.h}" x2="${b.x + b.w / 2}" y2="${b.y - 6}" marker-end="url(#flow-arrowhead)"/>`;
  };
  const flowSVG = `
    <svg class="flow" viewBox="0 0 ${W} ${H}" aria-hidden="true" focusable="false">
      <defs><marker id="flow-arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" class="flow__head"/></marker></defs>
      ${arrow("1", "2")}${arrow("2", "3a")}${arrow("2", "3b")}${arrow("3a", "4")}${arrow("3b", "4")}${arrow("4", "5")}
      ${B.flow.map(s => boxSVG(s.id)).join("")}
    </svg>`;

  fill("lw-bidrig", `
    <div class="container">
      ${header(B, "bidrig")}
      <p class="lede">${esc(B.definition)}</p>
      <figure class="lw-flow">
        ${flowSVG}
        <!-- Text version of the diagram for screen readers -->
        <ol class="sr-only" aria-label="${esc(B.flowAlt)}">
          ${B.flow.map(s => `<li>${esc(s.id)}. ${esc(s.title.join(" "))} ${esc(s.sub.join(" "))}</li>`).join("")}
        </ol>
        <figcaption class="lw-legend">
          <span><i class="lw-legend__sw is-owners" aria-hidden="true"></i>Owners</span>
          <span><i class="lw-legend__sw is-cartel" aria-hidden="true"></i>Cartel</span>
        </figcaption>
      </figure>
      <div class="lw-tiles lw-tiles--fail">
        ${B.stats.map(s => `<div class="lw-tile">${statHTML(s)}</div>`).join("")}
        <div class="lw-tile lw-tile--case">
          <p class="lw-label">${esc(B.wfcCase.label)}</p>
          <p>${withCite(B.wfcCase)}</p>
        </div>
      </div>
      <p class="lw-small-note">${withCite(B.note)}</p>
    </div>`);

  /* -------------------------------------------------------------------
     6. THE CHECKS THAT FAILED
     ------------------------------------------------------------------- */
  const C = L.checks;
  fill("lw-checks", `
    <div class="container">
      ${header(C, "checks")}
      <div class="lw-checks">
        ${C.cards.map(c => `
          <article class="lw-check">
            <${HTAG === "h3" ? "h4" : "h3"}>${esc(c.title)}</${HTAG === "h3" ? "h4" : "h3"}>
            <p>${withCite(c)}</p>
          </article>`).join("")}
      </div>
      <p class="hs-big">${esc(C.closing)}</p>
    </div>`);

  /* -------------------------------------------------------------------
     7. THE REFORMS (table; stacks into cards on phones like housing.html)
     ------------------------------------------------------------------- */
  const F = L.reforms;
  fill("lw-reforms", `
    <div class="container">
      ${header(F, "reforms")}
      <div class="hs-table-wrap">
        <table class="hs-table lw-reform-table">
          <caption class="sr-only">Reforms announced after the fire and their status</caption>
          <thead><tr>${F.columns.map(c => `<th scope="col">${esc(c)}</th>`).join("")}</tr></thead>
          <tbody>
            ${F.rows.map(r => `
              <tr>
                <th scope="row">${esc(r.reform)}</th>
                <td data-col="${esc(F.columns[1])}">${esc(r.changes)}</td>
                <td data-col="${esc(F.columns[2])}">${withCite(r.status)}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
      <aside class="lw-tradeoff" aria-label="${esc(F.tradeoff.label)}">
        <p class="lw-label scaffold">${esc(F.tradeoff.label)}</p>
        <p>${esc(F.tradeoff.text)}</p>
      </aside>
    </div>`);

  /* -------------------------------------------------------------------
     8. END OF PAGE
     ------------------------------------------------------------------- */
  // A link card that asks the next question, then a back link
  const E = L.end;
  fill("lw-end", `
    <div class="container">
      <a class="link-card" href="${esc(E.link.href)}">
        <span class="link-card__q">${esc(E.question)}</span>
        <span class="link-card__go">${esc(E.link.label)} →</span>
      </a>
      <div class="hs-end__links">
        <a class="back-link" href="${esc(E.back.href)}">← ${esc(E.back.label)}</a>
      </div>
    </div>`);
})();
