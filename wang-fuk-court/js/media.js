/* =====================================================================
   media.js: the media component (photos, video, maps, outside links).
   Data: window.MEDIA in js/media-data.js.

   HOW TO PLACE MEDIA ON A PAGE
     <div data-media="before-map,scaffolding" hidden></div>
   The element stays hidden unless at least one listed item is complete.
   Items whose required fields are empty or contain "TODO" are skipped
   with a console warning, so the page always looks finished.

   On sources.html, <ul data-media-sources> is filled with one entry per
   complete item; its section (data-media-sources-section) stays hidden
   if there are none.

   Rules enforced here:
   - images only from assets/img/ (files you add yourself)
   - YouTube: click-to-load facade; the iframe is only created on click,
     from youtube-nocookie.com, never with autoplay
   - maps only from https://www.google.com/maps/embed
   ===================================================================== */
(() => {
  const ROOT_PATH = document.body.dataset.root || "";
  const ITEMS = window.MEDIA || [];
  const BY_ID = Object.fromEntries(ITEMS.map(m => [m.id, m]));

  const REQUIRED = {
    youtube: ["youtubeId", "caption", "credit", "sourceUrl"],
    image:   ["src", "alt", "caption", "credit", "licence", "sourceUrl"],
    link:    ["url", "caption", "credit"],
    map:     ["embedSrc", "caption", "credit"],
  };

  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const isHttps = u => /^https:\/\/[^\s"'<>]+$/.test(u || "");

  // Warn once per item, not once per place it appears
  const warned = new Set();
  function warn(id, why) {
    if (warned.has(id)) return;
    warned.add(id);
    console.warn(`[media] "${id}" is not shown: ${why}. Edit js/media-data.js.`);
  }

  // Returns the item if it is complete and safe to show, otherwise null (+ warning)
  function ready(id) {
    const m = BY_ID[id];
    if (!m) { warn(id, "no item with this id"); return null; }
    const req = REQUIRED[m.type];
    if (!req) { warn(id, `unknown type "${m.type}"`); return null; }
    const missing = req.filter(k => !String(m[k] ?? "").trim());
    if (missing.length) { warn(id, `missing ${missing.join(", ")}`); return null; }
    // any filled field (required or optional) that still says TODO
    const todo = Object.keys(m).filter(k => typeof m[k] === "string" && /TODO/i.test(m[k]));
    if (todo.length) { warn(id, `still has TODO in ${todo.join(", ")}`); return null; }
    if (m.type === "image" && !/^assets\/img\/[^/][^"'<>]*$/.test(m.src)) { warn(id, "images must be files in assets/img/"); return null; }
    if (m.type === "youtube" && !/^[\w-]{11}$/.test(m.youtubeId)) { warn(id, "youtubeId should be the 11-character video id"); return null; }
    if (m.type === "map" && !/^https:\/\/www\.google\.com\/maps\/embed\?/.test(m.embedSrc)) { warn(id, "embedSrc must start with https://www.google.com/maps/embed?"); return null; }
    for (const k of ["url", "sourceUrl"]) if (m[k] && !isHttps(m[k])) { warn(id, `${k} must be an https:// link`); return null; }
    return m;
  }

  const newTab = `<span class="sr-only"> (opens in a new tab)</span>`;

  // ---- one item → HTML ----
  function html(m) {
    switch (m.type) {
      case "image":
        return `
          <figure class="media media--image">
            <img src="${esc(ROOT_PATH + m.src)}" alt="${esc(m.alt)}" loading="lazy" decoding="async">
            <figcaption>${esc(m.caption)}
              <span class="media__credit">Photo: ${esc(m.credit)}, <a href="${esc(m.sourceUrl)}" target="_blank" rel="noopener">${esc(m.licence)}${newTab}</a></span>
            </figcaption>
          </figure>`;

      case "youtube":
        return `
          <figure class="media media--youtube" data-yt="${esc(m.youtubeId)}" data-title="${esc(m.caption)}">
            <div class="media-yt">
              <div class="media-yt__facade">
                ${m.contentNote ? `<p class="media-yt__note">${esc(m.contentNote)}</p>` : ""}
                <button type="button" class="media-yt__play">
                  <svg viewBox="0 0 68 48" width="68" height="48" aria-hidden="true" focusable="false"><rect width="68" height="48" rx="12"/><path d="M27 15l18 9-18 9z"/></svg>
                  <span class="sr-only">Load video: ${esc(m.caption)}</span>
                </button>
                <p class="media-yt__caption" aria-hidden="true">${esc(m.caption)}</p>
              </div>
            </div>
            <figcaption><span class="media-yt__cap-after" hidden>${esc(m.caption)} </span>
              <span class="media__credit">Video: ${esc(m.credit)}, <a href="${esc(m.sourceUrl)}" target="_blank" rel="noopener">source${newTab}</a></span>
            </figcaption>
          </figure>`;

      case "map":
        return `
          <figure class="media media--map">
            <iframe src="${esc(m.embedSrc)}" title="Map: ${esc(m.caption)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <figcaption>${esc(m.caption)} <span class="media__credit">Map: ${esc(m.credit)}</span></figcaption>
          </figure>`;

      case "link":
        return `
          <a class="media media--link" href="${esc(m.url)}" target="_blank" rel="noopener">
            <span class="media-link__caption">${esc(m.caption)}</span>
            <span class="media__credit">${esc(m.credit)}</span>
            <span class="media-link__go">View at source ↗${newTab}</span>
          </a>`;
    }
    return "";
  }

  // ---- fill every [data-media] slot ----
  function mountAll(scope = document) {
    scope.querySelectorAll("[data-media]").forEach(slot => {
      const items = slot.dataset.media.split(",").map(s => s.trim()).filter(Boolean).map(ready).filter(Boolean);
      slot.innerHTML = items.map(html).join("");
      slot.hidden = items.length === 0;
    });
  }

  // ---- YouTube facade: create the iframe only when clicked ----
  document.addEventListener("click", e => {
    const btn = e.target.closest(".media-yt__play");
    if (!btn) return;
    const fig = btn.closest(".media--youtube");
    const id = fig.dataset.yt;
    if (!/^[\w-]{11}$/.test(id)) return;
    const frame = document.createElement("iframe");
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?rel=0`;   // no autoplay: the viewer presses play in the player
    frame.title = fig.dataset.title || "Video";
    frame.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture";
    frame.allowFullscreen = true;
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    const box = fig.querySelector(".media-yt");
    box.replaceChildren(frame);
    const after = fig.querySelector(".media-yt__cap-after");
    if (after) after.hidden = false;   // caption moves under the player
    frame.focus();
  });

  // ---- sources.html: "Images and video" ----
  function fillSources() {
    const list = document.querySelector("[data-media-sources]");
    if (!list) return;
    const items = ITEMS.map(m => ready(m.id)).filter(Boolean);
    list.innerHTML = items.map(m => {
      const link = m.sourceUrl || m.url || "";
      const parts = [
        `${esc(m.credit)}.`,
        m.date ? `${esc(m.date)}.` : "",
        `“${esc(m.caption.replace(/\.$/, ""))}.”`,
        m.licence ? `${esc(m.licence)}.` : "",
        link ? `<a href="${esc(link)}" target="_blank" rel="noopener">${esc(link)}</a>.` : "",
        "Accessed November 2026.",
      ].filter(Boolean);
      return `<li id="media-${esc(m.id)}">${parts.join(" ")}</li>`;
    }).join("");
    const section = list.closest("[data-media-sources-section]");
    if (section) section.hidden = items.length === 0;
  }

  window.Media = { ready, html, mountAll };

  const start = () => { mountAll(); fillSources(); };
  // Scripts sit at the end of <body>; DOMContentLoaded fires after every
  // page script (main.js, housing.js) has built its HTML.
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
