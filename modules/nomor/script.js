        function hiraToRomaji(str) {
      if (!str) return '';
      const map = {
        'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo', 'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
        'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho', 'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
        'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo', 'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
        'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo', 'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
        'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo', 'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
        'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
        'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
        'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
        'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
        'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
        'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
        'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
        'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
        'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
        'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
        'わ': 'wa', 'を': 'wo', 'ん': 'n',
        'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
        'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
        'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
        'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
        'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
        'ゼロ': 'zero'
      };
      let res = '';
      let i = 0;
      while (i < str.length) {
        if (str[i] === 'っ') {
          const nextP = str.slice(i + 1, i + 3);
          const nextC = str[i + 1];
          const nextR = map[nextP] || map[nextC] || '';
          if (nextR) res += nextR[0];
          i++;
          continue;
        }
        const pair = str.slice(i, i + 2);
        if (map[pair]) { res += map[pair]; i += 2; continue; }
        const single = str[i];
        if (map[single]) { res += map[single]; i++; continue; }
        res += single;
        i++;
      }
      return res;
    }

    // NUMBER CONVERTER ENGINE
    function convertNumberToJapanese(num) {
      num = parseInt(num, 10);
      if (isNaN(num) || num < 0) return { kanji: '零', hira: 'ゼロ', ro: 'zero' };
      if (num === 0) return { kanji: '零', hira: 'ゼロ', ro: 'zero' };

      const digitsK = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
      const digitsH = ['', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
      const digitsR = ['', 'ichi', 'ni', 'san', 'yon', 'go', 'roku', 'nana', 'hachi', 'kyuu'];

      function readUnder10k(n) {
        let k = '', h = '', r = [];
        const th = Math.floor(n / 1000);
        const hu = Math.floor((n % 1000) / 100);
        const te = Math.floor((n % 100) / 10);
        const un = n % 10;

        if (th > 0) {
          if (th === 1) { k += '千'; h += 'せん'; r.push('sen'); }
          else if (th === 3) { k += '三千'; h += 'さんぜん'; r.push('sanzen'); }
          else if (th === 8) { k += '八千'; h += 'はっせん'; r.push('hassen'); }
          else { k += digitsK[th] + '千'; h += digitsH[th] + 'せん'; r.push(digitsR[th] + 'sen'); }
        }
        if (hu > 0) {
          if (hu === 1) { k += '百'; h += 'ひゃく'; r.push('hyaku'); }
          else if (hu === 3) { k += '三百'; h += 'さんびゃく'; r.push('sanbyaku'); }
          else if (hu === 6) { k += '六百'; h += 'ろっぴゃく'; r.push('roppyaku'); }
          else if (hu === 8) { k += '八百'; h += 'はっぴゃく'; r.push('happyaku'); }
          else { k += digitsK[hu] + '百'; h += digitsH[hu] + 'ひゃく'; r.push(digitsR[hu] + 'hyaku'); }
        }
        if (te > 0) {
          if (te === 1) { k += '十'; h += 'じゅう'; r.push('juu'); }
          else { k += digitsK[te] + '十'; h += digitsH[te] + 'じゅう'; r.push(digitsR[te] + 'juu'); }
        }
        if (un > 0) {
          k += digitsK[un]; h += digitsH[un]; r.push(digitsR[un]);
        }
        return { k, h, r: r.join(' ') };
      }

      const man = Math.floor(num / 10000);
      const rem = num % 10000;

      if (man === 0) {
        const res = readUnder10k(rem);
        return { kanji: res.k, hira: res.h, ro: res.r };
      } else {
        const manRes = readUnder10k(man);
        let k = manRes.k + '万';
        let h = manRes.h + 'まん';
        let r = manRes.r + 'man';
        if (rem > 0) {
          const remRes = readUnder10k(rem);
          k += remRes.k;
          h += ' ' + remRes.h;
          r += ' ' + remRes.r;
        }
        return { kanji: k, hira: h, ro: r };
      }
    }

    // MAIN APP CONTROLLER
    const Modul = {
      mainMode: 'fc',             // 'fc', 'tools', 'quiz'
      activeCategory: 'angka',    // 'angka', 'waktu', 'kalender', 'relatif'
      activeSesi: 0,
      cardIdx: 0,
      activeTool: 'clock',        // 'clock', 'cal', 'conv'

      // Clock widget state
      clockHour: 7,
      clockMin: 30,
      clockAMPM: 'AM',

      // Cal widget state
      selectedCalDay: 1,

      // Quiz state
      idxQuiz: 0,
      scoreQuiz: 0,
      quizCorrectCount: 0,
      drillSubtype: 'mix',
      quizSourceMode: 'mastered',
      quizTargetMode: 'all',
      quizCustomCount: 20,
      activeQuizData: [],

      masteredList: [],
      soundEnabled: true,
      csActiveTab: 'angka',
      _audioCtx: null,

      init: function () {
        this.loadMastery();
        this.loadActiveArray();
        this.updateActiveSessionUI();
        this.renderSidebarContent();
        this.renderFC();
        this.initCalendarTool();
        this.updateClockWidget();
        this.initJosuushiTool();
        this.bindKeyboardShortcuts();
        this.updateMasteryCounter();
        this.switchMainMode('fc');
      },

      getTotalVocabCount: function () {
        let total = 0;
        for (const k in DB_Angka) { total += DB_Angka[k].length; }
        if (typeof DB_Hitung !== 'undefined') total += DB_Hitung.length;
        total += DB_Waktu.length;
        total += DB_Kalender.length;
        total += DB_Relatif.length;
        return total;
      },

      getCategoryData: function (catKey = this.activeCategory, sesiIdx = this.activeSesi) {
        if (catKey === 'angka') {
          const page = Pages_Angka[sesiIdx] || Pages_Angka[0];
          const items = DB_Angka[page.key] || [];
          return { pages: Pages_Angka, items, icon: '🔢', name: 'Bilangan', key: 'angka' };
        }
        if (catKey === 'hitung') {
          const page = Pages_Hitung[sesiIdx] || Pages_Hitung[0];
          const items = DB_Hitung.filter(i => page.groups.includes(i.grp));
          return { pages: Pages_Hitung, items, icon: '📦', name: 'Satuan Hitung', key: 'hitung' };
        }
        if (catKey === 'waktu') {
          const page = Pages_Waktu[sesiIdx] || Pages_Waktu[0];
          const items = DB_Waktu.filter(i => page.groups.includes(i.grp));
          return { pages: Pages_Waktu, items, icon: '⏰', name: 'Jam & Menit', key: 'waktu' };
        }
        if (catKey === 'kalender') {
          const page = Pages_Kalender[sesiIdx] || Pages_Kalender[0];
          const items = DB_Kalender.filter(i => page.groups.includes(i.grp));
          return { pages: Pages_Kalender, items, icon: '📅', name: 'Kalender', key: 'kalender' };
        }
        if (catKey === 'relatif') {
          const page = Pages_Relatif[sesiIdx] || Pages_Relatif[0];
          const items = DB_Relatif.filter(i => page.groups.includes(i.grp));
          return { pages: Pages_Relatif, items, icon: '⏳', name: 'Waktu Relatif', key: 'relatif' };
        }
        return { pages: [], items: [], icon: '🔢', name: '', key: '' };
      },

      loadActiveArray: function () {
        const data = this.getCategoryData();
        this.activeArray = data.items;
        if (this.cardIdx >= this.activeArray.length) this.cardIdx = 0;
      },

      switchMainMode: function (mode) {
        this.playSfx('tap');
        this.mainMode = mode;
        const modes = ['fc', 'tools', 'quiz'];
        modes.forEach(m => {
          const btn = document.getElementById('btn-tab-' + m);
          const sec = document.getElementById('sec-' + m);
          if (btn) btn.classList.toggle('active', m === mode);
          if (sec) sec.classList.toggle('hidden', m !== mode);
        });

        if (mode === 'quiz') {
          this.activeQuizData = this.generateQuizQuestions();
          this.idxQuiz = 0;
          this.scoreQuiz = 0;
          this.quizCorrectCount = 0;
          this.renderQuiz(true);
        } else if (mode === 'fc') {
          this.renderFC();
        }
      },

      updateActiveSessionUI: function () {
        const data = this.getCategoryData();
        const curPage = data.pages[this.activeSesi] || data.pages[0];
        const lbl = document.getElementById('active-session-label');
        if (lbl && curPage) {
          lbl.innerText = `${data.icon} ${curPage.title}`;
        }
      },

      sidebarExpandedCategories: null,

      toggleCategoryAccordion: function (catKey) {
        this.playSfx('tap');
        if (!this.sidebarExpandedCategories) {
          this.sidebarExpandedCategories = { [this.activeCategory]: true };
        }
        if (typeof this.sidebarExpandedCategories[catKey] === 'undefined') {
          this.sidebarExpandedCategories[catKey] = (catKey === this.activeCategory);
        }
        this.sidebarExpandedCategories[catKey] = !this.sidebarExpandedCategories[catKey];
        const isOpen = this.sidebarExpandedCategories[catKey];
        const sec = document.getElementById('sd-section-' + catKey);
        if (sec) {
          sec.classList.toggle('is-open', isOpen);
          sec.classList.toggle('is-collapsed', !isOpen);
          const arrow = sec.querySelector('.sd-acc-arrow');
          if (arrow) arrow.innerText = isOpen ? '▾' : '▸';
        }
      },

      renderSidebarContent: function () {
        const container = document.getElementById('sd-body-content');
        if (!container) return;

        if (!this.sidebarExpandedCategories) {
          this.sidebarExpandedCategories = { [this.activeCategory]: true };
        }

        const categories = [
          { key: 'angka', name: 'Bilangan (Angka)', icon: '🔢', pages: Pages_Angka, titleCls: '' },
          { key: 'hitung', name: 'Satuan Hitung (Josuushi)', icon: '📦', pages: Pages_Hitung, titleCls: 'title-hitung' },
          { key: 'waktu', name: 'Jam, Menit & Detik', icon: '⏰', pages: Pages_Waktu, titleCls: 'title-waktu' },
          { key: 'kalender', name: 'Hari, Tanggal, Bulan & Tahun', icon: '📅', pages: Pages_Kalender, titleCls: 'title-kalender' },
          { key: 'relatif', name: 'Keterangan Waktu Relatif', icon: '⏳', pages: Pages_Relatif, titleCls: 'title-relatif' }
        ];

        let html = '';

        categories.forEach(cat => {
          let catTotal = 0;
          let catMastered = 0;

          const sessionData = cat.pages.map((p, idx) => {
            let items = [];
            if (cat.key === 'angka') items = DB_Angka[p.key] || [];
            else if (cat.key === 'hitung') items = DB_Hitung.filter(i => p.groups.includes(i.grp));
            else if (cat.key === 'waktu') items = DB_Waktu.filter(i => p.groups.includes(i.grp));
            else if (cat.key === 'kalender') items = DB_Kalender.filter(i => p.groups.includes(i.grp));
            else if (cat.key === 'relatif') items = DB_Relatif.filter(i => p.groups.includes(i.grp));

            const mCount = items.filter(i => this.masteredList.includes(i.k)).length;
            catTotal += items.length;
            catMastered += mCount;
            const samples = items.slice(0, 3).map(i => i.k).join(' · ');
            const isActive = (this.activeCategory === cat.key && this.activeSesi === idx);

            return { title: p.title, items, mCount, samples, isActive, idx };
          });

          const isOpen = typeof this.sidebarExpandedCategories[cat.key] !== 'undefined'
            ? this.sidebarExpandedCategories[cat.key]
            : (cat.key === this.activeCategory);

          html += `
          <div class="sd-section ${isOpen ? 'is-open' : 'is-collapsed'}" id="sd-section-${cat.key}">
            <div class="sd-section-title ${cat.titleCls}" onclick="Modul.toggleCategoryAccordion('${cat.key}')" title="Klik untuk membuka/menutup ${cat.name}">
              <div class="sd-title-left">
                <span class="sd-acc-arrow">${isOpen ? '▾' : '▸'}</span>
                <span>${cat.icon} ${cat.name}</span>
              </div>
              <span class="sd-title-badge">${catMastered}/${catTotal}</span>
            </div>
            <div class="sd-session-list" id="sd-session-list-${cat.key}">
              ${sessionData.map(s => `
                <div class="sd-item ${s.isActive ? 'active' : ''}" onclick="Modul.selectSessionFromSidebar('${cat.key}', ${s.idx})">
                  <div class="sd-item-left">
                    <div class="sd-item-title">${s.title}</div>
                    <div class="sd-item-samples">${s.samples || '...'}</div>
                  </div>
                  <div class="sd-item-right">
                    <span class="sd-count-badge">${s.items.length} kata</span>
                    ${s.mCount > 0 ? `<span class="sd-star-tag">⭐ ${s.mCount}</span>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          `;
        });

        container.innerHTML = html;
      },

      selectSessionFromSidebar: function (catKey, idx) {
        this.playSfx('tap');
        this.activeCategory = catKey;
        this.activeSesi = idx;
        this.cardIdx = 0;
        if (!this.sidebarExpandedCategories) this.sidebarExpandedCategories = {};
        this.sidebarExpandedCategories[catKey] = true;
        this.loadActiveArray();
        this.updateActiveSessionUI();
        this.renderSidebarContent();
        this.renderFC();
        this.switchMainMode('fc');
        this.closeSidebar();
      },

      switchTool: function (tool) {
        this.playSfx('tap');
        this.activeTool = tool;
        ['clock', 'cal', 'conv', 'josuushi'].forEach(t => {
          const btn = document.getElementById('tab-tool-' + t);
          const content = document.getElementById('tool-' + t + '-content');
          if (btn) btn.classList.toggle('active', t === tool);
          if (content) content.classList.toggle('hidden', t !== tool);
        });
        if (tool === 'josuushi') {
          this.renderJosuushi();
        }
      },

      sentencesMap: {
        // Relatif items without ex
        '日': { jp: '今日はいい<span class="sent-hl-num">日</span>ですね。', ro: 'Kyou wa ii hi desu ne.', id: 'Hari ini hari yang menyenangkan ya.' },
        '週': { jp: '一<span class="sent-hl-num">週</span>間に二回運動します。', ro: 'Isshuukan ni ni-kai undou shimasu.', id: 'Berolahraga dua kali dalam seminggu.' },
        '月': { jp: '一ヶ<span class="sent-hl-num">月</span>に一度映画を見ます。', ro: 'Ikkagetsu ni ichido eiga o mimasu.', id: 'Menonton film satu kali dalam sebulan.' },
        '年': { jp: '三<span class="sent-hl-num">年</span>間日本語を勉強しました。', ro: 'San-nen-kan Nihongo o benkyou shimashita.', id: 'Belajar bahasa Jepang selama tiga tahun.' },
        '朝': { jp: '<span class="sent-hl-num">朝</span>七時に起きて散歩します。', ro: 'Asa shichi-ji ni okite sanpo shimasu.', id: 'Bangun jam 7 pagi lalu jalan-jalan santai.' },
        '夜': { jp: '<span class="sent-hl-num">夜</span>十時に部屋で本を読みます。', ro: 'Yoru juu-ji ni heya de hon o yomimasu.', id: 'Membaca buku di kamar pada jam 10 malam.' },
        '晩': { jp: '<span class="sent-hl-num">晩</span>ご飯を一緒に食べましょう。', ro: 'Bangohan o issho ni tabemashou.', id: 'Ayo makan malam bersama-sama.' },
        'いつ': { jp: '日本へ<span class="sent-hl-num">いつ</span>行きますか。', ro: 'Nihon e itsu ikimasu ka.', id: 'Kapan kamu pergi ke Jepang?' },

        // Nama Hari
        '日曜日': { jp: '<span class="sent-hl-num">日曜日</span>は学校が休みです。', ro: 'Nichiyoubi wa gakkou ga yasumi desu.', id: 'Hari Minggu sekolah libur.' },
        '月曜日': { jp: '<span class="sent-hl-num">月曜日</span>からまた仕事が始まります。', ro: 'Getsuyoubi kara mata shigoto ga hajimarimasu.', id: 'Mulai hari Senin pekerjaan dimulai kembali.' },
        '火曜日': { jp: '<span class="sent-hl-num">火曜日</span>に日本語のテストがあります。', ro: 'Kayoubi ni Nihongo no tesuto ga arimasu.', id: 'Hari Selasa ada ujian bahasa Jepang.' },
        '水曜日': { jp: '<span class="sent-hl-num">水曜日</span>の午後は図書館へ行きます。', ro: 'Suiyoubi no gogo wa toshokan e ikimasu.', id: 'Rabu siang pergi ke perpustakaan.' },
        '木曜日': { jp: '<span class="sent-hl-num">木曜日</span>は友達と晩ご飯を食べます。', ro: 'Mokuyoubi wa tomodachi to bangohan o tabemasu.', id: 'Hari Kamis makan malam bersama teman.' },
        '金曜日': { jp: '<span class="sent-hl-num">金曜日</span>の夜に映画を見ます。', ro: 'Kinyoubi no yoru ni eiga o mimasu.', id: 'Malam Jumat menonton bioskop / film.' },
        '土曜日': { jp: '<span class="sent-hl-num">土曜日</span>にデパートで買い物をします。', ro: 'Doyoubi ni depaato de kaimono o shimasu.', id: 'Hari Sabtu berbelanja di department store.' },
        '何曜日': { jp: '今日は<span class="sent-hl-num">何曜日</span>ですか。', ro: 'Kyou wa nan-youbi desu ka.', id: 'Hari ini hari apa?' },

        // Angka Dasar
        '零': { jp: '外の気温は<span class="sent-hl-num">零</span>度です。', ro: 'Soto no kion wa zero-do desu.', id: 'Suhu udara di luar 0 derajat.' },
        '一': { jp: 'リンゴを<span class="sent-hl-num">一つ</span>買いました。', ro: 'Ringo o hitotsu kaimashita.', id: 'Membeli satu buah apel.' },
        '二': { jp: 'チケットが<span class="sent-hl-num">二枚</span>あります。', ro: 'Chiketto ga ni-mai arimasu.', id: 'Ada dua lembar tiket.' },
        '三': { jp: '<span class="sent-hl-num">三人</span>でご飯を食べました。', ro: 'San-nin de gohan o tabemashita.', id: 'Makan bersama bertiga.' },
        '四': { jp: 'ペンが<span class="sent-hl-num">四本</span>あります。', ro: 'Pen ga yon-hon arimasu.', id: 'Ada empat batang pulpen.' },
        '五': { jp: '<span class="sent-hl-num">五人</span>のグループで作りました。', ro: 'Go-nin no guruupu de tsukurimashita.', id: 'Dibuat dalam kelompok beranggotakan lima orang.' },
        '六': { jp: '卵が<span class="sent-hl-num">六個</span>あります。', ro: 'Tamago ga rok-ko arimasu.', id: 'Ada enam butir telur.' },
        '七': { jp: '一週間は<span class="sent-hl-num">七日</span>です。', ro: 'Isshuukan wa nanoka desu.', id: 'Satu minggu adalah tujuh hari.' },
        '八': { jp: '庭に猫が<span class="sent-hl-num">八匹</span>います。', ro: 'Niwa ni neko ga hap-piki imasu.', id: 'Ada delapan ekor kucing di halaman.' },
        '九': { jp: '本を<span class="sent-hl-num">九冊</span>読みました。', ro: 'Hon o kyuu-satsu yomimashita.', id: 'Membaca sembilan buah buku.' },
        '十': { jp: '<span class="sent-hl-num">十人</span>の学生が教室にいます。', ro: 'Juu-nin no gakusei ga kyoushitsu ni imasu.', id: 'Ada sepuluh orang siswa di dalam kelas.' },
        '百': { jp: 'この消しゴムは<span class="sent-hl-num">百</span>円です。', ro: 'Kono keshigomu wa hyaku-en desu.', id: 'Penghapus ini seharga 100 yen.' },
        '千': { jp: '<span class="sent-hl-num">千</span>円札を出しました。', ro: 'Sen-en satsu o dashimashita.', id: 'Mengeluarkan selembar uang seribu yen.' },
        '一万': { jp: '財布に<span class="sent-hl-num">一万</span>円入っています。', ro: 'Saifu ni ichiman-en haitte imasu.', id: 'Ada sepuluh ribu yen di dalam dompet.' },
        '十万': { jp: 'アパートの家賃は<span class="sent-hl-num">十万</span>円です。', ro: 'Apaato no yachin wa juuman-en desu.', id: 'Sewa apartemen adalah 100.000 yen.' },
        '百万': { jp: 'このバイクは<span class="sent-hl-num">百万</span>円でした。', ro: 'Kono baiku wa hyakuman-en deshita.', id: 'Sepeda motor ini harganya satu juta yen.' },
        '一億': { jp: '日本の人口は約<span class="sent-hl-num">一億</span>二千万人です。', ro: 'Nihon no jinkou wa yaku ichi-oku ni-sen-man-nin desu.', id: 'Populasi Jepang sekitar 120 juta orang.' },
        '一兆': { jp: '国家予算は百<span class="sent-hl-num">兆</span>円を超えています。', ro: 'Kokka yosan wa hyakuchou-en o koete imasu.', id: 'Anggaran negara melampaui seratus triliun yen.' },

        // Tanya & Format Khusus
        '何時': { jp: 'すみません、今<span class="sent-hl-num">何時</span>ですか。', ro: 'Sumimasen, ima nan-ji desu ka.', id: 'Permisi, sekarang jam berapa?' },
        '何分': { jp: 'あと<span class="sent-hl-num">何分</span>で電車が来ますか。', ro: 'Ato nan-pun de densha ga kimasu ka.', id: 'Berapa menit lagi keretanya datang?' },
        '何秒': { jp: 'あと<span class="sent-hl-num">何秒</span>で始まりますか。', ro: 'Ato nan-byou de hajimarimasu ka.', id: 'Berapa detik lagi acara akan dimulai?' },
        '何日': { jp: '今日は<span class="sent-hl-num">何日</span>ですか。', ro: 'Kyou wa nan-nichi desu ka.', id: 'Hari ini tanggal berapa?' },
        '何月': { jp: 'あなたの誕生日は<span class="sent-hl-num">何月</span>ですか。', ro: 'Anata no tanjoubi wa nan-gatsu desu ka.', id: 'Ulang tahunmu bulan apa?' },
        '何年': { jp: '日本に<span class="sent-hl-num">何年</span>住んでいますか。', ro: 'Nihon ni nan-nen sunde imasu ka.', id: 'Sudah berapa tahun tinggal di Jepang?' },
        '何時間': { jp: '毎日<span class="sent-hl-num">何時間</span>寝ますか。', ro: 'Mainichi nan-jikan nemasu ka.', id: 'Setiap hari tidur berapa jam?' },

        // Jam Khusus
        '一時': { jp: '<span class="sent-hl-num">一時</span>ちょうどにロビーで会いましょう。', ro: 'Ichi-ji choudo ni robii de aimashou.', id: 'Mari bertemu di lobi tepat pukul 1.' },
        '四時': { jp: '午後<span class="sent-hl-num">四時</span>に授業が終わります。', ro: 'Gogo yo-ji ni jugyou ga owarimasu.', id: 'Pelajaran selesai pukul 4 sore.' },
        '七時': { jp: '毎朝<span class="sent-hl-num">七時</span>に朝ご飯を食べます。', ro: 'Maiasa shichi-ji ni asagohan o tabemasu.', id: 'Setiap pagi makan sarapan pukul 7.' },
        '九時': { jp: '夜<span class="sent-hl-num">九時</span>に勉強を始めます。', ro: 'Yoru ku-ji ni benkyou o hajimemasu.', id: 'Mulai belajar pada pukul 9 malam.' },
        '半': { jp: '今は七時<span class="sent-hl-num">半</span>です。', ro: 'Ima wa shichi-ji han desu.', id: 'Sekarang pukul setengah delapan (07:30).' },
        '午前': { jp: '<span class="sent-hl-num">午前</span>中に小包が届きます。', ro: 'Gozenchuu ni kozutsumi ga todokimasu.', id: 'Paket kiriman akan tiba di pagi hari (AM).' },
        '午後': { jp: '<span class="sent-hl-num">午後</span>から雨が降るそうです。', ro: 'Gogo kara ame ga furu sou desu.', id: 'Katanya mulai siang/sore (PM) akan turun hujan.' },

        // Tanggal Khusus N5
        '一日': { jp: '<span class="sent-hl-num">一日</span>は新しい月の始まりです。', ro: 'Tsuitachi wa atarashii tsuki no hajimari desu.', id: 'Tanggal 1 adalah awal bulan baru.' },
        '二日': { jp: '<span class="sent-hl-num">二日</span>に日本へ出発します。', ro: 'Futsuka ni Nihon e shuppatsu shimasu.', id: 'Berangkat ke Jepang pada tanggal 2.' },
        '三日': { jp: '<span class="sent-hl-num">三日</span>間旅行に行きました。', ro: 'Mikka-kan ryokou ni ikimashita.', id: 'Pergi berwisata selama 3 hari.' },
        '四日': { jp: '<span class="sent-hl-num">四日</span>に荷物が届きます。', ro: 'Yokka ni nimotsu ga todokimasu.', id: 'Barang kiriman akan sampai pada tanggal 4.' },
        '五日': { jp: '<span class="sent-hl-num">五日</span>待ってください。', ro: 'Itsuka matte kudasai.', id: 'Tolong tunggu selama lima hari.' },
        '六日': { jp: '<span class="sent-hl-num">六日</span>に会議があります。', ro: 'Muika ni kaigi ga arimasu.', id: 'Ada rapat pertemuan pada tanggal 6.' },
        '七日': { jp: '<span class="sent-hl-num">七日</span>は友達の誕生日です。', ro: 'Nanoka wa tomodachi no tanjoubi desu.', id: 'Tanggal 7 adalah ulang tahun teman.' },
        '八日': { jp: '<span class="sent-hl-num">八日</span>に病院へ行きます。', ro: 'Youka ni byouin e ikimasu.', id: 'Pergi ke rumah sakit pada tanggal 8.' },
        '九日': { jp: '<span class="sent-hl-num">九日</span>にレポートを出します。', ro: 'Kokonoka ni repooto o dashimasu.', id: 'Mengumpulkan laporan pada tanggal 9.' },
        '十日': { jp: '<span class="sent-hl-num">十日</span>間休みをもらいました。', ro: 'Tooka-kan yasumi o moraimashita.', id: 'Mendapatkan jatah libur selama 10 hari.' },
        '十四日': { jp: '<span class="sent-hl-num">十四日</span>はバレンタインデーです。', ro: 'Juuyokka wa barentain dee desu.', id: 'Tanggal 14 adalah Hari Valentine.' },
        '二十日': { jp: '<span class="sent-hl-num">二十日</span>に給料をもらいます。', ro: 'Hatsuka ni kyuuryou o moraimasu.', id: 'Mendapatkan gaji pada tanggal 20.' },
        '二十四日': { jp: '<span class="sent-hl-num">二十四日</span>の夜にパーティーがあります。', ro: 'Nijuuyokka no yoru ni paatii ga arimasu.', id: 'Ada pesta pada malam tanggal 24.' },

        // Bulan Khusus
        '四月': { jp: '<span class="sent-hl-num">四月</span>に桜が美しく咲きます。', ro: 'Shi-gatsu ni sakura ga utsukushiku sakimasu.', id: 'Bunga sakura mekar indah di bulan April.' },
        '七月': { jp: '<span class="sent-hl-num">七月</span>に楽しい夏休みが始まります。', ro: 'Shichi-gatsu ni tanoshii natsuyasumi ga hajimarimasu.', id: 'Liburan musim panas menyenangkan mulai di bulan Juli.' },
        '九月': { jp: '<span class="sent-hl-num">九月</span>になると秋の風が吹きます。', ro: 'Ku-gatsu ni naru to aki no kaze ga fukimasu.', id: 'Memasuki bulan September hembusan angin musim gugur bertiup.' },

        // Tahun
        '今年': { jp: '<span class="sent-hl-num">今年</span>は日本へ行きたいです。', ro: 'Kotoshi wa Nihon e ikitai desu.', id: 'Tahun ini saya ingin pergi ke Jepang.' },
        '去年': { jp: '<span class="sent-hl-num">去年</span>高校を卒業しました。', ro: 'Kyonen koukou o sotsugyou shimashita.', id: 'Tahun lalu saya lulus dari SMA.' },
        '来年': { jp: '<span class="sent-hl-num">来年</span>また会いましょう。', ro: 'Rainen mata aimashou.', id: 'Mari kita berjumpa lagi tahun depan.' }
      },

      getGroupTag: function (item) {
        if (!item) return 'Konteks N5';
        if (this.activeCategory === 'relatif') {
          if (item.grp === 'nichi') return 'Keterangan Hari';
          if (item.grp === 'shuu') return 'Keterangan Minggu';
          if (item.grp === 'getsu') return 'Keterangan Bulan';
          if (item.grp === 'nen') return 'Keterangan Tahun';
          if (item.grp === 'asa') return 'Pagi, Siang & Sore';
          if (item.grp === 'ban') return 'Keterangan Malam';
          if (item.grp === 'momen') return 'Titik Waktu & Momen';
          if (item.grp === 'frek') return 'Frekuensi Waktu';
          return 'Waktu Relatif';
        }
        if (item.grp === 'tsu') return 'Satuan Barang (〜つ)';
        if (item.grp === 'nin') return 'Satuan Orang (〜人)';
        if (item.grp === 'sai') return 'Satuan Umur (〜歳)';
        if (item.grp === 'mai') return 'Satuan Lembaran (〜枚)';
        if (item.grp === 'ban') return 'Nomor & Urutan (〜番)';
        if (item.grp === 'hiki') return 'Hewan Kecil (〜匹)';
        if (item.grp === 'wa') return 'Unggas & Kelinci (〜羽)';
        if (item.grp === 'soku') return 'Alas Kaki (〜足)';
        if (item.grp === 'hon') return 'Benda Panjang (〜本)';
        if (item.grp === 'dai') return 'Kendaraan & Mesin (〜台)';
        if (item.grp === 'jam') return 'Format Jam (〜時)';
        if (item.grp === 'menit') return 'Format Menit (〜分)';
        if (item.grp === 'detik') return 'Format Detik (〜秒)';
        if (item.grp === 'komb') return 'Format Waktu Lengkap';
        if (item.grp === 'hari') return 'Nama Hari (〜曜日)';
        if (item.grp === 'tgl') return 'Penanggalan (〜日)';
        if (item.grp === 'bln') return 'Nama Bulan (〜月)';
        if (item.grp === 'thn') return 'Tahun & Durasi (〜年)';
        if (this.activeCategory === 'angka') return 'Bilangan & Nominal';
        return 'Konteks N5';
      },

      getSentenceForItem: function (item) {
        if (!item) return { jp: '', ro: '', id: '', tag: 'Konteks N5' };
        if (item.ex_jp) {
          return {
            jp: item.ex_jp,
            ro: item.ex_ro || '',
            id: item.ex_id || '',
            tag: this.getGroupTag(item)
          };
        }
        const k = item.k;
        if (this.sentencesMap && this.sentencesMap[k]) {
          const res = Object.assign({}, this.sentencesMap[k]);
          res.tag = this.getGroupTag(item);
          return res;
        }

        // If item has ex (e.g. from DB_Relatif)
        if (item.ex) {
          const m = item.ex.match(/^(.*?)[（\(](.*?)[）\)]/);
          if (m) {
            const rawJp = m[1].trim();
            const idText = m[2].trim();
            const hlJp = (k && rawJp.includes(k))
              ? rawJp.replace(k, `<span class="sent-hl-num">${k}</span>`)
              : rawJp;
            return {
              jp: hlJp,
              ro: item.ro || hiraToRomaji(item.r || ''),
              id: idText,
              tag: this.getGroupTag(item)
            };
          }
        }

        const grp = item.grp || '';
        const cat = this.activeCategory || '';
        const a = item.a || '';
        const r = item.r || '';
        const ro = item.ro || hiraToRomaji(r);

        if (cat === 'angka') {
          return {
            jp: `このノートは<span class="sent-hl-num">${k}</span>円です。`,
            ro: `Kono nooto wa ${ro}-en desu.`,
            id: `Buku catatan ini seharga ${a} yen.`,
            tag: 'Bilangan & Nominal'
          };
        }
        if (grp === 'jam') {
          return {
            jp: `<span class="sent-hl-num">${k}</span>に友達と会います。`,
            ro: `${ro} ni tomodachi to aimasu.`,
            id: `Bertemu teman pada ${a}.`,
            tag: 'Format Jam (〜時)'
          };
        }
        if (grp === 'menit') {
          return {
            jp: `あと<span class="sent-hl-num">${k}</span>で出発します。`,
            ro: `Ato ${ro} de shuppatsu shimasu.`,
            id: `Berangkat dalam waktu ${a} lagi.`,
            tag: 'Format Menit (〜分)'
          };
        }
        if (grp === 'detik') {
          return {
            jp: `あと<span class="sent-hl-num">${k}</span>待ってください。`,
            ro: `Ato ${ro} matte kudasai.`,
            id: `Tolong tunggu ${a} lagi.`,
            tag: 'Format Detik (〜秒)'
          };
        }
        if (grp === 'komb') {
          return {
            jp: `今、<span class="sent-hl-num">${k}</span>です。`,
            ro: `Ima, ${ro} desu.`,
            id: `Sekarang pukul ${a}.`,
            tag: 'Format Waktu Lengkap'
          };
        }
        if (grp === 'tgl') {
          return {
            jp: `<span class="sent-hl-num">${k}</span>にテストがあります。`,
            ro: `${ro} ni tesuto ga arimasu.`,
            id: `Ada ujian pada ${a}.`,
            tag: 'Penanggalan (〜日)'
          };
        }
        if (grp === 'bln') {
          return {
            jp: `<span class="sent-hl-num">${k}</span>に日本へ旅行に行きます。`,
            ro: `${ro} ni Nihon e ryokou ni ikimasu.`,
            id: `Pergi berwisata ke Jepang pada ${a}.`,
            tag: 'Nama Bulan (〜月)'
          };
        }
        if (grp === 'thn') {
          return {
            jp: `<span class="sent-hl-num">${k}</span>間、日本語を勉強しました。`,
            ro: `${ro}-kan, Nihongo o benkyou shimashita.`,
            id: `Belajar bahasa Jepang selama ${a}.`,
            tag: 'Tahun & Durasi (〜年)'
          };
        }

        return {
          jp: `<span class="sent-hl-num">${k}</span>の例文です。`,
          ro: ro,
          id: `Contoh penggunaan ${a}.`,
          tag: 'Konteks N5'
        };
      },

      renderFC: function (anim = 'next') {
        const item = this.activeArray[this.cardIdx];
        if (!item) return;

        document.getElementById('fc-counter-current').innerText = this.cardIdx + 1;
        document.getElementById('fc-counter-total').innerText = this.activeArray.length;

        const kanjiEl = document.getElementById('fc-kanji-text');
        const hiraEl = document.getElementById('fc-hira-text');
        const roEl = document.getElementById('fc-ro-text');
        const artiEl = document.getElementById('fc-arti-text');
        const alertEl = document.getElementById('fc-alert-box');
        const noteEl = document.getElementById('fc-note-box');

        kanjiEl.innerText = item.k;
        hiraEl.innerText = item.r;
        roEl.innerText = '(' + (item.ro || hiraToRomaji(item.r)) + ')';
        artiEl.innerText = item.a;

        if (item.alert) {
          alertEl.classList.remove('hidden');
          alertEl.innerHTML = '⚠️ ' + item.alert;
        } else {
          alertEl.classList.add('hidden');
        }

        if (item.note) {
          noteEl.classList.remove('hidden');
          noteEl.innerHTML = '💡 ' + item.note;
        } else {
          noteEl.classList.add('hidden');
        }

        // Live Context Sentence Shelf update (Dihapus/disembunyikan untuk bilangan angka murni)
        const shelfEl = document.getElementById('fc-sentence-shelf');
        if (this.activeCategory === 'angka') {
          if (shelfEl) shelfEl.classList.add('hidden');
        } else {
          if (shelfEl) shelfEl.classList.remove('hidden');
          const sentence = this.getSentenceForItem(item);
          const fssJp = document.getElementById('fss-jp-text');
          const fssRo = document.getElementById('fss-ro-text');
          const fssId = document.getElementById('fss-id-text');

          if (fssJp && sentence) fssJp.innerHTML = sentence.jp;
          if (fssRo && sentence) fssRo.innerText = sentence.ro ? `(${sentence.ro})` : '';
          if (fssId && sentence) fssId.innerText = sentence.id;
        }

        const starBtn = document.getElementById('btn-star-card');
        const isM = this.masteredList.includes(item.k);
        starBtn.classList.toggle('is-mastered', isM);

        document.getElementById('btn-prev-card').disabled = (this.cardIdx === 0);
        document.getElementById('btn-next-card').disabled = (this.cardIdx >= this.activeArray.length - 1);

        const card = document.getElementById('fc-arena-card');
        card.classList.remove('slide-in-right', 'slide-in-left');
        if (anim === 'prev') {
          void card.offsetWidth;
          card.classList.add('slide-in-left');
        } else if (anim === 'next') {
          void card.offsetWidth;
          card.classList.add('slide-in-right');
        }
      },

      nextCard: function () {
        if (this.cardIdx < this.activeArray.length - 1) {
          this.playSfx('tap');
          this.cardIdx++;
          this.renderFC('next');
        }
      },

      prevCard: function () {
        if (this.cardIdx > 0) {
          this.playSfx('tap');
          this.cardIdx--;
          this.renderFC('prev');
        }
      },

      toggleCurrentMastery: function () {
        const item = this.activeArray[this.cardIdx];
        if (!item) return;
        this.playSfx('tap');
        const idx = this.masteredList.indexOf(item.k);
        let isMasteredNow = false;
        if (idx > -1) {
          this.masteredList.splice(idx, 1);
          isMasteredNow = false;
        } else {
          this.masteredList.push(item.k);
          isMasteredNow = true;
        }
        localStorage.setItem('yk_suji_mastered', JSON.stringify(this.masteredList));

        const starBtn = document.getElementById('btn-star-card');
        if (starBtn) {
          starBtn.classList.toggle('is-mastered', isMasteredNow);
          if (isMasteredNow) {
            starBtn.classList.remove('star-pop-anim');
            void starBtn.offsetWidth;
            starBtn.classList.add('star-pop-anim');
          }
        }

        this.updateMasteryCounter();
        this.renderSidebarContent();
      },

      loadMastery: function () {
        try {
          const saved = localStorage.getItem('yk_suji_mastered');
          this.masteredList = saved ? JSON.parse(saved) : [];
        } catch (e) {
          this.masteredList = [];
        }
      },

      updateMasteryCounter: function () {
        const total = this.getTotalVocabCount();
        const count = this.masteredList.length;
        const el = document.getElementById('mastery-count-text');
        if (el) el.innerText = count;
        const totEl = document.getElementById('mastery-total-text');
        if (totEl) totEl.innerText = total;
        const subTot = document.getElementById('sd-total-subtitle');
        if (subTot) subTot.innerText = `${total} Kosakata Bilangan, Satuan & Waktu`;
        const fill = document.getElementById('mastery-progress-fill');
        if (fill) {
          const pct = Math.min(100, Math.round((count / (total || 1)) * 100));
          fill.style.width = pct + '%';
        }
      },

      speakText: function (text) {
        if (!this.soundEnabled || !text) return;
        try {
          window.speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(text);
          u.lang = 'ja-JP';
          u.rate = 0.9;
          window.speechSynthesis.speak(u);
        } catch (e) { }
      },

      speakCurrent: function () {
        const item = this.activeArray[this.cardIdx];
        if (item) this.speakText(item.k || item.r);
      },

      speakCurrentSentence: function () {
        if (this.activeCategory === 'angka') return;
        const item = this.activeArray[this.cardIdx];
        if (!item) return;
        const sentence = this.getSentenceForItem(item);
        if (sentence && sentence.jp) {
          const cleanJp = sentence.jp.replace(/<[^>]*>/g, '');
          this.speakText(cleanJp);
        }
      },

      toggleSound: function () {
        this.soundEnabled = !this.soundEnabled;
        const btn = document.getElementById('btn-sound-toggle');
        if (btn) btn.innerText = this.soundEnabled ? '🔊' : '🔇';
        this.playSfx('tap');
      },

      playSfx: function (type) {
        if (!this.soundEnabled) return;
        try {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (!this._audioCtx && AudioCtx) this._audioCtx = new AudioCtx();
          if (!this._audioCtx) return;
          if (this._audioCtx.state === 'suspended') this._audioCtx.resume();

          const osc = this._audioCtx.createOscillator();
          const gain = this._audioCtx.createGain();
          osc.connect(gain);
          gain.connect(this._audioCtx.destination);
          const now = this._audioCtx.currentTime;

          if (type === 'tap') {
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
          } else if (type === 'correct') {
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
            osc.start(now);
            osc.stop(now + 0.18);
          } else if (type === 'wrong') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(110, now + 0.2);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
          }
        } catch (e) { }
      },

      // CLOCK TOOL METHODS
      setClockAMPM: function (ampm) {
        this.clockAMPM = ampm;
        document.getElementById('btn-ampm-am').classList.toggle('active', ampm === 'AM');
        document.getElementById('btn-ampm-pm').classList.toggle('active', ampm === 'PM');
        this.updateClockWidget();
      },
      onClockHourChange: function (val) {
        this.clockHour = parseInt(val, 10);
        this.updateClockWidget();
      },
      onClockMinChange: function (val) {
        this.clockMin = parseInt(val, 10);
        this.updateClockWidget();
      },
      setClockQuick: function (h, m) {
        this.playSfx('tap');
        this.clockHour = h;
        this.clockMin = m;
        document.getElementById('clock-slider-hour').value = h;
        document.getElementById('clock-slider-min').value = m;
        this.updateClockWidget();
      },
      updateClockWidget: function () {
        document.getElementById('clock-val-hour').innerText = this.clockHour + ':00';
        document.getElementById('clock-val-min').innerText = this.clockMin < 10 ? '0' + this.clockMin : this.clockMin;

        const kanjiDigits = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
        const hiraHours = ['', 'いちじ', 'にじ', 'さんじ', 'よじ', 'ごじ', 'ろくじ', 'しちじ', 'はちじ', 'くじ', 'じゅうじ', 'じゅういちじ', 'じゅうにじ'];
        const roHours = ['', 'ichiji', 'niji', 'sanji', 'yoji', 'goji', 'rokuji', 'shichiji', 'hachiji', 'kuji', 'juuji', 'juuichiji', 'juuniji'];

        const prefixK = this.clockAMPM === 'AM' ? '午前' : '午後';
        const prefixH = this.clockAMPM === 'AM' ? 'ごぜん ' : 'ごご ';
        const prefixR = this.clockAMPM === 'AM' ? 'gozen ' : 'gogo ';

        let kH = kanjiDigits[this.clockHour] + '時';
        let hH = hiraHours[this.clockHour];
        let rH = roHours[this.clockHour];

        let alertMsg = '';
        if (this.clockHour === 4) alertMsg = '⚠️ Jam 4 wajib dibaca よじ (yoji), bukan yonji!';
        if (this.clockHour === 7) alertMsg = '⚠️ Jam 7 wajib dibaca しちじ (shichiji), bukan nanaji!';
        if (this.clockHour === 9) alertMsg = '⚠️ Jam 9 wajib dibaca くじ (kuji), bukan kyuuji!';

        let kM = '', hM = '', rM = '';
        if (this.clockMin === 0) {
          // no minute text
        } else if (this.clockMin === 30) {
          kM = '三十分 (半)';
          hM = 'さんじゅっぷん (はん)';
          rM = 'sanjuppun (han)';
        } else {
          const conv = convertNumberToJapanese(this.clockMin);
          const lastD = this.clockMin % 10;
          const isFun = [2, 5, 7, 9].includes(lastD);
          kM = conv.kanji + '分';
          hM = conv.hira + (isFun ? 'ふん' : 'ぷん');
          rM = conv.ro + (isFun ? 'fun' : 'pun');
        }

        const kanjiFull = prefixK + kH + (kM ? kM : '');
        const hiraFull = prefixH + hH + (hM ? ' ' + hM : '');
        const roFull = prefixR + rH + (rM ? ' ' + rM : '');

        document.getElementById('clock-kanji-out').innerText = kanjiFull;
        document.getElementById('clock-hira-out').innerText = hiraFull;
        document.getElementById('clock-ro-out').innerText = roFull;

        const alertEl = document.getElementById('clock-alert-out');
        if (alertMsg) {
          alertEl.classList.remove('hidden');
          alertEl.innerText = alertMsg;
        } else {
          alertEl.classList.add('hidden');
        }
      },
      speakClockCurrent: function () {
        const text = document.getElementById('clock-kanji-out').innerText;
        this.speakText(text);
      },

      // CALENDAR TOOL METHODS
      initCalendarTool: function () {
        const grid = document.getElementById('calendar-matrix-grid');
        if (!grid) return;
        const kunyomiDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20];
        const dayReadings = {
          1: 'ついたち', 2: 'ふつか', 3: 'みっか', 4: 'よっか', 5: 'いつか',
          6: 'むいか', 7: 'なのか', 8: 'ようか', 9: 'ここのか', 10: 'とおか',
          14: 'じゅうよっか', 20: 'はつか', 24: 'にじゅうよっか'
        };

        grid.innerHTML = Array.from({ length: 31 }, (_, i) => {
          const d = i + 1;
          const isKun = kunyomiDays.includes(d) || d === 14 || d === 24;
          const sub = dayReadings[d] || (d + 'にち');
          return `
        <div class="cal-day-cell ${isKun ? 'is-kunyomi' : ''}" onclick="Modul.inspectCalDay(${d})">
          <span class="cal-day-num">${d}</span>
          <span class="cal-day-sub">${sub}</span>
        </div>
      `;
        }).join('');
        this.inspectCalDay(1);
      },
      inspectCalDay: function (d) {
        this.playSfx('tap');
        this.selectedCalDay = d;
        const dayData = DB_Kalender.find(item => item.grp === 'tgl' && (item.a.includes(d + ' ') || item.a.endsWith(' ' + d) || item.a === 'tanggal ' + d));

        const kanjiDigits = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '二十一', '二十二', '二十三', '二十四', '二十五', '二十六', '二十七', '二十八', '二十九', '三十', '三十一'];
        const kanji = dayData ? dayData.k : (kanjiDigits[d] + '日');
        const hira = dayData ? dayData.r : (d + 'にち');
        const note = dayData ? (dayData.note || dayData.alert || '') : 'Pola Angka + 日 (nichi)';

        document.getElementById('cal-ins-badge').innerText = 'TANGGAL ' + d;
        document.getElementById('cal-ins-kanji').innerText = kanji;
        document.getElementById('cal-ins-hira').innerText = hira + ' (' + hiraToRomaji(hira) + ')';
        document.getElementById('cal-ins-note').innerText = note ? '💡 ' + note : '';
      },
      speakCalCurrent: function () {
        const text = document.getElementById('cal-ins-kanji').innerText;
        this.speakText(text);
      },

      // CONVERTER TOOL METHODS
      onConvertNumber: function (val) {
        const res = convertNumberToJapanese(val);
        document.getElementById('conv-res-kanji').innerText = res.kanji;
        document.getElementById('conv-res-hira').innerText = res.hira;
        document.getElementById('conv-res-ro').innerText = res.ro;
      },
      speakConvCurrent: function () {
        const text = document.getElementById('conv-res-kanji').innerText;
        this.speakText(text);
      },

      // JOSUUSHI TOOL METHODS (KALKULATOR SATUAN HITUNG)
      currentJosuushiUnit: 'tsu',
      currentJosuushiCount: 1,

      josuushiDB: {
        tsu: {
          name: 'Barang (〜つ)',
          question: 'いくつ？ (ikutsu?)',
          examples: {
            1: { jp: 'リンゴを一つください。', ro: '(Ringo o hitotsu kudasai.)', id: 'Tolong beri saya satu buah apel.' },
            2: { jp: '質問が二つあります。', ro: '(Shitsumon ga futatsu arimasu.)', id: 'Saya punya dua pertanyaan.' },
            3: { jp: 'パンを三つ買いました。', ro: '(Pan o mittsu kaimashita.)', id: 'Membeli tiga buah roti.' },
            4: { jp: 'ケーキを四つ食べました。', ro: '(Keeki o yottsu tabemashita.)', id: 'Makan empat potong kue.' },
            5: { jp: 'みかんを五つください。', ro: '(Mikan o itsutsu kudasai.)', id: 'Tolong beri saya lima buah jeruk.' },
            10: { jp: '卵を十買いました。', ro: '(Tamago o too kaimashita.)', id: 'Membeli sepuluh butir telur.' },
            def: (n, k) => ({ jp: `リンゴを${k}ください。`, ro: `(Ringo o ${k} kudasai.)`, id: `Tolong beri saya ${n} buah apel.` })
          },
          getWord: (n) => {
            const map = {
              1: { kanji: '一つ', hira: 'ひとつ', ro: 'hitotsu', trap: null },
              2: { kanji: '二つ', hira: 'ふたつ', ro: 'futatsu', trap: null },
              3: { kanji: '三つ', hira: 'みっつ', ro: 'mittsu', trap: null },
              4: { kanji: '四つ', hira: 'よっつ', ro: 'yottsu', trap: null },
              5: { kanji: '五つ', hira: 'いつつ', ro: 'itsutsu', trap: null },
              6: { kanji: '六つ', hira: 'むっつ', ro: 'muttsu', trap: null },
              7: { kanji: '七つ', hira: 'ななつ', ro: 'nanatsu', trap: null },
              8: { kanji: '八つ', hira: 'やっつ', ro: 'yattsu', trap: null },
              9: { kanji: '九つ', hira: 'ここのつ', ro: 'kokonotsu', trap: null },
              10: { kanji: '十', hira: 'とお', ro: 'too', trap: '⚠️ Angka 10 dibaca "TOO" tanpa akhiran -tsu!' }
            };
            if (map[n]) return map[n];
            return { kanji: n + '個', hira: n + 'こ', ro: n + '-ko', trap: null };
          },
          presets: [1, 2, 3, 4, 5, 8, 10]
        },
        nin: {
          name: 'Orang (〜人)',
          question: 'なんにん？ (nannin?)',
          examples: {
            1: { jp: '教室に学生が一人います。', ro: '(Kyoushitsu ni gakusei ga hitori imasu.)', id: 'Ada satu orang siswa di dalam kelas.' },
            2: { jp: '二人で映画を見に行きます。', ro: '(Futari de eiga o mi ni ikimasu.)', id: 'Pergi menonton film berdua.' },
            4: { jp: '家族は四人です。', ro: '(Kazoku wa yonin desu.)', id: 'Keluarga saya ada empat orang.' },
            def: (n, k) => ({ jp: `会議室に${k}います。`, ro: `(Kaigishitsu ni ${k} imasu.)`, id: `Ada ${n} orang di ruang rapat.` })
          },
          getWord: (n) => {
            if (n === 1) return { kanji: '一人', hira: 'ひとり', ro: 'hitori', trap: '⚠️ Anomali: Dibaca "hitori" (bukan ichi-nin)' };
            if (n === 2) return { kanji: '二人', hira: 'ふたり', ro: 'futari', trap: '⚠️ Anomali: Dibaca "futari" (bukan ni-nin)' };
            if (n === 4) return { kanji: '四人', hira: 'よにん', ro: 'yonin', trap: '⚠️ Jebakan N5: "YONIN" (bukan yon-nin / shi-nin)' };
            if (n === 7) return { kanji: '七人', hira: 'ななにん', ro: 'nananin', trap: null };
            return { kanji: n + '人', hira: n + 'にん', ro: n + '-nin', trap: null };
          },
          presets: [1, 2, 3, 4, 7, 10]
        },
        sai: {
          name: 'Umur (〜歳)',
          question: 'なんさい？ (nansai?)',
          examples: {
            1: { jp: '妹は今年一歳です。', ro: '(Imouto wa kotoshi issai desu.)', id: 'Adik perempuan tahun ini berusia satu tahun.' },
            20: { jp: '来年二十歳になります。', ro: '(Rainen hatachi ni narimasu.)', id: 'Tahun depan saya berusia dua puluh tahun.' },
            def: (n, k) => ({ jp: `弟は${k}になりました。`, ro: `(Otouto wa ${k} ni narimashita.)`, id: `Adik berusia ${n} tahun.` })
          },
          getWord: (n) => {
            if (n === 1) return { kanji: '一歳', hira: 'いっさい', ro: 'issai', trap: '⚠️ Konsonan Ganda: "issai" (bukan ichisai)' };
            if (n === 8) return { kanji: '八歳', hira: 'はっさい', ro: 'hassai', trap: '⚠️ Konsonan Ganda: "hassai" (bukan hachisai)' };
            if (n === 10) return { kanji: '十歳', hira: 'じゅっさい', ro: 'jussai', trap: '⚠️ Konsonan Ganda: "jussai"' };
            if (n === 20) return { kanji: '二十歳', hira: 'はたち', ro: 'hatachi', trap: '🌟 Istimewa 20 Tahun: Dibaca "HATACHI"!' };
            return { kanji: n + '歳', hira: n + 'さい', ro: n + '-sai', trap: null };
          },
          presets: [1, 8, 10, 18, 20]
        },
        hiki: {
          name: 'Hewan (〜匹)',
          question: 'なんびき？ (nanbiki?)',
          examples: {
            1: { jp: '庭に猫が一匹います。', ro: '(Niwa ni neko ga ippiki imasu.)', id: 'Ada seekor kucing di halaman.' },
            3: { jp: '犬が三匹走っています。', ro: '(Inu ga sanbiki hashitte imasu.)', id: 'Tiga ekor anjing sedang berlari.' },
            def: (n, k) => ({ jp: `池に魚が${k}泳いでいます。`, ro: `(Ike ni sakana ga ${k} oyoide imasu.)`, id: `Ada ${n} ekor ikan berenang di kolam.` })
          },
          getWord: (n) => {
            const d = n % 10;
            if (n === 1 || d === 1) return { kanji: n + '匹', hira: (n===1?'':Math.floor(n/10)+'じゅう') + 'いっぴき', ro: 'ippiki', trap: '⚠️ Konsonan Ganda: "-ppiki"' };
            if (n === 3 || d === 3) return { kanji: n + '匹', hira: (n===3?'':Math.floor(n/10)+'じゅう') + 'さんびき', ro: 'sanbiki', trap: '⚠️ Bunyi Sengau: "-biki"' };
            if (n === 6 || d === 6) return { kanji: n + '匹', hira: (n===6?'':Math.floor(n/10)+'じゅう') + 'ろっぴき', ro: 'roppiki', trap: '⚠️ Konsonan Ganda: "-ppiki"' };
            if (n === 8 || d === 8) return { kanji: n + '匹', hira: (n===8?'':Math.floor(n/10)+'じゅう') + 'はっぴき', ro: 'happiki', trap: '⚠️ Konsonan Ganda: "-ppiki"' };
            if (n === 10 || (n > 0 && d === 0)) return { kanji: n + '匹', hira: (n===10?'':Math.floor(n/10)) + 'じゅっぴき', ro: 'juppiki', trap: '⚠️ Konsonan Ganda: "-ppiki"' };
            return { kanji: n + '匹', hira: n + 'ひき', ro: n + '-hiki', trap: null };
          },
          presets: [1, 2, 3, 6, 8, 10]
        },
        hon: {
          name: 'Benda Panjang (〜本)',
          question: 'なんぼん？ (nanbon?)',
          examples: {
            1: { jp: 'ペンを一本貸してください。', ro: '(Pen o ippon kashite kudasai.)', id: 'Tolong pinjami saya satu buah pena.' },
            3: { jp: 'ビールを三本飲みました。', ro: '(Biiru o sanbon nomimashita.)', id: 'Minum tiga botol bir.' },
            def: (n, k) => ({ jp: `傘を${k}持っています。`, ro: `(Kasa o ${k} motte imasu.)`, id: `Membawa ${n} batang payung.` })
          },
          getWord: (n) => {
            const d = n % 10;
            if (n === 1 || d === 1) return { kanji: n + '本', hira: (n===1?'':Math.floor(n/10)+'じゅう') + 'いっぽん', ro: 'ippon', trap: '⚠️ Konsonan Ganda: "-ppon"' };
            if (n === 3 || d === 3) return { kanji: n + '本', hira: (n===3?'':Math.floor(n/10)+'じゅう') + 'さんぼん', ro: 'sanbon', trap: '⚠️ Bunyi Sengau: "-bon"' };
            if (n === 6 || d === 6) return { kanji: n + '本', hira: (n===6?'':Math.floor(n/10)+'じゅう') + 'ろっぽん', ro: 'roppon', trap: '⚠️ Konsonan Ganda: "-ppon"' };
            if (n === 8 || d === 8) return { kanji: n + '本', hira: (n===8?'':Math.floor(n/10)+'じゅう') + 'はっぽん', ro: 'happon', trap: '⚠️ Konsonan Ganda: "-ppon"' };
            if (n === 10 || (n > 0 && d === 0)) return { kanji: n + '本', hira: (n===10?'':Math.floor(n/10)) + 'じゅっぽん', ro: 'juppon', trap: '⚠️ Konsonan Ganda: "-ppon"' };
            return { kanji: n + '本', hira: n + 'ほん', ro: n + '-hon', trap: null };
          },
          presets: [1, 2, 3, 6, 8, 10]
        },
        soku: {
          name: 'Alas Kaki (〜足)',
          question: 'なんぞく？ (nanzoku?)',
          examples: {
            1: { jp: '新しい靴を一足買いました。', ro: '(Atarashii kutsu o issoku kaimashita.)', id: 'Membeli satu pasang sepatu baru.' },
            3: { jp: '靴下が三足あります。', ro: '(Kutsushita ga sanzoku arimasu.)', id: 'Ada tiga pasang kaus kaki.' },
            def: (n, k) => ({ jp: `靴を${k}洗いました。`, ro: `(Kutsu o ${k} araimashita.)`, id: `Mencuci ${n} pasang sepatu.` })
          },
          getWord: (n) => {
            if (n === 1) return { kanji: '一足', hira: 'いっそく', ro: 'issoku', trap: '⚠️ Konsonan Ganda: "-ssoku"' };
            if (n === 3) return { kanji: '三足', hira: 'さんぞく', ro: 'sanzoku', trap: '⚠️ Bunyi Bergetar: "-zoku"' };
            if (n === 8) return { kanji: '八足', hira: 'はっそく', ro: 'hassoku', trap: '⚠️ Konsonan Ganda: "-ssoku"' };
            if (n === 10) return { kanji: '十足', hira: 'じゅっそく', ro: 'jussoku', trap: '⚠️ Konsonan Ganda: "-ssoku"' };
            return { kanji: n + '足', hira: n + 'そく', ro: n + '-soku', trap: null };
          },
          presets: [1, 2, 3, 5, 8, 10]
        },
        mai: {
          name: 'Lembar (〜枚)',
          question: 'なんまい？ (nanmai?)',
          examples: {
            1: { jp: '紙を一枚取ってください。', ro: '(Kami o ichimai totte kudasai.)', id: 'Tolong ambilkan selembar kertas.' },
            def: (n, k) => ({ jp: `切符を${k}買いました。`, ro: `(Kippu o ${k} kaimashita.)`, id: `Membeli ${n} lembar tiket.` })
          },
          getWord: (n) => ({ kanji: n + '枚', hira: n + 'まい', ro: n + '-mai', trap: null }),
          presets: [1, 2, 3, 5, 10]
        },
        dai: {
          name: 'Mesin (〜台)',
          question: 'なんだい？ (nandai?)',
          examples: {
            1: { jp: '車を一台持っています。', ro: '(Kuruma o ichidai motte imasu.)', id: 'Saya memiliki satu unit mobil.' },
            def: (n, k) => ({ jp: `パソコンが${k}あります。`, ro: `(Pasokon ga ${k} arimasu.)`, id: `Ada ${n} unit komputer.` })
          },
          getWord: (n) => ({ kanji: n + '台', hira: n + 'だい', ro: n + '-dai', trap: null }),
          presets: [1, 2, 3, 5, 10]
        },
        wa: {
          name: 'Unggas (〜羽)',
          question: 'なんわ？ (nanwa?)',
          examples: {
            1: { jp: '庭に鳥が一羽います。', ro: '(Niwa ni tori ga ichiwa imasu.)', id: 'Ada seekor burung di halaman.' },
            3: { jp: 'うさぎが三羽跳んでいます。', ro: '(Usagi ga sanwa tonde imasu.)', id: 'Tiga ekor kelinci sedang melompat.' },
            def: (n, k) => ({ jp: `鳥が${k}います。`, ro: `(Tori ga ${k} imasu.)`, id: `Ada ${n} ekor burung.` })
          },
          getWord: (n) => {
            if (n === 3) return { kanji: '三羽', hira: 'さんわ / さんば', ro: 'sanwa / sanba', trap: '💡 Angka 3 bisa dibaca "sanwa" atau "sanba"' };
            return { kanji: n + '羽', hira: n + 'わ', ro: n + '-wa', trap: null };
          },
          presets: [1, 2, 3, 5, 10]
        },
        ban: {
          name: 'Urutan (〜番)',
          question: 'なんばん？ (nanban?)',
          examples: {
            1: { jp: '山田さんは一番です。', ro: '(Yamada-san wa ichiban desu.)', id: 'Tuan Yamada adalah nomor satu.' },
            def: (n, k) => ({ jp: `私の部屋は${k}です。`, ro: `(Watashi no heya wa ${k} desu.)`, id: `Kamar saya adalah nomor ${n}.` })
          },
          getWord: (n) => ({ kanji: n + '番', hira: n + 'ばん', ro: n + '-ban', trap: null }),
          presets: [1, 2, 3, 5, 10]
        }
      },

      initJosuushiTool: function () {
        this.renderJosuushi();
      },

      selectJosuushiUnit: function (key) {
        this.playSfx('tap');
        this.currentJosuushiUnit = key;
        document.querySelectorAll('.jos-unit-chip').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-unit') === key);
        });
        const mSel = document.getElementById('jos-mobile-unit-select');
        if (mSel) mSel.value = key;
        this.renderJosuushi();
      },

      stepJosuushiUnit: function (delta) {
        this.playSfx('tap');
        const units = ['tsu', 'nin', 'sai', 'hiki', 'hon', 'soku', 'mai', 'dai', 'wa', 'ban'];
        let idx = units.indexOf(this.currentJosuushiUnit);
        if (idx === -1) idx = 0;
        idx = (idx + delta + units.length) % units.length;
        this.selectJosuushiUnit(units[idx]);
      },

      setJosuushiCount: function (val) {
        this.currentJosuushiCount = parseInt(val, 10) || 1;
        const slider = document.getElementById('jos-slider-count');
        const countTxt = document.getElementById('jos-count-val');
        if (slider) slider.value = this.currentJosuushiCount;
        if (countTxt) countTxt.innerText = this.currentJosuushiCount;
        this.renderJosuushi();
      },

      stepJosuushiCount: function (delta) {
        this.playSfx('tap');
        let next = this.currentJosuushiCount + delta;
        if (next < 1) next = 1;
        if (next > 25) next = 25;
        this.setJosuushiCount(next);
      },

      renderJosuushi: function () {
        const u = this.josuushiDB[this.currentJosuushiUnit];
        if (!u) return;
        const data = u.getWord(this.currentJosuushiCount);

        const qBadge = document.getElementById('jos-q-badge');
        if (qBadge) qBadge.innerText = 'Tanya: ' + u.question;
        const qBadgeDt = document.getElementById('jos-q-badge-dt');
        if (qBadgeDt) qBadgeDt.innerText = 'Tanya: ' + u.question;

        const mSel = document.getElementById('jos-mobile-unit-select');
        if (mSel && mSel.value !== this.currentJosuushiUnit) {
          mSel.value = this.currentJosuushiUnit;
        }

        const kOut = document.getElementById('jos-kanji-out');
        const hOut = document.getElementById('jos-hira-out');
        const rOut = document.getElementById('jos-ro-out');
        if (kOut) kOut.innerText = data.kanji;
        if (hOut) hOut.innerText = data.hira;
        if (rOut) rOut.innerText = '(' + data.ro + ')';

        const pill = document.getElementById('jos-anomaly-badge');
        if (pill) {
          if (data.trap) {
            pill.classList.remove('hidden');
            if (data.trap.includes('⚠️')) {
              pill.className = 'jos-anomaly-badge jos-anomaly-red';
            } else if (data.trap.includes('🌟')) {
              pill.className = 'jos-anomaly-badge jos-anomaly-gold';
            } else {
              pill.className = 'jos-anomaly-badge jos-anomaly-sky';
            }
            pill.innerText = data.trap;
          } else {
            pill.classList.add('hidden');
          }
        }

        const exObj = (u.examples && u.examples[this.currentJosuushiCount])
          ? u.examples[this.currentJosuushiCount]
          : u.examples.def(this.currentJosuushiCount, data.kanji);

        const exK = document.getElementById('jos-ex-kanji');
        const exR = document.getElementById('jos-ex-ro');
        const exI = document.getElementById('jos-ex-id');
        if (exK) exK.innerText = exObj.jp;
        if (exR) exR.innerText = exObj.ro;
        if (exI) exI.innerText = exObj.id;

        const presetBox = document.getElementById('jos-preset-box');
        if (presetBox) {
          presetBox.innerHTML = u.presets.map(n => {
            const item = u.getWord(n);
            const isTrap = !!item.trap;
            const isCurrent = (n === this.currentJosuushiCount);
            return `
              <button type="button" class="jos-preset-btn ${isTrap ? 'trap' : ''} ${isCurrent ? 'active' : ''}" onclick="Modul.setJosuushiCount(${n})">
                ${n} ${isTrap ? '⚠️' : ''}
              </button>
            `;
          }).join('');
        }
      },

      speakJosuushiCurrent: function () {
        const exK = document.getElementById('jos-ex-kanji');
        if (exK && exK.innerText) {
          this.speakText(exK.innerText);
        }
      },

      // QUIZ ENGINE
      openQuizConfigModal: function () {
        this.playSfx('tap');
        const m = document.getElementById('quiz-config-modal');
        if (m) {
          this.updateQuizConfigUI();
          m.classList.remove('hidden');
        }
      },
      closeQuizConfigModal: function () {
        this.playSfx('tap');
        const m = document.getElementById('quiz-config-modal');
        if (m) m.classList.add('hidden');
      },
      selectQuizTargetMode: function (mode) {
        this.playSfx('tap');
        this.quizTargetMode = mode;
        this.updateQuizConfigUI();
      },
      selectQuizSourceMode: function (src) {
        this.playSfx('tap');
        this.quizSourceMode = src;
        this.updateQuizConfigUI();
      },
      onCustomCountInput: function (val) {
        const n = parseInt(val, 10);
        if (!isNaN(n)) {
          this.quizCustomCount = Math.max(5, Math.min(n, 250));
          const b = document.getElementById('qc-count-badge-custom');
          if (b) b.innerText = this.quizCustomCount + ' Soal';
        }
      },
      updateQuizConfigUI: function () {
        ['all', '10', '25', 'custom'].forEach(t => {
          const el = document.getElementById('qc-target-' + t);
          if (el) el.classList.toggle('active', this.quizTargetMode === t);
        });
        const cBox = document.getElementById('qc-custom-input-box');
        if (cBox) cBox.classList.toggle('hidden', this.quizTargetMode !== 'custom');

        ['mastered', 'session'].forEach(s => {
          const el = document.getElementById('qc-src-' + s);
          if (el) el.classList.toggle('active', this.quizSourceMode === s);
        });

        const masteredVerbs = this.activeArray.filter(i => this.masteredList.includes(i.k));
        const badgeM = document.getElementById('qc-src-badge-mastered');
        if (badgeM) badgeM.innerText = masteredVerbs.length + ' Kata';
        const badgeS = document.getElementById('qc-src-badge-session');
        if (badgeS) badgeS.innerText = this.activeArray.length + ' Kata';

        const pool = this.quizSourceMode === 'mastered' ? masteredVerbs : this.activeArray;
        const badgeAll = document.getElementById('qc-count-badge-all');
        if (badgeAll) badgeAll.innerText = (pool.length * 2) + ' Soal';
      },
      applyQuizConfig: function () {
        this.playSfx('tap');
        this.closeQuizConfigModal();
        this.updateQuizConfigButtonLabel();
        this.activeQuizData = this.generateQuizQuestions();
        this.idxQuiz = 0;
        this.scoreQuiz = 0;
        this.quizCorrectCount = 0;
        this.renderQuiz(true);
      },
      updateQuizConfigButtonLabel: function () {
        const iconEl = document.getElementById('quiz-config-icon');
        const labelEl = document.getElementById('quiz-config-label');
        const pool = this.quizSourceMode === 'mastered' ? this.activeArray.filter(i => this.masteredList.includes(i.k)) : this.activeArray;

        let targetLabel = '';
        let targetIcon = '🎯';
        if (this.quizTargetMode === 'all') {
          targetIcon = '🔥';
          const count = (this.drillSubtype === 'time' && ['angka', 'hitung'].includes(this.activeCategory)) ? 20 : pool.length * 2;
          targetLabel = pool.length > 0 ? `Target: Semua (${count})` : 'Target: Semua';
        } else if (this.quizTargetMode === '10') {
          targetIcon = '⚡';
          targetLabel = 'Target: 10 Soal';
        } else if (this.quizTargetMode === '25') {
          targetIcon = '🏃';
          targetLabel = 'Target: 25 Soal';
        } else if (this.quizTargetMode === 'custom') {
          targetIcon = '✏️';
          targetLabel = `Target: ${this.quizCustomCount} Soal`;
        }
        if (iconEl) iconEl.innerText = targetIcon;
        if (labelEl) labelEl.innerText = targetLabel;
      },
      toggleDrillDropdown: function (e) {
        if (e) e.stopPropagation();
        this.playSfx('tap');
        document.getElementById('drill-dropdown-menu').classList.toggle('hidden');
      },
      selectDrillSubtype: function (st, icon, label) {
        this.playSfx('tap');
        this.drillSubtype = st;
        document.getElementById('drill-label-icon').innerText = icon;
        document.getElementById('drill-label-text').innerText = label;
        document.getElementById('drill-dropdown-menu').classList.add('hidden');
        document.querySelectorAll('.dd-item').forEach(el => el.classList.toggle('active', el.dataset.qtype === st));
        this.activeQuizData = this.generateQuizQuestions();
        this.idxQuiz = 0;
        this.scoreQuiz = 0;
        this.quizCorrectCount = 0;
        this.renderQuiz(true);
      },

      generateQuizQuestions: function () {
        const useMastered = (this.quizSourceMode === 'mastered');
        const shuffle = arr => arr.slice().sort(() => Math.random() - 0.5);

        let pool = [];
        let distractorPool = [];
        const allTimePool = (typeof DB_Waktu !== 'undefined' && typeof DB_Kalender !== 'undefined' && typeof DB_Relatif !== 'undefined')
          ? [...DB_Waktu, ...DB_Kalender, ...DB_Relatif]
          : [];

        if (this.drillSubtype === 'time') {
          // Khusus mode Tebak Jam & Tanggal: Selalu bersumber dari kosakata waktu & kalender murni!
          if (['waktu', 'kalender', 'relatif'].includes(this.activeCategory)) {
            pool = useMastered ? this.activeArray.filter(i => this.masteredList.includes(i.k)) : [...this.activeArray];
            if (pool.length === 0) pool = [...this.activeArray];
            distractorPool = allTimePool.length > 0 ? allTimePool : [...this.activeArray];
          } else {
            // Jika user memilih Tebak Jam & Tanggal saat berada di Angka atau Satuan Hitung, gunakan kumpulan waktu & tanggal lengkap
            pool = useMastered ? allTimePool.filter(i => this.masteredList.includes(i.k)) : allTimePool;
            if (pool.length === 0) pool = allTimePool;
            distractorPool = allTimePool;
          }
        } else {
          pool = useMastered ? this.activeArray.filter(i => this.masteredList.includes(i.k)) : [...this.activeArray];
          distractorPool = [...this.activeArray];
        }

        if (pool.length === 0) return [];

        let targetCount = pool.length * 2;
        if (this.drillSubtype === 'time' && ['angka', 'hitung'].includes(this.activeCategory)) {
          if (this.quizTargetMode === 'all') targetCount = 20;
        }
        if (this.quizTargetMode === '10') targetCount = 10;
        else if (this.quizTargetMode === '25') targetCount = 25;
        else if (this.quizTargetMode === 'custom') targetCount = Math.max(5, Math.min(this.quizCustomCount, 250));

        const generated = [];
        const pickedPool = shuffle(pool);

        for (let i = 0; i < targetCount; i++) {
          const item = pickedPool[i % pickedPool.length];

          if (this.drillSubtype === 'isian') {
            generated.push({
              type: 'isian',
              badge: '✍️ ISIAN HIRAGANA',
              q: `Ketik Hiragana dari:<br><span style="font-size:32px; font-weight:800; color:#fff;">${item.k}</span> <span style="font-size:16px; color:var(--gold);">(${item.a})</span>`,
              ans: [item.r.toLowerCase().replace(/[\s-]/g, '')],
              audio: item.k
            });
          } else if (this.drillSubtype === 'kanji') {
            // 100% Tebak Kanji & Cara Baca (Tidak ada bocor arti Indonesia)
            const isGuessKanji = (i % 2 === 0);
            if (isGuessKanji) {
              const distractors = [item.k];
              const others = shuffle(distractorPool.filter(x => x.k !== item.k));
              for (let o of others) {
                if (distractors.length >= 4) break;
                if (!distractors.includes(o.k)) distractors.push(o.k);
              }
              generated.push({
                type: 'mc',
                badge: '🈶 TEBAK KANJI',
                q: `Pilih kanji yang tepat untuk:<br><span style="font-size:28px; font-weight:800; color:var(--primary);">${item.r}</span> <span style="font-size:16px; color:var(--text-sub);">(${item.a})</span>`,
                ans: item.k,
                opts: shuffle(distractors),
                audio: item.k
              });
            } else {
              const distractors = [item.r];
              const others = shuffle(distractorPool.filter(x => x.k !== item.k));
              for (let o of others) {
                if (distractors.length >= 4) break;
                if (!distractors.includes(o.r)) distractors.push(o.r);
              }
              generated.push({
                type: 'mc',
                badge: '🗣️ TEBAK BACAAN',
                q: `Bagaimana cara membaca kanji:<br><span style="font-size:34px; font-weight:900; color:#fff;">${item.k}</span> <span style="font-size:16px; color:var(--text-sub);">(${item.a})</span>?`,
                ans: item.r,
                opts: shuffle(distractors),
                audio: item.k
              });
            }
          } else if (this.drillSubtype === 'meaning') {
            // 100% Tebak Arti Indonesia (Tidak ada tebak kanji)
            const distractors = [item.a];
            const others = shuffle(distractorPool.filter(x => x.k !== item.k));
            for (let o of others) {
              if (distractors.length >= 4) break;
              if (!distractors.includes(o.a)) distractors.push(o.a);
            }
            generated.push({
              type: 'mc',
              badge: '📖 TEBAK ARTI',
              q: `Apa arti bahasa Indonesia dari:<br><span style="font-size:34px; font-weight:900; color:#fff;">${item.k}</span> <span style="font-size:18px; color:var(--primary);">(${item.r})</span>?`,
              ans: item.a,
              opts: shuffle(distractors),
              audio: item.k
            });
          } else if (this.drillSubtype === 'time') {
            // 100% Mode Tebak Waktu & Penanggalan Murni (Tidak ada angka biasa)
            const sameGroup = distractorPool.filter(x => x.grp === item.grp && x.k !== item.k);
            const otherGroup = distractorPool.filter(x => x.k !== item.k);

            let badge = '⏰ TEBAK WAKTU';
            let qText = '';
            const isKanjiAnswer = (i % 2 === 0);

            if (['jam', 'menit', 'detik', 'komb'].includes(item.grp)) {
              badge = '⏰ TEBAK JAM & WAKTU';
              if (isKanjiAnswer) {
                qText = `Pilih penulisan waktu untuk:<br><span style="font-size:28px; font-weight:800; color:var(--primary);">${item.a}</span> (${item.r})`;
              } else {
                qText = `Berapa waktu dari:<br><span style="font-size:34px; font-weight:900; color:#fff;">${item.k}</span> <span style="font-size:16px; color:var(--gold);">(${item.r})</span>?`;
              }
            } else if (item.grp === 'hari') {
              badge = '📅 NAMA HARI';
              if (isKanjiAnswer) {
                qText = `Pilih kanji nama hari untuk:<br><span style="font-size:28px; font-weight:800; color:var(--primary);">${item.a}</span>`;
              } else {
                qText = `Hari apa penulisan:<br><span style="font-size:34px; font-weight:900; color:#fff;">${item.k}</span> <span style="font-size:16px; color:var(--gold);">(${item.r})</span>?`;
              }
            } else if (item.grp === 'tgl') {
              badge = '📅 PENANGGALAN';
              if (isKanjiAnswer) {
                qText = `Pilih penulisan tanggal untuk:<br><span style="font-size:28px; font-weight:800; color:var(--primary);">${item.a}</span> <span style="font-size:16px; color:var(--gold);">(${item.r})</span>`;
              } else {
                qText = `Tanggal berapa penulisan:<br><span style="font-size:34px; font-weight:900; color:#fff;">${item.k}</span> <span style="font-size:16px; color:var(--gold);">(${item.r})</span>?`;
              }
            } else if (item.grp === 'bln') {
              badge = '📅 NAMA BULAN';
              if (isKanjiAnswer) {
                qText = `Pilih penulisan bulan untuk:<br><span style="font-size:28px; font-weight:800; color:var(--primary);">${item.a}</span>`;
              } else {
                qText = `Bulan apa penulisan:<br><span style="font-size:34px; font-weight:900; color:#fff;">${item.k}</span> <span style="font-size:16px; color:var(--gold);">(${item.r})</span>?`;
              }
            } else {
              badge = '⏳ WAKTU RELATIF';
              if (isKanjiAnswer) {
                qText = `Pilih penulisan kata waktu untuk:<br><span style="font-size:28px; font-weight:800; color:var(--primary);">${item.a}</span>`;
              } else {
                qText = `Kapan waktu dari:<br><span style="font-size:34px; font-weight:900; color:#fff;">${item.k}</span> <span style="font-size:16px; color:var(--gold);">(${item.r})</span>?`;
              }
            }

            const ans = isKanjiAnswer ? item.k : item.a;
            const distractors = [ans];
            const poolForDistractors = sameGroup.length >= 3 ? sameGroup : [...sameGroup, ...otherGroup];
            for (let o of shuffle(poolForDistractors)) {
              if (distractors.length >= 4) break;
              const val = isKanjiAnswer ? o.k : o.a;
              if (!distractors.includes(val)) distractors.push(val);
            }

            generated.push({
              type: 'mc',
              badge,
              q: qText,
              ans,
              opts: shuffle(distractors),
              audio: item.k
            });
          } else {
            // 'mix' (Acak Campuran) -> rotasi seimbang: Tebak Kanji, Tebak Bacaan, Tebak Arti
            const mode = i % 3;
            if (mode === 0) {
              const distractors = [item.k];
              const others = shuffle(distractorPool.filter(x => x.k !== item.k));
              for (let o of others) {
                if (distractors.length >= 4) break;
                if (!distractors.includes(o.k)) distractors.push(o.k);
              }
              generated.push({
                type: 'mc',
                badge: '🈶 TEBAK KANJI',
                q: `Pilih kanji yang tepat untuk:<br><span style="font-size:28px; font-weight:800; color:var(--primary);">${item.r}</span> <span style="font-size:16px; color:var(--text-sub);">(${item.a})</span>`,
                ans: item.k,
                opts: shuffle(distractors),
                audio: item.k
              });
            } else if (mode === 1) {
              const distractors = [item.r];
              const others = shuffle(distractorPool.filter(x => x.k !== item.k));
              for (let o of others) {
                if (distractors.length >= 4) break;
                if (!distractors.includes(o.r)) distractors.push(o.r);
              }
              generated.push({
                type: 'mc',
                badge: '🗣️ TEBAK BACAAN',
                q: `Bagaimana cara membaca kanji:<br><span style="font-size:34px; font-weight:900; color:#fff;">${item.k}</span> <span style="font-size:16px; color:var(--text-sub);">(${item.a})</span>?`,
                ans: item.r,
                opts: shuffle(distractors),
                audio: item.k
              });
            } else {
              const distractors = [item.a];
              const others = shuffle(distractorPool.filter(x => x.k !== item.k));
              for (let o of others) {
                if (distractors.length >= 4) break;
                if (!distractors.includes(o.a)) distractors.push(o.a);
              }
              generated.push({
                type: 'mc',
                badge: '📖 TEBAK ARTI',
                q: `Apa arti dari:<br><span style="font-size:34px; font-weight:900; color:#fff;">${item.k}</span> <span style="font-size:18px; color:var(--primary);">(${item.r})</span>?`,
                ans: item.a,
                opts: shuffle(distractors),
                audio: item.k
              });
            }
          }
        }
        return shuffle(generated).slice(0, targetCount);
      },

      renderQuiz: function (slide = true) {
        this.updateQuizConfigButtonLabel();
        const fb = document.getElementById('quiz-feedback-bar');
        if (fb) fb.classList.add('hidden');

        const pool = this.activeQuizData;
        const progEl = document.getElementById('quiz-progress-pill');
        const scoreEl = document.getElementById('quiz-score-pill');
        if (scoreEl) scoreEl.innerText = 'SKOR ' + this.scoreQuiz;

        const optBox = document.getElementById('quiz-options-container');
        const isianBox = document.getElementById('quiz-isian-container');
        const qTextEl = document.getElementById('quiz-q-text');
        const qBadgeEl = document.getElementById('quiz-badge-kind');

        if (this.quizSourceMode === 'mastered' && pool.length === 0) {
          if (progEl) progEl.innerHTML = 'SOAL <b>0</b> / 0';
          qBadgeEl.innerText = '⭐ BELUM ADA KATA DIKUASAI';
          qTextEl.innerHTML = `
        <div style="padding: 10px 0; color:var(--text-sub); font-size:13px; line-height:1.6;">
          Kamu belum menandai kata dengan bintang <b>⭐</b> di sesi ini.<br>
          Beri bintang pada kartu yang telah kamu pelajari untuk mengujinya di kuis ini!
        </div>
      `;
          optBox.innerHTML = '';
          isianBox.classList.add('hidden');
          return;
        }

        if (this.idxQuiz >= pool.length) {
          if (progEl) progEl.innerHTML = '<b>🎉 SELESAI</b>';
          const pct = Math.round((this.quizCorrectCount / Math.max(1, pool.length)) * 100);
          qBadgeEl.innerText = 'HASIL LATIHAN';
          qTextEl.innerHTML = `
        <div style="padding: 14px 0;">
          <div style="font-size: 38px; font-weight:900; color:var(--gold);">${pct}%</div>
          <div style="font-size:14px; color:#fff; margin-top:4px;">Benar ${this.quizCorrectCount} dari ${pool.length} Soal (Skor: ${this.scoreQuiz})</div>
          <button type="button" class="btn-qc-apply" style="margin-top:14px;" onclick="Modul.applyQuizConfig()">🔄 Main Lagi</button>
        </div>
      `;
          optBox.innerHTML = '';
          isianBox.classList.add('hidden');
          return;
        }

        const curQ = pool[this.idxQuiz];
        if (progEl) progEl.innerHTML = `SOAL <b>${this.idxQuiz + 1}</b> / ${pool.length}`;
        qBadgeEl.innerText = curQ.badge;
        qTextEl.innerHTML = curQ.q;
        if (curQ.audio) this.speakText(curQ.audio);

        if (curQ.type === 'isian') {
          optBox.innerHTML = '';
          isianBox.classList.remove('hidden');
          const input = document.getElementById('quiz-isian-input');
          input.value = '';
          input.focus();
        } else {
          isianBox.classList.add('hidden');
          optBox.innerHTML = curQ.opts.map((opt, i) => `
        <button type="button" class="quiz-opt-btn" onclick="Modul.submitMCOption('${opt.replace(/'/g, "\\'")}', this)">
          ${opt}
        </button>
      `).join('');
        }
      },

      submitMCOption: function (val, btnEl) {
        const curQ = this.activeQuizData[this.idxQuiz];
        if (!curQ) return;
        const isCorrect = (val === curQ.ans);

        if (isCorrect) {
          this.playSfx('correct');
          this.quizCorrectCount++;
          this.scoreQuiz += 10;
          btnEl.classList.add('correct');
        } else {
          this.playSfx('wrong');
          btnEl.classList.add('wrong');
          document.querySelectorAll('.quiz-opt-btn').forEach(b => {
            if (b.innerText.trim() === curQ.ans) b.classList.add('correct');
          });
        }

        setTimeout(() => {
          this.idxQuiz++;
          this.renderQuiz(false);
        }, 900);
      },

      submitIsianAnswer: function () {
        const curQ = this.activeQuizData[this.idxQuiz];
        if (!curQ) return;
        const input = document.getElementById('quiz-isian-input');
        const cleanUser = input.value.trim().toLowerCase().replace(/[\s-]/g, '');
        const isCorrect = curQ.ans.some(a => cleanUser === a);

        const fb = document.getElementById('quiz-feedback-bar');
        fb.classList.remove('hidden', 'correct', 'wrong');

        if (isCorrect) {
          this.playSfx('correct');
          this.quizCorrectCount++;
          this.scoreQuiz += 10;
          fb.classList.add('correct');
          fb.innerText = '✅ Benar! ' + input.value;
        } else {
          this.playSfx('wrong');
          fb.classList.add('wrong');
          fb.innerText = '❌ Jawaban yang benar: ' + curQ.ans[0];
        }

        setTimeout(() => {
          this.idxQuiz++;
          this.renderQuiz(false);
        }, 1200);
      },

      // MODAL METHODS
      openCheatsheet: function () {
        this.playSfx('tap');
        document.getElementById('cheatsheet-modal').classList.remove('hidden');
        this.renderCheatsheetContent();
      },
      closeCheatsheet: function () {
        this.playSfx('tap');
        document.getElementById('cheatsheet-modal').classList.add('hidden');
      },
      switchCSTab: function (t) {
        this.playSfx('tap');
        this.csActiveTab = t;
        ['angka', 'hitung', 'waktu', 'kalender', 'relatif'].forEach(tab => {
          const btn = document.getElementById('cstab-' + tab);
          if (btn) btn.classList.toggle('active', tab === t);
        });
        this.renderCheatsheetContent();
      },
      renderCheatsheetContent: function () {
        const body = document.getElementById('cs-body-content');
        if (!body) return;

        if (this.csActiveTab === 'angka') {
          body.innerHTML = `
        <div class="cs-section danger">
          <div class="cs-section-title">⚠️ Jebakan Ratusan (百 Hyaku)</div>
          <div class="cs-section-desc">Pengecualian perubahan bunyi fonetik menjadi 'byaku' dan 'ppyaku':</div>
          <div class="cs-clean-row">
            <div class="cs-clean-content" style="display:flex; flex-direction:column; gap:6px;">
              <div>• <b>300:</b> <b class="cs-txt-danger">さんびゃく (sanbyaku)</b> <span class="cs-txt-sub">- bunyi berubah menjadi 'byaku'</span></div>
              <div>• <b>600:</b> <b class="cs-txt-danger">ろっぴゃく (roppyaku)</b> <span class="cs-txt-sub">- konsonan ganda 'ppyaku'</span></div>
              <div>• <b>800:</b> <b class="cs-txt-danger">はっぴゃく (happyaku)</b> <span class="cs-txt-sub">- konsonan ganda 'ppyaku'</span></div>
            </div>
          </div>
        </div>

        <div class="cs-section warning">
          <div class="cs-section-title">⚠️ Jebakan Ribuan (千 Sen)</div>
          <div class="cs-section-desc">Pengecualian pengucapan ribuan:</div>
          <div class="cs-clean-row">
            <div class="cs-clean-content" style="display:flex; flex-direction:column; gap:6px;">
              <div>• <b>3.000:</b> <b class="cs-txt-gold">さんぜん (sanzen)</b> <span class="cs-txt-sub">- bunyi bergetar 'zen'</span></div>
              <div>• <b>8.000:</b> <b class="cs-txt-gold">はっせん (hassen)</b> <span class="cs-txt-sub">- konsonan ganda 'ssen'</span></div>
            </div>
          </div>
        </div>

        <div class="cs-section info">
          <div class="cs-section-title">💡 Sistem 4-Digit Jepang (万 Man)</div>
          <div class="cs-section-desc">Hitungan angka besar di Jepang dikelompokkan per <b>4 angka nol (10.000 = 1 Man)</b>:</div>
          <div class="cs-clean-row">
            <div class="cs-clean-content" style="display:flex; flex-direction:column; gap:6px;">
              <div>• <b>10.000</b> = <b class="cs-txt-primary">一万 (Ichiman)</b></div>
              <div>• <b>100.000</b> = <b class="cs-txt-primary">十万 (Juuman = 10 Man)</b></div>
              <div>• <b>1.000.000</b> = <b class="cs-txt-primary">百万 (Hyakuman = 100 Man)</b></div>
              <div>• <b>10.000.000</b> = <b class="cs-txt-primary">一千万 (Issenman = 1.000 Man)</b></div>
              <div>• <b>100.000.000</b> = <b class="cs-txt-primary">一億 (Ichioku = 1 Oku)</b></div>
            </div>
          </div>
        </div>
      `;
        } else if (this.csActiveTab === 'hitung') {
          body.innerHTML = `
        <div class="cs-section warning">
          <div>
            <div class="cs-section-title">📦 Satuan Hitung Barang, Orang & Umur</div>
            <div class="cs-section-desc">Kelompok hitungan paling sering digunakan dalam percakapan sehari-hari:</div>
          </div>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <div class="cs-clean-row">
              <div class="cs-clean-row-top">
                <span class="cs-clean-label">Barang Umum (〜つ / tsu)</span>
                <span class="cs-clean-q">Tanya: <b>いくつ？</b></span>
              </div>
              <div class="cs-clean-content">
                ひとつ, ふたつ, みっつ, よっつ, いつつ, むっつ, ななつ, やっつ, ここのつ, <b class="cs-txt-danger">とお</b> <span class="cs-txt-sub">(Angka 10 tanpa akhiran -tsu)</span>
              </div>
            </div>

            <div class="cs-clean-row">
              <div class="cs-clean-row-top">
                <span class="cs-clean-label">Orang (〜人 / nin)</span>
                <span class="cs-clean-q">Tanya: <b>なんにん？</b></span>
              </div>
              <div class="cs-clean-content">
                <b class="cs-txt-danger">ひとり</b> (1), <b class="cs-txt-danger">ふたり</b> (2), さんにん (3), <b class="cs-txt-danger">よにん</b> <span class="cs-txt-sub">(4 orang, bukan yon-nin)</span>
              </div>
            </div>

            <div class="cs-clean-row">
              <div class="cs-clean-row-top">
                <span class="cs-clean-label">Umur (〜歳 / sai)</span>
                <span class="cs-clean-q">Tanya: <b>なんさい？</b></span>
              </div>
              <div class="cs-clean-content">
                <b class="cs-txt-danger">いっさい</b> (1), <b class="cs-txt-danger">はっさい</b> (8), <b class="cs-txt-danger">じゅっさい</b> (10), <b class="cs-txt-danger">はたち</b> <span class="cs-txt-sub">(20 th - sebutan istimewa)</span>
              </div>
            </div>

            <div class="cs-clean-row">
              <div class="cs-clean-row-top">
                <span class="cs-clean-label">Benda Pipih/Lembar (〜枚 / mai)</span>
                <span class="cs-clean-q">Tanya: <b>なんまい？</b></span>
              </div>
              <div class="cs-clean-content">
                いちまい, にまい, さんまい... <span class="cs-txt-sub">(Kertas, foto, piring, tiket - bacaan teratur)</span>
              </div>
            </div>

            <div class="cs-clean-row">
              <div class="cs-clean-row-top">
                <span class="cs-clean-label">Urutan & Peringkat (〜番 / ban)</span>
                <span class="cs-clean-q">Tanya: <b>なんばん？</b></span>
              </div>
              <div class="cs-clean-content">
                いちばん, にばん, さんばん... <span class="cs-txt-sub">(Nomor kamar, bus, juara - bacaan teratur)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="cs-section info">
          <div>
            <div class="cs-section-title">🐾 Satuan Makhluk Hidup & Benda Berpola Bunyi</div>
            <div class="cs-section-desc">Pola perubahan fonetik (konsonan ganda keras & sengau bergetar):</div>
          </div>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <div class="cs-clean-row">
              <div class="cs-clean-row-top">
                <span class="cs-clean-label">Hewan Kecil (〜匹 / hiki)</span>
                <span class="cs-clean-q">Tanya: <b>なんびき？</b></span>
              </div>
              <div class="cs-clean-content">
                • 1, 6, 8, 10: <b class="cs-txt-danger">いっぴき, ろっぴき, はっぴき, じゅっぴき</b> (-ppiki)<br>
                • 3 & Tanya: <b class="cs-txt-primary">さんびき, なんびき？</b> (-biki) | Sisanya teratur: にひき, よんひき...
              </div>
            </div>

            <div class="cs-clean-row">
              <div class="cs-clean-row-top">
                <span class="cs-clean-label">Benda Panjang / Silinder (〜本 / hon)</span>
                <span class="cs-clean-q">Tanya: <b>なんぼん？</b></span>
              </div>
              <div class="cs-clean-content">
                • 1, 6, 8, 10: <b class="cs-txt-danger">いっぽん, ろっぽん, はっぽん, じゅっぽん</b> (-ppon)<br>
                • 3 & Tanya: <b class="cs-txt-primary">さんぼん, なんぼん？</b> (-bon) | Sisanya teratur: にほん, よんほん...
              </div>
            </div>

            <div class="cs-clean-row">
              <div class="cs-clean-row-top">
                <span class="cs-clean-label">Benda Berpasangan / Kaki (〜足 / soku)</span>
                <span class="cs-clean-q">Tanya: <b>なんぞく？</b></span>
              </div>
              <div class="cs-clean-content">
                • 1, 8, 10: <b class="cs-txt-danger">いっそく, はっそく, じゅっそく</b> (-ssoku)<br>
                • 3 & Tanya: <b class="cs-txt-primary">さんぞく, なんぞく？</b> (-zoku) | Sisanya teratur: にそく, よんそく...
              </div>
            </div>

            <div class="cs-clean-row">
              <div class="cs-clean-row-top">
                <span class="cs-clean-label">Unggas & Kelinci (〜羽 / wa)</span>
                <span class="cs-clean-q">Tanya: <b>なんわ？</b></span>
              </div>
              <div class="cs-clean-content">
                いちわ, にわ, <b class="cs-txt-primary">さんわ / さんば</b>, よんわ... <span class="cs-txt-sub">(Burung & kelinci)</span>
              </div>
            </div>

            <div class="cs-clean-row">
              <div class="cs-clean-row-top">
                <span class="cs-clean-label">Mesin & Kendaraan (〜台 / dai)</span>
                <span class="cs-clean-q">Tanya: <b>なんだい？</b></span>
              </div>
              <div class="cs-clean-content">
                いちだい, にだい, さんだい... <span class="cs-txt-sub">(Mobil, motor, komputer, TV - bacaan teratur)</span>
              </div>
            </div>
          </div>
        </div>
      `;
        } else if (this.csActiveTab === 'waktu') {
          body.innerHTML = `
        <div class="cs-section danger">
          <div class="cs-section-title">⏰ Anomali Jam (〜時 Ji)</div>
          <div class="cs-section-desc">Tiga jam penting yang bunyinya menyimpang dari angka dasar:</div>
          <div class="cs-clean-row">
            <div class="cs-clean-content" style="display:flex; flex-direction:column; gap:6px;">
              <div>• <b>Jam 4:</b> <b class="cs-txt-danger">よじ (yoji)</b> <span class="cs-txt-sub">(Bukan yonji / shiji)</span></div>
              <div>• <b>Jam 7:</b> <b class="cs-txt-danger">しちじ (shichiji)</b> <span class="cs-txt-sub">(Bukan nanaji)</span></div>
              <div>• <b>Jam 9:</b> <b class="cs-txt-danger">くじ (kuji)</b> <span class="cs-txt-sub">(Bukan kyuuji)</span></div>
            </div>
          </div>
        </div>

        <div class="cs-section info">
          <div class="cs-section-title">💡 Trik PIN 2579 Menit (〜分)</div>
          <div class="cs-section-desc">Rumus praktis membedakan akhiran <b>-fun</b> vs <b>-pun</b>:</div>
          <div class="cs-clean-row">
            <div class="cs-clean-content" style="display:flex; flex-direction:column; gap:6px;">
              <div>• <b>PIN 2, 5, 7, 9:</b> Hanya 4 angka ini yang berakhiran <b class="cs-txt-primary">〜ふん (fun)</b></div>
              <div>• <b>Sisanya (1, 3, 4, 6, 8, 10):</b> Selalu berakhiran <b class="cs-txt-danger">〜ぷん (pun)</b> dengan konsonan ganda/keras</div>
              <div>• <b>30 Menit:</b> <b class="cs-txt-gold">半 (はん / han)</b> <span class="cs-txt-sub">(Dapat juga diucapkan さんじゅっぷん)</span></div>
            </div>
          </div>
        </div>
      `;
        } else if (this.csActiveTab === 'kalender') {
          body.innerHTML = `
        <div class="cs-section warning">
          <div class="cs-section-title">📅 Tanggal 1 - 10 & 20 (Sistem Kun'yomi)</div>
          <div class="cs-section-desc">Wajib dihafal khusus karena tidak memakai pola -nichi standar:</div>
          <div class="cs-clean-row">
            <div class="cs-clean-content" style="display:flex; flex-direction:column; gap:8px;">
              <div>• <b>Tgl 1 - 5:</b> ついたち, ふつか, みっか, よっか, いつか</div>
              <div>• <b>Tgl 6 - 10:</b> むいか, なのか, ようか, ここのか, とおか</div>
              <div>• <b>Tgl 14 & 24:</b> <b class="cs-txt-gold">じゅうよっか, にじゅうよっか</b> <span class="cs-txt-sub">(Pola gabungan yokka)</span></div>
              <div>• <b>Tgl 20:</b> <b class="cs-txt-danger">はつか (hatsuka)</b> <span class="cs-txt-sub">(Bukan ni-jyuu-nichi)</span></div>
            </div>
          </div>
        </div>

        <div class="cs-section danger">
          <div class="cs-section-title">🌕 Anomali Bulan (〜月 Gatsu)</div>
          <div class="cs-section-desc">Tiga bulan dalam kalender dengan pelafalan istimewa:</div>
          <div class="cs-clean-row">
            <div class="cs-clean-content" style="display:flex; flex-direction:column; gap:6px;">
              <div>• <b>April (Bulan 4):</b> <b class="cs-txt-danger">しがつ (shigatsu)</b> <span class="cs-txt-sub">(Bukan yongatsu)</span></div>
              <div>• <b>Juli (Bulan 7):</b> <b class="cs-txt-danger">しちがつ (shichigatsu)</b> <span class="cs-txt-sub">(Bukan nanagatsu)</span></div>
              <div>• <b>September (Bulan 9):</b> <b class="cs-txt-danger">くがつ (kugatsu)</b> <span class="cs-txt-sub">(Bukan kyuugatsu)</span></div>
            </div>
          </div>
        </div>
      `;
        } else if (this.csActiveTab === 'relatif') {
          body.innerHTML = `
        <div class="cs-section info">
          <div class="cs-section-title">⏳ Pola Emas Sen - Kon - Rai</div>
          <div class="cs-section-desc">Rumus sumbu 3 dimensi waktu bahasa Jepang:</div>
          <div class="cs-clean-row">
            <div class="cs-clean-content" style="display:flex; flex-direction:column; gap:6px;">
              <div>• <b>先 (Sen):</b> <b class="cs-txt-primary">Masa Lalu</b> <span class="cs-txt-sub">先週 (senshuu - minggu lalu), 先月 (sengetsu - bulan lalu)</span></div>
              <div>• <b>今 (Kon):</b> <b class="cs-txt-primary">Masa Kini</b> <span class="cs-txt-sub">今週 (konshuu - minggu ini), 今月 (kongetsu - bulan ini)</span></div>
              <div>• <b>来 (Rai):</b> <b class="cs-txt-primary">Masa Depan</b> <span class="cs-txt-sub">来週 (raishuu - minggu depan), 来月 (raigetsu - bulan depan)</span></div>
            </div>
          </div>
        </div>

        <div class="cs-section danger">
          <div class="cs-section-title">⚠️ Anomali Waktu Relatif</div>
          <div class="cs-section-desc">Keterangan waktu yang berubah bunyi total dan wajib dihafal:</div>
          <div class="cs-clean-row">
            <div class="cs-clean-content" style="display:flex; flex-direction:column; gap:6px;">
              <div>• <b>Tahun Lalu:</b> <b class="cs-txt-danger">去年 (きょねん / kyonen)</b> <span class="cs-txt-sub">(Bukan sen-nen)</span></div>
              <div>• <b>Tahun Ini:</b> <b class="cs-txt-danger">今年 (ことし / kotoshi)</b> <span class="cs-txt-sub">(Bukan kon-nen)</span></div>
              <div>• <b>Tadi Pagi:</b> <b class="cs-txt-danger">今朝 (けさ / kesa)</b> <span class="cs-txt-sub">(Bukan kon-asa)</span></div>
              <div>• <b>Malam Ini:</b> <b class="cs-txt-gold">今晩 (こんばん / konban)</b></div>
              <div>• <b>Tadi Malam:</b> <b class="cs-txt-danger">昨夜 / 夕べ (ゆうべ / yuube)</b></div>
            </div>
          </div>
        </div>

        <div class="cs-section warning">
          <div class="cs-section-title">⚡ Titik Acuan & Frekuensi Waktu</div>
          <div class="cs-section-desc">Kosakata penunjuk momen kejadian:</div>
          <div class="cs-clean-row">
            <div class="cs-clean-content" style="display:flex; flex-direction:column; gap:6px;">
              <div>• <b>Sekarang & Nanti:</b> 今 (ima) | 後で (ato de)</div>
              <div>• <b>Barusan & Sebentar Lagi:</b> さっき (sakki) | もうすぐ (mousugu)</div>
              <div>• <b>Frekuensi:</b> <b class="cs-txt-gold">いつも (selalu)</b> | <b class="cs-txt-gold">時々 (kadang-kadang)</b></div>
              <div>• <b>Kata Tanya:</b> <b class="cs-txt-gold">いつ (itsu = kapan?)</b></div>
            </div>
          </div>
        </div>
      `;
        }
      },

      toggleSidebar: function () {
        const drawer = document.getElementById('sidebar-drawer');
        const isOpen = drawer && drawer.classList.contains('active');
        if (isOpen) {
          this.closeSidebar();
        } else {
          this.openSidebar();
        }
      },

      openSidebar: function () {
        this.playSfx('tap');
        const overlay = document.getElementById('sidebar-overlay');
        const drawer = document.getElementById('sidebar-drawer');
        const caret = document.getElementById('active-session-caret');
        if (overlay) overlay.classList.add('active');
        if (drawer) drawer.classList.add('active');
        if (caret) caret.style.transform = 'rotate(180deg)';
      },

      closeSidebar: function () {
        const overlay = document.getElementById('sidebar-overlay');
        const drawer = document.getElementById('sidebar-drawer');
        const caret = document.getElementById('active-session-caret');
        if (overlay) overlay.classList.remove('active');
        if (drawer) drawer.classList.remove('active');
        if (caret) caret.style.transform = 'rotate(0deg)';
      },

      bindKeyboardShortcuts: function () {
        window.addEventListener('keydown', (e) => {
          if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
          if (e.key === 'Escape') {
            this.closeCheatsheet();
            this.closeQuizConfigModal();
            this.closeSidebar();
            return;
          }
          if (this.mainMode === 'fc') {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              this.nextCard();
            } else if (e.key === 'ArrowRight') {
              this.nextCard();
            } else if (e.key === 'ArrowLeft') {
              this.prevCard();
            }
          }
        });

        document.addEventListener('click', () => {
          const dd = document.getElementById('drill-dropdown-menu');
          if (dd) dd.classList.add('hidden');
        });
      }
    };

    window.addEventListener('DOMContentLoaded', () => {
      Modul.init();
    });