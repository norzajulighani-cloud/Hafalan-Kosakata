// DOJO & MARKET ENGINE (MANAJEMEN RUANG & DECK)
// ==========================================
const DojoEngine = {
  playerUnlockedDay: 1,
  activeMainTab: 'market', // 'market', 'flashcard', or 'quiz'
  activeFilter: 'all',
  searchQuery: '',
  
  // Clean Leitner Study & Mastery System
  myKanji: [], // Kanji currently in study deck
  masteredKanji: [], // Kanji that have been starred / mastered (⭐)

  // Training Deck States (Unmastered active review queue)
  trainingList: [],
  quizPool: [],
  deckIdx: 0,
  isRevealed: false,
  dojoMode: 'fc', // 'fc' or 'quiz'
  
  // Market Chunk / Lazy Batch Rendering States
  filteredMarketList: [],
  marketRenderedCount: 0,
  _marketObserver: null,
  _searchTimer: null,
  
  // Drill multi-variations & telemetry states
  quizTarget: null,
  drillType: 'mix', // 'mix', 'meaning', 'reading', 'kanji', 'blitz'
  drillStreak: 0,
  drillScore: 0,
  currentQuestionData: null,
  currentSentenceText: '',

  init: function() {
    // 1. Baca hari ekspedisi dari Yomikata utama
    let savedDay = parseInt(localStorage.getItem('yk_unlocked')) || parseInt(localStorage.getItem('yk_unlocked_day')) || 1;
    this.playerUnlockedDay = Math.max(1, savedDay);

    const chipUnlocked = document.getElementById('fchip-unlocked');
    if (chipUnlocked) {
      chipUnlocked.innerText = `⛩️ Dari Ekspedisi (Hari 1 - ${this.playerUnlockedDay})`;
    }

    // 2. Baca kanji yang sudah dikuasai (⭐)
    let savedMaster = localStorage.getItem('yk_kanji_mastered');
    if (savedMaster) {
      try { this.masteredKanji = JSON.parse(savedMaster); } catch(e) { this.masteredKanji = []; }
    } else {
      this.masteredKanji = [];
    }

    // 3. Baca kanji yang sedang dipelajari (myKanji)
    let savedMyKanji = localStorage.getItem('yk_my_kanji');
    if (savedMyKanji) {
      try { this.myKanji = JSON.parse(savedMyKanji); } catch(e) { this.myKanji = []; }
    } else {
      // Migrasi halus dari sistem room lama (jika ada)
      let savedRooms = localStorage.getItem('yk_kanji_dojo_rooms');
      if (savedRooms) {
        try {
          const r = JSON.parse(savedRooms);
          const oldList = (r['default'] && r['default'].kanji) || [];
          this.myKanji = [...new Set(oldList)];
        } catch(e) { this.myKanji = []; }
      }
      // Jika masih kosong, beri starter pack N5 resmi Hari 1-2
      if (!this.myKanji || this.myKanji.length === 0) {
        this.myKanji = ['私', '人', '日', '本', '先', '生', '学', '校', '年', '大'];
      }
      this.saveStudyData();
    }

    this.updateStats();
    this.renderMarket();
    this.loadTrainingDeck();

    // 4. Keyboard Shortcuts for Fluid Interaction
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        DojoEngine.closeDrillDropdown();
        DojoEngine.closeSidebar();
        DojoEngine.closeGuide();
        return;
      }

      if (DojoEngine.activeMainTab === 'quiz') {
        const nextBtn = document.getElementById('btn-quiz-next');
        if (nextBtn && !nextBtn.classList.contains('hidden') && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight')) {
          e.preventDefault();
          DojoEngine.triggerNextQuestionWithAnim();
          return;
        }
        if (['1', '2', '3', '4'].includes(e.key)) {
          const idx = parseInt(e.key) - 1;
          const opts = document.querySelectorAll('.btn-quiz-opt');
          if (opts && opts[idx] && !opts[idx].disabled) {
            opts[idx].click();
          }
        }
      } else if (DojoEngine.activeMainTab === 'flashcard') {
        if (e.key === 'ArrowRight' || e.key === 'Enter') {
          DojoEngine.nextDojoCard();
        } else if (e.key === 'ArrowLeft') {
          DojoEngine.prevDojoCard();
        } else if (e.key === ' ') {
          e.preventDefault();
          DojoEngine.toggleFcReveal();
        } else if (e.key.toLowerCase() === 'm' || e.key === '*') {
          DojoEngine.toggleMasterCurrent();
        }
      }
    });
  },

  saveStudyData: function() {
    localStorage.setItem('yk_my_kanji', JSON.stringify(this.myKanji));
    localStorage.setItem('yk_kanji_mastered', JSON.stringify(this.masteredKanji));
  },

  toggleSidebar: function() {
    const sb = document.getElementById('dojo-sidebar');
    if (sb && sb.classList.contains('active')) {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
  },

  openSidebar: function() {
    const sb = document.getElementById('dojo-sidebar');
    const ov = document.getElementById('sidebar-overlay');
    if (sb) sb.classList.add('active');
    if (ov) ov.classList.add('active');
    this.syncBodyScrollLock();
  },

  closeSidebar: function() {
    const sb = document.getElementById('dojo-sidebar');
    const ov = document.getElementById('sidebar-overlay');
    if (sb) sb.classList.remove('active');
    if (ov) ov.classList.remove('active');
    this.syncBodyScrollLock();
  },

  _savedScrollY: 0,
  syncBodyScrollLock: function() {
    const sb = document.getElementById('dojo-sidebar');
    const gm = document.getElementById('guide-modal');
    const isSidebarActive = Boolean(sb && sb.classList.contains('active'));
    const isGuideModalActive = Boolean(gm && !gm.classList.contains('hidden'));
    const shouldLock = isSidebarActive || isGuideModalActive;

    const isLocked = document.body.classList.contains('drawer-open');
    if (shouldLock && !isLocked) {
      this._savedScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      document.documentElement.classList.add('drawer-open');
      document.body.classList.add('drawer-open');
      document.body.style.top = `-${this._savedScrollY}px`;
    } else if (!shouldLock && isLocked) {
      const restoreY = this._savedScrollY || 0;
      document.documentElement.classList.remove('drawer-open');
      document.body.classList.remove('drawer-open');
      document.body.style.top = '';
      window.scrollTo(0, restoreY);
    }
  },

  updateStats: function() {
    const totalCatalog = KANJI_CATALOG.length;
    const learningCount = this.myKanji.filter(k => !this.masteredKanji.includes(k)).length;
    const masteredCount = this.masteredKanji.length;
    const totalStudied = this.myKanji.length;
    const pct = totalStudied > 0 ? Math.round((masteredCount / totalStudied) * 100) : 0;
    const globalPct = Math.round((masteredCount / totalCatalog) * 100);

    // Top Torii Mastered Badge
    const navBadge = document.getElementById('nav-mastered-badge');
    if (navBadge) navBadge.innerText = `⭐ ${masteredCount}`;


    // Sidebar indicators
    const sbLearning = document.getElementById('sidebar-learning-count');
    if (sbLearning) sbLearning.innerText = `${learningCount} Kanji`;

    const sbMastered = document.getElementById('sidebar-mastered-count');
    if (sbMastered) sbMastered.innerText = `${masteredCount} Kanji`;

    const fillEl = document.getElementById('dojo-progress-fill');
    if (fillEl) fillEl.style.width = `${globalPct}%`;

    const pctEl = document.getElementById('dojo-progress-text');
    if (pctEl) pctEl.innerText = `${masteredCount} / ${totalCatalog} (${globalPct}%)`;

    // Filter chip counts
    const chipInDojo = document.getElementById('fchip-in-dojo');
    if (chipInDojo) chipInDojo.innerText = `🎒 Sedang Dilatih (${learningCount})`;

    const chipMastered = document.getElementById('fchip-mastered');
    if (chipMastered) chipMastered.innerText = `⭐ Sudah Dikuasai (${masteredCount})`;
  },

  openMasteredGallery: function() {
    this.switchMainTab('market');
    this.setFilter('mastered');
  },

  // --- PASAR BELANJA KANJI (CHUNK LAZY RENDERING ENGINE) ---
  setFilter: function(filterType) {
    this.activeFilter = filterType;
    ['all', 'unlocked', 'n5', 'n4', 'in-dojo', 'mastered'].forEach(f => {
      const chip = document.getElementById(`fchip-${f}`);
      if (chip) chip.classList.toggle('active', f === filterType);
    });
    this.renderMarket(true);
  },

  onSearch: function(q) {
    this.searchQuery = q.trim().toLowerCase();
    const clearBtn = document.getElementById('market-search-clear');
    if (clearBtn) clearBtn.classList.toggle('hidden', this.searchQuery.length === 0);
    clearTimeout(this._searchTimer);
    this._searchTimer = setTimeout(() => {
      this.renderMarket(true);
    }, 180);
  },

  clearSearch: function() {
    const input = document.getElementById('market-search');
    if (input) { input.value = ''; input.focus(); }
    const clearBtn = document.getElementById('market-search-clear');
    if (clearBtn) clearBtn.classList.add('hidden');
    this.searchQuery = '';
    this.renderMarket(true);
  },

  renderMarket: function(resetScroll = true) {
    const container = document.getElementById('market-grid-container');
    if (!container) return;

    let list = [...KANJI_CATALOG];

    // Filter Kategori
    if (this.activeFilter === 'unlocked') {
      list = list.filter(item => item.day <= this.playerUnlockedDay);
      list.sort((a, b) => a.day - b.day);
    } else if (this.activeFilter === 'n5') {
      list = list.filter(item => item.lvl === 'N5');
    } else if (this.activeFilter === 'n4') {
      list = list.filter(item => item.lvl === 'N4');
    } else if (this.activeFilter === 'in-dojo') {
      list = list.filter(item => this.myKanji.includes(item.k) && !this.masteredKanji.includes(item.k));
    } else if (this.activeFilter === 'mastered') {
      list = list.filter(item => this.masteredKanji.includes(item.k));
    }

    // Filter Pencarian
    if (this.searchQuery) {
      let q = this.searchQuery;
      list = list.filter(item => {
        let matchK = item.k.includes(q);
        let matchA = item.a.toLowerCase().includes(q);
        let matchOn = item.on.toLowerCase().includes(q);
        let matchKun = item.kun.toLowerCase().includes(q);
        return matchK || matchA || matchOn || matchKun;
      });
    }

    this.filteredMarketList = list;
    this.marketRenderedCount = 0;

    if (list.length === 0) {
      let msg = "Tidak ada kanji yang sesuai dengan filter atau kata kunci.";
      if (this.activeFilter === 'mastered') {
        msg = "Belum ada kanji yang kamu kuasai. Buka Flashcard dan beri tanda ⭐ pada kanji yang sudah kamu hafal!";
      } else if (this.activeFilter === 'in-dojo') {
        msg = "Tidak ada kanji yang sedang dilatih. Tekan '+ Ambil' pada kanji yang ingin kamu pelajari!";
      }
      container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--text-sub);">${msg}</div>`;
      return;
    }

    // Initialize scroll listener & observer early
    this.setupMarketInfiniteScroll();

    // Render first batch of 36 cards (Instant <10ms)
    container.innerHTML = '';
    this.renderMoreMarketCards();
  },

  buildMarketCardHtml: function(item) {
    let isMaster = this.masteredKanji.includes(item.k);
    let inStudy = this.myKanji.includes(item.k);
    let lvlClass = item.lvl === 'N5' ? 'tag-n5' : 'tag-n4';
    let dayBadge = item.day <= this.playerUnlockedDay 
      ? 'Hari ' + item.day 
      : (item.day <= 30 ? 'Hari ' + item.day + ' 🔒' : 'Ekstra N4');

    let btnText = '+ Ambil';
    let btnClass = 'is-add';
    if (isMaster) {
      btnText = '⭐ Dikuasai';
      btnClass = 'is-mastered';
    } else if (inStudy) {
      btnText = '✓ Di Latihan';
      btnClass = 'is-in-dojo';
    }

    const readingForDisplay = (item.kun && item.kun !== '-') ? item.kun : (item.on && item.on !== '-' ? item.on : '');
    const audioReading = (item.kun && item.kun !== '-') ? item.kun : (item.on && item.on !== '-' ? item.on : '');

    return `
      <div class="kanji-market-card ${isMaster ? 'card-mastered' : ''}" data-kanji="${item.k}">
        <div class="card-top-meta">
          <span class="tag-level ${lvlClass}">${item.lvl}</span>
          <div class="card-meta-right">
            <span class="tag-source">${dayBadge}</span>
            <button type="button" class="btn-card-audio" onclick="DojoEngine.speakKanji('${item.k}', '${audioReading.replace(/'/g, "\\'")}', event)" title="Dengarkan Pengucapan">🔊</button>
          </div>
        </div>

        <div class="card-kanji-hero">${item.k}</div>
        <div class="card-arti-label">${item.a}</div>
        <div class="card-readings-hint">${readingForDisplay}</div>

        <button type="button" class="btn-cart-toggle ${btnClass}" onclick="DojoEngine.toggleKanjiCard('${item.k}', event)">
          <span>${btnText}</span>
        </button>
      </div>
    `;
  },

  renderMoreMarketCards: function() {
    const container = document.getElementById('market-grid-container');
    if (!container || !this.filteredMarketList) return;

    if (this._isRenderingMarket) return;
    this._isRenderingMarket = true;

    const oldSentinel = document.getElementById('market-scroll-sentinel');
    if (oldSentinel) {
      if (this._marketObserver) {
        this._marketObserver.unobserve(oldSentinel);
      }
      oldSentinel.remove();
    }

    const batchSize = 36;
    const nextBatch = this.filteredMarketList.slice(this.marketRenderedCount, this.marketRenderedCount + batchSize);
    
    if (nextBatch.length > 0) {
      const html = nextBatch.map(item => this.buildMarketCardHtml(item)).join('');
      container.insertAdjacentHTML('beforeend', html);
      this.marketRenderedCount += nextBatch.length;
    }

    // Attach sentinel with interactive load-more fallback if remaining
    if (this.marketRenderedCount < this.filteredMarketList.length) {
      const remaining = this.filteredMarketList.length - this.marketRenderedCount;
      const sentinel = document.createElement('div');
      sentinel.id = 'market-scroll-sentinel';
      sentinel.className = 'market-load-more-row';
      sentinel.innerHTML = `
        <button type="button" class="btn-load-more-kanji" onclick="DojoEngine.renderMoreMarketCards()">
          <span>⬇️ Tampilkan Lebih Banyak (${remaining} lagi)</span>
        </button>
      `;
      container.appendChild(sentinel);

      if (this._marketObserver) {
        this._marketObserver.observe(sentinel);
      }
    } else if (this.filteredMarketList.length > 36) {
      const endBadge = document.createElement('div');
      endBadge.className = 'all-kanji-loaded-badge';
      endBadge.innerHTML = `<span>✨ Semua ${this.filteredMarketList.length} kanji telah ditampilkan</span>`;
      container.appendChild(endBadge);
    }

    this._isRenderingMarket = false;
  },

  setupMarketInfiniteScroll: function() {
    if (!this._scrollListenerAttached) {
      this._scrollListenerAttached = true;
      // Dual-layer safety: window scroll listener fires automatically on all mobile & desktop browsers
      window.addEventListener('scroll', () => {
        if (DojoEngine.activeMainTab !== 'market') return;
        const sentinel = document.getElementById('market-scroll-sentinel');
        if (sentinel && !DojoEngine._isRenderingMarket) {
          const rect = sentinel.getBoundingClientRect();
          if (rect.top <= window.innerHeight + 350) {
            DojoEngine.renderMoreMarketCards();
          }
        }
      }, { passive: true });
    }

    if (!this._marketObserver && 'IntersectionObserver' in window) {
      this._marketObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            DojoEngine.renderMoreMarketCards();
          }
        });
      }, { rootMargin: '400px 0px' });
    }
  },

  toggleKanjiCard: function(kanjiChar, evt) {
    if (evt) evt.stopPropagation();
    let isMaster = this.masteredKanji.includes(kanjiChar);
    let inStudy = this.myKanji.includes(kanjiChar);

    if (isMaster) {
      // Re-study mastered kanji
      this.masteredKanji = this.masteredKanji.filter(k => k !== kanjiChar);
      if (!this.myKanji.includes(kanjiChar)) this.myKanji.push(kanjiChar);
      this.showToast(`🔄 Kanji ${kanjiChar} dikembalikan ke antrean latihan.`);
    } else if (inStudy) {
      // Remove from active study
      this.myKanji = this.myKanji.filter(k => k !== kanjiChar);
      this.showToast(`🗑️ Kanji ${kanjiChar} dikeluarkan dari latihan.`);
    } else {
      // Add to active study
      this.myKanji.push(kanjiChar);
      this.showToast(`🛒 Kanji ${kanjiChar} ditambahkan ke latihan!`);
    }

    this.saveStudyData();
    this.updateStats();
    this.loadTrainingDeck();

    // If currently filtered by 'in-dojo' or 'mastered', re-render view
    if (this.activeFilter === 'in-dojo' || this.activeFilter === 'mastered') {
      this.renderMarket(false);
      return;
    }

    // Targeted DOM mutation for instant 60fps response
    const card = document.querySelector(`.kanji-market-card[data-kanji="${kanjiChar}"]`);
    if (card) {
      let nowMaster = this.masteredKanji.includes(kanjiChar);
      let nowStudy = this.myKanji.includes(kanjiChar);
      card.classList.toggle('card-mastered', nowMaster);
      const btn = card.querySelector('.btn-cart-toggle');
      if (btn) {
        if (nowMaster) {
          btn.className = 'btn-cart-toggle is-mastered';
          btn.innerHTML = '<span>⭐ Dikuasai</span>';
        } else if (nowStudy) {
          btn.className = 'btn-cart-toggle is-in-dojo';
          btn.innerHTML = '<span>✓ Di Latihan</span>';
        } else {
          btn.className = 'btn-cart-toggle is-add';
          btn.innerHTML = '<span>+ Ambil</span>';
        }
      }
    }
  },

  // Backward compatibility alias for toggleKanjiToDojo
  toggleKanjiToDojo: function(kanjiChar, evt) {
    this.toggleKanjiCard(kanjiChar, evt);
  },

  // --- RUANG LATIHAN DOJO ENGINE ---
  switchMainTab: function(tabName) {
    if (tabName === 'training') {
      tabName = this.dojoMode === 'quiz' ? 'quiz' : 'flashcard';
    }
    this.activeMainTab = tabName;

    const isMarket = tabName === 'market';
    const isFlashcard = tabName === 'flashcard';
    const isQuiz = tabName === 'quiz';

    const tabMarketEl = document.getElementById('tab-market');
    const tabFcEl = document.getElementById('tab-flashcard');
    const tabQuizEl = document.getElementById('tab-quiz');

    if (tabMarketEl) tabMarketEl.classList.toggle('active', isMarket);
    if (tabFcEl) tabFcEl.classList.toggle('active', isFlashcard);
    if (tabQuizEl) tabQuizEl.classList.toggle('active', isQuiz);

    const secMarket = document.getElementById('section-market');
    const secTraining = document.getElementById('section-training');

    if (secMarket) secMarket.classList.toggle('hidden', !isMarket);
    if (secTraining) secTraining.classList.toggle('hidden', isMarket);

    if (isFlashcard) {
      this.dojoMode = 'fc';
      this.loadTrainingDeck();
    } else if (isQuiz) {
      this.dojoMode = 'quiz';
      this.loadTrainingDeck();
    }
  },

  loadTrainingDeck: function() {
    const unmastered = KANJI_CATALOG.filter(item => this.myKanji.includes(item.k) && !this.masteredKanji.includes(item.k));
    const allStudied = KANJI_CATALOG.filter(item => this.myKanji.includes(item.k));

    // Flashcard deck only reviews unmastered kanji
    this.trainingList = unmastered;
    if (this.deckIdx >= this.trainingList.length) {
      this.deckIdx = Math.max(0, this.trainingList.length - 1);
    }

    const emptyBox = document.getElementById('dojo-empty-state');
    const emptyIcon = document.getElementById('empty-state-icon');
    const emptyTitle = document.getElementById('empty-state-title');
    const emptyDesc = document.getElementById('empty-state-desc');
    const emptyActions = document.getElementById('empty-state-actions');

    const fcHeader = document.getElementById('dojo-fc-header');
    const fcBox = document.getElementById('dojo-fc-container');
    const quizBox = document.getElementById('dojo-quiz-container');
    const navStrip = document.getElementById('dojo-nav-strip');

    if (this.dojoMode === 'fc') {
      if (this.trainingList.length === 0) {
        if (fcHeader) fcHeader.classList.add('hidden');
        if (fcBox) fcBox.classList.add('hidden');
        if (quizBox) quizBox.classList.add('hidden');
        if (navStrip) navStrip.classList.add('hidden');
        if (emptyBox) emptyBox.classList.remove('hidden');

        if (allStudied.length > 0) {
          // All studied kanji are mastered! (Victory state)
          if (emptyIcon) emptyIcon.innerText = '🎉';
          if (emptyTitle) emptyTitle.innerText = 'Semua Kanji Telah Dikuasai!';
          if (emptyDesc) emptyDesc.innerHTML = `Hebat sekali! Seluruh <b>${allStudied.length} kanji</b> dalam daftar latihanmu telah berhasil kamu kuasai (⭐). Ambil kanji baru dari pasar atau tinjau kembali koleksi mastermu.`;
          if (emptyActions) {
            emptyActions.innerHTML = `
              <button type="button" class="btn-jump-market" onclick="DojoEngine.switchMainTab('market')">🛒 Ambil Kanji Tambahan ➔</button>
              <button type="button" class="btn-jump-market" style="background:rgba(245,158,11,0.22); border-color:var(--gold); color:var(--gold);" onclick="DojoEngine.openMasteredGallery()">⭐ Buka Galeri Dikuasai</button>
            `;
          }
        } else {
          // No kanji in myKanji yet
          if (emptyIcon) emptyIcon.innerText = '🎒';
          if (emptyTitle) emptyTitle.innerText = 'Antrean Belajar Kosong!';
          if (emptyDesc) emptyDesc.innerHTML = 'Belum ada kanji yang kamu pilih untuk dilatih. Buka <b>Pasar Belanja Kanji</b> untuk memilih kanji-kanji yang ingin kamu kuasai.';
          if (emptyActions) {
            emptyActions.innerHTML = `<button type="button" class="btn-jump-market" onclick="DojoEngine.switchMainTab('market')">🛒 Pergi Belanja Kanji ➔</button>`;
          }
        }
        return;
      }

      if (emptyBox) emptyBox.classList.add('hidden');
      if (fcHeader) fcHeader.classList.remove('hidden');
      if (fcBox) fcBox.classList.remove('hidden');
      if (quizBox) quizBox.classList.add('hidden');
      if (navStrip) navStrip.classList.remove('hidden');

      const roomNameEl = document.getElementById('fc-room-name-display');
      if (roomNameEl) roomNameEl.innerText = `Antrean Belajar (${this.trainingList.length} Tersisa)`;

      this.renderFlashcardCard();
    } else {
      // Quiz Drill uses all studied kanji for reinforcement
      this.quizPool = allStudied;
      if (this.quizPool.length === 0) {
        if (fcHeader) fcHeader.classList.add('hidden');
        if (fcBox) fcBox.classList.add('hidden');
        if (quizBox) quizBox.classList.add('hidden');
        if (navStrip) navStrip.classList.add('hidden');
        if (emptyBox) emptyBox.classList.remove('hidden');
        if (emptyIcon) emptyIcon.innerText = '🎒';
        if (emptyTitle) emptyTitle.innerText = 'Belum Ada Kanji untuk Kuis!';
        if (emptyDesc) emptyDesc.innerHTML = 'Silakan pilih kanji di <b>Pasar Belanja Kanji</b> terlebih dahulu untuk menguji kemampuanmu di Dojo Kuis.';
        if (emptyActions) {
          emptyActions.innerHTML = `<button type="button" class="btn-jump-market" onclick="DojoEngine.switchMainTab('market')">🛒 Pergi Belanja Kanji ➔</button>`;
        }
        return;
      }
      if (emptyBox) emptyBox.classList.add('hidden');
      if (fcHeader) fcHeader.classList.add('hidden');
      if (fcBox) fcBox.classList.add('hidden');
      if (quizBox) quizBox.classList.remove('hidden');
      if (navStrip) navStrip.classList.add('hidden');
      this.nextQuizQuestion();
    }
  },

  setDojoMode: function(mode) {
    if (mode === 'fc') {
      this.switchMainTab('flashcard');
    } else {
      this.switchMainTab('quiz');
    }
  },

  kanaToRomaji: function(str) {
    if (!str || str === '-') return '';
    const map = {
      'あ':'a','い':'i','う':'u','え':'e','お':'o',
      'か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko',
      'さ':'sa','し':'shi','す':'su','せ':'se','そ':'so',
      'た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to',
      'な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no',
      'は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho',
      'ま':'ma','み':'mi','む':'mu','め':'me','モ':'mo',
      'や':'ya','ゆ':'yu','よ':'yo',
      'ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro',
      'わ':'wa','を':'wo','ん':'n',
      'が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go',
      'ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo',
      'だ':'da','ぢ':'ji','づ':'zu','で':'de','ど':'do',
      'ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo',
      'ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po',
      'きゃ':'kya','きゅ':'kyu','きょ':'kyo',
      'しゃ':'sha','しゅ':'shu','しょ':'sho',
      'ちゃ':'cha','ちゅ':'chu','ちょ':'cho',
      'にゃ':'nya','にゅ':'nyu','にょ':'nyo',
      'ひゃ':'hya','ひゅ':'hyu','ひょ':'hyo',
      'みゃ':'mya','みゅ':'myu','みょ':'myo',
      'りゃ':'rya','りゅ':'ryu','りょ':'ryo',
      'ぎゃ':'gya','ギュ':'gyu','ぎょ':'gyo',
      'じゃ':'ja','じゅ':'ju','じょ':'jo',
      'びゃ':'bya','びゅ':'byu','びょ':'byo',
      'ぴゃ':'pya','ぴゅ':'pyu','ぴょ':'pyo',
      'ア':'a','イ':'i','ウ':'u','エ':'e','オ':'o',
      'カ':'ka','キ':'ki','ク':'ku','ケ':'ke','コ':'ko',
      'サ':'sa','シ':'shi','ス':'su','セ':'se','ソ':'so',
      'タ':'ta','チ':'chi','ツ':'tsu','テ':'te','ト':'to',
      'ナ':'na','ニ':'ni','ヌ':'nu','ネ':'ne','ノ':'no',
      'ハ':'ha','ヒ':'hi','フ':'fu','ヘ':'he','ホ':'ho',
      'マ':'ma','ミ':'mi','ム':'mu','メ':'me','モ':'mo',
      'ヤ':'ya','ユ':'yu','ヨ':'yo',
      'ラ':'ra','リ':'ri','ル':'ru','レ':'re','ロ':'ro',
      'ワ':'wa','ヲ':'wo','ン':'n',
      'ガ':'ga','ギ':'gi','グ':'gu','ゲ':'ge','ゴ':'go',
      'ザ':'za','ジ':'ji','ズ':'zu','ゼ':'ze','ゾ':'zo',
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
      'ー':'-','・':'.'
    };
    let res = '';
    let i = 0;
    while (i < str.length) {
      let two = str.substr(i, 2);
      if (map[two]) {
        res += map[two];
        i += 2;
        continue;
      }
      let one = str[i];
      if (one === 'っ' || one === 'ッ') {
        let nextChar = str[i + 1];
        let nextTwo = str.substr(i + 1, 2);
        let nextRom = map[nextTwo] || map[nextChar] || '';
        if (nextRom) {
          res += (nextRom[0] === 'c' ? 't' : nextRom[0]);
        }
        i++;
        continue;
      }
      if (map[one]) {
        res += map[one];
      } else {
        res += one;
      }
      i++;
    }
    return res;
  },

  speakCurrentSentence: function() {
    if (this.currentSentenceText) {
      this.speakText(this.currentSentenceText);
    }
  },

  renderFlashcardCard: function() {
    if (this.trainingList.length === 0) return;
    if (this.deckIdx >= this.trainingList.length) this.deckIdx = 0;
    if (this.deckIdx < 0) this.deckIdx = this.trainingList.length - 1;

    const item = this.trainingList[this.deckIdx];

    document.getElementById('dojo-curr-index').innerText = this.deckIdx + 1;
    document.getElementById('dojo-total-index').innerText = this.trainingList.length;

    document.getElementById('dojo-fc-kanji').innerText = item.k;
    document.getElementById('dojo-fc-on').innerText = item.on || '-';
    document.getElementById('dojo-fc-kun').innerText = item.kun || '-';

    // Romaji for Onyomi & Kunyomi
    const onRom = item.on ? this.kanaToRomaji(item.on) : '';
    const kunRom = item.kun ? this.kanaToRomaji(item.kun) : '';
    const onRomEl = document.getElementById('dojo-fc-on-romaji');
    if (onRomEl) onRomEl.innerText = onRom ? `(${onRom})` : '';
    const kunRomEl = document.getElementById('dojo-fc-kun-romaji');
    if (kunRomEl) kunRomEl.innerText = kunRom ? `(${kunRom})` : '';

    document.getElementById('dojo-fc-arti').innerText = item.a;

    // Render Jukugo
    const shelf = document.getElementById('dojo-fc-jukugo-shelf');
    if (shelf) {
      if (item.ex && item.ex.length > 0) {
        shelf.innerHTML = item.ex.map(e => `
          <div class="fjs-item">
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-weight:700; color:#38bdf8;">${e.w} <span style="font-size:11px; color:#fff;">(${e.r})</span></span>
              <button type="button" class="btn-card-audio" onclick="event.stopPropagation(); DojoEngine.speakText('${e.w}')" title="Dengarkan kata majemuk">🔊</button>
            </div>
            <span style="color:var(--text-sub); font-style:italic;">${e.a}</span>
          </div>
        `).join('');
      } else {
        shelf.innerHTML = `<span style="font-size:11px; color:var(--text-sub);">-</span>`;
      }
    }

    // Render Authentic Example Sentence
    const senData = (typeof KANJI_SENTENCES !== 'undefined' && KANJI_SENTENCES[item.k]) 
      ? KANJI_SENTENCES[item.k] 
      : (item.ex && item.ex[0] ? { jp: `これは${item.ex[0].w}です。`, r: `Kore wa ${item.ex[0].r} desu.`, id: `Ini adalah ${item.ex[0].a}.` } : null);

    const senJpEl = document.getElementById('dojo-fc-sen-jp');
    const senRomEl = document.getElementById('dojo-fc-sen-romaji');
    const senIdEl = document.getElementById('dojo-fc-sen-id');

    if (senData) {
      this.currentSentenceText = senData.jp;
      if (senJpEl) {
        const highlighted = senData.jp.split(item.k).join(`<span class="highlight-kanji">${item.k}</span>`);
        senJpEl.innerHTML = highlighted;
      }
      if (senRomEl) senRomEl.innerText = senData.r;
      if (senIdEl) senIdEl.innerText = senData.id;
    } else {
      this.currentSentenceText = '';
      if (senJpEl) senJpEl.innerText = '-';
      if (senRomEl) senRomEl.innerText = '';
      if (senIdEl) senIdEl.innerText = '';
    }

    // Check mastery status
    const btnMaster = document.getElementById('btn-master-toggle');
    if (btnMaster) {
      let isM = this.masteredKanji.includes(item.k);
      btnMaster.classList.toggle('is-mastered', isM);
    }

    // Default tertutup blur
    this.isRevealed = false;
    document.getElementById('dojo-fc-shield').classList.remove('revealed');
    document.getElementById('dojo-fc-hint').innerText = "👆 Ketuk untuk membuka bacaan & arti";
  },

  toggleFcReveal: function() {
    this.isRevealed = !this.isRevealed;
    const shield = document.getElementById('dojo-fc-shield');
    const hint = document.getElementById('dojo-fc-hint');
    if (this.isRevealed) {
      shield.classList.add('revealed');
      hint.innerText = "✨ Ketuk kanji untuk menutup";
    } else {
      shield.classList.remove('revealed');
      hint.innerText = "👆 Ketuk untuk membuka bacaan & arti";
    }
  },

  nextDojoCard: function() {
    if (this.dojoMode === 'fc') {
      this.deckIdx++;
      this.renderFlashcardCard();
    } else {
      this.nextQuizQuestion();
    }
  },

  prevDojoCard: function() {
    if (this.dojoMode === 'fc') {
      this.deckIdx--;
      this.renderFlashcardCard();
    }
  },

  toggleMasterCurrent: function() {
    if (this.trainingList.length === 0) return;
    const item = this.trainingList[this.deckIdx];
    if (!item) return;

    // Tandai sebagai dikuasai (⭐)
    if (!this.masteredKanji.includes(item.k)) {
      this.masteredKanji.push(item.k);
    }
    this.saveStudyData();
    this.updateStats();

    // Sound selebrasi & toast pencapaian
    this.playSfx('combo');
    this.showToast(`⭐ Sugoi! Kanji ${item.k} (${item.a}) resmi kamu kuasai!`);

    // Kartu yang dikuasai otomatis keluar dari antrean aktif flashcard
    this.loadTrainingDeck();
  },

  speakText: function(text) {
    if ('speechSynthesis' in window && text && typeof SpeechSynthesisUtterance !== 'undefined') {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP';
      u.rate = 0.88;
      window.speechSynthesis.speak(u);
    }
  },

  speakKanji: function(kanji, reading, evt) {
    if (evt) evt.stopPropagation();
    let toSpeak = kanji;
    if (reading && reading !== '-') {
      toSpeak = reading.split(',')[0].replace(/[\.・\-]/g, '');
    }
    this.speakText(toSpeak);
  },

  speakCurrent: function() {
    if (this.trainingList.length === 0) return;
    const item = this.trainingList[this.deckIdx];
    let toSpeak = item.k;
    if (item.kun && item.kun !== '-') {
      toSpeak = item.kun.split(',')[0].replace(/[\.・\-]/g, '');
    } else if (item.on && item.on !== '-') {
      toSpeak = item.on.split(',')[0].replace(/[\.・\-]/g, '');
    }
    this.speakText(toSpeak);
  },

  // --- KUIS DRILL MULTI-VARIASI DOJO ---
  drillDropdownOpen: false,

  toggleDrillDropdown: function(e) {
    if (e) e.stopPropagation();
    this.drillDropdownOpen = !this.drillDropdownOpen;
    const menu = document.getElementById('drill-dropdown-menu');
    const btn = document.getElementById('btn-drill-dropdown');
    if (menu) menu.classList.toggle('hidden', !this.drillDropdownOpen);
    if (btn) btn.classList.toggle('active', this.drillDropdownOpen);
  },

  closeDrillDropdown: function() {
    this.drillDropdownOpen = false;
    const menu = document.getElementById('drill-dropdown-menu');
    const btn = document.getElementById('btn-drill-dropdown');
    if (menu) menu.classList.add('hidden');
    if (btn) btn.classList.remove('active');
  },

  selectDrillType: function(type) {
    this.drillType = type;
    this.closeDrillDropdown();

    const labels = {
      'mix': '🔀 Acak / Mix',
      'meaning': '🎯 Tebak Arti',
      'reading': '🗣️ Tebak Bacaan',
      'kanji': '🈴 Tebak Bentuk',
      'blitz': '⚡ Benar / Salah'
    };

    const labelEl = document.getElementById('drill-mode-current-label');
    if (labelEl) labelEl.innerText = labels[type] || '🔀 Acak / Mix';

    const items = document.querySelectorAll('.drill-dropdown-menu .dd-item');
    items.forEach(it => {
      it.classList.toggle('active', it.getAttribute('data-type') === type);
    });

    this.nextQuizQuestion();
  },

  setDrillType: function(type) {
    this.selectDrillType(type);
  },

  updateDrillTelemetry: function() {
    const sPill = document.getElementById('quiz-streak-pill');
    if (sPill) sPill.innerText = `🔥 Combo: ${this.drillStreak}`;
    const scorePill = document.getElementById('quiz-score-pill');
    if (scorePill) scorePill.innerText = `⭐ Benar: ${this.drillScore}`;
  },

  // Web Audio API Synthesizer (Zero asset download, instant tactile audio)
  playSfx: function(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this._audioCtx) {
        this._audioCtx = new AudioCtx();
      }
      if (this._audioCtx.state === 'suspended') {
        this._audioCtx.resume();
      }
      const ctx = this._audioCtx;
      const now = ctx.currentTime;

      if (type === 'correct') {
        // Nada akor mayor ceria (E5 -> G#5 -> B5)
        [
          { freq: 659.25, time: 0, dur: 0.12 },
          { freq: 830.61, time: 0.08, dur: 0.14 },
          { freq: 987.77, time: 0.16, dur: 0.28 }
        ].forEach(note => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(note.freq, now + note.time);
          gain.gain.setValueAtTime(0.001, now + note.time);
          gain.gain.exponentialRampToValueAtTime(0.18, now + note.time + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + note.time + note.dur);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + note.time);
          osc.stop(now + note.time + note.dur);
        });
      } else if (type === 'wrong') {
        // Nada lembut thud / boing frekuensi rendah yang bersahabat
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.22);
        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.24);
      } else if (type === 'combo') {
        // Fanfare pop kecil saat combo streak tercapai
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.18);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.22);
      }
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  },

  triggerNextQuestionWithAnim: function() {
    const stage = document.getElementById('dojo-quiz-container');
    if (stage) {
      stage.classList.add('stage-exit');
      setTimeout(() => {
        stage.classList.remove('stage-exit');
        this.nextQuizQuestion();
      }, 140);
    } else {
      this.nextQuizQuestion();
    }
  },

  nextQuizQuestion: function() {
    const pool = (this.quizPool && this.quizPool.length > 0) 
      ? this.quizPool 
      : (this.myKanji.length > 0 ? KANJI_CATALOG.filter(k => this.myKanji.includes(k.k)) : KANJI_CATALOG.slice(0, 10));

    if (!pool || pool.length === 0) return;

    const nextBtn = document.getElementById('btn-quiz-next');
    if (nextBtn) nextBtn.classList.add('hidden');
    const fb = document.getElementById('dojo-quiz-feedback');
    if (fb) fb.innerHTML = '';

    const kanjiHero = document.getElementById('dojo-quiz-kanji');
    if (kanjiHero) kanjiHero.classList.remove('kanji-celebrate', 'kanji-wrong');

    const stage = document.getElementById('dojo-quiz-container');
    if (stage) {
      stage.classList.remove('stage-enter');
      void stage.offsetWidth;
      stage.classList.add('stage-enter');
      setTimeout(() => stage.classList.remove('stage-enter'), 320);
    }

    // Pilih kanji target dari pool studi
    const target = pool[Math.floor(Math.random() * pool.length)];
    this.quizTarget = target;

    // Tentukan tipe soal
    let qType = this.drillType;
    if (qType === 'mix') {
      const variations = ['meaning', 'reading', 'kanji', 'blitz'];
      qType = variations[Math.floor(Math.random() * variations.length)];
    }

    let qData = null;
    if (qType === 'reading') {
      qData = this.buildReadingQuestion(target);
    } else if (qType === 'kanji') {
      qData = this.buildKanjiQuestion(target);
    } else if (qType === 'blitz') {
      qData = this.buildBlitzQuestion(target);
    } else {
      qData = this.buildMeaningQuestion(target);
    }

    this.currentQuestionData = qData;
    this.renderQuestionUI(qData);
  },

  getValidReading: function(k) {
    if (!k) return '';
    if (k.kun && k.kun !== '-' && k.kun.trim() !== '') {
      return k.kun.split(',')[0].trim();
    }
    if (k.on && k.on !== '-' && k.on.trim() !== '') {
      return k.on.split(',')[0].trim();
    }
    return '';
  },

  buildMeaningQuestion: function(target) {
    const distractors = KANJI_CATALOG.filter(k => k.k !== target.k && k.a !== target.a);
    this.shuffle(distractors);

    const choices = [target.a];
    for (const d of distractors) {
      if (d.a && !choices.includes(d.a)) {
        choices.push(d.a);
      }
      if (choices.length === 4) break;
    }
    this.shuffle(choices);

    return {
      type: 'meaning',
      badge: '🎯 Tebak Arti Kanji',
      promptKanji: target.k,
      promptSub: 'Pilih arti bahasa Indonesia yang paling tepat:',
      choices: choices,
      correct: target.a,
      feedbackCorrect: `Tepat sekali! Kanji <b>${target.k}</b> berarti <b>${target.a}</b>.`,
      feedbackWrong: `Kurang tepat! Kanji <b>${target.k}</b> berarti <b>${target.a}</b>.`,
      audioToSpeak: target.k,
      isKanjiChoices: false
    };
  },

  buildReadingQuestion: function(target) {
    const hasValidKun = target.kun && target.kun !== '-' && target.kun.trim() !== '';
    const hasValidOn = target.on && target.on !== '-' && target.on.trim() !== '';

    const hasBoth = hasValidKun && hasValidOn;
    const askOnyomi = hasBoth ? (Math.random() > 0.5) : hasValidOn;

    let targetReading = '';
    let badge = '';
    let promptSub = '';
    let feedbackCorrect = '';
    let feedbackWrong = '';

    if (hasBoth) {
      if (askOnyomi) {
        targetReading = target.on.split(',')[0].trim();
        badge = '🗣️ Tebak Bacaan (Onyomi)';
        promptSub = `Bagaimana bacaan <b>ONYOMI</b> (bunyi Cina) dari kanji <b>${target.k}</b>?`;
        feedbackCorrect = `Bagus! Bacaan Onyomi kanji <b>${target.k}</b> adalah <b>${targetReading}</b>.`;
        feedbackWrong = `Kurang tepat! Bacaan Onyomi kanji <b>${target.k}</b> adalah <b>${targetReading}</b>.`;
      } else {
        targetReading = target.kun.split(',')[0].trim();
        badge = '🗣️ Tebak Bacaan (Kunyomi)';
        promptSub = `Bagaimana bacaan <b>KUNYOMI</b> (asli Jepang) dari kanji <b>${target.k}</b>?`;
        feedbackCorrect = `Bagus! Bacaan Kunyomi kanji <b>${target.k}</b> adalah <b>${targetReading}</b>.`;
        feedbackWrong = `Kurang tepat! Bacaan Kunyomi kanji <b>${target.k}</b> adalah <b>${targetReading}</b>.`;
      }
    } else {
      targetReading = hasValidKun ? target.kun.split(',')[0].trim() : target.on.split(',')[0].trim();
      badge = '🗣️ Tebak Bacaan Kanji';
      promptSub = `Bagaimana cara membaca kanji <b>${target.k}</b> (${target.a})?`;
      feedbackCorrect = `Bagus! Kanji <b>${target.k}</b> dibaca <b>${targetReading}</b>.`;
      feedbackWrong = `Salah tebas! Kanji <b>${target.k}</b> dibaca <b>${targetReading}</b>.`;
    }

    // Cari pengecoh yang sesuai tipe bacaan (Katakana jika Onyomi, Hiragana jika Kunyomi)
    const distractors = KANJI_CATALOG.filter(k => {
      if (k.k === target.k) return false;
      const r = askOnyomi ? k.on : k.kun;
      return r && r !== '-' && r.trim() !== '' && r.split(',')[0].trim() !== targetReading;
    });
    this.shuffle(distractors);

    const choices = [targetReading];
    for (const d of distractors) {
      const raw = askOnyomi ? d.on : d.kun;
      if (raw && raw !== '-' && raw.trim() !== '') {
        const r = raw.split(',')[0].trim();
        if (r && r !== '-' && !choices.includes(r)) {
          choices.push(r);
        }
      }
      if (choices.length === 4) break;
    }
    this.shuffle(choices);

    return {
      type: 'reading',
      badge: badge,
      promptKanji: target.k,
      promptSub: promptSub,
      choices: choices,
      correct: targetReading,
      feedbackCorrect: feedbackCorrect,
      feedbackWrong: feedbackWrong,
      audioToSpeak: targetReading.replace(/[\.・\-]/g, ''),
      isKanjiChoices: false
    };
  },

  buildKanjiQuestion: function(target) {
    const distractors = KANJI_CATALOG.filter(k => k.k !== target.k);
    this.shuffle(distractors);

    const choices = [target.k];
    for (const d of distractors) {
      if (d.k && !choices.includes(d.k)) {
        choices.push(d.k);
      }
      if (choices.length === 4) break;
    }
    this.shuffle(choices);

    return {
      type: 'kanji',
      badge: '🈴 Tebak Bentuk Kanji',
      customPromptHtml: `<div style="font-size: 26px; font-weight: 800; color: var(--gold); margin-bottom: 6px;">"${target.a}"</div>`,
      promptSub: 'Manakah aksara kanji yang mewakili arti di atas?',
      choices: choices,
      correct: target.k,
      feedbackCorrect: `Benar! Kanji untuk "<b>${target.a}</b>" adalah <b>${target.k}</b>.`,
      feedbackWrong: `Meleset! Kanji untuk "<b>${target.a}</b>" adalah <b>${target.k}</b>.`,
      audioToSpeak: target.k,
      isKanjiChoices: true
    };
  },

  buildBlitzQuestion: function(target) {
    const isPairCorrect = Math.random() > 0.5;
    let shownMeaning = target.a;
    if (!isPairCorrect) {
      const other = KANJI_CATALOG.find(k => k.k !== target.k);
      shownMeaning = other ? other.a : 'Sesuatu yang lain';
    }

    return {
      type: 'blitz',
      badge: '⚡ Refleks Benar / Salah',
      promptKanji: target.k,
      promptSub: `Apakah kanji <b>${target.k}</b> memiliki arti: <br><b style="color:var(--primary); font-size:18px;">"${shownMeaning}"</b> ?`,
      choices: ['BENAR (Seikai)', 'SALAH (Chigau)'],
      correct: isPairCorrect ? 'BENAR (Seikai)' : 'SALAH (Chigau)',
      feedbackCorrect: `Hebat! Pasangan arti tersebut memang <b>${isPairCorrect ? 'BENAR' : 'SALAH'}</b>! Kanji <b>${target.k}</b> = <b>${target.a}</b>.`,
      feedbackWrong: `Kurang tepat! Pasangan arti tersebut seharusnya <b>${isPairCorrect ? 'BENAR' : 'SALAH'}</b>! Kanji <b>${target.k}</b> = <b>${target.a}</b>.`,
      audioToSpeak: target.k,
      isKanjiChoices: false,
      isTwoColumns: true
    };
  },

  // Render UI dari data soal yang di-generate
  renderQuestionUI: function(q) {
    const typeLabel = document.getElementById('dojo-quiz-type-label');
    if (typeLabel) typeLabel.innerText = q.badge;

    const kanjiEl = document.getElementById('dojo-quiz-kanji');
    const subEl = document.getElementById('dojo-quiz-sub');

    if (q.customPromptHtml) {
      if (kanjiEl) {
        kanjiEl.classList.add('hidden');
        kanjiEl.innerHTML = '';
      }
      if (subEl) {
        subEl.classList.remove('hidden');
        subEl.innerHTML = q.customPromptHtml + `<div style="margin-top:6px;">${q.promptSub}</div>`;
      }
    } else {
      if (kanjiEl) {
        kanjiEl.classList.remove('hidden');
        kanjiEl.innerText = q.promptKanji;
      }
      if (subEl) {
        subEl.classList.remove('hidden');
        subEl.innerHTML = q.promptSub;
      }
    }

    const box = document.getElementById('dojo-quiz-choices');
    box.className = 'quiz-grid-choices' + (q.isTwoColumns ? ' two-columns' : '');
    box.innerHTML = q.choices.map(c => {
      let optClass = 'btn-quiz-opt' + (q.isKanjiChoices ? ' kanji-opt' : '');
      let escaped = c.replace(/'/g, "\\'");
      return `<button type="button" class="${optClass}" onclick="DojoEngine.answerQuiz('${escaped}', event)">${c}</button>`;
    }).join('');

    this.updateDrillTelemetry();
  },

  answerQuiz: function(selected, evt) {
    if (!this.currentQuestionData) return;
    const q = this.currentQuestionData;
    const btns = document.querySelectorAll('.btn-quiz-opt');
    btns.forEach(b => b.disabled = true);

    const fb = document.getElementById('dojo-quiz-feedback');
    const nextBtn = document.getElementById('btn-quiz-next');
    const kanjiHero = document.getElementById('dojo-quiz-kanji');
    const isCorrect = (selected === q.correct);
    const targetBtn = evt ? (evt.currentTarget || (evt.target && evt.target.closest ? evt.target.closest('.btn-quiz-opt') : evt.target)) : null;

    const praises = [
      "⚔️ SEIKAI! Tebasan tepat sasaran!",
      "🔥 SUGOI! Insting kanjimu makin tajam!",
      "✨ Luar biasa! Langsung nempel di ingatan!",
      "🎯 Tepat sasaran! Akurasi 100%!",
      "⚡ Mantap jiwa! Kecepatan dan fokusmu on point!",
      "🌟 Keren banget! Terus pertahankan ritmenya!",
      "👑 Sempurna! Kanji ini resmi kamu kuasai!"
    ];

    const encouragements = [
      "🍃 Jangan patah semangat! Samurai sejati belajar dari kesalahan.",
      "💪 Hampir tepat! Otakmu sedang membentuk koneksi memorinya.",
      "⛩️ Tenang, tarik napas! Pengulangan adalah rahasia para master kanji.",
      "⚔️ Santai aja! Jadikan ini batu loncatan, kita tebas di soal berikut!",
      "✨ Sedikit meleset! Ingat kembali polanya dan coba lagi!"
    ];

    if (isCorrect) {
      this.playSfx('correct');
      this.drillStreak++;
      this.drillScore++;

      if (targetBtn) targetBtn.classList.add('correct');
      btns.forEach(b => {
        if (b !== targetBtn) b.classList.add('dimmed');
      });

      if (kanjiHero) {
        kanjiHero.classList.remove('kanji-celebrate', 'kanji-wrong');
        void kanjiHero.offsetWidth;
        kanjiHero.classList.add('kanji-celebrate');
      }

      if (this.drillStreak >= 3) {
        setTimeout(() => this.playSfx('combo'), 180);
      }

      const praise = praises[Math.floor(Math.random() * praises.length)];
      let streakBadge = '';
      if (this.drillStreak >= 3) {
        streakBadge = `<span class="result-combo-badge">🔥 COMBO x${this.drillStreak}!</span>`;
      }

      fb.innerHTML = `
        <div class="drill-result-card result-success">
          <div class="result-banner">
            <span class="result-title">${praise}</span>
            ${streakBadge}
          </div>
          <div class="result-body">${q.feedbackCorrect}</div>
        </div>
      `;
      if (q.audioToSpeak) this.speakText(q.audioToSpeak);
    } else {
      this.playSfx('wrong');
      this.drillStreak = 0;

      if (targetBtn) targetBtn.classList.add('wrong');
      btns.forEach(b => {
        if (b.innerText.trim() === q.correct.trim()) {
          b.classList.add('revealed-correct');
        } else if (b !== targetBtn) {
          b.classList.add('dimmed');
        }
      });

      if (kanjiHero) {
        kanjiHero.classList.remove('kanji-celebrate', 'kanji-wrong');
        void kanjiHero.offsetWidth;
        kanjiHero.classList.add('kanji-wrong');
      }

      const enc = encouragements[Math.floor(Math.random() * encouragements.length)];
      fb.innerHTML = `
        <div class="drill-result-card result-wrong">
          <div class="result-banner">
            <span class="result-title">${enc}</span>
          </div>
          <div class="result-body">${q.feedbackWrong}</div>
        </div>
      `;
    }

    this.updateDrillTelemetry();
    if (nextBtn) {
      nextBtn.classList.remove('hidden');
      nextBtn.focus();
    }
  },

  shuffle: function(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  },

  // --- GUIDE MODAL LOGIC ---
  openGuide: function() {
    const m = document.getElementById('guide-modal');
    if (m) m.classList.remove('hidden');
    this.syncBodyScrollLock();
  },

  closeGuide: function() {
    const m = document.getElementById('guide-modal');
    if (m) m.classList.add('hidden');
    this.syncBodyScrollLock();
  },

  showToast: function(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.innerText = msg;
    t.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }
};


window.addEventListener('DOMContentLoaded', () => {
  DojoEngine.init();
});