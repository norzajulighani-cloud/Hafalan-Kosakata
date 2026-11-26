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
    { ro: "ai", h: "あい", k: "アイ", meaning: "Cinta / Kasih", chars: ["あ", "い"], minPage: 1 },
    { ro: "ii", h: "いい", k: "イイ", meaning: "Bagus / Baik", chars: ["い", "い"], minPage: 1 },
    { ro: "ie", h: "いえ", k: "イエ", meaning: "Rumah", chars: ["い", "え"], minPage: 2 },
    { ro: "ue", h: "うえ", k: "ウエ", meaning: "Atas", chars: ["う", "え"], minPage: 2 },
    { ro: "au", h: "あう", k: "アウ", meaning: "Bertemu", chars: ["あ", "う"], minPage: 2 },
    { ro: "iu", h: "いう", k: "イウ", meaning: "Berkata", chars: ["い", "う"], minPage: 2 },
    { ro: "iie", h: "いいえ", k: "イイエ", meaning: "Tidak / Bukan", chars: ["い", "い", "え"], minPage: 2 },
    { ro: "aoi", h: "あおい", k: "アオイ", meaning: "Biru", chars: ["あ", "お", "い"], minPage: 3 },
    { ro: "ooi", h: "おおい", k: "オオイ", meaning: "Banyak", chars: ["お", "お", "い"], minPage: 3 },
    { ro: "oi", h: "おい", k: "オイ", meaning: "Keponakan Laki-laki", chars: ["お", "い"], minPage: 3 }
  ],
  2: [
    { ro: "kaki", h: "かき", k: "カキ", meaning: "Buah Kesemek", chars: ["か", "き"], minPage: 1 },
    { ro: "kao", h: "かお", k: "カオ", meaning: "Wajah", chars: ["か", "お"], minPage: 1 },
    { ro: "ika", h: "いか", k: "イカ", meaning: "Cumi-cumi", chars: ["い", "か"], minPage: 1 },
    { ro: "akai", h: "あかい", k: "アカイ", meaning: "Merah", chars: ["あ", "か", "い"], minPage: 1 },
    { ro: "eki", h: "えき", k: "エキ", meaning: "Stasiun", chars: ["え", "き"], minPage: 1 },
    { ro: "aki", h: "あき", k: "アキ", meaning: "Musim Gugur", chars: ["あ", "き"], minPage: 1 },
    { ro: "kikai", h: "きかい", k: "キカイ", meaning: "Mesin / Kesempatan", chars: ["き", "か", "い"], minPage: 1 },
    { ro: "kiku", h: "きく", k: "キク", meaning: "Mendengar / Bertanya", chars: ["き", "く"], minPage: 2 },
    { ro: "ike", h: "いけ", k: "イケ", meaning: "Kolam", chars: ["い", "け"], minPage: 2 },
    { ro: "kaku", h: "かく", k: "カク", meaning: "Menulis", chars: ["か", "く"], minPage: 2 },
    { ro: "iku", h: "いく", k: "イク", meaning: "Pergi", chars: ["い", "く"], minPage: 2 },
    { ro: "ookii", h: "おおきい", k: "オオキイ", meaning: "Besar", chars: ["お", "お", "き", "い"], minPage: 2 },
    { ro: "kuuki", h: "くうき", k: "クウキ", meaning: "Udara", chars: ["く", "う", "き"], minPage: 2 },
    { ro: "koe", h: "こえ", k: "コエ", meaning: "Suara", chars: ["こ", "え"], minPage: 3 },
    { ro: "koko", h: "ここ", k: "ココ", meaning: "Di Sini", chars: ["こ", "こ"], minPage: 3 },
    { ro: "koi", h: "こい", k: "コイ", meaning: "Ikan Koi / Cinta", chars: ["こ", "い"], minPage: 3 },
    { ro: "kokoa", h: "ここあ", k: "ココア", meaning: "Cokelat Hangat", chars: ["こ", "こ", "あ"], minPage: 3 }
  ],
  3: [
    { ro: "asa", h: "あさ", k: "アサ", meaning: "Pagi", chars: ["あ", "さ"], minPage: 1 },
    { ro: "kasa", h: "かさ", k: "カサ", meaning: "Payung", chars: ["か", "さ"], minPage: 1 },
    { ro: "ashi", h: "あし", k: "アシ", meaning: "Kaki", chars: ["あ", "し"], minPage: 1 },
    { ro: "ishi", h: "いし", k: "イシ", meaning: "Batu", chars: ["い", "し"], minPage: 1 },
    { ro: "shio", h: "しお", k: "シオ", meaning: "Garam", chars: ["し", "お"], minPage: 1 },
    { ro: "shika", h: "しか", k: "シカ", meaning: "Rusa", chars: ["し", "か"], minPage: 1 },
    { ro: "sake", h: "さけ", k: "サケ", meaning: "Ikan Salmon / Sake", chars: ["さ", "け"], minPage: 1 },
    { ro: "kesa", h: "けさ", k: "ケサ", meaning: "Tadi Pagi", chars: ["け", "さ"], minPage: 1 },
    { ro: "kushi", h: "くし", k: "クシ", meaning: "Sisir / Sate", chars: ["く", "し"], minPage: 1 },
    { ro: "saki", h: "さき", k: "サキ", meaning: "Ujung / Duluan", chars: ["さ", "き"], minPage: 1 },
    { ro: "sushi", h: "すし", k: "スシ", meaning: "Sushi", chars: ["す", "し"], minPage: 2 },
    { ro: "soko", h: "そこ", k: "ソコ", meaning: "Di Sana", chars: ["そ", "こ"], minPage: 2 },
    { ro: "isu", h: "いす", k: "イス", meaning: "Kursi", chars: ["い", "す"], minPage: 2 },
    { ro: "ase", h: "あせ", k: "アセ", meaning: "Keringat", chars: ["あ", "せ"], minPage: 2 },
    { ro: "uso", h: "うそ", k: "ウソ", meaning: "Bohong", chars: ["う", "そ"], minPage: 2 },
    { ro: "osoi", h: "おそい", k: "オソイ", meaning: "Lambat", chars: ["お", "そ", "い"], minPage: 2 },
    { ro: "sekai", h: "せかい", k: "セカイ", meaning: "Dunia", chars: ["せ", "か", "い"], minPage: 2 },
    { ro: "kisu", h: "きす", k: "キス", meaning: "Cium / Ikan Kisu", chars: ["き", "す"], minPage: 2 }
  ],
  4: [
    { ro: "uta", h: "うた", k: "ウタ", meaning: "Lagu", chars: ["う", "た"], minPage: 1 },
    { ro: "takai", h: "たかい", k: "タカイ", meaning: "Tinggi / Mahal", chars: ["た", "か", "い"], minPage: 1 },
    { ro: "kuchi", h: "くち", k: "クチ", meaning: "Mulut", chars: ["く", "ち"], minPage: 1 },
    { ro: "ichi", h: "いち", k: "イチ", meaning: "Satu (Angka)", chars: ["い", "ち"], minPage: 1 },
    { ro: "shita", h: "した", k: "シタ", meaning: "Bawah / Lidah", chars: ["し", "た"], minPage: 1 },
    { ro: "kita", h: "きた", k: "キタ", meaning: "Utara", chars: ["き", "た"], minPage: 1 },
    { ro: "ashita", h: "あした", k: "アシタ", meaning: "Besok", chars: ["あ", "し", "た"], minPage: 1 },
    { ro: "chikai", h: "ちかい", k: "チカイ", meaning: "Dekat", chars: ["ち", "か", "い"], minPage: 1 },
    { ro: "tsuki", h: "つき", k: "ツキ", meaning: "Bulan", chars: ["つ", "き"], minPage: 2 },
    { ro: "oto", h: "おと", k: "オト", meaning: "Suara / Bunyi", chars: ["お", "と"], minPage: 2 },
    { ro: "kutsu", h: "くつ", k: "クツ", meaning: "Sepatu", chars: ["く", "つ"], minPage: 2 },
    { ro: "tsukue", h: "つくえ", k: "ツクエ", meaning: "Meja Belajar", chars: ["つ", "く", "え"], minPage: 2 },
    { ro: "tokei", h: "とけい", k: "トケイ", meaning: "Jam", chars: ["と", "け", "い"], minPage: 2 },
    { ro: "koto", h: "こと", k: "コト", meaning: "Hal / Alat Musik Koto", chars: ["こ", "と"], minPage: 2 },
    { ro: "chikatetsu", h: "ちかてつ", k: "チカテツ", meaning: "Kereta Bawah Tanah", chars: ["ち", "か", "て", "つ"], minPage: 2 },
    { ro: "soto", h: "そと", k: "ソト", meaning: "Luar", chars: ["そ", "と"], minPage: 2 }
  ],
  5: [
    { ro: "sakana", h: "さかな", k: "サカナ", meaning: "Ikan", chars: ["さ", "か", "な"], minPage: 1 },
    { ro: "nani", h: "なに", k: "ナニ", meaning: "Apa", chars: ["な", "に"], minPage: 1 },
    { ro: "niku", h: "にく", k: "ニク", meaning: "Daging", chars: ["に", "く"], minPage: 1 },
    { ro: "naka", h: "なか", k: "ナカ", meaning: "Dalam / Tengah", chars: ["な", "か"], minPage: 1 },
    { ro: "oni", h: "おに", k: "オニ", meaning: "Raksasa Oni", chars: ["お", "に"], minPage: 1 },
    { ro: "kani", h: "かに", k: "カニ", meaning: "Kepiting", chars: ["か", "に"], minPage: 1 },
    { ro: "natsu", h: "なつ", k: "ナツ", meaning: "Musim Panas", chars: ["な", "つ"], minPage: 1 },
    { ro: "nishi", h: "にし", k: "ニシ", meaning: "Barat", chars: ["に", "し"], minPage: 1 },
    { ro: "inu", h: "いぬ", k: "イヌ", meaning: "Anjing", chars: ["い", "ぬ"], minPage: 2 },
    { ro: "neko", h: "ねこ", k: "ネコ", meaning: "Kucing", chars: ["ね", "こ"], minPage: 2 },
    { ro: "okane", h: "おかね", k: "オカネ", meaning: "Uang", chars: ["お", "か", "ね"], minPage: 2 },
    { ro: "ane", h: "あね", k: "アネ", meaning: "Kakak Perempuan", chars: ["あ", "ね"], minPage: 2 },
    { ro: "kinou", h: "きのう", k: "キノウ", meaning: "Kemarin", chars: ["き", "の", "う"], minPage: 2 },
    { ro: "nuno", h: "ぬの", k: "ヌノ", meaning: "Kain", chars: ["ぬ", "の"], minPage: 2 },
    { ro: "tanoshii", h: "たのしい", k: "タノシイ", meaning: "Menyenangkan", chars: ["た", "の", "し", "い"], minPage: 2 }
  ],
  6: [
    { ro: "hana", h: "はな", k: "ハナ", meaning: "Bunga / Hidung", chars: ["は", "な"], minPage: 1 },
    { ro: "hito", h: "ひと", k: "ヒト", meaning: "Orang", chars: ["ひ", "と"], minPage: 1 },
    { ro: "hashi", h: "はし", k: "ハシ", meaning: "Sumpit / Jembatan", chars: ["は", "し"], minPage: 1 },
    { ro: "hako", h: "はこ", k: "ハコ", meaning: "Kotak", chars: ["は", "こ"], minPage: 1 },
    { ro: "hachi", h: "はち", k: "ハチ", meaning: "Delapan / Lebah", chars: ["は", "ち"], minPage: 1 },
    { ro: "haka", h: "はか", k: "ハカ", meaning: "Makam", chars: ["は", "か"], minPage: 1 },
    { ro: "hikui", h: "ひくい", k: "ヒクイ", meaning: "Rendah / Pendek", chars: ["ひ", "く", "い"], minPage: 1 },
    { ro: "haha", h: "はは", k: "ハハ", meaning: "Ibu (Sendiri)", chars: ["は", "は"], minPage: 1 },
    { ro: "fune", h: "ふね", k: "フネ", meaning: "Perahu / Kapal", chars: ["ふ", "ね"], minPage: 2 },
    { ro: "hoshi", h: "ほし", k: "ホシ", meaning: "Bintang", chars: ["ほ", "し"], minPage: 2 },
    { ro: "fuku", h: "ふく", k: "フク", meaning: "Baju / Pakaian", chars: ["ふ", "く"], minPage: 2 },
    { ro: "hoka", h: "ほか", k: "ホカ", meaning: "Lainnya", chars: ["ほ", "か"], minPage: 2 },
    { ro: "heta", h: "へた", k: "ヘタ", meaning: "Kurang Mahir", chars: ["へ", "た"], minPage: 2 },
    { ro: "hosoi", h: "ほそい", k: "ホソイ", meaning: "Tipis / Ramping", chars: ["ほ", "そ", "い"], minPage: 2 },
    { ro: "futoi", h: "ふとい", k: "フトイ", meaning: "Tebal / Gemuk", chars: ["ふ", "と", "い"], minPage: 2 }
  ],
  7: [
    { ro: "machi", h: "まち", k: "マチ", meaning: "Kota", chars: ["ま", "ち"], minPage: 1 },
    { ro: "mimi", h: "みみ", k: "ミミ", meaning: "Telinga", chars: ["み", "み"], minPage: 1 },
    { ro: "umi", h: "うみ", k: "ウミ", meaning: "Laut", chars: ["う", "み"], minPage: 1 },
    { ro: "mushi", h: "むし", k: "ムシ", meaning: "Serangga", chars: ["む", "し"], minPage: 1 },
    { ro: "kuma", h: "くま", k: "クマ", meaning: "Beruang", chars: ["く", "ま"], minPage: 1 },
    { ro: "atama", h: "あたま", k: "アタマ", meaning: "Kepala", chars: ["あ", "た", "ま"], minPage: 1 },
    { ro: "nomu", h: "のむ", k: "ノム", meaning: "Minum", chars: ["の", "む"], minPage: 1 },
    { ro: "kami", h: "かみ", k: "カミ", meaning: "Kertas / Rambut", chars: ["か", "み"], minPage: 1 },
    { ro: "ame", h: "あめ", k: "アメ", meaning: "Hujan / Permen", chars: ["あ", "め"], minPage: 2 },
    { ro: "kumo", h: "くも", k: "クモ", meaning: "Awan / Laba-laba", chars: ["く", "も"], minPage: 2 },
    { ro: "nomimono", h: "のみもの", k: "ノミモノ", meaning: "Minuman", chars: ["の", "み", "も", "の"], minPage: 2 },
    { ro: "kimono", h: "きもの", k: "キモノ", meaning: "Kimono", chars: ["き", "も", "の"], minPage: 2 },
    { ro: "momo", h: "もも", k: "モモ", meaning: "Buah Persik", chars: ["も", "も"], minPage: 2 },
    { ro: "kame", h: "かめ", k: "カメ", meaning: "Kura-kura", chars: ["か", "め"], minPage: 2 },
    { ro: "omoi", h: "おもい", k: "オモイ", meaning: "Berat", chars: ["お", "も", "い"], minPage: 2 }
  ],
  8: [
    { ro: "yama", h: "やま", k: "ヤマ", meaning: "Gunung", chars: ["や", "ま"], minPage: 1 },
    { ro: "yuki", h: "ゆき", k: "ユキ", meaning: "Salju", chars: ["ゆ", "き"], minPage: 1 },
    { ro: "yume", h: "ゆめ", k: "ユメ", meaning: "Mimpi", chars: ["ゆ", "め"], minPage: 1 },
    { ro: "yasui", h: "やすい", k: "ヤスイ", meaning: "Murah", chars: ["や", "す", "い"], minPage: 1 },
    { ro: "yasai", h: "やさい", k: "ヤサイ", meaning: "Sayuran", chars: ["や", "さ", "い"], minPage: 1 },
    { ro: "yomu", h: "よむ", k: "ヨム", meaning: "Membaca", chars: ["よ", "む"], minPage: 1 },
    { ro: "tsuyoi", h: "つよい", k: "ツヨイ", meaning: "Kuat", chars: ["つ", "よ", "い"], minPage: 1 },
    { ro: "heya", h: "へや", k: "ヘヤ", meaning: "Kamar", chars: ["へ", "や"], minPage: 1 },
    { ro: "yoru", h: "よる", k: "ヨル", meaning: "Malam", chars: ["よ", "る"], minPage: 2 },
    { ro: "sakura", h: "さくら", k: "サクラ", meaning: "Bunga Sakura", chars: ["さ", "く", "ら"], minPage: 2 },
    { ro: "tori", h: "とり", k: "トリ", meaning: "Burung", chars: ["と", "り"], minPage: 2 },
    { ro: "sora", h: "そら", k: "ソラ", meaning: "Langit", chars: ["そ", "ら"], minPage: 2 },
    { ro: "kuruma", h: "くるま", k: "クルマ", meaning: "Mobil", chars: ["く", "る", "ま"], minPage: 2 },
    { ro: "kirei", h: "きれい", k: "キレイ", meaning: "Cantik / Bersih", chars: ["き", "れ", "い"], minPage: 2 },
    { ro: "iro", h: "いろ", k: "イロ", meaning: "Warna", chars: ["い", "ろ"], minPage: 2 },
    { ro: "shiroi", h: "しろい", k: "シロイ", meaning: "Putih", chars: ["し", "ろ", "い"], minPage: 2 }
  ],
  9: [
    { ro: "watashi", h: "わたし", k: "ワタシ", meaning: "Saya", chars: ["わ", "た", "し"], minPage: 1 },
    { ro: "nihon", h: "にほん", k: "ニホン", meaning: "Jepang", chars: ["に", "ほ", "ん"], minPage: 1 },
    { ro: "hon", h: "ほん", k: "ホン", meaning: "Buku", chars: ["ほ", "ん"], minPage: 1 },
    { ro: "wani", h: "わに", k: "ワニ", meaning: "Buaya", chars: ["わ", "に"], minPage: 1 },
    { ro: "tenki", h: "てんき", k: "テンキ", meaning: "Cuaca", chars: ["て", "ん", "き"], minPage: 1 },
    { ro: "sensei", h: "せんせい", k: "センセイ", meaning: "Guru", chars: ["せ", "ん", "せ", "い"], minPage: 1 },
    { ro: "minna", h: "みんな", k: "ミンナ", meaning: "Semuanya", chars: ["み", "ん", "な"], minPage: 1 },
    { ro: "kawa", h: "かわ", k: "カワ", meaning: "Sungai", chars: ["か", "わ"], minPage: 1 },
    { ro: "niwa", h: "にわ", k: "ニワ", meaning: "Halaman / Taman", chars: ["に", "わ"], minPage: 1 },
    { ro: "mikan", h: "みかん", k: "ミカン", meaning: "Jeruk Mandarin", chars: ["み", "か", "ん"], minPage: 1 },
    { ro: "wan", h: "わん", k: "ワン", meaning: "Gonggongan Anjing", chars: ["わ", "ん"], minPage: 1 },
    { ro: "kantan", h: "かんたん", k: "カンタン", meaning: "Mudah", chars: ["か", "ん", "た", "ん"], minPage: 1 },
    { ro: "onsen", h: "おんせん", k: "オンセン", meaning: "Pemandian Air Panas", chars: ["お", "ん", "せ", "ん"], minPage: 1 }
  ],
  10: [
    { ro: "kagi", h: "かぎ", k: "カギ", meaning: "Kunci", chars: ["か", "ぎ"], minPage: 1 },
    { ro: "mizu", h: "みず", k: "ミズ", meaning: "Air", chars: ["み", "ず"], minPage: 1 },
    { ro: "chizu", h: "ちず", k: "チズ", meaning: "Peta", chars: ["ち", "ず"], minPage: 1 },
    { ro: "kazoku", h: "かぞく", k: "カゾク", meaning: "Keluarga", chars: ["か", "ぞ", "く"], minPage: 1 },
    { ro: "genki", h: "げんき", k: "ゲンキ", meaning: "Sehat / Bersemangat", chars: ["げ", "ん", "き"], minPage: 1 },
    { ro: "kaze", h: "かぜ", k: "カゼ", meaning: "Angin", chars: ["か", "ぜ"], minPage: 1 },
    { ro: "jikan", h: "じかん", k: "ジカン", meaning: "Waktu / Jam", chars: ["じ", "か", "ん"], minPage: 1 },
    { ro: "megane", h: "めがね", k: "メガネ", meaning: "Kacamata", chars: ["め", "が", "ね"], minPage: 1 },
    { ro: "ongaku", h: "おんがく", k: "オンガク", meaning: "Musik", chars: ["お", "ん", "が", "く"], minPage: 1 },
    { ro: "pan", h: "ぱん", k: "パン", meaning: "Roti", chars: ["ぱ", "ん"], minPage: 2 },
    { ro: "denwa", h: "でんわ", k: "デンワ", meaning: "Telepon", chars: ["で", "ん", "わ"], minPage: 2 },
    { ro: "tomodachi", h: "ともだち", k: "トモダチ", meaning: "Teman", chars: ["と", "も", "だ", "ち"], minPage: 2 },
    { ro: "kaban", h: "かばん", k: "カバン", meaning: "Tas", chars: ["か", "ば", "ん"], minPage: 2 },
    { ro: "tabemono", h: "たべもの", k: "タベモノ", meaning: "Makanan", chars: ["た", "べ", "も", "の"], minPage: 2 },
    { ro: "enpitsu", h: "えんぴつ", k: "エンピツ", meaning: "Pensil", chars: ["え", "ん", "ぴ", "つ"], minPage: 2 },
    { ro: "boushi", h: "ぼうし", k: "ボウシ", meaning: "Topi", chars: ["ぼ", "う", "し"], minPage: 2 }
  ],
  11: [
    { ro: "kitte", h: "きって", k: "キッテ", meaning: "Perangko", chars: ["き", "っ", "て"], minPage: 1 },
    { ro: "zasshi", h: "ざっし", k: "ザッシ", meaning: "Majalah", chars: ["ざ", "っ", "し"], minPage: 1 },
    { ro: "koppu", h: "こっぷ", k: "コップ", meaning: "Gelas", chars: ["こ", "っ", "ぷ"], minPage: 1 },
    { ro: "kippu", h: "きっぷ", k: "キップ", meaning: "Tiket / Karcis", chars: ["き", "っ", "ぷ"], minPage: 1 },
    { ro: "nikki", h: "にっき", k: "ニッキ", meaning: "Buku Harian", chars: ["に", "っ", "き"], minPage: 1 },
    { ro: "gakkou", h: "がっこう", k: "ガッコウ", meaning: "Sekolah", chars: ["が", "っ", "こ", "う"], minPage: 1 },
    { ro: "mittsu", h: "みっつ", k: "ミッツ", meaning: "Tiga Buah", chars: ["み", "っ", "つ"], minPage: 1 },
    { ro: "koohii", h: "コーヒー", k: "コーヒー", meaning: "Kopi", chars: ["コ", "ー", "ヒ", "ー"], minPage: 2 },
    { ro: "keeki", h: "ケーキ", k: "ケーキ", meaning: "Kue Tart", chars: ["ケ", "ー", "キ"], minPage: 2 },
    { ro: "nooto", h: "ノート", k: "ノート", meaning: "Buku Catatan", chars: ["ノ", "ー", "ト"], minPage: 2 },
    { ro: "takushii", h: "タクシー", k: "タクシー", meaning: "Taksi", chars: ["タ", "ク", "シ", "ー"], minPage: 2 },
    { ro: "suupaa", h: "スーパー", k: "スーパー", meaning: "Supermarket", chars: ["ス", "ー", "パ", "ー"], minPage: 2 },
    { ro: "teeburu", h: "テーブル", k: "テーブル", meaning: "Meja Makan", chars: ["テ", "ー", "ブ", "ル"], minPage: 2 },
    { ro: "sukii", h: "スキー", k: "スキー", meaning: "Olahraga Ski", chars: ["ス", "キ", "ー"], minPage: 2 }
  ],
  12: [
    { ro: "shashin", h: "しゃしん", k: "シャシン", meaning: "Foto", chars: ["しゃ", "し", "ん"], minPage: 1 },
    { ro: "kyou", h: "きょう", k: "キョウ", meaning: "Hari Ini", chars: ["きょ", "う"], minPage: 1 },
    { ro: "shatsu", h: "シャツ", k: "シャツ", meaning: "Kemeja", chars: ["シャ", "ツ"], minPage: 1 },
    { ro: "kyaku", h: "きゃく", k: "キャク", meaning: "Tamu / Pelanggan", chars: ["きゃ", "く"], minPage: 1 },
    { ro: "kyonen", h: "きょねん", k: "キョネン", meaning: "Tahun Lalu", chars: ["きょ", "ね", "ん"], minPage: 1 },
    { ro: "shukudai", h: "しゅくだい", k: "シュクダイ", meaning: "Pekerjaan Rumah", chars: ["しゅ", "く", "だ", "い"], minPage: 1 },
    { ro: "kyoushitsu", h: "きょうしつ", k: "キョウシツ", meaning: "Ruang Kelas", chars: ["きょ", "う", "し", "つ"], minPage: 1 },
    { ro: "ocha", h: "おちゃ", k: "オチャ", meaning: "Teh Hijau", chars: ["お", "ちゃ"], minPage: 2 },
    { ro: "ryokou", h: "りょこう", k: "リョコウ", meaning: "Wisata", chars: ["りょ", "こ", "う"], minPage: 2 },
    { ro: "ryouri", h: "りょうり", k: "リョウリ", meaning: "Masakan", chars: ["りょ", "う", "り"], minPage: 2 },
    { ro: "juusu", h: "ジュース", k: "ジュース", meaning: "Jus Buah", chars: ["ジュ", "ー", "ス"], minPage: 2 },
    { ro: "hyaku", h: "ひゃく", k: "ヒャク", meaning: "Seratus (100)", chars: ["ひゃ", "く"], minPage: 2 },
    { ro: "byouin", h: "びょういん", k: "ビョウイン", meaning: "Rumah Sakit", chars: ["びょ", "う", "い", "ん"], minPage: 2 },
    { ro: "chawan", h: "ちゃわん", k: "チャワン", meaning: "Mangkuk Nasi", chars: ["ちゃ", "わ", "ん"], minPage: 2 }
  ]
};

if (typeof window !== 'undefined') {
  window.KANA_STAGES = KANA_STAGES;
  window.KANA_STAGE_WORDS = KANA_STAGE_WORDS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KANA_STAGES, KANA_STAGE_WORDS };
}
