/* =====================================================================
   data.js: shared story content that main.js turns into HTML.
   Loaded on EVERY page (index, subpages, sources).
   Edit the text here; you should not need to touch main.js.
   Tip: in VS Code, search the whole project for "TODO" (Cmd+Shift+F).

   CITATIONS: cite: ["id", ...] uses the ids in js/citations.js.
   Inside running text, write {cite:id1,id2} where the citation goes.
   ===================================================================== */


/* ---------------------------------------------------------------------
   TIMELINE (index.html #fire)
   phase: "before" (green), "during" (orange) or "after" (grey)
   key:   true  = shown by default (marked ★ in your outline)
          false = shown only after "Show full timeline"
   text:  the event, one sentence
   cite:  citation ids (js/citations.js); every event has one
   media (optional): null, or
     { type: "image",   src: "assets/file.jpg", alt: "description", caption: "" }
     { type: "youtube", id: "VIDEO_ID", title: "what the video shows", caption: "" }
       (VIDEO_ID is the part after "watch?v=" in a YouTube link)
     An empty src / id shows a [TODO] slot.
   links (optional): [{ label: "Text", url: "https://..." }]
   --------------------------------------------------------------------- */
const TIMELINE = [
  // ----- BEFORE -----
  { phase: "before", key: true,  date: "1983",
    text: "Wang Fuk Court completed: a Home Ownership Scheme estate of 8 blocks, 31 storeys each.",
    cite: ["wiki-kwongfuk"] },
  { phase: "before", key: false, date: "1997",
    text: "Owners form an owners' corporation and take over management.",
    cite: ["wfc-archive"] },
  { phase: "before", key: true,  date: "Jun 2016",
    text: "Government orders a mandatory building and window inspection because of the estate's age.",
    cite: ["wfc-archive"] },
  { phase: "before", key: false, date: "Dec 2019",
    text: "Inspection report finds spalling concrete, exposed steel and leaks.",
    cite: ["wfc-archive"] },
  { phase: "before", key: false, date: "May–Jul 2023",
    text: "Open tender through a government-backed platform; 57 contractors bid.",
    cite: ["wfc-archive"] },
  { phase: "before", key: true,  date: "Jan 2024",
    text: "Owners' meeting approves a renovation of about HK$330 million.",
    cite: ["hkfp-2025-timeline"] },
  { phase: "before", key: false, date: "Apr 2024",
    text: "Contract signed with the main contractor.",
    cite: ["wfc-archive"] },
  { phase: "before", key: true,  date: "Jul 2024",
    text: "Works begin; all 8 blocks are wrapped in bamboo scaffolding and green netting.",
    cite: ["wfc-archive"],
    media: { type: "image", src: "", alt: "[TODO: alt text]", caption: "[TODO: caption]" } },
  { phase: "before", key: true,  date: "Sep 2024",
    text: "More than 1,000 owners attend a special meeting and remove the entire owners' corporation. The contract stands.",
    cite: ["sixthtone-2025"] },
  { phase: "before", key: false, date: "2025",
    text: "Typhoons damage the netting; owners complain repeatedly through the 1823 hotline.",
    cite: ["udn-2026-kong"] },
  { phase: "before", key: false, date: "Oct 2025",
    text: "After a scaffolding fire at another building, an owners' committee member emails the ICU and the Labour Department urging action.",
    cite: ["udn-2026-kong"] },

  // ----- DURING -----
  { phase: "during", key: true,  date: "26 Nov 2025, 2:51 pm",
    text: "Fire starts low on Wang Cheong House and climbs four floors in about two minutes.",
    cite: ["standard-2026-spread"],
    media: { type: "youtube", id: "", title: "[TODO: video title]", caption: "[TODO: caption]" } },
  // TODO: verify exact alarm times (No.4 at 15:34, No.5 at 18:22) in the HKFP timeline
  { phase: "during", key: false, date: "26 Nov 2025, evening",
    text: "Fire raised to the highest alarm level as it spreads across the estate.",
    cite: ["hkfp-2025-timeline"] },
  // TODO: verify duration (~43 hours) before adding it
  { phase: "during", key: true,  date: "26–28 Nov 2025",
    text: "Seven of eight towers burn. Firefighter Ho Wai-ho, 37, dies.",
    cite: ["standard-2025-ho", "rthk-2026-ho"] },

  // ----- AFTER -----
  { phase: "after", key: true,  date: "2 Dec 2025",
    text: "Chief Executive announces an independent committee led by a judge.",
    cite: ["caixin-2025"] },
  { phase: "after", key: true,  date: "15 Jan 2026",
    text: "Final death toll: 168 people, aged 6 months to 98.",
    cite: ["cp24-2026"] },
  { phase: "after", key: false, date: "21 Feb 2026",
    text: "Government offers to buy back flats in the seven burned blocks for about HK$6.8 billion, or swap them for other flats.",
    cite: ["newsgov-2026-buyout"] },
  { phase: "after", key: false, date: "Mar–Jun 2026",
    text: "Public inquiry hearings.",
    cite: ["standard-2026-systemic"] },
  { phase: "after", key: true,  date: "10 Jun 2026",
    text: "7 people and 2 companies charged, including with manslaughter; names of the dead made public for the first time.",
    cite: ["rthk-2026-charges"] },
  { phase: "after", key: false, date: "31 Aug 2026",
    text: "Separate case: 50 arrested over a bid-rigging syndicate covering 27 estates.",
    cite: ["standard-2026-50arrested"] },
  { phase: "after", key: true,  date: "29 Oct 2026",
    text: "Inquiry report published. The main contractor and consultant are held chiefly responsible; four government departments share responsibility. Officials apologise; the Secretary for Housing resigns.",
    cite: ["dimsum-2026-chief", "standard-2026-deficiencies"],
    media: { type: "image", src: "", alt: "[TODO: alt text]", caption: "[TODO: caption]" } },
  { phase: "after", key: false, date: "Nov 2026",
    text: "A new Public Housing Building Control Section replaces the ICU.",
    cite: ["standard-2026-reform"] },
];

