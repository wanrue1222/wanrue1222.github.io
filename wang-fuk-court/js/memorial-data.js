/* =========================================================================
   memorial-data.js — data for the "168" memorial overlay
   Wang Fuk Court fire, Tai Po, Hong Kong — 26 November 2025

   SOURCES FOR NAMES
   - English: official list of 168 names from court documents made public
     on 10 June 2026 (published by Hong Kong Free Press, 11 June 2026).
   - Traditional Chinese: names listed in the manslaughter charges
     (counts 1 and 2 cover 163 of the 168 people), as reported in Chinese
     media on 10 June 2026. 5 people are not in those two counts, so their
     Chinese names are left empty (nameZh: null) until a source gives them.
   - Chinese names were matched to English names by surname + Cantonese
     reading. Three matches are less certain and are flagged with
     `check: true`; verify them before publishing.

   ETHICS RULES FOR THIS FILE
   - Only use what has already been published.
   - Never guess Chinese characters from romanization.
   - Never guess age or nationality from a name.
   - No flat/unit numbers, no addresses.
   - Squares without a story just show the name + "Remembered".
   ========================================================================= */

const MEMORIAL_SOURCES = {
  officialList: {
    label: "Hong Kong Free Press: Wang Fuk Court Fire tragedy, full list of victims (11 June 2026)",
    url: "https://hongkongfp.com/2026/06/11/wang-fuk-court-fire-tragedy-full-list-of-victims/"
  },
  officialListZh: {
    label: "星島日報：168名死者名單首公開 (10 June 2026)",
    url: "https://www.stheadline.com/society/3581693/"
  }
};

