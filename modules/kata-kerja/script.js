function hiraToRomaji(str) {
  if (!str) return '';
  const map = {
    'きゃ':'kya','きゅ':'kyu','きょ':'kyo','しゃ':'sha','しゅ':'shu','しょ':'sho',
    'ちゃ':'cha','ちゅ':'chu','ちょ':'cho','にゃ':'nya','にゅ':'nyu','にょ':'nyo',
    'ひゃ':'hya','ひゅ':'hyu','ひょ':'hyo','みゃ':'mya','みゅ':'myu','みょ':'myo',
    'りゃ':'rya','りゅ':'ryu','りょ':'ryo','ぎゃ':'gya','ぎゅ':'gyu','ぎょ':'gyo',
    'じゃ':'ja','じゅ':'ju','じょ':'jo','びゃ':'bya','びゅ':'byu','びょ':'byo',
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
    'わ':'wa','を':'wo','ん':'n',
    'が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go',
    'ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo',
    'だ':'da','ぢ':'ji','づ':'zu','de':'de','ど':'do',
    'ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo',
    'ぱ':'pa','pi':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po'
  };

  let res = '';
  let i = 0;
  while (i < str.length) {
    if (str[i] === 'っ') {
      const nextPair = str.slice(i + 1, i + 3);
      const nextChar = str[i + 1];
      const nextRomaji = map[nextPair] || map[nextChar] || '';
      if (nextRomaji) res += nextRomaji[0];
      i++;
      continue;
    }
    const pair = str.slice(i, i + 2);
    if (map[pair]) {
      res += map[pair];
      i += 2;
    } else if (map[str[i]]) {
      res += map[str[i]];
      i++;
    } else {
      res += str[i];
      i++;
    }
  }
  return res;
}

