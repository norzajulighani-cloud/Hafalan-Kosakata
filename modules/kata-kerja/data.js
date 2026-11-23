// DATABASES KATA KERJA N5 (111 KOSAKATA)
const DB_Kel_1 = [
  // I-1: ~U
  { k_kamus: "会う", r_kamus: "あう", k_masu: "会います", r_masu: "あいます", k_nai: "会わない", r_nai: "あわない", k_te: "会って", r_te: "あって", a: "bertemu", grp: 0 },
  { k_kamus: "洗う", r_kamus: "あらう", k_masu: "洗います", r_masu: "あらいます", k_nai: "洗わない", r_nai: "あらわない", k_te: "洗って", r_te: "あらって", a: "mencuci", grp: 0 },
  { k_kamus: "言う", r_kamus: "いう", k_masu: "言います", r_masu: "いいます", k_nai: "言わない", r_nai: "いわない", k_te: "言って", r_te: "いって", a: "berkata", grp: 0 },
  { k_kamus: "歌う", r_kamus: "うたう", k_masu: "歌います", r_masu: "うたいます", k_nai: "歌わない", r_nai: "うたわない", k_te: "歌って", r_te: "うたって", a: "bernyanyi", grp: 0 },
  { k_kamus: "買う", r_kamus: "かう", k_masu: "買います", r_masu: "かいます", k_nai: "買わない", r_nai: "かわない", k_te: "買って", r_te: "かって", a: "membeli", grp: 0 },
  { k_kamus: "吸う", r_kamus: "すう", k_masu: "吸います", r_masu: "すいます", k_nai: "吸わない", r_nai: "すわない", k_te: "吸って", r_te: "すって", a: "mengisap", grp: 0 },
  { k_kamus: "違う", r_kamus: "ちがう", k_masu: "違います", r_masu: "ちがいます", k_nai: "違わない", r_nai: "ちがわない", k_te: "違って", r_te: "ちがって", a: "berbeda", grp: 0 },
  { k_kamus: "使う", r_kamus: "つかう", k_masu: "使います", r_masu: "つかいます", k_nai: "使わない", r_nai: "つかわない", k_te: "使って", r_te: "つかって", a: "memakai", grp: 0 },
  { k_kamus: "習う", r_kamus: "ならう", k_masu: "習います", r_masu: "ならいます", k_nai: "習わない", r_nai: "ならわない", k_te: "習って", r_te: "ならって", a: "belajar", grp: 0 },

  // I-2: ~ARU
  { k_kamus: "終わる", r_kamus: "おわる", k_masu: "終わります", r_masu: "おわります", k_nai: "終わらない", r_nai: "おわらない", k_te: "終わって", r_te: "おわって", a: "selesai, berakhir", grp: 1 },
  { k_kamus: "かかる", r_kamus: "かかる", k_masu: "かかります", r_masu: "かかります", k_nai: "かからない", r_nai: "かからない", k_te: "かかって", r_te: "かかって", a: "memerlukan, tergantung", grp: 1 },
  { k_kamus: "困る", r_kamus: "こまる", k_masu: "困ります", r_masu: "こまります", k_nai: "困らない", r_nai: "こまらない", k_te: "困って", r_te: "こまって", a: "mendapat masalah, bingung", grp: 1 },
  { k_kamus: "閉まる", r_kamus: "しまる", k_masu: "閉まります", r_masu: "しまります", k_nai: "閉まらない", r_nai: "しまらない", k_te: "閉まって", r_te: "しまって", a: "tertutup", grp: 1 },
  { k_kamus: "座る", r_kamus: "すわる", k_masu: "座ります", r_masu: "すわります", k_nai: "座らない", r_nai: "すわらない", k_te: "座って", r_te: "すわって", a: "duduk", grp: 1 },
  { k_kamus: "止まる", r_kamus: "とまる", k_masu: "止まります", r_masu: "とまります", k_nai: "止まらない", r_nai: "とまらない", k_te: "止まって", r_te: "とまって", a: "berhenti", grp: 1 },
  { k_kamus: "鳴る", r_kamus: "なる", k_masu: "鳴ります", r_masu: "なります", k_nai: "鳴らない", r_nai: "ならない", k_te: "鳴って", r_te: "なって", a: "berbunyi, berdering", grp: 1 },
  { k_kamus: "始まる", r_kamus: "はじまる", k_masu: "始まります", r_masu: "はじまります", k_nai: "始まらない", r_nai: "はじまらない", k_te: "始まって", r_te: "はじまって", a: "dimulai", grp: 1 },
  { k_kamus: "張る", r_kamus: "はる", k_masu: "張ります", r_masu: "はります", k_nai: "張らない", r_nai: "はらない", k_te: "張って", r_te: "はって", a: "menempel, memasang", grp: 1 },
  { k_kamus: "曲がる", r_kamus: "まがる", k_masu: "曲がります", r_masu: "まがります", k_nai: "曲がらない", r_nai: "まがらない", k_te: "曲がって", r_te: "まがって", a: "belok", grp: 1 },
  { k_kamus: "やる", r_kamus: "やる", k_masu: "やります", r_masu: "やります", k_nai: "やらない", r_nai: "やらない", k_te: "やって", r_te: "やって", a: "mengerjakan", grp: 1 },
  { k_kamus: "わかる", r_kamus: "わかる", k_masu: "わかります", r_masu: "わかります", k_nai: "わからない", r_nai: "わからない", k_te: "わかって", r_te: "わかって", a: "mengerti, mengetahui", grp: 1 },
  { k_kamus: "渡る", r_kamus: "わたる", k_masu: "渡ります", r_masu: "わたります", k_nai: "渡らない", r_nai: "わたらない", k_te: "渡って", r_te: "わたって", a: "menyeberang", grp: 1 },

  // I-3: ~URU
  { k_kamus: "売る", r_kamus: "うる", k_masu: "売ります", r_masu: "うります", k_nai: "売らない", r_nai: "うらない", k_te: "売って", r_te: "うって", a: "menjual", grp: 2 },
  { k_kamus: "送る", r_kamus: "おくる", k_masu: "送ります", r_masu: "おくります", k_nai: "送らない", r_nai: "おくらない", k_te: "送って", r_te: "おくって", a: "mengirim, menjalani", grp: 2 },
  { k_kamus: "作る", r_kamus: "つくる", k_masu: "作ります", r_masu: "つくります", k_nai: "作らない", r_nai: "つくらない", k_te: "作って", r_te: "つくって", a: "membuat", grp: 2 },
  { k_kamus: "かぶる", r_kamus: "かぶる", k_masu: "かぶります", r_masu: "かぶります", k_nai: "かぶらない", r_nai: "かぶらない", k_te: "かぶって", r_te: "かぶって", a: "memakai (topi/hijab)", grp: 2 },
  { k_kamus: "降る", r_kamus: "ふる", k_masu: "降ります", r_masu: "ふります", k_nai: "降らない", r_nai: "ふらない", k_te: "降って", r_te: "ふって", a: "turun (hujan/salju)", grp: 2 },

  // I-4: ~ORU
  { k_kamus: "曇る", r_kamus: "くもる", k_masu: "曇ります", r_masu: "くもります", k_nai: "曇らない", r_nai: "くもらない", k_te: "曇って", r_te: "くもって", a: "berawan, mendung", grp: 3 },
  { k_kamus: "取る", r_kamus: "とる", k_masu: "取ります", r_masu: "とります", k_nai: "取らない", r_nai: "とらない", k_te: "取って", r_te: "とって", a: "mengambil, mendapatkan", grp: 3 },
  { k_kamus: "登る", r_kamus: "のぼる", k_masu: "登ります", r_masu: "のぼります", k_nai: "登らない", r_nai: "のぼらない", k_te: "登って", r_te: "のぼって", a: "mendaki", grp: 3 },
  { k_kamus: "乗る", r_kamus: "のる", k_masu: "乗ります", r_masu: "のります", k_nai: "乗らない", r_nai: "のらない", k_te: "乗って", r_te: "のって", a: "naik, terletak", grp: 3 },

  // I-5: ~TSU
  { k_kamus: "立つ", r_kamus: "たつ", k_masu: "立ちます", r_masu: "たちます", k_nai: "立たない", r_nai: "たたない", k_te: "立って", r_te: "たって", a: "berdiri", grp: 4 },
  { k_kamus: "待つ", r_kamus: "まつ", k_masu: "待ちます", r_masu: "まちます", k_nai: "待たない", r_nai: "またない", k_te: "待って", r_te: "まって", a: "menunggu", grp: 4 },
  { k_kamus: "持つ", r_kamus: "もつ", k_masu: "持ちます", r_masu: "もちます", k_nai: "持たない", r_nai: "もたない", k_te: "持って", r_te: "もって", a: "membawa, mempunyai", grp: 4 },

  // I-6: ~KU
  { k_kamus: "開く", r_kamus: "あく", k_masu: "開きます", r_masu: "あきます", k_nai: "開かない", r_nai: "あかない", k_te: "開いて", r_te: "あいて", a: "terbuka", grp: 5 },
  { k_kamus: "歩く", r_kamus: "あるく", k_masu: "歩きます", r_masu: "あるきます", k_nai: "歩かない", r_nai: "あるかない", k_te: "歩いて", r_te: "あるいて", a: "berjalan kaki", grp: 5 },
  { k_kamus: "行く", r_kamus: "いく", k_masu: "行きます", r_masu: "いきます", k_nai: "行かない", r_nai: "いかない", k_te: "行って", r_te: "いって", a: "pergi", grp: 5 },
  { k_kamus: "置く", r_kamus: "おく", k_masu: "置きます", r_masu: "おきます", k_nai: "置かない", r_nai: "おかない", k_te: "置いて", r_te: "おいて", a: "menaruh, meletakkan", grp: 5 },
  { k_kamus: "書く", r_kamus: "かく", k_masu: "書きます", r_masu: "かきます", k_nai: "書かない", r_nai: "かかない", k_te: "書いて", r_te: "かいて", a: "menulis", grp: 5 },
  { k_kamus: "聞く", r_kamus: "きく", k_masu: "聞きます", r_masu: "ききます", k_nai: "聞かない", r_nai: "きかない", k_te: "聞いて", r_te: "きいて", a: "bertanya, mendengar", grp: 5 },
  { k_kamus: "咲く", r_kamus: "さく", k_masu: "咲きます", r_masu: "さきます", k_nai: "咲かない", r_nai: "さかない", k_te: "咲いて", r_te: "さいて", a: "bermekar", grp: 5 },
  { k_kamus: "着く", r_kamus: "つく", k_masu: "着きます", r_masu: "つきます", k_nai: "着かない", r_nai: "つかない", k_te: "着いて", r_te: "ついて", a: "tiba", grp: 5 },
  { k_kamus: "鳴く", r_kamus: "なく", k_masu: "鳴きます", r_masu: "なきます", k_nai: "鳴かない", r_nai: "なかない", k_te: "鳴いて", r_te: "ないて", a: "bersuara", grp: 5 },
  { k_kamus: "履く", r_kamus: "はく", k_masu: "履きます", r_masu: "はきます", k_nai: "履かない", r_nai: "はかない", k_te: "履いて", r_te: "はいて", a: "memakai (sepatu/celana)", grp: 5 },
  { k_kamus: "働く", r_kamus: "はたらく", k_masu: "働きます", r_masu: "はたらきます", k_nai: "働かない", r_nai: "はたらかない", k_te: "働いて", r_te: "はたらいて", a: "bekerja", grp: 5 },
  { k_kamus: "引く", r_kamus: "ひく", k_masu: "引きます", r_masu: "ひきます", k_nai: "引かない", r_nai: "ひかない", k_te: "引いて", r_te: "ひいて", a: "menarik", grp: 5 },
  { k_kamus: "弾く", r_kamus: "ひく", k_masu: "弾きます", r_masu: "ひきます", k_nai: "弾かない", r_nai: "ひかない", k_te: "弾いて", r_te: "ひいて", a: "memainkan alat musik", grp: 5 },
  { k_kamus: "吹く", r_kamus: "ふく", k_masu: "吹きます", r_masu: "ふきます", k_nai: "吹かない", r_nai: "ふかない", k_te: "吹いて", r_te: "ふいて", a: "bertiup", grp: 5 },
  { k_kamus: "磨く", r_kamus: "みがく", k_masu: "磨きます", r_masu: "みがきます", k_nai: "磨かない", r_nai: "みがかない", k_te: "磨いて", r_te: "みがいて", a: "menggosok", grp: 5 },

  // I-7: ~SU
  { k_kamus: "押す", r_kamus: "おす", k_masu: "押します", r_masu: "おします", k_nai: "押さない", r_nai: "おさない", k_te: "押して", r_te: "おして", a: "menekan", grp: 6 },
  { k_kamus: "返す", r_kamus: "かえす", k_masu: "返します", r_masu: "かえします", k_nai: "返さない", r_nai: "かえさない", k_te: "返して", r_te: "かえして", a: "mengembalikan", grp: 6 },
  { k_kamus: "差す", r_kamus: "さす", k_masu: "差します", r_masu: "さします", k_nai: "差さない", r_nai: "ささない", k_te: "差して", r_te: "さして", a: "membuka/memakai payung", grp: 6 },
  { k_kamus: "消す", r_kamus: "けす", k_masu: "消します", r_masu: "けします", k_nai: "消さない", r_nai: "けさない", k_te: "消して", r_te: "けして", a: "memadamkan, menghapus", grp: 6 },
  { k_kamus: "出す", r_kamus: "だす", k_masu: "出します", r_masu: "だします", k_nai: "出さない", r_nai: "ださない", k_te: "出して", r_te: "だして", a: "mengirim, mengeluarkan", grp: 6 },
  { k_kamus: "無くす", r_kamus: "なくす", k_masu: "無くします", r_masu: "なくします", k_nai: "無くさない", r_nai: "なくさない", k_te: "無くして", r_te: "なくして", a: "menghilangkan", grp: 6 },
  { k_kamus: "話す", r_kamus: "はなす", k_masu: "話します", r_masu: "はなします", k_nai: "話さない", r_nai: "はなさない", k_te: "話して", r_te: "はなして", a: "berbicara", grp: 6 },
  { k_kamus: "渡す", r_kamus: "わたす", k_masu: "渡します", r_masu: "わたします", k_nai: "渡さない", r_nai: "わたさない", k_te: "渡して", r_te: "わたして", a: "menyerahkan", grp: 6 },

  // I-8: ~BU & ~NU
  { k_kamus: "遊ぶ", r_kamus: "あそぶ", k_masu: "遊びます", r_masu: "あそびます", k_nai: "遊ばない", r_nai: "あそばない", k_te: "遊んで", r_te: "あそんで", a: "main", grp: 7 },
  { k_kamus: "呼ぶ", r_kamus: "よぶ", k_masu: "呼びます", r_masu: "よびます", k_nai: "呼ばない", r_nai: "よばない", k_te: "呼んで", r_te: "よんで", a: "memanggil, mengajak", grp: 7 },
  { k_kamus: "死ぬ", r_kamus: "しぬ", k_masu: "死にます", r_masu: "しにます", k_nai: "死なない", r_nai: "しなない", k_te: "死んで", r_te: "しんで", a: "mati", grp: 7 },

  // I-9: ~MU
  { k_kamus: "住む", r_kamus: "すむ", k_masu: "住みます", r_masu: "すみます", k_nai: "住まない", r_nai: "すまない", k_te: "住んで", r_te: "すんで", a: "tinggal, menghuni", grp: 8 },
  { k_kamus: "頼む", r_kamus: "たのむ", k_masu: "頼みます", r_masu: "たのみます", k_nai: "頼まない", r_nai: "たのまない", k_te: "頼んで", r_te: "たのんで", a: "meminta", grp: 8 },
  { k_kamus: "飲む", r_kamus: "のむ", k_masu: "飲みます", r_masu: "のみます", k_nai: "飲まない", r_nai: "のまない", k_te: "飲んで", r_te: "のんで", a: "minum", grp: 8 },
  { k_kamus: "休む", r_kamus: "やすむ", k_masu: "休みます", r_masu: "やすみます", k_nai: "休まない", r_nai: "やすまない", k_te: "休んで", r_te: "やすんで", a: "istirahat, absen", grp: 8 },
  { k_kamus: "読む", r_kamus: "よむ", k_masu: "読みます", r_masu: "よみます", k_nai: "読まない", r_nai: "よまない", k_te: "読んで", r_te: "よんで", a: "membaca", grp: 8 },

  // I-10: ~GU
  { k_kamus: "泳ぐ", r_kamus: "およぐ", k_masu: "泳ぎます", r_masu: "およぎます", k_nai: "泳がない", r_nai: "およがない", k_te: "泳いで", r_te: "およいで", a: "berenang", grp: 9 },
  { k_kamus: "脱ぐ", r_kamus: "ぬぐ", k_masu: "脱ぎます", r_masu: "ぬぎます", k_nai: "脱がない", r_nai: "ぬがない", k_te: "脱いで", r_te: "ぬいで", a: "melepas", grp: 9 },

  // Pengecualian
  { k_kamus: "要る", r_kamus: "いる", k_masu: "要ります", r_masu: "いります", k_nai: "要らない", r_nai: "いらない", k_te: "要って", r_te: "いって", a: "memerlukan", grp: 10 },
  { k_kamus: "帰る", r_kamus: "かえる", k_masu: "帰ります", r_masu: "かえります", k_nai: "帰らない", r_nai: "かえらない", k_te: "帰って", r_te: "かえって", a: "pulang", grp: 10 },
  { k_kamus: "切る", r_kamus: "きる", k_masu: "切ります", r_masu: "きります", k_nai: "切らない", r_nai: "きらない", k_te: "切って", r_te: "きって", a: "memotong", grp: 10 },
  { k_kamus: "知る", r_kamus: "しる", k_masu: "知ります", r_masu: "しります", k_nai: "知らない", r_nai: "しらない", k_te: "知って", r_te: "しって", a: "mengetahui", grp: 10 },
  { k_kamus: "入る", r_kamus: "はいる", k_masu: "入ります", r_masu: "はいります", k_nai: "入らない", r_nai: "はいらない", k_te: "入って", r_te: "はいって", a: "masuk", grp: 10 }
];
const DB_Kel_2 = [
  // II-11: ~IRU (Kolom い + る)
  { k_kamus: "浴びる", r_kamus: "あびる", k_masu: "浴びます", r_masu: "あびます", k_nai: "浴びない", r_nai: "あびない", k_te: "浴びて", r_te: "あびて", a: "mandi", grp: 0 },
  { k_kamus: "起きる", r_kamus: "おきる", k_masu: "起きます", r_masu: "おきます", k_nai: "起きない", r_nai: "おきない", k_te: "起きて", r_te: "おきて", a: "bangun (tidur)", grp: 0 },
  { k_kamus: "下りる", r_kamus: "おりる", k_masu: "下ります", r_masu: "おります", k_nai: "下りない", r_nai: "おりない", k_te: "下りて", r_te: "おりて", a: "turun, keluar", grp: 0 },
  { k_kamus: "借りる", r_kamus: "かりる", k_masu: "借ります", r_masu: "かります", k_nai: "借りない", r_nai: "かりない", k_te: "借りて", r_te: "かりて", a: "meminjam", grp: 0 },
  { k_kamus: "着る", r_kamus: "きる", k_masu: "着ます", r_masu: "きます", k_nai: "着ない", r_nai: "きない", k_te: "着て", r_te: "きて", a: "memakai baju", grp: 0 },
  { k_kamus: "できる", r_kamus: "できる", k_masu: "できます", r_masu: "できます", k_nai: "できない", r_nai: "できない", k_te: "できて", r_te: "できて", a: "bisa, jadi, selesai", grp: 0 },
  { k_kamus: "見る", r_kamus: "みる", k_masu: "見ます", r_masu: "みます", k_nai: "見ない", r_nai: "みない", k_te: "見て", r_te: "みて", a: "melihat", grp: 0 },

  // II-12: ~ERU (Kolom え + る)
  { k_kamus: "開ける", r_kamus: "あける", k_masu: "開けます", r_masu: "あけます", k_nai: "開けない", r_nai: "あけない", k_te: "開けて", r_te: "あけて", a: "membuka", grp: 1 },
  { k_kamus: "あげる", r_kamus: "あげる", k_masu: "あげます", r_masu: "あげます", k_nai: "あげない", r_nai: "あげない", k_te: "あげて", r_te: "あげて", a: "memberi", grp: 1 },
  { k_kamus: "入れる", r_kamus: "いれる", k_masu: "入れます", r_masu: "いれます", k_nai: "入れない", r_nai: "いれない", k_te: "入れて", r_te: "いれて", a: "memasukkan", grp: 1 },
  { k_kamus: "生まれる", r_kamus: "うまれる", k_masu: "生まれます", r_masu: "うまれます", k_nai: "生まれない", r_nai: "うまれない", k_te: "生まれて", r_te: "うまれて", a: "lahir", grp: 1 },
  { k_kamus: "教える", r_kamus: "おしえる", k_masu: "教えます", r_masu: "おしえます", k_nai: "教えない", r_nai: "おしえない", k_te: "教えて", r_te: "おしえて", a: "mengajar", grp: 1 },
  { k_kamus: "覚える", r_kamus: "おぼえる", k_masu: "覚えます", r_masu: "おぼえます", k_nai: "覚えない", r_nai: "おぼえない", k_te: "覚えて", r_te: "おぼえて", a: "menghafal, merasa", grp: 1 },
  { k_kamus: "掛ける", r_kamus: "かける", k_masu: "掛けます", r_masu: "かけます", k_nai: "掛けない", r_nai: "かけない", k_te: "掛けて", r_te: "かけて", a: "memakai (kaca mata)", grp: 1 },
  { k_kamus: "消える", r_kamus: "きえる", k_masu: "消えます", r_masu: "きえます", k_nai: "消えない", r_nai: "きえない", k_te: "消えて", r_te: "きえて", a: "padam, lenyap", grp: 1 },
  { k_kamus: "答える", r_kamus: "こたえる", k_masu: "答えます", r_masu: "こたえます", k_nai: "答えない", r_nai: "こたえない", k_te: "答えて", r_te: "こたえて", a: "menjawab", grp: 1 },
  { k_kamus: "閉める", r_kamus: "しめる", k_masu: "閉めます", r_masu: "しめます", k_nai: "閉めない", r_nai: "しめない", k_te: "閉めて", r_te: "しめて", a: "menutup", grp: 1 },
  { k_kamus: "食べる", r_kamus: "たべる", k_masu: "食べます", r_masu: "たべます", k_nai: "食べない", r_nai: "たべない", k_te: "食べて", r_te: "たべて", a: "makan", grp: 1 },
  { k_kamus: "疲れる", r_kamus: "つかれる", k_masu: "疲れます", r_masu: "つかれます", k_nai: "疲れない", r_nai: "つかれない", k_te: "疲れて", r_te: "つかれて", a: "capek, lelah", grp: 1 },
  { k_kamus: "勤める", r_kamus: "つとめる", k_masu: "勤めます", r_masu: "つとめます", k_nai: "勤めない", r_nai: "つとめない", k_te: "勤めて", r_te: "つとめて", a: "bekerja", grp: 1 },
  { k_kamus: "出かける", r_kamus: "でかける", k_masu: "出かけます", r_masu: "でかけます", k_nai: "出かけない", r_nai: "でかけない", k_te: "出かけて", r_te: "でかけて", a: "pergi keluar", grp: 1 },
  { k_kamus: "出る", r_kamus: "でる", k_masu: "出ます", r_masu: "でます", k_nai: "出ない", r_nai: "でない", k_te: "出て", r_te: "でて", a: "keluar", grp: 1 },
  { k_kamus: "電気をつける", r_kamus: "でんきをつける", k_masu: "電気をつけます", r_masu: "でんきをつけます", k_nai: "電気をつけない", r_nai: "でんきをつけない", k_te: "電気をつけて", r_te: "でんきをつけて", a: "menyalakan listrik", grp: 1 },
  { k_kamus: "電話をかける", r_kamus: "でんわをかける", k_masu: "電話をかけます", r_masu: "でんわをかけます", k_nai: "電話をかけない", r_nai: "でんわをかけない", k_te: "電話をかけて", r_te: "でんわをかけて", a: "menelepon", grp: 1 },
  { k_kamus: "並べる", r_kamus: "ならべる", k_masu: "並べます", r_masu: "ならべます", k_nai: "並べない", r_nai: "ならべない", k_te: "並べて", r_te: "ならべて", a: "menjejerkan", grp: 1 },
  { k_kamus: "晴れる", r_kamus: "はれる", k_masu: "晴れます", r_masu: "はれます", k_nai: "晴れない", r_nai: "はれない", k_te: "晴れて", r_te: "はれて", a: "cerah", grp: 1 },
  { k_kamus: "見せる", r_kamus: "みせる", k_masu: "見せます", r_masu: "みせます", k_nai: "見せない", r_nai: "みせない", k_te: "見せて", r_te: "みせて", a: "memperlihatkan", grp: 1 },
  { k_kamus: "忘れる", r_kamus: "わすれる", k_masu: "忘れます", r_masu: "わすれます", k_nai: "忘れない", r_nai: "わすれない", k_te: "忘れて", r_te: "わすれて", a: "lupa", grp: 1 }
];
const DB_Kel_Irr = [
  // III-13: ~KURU (くる)
  { k_kamus: "来る", r_kamus: "くる", k_masu: "来ます", r_masu: "きます", k_nai: "来ない", r_nai: "こない", k_te: "来て", r_te: "きて", a: "datang", grp: 0 },

  // III-14: ~SURU (する)
  { k_kamus: "する", r_kamus: "する", k_masu: "します", r_masu: "します", k_nai: "しない", r_nai: "しない", k_te: "して", r_te: "して", a: "melakukan", grp: 1 },
  { k_kamus: "結婚する", r_kamus: "けっこんする", k_masu: "結婚します", r_masu: "けっこんします", k_nai: "結婚しない", r_nai: "けっこんしない", k_te: "結婚して", r_te: "けっこんして", a: "menikah", grp: 1 },
  { k_kamus: "コピーする", r_kamus: "コピーする", k_masu: "コピーします", r_masu: "コピーします", k_nai: "コピーしない", r_nai: "コピーしない", k_te: "コピーして", r_te: "コピーして", a: "memfotokopi", grp: 1 },
  { k_kamus: "質問する", r_kamus: "しつもんする", k_masu: "質問します", r_masu: "しつもんします", k_nai: "質問しない", r_nai: "しつもんしない", k_te: "質問して", r_te: "しつもんして", a: "bertanya, menanyakan", grp: 1 },
  { k_kamus: "洗濯する", r_kamus: "せんたくする", k_masu: "洗濯します", r_masu: "せんたくします", k_nai: "洗濯しない", r_nai: "せんたくしない", k_te: "洗濯して", r_te: "せんたくして", a: "mencuci", grp: 1 },
  { k_kamus: "掃除する", r_kamus: "そうじする", k_masu: "掃除します", r_masu: "そうじします", k_nai: "掃除しない", r_nai: "そうじしない", k_te: "掃除して", r_te: "そうじして", a: "membersihkan", grp: 1 },
  { k_kamus: "遅刻する", r_kamus: "ちこくする", k_masu: "遅刻します", r_masu: "ちこくします", k_nai: "遅刻しない", r_nai: "ちこくしない", k_te: "遅刻して", r_te: "ちこくして", a: "terlambat", grp: 1 },
  { k_kamus: "勉強する", r_kamus: "べんきょうする", k_masu: "勉強します", r_masu: "べんきょうします", k_nai: "勉強しない", r_nai: "べんきょうしない", k_te: "勉強して", r_te: "べんきょうして", a: "belajar", grp: 1 },
  { k_kamus: "料理する", r_kamus: "りょうりする", k_masu: "料理します", r_masu: "りょうりします", k_nai: "料理しない", r_nai: "りょうりしない", k_te: "料理して", r_te: "りょうりして", a: "masak", grp: 1 },
  { k_kamus: "練習する", r_kamus: "れんしゅうする", k_masu: "練習します", r_masu: "れんしゅうします", k_nai: "練習しない", r_nai: "れんしゅうしない", k_te: "練習して", r_te: "れんしゅうして", a: "berlatih", grp: 1 }
];