/* ---------- 1. VICTIMS: [English name, Traditional Chinese name or null] ---------- */
const VICTIM_NAMES = [
  ["AU Kit-ching", "歐潔貞"],
  ["AU Yiu-fai", "區耀輝"],
  ["AU Yuet-ying", "區月英"],
  ["CHAN Bou-ting", "陳寶燈"],
  ["CHAN Chu-kai", "陳柱楷"],
  ["CHAN Hoi-wai", "陳海慧"],
  ["CHAN Hon-bill", null],
  ["CHAN Kam-keung", "陳錦强"],
  ["CHAN Leung-bun", "陳良本"],
  ["CHAN Man-ling", "陳曼玲"],
  ["CHAN Tak-sun", "陳德新"],
  ["CHAN Yiu-ki", "陳耀基"],
  ["CHAU Siu-kuen", "周小娟"],
  ["CHENG CHOE Yung-soo", "鄭崔永秀"],
  ["CHENG Hui-kiu", "鄭煦翹"],
  ["CHENG Kwai-heung", "鄭桂香"],
  ["CHENG Yuk-chee", "鄭玉池"],
  ["CHEUK Sai-fung", "卓世俸"],
  ["CHEUNG Man-hei", "張琝浠"],
  ["CHEUNG Mei-fan Betty", "張美芬"],
  ["CHEUNG Pik-kuen", "張碧娟"],
  ["CHEUNG Siu-ling Carry", "張小玲"],
  ["CHEUNG Sum-yuet", "張芯悅"],
  ["CHEUNG Tai-bun", "張大彬"],
  ["CHIANG Ping-woon", "蔣炳垣"],
  ["CHIANG Wing-kam", "蔣詠琴"],
  ["CHIU Yuet-ngor", "趙月娥"],
  ["CHOI Lai-ping", "蔡麗萍"],
  ["CHOI Suet-chun", "蔡雪珍"],
  ["CHOI Wing-tak", "蔡永德"],
  ["CHONG Shiu-ki", "莊兆基"],
  ["CHOW Wing-kwong", "周永光"],
  ["CHOY Man-ying", "蔡文英"],
  ["CHOY Sheung-him", "蔡尚謙"],
  ["CHU Cheuk-kuen", "朱卓權"],
  ["CHUNG Kan-hoe", "鍾勤好"],
  ["CHUNG Sau-chun", "鍾秀珍"],
  ["CHUNG Siu-king", "鍾少琼"],
  ["CHUNG Yin-wah", "鍾燕華"],
  ["DARWATI", null],
  ["DINA-MARTIANA", null],
  ["ERAWATI", null],
  ["ESTEBAN MARYAN PASCUAL", null],
  ["HO Mee-bo", null],
  ["HO Suk-fun Hester", "何淑芬"],
  ["HO Tsz-yan", "何梓甄"],
  ["HO Wah-sing", "何華星"],
  ["HO Wai-ho", "何偉豪"],
  ["HON Kit-ling", "韓潔玲"],
  ["HUA Hao-ngoc", "許巧玉", true],
  ["HUANG Hsiu-fei", "黃秀惠", true],
  ["HUNG King-leong", null],
  ["HUNG Wai-heung", "洪偉香"],
  ["IEONG Vun-ieng", null],
  ["IP Ka-lee", "葉嘉莉"],
  ["IP Lai-man", "葉麗文"],
  ["IP Ping-tau", "葉炳桃"],
  ["KAM Kit-ying", "甘潔瑩"],
  ["KEE Lai-ming", "紀麗明"],
  ["KO Kam-seung", "高錦嫦"],
  ["KO Mei-ling", "高美玲"],
  ["KONG King-tin", "江景鈿"],
  ["KWOK Wai-yan Sandy", "郭慧欣"],
  ["LAI Chi-kwong", "賴志光"],
  ["LAI Hoi-ki", "黎凱琪"],
  ["LAI Kam-hung", "黎錦雄"],
  ["LAI Nai-yuet", "黎乃月"],
  ["LAM Fong", "林芳"],
  ["LAM San-nog", "藍新娥"],
  ["LAM Sheung", "林湘"],
  ["LAU Ding-kar", "劉定嘉"],
  ["LAU Man-kong", "劉文光"],
  ["LAU Mei-kam", "劉美金"],
  ["LAU Sau-yin", "劉秀賢"],
  ["LAU Yuen-min", "劉軟綿"],
  ["LAW Mei-ying", "羅美英"],
  ["LAW Shui-sin", "羅瑞先"],
  ["LEE Chuen-cheung", "李泉章"],
  ["LEE Chun-man", "李俊民"],
  ["LEE Fong-yau", "李房有"],
  ["LEE Fung", "李峰"],
  ["LEE Lai-chu", "李麗珠"],
  ["LEE Lai-man", null],
  ["LEE Sit-ming", "李薛明"],
  ["LEE Yan-wing", "李欣穎"],
  ["LEUNG Lai-ching", "梁勵青"],
  ["LEUNG Pik-see", "梁碧施"],
  ["LEUNG Sek-ho", "梁錫豪"],
  ["LEUNG Soo-mui", "梁蘇妹"],
  ["LEUNG Yin-wah", "梁賢樺"],
  ["LI Kin-yuk", "李堅玉"],
  ["LI Koon-wah", "李官華"],
  ["LI Kwok-wai", "李國偉"],
  ["LI Ping-wai", "李炳威"],
  ["LIN Chi-fai", "練志輝"],
  ["LIU Chunye", "劉春叶"],
  ["LIU Sau-fong", "廖秀芳"],
  ["LO Cheuk-ming", "盧卓明"],
  ["LO Ying", "老英"],
  ["LUI Kin-cheung", "呂建章"],
  ["MAK Lo-yan", "麥露恩"],
  ["MAK Wai-lan", "麥慧蘭"],
  ["MAN Ho-fai Lawrence", "文浩輝"],
  ["MIU Siu-king", "繆少琼"],
  ["MO Suet-lin", "毛雪蓮"],
  ["MOK Ka-bo", "莫家寶"],
  ["MOK Kam-lam", "莫淦林"],
  ["NG Kam-ha", "吳金霞"],
  ["NG Wai-chun", "吳惠珍"],
  ["NG Wan-ho", "吳環好"],
  ["NG Woon-chi", "吳垣志"],
  ["NG Yuk-chun", "吳玉珍"],
  ["NOVITA", null],
  ["PAK Shui-lin", "白瑞蓮"],
  ["POON Kim-ngan", "潘儉雅", true],
  ["PUN Kai-fong", "潘桂芳"],
  ["SHEK Kwai-fong", "石桂芳"],
  ["SIN Lai-fun", "冼麗芬"],
  ["SING Suk-ching", "成淑清"],
  ["SITI-FATONAH", null],
  ["SITI-KHOTIMAH", null],
  ["SO Siu-hung Peter", "蘇兆雄"],
  ["SO Wai-fan Philip", "蘇偉勳"],
  ["SO Wing-kuen", "蘇永權"],
  ["SO Yan-yip", "蘇恩曄"],
  ["SRI-WAHYUNI", null],
  ["TAM Hoi-sing", "譚海成"],
  ["TAM Hong-chung", "譚康松"],
  ["TAM Lai-mai", "譚麗媚"],
  ["TAM Wei-ping", "譚惠萍"],
  ["TAM Yun-shong", "譚潤嫦"],
  ["TANG Suk-ching", "鄧淑貞"],
  ["TANG Suk-ping", "鄧淑萍"],
  ["TANG Tat-yi", "鄧達兒"],
  ["TANG Wai-yin", "鄧慧賢"],
  ["TANG Yan-tung", "鄧欣彤"],
  ["TANG Yuk-ping", "鄧玉萍"],
  ["TO Yuen-chuen", "杜元泉"],
  ["TONG Yim-fong", "湯艷芳"],
  ["TSANG Lai-hing", "曾麗馨"],
  ["TSANG Lai-wah", "曾麗華"],
  ["TSANG Wai-han", "曾蕙嫻"],
  ["TSANG Yuet-oi", "曾月愛"],
  ["TSANG Yuk-may", "曾玉薇"],
  ["WIDYANA DESY", null],
  ["WONG Hang-mui", "黃杏妹"],
  ["WONG Kam-wah", "黃錦華"],
  ["WONG Ka-sing", "黃嘉星"],
  ["WONG Lai-kuen", "黃麗娟"],
  ["WONG Mei-mei", "王薇薇"],
  ["WONG Po-ying", "黃寶營"],
  ["WONG Sau-wan", "王秀云"],
  ["WONG Sze-yee", "王思懿"],
  ["WONG Wai-ching", "黃惠貞"],
  ["WONG Yan-cho", "黃仁藻"],
  ["WU Yiu-fai", "胡耀輝"],
  ["XUE Aihua", "薛愛華"],
  ["YAM Kuen", "任娟"],
  ["YAM Ting", "任婷"],
  ["YAN Pun-hing", "任伴馨"],
  ["YASMIATI", null],
  ["YEUNG Lai-sim", "楊麗嬋"],
  ["YEUNG Suk-hing", "楊淑卿"],
  ["YEUNG Tung-ying", "楊統英"],
  ["YIP Pik-yi", "葉碧兒"],
  ["YIU Wing-lung", "姚永濃"],
  ["YU So-ying", "余素英"],
  ["YUEN Shiu-cheung", "阮少祥"]
];

