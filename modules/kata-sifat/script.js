function getContextSubject(item, isNa) {
  let c = ADJ_NATURAL_CONTEXTS[item.k];
  // Specific contextual handling for words that appear in multiple senses
  if (item.k === '高い' && item.grp === 1) {
    c = { pJ: "富士山は ", pR: "Fujisan wa ", pI: "Gunung Fuji ", aJ: "昔のあの山は ", aR: "Mukashi no ano yama wa ", aI: "Gunung itu dulu ", arti: "tinggi" };
  } else if (item.k === '薄い' && item.grp === 2) {
    c = { pJ: "このお茶は ", pR: "Kono ocha wa ", pI: "Teh ini ", aJ: "昨日のスープは ", aR: "Kinou no suupu wa ", aI: "Sup kemarin ", arti: "encer / hambar" };
  }
  if (!c) {
    c = { pJ: "この部屋は ", pR: "Kono heya wa ", pI: "Kamar ini ", aJ: "あの部屋は ", aR: "Ano heya wa ", aI: "Kamar itu dulu ", arti: item.a.split(',')[0].trim() };
  }
  return c;
}

function getAdjectiveSentences(item, isNa) {
  const inf = getAdjectiveInflections(item.k, item.r, isNa);
  const subj = getContextSubject(item, isNa);
  const arti = subj.arti || item.a.split(',')[0].replace(/\([^)]*\)/g, '').trim();

  let sPresPos, sPresNeg, sPastPos, sPastNeg;

  if (!isNa) {
    sPresPos = {
      jpPrefix: subj.pJ,
      targetAdj: `${inf.presPos.kanji}です。`,
      targetPlain: inf.presPos.kanji,
      fullJp: `${subj.pJ}${inf.presPos.kanji}です。`,
      ro: `${subj.pR}${inf.presPos.ro} desu.`,
      idPrefix: subj.pI,
      targetMeaning: arti,
      fullId: `${subj.pI}${arti}.`,
      formLabel: 'Sekarang (+)'
    };
    sPresNeg = {
      jpPrefix: subj.pJ,
      targetAdj: `${inf.presNeg.kanji}です。`,
      targetPlain: inf.presNeg.kanji,
      fullJp: `${subj.pJ}${inf.presNeg.kanji}です。`,
      ro: `${subj.pR}${inf.presNeg.ro} desu.`,
      idPrefix: subj.pI,
      targetMeaning: `tidak ${arti}`,
      fullId: `${subj.pI}tidak ${arti}.`,
      formLabel: 'Negatif (-)'
    };
    sPastPos = {
      jpPrefix: subj.aJ,
      targetAdj: `${inf.pastPos.kanji}です。`,
      targetPlain: inf.pastPos.kanji,
      fullJp: `${subj.aJ}${inf.pastPos.kanji}です。`,
      ro: `${subj.aR}${inf.pastPos.ro} desu.`,
      idPrefix: subj.aI,
      targetMeaning: arti,
      fullId: `${subj.aI}${arti}.`,
      formLabel: 'Lampau (+)'
    };
    sPastNeg = {
      jpPrefix: subj.aJ,
      targetAdj: `${inf.pastNeg.kanji}です。`,
      targetPlain: inf.pastNeg.kanji,
      fullJp: `${subj.aJ}${inf.pastNeg.kanji}です。`,
      ro: `${subj.aR}${inf.pastNeg.ro} desu.`,
      idPrefix: subj.aI,
      targetMeaning: `tidak ${arti}`,
      fullId: `${subj.aI}tidak ${arti}.`,
      formLabel: 'Lampau Negatif (-)'
    };
  } else {
    const wordRo = kanaToRomaji(item.r);
    sPresPos = {
      jpPrefix: subj.pJ,
      targetAdj: `${item.k}です。`,
      targetPlain: item.k,
      fullJp: `${subj.pJ}${item.k}です。`,
      ro: `${subj.pR}${wordRo} desu.`,
      idPrefix: subj.pI,
      targetMeaning: arti,
      fullId: `${subj.pI}${arti}.`,
      formLabel: 'Sekarang (+)'
    };
    sPresNeg = {
      jpPrefix: subj.pJ,
      targetAdj: `${item.k}じゃないです。`,
      targetPlain: item.k + 'じゃない',
      fullJp: `${subj.pJ}${item.k}じゃないです。`,
      ro: `${subj.pR}${wordRo} ja nai desu.`,
      idPrefix: subj.pI,
      targetMeaning: `tidak ${arti}`,
      fullId: `${subj.pI}tidak ${arti}.`,
      formLabel: 'Negatif (-)'
    };
    sPastPos = {
      jpPrefix: subj.aJ,
      targetAdj: `${item.k}でした。`,
      targetPlain: item.k + 'だった',
      fullJp: `${subj.aJ}${item.k}でした。`,
      ro: `${subj.aR}${wordRo} deshita.`,
      idPrefix: subj.aI,
      targetMeaning: arti,
      fullId: `${subj.aI}${arti}.`,
      formLabel: 'Lampau (+)'
    };
    sPastNeg = {
      jpPrefix: subj.aJ,
      targetAdj: `${item.k}じゃなかったです。`,
      targetPlain: item.k + 'じゃなかった',
      fullJp: `${subj.aJ}${item.k}じゃなかったです。`,
      ro: `${subj.aR}${wordRo} ja nakatta desu.`,
      idPrefix: subj.aI,
      targetMeaning: `tidak ${arti}`,
      fullId: `${subj.aI}tidak ${arti}.`,
      formLabel: 'Lampau Negatif (-)'
    };
  }

  return {
    presPos: sPresPos,
    presNeg: sPresNeg,
    pastPos: sPastPos,
    pastNeg: sPastNeg
  };
}

