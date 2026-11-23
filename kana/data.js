/**
 * BASIS DATA RESMI: PENGUASAAN HURUF KANA (METODE IQRA' KANA)
 * Terstruktur per Tahap & Halaman dengan Latihan 3 Huruf Dinamis & Ujian Kelulusan Bertingkat
 */

const KANA_STAGES = [
  // =========================================================================
  // TAHAP 1: VOKAL A - I - U - E - O
  // =========================================================================
  {
    stageId: 1,
    stageName: "Tahap 1: Vokal A - I - U - E - O",
    stageShort: "Vokal A-I-U-E-O",
    allLetters: [
      { h: "あ", k: "ア", ro: "a" },
      { h: "い", k: "イ", ro: "i" },
      { h: "う", k: "ウ", ro: "u" },
      { h: "え", k: "エ", ro: "e" },
      { h: "お", k: "オ", ro: "o" }
    ],
    pages: [
      {
        pageId: 1,
        title: "Hal 1: Huruf A & I",
        letters: [
          { h: "あ", k: "ア", ro: "a" },
          { h: "い", k: "イ", ro: "i" }
        ],
        availablePool: [
          { h: "あ", k: "ア", ro: "a" },
          { h: "い", k: "イ", ro: "i" }
        ],
        isFinalPage: false
      },
      {
        pageId: 2,
        title: "Hal 2: Huruf U & E",
        letters: [
          { h: "う", k: "ウ", ro: "u" },
          { h: "え", k: "エ", ro: "e" }
        ],
        availablePool: [
          { h: "あ", k: "ア", ro: "a" },
          { h: "い", k: "イ", ro: "i" },
          { h: "う", k: "ウ", ro: "u" },
          { h: "え", k: "エ", ro: "e" }
        ],
        isFinalPage: false
      },
      {
        pageId: 3,
        title: "Hal 3: Huruf O (Tuntas Vokal)",
        letters: [
          { h: "お", k: "オ", ro: "o" }
        ],
        availablePool: [
          { h: "あ", k: "ア", ro: "a" },
          { h: "い", k: "イ", ro: "i" },
          { h: "う", k: "ウ", ro: "u" },
          { h: "え", k: "エ", ro: "e" },
          { h: "お", k: "オ", ro: "o" }
        ],
        isFinalPage: true // Halaman ujian kelulusan Tahap 1
      }
    ]
  },

  // =========================================================================
  // TAHAP 2: BARIS K (KA - KI - KU - KE - KO)
  // =========================================================================
  {
    stageId: 2,
    stageName: "Tahap 2: Baris K (Ka - Ki - Ku - Ke - Ko)",
    stageShort: "Baris K",
    allLetters: [
      { h: "か", k: "カ", ro: "ka" },
      { h: "き", k: "キ", ro: "ki" },
      { h: "く", k: "ク", ro: "ku" },
      { h: "け", k: "ケ", ro: "ke" },
      { h: "こ", k: "コ", ro: "ko" }
    ],
    pages: [
      {
        pageId: 1,
        title: "Hal 1: Huruf Ka & Ki",
        letters: [
          { h: "か", k: "カ", ro: "ka" },
          { h: "き", k: "キ", ro: "ki" }
        ],
        availablePool: [
          { h: "あ", k: "ア", ro: "a" },
          { h: "い", k: "イ", ro: "i" },
          { h: "か", k: "カ", ro: "ka" },
          { h: "き", k: "キ", ro: "ki" }
        ],
        isFinalPage: false
      },
      {
        pageId: 2,
        title: "Hal 2: Huruf Ku & Ke",
        letters: [
          { h: "く", k: "ク", ro: "ku" },
          { h: "け", k: "ケ", ro: "ke" }
        ],
        availablePool: [
          { h: "う", k: "ウ", ro: "u" },
          { h: "え", k: "エ", ro: "e" },
          { h: "く", k: "ク", ro: "ku" },
          { h: "け", k: "ケ", ro: "ke" }
        ],
        isFinalPage: false
      },
      {
        pageId: 3,
        title: "Hal 3: Huruf Ko (Tuntas Baris K)",
        letters: [
          { h: "こ", k: "コ", ro: "ko" }
        ],
        availablePool: [
          { h: "か", k: "カ", ro: "ka" },
          { h: "き", k: "キ", ro: "ki" },
          { h: "く", k: "ク", ro: "ku" },
          { h: "け", k: "ケ", ro: "ke" },
          { h: "こ", k: "コ", ro: "ko" }
        ],
        isFinalPage: true // Ujian kelulusan Tahap 2
      }
    ]
  },

  // =========================================================================
  // TAHAP 3: BARIS S (SA - SHI - SU - SE - SO)
  // =========================================================================
  {
    stageId: 3,
    stageName: "Tahap 3: Baris S (Sa - Shi - Su - Se - So)",
    stageShort: "Baris S",
    allLetters: [
      { h: "さ", k: "サ", ro: "sa" },
      { h: "し", k: "シ", ro: "shi" },
      { h: "す", k: "ス", ro: "su" },
      { h: "せ", k: "セ", ro: "se" },
      { h: "そ", k: "ソ", ro: "so" }
    ],
    pages: [
      {
        pageId: 1,
        title: "Hal 1: Huruf Sa & Shi",
        letters: [
          { h: "さ", k: "サ", ro: "sa" },
          { h: "し", k: "シ", ro: "shi" }
        ],
        availablePool: [
          { h: "あ", k: "ア", ro: "a" },
          { h: "か", k: "カ", ro: "ka" },
          { h: "さ", k: "サ", ro: "sa" },
          { h: "し", k: "シ", ro: "shi" }
        ],
        isFinalPage: false
      },
      {
        pageId: 2,
        title: "Hal 2: Huruf Su, Se, So (Tuntas Baris S)",
        letters: [
          { h: "す", k: "ス", ro: "su" },
          { h: "せ", k: "セ", ro: "se" },
          { h: "そ", k: "ソ", ro: "so" }
        ],
        availablePool: [
          { h: "さ", k: "サ", ro: "sa" },
          { h: "し", k: "シ", ro: "shi" },
          { h: "す", k: "ス", ro: "su" },
          { h: "せ", k: "セ", ro: "se" },
          { h: "そ", k: "ソ", ro: "so" }
        ],
        isFinalPage: true // Ujian kelulusan Tahap 3
      }
    ]
  },

  // =========================================================================
  // TAHAP 4: BARIS T (TA - CHI - TSU - TE - TO)
  // =========================================================================
  {
    stageId: 4,
    stageName: "Tahap 4: Baris T (Ta - Chi - Tsu - Te - To)",
    stageShort: "Baris T",
    allLetters: [
      { h: "た", k: "タ", ro: "ta" },
      { h: "ち", k: "チ", ro: "chi" },
      { h: "つ", k: "ツ", ro: "tsu" },
      { h: "て", k: "テ", ro: "te" },
      { h: "と", k: "ト", ro: "to" }
    ],
    pages: [
      {
        pageId: 1,
        title: "Hal 1: Huruf Ta & Chi",
        letters: [
          { h: "た", k: "タ", ro: "ta" },
          { h: "ち", k: "チ", ro: "chi" }
        ],
        availablePool: [
          { h: "た", k: "タ", ro: "ta" },
          { h: "ち", k: "チ", ro: "chi" },
          { h: "さ", k: "サ", ro: "sa" },
          { h: "か", k: "カ", ro: "ka" }
        ],
        isFinalPage: false
      },
      {
        pageId: 2,
        title: "Hal 2: Huruf Tsu, Te, To (Tuntas Baris T)",
        letters: [
          { h: "つ", k: "ツ", ro: "tsu" },
          { h: "て", k: "テ", ro: "te" },
          { h: "と", k: "ト", ro: "to" }
        ],
        availablePool: [
          { h: "た", k: "タ", ro: "ta" },
          { h: "ち", k: "チ", ro: "chi" },
          { h: "つ", k: "ツ", ro: "tsu" },
          { h: "て", k: "テ", ro: "te" },
          { h: "と", k: "ト", ro: "to" }
        ],
        isFinalPage: true
      }
    ]
  },

  // =========================================================================
  // TAHAP 5: BARIS N (NA - NI - NU - NE - NO)
  // =========================================================================
  {
    stageId: 5,
    stageName: "Tahap 5: Baris N (Na - Ni - Nu - Ne - No)",
    stageShort: "Baris N",
    allLetters: [
      { h: "な", k: "ナ", ro: "na" },
      { h: "に", k: "ニ", ro: "ni" },
      { h: "ぬ", k: "ヌ", ro: "nu" },
      { h: "ね", k: "ネ", ro: "ne" },
      { h: "の", k: "ノ", ro: "no" }
    ],
    pages: [
      {
        pageId: 1,
        title: "Hal 1: Huruf Na & Ni",
        letters: [
          { h: "な", k: "ナ", ro: "na" },
          { h: "に", k: "ニ", ro: "ni" }
        ],
        availablePool: [
          { h: "な", k: "ナ", ro: "na" },
          { h: "に", k: "ニ", ro: "ni" },
          { h: "た", k: "タ", ro: "ta" },
          { h: "い", k: "イ", ro: "i" }
        ],
        isFinalPage: false
      },
      {
        pageId: 2,
        title: "Hal 2: Huruf Nu, Ne, No (Tuntas Baris N)",
        letters: [
          { h: "ぬ", k: "ヌ", ro: "nu" },
          { h: "ね", k: "ネ", ro: "ne" },
          { h: "の", k: "ノ", ro: "no" }
        ],
        availablePool: [
          { h: "な", k: "ナ", ro: "na" },
          { h: "に", k: "ニ", ro: "ni" },
          { h: "ぬ", k: "ヌ", ro: "nu" },
          { h: "ね", k: "ネ", ro: "ne" },
          { h: "の", k: "ノ", ro: "no" }
        ],
        isFinalPage: true
      }
    ]
  },

  // =========================================================================
  // TAHAP 6: BARIS H (HA - HI - FU - HE - HO)
  // =========================================================================
  {
    stageId: 6,
    stageName: "Tahap 6: Baris H (Ha - Hi - Fu - He - Ho)",
    stageShort: "Baris H",
    allLetters: [
      { h: "は", k: "ハ", ro: "ha" },
      { h: "ひ", k: "ヒ", ro: "hi" },
      { h: "ふ", k: "フ", ro: "fu" },
      { h: "へ", k: "ヘ", ro: "he" },
      { h: "ほ", k: "ホ", ro: "ho" }
    ],
    pages: [
      {
        pageId: 1,
        title: "Hal 1: Huruf Ha & Hi",
        letters: [
          { h: "は", k: "ハ", ro: "ha" },
          { h: "ひ", k: "ヒ", ro: "hi" }
        ],
        availablePool: [
          { h: "は", k: "ハ", ro: "ha" },
          { h: "ひ", k: "ヒ", ro: "hi" },
          { h: "な", k: "ナ", ro: "na" },
          { h: "あ", k: "ア", ro: "a" }
        ],
        isFinalPage: false
      },
      {
        pageId: 2,
        title: "Hal 2: Huruf Fu, He, Ho (Tuntas Baris H)",
        letters: [
          { h: "ふ", k: "フ", ro: "fu" },
          { h: "へ", k: "ヘ", ro: "he" },
          { h: "ほ", k: "ホ", ro: "ho" }
        ],
        availablePool: [
          { h: "は", k: "ハ", ro: "ha" },
          { h: "ひ", k: "ヒ", ro: "hi" },
          { h: "ふ", k: "フ", ro: "fu" },
          { h: "へ", k: "ヘ", ro: "he" },
          { h: "ほ", k: "ホ", ro: "ho" }
        ],
        isFinalPage: true
      }
    ]
  },

  // =========================================================================
  // TAHAP 7: BARIS M (MA - MI - MU - ME - MO)
  // =========================================================================
  {
    stageId: 7,
    stageName: "Tahap 7: Baris M (Ma - Mi - Mu - Me - Mo)",
    stageShort: "Baris M",
    allLetters: [
      { h: "ま", k: "マ", ro: "ma" },
      { h: "み", k: "ミ", ro: "mi" },
      { h: "む", k: "ム", ro: "mu" },
      { h: "め", k: "メ", ro: "me" },
      { h: "も", k: "モ", ro: "mo" }
    ],
    pages: [
      {
        pageId: 1,
        title: "Hal 1: Huruf Ma, Mi, Mu",
        letters: [
          { h: "ま", k: "マ", ro: "ma" },
          { h: "み", k: "ミ", ro: "mi" },
          { h: "む", k: "ム", ro: "mu" }
        ],
        availablePool: [
          { h: "ま", k: "マ", ro: "ma" },
          { h: "み", k: "ミ", ro: "mi" },
          { h: "む", k: "ム", ro: "mu" },
          { h: "あ", k: "ア", ro: "a" }
        ],
        isFinalPage: false
      },
      {
        pageId: 2,
        title: "Hal 2: Huruf Me & Mo (Tuntas Baris M)",
        letters: [
          { h: "め", k: "メ", ro: "me" },
          { h: "も", k: "モ", ro: "mo" }
        ],
        availablePool: [
          { h: "ま", k: "マ", ro: "ma" },
          { h: "み", k: "ミ", ro: "mi" },
          { h: "む", k: "ム", ro: "mu" },
          { h: "め", k: "メ", ro: "me" },
          { h: "も", k: "モ", ro: "mo" }
        ],
        isFinalPage: true
      }
    ]
  },

  // =========================================================================
  // TAHAP 8: BARIS Y (YA-YU-YO) & BARIS R (RA-RI-RU-RE-RO)
  // =========================================================================
  {
    stageId: 8,
    stageName: "Tahap 8: Baris Y & Baris R",
    stageShort: "Baris Y & R",
    allLetters: [
      { h: "や", k: "ヤ", ro: "ya" },
      { h: "ゆ", k: "ユ", ro: "yu" },
      { h: "よ", k: "ヨ", ro: "yo" },
      { h: "ら", k: "ラ", ro: "ra" },
      { h: "り", k: "リ", ro: "ri" },
      { h: "る", k: "ル", ro: "ru" },
      { h: "れ", k: "レ", ro: "re" },
      { h: "ろ", k: "ロ", ro: "ro" }
    ],
    pages: [
      {
        pageId: 1,
        title: "Hal 1: Huruf Ya, Yu, Yo",
        letters: [
          { h: "や", k: "ヤ", ro: "ya" },
          { h: "ゆ", k: "ユ", ro: "yu" },
          { h: "よ", k: "ヨ", ro: "yo" }
        ],
        availablePool: [
          { h: "や", k: "ヤ", ro: "ya" },
          { h: "ゆ", k: "ユ", ro: "yu" },
          { h: "よ", k: "ヨ", ro: "yo" },
          { h: "ま", k: "マ", ro: "ma" }
        ],
        isFinalPage: false
      },
      {
        pageId: 2,
        title: "Hal 2: Huruf Ra, Ri, Ru, Re, Ro",
        letters: [
          { h: "ら", k: "ラ", ro: "ra" },
          { h: "り", k: "リ", ro: "ri" },
          { h: "る", k: "ル", ro: "ru" },
          { h: "れ", k: "レ", ro: "re" },
          { h: "ろ", k: "ロ", ro: "ro" }
        ],
        availablePool: [
          { h: "ら", k: "ラ", ro: "ra" },
          { h: "り", k: "リ", ro: "ri" },
          { h: "る", k: "ル", ro: "ru" },
          { h: "れ", k: "レ", ro: "re" },
          { h: "ろ", k: "ロ", ro: "ro" }
        ],
        isFinalPage: true
      }
    ]
  },

  // =========================================================================
  // TAHAP 9: BARIS W & N (TUNTAS 46 HURUF DASAR SEIRYŪ)
  // =========================================================================
  {
    stageId: 9,
    stageName: "Tahap 9: Baris W & N (Tuntas 46 Dasar)",
    stageShort: "Baris W & N",
    allLetters: [
      { h: "わ", k: "ワ", ro: "wa" },
      { h: "を", k: "ヲ", ro: "wo / o" },
      { h: "ん", k: "ン", ro: "n" }
    ],
    pages: [
      {
        pageId: 1,
        title: "Hal 1: Huruf Wa, Wo (O), dan N",
        letters: [
          { h: "わ", k: "ワ", ro: "wa" },
          { h: "を", k: "ヲ", ro: "wo / o" },
          { h: "ん", k: "ン", ro: "n" }
        ],
        availablePool: [
          { h: "わ", k: "ワ", ro: "wa" },
          { h: "を", k: "ヲ", ro: "wo / o" },
          { h: "ん", k: "ン", ro: "n" },
          { h: "あ", k: "ア", ro: "a" },
          { h: "に", k: "ニ", ro: "ni" },
          { h: "ほ", k: "ホ", ro: "ho" }
        ],
        isFinalPage: true // Ujian kelulusan 46 Huruf Dasar Seiryū
      }
    ]
  },

  // =========================================================================
  // TAHAP 10: DAKUTEN ゛ & HANDAKUTEN ゜ (TENTEN & MARU)
  // =========================================================================
  {
    stageId: 10,
    stageName: "Tahap 10: Bunyi Dakuten ゛ & Handakuten ゜",
    stageShort: "Tenten & Maru",
    allLetters: [
      { h: "が", k: "ガ", ro: "ga" },
      { h: "ざ", k: "ザ", ro: "za" },
      { h: "だ", k: "ダ", ro: "da" },
      { h: "ば", k: "バ", ro: "ba" },
      { h: "ぱ", k: "パ", ro: "pa" }
    ],
    pages: [
      {
        pageId: 1,
        title: "Hal 1: Baris Ga & Za",
        letters: [
          { h: "が", k: "ガ", ro: "ga" },
          { h: "ざ", k: "ザ", ro: "za" },
          { h: "じ", k: "ジ", ro: "ji" }
        ],
        availablePool: [
          { h: "が", k: "ガ", ro: "ga" },
          { h: "ざ", k: "ザ", ro: "za" },
          { h: "じ", k: "ジ", ro: "ji" },
          { h: "み", k: "ミ", ro: "mi" },
          { h: "ず", k: "ズ", ro: "zu" }
        ],
        isFinalPage: false
      },
      {
        pageId: 2,
        title: "Hal 2: Baris Da, Ba, Pa",
        letters: [
          { h: "だ", k: "ダ", ro: "da" },
          { h: "ば", k: "バ", ro: "ba" },
          { h: "ぱ", k: "パ", ro: "pa" }
        ],
        availablePool: [
          { h: "だ", k: "ダ", ro: "da" },
          { h: "ば", k: "バ", ro: "ba" },
          { h: "ぱ", k: "パ", ro: "pa" },
          { h: "え", k: "エ", ro: "e" },
          { h: "ぶ", k: "ブ", ro: "bu" }
        ],
        isFinalPage: true
      }
    ]
  },

  // =========================================================================
  // TAHAP 11: BUNYI HENTAK (SOKUON っ) & VOKAL PANJANG (CHŌONPU ー)
  // =========================================================================
  {
    stageId: 11,
    stageName: "Tahap 11: Bunyi Hentak & Vokal Panjang",
    stageShort: "Sokuon & Chōon",
    allLetters: [
      { h: "っ", k: "ッ", ro: "(hentak 1 ketukan)" },
      { h: "ー", k: "ー", ro: "(panjang 2 ketukan)" }
    ],
    pages: [
      {
        pageId: 1,
        title: "Hal 1: Sokuon (っ / ッ Kecil - Bunyi Hentak)",
        letters: [
          { h: "っ", k: "ッ", ro: "(hentak 1 ketukan)" }
        ],
        availablePool: [
          { h: "き", k: "キ", ro: "ki" },
          { h: "て", k: "テ", ro: "te" },
          { h: "が", k: "ガ", ro: "ga" },
          { h: "こ", k: "コ", ro: "ko" },
          { h: "ざ", k: "ザ", ro: "za" },
          { h: "し", k: "シ", ro: "shi" }
        ],
        isFinalPage: false
      },
      {
        pageId: 2,
        title: "Hal 2: Chōonpu (Vokal Panjang & Simbol ー)",
        letters: [
          { h: "ー", k: "ー", ro: "(panjang 2 ketukan)" }
        ],
        availablePool: [
          { h: "お", k: "オ", ro: "o" },
          { h: "ば", k: "バ", ro: "ba" },
          { h: "じ", k: "ジ", ro: "ji" },
          { h: "こ", k: "コ", ro: "ko" },
          { h: "ひ", k: "ヒ", ro: "hi" }
        ],
        isFinalPage: true
      }
    ]
  },

  // =========================================================================
  // TAHAP 12: BUNYI RANGKAP (YŌON - ゃ, ゅ, ょ KECIL)
  // =========================================================================
  {
    stageId: 12,
    stageName: "Tahap 12: Bunyi Rangkap (Yōon ゃ, ゅ, ょ)",
    stageShort: "Yōon (Bunyi Rangkap)",
    allLetters: [
      { h: "きゃ", k: "キャ", ro: "kya" },
      { h: "しゃ", k: "シャ", ro: "sha" },
      { h: "ちゃ", k: "チャ", ro: "cha" },
      { h: "にゃ", k: "ニャ", ro: "nya" },
      { h: "りゃ", k: "リャ", ro: "rya" }
    ],
    pages: [
      {
        pageId: 1,
        title: "Hal 1: Yōon Baris K & S (Kya, Sha)",
        letters: [
          { h: "きゃ", k: "キャ", ro: "kya" },
          { h: "しゃ", k: "シャ", ro: "sha" }
        ],
        availablePool: [
          { h: "きゃ", k: "キャ", ro: "kya" },
          { h: "しゃ", k: "シャ", ro: "sha" },
          { h: "お", k: "オ", ro: "o" },
          { h: "ん", k: "ン", ro: "n" }
        ],
        isFinalPage: false
      },
      {
        pageId: 2,
        title: "Hal 2: Yōon Lengkap & Pamungkas",
        letters: [
          { h: "ちゃ", k: "チャ", ro: "cha" },
          { h: "にゃ", k: "ニャ", ro: "nya" },
          { h: "りゃ", k: "リャ", ro: "rya" }
        ],
        availablePool: [
          { h: "ちゃ", k: "チャ", ro: "cha" },
          { h: "にゃ", k: "ニャ", ro: "nya" },
          { h: "りゃ", k: "リャ", ro: "rya" },
          { h: "じゅ", k: "ジュ", ro: "ju" }
        ],
        isFinalPage: true // Ujian kelulusan pamungkas seluruh materi Kana!
      }
    ]
  }
];