const Pages_K1 = [
  { title: "I-1: Akhiran ~U", narasi: "Berakhiran vokal ganda + <b>u (う)</b>. Hati-hati pada bentuk Nai, <b>u</b> berubah menjadi <b>wa</b>, bukan a.", groups: [0] },
  { title: "I-2: Akhiran ~ARU", narasi: "Berakhiran <b>aru (ある)</b>. Perubahannya: ri, ra, tte.", groups: [1] },
  { title: "I-3: Akhiran ~URU", narasi: "Berakhiran <b>uru (うる)</b>. Perubahannya: ri, ra, tte.", groups: [2] },
  { title: "I-4: Akhiran ~ORU", narasi: "Berakhiran <b>oru (おる)</b>. Perubahannya: ri, ra, tte.", groups: [3] },
  { title: "I-5: Akhiran ~TSU", narasi: "Berakhiran <b>tsu (つ)</b>. Bentuk Te-nya menjadi <b>~tte (って)</b>.", groups: [4] },
  { title: "I-6: Akhiran ~KU", narasi: "Berakhiran <b>ku (く)</b>. Bentuk Te-nya menjadi <b>~ite (いて)</b>.<br><span style='color:var(--danger);'>Pengecualian:</span> 行く (iku) menjadi <b>行って (itte)</b>.", groups: [5] },
  { title: "I-7: Akhiran ~SU", narasi: "Berakhiran <b>su (す)</b>. Bentuk Te-nya menjadi <b>~shite (して)</b>.", groups: [6] },
  { title: "I-8: Akhiran ~BU / ~NU", narasi: "Berakhiran <b>bu (ぶ)</b> atau <b>nu (ぬ)</b>. Bentuk Te-nya menjadi <b>~nde (んで)</b>.", groups: [7] },
  { title: "I-9: Akhiran ~MU", narasi: "Berakhiran <b>mu (む)</b>. Sama dengan sebelumnya, bentuk Te-nya menjadi <b>~nde (んで)</b>.", groups: [8] },
  { title: "I-10: Akhiran ~GU", narasi: "Berakhiran <b>gu (ぐ)</b>. Bentuk Te-nya menjadi <b>~ide (いで)</b>.", groups: [9] },
  { title: "Pengecualian", narasi: "Secara fisik kata-kata ini berakhiran <b>-iru</b> atau <b>-eru</b>, TAPI mereka masuk ke Kelompok 1. Perubahannya mengikuti aturan ~ru biasa (ri, ra, tte).", groups: [10] }
];
const Pages_K2 = [
  { title: "II-11: Akhiran ~IRU", narasi: "Kelompok 2 yang berakhiran <b>~iru</b> (Kolom い + る). Tinggal coret akhiran ~ru lalu tambahkan ~masu, ~nai, atau ~te.", groups: [0] },
  { title: "II-12: Akhiran ~ERU", narasi: "Kelompok 2 yang berakhiran <b>~eru</b> (Kolom え + る). Aturannya sangat mudah, coret akhiran ~ru lalu ganti dengan ~masu, ~nai, atau ~te.", groups: [1] }
];
const Pages_Irr = [
  { title: "III-13: Akhiran ~KURU", narasi: "Hanya ada 1 kata kerja murni di kelompok ini, yaitu <b>来る / Kuru</b> (datang). Perubahannya adalah pengecualian dan wajib dihafal.", groups: [0] },
  { title: "III-14: Akhiran ~SURU", narasi: "Berpusat pada kata <b>する / Suru</b> (melakukan). Banyak kata benda bisa diubah menjadi kata kerja hanya dengan menambahkan <i>~suru</i> di belakangnya (cth: benkyou = pelajaran -> benkyou suru = belajar).", groups: [1] }
];

