
const DB_I_Adj = [
  { k: "大きい", r: "おおきい", a: "besar", grp: 0 },
  { k: "小さい", r: "ちいさい", a: "kecil", grp: 0 },
  { k: "長い", r: "ながい", a: "panjang", grp: 0 },
  { k: "短い", r: "みじかい", a: "pendek", grp: 0 },
  { k: "多い", r: "おおい", a: "banyak", grp: 0 },
  { k: "少ない", r: "すくない", a: "sedikit", grp: 0 },
  { k: "太い", r: "ふとい", a: "gemuk, tebal", grp: 0 },
  { k: "細い", r: "ほそい", a: "ramping, tipis", grp: 0 },
  { k: "厚い", r: "あつい", a: "tebal", grp: 0 },
  { k: "薄い", r: "うすい", a: "tipis", grp: 0 },
  { k: "固い", r: "かたい", a: "keras", grp: 0 },
  { k: "柔かい", r: "やわらかい", a: "lunak", grp: 0 },
  { k: "広い", r: "ひろい", a: "luas", grp: 0 },
  { k: "狭い", r: "せまい", a: "sempit", grp: 0 },
  { k: "細かい", r: "こまかい", a: "kecil (uang)", grp: 0 },
  { k: "粗い", r: "あらい", a: "kasar", grp: 0 },
  { k: "新しい", r: "あたらしい", a: "baru", grp: 0 },
  { k: "古い", r: "ふるい", a: "lama, tua", grp: 0 },
  { k: "高い", r: "たかい", a: "mahal", grp: 0 },
  { k: "安い", r: "やすい", a: "murah", grp: 0 },

  { k: "早い", r: "はやい", a: "cepat (awal waktu)", grp: 1 },
  { k: "速い", r: "はやい", a: "cepat (kelajuan)", grp: 1 },
  { k: "遅い", r: "おそい", a: "lambat", grp: 1 },
  { k: "遠い", r: "とおい", a: "jauh", grp: 1 },
  { k: "近い", r: "ちかい", a: "dekat", grp: 1 },
  { k: "強い", r: "つよい", a: "kuat", grp: 1 },
  { k: "弱い", r: "よわい", a: "lemah", grp: 1 },
  { k: "高い", r: "たかい", a: "tinggi, mahal", grp: 1 },
  { k: "低い", r: "ひくい", a: "rendah", grp: 1 },
  { k: "熱い", r: "あつい", a: "pananas (benda/air)", grp: 1 },
  { k: "冷たい", r: "つめたい", a: "dingin (benda/air)", grp: 1 },
  { k: "温かい", r: "あたたかい", a: "hangat (benda/air)", grp: 1 },
  { k: "温い", r: "ぬるい", a: "kurang panas", note: "Biasa ditulis Hiragana: ぬるい", grp: 1 },
  { k: "青い", r: "あおい", a: "biru", grp: 1 },
  { k: "赤い", r: "あかい", a: "merah", grp: 1 },
  { k: "黄色い", r: "きいろい", a: "kuning", grp: 1 },
  { k: "黒い", r: "くろい", a: "hitam", grp: 1 },
  { k: "白い", r: "しろい", a: "putih", grp: 1 },
  { k: "茶色い", r: "ちゃいろい", a: "coklat", grp: 1 },
  { k: "丸い", r: "まるい", a: "bundar, bulat", grp: 1 },

  { k: "甘い", r: "あまい", a: "manis", grp: 2 },
  { k: "辛い", r: "からい", a: "pedas", grp: 2 },
  { k: "酸っぱい", r: "すっぱい", a: "asam", note: "Biasa ditulis Hiragana: すっぱい", grp: 2 },
  { k: "塩辛い", r: "しおからい", a: "asin", grp: 2 },
  { k: "苦い", r: "にがい", a: "pahit", grp: 2 },
  { k: "濃い", r: "こい", a: "pekat", grp: 2 },
  { k: "薄い", r: "うすい", a: "tipis, encer (rasa)", grp: 2 },
  { k: "美味しい", r: "おいしい", a: "enak", note: "Biasa ditulis Hiragana: おいしい", grp: 2 },
  { k: "不味い", r: "まずい", a: "tidak enak", note: "Biasa ditulis Hiragana: まずい", grp: 2 },
  { k: "暑い", r: "あつい", a: "panas (suhu)", grp: 2 },
  { k: "寒い", r: "さむい", a: "dingin (suhu)", grp: 2 },
  { k: "暖かい", r: "あたたかい", a: "hangat (suhu)", grp: 2 },
  { k: "涼しい", r: "すずしい", a: "sejuk (suhu)", grp: 2 },
  { k: "蒸暑い", r: "むしあつい", a: "panas gerah", grp: 2 },
  { k: "明るい", r: "あかるい", a: "terang, riang", grp: 2 },
  { k: "暗い", r: "くらい", a: "gelap, suram", grp: 2 },
  { k: "汚い", r: "きたない", a: "kotor", grp: 2 },
  { k: "重い", r: "おもい", a: "berat", grp: 2 },
  { k: "軽い", r: "かるい", a: "ringan", grp: 2 },
  { k: "詳しい", r: "くわしい", a: "detail", grp: 2 },

  { k: "難しい", r: "むずかしい", a: "sulit", grp: 3 },
  { k: "易しい", r: "やさしい", a: "mudah", grp: 3 },
  { k: "珍しい", r: "めずらしい", a: "langka", grp: 3 },
  { k: "可笑しい", r: "おかしい", a: "aneh, lucu", note: "Biasa ditulis Hiragana: おかしい", grp: 3 },
  { k: "危ない", r: "あぶない", a: "berbahaya", grp: 3 },
  { k: "上手い", r: "うまい", a: "enak, pandai", note: "Biasa ditulis Hiragana: うまい", grp: 3 },
  { k: "良い", r: "いい", a: "bagus", note: "Perubahan asalnya dari よい (yoi)", grp: 3 },
  { k: "悪い", r: "わるい", a: "jelek", grp: 3 },
  { k: "酷い", r: "ひどい", a: "kejam", note: "Biasa ditulis Hiragana: ひどい", grp: 3 },
  { k: "煩い", r: "うるさい", a: "berisik", note: "Biasa ditulis Hiragana: うるさい", grp: 3 },
  { k: "忙しい", r: "いそがしい", a: "sibuk", grp: 3 },
  { k: "正しい", r: "ただしい", a: "benar", grp: 3 },
  { k: "凄い", r: "すごい", a: "hebat", note: "Biasa ditulis Hiragana: すごい", grp: 3 },
  { k: "素晴らしい", r: "すばらしい", a: "luar biasa", grp: 3 },
  { k: "格好いい", r: "かっこいい", a: "keren, bagus", note: "Biasa ditulis Hiragana: かっこいい", grp: 3 },
  { k: "偉い", r: "えらい", a: "pintar, hebat", note: "Biasa ditulis Hiragana: えらい", grp: 3 },
  { k: "仲が良い", r: "なかがいい", a: "rukun, akrab", note: "Frasa kata sifat", grp: 3 },
  { k: "親しい", r: "したしい", a: "akrab", grp: 3 },
  { k: "優しい", r: "やさしい", a: "baik hati, ramah", grp: 3 },
  { k: "可愛い", r: "かわいい", a: "cantik, lucu, imut", note: "Biasa ditulis Hiragana: かわいい", grp: 3 },

  { k: "美しい", r: "うつくしい", a: "indah, cantik", grp: 4 },
  { k: "厳しい", r: "きびしい", a: "tegas", grp: 4 },
  { k: "大人しい", r: "おとなしい", a: "lemah lembut, pendiam", grp: 4 },
  { k: "楽しい", r: "たのしい", a: "menyenangkan, senang", grp: 4 },
  { k: "面白い", r: "おもしろい", a: "menarik, lucu", grp: 4 },
  { k: "詰まらない", r: "つまらない", a: "membosankan", note: "Biasa ditulis Hiragana: つまらない", grp: 4 },
  { k: "嬉しい", r: "うれしい", a: "gembira, senang", note: "Biasa ditulis Hiragana: うれしい", grp: 4 },
  { k: "寂しい", r: "さびしい", a: "merasa sepi", grp: 4 },
  { k: "怖い", r: "こわい", a: "takut", grp: 4 },
  { k: "悲しい", r: "かなしい", a: "sedih", grp: 4 },
  { k: "恥かしい", r: "はずかしい", a: "malu", grp: 4 },
  { k: "羨ましい", r: "うらやましい", a: "iri hati", grp: 4 },
  { k: "懐かしい", r: "なつかしい", a: "terkenang, rindu", grp: 4 },
  { k: "眠い", r: "ねむい", a: "mengantuk", grp: 4 },
  { k: "痛い", r: "いたい", a: "merasa nyeri, sakit", grp: 4 },
  { k: "欲しい", r: "ほしい", a: "ingin mendapatkan, mau", grp: 4 },
  { k: "無い", r: "ない", a: "tidak ada", grp: 4 }
];

