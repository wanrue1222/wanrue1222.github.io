/* =====================================================================
   story-data.js: content for the restructured index.html.
   The site asks ONE question: how were power and responsibility
   separated at Wang Fuk Court, and who paid for it?

   Section map (index.html):
     #fire         The fire           (hero, statements, timeline: data.js)
     #responsible  Who was made responsible   ← RESPONSIBLE below
     #power        Who held the power         ← POWER below + law-data.js + who-failed-data.js
     #gap          The gap                    ← GAP below + who-failed-data.js
     #realign      Realigning?                ← REALIGN below (+ trade-off from law-data.js)

   CITATIONS: cite: ["id", ...] uses the ids in js/citations.js.
   Inside running text, write {cite:id1,id2}.
   Theory cards live in data.js (THEORY), because the footer needs one too.
   ===================================================================== */
window.STORY = {

  /* ---------- Part 1: Who was made responsible ---------- */
  responsible: {
    // Entry cards to the two subpages. href is relative to the site root.
    cards: [
      { label: "Housing system", href: "system/housing.html",
        takeaway: "The government built these flats, sold them, and handed over the repairs.",
        cite: ["ha-property-mgmt"] },
      { label: "The law", href: "system/law.html",
        takeaway: "By law, owners must inspect and repair buildings over 30 years old, or face fines and prison.",
        cite: ["clic-mbis", "bd-mbis-penalty"] },
    ],
    cardCta: "Read more",
    closing: "By law, the owners were responsible.",
  },


  /* ---------- Part 2: Who held the power ---------- */
  power: {
    lead: "Responsibility sat with the owners. The power to shape the works sat elsewhere.",
  },


  /* ---------- Part 3: The gap ---------- */
  gap: {
    // a. Reader vote. The choice stays in memory only (a JS variable).
    vote: {
      question: "Who should have been responsible?",
      options: ["Contractors", "Regulators", "Government", "Owners"],
      response: "You chose {choice}. [TODO: short response to the reader's choice]",
      hint: "Choose one to continue.",
    },

    // b. 2x2 chart
    matrix: {
      title: "Power and responsibility",
      xLabel: "Legal responsibility for the building",
      yLabel: "Power over the works",
      low: "low",
      high: "high",
      hint: "Select a label to find it in the chain of responsibility below.",
      quadrants: {
        tl: "Power, little responsibility",
        tr: "Both",
        bl: "Neither, yet at risk",
        br: "Responsibility, little power",
      },
      // tone: "grey" | "green" | "owner" | "empty"
      // target.nodes: chain node ids (js/who-failed-data.js) to show
      // target.anchor: an element id on the page to scroll to instead
      placements: [
        { quadrant: "tl", label: "Contractor, consultant", tone: "grey",  target: { nodes: ["consultant", "contractor"] } },
        { quadrant: "tl", label: "Government departments", tone: "green", target: { nodes: ["icu", "bd", "fsd", "labour"] } },
        { quadrant: "tr", label: "Nobody",                 tone: "empty" },
        { quadrant: "bl", label: "Domestic helpers, tenants, children", tone: "grey", target: { anchor: "who-paid" } },
        { quadrant: "br", label: "Owners",                 tone: "owner", target: { nodes: ["owners"] } },
      ],
      targetHint: "show in the chain of responsibility",
      anchorHint: "go to Who paid",
      caption: "No one held both power and responsibility. Those with neither still bore the risk.",
    },

    // f. Who paid. Numbers come from MEMORIAL.facts (js/memorial-data.js),
    //    cited to the two official lists in MEMORIAL.sources.
    whoPaid: {
      title: "Who paid",
      text: "168 people died, aged 6 months to 98. Ten were domestic workers, who had no vote in any owners' meeting.",
      cite: ["hkfp-2026-victims", "singtao-2026-victims"],
      button: "Open the memorial",
    },
  },


  /* ---------- Part 4: Realigning? ---------- */
  realign: {
    scorecard: {
      title: "The reforms",
      caption: "Reforms announced after the fire: who gains power, and who still carries responsibility",
      columns: ["Reform", "Who gains power", "Who still carries responsibility", "Status"],
      responsibilityColumn: 2,     // this column gets the orange header
      rows: [
        { reform: "Criminalise bid-rigging in building maintenance (up to 10 years in prison)",
          gains: "Cartels lose power; police, ICAC and Competition Commission gain enforcement power",
          carries: "Owners still run tenders",
          status: { text: "Announced Oct 2026, not yet law", cite: ["dimsum-2026-criminalise"] } },
        { reform: "Building Management Ordinance amendments: higher attendance and voting thresholds for large repairs, proxy and declaration-of-interest rules",
          gains: "Harder for a small group to commit the estate",
          carries: "Owners, now with a higher bar to pass any repair",
          status: { text: "Consultation Aug–Sep 2026", cite: ["hkgov-2026-bmo"] } },
        { reform: "Public Housing Building Control Section replaces the ICU; a liaison officer for each owners' corporation",
          gains: "Government takes back some oversight",
          carries: "Owners still organise and pay",
          status: { text: "Set up Nov 2026", cite: ["standard-2026-reform"] } },
        { reform: "Fire system shutdowns now need Fire Services Department approval",
          gains: "Government",
          carries: "Owners and their contractors",
          status: { text: "Announced after the fire", cite: ["standard-2026-reform"] } },
      ],
    },
    // The trade-off box text comes from LAW.reforms.tradeoff (js/law-data.js)
  },
};
