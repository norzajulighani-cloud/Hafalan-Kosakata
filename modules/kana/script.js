/**
 * LOGIKA & CONTROLLER MASTERCLASS: PENGUASAAN HURUF KANA (METODE IQRA' KANA)
 * Silabus Fonetik Berjenjang Tahap 00 - YOMIKATA Japanese Learning System
 * Dilengkapi 8 Model Kuis Dinamis & Sistem Ujian Bertingkat (Dojo Multi-Stage)
 */

const KanaApp = {
  currentStageId: 1,
  currentPageId: 1,
  progress: {
    unlocked: ["1-1"],
    lastStage: 1,
    lastPage: 1
  },

  // Audio Engine & Speed
  speechSynth: null,
  speechVoice: null,
  speechRate: 0.82, // Default: 0.82 (Normal), 0.65 (Lambat)

  // Auto-Play Read-Along State
  isAutoPlaying: false,
  autoPlayTimer: null,
  autoPlayIdx: 0,
  activeDrillData: [],

  // Exam Engine State
  examActive: false,
  examIdx: 0,
  examScore: 0,
  examStreak: 0,
  examQuestions: [],
  examIsFinal: false,
  examRequiredScore: 4,
  examActiveModels: [],
  lastPenguatanModel: null,

  // Audio FX (Synthesizer Web Audio) & Canvas Particle States
  audioCtx: null,
  sfxEnabled: true,
  fxCanvas: null,
  fxCtx: null,
  fxParticles: [],
  fxAnimId: null,

  // Sub-game States for Interactive Models
  matchFirstCardIdx: null,
  scrambleSlots: [],
  timeAttackTimer: null,
  timeAttackSeconds: 7,

  // -------------------------------------------------------------------------
  // 1. INISIALISASI UTAMA
  // -------------------------------------------------------------------------
  init: function () {
    this.initAudio();
    this.loadProgress();
    this.loadSpeedPreference();
    this.renderCustomDropdown();
    this.loadCurrentView();
    this.setupKeyboardEvents();
  },

  // -------------------------------------------------------------------------
  // 2. AUDIO SYNTHESIS ENGINE (JA-JP) & SPEED CONTROL
  // -------------------------------------------------------------------------
  initAudio: function () {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.speechSynth = window.speechSynthesis;
      const loadVoices = () => {
        if (!this.speechSynth || !this.speechSynth.getVoices) return;
        const voices = this.speechSynth.getVoices();
        this.speechVoice = voices.find(v => v.lang.startsWith('ja') || v.lang === 'ja_JP') || null;
      };
      loadVoices();
      if (this.speechSynth && this.speechSynth.onvoiceschanged !== undefined) {
        this.speechSynth.onvoiceschanged = loadVoices;
      }
    }
  },

  loadSpeedPreference: function () {
    try {
      const savedRate = localStorage.getItem('YOMIKATA_KANA_SPEED_RATE');
      if (savedRate) {
        const parsed = parseFloat(savedRate);
        if (parsed === 0.82 || parsed === 0.65) {
          this.speechRate = parsed;
        }
      }
      this.updateSpeedUI();
    } catch (e) {}
  },

  toggleSpeed: function () {
    this.speechRate = this.speechRate === 0.82 ? 0.65 : 0.82;
    try {
      localStorage.setItem('YOMIKATA_KANA_SPEED_RATE', this.speechRate.toString());
    } catch (e) {}
    this.updateSpeedUI();
  },

  updateSpeedUI: function () {
    const label = document.getElementById('speed-label');
    if (label) {
      label.textContent = this.speechRate === 0.82 ? 'Normal (0.8x)' : 'Lambat (0.65x)';
    }
  },

  speakSingle: function (text, el) {
    if (!text || !this.speechSynth || typeof window === 'undefined' || !window.SpeechSynthesisUtterance) return;

    if (el) {
      el.classList.add('sounding');
      window.setTimeout(() => el.classList.remove('sounding'), 400);
    }

    try {
      this.speechSynth.cancel();
      const utter = new window.SpeechSynthesisUtterance(text.trim());
      utter.lang = 'ja-JP';
      utter.rate = this.speechRate;
      if (this.speechVoice) utter.voice = this.speechVoice;
      this.speechSynth.speak(utter);
    } catch (e) {
      console.warn('Speech error:', e);
    }
  },

  speakDrill: function (parts, el, onEndCallback) {
    if (!parts || !this.speechSynth || typeof window === 'undefined' || !window.SpeechSynthesisUtterance) return;

    if (el) {
      el.classList.add('sounding');
      window.setTimeout(() => el.classList.remove('sounding'), 500);
    }

    try {
      this.speechSynth.cancel();
      const textToSpeak = parts.join('、 ') + '。';
      const utter = new window.SpeechSynthesisUtterance(textToSpeak);
      utter.lang = 'ja-JP';
      utter.rate = this.speechRate;
      if (this.speechVoice) utter.voice = this.speechVoice;

      if (onEndCallback) {
        utter.onend = onEndCallback;
        utter.onerror = onEndCallback;
      }

      this.speechSynth.speak(utter);
    } catch (e) {
      console.warn('Speech error:', e);
      if (onEndCallback) onEndCallback();
    }
  },

  // -------------------------------------------------------------------------
  // 3. AUTO-PLAY READ-ALONG CONTROLLER (PUTAR OTOMATIS)
  // -------------------------------------------------------------------------
  toggleAutoPlay: function () {
    if (this.isAutoPlaying) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  },

  startAutoPlay: function () {
    if (!this.activeDrillData || this.activeDrillData.length === 0) return;

    this.isAutoPlaying = true;
    this.autoPlayIdx = 0;
    this.updateAutoPlayUI(true);
    this.playNextDrillStep();
  },

  stopAutoPlay: function () {
    this.isAutoPlaying = false;
    if (typeof window !== 'undefined' && window.clearTimeout) {
      window.clearTimeout(this.autoPlayTimer);
    }
    if (this.speechSynth) this.speechSynth.cancel();

    if (typeof document !== 'undefined' && document.querySelectorAll) {
      document.querySelectorAll('.iqra-3char-box.sounding').forEach(el => {
        el.classList.remove('sounding');
      });
    }

    this.updateAutoPlayUI(false);
  },

  updateAutoPlayUI: function (isPlaying) {
    const btn = document.getElementById('btn-autoplay-drill');
    const icon = document.getElementById('autoplay-icon');
    const text = document.getElementById('autoplay-text');

    if (btn) {
      if (isPlaying) {
        btn.classList.add('playing');
        if (icon) icon.textContent = '⏹️';
        if (text) text.textContent = 'Berhenti';
      } else {
        btn.classList.remove('playing');
        if (icon) icon.textContent = '▶️';
        if (text) text.textContent = 'Putar Otomatis';
      }
    }
  },

  playNextDrillStep: function () {
    if (!this.isAutoPlaying) return;

    if (this.autoPlayIdx >= this.activeDrillData.length) {
      this.stopAutoPlay();
      return;
    }

    const currentItem = this.activeDrillData[this.autoPlayIdx];
    const el = document.getElementById(`drill-tile-${this.autoPlayIdx}`);

    document.querySelectorAll('.iqra-3char-box.sounding').forEach(box => box.classList.remove('sounding'));

    if (el) {
      el.classList.add('sounding');
    }

    this.speakDrill(currentItem.ttsParts, null, () => {
      this.autoPlayTimer = window.setTimeout(() => {
        if (!this.isAutoPlaying) return;
        if (el) el.classList.remove('sounding');
        this.autoPlayIdx++;
        this.playNextDrillStep();
      }, 700);
    });
  },

  // -------------------------------------------------------------------------
  // 4. PROGRESS & LOCAL STORAGE
  // -------------------------------------------------------------------------
  loadProgress: function () {
    try {
      const saved = localStorage.getItem('YOMIKATA_KANA_STAGE_PROGRESS');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.unlocked)) {
          this.progress.unlocked = parsed.unlocked;
        }
        if (parsed.lastStage && parsed.lastPage) {
          this.currentStageId = parseInt(parsed.lastStage, 10) || 1;
          this.currentPageId = parseInt(parsed.lastPage, 10) || 1;
        }
      }
    } catch (e) {
      console.warn('Gagal memuat progress:', e);
    }

    if (!this.progress.unlocked.includes("1-1")) {
      this.progress.unlocked.push("1-1");
    }
  },

  saveProgress: function () {
    try {
      this.progress.lastStage = this.currentStageId;
      this.progress.lastPage = this.currentPageId;
      localStorage.setItem('YOMIKATA_KANA_STAGE_PROGRESS', JSON.stringify(this.progress));
    } catch (e) {
      console.warn('Gagal menyimpan progress:', e);
    }
  },

  isPageUnlocked: function (stageId, pageId) {
    if (stageId === 1 && pageId === 1) return true;
    return this.progress.unlocked.includes(`${stageId}-${pageId}`);
  },

  unlockPage: function (stageId, pageId) {
    const key = `${stageId}-${pageId}`;
    if (!this.progress.unlocked.includes(key)) {
      this.progress.unlocked.push(key);
      this.saveProgress();
      this.renderCustomDropdown();
      this.updateNavBar();
    }
  },

  getTotalPagesCount: function () {
    if (typeof KANA_STAGES === 'undefined') return 25;
    return KANA_STAGES.reduce((acc, st) => acc + (st.pages ? st.pages.length : 0), 0);
  },

  getTotalUnlockedCount: function () {
    return this.progress.unlocked.length;
  },

  getCurrentStage: function () {
    return KANA_STAGES.find(s => s.stageId === this.currentStageId) || KANA_STAGES[0];
  },

  getCurrentPage: function () {
    const stage = this.getCurrentStage();
    return stage.pages.find(p => p.pageId === this.currentPageId) || stage.pages[0];
  },

  // -------------------------------------------------------------------------
  // 5. CUSTOM POPOVER DROPDOWN (PENGGANTI SELECT BROWSER)
  // -------------------------------------------------------------------------
  toggleDropdown: function (forceState) {
    const overlay = document.getElementById('custom-dropdown-overlay');
    if (!overlay) return;

    const shouldOpen = forceState !== undefined ? forceState : overlay.classList.contains('hidden');
    if (shouldOpen) {
      this.renderCustomDropdown();
      overlay.classList.remove('hidden');
      window.setTimeout(() => {
        const activeBtn = overlay.querySelector('.dropdown-item-btn.active');
        if (activeBtn) {
          activeBtn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }, 50);
    } else {
      overlay.classList.add('hidden');
    }
  },

  closeDropdown: function (e) {
    if (e && e.target && e.target.id === 'custom-dropdown-overlay') {
      this.toggleDropdown(false);
    }
  },

  renderCustomDropdown: function () {
    const body = document.getElementById('dropdown-scroll-body');
    if (!body || typeof KANA_STAGES === 'undefined') return;

    let html = '';
    KANA_STAGES.forEach(stage => {
      const stagePagesCount = stage.pages.length;
      const stageUnlockedCount = stage.pages.filter(p => this.isPageUnlocked(stage.stageId, p.pageId)).length;
      const isStageCompleted = stageUnlockedCount === stagePagesCount;

      html += `<div class="stage-group-box">`;
      html += `  <div class="stage-group-label">`;
      html += `    <span>${stage.stageName}</span>`;
      if (isStageCompleted) {
        html += `    <span style="color:var(--success); font-size:10px;">✓ Tuntas</span>`;
      } else {
        html += `    <span style="color:var(--text-dim); font-size:10px;">${stageUnlockedCount}/${stagePagesCount}</span>`;
      }
      html += `  </div>`;

      stage.pages.forEach(page => {
        const isUnlocked = this.isPageUnlocked(stage.stageId, page.pageId);
        const isActive = stage.stageId === this.currentStageId && page.pageId === this.currentPageId;
        const letterSummary = page.letters.map(l => l.h).join(' ');

        if (isUnlocked) {
          html += `
            <button type="button" class="dropdown-item-btn ${isActive ? 'active' : ''}" 
                    onclick="KanaApp.goToStagePage(${stage.stageId}, ${page.pageId})">
              <span>📖 Hal ${page.pageId}: ${letterSummary} (${page.letters.map(l => l.ro).join(', ')})</span>
              ${isActive ? '<span style="font-size:11px; color:var(--kata-color); font-weight:900;">● Aktif</span>' : ''}
            </button>
          `;
        } else {
          html += `
            <button type="button" class="dropdown-item-btn locked" disabled>
              <span>🔒 Hal ${page.pageId}: ${letterSummary} (${page.letters.map(l => l.ro).join(', ')})</span>
              <span style="font-size:10px; opacity:0.6;">Terkunci</span>
            </button>
          `;
        }
      });

      html += `</div>`;
    });

    body.innerHTML = html;
  },

  // -------------------------------------------------------------------------
  // 6. NAVIGASI HALAMAN & TAHAP
  // -------------------------------------------------------------------------
  goToStagePage: function (stageId, pageId) {
    if (!this.isPageUnlocked(stageId, pageId)) return;

    this.stopAutoPlay();
    this.currentStageId = stageId;
    this.currentPageId = pageId;
    this.saveProgress();
    this.toggleDropdown(false);
    this.loadCurrentView();
  },

  stepPage: function (direction) {
    const linearPages = [];
    KANA_STAGES.forEach(st => {
      st.pages.forEach(pg => {
        linearPages.push({ stageId: st.stageId, pageId: pg.pageId });
      });
    });

    const currentIndex = linearPages.findIndex(
      p => p.stageId === this.currentStageId && p.pageId === this.currentPageId
    );

    if (currentIndex === -1) return;
    const targetIndex = currentIndex + direction;

    if (targetIndex >= 0 && targetIndex < linearPages.length) {
      const target = linearPages[targetIndex];
      if (this.isPageUnlocked(target.stageId, target.pageId)) {
        this.goToStagePage(target.stageId, target.pageId);
      }
    }
  },

  updateNavBar: function () {
    const stage = this.getCurrentStage();
    const page = this.getCurrentPage();

    const stageBadge = document.getElementById('nav-stage-badge');
    if (stageBadge) {
      stageBadge.textContent = `TAHAP ${String(this.currentStageId).padStart(2, '0')}`;
    }

    const totalPages = this.getTotalPagesCount();
    const unlockedCount = this.getTotalUnlockedCount();

    const progText = document.getElementById('nav-progress-text');
    if (progText) {
      progText.textContent = `${unlockedCount} / ${totalPages}`;
    }

    const progFill = document.getElementById('nav-progress-fill');
    if (progFill && progFill.style) {
      const pct = Math.max(4, Math.round((unlockedCount / totalPages) * 100));
      progFill.style.width = `${pct}%`;
    }

    const triggerLabel = document.getElementById('custom-select-label');
    if (triggerLabel) {
      const lettersStr = page.letters.map(l => l.h).join(' ');
      const romajiStr = page.letters.map(l => l.ro).join(', ');
      triggerLabel.innerHTML = `<span>Tahap ${stage.stageId} • Hal ${page.pageId}: ${lettersStr}</span> <span style="opacity:0.75; font-size:12px;">(${romajiStr})</span>`;
    }

    const linearPages = [];
    KANA_STAGES.forEach(st => {
      st.pages.forEach(pg => {
        linearPages.push({ stageId: st.stageId, pageId: pg.pageId });
      });
    });

    const currentIndex = linearPages.findIndex(
      p => p.stageId === this.currentStageId && p.pageId === this.currentPageId
    );

    const prevBtn = document.getElementById('btn-prev-page');
    if (prevBtn) {
      prevBtn.disabled = currentIndex <= 0;
    }

    const nextBtn = document.getElementById('btn-next-page');
    if (nextBtn) {
      if (currentIndex < linearPages.length - 1) {
        const nextTarget = linearPages[currentIndex + 1];
        nextBtn.disabled = !this.isPageUnlocked(nextTarget.stageId, nextTarget.pageId);
      } else {
        nextBtn.disabled = true;
      }
    }
  },

  // -------------------------------------------------------------------------
  // 7. RENDER VIEW UTAMA (HEADER, DRILLS, EXAM)
  // -------------------------------------------------------------------------
  loadCurrentView: function () {
    this.updateNavBar();
    this.renderHeaderLetters();
    this.renderDrills();
    this.renderExamCard();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  renderHeaderLetters: function () {
    const container = document.getElementById('iqra-header-grid');
    if (!container) return;

    const page = this.getCurrentPage();
    let html = '';

    page.letters.forEach(char => {
      html += `
        <div class="iqra-header-card" onclick="KanaApp.speakSingle('${char.h}', this)" title="Ketuk untuk dengar suara huruf ${char.ro}">
          <div class="iqra-script-tags">
            <span class="tag-hira">Hiragana</span>
            <span class="tag-dot">•</span>
            <span class="tag-kata">Katakana</span>
          </div>

          <div class="iqra-glyph-pair">
            <span class="iqra-hira">${char.h}</span>
            <span class="iqra-dot">・</span>
            <span class="iqra-kata">${char.k}</span>
          </div>

          <div style="display:flex; align-items:center; gap:8px;">
            <div class="iqra-romaji-pill">
              <span class="iqra-romaji-text">( ${char.ro} )</span>
            </div>
            <div class="audio-wave-bars">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderDrills: function () {
    const container = document.getElementById('drills-iqra-grid');
    if (!container) return;

    this.stopAutoPlay();
    const page = this.getCurrentPage();
    const pool = page.availablePool && page.availablePool.length > 0 ? page.availablePool : page.letters;

    const TOTAL_BOXES = 15;
    this.activeDrillData = [];
    let html = '';

    for (let b = 0; b < TOTAL_BOXES; b++) {
      const chars = [];
      const ttsParts = [];

      for (let c = 0; c < 3; c++) {
        const randLetter = pool[Math.floor(Math.random() * pool.length)];
        const isHira = Math.random() >= 0.5;
        const glyph = isHira ? randLetter.h : randLetter.k;
        const cssClass = isHira ? 'k-char-hira' : 'k-char-kata';

        chars.push(`<span class="${cssClass}">${glyph}</span>`);
        ttsParts.push(randLetter.h);
      }

      this.activeDrillData.push({ b, ttsParts });
      const jsonParts = JSON.stringify(ttsParts).replace(/"/g, '&quot;');
      const tileNum = String(b + 1).padStart(2, '0');

      html += `
        <div class="iqra-3char-box" id="drill-tile-${b}" data-tile-num="${tileNum}" 
             onclick="KanaApp.speakDrill(${jsonParts}, this)" 
             title="Kotak ${tileNum}: Ketuk untuk dengar lafal berketukan">
          ${chars.join('')}
        </div>
      `;
    }

    container.innerHTML = html;
  },

  refreshDrillBoxes: function () {
    this.renderDrills();
  },

  // -------------------------------------------------------------------------
  // 7B. AUDIO SFX & VISUAL PARTICLE JUICINESS ENGINE (Web Audio API & Canvas FX)
  // -------------------------------------------------------------------------
  initAudioFX: function () {
    if (typeof window === 'undefined') return;
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  },

  playSFX: function (type, streak = 1) {
    if (!this.sfxEnabled) return;
    try {
      this.initAudioFX();
      if (!this.audioCtx) return;
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      if (type === 'correct') {
        // Nada bel kristal bertingkat (Arpeggio C5 -> E5 -> G5) dengan bonus pitch saat streak
        const pitchBonus = Math.min((streak - 1) * 25, 150);
        const freqs = [523.25 + pitchBonus, 659.25 + pitchBonus, 783.99 + pitchBonus];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.065);
          gain.gain.setValueAtTime(0.001, now + idx * 0.065);
          gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.065 + 0.015);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.065 + 0.28);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.065);
          osc.stop(now + idx * 0.065 + 0.3);
        });
      } else if (type === 'wrong') {
        // Nada tepuk kayu lembut (warm soft pitch ramp down, ramah di telinga)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(175, now);
        osc.frequency.exponentialRampToValueAtTime(85, now + 0.18);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'pop') {
        // Suara letupan gelembung pop saat kartu match atau gelembung meletup
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === 'win') {
        // Akor kemenangan gemilang saat menuntaskan ujian (C5 -> E5 -> G5 -> C6)
        const notes = [
          { f: 523.25, t: 0.0 },
          { f: 659.25, t: 0.11 },
          { f: 783.99, t: 0.22 },
          { f: 1046.50, t: 0.36 }
        ];
        notes.forEach(n => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(n.f, now + n.t);
          gain.gain.setValueAtTime(0.001, now + n.t);
          gain.gain.linearRampToValueAtTime(0.2, now + n.t + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + n.t + 0.45);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + n.t);
          osc.stop(now + n.t + 0.5);
        });
      }
    } catch (e) {
      // Audio safety: silent fallback
    }
  },

  initCanvasFX: function () {
    if (typeof document === 'undefined' || !document.createElement) return;
    if (this.fxCanvas) return;
    this.fxCanvas = document.getElementById('fx-canvas');
    if (!this.fxCanvas) {
      this.fxCanvas = document.createElement('canvas');
      this.fxCanvas.id = 'fx-canvas';
      this.fxCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;';
      document.body.appendChild(this.fxCanvas);
    }
    this.fxCtx = this.fxCanvas.getContext ? this.fxCanvas.getContext('2d') : null;
    const resize = () => {
      if (this.fxCanvas && typeof window !== 'undefined') {
        this.fxCanvas.width = window.innerWidth;
        this.fxCanvas.height = window.innerHeight;
      }
    };
    resize();
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('resize', resize);
    }
  },

  triggerFXBurst: function (x, y, count = 26, colors = ['#38bdf8', '#fbbf24', '#34d399', '#ffffff']) {
    this.initCanvasFX();
    if (!this.fxCtx) return;
    if (!this.fxParticles) this.fxParticles = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.4 + Math.random() * 5.0;
      const size = 3 + Math.random() * 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const isStar = Math.random() > 0.45;

      this.fxParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (1.5 + Math.random() * 2),
        size: size,
        color: color,
        alpha: 1,
        decay: 0.022 + Math.random() * 0.022,
        gravity: 0.16,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.25,
        isStar: isStar
      });
    }

    if (!this.fxAnimId) {
      this.runFXLoop();
    }
  },

  triggerConfetti: function (durationMs = 2800) {
    this.initCanvasFX();
    if (!this.fxCtx) return;
    if (!this.fxParticles) this.fxParticles = [];

    const colors = ['#f59e0b', '#38bdf8', '#10b981', '#ec4899', '#8b5cf6', '#fbbf24', '#34d399'];
    const startTime = Date.now();

    const spawnInterval = setInterval(() => {
      if (Date.now() - startTime > durationMs) {
        clearInterval(spawnInterval);
        return;
      }
      for (let i = 0; i < 7; i++) {
        const width = typeof window !== 'undefined' ? window.innerWidth : 800;
        this.fxParticles.push({
          x: Math.random() * width,
          y: -12,
          vx: (Math.random() - 0.5) * 3,
          vy: 2.2 + Math.random() * 4.2,
          size: 7 + Math.random() * 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: 0.006 + Math.random() * 0.005,
          gravity: 0.08,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.18,
          isRect: true
        });
      }
    }, 60);

    if (!this.fxAnimId) {
      this.runFXLoop();
    }
  },

  runFXLoop: function () {
    if (!this.fxCtx || !this.fxCanvas) return;
    this.fxCtx.clearRect(0, 0, this.fxCanvas.width, this.fxCanvas.height);

    for (let i = this.fxParticles.length - 1; i >= 0; i--) {
      const p = this.fxParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= p.decay;
      p.rotation += p.rotSpeed;

      if (p.alpha <= 0) {
        this.fxParticles.splice(i, 1);
        continue;
      }

      this.fxCtx.save();
      this.fxCtx.globalAlpha = Math.max(0, p.alpha);
      this.fxCtx.translate(p.x, p.y);
      this.fxCtx.rotate(p.rotation);
      this.fxCtx.fillStyle = p.color;

      if (p.isRect) {
        this.fxCtx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.7);
      } else if (p.isStar) {
        const r = p.size;
        this.fxCtx.beginPath();
        this.fxCtx.moveTo(0, -r);
        this.fxCtx.quadraticCurveTo(0, 0, r, 0);
        this.fxCtx.quadraticCurveTo(0, 0, 0, r);
        this.fxCtx.quadraticCurveTo(0, 0, -r, 0);
        this.fxCtx.quadraticCurveTo(0, 0, 0, -r);
        this.fxCtx.fill();
      } else {
        this.fxCtx.beginPath();
        this.fxCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.fxCtx.fill();
      }
      this.fxCtx.restore();
    }

    if (this.fxParticles.length > 0) {
      this.fxAnimId = (typeof window !== 'undefined' && window.requestAnimationFrame) 
        ? window.requestAnimationFrame(() => this.runFXLoop()) 
        : null;
    } else {
      this.fxAnimId = null;
    }
  },

  showPraiseToast: function (isCorrect, targetEl) {
    if (typeof document === 'undefined' || !document.createElement) return;
    const praises = [
      "Sugoi! (すごい) 🌟",
      "Luar Biasa! 🔥",
      "Tepat Sekali! ✨",
      "Refleks Kilat! ⚡",
      "Sempurna! 🎯",
      "Mantap! 👏",
      "Hebat! 💫"
    ];
    const corrections = [
      "Hampir! Perhatikan lagi ya 🌱",
      "Fokus ke bunyinya! 💡",
      "Ayo lanjut, pasti bisa! 💪"
    ];

    const text = isCorrect 
      ? praises[Math.floor(Math.random() * praises.length)]
      : corrections[Math.floor(Math.random() * corrections.length)];

    const toast = document.createElement('div');
    toast.className = `praise-toast ${isCorrect ? 'toast-correct' : 'toast-wrong'}`;
    toast.innerHTML = text;

    const rect = targetEl && targetEl.getBoundingClientRect ? targetEl.getBoundingClientRect() : null;
    if (rect) {
      toast.style.left = `${rect.left + rect.width / 2}px`;
      toast.style.top = `${rect.top - 12}px`;
    } else {
      toast.style.left = `50%`;
      toast.style.top = `38%`;
    }

    document.body.appendChild(toast);
    window.setTimeout(() => {
      if (toast && toast.parentNode) toast.parentNode.removeChild(toast);
    }, 1000);
  },

  // -------------------------------------------------------------------------
  // 8. MESIN KUIS 8 MODEL (PENGUATAN & UJIAN MULTI-STAGE)
  // -------------------------------------------------------------------------

  /**
   * Mengatur jumlah soal, syarat kelulusan, dan daftar model soal yang aktif:
   * - Tahap 1 & 2: Penguatan = 5 soal (min 4), Ujian = 10 soal (min 8). Menggunakan 3 model awal.
   * - Tahap 3+: Penguatan = 10 soal (min 8) dengan 3 model acak dari 8 model. Ujian = 20 soal dengan 8 model komprehensif.
   */
  getExamConfig: function (isFinal) {
    const isEarlyStage = this.currentStageId <= 2;

    if (!isFinal) {
      // Sesi Penguatan Halaman
      const totalQ = isEarlyStage ? 5 : 10;
      const reqScore = isEarlyStage ? 4 : 8;

      // Model soal yang digunakan
      let activeModels = [];
      if (isEarlyStage) {
        // Tahap 1 & 2: Menggunakan 3 model awal
        activeModels = [1, 2, 3];
      } else {
        // Tahap 3+: Ambil 3 model acak dari 8 model yang ada
        const all8 = [1, 2, 3, 4, 5, 6, 7, 8];
        const shuffled = this.shuffleArray(all8);
        activeModels = shuffled.slice(0, 3);
      }

      return {
        totalQuestions: totalQ,
        requiredScore: reqScore,
        isFinal: false,
        title: isEarlyStage ? "Penguatan Fondasi Kana" : "Penguatan Kelancaran Kana",
        activeModels: activeModels
      };
    } else {
      // Ujian Kenaikan Tahap
      const totalQ = isEarlyStage ? 10 : 20;
      const reqScore = isEarlyStage ? 8 : 16;

      let activeModels = [];
      if (isEarlyStage) {
        activeModels = [1, 2, 3];
      } else {
        activeModels = [1, 2, 3, 4, 5, 6, 7, 8]; // Seluruh 8 model aktif
      }

      return {
        totalQuestions: totalQ,
        requiredScore: reqScore,
        isFinal: true,
        title: isEarlyStage 
          ? `Ujian Kelulusan ${this.getCurrentStage().stageShort}` 
          : `Ujian Kelulusan Multi-Stage Dojo ${this.getCurrentStage().stageShort}`,
        activeModels: activeModels
      };
    }
  },

  renderExamCard: function () {
    const container = document.getElementById('exam-section-card');
    if (!container) return;

    this.examActive = false;
    const page = this.getCurrentPage();
    const stage = this.getCurrentStage();
    const isFinal = !!page.isFinalPage;
    const config = this.getExamConfig(isFinal);

    if (isFinal) {
      container.classList.add('is-stage-final');
      container.innerHTML = `
        <div class="exam-banner-idle">
          <div class="exam-badge-icon">🏆</div>
          <h3 class="exam-title-text" style="color:var(--kata-color);">${config.title}</h3>
          <p class="exam-desc-text">
            Tantangan kelulusan tahap! <b>${config.totalQuestions} soal multi-variasi</b> (Tebak Cepat, Benar-Salah, Pasangan Kembar, Sortir, Susun Kata, dll.).
            Minimal <b>${config.requiredScore} benar</b> untuk membuka Tahap berikutnya!
          </p>
          <button type="button" class="btn-start-exam gold" onclick="KanaApp.startExam(true)">
            <span>⚔️</span> <span>Mulai Ujian Kelulusan (${config.totalQuestions} Soal)</span>
          </button>
        </div>
      `;
    } else {
      container.classList.remove('is-stage-final');
      container.innerHTML = `
        <div class="exam-banner-idle">
          <div class="exam-badge-icon">⚡</div>
          <h3 class="exam-title-text">Tes Penguatan Ingatan</h3>
          <p class="exam-desc-text">
            Sesi latihan interaktif <b>${config.totalQuestions} soal beragam</b> untuk memantapkan memori aksara Anda.
            Minimal <b>${config.requiredScore} benar</b> untuk membuka huruf berikutnya. Dapat diulang kapan saja!
          </p>
          <button type="button" class="btn-start-exam" onclick="KanaApp.startExam(false)">
            <span>🎯</span> <span>Mulai Penguatan (${config.totalQuestions} Soal)</span>
          </button>
        </div>
      `;
    }
  },

  // -------------------------------------------------------------------------
  // GENERATOR 8 MODEL SOAL
  // -------------------------------------------------------------------------

  /** MODEL 1: Refleks Tebak Cepat (Kana ↔ Romaji) */
  generateQ1_Reflex: function (primaryPool, secondaryPool) {
    const isKanaToRo = Math.random() >= 0.5; // 50% Kana -> Romaji, 50% Romaji -> Kana
    const l1 = primaryPool[Math.floor(Math.random() * primaryPool.length)];
    const useSec = Math.random() < 0.4 && secondaryPool.length > 0;
    const l2 = useSec ? secondaryPool[Math.floor(Math.random() * secondaryPool.length)] : primaryPool[Math.floor(Math.random() * primaryPool.length)];

    const comboMode = Math.floor(Math.random() * 4);
    const isHira1 = comboMode === 0 || comboMode === 2;
    const isHira2 = comboMode === 0 || comboMode === 3;

    const g1 = isHira1 ? l1.h : l1.k;
    const g2 = isHira2 ? l2.h : l2.k;

    const correctRo = `${l1.ro} - ${l2.ro}`;
    const correctKana = `${g1} ${g2}`;

    if (isKanaToRo) {
      // Kana -> Romaji: Pengguna melihat huruf Kana, memilih bacaan Romaji (bersih tanpa badge berlebih)
      const options = this.generateComboOptions(l1, l2, secondaryPool);
      return {
        modelType: 1,
        subType: 'kana2ro',
        instruction: 'TEBAK BACAAN ROMAJI:',
        displayHtml: `
          <div class="exam-combo-row">
            <span class="${isHira1 ? 'k-char-hira' : 'k-char-kata'}">${g1}</span>
            <span class="exam-combo-gap"></span>
            <span class="${isHira2 ? 'k-char-hira' : 'k-char-kata'}">${g2}</span>
          </div>
        `,
        options: this.shuffleArray(options),
        correctAnswer: correctRo
      };
    } else {
      // Romaji -> Kana: Pengguna melihat Romaji, memilih aksara Kana yang tepat
      // Tentukan secara tegas aksara mana yang dicari: Hiragana atau Katakana murni
      const targetScript = Math.random() < 0.5 ? 'hira' : 'kata';
      const isHira = targetScript === 'hira';

      const targetGlyph1 = isHira ? l1.h : l1.k;
      const targetGlyph2 = isHira ? l2.h : l2.k;
      const correctKana = `${targetGlyph1} ${targetGlyph2}`;

      // Buat 4 opsi pengecoh murni dalam alfabet target yang sama agar 100% tidak ambigu
      const pool = (secondaryPool && secondaryPool.length > 0) ? secondaryPool : primaryPool;
      const optionsSet = new Set([correctKana]);

      // Pengecoh 1: Posisi dibalik jika l1 != l2
      if (l1.ro !== l2.ro) {
        optionsSet.add(`${targetGlyph2} ${targetGlyph1}`);
      }

      // Pengecoh 2 & 3: Kombinasi kembar
      optionsSet.add(`${targetGlyph1} ${targetGlyph1}`);
      optionsSet.add(`${targetGlyph2} ${targetGlyph2}`);

      // Lengkapi hingga 4 opsi unik menggunakan huruf-huruf dari pool yang sama
      let attempts = 0;
      while (optionsSet.size < 4 && attempts < 100) {
        attempts++;
        const r1 = pool[Math.floor(Math.random() * pool.length)];
        const r2 = pool[Math.floor(Math.random() * pool.length)];
        const cand = isHira ? `${r1.h} ${r2.h}` : `${r1.k} ${r2.k}`;
        if (cand !== correctKana) {
          optionsSet.add(cand);
        }
      }

      // Fallback jika huruf unik di tahap awal masih terbatas (misal Halaman 1 cuma 'a' dan 'i')
      const fallbackLetters = [
        { h: 'あ', k: 'ア' }, { h: 'い', k: 'イ' }, { h: 'う', k: 'ウ' }, 
        { h: 'え', k: 'エ' }, { h: 'お', k: 'オ' }
      ];
      while (optionsSet.size < 4) {
        const r1 = fallbackLetters[Math.floor(Math.random() * fallbackLetters.length)];
        const r2 = fallbackLetters[Math.floor(Math.random() * fallbackLetters.length)];
        const cand = isHira ? `${r1.h} ${r2.h}` : `${r1.k} ${r2.k}`;
        optionsSet.add(cand);
      }

      const options = Array.from(optionsSet).slice(0, 4);

      return {
        modelType: 1,
        subType: 'ro2kana',
        instruction: isHira 
          ? 'PILIH KARTU HIRAGANA YANG TEPAT:' 
          : 'PILIH KARTU KATAKANA YANG TEPAT:',
        displayHtml: `
          <div class="exam-combo-row" style="font-size:32px; font-weight:900; color:#fff; letter-spacing:1.5px;">
            ( ${correctRo} )
          </div>
          <div style="margin-top:8px;">
            <span class="script-badge ${isHira ? 'hira-badge' : 'kata-badge'}">
              ${isHira ? '🔵 CARI: AKSARA HIRAGANA' : '🟡 CARI: AKSARA KATAKANA'}
            </span>
          </div>
        `,
        options: this.shuffleArray(options),
        correctAnswer: correctKana
      };
    }
  },

  /** MODEL 2: Benar atau Salah (True / False) */
  generateQ2_TrueFalse: function (primaryPool, secondaryPool) {
    const l1 = primaryPool[Math.floor(Math.random() * primaryPool.length)];
    const l2 = secondaryPool[Math.floor(Math.random() * secondaryPool.length)];

    const comboMode = Math.floor(Math.random() * 4);
    const isHira1 = comboMode === 0 || comboMode === 2;
    const isHira2 = comboMode === 0 || comboMode === 3;

    const g1 = isHira1 ? l1.h : l1.k;
    const g2 = isHira2 ? l2.h : l2.k;

    const actualRo = `${l1.ro} - ${l2.ro}`;
    const isClaimTrue = Math.random() >= 0.5;

    let claimRo = actualRo;
    if (!isClaimTrue) {
      // Buat klaim yang salah
      const distractorLetter = secondaryPool.find(x => x.ro !== l2.ro) || { ro: "o" };
      claimRo = `${l1.ro} - ${distractorLetter.ro}`;
      if (claimRo === actualRo) claimRo = `${distractorLetter.ro} - ${l1.ro}`;
    }

    return {
      modelType: 2,
      instruction: 'APAKAH BACAAN INI BENAR ATAU SALAH?',
      displayHtml: `
        <div class="exam-combo-row">
          <span class="${isHira1 ? 'k-char-hira' : 'k-char-kata'}">${g1}</span>
          <span class="exam-combo-gap"></span>
          <span class="${isHira2 ? 'k-char-hira' : 'k-char-kata'}">${g2}</span>
        </div>
        <div style="font-size:16px; font-weight:900; color:var(--kata-color); margin-top:8px;">
          Dibaca: "<b>${claimRo}</b>"
        </div>
      `,
      isClaimTrue: isClaimTrue
    };
  },

  /** MODEL 3: Match Pairs Kembar */
  generateQ3_MatchPairs: function (primaryPool, secondaryPool) {
    const pool = (secondaryPool && secondaryPool.length > 0) ? secondaryPool : primaryPool;
    const uniqueMap = new Map();
    pool.forEach(l => {
      if (!uniqueMap.has(l.ro)) uniqueMap.set(l.ro, l);
    });
    const uniqueLetters = Array.from(uniqueMap.values());
    this.shuffleArray(uniqueLetters);

    // Konfigurasi jumlah pasangan:
    // Tahap 1: 3 pasang (6 kotak dalam format 3x2 grid)
    // Tahap 2 ke atas: 4 pasang (8 kotak dalam format 4x2 grid)
    const targetPairs = (this.currentStageId === 1) ? 3 : 4;

    const selectedLetters = [];
    // Prioritaskan huruf-huruf unik terlebih dahulu
    for (let i = 0; i < Math.min(targetPairs, uniqueLetters.length); i++) {
      selectedLetters.push(uniqueLetters[i]);
    }
    // Jika jumlah huruf unik masih kurang dari target (misal Hal 1 baru ada 2 vokal: a dan i),
    // tambahkan huruf dari pool yang ada sampai mencapai targetPairs (3 pasang = 6 kartu)
    while (selectedLetters.length < targetPairs && uniqueLetters.length > 0) {
      const extra = uniqueLetters[Math.floor(Math.random() * uniqueLetters.length)];
      selectedLetters.push(extra);
    }

    const cards = [];
    selectedLetters.forEach((letter, pairIdx) => {
      // Kartu Hiragana
      cards.push({
        id: `h-${pairIdx}`,
        ro: letter.ro,
        glyph: letter.h,
        type: 'hira',
        matched: false
      });
      // Kartu Katakana
      cards.push({
        id: `k-${pairIdx}`,
        ro: letter.ro,
        glyph: letter.k,
        type: 'kata',
        matched: false
      });
    });

    const totalPairs = selectedLetters.length;
    const totalCards = cards.length;

    return {
      modelType: 3,
      instruction: `PASANGKAN ${totalPairs} PASANG KEMBAR (${totalCards} KARTU):`,
      cards: this.shuffleArray(cards),
      totalPairs: totalPairs,
      matchedPairsCount: 0
    };
  },

  /** MODEL 4: Sortir Keranjang (Hiragana vs Katakana) */
  generateQ4_BasketSort: function (primaryPool, secondaryPool) {
    const letter = primaryPool[Math.floor(Math.random() * primaryPool.length)];
    const isHira = Math.random() >= 0.5;
    const glyph = isHira ? letter.h : letter.k;

    return {
      modelType: 4,
      instruction: 'MASUKKAN HURUF INI KE KERANJANG YANG TEPAT:',
      glyph: glyph,
      isHira: isHira,
      correctBasket: isHira ? 'hira' : 'kata'
    };
  },

  /** MODEL 5: Tebak Dengar Suara */
  generateQ5_AudioKana: function (primaryPool, secondaryPool) {
    const target = primaryPool[Math.floor(Math.random() * primaryPool.length)];
    const isHira = Math.random() >= 0.5;
    const glyph = isHira ? target.h : target.k;

    // 3 pengecoh
    const distractorList = secondaryPool.filter(l => l.ro !== target.ro);
    this.shuffleArray(distractorList);
    const distractors = distractorList.slice(0, 3).map(l => (isHira ? l.h : l.k));

    const options = this.shuffleArray([glyph, ...distractors]);

    return {
      modelType: 5,
      instruction: 'DENGARKAN SUARA & PILIH HURUF KANA YANG COCOK:',
      audioText: target.h,
      glyph: glyph,
      options: options,
      correctAnswer: glyph
    };
  },

  /** MODEL 6: Susun Balok Kata (Word Scramble) */
  generateQ6_WordScramble: function (stageId) {
    const wordsList = (typeof KANA_STAGE_WORDS !== 'undefined' && KANA_STAGE_WORDS[stageId]) 
      ? KANA_STAGE_WORDS[stageId] 
      : (typeof KANA_STAGE_WORDS !== 'undefined' ? KANA_STAGE_WORDS[1] : []);

    const word = wordsList[Math.floor(Math.random() * wordsList.length)] || {
      ro: "ai", h: "あい", k: "アイ", meaning: "Cinta", chars: ["あ", "い"]
    };

    const isHira = Math.random() >= 0.5;
    const targetKana = isHira ? word.h : word.k;
    const chars = targetKana.split('');
    const scrambled = this.shuffleArray([...chars]);

    return {
      modelType: 6,
      instruction: 'KETUK BALOK UNTUK MENYUSUN KATA:',
      wordRo: word.ro,
      meaning: word.meaning,
      targetKana: targetKana,
      targetChars: chars,
      scrambledTiles: scrambled.map((c, i) => ({ id: i, char: c, used: false })),
      slots: new Array(chars.length).fill(null)
    };
  },

  /** MODEL 7: Lengkapi Huruf yang Hilang (Fill in the Blank) */
  generateQ7_FillBlank: function (stageId, secondaryPool) {
    const wordsList = (typeof KANA_STAGE_WORDS !== 'undefined' && KANA_STAGE_WORDS[stageId]) 
      ? KANA_STAGE_WORDS[stageId] 
      : (typeof KANA_STAGE_WORDS !== 'undefined' ? KANA_STAGE_WORDS[1] : []);

    const word = wordsList[Math.floor(Math.random() * wordsList.length)] || {
      ro: "ie", h: "いえ", k: "イエ", meaning: "Rumah", chars: ["い", "え"]
    };

    const chars = word.h.split('');
    const blankIdx = Math.floor(Math.random() * chars.length);
    const correctChar = chars[blankIdx];

    const distractors = secondaryPool
      .filter(l => l.h !== correctChar)
      .slice(0, 3)
      .map(l => l.h);

    const options = this.shuffleArray([correctChar, ...distractors]);

    return {
      modelType: 7,
      instruction: 'PILIH HURUF UNTUK MELENGKAPI KATA:',
      chars: chars,
      blankIdx: blankIdx,
      meaning: word.meaning,
      wordRo: word.ro,
      options: options,
      correctAnswer: correctChar
    };
  },

  /** MODEL 8: Time Attack (Ketuk Kilat Berwaktu) */
  generateQ8_TimeAttack: function (primaryPool, secondaryPool) {
    const targetLetter = primaryPool[Math.floor(Math.random() * primaryPool.length)];
    const distractorLetters = secondaryPool.filter(l => l.ro !== targetLetter.ro);
    this.shuffleArray(distractorLetters);

    // 3 kartu target (kombinasi Hiragana dan Katakana)
    const targetCards = [
      { char: targetLetter.h, isTarget: true, popped: false },
      { char: targetLetter.k, isTarget: true, popped: false },
      { char: targetLetter.h, isTarget: true, popped: false }
    ];

    // 3 kartu pengecoh
    const distractorCards = [
      { char: (distractorLetters[0] || targetLetter).h, isTarget: false, popped: false },
      { char: (distractorLetters[1] || targetLetter).k, isTarget: false, popped: false },
      { char: (distractorLetters[2] || targetLetter).h, isTarget: false, popped: false }
    ];

    const cards = this.shuffleArray([...targetCards, ...distractorCards]);

    return {
      modelType: 8,
      instruction: 'TIME ATTACK! KETUK SEMUA KARTU DENGAN BUNYI TARGET:',
      targetRo: targetLetter.ro,
      targetHira: targetLetter.h,
      targetKata: targetLetter.k,
      cards: cards,
      totalTargets: 3,
      poppedTargetsCount: 0
    };
  },

  // -------------------------------------------------------------------------
  // GENERATE SOAL UTAMA
  // -------------------------------------------------------------------------
  startExam: function (isFinal) {
    this.stopAutoPlay();
    if (this.timeAttackTimer) {
      window.clearTimeout(this.timeAttackTimer);
      this.timeAttackTimer = null;
    }

    this.examActive = true;
    this.examIsFinal = isFinal;
    this.examIdx = 0;
    this.examScore = 0;
    this.examStreak = 0;
    this.matchFirstCardIdx = null;

    const config = this.getExamConfig(isFinal);
    this.examRequiredScore = config.requiredScore;
    const totalQuestions = config.totalQuestions;
    this.examActiveModels = config.activeModels;

    const stage = this.getCurrentStage();
    const page = this.getCurrentPage();

    const primaryPool = isFinal ? stage.allLetters : page.letters;
    const secondaryPool = isFinal ? stage.allLetters : (page.availablePool || page.letters);

    this.examQuestions = [];

    // Tentukan model untuk sesi ini:
    // Pada Tes Penguatan (!isFinal): SATU sesi HANYA menggunakan 1 model secara konsisten (5 soal di Tahap 1-2, 10 soal di Tahap 3+)
    // Model akan berganti secara dinamis saat berpindah halaman atau mengulang tes
    let singleSessionModel = null;
    if (!isFinal) {
      let candidatePool = [...this.examActiveModels];
      if (this.lastPenguatanModel && candidatePool.length > 1) {
        const filtered = candidatePool.filter(m => m !== this.lastPenguatanModel);
        if (filtered.length > 0) candidatePool = filtered;
      }
      singleSessionModel = candidatePool[Math.floor(Math.random() * candidatePool.length)];
      this.lastPenguatanModel = singleSessionModel;
    }

    for (let i = 0; i < totalQuestions; i++) {
      // Jika Penguatan: pakai singleSessionModel untuk semua soal dalam sesi ini
      // Jika Ujian Naik Tahap: distribusikan model bergantian sepanjang ujian
      const modelType = !isFinal 
        ? singleSessionModel 
        : this.examActiveModels[i % this.examActiveModels.length];

      let q = null;

      switch (modelType) {
        case 1:
          q = this.generateQ1_Reflex(primaryPool, secondaryPool);
          break;
        case 2:
          q = this.generateQ2_TrueFalse(primaryPool, secondaryPool);
          break;
        case 3:
          q = this.generateQ3_MatchPairs(primaryPool, secondaryPool);
          break;
        case 4:
          q = this.generateQ4_BasketSort(primaryPool, secondaryPool);
          break;
        case 5:
          q = this.generateQ5_AudioKana(primaryPool, secondaryPool);
          break;
        case 6:
          q = this.generateQ6_WordScramble(this.currentStageId);
          break;
        case 7:
          q = this.generateQ7_FillBlank(this.currentStageId, secondaryPool);
          break;
        case 8:
          q = this.generateQ8_TimeAttack(primaryPool, secondaryPool);
          break;
        default:
          q = this.generateQ1_Reflex(primaryPool, secondaryPool);
      }

      this.examQuestions.push(q);
    }

    this.renderExamQuestion();
  },

  getModelName: function (modelType) {
    switch (modelType) {
      case 1: return "Refleks Tebak Cepat";
      case 2: return "Benar atau Salah (True/False)";
      case 3: return "Pasang Kembar (Hira ↔ Kata)";
      case 4: return "Sortir Keranjang (Hira vs Kata)";
      case 5: return "Tebak Dengar Suara";
      case 6: return "Susun Balok Kata";
      case 7: return "Lengkapi Huruf yang Hilang";
      case 8: return "Time Attack!";
      default: return "Latihan Interaktif";
    }
  },

  generateComboOptions: function (l1, l2, pool) {
    const correct = `${l1.ro} - ${l2.ro}`;
    const optionsSet = new Set([correct]);

    if (l1.ro !== l2.ro) {
      optionsSet.add(`${l2.ro} - ${l1.ro}`);
    }

    optionsSet.add(`${l1.ro} - ${l1.ro}`);
    optionsSet.add(`${l2.ro} - ${l2.ro}`);

    const roList = (pool && pool.length > 0) ? pool.map(x => x.ro) : [l1.ro, l2.ro];

    let attempts = 0;
    while (optionsSet.size < 4 && attempts < 100) {
      attempts++;
      const rA = roList[Math.floor(Math.random() * roList.length)];
      const rB = roList[Math.floor(Math.random() * roList.length)];
      const cand = `${rA} - ${rB}`;
      if (cand !== correct) {
        optionsSet.add(cand);
      }
    }

    const fallbackRomaji = ["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "sa", "shi", "su", "se", "so"];
    while (optionsSet.size < 4) {
      const rA = fallbackRomaji[Math.floor(Math.random() * fallbackRomaji.length)];
      const rB = fallbackRomaji[Math.floor(Math.random() * fallbackRomaji.length)];
      optionsSet.add(`${rA} - ${rB}`);
    }

    return Array.from(optionsSet).slice(0, 4);
  },

  shuffleArray: function (arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  },

  // -------------------------------------------------------------------------
  // RENDER SOAL BERDASARKAN MODEL
  // -------------------------------------------------------------------------
  renderExamQuestion: function () {
    const container = document.getElementById('exam-section-card');
    if (!container || !this.examQuestions[this.examIdx]) return;

    if (this.timeAttackTimer) {
      window.clearTimeout(this.timeAttackTimer);
      this.timeAttackTimer = null;
    }

    const q = this.examQuestions[this.examIdx];
    const totalQ = this.examQuestions.length;
    const progressPercent = ((this.examIdx + 1) / totalQ) * 100;
    const isGold = this.examIsFinal;

    let contentHtml = '';

    // HEADER PROGRESS UMUM
    const headerHtml = `
      <div class="exam-active-panel">
        <div class="exam-progress-bar-wrap">
          <div class="exam-progress-fill ${isGold ? 'gold' : ''}" style="width: ${progressPercent}%;"></div>
        </div>

        <div class="exam-meta-bar">
          <span style="color: ${isGold ? 'var(--kata-color)' : 'var(--hira-color)'};">
            SOAL ${this.examIdx + 1} DARI ${totalQ}
          </span>
          <span class="exam-model-badge">
            Model: ${this.getModelName(q.modelType)}
          </span>
          ${this.examStreak >= 2 ? `
            <span class="exam-streak-pill">
              🔥 ${this.examStreak} COMBO!
            </span>
          ` : ''}
          <span style="color: var(--text-dim); font-size: 11px;">
            Target: ≥ ${this.examRequiredScore} Benar
          </span>
        </div>

        <div style="font-size: 12px; font-weight: 800; color: #fff; letter-spacing: 0.5px;">
          ${q.instruction}
        </div>
    `;

    // DISPATCH CONTENT BERDASARKAN MODEL
    switch (q.modelType) {
      case 1:
        contentHtml = this.renderContentQ1(q);
        break;
      case 2:
        contentHtml = this.renderContentQ2(q);
        break;
      case 3:
        contentHtml = this.renderContentQ3(q);
        break;
      case 4:
        contentHtml = this.renderContentQ4(q);
        break;
      case 5:
        contentHtml = this.renderContentQ5(q);
        break;
      case 6:
        contentHtml = this.renderContentQ6(q);
        break;
      case 7:
        contentHtml = this.renderContentQ7(q);
        break;
      case 8:
        contentHtml = this.renderContentQ8(q);
        break;
      default:
        contentHtml = this.renderContentQ1(q);
    }

    container.innerHTML = headerHtml + contentHtml + `</div>`;

    // Pasca-render aksi khusus (seperti putar audio atau timer)
    if (q.modelType === 5) {
      this.speakSingle(q.audioText);
    } else if (q.modelType === 8) {
      this.startTimeAttackCountdown();
    }
  },

  // 1. CONTENT MODEL 1: REFLEKS TEBAK
  renderContentQ1: function (q) {
    return `
      <div class="exam-question-glyph">
        ${q.displayHtml}
      </div>

      <div class="exam-options-grid" id="exam-options-grid">
        ${q.options.map((opt, idx) => `
          <button type="button" class="exam-opt-btn" onclick="KanaApp.submitAnswerQ1('${opt}', this)" data-idx="${idx + 1}">
            <span class="key-hint">${idx + 1}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
    `;
  },

  submitAnswerQ1: function (selectedOpt, btnEl) {
    const q = this.examQuestions[this.examIdx];
    const isCorrect = selectedOpt === q.correctAnswer;
    this.handleGeneralAnswer(isCorrect, btnEl, () => {
      document.querySelectorAll('#exam-options-grid .exam-opt-btn').forEach(b => {
        if (b.textContent.replace(/[0-9]/g, '').trim() === q.correctAnswer) {
          b.classList.add('correct');
        }
      });
    });
  },

  // 2. CONTENT MODEL 2: BENAR ATAU SALAH
  renderContentQ2: function (q) {
    return `
      <div class="exam-question-glyph">
        ${q.displayHtml}
      </div>

      <div class="tf-options-grid" id="tf-options-grid">
        <button type="button" class="btn-tf true-opt" onclick="KanaApp.submitAnswerQ2(true, this)">
          <span>✓</span> <span>BENAR</span>
        </button>
        <button type="button" class="btn-tf false-opt" onclick="KanaApp.submitAnswerQ2(false, this)">
          <span>✗</span> <span>SALAH</span>
        </button>
      </div>
    `;
  },

  submitAnswerQ2: function (userChoice, btnEl) {
    const q = this.examQuestions[this.examIdx];
    const isCorrect = userChoice === q.isClaimTrue;
    this.handleGeneralAnswer(isCorrect, btnEl);
  },

  // 3. CONTENT MODEL 3: MATCH PAIRS
  renderContentQ3: function (q) {
    this.matchFirstCardIdx = null;
    const is8Cards = q.cards.length >= 8;
    return `
      <div class="match-pairs-arena">
        <div class="match-pairs-grid ${is8Cards ? 'grid-cols-4' : 'grid-cols-3'}" id="match-pairs-grid">
          ${q.cards.map((card, idx) => `
            <div class="match-pair-card ${card.matched ? 'matched' : ''}" 
                 id="match-card-${idx}" 
                 onclick="KanaApp.tapMatchCard(${idx})">
              <span class="${card.type === 'hira' ? 'k-char-hira' : 'k-char-kata'}" style="font-size:34px;">
                ${card.glyph}
              </span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  tapMatchCard: function (cardIdx) {
    const q = this.examQuestions[this.examIdx];
    const card = q.cards[cardIdx];
    if (card.matched) return;

    const el = document.getElementById(`match-card-${cardIdx}`);

    if (this.matchFirstCardIdx === null) {
      // Pilih kartu pertama
      this.matchFirstCardIdx = cardIdx;
      el.classList.add('selected');
    } else {
      if (this.matchFirstCardIdx === cardIdx) {
        // Batal pilih kartu yang sama jika diklik ulang
        el.classList.remove('selected');
        this.matchFirstCardIdx = null;
        return;
      }

      const firstCard = q.cards[this.matchFirstCardIdx];
      const firstEl = document.getElementById(`match-card-${this.matchFirstCardIdx}`);

      // Jika pemain mengetuk kartu bertipe sama (misal sama-sama Hiragana atau sama-sama Katakana),
      // ganti kartu terpilih ke kartu baru secara halus tanpa menghukum salah
      if (firstCard.type === card.type) {
        if (firstEl) firstEl.classList.remove('selected');
        this.matchFirstCardIdx = cardIdx;
        el.classList.add('selected');
        return;
      }

      // Verifikasi pasangan: tipe berlawanan (Hiragana <-> Katakana) dan bunyi romaji sama
      const isMatch = (firstCard.ro === card.ro) && (firstCard.type !== card.type);

      if (isMatch) {
        // Cocok!
        firstCard.matched = true;
        card.matched = true;
        if (firstEl) {
          firstEl.classList.remove('selected');
          firstEl.classList.add('matched');
        }
        el.classList.add('matched');
        this.matchFirstCardIdx = null;
        q.matchedPairsCount++;

        // Audio & Particle FX
        this.playSFX('pop');
        const rect = el.getBoundingClientRect ? el.getBoundingClientRect() : null;
        if (rect) {
          this.triggerFXBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 18, ['#34d399', '#6ee7b7', '#fbbf24', '#ffffff']);
        }

        // Jika semua pasangan telah cocok -> Lanjut ke soal berikutnya
        if (q.matchedPairsCount >= q.totalPairs) {
          this.examScore++;
          this.examStreak++;
          this.playSFX('correct', this.examStreak);
          this.showPraiseToast(true, el);
          window.setTimeout(() => this.advanceToNextQuestion(), 650);
        }
      } else {
        // Salah
        this.playSFX('wrong');
        el.classList.add('wrong');
        if (firstEl) firstEl.classList.add('wrong');
        window.setTimeout(() => {
          el.classList.remove('wrong', 'selected');
          if (firstEl) firstEl.classList.remove('wrong', 'selected');
          this.matchFirstCardIdx = null;
        }, 400);
      }
    }
  },

  // 4. CONTENT MODEL 4: SORTIR KERANJANG
  renderContentQ4: function (q) {
    return `
      <div class="basket-sort-arena">
        <div class="basket-item-display">
          <span class="${q.isHira ? 'k-char-hira' : 'k-char-kata'}">${q.glyph}</span>
        </div>

        <div class="baskets-row" id="baskets-row">
          <button type="button" class="basket-btn hira-basket" onclick="KanaApp.submitAnswerQ4('hira', this)">
            <span style="font-size:24px;">🔵</span>
            <span>Keranjang HIRAGANA</span>
          </button>
          <button type="button" class="basket-btn kata-basket" onclick="KanaApp.submitAnswerQ4('kata', this)">
            <span style="font-size:24px;">🟡</span>
            <span>Keranjang KATAKANA</span>
          </button>
        </div>
      </div>
    `;
  },

  submitAnswerQ4: function (chosenBasket, btnEl) {
    const q = this.examQuestions[this.examIdx];
    const isCorrect = chosenBasket === q.correctBasket;
    this.handleGeneralAnswer(isCorrect, btnEl);
  },

  // 5. CONTENT MODEL 5: TEBAK DENGAR SUARA
  renderContentQ5: function (q) {
    return `
      <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
        <button type="button" class="audio-play-prompt-btn" onclick="KanaApp.speakSingle('${q.audioText}')">
          <span>🔊</span> <span>Putar Ulang Suara</span>
        </button>
      </div>

      <div class="exam-options-grid" id="exam-options-grid">
        ${q.options.map((opt, idx) => `
          <button type="button" class="exam-opt-btn" onclick="KanaApp.submitAnswerQ5('${opt}', this)" data-idx="${idx + 1}">
            <span class="key-hint">${idx + 1}</span>
            <span style="font-size:26px; font-weight:900;">${opt}</span>
          </button>
        `).join('')}
      </div>
    `;
  },

  submitAnswerQ5: function (chosenOpt, btnEl) {
    const q = this.examQuestions[this.examIdx];
    const isCorrect = chosenOpt === q.correctAnswer;
    this.handleGeneralAnswer(isCorrect, btnEl, () => {
      document.querySelectorAll('#exam-options-grid .exam-opt-btn').forEach(b => {
        if (b.textContent.replace(/[0-9]/g, '').trim() === q.correctAnswer) {
          b.classList.add('correct');
        }
      });
    });
  },

  // 6. CONTENT MODEL 6: SUSUN BALOK KATA
  renderContentQ6: function (q) {
    return `
      <div class="scramble-arena">
        <div class="scramble-word-hint">
          Kata: "<b>${q.wordRo.toUpperCase()}</b>" (${q.meaning})
        </div>

        <div class="scramble-slots-row" id="scramble-slots-row">
          ${q.slots.map((val, idx) => `
            <div class="scramble-slot ${val ? 'filled' : ''}" onclick="KanaApp.tapScrambleSlot(${idx})">
              ${val ? val.char : ''}
            </div>
          `).join('')}
        </div>

        <div style="font-size:11px; color:var(--text-dim);">Ketuk balok di bawah untuk menyusun:</div>

        <div class="scramble-tiles-row" id="scramble-tiles-row">
          ${q.scrambledTiles.map((tile, idx) => `
            <div class="scramble-tile ${tile.used ? 'used' : ''}" 
                 id="scramble-tile-${tile.id}" 
                 onclick="KanaApp.tapScrambleTile(${tile.id})">
              ${tile.char}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  tapScrambleTile: function (tileId) {
    const q = this.examQuestions[this.examIdx];
    const tile = q.scrambledTiles.find(t => t.id === tileId);
    if (!tile || tile.used) return;

    // Cari slot kosong pertama
    const emptySlotIdx = q.slots.findIndex(s => s === null);
    if (emptySlotIdx === -1) return;

    tile.used = true;
    q.slots[emptySlotIdx] = { tileId: tile.id, char: tile.char };

    this.updateScrambleUI();

    // Jika seluruh slot telah terisi -> Cek jawaban
    if (q.slots.every(s => s !== null)) {
      const spelled = q.slots.map(s => s.char).join('');
      const isCorrect = spelled === q.targetKana;

      if (isCorrect) {
        document.querySelectorAll('.scramble-slot').forEach(el => el.classList.add('correct'));
        this.examScore++;
        this.examStreak++;
        this.playSFX('correct', this.examStreak);
        const slotsRow = document.getElementById('scramble-slots-row');
        const rect = slotsRow && slotsRow.getBoundingClientRect ? slotsRow.getBoundingClientRect() : null;
        if (rect) {
          this.triggerFXBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 28);
        }
        this.showPraiseToast(true, slotsRow);
        window.setTimeout(() => this.advanceToNextQuestion(), 700);
      } else {
        this.examStreak = 0;
        this.playSFX('wrong');
        document.querySelectorAll('.scramble-slot').forEach(el => el.classList.add('wrong'));
        this.showPraiseToast(false, document.getElementById('scramble-slots-row'));
        window.setTimeout(() => {
          // Reset balok
          q.slots = new Array(q.targetChars.length).fill(null);
          q.scrambledTiles.forEach(t => t.used = false);
          this.updateScrambleUI();
        }, 600);
      }
    }
  },

  tapScrambleSlot: function (slotIdx) {
    const q = this.examQuestions[this.examIdx];
    const item = q.slots[slotIdx];
    if (!item) return;

    const tile = q.scrambledTiles.find(t => t.id === item.tileId);
    if (tile) tile.used = false;

    q.slots[slotIdx] = null;
    this.updateScrambleUI();
  },

  updateScrambleUI: function () {
    const q = this.examQuestions[this.examIdx];
    const slotsRow = document.getElementById('scramble-slots-row');
    const tilesRow = document.getElementById('scramble-tiles-row');

    if (slotsRow) {
      slotsRow.innerHTML = q.slots.map((val, idx) => `
        <div class="scramble-slot ${val ? 'filled' : ''}" onclick="KanaApp.tapScrambleSlot(${idx})">
          ${val ? val.char : ''}
        </div>
      `).join('');
    }

    if (tilesRow) {
      tilesRow.innerHTML = q.scrambledTiles.map(tile => `
        <div class="scramble-tile ${tile.used ? 'used' : ''}" 
             id="scramble-tile-${tile.id}" 
             onclick="KanaApp.tapScrambleTile(${tile.id})">
          ${tile.char}
        </div>
      `).join('');
    }
  },

  // 7. CONTENT MODEL 7: LENGKAPI HURUF YANG HILANG
  renderContentQ7: function (q) {
    return `
      <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
        <div class="fill-word-display">
          ${q.chars.map((c, i) => i === q.blankIdx 
            ? `<span class="fill-blank-box">❓</span>` 
            : `<span class="k-char-hira">${c}</span>`
          ).join('')}
        </div>
        <div style="font-size:13px; font-weight:800; color:var(--text-sub);">
          Kata: "<b>${q.wordRo.toUpperCase()}</b>" (${q.meaning})
        </div>
      </div>

      <div class="exam-options-grid" id="exam-options-grid">
        ${q.options.map((opt, idx) => `
          <button type="button" class="exam-opt-btn" onclick="KanaApp.submitAnswerQ7('${opt}', this)" data-idx="${idx + 1}">
            <span class="key-hint">${idx + 1}</span>
            <span style="font-size:26px; font-weight:900;">${opt}</span>
          </button>
        `).join('')}
      </div>
    `;
  },

  submitAnswerQ7: function (chosenOpt, btnEl) {
    const q = this.examQuestions[this.examIdx];
    const isCorrect = chosenOpt === q.correctAnswer;
    this.handleGeneralAnswer(isCorrect, btnEl, () => {
      document.querySelectorAll('#exam-options-grid .exam-opt-btn').forEach(b => {
        if (b.textContent.replace(/[0-9]/g, '').trim() === q.correctAnswer) {
          b.classList.add('correct');
        }
      });
    });
  },

  // 8. CONTENT MODEL 8: TIME ATTACK
  renderContentQ8: function (q) {
    return `
      <div class="time-attack-arena">
        <div class="time-attack-timer-track">
          <div class="time-attack-timer-fill" id="ta-timer-fill" style="width: 100%;"></div>
        </div>

        <div style="font-size:13px; font-weight:900; color:var(--kata-color);">
          ⚡ Ketuk SEMUA huruf <b>"${q.targetRo.toUpperCase()}"</b> (${q.targetHira} / ${q.targetKata})! Target: 3 kartu
        </div>

        <div class="time-attack-grid" id="time-attack-grid">
          ${q.cards.map((card, idx) => `
            <div class="time-attack-card ${card.popped ? 'popped' : ''}" 
                 id="ta-card-${idx}" 
                 onclick="KanaApp.tapTimeAttackCard(${idx})">
              <span>${card.char}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  startTimeAttackCountdown: function () {
    const q = this.examQuestions[this.examIdx];
    const TOTAL_MS = 7000;
    const intervalMs = 100;
    let elapsedMs = 0;

    const timerStep = () => {
      if (!this.examActive || this.examQuestions[this.examIdx] !== q) return;

      elapsedMs += intervalMs;
      const fill = document.getElementById('ta-timer-fill');
      if (fill) {
        const remainingPct = Math.max(0, 100 - (elapsedMs / TOTAL_MS) * 100);
        fill.style.width = `${remainingPct}%`;
      }

      if (elapsedMs >= TOTAL_MS) {
        // Waktu habis!
        this.timeAttackTimer = null;
        const grid = document.getElementById('time-attack-grid');
        if (grid) grid.classList.add('wrong');
        window.setTimeout(() => this.advanceToNextQuestion(), 600);
      } else {
        this.timeAttackTimer = window.setTimeout(timerStep, intervalMs);
      }
    };

    this.timeAttackTimer = window.setTimeout(timerStep, intervalMs);
  },

  tapTimeAttackCard: function (cardIdx) {
    const q = this.examQuestions[this.examIdx];
    const card = q.cards[cardIdx];
    if (card.popped) return;

    const el = document.getElementById(`ta-card-${cardIdx}`);

    if (card.isTarget) {
      card.popped = true;
      el.classList.add('popped');
      q.poppedTargetsCount++;

      this.playSFX('pop');
      const rect = el.getBoundingClientRect ? el.getBoundingClientRect() : null;
      if (rect) {
        this.triggerFXBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 14, ['#fbbf24', '#f59e0b', '#ffffff']);
      }

      // Jika ketiga target berhasil diketuk sebelum waktu habis!
      if (q.poppedTargetsCount >= q.totalTargets) {
        if (this.timeAttackTimer) {
          window.clearTimeout(this.timeAttackTimer);
          this.timeAttackTimer = null;
        }
        this.examScore++;
        this.examStreak++;
        this.playSFX('correct', this.examStreak);
        this.showPraiseToast(true, el);
        window.setTimeout(() => this.advanceToNextQuestion(), 600);
      }
    } else {
      // Salah ketuk kartu bukan target!
      this.playSFX('wrong');
      el.classList.add('wrong');
      window.setTimeout(() => el.classList.remove('wrong'), 400);
    }
  },

  // -------------------------------------------------------------------------
  // HANDLER JAWABAN UMUM & NAVIGASI SOAL
  // -------------------------------------------------------------------------
  handleGeneralAnswer: function (isCorrect, btnEl, onWrongHighlight) {
    if (btnEl && btnEl.parentElement) {
      btnEl.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);
    }

    const rect = btnEl && btnEl.getBoundingClientRect ? btnEl.getBoundingClientRect() : null;
    const x = rect ? (rect.left + rect.width / 2) : (typeof window !== 'undefined' ? window.innerWidth / 2 : 200);
    const y = rect ? (rect.top + rect.height / 2) : (typeof window !== 'undefined' ? window.innerHeight / 2 : 200);

    if (isCorrect) {
      this.examScore++;
      this.examStreak++;
      if (btnEl) btnEl.classList.add('correct');
      this.playSFX('correct', this.examStreak);
      this.triggerFXBurst(x, y);
      this.showPraiseToast(true, btnEl);
    } else {
      this.examStreak = 0;
      if (btnEl) btnEl.classList.add('wrong');
      if (onWrongHighlight) onWrongHighlight();
      this.playSFX('wrong');
      this.showPraiseToast(false, btnEl);
    }

    window.setTimeout(() => this.advanceToNextQuestion(), 750);
  },

  advanceToNextQuestion: function () {
    this.examIdx++;
    if (this.examIdx < this.examQuestions.length) {
      this.renderExamQuestion();
    } else {
      this.renderExamResult();
    }
  },

  renderExamResult: function () {
    const container = document.getElementById('exam-section-card');
    if (!container) return;

    if (this.timeAttackTimer) {
      window.clearTimeout(this.timeAttackTimer);
      this.timeAttackTimer = null;
    }

    const totalQ = this.examQuestions.length;
    const passed = this.examScore >= this.examRequiredScore;
    const isPerfect = this.examScore === totalQ;
    const stage = this.getCurrentStage();

    const stars = isPerfect ? '⭐⭐⭐' : (passed ? '⭐⭐' : '⭐');
    const rankTitle = isPerfect ? 'Sempurna! (100% Akurat)' : (passed ? 'Lolos Kriteria Kelancaran' : 'Belum Mencapai Target');

    if (passed) {
      this.playSFX('win');
      this.triggerConfetti(this.examIsFinal ? 3200 : 2000);

      if (this.examIsFinal) {
        const nextStage = KANA_STAGES.find(s => s.stageId === this.currentStageId + 1);
        if (nextStage) {
          this.unlockPage(nextStage.stageId, 1);
        }

        container.innerHTML = `
          <div class="exam-result-panel">
            <div class="result-stars-row">${stars}</div>
            <div class="result-badge-text" style="color:var(--kata-color);">🏆 LULUS TAHAP ${this.currentStageId}!</div>
            <div class="result-score-val">${this.examScore} / ${totalQ} Benar</div>
            <div style="font-size:12.5px; color:var(--success); font-weight:800;">${rankTitle}</div>
            <p class="exam-desc-text">
              Luar biasa! Seluruh tantangan pada <b>${stage.stageName}</b> telah Anda tuntaskan dengan lancar!
              ${nextStage ? `Tahap berikutnya (${nextStage.stageShort}) sekarang telah terbuka.` : 'Selamat! Anda telah menuntaskan seluruh silabus Kana!'}
            </p>
            <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin-top:8px;">
              ${nextStage ? `
                <button type="button" class="btn-next-page-gate" onclick="KanaApp.goToStagePage(${nextStage.stageId}, 1)">
                  🚀 Masuk ke ${nextStage.stageShort} ›
                </button>
              ` : ''}
              <button type="button" class="btn-start-exam gold" onclick="KanaApp.startExam(true)">
                🔄 Ulangi Ujian (Paket Soal Baru)
              </button>
            </div>
          </div>
        `;
      } else {
        const nextPage = stage.pages.find(p => p.pageId === this.currentPageId + 1);
        if (nextPage) {
          this.unlockPage(this.currentStageId, nextPage.pageId);
        }

        container.innerHTML = `
          <div class="exam-result-panel">
            <div class="result-stars-row">${stars}</div>
            <div class="result-badge-text" style="color:var(--success);">🎉 PENGUATAN TUNTAS!</div>
            <div class="result-score-val">${this.examScore} / ${totalQ} Benar</div>
            <div style="font-size:12.5px; color:var(--success); font-weight:800;">${rankTitle}</div>
            <p class="exam-desc-text">
              Kerja bagus! Ingatan aksara Anda semakin kuat. Pasangan huruf berikutnya di tahap ini telah terbuka!
            </p>
            <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin-top:8px;">
              ${nextPage ? `
                <button type="button" class="btn-next-page-gate" onclick="KanaApp.goToStagePage(${this.currentStageId}, ${nextPage.pageId})">
                  Lanjut ke Hal ${nextPage.pageId} ›
                </button>
              ` : ''}
              <button type="button" class="btn-start-exam" onclick="KanaApp.startExam(false)">
                🔄 Latihan Penguatan Lagi (Variasi Baru)
              </button>
            </div>
          </div>
        `;
      }
    } else {
      container.innerHTML = `
        <div class="exam-result-panel">
          <div class="result-stars-row">${stars}</div>
          <div class="result-badge-text" style="color:var(--danger);">Belum Lolos Kriteria</div>
          <div class="result-score-val" style="color:var(--text-sub);">${this.examScore} / ${totalQ} Benar</div>
          <p class="exam-desc-text">
            Dibutuhkan minimal <b>${this.examRequiredScore} jawaban benar</b>. Silakan gunakan fitur <b>Putar Otomatis</b> untuk melatih kembali telinga dan mata, lalu coba lagi!
          </p>
          <button type="button" class="btn-start-exam" onclick="KanaApp.startExam(${this.examIsFinal})">
            🔄 Coba Ulangi Ujian Sekarang
          </button>
        </div>
      `;
    }
  },

  // -------------------------------------------------------------------------
  // 9. KEYBOARD EVENT LISTENER
  // -------------------------------------------------------------------------
  setupKeyboardEvents: function () {
    window.addEventListener('keydown', (e) => {
      // Tombol 1-4 untuk pilihan ganda (Model 1, Model 5, Model 7)
      if (this.examActive) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const num = parseInt(e.key, 10);
          const grid = document.getElementById('exam-options-grid');
          if (grid) {
            const btn = grid.querySelector(`[data-idx="${num}"]`);
            if (btn && !btn.disabled) {
              btn.click();
              return;
            }
          }
        }
      }

      if (e.key === 'ArrowLeft') {
        this.stepPage(-1);
      } else if (e.key === 'ArrowRight') {
        this.stepPage(1);
      } else if (e.key === 'Escape') {
        this.toggleDropdown(false);
      }
    });
  }
};

if (typeof window !== 'undefined') {
  window.KanaApp = KanaApp;
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  KanaApp.init();
});

if (typeof window !== 'undefined') {
  window.KanaApp = KanaApp;
}