const DB_Na_Adj = [
  { k: "残念", r: "ざんねん", a: "menyayangkan", grp: 0 },
  { k: "心配", r: "しんぱい", a: "khawatir", grp: 0 },
  { k: "不安", r: "ふあん", a: "cemas", grp: 0 },
  { k: "好き", r: "すき", a: "suka", grp: 0 },
  { k: "嫌い", r: "きらい", a: "tidak suka, benci", grp: 0 },
  { k: "大好き", r: "だいすき", a: "suka sekali", grp: 0 },
  { k: "大嫌い", r: "だいきらい", a: "benci sekali", grp: 0 },
  { k: "綺麗", r: "きれい", a: "cantik, bersih", note: "Biasa ditulis Hiragana: きれい", grp: 0 },
  { k: "賑やか", r: "にぎやか", a: "ramai", note: "Biasa ditulis Hiragana: にぎやか", grp: 0 },
  { k: "静か", r: "しずか", a: "tenang", grp: 0 },
  { k: "複雑", r: "ふくざつ", a: "rumit", grp: 0 },
  { k: "簡単", r: "かんたん", a: "mudah", grp: 0 },
  { k: "便利", r: "べんり", a: "praktis", grp: 0 },
  { k: "不便", r: "ふべん", a: "tidak praktis", grp: 0 },
  { k: "幸せ", r: "しあわせ", a: "bahagia", grp: 0 },
  { k: "素敵", r: "すてき", a: "bagus, terpesona", grp: 0 },
  { k: "有名", r: "ゆうめい", a: "terkenal", grp: 0 },

  { k: "安全", r: "あんぜん", a: "aman", grp: 1 },
  { k: "危険", r: "きけん", a: "berbahaya", grp: 1 },
  { k: "色々", r: "いろいろ", a: "bermacam-macam", grp: 1 },
  { k: "大丈夫", r: "だいじょうぶ", a: "tidak apa-apa", grp: 1 },
  { k: "大事", r: "だいじ", a: "penting", grp: 1 },
  { k: "大切", r: "たいせつ", a: "penting", grp: 1 },
  { k: "駄目", r: "だめ", a: "tidak boleh", grp: 1 },
  { k: "変", r: "へん", a: "aneh", grp: 1 },
  { k: "無駄", r: "むだ", a: "sia-sia", grp: 1 },
  { k: "急", r: "きゅう", a: "mendadak", grp: 1 },
  { k: "上手", r: "じょうず", a: "pandai", grp: 1 },
  { k: "下手", r: "へた", a: "tidak pandai", grp: 1 },
  { k: "得意", r: "とくい", a: "pandai, jago", grp: 1 },
  { k: "苦手", r: "にがて", a: "lemah, tidak pandai", grp: 1 },
  { k: "暇", r: "ひま", a: "senggang", grp: 1 },
  { k: "可哀想", r: "かわいそう", a: "kasihan", note: "Biasa ditulis Hiragana: かわいそう", grp: 1 },
  { k: "立派", r: "りっぱ", a: "megah, layak dihormati", grp: 1 },

  { k: "大変", r: "たいへん", a: "berat (kasus/peristiwa)", grp: 2 },
  { k: "楽", r: "らく", a: "enteng, mudah", grp: 2 },
  { k: "無理", r: "むり", a: "mustahil", grp: 2 },
  { k: "お洒落", r: "おしゃれ", a: "modis", note: "Biasa ditulis Hiragana: おしゃれ", grp: 2 },
  { k: "丁寧", r: "ていねい", a: "sopan, ramah", grp: 2 },
  { k: "親切", r: "しんせつ", a: "baik hati, ramah", grp: 2 },
  { k: "ハンサム", r: "はんさむ", a: "ganteng", note: "Kata serapan (Katakana)", grp: 2 },
  { k: "真面目", r: "まじめ", a: "rajin, serius", grp: 2 },
  { k: "不真面目", r: "ふまじめ", a: "tidak serius", grp: 2 },
  { k: "嫌", r: "いや", a: "tidak suka, benci", grp: 2 },
  { k: "一生懸命", r: "いっしょうけんめい", a: "sungguh-sungguh", alt: "いっしょけんめい", grp: 2 },
  { k: "盛ん", r: "さかん", a: "aktif, ramai, populer", grp: 2 },
  { k: "邪魔", r: "じゃま", a: "mengganggu", grp: 2 },
  { k: "十分", r: "じゅうぶん", a: "cukup", grp: 2 },
  { k: "丈夫", r: "じょうぶ", a: "kuat", grp: 2 },
  { k: "適当", r: "てきとう", a: "tepat, sesuai", grp: 2 },
  { k: "特別", r: "とくべつ", a: "khusus, spesial", grp: 2 },

  { k: "自由", r: "じゆう", a: "bebas", grp: 3 },
  { k: "真っ直ぐ", r: "まっすぐ", a: "lurus", note: "Biasa ditulis Hiragana: まっすぐ", grp: 3 },
  { k: "熱心", r: "ねっしん", a: "sungguh hati, rajin", grp: 3 },
  { k: "必要", r: "ひつよう", a: "perlu", grp: 3 },
  { k: "別", r: "べつ", a: "lain, beda", grp: 3 },
  { k: "不思議", r: "ふしぎ", a: "ajaib", grp: 3 },
  { k: "豪華", r: "ごうか", a: "mewah", grp: 3 },
  { k: "同じ", r: "おなじ", a: "sama", grp: 3 },
  { k: "伝統的", r: "でんとうてき", a: "tradisional", grp: 3 },
  { k: "活発", r: "かっぱつ", a: "aktif", grp: 3 },
  { k: "誠実", r: "せいじつ", a: "tulus hati, setia", grp: 3 },
  { k: "我儘", r: "わがまま", a: "egois", note: "Biasa ditulis Hiragana: わがまま", grp: 3 },
  { k: "頑固", r: "がんこ", a: "keras kepala", grp: 3 },
  { k: "素直", r: "すなお", a: "patuh, polos", grp: 3 },
  { k: "意地悪", r: "いじわる", a: "tega, jahat", grp: 3 },
  { k: "勝ち気", r: "かちき", a: "tidak mau kalah", grp: 3 },
  { k: "神経質", r: "しんけいしつ", a: "sensitif, khawatir", grp: 3 }
];

const Pages_I = [
  { title: "Sifat-i (1-20)", narasi: "Kata sifat-i selalu berakhiran dengan hiragana <b style='color:var(--primary)'>い (i)</b>. Saat digabung dengan kata benda, huruf 'i' di belakangnya tetap dipertahankan.", groups: [0] },
  { title: "Sifat-i (21-40)", narasi: "Hati-hati dengan kanji yang bacanya sama! <b>早い (hayai)</b> untuk waktu yang cepat, sedangkan <b>速い (hayai)</b> untuk kelajuan/kecepatan.", groups: [1] },
  { title: "Sifat-i (41-60)", narasi: "Kata sifat untuk rasa dan suhu banyak ditemukan di sini. <b>熱い (atsui)</b> untuk benda panas, sedangkan <b>暑い (atsui)</b> untuk cuaca panas.", groups: [2] },
  { title: "Sifat-i (61-80)", narasi: "Pengecualian Emas: <b>いい (ii)</b> yang berarti 'bagus' berasal dari kata <b>よい (yoi)</b>. Saat diubah ke bentuk negatif, ia menjadi <b>よくない (yokunai)</b>, bukan iikunai!", groups: [3] },
  { title: "Sifat-i (81-97)", narasi: "Banyak kata sifat yang menggambarkan perasaan manusia ada di sesi ini. Ingat, bentuk negatif kata sifat-i selalu membuang 'i' terakhir dan menggantinya dengan <b style='color:var(--danger)'>くない (kunai)</b>.", groups: [4] }
];

const Pages_Na = [
  { title: "Sifat-na (1-17)", narasi: "Kata sifat-na memerlukan partikel <b style='color:var(--success)'>な (na)</b> jika diletakkan persis sebelum kata benda. Contoh: <b>きれいな花 (kirei na hana)</b>.", groups: [0] },
  { title: "Sifat-na (18-34)", narasi: "Sebagian besar kata sifat-na terdiri dari dua kanji tanpa diikuti hiragana tambahan di belakangnya (kecuali hiragana okurigana khusus).", groups: [1] },
  { title: "Sifat-na (35-51)", narasi: "Bentuk negatif kata sifat-na sangat mudah! Cukup tambahkan <b style='color:var(--danger)'>じゃありません (ja arimasen)</b> atau <b style='color:var(--danger)'>ではない (dewa nai)</b> di belakangnya.", groups: [2] },
  { title: "Sifat-na (52-68)", narasi: "Kata-kata serapan dari bahasa asing (Katakana) seperti <b>ハンサム (hansamu)</b> selalu dikategorikan sebagai kata sifat-na.", groups: [3] }
];

// ==========================================
// PETA LAWAN KATA (ANTONYMS MAP)
// ==========================================
const ANTONYM_PAIRS = [
  ['大きい', '小さい'],
  ['長い', '短い'],
  ['多い', '少ない'],
  ['太い', '細い'],
  ['厚い', '薄い'],
  ['固い', '柔かい'],
  ['広い', '狭い'],
  ['新しい', '古い'],
  ['高い', '低い'],
  ['高い', '安い'],
  ['早い', '遅い'],
  ['速い', '遅い'],
  ['遠い', '近い'],
  ['強い', '弱い'],
  ['熱い', '冷たい'],
  ['暑い', '寒い'],
  ['甘い', '辛い'],
  ['甘い', '苦い'],
  ['濃い', '薄い'],
  ['美味しい', '不味い'],
  ['明るい', '暗い'],
  ['重い', '軽い'],
  ['難しい', '易しい'],
  ['良い', '悪い'],
  ['楽しい', '詰まらない'],
  ['好き', '嫌い'],
  ['大好き', '大嫌い'],
  ['上手', '下手'],
  ['得意', '苦手'],
  ['便利', '不便'],
  ['安全', '危険'],
  ['複雑', '簡単'],
  ['賑やか', '静か'],
  ['真面目', '不真面目'],
  ['大変', '楽'],
  ['正しい', '悪い'],
  ['優しい', '厳しい'],
  ['温かい', '冷たい'],
  ['暖かい', '涼しい']
];

const ANTONYM_MAP = {};
ANTONYM_PAIRS.forEach(([a, b]) => {
  if (!ANTONYM_MAP[a]) ANTONYM_MAP[a] = [];
  if (!ANTONYM_MAP[b]) ANTONYM_MAP[b] = [];
  if (!ANTONYM_MAP[a].includes(b)) ANTONYM_MAP[a].push(b);
  if (!ANTONYM_MAP[b].includes(a)) ANTONYM_MAP[b].push(a);
});

