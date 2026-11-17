/* =====================================================================
   media-data.js: every photo, video, map and outside link on the site.
   js/media.js turns these into HTML wherever a page has
   <div data-media="id1,id2">, and lists them on sources.html.

   FIELDS
     id          unique name, used in data-media="..." and in TIMELINE (js/data.js)
     type        "youtube" | "image" | "link" | "map"
     youtubeId   youtube: the 11 characters after "watch?v=" in the YouTube link
     src         image: a file YOU added, e.g. "assets/img/scaffolding.jpg"
                 (only assets/img/ is allowed; never link to news-site images)
     url         link: the page to open
     embedSrc    map: the "src" from Google Maps → Share → Embed a map
                 (must start with https://www.google.com/maps/embed)
     caption     one sentence describing what is shown
     credit      photographer / channel / organisation
     licence     image: e.g. "CC BY-SA 4.0"
     sourceUrl   where the file came from (Wikimedia Commons page, YouTube URL...)
     date        optional, shown on sources.html, e.g. "26 November 2025"
     alt         image: real alt text describing the picture
     contentNote optional warning shown before a video loads

   REQUIRED (an item is hidden, with a console warning, until these are
   filled and contain no "TODO"):
     youtube: youtubeId, caption, credit, sourceUrl
     image:   src, alt, caption, credit, licence, sourceUrl
     link:    url, caption, credit
     map:     embedSrc, caption, credit
   Rule: no images of victims (see the footer ethics note).
   ===================================================================== */
window.MEDIA = [
  { id: "before-map", type: "map",
    embedSrc: "TODO: Google Maps embed src for 宏福苑",
    caption: "Wang Fuk Court, Tai Po, before the fire.",
    credit: "Google Maps" },

  { id: "scaffolding", type: "image",
    src: "assets/img/TODO.jpg",
    caption: "The estate wrapped in bamboo scaffolding and green netting during renovation.",
    credit: "TODO author",
    licence: "TODO e.g. CC BY-SA 4.0",
    sourceUrl: "TODO Wikimedia Commons file page",
    alt: "TODO" },

  { id: "fire-video", type: "youtube",
    youtubeId: "TODO",
    caption: "News footage of the fire on 26 November 2025.",
    credit: "TODO channel name",
    sourceUrl: "TODO YouTube URL",
    contentNote: "This video shows the fire. It does not show injuries." },

  { id: "after", type: "image",
    src: "assets/img/TODO.jpg",
    caption: "The burned towers after the fire.",
    credit: "TODO",
    licence: "TODO",
    sourceUrl: "TODO",
    alt: "TODO" },

  { id: "report-video", type: "youtube",
    youtubeId: "TODO",
    caption: "Officials respond to the inquiry report, 29 October 2026.",
    credit: "TODO channel",
    sourceUrl: "TODO" },

  { id: "history-1982", type: "link",
    url: "https://gwulo.com/media/40926",
    caption: "Wang Fuk Court under construction, 1982 (Gwulo).",
    credit: "Gwulo / Flickr user eatsee111" },

  { id: "sale-1983", type: "link",
    url: "https://gwulo.com/media/52540",
    caption: "Wang Fuk Court goes on sale, January 1983 (SCMP clipping, via Gwulo).",
    credit: "South China Morning Post, via Gwulo" },
];