// Labels shown above each phase group, and on the toggle button
const TIMELINE_PHASES = {
  before: "Before",
  during: "During",
  after: "After",
};
const TIMELINE_TOGGLE = { more: "Show full timeline", less: "Show key events only" };


/* ---------------------------------------------------------------------
   THEORY CARDS (the reusable TheoryCard component in main.js)
   Used exactly 4 times: #responsible, #gap, #realign, and the footer.
   {cite:id1,id2} becomes an (Author, Year) link.
   --------------------------------------------------------------------- */
const THEORY = {
  label: "Theory: responsibilization",
  responsible: "Sociologists call this responsibilization: governments shift duties that were once public onto individuals, families and communities, often without giving them the resources or power to carry them out {cite:garland-1996,rose-1996}. Hong Kong's government stated the principle plainly when it consulted on building maintenance: “it is the owners' responsibility to ensure that their buildings are in good repair” {cite:devb-mbi}.",
  gap: "This is the cost of responsibilization: owners were handed a duty without the expertise, information or enforcement power to carry it out. The owners' own representative told the inquiry they did not have the capacity to manage works of this size {cite:udn-2026-kong}.",
  realign: "Read through responsibilization, the reforms move some power back to the state but leave the duty with owners. They tighten the rules around owners rather than lifting the burden from them.",
  methodsTitle: "Theoretical framework",
  methods: "This project uses the concept of responsibilization, first developed to describe how governments shifted crime control onto communities {cite:garland-1996,rose-1996}, to analyse building maintenance. In Hong Kong, government policy {cite:devb-mbi} and even some research {cite:lau-2013} start from the assumption that owners are responsible for their buildings. This project asks what that assumption costs when owners lack power.",
};


/* ---------------------------------------------------------------------
   MEDIA QUOTES (no longer shown on index.html; kept for later use)
   layer: "direct", "oversight" or "structural"
   --------------------------------------------------------------------- */
const QUOTES = [
  { layer: "direct",     quote: "[TODO: quote]", outlet: "[TODO: outlet]", date: "[TODO: date]", url: "#" },
  { layer: "oversight",  quote: "[TODO: quote]", outlet: "[TODO: outlet]", date: "[TODO: date]", url: "#" },
  { layer: "structural", quote: "[TODO: quote]", outlet: "[TODO: outlet]", date: "[TODO: date]", url: "#" },
  { layer: "direct",     quote: "[TODO: quote]", outlet: "[TODO: outlet]", date: "[TODO: date]", url: "#" },
  { layer: "structural", quote: "[TODO: quote]", outlet: "[TODO: outlet]", date: "[TODO: date]", url: "#" },
  { layer: "oversight",  quote: "[TODO: quote]", outlet: "[TODO: outlet]", date: "[TODO: date]", url: "#" },
];

/* The old "system" towers and 2x2 chart data were replaced:
   - entry cards, 2x2 chart, reform scorecard → js/story-data.js
   - chain of responsibility                   → js/who-failed-data.js */


/* ---------------------------------------------------------------------
   FOOTER text (shared by every page)
   --------------------------------------------------------------------- */
const FOOTER = {
  methods: "This is a qualitative case study of one estate. I drew on the independent inquiry's hearings and report, Hong Kong laws and government documents, 2021 Census figures reported by HK01, records compiled by the Wang Fuk Court Fire Archive, and English- and Chinese-language news coverage. Reading Chinese sources let me use testimony and reporting that English coverage often leaves out. I could not interview residents, and the criminal cases are still before the courts, so anyone charged is described as ‘alleged’. Chinese quotations are my own translations.",
  about: "Final project for SOC 225: Urban Studies and Urban Policies, Wellesley College, Fall 2026. By Wanru (Rue) Huang.",
  ethics: "Names of the 168 people who died come from court documents made public on 10 June 2026; the government had first withheld them at families' request. This site shows no images of victims. Stories are taken only from published reporting and are paraphrased, with sources. The site is a work in progress; corrections are welcome.",
};