// ==========================================
// KANA TO ROMAJI CONVERTER (FLAWLESS & PURE)
// ==========================================
const KANA_ROMAJI_MAP = {
  'きゃ':'kya','きゅ':'kyu','きょ':'kyo',
  'しゃ':'sha','しゅ':'shu','しょ':'sho',
  'ちゃ':'cha','ちゅ':'chu','ちょ':'cho',
  'にゃ':'nya','にゅ':'nyu','にょ':'nyo',
  'ひゃ':'hya','ひゅ':'hyu','ひょ':'hyo',
  'みゃ':'mya','みゅ':'myu','みょ':'myo',
  'りゃ':'rya','りゅ':'ryu','りょ':'ryo',
  'ぎゃ':'gya','ぎゅ':'gyu','ぎょ':'gyo',
  'じゃ':'ja','じゅ':'ju','じょ':'jo',
  'びゃ':'bya','びゅ':'byu','びょ':'byo',
  'ぴゃ':'pya','ぴゅ':'pyu','ぴょ':'pyo',
  'あ':'a','い':'i','う':'u','え':'e','お':'o',
  'か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko',
  'さ':'sa','し':'shi','す':'su','せ':'se','そ':'so',
  'た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to',
  'な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no',
  'は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho',
  'ま':'ma','み':'mi','む':'mu','め':'me','も':'mo',
  'や':'ya','ゆ':'yu','よ':'yo',
  'ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro',
  'わ':'wa','を':'o','ん':'n',
  'が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go',
  'ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo',
  'だ':'da','ぢ':'ji','づ':'zu','で':'de','ど':'do',
  'ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo',
  'ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po',
  'ア':'a','イ':'i','ウ':'u','エ':'e','オ':'o',
  'カ':'ka','キ':'ki','ク':'ku','ケ':'ke','コ':'ko',
  'サ':'sa','シ':'shi','ス':'su','セ':'se','ソ':'so',
  'タ':'ta','チ':'chi','ツ':'tsu','テ':'te','ト':'to',
  'ナ':'na','ニ':'ni','ヌ':'nu','ネ':'ne','ノ':'no',
  'ハ':'ha','ヒ':'hi','フ':'fu','ヘ':'he','ホ':'ho',
  'マ':'ma','ミ':'mi','ム':'mu','メ':'me','モ':'mo',
  'ヤ':'ya','ユ':'yu','ヨ':'yo',
  'ラ':'ra','リ':'ri','ル':'ru','レ':'re','ロ':'ro',
  'ワ':'wa','ヲ':'o','ン':'n',
  'ガ':'ga','ギ':'gi','グ':'gu','ゲ':'ge','ゴ':'go',
  'ザ':'za','ジ':'ji','ズ':'zu','ゼ':'ze','ぞ':'zo',
  'ダ':'da','ヂ':'ji','ヅ':'zu','デ':'de','ド':'do',
  'バ':'ba','ビ':'bi','ブ':'bu','ベ':'be','ボ':'bo',
  'パ':'pa','ピ':'pi','プ':'pu','ペ':'pe','ポ':'po',
  'キャ':'kya','キュ':'kyu','キョ':'kyo',
  'シャ':'sha','シュ':'shu','ショ':'sho',
  'チャ':'cha','チュ':'chu','チョ':'cho',
  'ニャ':'nya','ニュ':'nyu','ニョ':'nyo',
  'ヒャ':'hya','ヒュ':'hyu','ヒョ':'hyo',
  'ミャ':'mya','ミュ':'myu','ミョ':'myo',
  'リャ':'rya','リュ':'ryu','リョ':'ryo',
  'ギャ':'gya','ギュ':'gyu','ギョ':'gyo',
  'ジャ':'ja','ジュ':'ju','ジョ':'jo',
  'ビャ':'bya','ビュ':'byu','ビョ':'byo',
  'ピャ':'pya','ピュ':'pyu','ピョ':'pyo',
  'ー':'', '・':' '
};

function kanaToRomaji(str) {
  if (!str) return '';
  let res = '';
  let i = 0;
  while (i < str.length) {
    let two = str.substr(i, 2);
    if (KANA_ROMAJI_MAP[two]) {
      res += KANA_ROMAJI_MAP[two];
      i += 2;
      continue;
    }
    let one = str[i];
    if (one === 'っ' || one === 'ッ') {
      let nextChar = str[i + 1] || '';
      let nextTwo = str.substr(i + 1, 2);
      let nextRom = KANA_ROMAJI_MAP[nextTwo] || KANA_ROMAJI_MAP[nextChar] || '';
      if (nextRom) {
        res += (nextRom.startsWith('ch') ? 't' : nextRom[0]);
      }
      i++;
      continue;
    }
    if (KANA_ROMAJI_MAP[one] !== undefined) {
      res += KANA_ROMAJI_MAP[one];
    } else {
      res += one;
    }
    i++;
  }
  return res;
}

// ==========================================
// ADJECTIVE INFLECTION GENERATOR (4 BENTUK)
// ==========================================
function getAdjectiveInflections(k, r, isNa) {
  if (!isNa) {
    if (k === 'いい' || k === '良い' || r === 'いい') {
      return {
        presPos: { kanji: k, hira: 'いい', ro: 'ii', label: 'Sekarang (+)' },
        presNeg: { kanji: 'よくない', hira: 'よくない', ro: 'yokunai', label: 'Sekarang (-)' },
        pastPos: { kanji: 'よかった', hira: 'よかった', ro: 'yokatta', label: 'Lampau (+)' },
        pastNeg: { kanji: 'よくなかった', hira: 'よくなかった', ro: 'yokunakatta', label: 'Lampau Negatif (-)' },
        modNoun: { kanji: k + ' 人', hira: 'いい ひと', label: 'Di Depan Benda' }
      };
    }
    if (k.endsWith('いい') && k.length > 2) {
      const baseK = k.slice(0, -2);
      const baseR = r.slice(0, -2);
      const baseRo = kanaToRomaji(baseR);
      return {
        presPos: { kanji: k, hira: r, ro: kanaToRomaji(r), label: 'Sekarang (+)' },
        presNeg: { kanji: baseK + 'よくない', hira: baseR + 'よくない', ro: baseRo + 'yokunai', label: 'Sekarang (-)' },
        pastPos: { kanji: baseK + 'よかった', hira: baseR + 'よかった', ro: baseRo + 'yokatta', label: 'Lampau (+)' },
        pastNeg: { kanji: baseK + 'よくなかった', hira: baseR + 'よくなかった', ro: baseRo + 'yokunakatta', label: 'Lampau Negatif (-)' },
        modNoun: { kanji: k + ' 人', hira: r + ' ひと', label: 'Di Depan Benda' }
      };
    }
    const stemK = k.endsWith('い') ? k.slice(0, -1) : k;
    const stemR = r.endsWith('い') ? r.slice(0, -1) : r;
    const stemRo = kanaToRomaji(stemR);
    return {
      presPos: { kanji: k, hira: r, ro: kanaToRomaji(r), label: 'Sekarang (+)' },
      presNeg: { kanji: stemK + 'くない', hira: stemR + 'くない', ro: stemRo + 'kunai', label: 'Sekarang (-)' },
      pastPos: { kanji: stemK + 'かった', hira: stemR + 'かった', ro: stemRo + 'katta', label: 'Lampau (+)' },
      pastNeg: { kanji: stemK + 'くなかった', hira: stemR + 'くなかった', ro: stemRo + 'kunakatta', label: 'Lampau Negatif (-)' },
      modNoun: { kanji: k + ' 人/物', hira: r + ' ひと/もの', label: 'Di Depan Benda' }
    };
  } else {
    const wordRo = kanaToRomaji(r);
    return {
      presPos: { kanji: k + 'だ (です)', hira: r + 'だ (です)', ro: wordRo + ' desu', label: 'Sekarang (+)' },
      presNeg: { kanji: k + 'じゃない', hira: r + 'じゃない', ro: wordRo + ' ja nai', label: 'Sekarang (-)' },
      pastPos: { kanji: k + 'だった', hira: r + 'だった', ro: wordRo + ' datta', label: 'Lampau (+)' },
      pastNeg: { kanji: k + 'じゃなかった', hira: r + 'じゃなかった', ro: wordRo + ' ja nakatta', label: 'Lampau Negatif (-)' },
      modNoun: { kanji: k + 'な 人/部屋', hira: r + 'な ひと/へや', label: 'Di Depan Benda' }
    };
  }
}

// ==========================================
// ROMAJI TO HIRAGANA CONVERTER HELPER (FOR QUIZ)
// ==========================================
const ROMAJI_MAP = {
  'kya':'きゃ','kyu':'きゅ','kyo':'きょ',
  'sha':'しゃ','shu':'しゅ','sho':'しょ',
  'cha':'ちゃ','chu':'ちゅ','cho':'ちょ',
  'nya':'にゃ','nyu':'にゅ','nyo':'にょ',
  'hya':'ひゃ','hyu':'ひゅ','hyo':'ひょ',
  'mya':'みゃ','myu':'みゅ','myo':'みょ',
  'rya':'りゃ','ryu':'りゅ','ryo':'りょ',
  'gya':'ぎゃ','gyu':'ぎゅ','gyo':'ぎょ',
  'ja':'じゃ','ju':'じゅ','jo':'じょ',
  'bya':'びゃ','byu':'びゅ','byo':'びょ',
  'pya':'ぴゃ','pyu':'ぴゅ','pyo':'ぴょ',
  'shi':'し','chi':'ち','tsu':'つ','fu':'ふ',
  'ka':'か','ki':'き','ku':'く','ke':'け','ko':'ko',
  'sa':'さ','si':'し','su':'す','se':'せ','so':'so',
  'ta':'た','ti':'ち','tu':'つ','te':'て','to':'to',
  'na':'な','ni':'ni','nu':'nu','ne':'ne','no':'no',
  'ha':'ha','hi':'hi','hu':'fu','he':'he','ho':'ho',
  'ma':'ma','mi':'mi','mu':'mu','me':'me','mo':'mo',
  'ya':'ya','yu':'yu','yo':'yo',
  'ra':'ra','ri':'ri','ru':'ru','re':'re','ro':'ro',
  'wa':'wa','wo':'を',
  'ga':'ga','gi':'gi','gu':'gu','ge':'ge','go':'go',
  'za':'za','ji':'じ','zi':'じ','zu':'ず','ze':'ぜ','zo':'ぞ',
  'da':'da','di':'ぢ','du':'づ','de':'de','do':'do',
  'ba':'ba','bi':'bi','bu':'bu','be':'be','bo':'bo',
  'pa':'pa','pi':'pi','pu':'pu','pe':'pe','po':'po',
  'a':'あ','i':'い','u':'う','e':'え','o':'お','nn':'ん','n':'ん'
};
const ROMAJI_REGEX = new RegExp(Object.keys(ROMAJI_MAP).sort((a,b) => b.length - a.length).join('|'), 'g');

function romajiToHiragana(text) {
  if (!text) return '';
  let s = text.toLowerCase().trim();
  s = s.replace(/([bcdfghjklmpqrstvwxyz])\1/g, (m, c) => 'っ' + c);
  return s.replace(ROMAJI_REGEX, m => ROMAJI_MAP[m]);
}

