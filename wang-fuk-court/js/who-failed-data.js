/* =====================================================================
   who-failed-data.js: text, numbers and citations for four pieces of
   index.html. main.js (section 10) turns this into HTML.
     crossSection → #power  (Part 2, block d: how it spread)
     chain        → #gap    (Part 3, the chain of responsibility)
     owners       → #gap    (the owners in the middle)
     closing      → #gap    (closing line)
   (eyebrow / title / lead below are no longer shown.)

   LEGAL RULE for this section: anyone facing criminal charges is
   described with "charged", "alleged" or "prosecutors allege".
   Inquiry findings are written as "the inquiry found".
   Never call anyone guilty.

   CITATIONS: cite: ["id", ...] uses the ids in js/citations.js,
   and each one links to its entry on sources.html.
   ===================================================================== */
window.WHO_FAILED = {

  eyebrow: "Failure",
  title: "Who failed",
  lead: "Every line of defence failed. The owners stood in the middle, legally responsible for all of it.",


  /* ---------- A. How it spread (building cross-section) ----------
     x / y are positions in the drawing (viewBox 0 0 520 760).
     The drawing itself is built in main.js; only words + positions live here. */
  crossSection: {
    title: "How it spread",
    lead: "Decisions the owners could not see or control shaped how the fire spread.",
    intro: "A schematic cross-section of one Wang Fuk Court tower during renovation. Select a numbered point.",
    svgTitle: "Schematic cross-section of a Wang Fuk Court tower wrapped in bamboo scaffolding and netting during renovation",
    panelTitle: "What failed?",
    panelIntro: "Each numbered point marks one link in the chain of failures. Select a point to read what happened there and which sources document it.",
    whyLabel: "Why it matters",
    playLabel: "▶ Show how it spread",
    resetLabel: "Reset",
    note: "Schematic, not to scale. Simplified from inquiry evidence and news reports.",
    // small grey labels inside the drawing
    drawing: { storeys: "31 storeys", floorLow: "4/F", floorHigh: "8/F", scaffold: ["scaffolding", "+ netting"],
               flats: "flats", well: "light well", stair: "stair" },

    spots: [
      { n: 1, x: 125, y: 612, title: "Fire starts low on the façade",
        body: "The fire broke out at Wang Cheong House at about 2:51 p.m. on 26 November 2025. The inquiry heard it climbed from the 4th to the 8th floor in roughly two minutes.",
        why: "Speed matters: residents had almost no time, especially older people who could not move quickly.",
        cite: ["standard-2026-spread"] },

      { n: 2, x: 125, y: 380, title: "Bamboo scaffolding and green netting",
        body: "All eight 31-storey towers were wrapped in bamboo scaffolding and green construction netting up to the rooftops. Investigators found the mesh was not fire-retardant, so it acted like a fuse running up the building.",
        why: "Who checked the materials? Owners hired the contractor, but nobody independent verified the netting.",
        cite: ["bbc-2025-whatweknow", "scmp-2026-checks"] },

      // TODO: verify in the SCMP article that the foam boards were fixed over the WINDOWS.
      // (Fortune says Styrofoam spread the fire through corridors, but not where it was fixed.)
      { n: 3, x: 395, y: 330, title: "Foam boards over the windows",
        body: "During renovation, polystyrene foam boards were fixed over windows to protect them. Foam is highly flammable, so every window became another source of fuel.",
        why: "A cheap shortcut in a renovation project that residents were paying for themselves.",
        cite: ["scmp-2026-checks"] },

      { n: 4, x: 260, y: 300, title: "The light well: a chimney",
        body: "Government counsel told the inquiry that the estate's light well created a chimney effect, funnelling flames upward through the building.",
        why: "A design feature from 1983 became a hazard once the building aged and was wrapped in flammable material.",
        cite: ["standard-2026-systemic"] },

      { n: 5, x: 310, y: 470, title: "Openings cut into fire-rated stairwells",
        body: "The inquiry found the consultant approved openings cut into fire-rated emergency staircases for workers. This weakened the barriers meant to keep fire and smoke out of the only escape route.",
        why: "The escape route failed first, so the risk fell hardest on residents who could not move quickly.",
        cite: ["standard-2026-inquiry"] },

      { n: 6, x: 206, y: 652, title: "Fire alarms switched off",
        body: "Months before the fire, an estate management electrician, following the contractor's instruction, turned off a main switch to drain water tanks. It also cut power to the entire fire alarm system. Survivors said they heard no alarm.",
        why: "Small decisions by hired workers disabled a safety system that residents had paid for.",
        cite: ["star-2026-donttell"] },

      // TODO: the "nearly 40% aged 65 or above" figure was NOT found in the Fortune article.
      // Check the SCMP multimedia series, or use HK01 (36% elderly, 2021 Census) instead.
      { n: 7, x: 355, y: 170, title: "Who lived here",
        body: "Close to 2,000 flats housed nearly 5,000 people. Nearly 40% of residents were aged 65 or above, and many were at home when the fire started.",
        why: "Class and age: lower- and middle-income owners of subsidised flats, ageing in place in an ageing building.",
        cite: ["kwan-2025-whatweknow", "scmp-2026-multimedia"] },

      { n: 8, x: 260, y: 50, title: "Why were they renovating?",
        body: "Wang Fuk Court is a Home Ownership Scheme estate completed in 1983. Because of its age, authorities flagged it for mandatory building and window inspection in 2016, which led to the large-scale repair project.",
        why: "The law required owners to repair, but left them to manage it alone.",
        cite: ["wfc-archive", "scmp-2025-infographic", "wiki-kwongfuk"] },
    ],

    // "▶ Show how it spread": each caption appears at `ms` after pressing play
    steps: [
      { ms: 0,    text: "Fire ignites on the lower façade and races up the netting.", cite: ["standard-2026-spread"] },
      { ms: 1200, text: "Flames enter the light well, and the chimney effect pulls them upward.", cite: ["standard-2026-systemic"] },
      { ms: 2200, text: "Smoke pours into the stairwell, the only way out.", cite: ["standard-2026-inquiry"] },
      { ms: 3400, text: "Fire wraps the other façade and jumps to neighbouring blocks. Seven of eight towers burned.", cite: ["wiki-kwongfuk"] },
    ],
  },


  /* ---------- B. The chain of responsibility ---------- */
  chain: {
    title: "The chain of responsibility",
    instruction: "Choose a layer to highlight it, then select any box to see what it was supposed to do and what happened.",
    tiers: {
      gov:   "Government: supposed to check",
      hired: "Hired by owners: did the work",
    },
    arrows: { hires: "hires and pays", checks: "checks" },
    // read by screen readers instead of the drawn arrows
    srSummary: "The owners' corporation hires and pays the five firms in the bottom row. The four government departments in the top row are supposed to check those firms' work.",
    layers: {
      direct:     { label: "Direct",     announce: "Direct: the firms hired to do the work are highlighted." },
      oversight:  { label: "Oversight",  announce: "Oversight: the government departments meant to check are highlighted." },
      structural: { label: "Structural", caption: "Structural: a system that made owners responsible for the work while others did it and others checked it." },
    },
    labels: { supposed: "Supposed to", happened: "What happened", status: "Status", close: "Close" },

    // tier: "gov" (top, green), "owners" (middle, orange), "hired" (bottom, grey)
    // node / nodeSub: the short text on the box.  name / nameZh: the panel heading.
    nodes: [
      { id: "icu", tier: "gov", node: "ICU", nodeSub: "Independent Checking Unit",
        name: "Independent Checking Unit, Housing Bureau", nameZh: "房屋局獨立審查組",
        supposed: { text: "Apply building control to Home Ownership Scheme estates the Housing Authority has sold, including oversight of repairs.", cite: ["icu-ourwork"] },
        happened: { text: "The inquiry found it bore the largest share of responsibility among government departments. Officials gave the consultant a week's notice of an inspection, and the contractor bought compliant netting only after learning of it. When an owners' committee member raised concerns, the unit replied that officers had visited, but did not say whether the netting complied.",
                    cite: ["standard-2026-deficiencies", "star-2026-donttell", "udn-2026-kong"] },
        status: { text: "Named in inquiry report",
                  note: { text: "Replaced in November 2026 by a new Public Housing Building Control Section.", cite: ["standard-2026-reform"] } } },

      { id: "bd", tier: "gov", node: "Buildings Department",
        name: "Buildings Department", nameZh: "屋宇署",
        // Citation added: the Buildings Ordinance itself (Cap. 123).
        supposed: { text: "Enforce building safety under the Buildings Ordinance.", cite: ["cap123"] },
        happened: { text: "Named by the inquiry, with the ICU, as carrying the main responsibility among departments. The report pointed to a system that relied on professionals' integrity and poor coordination between the two bodies.",
                    cite: ["standard-2026-deficiencies"] },
        status: { text: "Named in inquiry report" } },

      { id: "fsd", tier: "gov", node: "Fire Services Department",
        name: "Fire Services Department", nameZh: "消防處",
        // TODO: no source yet for this role description.
        supposed: { text: "Oversee fire safety systems." },
        happened: { text: "Named in the inquiry report. Before the fire, shutting down a building's fire systems did not require its approval; that rule was added only after the fire.",
                    cite: ["edn-2026-report", "standard-2026-reform"] },
        status: { text: "Named in inquiry report" } },

      // TODO: verify the "16 inspections" figure in the HKFP timeline before publishing.
      { id: "labour", tier: "gov", node: "Labour Department",
        name: "Labour Department", nameZh: "勞工處",
        // TODO: no source yet for this role description.
        supposed: { text: "Enforce workplace safety on construction sites." },
        happened: { text: "Inspected the site 16 times from July 2024, the last about a week before the fire. Residents complained about falling bamboo and stones and workers smoking; complaints were passed between departments.",
                    cite: ["hkfp-2025-timeline", "udn-2026-kong", "star-2026-passball"] },
        status: { text: "Named in inquiry report" } },

      { id: "owners", tier: "owners", node: "Owners' corporation", nodeSub: "Legally responsible",
        name: "Owners' corporation", nameZh: "業主立案法團",
        supposed: { text: "By law, manage the building's common parts, run tenders, and approve repair works at owners' meetings.", cite: ["bd-bm-faq"] },
        happened: { text: "The newly elected committee asked the contractor to carry out the works in stages; the contractor ignored the request. A committee member complained repeatedly through the 1823 hotline and emailed the ICU and the Labour Department after a scaffolding fire elsewhere in October 2025. He also admitted the committee lacked fire safety expertise, never fixed problems with proxy votes, and never asked whether the foam boards complied.",
                    cite: ["standard-2026-inquiry", "udn-2026-kong", "standard-2026-ocfaults"] },
        status: { text: "Not among the parties the inquiry held chiefly responsible", cite: ["dimsum-2026-chief"] } },

      { id: "consultant", tier: "hired", node: "Consultant", nodeSub: "Will Power",
        name: "Consultant: Will Power Architects", nameZh: "鴻毅",
        // TODO: no source yet for this role description.
        supposed: { text: "Supervise the contractor on the owners' behalf." },
        happened: { text: "The inquiry found it failed to supervise the contractor and approved openings cut into fire-rated staircases. Prosecutors allege it hid the contractor's litigation record and inflated its tender score.",
                    cite: ["standard-2026-inquiry", "rthk-2026-charges"] },
        status: { text: "Charged; case ongoing" } },

      { id: "contractor", tier: "hired", node: "Main contractor", nodeSub: "Prestige",
        name: "Main contractor: Prestige Construction & Engineering", nameZh: "宏業",
        // TODO: no source yet for this role description.
        supposed: { text: "Carry out the works to safety standards." },
        happened: { text: "The inquiry found gross negligence: suspected forged netting certificates, concealed failed combustion tests, deleted inspection footage, cheaper non-fire-retardant material swapped in, and worker smoking left uncontrolled. All eight blocks were wrapped in netting and foam boards for over a year.",
                    cite: ["standard-2026-inquiry"] },
        status: { text: "Charged, including manslaughter; case ongoing", cite: ["rthk-2026-charges"] } },

      { id: "inspector", tier: "hired", node: "Registered inspector",
        name: "Registered inspector", nameZh: "註冊檢驗人員",
        // TODO: no source yet for this role description.
        supposed: { text: "Use professional credentials to certify the works were safe." },
        happened: { text: "The inquiry found the firms used a nominal inspector and other figurehead professionals to sign statutory filings, creating an appearance of compliance.",
                    cite: ["standard-2026-inquiry", "dimsum-2026-chief"] },
        status: { text: "Charged; case ongoing", cite: ["rthk-2026-charges"] } },

      { id: "estate", tier: "hired", node: "Estate manager", nodeSub: "ISS EastPoint",
        name: "Estate manager: ISS EastPoint", nameZh: null,
        // TODO: no source yet for this role description.
        supposed: { text: "Run the estate's day-to-day management." },
        happened: { text: "An electrician, following the contractor's instruction and knowing he was not authorised, switched off a main switch to drain water tanks. He did not know it also cut power to the whole fire alarm system.",
                    cite: ["star-2026-donttell"] },
        status: { text: "Criticised at the inquiry hearings" } },

      // TODO: confirm Victory is the same "fire services contractor" that made the 16 shutdown applications.
      { id: "fire-contractor", tier: "hired", node: "Fire contractor", nodeSub: "Victory",
        name: "Fire contractor: Victory", nameZh: null,
        // TODO: no source yet for this role description.
        supposed: { text: "Maintain the estate's fire safety systems." },
        happened: { text: "The estate's fire services contractor applied 16 separate times to shut down fire equipment; hydrants and alarms were still off when the fire broke out. A week before the fire, a director found the main switch off and only told staff to inform the estate manager. He told the inquiry his trade had an attitude of not telling others how to do their jobs.",
                    cite: ["standard-2026-systemic", "star-2026-donttell"] },
        status: { text: "Criticised at the inquiry hearings" } },
    ],
  },


  /* ---------- C. The owners in the middle ----------
     paraphrase: NOT a quotation, so no quotation marks. */
  owners: {
    title: "The owners in the middle",
    paraphrase: { text: "A member of the owners' committee told the inquiry he had raised warning after warning, and that owners did not have the capacity to manage works of this size. He asked the government to give owners a professional support team.",
                  cite: ["udn-2026-kong"] },
    quote: { zh: "「我盡了能力，好無奈」", en: "“I did everything I could. I felt helpless.”",
             credit: "translated by the author", cite: ["udn-2026-kong"] },
    analysis: "The owners were not passive. They complained, emailed departments and voted out their own corporation. But by their own account, they lacked the expertise to judge fire safety, and the departments they turned to said the problems were someone else's responsibility. Every line of defence the owners paid for failed, and the one they could not pay for, government oversight, failed too.",
  },


  /* ---------- D. Closing line ---------- */
  closing: {
    line: "No government department supervised the fire risk at Wang Fuk Court.",
    // The caption reads: before + [source link] + after + original
    captionBefore: "Independent Committee report, as reported by ",
    source: { id: "edn-2026-report", text: "Economic Daily News (2026)" },
    captionAfter: "; translated by the author. Original: ",
    original: "「沒有一個政府部門監管到宏福苑的火警風險」",
    next: { label: "Next: Realigning?", href: "#realign" },
  },
};
