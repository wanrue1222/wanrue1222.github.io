/* =====================================================================
   housing-data.js: ALL content for system/housing.html.
   Edit text, numbers and citations here; js/housing.js does the layout.

   CITATIONS: `cite` is a list of ids from js/citations.js (which match
   the ids on sources.html). They render as (Author, Year) links.
   Chinese text: put it in the *Zh fields so it gets the right font/lang.
   ===================================================================== */
window.HOUSING = {

  /* ---------- 1. Hero ---------- */
  hero: {
    eyebrow: "Who was made responsible · Housing system",
    title: "Who builds, who owns, who repairs",
    takeaway: "Nearly half of Hong Kong lives in housing the government built. But who repairs the building depends on whether you rent it or bought it.",
    cite: ["ha-2025-figures"],   // "nearly half" = 29.4% public rental + 15.3% subsidized sale
  },

  /* ---------- 2. If Hong Kong were 100 people ----------
     count = number of icons (must add up to 100); share = exact figure.
     style: "outline" (grey outline), "hos" (green fill),
            "private" (grey fill), "temp" (dark grey)              */
  people: {
    eyebrow: "Population",
    title: "If Hong Kong were 100 people",
    categories: [
      { key: "prh",     label: "Public rental housing",                                 labelZh: "公屋", count: 29, share: "29.4%", style: "outline" },
      { key: "hos",     label: "Subsidized sale flats, mainly Home Ownership Scheme",   labelZh: "居屋", count: 15, share: "15.3%", style: "hos" },
      { key: "private", label: "Private housing",                                       labelZh: "私樓", count: 55, share: "54.6%", style: "private" },
      { key: "temp",    label: "Temporary housing",                                     labelZh: null,   count: 1,  share: "0.7%",  style: "temp" },
    ],
    hint: "Hover over or tab to a person to see their group.",
    caption: { text: "Share of Hong Kong's population by type of housing, 2024", cite: ["ha-2025-figures"] },
  },

  /* ---------- 3. Three housing systems ----------
     stats: { pre (small, before), value (big), unit (small, after), label, cite }
     focus: true gives the card a green border (the HOS card).         */
  systems: {
    eyebrow: "Three systems",
    title: "Three housing systems",
    cards: [
      {
        name: "Public rental housing", nameZh: "公屋",
        definition: "Flats built and owned by the Housing Authority and rented to low-income households at below-market rents.",
        stats: [
          { value: "29.4%", label: "of the population", cite: ["ha-2025-figures"] },
          { value: "4.8", unit: "years", label: "average wait for general applicants, June 2026", cite: ["chinadaily-2026-wait"] },
          { pre: "about", value: "871,000", label: "flats, 2025", cite: ["ha-2025-figures"] },
        ],
        repair: { text: "The Housing Authority, as landlord. It runs regular maintenance and a structural check of estates around 40 years old.", cite: ["ha-timeline"] },
      },
      {
        name: "Home Ownership Scheme", nameZh: "居屋", focus: true,
        definition: "Flats built by the Housing Authority and sold, not rented, below market price to lower- and middle-income families.",
        stats: [
          { value: "15.3%", label: "of the population live in subsidized sale flats", cite: ["ha-2025-figures"] },
          { value: "30%", unit: "below market", label: "price in the latest sale; family income limit HK$60,000 a month", cite: ["newsgov-2025-hos"] },
          { value: "270,000+", label: "applications for 4,431 flats in 2018", cite: ["legco-2018-ssf"] },
        ],
        extra: { text: "To sell on the open market, owners must first pay the government a land premium (補地價). Many owners find it hard to move.", cite: ["legco-2018-ssf"] },
        repair: { text: "The owners. After the sale, owners form an owners' corporation (業主立案法團) and take over management and repairs.", cite: ["ha-property-mgmt"] },
      },
      {
        name: "Private housing", nameZh: "私樓",
        definition: "Flats bought and sold on the open market. Almost all land is owned by the government and leased out.",
        stats: [
          { value: "54.6%", label: "of the population", cite: ["ha-2025-figures"] },
          { value: "36–46%", label: "of government revenue came from land premium, stamp duties and rates, 2017–2021", cite: ["legco-2020-revenue"] },
          { pre: "about", value: "220,000", label: "people live in about 110,000 subdivided flats (劏房)", cite: ["hkgov-2025-bhu"] },
        ],
        repair: { text: "The owners." },
      },
    ],
    repairLabel: "Who repairs the building?",
  },

  /* ---------- 4. Who repairs? comparison table ----------
     focusColumn = index of the HOS column (gets a subtle green tint)  */
  repairs: {
    eyebrow: "Responsibility",
    title: "Who repairs?",
    columns: ["Public rental", "Home Ownership Scheme", "Private"],
    focusColumn: 1,
    rows: [
      { label: "Who owns the flat",            cells: ["Government", "Owners (with resale limits)", "Owners"] },
      { label: "Who manages the estate",       cells: ["Housing Authority", "Owners' corporation", "Owners' corporation"] },
      { label: "Who pays for major repairs",   cells: ["Housing Authority", "Owners", "Owners"] },
      { label: "What the law requires at 30 years old", cite: ["clic-mbis"],
        cells: ["n/a (landlord's duty)", "Inspection every 10 years; owners must repair", "Same as HOS"] },
    ],
    closing: "Built by the government. Repaired by the owners.",
  },

  /* ---------- 5. A short history ---------- */
  history: {
    eyebrow: "History",
    title: "A short history",
    events: [
      { year: "1953",      text: "Shek Kip Mei fire leaves 50,000+ homeless; public housing begins", cite: ["ha-timeline"] },
      { year: "1972",      text: "Ten-Year Housing Programme", cite: ["ha-timeline"] },
      { year: "1976/1978", text: "Home Ownership Scheme launched; first flats sold 1978", cite: ["ha-timeline"] },
      { year: "1998",      text: "Tenants Purchase Scheme lets public tenants buy their flats", cite: ["ha-timeline"] },
      { year: "2003",      text: "HOS production stopped (resumed in the 2010s)", cite: ["ha-timeline"] },
      { year: "2012",      text: "Mandatory Building Inspection Scheme for buildings 30+ years old", cite: ["clic-mbis"] },
    ],
    note: "Hong Kong's public housing began with a fire in 1953. Seventy-two years later, another fire forced the question of who is responsible.",
  },

  /* ---------- 6. Where Wang Fuk Court fits ---------- */
  wfc: {
    eyebrow: "The estate",
    title: "Where Wang Fuk Court fits",
    // One entry per tower: true = tinted orange (echoes the fire), false = grey
    towers: [true, true, true, true, true, true, true, false],
    towersAlt: "Silhouette of Wang Fuk Court's eight towers. Seven are tinted orange to echo the fire; one is grey.",
    label: { name: "Wang Fuk Court", nameZh: "宏福苑", rest: "Home Ownership Scheme · Tai Po · completed 1983", cite: ["wiki-kwongfuk"] },
    facts: [
      { text: "8 blocks, 31 storeys each, about 1,984 flats", cite: ["wiki-kwongfuk", "hk01-2025-census"] },
      { text: "Owners' corporation formed in 1997", cite: ["wfc-archive"] },
      { text: "Ordered to carry out a mandatory building and window inspection in 2016 because of its age", cite: ["wfc-archive"] },
      { text: "Owners approved a renovation of about HK$330 million, roughly HK$150,000–190,000 per household", cite: ["hkfp-2025-timeline", "wfc-archive"] },
      { text: "36.6% of residents were 65 or older (Hong Kong average: 19.5%); median age 56.6", cite: [{ id: "hk01-2025-census", suffix: ", citing the 2021 Census" }] },
    ],
    // TODO: verify in a Housing Authority source that Kwong Fuk Estate is still fully public rental housing
    contrast: [
      { name: "Kwong Fuk Estate", nameZh: "廣福邨", note: "next door",
        text: "Completed 1983. Public rental housing. The Housing Authority is responsible for its aging buildings." },
      { name: "Wang Fuk Court", nameZh: "宏福苑", focus: true,
        text: "Completed 1983. Home Ownership Scheme. Its owners were responsible for organising and paying for repairs." },
    ],
    contrastCaption: { text: "Same government builder, same year, same street. Different owner, different responsibility.", cite: ["wiki-kwongfuk"] },
    nuance: {
      text: "The government did keep one role: its Independent Checking Unit was supposed to check repair works in estates the Housing Authority had sold. The fire inquiry found this unit bore the largest share of responsibility among government departments. In November 2026 it was replaced by a new Public Housing Building Control Section with a liaison officer for each owners' corporation.",
      cite: ["standard-2026-deficiencies", "standard-2026-reform"],
    },
  },

  /* ---------- 7. End of page ---------- */
  end: {
    line: "By law, the owners were responsible. The next question is whether they had the power to be.",
    back: { label: "Back to the story", href: "../index.html#responsible" },
    next: { label: "Next: The law", href: "law.html" },
  },
};