// ==========================================
// ENGINE MODUL KATA SIFAT KENSEI
// ==========================================
const Modul = {
  activeCategory: 'sifati', // 'sifati' or 'sifatna'
  activeTab: 'flashcard',   // 'flashcard' or 'quiz'
  activeSesi: 0,
  cardIdx: 0,
  cardRevealed: false,
  activeInflectionForm: 'presPos', // 'presPos', 'presNeg', 'pastPos', 'pastNeg'
  
  // Quiz
  idxQuiz: 0,
  scoreQuiz: 0,
  drillSubtype: 'mix', // 'mix', 'inflection', 'antonym', 'meaning', 'isian'
  quizSourceMode: 'mastered', // 'mastered' (stars ⭐) or 'session'
  activeQuizData: [],

  activeArray: [],
  masteredList: [],
  csActiveTab: 'i',
  _audioCtx: null,

  init: function() {
    this.loadMastery();
    this.renderSessionChips();
    this.loadActiveArray();
    this.switchTab('flashcard');
    this.bindKeyboardShortcuts();

    // Fast mobile audio unlock
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

    // Close dropdown on outside click
    document.addEventListener('click', () => {
      const dd = document.getElementById('drill-dropdown-menu');
      const btn = document.getElementById('btn-drill-dropdown');
      if (dd && !dd.classList.contains('hidden')) {
        dd.classList.add('hidden');
        if (btn) btn.classList.remove('active');
      }
    });
  },

  loadMastery: function() {
    try {
      const saved = localStorage.getItem('yk_adjectives_mastered');
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
    localStorage.setItem('yk_adjectives_mastered', JSON.stringify(this.masteredList));
    this.updateMasteryUI();

    const starBtn = document.getElementById('btn-star-' + k);
    if (starBtn) {
      const isM = this.masteredList.includes(k);
      starBtn.classList.toggle('is-mastered', isM);
      starBtn.title = isM ? 'Telah Dikuasai' : 'Tandai Dikuasai';
    }
  },

  updateMasteryUI: function() {
    const totalAll = DB_I_Adj.length + DB_Na_Adj.length;
    const count = this.masteredList.length;
    const pct = Math.round((count / totalAll) * 100);

    const textEl = document.getElementById('nav-mastered-text');
    if (textEl) textEl.innerText = `⭐ Dikuasai: ${count} / ${totalAll} (${pct}%)`;

    const fillEl = document.getElementById('mastery-progress-fill');
    if (fillEl) fillEl.style.width = `${pct}%`;
  },

  bindKeyboardShortcuts: function() {
    window.addEventListener('keydown', (e) => {
      if (document.activeElement && document.activeElement.tagName === 'INPUT') return;

      if (e.key === 'Escape') {
        this.closeCheatsheet();
        return;
      }

      if (this.activeTab === 'flashcard') {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          if (!this.cardRevealed) {
            this.revealCard();
          } else {
            this.nextCard();
          }
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.nextCard();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.prevCard();
        } else if (e.key.toLowerCase() === 's' || e.key.toLowerCase() === 'a') {
          e.preventDefault();
          if (this.activeArray[this.cardIdx]) {
            this.speakText(this.activeArray[this.cardIdx].k || this.activeArray[this.cardIdx].r);
          }
        } else if (e.key === '1') {
          this.selectInflectionForm('presPos');
        } else if (e.key === '2') {
          this.selectInflectionForm('presNeg');
        } else if (e.key === '3') {
          this.selectInflectionForm('pastPos');
        } else if (e.key === '4') {
          this.selectInflectionForm('pastNeg');
        }
      }
    });
  },

  speakText: function(text, e) {
    if (e) e.stopPropagation();
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[\.・\-\(\)\/]/g, '').trim();
      const utter = new SpeechSynthesisUtterance(cleanText);
      utter.lang = 'ja-JP';
      utter.rate = 0.88;
      if (!this._cachedJaVoice) {
        const voices = window.speechSynthesis.getVoices();
        this._cachedJaVoice = voices.find(v => v.lang.startsWith('ja') || v.lang.includes('JP')) || null;
      }
      if (this._cachedJaVoice) utter.voice = this._cachedJaVoice;
      window.speechSynthesis.speak(utter);
    } catch (err) {}
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

  // Switch Category (Sifat-i vs Sifat-na)
  switchCategory: function(cat) {
    this.playSfx('tap');
    this.activeCategory = cat;
    this.activeSesi = 0;
    this.cardIdx = 0;
    this.cardRevealed = false;
    this.activeInflectionForm = 'presPos';

    document.getElementById('chip-cat-i').classList.toggle('active', cat === 'sifati');
    document.getElementById('chip-cat-na').classList.toggle('active', cat === 'sifatna');

    const arenaCards = document.querySelectorAll('.dojo-arena-card');
    arenaCards.forEach(c => c.classList.toggle('na-mode-border', cat === 'sifatna'));

    const tabBtns = document.querySelectorAll('.tab-main-btn');
    tabBtns.forEach(b => b.classList.toggle('mode-na-accent', cat === 'sifatna'));

    this.renderSessionChips();
    this.loadActiveArray();
    this.refreshCurrentTab();
  },

  renderSessionChips: function() {
    const wrap = document.getElementById('sesi-chips-wrap');
    if (!wrap) return;

    const pages = (this.activeCategory === 'sifati') ? Pages_I : Pages_Na;
    const isNa = this.activeCategory === 'sifatna';
    const catLabel = isNa ? 'Sifat-na' : 'Sifat-i';

    let html = '';
    pages.forEach((p, idx) => {
      const activeClass = (idx === this.activeSesi) ? 'active' : '';
      const naClass = isNa ? 'pill-na' : '';
      html += `<button type="button" class="sesi-pill ${activeClass} ${naClass}" onclick="Modul.switchSesi(${idx})">${catLabel} ${idx+1}</button>`;
    });
    wrap.innerHTML = html;
  },

  switchSesi: function(s) {
    this.playSfx('tap');
    this.activeSesi = s;
    this.cardIdx = 0;
    this.cardRevealed = false;
    this.activeInflectionForm = 'presPos';

    const pills = document.querySelectorAll('.sesi-pill');
    pills.forEach((p, idx) => {
      const isAct = idx === s;
      p.classList.toggle('active', isAct);
      if (isAct) {
        try { p.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); } catch(e){}
      }
    });

    this.loadActiveArray();
    this.refreshCurrentTab();
  },

  loadActiveArray: function() {
    const pages = (this.activeCategory === 'sifati') ? Pages_I : Pages_Na;
    const db = (this.activeCategory === 'sifati') ? DB_I_Adj : DB_Na_Adj;
    const grps = pages[this.activeSesi].groups;
    this.activeArray = db.filter(item => grps.includes(item.grp));
  },

  switchTab: function(tab) {
    this.playSfx('tap');
    this.activeTab = tab;

    ['flashcard', 'quiz'].forEach(t => {
      const btn = document.getElementById('btn-tab-' + t);
      if (btn) btn.classList.toggle('active', t === tab);
      const sec = document.getElementById('sec-' + t);
      if (sec) sec.classList.toggle('hidden', t !== tab);
    });

    this.refreshCurrentTab();

    // Prevent top navbar cutoff by resetting scroll to top on mobile tab switch
    if (window.innerWidth <= 600) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  refreshCurrentTab: function() {
    if (this.activeTab === 'flashcard') {
      this.renderFC(false);
      this.triggerAnimation('sec-flashcard', 'fade-in-up');
    } else if (this.activeTab === 'quiz') {
      this.activeQuizData = this.generateQuizQuestions();
      this.idxQuiz = 0;
      this.scoreQuiz = 0;
      this.renderQuiz(false);
      this.triggerAnimation('sec-quiz', 'fade-in-up');
    }
  },

  // ==========================================
  // FLASHCARD RENDERING & DYNAMIC SENTENCE MORPH
  // ==========================================
  renderFC: function(useSlideAnim = true, animDirection = 'next') {
    const sec = document.getElementById('sec-flashcard');
    this.cardRevealed = false;
    this.activeInflectionForm = 'presPos';

    sec.classList.remove('fc-mode-expanded');
    sec.classList.add('fc-mode-compact');

    if (this.cardIdx >= this.activeArray.length) {
      sec.innerHTML = `
        <div class="fc-header-bar">
          <span class="fc-counter-label" style="color:var(--gold);">🏆 SELESAI</span>
          <span class="fc-counter-label">${this.activeArray.length} / ${this.activeArray.length}</span>
        </div>
        <div style="flex-grow:1; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;">
          <div style="font-size:48px; margin-bottom:12px;">🌟</div>
          <div style="font-size:22px; font-weight:800; color:var(--gold); margin-bottom:6px;">Sesi Ini Tuntas!</div>
          <div style="font-size:13.5px; color:var(--text-sub); max-width:380px;">Semua kata sifat di sesi ini telah kamu pelajari. Ingin mengulangi atau lanjut menguji kemampuan di Arena Kuis?</div>
        </div>
        <div class="dojo-nav-controls">
          <button type="button" class="btn-dn" onclick="Modul.cardIdx=0; Modul.renderFC(true, 'next')">Ulangi Sesi ↺</button>
          <button type="button" class="btn-dn btn-dn-next" onclick="Modul.switchTab('quiz')">Uji di Arena Kuis 🎯</button>
        </div>
      `;
      if (useSlideAnim) {
        const anim = animDirection === 'prev' ? 'slide-in-left' : 'slide-in-right';
        this.triggerAnimation('sec-flashcard', anim);
      }
      return;
    }

    const item = this.activeArray[this.cardIdx];
    const isNa = this.activeCategory === 'sifatna';
    const isMastered = this.masteredList.includes(item.k);
    const pages = isNa ? Pages_Na : Pages_I;
    const pageTitle = pages[this.activeSesi].title.split(':')[0];

    // Inflections 4 Forms
    const inf = getAdjectiveInflections(item.k, item.r, isNa);
    // Sentences 4 Forms
    const sentences = getAdjectiveSentences(item, isNa);
    const curSent = sentences[this.activeInflectionForm];

    // Antonym (Sleek Inline Pill di Bawah Arti Kata)
    const antonyms = ANTONYM_MAP[item.k] || [];
    let antonymHTML = '';
    if (antonyms.length > 0) {
      antonymHTML = `
        <div class="fc-antonym-pill" onclick="event.stopPropagation(); Modul.speakText('${antonyms[0]}')" title="Dengarkan Lawan Kata: ${antonyms[0]}">
          <span class="antonym-tag-label">⚖️ Lawan kata:</span>
          <span class="antonym-pair-text">${antonyms.join(', ')} 🔊</span>
        </div>
      `;
    }

    const prevDisabled = this.cardIdx === 0 ? 'disabled' : '';

    sec.innerHTML = `
      <!-- Top header inside arena card (Clean & Unboxed) -->
      <div class="fc-header-bar">
        <span class="fc-counter-label">KATA <b>${this.cardIdx + 1}</b> / ${this.activeArray.length}</span>
        <div class="fc-header-right">
          <button type="button" class="btn-star-mark ${isMastered ? 'is-mastered' : ''}" id="btn-star-${item.k}" onclick="Modul.toggleMastery('${item.k}', event)" title="${isMastered ? 'Dikuasai' : 'Tandai Dikuasai'}">⭐</button>
          <button type="button" class="btn-star-mark" onclick="Modul.speakText('${item.k || item.r}', event)" title="Dengarkan Suara (ja-JP)">🔊</button>
        </div>
      </div>

      <!-- Main Unboxed Flashcard Stage -->
      <div class="fc-stage-box" id="fc-stage-box" onclick="Modul.revealCard()">
        <div class="fc-kanji-big">${item.k}</div>

        <!-- Details Shelf (Loaded instantly via single accelerated container) -->
        <div class="fc-details-shelf" id="fc-details-shelf">
          <!-- Unified Word Meta (Reading & Meaning) -->
          <div class="fc-word-meta">
            <span class="fc-hira-text" id="fc-hira">${item.r}</span>
            <span class="fc-meta-sep">•</span>
            <span class="fc-arti-text" id="fc-arti">${item.a}</span>
          </div>

          ${antonymHTML}

          <!-- 4 Forms Matrix: Interactive Tappable Glass Cells (Directly Connected) -->
          <div class="fc-grid-two" id="fc-matrix">
            <div class="inflection-cell active-cell ${isNa ? 'na-cell' : ''}" id="cell-presPos" onclick="Modul.selectInflectionForm('presPos', event)">
              <div class="inf-label"><span>☀️ Sekarang (+)</span> <span class="inf-speaker">🔊</span></div>
              <div class="inf-val">${inf.presPos.kanji} <span class="inf-sub">${inf.presPos.hira}</span></div>
            </div>
            <div class="inflection-cell" id="cell-presNeg" onclick="Modul.selectInflectionForm('presNeg', event)">
              <div class="inf-label"><span>❄️ Negatif (-)</span> <span class="inf-speaker">🔊</span></div>
              <div class="inf-val">${inf.presNeg.kanji} <span class="inf-sub">${inf.presNeg.hira}</span></div>
            </div>
            <div class="inflection-cell" id="cell-pastPos" onclick="Modul.selectInflectionForm('pastPos', event)">
              <div class="inf-label"><span>⏳ Lampau (+)</span> <span class="inf-speaker">🔊</span></div>
              <div class="inf-val">${inf.pastPos.kanji} <span class="inf-sub">${inf.pastPos.hira}</span></div>
            </div>
            <div class="inflection-cell" id="cell-pastNeg" onclick="Modul.selectInflectionForm('pastNeg', event)">
              <div class="inf-label"><span>🚫 Lampau (-)</span> <span class="inf-speaker">🔊</span></div>
              <div class="inf-val">${inf.pastNeg.kanji} <span class="inf-sub">${inf.pastNeg.hira}</span></div>
            </div>
          </div>

          <!-- Dynamic Sentence Morph Shelf (Seamless Flow) -->
          <div class="fc-sentence-shelf" id="fc-sentence-shelf" onclick="event.stopPropagation()">
            <div class="fss-top">
              <div class="fss-badge-wrap">
                <span class="fss-badge">💬 Contoh Kalimat:</span>
                <span class="fss-form-pill ${isNa ? 'na-pill' : ''}" id="fss-active-tag">${curSent.formLabel}</span>
              </div>
              <button type="button" class="btn-sentence-audio" id="btn-audio-sent" onclick="Modul.speakActiveSentence()" title="Dengarkan Kalimat">🔊</button>
            </div>
            <div class="fss-jp" id="fss-jp-text">${curSent.jpPrefix}<span class="highlight-adj">${curSent.targetAdj}</span></div>
            <div class="fss-romaji" id="fss-ro-text">${curSent.ro}</div>
            <div class="fss-id" id="fss-id-text">${curSent.idPrefix}<span class="highlight-meaning">${curSent.targetMeaning}</span>.</div>
          </div>

          ${item.note ? `<div class="fc-note-strip" id="fc-note">💡 ${item.note}</div>` : ''}
        </div>

        <div class="fc-tap-hint" id="fc-tap-hint">👆 Ketuk kartu untuk melihat detail & 4 bentuk infleksi</div>
      </div>

      <!-- Action Navigation Buttons -->
      <div class="dojo-nav-controls">
        <button type="button" class="btn-dn" ${prevDisabled} onclick="Modul.prevCard()">← Sebelumnya</button>
        <button type="button" class="btn-dn btn-dn-next ${isNa ? 'na-btn' : ''}" onclick="Modul.nextCard()">Selanjutnya →</button>
      </div>
    `;

    if (useSlideAnim) {
      const anim = animDirection === 'prev' ? 'slide-in-left' : 'slide-in-right';
      this.triggerAnimation('fc-stage-box', anim);
    }
  },

  selectInflectionForm: function(formKey, e) {
    if (e) e.stopPropagation();
    this.playSfx('tap');
    this.activeInflectionForm = formKey;

    const item = this.activeArray[this.cardIdx];
    if (!item) return;

    const isNa = this.activeCategory === 'sifatna';
    const sentences = getAdjectiveSentences(item, isNa);
    const curSent = sentences[formKey];

    // Highlight the active cell
    ['presPos', 'presNeg', 'pastPos', 'pastNeg'].forEach(f => {
      const cell = document.getElementById('cell-' + f);
      if (cell) {
        cell.classList.toggle('active-cell', f === formKey);
        if (isNa) cell.classList.toggle('na-cell', f === formKey);
      }
    });

    // Morph the sentence shelf smoothly
    const tagEl = document.getElementById('fss-active-tag');
    const jpEl = document.getElementById('fss-jp-text');
    const roEl = document.getElementById('fss-ro-text');
    const idEl = document.getElementById('fss-id-text');

    if (tagEl) tagEl.innerText = curSent.formLabel;
    if (jpEl) jpEl.innerHTML = `${curSent.jpPrefix}<span class="highlight-adj">${curSent.targetAdj}</span>`;
    if (roEl) roEl.innerText = curSent.ro;
    if (idEl) idEl.innerHTML = `${curSent.idPrefix}<span class="highlight-meaning">${curSent.targetMeaning}</span>.`;

    // Audio speak active form kanji
    this.speakText(curSent.targetPlain);
  },

  speakActiveSentence: function() {
    const item = this.activeArray[this.cardIdx];
    if (!item) return;
    const isNa = this.activeCategory === 'sifatna';
    const sentences = getAdjectiveSentences(item, isNa);
    const curSent = sentences[this.activeInflectionForm];
    if (curSent) this.speakText(curSent.fullJp);
  },

  revealCard: function() {
    if (this.cardRevealed) return;
    this.cardRevealed = true;

    const sec = document.getElementById('sec-flashcard');
    if (sec) {
      sec.classList.remove('fc-mode-compact');
      sec.classList.add('fc-mode-expanded');
    }

    // Auto-Scroll Seketika Menyamakan Tinggi Layar (Zero Manual Scroll)
    this.scrollToCardFit();

    // Sound effect (non-blocking)
    setTimeout(() => this.playSfx('reveal'), 20);
  },

  scrollToCardFit: function() {
    const sec = document.getElementById('sec-flashcard');
    if (!sec) return;
    requestAnimationFrame(() => {
      const rect = sec.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = scrollTop + rect.top - 8;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth'
      });
    });
  },

  nextCard: function() {
    if (this.cardIdx >= this.activeArray.length) return;
    this.playSfx('tap');
    const targetId = (this.cardIdx >= this.activeArray.length) ? 'sec-flashcard' : 'fc-stage-box';
    this.triggerAnimation(targetId, 'slide-out-left');
    setTimeout(() => {
      this.cardIdx++;
      this.renderFC(true, 'next');
    }, 180);
  },

  prevCard: function() {
    if (this.cardIdx <= 0) return;
    this.playSfx('tap');
    const targetId = (this.cardIdx >= this.activeArray.length) ? 'sec-flashcard' : 'fc-stage-box';
    this.triggerAnimation(targetId, 'slide-out-right');
    setTimeout(() => {
      this.cardIdx--;
      this.renderFC(true, 'prev');
    }, 180);
  },

  // ==========================================
  // ARENA KUIS SYSTEM (BERBASIS KATA DIKUASAI PER SESI ⭐)
  // ==========================================
  getMasteredAdjectives: function() {
    const isNa = this.activeCategory === 'sifatna';
    const seen = new Set();
    // Scope strictly to the ACTIVE SESSION (this.activeArray) - TIDAK BOLEH NYEBRANG KE SESI LAIN!
    return this.activeArray.filter(item => {
      if (this.masteredList.includes(item.k) && !seen.has(item.k)) {
        seen.add(item.k);
        return true;
      }
      return false;
    }).map(item => ({ ...item, isNa }));
  },

  toggleQuizSourceMode: function() {
    this.playSfx('tap');
    this.quizSourceMode = (this.quizSourceMode === 'mastered') ? 'session' : 'mastered';
    this.activeQuizData = this.generateQuizQuestions();
    this.idxQuiz = 0;
    this.scoreQuiz = 0;
    this.renderQuiz(true);
  },

  startSessionQuizFallback: function() {
    this.playSfx('tap');
    this.quizSourceMode = 'session';
    this.activeQuizData = this.generateQuizQuestions();
    this.idxQuiz = 0;
    this.scoreQuiz = 0;
    this.renderQuiz(true);
  },

  toggleDrillDropdown: function(e) {
    if (e) e.stopPropagation();
    this.playSfx('tap');
    const menu = document.getElementById('drill-dropdown-menu');
    const btn = document.getElementById('btn-drill-dropdown');
    if (menu && btn) {
      menu.classList.toggle('hidden');
      btn.classList.toggle('active');
    }
  },

  selectDrillSubtype: function(st, icon, label) {
    this.drillSubtype = st;
    this.playSfx('tap');

    const iconEl = document.getElementById('drill-label-icon');
    const labelEl = document.getElementById('drill-label-text');
    if (iconEl) iconEl.innerText = icon;
    if (labelEl) labelEl.innerText = label;

    document.querySelectorAll('.dd-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-qtype') === st);
    });

    const menu = document.getElementById('drill-dropdown-menu');
    const btn = document.getElementById('btn-drill-dropdown');
    if (menu) menu.classList.add('hidden');
    if (btn) btn.classList.remove('active');

    this.activeQuizData = this.generateQuizQuestions();
    this.idxQuiz = 0;
    this.scoreQuiz = 0;
    this.renderQuiz(true);
  },

  generateQuizQuestions: function() {
    const isNa = this.activeCategory === 'sifatna';
    const useMastered = (this.quizSourceMode === 'mastered');
    let pool = [];

    if (useMastered) {
      pool = this.getMasteredAdjectives();
      if (pool.length === 0) {
        return []; // Triggers clean empty state in renderQuiz!
      }
    } else {
      pool = this.activeArray.map(item => ({ ...item, isNa }));
    }

    // Distractor sources scoped to active session, fallback to active category DB (NEVER cross category!)
    const sessionDb = this.activeArray.map(item => ({ ...item, isNa }));
    const categoryDb = (isNa ? DB_Na_Adj : DB_I_Adj).map(item => ({ ...item, isNa }));

    const targetSubtype = this.drillSubtype;
    const generated = [];
    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

    // 1. INFLECTION DRILL (4 Perubahan Bentuk)
    if (targetSubtype === 'inflection' || targetSubtype === 'mix') {
      const formTypes = ['presNeg', 'pastPos', 'pastNeg'];
      const formNames = {
        presNeg: 'Negatif Sekarang (-)',
        pastPos: 'Lampau Positif (+)',
        pastNeg: 'Lampau Negatif (-)'
      };

      const count = targetSubtype === 'inflection' ? Math.min(pool.length * 2, 12) : Math.min(pool.length, 5);
      const infPool = shuffle([...pool]);

      for (let i = 0; i < count; i++) {
        const item = infPool[i % infPool.length];
        const inf = getAdjectiveInflections(item.k, item.r, isNa);
        const fKey = formTypes[Math.floor(Math.random() * formTypes.length)];
        const targetForm = inf[fKey];
        const ans = targetForm.kanji;
        const opts = [ans];

        if (inf.presPos.kanji !== ans && !opts.includes(inf.presPos.kanji)) opts.push(inf.presPos.kanji);
        if (inf.presNeg.kanji !== ans && !opts.includes(inf.presNeg.kanji)) opts.push(inf.presNeg.kanji);
        if (inf.pastPos.kanji !== ans && !opts.includes(inf.pastPos.kanji)) opts.push(inf.pastPos.kanji);
        if (inf.pastNeg.kanji !== ans && !opts.includes(inf.pastNeg.kanji)) opts.push(inf.pastNeg.kanji);

        // Distractor fallback from session first, then category DB
        const others = shuffle([...sessionDb, ...categoryDb].filter(o => o.k !== item.k));
        for (const o of others) {
          const oInf = getAdjectiveInflections(o.k, o.r, o.isNa);
          if (oInf[fKey] && !opts.includes(oInf[fKey].kanji)) opts.push(oInf[fKey].kanji);
          if (opts.length >= 4) break;
        }

        generated.push({
          type: 'mc',
          q: `Ubah kata <b class="q-target-word">${item.k}</b> (${item.a}) ke bentuk <b class="q-target-form">${formNames[fKey]}</b>!`,
          audio: ans,
          opts: shuffle(opts.slice(0, 4)),
          ans: ans,
          badge: '🔄 4 Infleksi'
        });
      }
    }

    // 2. ANTONYM DRILL (Lawan Kata) - STRICT, ZERO LEAK!
    if (targetSubtype === 'antonym' || targetSubtype === 'mix') {
      let antPool = pool.filter(item => ANTONYM_MAP[item.k] && ANTONYM_MAP[item.k].length > 0);

      // Fallback ONLY if user explicitly chose 'antonym' mode and pool has 0 antonym pairs
      if (targetSubtype === 'antonym' && antPool.length === 0) {
        antPool = sessionDb.filter(item => ANTONYM_MAP[item.k] && ANTONYM_MAP[item.k].length > 0);
        if (antPool.length === 0) {
          antPool = categoryDb.filter(item => ANTONYM_MAP[item.k] && ANTONYM_MAP[item.k].length > 0);
        }
      }

      if (antPool.length > 0) {
        const count = targetSubtype === 'antonym' ? Math.min(antPool.length * 2, 10) : Math.min(antPool.length, 4);
        const shuffledAnt = shuffle([...antPool]);

        for (let i = 0; i < count; i++) {
          const item = shuffledAnt[i % shuffledAnt.length];
          const targetAnt = ANTONYM_MAP[item.k][0];
          const ans = targetAnt;
          const opts = [ans];

          const distractors = shuffle([...sessionDb, ...categoryDb].filter(d => d.k !== item.k && d.k !== targetAnt));
          for (const d of distractors) {
            if (!opts.includes(d.k)) opts.push(d.k);
            if (opts.length >= 4) break;
          }

          generated.push({
            type: 'mc',
            q: `Manakah <b class="q-target-form">LAWAN KATA</b> dari <b class="q-target-word">${item.k}</b> (${item.a})?`,
            audio: ans,
            opts: shuffle(opts.slice(0, 4)),
            ans: ans,
            badge: '⚖️ Lawan Kata'
          });
        }
      }
    }

    // 3. MEANING & READING DRILL - STRICT: ONLY WHEN 'meaning' OR 'mix'!
    if (targetSubtype === 'meaning' || targetSubtype === 'mix') {
      const count = targetSubtype === 'meaning' ? Math.min(pool.length * 2, 12) : Math.min(pool.length, 6);
      const meanPool = shuffle([...pool]);

      for (let i = 0; i < count; i++) {
        const item = meanPool[i % meanPool.length];
        const isKanjiToHira = Math.random() > 0.5;
        if (isKanjiToHira) {
          const ans = item.r;
          const opts = [ans];
          const distractors = shuffle([...sessionDb, ...categoryDb].filter(d => d.k !== item.k));
          for (const d of distractors) {
            if (!opts.includes(d.r)) opts.push(d.r);
            if (opts.length >= 4) break;
          }
          generated.push({
            type: 'mc',
            q: `Bagaimana bacaan Hiragana dari <b class="q-target-word">${item.k}</b> (${item.a})?`,
            audio: item.k,
            opts: shuffle(opts.slice(0, 4)),
            ans: ans,
            badge: '🎯 Cara Baca'
          });
        } else {
          const ans = item.a;
          const opts = [ans];
          const distractors = shuffle([...sessionDb, ...categoryDb].filter(d => d.k !== item.k));
          for (const d of distractors) {
            if (!opts.includes(d.a)) opts.push(d.a);
            if (opts.length >= 4) break;
          }
          generated.push({
            type: 'mc',
            q: `Apa arti bahasa Indonesia dari <b class="q-target-word">${item.k}</b> (${item.r})?`,
            audio: item.k,
            opts: shuffle(opts.slice(0, 4)),
            ans: ans,
            badge: '🎯 Tebak Arti'
          });
        }
      }
    }

    // 4. ISIAN DRILL - STRICT: ONLY WHEN 'isian'!
    if (targetSubtype === 'isian') {
      const count = Math.min(pool.length * 2, 10);
      const isianPool = shuffle([...pool]);

      for (let i = 0; i < count; i++) {
        const item = isianPool[i % isianPool.length];
        const isArti = Math.random() > 0.5;
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
            q: `Ketik arti bahasa Indonesia dari:<br><span style="font-size:36px; font-weight:800; color:var(--gold);">${item.k}</span>`,
            audio: item.k,
            ans: ansArray,
            badge: '✍️ Isian Arti'
          });
        } else {
          const ansArray = [item.r.replace(/[\s]/g, '')];
          if (item.alt) ansArray.push(item.alt.replace(/[\s]/g, ''));
          generated.push({
            type: 'isian',
            isArti: false,
            q: `Ketik bacaan Hiragana dari:<br><span style="font-size:36px; font-weight:800; color:#fff;">${item.k}</span>`,
            audio: item.k,
            ans: ansArray,
            badge: '✍️ Isian Hiragana'
          });
        }
      }
    }

    const maxQ = targetSubtype === 'mix' ? 15 : Math.min(generated.length, 12);
    return shuffle(generated).slice(0, maxQ);
  },

  renderQuiz: function(useSlideAnim = true) {
    const fb = document.getElementById('quiz-feedback-bar');
    if (fb) { fb.innerHTML = ''; fb.style.opacity = '0'; }
    const pool = this.activeQuizData;

    const isNa = this.activeCategory === 'sifatna';
    const pages = isNa ? Pages_Na : Pages_I;
    const sessionName = pages[this.activeSesi].title.split(':')[0];
    const masteredInSession = this.getMasteredAdjectives();

    // Update Mode Badge (⭐ Mastered in this Session vs 🏷️ Sesi)
    const modePill = document.getElementById('quiz-mode-pill');
    if (modePill) {
      if (this.quizSourceMode === 'mastered') {
        modePill.innerHTML = `<span>⭐</span> <span>${masteredInSession.length} DIKUASAI</span>`;
        modePill.title = `Kuis kata berbintang di ${sessionName}. Klik untuk kuis semua kata di sesi ini.`;
        modePill.style.color = 'var(--gold)';
        modePill.style.borderColor = 'rgba(251, 191, 36, 0.4)';
        modePill.style.background = 'rgba(251, 191, 36, 0.15)';
      } else {
        modePill.innerHTML = `<span>🏷️</span> <span>${sessionName}</span>`;
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

    // Check EMPTY STATE for Mastered Mode in this session
    if (this.quizSourceMode === 'mastered' && pool.length === 0) {
      if (progPill) progPill.innerHTML = `SOAL <b>0</b> / 0`;
      qTextEl.innerHTML = `
        <div class="quiz-empty-mastery">
          <div class="qem-icon">⭐</div>
          <div class="qem-title">Belum Ada Kata Dikuasai di ${sessionName}</div>
          <div class="qem-desc">
            Kamu belum menandai kata sifat dengan bintang <b>⭐</b> di <b>${sessionName}</b>.<br>
            Beri bintang pada flashcard yang telah kamu pelajari untuk mengujinya di kuis ini!
          </div>
          <div class="qem-actions">
            <button type="button" class="btn-dn btn-dn-next" onclick="Modul.switchTab('flashcard')">
              📖 Buka Flashcard ${sessionName} ⭐
            </button>
            <button type="button" class="btn-dn" onclick="Modul.startSessionQuizFallback()">
              🎯 Kuis Seluruh ${sessionName} (${this.activeArray.length} Kata)
            </button>
          </div>
        </div>
      `;
      optContainer.classList.add('hidden');
      isianContainer.classList.add('hidden');
      return;
    }

    // Check QUIZ FINISHED
    if (this.idxQuiz >= pool.length) {
      if (progPill) progPill.innerHTML = `<b>🎉 SELESAI</b>`;
      qTextEl.innerHTML = `
        <div style="font-size:42px; margin-bottom:8px;">🏆</div>
        <div style="font-size:20px; font-weight:800; color:#fff;">Latihan Kuis Selesai!</div>
        <div style="font-size:14px; font-weight:600; color:var(--text-sub); margin-top:4px;">
          Skor Akhir: <b style="color:var(--gold); font-size:16px;">${this.scoreQuiz} / ${pool.length}</b>
        </div>
      `;
      optContainer.classList.remove('hidden');
      isianContainer.classList.add('hidden');
      optContainer.innerHTML = `<button type="button" class="btn-dn btn-dn-next" style="grid-column: span 2;" onclick="Modul.refreshCurrentTab()">Ulangi Kuis ↺</button>`;
      return;
    }

    // Render Current Question
    const cur = pool[this.idxQuiz];
    if (progPill) progPill.innerHTML = `SOAL <b>${this.idxQuiz + 1}</b> / ${pool.length}`;
    qTextEl.innerHTML = cur.q;

    if (cur.type === 'mc') {
      optContainer.classList.remove('hidden');
      isianContainer.classList.add('hidden');

      let optsHTML = cur.opts.map(o => `<button type="button" class="btn-quiz-opt" onclick="Modul.checkMCOption(this, '${o}', '${cur.ans}', '${cur.audio || ''}')">${o}</button>`).join('');
      optContainer.innerHTML = optsHTML;
    } else {
      optContainer.classList.add('hidden');
      isianContainer.classList.remove('hidden');
      const input = document.getElementById('quiz-isian-input');
      input.value = '';
      input.disabled = false;
      input.placeholder = cur.isArti ? 'Ketik arti bahasa Indonesia...' : 'Ketik Hiragana atau Romaji...';
      input.focus();
    }

    if (useSlideAnim) this.triggerAnimation('quiz-content-wrapper', 'slide-in-right');
  },

  checkMCOption: function(btn, sel, cor, audio) {
    const fb = document.getElementById('quiz-feedback-bar');
    document.querySelectorAll('.btn-quiz-opt').forEach(b => b.disabled = true);
    fb.style.opacity = '1';

    if (sel === cor) {
      this.playSfx('correct');
      btn.classList.add('correct');
      fb.innerHTML = 'BENAR SEKALI! ✅';
      fb.style.color = 'var(--success)';
      this.scoreQuiz++;
    } else {
      this.playSfx('wrong');
      btn.classList.add('wrong');
      fb.innerHTML = `KURANG TEPAT! ❌ Kunci: <b>${cor}</b>`;
      fb.style.color = 'var(--danger)';
    }

    if (audio) this.speakText(audio);

    const scorePill = document.getElementById('quiz-score-pill');
    if (scorePill) scorePill.innerHTML = `SKOR <b>${this.scoreQuiz}</b>`;

    setTimeout(() => {
      this.triggerAnimation('quiz-content-wrapper', 'slide-out-left');
      setTimeout(() => {
        this.idxQuiz++;
        this.renderQuiz(true);
      }, 180);
    }, 1100);
  },

  checkIsianSubmit: function() {
    const input = document.getElementById('quiz-isian-input');
    const fb = document.getElementById('quiz-feedback-bar');
    const rawVal = input.value.trim().toLowerCase();
    if (!rawVal) return;

    input.disabled = true;
    const cur = this.activeQuizData[this.idxQuiz];
    const correctAns = cur.ans.map(a => a.toLowerCase().replace(/[\s-]/g, ''));
    const cleanUser = rawVal.replace(/[\s-]/g, '');
    const convertedUser = romajiToHiragana(rawVal).replace(/[\s-]/g, '');

    const isCorrect = correctAns.includes(cleanUser) || (!cur.isArti && correctAns.includes(convertedUser));

    fb.style.opacity = '1';
    if (isCorrect) {
      this.playSfx('correct');
      fb.innerHTML = 'BENAR! ✅';
      fb.style.color = 'var(--success)';
      this.scoreQuiz++;
    } else {
      this.playSfx('wrong');
      fb.innerHTML = `SALAH! ❌ Jawaban: <b>${cur.ans[0]}</b>`;
      fb.style.color = 'var(--danger)';
    }

    if (cur.audio) this.speakText(cur.audio);

    const scorePill = document.getElementById('quiz-score-pill');
    if (scorePill) scorePill.innerHTML = `SKOR <b>${this.scoreQuiz}</b>`;

    setTimeout(() => {
      this.triggerAnimation('quiz-content-wrapper', 'slide-out-left');
      setTimeout(() => {
        this.idxQuiz++;
        this.renderQuiz(true);
      }, 180);
    }, 1200);
  },

  // ==========================================
  // CHEATSHEET RUMUS 4 BENTUK INFLEKSI
  // ==========================================
  openCheatsheet: function() {
    this.playSfx('tap');
    const modal = document.getElementById('cheatsheet-modal');
    if (modal) {
      modal.classList.remove('hidden');
      this.renderCheatsheetContent();
    }
  },

  closeCheatsheet: function() {
    this.playSfx('tap');
    const modal = document.getElementById('cheatsheet-modal');
    if (modal) modal.classList.add('hidden');
  },

  switchCheatsheetTab: function(tab) {
    this.playSfx('tap');
    this.csActiveTab = tab;
    document.getElementById('cs-tab-i').classList.toggle('active', tab === 'i');
    document.getElementById('cs-tab-na').classList.toggle('active', tab === 'na');
    this.renderCheatsheetContent();
  },

  renderCheatsheetContent: function() {
    const box = document.getElementById('cs-body-content');
    if (!box) return;

    if (this.csActiveTab === 'i') {
      box.innerHTML = `
        <div style="font-weight:800; color:var(--primary); margin-bottom:6px;">🔹 Pola Perubahan Sifat-i (~い)</div>
        <p style="color:var(--text-sub); margin-bottom:10px;">
          Kata sifat-i selalu mengubah huruf <b>い (i)</b> di bagian paling belakang menjadi akhiran rumus yang diinginkan:
        </p>

        <table class="cs-table">
          <tr>
            <th>Bentuk</th>
            <th>Rumus</th>
            <th>Contoh: 大きい (Besar)</th>
          </tr>
          <tr>
            <td><b>Sekarang (+)</b></td>
            <td><b>~い</b></td>
            <td>大きい (ookii) <button type="button" class="btn-audio-inline" onclick="Modul.speakText('おおきい')">🔊</button></td>
          </tr>
          <tr>
            <td><b>Sekarang (-)</b></td>
            <td><b>~くない</b></td>
            <td>大きくない (ookikunai) <button type="button" class="btn-audio-inline" onclick="Modul.speakText('おおきくない')">🔊</button></td>
          </tr>
          <tr>
            <td><b>Lampau (+)</b></td>
            <td><b>~かった</b></td>
            <td>大きかった (ookikatta) <button type="button" class="btn-audio-inline" onclick="Modul.speakText('おおきかった')">🔊</button></td>
          </tr>
          <tr>
            <td><b>Lampau (-)</b></td>
            <td><b>~くなかった</b></td>
            <td>大きくなかった (ookikunakatta) <button type="button" class="btn-audio-inline" onclick="Modul.speakText('おおきくなかった')">🔊</button></td>
          </tr>
        </table>

        <div class="cs-alert-box">
          ⭐ <b>PENGECUALIAN EMAS: いい (ii - Bagus)</b><br>
          Berasal dari kata asli <i>よい (yoi)</i>. Saat diubah, akar kata <b>いい</b> berubah menjadi <b>よ~</b>:<br>
          • Negatif: <b>よくない</b> (bukan iikunai!) <button type="button" class="btn-audio-inline" onclick="Modul.speakText('よくない')">🔊</button><br>
          • Lampau: <b>よかった</b> <button type="button" class="btn-audio-inline" onclick="Modul.speakText('よかった')">🔊</button><br>
          • Lampau Negatif: <b>よくなかった</b> <button type="button" class="btn-audio-inline" onclick="Modul.speakText('よくなかった')">🔊</button>
        </div>
      `;
    } else {
      box.innerHTML = `
        <div style="font-weight:800; color:var(--success); margin-bottom:6px;">🔸 Pola Perubahan Sifat-na (~な)</div>
        <p style="color:var(--text-sub); margin-bottom:10px;">
          Kata sifat-na tidak berubah di badannya, melainkan menambahkan kata bantu kopula di belakangnya:
        </p>

        <table class="cs-table na-cs">
          <tr>
            <th>Bentuk</th>
            <th>Biasa / Sopan</th>
            <th>Contoh: 静か (Tenang)</th>
          </tr>
          <tr>
            <td><b>Sekarang (+)</b></td>
            <td><b>だ / です</b></td>
            <td>静かだ / 静かです <button type="button" class="btn-audio-inline" onclick="Modul.speakText('しずかです')">🔊</button></td>
          </tr>
          <tr>
            <td><b>Sekarang (-)</b></td>
            <td><b>じゃない / ではありません</b></td>
            <td>静かじゃない <button type="button" class="btn-audio-inline" onclick="Modul.speakText('しずかじゃない')">🔊</button></td>
          </tr>
          <tr>
            <td><b>Lampau (+)</b></td>
            <td><b>だった / でした</b></td>
            <td>静かだった <button type="button" class="btn-audio-inline" onclick="Modul.speakText('しずかだった')">🔊</button></td>
          </tr>
          <tr>
            <td><b>Lampau (-)</b></td>
            <td><b>じゃなかった</b></td>
            <td>静かじゃなかった <button type="button" class="btn-audio-inline" onclick="Modul.speakText('しずかじゃなかった')">🔊</button></td>
          </tr>
        </table>

        <div class="cs-alert-box danger-box">
          ⚠️ <b>JEBAKAN SIFAT-NA BERAKHIRAN "I":</b><br>
          Hati-hati dengan kata: <b>きれい (綺麗 - cantik/bersih)</b> dan <b>きらい (嫌い - benci)</b>.<br>
          Walaupun berakhiran 'i', keduanya adalah <b>KATA SIFAT-NA</b>! Bentuk negatifnya adalah <i>きれいじゃない</i> (bukan kirekunai!).
        </div>

        <div class="cs-alert-box" style="margin-top:8px;">
          📌 <b>Menyambung Kata Benda:</b><br>
          Wajib menambahkan partikel <b>な (na)</b> jika diletakkan tepat di depan kata benda:<br>
          • <b>静かな部屋</b> (shizuka na heya = kamar yang tenang)<br>
          • <b>きれいな花</b> (kirei na hana = bunga yang indah)
        </div>
      `;
    }
  }
};

window.onload = () => Modul.init();