// ==========================================
// NATURAL CONTEXTUAL SENTENCE DATABASE
// Mapped for all 165 Adjectives (No generic 'kono heya'!)
// ==========================================
const ADJ_NATURAL_CONTEXTS = {
  "大きい": {
    "pJ": "この象は ",
    "pR": "Kono zou wa ",
    "pI": "Gajah ini ",
    "aJ": "あの象は ",
    "aR": "Ano zou wa ",
    "aI": "Gajah itu dulu ",
    "arti": "besar"
  },
  "小さい": {
    "pJ": "この子犬は ",
    "pR": "Kono koinu wa ",
    "pI": "Anak anjing ini ",
    "aJ": "あの子犬は ",
    "aR": "Ano koinu wa ",
    "aI": "Anak anjing itu dulu ",
    "arti": "kecil"
  },
  "長い": {
    "pJ": "この鉛筆は ",
    "pR": "Kono enpitsu wa ",
    "pI": "Pensil ini ",
    "aJ": "あの鉛筆は ",
    "aR": "Ano enpitsu wa ",
    "aI": "Pensil itu dulu ",
    "arti": "panjang"
  },
  "短い": {
    "pJ": "このズボンは ",
    "pR": "Kono zubon wa ",
    "pI": "Celana ini ",
    "aJ": "あのズボンは ",
    "aR": "Ano zubon wa ",
    "aI": "Celana itu dulu ",
    "arti": "pendek"
  },
  "多い": {
    "pJ": "この公園は人が ",
    "pR": "Kono kouen wa hito ga ",
    "pI": "Di taman ini orangnya ",
    "aJ": "昔の公園は人が ",
    "aR": "Mukashi no kouen wa hito ga ",
    "aI": "Dulu di taman ini orangnya ",
    "arti": "banyak"
  },
  "少ない": {
    "pJ": "この村は車が ",
    "pR": "Kono mura wa kuruma ga ",
    "pI": "Di desa ini mobilnya ",
    "aJ": "昔の村は車が ",
    "aR": "Mukashi no mura wa kuruma ga ",
    "aI": "Dulu di desa ini mobilnya ",
    "arti": "sedikit"
  },
  "太い": {
    "pJ": "この猫は ",
    "pR": "Kono neko wa ",
    "pI": "Kucing ini ",
    "aJ": "あの猫は昔 ",
    "aR": "Ano neko wa mukashi ",
    "aI": "Kucing itu dulu ",
    "arti": "gemuk"
  },
  "細い": {
    "pJ": "彼女の足は ",
    "pR": "Kanojo no ashi wa ",
    "pI": "Kakinya ",
    "aJ": "彼女の足は昔 ",
    "aR": "Kanojo no ashi wa mukashi ",
    "aI": "Kakinya dulu ",
    "arti": "ramping"
  },
  "厚い": {
    "pJ": "この本は ",
    "pR": "Kono hon wa ",
    "pI": "Buku ini ",
    "aJ": "あの本は ",
    "aR": "Ano hon wa ",
    "aI": "Buku itu dulu ",
    "arti": "tebal"
  },
  "薄い": {
    "pJ": "この紙は ",
    "pR": "Kono kami wa ",
    "pI": "Kertas ini ",
    "aJ": "あの紙は ",
    "aR": "Ano kami wa ",
    "aI": "Kertas itu dulu ",
    "arti": "tipis"
  },
  "固い": {
    "pJ": "このパンは ",
    "pR": "Kono pan wa ",
    "pI": "Roti ini ",
    "aJ": "あのパンは ",
    "aR": "Ano pan wa ",
    "aI": "Roti itu kemarin ",
    "arti": "keras"
  },
  "柔かい": {
    "pJ": "このベッドは ",
    "pR": "Kono beddo wa ",
    "pI": "Tempat tidur ini ",
    "aJ": "昔のベッドは ",
    "aR": "Mukashi no beddo wa ",
    "aI": "Tempat tidur dulu ",
    "arti": "empuk"
  },
  "広い": {
    "pJ": "この部屋は ",
    "pR": "Kono heya wa ",
    "pI": "Kamar ini ",
    "aJ": "昔の部屋は ",
    "aR": "Mukashi no heya wa ",
    "aI": "Kamar yang dulu ",
    "arti": "luas"
  },
  "狭い": {
    "pJ": "この道は ",
    "pR": "Kono michi wa ",
    "pI": "Jalan ini ",
    "aJ": "昔の道は ",
    "aR": "Mukashi no michi wa ",
    "aI": "Jalan yang dulu ",
    "arti": "sempit"
  },
  "細かい": {
    "pJ": "この小銭は ",
    "pR": "Kono kozeni wa ",
    "pI": "Uang koin ini ",
    "aJ": "あの小銭は ",
    "aR": "Ano kozeni wa ",
    "aI": "Uang koin itu dulu ",
    "arti": "kecil (receh)"
  },
  "粗い": {
    "pJ": "この砂は ",
    "pR": "Kono suna wa ",
    "pI": "Pasir ini ",
    "aJ": "あの砂は ",
    "aR": "Ano suna wa ",
    "aI": "Pasir itu dulu ",
    "arti": "kasar"
  },
  "新しい": {
    "pJ": "この靴は ",
    "pR": "Kono kutsu wa ",
    "pI": "Sepatu ini ",
    "aJ": "昔の靴は ",
    "aR": "Mukashi no kutsu wa ",
    "aI": "Sepatu dulu ",
    "arti": "baru"
  },
  "古い": {
    "pJ": "あのお寺は ",
    "pR": "Ano otera wa ",
    "pI": "Kuil itu ",
    "aJ": "昔の建物は ",
    "aR": "Mukashi no tatemono wa ",
    "aI": "Bangunan zaman dulu ",
    "arti": "tua"
  },
  "高い": {
    "pJ": "この時計は ",
    "pR": "Kono tokei wa ",
    "pI": "Jam tangan ini ",
    "aJ": "あの時計は ",
    "aR": "Ano tokei wa ",
    "aI": "Jam tangan itu dulu ",
    "arti": "mahal"
  },
  "安い": {
    "pJ": "このリンゴは ",
    "pR": "Kono ringo wa ",
    "pI": "Apel ini ",
    "aJ": "昨日のリンゴは ",
    "aR": "Kinou no ringo wa ",
    "aI": "Apel kemarin ",
    "arti": "murah"
  },
  "早い": {
    "pJ": "朝の電車は ",
    "pR": "Asa no densha wa ",
    "pI": "Kereta pagi ini ",
    "aJ": "昨日の朝は ",
    "aR": "Kinou no asa wa ",
    "aI": "Pagi kemarin ",
    "arti": "cepat (awal waktu)"
  },
  "速い": {
    "pJ": "新幹線は ",
    "pR": "Shinkansen wa ",
    "pI": "Shinkansen ",
    "aJ": "昔の列車は ",
    "aR": "Mukashi no ressha wa ",
    "aI": "Kereta zaman dulu ",
    "arti": "cepat (kelajuan)"
  },
  "遅い": {
    "pJ": "このバスは ",
    "pR": "Kono basu wa ",
    "pI": "Bus ini ",
    "aJ": "昨日のバスは ",
    "aR": "Kinou no basu wa ",
    "aI": "Bus kemarin ",
    "arti": "lambat"
  },
  "遠い": {
    "pJ": "私の学校は ",
    "pR": "Watashi no gakkou wa ",
    "pI": "Sekolah saya ",
    "aJ": "昔の学校は ",
    "aR": "Mukashi no gakkou wa ",
    "aI": "Sekolah saya dulu ",
    "arti": "jauh"
  },
  "近い": {
    "pJ": "駅は ",
    "pR": "Eki wa ",
    "pI": "Stasiun ",
    "aJ": "昔の駅は ",
    "aR": "Mukashi no eki wa ",
    "aI": "Stasiun yang dulu ",
    "arti": "dekat"
  },
  "強い": {
    "pJ": "今日の風は ",
    "pR": "Kyou no kaze wa ",
    "pI": "Angin hari ini ",
    "aJ": "昨日の風は ",
    "aR": "Kinou no kaze wa ",
    "aI": "Angin kemarin ",
    "arti": "kuat"
  },
  "弱い": {
    "pJ": "Wi-Fiの電波は ",
    "pR": "Wi-Fi no denpa wa ",
    "pI": "Sinyal Wi-Fi ini ",
    "aJ": "昨日の電波は ",
    "aR": "Kinou no denpa wa ",
    "aI": "Sinyal kemarin ",
    "arti": "lemah"
  },
  "低い": {
    "pJ": "この天井は ",
    "pR": "Kono tenjou wa ",
    "pI": "Langit-langit ruangan ini ",
    "aJ": "昔の天井は ",
    "aR": "Mukashi no tenjou wa ",
    "aI": "Langit-langit dulu ",
    "arti": "rendah"
  },
  "熱い": {
    "pJ": "このお茶は ",
    "pR": "Kono ocha wa ",
    "pI": "Teh ini ",
    "aJ": "さっきのお茶は ",
    "aR": "Sakki no ocha wa ",
    "aI": "Teh tadi ",
    "arti": "panas"
  },
  "冷たい": {
    "pJ": "このジュースは ",
    "pR": "Kono juusu wa ",
    "pI": "Jus ini ",
    "aJ": "昨日の水は ",
    "aR": "Kinou no mizu wa ",
    "aI": "Air kemarin ",
    "arti": "dingin"
  },
  "温かい": {
    "pJ": "このスープは ",
    "pR": "Kono suupu wa ",
    "pI": "Sup ini ",
    "aJ": "昨日のスープは ",
    "aR": "Kinou no suupu wa ",
    "aI": "Sup kemarin ",
    "arti": "hangat"
  },
  "温い": {
    "pJ": "このお湯は ",
    "pR": "Kono oyu wa ",
    "pI": "Air mandi ini ",
    "aJ": "さっきのお湯は ",
    "aR": "Sakki no oyu wa ",
    "aI": "Air tadi ",
    "arti": "suam-suam kuku"
  },
  "青い": {
    "pJ": "今日の空は ",
    "pR": "Kyou no sora wa ",
    "pI": "Langit hari ini ",
    "aJ": "昨日の海は ",
    "aR": "Kinou no umi wa ",
    "aI": "Laut kemarin ",
    "arti": "biru"
  },
  "赤い": {
    "pJ": "このリンゴは ",
    "pR": "Kono ringo wa ",
    "pI": "Apel ini ",
    "aJ": "あの夕日は ",
    "aR": "Ano yuuhi wa ",
    "aI": "Matahari terbenam kemarin ",
    "arti": "merah"
  },
  "黄色い": {
    "pJ": "あのひまわりは ",
    "pR": "Ano himawari wa ",
    "pI": "Bunga matahari itu ",
    "aJ": "昨日のバナナは ",
    "aR": "Kinou no banana wa ",
    "aI": "Pisang kemarin ",
    "arti": "kuning"
  },
  "黒い": {
    "pJ": "彼のスーツは ",
    "pR": "Kare no suutsu wa ",
    "pI": "Jas hitamnya ",
    "aJ": "あの猫は ",
    "aR": "Ano neko wa ",
    "aI": "Kucing itu dulu ",
    "arti": "hitam"
  },
  "白い": {
    "pJ": "今日のシャツは ",
    "pR": "Kyou no shatsu wa ",
    "pI": "Kemeja hari ini ",
    "aJ": "昨日の雪は ",
    "aR": "Kinou no yuki wa ",
    "aI": "Salju kemarin ",
    "arti": "putih"
  },
  "茶色い": {
    "pJ": "この革靴は ",
    "pR": "Kono kawagutsu wa ",
    "pI": "Sepatu kulit ini ",
    "aJ": "あの椅子は ",
    "aR": "Ano isu wa ",
    "aI": "Kursi itu dulu ",
    "arti": "coklat"
  },
  "丸い": {
    "pJ": "このボールは ",
    "pR": "Kono booru wa ",
    "pI": "Bola ini ",
    "aJ": "昨日の月は ",
    "aR": "Kinou no tsuki wa ",
    "aI": "Bulan semalam ",
    "arti": "bulat"
  },
  "甘い": {
    "pJ": "このケーキは ",
    "pR": "Kono keeki wa ",
    "pI": "Kue ini ",
    "aJ": "あのケーキは ",
    "aR": "Ano keeki wa ",
    "aI": "Kue kemarin ",
    "arti": "manis"
  },
  "辛い": {
    "pJ": "このカレーは ",
    "pR": "Kono karee wa ",
    "pI": "Kari ini ",
    "aJ": "昨日のラーメンは ",
    "aR": "Kinou no raamen wa ",
    "aI": "Ramen kemarin ",
    "arti": "pedas"
  },
  "酸っぱい": {
    "pJ": "このレモンは ",
    "pR": "Kono remon wa ",
    "pI": "Lemon ini ",
    "aJ": "あのミカンは ",
    "aR": "Ano mikan wa ",
    "aI": "Jeruk kemarin ",
    "arti": "asam"
  },
  "塩辛い": {
    "pJ": "このスープは ",
    "pR": "Kono suupu wa ",
    "pI": "Sup ini ",
    "aJ": "昨日の料理は ",
    "aR": "Kinou no ryouri wa ",
    "aI": "Masakan kemarin ",
    "arti": "asin"
  },
  "苦い": {
    "pJ": "この薬は ",
    "pR": "Kono kusuri wa ",
    "pI": "Obat ini ",
    "aJ": "昨日のコーヒーは ",
    "aR": "Kinou no koohii wa ",
    "aI": "Kopi kemarin ",
    "arti": "pahit"
  },
  "濃い": {
    "pJ": "このコーヒーは ",
    "pR": "Kono koohii wa ",
    "pI": "Kopi ini ",
    "aJ": "あの紅茶は ",
    "aR": "Ano koucha wa ",
    "aI": "Teh kemarin ",
    "arti": "pekat"
  },
  "美味しい": {
    "pJ": "母の料理は ",
    "pR": "Haha no ryouri wa ",
    "pI": "Masakan ibu ",
    "aJ": "昨日のディナーは ",
    "aR": "Kinou no dinaa wa ",
    "aI": "Makan malam kemarin ",
    "arti": "enak"
  },
  "不味い": {
    "pJ": "この料理は ",
    "pR": "Kono ryouri wa ",
    "pI": "Masakan ini ",
    "aJ": "あの料理は ",
    "aR": "Ano ryouri wa ",
    "aI": "Masakan kemarin ",
    "arti": "tidak enak"
  },
  "暑い": {
    "pJ": "今日の天気は ",
    "pR": "Kyou no tenki wa ",
    "pI": "Cuaca hari ini ",
    "aJ": "昨日の気温は ",
    "aR": "Kinou no kion wa ",
    "aI": "Suhu kemarin ",
    "arti": "panas (cuaca)"
  },
  "寒い": {
    "pJ": "冬の朝は ",
    "pR": "Fuyu no asa wa ",
    "pI": "Pagi musim dingin ",
    "aJ": "昨日の夜は ",
    "aR": "Kinou no yoru wa ",
    "aI": "Malam kemarin ",
    "arti": "dingin (cuaca)"
  },
  "暖かい": {
    "pJ": "春の風は ",
    "pR": "Haru no kaze wa ",
    "pI": "Angin musim semi ",
    "aJ": "昨日の気候は ",
    "aR": "Kinou no kikou wa ",
    "aI": "Cuaca kemarin ",
    "arti": "hangat (cuaca)"
  },
  "涼しい": {
    "pJ": "秋の夜は ",
    "pR": "Aki no yoru wa ",
    "pI": "Malam musim gugur ",
    "aJ": "昨日の風は ",
    "aR": "Kinou no kaze wa ",
    "aI": "Angin kemarin ",
    "arti": "sejuk (cuaca)"
  },
  "蒸暑い": {
    "pJ": "夏の京都は ",
    "pR": "Natsu no Kyouto wa ",
    "pI": "Kyoto di musim panas ",
    "aJ": "昨日の午後は ",
    "aR": "Kinou no gogo wa ",
    "aI": "Sore kemarin ",
    "arti": "gerah"
  },
  "明るい": {
    "pJ": "この教室は ",
    "pR": "Kono kyoushitsu wa ",
    "pI": "Ruang kelas ini ",
    "aJ": "昔の部屋は ",
    "aR": "Mukashi no heya wa ",
    "aI": "Kamar yang dulu ",
    "arti": "terang"
  },
  "暗い": {
    "pJ": "夜の道は ",
    "pR": "Yoru no michi wa ",
    "pI": "Jalan malam hari ",
    "aJ": "昔の通りは ",
    "aR": "Mukashi no toori wa ",
    "aI": "Jalan zaman dulu ",
    "arti": "gelap"
  },
  "汚い": {
    "pJ": "この部屋は ",
    "pR": "Kono heya wa ",
    "pI": "Kamar ini ",
    "aJ": "あの部屋は昔 ",
    "aR": "Ano heya wa mukashi ",
    "aI": "Kamar itu dulu ",
    "arti": "kotor"
  },
  "重い": {
    "pJ": "この荷物は ",
    "pR": "Kono nimotsu wa ",
    "pI": "Barang bawaan ini ",
    "aJ": "あのスーツケースは ",
    "aR": "Ano suutsukeesu wa ",
    "aI": "Koper kemarin ",
    "arti": "berat"
  },
  "軽い": {
    "pJ": "このカバンは ",
    "pR": "Kono kaban wa ",
    "pI": "Tas ini ",
    "aJ": "あのカバンは ",
    "aR": "Ano kaban wa ",
    "aI": "Tas itu dulu ",
    "arti": "ringan"
  },
  "詳しい": {
    "pJ": "この地図は ",
    "pR": "Kono chizu wa ",
    "pI": "Peta ini ",
    "aJ": "昔の案内書は ",
    "aR": "Mukashi no annaisho wa ",
    "aI": "Buku panduan dulu ",
    "arti": "detail"
  },
  "難しい": {
    "pJ": "日本語の漢字は ",
    "pR": "Nihongo no kanji wa ",
    "pI": "Kanji bahasa Jepang ",
    "aJ": "先週のテストは ",
    "aR": "Senshuu no tesuto wa ",
    "aI": "Ujian minggu lalu ",
    "arti": "sulit"
  },
  "易しい": {
    "pJ": "今日のテストは ",
    "pR": "Kyou no tesuto wa ",
    "pI": "Ujian hari ini ",
    "aJ": "昨日の問題は ",
    "aR": "Kinou no mondai wa ",
    "aI": "Soal kemarin ",
    "arti": "mudah"
  },
  "珍しい": {
    "pJ": "この切手は ",
    "pR": "Kono kitte wa ",
    "pI": "Perangko ini ",
    "aJ": "あの鳥は ",
    "aR": "Ano tori wa ",
    "aI": "Burung itu dulu ",
    "arti": "langka"
  },
  "可笑しい": {
    "pJ": "あの話は ",
    "pR": "Ano hanashi wa ",
    "pI": "Cerita itu ",
    "aJ": "昨日のコントは ",
    "aR": "Kinou no konto wa ",
    "aI": "Komedi kemarin ",
    "arti": "lucu / aneh"
  },
  "危ない": {
    "pJ": "夜の川は ",
    "pR": "Yoru no kawa wa ",
    "pI": "Sungai di malam hari ",
    "aJ": "昨夜の道は ",
    "aR": "Sakuya no michi wa ",
    "aI": "Jalan semalam ",
    "arti": "berbahaya"
  },
  "上手い": {
    "pJ": "彼のギターは ",
    "pR": "Kare no gitaa wa ",
    "pI": "Permainan gitar dia ",
    "aJ": "昨日の演奏は ",
    "aR": "Kinou no ensou wa ",
    "aI": "Penampilan kemarin ",
    "arti": "pandai / hebat"
  },
  "良い": {
    "pJ": "あなたの提案は ",
    "pR": "Anata no teian wa ",
    "pI": "Usulanmu ",
    "aJ": "昨日のアイデアは ",
    "aR": "Kinou no aidea wa ",
    "aI": "Ide kemarin ",
    "arti": "bagus"
  },
  "悪い": {
    "pJ": "彼の態度は ",
    "pR": "Kare no taido wa ",
    "pI": "Sikapnya ",
    "aJ": "昨日の体調は ",
    "aR": "Kinou no taichou wa ",
    "aI": "Kondisi kemarin ",
    "arti": "buruk"
  },
  "酷い": {
    "pJ": "昨日の渋滞は ",
    "pR": "Kinou no juutai wa ",
    "pI": "Macet kemarin ",
    "aJ": "去年の嵐は ",
    "aR": "Kyonen no arashi wa ",
    "aI": "Badai tahun lalu ",
    "arti": "parah"
  },
  "煩い": {
    "pJ": "工事の音は ",
    "pR": "Kouji no oto wa ",
    "pI": "Suara konstruksi ",
    "aJ": "昨夜の騒音は ",
    "aR": "Sakuya no souon wa ",
    "aI": "Suara gaduh semalam ",
    "arti": "berisik"
  },
  "忙しい": {
    "pJ": "父は毎日 ",
    "pR": "Chichi wa mainichi ",
    "pI": "Ayah setiap hari ",
    "aJ": "先週の母は ",
    "aR": "Senshuu no haha wa ",
    "aI": "Ibu minggu lalu ",
    "arti": "sibuk"
  },
  "正しい": {
    "pJ": "あなたの答えは ",
    "pR": "Anata no kotae wa ",
    "pI": "Jawabanmu ",
    "aJ": "あの時の判断は ",
    "aR": "Ano toki no handan wa ",
    "aI": "Keputusan waktu itu ",
    "arti": "benar"
  },
  "凄い": {
    "pJ": "彼の演奏は ",
    "pR": "Kare no ensou wa ",
    "pI": "Penampilan dia ",
    "aJ": "昨日の花火は ",
    "aR": "Kinou no hanabi wa ",
    "aI": "Kembang api kemarin ",
    "arti": "hebat"
  },
  "素晴らしい": {
    "pJ": "富士山の景色は ",
    "pR": "Fujisan no keshiki wa ",
    "pI": "Pemandangan Gunung Fuji ",
    "aJ": "昨日の劇は ",
    "aR": "Kinou no geki wa ",
    "aI": "Drama kemarin ",
    "arti": "luar biasa"
  },
  "格好いい": {
    "pJ": "あの先輩は ",
    "pR": "Ano senpai wa ",
    "pI": "Kakak kelas itu ",
    "aJ": "あの時の彼は ",
    "aR": "Ano toki no kare wa ",
    "aI": "Dia waktu itu ",
    "arti": "keren"
  },
  "偉い": {
    "pJ": "毎朝早起きして ",
    "pR": "Maiasa hayaoki shite ",
    "pI": "Bangun pagi setiap hari itu ",
    "aJ": "昔の偉人は ",
    "aR": "Mukashi no ijin wa ",
    "aI": "Tokoh zaman dulu ",
    "arti": "hebat / terhormat"
  },
  "仲が良い": {
    "pJ": "あの兄弟は ",
    "pR": "Ano kyoudai wa ",
    "pI": "Kakak beradik itu ",
    "aJ": "昔の二人は ",
    "aR": "Mukashi no futari wa ",
    "aI": "Dulu mereka berdua ",
    "arti": "rukun"
  },
  "親しい": {
    "pJ": "彼とはとても ",
    "pR": "Kare to wa totemo ",
    "pI": "Dengan dia kami sangat ",
    "aJ": "昔の友とは ",
    "aR": "Mukashi no tomo to wa ",
    "aI": "Dengan sahabat dulu ",
    "arti": "akrab"
  },
  "優しい": {
    "pJ": "田中先生は ",
    "pR": "Tanaka-sensei wa ",
    "pI": "Pak Guru Tanaka ",
    "aJ": "おばあちゃんは昔 ",
    "aR": "Obaachan wa mukashi ",
    "aI": "Nenek dulu ",
    "arti": "baik hati"
  },
  "可愛い": {
    "pJ": "この子猫は ",
    "pR": "Kono koneko wa ",
    "pI": "Anak kucing ini ",
    "aJ": "あの子犬は昔 ",
    "aR": "Ano koinu wa mukashi ",
    "aI": "Anak anjing itu dulu ",
    "arti": "imut / lucu"
  },
  "美しい": {
    "pJ": "京都の庭園は ",
    "pR": "Kyouto no teien wa ",
    "pI": "Taman di Kyoto ",
    "aJ": "昨日の夕焼けは ",
    "aR": "Kinou no yuuyake wa ",
    "aI": "Senja kemarin ",
    "arti": "indah"
  },
  "厳しい": {
    "pJ": "空手の先生は ",
    "pR": "Karate no sensei wa ",
    "pI": "Guru karate kami ",
    "aJ": "昔の校則は ",
    "aR": "Mukashi no kousoku wa ",
    "aI": "Aturan sekolah dulu ",
    "arti": "tegas / disiplin"
  },
  "大人しい": {
    "pJ": "あの犬は ",
    "pR": "Ano inu wa ",
    "pI": "Anjing itu ",
    "aJ": "子供の頃の彼は ",
    "aR": "Kodomo no koro no kare wa ",
    "aI": "Dia waktu kecil ",
    "arti": "penurut / pendiam"
  },
  "楽しい": {
    "pJ": "日本語の授業は ",
    "pR": "Nihongo no jugyou wa ",
    "pI": "Pelajaran bahasa Jepang ",
    "aJ": "昨日の旅行は ",
    "aR": "Kinou no ryokou wa ",
    "aI": "Wisata kemarin ",
    "arti": "menyenangkan"
  },
  "面白い": {
    "pJ": "このアニメは ",
    "pR": "Kono anime wa ",
    "pI": "Anime ini ",
    "aJ": "先週読んだ本は ",
    "aR": "Senshuu yonda hon wa ",
    "aI": "Buku minggu lalu ",
    "arti": "menarik"
  },
  "詰まらない": {
    "pJ": "あの映画は ",
    "pR": "Ano eiga wa ",
    "pI": "Film itu ",
    "aJ": "昨日の番組は ",
    "aR": "Kinou no bangumi wa ",
    "aI": "Acara TV kemarin ",
    "arti": "membosankan"
  },
  "嬉しい": {
    "pJ": "合格してとても ",
    "pR": "Goukaku shite totemo ",
    "pI": "Lulus ujian membuatku sangat ",
    "aJ": "賞をもらった時は ",
    "aR": "Shou o moratta toki wa ",
    "aI": "Waktu menerima hadiah sangat ",
    "arti": "senang / gembira"
  },
  "寂しい": {
    "pJ": "友達がいなくて ",
    "pR": "Tomodachi ga inakute ",
    "pI": "Tak ada teman rasanya ",
    "aJ": "一人暮らしの初日は ",
    "aR": "Hitorigurashi no shojitsu wa ",
    "aI": "Hari pertama tinggal sendiri ",
    "arti": "merasa sepi"
  },
  "怖い": {
    "pJ": "あのお化け屋敷は ",
    "pR": "Ano obakeyashiki wa ",
    "pI": "Rumah hantu itu ",
    "aJ": "昨夜の地震は ",
    "aR": "Sakuya no jishin wa ",
    "aI": "Gempa semalam ",
    "arti": "menakutkan"
  },
  "悲しい": {
    "pJ": "別れのニュースは ",
    "pR": "Wakare no nyuusu wa ",
    "pI": "Kabar perpisahan itu ",
    "aJ": "あの時の映画は ",
    "aR": "Ano toki no eiga wa ",
    "aI": "Film waktu itu ",
    "arti": "menyedihkan"
  },
  "恥かしい": {
    "pJ": "人前で転んで ",
    "pR": "Hitomae de koronde ",
    "pI": "Tersandung di depan umum rasanya ",
    "aJ": "あの失敗はとても ",
    "aR": "Ano shippai wa totemo ",
    "aI": "Kesalahan waktu itu sangat ",
    "arti": "malu"
  },
  "羨ましい": {
    "pJ": "彼の長い休暇が ",
    "pR": "Kare no nagai kyuuka ga ",
    "pI": "Liburan panjang dia membuatku ",
    "aJ": "昔の彼の成功が ",
    "aR": "Mukashi no kare no seikou ga ",
    "aI": "Keberhasilan dia dulu membuatku ",
    "arti": "iri"
  },
  "懐かしい": {
    "pJ": "子供の頃の写真が ",
    "pR": "Kodomo no koro no shashin ga ",
    "pI": "Foto masa kecil terasa ",
    "aJ": "昔通った小学校が ",
    "aR": "Mukashi tootta shougakkou ga ",
    "aI": "Gedung SD dulu terasa ",
    "arti": "bikin rindu / nostalgia"
  },
  "眠い": {
    "pJ": "昨夜夜更かしして ",
    "pR": "Sakuya yofukashi shite ",
    "pI": "Begadang semalam membuatku ",
    "aJ": "昨日の午後は ",
    "aR": "Kinou no gogo wa ",
    "aI": "Sore kemarin aku ",
    "arti": "mengantuk"
  },
  "痛い": {
    "pJ": "転んで膝が ",
    "pR": "Koronde hiza ga ",
    "pI": "Tersandung dan lututku ",
    "aJ": "昨日は歯が ",
    "aR": "Kinou wa ha ga ",
    "aI": "Kemarin gigiku ",
    "arti": "sakit / nyeri"
  },
  "欲しい": {
    "pJ": "新しいパソコンが ",
    "pR": "Atarashii pasokon ga ",
    "pI": "Laptop baru yang aku ",
    "aJ": "子供の頃あのオモチャが ",
    "aR": "Kodomo no koro ano omocha ga ",
    "aI": "Waktu kecil mainan itu yang aku ",
    "arti": "mau / ingin"
  },
  "無い": {
    "pJ": "今は時間と予算が ",
    "pR": "Ima wa jikan to yosan ga ",
    "pI": "Sekarang waktu dan anggaran ",
    "aJ": "昨日は電波が ",
    "aR": "Kinou wa denpa ga ",
    "aI": "Kemarin sinyal ",
    "arti": "tidak ada"
  },
  "残念": {
    "pJ": "旅行に行けなくて ",
    "pR": "Ryokou ni ikenakute ",
    "pI": "Tidak bisa ikut wisata sungguh ",
    "aJ": "試合に負けて ",
    "aR": "Shiai ni makete ",
    "aI": "Kalah di pertandingan sangat ",
    "arti": "disayangkan"
  },
  "心配": {
    "pJ": "母は息子の健康が ",
    "pR": "Haha wa musuko no kenkou ga ",
    "pI": "Ibu tentang kesehatan anaknya ",
    "aJ": "昨日のテスト結果が ",
    "aR": "Kinou no tesuto kekka ga ",
    "aI": "Hasil tes kemarin ",
    "arti": "khawatir"
  },
  "不安": {
    "pJ": "明日の面接が ",
    "pR": "Ashita no mensetsu ga ",
    "pI": "Wawancara besok terasa ",
    "aJ": "昨夜の嵐が ",
    "aR": "Sakuya no arashi ga ",
    "aI": "Badai semalam terasa ",
    "arti": "mencemaskan"
  },
  "好き": {
    "pJ": "私は猫が ",
    "pR": "Watashi wa neko ga ",
    "pI": "Saya kucing ",
    "aJ": "昔は犬が ",
    "aR": "Mukashi wa inu ga ",
    "aI": "Dulu saya anjing ",
    "arti": "suka"
  },
  "嫌い": {
    "pJ": "弟は野菜が ",
    "pR": "Otouto wa yasai ga ",
    "pI": "Adik sayuran ",
    "aJ": "子供の頃トマトが ",
    "aR": "Kodomo no koro tomato ga ",
    "aI": "Waktu kecil tomat ",
    "arti": "tidak suka"
  },
  "大好き": {
    "pJ": "子供はアニメが ",
    "pR": "Kodomo wa anime ga ",
    "pI": "Anak-anak anime ",
    "aJ": "昔はこの歌手が ",
    "aR": "Mukashi wa kono kashu ga ",
    "aI": "Dulu penyanyi ini ",
    "arti": "suka sekali"
  },
  "大嫌い": {
    "pJ": "私は虫が ",
    "pR": "Watashi wa mushi ga ",
    "pI": "Saya serangga ",
    "aJ": "昔はピーマンが ",
    "aR": "Mukashi wa piiman ga ",
    "aI": "Dulu paprika ",
    "arti": "benci sekali"
  },
  "綺麗": {
    "pJ": "桜の花は ",
    "pR": "Sakura no hana wa ",
    "pI": "Bunga sakura ",
    "aJ": "昨日の花火は ",
    "aR": "Kinou no hanabi wa ",
    "aI": "Kembang api kemarin ",
    "arti": "cantik / indah"
  },
  "賑やか": {
    "pJ": "渋谷の街は ",
    "pR": "Shibuya no machi wa ",
    "pI": "Kota Shibuya ",
    "aJ": "昨夜の祭りは ",
    "aR": "Sakuya no matsuri wa ",
    "aI": "Festival semalam ",
    "arti": "ramai"
  },
  "静か": {
    "pJ": "夜の図書館は ",
    "pR": "Yoru no toshokan wa ",
    "pI": "Perpustakaan di malam hari ",
    "aJ": "昨夜の公園は ",
    "aR": "Sakuya no kouen wa ",
    "aI": "Taman semalam ",
    "arti": "tenang"
  },
  "複雑": {
    "pJ": "この文法は ",
    "pR": "Kono bunpou wa ",
    "pI": "Tata bahasa ini ",
    "aJ": "昔のシステムは ",
    "aR": "Mukashi no shisutemu wa ",
    "aI": "Sistem yang dulu ",
    "arti": "rumit"
  },
  "簡単": {
    "pJ": "このクイズは ",
    "pR": "Kono kuizu wa ",
    "pI": "Kuis ini ",
    "aJ": "昨日の問題は ",
    "aR": "Kinou no mondai wa ",
    "aI": "Soal kemarin ",
    "arti": "mudah"
  },
  "便利": {
    "pJ": "駅前のコンビニは ",
    "pR": "Ekimae no konbini wa ",
    "pI": "Minimarket depan stasiun ",
    "aJ": "昔の生活は ",
    "aR": "Mukashi no seikatsu wa ",
    "aI": "Kehidupan dulu ",
    "arti": "praktis"
  },
  "不便": {
    "pJ": "電車がない村は ",
    "pR": "Densha ga nai mura wa ",
    "pI": "Desa tanpa stasiun kereta ",
    "aJ": "昔の交通は ",
    "aR": "Mukashi no koutsuu wa ",
    "aI": "Transportasi dulu ",
    "arti": "tidak praktis"
  },
  "幸せ": {
    "pJ": "家族と過ごす時間は ",
    "pR": "Kazoku to sugosu jikan wa ",
    "pI": "Waktu bersama keluarga terasa ",
    "aJ": "子供の頃の暮らしは ",
    "aR": "Kodomo no koro no kurashi wa ",
    "aI": "Kehidupan masa kecil ",
    "arti": "bahagia"
  },
  "素敵": {
    "pJ": "彼女のドレスは ",
    "pR": "Kanojo no doresu wa ",
    "pI": "Gaun dia ",
    "aJ": "昨夜のホテルは ",
    "aR": "Sakuya no hoteru wa ",
    "aI": "Hotel semalam ",
    "arti": "bagus / menawan"
  },
  "有名": {
    "pJ": "あのレストランは ",
    "pR": "Ano resutoran wa ",
    "pI": "Restoran itu ",
    "aJ": "昔のこの城は ",
    "aR": "Mukashi no kono shiro wa ",
    "aI": "Kastil ini zaman dulu ",
    "arti": "terkenal"
  },
  "安全": {
    "pJ": "日本の夜道は ",
    "pR": "Nihon no yomichi wa ",
    "pI": "Jalan malam di Jepang ",
    "aJ": "昔の航海は ",
    "aR": "Mukashi no koukai wa ",
    "aI": "Pelayaran zaman dulu ",
    "arti": "aman"
  },
  "危険": {
    "pJ": "冬の雪山は ",
    "pR": "Fuyu no yukiyama wa ",
    "pI": "Gunung salju musim dingin ",
    "aJ": "昨夜の暴風雨は ",
    "aR": "Sakuya no boufuuu wa ",
    "aI": "Badai semalam ",
    "arti": "berbahaya"
  },
  "色々": {
    "pJ": "デパートの品物は ",
    "pR": "Depaato no shinamono wa ",
    "pI": "Barang di toserba ",
    "aJ": "昔の経験は ",
    "aR": "Mukashi no keiken wa ",
    "aI": "Pengalaman masa lalu ",
    "arti": "bermacam-macam"
  },
  "大丈夫": {
    "pJ": "薬を飲んだのでもう ",
    "pR": "Kusuri o nonda node mou ",
    "pI": "Sudah minum obat sekarang ",
    "aJ": "怪我をした時は ",
    "aR": "Kega o shita toki wa ",
    "aI": "Waktu cedera dulu ",
    "arti": "tidak apa-apa"
  },
  "大事": {
    "pJ": "健康管理は ",
    "pR": "Kenkou kanri wa ",
    "pI": "Menjaga kesehatan ",
    "aJ": "昔の教えは ",
    "aR": "Mukashi no oshie wa ",
    "aI": "Ajaran masa lalu ",
    "arti": "penting"
  },
  "大切": {
    "pJ": "家族からの手紙は ",
    "pR": "Kazoku kara no tegami wa ",
    "pI": "Surat dari keluarga ",
    "aJ": "子供の頃の宝物は ",
    "aR": "Kodomo no koro no takaramono wa ",
    "aI": "Benda berharga masa kecil ",
    "arti": "berharga"
  },
  "駄目": {
    "pJ": "ここで騒いでは ",
    "pR": "Koko de sawaide wa ",
    "pI": "Membuat keributan di sini ",
    "aJ": "昨日の計画は ",
    "aR": "Kinou no keikaku wa ",
    "aI": "Rencana kemarin ",
    "arti": "tidak boleh"
  },
  "変": {
    "pJ": "昨夜の外の音は ",
    "pR": "Sakuya no soto no oto wa ",
    "pI": "Suara dari luar semalam ",
    "aJ": "あの時の彼の行動は ",
    "aR": "Ano toki no kare no koudou wa ",
    "aI": "Perilakunya waktu itu ",
    "arti": "aneh"
  },
  "無駄": {
    "pJ": "使わない買い物は ",
    "pR": "Tsukawanai kaimono wa ",
    "pI": "Membeli barang tak terpakai ",
    "aJ": "あの時の努力は ",
    "aR": "Ano toki no doryoku wa ",
    "aI": "Usaha waktu itu ",
    "arti": "sia-sia"
  },
  "急": {
    "pJ": "スケジュールの変更が ",
    "pR": "Sukejuuru no henkou ga ",
    "pI": "Perubahan jadwal ",
    "aJ": "昨日の雷雨は ",
    "aR": "Kinou no raiu wa ",
    "aI": "Hujan petir kemarin ",
    "arti": "mendadak"
  },
  "上手": {
    "pJ": "彼女はピアノが ",
    "pR": "Kanojo wa piano ga ",
    "pI": "Dia bermain piano ",
    "aJ": "昔の兄は歌が ",
    "aR": "Mukashi no ani wa uta ga ",
    "aI": "Kakak dulu bernyanyi ",
    "arti": "pandai"
  },
  "下手": {
    "pJ": "私は絵を描くのが ",
    "pR": "Watashi wa e o kaku no ga ",
    "pI": "Saya menggambar ",
    "aJ": "昔はスポーツが ",
    "aR": "Mukashi wa supootsu ga ",
    "aI": "Dulu saya olahraga ",
    "arti": "tidak pandai"
  },
  "得意": {
    "pJ": "姉は料理が ",
    "pR": "Ane wa ryouri ga ",
    "pI": "Kakak memasak ",
    "aJ": "学生時代は英語が ",
    "aR": "Gakusei jidai wa eigo ga ",
    "aI": "Zaman sekolah bahasa Inggris ",
    "arti": "jago / favorit"
  },
  "苦手": {
    "pJ": "私は数学が ",
    "pR": "Watashi wa suugaku ga ",
    "pI": "Saya matematika ",
    "aJ": "子供の頃走るのが ",
    "aR": "Kodomo no koro hashiru no ga ",
    "aI": "Waktu kecil lari ",
    "arti": "kurang bisa"
  },
  "暇": {
    "pJ": "今度の日曜日は ",
    "pR": "Kondo no nichiyoubi wa ",
    "pI": "Hari Minggu besok saya ",
    "aJ": "先週の休日は ",
    "aR": "Senshuu no kyuujitsu wa ",
    "aI": "Liburan minggu lalu ",
    "arti": "senggang"
  },
  "可哀想": {
    "pJ": "雨に濡れた子猫は ",
    "pR": "Ame ni nureta koneko wa ",
    "pI": "Anak kucing kehujanan ",
    "aJ": "迷子の子犬は ",
    "aR": "Maigo no koinu wa ",
    "aI": "Anak anjing hilang waktu itu ",
    "arti": "kasihan"
  },
  "立派": {
    "pJ": "あのお城は ",
    "pR": "Ano oshiro wa ",
    "pI": "Kastil itu ",
    "aJ": "昔の校長先生は ",
    "aR": "Mukashi no kouchousensei wa ",
    "aI": "Kepala sekolah dulu ",
    "arti": "megah / terhormat"
  },
  "大変": {
    "pJ": "毎日の長距離通勤は ",
    "pR": "Mainichi no choukyori tsuukin wa ",
    "pI": "PP jarak jauh setiap hari ",
    "aJ": "先週の残業続きは ",
    "aR": "Senshuu no zangyou tsuzuki wa ",
    "aI": "Lembur minggu lalu ",
    "arti": "berat / melelahkan"
  },
  "楽": {
    "pJ": "新幹線での移動は ",
    "pR": "Shinkansen de no idou wa ",
    "pI": "Perjalanan naik Shinkansen ",
    "aJ": "昨日の仕事は ",
    "aR": "Kinou no shigoto wa ",
    "aI": "Pekerjaan kemarin ",
    "arti": "santai / nyaman"
  },
  "無理": {
    "pJ": "一日で十冊読むのは ",
    "pR": "Ichinichi de jussatsu yomu no wa ",
    "pI": "Membaca 10 buku sehari ",
    "aJ": "あの時の要求は ",
    "aR": "Ano toki no youkyuu wa ",
    "aI": "Tuntutan waktu itu ",
    "arti": "mustahil"
  },
  "お洒落": {
    "pJ": "彼の服はいつも ",
    "pR": "Kare no fuku wa itsumo ",
    "pI": "Pakaiannya selalu ",
    "aJ": "昨夜のパーティーは ",
    "aR": "Sakuya no paatii wa ",
    "aI": "Pesta semalam ",
    "arti": "modis"
  },
  "丁寧": {
    "pJ": "店員の接客は ",
    "pR": "Ten'in no sekkyaku wa ",
    "pI": "Pelayanan staf toko ",
    "aJ": "あの手紙の返事は ",
    "aR": "Ano tegami no henji wa ",
    "aI": "Balasan surat itu ",
    "arti": "sopan / ramah"
  },
  "親切": {
    "pJ": "案内所の人は ",
    "pR": "Annaijo no hito wa ",
    "pI": "Petugas informasi ",
    "aJ": "昨日のタクシー運転手は ",
    "aR": "Kinou no takushii untenshu wa ",
    "aI": "Sopir taksi kemarin ",
    "arti": "baik hati / ramah"
  },
  "ハンサム": {
    "pJ": "あの俳優は ",
    "pR": "Ano haiyuu wa ",
    "pI": "Aktor itu ",
    "aJ": "若い頃の父は ",
    "aR": "Wakai koro no chichi wa ",
    "aI": "Ayah sewaktu muda ",
    "arti": "ganteng"
  },
  "真面目": {
    "pJ": "山田君は勉強が ",
    "pR": "Yamada-kun wa benkyou ga ",
    "pI": "Yamada-kun sikap belajarnya ",
    "aJ": "昔の先輩は ",
    "aR": "Mukashi no senpai wa ",
    "aI": "Senior zaman dulu ",
    "arti": "rajin / serius"
  },
  "不真面目": {
    "pJ": "宿題を忘れるのは ",
    "pR": "Shukudai o wasureru no wa ",
    "pI": "Melupakan PR itu sikap yang ",
    "aJ": "あの時の彼の態度は ",
    "aR": "Ano toki no kare no taido wa ",
    "aI": "Sikap dia waktu itu ",
    "arti": "tidak serius"
  },
  "嫌": {
    "pJ": "雨の日の満員電車は ",
    "pR": "Ame no hi no man'in densha wa ",
    "pI": "Kereta penuh saat hujan ",
    "aJ": "子供の頃の注射は ",
    "aR": "Kodomo no koro no chuusha wa ",
    "aI": "Suntikan waktu kecil ",
    "arti": "tidak suka / enggan"
  },
  "一生懸命": {
    "pJ": "彼は試験のために ",
    "pR": "Kare wa shiken no tame ni ",
    "pI": "Dia demi ujian belajar ",
    "aJ": "昨日の選手たちは ",
    "aR": "Kinou no senshutachi wa ",
    "aI": "Para atlet kemarin berjuang ",
    "arti": "bersungguh-sungguh"
  },
  "盛ん": {
    "pJ": "この地域は農業が ",
    "pR": "Kono chiiki wa nougyou ga ",
    "pI": "Di daerah ini sektor pertanian ",
    "aJ": "昔はこの競技が ",
    "aR": "Mukashi wa kono kyougi ga ",
    "aI": "Dulu olahraga ini ",
    "arti": "marak / populer"
  },
  "邪魔": {
    "pJ": "廊下に置いた荷物は ",
    "pR": "Rouka ni oita nimotsu wa ",
    "pI": "Barang di lorong ",
    "aJ": "あの時の障害物は ",
    "aR": "Ano toki no shougaibutsu wa ",
    "aI": "Halangan waktu itu ",
    "arti": "mengganggu"
  },
  "十分": {
    "pJ": "昨夜の睡眠時間は ",
    "pR": "Sakuya no suimin jikan wa ",
    "pI": "Waktu tidur semalam ",
    "aJ": "昔の蓄えは ",
    "aR": "Mukashi no takuwae wa ",
    "aI": "Tabungan zaman dulu ",
    "arti": "cukup"
  },
  "丈夫": {
    "pJ": "このスーツケースは ",
    "pR": "Kono suutsukeesu wa ",
    "pI": "Koper ini ",
    "aJ": "昔の木造家屋は ",
    "aR": "Mukashi no mokuzou kaoku wa ",
    "aI": "Rumah kayu dulu ",
    "arti": "kuat / kokoh"
  },
  "適当": {
    "pJ": "料理の塩加減は ",
    "pR": "Ryouri no shiokagen wa ",
    "pI": "Takaran garam masakan ini ",
    "aJ": "昨日の会議の長さは ",
    "aR": "Kinou no kaigi no nagasa wa ",
    "aI": "Durasi rapat kemarin ",
    "arti": "pas / tepat"
  },
  "特別": {
    "pJ": "誕生日のディナーは ",
    "pR": "Tanjoubi no dinaa wa ",
    "pI": "Makan malam ulang tahun ",
    "aJ": "昨夜の記念日は ",
    "aR": "Sakuya no kinenbi wa ",
    "aI": "Peringatan semalam ",
    "arti": "spesial"
  },
  "自由": {
    "pJ": "大学の履修スケジュールは ",
    "pR": "Daigaku no rishuu sukejuuru wa ",
    "pI": "Jadwal kuliah di kampus ",
    "aJ": "昔の一人旅は ",
    "aR": "Mukashi no hitoritabi wa ",
    "aI": "Solo travel dulu ",
    "arti": "bebas"
  },
  "真っ直ぐ": {
    "pJ": "駅前の大通りは ",
    "pR": "Ekimae no oodoori wa ",
    "pI": "Jalan raya depan stasiun ",
    "aJ": "昔の街道は ",
    "aR": "Mukashi no kaidou wa ",
    "aI": "Jalan utama zaman dulu ",
    "arti": "lurus"
  },
  "熱心": {
    "pJ": "日本語の先生の指導は ",
    "pR": "Nihongo no sensei no shidou wa ",
    "pI": "Bimbingan guru bahasa Jepang ",
    "aJ": "昨日のコーチの指導は ",
    "aR": "Kinou no kouchi no shidou wa ",
    "aI": "Instruksi pelatih kemarin ",
    "arti": "antusias / tekun"
  },
  "必要": {
    "pJ": "海外旅行にパスポートは ",
    "pR": "Kaigai ryokou ni pasupooto wa ",
    "pI": "Untuk ke luar negeri paspor ",
    "aJ": "昨日の会議で資料は ",
    "aR": "Kinou no kaigi de shiryou wa ",
    "aI": "Dalam rapat kemarin dokumen ",
    "arti": "perlu / penting"
  },
  "別": {
    "pJ": "今日のランチのお会計は ",
    "pR": "Kyou no ranchi no okaikei wa ",
    "pI": "Pembayaran makan siang hari ini ",
    "aJ": "昨日のレシートは ",
    "aR": "Kinou no reshiito wa ",
    "aI": "Struk belanja kemarin ",
    "arti": "terpisah"
  },
  "不思議": {
    "pJ": "この手品は何度見ても ",
    "pR": "Kono tejina wa nando mite mo ",
    "pI": "Trik sulap ini dilihat berulang kali pun ",
    "aJ": "昨夜見た夢は ",
    "aR": "Sakuya mita yume wa ",
    "aI": "Mimpi semalam rasanya ",
    "arti": "ajaib / aneh"
  },
  "豪華": {
    "pJ": "五つ星ホテルのロビーは ",
    "pR": "Itsutsuboshi hoteru no robii wa ",
    "pI": "Lobi hotel bintang lima ",
    "aJ": "昨夜の結婚式は ",
    "aR": "Sakuya no kekkonshiki wa ",
    "aI": "Pesta pernikahan semalam ",
    "arti": "mewah"
  },
  "同じ": {
    "pJ": "私の服と彼の服は ",
    "pR": "Watashi no fuku to kare no fuku wa ",
    "pI": "Baju saya dan bajunya ",
    "aJ": "昨日のテスト結果は ",
    "aR": "Kinou no tesuto kekka wa ",
    "aI": "Hasil tes kemarin ",
    "arti": "sama"
  },
  "伝統的": {
    "pJ": "京都の町並みは ",
    "pR": "Kyouto no machinami wa ",
    "pI": "Tata kota Kyoto ",
    "aJ": "昔の行事は ",
    "aR": "Mukashi no gyouji wa ",
    "aI": "Upacara zaman dulu ",
    "arti": "tradisional"
  },
  "活発": {
    "pJ": "クラスの子供たちは ",
    "pR": "Kurasu no kodomotachi wa ",
    "pI": "Anak-anak di kelas ",
    "aJ": "子供の頃の彼は ",
    "aR": "Kodomo no koro no kare wa ",
    "aI": "Dia waktu kecil ",
    "arti": "aktif / lincah"
  },
  "誠実": {
    "pJ": "佐藤さんの人柄は ",
    "pR": "Satou-san no hitogara wa ",
    "pI": "Kepribadian Satou-san ",
    "aJ": "昔の商人は ",
    "aR": "Mukashi no shounin wa ",
    "aI": "Pedagang zaman dulu ",
    "arti": "tulus / setia"
  },
  "我儘": {
    "pJ": "自分勝手な振る舞いは ",
    "pR": "Jibunkatte na furumai wa ",
    "pI": "Sikap mementingkan diri sendiri itu ",
    "aJ": "昔の彼の態度は ",
    "aR": "Mukashi no kare no taido wa ",
    "aI": "Sikap dia dulu ",
    "arti": "egois"
  },
  "頑固": {
    "pJ": "あのおじいさんは ",
    "pR": "Ano ojiisan wa ",
    "pI": "Kakek itu ",
    "aJ": "昔の上司は ",
    "aR": "Mukashi no joushi wa ",
    "aI": "Atasan zaman dulu ",
    "arti": "keras kepala"
  },
  "素直": {
    "pJ": "あの子は性格が ",
    "pR": "Ano ko wa seikaku ga ",
    "pI": "Anak itu sifatnya ",
    "aJ": "子供の頃の彼は ",
    "aR": "Kodomo no koro no kare wa ",
    "aI": "Dia waktu kecil ",
    "arti": "patuh / polos"
  },
  "意地悪": {
    "pJ": "意地悪な質問をする人は ",
    "pR": "Ijiwaru na shitsumon o suru hito wa ",
    "pI": "Orang yang suka menjebak itu ",
    "aJ": "昔のいじめっ子は ",
    "aR": "Mukashi no ijimekko wa ",
    "aI": "Anak usil zaman dulu ",
    "arti": "jahat / usil"
  },
  "勝ち気": {
    "pJ": "妹は勝負事になると ",
    "pR": "Imouto wa shoubugoto ni naru to ",
    "pI": "Adik perempuan saat bertanding ",
    "aJ": "若い頃の彼女は ",
    "aR": "Wakai koro no kanojo wa ",
    "aI": "Dia sewaktu muda ",
    "arti": "tak mau kalah"
  },
  "神経質": {
    "pJ": "彼は小さな物音にも ",
    "pR": "Kare wa chiisana mono'oto ni mo ",
    "pI": "Dia terhadap bunyi kecil sekalipun ",
    "aJ": "受験前の彼は ",
    "aR": "Juken mae no kare wa ",
    "aI": "Dia menjelang ujian ",
    "arti": "sensitif / cemas"
  }
};
