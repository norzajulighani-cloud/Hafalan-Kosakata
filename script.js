// ==========================================
// DATA MANUAL CURRICULUM
// ==========================================

let ManualDB = {};
const Engine = {
  buildRubyFormat: (k, r, a, isPro) => {
    if(!k) return "";
    const cls = isPro ? 'pro-locked' : '';
    
    if (k === r || !r) {
        if (a && !isPro) return `<ruby class="${cls}" onclick="this.classList.toggle('show')">${k}<div class="arti-hint">${a}</div></ruby>`;
        return k; 
    }
    let pLen = 0;
    while (pLen < k.length && pLen < r.length && k[pLen] === r[pLen]) pLen++;
    let sLen = 0;
    while (sLen < k.length - pLen && sLen < r.length - pLen && k[k.length - 1 - sLen] === r[r.length - 1 - sLen]) sLen++;
    let prefix = k.slice(0, pLen);
    let suffix = k.slice(k.length - sLen);
    let kanji = k.slice(pLen, k.length - sLen);
    let kana = r.slice(pLen, r.length - sLen);
    let hintHtml = (a && !isPro) ? `<div class="arti-hint">${a}</div>` : '';
    return `${prefix}<ruby class="${cls}" onclick="this.classList.toggle('show')">${kanji}<rt>${kana}</rt>${hintHtml}</ruby>${suffix}`;
  },
  
  renderSentence: (arr, isPro, maskParticle = false, showUnderline = false, isMulti = false) => {
     let html = "";
     let pIdx = 0;
     arr.forEach(item => {
        let chunkHtml = "";
        if(item.k) chunkHtml = Engine.buildRubyFormat(item.k, item.r, item.a, isPro);
        else if(item.text) {
            if(maskParticle && item.p) {
                if (isMulti) {
                    chunkHtml = `<span class="multi-blank" id="mblank-${pIdx}" onclick="Action.clearMulti(${pIdx})">_</span>`;
                    pIdx++;
                } else {
                    chunkHtml = isPro ? "[?]" : " [ ? ] "; 
                }
            } else {
                chunkHtml = item.text;
            }
        }
        if(item.u && showUnderline) html += `<span class="u-line">${chunkHtml}</span>`;
        else html += chunkHtml;
     });
     return html;
  },
  shuffle: (array) => {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex); currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }
};

const RPG = {
  level: parseInt(localStorage.getItem('yk_lvl')) || 1, exp: parseInt(localStorage.getItem('yk_exp')) || 0,
  coins: parseInt(localStorage.getItem('yk_coins')) || 0, combo: 0,
  hasShield: false, intelActive: false,
  getTitle: function() { 
    if(this.level >= 150) return "⛩️ Kensei"; if(this.level >= 90) return "👑 Shogun";
    if(this.level >= 60) return "🏯 Daimyo"; if(this.level >= 30) return "🛡️ Samurai";
    if(this.level >= 10) return "⚔️ Ronin"; return "🔰 Pemula";
  },
  getExpRequirement: function() {
    let multiplier = 2; 
    if (this.level >= 150) multiplier = 20;
    else if (this.level >= 90) multiplier = 12;
    else if (this.level >= 60) multiplier = 8;
    else if (this.level >= 30) multiplier = 5;
    else if (this.level >= 10) multiplier = 3;
    return this.level * 100 * multiplier;
  },
  updateUI: function() {
    document.getElementById('ui-lvl').innerText = `Lv.${this.level} ${this.getTitle()}`;
    document.getElementById('ui-exp').innerText = this.exp; 
    
    // --- MODE ADMIN: KOIN INFINITY ---
    let displayCoin = Game.adminMode ? "∞" : this.coins;
    document.getElementById('ui-coin').innerText = displayCoin; 
    document.getElementById('shop-coin-display').innerText = displayCoin;
    // ---------------------------------

    const cUI = document.getElementById('ui-combo');
    if(this.combo >= 2) { 
        let dispCombo = Math.min(this.combo, 15);
        let maxText = this.combo >= 15 ? " (MAX)" : "";
        cUI.innerText = `🔥 x${dispCombo}${maxText}`; 
        if(this.combo >= 15) cUI.style.color = "var(--danger)"; else cUI.style.color = "#f97316";
        cUI.classList.remove('hidden'); cUI.classList.add('active'); 
    } else { cUI.classList.add('hidden'); cUI.classList.remove('active'); }
  },
  
  // 👇 INI FUNGSI YANG KEMARIN TIDAK SENGAJA TERHAPUS WKWK
  addReward: function(baseExp, baseCoin, evt) {
    let multi = this.combo >= 2 ? Math.min(this.combo, 15) : 1; 
    let earnedExp = baseExp * multi; let earnedCoin = baseCoin * multi;
    this.exp += earnedExp; this.coins += earnedCoin;
    Game.dailyStats.exp += earnedExp;
    Game.dailyStats.coin += earnedCoin;
    let nextLvlExp = this.getExpRequirement();
    this.spawnFloatingText(`+${earnedExp} EXP ✨`, "var(--primary)", evt, -20, 0);
    setTimeout(() => { this.spawnFloatingText(`+${earnedCoin} 🪙`, "var(--gold)", evt, 20, 20); }, 150);
    if(this.exp >= nextLvlExp) { 
        let gelarLama = this.getTitle(); 
        this.level++; 
        this.exp -= nextLvlExp; 
        let gelarBaru = this.getTitle(); 
        if (gelarLama !== gelarBaru) {
            document.getElementById('promo-rank').innerText = gelarBaru.replace(/[^a-zA-Z\s]/g, '').trim();
            UI.openModal('promotion-screen');
            UI.showToast(`Luar Biasa! Gelar Dievaluasi.`, 'success');
        } else {
            UI.showToast(`Level Up! Sekarang Lv.${this.level} ✨`, 'success');
        }
    } 
    this.save(); this.updateUI();
  },
  
  buyItem: function(type, cost) {
    let hasAccess = Game.adminMode || this.coins >= cost;

    if(hasAccess) {
      if(type === 'hp' && Game.hp < 3) { 
          if(!Game.adminMode) this.coins -= cost; 
          Game.hp++; localStorage.setItem('yk_hp', Game.hp); UI.renderHP(); UI.showToast("Nano-Repair Diaktifkan! +1 HP", "success"); 
          if (Game.hp > 1) document.body.classList.remove('danger-mode');
      } else if (type === 'shield') {
          let t = Game.currentTab;
          if(t === 'partikel' || t === 'arti') {
              if(!Game.hasShield) {
                  if(!Game.adminMode) this.coins -= cost; 
                  Game.hasShield = true;
                  document.getElementById('card-main').classList.add('shield-active');
                  UI.showToast("Aegis Shield Aktif! Melindungi 1x kesalahan.", "success");
              } else { UI.showToast("Shield sudah aktif!", "error"); return; }
          } else { UI.showToast("Sinyal Ditolak: Hanya untuk Zona Tempur.", "error"); return; }
      } else if (type === 'intel') {
          let t = Game.currentTab;
          if(t === 'partikel') {
              if(!Game.intelActive) {
                  if(!Game.adminMode) this.coins -= cost; 
                  Game.intelActive = true;
                  let itm = Game.sessionData[t][Game.currentIndex];
                  let intelBox = document.createElement('div');
                  intelBox.className = 'intel-box'; intelBox.innerHTML = `<b>Intel Arti:</b> ${itm.a}`;
                  document.getElementById('input-area').prepend(intelBox);
                  UI.showToast("Intel Terjemahan Berhasil Diretas!", "success");
              } else { UI.showToast("Intel sudah terbuka!", "error"); return; }
          } else { UI.showToast("Sinyal Ditolak: Hanya untuk Tab Partikel.", "error"); return; }
        } else if (type === 'pandora') {
          if(!Game.adminMode) this.coins -= cost;
          let rng = Math.random();
          if (rng < 0.1) { 
              Game.hp = 3; localStorage.setItem('yk_hp', Game.hp); UI.renderHP();
              UI.showToast("JACKPOT! HP Pulih Sepenuhnya!", "success");
              document.body.classList.remove('danger-mode');
          } else if (rng < 0.4) { 
              if(!Game.hasShield) {
                  Game.hasShield = true; document.getElementById('card-main').classList.add('shield-active');
                  UI.showToast("Beruntung! Aegis Shield Aktif.", "success");
              } else {
                  this.coins += 50; 
                  UI.showToast("Sudah punya Shield! Cashback 50 Koin.", "warning");
              }
          } else if (rng < 0.8) { 
              UI.showToast("ZONK! Kotaknya kosong melompong wkwkwk.", "warning");
          } else { 
              UI.showToast("JEBAKAN BATMAN! Terkena Racun -1 HP!", "error");
              Game.decreaseHP(null); 
          }
      } else if (type === 'mata') {
          let t = Game.currentTab;
          if(t === 'arti') {
              if(!Game.mataActive) {
                  if(!Game.adminMode) this.coins -= cost; 
                  Game.mataActive = true;
                  
                  // Tarik kunci jawaban yang sudah disiapkan di UI.loadStep
                  let jpText = Game.displayKanji !== Game.displayHiragana ? 
                               `${Game.displayKanji} (${Game.displayHiragana})` : 
                               Game.displayKanji;

                  let mataBox = document.createElement('div');
                  mataBox.className = 'intel-box'; 
                  // Berikan warna emas agar berbeda dengan Intel Arti
                  mataBox.style.borderColor = 'var(--gold)'; 
                  mataBox.style.color = 'var(--gold)';
                  mataBox.innerHTML = `<b>Mata Kensei:</b> ${jpText}`;
                  
                  document.getElementById('input-area').prepend(mataBox);
                  UI.showToast("Mata Kensei Aktif! Teks Jepang terungkap.", "success");
                  UI.closeModal('shop-modal'); // Tutup modal otomatis agar langsung terlihat
              } else { UI.showToast("Mata Kensei sudah aktif!", "error"); return; }
          } else { UI.showToast("Sinyal Ditolak: Hanya untuk Tab Arti.", "error"); return; }
      } // <--- INI DIA KURUNG KURAWAL YANG TADI HILANG!

      this.save(); this.updateUI();
    } else UI.showToast("Kredit tidak memadai.", "error");
  },

  buyUnlock: function(cost) {
    if(this.coins >= cost || Game.adminMode) {
      if(!Game.adminMode) this.coins -= cost; 
      Game.unlockedDay++; localStorage.setItem('yk_unlocked', Game.unlockedDay);
      UI.renderMap(); UI.showToast("Peta Baru Terbuka! Akses Hari " + Game.unlockedDay, "success");
      this.save(); this.updateUI();
    } else { UI.showToast("Kredit tidak memadai.", "error"); }
  },

  adminUnlock: function() {
    if (Game.adminMode) {
        Game.adminMode = false;
        Game.unlockedDay = parseInt(localStorage.getItem('yk_unlocked')) || 1;
        if (Game.currentDay > Game.unlockedDay) Game.currentDay = Game.unlockedDay;
        UI.closeModal('shop-modal');
        UI.showToast("Mode Admin Dinonaktifkan.", "warning");
        RPG.updateUI(); 
        UI.renderMap();
        UI.loadStep(); 
        return;
    }

    let pwd = prompt("Sandi Otorisasi Dev:");
    if(pwd === "Gozaru") {
      Game.adminMode = true;
      Game.unlockedDay = 99; 
      UI.closeModal('shop-modal');
      UI.showToast("Override Diterima. Koin Tak Terbatas Aktif!", "success");
      RPG.updateUI(); 
      UI.renderMap();
      UI.loadStep(); 
    } else if (pwd !== null) { 
      UI.showToast("Akses Ditolak.", "error"); 
    }
  },

  spawnFloatingText: function(text, color, evt, offsetX = 0, offsetY = 0) {
    const el = document.createElement('div'); el.className = 'floating-text'; el.style.color = color; el.innerText = text;
    
    let x, y;
    if (evt && evt.clientX && evt.clientX > 0) {
        x = evt.clientX; y = evt.clientY;
    } else {
        const card = document.getElementById('card-main').getBoundingClientRect();
        x = card.left + (card.width / 2);
        y = card.top + (card.height / 2);
    }
    el.style.left = `${x - 30 + offsetX}px`; 
    el.style.top = `${y - 30 + offsetY}px`;
    document.body.appendChild(el); 
    setTimeout(() => el.remove(), 1000);
  },
  save: function() { localStorage.setItem('yk_lvl', this.level); localStorage.setItem('yk_exp', this.exp); localStorage.setItem('yk_coins', this.coins); }
};


const Game = {
  adminMode: false, 
  mode: '', hp: 3, hpLostThisTurn: false, jumpscareTriggered: false,
  unlockedDay: parseInt(localStorage.getItem('yk_unlocked')) || 1, currentDay: 1, currentTab: 'hafalan', currentIndex: 0, currentAns: "", targetMultiAns: [], currentMultiAns: [],
  currentAnsKanji: "", currentAnsHiragana: "",
  sessionData: { hafalan: [], pengayaan: [], belajar: [], partikel: [], arti: [] },
  tabProgress: { hafalan: 0, belajar: 0, partikel: 0, arti: 0 }, 
  dungeonPool: [], dungeonScore: 0,
  
  startDungeon: () => {
    if(Game.hp <= 0) { UI.showToast("HP habis! Pulihkan diri atau tunggu cooldown.", "error"); return; }
    UI.toggleSidebar();
    
    let pool = [];
    for(let i=1; i<=Game.unlockedDay; i++) {
        if(ManualDB['day'+i] && ManualDB['day'+i].hafalan) pool = pool.concat(ManualDB['day'+i].hafalan);
    }
    if(pool.length < 4) { UI.showToast("Kosakata belum cukup untuk masuk Dungeon!", "error"); return; }
    
    Game.currentTab = 'dungeon'; Game.dungeonScore = 0; Game.dungeonPool = pool;
    document.getElementById('ui-day').innerText = "🏰 DUNGEON INGATAN";
    const badge = document.getElementById('ui-zone');
    badge.className = "zone-badge zone-tempur"; badge.innerText = "☠️ SURVIVAL MODE";
    
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    UI.loadStep();
  },
  dailyStats: { exp: 0, coin: 0, maxCombo: 0 },

  checkStoredMode: () => {
    let saved = localStorage.getItem('yk_mode');
    if (saved === 'pemula') { Game.init(saved); } else { document.getElementById('setup-screen').classList.remove('hidden'); }
  },
  init: (mode) => {
    if(Cooldown.check()) return;
    Game.mode = mode; localStorage.setItem('yk_mode', mode); document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('tab-hafalan').classList.remove('pro-hidden'); document.getElementById('tab-belajar').classList.remove('pro-hidden');
    document.getElementById('tab-partikel').classList.add('locked'); document.getElementById('tab-arti').classList.add('locked');

    Game.hp = parseInt(localStorage.getItem('yk_hp')) || 3; if(Game.hp<=0) Game.hp=3; 
    document.getElementById('main-app').classList.remove('hidden'); 
    Game.currentDay = Game.unlockedDay > 1 ? Game.unlockedDay : 1; 
    RPG.updateUI(); UI.renderHP(); Game.loadDayData(); UI.renderMap();
  },
    loadDayData: () => {
    document.getElementById('ui-day').innerText = `Hari ${Game.currentDay}`; 
    let dbKey = `day${Game.currentDay}`; let dayData = ManualDB[dbKey];
    
    Game.currentTab = null; 
    Game.currentIndex = 0;
    
    Game.tabProgress = { hafalan: 0, belajar: 0, partikel: 0, arti: 0 }; Game.jumpscareTriggered = false;
    Game.dailyStats = { exp: 0, coin: 0, maxCombo: 0 }; 

    if(!dayData) {
       document.getElementById('ui-day').innerText = `Hari ${Game.currentDay} (WIP)`;
       Game.sessionData = { hafalan: [{k:"WIP"}], pengayaan: [], belajar: [{a:"WIP"}], partikel: [{a:"WIP"}], arti: [{a:"WIP"}] };
       UI.switchTab('hafalan'); return;
    }

    Game.sessionData.hafalan = [...dayData.hafalan]; Game.sessionData.pengayaan = Engine.shuffle([...dayData.hafalan]); 
    Game.sessionData.belajar = [...dayData.materi]; 
    let pool = [...dayData.materi, ...(dayData.kuisExtra || [])];
    if (Game.currentDay >= 4) {
        Game.sessionData.partikel = Engine.shuffle([...pool]).slice(0, 15); Game.sessionData.arti = Engine.shuffle([...pool]).slice(0, 15);
        
        document.getElementById('tab-partikel').classList.remove('locked');
        document.getElementById('tab-arti').classList.remove('locked');
        
    } else {
        let shortPool = Engine.shuffle(pool.filter(x => !x.isMulti)); let longPool = Engine.shuffle(pool.filter(x => x.isMulti));
        Game.sessionData.partikel = [...shortPool.slice(0, 7), ...longPool.slice(0, 3)]; 
        Game.sessionData.arti = Engine.shuffle([...pool]).slice(0, 15);     
  
        document.getElementById('tab-partikel').classList.add('locked');
        document.getElementById('tab-arti').classList.add('locked');
    }
    UI.switchTab('hafalan');
  },
    decreaseHP: (evt) => {
    Game.hpLostThisTurn = true; Game.hp--; RPG.combo = 0; RPG.updateUI(); localStorage.setItem('yk_hp', Game.hp); UI.renderHP();
    RPG.spawnFloatingText("-1 HP 🩸", "var(--danger)", evt); // Memunculkan teks damage
    if(Game.hp <= 0) setTimeout(() => Cooldown.triggerDeath(Game.mode), 1000);
  },
  completeDay: () => {
    if(Game.currentDay === Game.unlockedDay) { 
        Game.unlockedDay++; localStorage.setItem('yk_unlocked', Game.unlockedDay); 
        RPG.addReward(50, 20, null); // Bonus First Clear
        UI.showToast(`Infiltrasi Hari Selesai!`, 'success'); 
    }
    
    document.getElementById('res-day').innerText = Game.currentDay;
    document.getElementById('res-exp').innerText = Game.dailyStats.exp;
    document.getElementById('res-coin').innerText = Game.dailyStats.coin;
    document.getElementById('res-combo').innerText = Game.dailyStats.maxCombo;

    UI.openModal('result-screen'); 
  }
};