/* ---------- 2. STORIES (published accounts, paraphrased) ---------- */
const MEMORIAL_STORIES = [
  {
    id: "ho-wai-ho",
    title: "Ho Wai-ho 何偉豪",
    people: ["Ho Wai-ho, 37, firefighter"],
    role: "Firefighter, Sha Tin Fire Station",
    nationality: null,
    story:
      "A firefighter for nine years, he was among the first crews sent to Wang Fuk Court. " +
      "The inquiry heard that in the chaos he entered the wrong block and sent a Mayday call from the 30th floor. " +
      "He was the only firefighter among the 168 who died. He was posthumously made Senior Fireman, " +
      "and colleagues left a note telling him he was now off duty.",
    sources: [
      { label: "RTHK, 13 Apr 2026", url: "https://news.rthk.hk/rthk/en/component/k2/1850891-20260413.htm" },
      { label: "The Standard, 26 Nov 2025", url: "https://www.thestandard.com.hk/hong-kong-news/article/317868/" },
      { label: "Business Recorder (AFP), Dec 2025", url: "https://www.brecorder.com/news/40398296" }
    ]
  },
  {
    id: "esteban",
    title: "Maryan Pascual Esteban and Hannah",
    people: ["Maryan Pascual Esteban, 39, domestic worker", "Hannah, 5, the child she cared for"],
    role: "Domestic worker",
    nationality: "Philippines",
    story:
      "She arrived in Hong Kong more than five years earlier, when her employer was pregnant with Hannah, " +
      "and cared for the family ever since. She died with Hannah, aged five. " +
      "She had planned to return home for good that Saturday to be with her 10-year-old son.",
    sources: [
      { label: "SCMP, Dec 2025", url: "https://www.scmp.com/news/hong-kong/society/article/3336349/filipino-helper-killed-hong-kong-fire-was-going-home-good-be-son" }
    ]
  },
  {
    id: "desi-widiana",
    title: "Desi Widiana",
    people: ["Desi Widiana, 40, domestic worker"],
    role: "Domestic worker",
    nationality: "Indonesia (Kediri, East Java)",
    story:
      "She left her village at 20 to work in Hong Kong as a live-in helper and spent half her life " +
      "caring for other people's families while her own waited at home. " +
      "She was found huddled together with the elderly woman she looked after.",
    sources: [
      { label: "SCMP This Week in Asia, Dec 2025", url: "https://www.scmp.com/week-asia/people/article/3336899/hong-kong-fire-indonesian-helper-was-always-there-others-end" }
    ]
  },
  {
    id: "yasmiati",
    title: "Yasmiati",
    people: ["Yasmiati, 43, domestic worker"],
    role: "Domestic worker",
    nationality: "Indonesia",
    story:
      "One of ten domestic workers who died in the fire. Her sister Purwanti, also a domestic worker " +
      "in Hong Kong, travelled home for the funeral and wondered whether to come back to the city at all.",
    sources: [
      { label: "CNN, 13 Feb 2026", url: "https://www.cnn.com/2026/02/13/asia/hong-kong-tai-po-fire-survivors-intl-hnk-dst" }
    ]
  },
  {
    id: "novita",
    title: "Novita",
    people: ["Novita, domestic worker"],
    role: "Domestic worker",
    nationality: "Indonesia",
    story:
      "One of nine Indonesian domestic workers killed in the fire. Her remains were among the first " +
      "to be flown home, escorted by a Hong Kong charity on 21 December 2025.",
    sources: [
      { label: "Hong Kong Free Press, 22 Dec 2025", url: "https://hongkongfp.com/2025/12/22/tai-po-fire-first-remains-of-indonesian-filipina-domestic-workers-repatriated-8-others-expected-this-week/" }
    ]
  },
  {
    id: "pak-shui-lin",
    title: "Pak Shui-lin 白瑞蓮",
    people: ["Pak Shui-lin, resident"],
    role: "Resident",
    nationality: null,
    story:
      "As the fire spread, she went door to door warning neighbours to leave, and did not make it out herself. " +
      "Her husband of about 40 years, Yip Ka-kui, told the inquiry her wish after retiring was to travel the world. " +
      "In October 2026 he said the government's apology lacked sincerity.",
    sources: [
      { label: "SCMP, inquiry hearings, 2026", url: "https://www.scmp.com/news/hong-kong/society/article/3353000/heroism-and-grief-6-residents-stories-wang-fuk-court-fire-hearings" },
      { label: "CBS News, Dec 2025", url: "https://www.cbsnews.com/news/hong-kong-apartment-fire-survivor-wife" },
      { label: "Hong Kong Free Press, 30 Oct 2026", url: "https://hongkongfp.com/2026/10/30/some-wang-fuk-court-survivors-say-top-officials-apology-nearly-one-year-since-fatal-fire-lacked-sincerity/" }
    ]
  },
  {
    id: "ho-family",
    title: "Ho Tsz-yan 何梓甄 and her grandparents",
    people: ["Ho Tsz-yan, six months old", "Her grandmother", "Her grandfather"],
    role: "Residents",
    nationality: null,
    story:
      "Her grandmother carried her to a neighbour's flat on the same floor to shelter from the smoke. " +
      "Both were later found there. Her parents say they still cry most nights.",
    sources: [
      { label: "The Collective, six months on (Chinese)", url: "https://thecollectivehk.com/%E5%AE%8F%E7%A6%8F%E8%8B%91%E7%81%AB%E7%81%BD%E5%8D%8A%E5%B9%B4%EF%BD%9C%E7%88%BA%E7%88%BA%E3%80%81%E5%AB%B2%E5%AB%B2%E3%80%81%E5%8D%8A%E6%AD%B2-b-%E5%A5%B3%E6%A2%93%E7%94%84%E7%BD%B9%E9%9B%A3/" }
    ]
  },
  {
    id: "li-family",
    title: "The Li family, Wang Tai House",
    people: [
      "Mother of resident Li Chun-ho (Jack)",
      "His elder brother",
      "His niece, about 16 months old",
      "The family's domestic worker"
    ],
    role: "Residents",
    nationality: null,
    story:
      "Before the fire, the mother complained to the contractor about workers smoking and damaged netting, " +
      "and with neighbours tried and failed to call an owners' meeting about the renovation contract. " +
      "On the night of the fire, Jack stayed on video calls with his family until 9:30 pm. " +
      "Four of the seven family members died. A year later, the survivors hold 'family meetings' at the cemetery.",
    sources: [
      { label: "The Witness, inquiry day 13 (Chinese)", url: "https://thewitnesshk.com/%E5%AE%8F%E7%A6%8F%E8%8B%91%E8%81%BD%E8%AD%89%E6%9C%83day13-%E4%B8%80%E5%AE%B6%E4%B8%83%E5%8F%A3%E5%9B%9B%E4%BA%BA%E7%BD%B9%E9%9B%A3-%E9%81%BA%E5%B1%AC%E6%86%B6%E8%A6%96%E5%83%8F%E9%80%9A%E8%A9%B1/" },
      { label: "UDN, citing Ming Pao (Chinese)", url: "https://udn.com/news/story/7332/9447509" },
      { label: "The Collective, one year on (Chinese)", url: "https://thecollectivehk.com/%E5%AE%8F%E7%A6%8F%E8%8B%91%E5%A4%A7%E7%81%AB%E4%B8%80%E5%B9%B4%EF%BD%9C%E4%B8%80%E5%AE%B6%E5%89%A9%E4%B8%89%E5%8F%A3%E3%80%80%E5%A2%B3%E5%89%8D%E9%96%8B%E3%80%8C%E5%AE%B6%E5%BA%AD%E6%9C%83%E8%AD%B0/" }
    ],
    argumentNote: "Residents tried to challenge the contract but lacked the power to stop it. Use in the 'Who failed' section."
  },
  {
    id: "lee-family",
    title: "Lee Kwok-hung's mother and two domestic workers, Wang Cheong House",
    people: ["Mother of Lee Kwok-hung", "Two domestic workers employed by the family"],
    role: "Residents",
    nationality: null,
    story:
      "The three sheltered in a neighbour's flat and died there together with the neighbours, five people in all. " +
      "Her son agreed to let the inquiry show CCTV footage from inside the family home, which the inquiry called key evidence.",
    sources: [
      { label: "The Collective, inquiry day 13 (Chinese)", url: "https://thecollectivehk.com/%E5%AE%8F%E7%A6%8F%E8%8B%91%E8%81%BD%E8%AD%89%EF%BC%8E%E7%AC%AC-13-%E6%97%A5%EF%BD%9C%E5%B1%85%E6%B0%91%E3%80%81%E5%A4%96%E7%89%86%E7%B6%AD%E4%BF%AE%E5%A4%96%E5%88%A4%E5%95%86%E4%BD%9C%E4%BE%9B/" }
    ]
  },
  {
    id: "so-family",
    title: "So Hiu-fung's parents, Wang Cheong House",
    people: ["Mother of So Hiu-fung", "Father of So Hiu-fung"],
    role: "Residents",
    nationality: null,
    story:
      "His mother called him at 3:07 pm to say the building was on fire as the couple tried to get downstairs. " +
      "It was the last time he heard from either of them.",
    sources: [
      { label: "SCMP, inquiry hearings, 2026", url: "https://www.scmp.com/news/hong-kong/society/article/3353000/heroism-and-grief-6-residents-stories-wang-fuk-court-fire-hearings" }
    ]
  },
  {
    id: "id-card",
    title: "A grandfather who held on to his ID card",
    people: ["An older resident who relied on a ventilator and a wheelchair"],
    role: "Resident",
    nationality: null,
    story:
      "He was found in his bathroom wrapped in two wet blankets, holding his identity card. " +
      "His family believe he held it so they would be able to find him.",
    sources: [
      { label: "Tencent News, 11 Dec 2025 (Chinese)", url: "https://news.qq.com/rain/a/20251211A030NE00" }
    ]
  },
  {
    id: "yip-husband",
    title: "Idy Yip's husband",
    people: ["Husband of resident Idy Yip"],
    role: "Resident",
    nationality: null,
    story:
      "Idy Yip lost her husband of nearly 13 years at Wang Fuk Court, their two dogs, and neighbours she had watched grow up.",
    sources: [
      { label: "Hong Kong Free Press, 26 Dec 2025", url: "https://hongkongfp.com/2025/12/26/place-of-heartbreak-one-month-since-fatal-fire-wang-fuk-court-residents-reel-from-trauma-pondering-their-future/" }
    ]
  },
  {
    id: "mr-tang",
    title: "Mr Tang, security guard",
    people: ["Mr Tang, a security guard at City One Shatin"],
    role: "Resident",
    nationality: null,
    story:
      "He left behind his wife and daughter. Residents of the estate where he worked raised close to HK$1 million for his family.",
    sources: [
      { label: "Sing Tao Daily, Dec 2025 (Chinese)", url: "https://www.stheadline.com/breaking-news/3524082/" }
    ]
  }
];