// CONTEXT SENTENCES DICTIONARY (AUTHENTIC & 100% PURE LATIN ROMAJI)
const VERB_SENTENCES_DB = {
  "会う": {
    "kamus": {
      "jp": "駅の前で友達と会う約束があります。",
      "ro": "Eki no mae de tomodachi to au yakusoku ga arimasu.",
      "id": "Ada janji bertemu teman di depan stasiun."
    },
    "masu": {
      "jp": "明日学校で先生に会います。",
      "ro": "Ashita gakkou de sensei ni aimasu.",
      "id": "Besok saya bertemu guru di sekolah."
    },
    "nai": {
      "jp": "今日は忙しくて誰にも会わない。",
      "ro": "Kyou wa isogashikute dare ni mo awanai.",
      "id": "Hari ini sibuk jadi tidak bertemu siapa pun."
    },
    "te": {
      "jp": "友達に会って、一緒に食事をしました。",
      "ro": "Tomodachi ni atte, issho ni shokuji o shimashita.",
      "id": "Bertemu teman, lalu makan bersama."
    }
  },
  "洗う": {
    "kamus": {
      "jp": "食事の前に手を洗う。",
      "ro": "Shokuji no mae ni te o arau.",
      "id": "Mencuci tangan sebelum makan."
    },
    "masu": {
      "jp": "毎朝冷たい水で顔を洗います。",
      "ro": "Maiasa tsumetai mizu de kao o araimasu.",
      "id": "Setiap pagi mencuci muka dengan air dingin."
    },
    "nai": {
      "jp": "まだ汚れた服を洗わない。",
      "ro": "Mada yogoreta fuku o arawanai.",
      "id": "Belum mencuci pakaian yang kotor."
    },
    "te": {
      "jp": "野菜をきれいに洗ってください。",
      "ro": "Yasai o kirei ni aratte kudasai.",
      "id": "Tolong cuci sayuran sampai bersih."
    }
  },
  "言う": {
    "kamus": {
      "jp": "先生に本当のことを言う。",
      "ro": "Sensei ni hontou no koto o iu.",
      "id": "Mengatakan hal yang sebenarnya kepada guru."
    },
    "masu": {
      "jp": "日本語で「ありがとう」と言います。",
      "ro": "Nihongo de \"arigatou\" to iimasu.",
      "id": "Dalam bahasa Jepang berkata \"arigatou\"."
    },
    "nai": {
      "jp": "友達の悪口を言わないでください。",
      "ro": "Tomodachi no warukuchi o iwanaide kudasai.",
      "id": "Tolong jangan membicarakan keburukan teman."
    },
    "te": {
      "jp": "もう一度ゆっくり言ってください。",
      "ro": "Mou ichido yukkuri itte kudasai.",
      "id": "Tolong katakan sekali lagi dengan pelan."
    }
  },
  "歌う": {
    "kamus": {
      "jp": "カラオケで日本の歌を歌う。",
      "ro": "Karaoke de Nihon no uta o utau.",
      "id": "Menyanyikan lagu Jepang di karaoke."
    },
    "masu": {
      "jp": "みんなで楽しく歌います。",
      "ro": "Minna de tanoshiku utaimasu.",
      "id": "Bernyanyi bersama dengan riang."
    },
    "nai": {
      "jp": "人前ではあまり歌わない。",
      "ro": "Hitomae de wa amari utawanai.",
      "id": "Tidak begitu suka bernyanyi di depan orang."
    },
    "te": {
      "jp": "ギターに合わせて歌ってください。",
      "ro": "Gitaa ni awasete utatte kudasai.",
      "id": "Tolong bernyanyi diiringi gitar."
    }
  },
  "買う": {
    "kamus": {
      "jp": "新しい靴を買う予定です。",
      "ro": "Atarashii kutsu o kau yotei desu.",
      "id": "Rencana membeli sepatu baru."
    },
    "masu": {
      "jp": "スーパーでおいしい果物を買います。",
      "ro": "Suupaa de oishii kudamono o kaimasu.",
      "id": "Membeli buah yang lezat di supermarket."
    },
    "nai": {
      "jp": "高すぎる物は買わない。",
      "ro": "Takasugiru mono wa kawanai.",
      "id": "Tidak membeli barang yang terlalu mahal."
    },
    "te": {
      "jp": "切符を買って電車に乗りました。",
      "ro": "Kippu o katte densha ni norimashita.",
      "id": "Membeli tiket lalu naik kereta."
    }
  },
  "吸う": {
    "kamus": {
      "jp": "たばこを吸うのは体に悪いです。",
      "ro": "Tabako o suu no wa karada ni warui desu.",
      "id": "Merokok itu buruk bagi tubuh."
    },
    "masu": {
      "jp": "朝の新鮮な空気を吸います。",
      "ro": "Asa no shinsen na kuuki o suimasu.",
      "id": "Menghirup udara segar di pagi hari."
    },
    "nai": {
      "jp": "この部屋でたばこを吸わないでください。",
      "ro": "Kono heya de tabako o suwanaide kudasai.",
      "id": "Tolong jangan merokok di ruangan ini."
    },
    "te": {
      "jp": "深呼吸して息を吸ってください。",
      "ro": "Shinkokyuu shite iki o sutte kudasai.",
      "id": "Tarik napas dalam-dalam dan hirup udaranya."
    }
  },
  "違う": {
    "kamus": {
      "jp": "答えが違うようです。",
      "ro": "Kotae ga chigau you desu.",
      "id": "Sepertinya jawabannya berbeda/keliru."
    },
    "masu": {
      "jp": "この二つの単語は意味が違います。",
      "ro": "Kono futatsu no tango wa imi ga chigaimasu.",
      "id": "Dua kosakata ini artinya berbeda."
    },
    "nai": {
      "jp": "私の考えと違わない。",
      "ro": "Watashi no kangae to chigawanai.",
      "id": "Tidak berbeda dari pemikiran saya."
    },
    "te": {
      "jp": "写真と実物が違っていて驚きました。",
      "ro": "Shashin to jitsubutsu ga chigatte ite odorokimashita.",
      "id": "Foto dan aslinya berbeda sehingga terkejut."
    }
  },
  "使う": {
    "kamus": {
      "jp": "パソコンを使う仕事です。",
      "ro": "Pasokon o tsukau shigoto desu.",
      "id": "Pekerjaan yang menggunakan komputer."
    },
    "masu": {
      "jp": "授業で辞書を使います。",
      "ro": "Jugyou de jisho o tsukaimasu.",
      "id": "Menggunakan kamus di dalam kelas."
    },
    "nai": {
      "jp": "プラスチックの袋はあまり使わない。",
      "ro": "Purasuchikku no fukuro wa amari tsukawanai.",
      "id": "Tidak banyak memakai kantong plastik."
    },
    "te": {
      "jp": "このペンを使って書いてください。",
      "ro": "Kono pen o tsukatte kaite kudasai.",
      "id": "Tolong tulis menggunakan pulpen ini."
    }
  },
  "習う": {
    "kamus": {
      "jp": "先生から生け花を習う。",
      "ro": "Sensei kara ikebana o narau.",
      "id": "Belajar ikebana dari guru."
    },
    "masu": {
      "jp": "毎週火曜日に日本語を習います。",
      "ro": "Maishuu kayoubi ni Nihongo o naraimasu.",
      "id": "Setiap hari Selasa belajar bahasa Jepang."
    },
    "nai": {
      "jp": "まだこの文法を習わない。",
      "ro": "Mada kono bunpou o narawanai.",
      "id": "Belum mempelajari pola kalimat ini."
    },
    "te": {
      "jp": "料理を習って家族に作りました。",
      "ro": "Ryouri o naratte kazoku ni tsukurimashita.",
      "id": "Belajar memasak lalu memasakkannya untuk keluarga."
    }
  },
  "ある": {
    "kamus": {
      "jp": "机の上に本がある。",
      "ro": "Tsukue no ue ni hon ga aru.",
      "id": "Ada buku di atas meja."
    },
    "masu": {
      "jp": "駅の近くに郵便局があります。",
      "ro": "Eki no chikaku ni yuubinkyoku ga arimasu.",
      "id": "Ada kantor pos di dekat stasiun."
    },
    "nai": {
      "jp": "今日は宿題がない。",
      "ro": "Kyou wa shukudai ga nai.",
      "id": "Hari ini tidak ada pekerjaan rumah."
    },
    "te": {
      "jp": "部屋にテレビがあって便利です。",
      "ro": "Heya ni terebi ga atte benri desu.",
      "id": "Di kamar ada televisi sehingga praktis."
    }
  },
  "終わる": {
    "kamus": {
      "jp": "会議が終わる時間は四時です。",
      "ro": "Kaigi ga owaru jikan wa yoji desu.",
      "id": "Waktu rapat berakhir adalah jam 4."
    },
    "masu": {
      "jp": "今日の仕事はこれで終わります。",
      "ro": "Kyou no shigoto wa kore de owarimasu.",
      "id": "Pekerjaan hari ini selesai dengan ini."
    },
    "nai": {
      "jp": "宿題がまだ終わらない。",
      "ro": "Shukudai ga mada owaranai.",
      "id": "PR saya belum selesai."
    },
    "te": {
      "jp": "授業が終わってから図書館へ行きました。",
      "ro": "Jugyou ga owatte kara toshokan e ikimashita.",
      "id": "Setelah kelas selesai, pergi ke perpustakaan."
    }
  },
  "かかる": {
    "kamus": {
      "jp": "空港まで二時間かかる。",
      "ro": "Kuukou made nijikan kakaru.",
      "id": "Memerlukan waktu dua jam ke bandara."
    },
    "masu": {
      "jp": "東京まで新幹線で一時間かかります。",
      "ro": "Toukyou made shinkansen de ichijikan kakarimasu.",
      "id": "Memerlukan waktu satu jam ke Tokyo naik Shinkansen."
    },
    "nai": {
      "jp": "このアプリはお金がかからない。",
      "ro": "Kono apuri wa okane ga kakaranai.",
      "id": "Aplikasi ini tidak memakan biaya."
    },
    "te": {
      "jp": "時間がかかって疲れました。",
      "ro": "Jikan ga kakatte tsukaremashita.",
      "id": "Menghabiskan waktu dan melelahkan."
    }
  },
  "困る": {
    "kamus": {
      "jp": "道に迷って困る。",
      "ro": "Michi ni mayotte komaru.",
      "id": "Tersesat di jalan dan kebingungan."
    },
    "masu": {
      "jp": "財布を落として困ります。",
      "ro": "Saifu o otoshite komarimasu.",
      "id": "Dompet jatuh/hilang dan saya kesulitan."
    },
    "nai": {
      "jp": "お金に困らない生活を送りたい。",
      "ro": "Okane ni komaranai seikatsu o okuritai.",
      "id": "Ingin menjalani hidup tanpa kesulitan uang."
    },
    "te": {
      "jp": "傘がなくて困っています。",
      "ro": "Kasa ga nakute komatte imasu.",
      "id": "Tidak ada payung jadi sedang kesulitan."
    }
  },
  "閉まる": {
    "kamus": {
      "jp": "ドアが自動で閉まる。",
      "ro": "Doa ga jidou de shimaru.",
      "id": "Pintu tertutup secara otomatis."
    },
    "masu": {
      "jp": "デパートは夜八時に閉まります。",
      "ro": "Depaato wa yoru hachiji ni shimarimasu.",
      "id": "Toserba tutup pada jam 8 malam."
    },
    "nai": {
      "jp": "窓がしっかり閉まらない。",
      "ro": "Mado ga shikkari shimaranai.",
      "id": "Jendela tidak tertutup rapat."
    },
    "te": {
      "jp": "店が閉まっていて買えませんでした。",
      "ro": "Mise ga shimatte ite kaemasendeshita.",
      "id": "Tokonya tutup jadi tidak bisa beli."
    }
  },
  "座る": {
    "kamus": {
      "jp": "ベンチに座る。",
      "ro": "Benchi ni suwaru.",
      "id": "Duduk di bangku taman."
    },
    "masu": {
      "jp": "どうぞこちらの椅子に座ります。",
      "ro": "Douzo kochira no isu ni suwarimasu.",
      "id": "Silakan duduk di kursi sebelah sini."
    },
    "nai": {
      "jp": "床には座らないでください。",
      "ro": "Yuka ni wa suwaranaide kudasai.",
      "id": "Tolong jangan duduk di lantai."
    },
    "te": {
      "jp": "椅子に座って少し休んでください。",
      "ro": "Isu ni suwatte sukoshi yasunde kudasai.",
      "id": "Silakan duduk di kursi dan istirahat sebentar."
    }
  },
  "止まる": {
    "kamus": {
      "jp": "赤信号で車が止まる。",
      "ro": "Akashingou de kuruma ga tomaru.",
      "id": "Mobil berhenti di lampu merah."
    },
    "masu": {
      "jp": "電車がホームに止まります。",
      "ro": "Densha ga hoomu ni tomarimasu.",
      "id": "Kereta berhenti di peron."
    },
    "nai": {
      "jp": "雨がなかなか止まらない。",
      "ro": "Ame ga nakanaka tomaranai.",
      "id": "Hujan tidak kunjung reda/berhenti."
    },
    "te": {
      "jp": "時計が止まって動かない。",
      "ro": "Tokei ga tomatte ugokanai.",
      "id": "Jam berhenti dan tidak berdetak."
    }
  },
  "鳴る": {
    "kamus": {
      "jp": "電話のベルが鳴る。",
      "ro": "Denwa no beru ga naru.",
      "id": "Bel telepon berbunyi."
    },
    "masu": {
      "jp": "毎朝六時に目覚まし時計が鳴ります。",
      "ro": "Maiasa rokuji ni mezamashidokei ga narimasu.",
      "id": "Jam weker berdering setiap jam 6 pagi."
    },
    "nai": {
      "jp": "チャイムが鳴らない。",
      "ro": "Chaimu ga naranai.",
      "id": "Loncengnya tidak berbunyi."
    },
    "te": {
      "jp": "お腹が鳴って恥ずかしかったです。",
      "ro": "Onaka ga natte hazukashikatta desu.",
      "id": "Perut berbunyi dan merasa malu."
    }
  },
  "始まる": {
    "kamus": {
      "jp": "映画が始まる時間です。",
      "ro": "Eiga ga hajimaru jikan desu.",
      "id": "Waktunya film dimulai."
    },
    "masu": {
      "jp": "授業は朝九時に始まります。",
      "ro": "Jugyou wa asa kuji ni hajimarimasu.",
      "id": "Kelas dimulai jam 9 pagi."
    },
    "nai": {
      "jp": "試合がなかなか始まらない。",
      "ro": "Shiai ga nakanaka hajimaranai.",
      "id": "Pertandingan tidak kunjung dimulai."
    },
    "te": {
      "jp": "春が始まって暖かくなりました。",
      "ro": "Haru ga hajimatte atatakaku narimashita.",
      "id": "Musim semi dimulai dan cuaca menjadi hangat."
    }
  },
  "張る": {
    "kamus": {
      "jp": "封筒に切手を張る。",
      "ro": "Fuutou ni kitte o haru.",
      "id": "Menempelkan perangko pada amplop."
    },
    "masu": {
      "jp": "壁にポスターを張ります。",
      "ro": "Kabe ni posutaa o harimasu.",
      "id": "Memasang poster di dinding."
    },
    "nai": {
      "jp": "ここに紙を張らないでください。",
      "ro": "Koko ni kami o haranaide kudasai.",
      "id": "Tolong jangan menempel kertas di sini."
    },
    "te": {
      "jp": "写真を張って提出してください。",
      "ro": "Shashin o hatte teishutsu shite kudasai.",
      "id": "Tolong tempelkan foto lalu kumpulkan."
    }
  },
  "曲がる": {
    "kamus": {
      "jp": "次の角を右に曲がる。",
      "ro": "Tsugi no kado o migi ni magaru.",
      "id": "Belok ke kanan di sudut berikutnya."
    },
    "masu": {
      "jp": "交差点を左に曲がります。",
      "ro": "Kousaten o hidari ni magarimasu.",
      "id": "Belok ke kiri di persimpangan jalan."
    },
    "nai": {
      "jp": "まっすぐ進んで曲がらないでください。",
      "ro": "Massugu susunde magaranaide kudasai.",
      "id": "Lurus saja dan jangan berbelok."
    },
    "te": {
      "jp": "角を曲がって少し歩くと駅があります。",
      "ro": "Kado o magatte sukoshi aruku to eki ga arimasu.",
      "id": "Belok di sudut jalan lalu jalan sedikit ada stasiun."
    }
  },
  "やる": {
    "kamus": {
      "jp": "今から宿題をやる。",
      "ro": "Ima kara shukudai o yaru.",
      "id": "Mulai sekarang mengerjakan PR."
    },
    "masu": {
      "jp": "毎日筋トレをやります。",
      "ro": "Mainichi kintore o yarimasu.",
      "id": "Setiap hari melakukan latihan otot."
    },
    "nai": {
      "jp": "ゲームばかりやらないでください。",
      "ro": "Geemu bakari yaranaide kudasai.",
      "id": "Tolong jangan main game terus-menerus."
    },
    "te": {
      "jp": "宿題をやってから遊びに行きました。",
      "ro": "Shukudai o yatte kara asobi ni ikimashita.",
      "id": "Mengerjakan PR dulu baru pergi main."
    }
  },
  "わかる": {
    "kamus": {
      "jp": "意味がよくわかる。",
      "ro": "Imi ga yoku wakaru.",
      "id": "Mengerti artinya dengan baik."
    },
    "masu": {
      "jp": "日本語の文法がわかります。",
      "ro": "Nihongo no bunpou ga wakarimasu.",
      "id": "Saya mengerti tata bahasa Jepang."
    },
    "nai": {
      "jp": "この問題の答えがわからない。",
      "ro": "Kono mondai no kotae ga wakaranai.",
      "id": "Saya tidak mengerti jawaban soal ini."
    },
    "te": {
      "jp": "先生の説明を聞いてよくわかって安心しました。",
      "ro": "Sensei no setsumei o kiite yoku wakatte anshin shimashita.",
      "id": "Mendengar penjelasan guru menjadi paham dan lega."
    }
  },
  "渡る": {
    "kamus": {
      "jp": "信号を見て横断歩道を渡る。",
      "ro": "Shingou o mite oudanhodou o wataru.",
      "id": "Melihat lampu lalu lintas lalu menyeberang di zebra cross."
    },
    "masu": {
      "jp": "気をつけて橋を渡ります。",
      "ro": "Ki o tsukete hashi o watarimasu.",
      "id": "Menyeberangi jembatan dengan hati-hati."
    },
    "nai": {
      "jp": "赤信号の時は渡らないでください。",
      "ro": "Akashingou no toki wa wataranaide kudasai.",
      "id": "Saat lampu merah tolong jangan menyeberang."
    },
    "te": {
      "jp": "橋を渡って右に行くと公園です。",
      "ro": "Hashi o watatte migi ni iku to kouen desu.",
      "id": "Menyeberangi jembatan lalu ke kanan adalah taman."
    }
  },
  "売る": {
    "kamus": {
      "jp": "店で新鮮な魚を売る。",
      "ro": "Mise de shinsen na sakana o uru.",
      "id": "Menjual ikan segar di toko."
    },
    "masu": {
      "jp": "この店ではおいしいパンを売ります。",
      "ro": "Kono mise de wa oishii pan o urimasu.",
      "id": "Toko ini menjual roti yang lezat."
    },
    "nai": {
      "jp": "古い本は売らない。",
      "ro": "Furui hon wa uranai.",
      "id": "Tidak menjual buku lama."
    },
    "te": {
      "jp": "車を売って新しいバイクを買いました。",
      "ro": "Kuruma o utte atarashii baiku o kaimashita.",
      "id": "Menjual mobil lalu membeli motor baru."
    }
  },
  "送る": {
    "kamus": {
      "jp": "家族に手紙を送る。",
      "ro": "Kazoku ni tegami o okuru.",
      "id": "Mengirim surat kepada keluarga."
    },
    "masu": {
      "jp": "友達にプレゼントを送ります。",
      "ro": "Tomodachi ni purezento o okurimasu.",
      "id": "Mengirim kado kepada teman."
    },
    "nai": {
      "jp": "メールをまだ送らない。",
      "ro": "Meeru o mada okuranai.",
      "id": "Belum mengirim email."
    },
    "te": {
      "jp": "荷物を送って確認の電話をしました。",
      "ro": "Nimotsu o okutte kakunin no denwa o shimashita.",
      "id": "Mengirim paket lalu menelepon untuk memastikan."
    }
  },
  "作る": {
    "kamus": {
      "jp": "晩ご飯を作る予定です。",
      "ro": "Bangohan o tsukuru yotei desu.",
      "id": "Rencana membuat makan malam."
    },
    "masu": {
      "jp": "休日にケーキを作ります。",
      "ro": "Kyuujitsu ni keeki o tsukurimasu.",
      "id": "Membuat kue di hari libur."
    },
    "nai": {
      "jp": "今日は疲れたので料理を作らない。",
      "ro": "Kyou wa tsukareta node ryouri o tsukuranai.",
      "id": "Hari ini lelah jadi tidak memasak makanan."
    },
    "te": {
      "jp": "おいしい料理を作って友達を呼びました。",
      "ro": "Oishii ryouri o tsukutte tomodachi o yobimashita.",
      "id": "Membuat masakan lezat lalu mengundang teman."
    }
  },
  "かぶる": {
    "kamus": {
      "jp": "日差しが強いので帽子をかぶる。",
      "ro": "Hizashi ga tsuyoi node boushi o kaburu.",
      "id": "Mengenakan topi karena terik matahari kuat."
    },
    "masu": {
      "jp": "寒い日はニット帽をかぶります。",
      "ro": "Samui hi wa nittobou o kaburimasu.",
      "id": "Memakai topi rajut di hari dingin."
    },
    "nai": {
      "jp": "部屋の中では帽子をかぶらないでください。",
      "ro": "Heya no naka de wa boushi o kaburanaide kudasai.",
      "id": "Tolong jangan mengenakan topi di dalam ruangan."
    },
    "te": {
      "jp": "ヘルメットをかぶってバイクに乗ります。",
      "ro": "Herumetto o kabutte baiku ni norimasu.",
      "id": "Mengenakan helm lalu naik motor."
    }
  },
  "降る": {
    "kamus": {
      "jp": "午後から雨が降る予報です。",
      "ro": "Gogo kara ame ga furu yohou desu.",
      "id": "Prakiraan cuaca hujan akan turun mulai siang."
    },
    "masu": {
      "jp": "冬の北海道は雪がたくさん降ります。",
      "ro": "Fuyu no Hokkaidou wa yuki ga takusan furimasu.",
      "id": "Musim dingin di Hokkaido banyak turun salju."
    },
    "nai": {
      "jp": "今日は雨が降らないでほしい。",
      "ro": "Kyou wa ame ga furanaide hoshii.",
      "id": "Semoga hari ini tidak turun hujan."
    },
    "te": {
      "jp": "雨が降って道が滑りやすくなっています。",
      "ro": "Ame ga futte michi ga suberiyasuku natte imasu.",
      "id": "Turun hujan dan jalanan menjadi licin."
    }
  },
  "曇る": {
    "kamus": {
      "jp": "午後から空が曇るようです。",
      "ro": "Gogo kara sora ga kumoru you desu.",
      "id": "Sepertinya langit akan berawan mulai siang."
    },
    "masu": {
      "jp": "山の上はよく曇ります。",
      "ro": "Yama no ue wa yoku kumorimasu.",
      "id": "Di atas gunung sering mendung/berawan."
    },
    "nai": {
      "jp": "今日は一日中曇らないで晴れていました。",
      "ro": "Kyou wa ichinichijuu kumoranaide harete imashita.",
      "id": "Hari ini seharian tidak mendung dan cerah."
    },
    "te": {
      "jp": "空が曇って暗くなってきました。",
      "ro": "Sora ga kumotte kuraku natte kimashita.",
      "id": "Langit berawan dan mulai gelap."
    }
  },
  "取る": {
    "kamus": {
      "jp": "棚の上にある箱を取る。",
      "ro": "Tana no ue ni aru hako o toru.",
      "id": "Mengambil kotak yang ada di atas rak."
    },
    "masu": {
      "jp": "塩を取りますので少々お待ちください。",
      "ro": "Shio o torimasu node shoushou omachi kudasai.",
      "id": "Saya ambilkan garam, mohon tunggu sebentar."
    },
    "nai": {
      "jp": "人の物を勝手に取らないでください。",
      "ro": "Hito no mono o katte ni toranaide kudasai.",
      "id": "Tolong jangan mengambil barang orang tanpa izin."
    },
    "te": {
      "jp": "パスポートを取って準備をしました。",
      "ro": "Pasupooto o totte junbi o shimashita.",
      "id": "Mengambil paspor lalu bersiap-siap."
    }
  },
  "登る": {
    "kamus": {
      "jp": "夏休みに富士山に登る予定です。",
      "ro": "Natsuyasumi ni Fujisan ni noboru yotei desu.",
      "id": "Rencana mendaki Gunung Fuji saat libur musim panas."
    },
    "masu": {
      "jp": "友達と一緒に山に登ります。",
      "ro": "Tomodachi to issho ni yama ni noborimasu.",
      "id": "Mendaki gunung bersama teman."
    },
    "nai": {
      "jp": "天気が悪い日は山に登らない。",
      "ro": "Tenki ga warui hi wa yama ni noboranai.",
      "id": "Tidak mendaki gunung pada hari cuaca buruk."
    },
    "te": {
      "jp": "階段を登って二階へ行きました。",
      "ro": "Kaidan o nobotte nikai e ikimashita.",
      "id": "Menaiki tangga lalu pergi ke lantai dua."
    }
  },
  "乗る": {
    "kamus": {
      "jp": "朝八時の電車に乗る。",
      "ro": "Asa hachiji no densha ni noru.",
      "id": "Naik kereta jam 8 pagi."
    },
    "masu": {
      "jp": "毎日バスに乗って通勤します。",
      "ro": "Mainichi basu ni notte tsuukin shimasu.",
      "id": "Setiap hari naik bus untuk pergi kerja."
    },
    "nai": {
      "jp": "お酒を飲んだら車に乗らないでください。",
      "ro": "Osake o nondara kuruma ni noranaide kudasai.",
      "id": "Jika minum alkohol tolong jangan menyetir mobil."
    },
    "te": {
      "jp": "自転車に乗ってスーパーへ行きました。",
      "ro": "Jitensha ni notte suupaa e ikimashita.",
      "id": "Naik sepeda lalu pergi ke supermarket."
    }
  },
  "立つ": {
    "kamus": {
      "jp": "席から立ち上がる。",
      "ro": "Seki kara tachiagaru.",
      "id": "Bangkit berdiri dari kursi."
    },
    "masu": {
      "jp": "駅のホームで電車を待ちながら立ちます。",
      "ro": "Eki no hoomu de densha o machinagara tachimasu.",
      "id": "Berdiri di peron stasiun sambil menunggu kereta."
    },
    "nai": {
      "jp": "危ないですからここに立たないでください。",
      "ro": "Abunai desu kara koko ni tatanaide kudasai.",
      "id": "Karena berbahaya tolong jangan berdiri di sini."
    },
    "te": {
      "jp": "立って挨拶をしてください。",
      "ro": "Tatte aisatsu o shite kudasai.",
      "id": "Silakan berdiri dan berikan salam."
    }
  },
  "待つ": {
    "kamus": {
      "jp": "駅の改札で友達を待つ。",
      "ro": "Eki no kaisatsu de tomodachi o matsu.",
      "id": "Menunggu teman di gerbang tiket stasiun."
    },
    "masu": {
      "jp": "ロビーで座って待ちます。",
      "ro": "Robii de suwatte machimasu.",
      "id": "Menunggu sambil duduk di lobi."
    },
    "nai": {
      "jp": "寒いですから外で待たないでください。",
      "ro": "Samui desu kara soto de matanaide kudasai.",
      "id": "Karena dingin tolong jangan menunggu di luar."
    },
    "te": {
      "jp": "少々お待ちください。",
      "ro": "Shoushou omachi kudasai.",
      "id": "Tolong tunggu sebentar."
    }
  },
  "持つ": {
    "kamus": {
      "jp": "重い荷物を持つ。",
      "ro": "Omoi nimotsu o motsu.",
      "id": "Membawa barang yang berat."
    },
    "masu": {
      "jp": "私はスマートフォンを持っています。",
      "ro": "Watashi wa sumaatofon o motte imasu.",
      "id": "Saya mempunyai smartphone."
    },
    "nai": {
      "jp": "現金を持たないで出かけました。",
      "ro": "Genkin o motanaide dekakemashita.",
      "id": "Pergi keluar tanpa membawa uang tunai."
    },
    "te": {
      "jp": "荷物を持ってあげましょうか。",
      "ro": "Nimotsu o motte agemashou ka.",
      "id": "Bolehkah saya bawakan barang bawaanmu?"
    }
  },
  "開く": {
    "kamus": {
      "jp": "ドアが自然に開く。",
      "ro": "Doa ga shizen ni aku.",
      "id": "Pintunya terbuka dengan sendirinya."
    },
    "masu": {
      "jp": "銀行は朝九時に開きます。",
      "ro": "Ginkou wa asa kuji ni akimasu.",
      "id": "Bank buka jam 9 pagi."
    },
    "nai": {
      "jp": "鍵がないのでドアが開かない。",
      "ro": "Kagi ga nai node doa ga akanai.",
      "id": "Karena tidak ada kunci pintunya tidak terbuka."
    },
    "te": {
      "jp": "窓が開いていて涼しい風が入ります。",
      "ro": "Mado ga aite ite suzushii kaze ga hairimasu.",
      "id": "Jendela terbuka dan angin sejuk masuk."
    }
  },
  "歩く": {
    "kamus": {
      "jp": "毎朝健康のために歩く。",
      "ro": "Maiasa kenkou no tame ni aruku.",
      "id": "Setiap pagi berjalan kaki demi kesehatan."
    },
    "masu": {
      "jp": "駅から家まで歩きます。",
      "ro": "Eki kara ie made arukimasu.",
      "id": "Berjalan kaki dari stasiun ke rumah."
    },
    "nai": {
      "jp": "疲れたのでもう歩かない。",
      "ro": "Tsukareta node mou arukanai.",
      "id": "Karena lelah sudah tidak mau berjalan lagi."
    },
    "te": {
      "jp": "公園をゆっくり歩いて気分がいいです。",
      "ro": "Kouen o yukkuri aruite kibun ga ii desu.",
      "id": "Berjalan santai di taman terasa menyenangkan."
    }
  },
  "行く": {
    "kamus": {
      "jp": "来年日本へ行く予定です。",
      "ro": "Rainen Nihon e iku yotei desu.",
      "id": "Rencana pergi ke Jepang tahun depan."
    },
    "masu": {
      "jp": "毎朝八時に学校へ行きます。",
      "ro": "Maiasa hachiji ni gakkou e ikimasu.",
      "id": "Setiap pagi jam 8 pergi ke sekolah."
    },
    "nai": {
      "jp": "雨だからどこへも行かない。",
      "ro": "Ame dakara doko e mo ikanai.",
      "id": "Karena hujan tidak pergi ke mana-mana."
    },
    "te": {
      "jp": "スーパーへ行って買い物をしました。",
      "ro": "Suupaa e itte kaimono o shimashita.",
      "id": "Pergi ke supermarket lalu berbelanja."
    }
  },
  "置く": {
    "kamus": {
      "jp": "机の上に鍵を置く。",
      "ro": "Tsukue no ue ni kagi o oku.",
      "id": "Menaruh kunci di atas meja."
    },
    "masu": {
      "jp": "本棚に辞書を置きます。",
      "ro": "Hondana ni jisho o okimasu.",
      "id": "Menaruh kamus di rak buku."
    },
    "nai": {
      "jp": "通路に物を置かないでください。",
      "ro": "Tsuuro ni mono o okanaide kudasai.",
      "id": "Tolong jangan menaruh barang di lorong jalan."
    },
    "te": {
      "jp": "荷物をここに置いて休んでください。",
      "ro": "Nimotsu o koko ni oite yasunde kudasai.",
      "id": "Tolong taruh barang di sini dan beristirahatlah."
    }
  },
  "書く": {
    "kamus": {
      "jp": "手紙を書いて送る。",
      "ro": "Tegami o kaite okuru.",
      "id": "Menulis surat lalu mengirimkannya."
    },
    "masu": {
      "jp": "ノートに新しい漢字を書きます。",
      "ro": "Nooto ni atarashii kanji o kakimasu.",
      "id": "Menulis kanji baru di buku catatan."
    },
    "nai": {
      "jp": "答えをまだ書かない。",
      "ro": "Kotae o mada kakanai.",
      "id": "Belum menulis jawabannya."
    },
    "te": {
      "jp": "ここにお名前と住所を書いてください。",
      "ro": "Koko ni onamae to juusho o kaite kudasai.",
      "id": "Tolong tulis nama dan alamat Anda di sini."
    }
  },
  "聞く": {
    "kamus": {
      "jp": "部屋で音楽を聞くのが好きです。",
      "ro": "Heya de ongaku o kiku no ga suki desu.",
      "id": "Suka mendengarkan musik di kamar."
    },
    "masu": {
      "jp": "毎朝ラジオニュースを聞きます。",
      "ro": "Maiasa rajio nyuusu o kikimasu.",
      "id": "Setiap pagi mendengarkan berita radio."
    },
    "nai": {
      "jp": "人のアドバイスを聞かないのはよくないです。",
      "ro": "Hito no adobaisu o kikanai no wa yoku nai desu.",
      "id": "Tidak mendengarkan saran orang lain itu tidak baik."
    },
    "te": {
      "jp": "先生に質問を聞いて解決しました。",
      "ro": "Sensei ni shitsumon o kiite kaiketsu shimashita.",
      "id": "Bertanya kepada guru lalu masalah terselesaikan."
    }
  },
  "咲く": {
    "kamus": {
      "jp": "春に桜の花が咲く。",
      "ro": "Haru ni sakura no hana ga saku.",
      "id": "Bunga sakura mekar saat musim semi."
    },
    "masu": {
      "jp": "庭にきれいなチューリップが咲きます。",
      "ro": "Niwa ni kirei na chuurippu ga sakimasu.",
      "id": "Bunga tulip yang indah mekar di halaman."
    },
    "nai": {
      "jp": "日当たりが悪いと花が咲かない。",
      "ro": "Hiatari ga warui to hana ga sakanai.",
      "id": "Jika kurang sinar matahari bunga tidak akan mekar."
    },
    "te": {
      "jp": "花がたくさん咲いてとても美しいです。",
      "ro": "Hana ga takusan saite totemo utsukushii desu.",
      "id": "Bunga bermekaran banyak dan sangat indah."
    }
  },
  "着く": {
    "kamus": {
      "jp": "夕方五時に東京に着く予定です。",
      "ro": "Yuugata goji ni Toukyou ni tsuku yotei desu.",
      "id": "Rencana tiba di Tokyo jam 5 sore."
    },
    "masu": {
      "jp": "電車はあと十分で駅に着きます。",
      "ro": "Densha wa ato juppun de eki ni tsukimasu.",
      "id": "Kereta akan tiba di stasiun 10 menit lagi."
    },
    "nai": {
      "jp": "バスが遅れてなかなか着かない。",
      "ro": "Basu ga okurete nakanaka tsukanai.",
      "id": "Bus terlambat dan tidak kunjung tiba."
    },
    "te": {
      "jp": "ホテルに着いてシャワーを浴びました。",
      "ro": "Hoteru ni tsuite shawaa o abimashita.",
      "id": "Tiba di hotel lalu mandi shower."
    }
  },
  "鳴く": {
    "kamus": {
      "jp": "木の上で鳥が鳴く。",
      "ro": "Ki no ue ni tori ga naku.",
      "id": "Burung berkicau di atas pohon."
    },
    "masu": {
      "jp": "朝になると庭で鳥が鳴きます。",
      "ro": "Asa ni naru to niwa de tori ga nakimasu.",
      "id": "Saat pagi tiba burung berkicau di halaman."
    },
    "nai": {
      "jp": "この犬は夜はあまり鳴かない。",
      "ro": "Kono inu wa yoru wa amari nakanai.",
      "id": "Anjing ini jarang bersuara/menggonggong saat malam."
    },
    "te": {
      "jp": "子猫が可愛く鳴いて寄ってきました。",
      "ro": "Koneko ga kawaiku naite yotte kimashita.",
      "id": "Anak kucing mengeong lucu dan mendekat."
    }
  },
  "履く": {
    "kamus": {
      "jp": "新しいスニーカーを履く。",
      "ro": "Atarashii suniikaa o haku.",
      "id": "Memakai sepatu kets baru."
    },
    "masu": {
      "jp": "雨の日は長靴を履きます。",
      "ro": "Ame no hi wa nagagutsu o hakimasu.",
      "id": "Memakai sepatu bot di hari hujan."
    },
    "nai": {
      "jp": "家の中では靴を履かないでください。",
      "ro": "Ie no naka de wa kutsu o hakanaide kudasai.",
      "id": "Tolong jangan memakai sepatu di dalam rumah."
    },
    "te": {
      "jp": "暖かい靴下を履いて寝ます。",
      "ro": "Atatakai kutsushita o haite nemasu.",
      "id": "Memakai kaus kaki hangat lalu tidur."
    }
  },
  "働く": {
    "kamus": {
      "jp": "日本の会社で働くのが夢です。",
      "ro": "Nihon no kaisha de hataraku no ga yume desu.",
      "id": "Bekerja di perusahaan Jepang adalah impian saya."
    },
    "masu": {
      "jp": "月曜日から金曜日まで働きます。",
      "ro": "Getsuyoubi kara kinyoubi made hatarakimasu.",
      "id": "Bekerja dari hari Senin sampai Jumat."
    },
    "nai": {
      "jp": "日曜日は会社で働かない。",
      "ro": "Nichiyoubi wa kaisha de hatarakanai.",
      "id": "Hari Minggu tidak bekerja di kantor."
    },
    "te": {
      "jp": "一生懸命働いて貯金をしています。",
      "ro": "Isshoukenmei hataraite chokin o shite imasu.",
      "id": "Bekerja keras lalu menabung."
    }
  },
  "引く": {
    "kamus": {
      "jp": "ドアを押さずに引く。",
      "ro": "Doa o osazu ni hiku.",
      "id": "Menarik pintu tanpa mendorongnya."
    },
    "masu": {
      "jp": "重いカーテンを引きます。",
      "ro": "Omoi kaaten o hikimasu.",
      "id": "Menarik tirai yang berat."
    },
    "nai": {
      "jp": "このロープを強く引かないでください。",
      "ro": "Kono roopu o tsuyoku hikanaide kudasai.",
      "id": "Tolong jangan menarik tali ini terlalu kuat."
    },
    "te": {
      "jp": "辞書を引いて意味を調べました。",
      "ro": "Jisho o hiite imi o shirabemashita.",
      "id": "Membuka kamus lalu mencari artinya."
    }
  },
  "弾く": {
    "kamus": {
      "jp": "暇な時にピアノを弾く。",
      "ro": "Hima na toki ni piano o hiku.",
      "id": "Memainkan piano saat waktu senggang."
    },
    "masu": {
      "jp": "姉は上手にギターを弾きます。",
      "ro": "Ane wa jouzu ni gitaa o hikimasu.",
      "id": "Kakak perempuan mahir memainkan gitar."
    },
    "nai": {
      "jp": "バイオリンはまだ弾かない。",
      "ro": "Baiorin wa mada hikanai.",
      "id": "Belum memainkan biola."
    },
    "te": {
      "jp": "ピアノを弾いて歌を歌いました。",
      "ro": "Piano o hiite uta o utaimashita.",
      "id": "Memainkan piano lalu menyanyikan lagu."
    }
  },
  "吹く": {
    "kamus": {
      "jp": "外で強い風が吹く。",
      "ro": "Soto de tsuyoi kaze ga fuku.",
      "id": "Di luar berhembus angin kencang."
    },
    "masu": {
      "jp": "春になると暖かい風が吹きます。",
      "ro": "Haru ni naru to atatakai kaze ga fukimasu.",
      "id": "Saat musim semi tiba angin hangat bertiup."
    },
    "nai": {
      "jp": "今日は風が吹かないで穏やかです。",
      "ro": "Kyou wa kaze ga fukanaide odayaka desu.",
      "id": "Hari ini angin tidak berhembus dan cuaca tenang."
    },
    "te": {
      "jp": "風が吹いて桜の花びらが舞いました。",
      "ro": "Kaze ga fuite sakura no hanabira ga maimashita.",
      "id": "Angin bertiup dan kelopak sakura berterbangan."
    }
  },
  "磨く": {
    "kamus": {
      "jp": "寝る前に歯を磨く。",
      "ro": "Neru mae ni ha o migaku.",
      "id": "Menggosok gigi sebelum tidur."
    },
    "masu": {
      "jp": "毎食後きれいに歯を磨きます。",
      "ro": "Maishokugo kirei ni ha o migakimasu.",
      "id": "Menggosok gigi sampai bersih setelah makan."
    },
    "nai": {
      "jp": "靴をしばらく磨かない。",
      "ro": "Kutsu o shibaraku migakanai.",
      "id": "Sudah lama tidak menyemir/menggosok sepatu."
    },
    "te": {
      "jp": "鏡をきれいに磨いてピカピカにしました。",
      "ro": "Kagami o kirei ni migaite pikapika ni shimashita.",
      "id": "Mengelap cermin sampai bersih dan berkilau."
    }
  },
  "押す": {
    "kamus": {
      "jp": "ボタンを押す。",
      "ro": "Botan o osu.",
      "id": "Menekan tombol."
    },
    "masu": {
      "jp": "エレベーターのボタンを押します。",
      "ro": "Erebeetaa no botan o oshimasu.",
      "id": "Menekan tombol lift."
    },
    "nai": {
      "jp": "非常ボタンを勝手に押さないでください。",
      "ro": "Hijou botan o katte ni oshanaide kudasai.",
      "id": "Tolong jangan sembarangan menekan tombol darurat."
    },
    "te": {
      "jp": "ドアを押して中に入りました。",
      "ro": "Doa o oshite naka ni hairimashita.",
      "id": "Mendorong pintu lalu masuk ke dalam."
    }
  },
  "返す": {
    "kamus": {
      "jp": "借りた本を図書館に返す。",
      "ro": "Karita hon o toshokan ni kaesu.",
      "id": "Mengembalikan buku pinjaman ke perpustakaan."
    },
    "masu": {
      "jp": "明日友達にお金を返します。",
      "ro": "Ashita tomodachi ni okane o kaeshimasu.",
      "id": "Besok saya mengembalikan uang ke teman."
    },
    "nai": {
      "jp": "借りた物を返さないのはマナー違反です。",
      "ro": "Karita mono o kaeshanai no wa manaa ihan desu.",
      "id": "Tidak mengembalikan barang pinjaman itu melanggar etika."
    },
    "te": {
      "jp": "本を読んで期限までに返してください。",
      "ro": "Hon o yonde kigen made ni kaeshite kudasai.",
      "id": "Tolong baca buku lalu kembalikan sebelum tenggat waktu."
    }
  },
  "差す": {
    "kamus": {
      "jp": "雨が降ってきたので傘を差す。",
      "ro": "Ame ga futte kita node kasa o sasu.",
      "id": "Membuka payung karena hujan mulai turun."
    },
    "masu": {
      "jp": "日差しが強いので日傘を差します。",
      "ro": "Hizashi ga tsuyoi node higasa o sashimasu.",
      "id": "Memakai payung peneduh karena terik matahari."
    },
    "nai": {
      "jp": "小雨だから傘を差さない。",
      "ro": "Kosame dakara kasa o sasanai.",
      "id": "Karena hanya gerimis tidak memakai payung."
    },
    "te": {
      "jp": "傘を差して出かけました。",
      "ro": "Kasa o sashite dekakemashita.",
      "id": "Memakai payung lalu berangkat pergi."
    }
  },
  "消す": {
    "kamus": {
      "jp": "部屋を出る時は電気を消す。",
      "ro": "Heya o deru toki wa denki o kesu.",
      "id": "Mematikan lampu saat keluar ruangan."
    },
    "masu": {
      "jp": "寝る前にテレビの電源を消します。",
      "ro": "Neru mae ni terebi no dengen o keshimasu.",
      "id": "Mematikan daya televisi sebelum tidur."
    },
    "nai": {
      "jp": "エアコンを消さないで出かけてしまいました。",
      "ro": "Eakon o keshanaide dekakete shimaimashita.",
      "id": "Pergi keluar tanpa mematikan AC."
    },
    "te": {
      "jp": "黒板の字を消しゴムで消してください。",
      "ro": "Kokuban no ji o keshigomu de keshite kudasai.",
      "id": "Tolong hapus tulisan di papan tulis."
    }
  },
  "出す": {
    "kamus": {
      "jp": "カバンから教科書を出す。",
      "ro": "Kaban kara kyoukasho o dasu.",
      "id": "Mengeluarkan buku pelajaran dari dalam tas."
    },
    "masu": {
      "jp": "先生に宿題を提出して出します。",
      "ro": "Sensei ni shukudai o teishutsu shite dashimasu.",
      "id": "Mengumpulkan dan menyerahkan PR ke guru."
    },
    "nai": {
      "jp": "授業中はスマホを出さないでください。",
      "ro": "Jugyouchuu wa sumaho o dashanaide kudasai.",
      "id": "Tolong jangan mengeluarkan ponsel saat pelajaran."
    },
    "te": {
      "jp": "手紙をポストに出してきました。",
      "ro": "Tegami o posuto ni dashite kimashita.",
      "id": "Memasukkan/mengirim surat ke kotak pos."
    }
  },
  "無くす": {
    "kamus": {
      "jp": "大切な鍵を無くす。",
      "ro": "Taisetsu na kagi o nakusu.",
      "id": "Menghilangkan kunci penting."
    },
    "masu": {
      "jp": "うっかり傘を無くします。",
      "ro": "Ukkari kasa o nakushimasu.",
      "id": "Ceroboh sehingga menghilangkan payung."
    },
    "nai": {
      "jp": "パスポートを無くさないように気をつけてください。",
      "ro": "Pasupooto o nakushanaide you ni ki o tsukete kudasai.",
      "id": "Hati-hati agar tidak menghilangkan paspor."
    },
    "te": {
      "jp": "切符を無くして困ってしまいました。",
      "ro": "Kippu o nakushite komatte shimaimashita.",
      "id": "Menghilangkan tiket dan menjadi kebingungan."
    }
  },
  "話す": {
    "kamus": {
      "jp": "友達と日本語で話す。",
      "ro": "Tomodachi to Nihongo de hanasu.",
      "id": "Berbicara bahasa Jepang dengan teman."
    },
    "masu": {
      "jp": "先生と将来の夢について話します。",
      "ro": "Sensei to shourai no yume ni tsuite hanashimasu.",
      "id": "Berbicara tentang cita-cita masa depan dengan guru."
    },
    "nai": {
      "jp": "図書館では大きな声で話さないでください。",
      "ro": "Toshokan de wa ookina koe de hanashanaide kudasai.",
      "id": "Tolong jangan berbicara dengan suara keras di perpustakaan."
    },
    "te": {
      "jp": "家族と電話で話して安心しました。",
      "ro": "Kazoku to denwa de hanashite anshin shimashita.",
      "id": "Berbicara dengan keluarga di telepon lalu merasa lega."
    }
  },
  "渡す": {
    "kamus": {
      "jp": "友達にプレゼントを手渡す。",
      "ro": "Tomodachi ni purezento o tewatasu.",
      "id": "Menyerahkan kado ke tangan teman."
    },
    "masu": {
      "jp": "先生に書類を渡します。",
      "ro": "Sensei ni shorui o watashimasu.",
      "id": "Menyerahkan dokumen kepada guru."
    },
    "nai": {
      "jp": "見知らぬ人にお金を渡さないでください。",
      "ro": "Mishiranu hito ni okane o watashanaide kudasai.",
      "id": "Tolong jangan memberikan uang kepada orang asing."
    },
    "te": {
      "jp": "お土産を渡してとても喜ばれました。",
      "ro": "Omiyage o watashite totemo yorokobaremashita.",
      "id": "Menyerahkan oleh-oleh dan mereka sangat senang."
    }
  },
  "遊ぶ": {
    "kamus": {
      "jp": "公園で友達と遊ぶ。",
      "ro": "Kouen de tomodachi to asobu.",
      "id": "Bermain dengan teman di taman."
    },
    "masu": {
      "jp": "休日はゲームをして遊びます。",
      "ro": "Kyuujitsu wa geemu o shite asobimasu.",
      "id": "Bermain game di hari libur."
    },
    "nai": {
      "jp": "テストの前は遊ばないで勉強します。",
      "ro": "Tesuto no mae wa asobanaide benkyou shimasu.",
      "id": "Sebelum ujian tidak bermain dan belajar."
    },
    "te": {
      "jp": "テーマパークで一日中遊んで楽しかったです。",
      "ro": "Teemapaaku de ichinichijuu asonde tanoshikatta desu.",
      "id": "Bermain seharian di taman hiburan sangat menyenangkan."
    }
  },
  "呼ぶ": {
    "kamus": {
      "jp": "大声で友達を呼ぶ。",
      "ro": "Oogoe de tomodachi o yobu.",
      "id": "Memanggil teman dengan suara keras."
    },
    "masu": {
      "jp": "駅までタクシーを呼びます。",
      "ro": "Eki made takushii o yobimasu.",
      "id": "Memanggil taksi sampai ke stasiun."
    },
    "nai": {
      "jp": "先生をあだ名で呼ばないでください。",
      "ro": "Sensei o adana de yobanaide kudasai.",
      "id": "Tolong jangan memanggil guru dengan nama julukan."
    },
    "te": {
      "jp": "友達を呼んでホームパーティーをしました。",
      "ro": "Tomodachi o yonde hoomupaatii o shimashita.",
      "id": "Mengundang teman lalu mengadakan pesta di rumah."
    }
  },
  "死ぬ": {
    "kamus": {
      "jp": "魚は水がないと死ぬ。",
      "ro": "Sakana wa mizu ga nai to shinu.",
      "id": "Ikan akan mati jika tidak ada air."
    },
    "masu": {
      "jp": "寒さで植物が死にます。",
      "ro": "Samusa de shokubutsu ga shinimasu.",
      "id": "Tanaman mati karena kedinginan."
    },
    "nai": {
      "jp": "花が死なないように毎日水をあげます。",
      "ro": "Hana ga shinanaide you ni mainichi mizu o agemasu.",
      "id": "Menyiram air setiap hari agar bunga tidak layu/mati."
    },
    "te": {
      "jp": "ペットが死んでとても寂しいです。",
      "ro": "Petto ga shinde totemo sabishii desu.",
      "id": "Hewan peliharaan mati dan saya merasa sangat kesepian."
    }
  },
  "噛む": {
    "kamus": {
      "jp": "ご飯をよく噛むのは健康にいいです。",
      "ro": "Gohan o yoku kamu no wa kenkou ni ii desu.",
      "id": "Mengunyah makanan dengan baik itu bagus untuk kesehatan."
    },
    "masu": {
      "jp": "集中したい時にガムを噛みます。",
      "ro": "Shuuchuu shitai toki ni gamu o kamimasu.",
      "id": "Mengunyah permen karet saat ingin berkonsentrasi."
    },
    "nai": {
      "jp": "爪を噛まないでください。",
      "ro": "Tsume o kamanaide kudasai.",
      "id": "Tolong jangan menggigit kuku."
    },
    "te": {
      "jp": "よく噛んで食べてください。",
      "ro": "Yoku kande tabete kudasai.",
      "id": "Tolong kunyah dengan baik lalu makanlah."
    }
  },
  "込む": {
    "kamus": {
      "jp": "朝の通勤電車が込む。",
      "ro": "Asa no tsuukin densha ga komu.",
      "id": "Kereta komuter pagi hari penuh sesak."
    },
    "masu": {
      "jp": "週末のショッピングモールはとても込みます。",
      "ro": "Shuumatsu no shoppingumooru wa totemo komimasu.",
      "id": "Pusat perbelanjaan di akhir pekan sangat padat."
    },
    "nai": {
      "jp": "平日の昼間は道が混まない。",
      "ro": "Heijitsu no hiruma wa michi ga komanai.",
      "id": "Siang hari kerja jalannya tidak macet/padat."
    },
    "te": {
      "jp": "店が混んでいて席がありませんでした。",
      "ro": "Mise ga konde ite seki ga arimasendeshita.",
      "id": "Tokonya penuh sesak jadi tidak ada tempat duduk."
    }
  },
  "住む": {
    "kamus": {
      "jp": "いつか東京に住むのが夢です。",
      "ro": "Itsuka Toukyou ni sumu no ga yume desu.",
      "id": "Bermimpi suatu saat tinggal di Tokyo."
    },
    "masu": {
      "jp": "私は現在大阪に住んでいます。",
      "ro": "Watashi wa genzai Oosaka ni sunde imasu.",
      "id": "Saya saat ini tinggal di Osaka."
    },
    "nai": {
      "jp": "不便な場所には住まない。",
      "ro": "Fuben na basho ni wa sumanai.",
      "id": "Tidak ingin tinggal di tempat yang tidak praktis."
    },
    "te": {
      "jp": "日本に住んで日本語が上手になりました。",
      "ro": "Nihon ni sunde Nihongo ga jouzu ni narimashita.",
      "id": "Tinggal di Jepang dan bahasa Jepang saya menjadi mahir."
    }
  },
  "頼む": {
    "kamus": {
      "jp": "レストランで料理を頼む。",
      "ro": "Resutoran de ryouri o tanomu.",
      "id": "Memesan makanan di restoran."
    },
    "masu": {
      "jp": "店員さんにコーヒーを頼みます。",
      "ro": "Ten'in-san ni koohii o tanomimasu.",
      "id": "Memesan kopi kepada pelayan toko."
    },
    "nai": {
      "jp": "無理なお願いは頼まない。",
      "ro": "Muri na onegai wa tanomanai.",
      "id": "Tidak meminta bantuan yang mustahil."
    },
    "te": {
      "jp": "友達に頼んで宿題を手伝ってもらいました。",
      "ro": "Tomodachi ni tanonde shukudai o tetsudatte moraimashita.",
      "id": "Meminta tolong teman untuk membantu PR."
    }
  },
  "飲む": {
    "kamus": {
      "jp": "冷たい水を飲む。",
      "ro": "Tsumetai mizu o nomu.",
      "id": "Minum air dingin."
    },
    "masu": {
      "jp": "毎朝温かいお茶を飲みます。",
      "ro": "Maiasa atatakai ocha o nomimasu.",
      "id": "Setiap pagi minum teh hangat."
    },
    "nai": {
      "jp": "私はお酒をまったく飲まない。",
      "ro": "Watashi wa osake o mattaku nomanai.",
      "id": "Saya sama sekali tidak minum alkohol."
    },
    "te": {
      "jp": "薬を飲んでゆっくり休んでください。",
      "ro": "Kusuri o nonde yukkuri yasunde kudasai.",
      "id": "Minum obat lalu istirahatlah dengan santai."
    }
  },
  "休む": {
    "kamus": {
      "jp": "疲れたので少し休む。",
      "ro": "Tsukareta node sukoshi yasumu.",
      "id": "Karena lelah beristirahat sebentar."
    },
    "masu": {
      "jp": "日曜日は仕事を休みます。",
      "ro": "Nichiyoubi wa shigoto o yasumimasu.",
      "id": "Hari Minggu libur bekerja."
    },
    "nai": {
      "jp": "試験の前は授業を休まない。",
      "ro": "Shiken no mae wa jugyou o yasumanai.",
      "id": "Tidak bolos/absen kelas sebelum ujian."
    },
    "te": {
      "jp": "ベンチで休んでから歩き始めました。",
      "ro": "Benchi de yasunde kara arukihajimemashita.",
      "id": "Istirahat di bangku lalu mulai berjalan."
    }
  },
  "読む": {
    "kamus": {
      "jp": "毎晩ベッドで本を読む。",
      "ro": "Maiban beddo de hon o yomu.",
      "id": "Setiap malam membaca buku di tempat tidur."
    },
    "masu": {
      "jp": "朝ご飯を食べながら新聞を読みます。",
      "ro": "Asagohan o tabenagara shinbun o yomimasu.",
      "id": "Membaca koran sambil sarapan."
    },
    "nai": {
      "jp": "忙しくて最近雑誌を読まない。",
      "ro": "Isogashikute saikin zasshi o yomanai.",
      "id": "Sibuk jadi akhir-akhir ini tidak membaca majalah."
    },
    "te": {
      "jp": "説明書をよく読んで使ってください。",
      "ro": "Setsumeisho o yoku yonde tsukatte kudasai.",
      "id": "Tolong baca petunjuk penggunaan dengan baik lalu gunakanlah."
    }
  },
  "泳ぐ": {
    "kamus": {
      "jp": "夏休みに海で泳ぐ。",
      "ro": "Natsuyasumi ni umi de oyogu.",
      "id": "Berenang di laut saat liburan musim panas."
    },
    "masu": {
      "jp": "市民プールで毎週泳ぎます。",
      "ro": "Shimin puuru de maishuu oyogimasu.",
      "id": "Setiap minggu berenang di kolam renang umum."
    },
    "nai": {
      "jp": "水が冷たいので今日は泳がない。",
      "ro": "Mizu ga tsumetai node kyou wa oyoganai.",
      "id": "Karena airnya dingin hari ini tidak berenang."
    },
    "te": {
      "jp": "たくさん泳いでお腹がすきました。",
      "ro": "Takusan oyoide onaka ga sukimashita.",
      "id": "Banyak berenang lalu perut menjadi lapar."
    }
  },
  "脱ぐ": {
    "kamus": {
      "jp": "玄関で靴を脱ぐ。",
      "ro": "Genkan de kutsu o nugu.",
      "id": "Melepas sepatu di pintu masuk (genkan)."
    },
    "masu": {
      "jp": "部屋に入る前にコートを脱ぎます。",
      "ro": "Heya ni hairu mae ni kooto o nugimasu.",
      "id": "Melepas mantel sebelum masuk kamar."
    },
    "nai": {
      "jp": "寒いので上着を脱がないでください。",
      "ro": "Samui node uwagi o nuganaide kudasai.",
      "id": "Karena dingin tolong jangan melepas jaket."
    },
    "te": {
      "jp": "靴を脱いでスリッパを履いてください。",
      "ro": "Kutsu o nuide surippa o haite kudasai.",
      "id": "Tolong lepas sepatu dan pakailah sandal."
    }
  },
  "急ぐ": {
    "kamus": {
      "jp": "電車に遅れないように急ぐ。",
      "ro": "Densha ni okurenai you ni isogu.",
      "id": "Buru-buru agar tidak terlambat naik kereta."
    },
    "masu": {
      "jp": "約束の時間なので急ぎます。",
      "ro": "Yakusoku no jikan nanode isogimasu.",
      "id": "Karena sudah waktu janji saya bergegas."
    },
    "nai": {
      "jp": "まだ時間があるから急がない。",
      "ro": "Mada jikan ga aru kara isoganai.",
      "id": "Masih ada waktu jadi tidak perlu buru-buru."
    },
    "te": {
      "jp": "急いで駅へ向かいました。",
      "ro": "Isoide eki e mukaimashita.",
      "id": "Bergegas menuju stasiun."
    }
  },
  "要る": {
    "kamus": {
      "jp": "旅行にはパスポートが要る。",
      "ro": "Ryokou ni wa pasupooto ga iru.",
      "id": "Perlu paspor untuk bepergian."
    },
    "masu": {
      "jp": "ビザの申請には写真が要ります。",
      "ro": "Biza no shinsei ni wa shashin ga irimasu.",
      "id": "Perlu foto untuk pengajuan visa."
    },
    "nai": {
      "jp": "レシートは要りません。",
      "ro": "Reshiito wa irimasen.",
      "id": "Tidak perlu struk belanja."
    },
    "te": {
      "jp": "この書類が要って探しています。",
      "ro": "Kono shorui ga itte sagashite imasu.",
      "id": "Dokumen ini dibutuhkan dan saya sedang mencarinya."
    }
  },
  "帰る": {
    "kamus": {
      "jp": "夕方五時に家に帰る。",
      "ro": "Yuugata goji ni ie ni kaeru.",
      "id": "Pulang ke rumah jam 5 sore."
    },
    "masu": {
      "jp": "仕事が終わったらすぐ帰ります。",
      "ro": "Shigoto ga owattara sugu kaerimasu.",
      "id": "Langsung pulang begitu selesai bekerja."
    },
    "nai": {
      "jp": "今日は残業だから早く帰らない。",
      "ro": "Kyou wa zangyou dakara hayaku kaeranai.",
      "id": "Hari ini lembur jadi tidak pulang cepat."
    },
    "te": {
      "jp": "家に帰ってゆっくりお風呂に入りました。",
      "ro": "Ie ni kaette yukkuri ofuro ni hairimashita.",
      "id": "Pulang ke rumah lalu berendam santai di bak mandi."
    }
  },
  "切る": {
    "kamus": {
      "jp": "ハサミで紙を切る。",
      "ro": "Hasami de kami o kiru.",
      "id": "Memotong kertas dengan gunting."
    },
    "masu": {
      "jp": "包丁で野菜を切ります。",
      "ro": "Houchou de yasai o kirimasu.",
      "id": "Memotong sayuran dengan pisau dapur."
    },
    "nai": {
      "jp": "大切な書類は切らないでください。",
      "ro": "Taisetsu na shorui wa kiranaide kudasai.",
      "id": "Tolong jangan memotong dokumen penting."
    },
    "te": {
      "jp": "ケーキをきれいに切ってみんなで食べました。",
      "ro": "Keeki o kirei ni kitte minna de tabemashita.",
      "id": "Memotong kue dengan rapi lalu makan bersama."
    }
  },
  "知る": {
    "kamus": {
      "jp": "新しいニュースを知る。",
      "ro": "Atarashii nyuusu o shiru.",
      "id": "Mengetahui berita terbaru."
    },
    "masu": {
      "jp": "その先生の連絡先を知っています。",
      "ro": "Sono sensei no renrakusaki o shitte imasu.",
      "id": "Saya mengetahui kontak guru tersebut."
    },
    "nai": {
      "jp": "私はその事実をまったく知らない。",
      "ro": "Watashi wa sono jijitsu o mattaku shiranai.",
      "id": "Saya sama sekali tidak mengetahui fakta itu."
    },
    "te": {
      "jp": "真実を知ってとても驚きました。",
      "ro": "Shinjitsu o shitte totemo odorokimashita.",
      "id": "Mengetahui kebenarannya dan sangat terkejut."
    }
  },
  "入る": {
    "kamus": {
      "jp": "お風呂に入る。",
      "ro": "Ofuro ni hairu.",
      "id": "Masuk/berendam di bak mandi."
    },
    "masu": {
      "jp": "寒い日は温かい温泉に入ります。",
      "ro": "Samui hi wa atatakai onsen ni hairimasu.",
      "id": "Masuk ke pemandian air panas saat hari dingin."
    },
    "nai": {
      "jp": "関係者以外は入らないでください。",
      "ro": "Kankeisha igai wa hairanaide kudasai.",
      "id": "Selain yang berkepentingan dilarang masuk."
    },
    "te": {
      "jp": "喫茶店に入ってコーヒーを飲みました。",
      "ro": "Kissaten ni haitte koohii o nomimashita.",
      "id": "Masuk ke kedai kopi lalu minum kopi."
    }
  },
  "走る": {
    "kamus": {
      "jp": "毎朝公園を走る。",
      "ro": "Maiasa kouen o hashiru.",
      "id": "Setiap pagi berlari di taman."
    },
    "masu": {
      "jp": "遅刻しそうなので走ります。",
      "ro": "Chikoku shisou nanode hashirimasu.",
      "id": "Karena hampir terlambat saya berlari."
    },
    "nai": {
      "jp": "滑りやすいので廊下を走らないでください。",
      "ro": "Suberiyasui node rouka o hashiranaide kudasai.",
      "id": "Karena licin tolong jangan berlari di lorong."
    },
    "te": {
      "jp": "走って駅に向かいました。",
      "ro": "Hashitte eki e mukaimashita.",
      "id": "Berlari menuju stasiun."
    }
  },
  "浴びる": {
    "kamus": {
      "jp": "朝起きてシャワーを浴びる。",
      "ro": "Asa okite shawaa o abiru.",
      "id": "Bangun pagi lalu mandi shower."
    },
    "masu": {
      "jp": "運動した後にシャワーを浴びます。",
      "ro": "Undou shita ato ni shawaa o abimasu.",
      "id": "Mandi shower setelah berolahraga."
    },
    "nai": {
      "jp": "風邪を引いたので今日は浴びない。",
      "ro": "Kaze o hiita node kyou wa abinai.",
      "id": "Karena masuk angin hari ini tidak mandi."
    },
    "te": {
      "jp": "シャワーを浴びてすっきりしました。",
      "ro": "Shawaa o abite sukkiri shimashita.",
      "id": "Mandi shower dan badan terasa segar."
    }
  },
  "起きる": {
    "kamus": {
      "jp": "毎朝六時に起きる習慣です。",
      "ro": "Maiasa rokuji ni okiru shuukan desu.",
      "id": "Kebiasaan bangun jam 6 setiap pagi."
    },
    "masu": {
      "jp": "明日は早く起きます。",
      "ro": "Ashita wa hayaku okimasu.",
      "id": "Besok saya bangun pagi-pagi."
    },
    "nai": {
      "jp": "日曜日は早く起きない。",
      "ro": "Nichiyoubi wa hayaku okinai.",
      "id": "Hari Minggu tidak bangun pagi."
    },
    "te": {
      "jp": "起きてすぐに水を一杯飲みました。",
      "ro": "Okite sugu ni mizu o ippai nomimashita.",
      "id": "Bangun tidur lalu segera minum segelas air."
    }
  },
  "下りる": {
    "kamus": {
      "jp": "次の駅で電車を下りる。",
      "ro": "Tsugi no eki de densha o oriru.",
      "id": "Turun dari kereta di stasiun berikutnya."
    },
    "masu": {
      "jp": "三階から階段を下ります。",
      "ro": "Sangai kara kaidan o orimasu.",
      "id": "Turun tangga dari lantai 3."
    },
    "nai": {
      "jp": "まだ目的地ではないので下りない。",
      "ro": "Mada mokutekichi dewa nai node orinai.",
      "id": "Karena belum tujuan tidak turun."
    },
    "te": {
      "jp": "バスを下りて歩いて行きました。",
      "ro": "Basu o orite aruite ikimashita.",
      "id": "Turun dari bus lalu berjalan kaki."
    }
  },
  "借りる": {
    "kamus": {
      "jp": "図書館で面白い本を借りる。",
      "ro": "Toshokan de omoshiroi hon o kariru.",
      "id": "Meminjam buku menarik di perpustakaan."
    },
    "masu": {
      "jp": "友達からノートを借ります。",
      "ro": "Tomodachi kara nooto o karimasu.",
      "id": "Meminjam buku catatan dari teman."
    },
    "nai": {
      "jp": "人のお金をあまり借りない。",
      "ro": "Hito no okane o amari karinai.",
      "id": "Tidak suka meminjam uang orang."
    },
    "te": {
      "jp": "傘を借りて雨の中を帰りました。",
      "ro": "Kasa o karite ame no naka o kaerimashita.",
      "id": "Meminjam payung lalu pulang di tengah hujan."
    }
  },
  "着る": {
    "kamus": {
      "jp": "新しいジャケットを着る。",
      "ro": "Atarashii jaketto o kiru.",
      "id": "Mengenakan jaket baru."
    },
    "masu": {
      "jp": "パーティーに着物を着ます。",
      "ro": "Paatii ni kimono o kimasu.",
      "id": "Mengenakan kimono ke pesta."
    },
    "nai": {
      "jp": "暑いのでコートを着ない。",
      "ro": "Atsui node kooto o kinai.",
      "id": "Karena panas tidak memakai mantel."
    },
    "te": {
      "jp": "スーツを着て面接へ行きました。",
      "ro": "Suutsu o kite mensetsu e ikimashita.",
      "id": "Mengenakan setelan jas lalu pergi wawancara."
    }
  },
  "できる": {
    "kamus": {
      "jp": "日本語を話すことができる。",
      "ro": "Nihongo o hanasu koto ga dekiru.",
      "id": "Bisa berbicara bahasa Jepang."
    },
    "masu": {
      "jp": "一人で料理ができます。",
      "ro": "Hitori de ryouri ga dekimasu.",
      "id": "Bisa memasak sendiri."
    },
    "nai": {
      "jp": "難しくてまだできない。",
      "ro": "Muzukashikute mada dekinai.",
      "id": "Karena sulit masih belum bisa."
    },
    "te": {
      "jp": "宿題ができてよかったです。",
      "ro": "Shukudai ga dekite yokatta desu.",
      "id": "PR sudah selesai/bisa dibuat dan saya senang."
    }
  },
  "見る": {
    "kamus": {
      "jp": "映画館で映画を見る。",
      "ro": "Eigakan de eiga o miru.",
      "id": "Menonton film di bioskop."
    },
    "masu": {
      "jp": "毎晩日本のニュースを見ます。",
      "ro": "Maiban Nihon no nyuusu o mimasu.",
      "id": "Setiap malam menonton berita Jepang."
    },
    "nai": {
      "jp": "勉強中はテレビを見ない。",
      "ro": "Benkyouchuu wa terebi o minai.",
      "id": "Tidak menonton TV saat belajar."
    },
    "te": {
      "jp": "時計を見て時間を確かめました。",
      "ro": "Tokei o mite jikan o tashikamemashita.",
      "id": "Melihat jam untuk memastikan waktu."
    }
  },
  "いる": {
    "kamus": {
      "jp": "公園に猫がいる。",
      "ro": "Kouen ni neko ga iru.",
      "id": "Ada kucing di taman."
    },
    "masu": {
      "jp": "教室に先生と学生がいます。",
      "ro": "Kyoushitsu ni sensei to gakusei ga imasu.",
      "id": "Di kelas ada guru dan murid."
    },
    "nai": {
      "jp": "部屋には誰もいない。",
      "ro": "Heya ni wa dare mo inai.",
      "id": "Di kamar tidak ada siapa-siapa."
    },
    "te": {
      "jp": "友達がそばにいてくれて安心しました。",
      "ro": "Tomodachi ga soba ni ite kurete anshin shimashita.",
      "id": "Ada teman di samping saya sehingga merasa tenang."
    }
  },
  "開ける": {
    "kamus": {
      "jp": "部屋の窓を開ける。",
      "ro": "Heya no mado o akeru.",
      "id": "Membuka jendela kamar."
    },
    "masu": {
      "jp": "暑いのでエアコンをつけて窓を開けます。",
      "ro": "Atsui node eakon o tsukete mado o akemasu.",
      "id": "Karena panas menyalakan AC dan membuka jendela."
    },
    "nai": {
      "jp": "寒い時は窓を開けないでください。",
      "ro": "Samui toki wa mado o akenaide kudasai.",
      "id": "Tolong jangan buka jendela saat dingin."
    },
    "te": {
      "jp": "ドアを開けて換気をしました。",
      "ro": "Doa o akete kanki o shimashita.",
      "id": "Membuka pintu lalu melakukan ventilasi udara."
    }
  },
  "あげる": {
    "kamus": {
      "jp": "友達に誕生日プレゼントをあげる。",
      "ro": "Tomodachi ni tanjoubi purezento o ageru.",
      "id": "Memberikan hadiah ulang tahun ke teman."
    },
    "masu": {
      "jp": "母の日に花をあげます。",
      "ro": "Haha no hi ni hana o agemasu.",
      "id": "Memberikan bunga pada Hari Ibu."
    },
    "nai": {
      "jp": "ペットにお菓子をあげないでください。",
      "ro": "Petto ni okashi o agenaide kudasai.",
      "id": "Tolong jangan memberi camilan kepada hewan peliharaan."
    },
    "te": {
      "jp": "お土産をあげて喜ばれました。",
      "ro": "Omiyage o agete yorokobaremashita.",
      "id": "Memberikan oleh-oleh dan membuat mereka senang."
    }
  },
  "入れる": {
    "kamus": {
      "jp": "カバンにノートを入れる。",
      "ro": "Kaban ni nooto o ireru.",
      "id": "Memasukkan buku catatan ke dalam tas."
    },
    "masu": {
      "jp": "紅茶に砂糖を入れます。",
      "ro": "Koucha ni satou o iremasu.",
      "id": "Memasukkan gula ke dalam teh."
    },
    "nai": {
      "jp": "コーヒーにミルクを入れない。",
      "ro": "Koohii ni miruku o irenai.",
      "id": "Tidak memasukkan susu ke dalam kopi."
    },
    "te": {
      "jp": "冷蔵庫に入れて冷やしてください。",
      "ro": "Reizouko ni irete hiyashite kudasai.",
      "id": "Tolong masukkan ke kulkas dan dinginkan."
    }
  },
  "生まれる": {
    "kamus": {
      "jp": "春にかわいい子犬が生まれる。",
      "ro": "Haru ni kawaii koinu ga umareru.",
      "id": "Anak anjing lucu lahir di musim semi."
    },
    "masu": {
      "jp": "私はインドネシアで生まれました。",
      "ro": "Watashi wa Indoneshia de umaremashita.",
      "id": "Saya lahir di Indonesia."
    },
    "nai": {
      "jp": "この地域ではあまり生まれない。",
      "ro": "Kono chiiki de wa amari umarenai.",
      "id": "Jarang ada kelahiran di wilayah ini."
    },
    "te": {
      "jp": "赤ちゃんが生まれて家族みんなが大喜びしました。",
      "ro": "Akachan ga umarete kazoku minna ga ooyorokobi shimashita.",
      "id": "Bayi lahir dan seluruh keluarga bergembira."
    }
  },
  "教える": {
    "kamus": {
      "jp": "友達に英語を教える。",
      "ro": "Tomodachi ni eigo o oshieru.",
      "id": "Mengajarkan bahasa Inggris kepada teman."
    },
    "masu": {
      "jp": "先生が親切に文法を教えます。",
      "ro": "Sensei ga shinsetsu ni bunpou o oshiemasu.",
      "id": "Guru mengajarkan tata bahasa dengan ramah."
    },
    "nai": {
      "jp": "秘密だから誰にも教えない。",
      "ro": "Himitsu dakara dare ni mo oshienai.",
      "id": "Karena rahasia tidak memberitahu siapa pun."
    },
    "te": {
      "jp": "駅への行き方を教えてください。",
      "ro": "Eki e no ikikata o oshiete kudasai.",
      "id": "Tolong beritahukan cara pergi ke stasiun."
    }
  },
  "覚える": {
    "kamus": {
      "jp": "毎日五つの単語を覚える。",
      "ro": "Mainichi itsutsu no tango o oboeru.",
      "id": "Menghafal lima kosakata setiap hari."
    },
    "masu": {
      "jp": "漢字の書き方をしっかり覚えます。",
      "ro": "Kanji no kakikata o shikkari oboemasu.",
      "id": "Mengingat cara menulis kanji dengan baik."
    },
    "nai": {
      "jp": "人の名前がなかなか覚えない。",
      "ro": "Hito no namae ga nakanaka oboenai.",
      "id": "Sulit menghafal nama orang."
    },
    "te": {
      "jp": "暗記カードを使って覚えてください。",
      "ro": "Anki kaado o tsukatte oboete kudasai.",
      "id": "Tolong gunakan kartu hafalan dan hafalkan."
    }
  },
  "掛ける": {
    "kamus": {
      "jp": "日差しが強いので眼鏡を掛ける。",
      "ro": "Hizashi ga tsuyoi node megane o kakeru.",
      "id": "Mengenakan kacamata karena terik matahari."
    },
    "masu": {
      "jp": "本を読む時は眼鏡を掛けます。",
      "ro": "Hon o yomu toki wa megane o kakemasu.",
      "id": "Memakai kacamata saat membaca buku."
    },
    "nai": {
      "jp": "普段は眼鏡を掛けない。",
      "ro": "Fudan wa megane o kakenai.",
      "id": "Biasanya tidak memakai kacamata."
    },
    "te": {
      "jp": "サングラスを掛けて海へ行きました。",
      "ro": "Sangurasu o kakete umi e ikimashita.",
      "id": "Memakai kacamata hitam lalu pergi ke laut."
    }
  },
  "消える": {
    "kamus": {
      "jp": "停電で部屋の電気が消える。",
      "ro": "Teiden de heya no denki ga kieru.",
      "id": "Lampu kamar padam karena mati listrik."
    },
    "masu": {
      "jp": "時間が経つとろうそくの火が消えます。",
      "ro": "Jikan ga tatsu to rousoku no hi ga kiemasu.",
      "id": "Seiring waktu api lilin padam."
    },
    "nai": {
      "jp": "この明かりは朝まで消えない。",
      "ro": "Kono akari wa asa made kienai.",
      "id": "Lampu ini tidak padam sampai pagi."
    },
    "te": {
      "jp": "雪が消えて春が来ました。",
      "ro": "Yuki ga kiete haru ga kimashita.",
      "id": "Salju lenyap dan musim semi tiba."
    }
  },
  "答える": {
    "kamus": {
      "jp": "先生の質問に答える。",
      "ro": "Sensei no shitsumon ni kotaeru.",
      "id": "Menjawab pertanyaan guru."
    },
    "masu": {
      "jp": "自信を持って質問に答えます。",
      "ro": "Jishin o motte shitsumon ni kotaemasu.",
      "id": "Menjawab pertanyaan dengan percaya diri."
    },
    "nai": {
      "jp": "わからないので答えられない。",
      "ro": "Wakaranai node kotaerarenai.",
      "id": "Karena tidak paham tidak bisa menjawab."
    },
    "te": {
      "jp": "大きな声で答えてください。",
      "ro": "Ookina koe de kotaete kudasai.",
      "id": "Tolong jawab dengan suara lantang."
    }
  },
  "閉める": {
    "kamus": {
      "jp": "出かける前に窓を閉める。",
      "ro": "Dekakeru mae ni mado o shimeru.",
      "id": "Menutup jendela sebelum berangkat pergi."
    },
    "masu": {
      "jp": "寒いのでドアを閉めます。",
      "ro": "Samui node doa o shimemasu.",
      "id": "Menutup pintu karena dingin."
    },
    "nai": {
      "jp": "窓を閉めないで寝て風邪を引きました。",
      "ro": "Mado o shimenaide nete kaze o hikimashita.",
      "id": "Tidur tanpa menutup jendela lalu masuk angin."
    },
    "te": {
      "jp": "ドアを閉めて鍵を掛けてください。",
      "ro": "Doa o shimete kagi o kakete kudasai.",
      "id": "Tolong tutup pintu dan kunci."
    }
  },
  "食べる": {
    "kamus": {
      "jp": "日本のラーメンを食べるのが好きです。",
      "ro": "Nihon no raamen o taberu no ga suki desu.",
      "id": "Suka makan ramen Jepang."
    },
    "masu": {
      "jp": "毎朝パンと卵を食べます。",
      "ro": "Maiasa pan to tamago o tabemasu.",
      "id": "Setiap pagi makan roti dan telur."
    },
    "nai": {
      "jp": "辛い物はあまり食べない。",
      "ro": "Karai mono wa amari tabenai.",
      "id": "Tidak begitu suka makan makanan pedas."
    },
    "te": {
      "jp": "ご飯を食べてから薬を飲みました。",
      "ro": "Gohan o tabete kara kusuri o nomimashita.",
      "id": "Makan nasi dulu baru minum obat."
    }
  },
  "疲れる": {
    "kamus": {
      "jp": "たくさん歩くと疲れる。",
      "ro": "Takusan aruku to tsukareru.",
      "id": "Banyak berjalan kaki membuat lelah."
    },
    "masu": {
      "jp": "残業が続くと体が疲れます。",
      "ro": "Zangyou ga tsuzuku to karada ga tsukaremasu.",
      "id": "Badan lelah jika lembur terus-menerus."
    },
    "nai": {
      "jp": "軽い運動ならあまり疲れない。",
      "ro": "Karui undou nara amari tsukarenai.",
      "id": "Kalau olahraga ringan tidak begitu lelah."
    },
    "te": {
      "jp": "疲れてすぐに眠ってしまいました。",
      "ro": "Tsukarete sugu ni nemutte shimaimashita.",
      "id": "Kelelahan dan langsung tertidur lelap."
    }
  },
  "勤める": {
    "kamus": {
      "jp": "将来日本のIT企業に勤める。",
      "ro": "Shourai Nihon no aitii kigyou ni tsutomeru.",
      "id": "Di masa depan bekerja di perusahaan IT Jepang."
    },
    "masu": {
      "jp": "父は銀行に勤めています。",
      "ro": "Chichi wa ginkou ni tsutomete imasu.",
      "id": "Ayah bekerja di bank."
    },
    "nai": {
      "jp": "合わない会社には長く勤めない。",
      "ro": "Awanai kaisha ni wa nagaku tsutomenai.",
      "id": "Tidak bekerja lama di perusahaan yang tidak cocok."
    },
    "te": {
      "jp": "十年間会社に勤めて退職しました。",
      "ro": "Juunenkan kaisha ni tsutomete taishoku shimashita.",
      "id": "Bekerja di perusahaan selama 10 tahun lalu pensiun."
    }
  },
  "出かける": {
    "kamus": {
      "jp": "休日に友達と出かける。",
      "ro": "Kyuujitsu ni tomodachi to dekakeru.",
      "id": "Pergi keluar dengan teman di hari libur."
    },
    "masu": {
      "jp": "今から買い物に出かけます。",
      "ro": "Ima kara kaimono ni dekakemasu.",
      "id": "Mulai sekarang saya pergi berbelanja."
    },
    "nai": {
      "jp": "雨の日はどこへも出かけない。",
      "ro": "Ame no hi wa doko e mo dekakenai.",
      "id": "Di hari hujan tidak pergi ke mana pun."
    },
    "te": {
      "jp": "準備をして出かけてください。",
      "ro": "Junbi o shite dekakete kudasai.",
      "id": "Silakan bersiap-siap lalu berangkat."
    }
  },
  "出る": {
    "kamus": {
      "jp": "毎朝七時に家を出る。",
      "ro": "Maiasa shichiji ni ie o deru.",
      "id": "Keluar rumah jam 7 setiap pagi."
    },
    "masu": {
      "jp": "今から部屋を出ます。",
      "ro": "Ima kara heya o demasu.",
      "id": "Mulai sekarang saya keluar dari kamar."
    },
    "nai": {
      "jp": "今日は一日中外に出ない。",
      "ro": "Kyou wa ichinichijuu soto ni denai.",
      "id": "Hari ini seharian tidak keluar rumah."
    },
    "te": {
      "jp": "お風呂を出て温かい牛乳を飲みました。",
      "ro": "Ofuro o dete atatakai gyuunyuu o nomimashita.",
      "id": "Keluar dari bak mandi lalu minum susu hangat."
    }
  },
  "電気をつける": {
    "kamus": {
      "jp": "部屋が暗いので電気をつける。",
      "ro": "Heya ga kurai node denki o tsukeru.",
      "id": "Menyalakan lampu karena kamar gelap."
    },
    "masu": {
      "jp": "夜になったら電気をつけます。",
      "ro": "Yoru ni nattara denki o tsukemasu.",
      "id": "Menyalakan lampu saat malam tiba."
    },
    "nai": {
      "jp": "まだ明るいので電気をつけない。",
      "ro": "Mada akarui node denki o tsukenai.",
      "id": "Karena masih terang tidak menyalakan lampu."
    },
    "te": {
      "jp": "電気をつけて明るくしてください。",
      "ro": "Denki o tsukete akaruku shite kudasai.",
      "id": "Tolong nyalakan lampu agar terang."
    }
  },
  "電話をかける": {
    "kamus": {
      "jp": "家族に電話をかける。",
      "ro": "Kazoku ni denwa o kakeru.",
      "id": "Menelepon keluarga."
    },
    "masu": {
      "jp": "先生に確認の電話をかけます。",
      "ro": "Sensei ni kakunin no denwa o kakemasu.",
      "id": "Menelepon guru untuk konfirmasi."
    },
    "nai": {
      "jp": "夜遅くには電話をかけないでください。",
      "ro": "Yoru osoku ni wa denwa o kakenaide kudasai.",
      "id": "Tolong jangan menelepon saat larut malam."
    },
    "te": {
      "jp": "電話をかけて予約をしました。",
      "ro": "Denwa o kakete yoyaku o shimashita.",
      "id": "Menelepon lalu membuat reservasi."
    }
  },
  "並べる": {
    "kamus": {
      "jp": "机の上に本をきれいに並べる。",
      "ro": "Tsukue no ue ni hon o kirei ni naraberu.",
      "id": "Menata/menjejerkan buku dengan rapi di atas meja."
    },
    "masu": {
      "jp": "棚にお皿を並べます。",
      "ro": "Tana ni osara o narabemasu.",
      "id": "Menata piring di rak."
    },
    "nai": {
      "jp": "物を通路に並べないでください。",
      "ro": "Mono o tsuuro ni narabenaide kudasai.",
      "id": "Tolong jangan menaruh barang berjejer di lorong."
    },
    "te": {
      "jp": "椅子を丸く並べて座ってください。",
      "ro": "Isu o maruku narabete suwatte kudasai.",
      "id": "Tolong tata kursi melingkar lalu duduklah."
    }
  },
  "晴れる": {
    "kamus": {
      "jp": "明日は天気が晴れる予報です。",
      "ro": "Ashita wa tenki ga hareru yohou desu.",
      "id": "Prakiraan cuaca besok akan cerah."
    },
    "masu": {
      "jp": "午後から空が晴れます。",
      "ro": "Gogo kara sora ga haremasu.",
      "id": "Langit cerah mulai siang nanti."
    },
    "nai": {
      "jp": "今週はずっと晴れない。",
      "ro": "Konshuu wa zutto harenai.",
      "id": "Minggu ini sama sekali tidak cerah."
    },
    "te": {
      "jp": "空が晴れて気持ちがいいです。",
      "ro": "Sora ga harete kimochi ga ii desu.",
      "id": "Langit cerah dan rasanya sangat menyenangkan."
    }
  },
  "見せる": {
    "kamus": {
      "jp": "友達に旅行の写真を見せる。",
      "ro": "Tomodachi ni ryokou no shashin o miseru.",
      "id": "Memperlihatkan foto liburan kepada teman."
    },
    "masu": {
      "jp": "先生に宿題を見せます。",
      "ro": "Sensei ni shukudai o misemasu.",
      "id": "Memperlihatkan PR kepada guru."
    },
    "nai": {
      "jp": "パスワードは誰にも見せないでください。",
      "ro": "Pasuwaado wa dare ni mo misenaide kudasai.",
      "id": "Tolong jangan memperlihatkan kata sandi ke siapa pun."
    },
    "te": {
      "jp": "パスポートを見せてください。",
      "ro": "Pasupooto o misete kudasai.",
      "id": "Tolong perlihatkan paspor Anda."
    }
  },
  "忘れる": {
    "kamus": {
      "jp": "宿題を家に忘れる。",
      "ro": "Shukudai o ie ni wasureru.",
      "id": "Meninggalkan/lupa PR di rumah."
    },
    "masu": {
      "jp": "たまに傘を忘れます。",
      "ro": "Tamani kasa o wasuremasu.",
      "id": "Kadang-kadang lupa membawa payung."
    },
    "nai": {
      "jp": "約束を忘れないでください。",
      "ro": "Yakusoku o wasurenaide kudasai.",
      "id": "Tolong jangan lupakan janji kita."
    },
    "te": {
      "jp": "財布を忘れて出かけてしまいました。",
      "ro": "Saifu o wasurete dekakete shimaimashita.",
      "id": "Lupa membawa dompet dan sudah telanjur pergi."
    }
  },
  "来る": {
    "kamus": {
      "jp": "友達が家に遊びに来る。",
      "ro": "Tomodachi ga ie ni asobi ni kuru.",
      "id": "Teman datang main ke rumah."
    },
    "masu": {
      "jp": "毎朝八時に学校へ来ます。",
      "ro": "Maiasa hachiji ni gakkou e kimasu.",
      "id": "Datang ke sekolah jam 8 setiap pagi."
    },
    "nai": {
      "jp": "雨だから彼は来ない。",
      "ro": "Ame dakara kare wa konai.",
      "id": "Karena hujan dia tidak datang."
    },
    "te": {
      "jp": "ここに来て座ってください。",
      "ro": "Koko ni kite suwatte kudasai.",
      "id": "Silakan datang ke sini dan duduklah."
    }
  },
  "する": {
    "kamus": {
      "jp": "放課後にサッカーをする。",
      "ro": "Houkago ni sakkaa o suru.",
      "id": "Bermain sepak bola sepulang sekolah."
    },
    "masu": {
      "jp": "毎晩日本語の勉強をします。",
      "ro": "Maiban Nihongo no benkyou o shimasu.",
      "id": "Setiap malam belajar bahasa Jepang."
    },
    "nai": {
      "jp": "授業中は無駄話をしない。",
      "ro": "Jugyouchuu wa mudabanashi o shinai.",
      "id": "Tidak mengobrol sia-sia saat pelajaran."
    },
    "te": {
      "jp": "宿題をして早く寝ました。",
      "ro": "Shukudai o shite hayaku nemashita.",
      "id": "Mengerjakan PR lalu tidur cepat."
    }
  },
  "結婚する": {
    "kamus": {
      "jp": "来年好きな人と結婚する予定です。",
      "ro": "Rainen suki na hito to kekkon suru yotei desu.",
      "id": "Rencana menikah dengan orang yang disukai tahun depan."
    },
    "masu": {
      "jp": "兄は来月結婚します。",
      "ro": "Ani wa raigetsu kekkon shimasu.",
      "id": "Kakak laki-laki menikah bulan depan."
    },
    "nai": {
      "jp": "若い時はまだ結婚しない。",
      "ro": "Wakai toki wa mada kekkon shinai.",
      "id": "Saat masih muda belum menikah."
    },
    "te": {
      "jp": "結婚して幸せな家庭を築きました。",
      "ro": "Kekkon shite shiawase na katei o kizukimashita.",
      "id": "Menikah lalu membangun keluarga yang bahagia."
    }
  },
  "コピーする": {
    "kamus": {
      "jp": "会議の資料をコピーする。",
      "ro": "Kaigi no shiryou o kopii suru.",
      "id": "Memfotokopi materi rapat."
    },
    "masu": {
      "jp": "必要な書類をコピーします。",
      "ro": "Hitsuyou na shorui o kopii shimasu.",
      "id": "Memfotokopi dokumen yang diperlukan."
    },
    "nai": {
      "jp": "この本はコピーしない。",
      "ro": "Kono hon wa kopii shinai.",
      "id": "Tidak memfotokopi buku ini."
    },
    "te": {
      "jp": "十枚コピーして配ってください。",
      "ro": "Juumai kopii shite kubatte kudasai.",
      "id": "Tolong fotokopi 10 lembar lalu bagikan."
    }
  },
  "質問する": {
    "kamus": {
      "jp": "わからない言葉を質問する。",
      "ro": "Wakaranai kotoba o shitsumon suru.",
      "id": "Menanyakan kata yang tidak dimengerti."
    },
    "masu": {
      "jp": "授業の後に先生に質問します。",
      "ro": "Jugyou no ato ni sensei ni shitsumon shimasu.",
      "id": "Bertanya kepada guru setelah kelas."
    },
    "nai": {
      "jp": "恥ずかしがって質問しないのはよくないです。",
      "ro": "Hazukashigatte shitsumon shinai no wa yoku nai desu.",
      "id": "Malu dan tidak bertanya itu tidak baik."
    },
    "te": {
      "jp": "手を挙げて質問してください。",
      "ro": "Te o agete shitsumon shite kudasai.",
      "id": "Silakan angkat tangan dan bertanyalah."
    }
  },
  "洗濯する": {
    "kamus": {
      "jp": "休日にまとめて服を洗濯する。",
      "ro": "Kyuujitsu ni matomete fuku o sentaku suru.",
      "id": "Mencuci pakaian sekaligus di hari libur."
    },
    "masu": {
      "jp": "晴れた日にシーツを洗濯します。",
      "ro": "Hareta hi ni shiitsu o sentaku shimasu.",
      "id": "Mencuci sprei di hari yang cerah."
    },
    "nai": {
      "jp": "雨の日は洗濯しない。",
      "ro": "Ame no hi wa sentaku shinai.",
      "id": "Hari hujan tidak mencuci pakaian."
    },
    "te": {
      "jp": "洗濯して外に干しました。",
      "ro": "Sentaku shite soto ni hoshimashita.",
      "id": "Mencuci lalu menjemurnya di luar."
    }
  },
  "掃除する": {
    "kamus": {
      "jp": "年末に自分の部屋を掃除する。",
      "ro": "Nenmatsu ni jibun no heya o souji suru.",
      "id": "Membersihkan kamar sendiri di akhir tahun."
    },
    "masu": {
      "jp": "毎朝リビングを掃除します。",
      "ro": "Maiasa ribingu o souji shimasu.",
      "id": "Setiap pagi membersihkan ruang tamu."
    },
    "nai": {
      "jp": "忙しくて今週は掃除しない。",
      "ro": "Isogashikute konshuu wa souji shinai.",
      "id": "Sibuk jadi minggu ini tidak bersih-bersih."
    },
    "te": {
      "jp": "部屋をきれいに掃除して気持ちがいいです。",
      "ro": "Heya o kirei ni souji shite kimochi ga ii desu.",
      "id": "Membersihkan kamar sampai bersih dan rasanya nyaman."
    }
  },
  "遅刻する": {
    "kamus": {
      "jp": "寝坊して学校に遅刻する。",
      "ro": "Nebou shite gakkou ni chikoku suru.",
      "id": "Kesiangan lalu terlambat ke sekolah."
    },
    "masu": {
      "jp": "電車が遅れて遅刻します。",
      "ro": "Densha ga okurete chikoku shimasu.",
      "id": "Kereta terlambat sehingga saya terlambat."
    },
    "nai": {
      "jp": "絶対に会議に遅刻しないようにします。",
      "ro": "Zettai ni kaigi ni chikoku shinai you ni shimasu.",
      "id": "Memastikan agar mutlak tidak terlambat rapat."
    },
    "te": {
      "jp": "遅刻して先生に謝りました。",
      "ro": "Chikoku shite sensei ni ayamarimashita.",
      "id": "Terlambat lalu meminta maaf kepada guru."
    }
  },
  "勉強する": {
    "kamus": {
      "jp": "図書館で日本語を勉強する。",
      "ro": "Toshokan de Nihongo o benkyou suru.",
      "id": "Belajar bahasa Jepang di perpustakaan."
    },
    "masu": {
      "jp": "毎晩二時間勉強します。",
      "ro": "Maiban nijikan benkyou shimasu.",
      "id": "Setiap malam belajar selama dua jam."
    },
    "nai": {
      "jp": "休日はあまり勉強しない。",
      "ro": "Kyuujitsu wa amari benkyou shinai.",
      "id": "Hari libur tidak banyak belajar."
    },
    "te": {
      "jp": "しっかり勉強して合格しました。",
      "ro": "Shikkari benkyou shite goukaku shimashita.",
      "id": "Belajar dengan sungguh-sungguh lalu lulus."
    }
  },
  "料理する": {
    "kamus": {
      "jp": "新鮮な魚を料理する。",
      "ro": "Shinsen na sakana o ryouri suru.",
      "id": "Memasak ikan yang segar."
    },
    "masu": {
      "jp": "週末に家族のために料理します。",
      "ro": "Shuumatsu ni kazoku no tame ni ryourishimasu.",
      "id": "Memasak untuk keluarga di akhir pekan."
    },
    "nai": {
      "jp": "外食が多いので家で料理しない。",
      "ro": "Gaishoku ga ooi node ie de ryourishinai.",
      "id": "Banyak makan di luar jadi tidak masak di rumah."
    },
    "te": {
      "jp": "おいしく料理してみんなで食べました。",
      "ro": "Oishiku ryouri shite minna de tabemashita.",
      "id": "Memasak dengan lezat lalu makan bersama."
    }
  },
  "練習する": {
    "kamus": {
      "jp": "毎日発音を練習する。",
      "ro": "Mainichi hatsuon o renshuu suru.",
      "id": "Berlatih pelafalan setiap hari."
    },
    "masu": {
      "jp": "放課後にピアノを練習します。",
      "ro": "Houkago ni piano o renshuushimasu.",
      "id": "Berlatih piano sepulang sekolah."
    },
    "nai": {
      "jp": "テスト前に練習しないのは危険です。",
      "ro": "Tesuto mae ni renshuushinai no wa kiken desu.",
      "id": "Tidak berlatih sebelum ujian itu berisiko."
    },
    "te": {
      "jp": "何度も練習して上手に話せるようになりました。",
      "ro": "Nandomo renshuu shite jouzu ni hanaseru you ni narimashita.",
      "id": "Berlatih berkali-kali sampai bisa berbicara dengan mahir."
    }
  }
};