const UI = {
  openModal: (id) => { const m = document.getElementById(id); m.classList.remove('hidden', 'modal-close'); m.classList.add('modal-open'); },
  closeModal: (id) => { const m = document.getElementById(id); m.classList.remove('modal-open'); m.classList.add('modal-close'); setTimeout(() => { m.classList.add('hidden'); m.classList.remove('modal-close'); }, 200); },
  showToast: (msg, type='success') => { const t = document.getElementById('toast'); t.innerText = msg; t.className = `show ${type}`; setTimeout(()=> t.className = '', 2500); },
  toggleSidebar: () => { document.getElementById('sidebar').classList.toggle('active'); document.getElementById('overlay').classList.toggle('active'); },
  
nextDayFromResult: () => {
  document.getElementById('result-box').classList.remove('show');
  setTimeout(() => {
      UI.closeModal('result-screen');
      if (Game.currentDay < Game.unlockedDay) {
          Game.currentDay++; 
      }
      Game.loadDayData();
      UI.renderMap();
  }, 400); 
},

  toggleHardcore: () => {
    document.body.classList.toggle('hardcore-mode'); let isHC = document.body.classList.contains('hardcore-mode');
    document.getElementById('btn-hardcore').innerText = isHC ? "👁️ Tampilkan Furigana" : "🥷 Mode Hardcore";
    UI.showToast(isHC ? "Mode Hardcore Aktif! Insting Ninja." : "Furigana Kembali", "success"); UI.toggleSidebar();
  },
    openKamus: () => { document.getElementById('kamus-search').value = ""; UI.renderKamusList(""); UI.openModal('kamus-modal'); },    
  searchKamus: () => { let query = document.getElementById('kamus-search').value.toLowerCase(); UI.renderKamusList(query); },
  renderKamusList: (query) => {
    const list = document.getElementById('kamus-list'); list.innerHTML = ""; let words = [];
    for(let i=1; i<=Game.unlockedDay; i++) { if(ManualDB['day'+i] && ManualDB['day'+i].hafalan) words = words.concat(ManualDB['day'+i].hafalan); }
    let uniqueWords = Array.from(new Set(words.map(a => a.k))).map(k => { return words.find(a => a.k === k) });
    if(query) uniqueWords = uniqueWords.filter(w => w.k.toLowerCase().includes(query) || (w.r && w.r.toLowerCase().includes(query)) || (w.a && w.a.toLowerCase().includes(query)));
    if(uniqueWords.length === 0) { list.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-sub);">Tidak ditemukan.</div>`; return; }
    uniqueWords.forEach(w => {
        let romajiText = w.r && w.k !== w.r ? ` (${w.r})` : "";
        list.innerHTML += `<div class="kamus-item"><div class="kamus-jp">${w.k}<span style="font-size:12px; color:var(--warning); font-weight:normal;">${romajiText}</span></div><div class="kamus-id">${w.a}</div></div>`;
    });
  },
  renderMap: () => {
    const list = document.getElementById('map-day-list'); list.innerHTML = ''; 
    const totalDays = 11; // <-- Dibatasi 11 hari sesuai kurikulummu
    let perc = Math.round(((Game.unlockedDay - 1) / totalDays) * 100); 
    document.getElementById('map-progress-text').innerText = `Progress: ${perc}%`;
    
    for (let i = 1; i <= Math.max(Game.unlockedDay, totalDays); i++) {
      const btn = document.createElement('button');
      let stat = i < Game.unlockedDay ? 'completed' : (i === Game.unlockedDay ? 'current' : 'locked');
      let wave = Math.sin((i - 1) * 1.5) * 45; 
      btn.className = `day-btn ${stat}`; 
      btn.innerText = `HARI ${i}`; 
      btn.style.transform = `translateX(${wave}px)`;
      
      if (i <= Game.unlockedDay) {
          btn.onclick = () => { 
              Game.currentDay = i; 
              Game.loadDayData(); 
              UI.closeModal('map-modal'); // Tutup peta saat hari diklik
          };
      }
      list.appendChild(btn);
    }
  },
  switchTab: (tId) => {
    if((tId === 'partikel' || tId === 'arti') && Game.hp <= 0) return;
    if(Game.currentTab) Game.tabProgress[Game.currentTab] = Game.currentIndex;
    Game.currentTab = tId; Game.currentIndex = Game.tabProgress[tId]; 
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active')); document.getElementById(`tab-${tId}`).classList.add('active');
    const isAman = (tId === 'hafalan' || tId === 'belajar');
    const badge = document.getElementById('ui-zone'); badge.className = `zone-badge ${isAman ? 'zone-aman' : 'zone-tempur'}`; badge.innerText = isAman ? "🟢 ZONA AMAN" : "🔴 ZONA TEMPUR";
    if(tId === 'belajar') { document.getElementById('tab-partikel').classList.remove('locked'); document.getElementById('tab-arti').classList.remove('locked'); }
    UI.loadStep();
  },
  triggerNextAnim: (callback) => {
    const w = document.getElementById('card-content');
    w.classList.add('fade-out'); setTimeout(() => { callback(); w.classList.remove('fade-out'); }, 250);
  },
    loadStep: () => {
    const t = Game.currentTab; const i = Game.currentIndex;
    document.getElementById('card-main').setAttribute('data-tab', t); // <-- Tambahkan baris ini!
    if (!Game.hasShield) { 
        document.getElementById('card-main').classList.remove('shield-active'); 
    } else { 
        document.getElementById('card-main').classList.add('shield-active'); 
    }
['ui-jp', 'ui-arti', 'ui-feedback', 'input-area'].forEach(id => document.getElementById(id).innerHTML = ''); 

// --- FIX BLUR BOCOR ---
let artiEl = document.getElementById('ui-arti');
artiEl.style.transition = 'none'; // 1. Matikan animasi sementara
artiEl.classList.remove('revealed'); // 2. Kembalikan ke mode Blur secara instan
artiEl.offsetHeight; // 3. Paksa browser me-render perubahan detik ini juga (Reflow)
artiEl.style.transition = ''; // 4. Nyalakan lagi animasinya untuk sentuhan berikutnya
// ----------------------

document.getElementById('btn-next').classList.add('hidden');


    const isPro = (Game.mode === 'pro');
    const btnTips = document.getElementById('btn-tips'); const tipsModal = document.getElementById('tips-modal');
const tipsH2 = tipsModal.querySelector('h2'); const tipsContent = tipsModal.querySelector('div');
const tipsBubble = document.getElementById('tips-bubble'); 
btnTips.innerHTML = "💡 Tips"; // Reset nama tombol ke default
if (tipsBubble) tipsBubble.classList.add('hidden'); 
          if (Game.currentDay === 2 && t === 'belajar' && (i === 7 || i === 11 || i === 14)) {
      btnTips.classList.remove('hidden');
      btnTips.onclick = () => {
          tipsH2.innerHTML = "💡 INFO BUDAYA & KONTEKS";
          tipsContent.innerHTML = `Dalam bahasa Jepang, pola <b>A は B です</b> tidak selamanya berarti "A adalah B" secara harfiah.<br><br>
          <span style="color:var(--text-sub); font-size:13px;">Orang Jepang sering menyingkat kalimat jika lawan bicaranya secara logika sudah pasti paham maksudnya. Kalimat <b style="color:white;">山田さんは会社です</b> secara harfiah berarti <i>"Yamada (ada di) kantor"</i>.</span><br><br>
          <span style="color:var(--text-sub); font-size:13px;">Karena manusia tidak mungkin berubah menjadi wujud bangunan, orang Jepang akan otomatis mengerti dari konteks bahwa maksudnya adalah <b>Yamada sedang berada di kantor</b>.</span><br><br>
          <i style="color:var(--gold); font-size:13px;">Catatan: Hal ini juga berlaku untuk kalimat seperti "Saya (ada di) toilet" (私はトイレです) atau "Dia (ada di) sekolah" (彼は学校です). Terdengar aneh di bahasa kita, tapi sangat natural di bahasa Jepang!</i>`;
          UI.openModal('tips-modal');
      };
    } else if (Game.currentDay === 3 && t === 'belajar') {
      btnTips.classList.remove('hidden');
      btnTips.onclick = () => {
          tipsH2.innerHTML = "💡 INFO PENYANGKALAN";
          tipsContent.innerHTML = `Dalam bahasa Jepang, ada 3 tingkat kesopanan untuk mengatakan <b>"Bukan"</b>:<br><br><span style="color:var(--primary); font-weight:bold;">1. ... dewa arimasen (ではありません)</span><br><br><span style="color:var(--success); font-weight:bold;">2. ... jaa arimasen (じゃありません)</span><br><br><span style="color:var(--danger); font-weight:bold;">3. ... jaa nai (じゃない)</span><br><br><i style="color:var(--gold); font-size:13px;">Catatan: Fokus kita di kuis nanti adalah bentuk sopan (dewa/jaa arimasen) ya!</i>`;
          tipsModal.classList.remove('hidden');
      };
    } else if (Game.currentDay === 4 && t === 'belajar' && i < 9) {
      btnTips.classList.remove('hidden');
      btnTips.onclick = () => {
          tipsH2.innerHTML = "💡 MISTERI TANDA TANYA (?)";
          tipsContent.innerHTML = `Mungkin kamu bingung mengapa kalimat tanya di sini tidak memakai tanda tanya (?). Berikut penjelasannya:<br><br>
          <span style="color:var(--primary); font-weight:bold;">1. Peran Partikel か (ka)</span><br>
          <span style="color:var(--text-sub); font-size:13px;">Dalam bahasa Jepang formal, partikel <b>か</b> di akhir kalimat sudah berfungsi sebagai tanda tanya. Jadi, secara aturan standar, kita hanya perlu mengakhirinya dengan tanda titik (。).</span><br><br>
          <span style="color:var(--success); font-weight:bold;">2. Kapan "?" Digunakan?</span><br>
          <span style="color:var(--text-sub); font-size:13px;">Tanda tanya biasanya muncul pada tulisan <b>Kasual</b> (seperti chat teman, Manga, atau Novel). Hal ini dilakukan karena dalam percakapan santai, partikel "ka" sering dihilangkan, sehingga tanda tanya digunakan untuk menandai intonasi nada yang naik di akhir kalimat.</span><br><br>
          <i style="color:var(--gold); font-size:13px;">Kesimpulan: Selama ada partikel "ka", tanda titik sudah cukup untuk bertanya!</i>`;
          UI.openModal('tips-modal');
      };
    } else if (Game.currentDay === 4 && t === 'belajar' && i >= 9) {
      btnTips.classList.remove('hidden');
      
      if (!Game.chigaimasuTipSeen) {
          tipsBubble.classList.remove('hidden');
      }
 
      btnTips.onclick = () => {
          Game.chigaimasuTipSeen = true; 
          tipsBubble.classList.add('hidden'); 
          tipsH2.innerHTML = "💡 RAHASIA SOU DESU & CHIGAIMASU";
          tipsContent.innerHTML = `Dalam percakapan bahasa Jepang, orang jarang mengulang seluruh kalimat untuk menjawab "Ya" atau "Tidak". Mereka menggunakan variasi ini:<br><br>
          <span style="color:var(--success); font-weight:bold;">1. Sou desu (そうです)</span><br>
          <span style="color:var(--text-sub); font-size:13px;">Secara harfiah berarti <b>"Seperti itu / Begitulah adanya"</b>. Digunakan untuk membenarkan asumsi lawan bicara. Terjemahan naturalnya: <b>"Ya, kamu benar."</b></span><br><br>
          <span style="color:var(--danger); font-weight:bold;">2. Chigaimasu (違います)</span><br>
          <span style="color:var(--text-sub); font-size:13px;">Secara harfiah berarti <b>"Berbeda / Salah"</b>. Di kepala orang Jepang, saat menjawab <i>Iie, chigaimasu</i>, mereka sedang berkata: <i>"Tidak, (asumsimu itu) salah atau berbeda dengan kenyataan."</i> Terjemahan naturalnya: <b>"Bukan, kamu salah."</b></span>`;
          UI.openModal('tips-modal');
      };
    } else if (Game.currentDay === 6 && t === 'belajar' && i === 6) { 
      btnTips.classList.remove('hidden');
      btnTips.onclick = () => {
          tipsH2.innerHTML = "💡 INFO BUDAYA: ISHA VS SENSEI";
          tipsContent.innerHTML = `Dalam bahasa Jepang, profesi medis secara harfiah disebut <b style="color:var(--primary);">Isha (医者)</b>. Namun, di anime atau dorama, kamu mungkin sering mendengar dokter dipanggil <b style="color:var(--success);">Sensei (先生)</b>. Apa bedanya?<br><br>
          <span style="color:var(--text-sub); font-size:13px;">1. <b>Isha (Profesi)</b>: Dipakai saat kita membicarakan pekerjaan seseorang secara objektif. (Contoh: "Ayahku adalah seorang dokter / isha").</span><br><br>
          <span style="color:var(--text-sub); font-size:13px;">2. <b>Sensei (Gelar Kehormatan)</b>: Karena profesi medis sangat dihormati di Jepang, kata "Sensei" digunakan untuk <b>menyapa atau memanggil</b> dokter secara langsung.</span>
          
          <div style="background-color:rgba(0,0,0,0.2); padding:15px; border-radius:10px; margin-top:20px; text-align:left;">
              <span style="color:var(--gold); font-size:14px; font-weight:bold;">💡 Kesimpulan:</span><br>
              <i style="color:var(--gold); font-size:13px; line-height:1.6; display:block; margin-top:8px;">Saat mengobrol dengan dokter di klinik, panggillah mereka <b>Sensei</b>, bukan <b>Isha</b>!</i>
              <p style="margin-bottom:0;"></p>
          </div>`;
          UI.openModal('tips-modal');
      };
    } else if (Game.currentDay === 7 && t === 'belajar') {
      btnTips.classList.remove('hidden');
      if (i >= 8) {
          if (!Game.uchiSotoTipSeen) {
              tipsBubble.classList.remove('hidden');
          }
          
          btnTips.onclick = () => {
              Game.uchiSotoTipSeen = true; 
              tipsBubble.classList.add('hidden'); 
              
              tipsH2.innerHTML = "💡 UCHI & SOTO (KELUARGA)";
              tipsContent.innerHTML = `
              <div id="slide-uchi-1" class="slide-page">
                  <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                      Pernahkah kamu bertanya-tanya, kenapa bahasa Jepang punya banyak sekali sebutan untuk keluarga? Tenang saja, kamu tidak sendirian! Sangat wajar kalau pemula merasa kebingungan.<br><br>
                      Kuncinya ada pada konsep <b>Uchi-Soto</b> (Orang Dalam vs Orang Luar). Mari kita kenalan perlahan dengan dua kelompok ini:<br>
                  </span>
                  <span style="color:var(--primary); font-weight:bold; font-size: 15px;">1. Kelompok "Merendah" (Uchi)</span><br>
                  <span style="color:var(--text-sub); font-size:13px;">Digunakan KHUSUS saat menceritakan keluarga SENDIRI kepada orang luar.</span><br>
                  <span style="font-size:14px; line-height:1.6;">
                  • <b>Chichi</b> (Ayah), <b>Haha</b> (Ibu)<br>
                  • <b>Ani</b> (Kakak Laki), <b>Ane</b> (Kakak Peremp)<br>
                  </span>
                  <span style="color:var(--gold); font-size:12px; display:block; margin-top:4px;"><i>Contoh: これは私の<b>父</b>です。<br>(Kore wa watashi no <b>chichi</b> desu / Ini adalah ayah saya).</i></span><br>
                  
                  <button class="btn" style="padding:10px; font-size:14px; margin-top:10px; background:var(--gold); width:100%;" onclick="document.getElementById('slide-uchi-1').style.display='none'; document.getElementById('slide-uchi-2').style.display='block';">Lanjutkan ➡️</button>
              </div>
              
              <div id="slide-uchi-2" class="slide-page" style="display:none;">
                  <span style="color:var(--success); font-weight:bold; font-size: 15px;">2. Kelompok "Hormat" (Soto)</span><br>
                  <span style="color:var(--text-sub); font-size:13px;">Digunakan untuk menghormati keluarga ORANG LAIN.</span><br>
                  <span style="font-size:14px; line-height:1.6;">
                  • <b>Otousan</b> (Ayah), <b>Okaasan</b> (Ibu)<br>
                  • <b>Oniisan</b> (Kakak Laki), <b>Oneesan</b> (Kakak Peremp)<br>
                  </span>
                  <span style="color:var(--gold); font-size:12px; display:block; margin-top:4px;"><i>Contoh: それはケンさんの<b>お母さん</b>です。<br>(Sore wa Ken-san no <b>okaasan</b> desu / Itu adalah ibu Ken).</i></span><br>
                  
                  <div style="display:flex; gap:10px; margin-top:15px;">
                      <button class="btn btn-alt" style="padding:10px; font-size:14px; flex:1;" onclick="document.getElementById('slide-uchi-2').style.display='none'; document.getElementById('slide-uchi-1').style.display='block';">⬅️ Kembali</button>
                      <button class="btn" style="padding:10px; font-size:14px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-uchi-2').style.display='none'; document.getElementById('slide-uchi-3').style.display='block';">Lanjutkan ➡️</button>
                  </div>
              </div>

              <div id="slide-uchi-3" class="slide-page" style="display:none;">
                  <span style="color:var(--warning); font-weight:bold; font-size: 15px;">💡 Jebakan Klasik: Menceritakan vs Memanggil</span><br>
                  <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-top:8px;">
                      Banyak pemula sering terjebak di sini. Kamu mungkin bertanya: <i>"Kalau Chichi itu untuk ayah sendiri, kenapa anak-anak di rumah memanggil ayah mereka dengan sebutan Otousan?"</i><br><br>
                      Jawabannya ada pada <b>situasi</b> saat berbicara:<br><br>
                      <b style="color:white;">1. Saat Memanggil Langsung (Face-to-Face)</b><br>
                      Di dalam rumah, orang tua memiliki posisi yang lebih tinggi dan harus kamu hormati. Oleh karena itu, saat kamu menyapa atau memanggil mereka secara langsung, kamu <b>wajib</b> memakai kata hormat.
                  </span>
                  <div style="display:flex; gap:10px; margin-top:15px;">
                      <button class="btn btn-alt" style="padding:10px; font-size:14px; flex:1;" onclick="document.getElementById('slide-uchi-3').style.display='none'; document.getElementById('slide-uchi-2').style.display='block';">⬅️ Kembali</button>
                      <button class="btn" style="padding:10px; font-size:14px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-uchi-3').style.display='none'; document.getElementById('slide-uchi-4').style.display='block';">Lanjutkan lagi? ➡️</button>
                  </div>
              </div>

              <div id="slide-uchi-4" class="slide-page" style="display:none;">
                  <span style="color:var(--warning); font-weight:bold; font-size: 15px;">💡 Lanjutan: Memanggil Langsung</span><br>
                  <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-top:8px;">
                      • <i>Anak menyapa ibunya di rumah:</i><br>
                      <span style="color:white;">「<b>お母さん</b>、元気ですか。」</span><br>
                      <i>(<b>Okaasan</b>, genki desu ka / Ibu, apa kabar?)</i> ✅<br><br>
                      Seorang anak di Jepang <b>TIDAK AKAN PERNAH</b> memanggil ayahnya dengan berteriak "Chichi!" ke wajahnya. Itu akan terdengar sangat aneh dan kurang ajar, lho!
                  </span>
                  <div style="display:flex; gap:10px; margin-top:15px;">
                      <button class="btn btn-alt" style="padding:10px; font-size:14px; flex:1;" onclick="document.getElementById('slide-uchi-4').style.display='none'; document.getElementById('slide-uchi-3').style.display='block';">⬅️ Kembali</button>
                      <button class="btn" style="padding:10px; font-size:14px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-uchi-4').style.display='none'; document.getElementById('slide-uchi-5').style.display='block';">Masih mau lanjut lagi? ➡️</button>
                  </div>
              </div>

              <div id="slide-uchi-5" class="slide-page" style="display:none;">
                  <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block;">
                      <b style="color:white; font-size: 14px;">2. Saat Menceritakan ke Orang Luar</b><br>
                      Nah, barulah aturan 'Uchi' (merendah) tadi berlaku! Saat kamu ngobrol dengan teman, dan menceritakan keluargamu, kamu <b>harus merendahkan statusnya</b>.<br><br>
                      • <i>Bicara ke teman soal ayah sendiri:</i><br>
                      <span style="color:white;">「<b>父</b>は家です。」</span><br>
                      <i>(<b>Chichi</b> wa ie desu / Ayahku ada di rumah.)</i> ✅<br><br>
                      • <i>Bertanya ke teman soal ayahnya:</i><br>
                      <span style="color:white;">「<b>お父さん</b>は家ですか。」</span><br>
                      <i>(<b>Otousan</b> wa ie desu ka / Apakah ayahmu ada di rumah?)</i> ✅<br>
                      
                      <div style="background:rgba(255, 215, 0, 0.1); padding:8px; border-left:3px solid var(--gold); margin:8px 0; font-size:12px;">
                          <b>Ke mana perginya "Watashi no" & "Anata no"? 🤔</b><br>
                          Di Jepang, kata <i>watashi no</i> dan <i>anata no</i> sangat sering <b>dibuang</b> jika konteksnya sudah jelas. Kata <i>Chichi</i> otomatis berarti "ayahku", dan <i>Otousan</i> otomatis berarti "ayahmu"!
                      </div>
                  </span>
                  <div style="display:flex; gap:10px; margin-top:15px;">
                      <button class="btn btn-alt" style="padding:10px; font-size:14px; flex:1;" onclick="document.getElementById('slide-uchi-5').style.display='none'; document.getElementById('slide-uchi-4').style.display='block';">⬅️ Kembali</button>
                      <button class="btn" style="padding:10px; font-size:14px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-uchi-5').style.display='none'; document.getElementById('slide-uchi-6').style.display='block';">Ini yang terakhir, wkwk ➡️</button>
                  </div>
              </div>

              <div id="slide-uchi-6" class="slide-page" style="display:none;">
                  <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block;">
                      <b style="color:var(--warning); font-size: 15px;">Mari kita simpulkan pelan-pelan:</b><br><br>
                      • <b>Memanggil langsung</b>:<br>Wajib pakai gelar hormat (Otousan/Okaasan).<br><br>
                      • <b>Menceritakan (ke orang luar)</b>:<br>Wajib pakai gelar merendah (Chichi/Haha).<br><br>
                      <i style="color:var(--gold);">Sampai di sini, sudah mulai terbayang kan bedanya? Pelan-pelan saja memahaminya, kamu pasti bisa! 😊</i>
                  </span>
                  
                  <div style="display:flex; gap:10px; margin-top:20px;">
                      <button class="btn btn-alt" style="padding:10px; font-size:14px; flex:1;" onclick="document.getElementById('slide-uchi-6').style.display='none'; document.getElementById('slide-uchi-5').style.display='block';">⬅️ Kembali</button>
                      <button class="btn" style="padding:10px; font-size:14px; background:var(--success); color:#000; flex:1;" onclick="document.getElementById('slide-uchi-6').style.display='none'; document.getElementById('slide-uchi-1').style.display='block'; UI.closeModal('tips-modal');">Selesai ✅</button>
                  </div>
              </div>`;
              
              UI.openModal('tips-modal'); 
          };
      } 
      else {       
          btnTips.onclick = () => {
              tipsH2.innerHTML = "💡 FUNGSI PARTIKEL NO (の)";
              tipsContent.innerHTML = `Partikel <b>の (no)</b> berfungsi menghubungkan dua kata benda. KB1 bertugas menerangkan KB2:<br><br>
              <span style="color:var(--primary); font-weight:bold;">1. Kepemilikan:</span> 私の本 (Buku saya)<br>
              <span style="color:var(--success); font-weight:bold;">2. Asal/Anggota:</span> 日本の学生 (Siswa asal Jepang)<br>
              <span style="color:var(--warning); font-weight:bold;">3. Keterangan Jenis:</span> 日本語の本 (Buku bahasa Jepang)<br>
              <span style="color:var(--danger); font-weight:bold;">4. Buatan/Merek:</span> ヤマハのバイク (Motor buatan Yamaha)<br>
              <span style="color:var(--gold); font-weight:bold;">5. Status/Jabatan:</span> 社長の山田さん (Pak Yamada yang menjabat Presdir)<br><br>
              <i style="color:var(--gold); font-size:13px;">Catatan: Intinya, KB1 (yang di depan) adalah informasi tambahan untuk memperjelas KB2 (benda utamanya)!</i>`;
              UI.openModal('tips-modal');
          };
      }
    } else if (Game.currentDay === 8 && t === 'belajar') {
      btnTips.classList.remove('hidden');
      
      btnTips.onclick = () => {
          tipsH2.innerHTML = "💡 KELUARGA KOSOADO (BENDA)";
          tipsContent.innerHTML = `
          <div id="slide-kosoado-1">
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Sistem kata tunjuk di Jepang sangat rapi lho! Kuncinya ada di awalan <b>Ko-So-A-Do</b> (Ini - Itu dekat - Itu jauh - Mana).<br><br>
                  Mari kita lihat <b style="color:var(--primary);">Kelompok 1: Benda Mandiri</b>.<br>
                  Kelompok ini bisa berdiri sendiri sebagai Subjek dalam kalimat (langsung diikuti partikel <b>wa</b>).
              </span>
              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden;">
                  <tr style="background:rgba(56, 189, 248, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">Jepang</th>
                      <th style="padding:8px; border:1px solid #334155;">Arti</th>
                      <th style="padding:8px; border:1px solid #334155;">Contoh</th>
                  </tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>これ (Kore)</b></td><td style="padding:8px; border:1px solid #334155;">Ini</td><td style="padding:8px; border:1px solid #334155;"><b>これ</b>は本です。</td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>それ (Sore)</b></td><td style="padding:8px; border:1px solid #334155;">Itu (di dekatmu)</td><td style="padding:8px; border:1px solid #334155;"><b>それ</b>は本です。</td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>あれ (Are)</b></td><td style="padding:8px; border:1px solid #334155;">Itu (di sana)</td><td style="padding:8px; border:1px solid #334155;"><b>あれ</b>は本です。</td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155; color:var(--warning);"><b>どれ (Dore)</b></td><td style="padding:8px; border:1px solid #334155; color:var(--warning);">Yang mana</td><td style="padding:8px; border:1px solid #334155; color:var(--warning);">あなたの本は<b>どれ</b>ですか。</td></tr>
              </table>
              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-kosoado-1').style.display='none'; document.getElementById('slide-kosoado-2').style.display='block';">Lanjut  ➡️</button>
          </div>
          
          <div id="slide-kosoado-2" style="display:none;">
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                   <b style="color:var(--success);">Kelompok 2: Penunjuk Benda</b>.<br>
                  Berbeda dengan Kore/Sore, kata-kata ini <b>TIDAK BISA</b> berdiri sendiri. Mereka <b>wajib menempel</b> langsung dengan kata benda!
              </span>
              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden;">
                  <tr style="background:rgba(34, 197, 94, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">Jepang</th>
                      <th style="padding:8px; border:1px solid #334155;">Arti</th>
                      <th style="padding:8px; border:1px solid #334155;">Contoh</th>
                  </tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>この (Kono)</b></td><td style="padding:8px; border:1px solid #334155;">... ini</td><td style="padding:8px; border:1px solid #334155;"><b>この</b>本は...</td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>その (Sono)</b></td><td style="padding:8px; border:1px solid #334155;">... itu (dekatmu)</td><td style="padding:8px; border:1px solid #334155;"><b>その</b>本は...</td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>あの (Ano)</b></td><td style="padding:8px; border:1px solid #334155;">... itu (di sana)</td><td style="padding:8px; border:1px solid #334155;"><b>あの</b>本は...</td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155; color:var(--warning);"><b>どの (Dono)</b></td><td style="padding:8px; border:1px solid #334155; color:var(--warning);">... yang mana</td><td style="padding:8px; border:1px solid #334155; color:var(--warning);"><b>どの</b>本ですか。</td></tr>
              </table>
              <div style="background:rgba(239, 68, 68, 0.1); padding:8px; border-left:3px solid var(--danger); margin:15px 0 8px 0; font-size:12px;">
                  <b>⚠️ JANGAN TERTUKAR!</b><br>
                  ❌ <b>この</b>は本です。 <i>(Salah!)</i><br>
                  ✅ <b>これ</b>は本です。 <i>(Benar: Ini adalah buku)</i><br>
                  ✅ <b>この</b>本は私の本です。 <i>(Benar: Buku ini adalah milikku)</i>
              </div>
              <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; width:100%;" onclick="document.getElementById('slide-kosoado-2').style.display='none'; document.getElementById('slide-kosoado-1').style.display='block';">⬅️ Kembali ke Slide 1</button>
          </div>`;
          UI.openModal('tips-modal');
      };
      
    } else if (Game.currentDay === 9 && t === 'belajar') {
      btnTips.classList.remove('hidden');
      
      btnTips.onclick = () => {
          
          tipsH2.innerHTML = "💡 KELUARGA KOSOADO (TEMPAT & ARAH)";
          tipsContent.innerHTML = `
          <div id="slide-kosoado9-1" class="slide-page">
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Setelah belajar menunjuk benda di Hari 8, sekarang kita akan menunjuk <b>Lokasi</b> dan <b>Arah</b>.<br><br>
                  Mari kita kenalan dengan <b style="color:var(--primary);">Kelompok 3: Penunjuk Tempat</b>.<br>
                  Digunakan murni untuk menunjukkan lokasi di mana Anda atau suatu benda berada.
              </span>
              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden;">
                  <tr style="background:rgba(56, 189, 248, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">Jepang</th>
                      <th style="padding:8px; border:1px solid #334155;">Arti</th>
                      <th style="padding:8px; border:1px solid #334155;">Contoh</th>
                  </tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>ここ (Koko)</b></td><td style="padding:8px; border:1px solid #334155;">Di sini</td><td style="padding:8px; border:1px solid #334155;"><b>ここ</b>は学校です。</td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>そこ (Soko)</b></td><td style="padding:8px; border:1px solid #334155;">Di situ</td><td style="padding:8px; border:1px solid #334155;">トイレは<b>そこ</b>です。</td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>あそこ (Asoko)</b></td><td style="padding:8px; border:1px solid #334155;">Di sana (jauh)</td><td style="padding:8px; border:1px solid #334155;"><b>あそこ</b>は病院です。</td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155; color:var(--warning);"><b>どこ (Doko)</b></td><td style="padding:8px; border:1px solid #334155; color:var(--warning);">Di mana</td><td style="padding:8px; border:1px solid #334155; color:var(--warning);">学校は<b>どこ</b>ですか。</td></tr>
              </table>
              <div style="background:rgba(239, 68, 68, 0.1); padding:8px; border-left:3px solid var(--danger); margin:15px 0 8px 0; font-size:12px;">
                  <b>⚠️ AWAS JEBAKAN LOGIKA!</b><br>
                  Tempat tidak bisa berubah menjadi benda. <br>
                  ❌ <b>ここ</b>はラーメンです。 <i>(Salah: Di sini adalah ramen??)</i><br>
                  ✅ ラーメンは<b>ここ</b>です。 <i>(Benar: Ramen ada di sini)</i><br>
              </div>
              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-kosoado9-1').style.display='none'; document.getElementById('slide-kosoado9-2').style.display='block';">Lanjut ke Level Sopan ➡️</button>
          </div>
          
          <div id="slide-kosoado9-2" class="slide-page" style="display:none;">
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                   <b style="color:var(--success);">Kelompok 4: Penunjuk Arah & Kesopanan</b>.<br>
                  Fungsi aslinya adalah untuk menunjuk <b>Arah</b> (Sebelah sini/sana). Namun, orang Jepang menggunakannya sebagai <b>bentuk sangat sopan</b> pengganti <i>Kore, Koko,</i> dan untuk menunjuk <i>Orang</i>!
              </span>
              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden;">
                  <tr style="background:rgba(34, 197, 94, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">Jepang</th>
                      <th style="padding:8px; border:1px solid #334155;">Arti Harfiah</th>
                      <th style="padding:8px; border:1px solid #334155;">Fungsi Sopan</th>
                  </tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>こちら (Kochira)</b></td><td style="padding:8px; border:1px solid #334155;">Sebelah sini</td><td style="padding:8px; border:1px solid #334155;">Ini / Di sini / <b>Beliau ini</b></td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>そちら (Sochira)</b></td><td style="padding:8px; border:1px solid #334155;">Sebelah situ</td><td style="padding:8px; border:1px solid #334155;">Itu / Di situ / <b>Pihak Anda</b></td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>あちら (Achira)</b></td><td style="padding:8px; border:1px solid #334155;">Sebelah sana</td><td style="padding:8px; border:1px solid #334155;">Itu / Di sana / <b>Beliau itu</b></td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155; color:var(--warning);"><b>どちら (Dochira)</b></td><td style="padding:8px; border:1px solid #334155; color:var(--warning);">Sebelah mana</td><td style="padding:8px; border:1px solid #334155; color:var(--warning);">Di mana / <b>Siapa (Sopan)</b></td></tr>
              </table>
              <div style="background:rgba(34, 197, 94, 0.1); padding:8px; border-left:3px solid var(--success); margin:15px 0 8px 0; font-size:12px;">
                  <b>💡 INFO BUDAYA:</b><br>
                  Saat memperkenalkan orang lain (misal atasan atau guru), <b>JANGAN</b> gunakan <i>Kore</i> atau <i>Kono hito</i>, karena terdengar kasar seolah menunjuk barang. Gunakanlah <b>Kochira</b>!<br>
                  ✅ <b>こちら</b>は山田先生です。 <i>(Beliau ini adalah Guru Yamada).</i>
              </div>
              <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; width:100%;" onclick="document.getElementById('slide-kosoado9-2').style.display='none'; document.getElementById('slide-kosoado9-1').style.display='block';">⬅️ Kembali ke Slide 1</button>
          </div>`;
          UI.openModal('tips-modal');
      };
    } else if (Game.currentDay === 10 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      btnTips.onclick = () => {
          Game.keiyoushiTipSeen = true;
          tipsBubble.classList.add('hidden');

          tipsH2.innerHTML = "💡 RAHASIA KATA SIFAT (KEIYOUSHI)";
          tipsContent.innerHTML = `
          <div id="slide-ks-1" class="slide-page">
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Sifat benda terbagi menjadi dua kelompok besar: <b>KS-i</b> dan <b>KS-na</b>. Cara mereka menempel pada kata benda sangat berbeda, lho!<br><br>
                  <b style="color:var(--primary); font-size:14px;">1. Saat Menempel pada Kata Benda</b><br>
                  Pola dasarnya selalu: <b style="color:white;">Sifat + Benda</b>.
              </span>
              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden;">
                  <tr style="background:rgba(56, 189, 248, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">Tipe</th>
                      <th style="padding:8px; border:1px solid #334155;">Aturan</th>
                      <th style="padding:8px; border:1px solid #334155;">Contoh</th>
                  </tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>KS-i</b></td><td style="padding:8px; border:1px solid #334155;">Nempel Langsung</td><td style="padding:8px; border:1px solid #334155;">赤<b>い</b>花<br><i>(Aka-i hana)</i></td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>KS-na</b></td><td style="padding:8px; border:1px solid #334155;">Wajib pakai "na"</td><td style="padding:8px; border:1px solid #334155;">有名<b>な</b>本<br><i>(Yuumee-na hon)</i></td></tr>
              </table>
              <div style="background:rgba(234, 179, 8, 0.1); padding:8px; border-left:3px solid var(--warning); margin:15px 0 8px 0; font-size:12px;">
                  <b>💡 Kenapa disebut KS-na?</b><br>
                  Karena partikel <b>"na"</b> ini ibarat lem. Suku kata "na" HANYA muncul saat ia bertugas menempelkan kata sifat ke kata benda di depannya!
              </div>
              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-ks-1').style.display='none'; document.getElementById('slide-ks-2').style.display='block';">Lanjut ke Bentuk Negatif ➡️</button>
          </div>

          <div id="slide-ks-2" class="slide-page" style="display:none;">
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  <b style="color:var(--success); font-size:14px;">2. Merubah Sifat Jadi Negatif ("Tidak...")</b><br>
                  Saat kata sifat berdiri sendiri sebagai predikat di akhir kalimat, aturannya:
              </span>
              <span style="color:var(--primary); font-weight:bold; font-size:13px;">Kelompok KS-i</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Buang huruf <b>"i"</b> terakhir, ganti dengan <b>"ku arimasen"</b>.<br>
                  • 高<b>い</b> (Taka-i) -> 高<b>くありません</b> (Taka-ku arimasen)
              </span>
              <span style="color:var(--success); font-weight:bold; font-size:13px;">Kelompok KS-na</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block;">
                  Karena tidak pakai lem "na" (ia tidak menempel pada benda lain), langsung tambahkan <b>"dewa arimasen"</b>.<br>
                  • 有名 (Yuumee) -> 有名<b>ではありません</b> (Yuumee dewa arimasen)
              </span>
              <div style="background:rgba(239, 68, 68, 0.1); padding:8px; border-left:3px solid var(--danger); margin:15px 0 8px 0; font-size:12px;">
                  <b>⚠️ AWAS JEBAKAN:</b><br>
                  KS-na yang berakhiran bunyi "i" (seperti Kiree / Yuumee) sering dikira KS-i. Mereka tetap masuk kelompok KS-na!
              </div>
              <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; width:100%;" onclick="document.getElementById('slide-ks-2').style.display='none'; document.getElementById('slide-ks-1').style.display='block';">⬅️ Kembali</button>
          </div>`;
          UI.openModal('tips-modal');
      };
      
          } else if (Game.currentDay === 11 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      btnTips.onclick = () => {
          Game.pastTenseTipSeen = true;
          tipsBubble.classList.add('hidden');

          tipsH2.innerHTML = "💡 LINTAS WAKTU (MASA LAMPAU)";
          tipsContent.innerHTML = `
          <div id="slide-lampau-1" class="slide-page">
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Selamat datang di mesin waktu! Saat menceritakan masa lalu (Kemarin, Dulu), kata sifat di Jepang ikut berubah wujud. Mari mulai dengan <b style="color:var(--primary);">Kata Sifat-i</b>.
              </span>
              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden;">
                  <tr style="background:rgba(56, 189, 248, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">Positif (+)</th>
                      <th style="padding:8px; border:1px solid #334155;">Negatif (-)</th>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;">
                          Hapus "i" ➔ <b>~katta desu</b><br><br>
                          寒<b>い</b> (samu-i)<br>↓<br>寒<b>かったです</b> (samu-katta desu)
                      </td>
                      <td style="padding:8px; border:1px solid #334155;">
                          Hapus "i" ➔ <b>~ku arimasen deshita</b><br><br>
                          寒<b>い</b> (samu-i)<br>↓<br>寒<b>くありませんでした</b>
                      </td>
                  </tr>
              </table>
              <div style="background:rgba(239, 68, 68, 0.1); padding:8px; border-left:3px solid var(--danger); margin:15px 0 8px 0; font-size:12px;">
                  <b>⚠️ JEBAKAN MAUT KS-I:</b><br>
                  Tenses diurus langsung oleh kata sifatnya. Jadi, ujungnya <b>TETAP PAKAI "DESU"</b>, jangan ikut-ikutan jadi "deshita"!<br>
                  ❌ 寒いでした (Samui deshita)<br>
                  ✅ 寒<b>かった</b>です (Samu-katta desu)
              </div>
              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-lampau-1').style.display='none'; document.getElementById('slide-lampau-2').style.display='block';">Lanjut ke Kata Sifat-na ➡️</button>
          </div>

          <div id="slide-lampau-2" class="slide-page" style="display:none;">
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Sekarang giliran <b style="color:var(--success);">Kata Sifat-na</b>. Berbeda dengan KS-i, KS-na tidak bisa merubah bentuk tubuhnya sendiri. Jadi, tugas mengubah waktu diserahkan 100% kepada "Desu".
              </span>
              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden;">
                  <tr style="background:rgba(34, 197, 94, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">Positif (+)</th>
                      <th style="padding:8px; border:1px solid #334155;">Negatif (-)</th>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;">
                          + <b>deshita</b><br><br>
                          暇 (Hima)<br>↓<br>暇<b>でした</b> (Hima deshita)
                      </td>
                      <td style="padding:8px; border:1px solid #334155;">
                          + <b>dewa arimasen deshita</b><br><br>
                          暇 (Hima)<br>↓<br>暇<b>ではありませんでした</b>
                      </td>
                  </tr>
              </table>
              <div style="display:flex; gap:10px; margin-top:15px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-lampau-2').style.display='none'; document.getElementById('slide-lampau-1').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-lampau-2').style.display='none'; document.getElementById('slide-lampau-3').style.display='block';">Misteri Kalimat Tanya ➡️</button>
              </div>
          </div>
          
          <div id="slide-lampau-3" class="slide-page" style="display:none;">
              <span style="color:var(--warning); font-weight:bold; font-size: 15px;">💡 Misteri "Desu ka" vs "Deshita ka"</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-top:8px;">
                  Bagaimana kalau mau bertanya, "Apakah kemarin...?"<br>
                  Ingat kembali hukum mutlak yang baru kita pelajari:<br><br>
                  <b style="color:var(--primary);">Untuk Kata Sifat-i:</b><br>
                  Pakai <b>~katta desu ka?</b><br>
                  Contoh: 忙し<b>かったですか</b>。<br>
                  <i>(Bukan: Isogashikatta deshita ka)</i><br><br>
                  <b style="color:var(--success);">Untuk Kata Sifat-na:</b><br>
                  WAJIB pakai <b>~deshita ka?</b><br>
                  Contoh: 暇<b>でしたか</b>。<br>
                  <i>(Karena KS-na tidak bisa berubah bentuk, desu-nya yang harus jadi masa lalu!)</i>
              </span>
              
              <div style="display:flex; gap:10px; margin-top:20px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-lampau-3').style.display='none'; document.getElementById('slide-lampau-2').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--success); color:#000; flex:1;" onclick="document.getElementById('slide-lampau-3').style.display='none'; document.getElementById('slide-lampau-1').style.display='block'; UI.closeModal('tips-modal');">Paham! ✅</button>
              </div>
          </div>`;
                    UI.openModal('tips-modal');
      };
         
    } else if (Game.currentDay === 12 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      if (i < 10) {
          // FASE 1 & 2: Pengenalan Imasu/Arimasu & Partikel Ni + Ga
          btnTips.onclick = () => {
              tipsH2.innerHTML = "💡 LOKASI & EKSISTENSI";
              tipsContent.innerHTML = `Dalam menyatakan keberadaan, kita berkenalan dengan dua partikel krusial dan dua kata kerja penting:<br><br>
              <span style="color:var(--primary); font-weight:bold;">1. Partikel に (Ni) = "Di"</span><br>
              <span style="color:var(--text-sub); font-size:13px; display:block; margin-bottom:10px;">Diletakkan setelah nama tempat atau posisi untuk menandakan "di mana" benda itu eksis. (Contoh: 部屋<b>に</b> = Di kamar).</span>
              
              <span style="color:var(--success); font-weight:bold;">2. Partikel が (Ga) = Subjek Eksistensi</span><br>
              <span style="color:var(--text-sub); font-size:13px; display:block; margin-bottom:10px;">Diletakkan setelah benda/makhluk yang ADA. Partikel ini memberi fokus/sorotan pada benda yang baru saja kita temukan.</span>
              
              <span style="color:var(--warning); font-weight:bold;">3. います (Imasu) vs あります (Arimasu)</span><br>
              <span style="color:var(--text-sub); font-size:13px; display:block; margin-bottom:10px;">Keduanya sama-sama berarti <b>"Ada"</b>, tapi dibedakan berdasarkan nyawa benda tersebut:
              <br>• <b>います (Imasu)</b>: Untuk benda hidup dan bisa bergerak sendiri (Manusia, Hewan).
              <br><i>Contoh: 庭に 犬が <b>います</b> (Di taman ada anjing).</i>
              <br>• <b>あります (Arimasu)</b>: Untuk benda mati atau yang menancap di tanah (Benda, Kendaraan, Tanaman).
              <br><i>Contoh: 庭に ひまわりが <b>あります</b> (Di taman ada bunga matahari).</i></span>

              <span style="color:var(--danger); font-weight:bold;">4. Tonari vs Yoko vs Soba</span><br>
              <span style="color:var(--text-sub); font-size:13px; display:block; margin-bottom:10px;">Ketiganya berarti "di sebelah/dekat", tapi beda penggunaannya lho:
              <br>• <b>隣 (Tonari)</b>: Bersebelahan, tapi <b>harus satu jenis/kategori</b>. (Contoh: Rumah di sebelah rumah, Budi di sebelah Andi).
              <br>• <b>横 (Yoko)</b>: Di samping (sumbu horizontal kiri/kanan). <b>Bebas beda jenis</b>. (Contoh: Kucing di samping meja).
              <br>• <b>そば (Soba)</b>: Di dekat. Jaraknya sangat dekat (bisa dijangkau), dan posisinya bebas tidak harus di samping.</span>
              
              <div style="background:rgba(255, 215, 0, 0.1); padding:10px; border-left:3px solid var(--gold); margin-top:15px; font-size:12px;">
                  <b>🐟 TRIVIA: Ikan & Hantu 👻</b><br><br>
                  • Mengapa Hantu (Obake) dan Robot pakai <b>います (i-masu)</b>? Karena <i>imasu</i> digunakan untuk entitas yang bisa 'bergerak sendiri' atau memiliki animasi kehidupan.<br><br>
                  • Ikan di akuarium pakai <b>います</b> (karena hidup), tapi ikan yang dijual di pasar/supermarket pakai <b>あります (ari-masu)</b> karena sudah menjadi benda mati!
              </div>`;
              UI.openModal('tips-modal');
          };          
      } else {
          // FASE 3 & 4 (i >= 10): Pertarungan Wa vs Ga & Ga sebagai "Tapi"
          if (i < 15 && !Game.waGaTipSeen) {
              tipsBubble.classList.remove('hidden');
          }
          
          btnTips.onclick = () => {
              Game.waGaTipSeen = true; 
              tipsBubble.classList.add('hidden'); 
              
              tipsH2.innerHTML = "💡 PERTARUNGAN ABADI: WA VS GA";
              tipsContent.innerHTML = `Banyak pembelajar bahasa Jepang tumbang di sini. Mari kita bedah fungsi <b>WA</b> dan <b>GA</b>!<br><br>
              
              <span style="color:var(--danger); font-weight:bold;">Tipe 1: Menemukan Sesuatu (Pakai GA)</span><br>
              <span style="color:var(--text-sub); font-size:13px; display:block; margin-bottom:10px;">
                  Saat kamu baru sadar/menemukan sesuatu (informasi baru), gunakan <b>GA</b>.<br>
                  <i>"Pak Guru, di kamar <b>ada tikus!</b>"</i><br>
                  (へやに ねずみ<b>が</b> います) -> Fokus pada TIKUS yang baru ditemukan.
              </span>
              
              <span style="color:var(--primary); font-weight:bold;">Tipe 2: Menjelaskan Lokasi (Pakai WA)</span><br>
              <span style="color:var(--text-sub); font-size:13px; display:block; margin-bottom:10px;">
                  Saat lawan bicara sudah tahu apa yang sedang dibahas, dan kamu hanya ingin memberi tahu <b>di mana posisinya</b>, gunakan <b>WA</b>.<br>
                  <i>"A: Tikusnya di mana? | B: Oh, <b>Tikus itu ada di laci</b>."</i><br>
                  (ねずみ<b>は</b> 引き出しに います) -> Tikus dijadikan "Topik" karena A dan B sudah sama-sama tahu mereka sedang membahas si tikus.
              </span>
              
              <hr style="border:0; border-top:1px dashed var(--text-sub); margin:15px 0;">
              
              <span style="color:var(--warning); font-weight:bold;">🔥 BONUS: Partikel が (Ga) sebagai "TAPI"</span><br>
              <span style="color:var(--text-sub); font-size:13px; display:block;">
                  Selain sebagai penanda subjek eksistensi, partikel <b>が</b> juga bisa diletakkan di akhir sebuah frasa/kalimat untuk menyambungkannya dengan kalimat yang berlawanan. Di sini, fungsinya berubah menjadi <b>"Tetapi / Tapi"</b>.<br><br>
                  <i>Contoh: "Ya, ada, <b>tapi</b> sekarang tidak ada."</i><br>
                  (はい、ありまし<b>たが</b>、今は ありません。)<br><br>
                  👉 <i>Coba kamu perhatikan dialog Ken dan Dewi di <b>Flashcard ke-18</b>, di sana partikel Ga berfungsi sebagai "Tapi"!</i>
              </span>`;
              UI.openModal('tips-modal');
          };
         } 
    
        } else if (Game.currentDay === 13 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      btnTips.onclick = () => {
          tipsH2.innerHTML = "💡 PANDUAN WAKTU & JADWAL";
          tipsContent.innerHTML = `
              <span style="color:var(--primary); font-weight:bold;">🧭 SARAN NAVIGASI:</span><br>
              <span style="color:var(--text-sub); font-size:13px; display:block; margin-bottom:15px;">Sebelum melanjutkan perjalanan di Hari ke-13 ini, sangat disarankan untuk menghafalkan kosakata pada <b>Buku Saku (Angka & Kalender)</b> di menu Sidebar. Jika dirasa cukup lihai, barulah lanjut ke sini. Selamat belajar!</span>

              <span style="color:var(--primary); font-weight:bold;">1. から (Kara) & まで (Made)</span><br>
              <span style="color:var(--text-sub); font-size:13px; display:block; margin-bottom:15px;">• <b>A から B まで</b> = Dari A sampai B.<br>Pola ini sangat sering digunakan untuk menyatakan durasi waktu atau batasan jarak.<br><i style="color:var(--primary);">Contoh: 九時から 五時まで (Dari jam 9 sampai jam 5).</i></span>

              <span style="color:var(--success); font-weight:bold;">2. 午前 (Gozen) & 午後 (Gogo)</span><br>
              <span style="color:var(--text-sub); font-size:13px; display:block; margin-bottom:15px;">Orang Jepang jarang memakai sistem 24 jam dalam percakapan. Mereka menggunakan AM dan PM yang posisinya <b>selalu diletakkan di depan angka!</b><br>• <b>午前 (Gozen)</b> = Pagi / AM (00:00 - 11:59)<br>• <b>午後 (Gogo)</b> = Siang-Malam / PM (12:00 - 23:59)<br><i style="color:var(--success);">Contoh: 午後三時 (Gogo san-ji / Pukul 3 sore).</i></span>

              <span style="color:var(--warning); font-weight:bold;">3. 半 (Han) = Setengah</span><br>
              <span style="color:var(--text-sub); font-size:13px; display:block; margin-bottom:15px;">Alih-alih mengucapkan <b>三十分 (san-juppun / 30 menit)</b>, jauh lebih natural untuk menggunakan kata <b>半 (han)</b>.<br><i style="color:var(--warning);">Contoh: 八時半 (Hachi-ji han / Pukul 8 setengah).</i></span>

              <hr style="border:0; border-top:1px dashed rgba(255,255,255,0.15); margin:15px 0;">

              <span style="color:var(--gold); font-weight:bold;">⚠️ URUTAN WAKTU JEPANG</span><br>
              <span style="color:var(--text-sub); font-size:13px; display:block;">Ingat, urutan kalender di Jepang terbalik dari Indonesia! Susunannya harus dari yang TERBESAR ke TERKECIL.<br><b style="color:var(--gold);">Tahun ➔ Bulan ➔ Tanggal ➔ Hari</b>.<br><i>(Contoh: 来年の三月 / Maret tahun depan).</i></span>
          `;
          UI.openModal('tips-modal');
      };
      
    } else if (Game.currentDay === 14 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      btnTips.onclick = () => {
          Game.waktuTipSeen = true;
          tipsBubble.classList.add('hidden');

          tipsH2.innerHTML = "💡 WAKTU & RAHASIA PARTIKEL";
          tipsContent.innerHTML = `
          <div id="slide-waktu-1" class="slide-page">
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Di Hari ke-14 ini, kita mulai menggunakan keterangan waktu. Tapi awas, ada aturan ketat tentang kapan kamu boleh menggunakan partikel <b>に (ni)</b> pada waktu!
              </span>

              <span style="color:var(--success); font-weight:bold;">1. Waktu Mutlak (WAJIB pakai に)</span><br>
              <span style="color:var(--text-sub); font-size:13px; display:block; margin-bottom:10px;">
                  Waktu yang memiliki <b>angka pasti</b> atau nama hari di kalender.<br>
                  ✅ 6時<b>に</b>起きます (Bangun <b>pada</b> jam 6)<br>
                  ✅ 日曜日<b>に</b>働きます (Bekerja <b>pada</b> hari Minggu)
              </span>

              <span style="color:var(--danger); font-weight:bold;">2. Waktu Relatif (HARAM pakai に)</span><br>
              <span style="color:var(--text-sub); font-size:13px; display:block; margin-bottom:15px;">
                  Waktu yang berubah-ubah posisinya tergantung kapan kamu berbicara (Besok, Kemarin, Hari ini, Setiap hari). Kata-kata ini <b>tidak boleh</b> ditempel partikel に.<br>
                  ❌ 昨日<b>に</b>勉強しました (SALAH TOTAL!)<br>
                  ✅ <b>昨日、</b>勉強しました (Benar: Kemarin, belajar)<br>
                  ✅ <b>昨日 は</b>勉強しました (Benar: Kemarin belajar - <i>sebagai topik</i>)
              </span>
              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-waktu-1').style.display='none'; document.getElementById('slide-waktu-2').style.display='block';">Lanjut: Wajah Ganda Partikel NI ➡️</button>
          </div>

          <div id="slide-waktu-2" class="slide-page" style="display:none;">
              <span style="color:var(--primary); font-weight:bold; font-size: 15px;">💡 Wajah Ganda Partikel に (Ni)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-top:8px;">
                  Kamu mungkin menyadari, partikel <b>に (ni)</b> yang kita pakai hari ini terasa berbeda dengan yang kita pelajari di Hari 12. Yap, partikel ini memang punya banyak wajah!<br><br>
                  <b style="color:var(--warning);">Fungsi 1: Menandakan LOKASI (Di)</b><br>
                  Dipelajari di Hari 12 (bersama imasu/arimasu).<br>
                  <i>Contoh: 部屋<b>に</b> 猫が います。<br>(Ada kucing <b>DI</b> kamar).</i><br><br>
                  <b style="color:var(--success);">Fungsi 2: Menandakan WAKTU (Pada)</b><br>
                  Dipelajari hari ini di Hari 14.<br>
                  <i>Contoh: 6時<b>に</b> 起きます。<br>(Bangun <b>PADA</b> jam 6).</i>
              </span>

              <div style="display:flex; gap:10px; margin-top:25px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-waktu-2').style.display='none'; document.getElementById('slide-waktu-1').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-waktu-2').style.display='none'; document.getElementById('slide-waktu-3').style.display='block';">Lanjut: Partikel WO/O ➡️</button>
              </div>
          </div>
          
          <div id="slide-waktu-3" class="slide-page" style="display:none;">
              <span style="color:var(--warning); font-weight:bold; font-size: 15px;">💡 Penampakan Partikel を (Wo/O)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-top:8px;">
                  Mungkin kamu menyadari di salah satu dialog tadi ada partikel <b>を (dibaca "o")</b>. Yap, dia sudah mulai menampakkan diri!<br><br>
                  Fungsi utamanya sangat sederhana: sebagai <b>Penanda Objek</b> yang dikenai tindakan/aksi. Partikel ini bertugas menjembatani kata benda dengan kata kerja.<br>
                  <i>Contoh: 日本語 <b>を</b> 勉強します。<br>(Belajar <b>[objek:]</b> bahasa Jepang).</i>
              </span>

              <div style="background:rgba(56, 189, 248, 0.1); padding:10px; border-left:3px solid var(--primary); margin-top:15px; font-size:12px;">
                  <b>🚀 BOCORAN MISI HARI KE-15:</b><br>
                  Persiapkan dirimu! Di misi infiltrasi besok, kita akan fokus secara khusus untuk menjinakkan partikel <b>で (de)</b>, <b>と (to)</b>, dan mengupas fungsi <b>に (ni)</b> lainnya. Kumpulkan terus EXP-mu, Kensei! 🥷
              </div>

              <div style="display:flex; gap:10px; margin-top:15px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-waktu-3').style.display='none'; document.getElementById('slide-waktu-2').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--success); color:#000; flex:1;" onclick="document.getElementById('slide-waktu-3').style.display='none'; document.getElementById('slide-waktu-1').style.display='block'; UI.closeModal('tips-modal');">Siapp! ✅</button>
              </div>
          </div>`;
          UI.openModal('tips-modal');
      };

    } else if (Game.currentDay === 15 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      btnTips.onclick = () => {
          Game.partikel15TipSeen = true;
          tipsBubble.classList.add('hidden');

          tipsH2.innerHTML = "💡 TRITUNGGAL PARTIKEL PERPINDAHAN";
          tipsContent.innerHTML = `
          <div id="slide-p15-1" class="slide-page">
              <span style="color:var(--primary); font-weight:bold; font-size:15px;">1. Tiga Wajah Partikel に (Ni)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Sampai di misi Hari ke-15 ini, kamu sudah membuka 3 rahasia utama dari partikel <b>に (ni)</b>. Mari kita rekap agar tidak tertukar!
              </span>

              <span style="font-size:13px; line-height:1.6; display:block;">
                  <b style="color:var(--warning);">🎭 Wajah 1: Lokasi Keberadaan (Di)</b> <i>[Hari 12]</i><br>
                  Menempel di tempat + Imasu/Arimasu.<br>
                  ✅ 部屋<b>に</b> 猫がいます。<br>
                  <i>(Ada kucing <b>DI</b> kamar)</i><br><br>

                  <b style="color:var(--success);">🎭 Wajah 2: Waktu Spesifik (Pada)</b> <i>[Hari 14]</i><br>
                  Menempel di angka waktu/jadwal.<br>
                  ✅ 6時<b>に</b> 起きます。<br>
                  <i>(Bangun <b>PADA</b> jam 6)</i><br><br>

                  <b style="color:var(--primary);">🎭 Wajah 3: Tujuan Perpindahan (Ke)</b> <i>[Misi Hari Ini!]</i><br>
                  Menempel di tempat tujuan + Kata kerja gerak (Ikimasu, Kimasu, Kaerimasu).<br>
                  ✅ 日本<b>に</b> 行きます。<br>
                  <i>(Pergi <b>KE</b> Jepang)</i>
              </span>

              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-p15-1').style.display='none'; document.getElementById('slide-p15-2').style.display='block';">Lanjut: Partikel Kendaraan ➡️</button>
          </div>

          <div id="slide-p15-2" class="slide-page" style="display:none;">
              <span style="color:var(--success); font-weight:bold; font-size:15px;">2. で (De) : Naik Apa?</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Berfungsi menunjukkan <b>Alat atau Cara</b> yang kamu gunakan untuk melakukan aksi (termasuk alat transportasi).<br>
                  ✅ バス<b>で</b> 行きます<br>
                  <i>(Pergi <b>DENGAN/NAIK</b> bus)</i>
              </span>

              <div style="background:rgba(239, 68, 68, 0.1); padding:10px; border-left:3px solid var(--danger); margin-bottom:15px; font-size:12px;">
                  <b>⚠️ JEBAKAN JALAN KAKI!</b><br>
                  Bagaimana kalau jalan kaki? Apakah pakai partikel で?<br>
                  <b>TIDAK!</b> "Jalan kaki" bukanlah alat transportasi, melainkan <i>kata kerja</i>. Kamu cukup bilang:<br>
                  ✅ <b>歩いて</b>行きます <i>(Aruite ikimasu)</i><br>
                  ❌ 歩いて<b>で</b>行きます <i>(SALAH BESAR!)</i>
              </div>

              <div style="display:flex; gap:10px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-p15-2').style.display='none'; document.getElementById('slide-p15-1').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-p15-2').style.display='none'; document.getElementById('slide-p15-3').style.display='block';">Lanjut: Partikel Partner ➡️</button>
              </div>
          </div>
          
          <div id="slide-p15-3" class="slide-page" style="display:none;">
              <span style="color:var(--warning); font-weight:bold; font-size:15px;">3. と (To) : Bersama Siapa?</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Berfungsi untuk menggandeng <b>Partner</b> atau teman dalam melakukan suatu aktivitas.<br>
                  ✅ 家族<b>と</b> 来ました<br>
                  <i>(Datang <b>BERSAMA</b> keluarga)</i><br>
                  ✅ 友達<b>と</b> 帰ります<br>
                  <i>(Pulang <b>BERSAMA</b> teman)</i>
              </span>

              <div style="background:rgba(56, 189, 248, 0.1); padding:10px; border-left:3px solid var(--primary); margin-bottom:15px; font-size:12px;">
                  <b>💡 RUMUS COMBO:</b><br>
                  Kamu bisa menggabungkan ketiga partikel ini dalam satu kalimat lho!<br><br>
                  <i>[Partner]と [Kendaraan]で [Tempat]に 行きます。</i><br>
                  <b>家族と 車で バリに 行きます。</b><br>
                  <i>(Pergi ke Bali naik mobil bersama keluarga).</i>
              </div>

              <div style="display:flex; gap:10px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-p15-3').style.display='none'; document.getElementById('slide-p15-2').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-p15-3').style.display='none'; document.getElementById('slide-p15-4').style.display='block';">Misteri Hitori De ➡️</button>
              </div>
          </div>

          <div id="slide-p15-4" class="slide-page" style="display:none;">
              <span style="color:var(--danger); font-weight:bold; font-size:15px;">🔥 MISTERI: Kenapa "Hitori De"?</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Banyak yang bertanya, kenapa bahasa Jepangnya "sendirian" itu <b>一人で (Hitori de)</b> dan BUKAN <b>一人と (Hitori to)</b>?<br><br>
                  Jawabannya ada pada fungsi logika partikelnya:<br><br>
                  Partikel <b>と (To)</b> mutlak membutuhkan <i>entitas kedua</i> (partner) di luar dirimu. Jika kamu sendirian, berarti tidak ada orang kedua untuk diajak "bersama". Kamu tidak bisa bilang <i>"Pergi bersama diriku yang sendiri"</i>.<br><br>
                  Lalu kenapa pakai <b>で (De)</b>? Karena dalam konteks ini, partikel で menunjukkan <b>"Batas Keadaan/Jumlah"</b>. Sama seperti kamu memakai alat (taksi/bus), kamu menjadikan "kesendirianmu" sebagai status/cara menyelesaikan perjalanan itu!<br><br>
                  ✅ <b>一人で</b> 行きます <i>(Pergi <b>dengan status/keadaan</b> 1 orang)</i>
              </span>

              <div style="display:flex; gap:10px; margin-top:20px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-p15-4').style.display='none'; document.getElementById('slide-p15-3').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--success); color:#000; flex:1;" onclick="document.getElementById('slide-p15-4').style.display='none'; document.getElementById('slide-p15-1').style.display='block'; UI.closeModal('tips-modal');">Paham Sekali! ✅</button>
              </div>
          </div>`;
          UI.openModal('tips-modal');
      };
    } else if (Game.currentDay === 17 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      btnTips.onclick = () => {
          Game.objekTipSeen = true;
          tipsBubble.classList.add('hidden');

          tipsH2.innerHTML = "💡 OBJEK, SHIMASU & SUBJEK GHAIB";
          tipsContent.innerHTML = `
          <div id="slide-o17-1" class="slide-page">
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Misi infiltrasi kali ini membawa kita ke level kalimat yang sesungguhnya. Mari berkenalan dengan partikel <b>を</b>!
              </span>

              <span style="color:var(--primary); font-weight:bold; font-size:15px;">1. Partikel を (O) si Penanda Objek</span><br>
              <span style="color:var(--text-sub); font-size:13px; display:block; margin-bottom:15px;">
                  Partikel ini diletakkan tepat di belakang <b>Objek</b> penderita (benda yang dikenai tindakan/aksi). Susunannya menjadi: <b>Objek + を + Kata Kerja</b>.<br><br>
                  ✅ バッソ<b>を</b> 食べます。<br>
                  <i>(Bakso <b>[objek]</b> dimakan / Makan bakso)</i>
              </span>

              <div style="background:rgba(234, 179, 8, 0.1); padding:10px; border-left:3px solid var(--warning); margin-bottom:15px; font-size:12px;">
                  <b>⚠️ PERHATIAN TULISAN!</b><br>
                  Partikel ini wajib ditulis dengan hiragana <b>を</b> (wo), bukan <b>お</b> (o). Namun, saat diucapkan, bunyinya melebur menjadi <b>"o"</b> (bukan "wo").
              </div>

              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-o17-1').style.display='none'; document.getElementById('slide-o17-2').style.display='block';">Lanjut: Misteri SHIMASU ➡️</button>
          </div>

          <div id="slide-o17-2" class="slide-page" style="display:none;">
              <span style="color:var(--success); font-weight:bold; font-size:15px;">2. Beda "Masu" dan "Shimasu"</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Kamu mungkin sadar ada kata kerja seperti <i>Tabe-masu</i> (makan), tapi ada juga <i>Shigoto o shi-masu</i> (melakukan pekerjaan). Kenapa beda?<br><br>
                  Akhiran <b>~ます (~masu)</b> adalah penanda bentuk sopan untuk kata kerja asli Jepang (seperti makan, minum, melihat).<br><br>
                  Sedangkan <b>します (Shimasu)</b> adalah kata kerja mandiri yang berarti <b>"Melakukan"</b>. Kata ini adalah "kata kerja ajaib" yang bisa menyulap <i>Kata Benda</i> (seperti olahraga, pekerjaan, acara) menjadi <i>Kata Kerja</i>!
              </span>

              <div style="background:rgba(34, 197, 94, 0.1); padding:10px; border-left:3px solid var(--success); margin-bottom:15px; font-size:12px;">
                  <b>💡 KAPAN PAKAI SHIMASU?</b><br>
                  Gunakan saat kamu "melakukan" suatu aktivitas benda:<br>
                  ✅ スポーツを <b>します</b> <i>(Melakukan olahraga)</i><br>
                  ✅ ミーティングを <b>します</b> <i>(Melakukan rapat)</i><br>
                  ❌ パンを します <i>(Melakukan roti? Aneh kan wkwk)</i>
              </div>

              <div style="display:flex; gap:10px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-o17-2').style.display='none'; document.getElementById('slide-o17-1').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-o17-2').style.display='none'; document.getElementById('slide-o17-3').style.display='block';">Ke Mana Subjeknya? ➡️</button>
              </div>
          </div>
          
          <div id="slide-o17-3" class="slide-page" style="display:none;">
              <span style="color:var(--danger); font-weight:bold; font-size:15px;">3. Ke Mana Perginya "Watashi wa"?</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Akhir-akhir ini kalimat kita jarang memakai <i>"Watashi wa"</i>. Ke mana subjeknya?<br><br>
                  Berbeda dengan bahasa Inggris yang <b>wajib</b> memakai subjek (<i>I eat bakso</i>, tidak bisa cuma <i>Eat bakso</i>), bahasa Jepang justru <b>sangat membenci pengulangan</b>.<br><br>
                  Jika pembicara dan lawan bicara sudah sama-sama tahu siapa yang sedang dibahas, subjeknya <b>akan dihilangkan</b> agar terdengar natural.<br><br>
                  Menyebutkan <i>"Watashi wa"</i> terus-menerus di setiap kalimat justru akan membuatmu terdengar seperti robot. Cukup fokus pada: <b>Objek + を + Predikat!</b>
              </span>

              <div style="display:flex; gap:10px; margin-top:20px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-o17-3').style.display='none'; document.getElementById('slide-o17-2').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--success); color:#000; flex:1;" onclick="document.getElementById('slide-o17-3').style.display='none'; document.getElementById('slide-o17-1').style.display='block'; UI.closeModal('tips-modal');">Paham Banget! ✅</button>
              </div>
          </div>`;
          UI.openModal('tips-modal');
      };

    } else if (Game.currentDay === 18 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      btnTips.onclick = () => {
          Game.bandingTipSeen = true;
          tipsBubble.classList.add('hidden');

          tipsH2.innerHTML = "💡 JURUS PERBANDINGAN";
          tipsContent.innerHTML = `
          <div id="slide-b18-1" class="slide-page">
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Misi kali ini melatihmu untuk membandingkan dua hal. Awas, susunannya sedikit berbeda dengan bahasa Indonesia!
              </span>

              <span style="color:var(--primary); font-weight:bold; font-size:15px;">1. Menghilang Nya Kata "Lebih"</span><br>
              <span style="color:var(--text-sub); font-size:13px; display:block; margin-bottom:15px;">
                  Untuk bilang "A lebih [sifat] daripada/dibandingkan B", gunakan pola:<br>
                  <b>A は B より [Sifat] です。</b><br><br>
                  ✅ 車 は 自転車 <b>より</b> 速いです。<br>
                  <i>(Secara makna: Mobil <b>jika dibandingkan dengan</b> sepeda, maka mobil lebih cepat).</i><br><br>
                  Btw, di bahasa Jepang standar, kamu <b>tidak perlu</b> menerjemahkan kata "lebih". Kehadiran kata <b>より (yori / daripada)</b> sudah otomatis membuat kalimat tersebut bermakna perbandingan!
              </span>

              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-b18-1').style.display='none'; document.getElementById('slide-b18-2').style.display='block';">Lanjut: Bertanya "Yang Mana" ➡️</button>
          </div>

          <div id="slide-b18-2" class="slide-page" style="display:none;">
              <span style="color:var(--warning); font-weight:bold; font-size:15px;">2. Aturan Ketat "Dochira" (どちら)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Saat menanyakan "Yang mana yang lebih...?", gunakan pola:<br>
                  <b>A と B と、どちら が [Sifat] ですか。</b><br><br>
                  ✅ 肉 と 魚 と、<b>どちら</b> が 好きですか。<br>
                  <i>(Antara daging dan ikan, <b>yang mana</b> yang disukai?)</i>
              </span>

              <div style="background:rgba(239, 68, 68, 0.1); padding:10px; border-left:3px solid var(--danger); margin-bottom:15px; font-size:12px;">
                  <b>⚠️ JEBAKAN DOCHIRA vs DORE!</b><br>
                  <b>どちら (Dochira)</b> HANYA boleh digunakan jika pilihan bendanya <b>TEPAT ADA DUA</b>. Jika pilihannya ada 3 atau lebih, kamu harus menggunakan <b>どれ (Dore)</b>.
              </div>

              <div style="display:flex; gap:10px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b18-2').style.display='none'; document.getElementById('slide-b18-1').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-b18-2').style.display='none'; document.getElementById('slide-b18-3').style.display='block';">Lanjut: Menjawab Pemenang ➡️</button>
              </div>
          </div>
          
          <div id="slide-b18-3" class="slide-page" style="display:none;">
              <span style="color:var(--success); font-weight:bold; font-size:15px;">3. Sang Pemenang: "No hoo ga"</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Lalu bagaimana cara menjawab pertanyaan "Dochira"? Untuk menunjuk pemenangnya, gunakan pola:<br>
                  <b>[Pemenang] のほうが [Sifat] です。</b><br><br>
                  ✅ 肉 <b>のほうが</b> 好きです。<br>
                  <i>(Daging <b>yang lebih</b> disukai).</i><br><br>
                  <b>のほうが (No hoo ga)</b> secara harfiah berarti <i>"Di pihaknya si..."</i>. Jadi, saat kamu bilang "Niku no hoo ga...", di kepalamu kamu sedang berkata: <i>"Di pihaknya daging lah yang menang / yang disukai."</i>
              </span>

              <div style="display:flex; gap:10px; margin-top:20px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b18-3').style.display='none'; document.getElementById('slide-b18-2').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--success); color:#000; flex:1;" onclick="document.getElementById('slide-b18-3').style.display='none'; document.getElementById('slide-b18-1').style.display='block'; UI.closeModal('tips-modal');">Paham Banget! ✅</button>
              </div>
          </div>`;
          UI.openModal('tips-modal');
      };

    } else if (Game.currentDay === 19 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      btnTips.onclick = () => {
          Game.banding19TipSeen = true;
          tipsBubble.classList.add('hidden');

          tipsH2.innerHTML = "💡 PERBANDINGAN TINGKAT TINGGI";
          tipsContent.innerHTML = `
          <div id="slide-b19-1" class="slide-page">
              <span style="color:var(--primary); font-weight:bold; font-size:15px;">1. Sang Juara (一番 - Ichiban)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Saat memilih "yang paling..." dari 3 benda atau lebih (atau dalam sebuah grup), kita menggunakan <b>一番 (Ichiban)</b>.<br>
                  Pola tanyanya unik karena kata tanyanya berubah tergantung apa yang dibahas!
              </span>
              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden;">
                  <tr style="background:rgba(56, 189, 248, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">Konteks</th>
                      <th style="padding:8px; border:1px solid #334155;">Kata Tanya</th>
                  </tr>
                  <tr><td style="padding:8px; border:1px solid #334155;">Benda pilihan</td><td style="padding:8px; border:1px solid #334155;"><b>どれ</b> (Yang mana)</td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;">Tempat</td><td style="padding:8px; border:1px solid #334155;"><b>どこ</b> (Di mana)</td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;">Orang</td><td style="padding:8px; border:1px solid #334155;"><b>誰</b> (Siapa)</td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;">Waktu</td><td style="padding:8px; border:1px solid #334155;"><b>いつ</b> (Kapan)</td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;">Kategori Umum</td><td style="padding:8px; border:1px solid #334155;"><b>何</b> (Apa)</td></tr>
              </table>
              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-b19-1').style.display='none'; document.getElementById('slide-b19-2').style.display='block';">Lanjut: Aturan Emas "Hodo" ➡️</button>
          </div>

          <div id="slide-b19-2" class="slide-page" style="display:none;">
              <span style="color:var(--danger); font-weight:bold; font-size:15px;">2. Aturan Ketat "HODO" (ほど)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Untuk bilang "A <b>tidak se-</b>[sifat] B", gunakan kata <b>ほど (hodo)</b>.<br><br>
                  ⚠️ <b>SYARAT MUTLAK:</b> Kalimat yang menggunakan "hodo" <b>WAJIB</b> diakhiri dengan kata sifat bentuk NEGATIF (-ku arimasen / -dewa arimasen).
              </span>
              <div style="background:rgba(239, 68, 68, 0.1); padding:10px; border-left:3px solid var(--danger); margin-bottom:15px; font-size:12px;">
                  ❌ バンドンはジャカルタ<b>ほど暑いです</b>。<br>
                  <i>(Salah total! Tidak bisa diakhiri positif)</i><br><br>
                  ✅ バンドンはジャカルタ<b>ほど暑くはありません</b>。<br>
                  <i>(Benar! Bandung tidak sepanas Jakarta)</i>
              </div>
              <div style="display:flex; gap:10px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b19-2').style.display='none'; document.getElementById('slide-b19-1').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-b19-2').style.display='none'; document.getElementById('slide-b19-3').style.display='block';">Lanjut: Persamaan (Onaji) ➡️</button>
              </div>
          </div>
          
          <div id="slide-b19-3" class="slide-page" style="display:none;">
              <span style="color:var(--success); font-weight:bold; font-size:15px;">3. Setara dengan "Onaji Kurai"</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Jika A dan B ada di level yang sama, kita menggunakan <b>と同じくらい (to onaji kurai)</b> yang artinya "kurang lebih sama dengan...".<br><br>
                  ✅ 日本語 は 英語 <b>と同じくらい</b> 難しいです。<br>
                  <i>(Bahasa Jepang <b>sama</b> sulitnya <b>dengan</b> bahasa Inggris).</i><br><br>
                  Pola ini sangat aman karena selalu diikuti bentuk positif (desu).
              </span>

              <div style="display:flex; gap:10px; margin-top:20px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b19-3').style.display='none'; document.getElementById('slide-b19-2').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--success); color:#000; flex:1;" onclick="document.getElementById('slide-b19-3').style.display='none'; document.getElementById('slide-b19-1').style.display='block'; UI.closeModal('tips-modal');">Paham Sekali! ✅</button>
              </div>
          </div>`;
          UI.openModal('tips-modal');
      };

    } else if (Game.currentDay === 20 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      btnTips.onclick = () => {
          Game.materi20TipSeen = true;
          tipsBubble.classList.add('hidden');

          tipsH2.innerHTML = "💡 KEKUATAN PARTIKEL DE (で)";
          tipsContent.innerHTML = `
          <div id="slide-b20-1" class="slide-page">
              <span style="color:var(--primary); font-weight:bold; font-size:15px;">1. Penunjuk Tempat Aktivitas (で vs に)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Partikel <b>で (de)</b> digunakan untuk menandai tempat di mana sebuah <b>aksi/kegiatan</b> dilakukan.<br>
                  Jangan sampai tertukar dengan partikel <b>に (ni)</b>! Berikut bedanya:
              </span>
              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden;">
                  <tr style="background:rgba(56, 189, 248, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">Partikel</th>
                      <th style="padding:8px; border:1px solid #334155;">Fungsi Utama</th>
                      <th style="padding:8px; border:1px solid #334155;">Contoh Kalimat</th>
                  </tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>で (De)</b></td><td style="padding:8px; border:1px solid #334155;">Ada <b>Aktivitas/Aksi</b></td><td style="padding:8px; border:1px solid #334155;">Makan <b>di</b> restoran.<br>(レストラン<b>で</b>食べます)</td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>に (Ni)</b></td><td style="padding:8px; border:1px solid #334155;">Hanya <b>Keberadaan</b></td><td style="padding:8px; border:1px solid #334155;">Buku ada <b>di</b> meja.<br>(机<b>に</b>本があります)</td></tr>
              </table>
              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-b20-1').style.display='none'; document.getElementById('slide-b20-2').style.display='block';">Lanjut: Alat, Cara, Bahan ➡️</button>
          </div>

          <div id="slide-b20-2" class="slide-page" style="display:none;">
              <span style="color:var(--success); font-weight:bold; font-size:15px;">2. Penunjuk Alat, Cara, & Bahan</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Selain tempat, <b>で (de)</b> juga sangat sering digunakan untuk menjelaskan "dengan apa" suatu kegiatan dilakukan.
              </span>
              <div style="background:rgba(34, 197, 94, 0.1); padding:10px; border-left:3px solid var(--success); margin-bottom:15px; font-size:12px;">
                  🛠️ <b>Alat:</b> Makan dengan sumpit.<br>
                  <i>(箸<b>で</b>食べます - Hashi <b>de</b> tabemasu)</i><br><br>
                  🚌 <b>Cara/Metode:</b> Pergi dengan bus.<br>
                  <i>(バス<b>で</b>行きます - Basu <b>de</b> ikimasu)</i><br><br>
                  🪵 <b>Bahan Pembuatan:</b> Dibuat dari kertas.<br>
                  <i>(紙<b>で</b>作ります - Kami <b>de</b> tsukurimasu)</i>
              </div>
              <div style="display:flex; gap:10px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b20-2').style.display='none'; document.getElementById('slide-b20-1').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--success); color:#000; flex:1;" onclick="document.getElementById('slide-b20-2').style.display='none'; document.getElementById('slide-b20-1').style.display='block'; UI.closeModal('tips-modal');">Paham Sekali! ✅</button>
              </div>
          </div>`;
          UI.openModal('tips-modal');
      };

    } else if (Game.currentDay === 21 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      btnTips.onclick = () => {
          Game.materi21TipSeen = true;
          tipsBubble.classList.add('hidden');

          tipsH2.innerHTML = "💡 MAKNA TERSEMBUNYI PARTIKEL DE (で)";
          tipsContent.innerHTML = `
          <div id="slide-b21-1" class="slide-page">
              <span style="color:var(--primary); font-weight:bold; font-size:15px;">1. Penunjuk Alasan / Penyebab</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Partikel <b>で (de)</b> bisa digunakan untuk menunjukkan alasan yang menyebabkan kejadian (seringkali kejadian negatif).<br><br>
                  ⚠️ <b>SYARAT:</b> Alasan <b>WAJIB</b> berupa Kata Benda (KB).
              </span>
              <div style="background:rgba(56, 189, 248, 0.1); padding:10px; border-left:3px solid var(--primary); margin-bottom:15px; font-size:12px;">
                  🤧 <b>Karena Flu:</b><br>
                  かぜ<b>で</b>休みました。<br>
                  <i>(Kaze <b>de</b> yasumimashita - Tidak masuk kerja karena flu)</i><br><br>
                  ⛈️ <b>Karena Hujan Deras:</b><br>
                  大雨<b>で</b>停電しました。<br>
                  <i>(Ooame <b>de</b> teeden shimashita - Mati listrik karena hujan deras)</i>
              </div>
              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-b21-1').style.display='none'; document.getElementById('slide-b21-2').style.display='block';">Lanjut: Batasan Waktu/Jumlah ➡️</button>
          </div>

          <div id="slide-b21-2" class="slide-page" style="display:none;">
              <span style="color:var(--danger); font-weight:bold; font-size:15px;">2. Penunjuk Batasan (Waktu/Jumlah/Patokan)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Jika dipasangkan dengan kata keterangan bilangan, partikel <b>で (de)</b> berfungsi sebagai penunjuk batas atau patokan.
              </span>
              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden;">
                  <tr style="background:rgba(239, 68, 68, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">Konteks</th>
                      <th style="padding:8px; border:1px solid #334155;">Contoh Penggunaan</th>
                  </tr>
                  <tr><td style="padding:8px; border:1px solid #334155;">Batas Waktu</td><td style="padding:8px; border:1px solid #334155;">10分<b>で</b>着きます<br><i>(Tiba <b>dalam</b> 10 menit)</i></td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;">Patokan Harga</td><td style="padding:8px; border:1px solid #334155;">3つ<b>で</b>1000円です<br><i>(Tiga buah harganya 1000 yen)</i></td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;">Batas Jumlah</td><td style="padding:8px; border:1px solid #334155;">全部<b>で</b>1万ルピアです<br><i>(Semuanya 10.000 rupiah)</i></td></tr>
              </table>
              <div style="display:flex; gap:10px; margin-top:15px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b21-2').style.display='none'; document.getElementById('slide-b21-1').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-b21-2').style.display='none'; document.getElementById('slide-b21-3').style.display='block';">Lanjut: Rahasia Partikel De ➡️</button>
              </div>
          </div>
          
          <div id="slide-b21-3" class="slide-page" style="display:none;">
              <span style="color:var(--success); font-weight:bold; font-size:15px;">3. Konsep Inti: "Terbatas"</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Meski fungsinya terlihat berbeda-beda, inti dari <b>semua</b> partikel で adalah <b>"membatasi"</b> sesuatu dari pilihan lainnya.<br><br>
                  📍 <b>Tempat:</b> 部屋<b>で</b> (Belajar di kamar)<br>
                  <i>(Dibatasi hanya di kamar, bukan sekolah/tempat lain)</i><br><br>
                  🛠️ <b>Alat:</b> ローマ字<b>で</b> (Menulis dengan romaji)<br>
                  <i>(Membatasi pilihan aksara hanya pada romaji saja)</i><br><br>
                  🤧 <b>Alasan:</b> かぜ<b>で</b> (Libur karena flu)<br>
                  <i>(Flu menjadi satu-satunya penyebab, mengabaikan berbagai alasan lain)</i>
              </span>

              <div style="display:flex; gap:10px; margin-top:20px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b21-3').style.display='none'; document.getElementById('slide-b21-2').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); color:#000; flex:1;" onclick="document.getElementById('slide-b21-3').style.display='none'; document.getElementById('slide-b21-4').style.display='block';">Lanjut: Kilas Balik ➡️</button>
              </div>
          </div>

          <div id="slide-b21-4" class="slide-page" style="display:none;">
              <span style="color:var(--primary); font-weight:bold; font-size:15px;">4. Kilas Balik: 4 Fungsi Partikel De</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Mari kita rangkum semua fungsi partikel <b>で (de)</b> yang sudah dipelajari agar tidak tertukar!
              </span>
              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden;">
                  <tr style="background:rgba(56, 189, 248, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">Fungsi</th>
                      <th style="padding:8px; border:1px solid #334155;">Contoh Singkat</th>
                  </tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>1. Tempat Aktivitas</b></td><td style="padding:8px; border:1px solid #334155;">部屋<b>で</b>勉強します<br><i>(Belajar <b>di</b> kamar)</i></td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>2. Alat, Cara, Bahan</b></td><td style="padding:8px; border:1px solid #334155;">バス<b>で</b>行きます<br><i>(Pergi <b>dengan</b> bus)</i></td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>3. Alasan / Penyebab</b></td><td style="padding:8px; border:1px solid #334155;">かぜ<b>で</b>休みました<br><i>(Libur <b>karena</b> flu)</i></td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>4. Batasan Waktu/Jumlah</b></td><td style="padding:8px; border:1px solid #334155;">10分<b>で</b>着きます<br><i>(Tiba <b>dalam</b> 10 menit)</i></td></tr>
              </table>

              <div style="display:flex; gap:10px; margin-top:20px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b21-4').style.display='none'; document.getElementById('slide-b21-3').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--success); color:#000; flex:1;" onclick="document.getElementById('slide-b21-4').style.display='none'; document.getElementById('slide-b21-1').style.display='block'; UI.closeModal('tips-modal');">Paham Sekali! ✅</button>
              </div>
          </div>`;
          UI.openModal('tips-modal');
      };

    } else if (Game.currentDay === 22 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      btnTips.onclick = () => {
          Game.materi22TipSeen = true;
          tipsBubble.classList.add('hidden');

          tipsH2.innerHTML = "💡 ATURAN KETAT PARTIKEL NI (に)";
          tipsContent.innerHTML = `
          <div id="slide-b22-1" class="slide-page">
              <span style="color:var(--primary); font-weight:bold; font-size:15px;">1. Ikatan dengan Kata Kerja</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Ingat asas penting ini: Partikel itu terikat dengan kata kerja di <b>belakangnya</b>, bukan kata benda di depannya.<br><br>
                  Khusus untuk partikel <b>に (ni)</b> sebagai penunjuk tempat keberadaan, kata kerjanya sangat terbatas. Hafalkan 5 kata kerja khusus ini:
              </span>
              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden;">
                  <tr style="background:rgba(56, 189, 248, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">Kata Kerja</th>
                      <th style="padding:8px; border:1px solid #334155;">Arti</th>
                  </tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>あります</b> (Arimasu)</td><td style="padding:8px; border:1px solid #334155;">Ada (benda mati)</td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>います</b> (Imasu)</td><td style="padding:8px; border:1px solid #334155;">Ada (mahluk hidup)</td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>すみます</b> (Sumimasu)</td><td style="padding:8px; border:1px solid #334155;">Tinggal</td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>勤めます</b> (Tsutomemasu)</td><td style="padding:8px; border:1px solid #334155;">Bekerja</td></tr>
                  <tr><td style="padding:8px; border:1px solid #334155;"><b>泊まります</b> (Tomarimasu)</td><td style="padding:8px; border:1px solid #334155;">Menginap</td></tr>
              </table>
              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-b22-1').style.display='none'; document.getElementById('slide-b22-2').style.display='block';">Lanjut: Aturan Waktu ➡️</button>
          </div>

          <div id="slide-b22-2" class="slide-page" style="display:none;">
              <span style="color:var(--danger); font-weight:bold; font-size:15px;">2. Aturan Waktu: Kapan Pakai Ni?</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Partikel <b>に (ni)</b> TIDAK BISA dipasangkan dengan sembarang kata waktu.
              </span>
              <div style="background:rgba(34, 197, 94, 0.1); padding:10px; border-left:3px solid var(--success); margin-bottom:10px; font-size:12px;">
                  ✅ <b>WAJIB PAKAI に (Kalender & Jam):</b><br>
                  Kata waktu yang memiliki angka/bilangan: Jam (1-ji), Menit (5-fun), Tanggal (futsuka), Bulan (3-gatsu), Tahun (2015-nen), dan Nama hari (getsu-yoobi).
              </div>
              <div style="background:rgba(239, 68, 68, 0.1); padding:10px; border-left:3px solid var(--danger); margin-bottom:15px; font-size:12px;">
                  ❌ <b>HARAM PAKAI に:</b><br>
                  1. Kata waktu relatif: Kemarin (Kinoo), Hari ini (Kyoo), Besok (Asu), Sekarang (Ima).<br>
                  2. Rutinitas: Setiap hari (Mainichi), Setiap minggu (Maishuu).<br>
                  3. Durasi: Selama 3 hari (Mikkakan).<br><br>
                  <i>(Peringatan: Jangan pernah bilang "Kinoo ni" atau "Mainichi ni"!)</i>
              </div>
              <div style="display:flex; gap:10px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b22-2').style.display='none'; document.getElementById('slide-b22-1').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-b22-2').style.display='none'; document.getElementById('slide-b22-3').style.display='block';">Lanjut: Waktu Fleksibel ➡️</button>
              </div>
          </div>
          
          <div id="slide-b22-3" class="slide-page" style="display:none;">
              <span style="color:var(--success); font-weight:bold; font-size:15px;">3. Waktu Fleksibel (Boleh Pakai / Tidak)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Kata seperti Pagi (Asa), Siang (Hiru), atau Liburan (Natsu-yasumi) bisa menggunakan に ataupun tidak. Nuansanya akan berubah!
              </span>
              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden;">
                  <tr style="background:rgba(34, 197, 94, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">Penggunaan</th>
                      <th style="padding:8px; border:1px solid #334155;">Nuansa Makna</th>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;"><b>TANPA に</b><br>朝、家にいました。<br><i>(Asa, ie ni imashita.)</i></td>
                      <td style="padding:8px; border:1px solid #334155;"><b>Durasi / Sepanjang waktu itu.</b><br><i>(Berada di rumah "sepanjang" pagi).</i></td>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;"><b>PAKAI に</b><br>朝<b>に</b>、勉強しました。<br><i>(Asa ni, benkyoo shimashita.)</i></td>
                      <td style="padding:8px; border:1px solid #334155;"><b>Titik spesifik di dalam waktu itu.</b><br><i>(Belajar di "suatu waktu" pada pagi hari).</i></td>
                  </tr>
              </table>

              <div style="display:flex; gap:10px; margin-top:20px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b22-3').style.display='none'; document.getElementById('slide-b22-2').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); color:#000; flex:1;" onclick="document.getElementById('slide-b22-3').style.display='none'; document.getElementById('slide-b22-4').style.display='block';">Lanjut: Ni vs De ➡️</button>
              </div>
          </div>

          <div id="slide-b22-4" class="slide-page" style="display:none;">
              <span style="color:var(--primary); font-weight:bold; font-size:15px;">4. Beda Tipis: Ni vs De pada Aktivitas</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Hati-hati dengan kata kerja aktivitas. Partikel <b>に (ni)</b> dan <b>で (de)</b> memberikan makna "tempat" yang sangat berbeda!
              </span>
              <div style="background:rgba(56, 189, 248, 0.1); padding:10px; border-left:3px solid var(--primary); margin-bottom:15px; font-size:12px;">
                  🎯 <b>に (Ni) sebagai Titik Akhir:</b><br>
                  ここ<b>に</b> 名前を書きます。<br>
                  <i>(Koko <b>ni</b> namae o kakimasu)</i><br>
                  <i>(Menulis nama <b>di atas</b> sini. "Koko" adalah benda tempat tinta menempel, seperti kertas/papan tulis).</i><br><br>
                  🏠 <b>で (De) sebagai Tempat Aktivitas:</b><br>
                  ここ<b>で</b> 名前を書きます。<br>
                  <i>(Koko <b>de</b> namae o kakimasu)</i><br>
                  <i>(Menulis nama <b>di dalam</b> sini. "Koko" adalah ruang/lokasi tempat kamu berada saat menulis, seperti kamar/kelas).</i>
              </div>

              <div style="display:flex; gap:10px; margin-top:20px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b22-4').style.display='none'; document.getElementById('slide-b22-3').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--success); color:#000; flex:1;" onclick="document.getElementById('slide-b22-4').style.display='none'; document.getElementById('slide-b22-1').style.display='block'; UI.closeModal('tips-modal');">Paham Sekali! ✅</button>
              </div>
          </div>`;
          UI.openModal('tips-modal');
      };

    } else if (Game.currentDay === 23 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      btnTips.onclick = () => {
          Game.materi23TipSeen = true;
          tipsBubble.classList.add('hidden');

          tipsH2.innerHTML = "💡 FUNGSI LAIN PARTIKEL NI (に)";
          tipsContent.innerHTML = `
          <div id="slide-b23-1" class="slide-page">
              <span style="color:var(--primary); font-weight:bold; font-size:15px;">1. Penunjuk Tujuan (Untuk...)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Partikel <b>に (ni)</b> kali ini berfungsi sebagai penunjuk tujuan dari kata kerja perpindahan (seperti pergi, datang, dan pulang).<br><br>
                  Ada dua hal penting yang perlu diperhatikan: apakah "yang menjadi tujuannya" itu berupa <b>Kata Benda (KB)</b> atau <b>Kata Kerja (KK)</b>? Keduanya memiliki syarat yang berbeda:<br><br>
                  Pola Umum: <b>KB / KK(tujuan) + に + KK(perpindahan)</b>
              </span>
              
              <div style="background:rgba(56, 189, 248, 0.1); padding:10px; border-left:3px solid var(--primary); margin-bottom:15px; font-size:12px;">
                  🛒 <b>Syarat Kata Benda (KB Aktivitas):</b><br>
                  <span style="color:var(--text-sub); display:block; margin-bottom:5px;">⚠️ <b>Hati-hati:</b> Tidak semua benda bisa dipakai! Hanya benda berupa aktivitas/kegiatan.</span>
                  ❌ りんご<b>に</b>行きます <i>(Salah! Apel bukan aktivitas)</i><br>
                  ✅ 買い物<b>に</b>行きます <i>(Benar! Belanja adalah aktivitas)</i><br>
                  <i>(Kaimono <b>ni</b> ikimasu - Pergi <b>untuk</b> berbelanja)</i><br><br>

                  🎬 <b>Syarat Kata Kerja (Matematika Kata Kerja):</b><br>
                  <span style="color:var(--text-sub); display:block; margin-bottom:5px;">Ambil kata kerja bentuk <b>-masu</b>, lalu <b>buang</b> bagian "masu"-nya!</span>
                  <div style="background:rgba(0,0,0,0.2); padding:5px; border-radius:4px; margin-bottom:5px;">
                      見<s>ます</s> (Mimasu) ➡️ 見 (Mi)<br>
                      食べ<s>ます</s> (Tabemasu) ➡️ 食べ (Tabe)
                  </div>
                  ✅ 映画を 見<b>に</b>行きます<br>
                  <i>(Eega o mi <b>ni</b> ikimasu - Pergi <b>untuk</b> menonton film)</i>
              </div>

              <div style="margin-bottom:15px; font-size:12px;">
                  <span style="color:var(--gold); font-weight:bold;">✨ PERBEDAAN MENCOLOK:</span><br>
                  <span style="color:var(--text-sub); line-height:1.5; display:block; margin-top:5px;">
                      Jika menggunakan <b>KB</b>, kalimatnya lebih instan karena kata bendanya sudah merangkum seluruh aktivitas (contoh: <i>Kaimono ni...</i>).<br><br>
                      Jika menggunakan <b>KK</b>, biasanya akan ada partikel <b>を (o)</b> yang mendahuluinya untuk memperjelas <b>apa objek</b> yang dikenai tindakan tersebut (contoh: <i><b>Fuku を</b> kai ni...</i> atau <i><b>Eega を</b> mi ni...</i>).
                  </span>
              </div>
              
              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-b23-1').style.display='none'; document.getElementById('slide-b23-2').style.display='block';">Lanjut: Arah & Tempat Tujuan ➡️</button>
          </div>

          <div id="slide-b23-2" class="slide-page" style="display:none;">
              <span style="color:var(--danger); font-weight:bold; font-size:15px;">2. Penunjuk Arah / Tempat Tujuan (Ke...)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Partikel <b>に (ni)</b> diletakkan setelah tempat atau arah untuk menunjukkan destinasi perpindahan.
              </span>
              <div style="background:rgba(239, 68, 68, 0.1); padding:10px; border-left:3px solid var(--danger); margin-bottom:15px; font-size:12px;">
                  🏫 <b>Pergi ke Sekolah:</b><br>
                  学校<b>に</b> 行きます。<br>
                  <i>(Gakkoo <b>ni</b> ikimasu - Pergi <b>ke</b> sekolah)</i><br><br>
                  🏠 <b>Pulang ke Rumah:</b><br>
                  家<b>に</b> 帰ります。<br>
                  <i>(Ie <b>ni</b> kaerimasu - Pulang <b>ke</b> rumah)</i><br><br>
                  🏙️ <b>Datang ke Jakarta (Lampau):</b><br>
                  去年、ジャカルタ<b>に</b> 来ました。<br>
                  <i>(Kyonen, Jakarta <b>ni</b> kimashita - Datang <b>ke</b> Jakarta tahun lalu)</i>
              </div>
              <div style="display:flex; gap:10px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b23-2').style.display='none'; document.getElementById('slide-b23-1').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-b23-2').style.display='none'; document.getElementById('slide-b23-3').style.display='block';">Lanjut: Kilas Balik ➡️</button>
              </div>
          </div>
          
          <div id="slide-b23-3" class="slide-page" style="display:none;">
              <span style="color:var(--success); font-weight:bold; font-size:15px;">3. Kilas Balik: 4 Fungsi Partikel Ni</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Mari kita rangkum dan ingat kembali 4 fungsi utama partikel <b>に (ni)</b> yang telah dipelajari!
              </span>
              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden;">
                  <tr style="background:rgba(34, 197, 94, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">Fungsi</th>
                      <th style="padding:8px; border:1px solid #334155;">Contoh Kalimat</th>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;"><b>1. Tempat Keberadaan</b><br><i>(Di...)</i></td>
                      <td style="padding:8px; border:1px solid #334155;">部屋<b>に</b>あります。<br><i>(Heya ni arimasu - Ada di kamar)</i></td>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;"><b>2. Waktu Spesifik</b><br><i>(Pada...)</i></td>
                      <td style="padding:8px; border:1px solid #334155;">３時<b>に</b>起きます。<br><i>(San-ji ni okimasu - Bangun pada jam 3)</i></td>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;"><b>3. Tujuan Perpindahan</b><br><i>(Untuk...)</i></td>
                      <td style="padding:8px; border:1px solid #334155;">買い<b>に</b>行きます。<br><i>(Kai ni ikimasu - Pergi untuk membeli)</i></td>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;"><b>4. Tempat Tujuan</b><br><i>(Ke...)</i></td>
                      <td style="padding:8px; border:1px solid #334155;">学校<b>に</b>行きます。<br><i>(Gakkoo ni ikimasu - Pergi ke sekolah)</i></td>
                  </tr>
              </table>

              <div style="display:flex; gap:10px; margin-top:20px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b23-3').style.display='none'; document.getElementById('slide-b23-2').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--success); color:#000; flex:1;" onclick="document.getElementById('slide-b23-3').style.display='none'; document.getElementById('slide-b23-1').style.display='block'; UI.closeModal('tips-modal');">Paham Sekali! ✅</button>
              </div>
          </div>`;
          UI.openModal('tips-modal');
      };

    } else if (Game.currentDay === 24 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      btnTips.onclick = () => {
          Game.materi24TipSeen = true;
          tipsBubble.classList.add('hidden');

          tipsH2.innerHTML = "💡 KEKUATAN PARTIKEL TO (と)";
          tipsContent.innerHTML = `
          <div id="slide-b24-1" class="slide-page">
              <span style="color:var(--primary); font-weight:bold; font-size:15px;">1. Penunjuk Teman / Lawan Interaksi</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Jika sebuah aksi dilakukan <b>bersama dengan</b> orang lain (atau pihak lain), kita menggunakan partikel <b>と (to)</b> di belakang orang tersebut.<br><br>
                  Pola: <b>KB(Lawan/Teman) + と + KK(Aksi)</b>
              </span>
              <div style="background:rgba(56, 189, 248, 0.1); padding:10px; border-left:3px solid var(--primary); margin-bottom:15px; font-size:12px;">
                  👫 <b>Bersama Teman:</b><br>
                  友達<b>と</b> 学校に 行きます。<br>
                  <i>(Tomodachi <b>to</b> gakkoo ni ikimasu)</i><br>
                  <i>(Pergi ke sekolah <b>bersama dengan</b> teman)</i><br><br>
                  💕 <b>Bersama Pacar:</b><br>
                  恋人<b>と</b> インドネシアに 行きます。<br>
                  <i>(Koibito <b>to</b> Indonesia ni ikimasu)</i><br>
                  <i>(Pergi ke Indonesia <b>bersama dengan</b> pacar)</i>
              </div>
              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-b24-1').style.display='none'; document.getElementById('slide-b24-2').style.display='block';">Lanjut: Pasangan Wajib ➡️</button>
          </div>

          <div id="slide-b24-2" class="slide-page" style="display:none;">
              <span style="color:var(--danger); font-weight:bold; font-size:15px;">2. Aksi yang WAJIB Ada Pasangannya</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Hati-hati! Ada beberapa kata kerja yang <b>mustahil</b> dilakukan sendirian, seperti: menikah, bertengkar, bertanding, atau berdiskusi. Untuk kata kerja ini, Anda <b>wajib</b> menggunakan partikel と (to) untuk menunjuk lawannya.
              </span>
              <div style="background:rgba(239, 68, 68, 0.1); padding:10px; border-left:3px solid var(--danger); margin-bottom:15px; font-size:12px;">
                  <span style="color:var(--text-sub); display:block; margin-bottom:5px;">⚠️ Sering tertukar! Jangan gunakan partikel <i>ni</i> atau <i>e</i> di sini.</span>
                  💍 <b>Menikah:</b><br>
                  日本人<b>と</b> 結婚します。<br>
                  <i>(Nihonjin <b>to</b> kekkon shimasu - Menikah <b>dengan</b> orang Jepang)</i><br><br>
                  ⚽ <b>Bertanding:</b><br>
                  今晩、プルシブ<b>と</b> 試合します。<br>
                  <i>(Konban, Persib <b>to</b> shiai shimasu - Malam ini, bertanding <b>dengan</b> Persib)</i><br><br>
                  🗣️ <b>Berbincang / Berdiskusi:</b><br>
                  父親<b>と</b> 話し合いました。<br>
                  <i>(Chichioya <b>to</b> hanashiaimashita - Berbincang-bincang <b>dengan</b> ayah)</i>
              </div>
              <div style="display:flex; gap:10px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b24-2').style.display='none'; document.getElementById('slide-b24-1').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-b24-2').style.display='none'; document.getElementById('slide-b24-3').style.display='block';">Lanjut: Ni vs To ➡️</button>
              </div>
          </div>
          
          <div id="slide-b24-3" class="slide-page" style="display:none;">
              <span style="color:var(--success); font-weight:bold; font-size:15px;">3. Beda Tipis: に (Ni) vs と (To)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Coba kita gunakan kata kerja yang sama (misal: <b>会います / bertemu</b>). Kuncinya ada pada siapa yang "effort" (berusaha)!
              </span>
              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden;">
                  <tr style="background:rgba(34, 197, 94, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">Partikel</th>
                      <th style="padding:8px; border:1px solid #334155;">Nuansa Makna</th>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;"><b>に (Ni)</b><br><i>Satu Arah</i></td>
                      <td style="padding:8px; border:1px solid #334155;">
                          友達<b>に</b> 会います。<br>
                          <i>(Tomodachi <b>ni</b> aimasu)</i><br>
                          <span style="font-size:11px; color:var(--text-sub);">Hanya satu pihak yang <i>effort</i>. "Saya" yang sengaja pergi menemui teman (teman mungkin hanya diam/menunggu di suatu tempat).</span>
                      </td>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;"><b>と (To)</b><br><i>Dua Arah</i></td>
                      <td style="padding:8px; border:1px solid #334155;">
                          友達<b>と</b> 会います。<br>
                          <i>(Tomodachi <b>to</b> aimasu)</i><br>
                          <span style="font-size:11px; color:var(--text-sub);">Kedua pihak sama-sama <i>effort</i>. "Saya" dan teman sudah janjian dan sepakat untuk bertemu.</span>
                      </td>
                  </tr>
              </table>

              <div style="background:rgba(255, 255, 255, 0.05); padding:10px; border-radius:8px; margin-top:15px; font-size:12px;">
                  <span style="color:var(--gold); font-weight:bold;">💡 CONTOH LAIN AGAR LEBIH PAHAM:</span><br>
                  <span style="color:var(--text-sub); line-height:1.5; display:block; margin-top:5px;">
                      🎯 <b>Fokus pada に (Sebagai Target/Arah):</b><br>
                      先生<b>に</b> 相談します。<br>
                      <i>(Sensei <b>ni</b> soodan shimasu - Berkonsultasi <b>kepada</b> guru. Guru diposisikan sebagai tempat tujuan curhat).</i><br><br>
                      🤝 <b>Fokus pada と (Sebagai Teman Interaksi):</b><br>
                      友達<b>と</b> 遊びます。<br>
                      <i>(Tomodachi <b>to</b> asobimasu - Bermain <b>bersama</b> teman. Keduanya aktif dan berinteraksi saat bermain).</i>
                  </span>
              </div>

              <div style="display:flex; gap:10px; margin-top:20px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b24-3').style.display='none'; document.getElementById('slide-b24-2').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--success); color:#000; flex:1;" onclick="document.getElementById('slide-b24-3').style.display='none'; document.getElementById('slide-b24-1').style.display='block'; UI.closeModal('tips-modal');">Paham Sekali! ✅</button>
              </div>
          </div>`;
          UI.openModal('tips-modal');
      };

    } else if (Game.currentDay === 25 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      btnTips.onclick = () => {
          Game.materi25TipSeen = true;
          tipsBubble.classList.add('hidden');

          tipsH2.innerHTML = "💡 3 FUNGSI UTAMA PARTIKEL O (を)";
          tipsContent.innerHTML = `
          <div id="slide-b25-1" class="slide-page">
              <span style="color:var(--primary); font-weight:bold; font-size:15px;">1. Penunjuk Objek (Review)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Sebelum melangkah lebih jauh, mari kita ingat kembali fungsi dasar dari partikel <b>を (o)</b> yang sudah sering kita gunakan, yaitu sebagai <b>Penunjuk Objek</b>.<br><br>
                  Partikel ini diletakkan setelah kata benda (objek) yang dikenai suatu tindakan.
              </span>
              <div style="background:rgba(56, 189, 248, 0.1); padding:10px; border-left:3px solid var(--primary); margin-bottom:15px; font-size:12px;">
                  🍚 <b>Makan Nasi:</b><br>
                  ご飯<b>を</b> 食べます。<br>
                  <i>(Gohan <b>o</b> tabemasu - Nasi sebagai objek yang dimakan)</i><br><br>
                  📖 <b>Membaca Buku:</b><br>
                  本<b>を</b> 読みます。<br>
                  <i>(Hon <b>o</b> yomimasu - Buku sebagai objek yang dibaca)</i>
              </div>
              <span style="color:var(--text-sub); font-size:13px; display:block;">
                  Namun, tahukah Anda bahwa partikel を punya dua fungsi "rahasia" lain yang berkaitan dengan <b>pergerakan</b>? Mari kita bahas!
              </span>
              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-b25-1').style.display='none'; document.getElementById('slide-b25-2').style.display='block';">Lanjut: Titik Awal ➡️</button>
          </div>

          <div id="slide-b25-2" class="slide-page" style="display:none;">
              <span style="color:var(--danger); font-weight:bold; font-size:15px;">2. Penunjuk Titik Awal / Keberangkatan</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Partikel <b>を (o)</b> dapat digunakan untuk menunjukkan <b>dari mana</b> Anda berangkat, keluar, atau lepas. (Bisa diterjemahkan sebagai "dari").<br><br>
                  <span style="color:var(--gold);">💡 <b>Tips:</b> Penggunaan ini terikat dengan kata kerja tertentu (keluar, turun, berangkat). Hafalkan partikel satu paket dengan kata kerjanya!</span>
              </span>
              <div style="background:rgba(239, 68, 68, 0.1); padding:10px; border-left:3px solid var(--danger); margin-bottom:15px; font-size:12px;">
                  🏠 <b>Keluar dari Rumah:</b><br>
                  家<b>を</b> 出ます。<br>
                  <i>(Ie <b>o</b> demasu - Meninggalkan titik awal "rumah")</i><br><br>
                  🚉 <b>Turun dari Kereta:</b><br>
                  電車<b>を</b> 降ります。<br>
                  <i>(Densha <b>o</b> orimasu - Melepas kontak dengan "kereta")</i><br><br>
                  🛫 <b>Berangkat / Lepas Landas:</b><br>
                  ジャカルタ<b>を</b> 出発します。<br>
                  <i>(Jakarta <b>o</b> shuppatsu shimasu - Berangkat <b>dari</b> Jakarta)</i>
              </div>
              <div style="display:flex; gap:10px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b25-2').style.display='none'; document.getElementById('slide-b25-1').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-b25-2').style.display='none'; document.getElementById('slide-b25-3').style.display='block';">Lanjut: Titik Lintas ➡️</button>
              </div>
          </div>
          
          <div id="slide-b25-3" class="slide-page" style="display:none;">
              <span style="color:var(--success); font-weight:bold; font-size:15px;">3. Penunjuk Tempat yang Dilewati</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Jika Anda melakukan pergerakan menembus/melewati sebuah lintasan, lintasan tersebut ditandai dengan partikel <b>を (o)</b>.<br><br>
                  Bayangkan tempat tersebut sebagai "objek" yang Anda arungi dengan kaki Anda.
              </span>
              <div style="background:rgba(34, 197, 94, 0.1); padding:10px; border-left:3px solid var(--success); margin-bottom:15px; font-size:12px;">
                  🌉 <b>Menyeberangi Jembatan:</b><br>
                  橋<b>を</b> 渡ります。<br>
                  <i>(Hashi <b>o</b> watarimasu)</i><br><br>
                  🚶‍♂️ <b>Berjalan-jalan di Taman:</b><br>
                  公園<b>を</b> 散歩します。<br>
                  <i>(Kooen <b>o</b> sanpo shimasu - Berjalan mengarungi taman)</i><br><br>
                  🚦 <b>Belok di Persimpangan:</b><br>
                  交差点<b>を</b> 右に 曲がります。<br>
                  <i>(Koosaten <b>o</b> migi ni magarimasu - Belok kanan melewati persimpangan)</i>
              </div>

              <div style="display:flex; gap:10px; margin-top:20px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b25-3').style.display='none'; document.getElementById('slide-b25-2').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); color:#000; flex:1;" onclick="document.getElementById('slide-b25-3').style.display='none'; document.getElementById('slide-b25-4').style.display='block';">Lanjut: O vs De ➡️</button>
              </div>
          </div>

          <div id="slide-b25-4" class="slide-page" style="display:none;">
              <span style="color:var(--primary); font-weight:bold; font-size:15px;">4. Beda Nuansa (を vs で)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Mengapa <i>"Kooen <b>o</b> sanpo shimasu"</i> jauh lebih natural daripada memakai <i>de</i>? Apakah memakai <i>de</i> salah? Tidak! Tetapi nuansanya sangat berbeda.
              </span>
              
              <div style="margin-bottom:15px; font-size:12px;">
                  <span style="color:var(--gold); font-weight:bold;">✨ LOGIKA RUANG VS LOKASI:</span><br>
                  <span style="color:var(--text-sub); line-height:1.5; display:block; margin-top:5px;">
                      <b>公園を (Kooen o):</b> Taman adalah "ruang yang ditelusuri". Anda menikmati jalannya, pepohonannya, dan rutenya (Paling natural).<br><br>
                      <b>公園で (Kooen de):</b> Taman hanya menjadi "wadah" tempat kejadian. (Digunakan saat Anda ingin membandingkan lokasi: <i>"Kemarin jalan-jalan di mal atau di taman?" -> "Di taman!"</i>).
                  </span>
              </div>

              <div style="background:rgba(255, 255, 255, 0.05); padding:10px; border-radius:8px; margin-bottom:15px; font-size:12px;">
                  <span style="color:var(--text-sub); font-weight:bold;">Contoh Analogi Jelas: Berenang (泳ぎます)</span><br>
                  <ul style="margin:5px 0 0 15px; padding:0; color:var(--text-sub);">
                      <li style="margin-bottom:8px;">プール<b>で</b>泳ぎます <i>(Puuru de oyogimasu)</i><br>Berenang di kolam. (Fokus: Anda main air, atau olahraga di dalam lokasi tersebut).</li>
                      <li>プール<b>を</b>泳ぎます <i>(Puuru o oyogimasu)</i><br>Berenang menyeberangi kolam. (Fokus: Kolam adalah lintasan yang Anda tembus dari ujung ke ujung).</li>
                  </ul>
              </div>

              <div style="display:flex; gap:10px; margin-top:20px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b25-4').style.display='none'; document.getElementById('slide-b25-3').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--success); color:#000; flex:1;" onclick="document.getElementById('slide-b25-4').style.display='none'; document.getElementById('slide-b25-1').style.display='block'; UI.closeModal('tips-modal');">Paham Sekali! ✅</button>
              </div>
          </div>`;
          UI.openModal('tips-modal');
      };

    } else if (Game.currentDay === 26 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      btnTips.onclick = () => {
          Game.materi26TipSeen = true;
          tipsBubble.classList.add('hidden');

          tipsH2.innerHTML = "💡 PARTIKEL E (へ) VS NI (に)";
          tipsContent.innerHTML = `
          <div id="slide-b26-1" class="slide-page">
              <span style="color:var(--primary); font-weight:bold; font-size:15px;">1. Partikel へ (E) Bisa Diganti に (Ni)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Pada umumnya, hampir semua partikel <b>へ (e)</b> sebagai penunjuk arah tujuan dapat diganti dengan <b>に (ni)</b>.<br><br>
                  Faktanya, orang Jepang saat ini lebih sering menggunakan に (ni) daripada へ (e) dalam percakapan sehari-hari.
              </span>
              <div style="background:rgba(56, 189, 248, 0.1); padding:10px; border-left:3px solid var(--primary); margin-bottom:10px; font-size:12px;">
                  🏫 <b>Pergi ke sekolah:</b><br>
                  ✔️ 学校<b>へ</b>行きます ＝ ✔️ 学校<b>に</b>行きます<br>
                  <i>(Gakkoo <b>e</b> ikimasu = Gakkoo <b>ni</b> ikimasu)</i><br><br>
                  🏠 <b>Pulang ke rumah:</b><br>
                  ✔️ 家<b>へ</b>帰ります ＝ ✔️ 家<b>に</b>帰ります<br>
                  <i>(Ie <b>e</b> kaerimasu = Ie <b>ni</b> kaerimasu)</i>
              </div>

              <div style="margin-bottom:15px; font-size:12px;">
                  <span style="color:var(--gold); font-weight:bold;">✨ BEDA TIPIS:</span><br>
                  <span style="color:var(--text-sub); line-height:1.5; display:block; margin-top:5px;">
                      Jika harus dibedakan, <b>へ (e)</b> lebih fokus pada <b>"arah/proses perjalanan"</b> menuju tempat tersebut, sedangkan <b>に (ni)</b> lebih fokus pada tempat tersebut sebagai <b>"titik akhir"</b> pendaratan.
                  </span>
              </div>
              
              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-b26-1').style.display='none'; document.getElementById('slide-b26-2').style.display='block';">Lanjut: Yang Tidak Bisa Diganti ➡️</button>
          </div>

          <div id="slide-b26-2" class="slide-page" style="display:none;">
              <span style="color:var(--danger); font-weight:bold; font-size:15px;">2. Partikel に (Ni) TIDAK Selalu Bisa Diganti へ (E)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Ingat, partikel に (ni) memiliki banyak fungsi lain (seperti penunjuk waktu, tempat keberadaan, tujuan aktivitas, dll). Untuk fungsi-fungsi selain "arah", Anda <b>tidak boleh</b> menggantinya dengan へ (e)!
              </span>
              <div style="background:rgba(239, 68, 68, 0.1); padding:10px; border-left:3px solid var(--danger); margin-bottom:15px; font-size:12px;">
                  ⏰ <b>Fungsi Waktu (Pada...):</b><br>
                  ✔️ ３時<b>に</b> 帰ります <i>(3-ji <b>ni</b> kaerimasu)</i><br>
                  ❌ ３時<b>へ</b> 帰ります <i>(Salah total!)</i><br><br>
                  🛋️ <b>Fungsi Keberadaan (Di...):</b><br>
                  ✔️ 家<b>に</b> います <i>(Ie <b>ni</b> imasu)</i><br>
                  ❌ 家<b>へ</b> います <i>(Salah total!)</i>
              </div>
              <div style="display:flex; gap:10px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b26-2').style.display='none'; document.getElementById('slide-b26-1').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-b26-2').style.display='none'; document.getElementById('slide-b26-3').style.display='block';">Lanjut: Nuansa Jarak ➡️</button>
              </div>
          </div>
          
          <div id="slide-b26-3" class="slide-page" style="display:none;">
              <span style="color:var(--success); font-weight:bold; font-size:15px;">3. Nuansa Jarak Perpindahan</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Selain dari fokusnya, penggunaan へ (e) dan に (ni) juga berkaitan dengan persepsi "jarak" atau durasi pergerakan.
              </span>
              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden;">
                  <tr style="background:rgba(34, 197, 94, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">Penggunaan</th>
                      <th style="padding:8px; border:1px solid #334155;">Konteks Pergerakan</th>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;"><b>へ (E)<br><i>Jarak Jauh</i></b></td>
                      <td style="padding:8px; border:1px solid #334155;">
                          学校<b>へ</b> 行きます。<br>
                          <i>(Gakkoo <b>e</b> ikimasu)</i><br>
                          <span style="font-size:11px; color:var(--text-sub);">Pergerakan "pergi" membutuhkan waktu dan rute panjang (jarak jauh) sampai tiba di sekolah.</span>
                      </td>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;"><b>に (Ni)<br><i>Jarak Dekat / Sesaat</i></b></td>
                      <td style="padding:8px; border:1px solid #334155;">
                          バス<b>に</b> 乗ります。<br>
                          <i>(Basu <b>ni</b> norimasu)</i><br>
                          <span style="font-size:11px; color:var(--text-sub);">Aksi "naik" ke dalam bus terjadi seketika/sesaat. Anda melangkah pindah tempat dari luar ke dalam (jarak sangat dekat).</span>
                      </td>
                  </tr>
              </table>

              <div style="display:flex; gap:10px; margin-top:20px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b26-3').style.display='none'; document.getElementById('slide-b26-2').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--success); color:#000; flex:1;" onclick="document.getElementById('slide-b26-3').style.display='none'; document.getElementById('slide-b26-1').style.display='block'; UI.closeModal('tips-modal');">Paham Sekali! ✅</button>
              </div>
          </div>`;
          UI.openModal('tips-modal');
      };

    } else if (Game.currentDay === 27 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      btnTips.onclick = () => {
          Game.materi27TipSeen = true;
          tipsBubble.classList.add('hidden');

          tipsH2.innerHTML = "💡 DUA WAJAH PARTIKEL GA (が)";
          tipsContent.innerHTML = `
          <div id="slide-b27-1" class="slide-page">
              <span style="color:var(--primary); font-weight:bold; font-size:15px;">1. Dua Fungsi Utama Partikel が (Ga)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Secara garis besar, partikel <b>が (ga)</b> memiliki dua fungsi utama: sebagai penanda <b>Subjek</b> dan penanda <b>Objek</b> (untuk Keadaan/Potensi).
              </span>
              
              <div style="margin-bottom:15px; font-size:12px;">
                  <span style="color:var(--primary); font-weight:bold;">A. Sebagai Penunjuk Subjek</span><br>
                  <span style="color:var(--text-sub); display:block; margin-bottom:5px;">Mutlak digunakan untuk: menegaskan subjek baru, menekankan subjek, atau menjelaskan fenomena alam/objektif.</span>
                  👤 <b>Subjek Baru:</b><br>
                  先生<b>が</b> 来ます。<br>
                  <i>(Sensee <b>ga</b> kimasu - Guru datang)</i><br><br>
                  🌧️ <b>Fenomena Alam:</b><br>
                  雨<b>が</b> 降ります。<br>
                  <i>(Ame <b>ga</b> furimasu - Hujan turun)</i><br><br>
                  👀 <b>Keadaan Objektif:</b><br>
                  目<b>が</b> 大きいです。<br>
                  <i>(Me <b>ga</b> ookii desu - Matanya besar)</i>
              </div>

              <div style="margin-bottom:15px; font-size:12px;">
                  <span style="color:var(--gold); font-weight:bold;">B. Sebagai Penunjuk Objek</span><br>
                  <span style="color:var(--text-sub); line-height:1.5; display:block; margin-top:5px;">
                      Berbeda dengan partikel を (o) yang menandai sasaran tindakan aktif (memukul, memakan), partikel <b>が (ga)</b> digunakan untuk menandai <b>objek dari sebuah keadaan, evaluasi, atau potensi</b>.
                  </span>
              </div>
              
              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-b27-1').style.display='none'; document.getElementById('slide-b27-2').style.display='block';">Lanjut: Ga + Kata Sifat ➡️</button>
          </div>

          <div id="slide-b27-2" class="slide-page" style="display:none;">
              <span style="color:var(--danger); font-weight:bold; font-size:15px;">2. Objek Kata Sifat (Emosi & Evaluasi)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Gunakan <b>が (ga)</b> ketika predikatnya berupa kata sifat yang mendeskripsikan perasaan (suka/benci/ingin) atau evaluasi kemampuan.
              </span>
              
              <div style="margin-bottom:15px; font-size:12px;">
                  ❤️ <b>好き (Suki) - Suka:</b><br>
                  ラーメン<b>が</b> 好きです。<br>
                  <i>(Ramen <b>ga</b> suki desu - Menyukai ramen)</i><br><br>
                  💔 <b>嫌い (Kirai) - Benci:</b><br>
                  野菜<b>が</b> 嫌いです。<br>
                  <i>(Yasai <b>ga</b> kirai desu - Benci sayuran)</i>
              </div>

              <div style="margin-bottom:15px; font-size:12px;">
                  <span style="color:var(--gold); font-weight:bold;">⚠️ ATURAN KETAT: ほしい (Hoshii) - Ingin</span><br>
                  <span style="color:var(--text-sub); line-height:1.5; display:block; margin-top:5px; margin-bottom:10px;">
                      <b>Hoshii</b> hanya untuk menyatakan keinginan orang pertama ("Saya"), dan objeknya <b>WAJIB berupa benda abstrak/konkret</b>, BUKAN kegiatan/kata sifat!
                  </span>
                  ❌ 結婚<b>が</b> ほしいです。<br>
                  <i>(Salah! Pernikahan adalah aksi)</i><br><br>
                  ❌ 日本へ行きます<b>が</b> ほしいです。<br>
                  <i>(Salah! Ini kalimat aksi)</i><br><br>
                  ✅ 恋人<b>が</b> ほしいです。<br>
                  <i>(Koibito <b>ga</b> hoshii desu - Benar! Pacar/sosok abstrak)</i><br><br>
                  ✅ バイク<b>が</b> ほしいです。<br>
                  <i>(Baiku <b>ga</b> hoshii desu - Benar! Sepeda motor/benda konkret)</i>
              </div>

              <div style="display:flex; gap:10px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b27-2').style.display='none'; document.getElementById('slide-b27-1').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-b27-2').style.display='none'; document.getElementById('slide-b27-3').style.display='block';">Lanjut: Nuansa Kemampuan ➡️</button>
              </div>
          </div>
          
          <div id="slide-b27-3" class="slide-page" style="display:none;">
              <span style="color:var(--success); font-weight:bold; font-size:15px;">3. Intermezzo: Nuansa Kata Sifat Kemampuan</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Ada perbedaan nuansa yang sangat penting saat menggunakan kata sifat untuk menilai sebuah keterampilan (kemampuan).
              </span>
              
              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden; margin-bottom:15px;">
                  <tr style="background:rgba(34, 197, 94, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">Pandai (Positif)</th>
                      <th style="padding:8px; border:1px solid #334155;">Penjelasan & Contoh</th>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;"><b>上手 (Joozu)</b><br><i>Objektif</i></td>
                      <td style="padding:8px; border:1px solid #334155;">
                          Dinilai oleh orang lain secara objektif. <b>Tidak pantas</b> digunakan untuk memuji diri sendiri.<br>
                          ✅ 彼はサッカー<b>が</b>上手です。<br><i>(Kare wa sakkaa ga joozu desu - Dia pandai sepak bola)</i>
                      </td>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;"><b>得意 (Tokui)</b><br><i>Sadar Diri/Bangga</i></td>
                      <td style="padding:8px; border:1px solid #334155;">
                          Didasari kesadaran diri dan rasa bangga. <b>Sangat tepat</b> untuk menyatakan kepandaian diri sendiri (juga bisa untuk orang lain).<br>
                          ✅ サッカー<b>が</b>得意です。<br><i>(Sakkaa ga tokui desu - Saya pandai sepak bola)</i>
                      </td>
                  </tr>
              </table>

              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden;">
                  <tr style="background:rgba(239, 68, 68, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">Lemah (Negatif)</th>
                      <th style="padding:8px; border:1px solid #334155;">Penjelasan & Contoh</th>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;"><b>下手 (Heta)</b><br><i>Kurang Skill</i></td>
                      <td style="padding:8px; border:1px solid #334155;">
                          Bodoh/tidak pandai yang murni dinilai dari <b>kurangnya keterampilan</b> teknis.<br>
                          ✅ 料理<b>が</b>下手です。<br><i>(Ryoori ga heta desu - Saya bodoh memasak)</i>
                      </td>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;"><b>苦手 (Nigate)</b><br><i>Mental Block</i></td>
                      <td style="padding:8px; border:1px solid #334155;">
                          Lemah karena faktor <b>mental</b> (tidak berani atau memang tidak begitu suka).<br>
                          ✅ 料理<b>が</b>苦手です。<br><i>(Ryoori ga nigate desu - Saya kurang bisa masak karena tidak suka/takut)</i>
                      </td>
                  </tr>
              </table>
              <span style="color:var(--text-sub); font-size:11px; margin-top:5px; display:block;"><i>Catatan: Keterampilan harus spesifik (olahraga, bahasa). Jangan gunakan untuk hal umum seperti "Joozu di sekolah".</i></span>

              <div style="display:flex; gap:10px; margin-top:20px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b27-3').style.display='none'; document.getElementById('slide-b27-2').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); color:#000; flex:1;" onclick="document.getElementById('slide-b27-3').style.display='none'; document.getElementById('slide-b27-4').style.display='block';">Lanjut: Ga + Intransitif ➡️</button>
              </div>
          </div>

          <div id="slide-b27-4" class="slide-page" style="display:none;">
              <span style="color:var(--primary); font-weight:bold; font-size:15px;">4. Objek Kata Kerja Intransitif</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:10px;">
                  Umumnya objek kata kerja ditandai dengan を (o). Namun, ada 3 kata kerja <b>intransitif</b> khusus yang butuh objek dan wajib menggunakan partikel <b>が (ga)</b>. Hafalkan ketiganya!
              </span>
              
              <div style="background:rgba(56, 189, 248, 0.1); padding:10px; border-left:3px solid var(--primary); margin-bottom:15px; font-size:12px;">
                  🧠 <b>わかります (Wakarimasu) - Mengerti:</b><br>
                  彼は英語<b>が</b> わかります。<br>
                  <i>(Kare wa eego <b>ga</b> wakarimasu - Dia mengerti bahasa Inggris)</i><br><br>
                  
                  🤲 <b>いります (Irimasu) - Memerlukan:</b><br>
                  私はパスポート<b>が</b> いります。<br>
                  <i>(Watashi wa pasupooto <b>ga</b> irimasu - Saya memerlukan paspor)</i><br><br>
                  
                  🎁 <b>あります (Arimasu) - Mempunyai:</b><br>
                  私 {は/には} バイク<b>が</b> あります。<br>
                  <i>(Watashi {wa/niwa} baiku <b>ga</b> arimasu - Saya mempunyai sepeda motor)</i><br>
                  <span style="color:var(--text-sub); margin-top:5px; display:block;"><i>(Hati-hati: Arimasu di sini artinya "kepemilikan/mempunyai", bukan sekadar "ada" seperti keberadaan benda).</i></span>
              </div>

              <div style="display:flex; gap:10px; margin-top:20px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b27-4').style.display='none'; document.getElementById('slide-b27-3').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--success); color:#000; flex:1;" onclick="document.getElementById('slide-b27-4').style.display='none'; document.getElementById('slide-b27-1').style.display='block'; UI.closeModal('tips-modal');">Paham Sekali! ✅</button>
              </div>
          </div>`;
          UI.openModal('tips-modal');
      };

    } else if (Game.currentDay === 28 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      btnTips.onclick = () => {
          Game.materi28TipSeen = true;
          tipsBubble.classList.add('hidden');

          tipsH2.innerHTML = "💡 KEKUATAN KOTO (こと) & NO (の)";
          tipsContent.innerHTML = `
          <div id="slide-b28-1" class="slide-page">
              <span style="color:var(--primary); font-weight:bold; font-size:15px;">1. Menyulap Kata Kerja Menjadi Kata Benda</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Dalam bahasa Jepang, Anda tidak bisa langsung menyambungkan Kata Kerja (KK) dengan kata seperti "desu" atau "ga suki desu". Anda harus <b>mengubah KK tersebut menjadi Kata Benda (KB)</b> terlebih dahulu menggunakan <b>こと (koto)</b>.<br><br>
                  Pola: <b>KK Bentuk Kamus + こと</b>
              </span>
              
              <div style="margin-bottom:15px; font-size:12px;">
                  <span style="color:var(--primary); font-weight:bold;">A. Menyatakan Hobi (趣味)</span><br>
                  <span style="color:var(--text-sub); display:block; margin-bottom:5px;">Pola: わたしのしゅみは [KK Kamus + こと] です。</span>
                  🎧 <b>Mendengarkan musik:</b><br>
                  私の趣味は、音楽を聞く<b>こと</b>です。<br>
                  <i>(Watashi no shumi wa, ongaku o kiku <b>koto</b> desu - Hobi saya adalah mendengarkan musik)</i><br><br>
                  🍳 <b>Memasak masakan Jepang:</b><br>
                  私の趣味は、日本料理を作る<b>こと</b>です。<br>
                  <i>(Watashi no shumi wa, Nihon-ryoori o tsukuru <b>koto</b> desu - Hobi saya adalah memasak masakan Jepang)</i>
              </div>

              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-b28-1').style.display='none'; document.getElementById('slide-b28-2').style.display='block';">Lanjut: Penggunaan NO (の) ➡️</button>
          </div>

          <div id="slide-b28-2" class="slide-page" style="display:none;">
              <span style="color:var(--danger); font-weight:bold; font-size:15px;">2. Penggunaan NO (の) pada Kesukaan</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Selain こと (koto), Anda juga bisa menggunakan <b>の (no)</b> untuk mengubah kata kerja menjadi kata benda. Hal ini sangat sering digunakan ketika menyatakan hal yang <b>disukai (好き - suki)</b>.
              </span>
              
              <div style="margin-bottom:15px; font-size:12px;">
                  <span style="color:var(--danger); font-weight:bold;">B. Menyatakan Hal yang Disukai</span><br>
                  <span style="color:var(--text-sub); display:block; margin-bottom:5px;">Pola: 私は [KK Kamus + の/こと] が好きです。</span>
                  
                  🎨 <b>Suka menggambar:</b><br>
                  デシさんは、絵を書く<b>の</b>が好きです。<br>
                  <i>(Desi-san wa, e o kaku <b>no</b> ga suki desu - Desi suka menggambar lukisan)</i><br><br>
                  
                  🍣 <b>Suka makan masakan Jepang:</b><br>
                  ケンさんは、日本料理を食べる<b>の</b>が好きです。<br>
                  <i>(Ken-san wa, Nihon-ryoori o taberu <b>no</b> ga suki desu - Ken suka makan masakan Jepang)</i>
              </div>

              <div style="margin-bottom:15px; font-size:12px;">
                  <span style="color:var(--gold); font-weight:bold;">✨ KOTO vs NO:</span><br>
                  <span style="color:var(--text-sub); line-height:1.5; display:block; margin-top:5px;">
                      Untuk kalimat "suka" (~ga suki desu), Anda boleh memakai <i>koto</i> maupun <i>no</i>. Namun, orang Jepang jauh lebih sering menggunakan <b>の (no)</b> karena terdengar lebih natural dan luwes dalam percakapan sehari-hari.
                  </span>
              </div>

              <div style="display:flex; gap:10px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b28-2').style.display='none'; document.getElementById('slide-b28-1').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-b28-2').style.display='none'; document.getElementById('slide-b28-3').style.display='block';">Lanjut: Aturan Emas ➡️</button>
              </div>
          </div>
          
          <div id="slide-b28-3" class="slide-page" style="display:none;">
              <span style="color:var(--success); font-weight:bold; font-size:15px;">3. Aturan Emas: Kapan Boleh Pakai NO?</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Walaupun fungsinya sama-sama menjadikan kata benda, ada aturan ketat kapan Anda boleh dan tidak boleh mengganti <b>こと (koto)</b> menjadi <b>の (no)</b>.
              </span>
              
              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden; margin-bottom:15px;">
                  <tr style="background:rgba(239, 68, 68, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">~ です (Hobi)</th>
                      <th style="padding:8px; border:1px solid #334155;">Status</th>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;">私の趣味は、絵を書く<b>こと</b>です。<br><i>(...e o kaku <b>koto</b> desu)</i></td>
                      <td style="padding:8px; border:1px solid #334155; text-align:center;">✅ <b>Benar</b></td>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;">私の趣味は、絵を書く<b>の</b>です。<br><i>(...e o kaku <b>no</b> desu)</i></td>
                      <td style="padding:8px; border:1px solid #334155; text-align:center;">❌ <b>Salah!</b><br><span style="font-size:10px; color:var(--text-sub);">Hobi mutlak pakai koto.</span></td>
                  </tr>
              </table>

              <table style="width:100%; border-collapse: collapse; font-size: 13px; text-align:left; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden;">
                  <tr style="background:rgba(34, 197, 94, 0.2);">
                      <th style="padding:8px; border:1px solid #334155;">~ が好きです (Suka)</th>
                      <th style="padding:8px; border:1px solid #334155;">Status</th>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;">絵を書く<b>こと</b>が好きです。<br><i>(...e o kaku <b>koto</b> ga suki desu)</i></td>
                      <td style="padding:8px; border:1px solid #334155; text-align:center;">✅ <b>Benar</b></td>
                  </tr>
                  <tr>
                      <td style="padding:8px; border:1px solid #334155;">絵を書く<b>の</b>が好きです。<br><i>(...e o kaku <b>no</b> ga suki desu)</i></td>
                      <td style="padding:8px; border:1px solid #334155; text-align:center;">✅ <b>Lebih Natural!</b></td>
                  </tr>
              </table>

              <div style="display:flex; gap:10px; margin-top:20px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b28-3').style.display='none'; document.getElementById('slide-b28-2').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--success); color:#000; flex:1;" onclick="document.getElementById('slide-b28-3').style.display='none'; document.getElementById('slide-b28-1').style.display='block'; UI.closeModal('tips-modal');">Paham Sekali! ✅</button>
              </div>
          </div>`;
          UI.openModal('tips-modal');
      };

    } else if (Game.currentDay === 29 && t === 'belajar') {
      btnTips.classList.remove('hidden');

      btnTips.onclick = () => {
          Game.materi29TipSeen = true;
          tipsBubble.classList.add('hidden');

          tipsH2.innerHTML = "💡 MENYATAKAN KEMAMPUAN (BISA / DAPAT)";
          tipsContent.innerHTML = `
          <div id="slide-b29-1" class="slide-page">
              <span style="color:var(--primary); font-weight:bold; font-size:15px;">1. Bisa Melakukan Sesuatu (Kata Kerja)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Untuk menyatakan kemampuan ("bisa" atau "dapat" melakukan suatu aksi), kita menggunakan pola ini.<br><br>
                  Pola: <b>KK (Bentuk Kamus) + ことができます (koto ga dekimasu)</b>
              </span>
              
              <div style="margin-bottom:15px; font-size:12px;">
                  <span style="color:var(--text-sub); display:block; margin-bottom:5px;">Konsepnya, kita <b>menominakan</b> kata kerja dengan "koto", lalu menambahkan "ga dekimasu" (bisa dilakukan).</span>
                  🦅 <b>Bisa terbang di langit:</b><br>
                  空を飛ぶ<b>ことができます</b>。<br>
                  <i>(Sora o tobu <b>koto ga dekimasu</b> - Bisa terbang di langit)</i><br><br>
                  📖 <b>Bisa membaca bahasa Inggris:</b><br>
                  英語を読む<b>ことができます</b>。<br>
                  <i>(Eego o yomu <b>koto ga dekimasu</b> - Bisa membaca bahasa Inggris)</i><br><br>
                  ✍️ <b>Bisa menulis aksara Jawa:</b><br>
                  ジャワ文字を書く<b>ことができます</b>。<br>
                  <i>(Jawa-moji o kaku <b>koto ga dekimasu</b> - Bisa menulis aksara Jawa)</i>
              </div>

              <button class="btn" style="padding:8px 12px; font-size:13px; margin:15px 0 0 0; background:var(--gold); width:100%;" onclick="document.getElementById('slide-b29-1').style.display='none'; document.getElementById('slide-b29-2').style.display='block';">Lanjut: Negatif & Tanya ➡️</button>
          </div>

          <div id="slide-b29-2" class="slide-page" style="display:none;">
              <span style="color:var(--danger); font-weight:bold; font-size:15px;">2. Bentuk Tidak Bisa & Bertanya</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Bagaimana jika ingin bilang "tidak bisa" atau bertanya kepada orang lain? Anda cukup mengubah bagian akhir <b>dekimasu</b>.
              </span>
              
              <div style="margin-bottom:15px; font-size:12px;">
                  ❌ <b>Bentuk Negatif (Tidak Bisa):</b><br>
                  <span style="color:var(--text-sub); display:block; margin-bottom:5px;">Ubah "dekimasu" menjadi <b>dekimasen</b>.</span>
                  ケンさんはギターを弾く<b>ことができません</b>。<br>
                  <i>(Ken-san wa gitaa o hiku <b>koto ga dekimasen</b> - Ken tidak bisa bermain gitar)</i><br><br>
                  
                  ❓ <b>Bentuk Tanya (Bisakah?):</b><br>
                  <span style="color:var(--text-sub); display:block; margin-bottom:5px;">Tambahkan <b>ka</b> di akhir kalimat.</span>
                  A: 泳ぐ<b>ことができますか</b>。<br>
                  <i>(Oyogu <b>koto ga dekimasu ka</b> - Bisakah berenang?)</i><br>
                  B: <b>できます</b> / <b>できません</b><br>
                  <i>(<b>Dekimasu</b> / <b>Dekimasen</b> - Bisa / Tidak bisa)</i>
              </div>

              <div style="display:flex; gap:10px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b29-2').style.display='none'; document.getElementById('slide-b29-1').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--gold); flex:1;" onclick="document.getElementById('slide-b29-2').style.display='none'; document.getElementById('slide-b29-3').style.display='block';">Lanjut: Jalan Pintas (KB) ➡️</button>
              </div>
          </div>
          
          <div id="slide-b29-3" class="slide-page" style="display:none;">
              <span style="color:var(--success); font-weight:bold; font-size:15px;">3. Jalan Pintas: Langsung Kata Benda (KB)</span><br>
              <span style="color:var(--text-sub); font-size:13px; line-height:1.5; display:block; margin-bottom:15px;">
                  Jika hal yang Anda kuasai sudah berupa <b>Kata Benda (yang bermakna keterampilan/aktivitas)</b> seperti bahasa, olahraga, atau hobi, Anda TIDAK PERLU menambahkan kata kerja dan "koto".<br><br>
                  Pola Singkat: <b>KB + ができます (ga dekimasu)</b>
              </span>
              
              <div style="margin-bottom:15px; font-size:12px;">
                  🇯🇵 <b>Kemampuan Bahasa:</b><br>
                  日本語<b>ができます</b>。<br>
                  <i>(Nihon-go <b>ga dekimasu</b> - Bisa berbahasa Jepang)</i><br><br>
                  
                  🏸 <b>Olahraga / Permainan:</b><br>
                  バドミントン<b>ができます</b>。<br>
                  <i>(Badominton <b>ga dekimasu</b> - Bisa bermain bulu tangkis)</i><br><br>
                  
                  ♟️ チェス<b>ができます</b>。<br>
                  <i>(Chesu <b>ga dekimasu</b> - Bisa bermain catur)</i><br><br>
                  
                  🍳 <b>Keterampilan Khusus:</b><br>
                  料理<b>ができます</b>。<br>
                  <i>(Ryoori <b>ga dekimasu</b> - Bisa memasak)</i>
              </div>

              <div style="display:flex; gap:10px; margin-top:20px;">
                  <button class="btn btn-alt" style="padding:8px 12px; font-size:13px; flex:1;" onclick="document.getElementById('slide-b29-3').style.display='none'; document.getElementById('slide-b29-2').style.display='block';">⬅️ Kembali</button>
                  <button class="btn" style="padding:8px 12px; font-size:13px; background:var(--success); color:#000; flex:1;" onclick="document.getElementById('slide-b29-3').style.display='none'; document.getElementById('slide-b29-1').style.display='block'; UI.closeModal('tips-modal');">Paham Sekali! ✅</button>
              </div>
          </div>`;
          UI.openModal('tips-modal');
      };


    } else { btnTips.classList.add('hidden'); }
    if (t === 'dungeon') {
        document.getElementById('stage-indicator').innerText = `🔥 SKOR SURVIVAL: ${Game.dungeonScore}`;
        document.getElementById('ui-progress').style.width = `100%`;

        // Ambil 1 kata acak dari seluruh pool
        let pool = Game.dungeonPool;
        let target = pool[Math.floor(Math.random() * pool.length)];
        
        document.getElementById('ui-jp').innerHTML = Engine.buildRubyFormat(target.k, target.r, null, false);

        // Bikin 3 opsi pengecoh dari pool yang sama
        let opts = [target.a];
        let wrongPool = Engine.shuffle([...pool].filter(x => x.a !== target.a));
        opts.push(wrongPool[0].a, wrongPool[1].a, wrongPool[2].a);
        opts = Engine.shuffle(opts);

        document.getElementById('input-area').innerHTML = opts.map(o => `<button class="btn btn-alt" style="margin-bottom:8px;" onclick="Action.checkDungeon('${o.replace(/'/g, "\\'")}', '${target.a.replace(/'/g, "\\'")}', event)">${o}</button>`).join('');
        return; // Setop fungsi di sini agar tidak menjalankan kuis reguler
    }
    
    if (t === 'hafalan') {
      if(Game.sessionData.hafalan[0].k === "WIP") { document.getElementById('ui-jp').innerHTML = "UNDER CONSTRUCTION"; return; }
      const tHaf = Game.sessionData.hafalan.length; const tPeng = Game.sessionData.pengayaan.length; UI.updateProgress(i, tHaf + tPeng);
      if (i === tHaf && !Game.jumpscareTriggered) { Game.jumpscareTriggered = true; const js = document.getElementById('jumpscare-overlay'); js.classList.add('show'); setTimeout(() => { js.classList.remove('show'); UI.loadStep(); }, 1000); return; }
      if (i < tHaf) {
        const itm = Game.sessionData.hafalan[i]; document.getElementById('stage-indicator').innerText = `KOSAKATA : ${i + 1} / ${tHaf}`;
        document.getElementById('ui-jp').innerHTML = Engine.buildRubyFormat(itm.k, itm.r, null, false); document.getElementById('ui-arti').innerHTML = itm.a; UI.makeNextBtn("Hafal →");
      } else if (i < tHaf + tPeng) {
        const pIdx = i - tHaf; const itm = Game.sessionData.pengayaan[pIdx]; document.getElementById('stage-indicator').innerText = `🚨 KUIS DADAKAN : ${pIdx + 1} / ${tPeng}`;
        document.getElementById('ui-jp').innerHTML = Engine.buildRubyFormat(itm.k, itm.r, null, false);
        let opts = [itm.a]; let pool = Game.sessionData.hafalan.filter(x => x.a !== itm.a); Engine.shuffle(pool); opts.push(pool[0].a); opts.push(pool[1].a); Engine.shuffle(opts);
        document.getElementById('input-area').innerHTML = opts.map(o => `<button class="btn btn-alt" onclick="Action.checkPengayaan('${o}', '${itm.a}', event)">${o}</button>`).join('');
      } else {
        document.getElementById('stage-indicator').innerText = ""; document.getElementById('ui-jp').innerHTML = "🎉 Pemanasan Selesai!"; document.getElementById('ui-arti').innerHTML = "Akses tab Pola.";
        document.getElementById('input-area').innerHTML = `<button class="btn btn-alt" onclick="Action.resetTab()">🔄 Ulas Kembali Sesi Hafalan</button>`;
      }
    } else {
      const dL = Game.sessionData[t]; UI.updateProgress(i, dL.length); 
      if (i >= dL.length) { 
          document.getElementById('stage-indicator').innerText = ""; document.getElementById('ui-jp').innerHTML = "🎉 Sesi Tuntas!"; 
          let reviewBtn = `<button class="btn btn-alt" style="margin-bottom:10px;" onclick="Action.resetTab()">🔄 Ulas Kembali Sesi Ini</button>`;
         
          if(t === 'arti') {
              document.getElementById('input-area').innerHTML = `${reviewBtn}<button class="btn" style="background:var(--gold); color:#000; box-shadow: 0 0 15px rgba(251, 191, 36, 0.4);" onclick="Game.completeDay()">Selesaikan Misi 🏆</button>`; 
          } else {
              document.getElementById('input-area').innerHTML = reviewBtn; 
          }
          return; 
      }
      document.getElementById('stage-indicator').innerText = `${t.toUpperCase()} : ${i + 1} / ${dL.length}`; const itm = dL[i];
      if(itm.a === 'WIP') { document.getElementById('ui-jp').innerHTML = "Under Construction"; return; }

      if (t === 'belajar') {
        document.getElementById('ui-jp').innerHTML = Engine.renderSentence(itm.jp, false, false, false, false); document.getElementById('ui-arti').innerHTML = itm.a; UI.makeNextBtn("Paham →");
      } else if (t === 'partikel') {
        if (itm.isMulti) {
           document.getElementById('ui-jp').innerHTML = Engine.renderSentence(itm.jp, isPro, true, false, true); 
           Game.targetMultiAns = itm.ansP; Game.currentMultiAns = new Array(itm.ansP.length).fill(null);
           let defaultOpts = itm.opts || ['は', 'の', 'も', 'と', 'で', 'に', 'を', 'では']; let optsHtml = '<div style="margin-bottom:15px;">';
           defaultOpts.forEach(p => { optsHtml += `<button class="btn btn-alt" style="display:inline-block; width:auto; margin:4px; padding:10px 15px; font-size:18px;" onclick="Action.fillMulti('${p}')">${p}</button>`; });
           optsHtml += '</div>'; document.getElementById('input-area').innerHTML = `${optsHtml}<button class="btn hidden" id="btn-submit" onclick="Action.checkMulti(event)">EKSEKUSI</button>`;
        } else {
           document.getElementById('ui-jp').innerHTML = Engine.renderSentence(itm.jp, isPro, true, false, false); Game.currentAns = itm.ansP;
           document.getElementById('input-area').innerHTML = `<input type="text" id="answer-box" class="input-box" placeholder="Ketik partikel" autocomplete="off"><button class="btn" id="btn-submit">EKSEKUSI</button>`;
           setTimeout(() => { document.getElementById('answer-box').focus(); document.getElementById('btn-submit').onclick = Action.checkInput; }, 100);
        }
        if (Game.intelActive) {
            let intelBox = `<div class="intel-box" style="margin-bottom:15px;"><b>Intel Arti:</b> ${itm.a}</div>`;
            document.getElementById('input-area').insertAdjacentHTML('afterbegin', intelBox);
        }
      } else if (t === 'arti') {
        let displayA = itm.a;
        if (itm.qA && itm.qA.toLowerCase().includes("garis bawah") && itm.ansA) {
            let safeAnsA = itm.ansA.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            let regex = new RegExp(`(${safeAnsA})`, "i");
            displayA = displayA.replace(regex, `<u style="text-decoration: underline; text-decoration-style: dashed; text-decoration-color: var(--primary); text-underline-offset: 4px;">$1</u>`);
        }
        let qText = itm.qA ? `${displayA}<br><br><span style="font-size:14px; color:var(--warning);">${itm.qA.replace("Terjemahkanlah kalimat bergaris bawah!", "Tulis bagian bergaris bawah dalam bhs Jepang!").replace("Terjemahkanlah jawaban A!", "Tulis jawaban A dalam bhs Jepang!").replace("Terjemahkan keseluruhan kalimat!", "Terjemahkan ke bahasa Jepang!")}</span>` : displayA;
        document.getElementById('ui-jp').innerHTML = `<div style="font-size:20px; line-height:1.5;">${qText}</div>`; 
        
        let targetArr = itm.jp.some(x => x.u) ? itm.jp.filter(x => x.u) : itm.jp;
        let aK = "", aH = "";
        targetArr.forEach(x => { aK += (x.k || x.text); aH += (x.r || x.text); });
        
        const cleanStr = (s) => s.replace(/<[^>]*>?/gm, '').replace(/[。、！？,\?\sQ:A:]/g, '');
        const displayStr = (s) => s.replace(/<[^>]*>?/gm, '').replace(/(<b>Q:<\/b>|<b>A:<\/b>|Q:|A:)/g, '').trim();

        Game.currentAnsKanji = cleanStr(aK);
        Game.currentAnsHiragana = cleanStr(aH);
        
        Game.displayKanji = displayStr(aK);
        Game.displayHiragana = displayStr(aH);
        
        document.getElementById('input-area').innerHTML = `<input type="text" id="answer-box" class="input-box" placeholder="Ketik Hiragana / Kanji..." autocomplete="off"><button class="btn" id="btn-submit">EKSEKUSI</button>`;
        setTimeout(() => { document.getElementById('answer-box').focus(); document.getElementById('btn-submit').onclick = Action.checkInput; }, 100);
        
        // --- TAMBAHKAN KODE INI DI SINI ---
        if (Game.mataActive) {
            let jpText = Game.displayKanji !== Game.displayHiragana ? 
                         `${Game.displayKanji} (${Game.displayHiragana})` : 
                         Game.displayKanji;
            let mataBox = `<div class="intel-box" style="margin-bottom:15px; border-color:var(--gold); color:var(--gold);"><b>Mata Kensei:</b> ${jpText}</div>`;
            document.getElementById('input-area').insertAdjacentHTML('afterbegin', mataBox);
        }
        // ----------------------------
      }
      
      if (Game.adminMode && t !== 'dungeon') {
          let cheatAnswer = "";

          // Tentukan jawaban berdasarkan tab yang sedang aktif
          if (t === 'partikel') {
              if (itm.isMulti) {
                  cheatAnswer = Game.targetMultiAns.join(" & ");
              } else {
                  cheatAnswer = Game.currentAns;
              }
          } else if (t === 'arti') {
              cheatAnswer = `${Game.displayKanji} / ${Game.displayHiragana}`;
          } else if (t === 'hafalan') {
              // Cek apakah ini sedang di sesi Kuis Dadakan (Pengayaan)
              const tHaf = Game.sessionData.hafalan.length;
              if (i >= tHaf && i < tHaf + Game.sessionData.pengayaan.length) {
                  cheatAnswer = Game.sessionData.pengayaan[i - tHaf].a;
              }
          }

          // Render kotak jawaban (jika ada jawaban yang disembunyikan)
          if (cheatAnswer) {
              let cheatUI = `<div style="margin-top: 15px; padding: 10px; background: rgba(239, 68, 68, 0.15); border: 1px dashed var(--danger); border-radius: 8px; color: var(--danger); font-size: 14px; font-weight: bold; text-align: center; animation: slideUp 0.3s ease;">🔑 Kunci Admin: ${cheatAnswer}</div>`;
              document.getElementById('input-area').insertAdjacentHTML('beforeend', cheatUI);
          }

          // Render tombol Bypass hanya untuk zona kuis (bukan materi murni)
          if (t !== 'hafalan' && t !== 'belajar' && i < Game.sessionData[t].length) {
              let adminBtn = `<button class="btn" style="background:var(--danger); color:white; margin-top:10px; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);" onclick="UI.showResult(true, 'ADMIN BYPASS', null, true)">⏩ Bypass Soal (Admin)</button>`;
              document.getElementById('input-area').insertAdjacentHTML('beforeend', adminBtn);
          }
      }
      
    }
  },
  updateProgress: (c, t) => { document.getElementById('ui-progress').style.width = `${t === 0 ? 100 : (c / t) * 100}%`; },
    makeNextBtn: (txt) => { 
    const b = document.getElementById('btn-next'); 
    b.innerText = txt; b.classList.remove('hidden'); 
    b.onclick = () => UI.triggerNextAnim(() => { 
        Game.intelActive = false; 
        Game.mataActive = false;
        
        Game.currentIndex++; 
        UI.loadStep(); 
    }); 
  },
  renderHP: () => {
    document.getElementById('ui-hp').innerHTML = Array(3).fill(0).map((_,i) => {
      let isL = i >= Game.hp; let animC = (isL && i === Game.hp && Game.hpLostThisTurn) ? 'bleed' : '';
      return `<span class="heart ${isL ? 'lost' : ''} ${animC}">❤</span>`;
    }).join('');
    Game.hpLostThisTurn = false;
  },
      showResult: (isC, key, evt, isSkip = false) => {
    const fb = document.getElementById('ui-feedback'); const inp = document.getElementById('answer-box');
    const card = document.getElementById('card-main'); // Tarik elemen card

    if(inp) inp.disabled = true; document.getElementById('btn-submit').classList.add('hidden');
    
        if(isC) { 
      fb.innerHTML = "BENAR ✅"; fb.style.color = "var(--success)"; if(inp) inp.style.borderColor = "var(--success)"; 
      
      card.classList.remove('shake-hard'); 
      card.classList.add('card-correct');
      setTimeout(()=>card.classList.remove('card-correct'), 500);

      if(!isSkip) { 
          RPG.combo++; 
          if(RPG.combo > Game.dailyStats.maxCombo) Game.dailyStats.maxCombo = RPG.combo;
          RPG.addReward(10, 5, evt); 
      } 
 
      if(Game.currentTab !== 'dungeon') {
          UI.makeNextBtn("Lanjut →");
      }
    } else { 
      if(Game.hasShield) {
          Game.hasShield = false; card.classList.remove('shield-active');
          UI.showToast("Aegis Shield Hancur! Kesalahan dimaafkan.", "warning");
          fb.innerHTML = "DITAHAN SHIELD 🛡️ Coba lagi!"; fb.style.color = "var(--primary)"; 
          if(inp) { inp.disabled = false; inp.value = ""; inp.focus(); document.getElementById('btn-submit').classList.remove('hidden'); }
      } else {
          fb.innerHTML = `SALAH ❌<br><span style="font-size:14px; color:var(--text-sub);">Kunci: ${key}</span>`; fb.style.color = "var(--danger)"; 
          card.classList.add('shake-hard'); setTimeout(()=>card.classList.remove('shake-hard'), 500); 
          Game.decreaseHP(evt); 
                  
          if (Game.hp === 1) {
              document.body.classList.add('danger-mode');
          } else if (Game.hp <= 0 || Game.hp > 1) {
              document.body.classList.remove('danger-mode'); 
          }
                    UI.makeNextBtn("Lanjut →");
      }
    }
  } 
}; 