/* ---------- 3. Link names in the official list to stories ---------- */
// Only links where the published story clearly names the person.
const NAME_TO_STORY = {
  "HO Wai-ho": "ho-wai-ho",
  "ESTEBAN MARYAN PASCUAL": "esteban",
  "WIDYANA DESY": "desi-widiana",   // press spelling: Desi Widiana
  "YASMIATI": "yasmiati",
  "NOVITA": "novita",
  "PAK Shui-lin": "pak-shui-lin",   // press spelling: Pak / Bai Shui-lin
  "HO Tsz-yan": "ho-family"         // 何梓甄, six months old
};

/* ---------- 4. Build the 168 entries ---------- */
const MEMORIAL_VICTIMS = VICTIM_NAMES.map(([name, nameZh, check], i) => ({
  n: i + 1,
  name,
  nameZh: nameZh || null,
  storyId: NAME_TO_STORY[name] || null,
  check: !!check          // true = Chinese match needs verifying
}));

if (MEMORIAL_VICTIMS.length !== 168) {
  console.warn(`memorial-data.js: expected 168 names, found ${MEMORIAL_VICTIMS.length}`);
}

/* ---------- 5. KEY FACTS ---------- */
const MEMORIAL_FACTS = {
  deaths: 168,
  women: 110,
  men: 58,
  ageRange: "6 months to 98 years",
  domesticWorkersKilled: 10,      // 9 Indonesian, 1 Filipina
  firefightersKilled: 1,
  constructionWorkersKilled: 5,
  interiorDecoratorsKilled: 2,
  dateOfFire: "2025-11-26",
  namesReleased: "2026-06-10"
};

window.MEMORIAL = {
  victims: MEMORIAL_VICTIMS,
  stories: MEMORIAL_STORIES,
  facts: MEMORIAL_FACTS,
  sources: MEMORIAL_SOURCES
};