const Modul = {
  activeTab: 'flashcard',
  activeCategory: 'kel1', // 'kel1', 'kel2', 'irr'
  activeSesi: 0,
  cardIdx: 0,
  cardRevealed: false,
  activeFormKey: 'kamus', // 'kamus', 'masu', 'nai', 'te'
  
  // Quiz
  idxQuiz: 0,
  scoreQuiz: 0,
  drillSubtype: 'mix',      // 'mix', 'conjugation', 'kanji', 'meaning', 'isian'
  quizSourceMode: 'mastered', // Default to 'mastered' (stars ⭐) so unmastered words never leak into quiz
  quizTargetMode: 'all',    // 'all', '10', '25', 'custom'
  quizCustomCount: 20,
  activeQuizData: [],

  activeArray: [],
  masteredList: [],
  csActiveTab: 'te',
  _audioCtx: null,

  getDBInfo: function() {
    if (this.activeCategory === 'kel1') return { db: DB_Kel_1, pages: Pages_K1, label: 'Kelompok 1 (Godan)' };
    if (this.activeCategory === 'kel2') return { db: DB_Kel_2, pages: Pages_K2, label: 'Kelompok 2 (Ichidan)' };
    return { db: DB_Kel_Irr, pages: Pages_Irr, label: 'Irregular' };
  },

  // Audio Playback
  speakText: function(text) {
    if (!text || typeof text !== 'string') return;
    const cleanText = text.replace(/[s()（）~～/.,-]/g, '');
    if (!cleanText) return;

    try {
      const googleTTSUrl = 'https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=' + encodeURIComponent(cleanText);
      const audio = new Audio(googleTTSUrl);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          this.fallbackSpeechSynthesis(cleanText);
        });
      }
    } catch(e) {
      this.fallbackSpeechSynthesis(cleanText);
    }
  },

  fallbackSpeechSynthesis: function(cleanText) {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();

      const utter = new SpeechSynthesisUtterance(cleanText);
      utter.lang = 'ja-JP';
      utter.rate = 0.88;

      const voices = window.speechSynthesis.getVoices();
      const jaVoice = voices.find(v => v.lang && (v.lang.startsWith('ja') || v.lang.includes('JP')));
      if (jaVoice) utter.voice = jaVoice;

      window._activeUtterance = utter;
      utter.onend = () => { window._activeUtterance = null; };
      utter.onerror = () => { window._activeUtterance = null; };

      window.speechSynthesis.speak(utter);
    } catch(err) {}
  },

  playSfx: function(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this._audioCtx) this._audioCtx = new AudioCtx();
      if (this._audioCtx.state === 'suspended') this._audioCtx.resume();
      const ctx = this._audioCtx;
      const now = ctx.currentTime;

      if (type === 'correct') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'sine'; osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(523.25, now);
        osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.09);
        osc2.frequency.setValueAtTime(659.25, now + 0.09);
        osc2.frequency.exponentialRampToValueAtTime(783.99, now + 0.2);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
        osc1.connect(gain); osc2.connect(gain); gain.connect(ctx.destination);
        osc1.start(now); osc2.start(now + 0.09);
        osc1.stop(now + 0.24); osc2.stop(now + 0.24);
      } else if (type === 'wrong') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(175, now);
        osc.frequency.exponentialRampToValueAtTime(95, now + 0.2);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.22);
      } else if (type === 'tap' || type === 'reveal') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(type === 'reveal' ? 620 : 440, now);
        osc.frequency.exponentialRampToValueAtTime(type === 'reveal' ? 880 : 540, now + 0.07);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.09);
      }
    } catch(e) {}
  },

  triggerAnimation: function(elementId, animClass) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.classList.remove('slide-in-right', 'slide-out-left', 'slide-in-left', 'slide-out-right', 'fade-in-up');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.add(animClass);
      });
    });
  },

  // Category switching (Kelompok 1, Kelompok 2, Irregular)
  // Category switching (Kelompok 1, Kelompok 2, Irregular)
  switchCategory: function(cat) {
    this.playSfx('tap');
    this.activeCategory = cat;
    this.activeSesi = 0;
    this.cardIdx = 0;
    this.cardRevealed = false;
    this.activeFormKey = 'kamus';

    const arenaCards = document.querySelectorAll('.dojo-arena-card');
    arenaCards.forEach(c => {
      c.classList.toggle('kel2-mode-border', cat === 'kel2');
      c.classList.toggle('irr-mode-border', cat === 'irr');
    });

    const tabBtns = document.querySelectorAll('.tab-main-btn');
    tabBtns.forEach(b => {
      b.classList.toggle('mode-kel2-accent', cat === 'kel2');
      b.classList.toggle('mode-irr-accent', cat === 'irr');
    });

    this.updateActiveSessionUI();
    this.loadActiveArray();
    this.refreshCurrentTab();
  },

  updateActiveSessionUI: function() {
    const info = this.getDBInfo();
    const currentPage = info.pages[this.activeSesi] || info.pages[0];
    const labelEl = document.getElementById('active-session-label');
    const indicatorEl = document.getElementById('active-session-indicator');
    if (labelEl && currentPage) {
      labelEl.innerText = currentPage.title;
    }
    if (indicatorEl) {
      indicatorEl.classList.toggle('badge-kel2', this.activeCategory === 'kel2');
      indicatorEl.classList.toggle('badge-irr', this.activeCategory === 'irr');
    }
  },

  switchSesi: function(s) {
    this.playSfx('tap');
    this.activeSesi = s;
    this.cardIdx = 0;
    this.cardRevealed = false;
    this.activeFormKey = 'kamus';

    this.updateActiveSessionUI();
    this.loadActiveArray();
    this.refreshCurrentTab();
  },

  switchTab: function(tab) {
    this.playSfx('tap');
    this.activeTab = tab;

    const btnFlashcard = document.getElementById('btn-tab-flashcard');
    const btnQuiz = document.getElementById('btn-tab-quiz');
    const secFlashcard = document.getElementById('sec-flashcard');
    const secQuiz = document.getElementById('sec-quiz');

    if (btnFlashcard) btnFlashcard.classList.toggle('active', tab === 'flashcard');
    if (btnQuiz) btnQuiz.classList.toggle('active', tab === 'quiz');

    if (tab === 'flashcard') {
      if (secFlashcard) secFlashcard.classList.remove('hidden');
      if (secQuiz) secQuiz.classList.add('hidden');
      this.renderFC(false);
    } else {
      if (secFlashcard) secFlashcard.classList.add('hidden');
      if (secQuiz) secQuiz.classList.remove('hidden');
      this.activeQuizData = this.generateQuizQuestions();
      this.idxQuiz = 0;
      this.scoreQuiz = 0;
      this.renderQuiz(true);
    }
  },

  // SIDEBAR KHUSUS DRAWER (PRE-RENDERED FOR INSTANT 60FPS OPENING)
  openSidebar: function() {
    this.playSfx('tap');
    const overlay = document.getElementById('sidebar-drawer-overlay');
    if (overlay) {
      this.updateSidebarActiveState();
      overlay.classList.add('is-open');
    }
  },

  closeSidebar: function() {
    this.playSfx('tap');
    const overlay = document.getElementById('sidebar-drawer-overlay');
    if (overlay) overlay.classList.remove('is-open');
  },

  renderSidebarContent: function() {
    const body = document.getElementById('sd-body-content');
    if (!body) return;

    let html = '';

    const categories = [
      { key: 'kel1', label: 'Kelompok 1 (Godan) • 72 Kata', db: DB_Kel_1, pages: Pages_K1, classTitle: 'title-kel1' },
      { key: 'kel2', label: 'Kelompok 2 (Ichidan) • 28 Kata', db: DB_Kel_2, pages: Pages_K2, classTitle: 'title-kel2' },
      { key: 'irr', label: 'Kelompok 3 (Irregular) • 11 Kata', db: DB_Kel_Irr, pages: Pages_Irr, classTitle: 'title-irr' }
    ];

    categories.forEach(cat => {
      const isCurrentCat = (this.activeCategory === cat.key);
      const catMastered = cat.db.filter(v => this.masteredList.includes(v.k_kamus)).length;

      html += `
        <div class="sd-section">
          <div class="sd-section-title ${cat.classTitle}">
            <span>${cat.label}</span>
            <span id="sd-stat-${cat.key}">⭐ ${catMastered}/${cat.db.length}</span>
          </div>
          <div class="sd-session-list">
      `;

      cat.pages.forEach((p, idx) => {
        const verbsInPage = cat.db.filter(v => p.groups.includes(v.grp));
        const mCount = verbsInPage.filter(v => this.masteredList.includes(v.k_kamus)).length;
        const samples = verbsInPage.slice(0, 3).map(v => v.k_kamus).join(', ') + (verbsInPage.length > 3 ? '...' : '');
        const isActive = (isCurrentCat && this.activeSesi === idx);

        html += `
          <div class="sd-item ${isActive ? 'active' : ''}" id="sd-item-${cat.key}-${idx}" onclick="Modul.selectSessionFromSidebar('${cat.key}', ${idx})">
            <div class="sd-item-left">
              <div class="sd-item-title">${p.title}</div>
              <div class="sd-item-samples">${samples}</div>
            </div>
            <div class="sd-item-right">
              <span class="sd-count-badge">${verbsInPage.length} kata</span>
              <span class="sd-star-tag" id="sd-star-${cat.key}-${idx}">⭐ ${mCount}/${verbsInPage.length}</span>
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    body.innerHTML = html;
  },

  updateSidebarActiveState: function() {
    document.querySelectorAll('.sd-item').forEach(el => el.classList.remove('active'));
    const activeItem = document.getElementById(`sd-item-${this.activeCategory}-${this.activeSesi}`);
    if (activeItem) activeItem.classList.add('active');
  },

  selectSessionFromSidebar: function(cat, s) {
    this.playSfx('tap');
    this.activeCategory = cat;

    const arenaCards = document.querySelectorAll('.dojo-arena-card');
    arenaCards.forEach(c => {
      c.classList.toggle('kel2-mode-border', cat === 'kel2');
      c.classList.toggle('irr-mode-border', cat === 'irr');
    });

    const tabBtns = document.querySelectorAll('.tab-main-btn');
    tabBtns.forEach(b => {
      b.classList.toggle('mode-kel2-accent', cat === 'kel2');
      b.classList.toggle('mode-irr-accent', cat === 'irr');
    });

    this.switchSesi(s);
    this.closeSidebar();
  },

  advanceToNextSession: function() {
    this.playSfx('tap');
    const info = this.getDBInfo();
    if (this.activeSesi < info.pages.length - 1) {
      this.switchSesi(this.activeSesi + 1);
    } else if (this.activeCategory === 'kel1') {
      this.switchCategory('kel2');
    } else if (this.activeCategory === 'kel2') {
      this.switchCategory('irr');
    } else {
      this.switchTab('quiz');
    }
  },

  loadActiveArray: function() {
    const info = this.getDBInfo();
    const page = info.pages[this.activeSesi] || info.pages[0];
    const grps = page.groups;
    this.activeArray = info.db.filter(item => grps.includes(item.grp));
  },

  getVerbForms: function(item) {
    if (!item) return null;
    const k_ta = (item.k_te || '').replace(/て$/, 'た').replace(/で$/, 'だ');
    const r_ta = (item.r_te || '').replace(/て$/, 'た').replace(/で$/, 'だ');
    const k_nakatta = (item.k_nai || '').replace(/ない$/, 'なかった');
    const r_nakatta = (item.r_nai || '').replace(/ない$/, 'なかった');
    const k_teiru = (item.k_te || '') + 'いる';
    const r_teiru = (item.r_te || '') + 'いる';
    const k_tai = (item.k_masu || '').replace(/ます$/, 'たい');
    const r_tai = (item.r_masu || '').replace(/ます$/, 'たい');

    const k = item.k_kamus;
    const primaryA = item.a.split(',')[0].trim();
    const lowerA = primaryA.toLowerCase();

    const isStateVerb = [
      '終わる', '知る', '住む', '持つ', '太る', '痩せる', '覚える', '忘れる',
      '着る', '履く', 'かぶる', '掛ける', '結婚する', '開く', '閉まる', '消える',
      '電気をつける', '並べる', '壊れる', '落ちる', '死ぬ', '曲がる', '止まる',
      '直る', '曇る', '晴れる', '生まれる', '勤める', 'できる'
    ].includes(k);

    const isIntransitive = [
      '終わる', '行く', '来る', '帰る', '入る', '出る', '下りる', '死ぬ',
      '咲く', '降る', '吹く', '鳴く', '曇る', '晴れる', '消える', '落ちる',
      '壊れる', '曲がる', '止まる', '直る', '生まれる', '歩く', '走る', '泳ぐ',
      '登る', '渡る', 'できる'
    ].includes(k);

    let teMeaning = `${primaryA} lalu... / Tolong ${lowerA}`;
    if (isIntransitive) {
      teMeaning = `${primaryA} lalu... / Setelah ${lowerA}`;
    }

    let teiruTag = 'Sedang';
    let teiruSublabel = 'Sedang Berlangsung';
    let teiruMeaning = `Sedang ${lowerA}`;

    if (isStateVerb) {
      teiruTag = 'Status';
      teiruSublabel = 'Kondisi Menetap';
      if (k === '終わる') teiruMeaning = 'Sudah rampung / berstatus selesai';
      else if (k === '知る') teiruMeaning = 'Sudah tahu / kenal';
      else if (k === '住む') teiruMeaning = 'Tinggal / berdomisili di...';
      else if (k === '持つ') teiruMeaning = 'Punya / memiliki';
      else if (k === '結婚する') teiruMeaning = 'Berstatus sudah menikah';
      else if (['着る', '履く', 'かぶる'].includes(k)) teiruMeaning = 'Sedang mengenakan pakaian';
      else if (['開く', '閉まる', '消える', '壊れる'].includes(k)) teiruMeaning = `Dalam keadaan ${lowerA}`;
      else teiruMeaning = `Berstatus ${lowerA} (kondisi menetap)`;
    }

    return {
      kamus: {
        key: 'kamus',
        title: 'Kamus',
        sublabel: 'Jisho / Biasa',
        tag: 'Biasa',
        k: item.k_kamus,
        r: item.r_kamus,
        ro: hiraToRomaji(item.r_kamus),
        meaning: item.a,
        badge: '■ Bentuk Kamus'
      },
      masu: {
        key: 'masu',
        title: 'Masu',
        sublabel: 'Sopan Positif',
        tag: 'Sopan',
        k: item.k_masu,
        r: item.r_masu,
        ro: hiraToRomaji(item.r_masu),
        meaning: `${primaryA} (sopan)`,
        badge: '🌸 Bentuk Masu'
      },
      nai: {
        key: 'nai',
        title: 'Nai',
        sublabel: 'Negatif Biasa',
        tag: 'Negatif',
        k: item.k_nai,
        r: item.r_nai,
        ro: hiraToRomaji(item.r_nai),
        meaning: `Tidak ${lowerA}`,
        badge: '❄️ Bentuk Nai'
      },
      te: {
        key: 'te',
        title: 'Te',
        sublabel: isIntransitive ? 'Sambung / Urutan' : 'Sambung / Tolong',
        tag: 'Sambung',
        k: item.k_te,
        r: item.r_te,
        ro: hiraToRomaji(item.r_te),
        meaning: teMeaning,
        badge: '🔗 Bentuk Te'
      },
      ta: {
        key: 'ta',
        title: 'Ta',
        sublabel: 'Lampau Positif',
        tag: 'Lampau',
        k: k_ta,
        r: r_ta,
        ro: hiraToRomaji(r_ta),
        meaning: `Sudah / telah ${lowerA}`,
        badge: '⏳ Bentuk Ta'
      },
      nakatta: {
        key: 'nakatta',
        title: 'Nakatta',
        sublabel: 'Lampau Negatif',
        tag: 'Dulu Tidak',
        k: k_nakatta,
        r: r_nakatta,
        ro: hiraToRomaji(r_nakatta),
        meaning: `Tadi / dulu tidak ${lowerA}`,
        badge: '🍂 Bentuk Nakatta'
      },
      teiru: {
        key: 'teiru',
        title: 'Te-iru',
        sublabel: teiruSublabel,
        tag: teiruTag,
        k: k_teiru,
        r: r_teiru,
        ro: hiraToRomaji(r_teiru),
        meaning: teiruMeaning,
        badge: '🔄 Bentuk Te-iru'
      },
      tai: {
        key: 'tai',
        title: 'Tai',
        sublabel: 'Keinginan Pribadi',
        tag: 'Ingin',
        k: k_tai,
        r: r_tai,
        ro: hiraToRomaji(r_tai),
        meaning: `Ingin / mau ${lowerA}`,
        badge: '✨ Bentuk Tai'
      }
    };
  },

  getNuanceNote: function(formKey, k_kamus, isStateVerb, isIntransitive) {
    if (formKey === 'kamus') return 'Bentuk dasar netral/kasual untuk percakapan akrab atau pola tata bahasa formal.';
    if (formKey === 'masu') return 'Bentuk sopan (~masu) yang digunakan saat berbicara santun kepada orang lain dalam situasi formal.';
    if (formKey === 'nai') return 'Bentuk negatif biasa/kasual untuk menyatakan tidak melakukan sesuatu di masa sekarang atau masa mendatang.';
    if (formKey === 'te') {
      if (isIntransitive) return 'Bentuk sambung (~te) untuk urutan kejadian: setelah selesai/terjadi, lalu lanjut ke kegiatan berikutnya.';
      return 'Bentuk sambung (~te) untuk urutan kegiatan atau memohon bantuan halus (~te kudasai).';
    }
    if (formKey === 'ta') return 'Menyatakan tindakan atau peristiwa yang telah selesai terjadi di masa lampau secara kasual (sudah / tadi).';
    if (formKey === 'nakatta') return 'Menyatakan bahwa suatu perbuatan tidak dilakukan pada masa lampau secara santai (kemarin tidak / tadi tidak).';
    if (formKey === 'teiru') {
      if (isStateVerb) return 'Menyatakan status/kondisi hasil yang telah selesai tuntas dan keadaannya masih bertahan hingga saat ini.';
      return 'Menyatakan aktivitas atau perbuatan yang sedang berlangsung secara aktif saat ini.';
    }
    if (formKey === 'tai') return 'Mengungkapkan keinginan pribadi pembicara untuk melakukan suatu hal (ingin / mau).';
    return '';
  },

  getSentenceForForm: function(item, formKey) {
    if (!item) return { jpRaw: '', jpHtml: '', roHtml: '', idHtml: '', noteHtml: '', badge: '' };
    const forms = this.getVerbForms(item);
    const targetForm = forms[formKey] || forms.kamus;
    const s = VERB_SENTENCES_DB[item.k_kamus] || {};

    const k = item.k_kamus;
    const primaryA = item.a.split(',')[0].trim();
    const lowerA = primaryA.toLowerCase();

    const isStateVerb = [
      '終わる', '知る', '住む', '持つ', '太る', '痩せる', '覚える', '忘れる',
      '着る', '履く', 'かぶる', '掛ける', '結婚する', '開く', '閉まる', '消える',
      '電気をつける', '並べる', '壊れる', '落ちる', '死ぬ', '曲がる', '止まる',
      '直る', '曇る', '晴れる', '生まれる', '勤める', 'できる'
    ].includes(k);

    const isIntransitive = [
      '終わる', '行く', '来る', '帰る', '入る', '出る', '下りる', '死ぬ',
      '咲く', '降る', '吹く', '鳴く', '曇る', '晴れる', '消える', '落ちる',
      '壊れる', '曲がる', '止まる', '直る', '生まれる', '歩く', '走る', '泳ぐ',
      '登る', '渡る', 'できる'
    ].includes(k);

    let raw = null;
    if (typeof CURATED_SENTENCES_EXT !== 'undefined' && CURATED_SENTENCES_EXT[k] && CURATED_SENTENCES_EXT[k][formKey]) {
      raw = { ...CURATED_SENTENCES_EXT[k][formKey] };
    } else if (s[formKey]) {
      raw = { ...s[formKey] };
    } else {
      const baseMasu = s.masu || { jp: item.k_masu + '。', ro: forms.masu.ro + '.', id: primaryA };
      const baseNai = s.nai || { jp: item.k_nai + '。', ro: forms.nai.ro + '.', id: 'Tidak ' + lowerA };

      if (formKey === 'ta') {
        let jp = `昨日、${targetForm.k}。`;
        let ro = `Kinou, ${targetForm.ro}.`;
        let id = `Kemarin sudah ${lowerA}.`;
        raw = {
          jp, ro, id,
          note: 'Menyatakan tindakan atau peristiwa yang telah selesai terjadi di masa lampau secara kasual (sudah / tadi).'
        };
      } else if (formKey === 'nakatta') {
        let jp = `昨日は${targetForm.k}。`;
        let ro = `Kinou wa ${targetForm.ro}.`;
        let id = `Kemarin tidak ${lowerA}.`;
        raw = {
          jp, ro, id,
          note: 'Menyatakan bahwa suatu perbuatan tidak dilakukan pada masa lampau secara santai (kemarin tidak / tadi tidak).'
        };
      } else if (formKey === 'teiru') {
        if (isStateVerb) {
          let jp = `もう${targetForm.k}。`;
          let ro = `Mou ${targetForm.ro}.`;
          let id = (k === '終わる') ? 'Pekerjaan hari ini sudah selesai (semuanya beres).' :
                   (k === '知る') ? 'Sudah mengetahui informasi tersebut.' :
                   (k === '住む') ? 'Sedang bertempat tinggal di sana.' :
                   `Kondisinya sudah ${lowerA} (status hasil menetap).`;
          raw = {
            jp, ro, id,
            note: 'Menyatakan status/kondisi hasil yang telah selesai tuntas dan keadaannya masih bertahan hingga kini.'
          };
        } else {
          let jp = `今、${targetForm.k}。`;
          let ro = `Ima, ${targetForm.ro}.`;
          let id = `Sekarang sedang ${lowerA}.`;
          raw = {
            jp, ro, id,
            note: 'Menyatakan aktivitas atau perbuatan yang sedang berlangsung secara aktif saat ini.'
          };
        }
      } else if (formKey === 'tai') {
        let jp = `早く${targetForm.k}です。`;
        let ro = `Hayaku ${targetForm.ro} desu.`;
        let id = `Ingin segera ${lowerA}.`;
        raw = {
          jp, ro, id,
          note: 'Mengungkapkan keinginan pribadi pembicara untuk melakukan suatu hal (ingin / mau).'
        };
      } else {
        raw = baseMasu;
      }
    }

    const targetK = targetForm.k;
    const targetR = targetForm.r;
    const targetRo = targetForm.ro;

    let hlJp = raw.jp || '';
    if (hlJp && !hlJp.includes('sent-hl-verb')) {
      if (targetK && hlJp.includes(targetK)) {
        hlJp = hlJp.replace(targetK, `<span class="sent-hl-verb">${targetK}</span>`);
      } else if (targetR && hlJp.includes(targetR)) {
        hlJp = hlJp.replace(targetR, `<span class="sent-hl-verb">${targetR}</span>`);
      }
    }

    let hlRo = raw.ro || '';
    if (hlRo && !hlRo.includes('sent-hl-ro') && targetRo) {
      const regRo = new RegExp('(' + targetRo + ')', 'i');
      hlRo = hlRo.replace(regRo, `<span class="sent-hl-ro">$1</span>`);
    }

    let hlId = raw.id || '';
    const noteText = raw.note || this.getNuanceNote(formKey, k, isStateVerb, isIntransitive);

    return {
      jpRaw: raw.jp || '',
      jpHtml: hlJp,
      roHtml: hlRo,
      idHtml: hlId,
      noteHtml: noteText,
      badge: targetForm.badge,
      title: targetForm.title,
      tag: targetForm.tag,
      meaning: targetForm.meaning
    };
  },

  renderFC: function(useSlideAnim = true, animDirection = 'next') {
    const sec = document.getElementById('sec-flashcard');
    if (!sec) return;

    if (this.cardIdx >= this.activeArray.length) {
      const info = this.getDBInfo();
      const isLastSession = (this.activeSesi >= info.pages.length - 1);
      const nextSessionIdx = this.activeSesi + 1;

      let advanceButtonHTML = '';
      if (!isLastSession) {
        const nextSub = info.pages[nextSessionIdx];
        advanceButtonHTML = `
          <button type="button" class="btn-dn btn-dn-next btn-dn-advance" onclick="Modul.advanceToNextSession()">
            Lanjut ke ${nextSub.title} ➔
          </button>
        `;
      } else if (this.activeCategory === 'kel1') {
        advanceButtonHTML = `
          <button type="button" class="btn-dn btn-dn-next btn-dn-advance" onclick="Modul.switchCategory('kel2')">
            Lanjut ke Kelompok 2 (Ichidan) ➔
          </button>
        `;
      } else if (this.activeCategory === 'kel2') {
        advanceButtonHTML = `
          <button type="button" class="btn-dn btn-dn-next btn-dn-advance" onclick="Modul.switchCategory('irr')">
            Lanjut ke Kelompok 3 (Irregular) ➔
          </button>
        `;
      } else {
        advanceButtonHTML = `
          <button type="button" class="btn-dn btn-dn-next btn-dn-advance" onclick="Modul.switchTab('quiz')">
            Uji Semua di Arena Kuis 🏆
          </button>
        `;
      }

      const currentTitle = info.pages[this.activeSesi].title;
      const masteredCount = this.activeArray.filter(v => this.masteredList.includes(v.k_kamus)).length;

      sec.innerHTML = `
        <div class="fc-header-bar">
          <span class="fc-counter-label" style="color:var(--gold);">🎉 SESI SELESAI</span>
          <span class="fc-counter-label">${this.activeArray.length} / ${this.activeArray.length}</span>
        </div>
        <div class="fc-finish-body">
          <div class="fc-finish-icon">🌟</div>
          <div class="fc-finish-title">${currentTitle} Tuntas!</div>
          <div class="fc-finish-desc">
            Kamu telah mempelajari seluruh <b>${this.activeArray.length} kata kerja</b> beserta 8 konjugasinya.<br>
            Penguasaan: <b style="color:var(--gold);">⭐ ${masteredCount} / ${this.activeArray.length} kata dikuasai</b>.
          </div>
          <div class="fc-finish-actions">
            ${advanceButtonHTML}
            <div class="fc-finish-secondary-row">
              <button type="button" class="btn-dn" onclick="Modul.openSidebar()">☰ Daftar Sesi</button>
              <button type="button" class="btn-dn" onclick="Modul.cardIdx=0; Modul.renderFC(true, 'next')">Ulangi Sesi ↺</button>
              <button type="button" class="btn-dn" onclick="Modul.switchTab('quiz')">Arena Kuis ⚔️</button>
            </div>
          </div>
        </div>
      `;
      if (useSlideAnim) {
        const anim = animDirection === 'prev' ? 'slide-in-left' : 'slide-in-right';
        this.triggerAnimation('sec-flashcard', anim);
      }
      return;
    }

    const item = this.activeArray[this.cardIdx];
    const isMastered = this.masteredList.includes(item.k_kamus);
    const forms = this.getVerbForms(item);
    const activeFormKey = this.activeFormKey || 'kamus';
    const sentData = this.getSentenceForForm(item, activeFormKey);
    const prevDisabled = this.cardIdx === 0 ? 'disabled' : '';

    const formKeys = ['kamus', 'masu', 'nai', 'te', 'ta', 'nakatta', 'teiru', 'tai'];

    const cellsHtml = formKeys.map((key, idx) => {
      const f = forms[key];
      const isActive = (key === activeFormKey);
      return `
        <div class="inflection-cell ${isActive ? 'active-cell' : ''}" id="cell-form-${key}" onclick="Modul.selectFormKey('${key}')">
          <div class="inf-label">
            <div class="inf-label-left">
              <span class="inf-label-title">${idx + 1}. ${f.title}</span>
              <span class="inf-nuance-tag">${f.tag}</span>
            </div>
            <span class="inf-speaker" onclick="event.stopPropagation(); Modul.speakText('${f.k || f.r}')" title="Dengarkan (${f.title})">🔊</span>
          </div>
          <div class="inf-val">${f.k}</div>
          <div class="inf-sub">${f.r} (${f.ro})</div>
          <div class="inf-meaning" title="${f.meaning}">${f.meaning}</div>
        </div>
      `;
    }).join('');

    sec.innerHTML = `
      <!-- Top header inside card (Zero Redundancy, Pure Mastery Control) -->
      <div class="fc-header-bar">
        <span class="fc-counter-label">KATA <b>${this.cardIdx + 1}</b> / ${this.activeArray.length}</span>
        <div class="fc-header-right">
          <button type="button" class="btn-star-mark ${isMastered ? 'is-mastered' : ''}" id="btn-star-${item.k_kamus}" onclick="Modul.toggleMastery('${item.k_kamus}', event)" title="${isMastered ? 'Telah Dikuasai (Klik untuk batal)' : 'Tandai Dikuasai (Masukkan ke Kuis)'}">⭐</button>
          <button type="button" class="btn-star-mark btn-audio-speak" onclick="Modul.speakText('${item.k_kamus || item.r_kamus}', event)" title="Dengarkan Pengucapan Dasar">🔊</button>
        </div>
      </div>

      <!-- Main Verb Identity Hero (Unboxed, Sleek Floating Layout) -->
      <div class="fc-stage-box" id="fc-stage-box">
        <div class="fc-kanji-big">${item.k_kamus}</div>
        <div class="fc-word-meta">
          <span class="fc-hira-text">${item.r_kamus}</span>
          <span class="fc-ro-text">(${hiraToRomaji(item.r_kamus)})</span>
          <span class="fc-meta-sep">•</span>
          <span class="fc-arti-text">${item.a}</span>
        </div>
      </div>

      <!-- 8 Forms Morph Matrix (2 Columns x 4 Rows, All Visible, Zero Sub-Tabs!) -->
      <div class="fc-details-shelf">
        <div class="fc-grid-two">
          ${cellsHtml}
        </div>

        <!-- Live Nuance & Context Sentence Shelf (Synchronized Live) -->
        <div class="fc-sentence-shelf" onclick="event.stopPropagation()">
          <div class="fss-top">
            <div class="fss-badge-wrap">
              <span class="fss-badge">💬 Nuansa Kalimat:</span>
              <span class="fss-form-pill" id="fss-active-tag">${sentData.badge}</span>
            </div>
            <button type="button" class="btn-sentence-audio" id="btn-audio-sent" onclick="Modul.speakActiveSentence()" title="Dengarkan Kalimat Lengkap">🔊</button>
          </div>
          <div class="fss-jp" id="fss-jp-text">${sentData.jpHtml}</div>
          <div class="fss-romaji" id="fss-ro-text">${sentData.roHtml}</div>
          <div class="fss-id" id="fss-id-text">${sentData.idHtml}</div>
          <div class="fss-note" id="fss-note-text">💡 <b>Nuansa:</b> ${sentData.noteHtml}</div>
        </div>
      </div>

      <!-- Bottom Navigation Controls -->
      <div class="dojo-nav-controls">
        <button type="button" class="btn-dn" onclick="Modul.prevCard()" ${prevDisabled}>← Sebelumnya</button>
        <button type="button" class="btn-dn btn-dn-next" onclick="Modul.nextCard()">Selanjutnya →</button>
      </div>
    `;

    if (useSlideAnim) {
      const anim = animDirection === 'prev' ? 'slide-in-left' : 'slide-in-right';
      this.triggerAnimation('sec-flashcard', anim);
    }
  },

  speakActiveSentence: function() {
    const item = this.activeArray[this.cardIdx];
    if (!item) return;
    const sentData = this.getSentenceForForm(item, this.activeFormKey || 'kamus');
    if (sentData && sentData.jpRaw) this.speakText(sentData.jpRaw);
  },

  selectFormKey: function(key) {
    this.playSfx('tap');
    this.activeFormKey = key;
    const item = this.activeArray[this.cardIdx];
    if (!item) return;

    const forms = this.getVerbForms(item);
    const targetForm = forms[key] || forms.kamus;
    this.speakText(targetForm.k || targetForm.r);

    const formKeys = ['kamus', 'masu', 'nai', 'te', 'ta', 'nakatta', 'teiru', 'tai'];
    formKeys.forEach(k => {
      const cell = document.getElementById('cell-form-' + k);
      if (cell) cell.classList.toggle('active-cell', k === key);
    });

    const sentData = this.getSentenceForForm(item, key);
    const badgeEl = document.getElementById('fss-active-tag');
    const jpEl = document.getElementById('fss-jp-text');
    const roEl = document.getElementById('fss-ro-text');
    const idEl = document.getElementById('fss-id-text');
    const noteEl = document.getElementById('fss-note-text');

    if (badgeEl) badgeEl.innerText = sentData.badge;
    if (jpEl) jpEl.innerHTML = sentData.jpHtml;
    if (roEl) roEl.innerHTML = sentData.roHtml;
    if (idEl) idEl.innerHTML = sentData.idHtml;
    if (noteEl) noteEl.innerHTML = `💡 <b>Nuansa:</b> ${sentData.noteHtml}`;
  },

  nextCard: function() {
    if (this.cardIdx >= this.activeArray.length) return;
    this.playSfx('tap');
    this.triggerAnimation('sec-flashcard', 'slide-out-left');
    setTimeout(() => {
      this.cardIdx++;
      this.renderFC(true, 'next');
    }, 180);
  },

  prevCard: function() {
    if (this.cardIdx <= 0) return;
    this.playSfx('tap');
    this.triggerAnimation('sec-flashcard', 'slide-out-right');
    setTimeout(() => {
      this.cardIdx--;
      this.renderFC(true, 'prev');
    }, 180);
  },

  refreshCurrentTab: function() {
    if (this.activeTab === 'flashcard') {
      this.renderFC(true, 'next');
    } else {
      this.activeQuizData = this.generateQuizQuestions();
      this.idxQuiz = 0;
      this.scoreQuiz = 0;
      this.renderQuiz(true);
    }
  },

  loadMastery: function() {
    try {
      const saved = localStorage.getItem('yk_verbs_mastered');
      this.masteredList = saved ? JSON.parse(saved) : [];
    } catch(e) {
      this.masteredList = [];
    }
    this.updateMasteryUI();
  },

  toggleMastery: function(k, e) {
    if (e) e.stopPropagation();
    this.playSfx('tap');
    const idx = this.masteredList.indexOf(k);
    if (idx > -1) {
      this.masteredList.splice(idx, 1);
    } else {
      this.masteredList.push(k);
    }
    localStorage.setItem('yk_verbs_mastered', JSON.stringify(this.masteredList));
    this.updateMasteryUI();

    const starBtn = document.getElementById('btn-star-' + k);
    if (starBtn) {
      const isM = this.masteredList.includes(k);
      starBtn.classList.toggle('is-mastered', isM);
      starBtn.title = isM ? 'Telah Dikuasai' : 'Tandai Dikuasai';
    }
  },

  updateMasteryUI: function() {
    const totalAll = DB_Kel_1.length + DB_Kel_2.length + DB_Kel_Irr.length;
    const count = this.masteredList.length;
    const pct = Math.round((count / totalAll) * 100);

    const textEl = document.getElementById('nav-mastered-text');
    if (textEl) textEl.innerText = `⭐ Dikuasai: ${count} / ${totalAll}`;

    const fillEl = document.getElementById('mastery-progress-fill');
    if (fillEl) fillEl.style.width = `${pct}%`;
  },

  bindKeyboardShortcuts: function() {
    window.addEventListener('keydown', (e) => {
      if (document.activeElement && document.activeElement.tagName === 'INPUT') return;

      if (e.key === 'Escape') {
        this.closeCheatsheet();
        this.closeQuizConfigModal();
        this.closeSidebar();
        return;
      }

      if (this.activeTab === 'flashcard') {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          this.nextCard();
        } else if (e.key === 'ArrowRight') {
          this.nextCard();
        } else if (e.key === 'ArrowLeft') {
          this.prevCard();
        } else if (e.key === '1') {
          this.selectFormKey('kamus');
        } else if (e.key === '2') {
          this.selectFormKey('masu');
        } else if (e.key === '3') {
          this.selectFormKey('nai');
        } else if (e.key === '4') {
          this.selectFormKey('te');
        } else if (e.key === '5') {
          this.selectFormKey('ta');
        } else if (e.key === '6') {
          this.selectFormKey('nakatta');
        } else if (e.key === '7') {
          this.selectFormKey('teiru');
        } else if (e.key === '8') {
          this.selectFormKey('tai');
        }
      }
    });
  },

  // ARENA KUIS METHODS (IDENTIK KATA SIFAT)
  toggleDrillDropdown: function(e) {
    if (e) e.stopPropagation();
    this.playSfx('tap');
    const dd = document.getElementById('drill-dropdown-menu');
    const btn = document.getElementById('btn-drill-dropdown');
    if (dd) dd.classList.toggle('hidden');
    if (btn) btn.classList.toggle('active');
  },

  selectDrillSubtype: function(st, icon, label) {
    this.playSfx('tap');
    this.drillSubtype = st;

    const iconEl = document.getElementById('drill-label-icon');
    const textEl = document.getElementById('drill-label-text');
    if (iconEl) iconEl.innerText = icon;
    if (textEl) textEl.innerText = label;

    document.querySelectorAll('.dd-item').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-qtype') === st);
    });

    const dd = document.getElementById('drill-dropdown-menu');
    const btn = document.getElementById('btn-drill-dropdown');
    if (dd) dd.classList.add('hidden');
    if (btn) btn.classList.remove('active');

    this.activeQuizData = this.generateQuizQuestions();
    this.idxQuiz = 0;
    this.scoreQuiz = 0;
    this.renderQuiz(true);
  },

  getMasteredVerbs: function() {
    const seen = new Set();
    return this.activeArray.filter(item => {
      if (this.masteredList.includes(item.k_kamus) && !seen.has(item.k_kamus)) {
        seen.add(item.k_kamus);
        return true;
      }
      return false;
    });
  },

  // QUIZ CONFIG MODAL & POP-UP METHODS
  openQuizConfigModal: function() {
    this.playSfx('tap');
    const m = document.getElementById('quiz-config-modal');
    if (m) {
      this.updateQuizConfigUI();
      m.classList.remove('hidden');
    }
  },

  closeQuizConfigModal: function() {
    this.playSfx('tap');
    const m = document.getElementById('quiz-config-modal');
    if (m) m.classList.add('hidden');
  },

  selectQuizTargetMode: function(mode) {
    this.playSfx('tap');
    this.quizTargetMode = mode;
    this.updateQuizConfigUI();
  },

  selectQuizSourceMode: function(src) {
    this.playSfx('tap');
    this.quizSourceMode = src;
    this.updateQuizConfigUI();
  },

  onCustomCountInput: function(val) {
    let num = parseInt(val, 10);
    if (!isNaN(num)) {
      this.quizCustomCount = Math.max(5, Math.min(num, 250));
      const badge = document.getElementById('qc-count-badge-custom');
      if (badge) badge.innerText = `${this.quizCustomCount} Soal`;
    }
  },

  updateQuizConfigUI: function() {
    // 1. Update Target Options active state
    ['all', '10', '25', 'custom'].forEach(t => {
      const el = document.getElementById('qc-target-' + t);
      if (el) el.classList.toggle('active', this.quizTargetMode === t);
    });

    const customBox = document.getElementById('qc-custom-input-box');
    if (customBox) customBox.classList.toggle('hidden', this.quizTargetMode !== 'custom');

    const customInput = document.getElementById('qc-custom-count-input');
    if (customInput) customInput.value = this.quizCustomCount;

    // 2. Update Source Options active state
    ['mastered', 'session'].forEach(s => {
      const el = document.getElementById('qc-src-' + s);
      if (el) el.classList.toggle('active', this.quizSourceMode === s);
    });

    // 3. Update dynamic counts
    const masteredVerbs = this.getMasteredVerbs();
    const sessionVerbs = this.activeArray;
    const pool = (this.quizSourceMode === 'mastered') ? masteredVerbs : sessionVerbs;
    const poolCount = pool.length;

    const badgeMastered = document.getElementById('qc-src-badge-mastered');
    if (badgeMastered) badgeMastered.innerText = `${masteredVerbs.length} Kata`;

    const badgeSession = document.getElementById('qc-src-badge-session');
    if (badgeSession) badgeSession.innerText = `${sessionVerbs.length} Kata`;

    // Calculate "All (Bolak-balik)" question count
    let allCount = 0;
    if (this.drillSubtype === 'kanji') {
      const kanjiVerbs = pool.filter(v => v.k_kamus !== v.r_kamus);
      allCount = (kanjiVerbs.length > 0 ? kanjiVerbs.length : poolCount) * 2;
    } else {
      allCount = poolCount * 2;
    }

    const badgeAll = document.getElementById('qc-count-badge-all');
    if (badgeAll) badgeAll.innerText = poolCount > 0 ? `${allCount} Soal` : '0 Soal';

    const badgeCustom = document.getElementById('qc-count-badge-custom');
    if (badgeCustom) badgeCustom.innerText = `${this.quizCustomCount} Soal`;
  },

  updateQuizConfigButtonLabel: function() {
    const iconEl = document.getElementById('quiz-config-icon');
    const labelEl = document.getElementById('quiz-config-label');
    const pool = (this.quizSourceMode === 'mastered') ? this.getMasteredVerbs() : this.activeArray;

    let targetLabel = '';
    let targetIcon = '🎯';

    if (this.quizTargetMode === 'all') {
      targetIcon = '🔥';
      let totalQ = pool.length * 2;
      if (this.drillSubtype === 'kanji') {
        const kanjiVerbs = pool.filter(v => v.k_kamus !== v.r_kamus);
        totalQ = (kanjiVerbs.length > 0 ? kanjiVerbs.length : pool.length) * 2;
      }
      targetLabel = pool.length > 0 ? `Target: Semua (${totalQ})` : 'Target: Semua';
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

  applyQuizConfig: function() {
    this.playSfx('tap');
    this.closeQuizConfigModal();
    this.updateQuizConfigButtonLabel();
    this.activeQuizData = this.generateQuizQuestions();
    this.idxQuiz = 0;
    this.scoreQuiz = 0;
    this.renderQuiz(true);
  },

  toggleQuizSourceMode: function() {
    this.playSfx('tap');
    this.quizSourceMode = (this.quizSourceMode === 'mastered') ? 'session' : 'mastered';
    this.updateQuizConfigButtonLabel();
    this.activeQuizData = this.generateQuizQuestions();
    this.idxQuiz = 0;
    this.scoreQuiz = 0;
    this.renderQuiz(true);
  },

  generateQuizQuestions: function() {
    const useMastered = (this.quizSourceMode === 'mastered');
    let pool = [];

    if (useMastered) {
      pool = this.getMasteredVerbs();
      if (pool.length === 0) return [];
    } else {
      pool = [...this.activeArray];
    }

    const info = this.getDBInfo();
    const sessionDb = [...this.activeArray];
    const categoryDb = [...info.db];

    const targetSubtype = this.drillSubtype;
    const generated = [];
    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

    // Hitung total target pertanyaan
    let targetCount = 0;
    if (this.quizTargetMode === 'all') {
      if (targetSubtype === 'kanji') {
        const kanjiVerbs = pool.filter(v => v.k_kamus !== v.r_kamus);
        targetCount = (kanjiVerbs.length > 0 ? kanjiVerbs.length : pool.length) * 2;
      } else {
        targetCount = pool.length * 2;
      }
    } else if (this.quizTargetMode === '10') {
      targetCount = 10;
    } else if (this.quizTargetMode === '25') {
      targetCount = 25;
    } else if (this.quizTargetMode === 'custom') {
      targetCount = Math.max(5, Math.min(this.quizCustomCount || 20, 250));
    }

    let formsToTest = [];
    if (targetSubtype === 'conjugation' || targetSubtype === 'mix') {
      formsToTest = ['masu', 'te', 'ta', 'nai', 'nakatta', 'teiru', 'tai'];
    }

    if (formsToTest.length > 0) {
      const count = (targetSubtype === 'mix') ? Math.max(4, Math.round(targetCount * 0.4)) : targetCount;
      const shuffledPool = shuffle([...pool]);

      for (let i = 0; i < count; i++) {
        const item = shuffledPool[i % shuffledPool.length];
        const forms = this.getVerbForms(item);
        const fKey = formsToTest[i % formsToTest.length];
        const fm = forms[fKey];

        const ans = fm.k;
        const distractors = new Set();
        distractors.add(item.k_kamus);

        // Add other forms of this same verb
        ['masu', 'nai', 'te', 'ta', 'nakatta', 'teiru', 'tai'].forEach(k => {
          if (forms[k] && forms[k].k !== ans) distractors.add(forms[k].k);
        });

        // Add matching form from other verbs in sessionDb
        const otherVerbs = shuffle(sessionDb.filter(v => v.k_kamus !== item.k_kamus));
        for (let ov of otherVerbs) {
          if (distractors.size >= 5) break;
          const ovForms = this.getVerbForms(ov);
          if (ovForms && ovForms[fKey] && ovForms[fKey].k) distractors.add(ovForms[fKey].k);
        }

        const opts = shuffle(Array.from(distractors)).slice(0, 4);
        if (!opts.includes(ans)) opts[0] = ans;

        generated.push({
          type: 'mc',
          q: `Ubah kata <b class="q-target-word">${item.k_kamus}</b> (${item.a}) ke <b class="q-target-form">${fm.badge}</b>!`,
          audio: ans,
          opts: shuffle(opts),
          ans: ans,
          badge: fm.badge
        });
      }
    }

    if (targetSubtype === 'kanji' || targetSubtype === 'mix') {
      let kanjiPool = pool.filter(item => item.k_kamus !== item.r_kamus);
      if (kanjiPool.length === 0) {
        kanjiPool = sessionDb.filter(item => item.k_kamus !== item.r_kamus);
      }
      if (kanjiPool.length === 0) {
        kanjiPool = categoryDb.filter(item => item.k_kamus !== item.r_kamus);
      }

      if (kanjiPool.length > 0) {
        const count = (targetSubtype === 'mix') ? Math.max(2, Math.round(targetCount * 0.25)) : targetCount;
        const shuffledPool = shuffle([...kanjiPool]);

        for (let i = 0; i < count; i++) {
          const item = shuffledPool[i % shuffledPool.length];
          const isKanjiToReading = (i % 2 === 0);

          if (isKanjiToReading) {
            const ans = item.r_kamus;
            const distractors = [ans];
            const otherVerbs = shuffle(sessionDb.filter(v => v.r_kamus !== ans));
            for (let ov of otherVerbs) {
              if (distractors.length >= 4) break;
              if (!distractors.includes(ov.r_kamus)) distractors.push(ov.r_kamus);
            }
            if (distractors.length < 4) {
              const catVerbs = shuffle(categoryDb.filter(v => v.r_kamus !== ans));
              for (let ov of catVerbs) {
                if (distractors.length >= 4) break;
                if (!distractors.includes(ov.r_kamus)) distractors.push(ov.r_kamus);
              }
            }

            generated.push({
              type: 'mc',
              q: `Bagaimana cara membaca kanji kata kerja:<br><span style="font-size:38px; font-weight:800; color:var(--primary); font-family:'Noto Serif JP','Noto Sans JP',serif;">${item.k_kamus}</span><br><span style="font-size:13px; color:var(--text-sub); font-weight:600;">(${item.a})</span>`,
              audio: item.k_kamus,
              opts: shuffle(distractors),
              ans: ans,
              badge: '🈶 Tebak Bacaan'
            });
          } else {
            const ans = item.k_kamus;
            const distractors = [ans];
            const otherVerbs = shuffle(sessionDb.filter(v => v.k_kamus !== ans && v.k_kamus !== v.r_kamus));
            for (let ov of otherVerbs) {
              if (distractors.length >= 4) break;
              if (!distractors.includes(ov.k_kamus)) distractors.push(ov.k_kamus);
            }
            if (distractors.length < 4) {
              const catVerbs = shuffle(categoryDb.filter(v => v.k_kamus !== ans && v.k_kamus !== v.r_kamus));
              for (let ov of catVerbs) {
                if (distractors.length >= 4) break;
                if (!distractors.includes(ov.k_kamus)) distractors.push(ov.k_kamus);
              }
            }

            generated.push({
              type: 'mc',
              q: `Pilihlah kanji yang tepat untuk kata kerja:<br><span style="font-size:34px; font-weight:800; color:var(--gold);">${item.r_kamus}</span><br><span style="font-size:13px; color:var(--text-sub); font-weight:600;">(${item.a})</span>`,
              audio: item.k_kamus,
              opts: shuffle(distractors),
              ans: ans,
              badge: '🈶 Tebak Kanji'
            });
          }
        }
      }
    }

    if (targetSubtype === 'meaning' || targetSubtype === 'mix') {
      const count = (targetSubtype === 'mix') ? Math.max(2, Math.round(targetCount * 0.25)) : targetCount;
      const shuffledPool = shuffle([...pool]);

      for (let i = 0; i < count; i++) {
        const item = shuffledPool[i % shuffledPool.length];
        const ans = item.a;
        const otherVerbs = shuffle(sessionDb.filter(v => v.k_kamus !== item.k_kamus));
        const distractors = [ans];
        for (let ov of otherVerbs) {
          if (distractors.length >= 4) break;
          if (!distractors.includes(ov.a)) distractors.push(ov.a);
        }
        if (distractors.length < 4) {
          const catVerbs = shuffle(categoryDb.filter(v => v.k_kamus !== item.k_kamus));
          for (let ov of catVerbs) {
            if (distractors.length >= 4) break;
            if (!distractors.includes(ov.a)) distractors.push(ov.a);
          }
        }

        const isJpToId = (i % 2 === 0);
        if (isJpToId) {
          generated.push({
            type: 'mc',
            q: `Apa arti bahasa Indonesia dari kata kerja:<br><span style="font-size:36px; font-weight:800; color:var(--primary);">${item.k_kamus}</span> (${item.r_kamus})?`,
            audio: item.k_kamus,
            opts: shuffle(distractors),
            ans: ans,
            badge: '📖 Tebak Arti'
          });
        } else {
          const jpOpts = [item.k_kamus];
          for (let ov of otherVerbs) {
            if (jpOpts.length >= 4) break;
            if (!jpOpts.includes(ov.k_kamus)) jpOpts.push(ov.k_kamus);
          }
          if (jpOpts.length < 4) {
            const catVerbs = shuffle(categoryDb.filter(v => v.k_kamus !== item.k_kamus));
            for (let ov of catVerbs) {
              if (jpOpts.length >= 4) break;
              if (!jpOpts.includes(ov.k_kamus)) jpOpts.push(ov.k_kamus);
            }
          }
          generated.push({
            type: 'mc',
            q: `Pilihlah kata kerja bahasa Jepang yang berarti:<br><b style="font-size:26px; color:var(--gold);">"${item.a}"</b>`,
            audio: item.k_kamus,
            opts: shuffle(jpOpts),
            ans: item.k_kamus,
            badge: '🎯 Cari Kata'
          });
        }
      }
    }

    if (targetSubtype === 'isian' || targetSubtype === 'mix') {
      const isianPool = shuffle([...pool]);
      const count = (targetSubtype === 'mix') ? Math.max(2, Math.round(targetCount * 0.1)) : targetCount;

      for (let i = 0; i < count; i++) {
        const item = isianPool[i % isianPool.length];
        const isArti = (i % 2 === 0);

        if (isArti) {
          const cleanA = item.a.toLowerCase();
          const ansArray = [cleanA.replace(/[\s-]/g, '').replace(/\([^)]*\)/g, '')];
          cleanA.split(',').forEach(p => {
            const cp = p.replace(/\([^)]*\)/g, '').replace(/[\s-]/g, '');
            if (cp && !ansArray.includes(cp)) ansArray.push(cp);
          });
          generated.push({
            type: 'isian',
            isArti: true,
            q: `Ketik arti bahasa Indonesia dari kata dasar:<br><span style="font-size:36px; font-weight:800; color:var(--gold);">${item.k_kamus}</span>`,
            audio: item.k_kamus,
            ans: ansArray,
            badge: '✍️ Isian Arti'
          });
        } else {
          const ansArray = [item.r_kamus.replace(/[\s]/g, '')];
          if (item.k_kamus !== item.r_kamus) ansArray.push(item.k_kamus.replace(/[\s]/g, ''));
          generated.push({
            type: 'isian',
            isArti: false,
            q: `Ketik bacaan Hiragana dari kata dasar:<br><span style="font-size:36px; font-weight:800; color:#fff;">${item.k_kamus}</span>`,
            audio: item.k_kamus,
            ans: ansArray,
            badge: '✍️ Isian Hiragana'
          });
        }
      }
    }

    return shuffle(generated).slice(0, targetCount);
  },

  renderQuiz: function(useSlideAnim = true) {
    const fb = document.getElementById('quiz-feedback-bar');
    if (fb) { fb.innerHTML = ''; fb.style.opacity = '0'; }
    const pool = this.activeQuizData;

    const info = this.getDBInfo();
    const sessionName = info.pages[this.activeSesi].title.split(':')[0];
    const masteredInSession = this.getMasteredVerbs();

    // Perbarui label & ikon tombol pengaturan kuis
    this.updateQuizConfigButtonLabel();

    // Mode Pill backward compatibility if present
    const modePill = document.getElementById('quiz-mode-pill');
    if (modePill) {
      if (this.quizSourceMode === 'mastered') {
        modePill.innerHTML = `<span>⭐</span> <span id="quiz-mode-text">${masteredInSession.length} DIKUASAI</span>`;
        modePill.title = `Kuis kata berbintang di ${sessionName}. Klik untuk kuis seluruh kata di sesi ini.`;
        modePill.style.color = 'var(--gold)';
        modePill.style.borderColor = 'rgba(251, 191, 36, 0.4)';
        modePill.style.background = 'rgba(251, 191, 36, 0.15)';
      } else {
        modePill.innerHTML = `<span>🏷️</span> <span id="quiz-mode-text">Sesi ${sessionName}</span>`;
        modePill.title = `Kuis seluruh kata di ${sessionName}. Klik untuk kuis hanya kata berbintang.`;
        modePill.style.color = 'var(--primary)';
        modePill.style.borderColor = 'rgba(56, 189, 248, 0.4)';
        modePill.style.background = 'rgba(56, 189, 248, 0.15)';
      }
    }

    const progPill = document.getElementById('quiz-progress-pill');
    const scorePill = document.getElementById('quiz-score-pill');
    if (scorePill) scorePill.innerHTML = `SKOR <b>${this.scoreQuiz}</b>`;

    const optContainer = document.getElementById('quiz-options-container');
    const isianContainer = document.getElementById('quiz-isian-container');
    const qTextEl = document.getElementById('quiz-q-text');

    if (this.quizSourceMode === 'mastered' && pool.length === 0) {
      if (progPill) progPill.innerHTML = `SOAL <b>0</b> / 0`;
      if (scorePill) scorePill.innerHTML = `SKOR <b>0</b>`;
      qTextEl.innerHTML = `
        <div class="quiz-empty-mastery">
          <div class="qem-icon">⭐</div>
          <div class="qem-title">Belum Ada Kata Dikuasai di ${sessionName}</div>
          <div class="qem-desc">
            Kamu belum menandai kata kerja dengan bintang <b>⭐</b> di <b>${sessionName}</b>.<br>
            Beri bintang pada flashcard yang telah kamu pelajari untuk mengujinya di kuis ini!
          </div>
          <div class="qem-actions">
            <button type="button" class="btn-dn btn-dn-next" onclick="Modul.switchTab('flashcard')">
              📖 Buka Flashcard ${sessionName} ⭐
            </button>
            <button type="button" class="btn-dn" onclick="Modul.toggleQuizSourceMode()">
              🏷️ Uji Seluruh Kata di ${sessionName} (${this.activeArray.length} Kata)
            </button>
          </div>
        </div>
      `;
      if (optContainer) optContainer.innerHTML = '';
      if (isianContainer) isianContainer.classList.add('hidden');
      return;
    }

    if (this.idxQuiz >= pool.length) {
      if (progPill) progPill.innerHTML = `<b>🎉 SELESAI</b>`;
      const pct = Math.round((this.scoreQuiz / Math.max(1, pool.length)) * 100);
      let remark = pct >= 80 ? '🌟 Luar Biasa! Daya ingat konjugasimu sangat tajam!' : pct >= 50 ? '👍 Bagus! Terus latih bentuk yang masih keliru!' : '💪 Jangan menyerah! Buka flashcard dan ulangi kembali!';

      qTextEl.innerHTML = `
        <div class="quiz-finish-box">
          <div class="qfb-badge">🏆 ARENA SELESAI</div>
          <div class="qfb-score">${this.scoreQuiz} / ${pool.length}</div>
          <div class="qfb-pct">Akurasi: ${pct}%</div>
          <div class="qfb-remark">${remark}</div>
          <div class="qfb-actions">
            <button type="button" class="btn-dn btn-dn-next" onclick="Modul.idxQuiz=0; Modul.scoreQuiz=0; Modul.activeQuizData=Modul.generateQuizQuestions(); Modul.renderQuiz(true);">
              Mainkan Lagi ↺
            </button>
            <button type="button" class="btn-dn" onclick="Modul.switchTab('flashcard')">
              Buka Flashcard 🎴
            </button>
          </div>
        </div>
      `;
      if (optContainer) optContainer.innerHTML = '';
      if (isianContainer) isianContainer.classList.add('hidden');
      return;
    }

    const currentQ = pool[this.idxQuiz];
    if (progPill) progPill.innerHTML = `SOAL <b>${this.idxQuiz + 1}</b> / ${pool.length}`;
    qTextEl.innerHTML = `
      <div style="font-size:11px; font-weight:800; color:var(--primary); margin-bottom:6px; letter-spacing:0.8px;">
        ${currentQ.badge}
      </div>
      <div>${currentQ.q}</div>
    `;

    if (currentQ.type === 'mc') {
      if (isianContainer) isianContainer.classList.add('hidden');
      if (optContainer) {
        optContainer.classList.remove('hidden');
        optContainer.innerHTML = currentQ.opts.map((opt, oIdx) => `
          <button type="button" class="btn-quiz-opt quiz-opt-btn" onclick="Modul.checkMcAnswer(${oIdx}, this)">
            <span class="opt-key">${['A','B','C','D'][oIdx]}</span>
            <span class="opt-text">${opt}</span>
          </button>
        `).join('');
      }
    } else {
      if (optContainer) optContainer.classList.add('hidden');
      if (isianContainer) {
        isianContainer.classList.remove('hidden');
        const inputEl = document.getElementById('quiz-isian-input');
        if (inputEl) {
          inputEl.value = '';
          inputEl.disabled = false;
          inputEl.focus();
        }
      }
    }

    if (useSlideAnim) {
      this.triggerAnimation('sec-quiz', 'slide-in-right');
    }
  },

  checkMcAnswer: function(optIdx, btnEl) {
    const currentQ = this.activeQuizData[this.idxQuiz];
    if (!currentQ || currentQ._answered) return;
    currentQ._answered = true;

    const chosen = currentQ.opts[optIdx];
    const isCorrect = (chosen === currentQ.ans);
    const fb = document.getElementById('quiz-feedback-bar');

    document.querySelectorAll('.btn-quiz-opt, .quiz-opt-btn').forEach(b => {
      b.disabled = true;
      const t = b.querySelector('.opt-text') ? b.querySelector('.opt-text').innerText : b.innerText;
      if (t.trim() === currentQ.ans.trim()) b.classList.add('correct');
      else if (b === btnEl && !isCorrect) b.classList.add('wrong');
    });

    if (isCorrect) {
      this.scoreQuiz++;
      this.playSfx('correct');
      if (currentQ.audio) this.speakText(currentQ.audio);
      if (fb) {
        fb.innerHTML = `<span style="color:var(--success);">✅ Benar! Tepat sekali.</span>`;
        fb.style.opacity = '1';
      }
    } else {
      this.playSfx('wrong');
      if (fb) {
        fb.innerHTML = `<span style="color:var(--danger);">❌ Kurang tepat. Jawaban benar: <b>${currentQ.ans}</b></span>`;
        fb.style.opacity = '1';
      }
    }

    const scorePill = document.getElementById('quiz-score-pill');
    if (scorePill) scorePill.innerHTML = `SKOR <b>${this.scoreQuiz}</b>`;

    setTimeout(() => {
      this.idxQuiz++;
      this.renderQuiz(true);
    }, 1200);
  },

  submitIsianAnswer: function() {
    const currentQ = this.activeQuizData[this.idxQuiz];
    if (!currentQ || currentQ._answered) return;

    const inputEl = document.getElementById('quiz-isian-input');
    if (!inputEl) return;
    const userVal = inputEl.value.trim().toLowerCase().replace(/[\s-]/g, '');
    if (!userVal) return;

    currentQ._answered = true;
    inputEl.disabled = true;

    const isCorrect = currentQ.ans.some(a => a.toLowerCase() === userVal);
    const fb = document.getElementById('quiz-feedback-bar');

    if (isCorrect) {
      this.scoreQuiz++;
      this.playSfx('correct');
      if (currentQ.audio) this.speakText(currentQ.audio);
      inputEl.style.borderColor = 'var(--success)';
      inputEl.style.boxShadow = '0 0 14px rgba(34, 197, 94, 0.4)';
      if (fb) {
        fb.innerHTML = `<span style="color:var(--success);">✅ Hebat! Jawabanmu benar.</span>`;
        fb.style.opacity = '1';
      }
    } else {
      this.playSfx('wrong');
      inputEl.style.borderColor = 'var(--danger)';
      inputEl.style.boxShadow = '0 0 14px rgba(239, 68, 68, 0.4)';
      if (fb) {
        fb.innerHTML = `<span style="color:var(--danger);">❌ Kurang tepat. Jawaban benar: <b>${currentQ.ans[0]}</b></span>`;
        fb.style.opacity = '1';
      }
    }

    const scorePill = document.getElementById('quiz-score-pill');
    if (scorePill) scorePill.innerHTML = `SKOR <b>${this.scoreQuiz}</b>`;

    setTimeout(() => {
      this.idxQuiz++;
      this.renderQuiz(true);
    }, 1400);
  },

  // CHEATSHEET RUMUS MODAL
  // TIPS & PANDUAN KONJUGASI MODAL (Zero-Lag Pre-Rendered Architecture)
  openCheatsheet: function() {
    this.playSfx('tap');
    const m = document.getElementById('cheatsheet-modal');
    if (m) {
      this.ensureCheatsheetPanels();
      m.classList.remove('hidden');
      this.renderCheatsheetContent();
    }
  },

  closeCheatsheet: function() {
    this.playSfx('tap');
    const m = document.getElementById('cheatsheet-modal');
    if (m) m.classList.add('hidden');
  },

  switchCSTab: function(tab) {
    this.playSfx('tap');
    this.csActiveTab = tab;

    document.querySelectorAll('.cs-tab-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById('cs-tab-' + tab);
    if (activeBtn) activeBtn.classList.add('active');

    this.renderCheatsheetContent();
  },

  ensureCheatsheetPanels: function() {
    const box = document.getElementById('cs-body-content');
    if (!box || box.dataset.initialized === 'true') return;

    box.innerHTML = `
      <div class="cs-panel" id="cs-panel-te">${this.getTipsHTML('te')}</div>
      <div class="cs-panel hidden" id="cs-panel-rules">${this.getTipsHTML('rules')}</div>
      <div class="cs-panel hidden" id="cs-panel-trap">${this.getTipsHTML('trap')}</div>
    `;
    box.dataset.initialized = 'true';
  },

  renderCheatsheetContent: function() {
    this.ensureCheatsheetPanels();
    const box = document.getElementById('cs-body-content');
    if (!box) return;

    const targetTab = this.csActiveTab || 'te';
    const panels = ['te', 'rules', 'trap'];
    panels.forEach(p => {
      const el = document.getElementById('cs-panel-' + p);
      if (el) el.classList.toggle('hidden', p !== targetTab);
    });
    box.scrollTop = 0;
  },

  getTipsHTML: function(tab) {
    if (tab === 'te') {
      return `
        <div class="cs-section-intro">
          <b style="color:#fff;">💡 8 Bentuk Konjugasi Kata Kerja N5</b><br>
          Panduan lengkap memahami <i>maksud, tujuan</i>, dan <i>kapan</i> masing-masing bentuk perubahan digunakan dalam percakapan dan tata bahasa:
        </div>

        <div class="cs-item-row">
          <div class="cs-item-header">
            <span class="cs-badge-pill gold">1. Bentuk Kamus (辞書形 - Jisho-kei)</span>
            <span class="cs-nuance-tag">Bentuk Asli • Kasual</span>
          </div>
          <div class="cs-item-purpose">
            <b>Maksud & Tujuan:</b> Bentuk dasar (asal) kata kerja yang belum mengalami perubahan. Bersifat netral dan bernuansa kasual (*Futsuugo*).
          </div>
          <div class="cs-item-when">
            <b class="gold">Kapan Digunakan:</b><br>
            • Percakapan santai dengan teman sebaya atau keluarga.<br>
            • Bentuk kata yang dicari di dalam kamus bahasa Jepang.<br>
            • Tata bahasa khusus seperti <i>~ ことができる</i> (bisa/mampu) dan <i>~ 前に</i> (sebelum melakukan sesuatu).
          </div>
          <div class="cs-item-example">
            Contoh: 飲む (minum) • 食べる (makan) • 行く (pergi)
          </div>
        </div>

        <div class="cs-item-row">
          <div class="cs-item-header">
            <span class="cs-badge-pill">2. Bentuk Masu (ます形 - Masu-kei)</span>
            <span class="cs-nuance-tag">Sopan & Formal</span>
          </div>
          <div class="cs-item-purpose">
            <b>Maksud & Tujuan:</b> Bentuk sopan (*Teineigo*) masa kini/mendatang untuk menunjukkan rasa hormat dan etika kepada lawan bicara.
          </div>
          <div class="cs-item-when">
            <b>Kapan Digunakan:</b><br>
            • Berbicara kepada orang yang baru dikenal, atasan, guru, rekan kerja, atau orang yang lebih tua.<br>
            • Bahasa percakapan standar dalam situasi publik, perkantoran, dan interaksi resmi sehari-hari.
          </div>
          <div class="cs-item-example">
            Contoh: 飲みます (minum) • 食べます (makan) • 行きます (pergi)
          </div>
        </div>

        <div class="cs-item-row">
          <div class="cs-item-header">
            <span class="cs-badge-pill danger">3. Bentuk Nai (ない形 - Nai-kei)</span>
            <span class="cs-nuance-tag">Negatif Masa Kini • Kasual</span>
          </div>
          <div class="cs-item-purpose">
            <b>Maksud & Tujuan:</b> Menyangkal suatu tindakan di masa sekarang atau masa mendatang (tidak / belum melakukan).
          </div>
          <div class="cs-item-when">
            <b style="color:var(--danger);">Kapan Digunakan:</b><br>
            • Percakapan akrab saat menolak atau menyatakan tidak melakukan hal tertentu.<br>
            • Pola tata bahasa larangan halus <i>~ ないでください</i> (tolong jangan...) dan keharusan <i>~ なければなりません</i> (harus melakukan...).
          </div>
          <div class="cs-item-example">
            Contoh: 飲まない (tidak minum) • 食べない (tidak makan) • 行かない (tidak pergi)
          </div>
        </div>

        <div class="cs-item-row">
          <div class="cs-item-header">
            <span class="cs-badge-pill danger">4. Bentuk Nakatta (なかった形 - Nakatta-kei)</span>
            <span class="cs-nuance-tag">Negatif Masa Lampau • Kasual</span>
          </div>
          <div class="cs-item-purpose">
            <b>Maksud & Tujuan:</b> Menyatakan bahwa suatu tindakan tidak dilakukan di masa lampau (tadi tidak / kemarin tidak).
          </div>
          <div class="cs-item-when">
            <b style="color:var(--danger);">Kapan Digunakan:</b><br>
            • Menceritakan hal atau kejadian yang tidak dilakukan di masa lalu kepada teman akrab atau kerabat.<br>
            • Bentuk kasual (*Futsuugo*) dari <i>~ ませんでした (~masen deshita)</i>.
          </div>
          <div class="cs-item-example">
            Contoh: 飲まなかった (tadi tidak minum) • 食べなかった (kemarin tidak makan)
          </div>
        </div>

        <div class="cs-item-row">
          <div class="cs-item-header">
            <span class="cs-badge-pill success">5. Bentuk Te (て形 - Te-kei)</span>
            <span class="cs-nuance-tag">Bentuk Sambung • Perintah Halus</span>
          </div>
          <div class="cs-item-purpose">
            <b>Maksud & Tujuan:</b> Bentuk penghubung (*connecting form*) untuk merangkai beberapa aktivitas atau menjadi jembatan berbagai pola kalimat penting.
          </div>
          <div class="cs-item-when">
            <b class="success">Kapan Digunakan:</b><br>
            • Menyambung kegiatan berurutan: "melakukan A lalu B lalu C".<br>
            • Memohon pertolongan/perintah halus: <i>~ てください</i> (tolong...).<br>
            • Meminta izin: <i>~ てもいいですか</i> (bolehkah...?).<br>
            • Larangan: <i>~ てはいけません</i> (dilarang...).
          </div>
          <div class="cs-item-example">
            Contoh: 飲んで (minum lalu...) • 食べて (makan lalu...) • 行って (pergi lalu...)<br>
            <span style="color:#64748b; font-size:11px;">💡 Rumus Kilat Kel. 1: U-Tsu-Ru ➔ ~tte | Mu-Bu-Nu ➔ ~nde | Ku ➔ ~ite (Gu ➔ ~ide) | Su ➔ ~shite</span>
          </div>
        </div>

        <div class="cs-item-row">
          <div class="cs-item-header">
            <span class="cs-badge-pill success">6. Bentuk Ta (た形 - Ta-kei)</span>
            <span class="cs-nuance-tag">Positif Masa Lampau • Kasual</span>
          </div>
          <div class="cs-item-purpose">
            <b>Maksud & Tujuan:</b> Menyatakan tindakan yang telah selesai terjadi di masa lalu (sudah / telah).
          </div>
          <div class="cs-item-when">
            <b class="success">Kapan Digunakan:</b><br>
            • Percakapan kasual untuk menceritakan hal yang sudah dilakukan (*Futsuugo* dari *~mashita*).<br>
            • Pola tata bahasa menyatakan pengalaman: <i>~ たことがある</i> (pernah melakukan...).<br>
            • Menyebutkan beberapa kegiatan contoh secara acak: <i>~ たり ~ たりする</i>.
          </div>
          <div class="cs-item-example">
            Contoh: 飲んだ (sudah minum) • 食べた (sudah makan) • 行った (sudah pergi)
          </div>
        </div>

        <div class="cs-item-row">
          <div class="cs-item-header">
            <span class="cs-badge-pill">7. Bentuk Te-iru (ている形 - Teiru-kei)</span>
            <span class="cs-nuance-tag">Sedang Berlangsung / Kondisi Status</span>
          </div>
          <div class="cs-item-purpose">
            <b>Maksud & Tujuan:</b> Menyatakan kegiatan yang sedang berlangsung (*progressive*) atau kondisi/status yang berkelanjutan (*state of being*).
          </div>
          <div class="cs-item-when">
            <b>Kapan Digunakan:</b><br>
            • Kegiatan yang sedang terjadi sekarang: <i>今本を読んでいる</i> (sedang membaca buku sekarang).<br>
            • Pekerjaan/kebiasaan rutin: <i>大学で教えている</i> (bekerja mengajar di universitas).<br>
            • Hasil tindakan yang statusnya masih bertahan: <i>知っている</i> (tahu/kenal), <i>住んでいる</i> (tinggal di...), <i>結婚している</i> (sudah menikah).
          </div>
          <div class="cs-item-example">
            Contoh: 食べている (sedang makan) • 読んでいる (sedang membaca)
          </div>
        </div>

        <div class="cs-item-row">
          <div class="cs-item-header">
            <span class="cs-badge-pill purple">8. Bentuk Tai (たい形 - Tai-kei)</span>
            <span class="cs-nuance-tag">Keinginan Pribadi (Ingin / Mau)</span>
          </div>
          <div class="cs-item-purpose">
            <b>Maksud & Tujuan:</b> Menyatakan keinginan diri sendiri sebagai pembicara untuk melakukan suatu perbuatan (ingin / berhasrat).
          </div>
          <div class="cs-item-when">
            <b style="color:var(--purple);">Kapan Digunakan:</b><br>
            • Mengungkapkan keinginan pribadi: <i>日本へ行きたい</i> (aku ingin pergi ke Jepang).<br>
            • Menanyakan atau menawarkan keinginan lawan bicara secara sopan: <i>何が飲みたいですか</i> (ingin minum apa?).
          </div>
          <div class="cs-item-example">
            Contoh: 飲みたい (ingin minum) • 食べたい (ingin makan) • 行きたい (ingin pergi)
          </div>
        </div>
      `;
    } else if (tab === 'rules') {
      return `
        <div class="cs-section-intro">
          <b style="color:#fff;">⚖️ Klasifikasi 3 Kelompok Kata Kerja Jepang</b><br>
          Semua kata kerja dalam bahasa Jepang dikelompokkan ke dalam 3 golongan berdasarkan pola perubahan bunyinya:
        </div>

        <div class="cs-item-row">
          <div class="cs-item-header">
            <span class="cs-badge-pill">1️⃣ Kelompok 1: Godan Doushi (五段動詞)</span>
            <span class="cs-nuance-tag">72 Kosakata di N5</span>
          </div>
          <div class="cs-item-purpose">
            <b>Ciri Khas:</b> Memiliki 9 variasi akhiran konsonan-vokal <b>~u</b>: <i>-u, -ku, -gu, -su, -tsu, -nu, -bu, -mu, -ru</i> (dengan vokal sebelum -ru adalah a/u/o).
          </div>
          <div class="cs-item-when">
            <b>Prinsip Perubahan (Memutar 5 Baris Vokal A-I-U-E-O):</b><br>
            • Bentuk Kamus (baris <b>u</b>) ➔ 会<b>う</b> (au)<br>
            • Bentuk Masu (bergeser ke baris <b>i</b>) ➔ 会<b>い</b>ます (aimasu)<br>
            • Bentuk Nai (bergeser ke baris <b>a</b>) ➔ 会<b>わ</b>ない (awanai)<br>
            • Bentuk Te & Ta (peleburan bunyi khusus) ➔ 会<b>って</b> (atte) / 会<b>った</b> (atta)
          </div>
          <div class="cs-item-example">
            Contoh: 書く ➔ 書きます ➔ 書かない • 待つ ➔ 待ちます ➔ 待たない • 飲む ➔ 飲みます ➔ 飲まない
          </div>
        </div>

        <div class="cs-item-row">
          <div class="cs-item-header">
            <span class="cs-badge-pill success">2️⃣ Kelompok 2: Ichidan Doushi (一段動詞)</span>
            <span class="cs-nuance-tag">28 Kosakata di N5</span>
          </div>
          <div class="cs-item-purpose">
            <b>Ciri Khas:</b> Bentuk kamusnya <b>selalu berakhiran ~る (~ru)</b> dan huruf sebelum ~る berbunyi vokal <b>" i "</b> (<i>~iru</i>) atau vokal <b>" e "</b> (<i>~eru</i>).
          </div>
          <div class="cs-item-when">
            <b class="success">Prinsip Perubahan (Paling Sederhana):</b><br>
            Cukup <b>buang akhiran ~る (~ru)</b>, lalu tempelkan akhiran yang diinginkan secara langsung:<br>
            • ~る dibuang + <b>ます</b> ➔ 食べ<b>ます</b> (tabemasu)<br>
            • ~る dibuang + <b>ない</b> ➔ 食べ<b>ない</b> (tabenai)<br>
            • ~る dibuang + <b>て / た</b> ➔ 食べ<b>て</b> (tabete) / 食べ<b>た</b> (tabeta)<br>
            • ~る dibuang + <b>たい</b> ➔ 食べ<b>たい</b> (tabetai)
          </div>
          <div class="cs-item-example">
            Contoh: 食べる (taberu) • 見る (miru) • 起きる (okiru) • 寝る (neru) • 開ける (akeru)
          </div>
        </div>

        <div class="cs-item-row">
          <div class="cs-item-header">
            <span class="cs-badge-pill warning">3️⃣ Kelompok 3: Fukisoku Doushi (不規則動詞 / Irregular)</span>
            <span class="cs-nuance-tag">11 Kosakata di N5</span>
          </div>
          <div class="cs-item-purpose">
            <b>Ciri Khas:</b> Kata kerja tidak beraturan. Hanya ada <b>2 kata dasar</b> di seluruh bahasa Jepang: <b>来る (kuru)</b> dan <b>する (suru)</b>, ditambah kata benda yang dilekati <b>~する</b>.
          </div>
          <div class="cs-item-when">
            <b style="color:var(--warning);">Hafalan Perubahan Wajib:</b><br>
            • <b>来る (kuru - datang):</b> 来ます (kimasu) • 来ない (konai) • 来て (kite) • 来た (kita) • 来たい (kitai)<br>
            • <b>する (suru - melakukan):</b> します (shimasu) • しない (shinai) • して (shite) • した (shita) • したい (shitai)<br>
            • <i>Kata Benda + する:</i> 勉強する (belajar), 散歩する (jalan-jalan), 掃除する (bersih-bersih), 買い物する (berbelanja)
          </div>
          <div class="cs-item-example">
            Contoh: 来る (kuru) ➔ 来てください (tolong datang) • 勉強する ➔ 勉強しました (sudah belajar)
          </div>
        </div>
      `;
    } else {
      return `
        <div class="cs-section-intro">
          <b style="color:var(--danger);">⚠️ Jebakan & Pengecualian Kata Kerja N5</b><br>
          Kunci lulus JLPT N5: jangan sampai terkecoh oleh bentuk fisik kata kerja yang menyerupai Kelompok 2 padahal sebenarnya adalah Kelompok 1 (Godan).
        </div>

        <div class="cs-item-row">
          <div class="cs-item-header">
            <span class="cs-badge-pill danger">1. Jebakan Fisik Akhiran -IRU / -ERU</span>
            <span class="cs-nuance-tag">Sebenarnya Kelompok 1</span>
          </div>
          <div class="cs-item-purpose">
            Kata-kata di bawah ini berakhiran <b>-iru</b> atau <b>-eru</b>, sehingga sering disangka Kelompok 2. Padahal mereka adalah <b>Kelompok 1 (Godan) tulen</b>! Konjugasi bentuk Te dan Ta-nya wajib mengikuti aturan godan (berubah menjadi <b>~って / ~った</b>, bukan sekadar membuang ~ru).
          </div>

          <table class="cs-table">
            <tr>
              <th>Kata Dasar</th>
              <th>Arti</th>
              <th>Bentuk Masu</th>
              <th>Bentuk Te (Bukan ~te biasa!)</th>
            </tr>
            <tr>
              <td><b>帰る (かえる)</b></td>
              <td>Pulang</td>
              <td>帰ります (kaerimasu)</td>
              <td><b style="color:var(--primary);">帰って (kaette)</b></td>
            </tr>
            <tr>
              <td><b>入る (はいる)</b></td>
              <td>Masuk</td>
              <td>入ります (hairimasu)</td>
              <td><b style="color:var(--primary);">入って (haitte)</b></td>
            </tr>
            <tr>
              <td><b>走る (はしる)</b></td>
              <td>Berlari</td>
              <td>走ります (hashirimasu)</td>
              <td><b style="color:var(--primary);">走って (hashitte)</b></td>
            </tr>
            <tr>
              <td><b>知る (しる)</b></td>
              <td>Tahu, kenal</td>
              <td>知ります (shirimasu)</td>
              <td><b style="color:var(--primary);">知って (shitte)</b></td>
            </tr>
            <tr>
              <td><b>切る (きる)</b></td>
              <td>Memotong</td>
              <td>切ります (kirimasu)</td>
              <td><b style="color:var(--primary);">切って (kitte)</b></td>
            </tr>
            <tr>
              <td><b>要る (いる)</b></td>
              <td>Butuh, perlu</td>
              <td>要ります (irimasu)</td>
              <td><b style="color:var(--primary);">要って (itte)</b></td>
            </tr>
            <tr>
              <td><b>しゃべる</b></td>
              <td>Mengobrol</td>
              <td>しゃべります (shaberimasu)</td>
              <td><b style="color:var(--primary);">しゃべって (shabette)</b></td>
            </tr>
          </table>
        </div>

        <div class="cs-item-row">
          <div class="cs-item-header">
            <span class="cs-badge-pill danger">2. Pengecualian Khusus: 行く (iku - pergi)</span>
            <span class="cs-nuance-tag">Pengecualian Rumus ~KU</span>
          </div>
          <div class="cs-item-purpose">
            Menurut rumus umum Kelompok 1, akhiran <b>~く (~ku)</b> berubah menjadi <b>~いて (~ite)</b> (seperti 書く ➔ 書いて).<br>
            <b>TETAPI KHUSUS kata 行く (iku):</b> Bentuk Te dan Ta-nya adalah <b style="color:var(--primary);">行って (itte)</b> dan <b style="color:var(--primary);">行った (itta)</b> (menggunakan sokuon っ, BUKAN <i>iite</i>).
          </div>
        </div>

        <div class="cs-item-row">
          <div class="cs-item-header">
            <span class="cs-badge-pill warning">3. Pembedaan Pasangan Kata Homofon (Bunyi Sama)</span>
            <span class="cs-nuance-tag">Golongan & Kanji Berbeda</span>
          </div>
          <div class="cs-item-purpose">
            Hati-hati dengan kata yang bacaannya persis sama tetapi masuk kelompok yang berbeda:<br>
            • <b>切る (kiru - memotong)</b>: Kel. 1 ➔ 切って (kitte) | 切った (kitta)<br>
            • <b>着る (kiru - memakai baju)</b>: Kel. 2 ➔ 着て (kite) | 着た (kita)<br>
            • <b>要る (iru - perlu/butuh)</b>: Kel. 1 ➔ 要って (itte) | 要った (itta)<br>
            • <b>居る (iru - ada makhluk hidup)</b>: Kel. 2 ➔ 居て (ite) | 居た (ita)<br>
            • <b>見る (miru - melihat)</b>: Kel. 2 ➔ 見て (mite) | 見た (mita)
          </div>
        </div>
      `;
    }
  },

  init: function() {
    this.loadMastery();
    this.updateActiveSessionUI();
    this.renderSidebarContent();
    this.loadActiveArray();
    this.switchTab('flashcard');
    this.bindKeyboardShortcuts();

    const unlockAudio = () => {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!this._audioCtx && AudioCtx) this._audioCtx = new AudioCtx();
        if (this._audioCtx && this._audioCtx.state === 'suspended') this._audioCtx.resume();
      } catch(e) {}
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('pointerdown', unlockAudio);
    };
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('pointerdown', unlockAudio, { passive: true });

    document.addEventListener('click', () => {
      const dd = document.getElementById('drill-dropdown-menu');
      const btn = document.getElementById('btn-drill-dropdown');
      if (dd && !dd.classList.contains('hidden')) {
        dd.classList.add('hidden');
        if (btn) btn.classList.remove('active');
      }
    });
  }
};

window.onload = () => Modul.init();