const Action = {
  resetTab: () => {
      Game.currentIndex = 0;
      Game.tabProgress[Game.currentTab] = 0;
      if(Game.currentTab === 'hafalan') Game.jumpscareTriggered = false;
      UI.loadStep();
  },
  
    normalizeSemantics: (text) => {
    // Sapu pembersih baru: titik jp, koma jp, seru jp, tanya jp, koma indo, tanya indo, dan spasi
    return text.toLowerCase().replace(/[。、！？,\?\s]/g, '').trim(); 
  },
  
  checkInput: (evt) => { 
    let rawVal = document.getElementById('answer-box').value; if(!rawVal) return;
    
    if (Game.currentTab === 'arti') {
        let cleanVal = rawVal.replace(/[。、！？,\?\s]/g, '');
        let isCorrect = (cleanVal === Game.currentAnsKanji) || (cleanVal === Game.currentAnsHiragana);
        
        // Tampilkan teks Display yang masih mengandung Koma & Titik!
        let displayKey = Game.displayKanji !== Game.displayHiragana ? `${Game.displayKanji} / ${Game.displayHiragana}` : Game.displayKanji;
        UI.showResult(isCorrect, displayKey, evt);
    } else {
        let v = Action.normalizeSemantics(rawVal);
        let k = Action.normalizeSemantics(Game.currentAns);
        UI.showResult(v === k, Game.currentAns, evt); 
    }
  },

  checkPengayaan: (sel, cor, evt) => { 
      if(sel === cor) { 
          RPG.addReward(2, 1, evt); 
          UI.triggerNextAnim(() => { Game.currentIndex++; UI.loadStep(); }); 
      } else { 
          document.getElementById('ui-feedback').innerHTML = "Salah! ❌"; 
          document.getElementById('ui-feedback').style.color = "var(--warning)"; 
          RPG.combo = 0; RPG.updateUI(); 
      } 
  },

  checkDungeon: (sel, cor, evt) => {
      if(sel === cor) {
          Game.dungeonScore++; RPG.combo++;
          if(RPG.combo > Game.dailyStats.maxCombo) Game.dailyStats.maxCombo = RPG.combo;
          RPG.addReward(5, 2, evt); 
          
          const card = document.getElementById('card-main');
          card.classList.remove('shake-hard'); card.classList.add('card-correct');
          setTimeout(()=>card.classList.remove('card-correct'), 500);
          
          UI.triggerNextAnim(() => { UI.loadStep(); }); 
      } else {
          document.getElementById('ui-feedback').innerHTML = `SALAH ❌<br><span style="font-size:14px; color:var(--text-sub);">Kunci: ${cor}</span>`;
          document.getElementById('ui-feedback').style.color = "var(--danger)";
          
          const card = document.getElementById('card-main');
          card.classList.add('shake-hard'); setTimeout(()=>card.classList.remove('shake-hard'), 500);
          
          Game.decreaseHP(evt);
          
          if(Game.hp > 0) {
              document.getElementById('input-area').innerHTML = `<button class="btn" onclick="UI.triggerNextAnim(() => { UI.loadStep(); })">Lanjut Bertahan →</button>`;
          } else {
              document.getElementById('input-area').innerHTML = `<button class="btn" style="background:var(--danger); color:white;" onclick="Game.init(Game.mode)">💀 KEMBALI KE LOBI</button>`;
          }
      }
  },
  
  fillMulti: (p) => {
    let idx = Game.currentMultiAns.indexOf(null);
    if(idx !== -1) {
        Game.currentMultiAns[idx] = p;
        const b = document.getElementById(`mblank-${idx}`);
        b.innerText = p; 
        b.style.color = "var(--primary)"; 
        b.style.borderBottomStyle = "solid";

        if(!Game.currentMultiAns.includes(null)) {
            document.getElementById('btn-submit').classList.remove('hidden');
        }
    } else {
        const btnSubmit = document.getElementById('btn-submit');
        btnSubmit.classList.add('shake-hard');
        setTimeout(() => btnSubmit.classList.remove('shake-hard'), 300);
        UI.showToast("Slot penuh! Klik partikel pada kalimat di atas untuk mengubahnya.", "error");
    }
  },
  clearMulti: (idx) => {
    Game.currentMultiAns[idx] = null;
    const b = document.getElementById(`mblank-${idx}`);
    b.innerText = "_"; 
    b.style.color = "var(--gold)"; 
    b.style.borderBottomStyle = "dashed";
    document.getElementById('btn-submit').classList.add('hidden');
  },
  checkMulti: (evt) => {
    let isCorrect = JSON.stringify(Game.currentMultiAns) === JSON.stringify(Game.targetMultiAns);
    UI.showResult(isCorrect, Game.targetMultiAns.join(" & "), evt);
  }
};
document.addEventListener('keydown', (e) => { 
  if(e.key === 'Enter') { 
    const bs = document.getElementById('btn-submit'); 
    const bn = document.getElementById('btn-next'); 
    if(bs && !bs.classList.contains('hidden')) bs.click(); 
    else if(bn && !bn.classList.contains('hidden')) bn.click(); 
  } 
});
const Cooldown = {
  triggerDeath: (m) => { 
    localStorage.setItem('yk_lock', Date.now() + (15 * 60 * 1000)); 
    document.getElementById('cd-timer').innerText = "Sistem Lock"; 
    localStorage.setItem('yk_hp', 3); Cooldown.check(); 
  },
  check: () => {
    const rm = (parseInt(localStorage.getItem('yk_lock')) || 0) - Date.now();
    if (rm > 0) {
      ['setup-screen','main-app'].forEach(id=>document.getElementById(id).classList.add('hidden')); document.getElementById('cooldown-screen').classList.remove('hidden');
      let cd = setInterval(() => { const r = parseInt(localStorage.getItem('yk_lock')) - Date.now(); if(r <= 0) { clearInterval(cd); location.reload(); return; } document.getElementById('cd-timer').innerText = `${Math.floor(r/60000)}:${String(Math.floor((r%60000)/1000)).padStart(2,'0')}`; }, 1000); return true;
    } return false;
  }
};
window.onload = async () => {
  try {
    const loadingMsg = document.createElement("div");
    loadingMsg.style.position = "fixed"; loadingMsg.style.top = "50%"; loadingMsg.style.left = "50%"; loadingMsg.style.transform = "translate(-50%, -50%)"; loadingMsg.style.background = "rgba(30, 41, 59, 0.9)"; loadingMsg.style.color = "white"; loadingMsg.style.padding = "20px 40px"; loadingMsg.style.borderRadius = "10px"; loadingMsg.style.zIndex = "9999"; loadingMsg.style.fontWeight = "bold";
    loadingMsg.innerText = "Mengunduh materi dari database...";
    document.body.appendChild(loadingMsg);

    const restUrl = "https://firestore.googleapis.com/v1/projects/wkwkjapan-n5/databases/(default)/documents/materials?pageSize=100";
    const response = await fetch(restUrl);
    if (!response.ok) throw new Error("HTTP error " + response.status);
    
    const data = await response.json();
    if (data.documents) {
        data.documents.forEach(doc => {
            const dayKey = doc.name.split('/').pop();
            let parsedData = { hafalan: [], materi: [], kuisExtra: [], proKuisExtra: [] };
            
            for (let key of ['hafalan', 'materi', 'kuisExtra', 'proKuisExtra']) {
                if (doc.fields[key] && doc.fields[key].arrayValue && doc.fields[key].arrayValue.values) {
                    parsedData[key] = doc.fields[key].arrayValue.values.map(v => {
                        let obj = {};
                        let mapFields = v.mapValue.fields;
                        for (let k in mapFields) {
                            if (mapFields[k].stringValue !== undefined) obj[k] = mapFields[k].stringValue;
                            else if (mapFields[k].booleanValue !== undefined) obj[k] = mapFields[k].booleanValue;
                            else if (mapFields[k].integerValue !== undefined) obj[k] = parseInt(mapFields[k].integerValue);
                            else if (mapFields[k].arrayValue && mapFields[k].arrayValue.values) {
                                obj[k] = mapFields[k].arrayValue.values.map(jpV => {
                                    let jpObj = {};
                                    for (let jpK in jpV.mapValue.fields) {
                                        if (jpV.mapValue.fields[jpK].stringValue !== undefined) jpObj[jpK] = jpV.mapValue.fields[jpK].stringValue;
                                        else if (jpV.mapValue.fields[jpK].booleanValue !== undefined) jpObj[jpK] = jpV.mapValue.fields[jpK].booleanValue;
                                        else if (jpV.mapValue.fields[jpK].integerValue !== undefined) jpObj[jpK] = parseInt(jpV.mapValue.fields[jpK].integerValue);
                                    }
                                    return jpObj;
                                });
                            }
                        }
                        return obj;
                    });
                }
            }
            ManualDB[dayKey] = parsedData;
        });
    }

    if (document.body.contains(loadingMsg)) document.body.removeChild(loadingMsg);
    Game.checkStoredMode();
  } catch (error) {
    alert("Gagal mengunduh: " + error.message);
  }
};
