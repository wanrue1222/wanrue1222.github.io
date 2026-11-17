/* =====================================================================
   citations.js: in-text citation labels for the WHOLE site.

   Each key is the id of an entry on sources.html, and each value is the
   author-date label shown in the text, e.g. (Housing Authority, 2025).
   Every in-text citation links to sources.html#<id>.

   To cite something on a page: use the id, e.g. cite: ["ha-2025-figures"].
   Several sources:             cite: ["hkfp-2025-timeline", "wfc-archive"]
   Add a note after the label:  cite: [{ id: "hk01-2025-census", suffix: ", citing the 2021 Census" }]

   When you add a source: (1) add a line here, (2) add the full entry with
   the same id on sources.html.
   ===================================================================== */
window.CITATIONS = {
  // ----- Housing system -----
  "ha-2025-figures":            "Housing Authority, 2025",
  "ha-timeline":                "Housing Authority, n.d.-a",
  "ha-property-mgmt":           "Housing Authority, n.d.-b",
  "legco-2018-ssf":             "Legislative Council Research Office, 2018",
  "legco-2020-revenue":         "Legislative Council Research Office, 2020",
  "newsgov-2025-hos":           "news.gov.hk, 2025",
  "chinadaily-2026-wait":       "China Daily HK, 2026",
  "hkgov-2025-bhu":             "Hong Kong Government, 2025",
  "clic-mbis":                  "Community Legal Information Centre, n.d.",
  "wiki-kwongfuk":              "Wikipedia, n.d.",
  "hk01-2025-census":           "HK01, 2025",
  "hkfp-2025-timeline":         "Hong Kong Free Press, 2025",
  "wfc-archive":                "Wang Fuk Court Fire Archive, n.d.",
  "standard-2026-deficiencies": "The Standard, 2026a",
  "standard-2026-reform":       "The Standard, 2026b",

  // ----- The law -----
  // Same author + same year gets a letter (a, b, c...) so each label maps to ONE source site-wide.
  "cap344":                     "Hong Kong e-Legislation, n.d.-a",
  "cap123":                     "Hong Kong e-Legislation, n.d.-b",
  "bd-bm-faq":                  "Buildings Department, n.d.-a",
  "bd-mbis-penalty":            "Buildings Department, n.d.-b",
  "brp-meeting":                "Building Rehabilitation Platform, n.d.",
  "icu-ourwork":                "Independent Checking Unit, n.d.",
  "sixthtone-2025":             "Sixth Tone, 2025",
  "udn-2026-li":                "UDN, 2026a",
  "star-2026-bidrig":           "The Star, 2026a",
  "star-2026-passball":         "The Star, 2026b",
  "standard-2026-50arrested":   "The Standard, 2026c",
  "rthk-2026-charges":          "RTHK, 2026b",
  "scmp-2026-honour":           "SCMP, 2026a",
  "dimsum-2026-criminalise":    "Dimsum Daily, 2026b",
  "hkgov-2026-bmo":             "Hong Kong Government, 2026",

  // ----- Who failed (index.html) -----
  "standard-2026-inquiry":      "The Standard, 2026d",
  "standard-2026-systemic":     "The Standard, 2026e",
  "standard-2026-ocfaults":     "The Standard, 2026f",
  "standard-2026-spread":       "The Standard, 2026g",
  "dimsum-2026-chief":          "Dimsum Daily, 2026a",
  "edn-2026-report":            "Economic Daily News, 2026",
  "udn-2026-kong":              "UDN, 2026b",
  "star-2026-donttell":         "The Star, 2026c",
  // from the building cross-section
  "scmp-2025-infographic":      "SCMP, 2025",
  "scmp-2026-checks":           "SCMP, 2026b",
  "scmp-2026-multimedia":       "SCMP, 2026c",
  "bbc-2025-whatweknow":        "BBC News, 2025",
  "kwan-2025-whatweknow":       "Kwan, 2025",

  // ----- Theory -----
  "garland-1996":               "Garland, 1996",
  "rose-1996":                  "Rose, 1996",
  "devb-mbi":                   "Development Bureau, n.d.",
  "lau-2013":                   "Lau, 2013",

  // ----- The fire and its aftermath (timeline, statements) -----
  "cp24-2026":                  "CP24, 2026",
  "caixin-2025":                "Caixin Global, 2025",
  "newsgov-2026-buyout":        "news.gov.hk, 2026",
  "standard-2025-ho":           "The Standard, 2025",
  "rthk-2026-ho":               "RTHK, 2026a",

  // ----- The memorial (the two official lists in MEMORIAL.sources) -----
  "hkfp-2026-victims":          "Hong Kong Free Press, 2026",
  "singtao-2026-victims":       "Sing Tao Daily, 2026",
};