const CURATED_SENTENCES_EXT = {
  "会う": {
    "ta": {
      "jp": "昨日、駅の前で友達に会った。",
      "ro": "Kinou, eki no mae de tomodachi ni atta.",
      "id": "Kemarin saya bertemu teman di depan stasiun.",
      "note": "Menyatakan pertemuan yang telah selesai terjadi di masa lalu (kasual)."
    },
    "nakatta": {
      "jp": "昨日は忙しくて誰にも会わなかった。",
      "ro": "Kinou wa isogashikute dare ni mo awanakatta.",
      "id": "Kemarin sibuk sehingga tidak bertemu siapa pun.",
      "note": "Menyatakan bahwa tidak ada pertemuan di masa lampau (kasual)."
    },
    "teiru": {
      "jp": "今、カフェで昔の友達と会っている。",
      "ro": "Ima, kafe de mukashi no tomodachi to atteiru.",
      "id": "Sekarang sedang bertemu teman lama di kafe.",
      "note": "Menyatakan pertemuan yang sedang berlangsung secara aktif saat ini."
    },
    "tai": {
      "jp": "日本へ行って昔の先生に会いたい。",
      "ro": "Nihon e itte mukashi no sensei ni aitai.",
      "id": "Saya ingin pergi ke Jepang dan bertemu guru lama.",
      "note": "Menyatakan keinginan pribadi pembicara untuk bertemu seseorang."
    }
  },
  "洗う": {
    "ta": {
      "jp": "ご飯を食べる前にしっかり手を洗った。",
      "ro": "Gohan o taberu mae ni shikkari te o aratta.",
      "id": "Sebelum makan, saya mencuci tangan dengan bersih.",
      "note": "Menyatakan tindakan mencuci tangan yang telah selesai dilakukan."
    },
    "nakatta": {
      "jp": "昨日は疲れていたので車を洗わなかった。",
      "ro": "Kinou wa tsukareteita node kuruma o arawanakatta.",
      "id": "Kemarin tidak mencuci mobil karena kelelahan.",
      "note": "Menyatakan bahwa kegiatan mencuci tidak dilakukan di masa lampau."
    },
    "teiru": {
      "jp": "母は今、台所で野菜を洗っている。",
      "ro": "Haha wa ima, daidokoro de yasai o aratteiru.",
      "id": "Ibu sekarang sedang mencuci sayuran di dapur.",
      "note": "Menyatakan kegiatan mencuci yang sedang berlangsung saat ini."
    },
    "tai": {
      "jp": "泥で汚れたスニーカーを洗いたい。",
      "ro": "Doro de yogoreta suniikaa o arawaitai.",
      "id": "Saya ingin mencuci sepatu kets yang kotor terkena lumpur ini.",
      "note": "Menyatakan keinginan pribadi pembicara untuk mencuci sesuatu."
    }
  },
  "言う": {
    "ta": {
      "jp": "彼はさっき大事なことを言った。",
      "ro": "Kare wa sakki daiji na koto o itta.",
      "id": "Dia tadi telah mengatakan hal yang penting.",
      "note": "Menyatakan perkataan yang telah selesai diucapkan pada waktu lampau."
    },
    "nakatta": {
      "jp": "昨日は会議で何も言わなかった。",
      "ro": "Kinou wa kaigi de nanimo iwanakatta.",
      "id": "Kemarin saya tidak mengatakan apa pun di rapat.",
      "note": "Menyatakan bahwa suatu perkataan tidak diucapkan di masa lalu (kasual)."
    },
    "teiru": {
      "jp": "彼は今、電話で何か言っている。",
      "ro": "Kare wa ima, denwa de nanika itteiru.",
      "id": "Dia sekarang sedang membicarakan sesuatu di telepon.",
      "note": "Menyatakan aktivitas orang lain yang sedang berbicara atau berlangsung saat ini."
    },
    "tai": {
      "jp": "先生に感謝の気持ちを言いたい。",
      "ro": "Sensei ni kansha no kimochi o iitai.",
      "id": "Saya ingin menyampaikan rasa terima kasih kepada guru.",
      "note": "Menyatakan keinginan pribadi pembicara untuk mengucapkan atau menyampaikan sesuatu."
    }
  },
  "歌う": {
    "ta": {
      "jp": "カラオケでみんなと日本の歌を歌った。",
      "ro": "Karaoke de minna to Nihon no uta o utatta.",
      "id": "Kemarin kami bernyanyi lagu Jepang bersama di karaoke.",
      "note": "Menyatakan aktivitas bernyanyi yang telah tuntas dilakukan di masa lampau."
    },
    "nakatta": {
      "jp": "恥ずかしかったので歌わなかった。",
      "ro": "Hazukashikatta node utawanakatta.",
      "id": "Dulu saya tidak bernyanyi karena merasa malu.",
      "note": "Menyatakan tindakan tidak bernyanyi di waktu lampau."
    },
    "teiru": {
      "jp": "妹は部屋で楽しそうに歌っている。",
      "ro": "Imouto wa heya de tanoshisou ni utatteiru.",
      "id": "Adik perempuan sekarang sedang bernyanyi ceria di kamar.",
      "note": "Menyatakan kegiatan bernyanyi yang sedang berlangsung saat ini."
    },
    "tai": {
      "jp": "ステージの上で上手に歌いたい。",
      "ro": "Suteeji no ue de jouzu ni utaitai.",
      "id": "Saya ingin bernyanyi dengan merdu di atas panggung.",
      "note": "Menyatakan keinginan pribadi pembicara untuk bernyanyi."
    }
  },
  "買う": {
    "ta": {
      "jp": "昨日デパートで新しい靴を買った。",
      "ro": "Kinou depaato de atarashii kutsu o katta.",
      "id": "Kemarin saya membeli sepatu baru di department store.",
      "note": "Menyatakan kegiatan membeli yang sudah selesai terjadi di masa lalu."
    },
    "nakatta": {
      "jp": "高すぎたので何も買わなかった。",
      "ro": "Takasugita node nanimo kawanakatta.",
      "id": "Kemarin tidak membeli apa pun karena terlalu mahal.",
      "note": "Menyatakan keputusan tidak membeli di masa lampau."
    },
    "teiru": {
      "jp": "彼は今、コンビニで飲み物を買っている。",
      "ro": "Kare wa ima, konbini de nomimono o katteiru.",
      "id": "Dia sekarang sedang membeli minuman di minimarket.",
      "note": "Menyatakan tindakan membeli yang sedang berlangsung saat ini."
    },
    "tai": {
      "jp": "日本へ旅行に行ってアニメのグッズを買いたい。",
      "ro": "Nihon e ryokou ni itte anime no guzzu o kaitai.",
      "id": "Saya ingin berwisata ke Jepang dan membeli merchandise anime.",
      "note": "Menyatakan hasrat atau keinginan pembicara untuk membeli sesuatu."
    }
  },
  "吸う": {
    "ta": {
      "jp": "山の上で新鮮な空気を深く吸った。",
      "ro": "Yama no ue de shinsen na kuuki o fukaku sutta.",
      "id": "Di puncak gunung tadi, saya menghirup udara segar dalam-dalam.",
      "note": "Menyatakan tindakan menghirup yang telah selesai dilakukan."
    },
    "nakatta": {
      "jp": "健康のために昔からタバコを吸わなかった。",
      "ro": "Kenkou no tame ni mukashi kara tabako o suwanakatta.",
      "id": "Demi kesehatan, dulu saya tidak pernah merokok.",
      "note": "Menyatakan kebiasaan tidak merokok di masa lampau."
    },
    "teiru": {
      "jp": "あそこでタバコを吸っている人は誰ですか。",
      "ro": "Asoko de tabako o sutteiru hito wa dare desu ka.",
      "id": "Siapakah orang yang sedang merokok di sebelah sana itu?",
      "note": "Menerangkan orang yang saat ini sedang melakukan perbuatan merokok."
    },
    "tai": {
      "jp": "森の中で澄んだ空気を吸いたい。",
      "ro": "Mori no naka de sunda kuuki o suitai.",
      "id": "Saya ingin menghirup udara bersih di dalam hutan.",
      "note": "Menyatakan keinginan pribadi untuk menghirup udara segar."
    }
  },
  "違う": {
    "ta": {
      "jp": "私の答えは先生の模範解答と違った。",
      "ro": "Watashi no kotae wa sensei no mohan kaitou to chigatta.",
      "id": "Jawaban saya tadi ternyata berbeda dari kunci jawaban guru.",
      "note": "Menyatakan kondisi perbedaan yang telah diketahui pada masa lampau."
    },
    "nakatta": {
      "jp": "私の予想と結果は違わなかった。",
      "ro": "Watashi no yosou to kekka wa chigawanakatta.",
      "id": "Hasilnya kemarin tidak berbeda dari perkiraan saya.",
      "note": "Menyatakan ketiadaan perbedaan di masa lampau."
    },
    "teiru": {
      "jp": "この二つの単語の意味は少し違っている。",
      "ro": "Kono futatsu no tango no imi wa sukoshi chigatteiru.",
      "id": "Makna dari kedua kosakata ini statusnya sedikit berbeda.",
      "note": "Menyatakan kondisi/status perbedaan yang menetap antar dua hal."
    },
    "tai": {
      "jp": "他の人とは少し違っていたい。",
      "ro": "Hoka no hito to wa sukoshi chigatteitai.",
      "id": "Saya ingin memiliki perbedaan tersendiri dari orang lain.",
      "note": "Menyatakan keinginan pribadi untuk menjadi berbeda/unik."
    }
  },
  "使う": {
    "ta": {
      "jp": "今日の料理にたくさんの野菜を使った。",
      "ro": "Kyou no ryouri ni takusan no yasai o tsukatta.",
      "id": "Untuk masakan hari ini, saya memakai banyak sayuran.",
      "note": "Menyatakan perbuatan memakai yang telah selesai di masa lampau."
    },
    "nakatta": {
      "jp": "昨日は一日中スマホを使わなかった。",
      "ro": "Kinou wa ichinichijuu sumaho o tsukawanakatta.",
      "id": "Kemarin saya seharian penuh tidak menggunakan ponsel.",
      "note": "Menyatakan bahwa barang tidak digunakan di waktu lampau."
    },
    "teiru": {
      "jp": "父は今、庭でそのハサミを使っている。",
      "ro": "Chichi wa ima, niwa de sono hasami o tsukatteiru.",
      "id": "Ayah sekarang sedang menggunakan gunting itu di halaman.",
      "note": "Menyatakan aktivitas penggunaan yang sedang berlangsung saat ini."
    },
    "tai": {
      "jp": "日本語をもっと自然に使いたい。",
      "ro": "Nihon-go o motto shizen ni tsukaitai.",
      "id": "Saya ingin menggunakan bahasa Jepang dengan lebih alami.",
      "note": "Menyatakan keinginan pembicara untuk menggunakan suatu kemampuan."
    }
  },
  "習う": {
    "ta": {
      "jp": "子供のころ５年間ピアノを習った。",
      "ro": "Kodomo no koro gonenkan piano o naratta.",
      "id": "Waktu kecil dulu, saya belajar piano selama 5 tahun.",
      "note": "Menyatakan pengalaman belajar/les yang telah tuntas di masa lalu."
    },
    "nakatta": {
      "jp": "学校でその文法を習わなかった。",
      "ro": "Gakkou de sono bunpou o naranakatta.",
      "id": "Dulu di sekolah kami tidak mempelajari tata bahasa itu.",
      "note": "Menyatakan bahwa materi tersebut tidak dipelajari di masa lalu."
    },
    "teiru": {
      "jp": "今、毎週水曜日に生け花を習っている。",
      "ro": "Ima, maishuu suiyoubi ni ikebana o naratteiru.",
      "id": "Sekarang saya sedang rutin belajar ikebana setiap hari Rabu.",
      "note": "Menyatakan kegiatan kursus/les yang sedang aktif dijalani saat ini."
    },
    "tai": {
      "jp": "日本へ留学する前に柔道を習いたい。",
      "ro": "Nihon e ryuugaku suru mae ni juudou o naraitai.",
      "id": "Saya ingin belajar judo sebelum berangkat kuliah ke Jepang.",
      "note": "Menyatakan keinginan pribadi pembicara untuk mempelajari suatu keahlian."
    }
  },
  "終わる": {
    "ta": {
      "jp": "期末試験は無事に終わった。",
      "ro": "Kimatsu shiken wa buji ni owatta.",
      "id": "Ujian akhir semester sudah selesai dengan lancar.",
      "note": "Menyatakan bahwa peristiwa ujian telah rampung terjadi di masa lalu."
    },
    "nakatta": {
      "jp": "時間までに宿題が終わらなかった。",
      "ro": "Jikan made ni shukudai ga owaranakatta.",
      "id": "PR tidak sempat selesai sampai batas waktunya.",
      "note": "Menyatakan bahwa kegiatan belum sempat tuntas di masa lampau."
    },
    "teiru": {
      "jp": "今日の宿題はもう終わっている。",
      "ro": "Kyou no shukudai wa mou owatteiru.",
      "id": "PR hari ini sudah selesai (semuanya beres).",
      "note": "Menyatakan status/kondisi hasil bahwa pekerjaan telah tuntas dan selesai."
    },
    "tai": {
      "jp": "早くこの面倒な仕事を終わりたい。",
      "ro": "Hayaku kono mendou na shigoto o owaritai.",
      "id": "Saya ingin pekerjaan yang merepotkan ini segera selesai.",
      "note": "Menyatakan keinginan pembicara agar pekerjaan segera usai."
    }
  },
  "始まる": {
    "ta": {
      "jp": "朝９時に日本語の試験が始まった。",
      "ro": "Asa kuji ni Nihon-go no shiken ga hajimatta.",
      "id": "Ujian bahasa Jepang tadi pagi sudah dimulai pukul 9.",
      "note": "Menyatakan awal mula peristiwa yang telah terjadi di masa lalu."
    },
    "nakatta": {
      "jp": "先生が来なくて授業が始まらなかった。",
      "ro": "Sensei ga konakute jugyou ga hajimaranakatta.",
      "id": "Pelajaran tadi tidak kunjung dimulai karena guru belum datang.",
      "note": "Menyatakan peristiwa yang belum dimulai di masa lampau."
    },
    "teiru": {
      "jp": "映画はもう始まっているから急ごう。",
      "ro": "Eiga wa mou hajimatteiru kara isogou.",
      "id": "Filmnya sudah mulai (sedang tayang), mari kita bergegas.",
      "note": "Menyatakan kondisi bahwa penayangan film sudah dimulai dan sedang berlangsung."
    },
    "tai": {
      "jp": "早く春休みが始まってほしい。",
      "ro": "Hayaku haruyasumi ga hajimatte hoshii.",
      "id": "Saya ingin liburan musim semi segera dimulai.",
      "note": "Menyatakan harapan agar suatu periode baru segera dimulai."
    }
  },
  "閉まる": {
    "ta": {
      "jp": "強い風で玄関のドアがバタンと閉まった。",
      "ro": "Tsuyoi kaze de genkan no doa ga batan to shimatta.",
      "id": "Pintu depan tadi terbanting tertutup karena angin kencang.",
      "note": "Menyatakan peristiwa pintu menutup yang telah terjadi (intransitif)."
    },
    "nakatta": {
      "jp": "鍵が引っかかって窓が閉まらなかった。",
      "ro": "Kagi ga hikkakatte mado ga shimaranakatta.",
      "id": "Jendela tadi tidak bisa tertutup rapat karena kuncinya tersangkut.",
      "note": "Menyatakan pintu/jendela yang gagal menutup di masa lalu."
    },
    "teiru": {
      "jp": "銀行の窓口はもう閉まっている。",
      "ro": "Ginkou no madoguchi wa mou shimatteiru.",
      "id": "Loket bank saat ini sudah berstatus tutup.",
      "note": "Menyatakan kondisi/status pintu/loket yang saat ini sedang tertutup."
    },
    "tai": {
      "jp": "エアコンが効くように早くドアが閉まってほしい。",
      "ro": "Eakon ga kiku you ni hayaku doa ga shimatte hoshii.",
      "id": "Saya ingin pintunya segera tertutup agar AC terasa dingin.",
      "note": "Menyatakan keinginan agar kondisi tertutup segera terwujud."
    }
  },
  "止まる": {
    "ta": {
      "jp": "駅の前に黄色いタクシーが止まった。",
      "ro": "Eki no mae ni kiiroi takushii ga tomatta.",
      "id": "Taksi kuning tadi sudah berhenti di depan stasiun.",
      "note": "Menyatakan kendaraan yang telah berhenti di masa lampau."
    },
    "nakatta": {
      "jp": "昨日は雨が一晩中ずっと止まらなかった。",
      "ro": "Kinou wa ame ga hitobanjuu zutto tomaranakatta.",
      "id": "Hujan kemarin malam tidak kunjung berhenti semalaman.",
      "note": "Menyatakan bahwa peristiwa tidak berhenti di masa lalu."
    },
    "teiru": {
      "jp": "あそこに白い車が止まっている。",
      "ro": "Asoko ni shiroi kuruma ga tomatteiru.",
      "id": "Ada mobil putih yang sedang terparkir berhenti di sana.",
      "note": "Menyatakan kondisi kendaraan yang sedang berhenti/parkir (kondisi menetap)."
    },
    "tai": {
      "jp": "京都の伝統的な温泉旅館に泊まりたい。",
      "ro": "Kyouto no dentouteki na onsen ryokan ni tomaritai.",
      "id": "Saya ingin menginap di penginapan onsen tradisional di Kyoto.",
      "note": "Menyatakan keinginan pribadi untuk menginap/berhenti singgah."
    }
  },
  "帰る": {
    "ta": {
      "jp": "父は仕事が終わってさっき家に帰った。",
      "ro": "Chichi wa shigoto ga owatte sakki ie ni kaetta.",
      "id": "Ayah tadi sudah pulang ke rumah setelah pekerjaan selesai.",
      "note": "Menyatakan kepulangan yang telah selesai terjadi di masa lalu."
    },
    "nakatta": {
      "jp": "昨日は仕事が忙しくて早く帰らなかった。",
      "ro": "Kinou wa shigoto ga isogashikute hayaku kaeranakatta.",
      "id": "Kemarin saya tidak pulang cepat karena pekerjaan sibuk.",
      "note": "Menyatakan bahwa kepulangan cepat tidak dilakukan kemarin."
    },
    "teiru": {
      "jp": "兄は今、電車で家に帰っている途中です。",
      "ro": "Ani wa ima, densha de ie ni kaetteiru tochuu desu.",
      "id": "Kakak sekarang sedang dalam perjalanan pulang ke rumah naik kereta.",
      "note": "Menyatakan proses kepulangan yang sedang berlangsung saat ini."
    },
    "tai": {
      "jp": "疲れたから早く自分の部屋に帰りたい。",
      "ro": "Tsukareta kara hayaku jibun no heya ni kaeritai.",
      "id": "Saya ingin segera pulang ke kamar sendiri karena lelah.",
      "note": "Menyatakan hasrat pribadi untuk segera pulang."
    }
  },
  "知る": {
    "ta": {
      "jp": "昨日ニュースを見て初めてその事実を知った。",
      "ro": "Kinou nyuusu o mite hajimete sono jijitsu o shitta.",
      "id": "Kemarin saya baru pertama kali mengetahui fakta itu lewat berita.",
      "note": "Menyatakan momen ketika suatu informasi baru disadari di masa lalu."
    },
    "nakatta": {
      "jp": "そんな大切なことを昨日は知らなかった。",
      "ro": "Sonna taisetsu na koto o kinou wa shiranakatta.",
      "id": "Kemarin saya belum mengetahui hal sepenting itu.",
      "note": "Menyatakan bahwa informasi tersebut belum diketahui pada masa lampau."
    },
    "teiru": {
      "jp": "田中さんの電話番号を知っている。",
      "ro": "Tanaka-san no denwa bangou o shitteiru.",
      "id": "Saya mengetahui nomor telepon Tanaka.",
      "note": "Menyatakan status pengetahuan/pengenalan yang saat ini sudah dimiliki (bukan sedang tahu)."
    },
    "tai": {
      "jp": "日本の歴史と文化をもっと深く知りたい。",
      "ro": "Nihon no rekishi to bunka o motto fukaku shiritai.",
      "id": "Saya ingin mengetahui sejarah dan budaya Jepang lebih mendalam.",
      "note": "Menyatakan keinginan pembicara untuk memperluas pengetahuan."
    }
  },
  "食べる": {
    "ta": {
      "jp": "お昼休みに友達と美味しい寿司を食べた。",
      "ro": "Ohiruyasumi ni tomodachi to oishii sushi o tabeta.",
      "id": "Saat istirahat siang tadi, saya makan sushi lezat bersama teman.",
      "note": "Menyatakan kegiatan makan yang telah selesai di masa lampau."
    },
    "nakatta": {
      "jp": "今朝は時間がなくて朝ご飯を食べなかった。",
      "ro": "Kesa wa jikan ga nakute asagohan o tabenakatta.",
      "id": "Tadi pagi saya tidak sarapan karena tidak sempat.",
      "note": "Menyatakan bahwa kegiatan makan tidak dilakukan di waktu lampau."
    },
    "teiru": {
      "jp": "弟は今、居間でリンゴを食べている。",
      "ro": "Otouto wa ima, ima de ringo o tabeteiru.",
      "id": "Adik laki-laki sekarang sedang makan apel di ruang keluarga.",
      "note": "Menyatakan kegiatan makan yang sedang berlangsung secara aktif saat ini."
    },
    "tai": {
      "jp": "日本に行ったら本場のラーメンを食べたい。",
      "ro": "Nihon ni ittara honba no raamen o tabetai.",
      "id": "Jika pergi ke Jepang nanti, saya ingin makan ramen asli di sana.",
      "note": "Menyatakan keinginan pribadi pembicara untuk menyantap makanan."
    }
  },
  "見る": {
    "ta": {
      "jp": "昨日の夜、テレビで面白い映画を見た。",
      "ro": "Kinou no yoru, terebi de omoshiroi eiga o mita.",
      "id": "Tadi malam saya menonton film yang menarik di televisi.",
      "note": "Menyatakan kegiatan menonton/melihat yang telah selesai di masa lalu."
    },
    "nakatta": {
      "jp": "忙しくてそのドラマを昨日は見なかった。",
      "ro": "Isogashikute sono dorama o kinou wa minakatta.",
      "id": "Kemarin saya tidak menonton drama itu karena sibuk.",
      "note": "Menyatakan tontonan yang tidak disaksikan di waktu lampau."
    },
    "teiru": {
      "jp": "父は今、リビングでニュースを見ている。",
      "ro": "Chichi wa ima, ribingu de nyuusu o miteiru.",
      "id": "Ayah sekarang sedang menonton siaran berita di ruang tamu.",
      "note": "Menyatakan kegiatan menonton yang sedang berlangsung saat ini."
    },
    "tai": {
      "jp": "富士山の頂上から朝日を見たい。",
      "ro": "Fujisan no choujou kara asahi o mitai.",
      "id": "Saya ingin menyaksikan matahari terbit dari puncak Gunung Fuji.",
      "note": "Menyatakan keinginan pribadi pembicara untuk menyaksikan suatu pemandangan."
    }
  },
  "着る": {
    "ta": {
      "jp": "パーティーのために新しいスーツを着た。",
      "ro": "Paatii no tame ni atarashii suutsu o kita.",
      "id": "Tadi saya mengenakan setelan jas baru untuk pesta.",
      "note": "Menyatakan tindakan mengenakan baju yang telah selesai dilakukan."
    },
    "nakatta": {
      "jp": "昨日は暖かかったのでセーターを着なかった。",
      "ro": "Kinou wa atatakakatta node seetaa o kinakatta.",
      "id": "Kemarin tidak memakai sweater karena cuacanya hangat.",
      "note": "Menyatakan pakaian yang tidak dikenakan di masa lampau."
    },
    "teiru": {
      "jp": "田中さんは素敵な黒いジャケットを着ている。",
      "ro": "Tanaka-san wa suteki na kuroi jaketto o kiteiru.",
      "id": "Tanaka sedang mengenakan jaket hitam yang menawan.",
      "note": "Menyatakan pakaian yang saat ini sedang melekat pada tubuh seseorang (kondisi berpakaian)."
    },
    "tai": {
      "jp": "夏祭りの日にきれいな浴衣を着たい。",
      "ro": "Natsumatsuri no hi ni kirei na yukata o kitai.",
      "id": "Saya ingin mengenakan yukata yang cantik pada hari festival musim panas.",
      "note": "Menyatakan keinginan pembicara untuk mengenakan suatu busana."
    }
  },
  "来る": {
    "ta": {
      "jp": "昨日、遠くから友達が家に遊びに来た。",
      "ro": "Kinou, tooku kara tomodachi ga ie ni asobi ni kita.",
      "id": "Kemarin seorang teman datang dari jauh untuk bermain ke rumah.",
      "note": "Menyatakan kedatangan yang telah terjadi di masa lalu."
    },
    "nakatta": {
      "jp": "雨がひどかったので昨日は誰も来なかった。",
      "ro": "Ame ga hidokatta node kinou wa daremo konakatta.",
      "id": "Kemarin tidak ada yang datang karena hujan lebat.",
      "note": "Menyatakan ketiadaan kedatangan pada waktu lampau."
    },
    "teiru": {
      "jp": "ほら、あっちからバスが来ているよ。",
      "ro": "Hora, acchi kara basu ga kiteiru yo.",
      "id": "Lihat, busnya sedang datang mendekat dari arah sana.",
      "note": "Menyatakan pergerakan datang yang sedang berlangsung saat ini."
    },
    "tai": {
      "jp": "いつか家族と一緒にまた日本へ来たい。",
      "ro": "Itsuka kazoku to issho ni mata Nihon e kitai.",
      "id": "Suatu hari nanti saya ingin datang lagi ke Jepang bersama keluarga.",
      "note": "Menyatakan keinginan pembicara untuk berkunjung atau datang kembali."
    }
  },
  "する": {
    "ta": {
      "jp": "昨日たくさん日本語の勉強をした。",
      "ro": "Kinou takusan Nihon-go no benkyou o shita.",
      "id": "Kemarin saya banyak belajar bahasa Jepang.",
      "note": "Menyatakan aktivitas yang telah selesai dilakukan di masa lalu."
    },
    "nakatta": {
      "jp": "昨夜は疲れていたので宿題をしなかった。",
      "ro": "Sakuya wa tsukareteita node shukudai o shinakatta.",
      "id": "Tadi malam saya tidak mengerjakan PR karena lelah.",
      "note": "Menyatakan bahwa pekerjaan tidak dilakukan di waktu lampau."
    },
    "teiru": {
      "jp": "父は今、庭で草取りをしている。",
      "ro": "Chichi wa ima, niwa de kusatori o shiteiru.",
      "id": "Ayah sekarang sedang mencabuti rumput di halaman.",
      "note": "Menyatakan kegiatan yang sedang berlangsung secara aktif saat ini."
    },
    "tai": {
      "jp": "来月、友達と一緒に京都を旅行したい。",
      "ro": "Raigetsu, tomodachi to issho ni Kyouto o ryokou shitai.",
      "id": "Bulan depan saya ingin berwisata ke Kyoto bersama teman.",
      "note": "Menyatakan hasrat atau rencana yang ingin dilakukan pembicara."
    }
  },
  "結婚する": {
    "ta": {
      "jp": "兄は去年の秋に結婚した。",
      "ro": "Ani wa kyonen no aki ni kekkon shita.",
      "id": "Kakak laki-laki saya sudah menikah pada musim gugur tahun lalu.",
      "note": "Menyatakan peristiwa pernikahan yang telah terjadi di masa lalu."
    },
    "nakatta": {
      "jp": "叔父は若いころは結婚しなかった。",
      "ro": "Oji wa wakai koro wa kekkon shinakatta.",
      "id": "Paman saya dulu tidak menikah saat masih muda.",
      "note": "Menyatakan ketiadaan pernikahan pada periode masa lalu."
    },
    "teiru": {
      "jp": "私の姉はすでに結婚している。",
      "ro": "Watashi no ane wa sude ni kekkon shiteiru.",
      "id": "Kakak perempuan saya saat ini berstatus sudah menikah.",
      "note": "Menyatakan status pernikahan yang sah dan bertahan saat ini (bukan sedang melaksanakan akad)."
    },
    "tai": {
      "jp": "将来、優しくて誠実な人と結婚したい。",
      "ro": "Shourai, yasashikute seijitsu na hito to kekkon shitai.",
      "id": "Di masa depan saya ingin menikah dengan orang yang baik dan tulus.",
      "note": "Menyatakan impian atau keinginan pembicara untuk menikah."
    }
  }
};
