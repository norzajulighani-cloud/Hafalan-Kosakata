# ⛩️ BLUEPRINT MASTER: PENGUASAAN HURUF KANA
> **Modul Fondasi Tahap 00 Silabus Yomikata N5: Hiragana & Katakana Terpadu**  
> *Metode: Active Phonetic Drill Murni (Format Pembagian Tahap & Halaman ala Kitab Fonetik / Iqra')*

---

## 📌 1. FILOSOFI & PRINSIP UTAMA METODE IQRA' KANA

1. **Struktur Berjenjang per Tahap & Halaman**:
   - Materi dibagi menjadi **12 Tahap** terfokus (Tahap 1: Vokal A-I-U-E-O, Tahap 2: Baris K, Tahap 3: Baris S, dst.).
   - Setiap Tahap memiliki beberapa halaman bertahap (2 sampai 3 huruf baru per halaman).
2. **Kartu Huruf Inti Bersih (Zero Teori Tambahan)**:
   - Bagian atas hanya menampilkan huruf besar: **Hiragana (Cyan)** ・ **Katakana (Gold)** serta **( Romaji )**.
   - Tanpa istilah rumit atau embel-embel seperti "vokal murni", "konsonan k + a", dsb.
3. **Latihan Membaca Nyaring Dinamis (15 Kotak • 3 Huruf Campuran • 100% Tanpa Romaji)**:
   - Format kotak latihan: **3 kolom ke samping x 5 baris ke bawah (total 15 kotak)**.
   - Setiap kotak memadukan **3 huruf kombinasi Hiragana dan Katakana** (misal: `あ イ あ`, `ア い エ`).
   - Huruf selalu diacak otomatis tiap refresh halaman atau melalui tombol `[ 🔄 Acak Latihan Baru ]`.
   - **Nol Romaji**: Memaksa mata mengenali bentuk aksara secara langsung.
4. **Audio Penutur Asli Sekali Ketuk (*Tap-to-Pronounce*)**:
   - Sentuh kotak latihan mana saja untuk mendengarkan lafal 3 huruf secara terputus dan berirama per ketukan (*"a, a, a"*, bukan *"aaa"* tersambung) menggunakan jeda fonetik Jepang `、 ` dan tempo teratur `0.82`.
5. **Mode Putar Otomatis (*Read-Along Auto-Play*)**:
   - Fitur otomatis membaca kotak 01 sampai 15 secara berurutan dengan kursor cahaya untuk latihan mandiri (*shadowing*).
6. **Custom Popover Dropdown (Bukan Default Browser)**:
   - Dropdown menggunakan overlay popover bertema gelap (*Dark Glass*) yang rapi, mengelompokkan halaman berdasarkan Tahap dengan penanda gembok `🔒` dan status halaman aktif.

---

## 🎯 2. SPESIFIKASI 8 MODEL SOAL (ARSITEKTUR KUIS KANA)

Berikut adalah **8 model soal interaktif** resmi yang disepakati untuk mengisi Tes Penguatan dan Ujian Kenaikan Tahap:

| No | Nama Model | Mekanisme & Deskripsi Interaksi | Target Kognitif |
| :---: | :--- | :--- | :--- |
| **1** | **Refleks Tebak Cepat** *(Kana ↔ Romaji)* | **A. Kana $\rightarrow$ Romaji**: Huruf besar `あ イ` $\rightarrow$ pilih opsi romaji `a - i`.<br>**B. Romaji $\rightarrow$ Kana**: Diberikan romaji `ka - ki` $\rightarrow$ pilih kartu `か き`. | Refleks pemetaan visual aksara ke bunyi dan sebaliknya. |
| **2** | **Benar atau Salah** *(True/False)* | Muncul kartu padanan, misal: `か ・ キ` $\rightarrow$ dibaca *"ka - ki"*. Pengguna menekan tombol besar **`[ ✓ BENAR ]`** atau **`[ ✗ SALAH ]`**. | Kecepatan verifikasi instan tanpa mengeja lambat di kepala. |
| **3** | **Match Pairs Kembar** | Di layar muncul 6–8 kartu acak (campuran Hiragana & Katakana). Ketuk kartu `あ` lalu pasangannya `ア` $\rightarrow$ kartu meletup lenyap dengan kilau bintang. | Asosiasi instan bentuk Hiragana dengan Katakana kembarannya. |
| **4** | **Sortir Keranjang** *(Hiragana vs Katakana)* | Muncul kartu aksara/kata acak, pengguna menyortir ke keranjang **🔵 Hiragana** atau **🟡 Katakana**. | Pemilahan sistem alfabet Jepang di alam bawah sadar. |
| **5** | **Tebak Dengar Suara** *(Audio-to-Kana)* | Sistem membunyikan audio penutur asli (misal: *"su - shi"*). Pengguna memilih kartu Kana yang tepat murni dari telinga ke mata (100% tanpa romaji). | Melatih hubungan langsung pendengaran ke visual aksara. |
| **6** | **Susun Balok Kata** *(Word Scramble)* | Diberikan arti & romaji kata nyata (misal: *"BIRU (aoi)"*), pengguna menyusun balok huruf acak (`あ` $\rightarrow$ `お` $\rightarrow$ `い` atau Katakana `ア` $\rightarrow$ `オ` $\rightarrow$ `イ`). | Pemahaman pembentukan kata nyata bahasa Jepang. |
| **7** | **Lengkapi Huruf yang Hilang** *(Fill in the Blank)* | Diberikan kata dengan 1 huruf bolong (misal: `[ ね ] [ ? ]` = kucing). Pengguna memilih huruf yang hilang dari opsi pilihan ganda. | Pengenalan kosa kata kontekstual dalam kalimat/kata. |
| **8** | **Time Attack** *(Ketuk Kilat Berwaktu)* | Tantangan cepat 5–7 detik: *"Ketuk semua huruf KA (`か` / `カ`)!"* dari kumpulan gelembung mengambang sebelum waktu habis. | Memicu adrenalin & melatih pemindaian visual secepat kilat (*speed scanning*). |

---

## ⚖️ 3. SISTEM DISTRIBUSI PENGUATAN & UJIAN

Sistem pengujian dibagi secara bertingkat agar pembelajar pemula tidak mengalami *cognitive overload*:

### A. Tahap 1 & Tahap 2 (Fondasi Awal)
* **Tes Penguatan Halaman (5 Soal - Model Tunggal per Sesi)**:
  * Di setiap sesi tes penguatan, **hanya 1 model soal yang aktif secara konsisten** untuk seluruh 5 butir soal (misal: Sesi Hal 1 fokus pada *Benar-Salah* saja).
  * Model soal diambil dari **3 Model Awal** (*Refleks Cepat*, *Benar-Salah*, *Match Pairs*) dan **berganti secara dinamis** ketika pengguna berpindah ke halaman berikutnya atau menekan tombol ulangi/refresh.
  * Syarat lulus: minimal **4 benar** dari 5 soal untuk membuka halaman berikutnya.
* **Ujian Kenaikan Tahap (10 Soal - Variasi 3 Model)**:
  * Menguji seluruh huruf pada tahap tersebut dengan mendistribusikan variasi dari **3 model awal** di atas sepanjang 10 butir soal (syarat lulus: minimal **8 benar**).

### B. Tahap 3 s/d Tahap 12 (Tingkat Lanjut & Masterclass)
* **Tes Penguatan Halaman (10 Soal - Model Tunggal per Sesi)**:
  * Di setiap sesi/halaman, sistem memilih **1 model tunggal** dari kumpulan model terpilih (diambil dari 8 model resmi) sehingga seluruh 10 soal memiliki format fokus yang seragam.
  * Model berganti secara otomatis ketika berpindah halaman atau mengulang tes penguatan.
  * Syarat lulus: minimal **8 benar** dari 10 soal untuk membuka halaman berikutnya.
* **Ujian Kenaikan Tahap (20 Soal • Multi-Stage Dojo Challenge)**:
  * Ujian kelulusan tahap pamungkas yang menyajikan **seluruh 8 model soal** secara bertahap dalam satu tantangan kelulusan komprehensif (syarat lulus: minimal **16 benar**).

### C. Spesifikasi Logika Model 3 (Match Pairs Kembar Bebas)
* **Pencocokan Identitas Fonetik Bebas**: Memasangkan kartu Hiragana dengan Katakana murni berdasarkan kesamaan bunyi romaji (`letter.ro`). Contoh: Huruf `あ` (Hiragana) di posisi mana pun bebas dipasangkan dengan huruf `ア` (Katakana) di posisi mana pun tanpa terikat indeks atau ID internal sistem.
* **Jumlah Pasangan Berjenjang (Progression-Based)**: 
  * **Tahap 1 (Vokal A-I-U-E-O)**: Menyajikan **3 pasang kembar (6 kotak dalam grid 3x2)**. Pada Halaman 1 (vokal A & I), kartu terdistribusi menjadi 3 Hiragana dan 3 Katakana dengan pencocokan fonetik bebas tanpa batasan ID.
  * **Tahap 2 s/d 12 (Tingkat Menengah & Masterclass)**: Menyajikan **4 pasang kembar (8 kotak dalam grid 4x2)** untuk memberikan tantangan daya ingat dan refleks pemindaian aksara yang lebih mantap.
* **Seleksi Kartu Ramah Pengguna**: Jika pengguna mengetuk kartu bertipe sama (misal mengetuk Hiragana lalu mengetuk Hiragana lain), sistem secara mulus memindahkan kursor seleksi ke kartu baru tanpa memberikan penalti salah pasang.

---

## 🧭 4. SILABUS 12 TAHAP (TOTAL 25 HALAMAN)

| Tahap | Topik Bunyi & Aksara | Jumlah Halaman | Sistem Ujian Akhir |
| :---: | :--- | :---: | :--- |
| **Tahap 1** | **Vokal Murni (A - I - U - E - O)** | 3 Hal | 🏆 Ujian Kelulusan Tahap 1 (10 Soal • 3 Model) |
| **Tahap 2** | **Baris K (Ka - Ki - Ku - Ke - Ko)** | 3 Hal | 🏆 Ujian Kelulusan Tahap 2 (10 Soal • 3 Model) |
| **Tahap 3** | **Baris S (Sa - Shi - Su - Se - So)** | 2 Hal | 🏆 Ujian Kelulusan Tahap 3 (20 Soal • Multi-Stage 8 Model) |
| **Tahap 4** | **Baris T (Ta - Chi - Tsu - Te - To)** | 2 Hal | 🏆 Ujian Kelulusan Tahap 4 (20 Soal • Multi-Stage 8 Model) |
| **Tahap 5** | **Baris N (Na - Ni - Nu - Ne - No)** | 2 Hal | 🏆 Ujian Kelulusan Tahap 5 (20 Soal • Multi-Stage 8 Model) |
| **Tahap 6** | **Baris H (Ha - Hi - Fu - He - Ho)** | 2 Hal | 🏆 Ujian Kelulusan Tahap 6 (20 Soal • Multi-Stage 8 Model) |
| **Tahap 7** | **Baris M (Ma - Mi - Mu - Me - Mo)** | 2 Hal | 🏆 Ujian Kelulusan Tahap 7 (20 Soal • Multi-Stage 8 Model) |
| **Tahap 8** | **Baris Y (Ya, Yu, Yo) & Baris R (Ra..Ro)** | 2 Hal | 🏆 Ujian Kelulusan Tahap 8 (20 Soal • Multi-Stage 8 Model) |
| **Tahap 9** | **Baris W (Wa, Wo) & Huruf N (ん/ン)** | 1 Hal | 🏆 **LULUS 46 HURUF DASAR UTAMA!** |
| **Tahap 10** | **Bunyi Dakuten (゛) & Handakuten (゜)** | 2 Hal | 🏆 Ujian Kelulusan Tahap 10 (Ga, Za, Da, Ba, Pa) |
| **Tahap 11** | **Bunyi Hentak (Sokuon っ/ッ) & Vokal Panjang (ー)** | 2 Hal | 🏆 Ujian Kelulusan Tahap 11 (Konsonan Ganda & Tempo) |
| **Tahap 12** | **Bunyi Rangkap (Yōon ゃ, ゅ, ょ)** | 2 Hal | 🎓 **LULUS KANA MASTER (PAMUNGKAS SILABUS 00)** |

---

## 🏗️ 5. ARSITEKTUR KODE (`modules/kana/`)

- **`index.html`**: Antarmuka lembaran membaca minimalis dengan custom popover dropdown, grid pengenalan huruf, lembar latihan 15 kotak dinamis ber-nomor genkouyoushi, dan arena ujian.
- **`style.css`**: Desain obsidian dojo, custom modal dropdown, grid 3 kolom x 5 baris responsif mobile (cakrawala luas), warna dual-aksara (*Cyan = Hiragana*, *Gold = Katakana*).
- **`data.js`**: Basis data resmi `KANA_STAGES` berisi 12 Tahap, pool huruf latihan berjenjang, dan metadata halaman.
- **`script.js`**: Controller interaktif: Web Speech audio engine berketukan, auto-play reader, generator latihan dinamis, pengatur kecepatan lafal, mesin kuis adaptif (8 model soal), dan synthesizer SFX serta particle canvas.

---

## 🎮 6. GAME JUICE: SISTEM VISUAL & AUDIO FX
Untuk mencegah kebosanan dan menghadirkan kepuasan instan (*dopamine hit*) seperti game edukasi modern (Duolingo/Kahoot), modul ini dilengkapi sistem sensorik terpadu:
1. **Synthesized Web Audio SFX (Zero External Files • Bebas Lag)**:
   - *Correct Chime*: Arpeggio kristal nada naik (C5 $\rightarrow$ E5 $\rightarrow$ G5) dengan bonus modulasi frekuensi sesuai panjang *streak*.
   - *Wrong Soft Thud*: Ramp nada turun lembut yang ramah di telinga (tanpa suara buzzer kasar yang membuat frustrasi).
   - *Pop*: Letupan gelembung saat kartu match kembar cocok atau saat kartu Time Attack diketuk.
   - *Victory Fanfare*: Akor kemenangan gemilang saat menuntaskan kelulusan tahap.
2. **Canvas Particle & Confetti FX**:
   - Letupan partikel bintang (*sparkles*) dan percikan cahaya cyan/emas memancar langsung dari posisi tombol/kartu yang diklik.
   - Hujan konfeti meriah durasi 3 detik saat menuntaskan kelulusan tahap.
3. **Streak & Combo System (`🔥 COMBO!`)**:
   - Menjawab benar berturut-turut memicu indikator *streak* berdenyut bara api di bar navigasi soal.
4. **Floating Praise Toast**:
   - Balon pujian melayang dinamis: *"Sugoi! (すごい)"*, *"Luar Biasa!"*, *"Tepat Sekali!"*, *"Refleks Kilat!"* saat benar, serta tips ramah saat salah.
5. **Micro-Interactions**:
   - Tombol membal membesar (*correct bounce*), getar mikro (*wobble shake*) saat salah, serta transisi soal yang mengalir halus.