// =========================================================================
// KOSAKATA NYATA BAHASA JEPANG UNTUK MODEL SOAL KATA & ISIAN
// =========================================================================
const KANA_STAGE_WORDS = {
  1: [
    { ro: "ai", h: "あい", k: "アイ", meaning: "Cinta / Kasih", chars: ["あ", "い"] },
    { ro: "ie", h: "いえ", k: "イエ", meaning: "Rumah", chars: ["い", "え"] },
    { ro: "aoi", h: "あおい", k: "アオイ", meaning: "Biru", chars: ["あ", "お", "い"] },
    { ro: "ue", h: "うえ", k: "ウエ", meaning: "Atas", chars: ["う", "え"] }
  ],
  2: [
    { ro: "kaki", h: "かき", k: "カキ", meaning: "Buah Kesemek", chars: ["か", "き"] },
    { ro: "kiku", h: "きく", k: "キク", meaning: "Mendengar", chars: ["き", "く"] },
    { ro: "ike", h: "いけ", k: "イケ", meaning: "Kolam", chars: ["い", "け"] },
    { ro: "koe", h: "こえ", k: "コエ", meaning: "Suara", chars: ["こ", "え"] },
    { ro: "koko", h: "ここ", k: "ココ", meaning: "Di Sini", chars: ["こ", "こ"] }
  ],
  3: [
    { ro: "sushi", h: "すし", k: "スシ", meaning: "Sushi", chars: ["す", "し"] },
    { ro: "asa", h: "あさ", k: "アサ", meaning: "Pagi", chars: ["あ", "さ"] },
    { ro: "kasa", h: "かさ", k: "カサ", meaning: "Payung", chars: ["か", "さ"] },
    { ro: "soko", h: "そこ", k: "ソコ", meaning: "Di Sana", chars: ["そ", "こ"] }
  ],
  4: [
    { ro: "tsuki", h: "つき", k: "ツキ", meaning: "Bulan", chars: ["つ", "き"] },
    { ro: "takai", h: "たかい", k: "タカイ", meaning: "Tinggi / Mahal", chars: ["た", "か", "い"] },
    { ro: "oto", h: "おと", k: "オト", meaning: "Suara / Bunyi", chars: ["お", "と"] },
    { ro: "kutsu", h: "くつ", k: "クツ", meaning: "Sepatu", chars: ["く", "つ"] }
  ],
  5: [
    { ro: "inu", h: "いぬ", k: "イヌ", meaning: "Anjing", chars: ["い", "ぬ"] },
    { ro: "neko", h: "ねこ", k: "ネコ", meaning: "Kucing", chars: ["ね", "こ"] },
    { ro: "natsu", h: "なつ", k: "ナツ", meaning: "Musim Panas", chars: ["な", "つ"] },
    { ro: "niku", h: "にく", k: "ニク", meaning: "Daging", chars: ["に", "く"] }
  ],
  6: [
    { ro: "hana", h: "はな", k: "ハナ", meaning: "Bunga / Hidung", chars: ["は", "な"] },
    { ro: "hito", h: "ひと", k: "ヒト", meaning: "Orang", chars: ["ひ", "と"] },
    { ro: "fune", h: "ふね", k: "フネ", meaning: "Perahu / Kapal", chars: ["ふ", "ね"] },
    { ro: "hoshi", h: "ほし", k: "ホシ", meaning: "Bintang", chars: ["ほ", "し"] }
  ],
  7: [
    { ro: "machi", h: "まち", k: "マチ", meaning: "Kota", chars: ["ま", "ち"] },
    { ro: "mizu", h: "みず", k: "ミズ", meaning: "Air", chars: ["み", "ず"] },
    { ro: "ame", h: "あめ", k: "アメ", meaning: "Hujan", chars: ["あ", "め"] },
    { ro: "kumo", h: "くも", k: "クモ", meaning: "Awan", chars: ["く", "も"] }
  ],
  8: [
    { ro: "yama", h: "やま", k: "ヤマ", meaning: "Gunung", chars: ["や", "ま"] },
    { ro: "yuki", h: "ゆき", k: "ユキ", meaning: "Salju", chars: ["ゆ", "き"] },
    { ro: "yoru", h: "よる", k: "ヨル", meaning: "Malam", chars: ["よ", "る"] },
    { ro: "sakura", h: "さくら", k: "サクラ", meaning: "Bunga Sakura", chars: ["さ", "く", "ら"] },
    { ro: "tori", h: "とり", k: "トリ", meaning: "Burung", chars: ["と", "り"] }
  ],
  9: [
    { ro: "watashi", h: "わたし", k: "ワタシ", meaning: "Saya", chars: ["わ", "た", "し"] },
    { ro: "nihon", h: "にほん", k: "ニホン", meaning: "Jepang", chars: ["に", "ほ", "ん"] },
    { ro: "hon", h: "ほん", k: "ホン", meaning: "Buku", chars: ["ほ", "ん"] },
    { ro: "wani", h: "わに", k: "ワニ", meaning: "Buaya", chars: ["わ", "に"] }
  ],
  10: [
    { ro: "kagi", h: "かぎ", k: "カギ", meaning: "Kunci", chars: ["か", "ぎ"] },
    { ro: "chizu", h: "ちず", k: "チズ", meaning: "Peta", chars: ["ち", "ず"] },
    { ro: "pan", h: "ぱん", k: "パン", meaning: "Roti", chars: ["ぱ", "ん"] },
    { ro: "denwa", h: "でんわ", k: "デンワ", meaning: "Telepon", chars: ["で", "ん", "わ"] }
  ],
  11: [
    { ro: "kitte", h: "きって", k: "キッテ", meaning: "Perangko", chars: ["き", "っ", "て"] },
    { ro: "zasshi", h: "ざっし", k: "ザッシ", meaning: "Majalah", chars: ["ざ", "っ", "し"] },
    { ro: "koppu", h: "こっぷ", k: "コップ", meaning: "Gelas", chars: ["こ", "っ", "ぷ"] },
    { ro: "koohii", h: "コーヒー", k: "コーヒー", meaning: "Kopi", chars: ["コ", "ー", "ヒ", "ー"] }
  ],
  12: [
    { ro: "ocha", h: "おちゃ", k: "オチャ", meaning: "Teh Hijau", chars: ["お", "ちゃ"] },
    { ro: "shashin", h: "しゃしん", k: "シャシン", meaning: "Foto", chars: ["しゃ", "し", "ん"] },
    { ro: "kyou", h: "きょう", k: "キョウ", meaning: "Hari Ini", chars: ["きょ", "う"] },
    { ro: "shatsu", h: "シャツ", k: "シャツ", meaning: "Kemeja", chars: ["シャ", "ツ"] }
  ]
};

if (typeof window !== 'undefined') {
  window.KANA_STAGES = KANA_STAGES;
  window.KANA_STAGE_WORDS = KANA_STAGE_WORDS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KANA_STAGES, KANA_STAGE_WORDS };
}
