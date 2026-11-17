/* =====================================================================
   law-data.js: content for system/law.html AND index.html#power.
   Edit text, numbers and citations here; js/law.js does the layout.

   WHERE EACH PART APPEARS (js/law.js fills whichever containers a page has)
     system/law.html  : 1 hero, 2 duty, 8 end (link card)
     index.html#power : 3 owners, 4 voting, 5 bid-rigging, 6 checks
     index.html#realign uses reforms.tradeoff (the scorecard is in js/story-data.js)

   CITATIONS: `cite` is a list of ids from js/citations.js (= ids on
   sources.html). They render as (Author, Year) links.
   LEGAL CARE: anyone charged is described with "allege"/"charged" only.
   ===================================================================== */
window.LAW = {

  /* ---------- 1. Hero ---------- */
  hero: {
    eyebrow: "Who was made responsible · The law",
    title: "The law: what owners must do",
    takeaway: "Hong Kong's laws gave owners every duty of a building manager. They gave them very few tools to protect themselves.",
  },

  /* ---------- 2. The duty ----------
     Each card: law name (+ Chinese), what the law says, what it meant at WFC.
     nameCite = citation for the law itself (its e-Legislation page).
     penalty (optional) = big-number callout.                              */
  duty: {
    eyebrow: "The duty",
    title: "What the law asks of owners",
    lawLabel: "What the law says",
    wfcLabel: "What it meant at Wang Fuk Court",
    cards: [
      {
        name: "Private property and the deed of mutual covenant", nameZh: "公契",
        law: { text: "Once HOS flats are sold, the estate is private property. The Housing Authority manages it at first, then owners form an owners' corporation and take over management and repairs.", cite: ["ha-property-mgmt"] },
        wfc: { text: "Sold in 1983. Owners' corporation formed in 1997.", cite: ["wfc-archive"] },
      },
      {
        name: "Building Management Ordinance", nameZh: "建築物管理條例", cap: "Cap. 344", nameCite: ["cap344"],
        law: { text: "The owners' corporation runs the common parts of the building. It must hold a tender for any goods or services over HK$100,000 or 20% of its annual budget, and owners decide at a general meeting which tender to accept.", cite: ["bd-bm-faq", "brp-meeting"] },
        wfc: { text: "Owners approved a renovation of about HK$330 million in January 2024.", cite: ["hkfp-2025-timeline", "wfc-archive"] },
      },
      {
        name: "Buildings Ordinance and the Mandatory Building Inspection Scheme", nameZh: "建築物條例 · 強制驗樓計劃", cap: "Cap. 123", nameCite: ["cap123"],
        law: { text: "Owners of buildings 30 years or older must hire a registered inspector every 10 years and carry out the repairs found.", cite: ["clic-mbis"] },
        penalty: {
          figures: [
            { value: "HK$50,000", label: "fine" },
            { value: "1 year", label: "in prison" },
            { value: "HK$5,000", label: "a day while it continues" },
          ],
          text: "If owners don't act, the Buildings Department can do the work and charge them the cost plus up to 20%.",
          cite: ["bd-mbis-penalty"],
        },
        wfc: { text: "Received an inspection order in June 2016, which led to the renovation.", cite: ["wfc-archive"] },
      },
    ],
    closing: { text: "Not repairing could mean prison. Repairing meant managing a project worth hundreds of millions.", cite: ["bd-mbis-penalty", "hkfp-2025-timeline"] },
  },

  /* ---------- 3. Who were the owners? ---------- */
  owners: {
    eyebrow: "Capacity",
    title: "Who were the owners?",
    tiles: [
      { value: "36.6%", label: "aged 65 or older (Hong Kong average 19.5%)", cite: ["hk01-2025-census"] },
      { pre: "about", value: "33%", label: "retired", cite: ["hk01-2025-census"] },
      { value: "HK$330 million", label: "renovation to oversee", cite: ["hkfp-2025-timeline"] },
    ],
    // Your argument: keep this exact wording
    argument: {
      text: "The law treats every owner as a capable building manager. But judging a project this size takes expertise in engineering, pricing and contracts. Many Wang Fuk Court owners were retirees, so time was not the main problem. What they lacked was the knowledge and information to check the professionals they depended on. Residents complained that the works were poorly explained and turned to civic groups for help.",
      cite: ["wfc-archive", "sixthtone-2025"],
    },
    note: "HOS owners are lower- and middle-income families, not the poorest households, who live in public rental housing.",
  },

  /* ---------- 4. The voting rules ----------
     flats / cols: the dot grid (62 × 32 = 1,984 dots, one per flat)       */
  voting: {
    eyebrow: "Voting rules",
    title: "The voting rules: easy to approve, hard to stop",
    flats: 1984,
    cols: 62,
    tabs: [
      { key: "meeting", label: "To call an extraordinary meeting", pct: 5,
        text: "At least 5% of owners must sign a request to the chairman.", cite: ["bd-bm-faq"] },
      { key: "repair", label: "To pass a repair resolution", pct: 10,
        text: "A quorum of 10% of owners is enough for repair and maintenance resolutions; a majority of those voting decides.", cite: ["bd-bm-faq"] },
    ],
    note: { text: "Numbers are calculated from the legal thresholds and Wang Fuk Court's ~1,984 flats. They are not the actual attendance at any meeting.", cite: ["wiki-kwongfuk"] },

    // tone: "system" = green, "fail" = orange
    timeline: [
      { date: "Jan 2024", text: "Owners' meeting approves the renovation", tone: "system" },
      { date: "Apr 2024", text: "Contract signed", tone: "system" },
      { date: "Jul 2024", text: "Works begin; all 8 blocks wrapped in scaffolding", tone: "fail" },
      { date: "Sep 2024", text: "1,000+ owners attend a special meeting and remove the entire owners' corporation", tone: "fail" },
    ],
    timelineCite: ["wfc-archive", "sixthtone-2025"],
    caption: "The owners won back their corporation. They could not win back the contract.",

    // Paraphrase, NOT a direct quote
    testimony: {
      label: "From testimony to the inquiry (paraphrased)",
      text: "Resident Li Chun-ho told the inquiry that his mother and neighbours repeatedly tried and failed to call an owners' meeting about the contract. When she asked the anti-corruption agency and the district office for help, she was told to collect signatures from 5% of owners.",
      cite: ["udn-2026-li"],
    },
  },

  /* ---------- 5. Bid-rigging ---------- */
  bidrig: {
    eyebrow: "What they were up against",
    title: "Bid-rigging",
    titleZh: "圍標",
    definition: "Bid-rigging is when contractors secretly agree who will win a tender. The others submit deliberately high 'cover bids', so the chosen company looks like the best choice. Owners think they are comparing prices, but every option has been arranged.",
    // Flow diagram. who: "owners" (grey) or "cartel" (orange).
    // Lines are broken by hand so the text fits the boxes on phones.
    flow: [
      { id: "1",  who: "owners", title: ["Owners open a tender"], sub: ["(expect fair competition)"] },
      { id: "2",  who: "cartel", title: ["Contractors agree in secret"], sub: ["(pick the winner in advance)"] },
      { id: "3a", who: "cartel", title: ["Others submit", "cover bids"], sub: ["(deliberately too high)"] },
      { id: "3b", who: "cartel", title: ["Consultant tilts", "the scores"], sub: ["(sometimes paid", "by the cartel)"] },
      { id: "4",  who: "owners", title: ["Owners approve the “best” bid"], sub: ["(every option was arranged)"] },
      { id: "5",  who: "cartel", title: ["Inflated price, profit shared"], sub: [] },
    ],
    flowAlt: "Flow diagram of bid-rigging, in six steps.",
    stats: [
      { value: "1", label: "conviction for bid-rigging in building maintenance from 31 corruption complaints, 2018–2022", cite: ["star-2026-bidrig"] },
      { value: "50", label: "people arrested in Aug 2026 over a syndicate covering 27 estates and about HK$500 million in contracts", cite: ["standard-2026-50arrested"] },
    ],
    wfcCase: {
      label: "At Wang Fuk Court",
      text: "Prosecutors allege the consultant hid the main contractor's litigation record and inflated its tender score to win a contract worth over HK$300 million. The case is not yet decided.",
      cite: ["rthk-2026-charges"],
    },
    note: { text: "Until now, bid-rigging in building maintenance was only a civil matter under the Competition Ordinance.", cite: ["dimsum-2026-criminalise"] },
  },

  /* ---------- 6. The checks that failed ---------- */
  checks: {
    eyebrow: "Oversight",
    title: "The checks that failed",
    cards: [
      { title: "The inspector",
        text: "The system relied on registered inspectors to check the work. The inquiry found this “honour system” was exploited.", cite: ["scmp-2026-honour"] },
      { title: "The government checker",
        text: "For sold HOS estates, building control sits with the Housing Bureau's Independent Checking Unit, not the Buildings Department. The inquiry found it bore the largest share of responsibility among government departments.", cite: ["icu-ourwork", "standard-2026-deficiencies"] },
      { title: "Complaints",
        text: "Residents' complaints about fire risks were passed from one department to another and never resolved.", cite: ["star-2026-passball"] },
    ],
    closing: "Owners carried the legal duty and the cost. The government kept the role of checking, and that check failed.",
  },

  /* ---------- 7. The reforms ----------
     The table is no longer shown (index.html#realign has its own scorecard
     in js/story-data.js). The trade-off text below IS shown, on index.html#realign. */
  reforms: {
    eyebrow: "Reform",
    title: "The reforms, and a trade-off",
    columns: ["Reform", "What it changes", "Status"],
    rows: [
      { reform: "Criminalise bid-rigging in building maintenance (up to 10 years in prison)",
        changes: "Targets contractors and consultants",
        status: { text: "Announced Oct 2026, not yet law", cite: ["dimsum-2026-criminalise"] } },
      { reform: "Amend the Building Management Ordinance: higher attendance and voting thresholds for large repairs, better proxy rules, declarations of interest",
        changes: "Changes how owners decide",
        status: { text: "Public consultation Aug–Sep 2026", cite: ["hkgov-2026-bmo"] } },
      { reform: "New Public Housing Building Control Section replaces the Independent Checking Unit; a liaison officer for each owners' corporation",
        changes: "Moves some oversight back to government",
        status: { text: "Set up Nov 2026", cite: ["standard-2026-reform"] } },
    ],
    tradeoff: {
      label: "Trade-off",
      text: "Higher voting thresholds can stop a small group from approving a risky contract. But they also make necessary repairs harder to pass for owners who already struggle to organise. Do the reforms give owners more power, or a different version of the same burden?",
    },
  },

  /* ---------- 8. End of page (system/law.html): link card to Part 2 ---------- */
  end: {
    question: "But did owners have the power to carry this out?",
    link: { label: "Who held the power", href: "../index.html#power" },
    back: { label: "Back to the story", href: "../index.html#responsible" },
  },
};
