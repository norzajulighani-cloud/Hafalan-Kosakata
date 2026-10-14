// ==========================================
// DATA MANUAL CURRICULUM
// ==========================================

let ManualDB = {};

// SILABUS RESMI MATERI WKWKJAPAN N5 (DAY 1 - 30)
const SYLLABUS = [
    "Kb1 wa KB2 desu", // Day 1
    "Kb1 mo KB2 desu", // Day 2
    "KB1 wa kb2 dewa/jaa arimasen/nai", // Day 3
    "Kalimat tanya \"ka\"", // Day 4
    "Jawaban dari kalimat tanya ka, yaitu hai sou desu dan iie chigaimasu", // Day 5
    "Partikel no", // Day 6
    "Partikel no", // Day 7
    "Kata tunjuk KOSOADO", // Day 8
    "Kata tunjuk KOSOADO", // Day 9
    "Kata sifat (keiyoshi)-i dan -na", // Day 10
    "Kata sifat -i dan -na + lampau dan negatif", // Day 11
    "Perkenalan partikel ni (sbg penanda lokasi) dan ga, imasu dan arimasu, dan kata tunjuk arah (seperti atas, bawah, kiri, kanan, samping, sebelah dll)", // Day 12
    "Materi Angka, tanggal, dan jam", // Day 13
    "Partikel ni (sbg penanda waktu), kata kerja masu-shimasu + lampau dan negatif, dan sedikit bocoran perihal partikel o (を)", // Day 14
    "Perkenalan partikel ni (sbg tujuan perpindahan, alias \"ke\"), partikel de (sbg alat/cara/transportasi), dan partikel to (sbg penanda keberadaan partner)", // Day 15
    "Kalimat tanya donna, tempat ni dare/nani ga imasu/arimasu ka, kalimat tanya partikel de, to, dan ni", // Day 16
    "Partikel O (を)", // Day 17
    "Perbandingan seri pertama, perbandingan antara dua kata benda + kata sifat (KB1 wa KB2 yori KS desu, KB1 to KB2 to dochira no hoo ga KS desu ka, KB no hoo ga KS desu)", // Day 18
    "Perbandingan seri kedua, perbandingan paling —KS— di antara tiga pilihan/kelompok, dan bentuk negatif/persamaan perbandingan", // Day 19
    "Kakujoshi: Edisi Partikel de (で) part 1 (penunjuk tempat beraktivitas dan penunjuk cara, bahan, alat)", // Day 20
    "Kakujoshi: Edisi Partikel de (で) part 2 (penunjuk alasan/penyebab dan penunjuk batasan dari jumlah atau waktu)", // Day 21
    "Kakujoshi: Edisi Partikel ni (に) (penunjuk tempat keberadaan eksistensi, penunjuk waktu, dan penunjuk titik akhir)", // Day 22
    "Kakujoshi: Edisi Partikel ni (に) (penunjuk tujuan dan penunjuk arah/tempat tujuan)", // Day 23
    "Kakujoshi: Edisi Partikel to (と) (penunjuk lawan interaksi berpasangan maupun tidak berpasangan)", // Day 24
    "Kakujoshi: Edisi Partikel o (を) (penunjuk objek, penunjuk titik awal, dan penunjuk tempat yang dilewati)", // Day 25
    "Kakujoshi: Edisi Partikel e (へ) (penunjuk arah/titik akhir)", // Day 26
    "Kakujoshi: Edisi Partikel ga (が) (penunjuk subjek dan penunjuk objek)", // Day 27
    "Bunpo N5: Edisi KK (bentuk kamus) + koto/no", // Day 28
    "Bunpo N5: Edisi KK (bentuk kamus) + koto + ga dekimasu", // Day 29
    "Ajakan KK (bentuk Masu) + masen ka (Bagaimana kalau kita... / Pertanyaan sopan)" // Day 30
];

const getMissionCategory = (day) => {
    if (day <= 3) return '🔰 DASAR TATA BAHASA';
    if (day <= 5) return '💬 INTEROGATIF & RESPON';
    if (day <= 7) return '🔗 KEPEMILIKAN (PARTIKEL の)';
    if (day <= 9) return '🧭 SISTEM KOSOADO';
    if (day <= 11) return '✨ KATA SIFAT (KEIYOUSHI)';
    if (day <= 13) return '⏳ WAKTU, ANGKA & TANGGAL';
    if (day <= 17) return '⚔️ VERBA & PARTIKEL DASAR';
    if (day <= 19) return '⚖️ POLA PERBANDINGAN';
    if (day <= 27) return '🛡️ MASTERI KAKUJOSHI';
    if (day <= 30) return '👑 AJAKAN & TATA BAHASA SOPAN';
    let s = Math.ceil(day / 5);
    return `⚡ EKSPEDISI SEKTOR ${s}`;
};
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
        if(item.k) chunkHtml = Engine.buildRubyFormat(item.k, item.r, null, isPro);
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
  level: parseInt(localStorage.getItem('yk_lvl')) || 1, 
  exp: parseInt(localStorage.getItem('yk_exp')) || 0,
  coins: parseInt(localStorage.getItem('yk_coins')) || 0, 
  combo: 0,
  hasShield: false, 
  intelActive: false,
  inventory: (() => {
    try {
      let saved = localStorage.getItem('yk_inventory');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { hp: 1, shield: 0, intel: 0, mata: 0, pandora: 0 };
  })(),

  relics: (() => {
    try {
      let saved = localStorage.getItem('yk_relics');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { muramasa: false, omamori: false, scouter: false };
  })(),

  hasRelic: function(key) {
    return !!(this.relics && this.relics[key]);
  },

  saveRelics: function() {
    try {
      localStorage.setItem('yk_relics', JSON.stringify(this.relics));
    } catch (e) {}
  },

  getInvCount: function(key) {
    return (this.inventory && typeof this.inventory[key] === 'number') ? this.inventory[key] : 0;
  },

  getTotalBagCount: function() {
    if (!this.inventory) return 0;
    return Object.values(this.inventory).reduce((acc, v) => acc + (typeof v === 'number' ? v : 0), 0);
  },

  bagCapacity: parseInt(localStorage.getItem('yk_bag_cap')) || 6,

  getBagCapacity: function() {
    return this.bagCapacity || 6;
  },

  getBagUpgradeCost: function() {
    let cap = this.getBagCapacity();
    if (cap >= 18) return null; // Tingkat Maksimal
    if (cap <= 6) return 250;
    if (cap <= 9) return 500;
    if (cap <= 12) return 850;
    return 1300;
  },

  upgradeBagCapacity: function() {
    let cost = this.getBagUpgradeCost();
    if (cost === null) {
      UI.showToast("Kapasitas tas sudah maksimal (18 Slot)! 🎒", "warning");
      return;
    }

    let perks = this.getRankPerks();
    let discount = perks.shopDiscount || 0;
    let actualCost = Math.round(cost * (1 - discount));

    if (Game.adminMode || this.coins >= actualCost) {
      if (!Game.adminMode) this.coins -= actualCost;
      this.bagCapacity = this.getBagCapacity() + 3;
      this.save();
      this.updateUI();
      if (typeof UI.renderShop === 'function') UI.renderShop();
      if (typeof UI.renderInventory === 'function') UI.renderInventory();

      let discountMsg = discount > 0 ? ` (Diskon ${Math.round(discount * 100)}% Gelar)` : "";
      UI.showToast(`Ekspansi Berhasil! Kapasitas Tas bertambah menjadi ${this.bagCapacity} Slot!${discountMsg} 🎒✨`, "success");
    } else {
      UI.showToast("Kredit koin tidak mencukupi untuk ekspansi tas.", "error");
    }
  },

  getTitle: function() { 
    if(this.level >= 150) return "⛩️ Kensei"; if(this.level >= 90) return "👑 Shogun";
    if(this.level >= 60) return "🏯 Daimyo"; if(this.level >= 30) return "🛡️ Samurai";
    if(this.level >= 10) return "⚔️ Ronin"; return "🔰 Pemula";
  },

  getTitleParts: function() {
    let t = this.getTitle().trim().split(' ');
    let icon = t[0] || '🔰';
    let name = t.slice(1).join(' ') || 'Pemula';
    return { icon, name };
  },

  getRankPerks: function() {
    if (this.level >= 150) {
      return {
        id: 'kensei',
        name: "Kensei",
        icon: "⛩️",
        minLvl: 150,
        expBonus: 0.40,
        coinBonus: 0.40,
        shopDiscount: 0.20,
        resistChance: 0.15,
        comboBonusCoin: true,
        doubleRewardChance: 0.25,
        desc: "+40% EXP & Koin, Diskon 20% Toko, 15% Tangkis Salah, 25% Critical Double Reward"
      };
    } else if (this.level >= 90) {
      return {
        id: 'shogun',
        name: "Shogun",
        icon: "👑",
        minLvl: 90,
        expBonus: 0.25,
        coinBonus: 0.25,
        shopDiscount: 0.15,
        resistChance: 0.10,
        comboBonusCoin: true,
        doubleRewardChance: 0.20,
        desc: "+25% EXP & Koin, Diskon 15% Toko, 10% Tangkis Salah, 20% Critical Double Reward"
      };
    } else if (this.level >= 60) {
      return {
        id: 'daimyo',
        name: "Daimyo",
        icon: "🏯",
        minLvl: 60,
        expBonus: 0.15,
        coinBonus: 0.15,
        shopDiscount: 0.10,
        resistChance: 0.05,
        comboBonusCoin: true,
        doubleRewardChance: 0,
        desc: "+15% EXP & Koin, Diskon 10% Toko, +1 Koin Ekstra saat Combo ≥ 5"
      };
    } else if (this.level >= 30) {
      return {
        id: 'samurai',
        name: "Samurai",
        icon: "🛡️",
        minLvl: 30,
        expBonus: 0.10,
        coinBonus: 0.05,
        shopDiscount: 0.05,
        resistChance: 0.05,
        comboBonusCoin: false,
        doubleRewardChance: 0,
        desc: "+10% EXP, +5% Koin, Diskon 5% Toko, 5% Peluang Tangkis Salah"
      };
    } else if (this.level >= 10) {
      return {
        id: 'ronin',
        name: "Ronin",
        icon: "⚔️",
        minLvl: 10,
        expBonus: 0.05,
        coinBonus: 0,
        shopDiscount: 0.05,
        resistChance: 0,
        comboBonusCoin: false,
        doubleRewardChance: 0,
        desc: "+5% EXP Kuis, Diskon 5% di Toko Suplai"
      };
    }
    return {
      id: 'pemula',
      name: "Pemula",
      icon: "🔰",
      minLvl: 1,
      expBonus: 0,
      coinBonus: 0,
      shopDiscount: 0,
      resistChance: 0,
      comboBonusCoin: false,
      doubleRewardChance: 0,
      desc: "Pelatihan Dasar (Belum ada bonus pasif)"
    };
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
    const rank = this.getTitleParts();
    const lvlEl = document.getElementById('ui-lvl');
    if (lvlEl) {
      lvlEl.innerHTML = `<span class="lvl-num">Lv.${this.level}</span> <span class="lvl-icon">${rank.icon}</span> <span class="lvl-name">${rank.name}</span>`;
      lvlEl.title = `Level ${this.level} (${rank.icon} ${rank.name}) - Klik untuk info Gelar`;
    }
    document.getElementById('ui-exp').innerText = this.exp; 

    // --- EXP BAR PROGRESS ---
    let nextLvlExp = this.getExpRequirement();
    let expPerc = Math.min(100, Math.max(0, Math.round((this.exp / nextLvlExp) * 100)));
    const expFillEl = document.getElementById('ui-exp-fill');
    if (expFillEl) expFillEl.style.width = `${expPerc}%`;

    // --- MODE ADMIN: KOIN INFINITY ---
    let displayCoin = Game.adminMode ? "∞" : this.coins;
    document.getElementById('ui-coin').innerText = displayCoin; 
    const shopCoinEl = document.getElementById('shop-coin-display');
    if (shopCoinEl) shopCoinEl.innerText = displayCoin;
    // ---------------------------------

    // --- HUD BAG ITEM COUNTER PILL ---
    const bagBadge = document.getElementById('ui-bag-count');
    let totalItems = this.getTotalBagCount();
    let cap = this.getBagCapacity();
    if (bagBadge) {
      bagBadge.innerText = `${totalItems}/${cap}`;
      bagBadge.style.display = totalItems > 0 ? 'inline-block' : 'none';
      if (totalItems >= cap) {
        bagBadge.classList.add('bag-full');
      } else {
        bagBadge.classList.remove('bag-full');
      }
    }

    // --- BAG CAPACITY PANEL IN INVENTORY ---
    const capText = document.getElementById('inv-capacity-text');
    const capFill = document.getElementById('inv-capacity-fill');
    const upgradeInvBtn = document.getElementById('btn-upgrade-bag-inv');
    let upCost = this.getBagUpgradeCost();
    let perks = this.getRankPerks();
    let disc = perks.shopDiscount || 0;
    let actualUpCost = upCost !== null ? Math.round(upCost * (1 - disc)) : null;

    if (capText) {
      capText.innerText = `${totalItems} / ${cap} Slot`;
    }
    if (capFill) {
      let perc = Math.min(100, Math.round((totalItems / cap) * 100));
      capFill.style.width = `${perc}%`;
      if (perc >= 100) {
        capFill.className = 'inv-capacity-fill fill-danger';
      } else if (perc >= 75) {
        capFill.className = 'inv-capacity-fill fill-warning';
      } else {
        capFill.className = 'inv-capacity-fill';
      }
    }
    if (upgradeInvBtn) {
      if (actualUpCost === null) {
        upgradeInvBtn.innerText = "MAX (18 Slot) ✅";
        upgradeInvBtn.disabled = true;
      } else {
        upgradeInvBtn.innerText = `+ Upgrade Slot (${actualUpCost} 🪙)`;
        upgradeInvBtn.disabled = false;
      }
    }

    // --- SHOP BAG EXPANSION CARD ---
    const shopBagStatus = document.getElementById('shop-bag-cap-status');
    const shopBagBtn = document.getElementById('btn-buy-bag-expand');
    if (shopBagStatus) {
      shopBagStatus.innerText = `Kapasitas: ${cap} Slot`;
    }
    if (shopBagBtn) {
      if (actualUpCost === null) {
        shopBagBtn.innerText = "MAX SLOT (18) ✅";
        shopBagBtn.disabled = true;
        shopBagBtn.className = "btn-buy btn-relic-owned";
      } else {
        shopBagBtn.innerText = `${actualUpCost} 🪙`;
        shopBagBtn.disabled = false;
        shopBagBtn.className = "btn-buy btn-bag-upgrade";
      }
    }

    // --- SHOP OWNED BADGES ---
    ['hp', 'shield', 'intel', 'mata', 'pandora'].forEach(key => {
      let el = document.getElementById(`owned-${key}`);
      if (el) el.innerText = `Tas: ${this.getInvCount(key)}`;
    });

    // --- SHOP RELIC OWNED BUTTONS ---
    ['muramasa', 'omamori', 'scouter'].forEach(key => {
      let btn = document.getElementById(`btn-buy-relic-${key}`);
      if (btn) {
        if (this.hasRelic(key)) {
          btn.innerText = "TERPASANG ✅";
          btn.className = "btn-buy btn-relic-owned";
          btn.disabled = true;
        } else {
          let perks = this.getRankPerks();
          let baseCosts = { muramasa: 600, omamori: 750, scouter: 500 };
          let disc = perks.shopDiscount || 0;
          let actualCost = Math.round((baseCosts[key] || 500) * (1 - disc));
          btn.innerText = `${actualCost} 🪙`;
          btn.className = "btn-buy btn-relic";
          btn.disabled = false;
        }
      }
    });

    const cUI = document.getElementById('ui-combo');
    if (cUI) {
      if(this.combo >= 2) { 
          let dispCombo = Math.min(this.combo, 15);
          let maxText = this.combo >= 15 ? " (MAX)" : "";
          cUI.innerText = `🔥 x${dispCombo}${maxText}`; 
          if(this.combo >= 15) cUI.style.color = "var(--danger)"; else cUI.style.color = "#f97316";
          cUI.classList.remove('hidden'); cUI.classList.add('active'); 
      } else { cUI.classList.add('hidden'); cUI.classList.remove('active'); }
    }
  },
  
  addReward: function(baseExp, baseCoin, evt) {
    let perks = this.getRankPerks();
    let multi = this.combo >= 2 ? Math.min(this.combo, 15) : 1; 
    let earnedExp = Math.round(baseExp * multi * (1 + perks.expBonus)); 
    let earnedCoin = Math.round(baseCoin * multi * (1 + perks.coinBonus));

    // Relik Pedang Muramasa (+10% EXP Permanen)
    if (this.hasRelic('muramasa')) {
      let muramasaBonus = Math.max(1, Math.round(earnedExp * 0.10));
      earnedExp += muramasaBonus;
    }

    // Bonus koin combo perk
    if (perks.comboBonusCoin && this.combo >= 5) {
      earnedCoin += 1;
    }

    // Critical Double Reward Perk (Shogun / Kensei)
    let isCrit = perks.doubleRewardChance > 0 && Math.random() < perks.doubleRewardChance;
    if (isCrit) {
      earnedExp *= 2;
      earnedCoin *= 2;
      setTimeout(() => {
        this.spawnFloatingText("💥 CRITICAL 2X!", "var(--gold)", evt, 0, -40);
      }, 250);
    }

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

  buyToInventory: function(type, cost) {
    let perks = this.getRankPerks();
    let discount = perks.shopDiscount || 0;
    let actualCost = Math.round(cost * (1 - discount));

    // Cek Batas Kapasitas Tas
    if (!Game.adminMode && this.getTotalBagCount() >= this.getBagCapacity()) {
      UI.showToast(`🎒 Tas Penuh (${this.getTotalBagCount()}/${this.getBagCapacity()})! Tingkatkan kapasitas tas di Toko.`, "warning");
      return;
    }

    let hasAccess = Game.adminMode || this.coins >= actualCost;
    if (hasAccess) {
      if (!Game.adminMode) this.coins -= actualCost;
      if (!this.inventory) this.inventory = { hp: 0, shield: 0, intel: 0, mata: 0, pandora: 0 };
      if (typeof this.inventory[type] !== 'number') this.inventory[type] = 0;
      this.inventory[type]++;
      this.save();
      this.updateUI();
      if (typeof UI.renderInventory === 'function') UI.renderInventory();

      const itemNames = {
        hp: "Nano-Repair (+1 HP)",
        shield: "Aegis Shield",
        intel: "Gulungan Intel",
        mata: "Mata Kensei",
        pandora: "Kotak Pandora"
      };
      let name = itemNames[type] || type;
      let discountMsg = discount > 0 ? ` (Diskon ${Math.round(discount * 100)}% Gelar)` : "";
      UI.showToast(`Berhasil beli ${name}!${discountMsg} Disimpan di Tas 🎒`, "success");
    } else {
      UI.showToast("Kredit koin tidak memadai.", "error");
    }
  },

  buyRelic: function(type, cost) {
    if (this.hasRelic(type)) {
      UI.showToast("Relik ini sudah Anda miliki secara permanen!", "warning");
      return;
    }
    let perks = this.getRankPerks();
    let discount = perks.shopDiscount || 0;
    let actualCost = Math.round(cost * (1 - discount));
    let hasAccess = Game.adminMode || this.coins >= actualCost;
    if (hasAccess) {
      if (!Game.adminMode) this.coins -= actualCost;
      if (!this.relics) this.relics = { muramasa: false, omamori: false, scouter: false };
      this.relics[type] = true;
      this.saveRelics();
      this.save();
      this.updateUI();
      if (typeof UI.renderShop === 'function') UI.renderShop();
      if (typeof UI.renderInventory === 'function') UI.renderInventory();

      const relicNames = {
        muramasa: "🗡️ Pedang Muramasa (+10% EXP)",
        omamori: "📿 Jimat Omamori (10% Kebal Error)",
        scouter: "👓 Lensa Scouter (Radar Partikel)"
      };
      let name = relicNames[type] || type;
      let discountMsg = discount > 0 ? ` (Diskon ${Math.round(discount * 100)}% Gelar)` : "";
      UI.showToast(`Relik Terbuka: ${name}!${discountMsg} ✨`, "success");
    } else {
      UI.showToast("Kredit koin tidak mencukupi untuk Relik ini.", "error");
    }
  },

  rollPandoraGacha: function() {
    let count = this.getInvCount('pandora');
    if (count <= 0 && !Game.adminMode) {
      UI.showToast("Kamu tidak memiliki Kotak Pandora di dalam tas!", "error");
      return;
    }
    if (!Game.adminMode) this.inventory.pandora--;

    let rand = Math.random();
    let result = null;

    if (rand < 0.05) {
      // 5% LEGENDARY TIER
      let unownedRelics = ['muramasa', 'omamori', 'scouter'].filter(r => !this.hasRelic(r));
      if (unownedRelics.length > 0 && Math.random() < 0.5) {
        let wonRelic = unownedRelics[Math.floor(Math.random() * unownedRelics.length)];
        this.relics[wonRelic] = true;
        this.saveRelics();
        const relicNames = { muramasa: 'Pedang Muramasa 🗡️', omamori: 'Jimat Omamori 📿', scouter: 'Lensa Scouter 👓' };
        result = {
          tier: 'legendary',
          tierName: 'LEGENDARY JACKPOT 🟡',
          name: relicNames[wonRelic],
          desc: 'Mahakarya Langka! Relik permanen berhasil diperoleh secara GRATIS!',
          icon: wonRelic === 'muramasa' ? '🗡️' : (wonRelic === 'omamori' ? '📿' : '👓'),
          rewardType: 'relic'
        };
      } else {
        this.coins += 350;
        Game.hp = 3;
        localStorage.setItem('yk_hp', Game.hp);
        UI.renderHP();
        result = {
          tier: 'legendary',
          tierName: 'LEGENDARY JACKPOT 🟡',
          name: 'Restorasi Suci + 350 🪙',
          desc: 'HP pulih maksimal (3/3) & pundi-pundi koin bertambah drastis!',
          icon: '👑',
          rewardType: 'jackpot'
        };
      }
    } else if (rand < 0.25) {
      // 20% EPIC TIER
      let epicRoll = Math.random();
      if (epicRoll < 0.5) {
        this.inventory.mata = (this.inventory.mata || 0) + 1;
        result = {
          tier: 'epic',
          tierName: 'EPIC REWARD 🟣',
          name: '1x Mata Kensei 👁️',
          desc: 'Item langka pembuka arti bahasa Jepang pada kuis Tab Arti!',
          icon: '👁️',
          rewardType: 'item'
        };
      } else {
        let coinBonus = 200;
        this.coins += coinBonus;
        result = {
          tier: 'epic',
          tierName: 'EPIC REWARD 🟣',
          name: `Peti Harta +${coinBonus} 🪙`,
          desc: 'Peti dipenuhi keping emas berkilau bernilai tinggi!',
          icon: '💰',
          rewardType: 'coins'
        };
      }
    } else if (rand < 0.60) {
      // 35% RARE TIER
      let rareRoll = Math.random();
      if (rareRoll < 0.5) {
        this.inventory.shield = (this.inventory.shield || 0) + 1;
        result = {
          tier: 'rare',
          tierName: 'RARE REWARD 🔵',
          name: '1x Aegis Shield 🛡️',
          desc: 'Pelindung 1x kesalahan kuis disimpan langsung ke dalam tasmu.',
          icon: '🛡️',
          rewardType: 'item'
        };
      } else {
        this.inventory.intel = (this.inventory.intel || 0) + 1;
        result = {
          tier: 'rare',
          tierName: 'RARE REWARD 🔵',
          name: '1x Gulungan Intel 📜',
          desc: 'Item bocoran arti kalimat Tab Partikel berhasil diamankan.',
          icon: '📜',
          rewardType: 'item'
        };
      }
    } else {
      // 40% COMMON TIER
      let commonRoll = Math.random();
      if (commonRoll < 0.5) {
        this.inventory.hp = (this.inventory.hp || 0) + 1;
        result = {
          tier: 'common',
          tierName: 'COMMON REWARD ⚪',
          name: '1x Nano-Repair (+1 HP) ❤️',
          desc: 'Kapsul medis pemulih kesehatan darurat disimpan ke dalam tas.',
          icon: '❤️',
          rewardType: 'item'
        };
      } else {
        let coinBack = 45;
        this.coins += coinBack;
        result = {
          tier: 'common',
          tierName: 'COMMON REWARD ⚪',
          name: `Cashback +${coinBack} 🪙`,
          desc: 'Mendapatkan uang kembali dari kotak suvenir kenang-kenangan.',
          icon: '🪙',
          rewardType: 'coins'
        };
      }
    }

    this.save();
    this.updateUI();
    if (typeof UI.renderInventory === 'function') UI.renderInventory();
    UI.playGachaAnimation(result);
  },

  useItem: function(type) {
    let count = this.getInvCount(type);
    if (count <= 0 && !Game.adminMode) {
      UI.showToast("Item tidak tersedia di dalam tas!", "error");
      return;
    }

    if (type === 'hp') {
      if (Game.hp >= 3) {
        UI.showToast("HP sudah penuh (3/3)!", "warning");
        return;
      }
      if (!Game.adminMode) this.inventory.hp--;
      Game.hp = Math.min(3, Game.hp + 1);
      localStorage.setItem('yk_hp', Game.hp);
      UI.renderHP();
      if (Game.hp > 1) document.body.classList.remove('danger-mode');
      UI.showToast("Nano-Repair Digunakan! +1 HP ❤️", "success");
    } else if (type === 'shield') {
      let t = Game.currentTab;
      if (t !== 'partikel' && t !== 'arti' && t !== 'dungeon') {
        UI.showToast("Aegis Shield hanya untuk Zona Tempur!", "error");
        return;
      }
      if (Game.hasShield) {
        UI.showToast("Aegis Shield sudah aktif!", "warning");
        return;
      }
      if (!Game.adminMode) this.inventory.shield--;
      Game.hasShield = true;
      const cardEl = document.getElementById('card-main');
      if (cardEl) cardEl.classList.add('shield-active');
      UI.showToast("Aegis Shield Aktif! Melindungi 1x kesalahan.", "success");
    } else if (type === 'intel') {
      let t = Game.currentTab;
      if (t !== 'partikel') {
        UI.showToast("Gulungan Intel hanya berfungsi di Tab Partikel!", "error");
        return;
      }
      if (Game.intelActive) {
        UI.showToast("Intel sudah terbuka untuk soal ini!", "warning");
        return;
      }
      let itm = Game.sessionData && Game.sessionData[t] ? Game.sessionData[t][Game.currentIndex] : null;
      if (!itm || !itm.a) {
        UI.showToast("Tidak ada data intel pada soal ini.", "warning");
        return;
      }
      if (!Game.adminMode) this.inventory.intel--;
      Game.intelActive = true;
      let inputArea = document.getElementById('input-area');
      if (inputArea) {
        let intelBox = document.createElement('div');
        intelBox.className = 'intel-box';
        intelBox.innerHTML = `<b>Intel Arti:</b> ${itm.a}`;
        inputArea.prepend(intelBox);
      }
      UI.showToast("Intel Arti Berhasil Diretas!", "success");
      UI.closeModal('inventory-modal');
    } else if (type === 'mata') {
      let t = Game.currentTab;
      if (t !== 'arti') {
        UI.showToast("Mata Kensei hanya berfungsi di Tab Arti!", "error");
        return;
      }
      if (Game.mataActive) {
        UI.showToast("Mata Kensei sudah aktif untuk soal ini!", "warning");
        return;
      }
      if (!Game.adminMode) this.inventory.mata--;
      Game.mataActive = true;
      let jpText = Game.displayKanji !== Game.displayHiragana ? 
                   `${Game.displayKanji} (${Game.displayHiragana})` : 
                   Game.displayKanji;
      let inputArea = document.getElementById('input-area');
      if (inputArea) {
        let mataBox = document.createElement('div');
        mataBox.className = 'intel-box';
        mataBox.style.borderColor = 'var(--gold)';
        mataBox.style.color = 'var(--gold)';
        mataBox.innerHTML = `<b>Mata Kensei:</b> ${jpText}`;
        inputArea.prepend(mataBox);
      }
      UI.showToast("Mata Kensei Aktif! Teks Jepang terungkap.", "success");
      UI.closeModal('inventory-modal');
    } else if (type === 'pandora') {
      this.rollPandoraGacha();
      return;
    }

    this.save();
    this.updateUI();
    if (typeof UI.renderInventory === 'function') UI.renderInventory();
  },

  buyItem: function(type, cost) {
    this.buyToInventory(type, cost);
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
  save: function() { 
    localStorage.setItem('yk_lvl', this.level); 
    localStorage.setItem('yk_exp', this.exp); 
    localStorage.setItem('yk_coins', this.coins); 
    localStorage.setItem('yk_inventory', JSON.stringify(this.inventory));
    localStorage.setItem('yk_bag_cap', this.getBagCapacity());
    if (typeof Cloud !== 'undefined') Cloud.autoSync();
  }
};

const Dojo = {
  mistakes: [],
  currentFilter: 'all',
  sessionList: [],
  sessionIndex: 0,
  sessionCorrectCount: 0,

  init: function() {
    try {
      this.mistakes = JSON.parse(localStorage.getItem('yk_mistakes') || '[]');
      if (!Array.isArray(this.mistakes)) this.mistakes = [];
    } catch(e) {
      this.mistakes = [];
    }
    this.updateBadge();
  },

  save: function() {
    localStorage.setItem('yk_mistakes', JSON.stringify(this.mistakes));
    this.updateBadge();
  },

  updateBadge: function() {
    const badge = document.getElementById('dojo-badge');
    if (!badge) return;
    const count = this.getPendingCount();
    badge.innerText = `${count} Soal`;
    if (count > 0) {
      badge.className = 'sidebar-tile-status status-count has-mistakes';
    } else {
      badge.className = 'sidebar-tile-status status-count';
    }
  },

  getPendingCount: function() {
    return this.mistakes.filter(m => (m.mastery || 0) < 2).length;
  },

  recordMistake: function(type, item, day, correctKey) {
    if (!item) return;
    this.init(); // pastikan data termutakhir

    // Signature unik penanda soal
    let signature = "";
    if (type === 'hafalan') {
      signature = `haf_${(item.k || '').trim()}_${(item.a || '').trim()}`;
    } else if (type === 'partikel') {
      let jpStr = Array.isArray(item.jp) ? item.jp.map(x => x.text || x.k || '').join('') : (item.a || '');
      signature = `part_${day}_${jpStr.slice(0, 30)}`;
    } else if (type === 'arti') {
      signature = `arti_${day}_${(item.a || '').slice(0, 30)}`;
    } else {
      signature = `misc_${Date.now()}`;
    }

    let existing = this.mistakes.find(m => m.id === signature);
    if (existing) {
      existing.failCount = (existing.failCount || 1) + 1;
      existing.mastery = 0; // reset streak jika gagal lagi
      existing.lastFailed = Date.now();
      if (correctKey) existing.correctKey = correctKey;
    } else {
      this.mistakes.unshift({
        id: signature,
        type: type, // 'hafalan' | 'partikel' | 'arti'
        day: day || Game.currentDay || 1,
        item: JSON.parse(JSON.stringify(item)),
        correctKey: correctKey || "",
        failCount: 1,
        mastery: 0, // 0 = belum, 1 = 50%, 2 = 100% (lulus)
        lastFailed: Date.now()
      });
    }

    // Batasi kapasitas bank kesalahan max 150 soal agar memori tetap optimal
    if (this.mistakes.length > 150) {
      this.mistakes = this.mistakes.slice(0, 150);
    }

    this.save();
  },

  clearMastered: function() {
    let before = this.mistakes.length;
    this.mistakes = this.mistakes.filter(m => (m.mastery || 0) < 2);
    let removed = before - this.mistakes.length;
    this.save();
    this.renderModal();
    if (removed > 0) {
      UI.showToast(`Dojo diperbarui! ${removed} soal yang sudah dikuasai dibersihkan. ✨`, 'success');
    } else {
      UI.showToast('Belum ada soal lulus yang perlu dibersihkan.', 'info');
    }
  },

  removeMistake: function(id) {
    this.mistakes = this.mistakes.filter(m => m.id !== id);
    this.save();
    this.renderModal();
    UI.showToast("Soal dihapus dari Bank Kesalahan. 🗑️", "success");
  },

  setFilter: function(f) {
    this.currentFilter = f;
    ['all', 'partikel', 'arti', 'hafalan'].forEach(k => {
      const chip = document.getElementById(`dchip-${k}`);
      if (chip) {
        if (k === f) chip.classList.add('active');
        else chip.classList.remove('active');
      }
    });
    this.renderModal();
  },

  openModal: function() {
    UI.openModal('dojo-modal');
  },

  renderModal: function() {
    const list = document.getElementById('dojo-list');
    if (!list) return;

    this.init(); // Sinkronisasi storage
    let total = this.mistakes.length;
    let pending = this.getPendingCount();
    let mastered = total - pending;

    // Filter counts
    let partikelCount = this.mistakes.filter(m => m.type === 'partikel').length;
    let artiCount = this.mistakes.filter(m => m.type === 'arti').length;
    let hafalanCount = this.mistakes.filter(m => m.type === 'hafalan').length;

    // Update UI Badges & Metrics
    const badgePending = document.getElementById('dojo-pending-badge');
    if (badgePending) badgePending.innerText = `${pending} Perlu Dilatih`;

    const statTotal = document.getElementById('dojo-stat-total');
    if (statTotal) statTotal.innerText = total;

    const statPending = document.getElementById('dojo-stat-pending');
    if (statPending) statPending.innerText = pending;

    const statMastered = document.getElementById('dojo-stat-mastered');
    if (statMastered) statMastered.innerText = mastered;

    const chipAll = document.getElementById('dchip-all-count');
    if (chipAll) chipAll.innerText = total;

    const chipP = document.getElementById('dchip-partikel-count');
    if (chipP) chipP.innerText = partikelCount;

    const chipA = document.getElementById('dchip-arti-count');
    if (chipA) chipA.innerText = artiCount;

    const chipH = document.getElementById('dchip-hafalan-count');
    if (chipH) chipH.innerText = hafalanCount;

    // Tombol Mulai Latihan
    const btnStart = document.getElementById('btn-dojo-start');
    const btnStartText = document.getElementById('btn-dojo-start-text');
    if (btnStart) {
      if (pending === 0) {
        btnStart.disabled = true;
        if (btnStartText) btnStartText.innerText = "SEMUA SOAL TELAH DIKUASAI ✅";
      } else {
        btnStart.disabled = false;
        if (btnStartText) btnStartText.innerText = `MULAI LATIHAN REMEDIAL (${pending} SOAL)`;
      }
    }

    // Filtered list
    let filtered = this.mistakes;
    if (this.currentFilter !== 'all') {
      filtered = this.mistakes.filter(m => m.type === this.currentFilter);
    }

    if (filtered.length === 0) {
      if (total === 0) {
        list.innerHTML = `
          <div class="dojo-zen-empty">
            <span class="dojo-zen-icon">⛩️</span>
            <div class="dojo-zen-title">Pikiran Kensei Tenang</div>
            <p class="dojo-zen-desc">Belum ada catatan kesalahan! Kamu telah menaklukkan seluruh kuis dengan sempurna. Pertahankan refleksmu di Zona Tempur!</p>
          </div>
        `;
      } else {
        list.innerHTML = `
          <div class="dojo-zen-empty">
            <span class="dojo-zen-icon">✨</span>
            <div class="dojo-zen-title">Kategori Ini Bersih</div>
            <p class="dojo-zen-desc">Tidak ada soal yang keliru pada kategori ini. Pilih kategori lain atau latih seluruh materi.</p>
          </div>
        `;
      }
      return;
    }

    list.innerHTML = filtered.map(m => {
      let isMastered = (m.mastery || 0) >= 2;
      let glyph = '🥋';
      let typeLabel = 'SOAL';
      let tagClass = 'tag-partikel';

      if (m.type === 'partikel') {
        glyph = '🧩';
        typeLabel = 'PARTIKEL';
        tagClass = 'tag-partikel';
      } else if (m.type === 'arti') {
        glyph = '⚔️';
        typeLabel = 'TERJEMAHAN';
        tagClass = 'tag-arti';
      } else if (m.type === 'hafalan') {
        glyph = '🚨';
        typeLabel = 'KOSAKATA';
        tagClass = 'tag-hafalan';
      }

      // Format pertanyaan & kunci
      let qText = "";
      let keyText = m.correctKey || "";
      if (m.type === 'hafalan') {
        let romaji = (m.item.r && m.item.r !== m.item.k) ? ` (${m.item.r})` : '';
        qText = `${m.item.k || ''}${romaji} ➔ ${m.item.a || ''}`;
      } else if (m.type === 'partikel') {
        let sentencePlain = Array.isArray(m.item.jp) ? m.item.jp.map(x => x.text || x.k || '').join('') : (m.item.a || '');
        qText = sentencePlain;
      } else if (m.type === 'arti') {
        qText = m.item.a || '';
      }

      let masteryBadge = '';
      if (isMastered) {
        masteryBadge = '<span class="dojo-mastery-pill mastered">✅ Lulus 100%</span>';
      } else if (m.mastery === 1) {
        masteryBadge = '<span class="dojo-mastery-pill half">⭐ 1/2 Refleks</span>';
      } else {
        masteryBadge = '<span class="dojo-mastery-pill none">⏳ Belum Lulus</span>';
      }

      return `
        <div class="dojo-item-row ${isMastered ? 'is-mastered' : ''}">
          <div class="dojo-item-glyph">${glyph}</div>
          <div class="dojo-item-main">
            <div class="dojo-item-top">
              <span class="dojo-tag ${tagClass}">${typeLabel}</span>
              <span class="dojo-day-pill">Hari ${m.day || 1}</span>
              <span class="dojo-fail-pill">🔥 ${m.failCount || 1}x Gagal</span>
              ${masteryBadge}
            </div>
            <div class="dojo-item-q">${qText}</div>
            ${keyText ? `<div class="dojo-item-ans"><span class="dojo-ans-label">Kunci:</span> ${keyText}</div>` : ''}
          </div>
          <div class="dojo-item-action">
            <button type="button" class="btn-dojo-row-drill" onclick="Dojo.drillSingle('${m.id}')" title="Latih soal ini saja">Latih ➔</button>
            <button type="button" class="btn-dojo-row-del" onclick="Dojo.removeMistake('${m.id}')" title="Hapus dari daftar">✕</button>
          </div>
        </div>
      `;
    }).join('');
  },

  startSession: function(filterType) {
    this.init();
    let list = this.mistakes.filter(m => (m.mastery || 0) < 2);
    if (filterType && filterType !== 'all') {
      list = list.filter(m => m.type === filterType);
    }
    if (list.length === 0) {
      UI.showToast("Semua soal di Dojo telah kamu kuasai dengan sempurna! 🥋✨", "info");
      return;
    }

    this.sessionList = Engine.shuffle([...list]);
    this.sessionIndex = 0;
    this.sessionCorrectCount = 0;

    UI.closeModal('dojo-modal');
    Game.currentTab = 'dojo';

    document.getElementById('ui-day').innerText = "🥋 DOJO REMEDIAL";
    const badge = document.getElementById('ui-zone');
    if (badge) {
      badge.className = "zone-badge zone-tempur";
      badge.innerText = "🥋 REPETISI SPASI";
    }

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const card = document.getElementById('card-main');
    if (card) card.classList.remove('hazard-battle-active');

    UI.loadStep();
  },

  drillSingle: function(id) {
    this.init();
    let found = this.mistakes.find(m => m.id === id);
    if (!found) {
      UI.showToast("Soal tidak ditemukan.", "error");
      return;
    }

    this.sessionList = [found];
    this.sessionIndex = 0;
    this.sessionCorrectCount = 0;

    UI.closeModal('dojo-modal');
    Game.currentTab = 'dojo';

    document.getElementById('ui-day').innerText = "🥋 DOJO REMEDIAL";
    const badge = document.getElementById('ui-zone');
    if (badge) {
      badge.className = "zone-badge zone-tempur";
      badge.innerText = "🥋 FOKUS KILAT";
    }

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const card = document.getElementById('card-main');
    if (card) card.classList.remove('hazard-battle-active');

    UI.loadStep();
  },

  retreatSession: function() {
    if (confirm("Ingin mengakhiri sesi latihan Dojo dan kembali ke Markas? EXP yang diraih tetap tersimpan.")) {
      UI.showToast("Kembali ke Markas. Istirahatlah sejenak!", "info");
      Game.init(Game.mode);
    }
  },

  checkHafalan: function(sel, cor, evt) {
    const btn = evt ? evt.currentTarget : null;
    let isCorrect = (sel === cor);
    if (isCorrect) {
      if (btn) btn.classList.add('choice-correct');
      if (navigator.vibrate) try { navigator.vibrate(30); } catch(_) {}
    } else {
      if (btn) {
        btn.classList.add('choice-wrong');
        setTimeout(() => btn.classList.remove('choice-wrong'), 500);
      }
      if (navigator.vibrate) try { navigator.vibrate([50, 40, 50]); } catch(_) {}
    }
    Dojo.handleDojoResult(isCorrect, cor, evt);
  },

  checkPartikel: function(evt) {
    let isCorrect = JSON.stringify(Game.currentMultiAns) === JSON.stringify(Game.targetMultiAns);
    Dojo.handleDojoResult(isCorrect, Game.targetMultiAns.join(" & "), evt);
  },

  checkArti: function(evt) {
    let rawVal = document.getElementById('answer-box').value;
    if (!rawVal) return;
    let cleanVal = rawVal.replace(/[。、！？,\?\s]/g, '');
    let isCorrect = (cleanVal === Game.currentAnsKanji) || (cleanVal === Game.currentAnsHiragana);
    let displayKey = Game.displayKanji !== Game.displayHiragana ? `${Game.displayKanji} / ${Game.displayHiragana}` : Game.displayKanji;
    Dojo.handleDojoResult(isCorrect, displayKey, evt);
  },

  handleDojoResult: function(isCorrect, key, evt) {
    const fb = document.getElementById('ui-feedback');
    const inp = document.getElementById('answer-box');
    const card = document.getElementById('card-main');
    if (inp) inp.disabled = true;
    const btnSubmit = document.getElementById('btn-submit');
    if (btnSubmit) btnSubmit.classList.add('hidden');

    let cur = Dojo.sessionList[Dojo.sessionIndex];

    if (isCorrect) {
      Dojo.sessionCorrectCount++;
      if (fb) {
        fb.innerHTML = "BENAR! REFLEKS BERTAMBAH ⭐";
        fb.style.color = "var(--success)";
      }
      if (card) {
        card.classList.remove('shake-hard');
        card.classList.add('card-correct');
        setTimeout(() => card.classList.remove('card-correct'), 500);
      }

      // Update streak in active session & global mistakes
      if (cur) {
        cur.mastery = (cur.mastery || 0) + 1;
        cur.lastFailed = Date.now();
        let orig = Dojo.mistakes.find(m => m.id === cur.id);
        if (orig) {
          orig.mastery = cur.mastery;
          orig.lastFailed = cur.lastFailed;
        }

        if (cur.mastery >= 2) {
          UI.showToast("🎓 TUNTAS! Soal ini resmi lulus dari Dojo (100% Akurasi)!", "success");
        } else {
          UI.showToast("⭐ Refleks Meningkat! Tinggal 1x benar lagi untuk lulus 100%.", "success");
        }
      }
      Dojo.save();
      RPG.addReward(8, 2, evt);

      UI.makeNextBtn("Lanjut Drill →");
      const bn = document.getElementById('btn-next');
      if (bn) {
        bn.onclick = () => UI.triggerNextAnim(() => {
          Dojo.sessionIndex++;
          UI.loadStep();
        });
      }
    } else {
      if (fb) {
        fb.innerHTML = `SALAH ❌<br><span style="font-size:14px; color:var(--text-sub);">Kunci: ${key}</span>`;
        fb.style.color = "var(--danger)";
      }
      if (card) {
        card.classList.add('shake-hard');
        setTimeout(() => card.classList.remove('shake-hard'), 500);
      }

      if (cur) {
        cur.mastery = 0; // reset streak agar butuh pengulangan
        cur.failCount = (cur.failCount || 1) + 1;
        let orig = Dojo.mistakes.find(m => m.id === cur.id);
        if (orig) {
          orig.mastery = 0;
          orig.failCount = cur.failCount;
        }
      }
      Dojo.save();

      UI.makeNextBtn("Lanjut Drill →");
      const bn = document.getElementById('btn-next');
      if (bn) {
        bn.onclick = () => UI.triggerNextAnim(() => {
          Dojo.sessionIndex++;
          UI.loadStep();
        });
      }
    }
  }
};

const Streak = {
  data: {
    count: 1,
    lastDate: '',
    claimedToday: false,
    freezes: 0
  },

  init: function() {
    try {
      const saved = localStorage.getItem('yk_streak_data');
      if (saved) {
        this.data = Object.assign(this.data, JSON.parse(saved));
      }
    } catch(e) {}
    this.checkDaily();
    this.updateUI();
  },

  getTodayStr: function() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  },

  getYesterdayStr: function() {
    const y = new Date(Date.now() - 86400000);
    return `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, '0')}-${String(y.getDate()).padStart(2, '0')}`;
  },

  checkDaily: function() {
    const today = this.getTodayStr();
    const yesterday = this.getYesterdayStr();

    if (!this.data.lastDate) {
      this.data.lastDate = today;
      this.data.count = 1;
      this.data.claimedToday = false;
      this.save();
      return;
    }

    if (this.data.lastDate === today) {
      return;
    }

    if (this.data.lastDate === yesterday) {
      this.data.lastDate = today;
      this.data.count = (this.data.count || 1) + 1;
      this.data.claimedToday = false;
      this.save();
    } else {
      if (this.data.freezes > 0) {
        this.data.freezes--;
        this.data.lastDate = today;
        this.data.claimedToday = false;
        this.save();
        setTimeout(() => {
          UI.showToast(`❄️ Jimat Pembeku Api aktif! Streak ${this.data.count} hari kamu terselamatkan!`, 'success');
        }, 1200);
      } else {
        this.data.count = 1;
        this.data.lastDate = today;
        this.data.claimedToday = false;
        this.save();
      }
    }
  },

  save: function() {
    try {
      localStorage.setItem('yk_streak_data', JSON.stringify(this.data));
    } catch(e) {}
    this.updateUI();
  },

  updateUI: function() {
    const hudBadge = document.getElementById('ui-streak');
    if (hudBadge) hudBadge.textContent = this.data.count;

    const sidebarBadge = document.getElementById('sidebar-streak-badge');
    if (sidebarBadge) sidebarBadge.textContent = `🔥 ${this.data.count}`;

    const shopFreeze = document.getElementById('owned-streak-freeze');
    if (shopFreeze) shopFreeze.textContent = `Miliki: ${this.data.freezes} / 2`;
  },

  openModal: function() {
    this.renderModal();
    UI.openModal('streak-modal');
  },

  renderModal: function() {
    const countEl = document.getElementById('streak-modal-count');
    const statusEl = document.getElementById('streak-modal-status');
    const claimBtn = document.getElementById('streak-claim-btn');
    const freezeEl = document.getElementById('streak-freeze-count');

    if (countEl) countEl.textContent = `${this.data.count} Hari Beruntun!`;
    if (freezeEl) freezeEl.textContent = `${this.data.freezes} / 2 Tersedia`;

    const cycleDay = ((this.data.count - 1) % 7) + 1;
    const rewards = [
      { day: 1, exp: 30, coin: 25, bonus: "" },
      { day: 2, exp: 40, coin: 35, bonus: "" },
      { day: 3, exp: 60, coin: 50, bonus: "❤️ Nano-Repair" },
      { day: 4, exp: 70, coin: 60, bonus: "" },
      { day: 5, exp: 90, coin: 80, bonus: "🛡️ Aegis Shield" },
      { day: 6, exp: 110, coin: 100, bonus: "" },
      { day: 7, exp: 200, coin: 180, bonus: "🎁 Kotak Pandora" }
    ];

    const timelineContainer = document.getElementById('streak-timeline');
    if (timelineContainer) {
      timelineContainer.innerHTML = rewards.map(r => {
        const isPast = r.day < cycleDay;
        const isCurrent = r.day === cycleDay;
        const statusClass = isCurrent ? 'timeline-active' : (isPast ? 'timeline-done' : 'timeline-locked');
        return `
          <div class="streak-day-node ${statusClass}">
            <div class="streak-day-icon">${isPast ? '✓' : (isCurrent ? '🔥' : '🔒')}</div>
            <div class="streak-day-num">Hari ${r.day}</div>
            <div class="streak-day-reward">+${r.coin}🪙 ${r.bonus ? `<br><small style="color:var(--text-main); font-size:8px;">${r.bonus}</small>` : ''}</div>
          </div>
        `;
      }).join('');
    }

    if (claimBtn) {
      if (this.data.claimedToday) {
        claimBtn.disabled = false;
        claimBtn.className = "btn-streak-claim btn-streak-claimed";
        claimBtn.textContent = 'Tutup (Sudah Diklaim Hari Ini) ✓';
        claimBtn.onclick = () => UI.closeModal('streak-modal');
        if (statusEl) statusEl.textContent = 'Kembali lagi besok untuk mempertahankan apimu!';
      } else {
        claimBtn.disabled = false;
        claimBtn.className = "btn-streak-claim";
        const curReward = rewards[cycleDay - 1];
        claimBtn.textContent = `KLAIM BONUS HARI ${cycleDay} (+${curReward.coin} 🪙 & +${curReward.exp} EXP) ➔`;
        claimBtn.onclick = () => Streak.claimReward();
        if (statusEl) statusEl.textContent = 'Nyalakan apimu dengan mengklaim bonus hari ini!';
      }
    }
  },

  claimReward: function() {
    if (this.data.claimedToday) return;
    const cycleDay = ((this.data.count - 1) % 7) + 1;
    const rewards = [
      { exp: 30, coin: 25 },
      { exp: 40, coin: 35 },
      { exp: 60, coin: 50, item: 'hp' },
      { exp: 70, coin: 60 },
      { exp: 90, coin: 80, item: 'shield' },
      { exp: 110, coin: 100 },
      { exp: 200, coin: 180, item: 'pandora' }
    ];
    const reward = rewards[cycleDay - 1];

    this.data.claimedToday = true;
    this.save();

    RPG.exp += reward.exp;
    RPG.coins += reward.coin;
    if (reward.item) {
      if (!RPG.inventory) RPG.inventory = {};
      RPG.inventory[reward.item] = (RPG.inventory[reward.item] || 0) + 1;
    }
    RPG.save();
    RPG.updateUI();

    RPG.spawnFloatingText(`+${reward.coin} 🪙 Bonus Absensi!`, "var(--gold)", null, 0, -50);
    UI.showToast(`🔥 Absensi Hari ke-${this.data.count} Berhasil! Hadiah diterima.`, 'success');

    this.renderModal();
    if (typeof Cloud !== 'undefined') Cloud.autoSync();
  },

  buyFreeze: function(cost = 150) {
    if (this.data.freezes >= 2) {
      UI.showToast("Maksimal 2 Jimat Pembeku Api tersimpan!", "warning");
      return;
    }
    if (!Game.adminMode && RPG.coins < cost) {
      UI.showToast("Koin tidak cukup untuk membeli Jimat!", "error");
      return;
    }
    if (!Game.adminMode) RPG.coins -= cost;
    this.data.freezes++;
    this.save();
    RPG.save();
    RPG.updateUI();
    UI.showToast(`❄️ Jimat Pembeku Api dibeli! (${this.data.freezes}/2)`, 'success');
    if (typeof UI.renderShop === 'function') UI.renderShop();
    if (typeof Cloud !== 'undefined') Cloud.autoSync();
  }
};

const Cloud = {
  profile: {
    nickname: 'Pendekar Kensei',
    kenseiCode: '',
    lastSynced: 0
  },

  init: function() {
    try {
      const saved = localStorage.getItem('yk_cloud_profile');
      if (saved) {
        this.profile = Object.assign(this.profile, JSON.parse(saved));
      }
    } catch(e) {}

    if (!this.profile.kenseiCode) {
      const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
      let code = 'YK-';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      this.profile.kenseiCode = code;
      this.saveProfile();
    }

    this.updateUI();
  },

  saveProfile: function() {
    try {
      localStorage.setItem('yk_cloud_profile', JSON.stringify(this.profile));
    } catch(e) {}
    this.updateUI();
  },

  updateUI: function() {
    const codeDisplay = document.getElementById('cloud-code-display');
    if (codeDisplay) codeDisplay.textContent = this.profile.kenseiCode;

    const nameInput = document.getElementById('cloud-nickname-input');
    if (nameInput && document.activeElement !== nameInput) {
      nameInput.value = this.profile.nickname || 'Pendekar Kensei';
    }

    const sideBadge = document.getElementById('sidebar-cloud-badge');
    if (sideBadge) sideBadge.textContent = this.profile.kenseiCode;

    const syncStatus = document.getElementById('cloud-sync-status');
    if (syncStatus) {
      if (this.profile.lastSynced > 0) {
        const timeAgo = this.formatTimeAgo(this.profile.lastSynced);
        syncStatus.innerHTML = `<span style="color:#4ade80; font-weight:800;">● Tersinkron di Cloud</span> (${timeAgo})`;
      } else {
        syncStatus.innerHTML = `<span style="color:var(--warning);">○ Belum Pernah Disinkron</span>`;
      }
    }
  },

  formatTimeAgo: function(timestamp) {
    const sec = Math.floor((Date.now() - timestamp) / 1000);
    if (sec < 60) return "Baru saja";
    if (sec < 3600) return `${Math.floor(sec/60)} mnt lalu`;
    if (sec < 86400) return `${Math.floor(sec/3600)} jam lalu`;
    return `${Math.floor(sec/86400)} hari lalu`;
  },

  setNickname: async function(name) {
    name = (name || '').trim().slice(0, 16);
    if (!name) name = 'Pendekar Kensei';
    this.profile.nickname = name;
    this.saveProfile();
    UI.showToast(`Nickname diubah: "${name}"`, 'success');
    await this.syncToCloud(false);
  },

  syncToCloud: async function(showToast = true) {
    const db = (typeof firebase !== 'undefined' && firebase.firestore) ? firebase.firestore() : null;
    if (!db) {
      if (showToast) UI.showToast("Firestore tidak aktif. Data tersimpan di memori lokal.", "warning");
      return false;
    }

    const rank = RPG.getTitleParts();
    const payload = {
      kenseiCode: this.profile.kenseiCode,
      nickname: this.profile.nickname || 'Pendekar Kensei',
      level: RPG.level,
      title: rank.name,
      titleIcon: rank.icon,
      exp: RPG.exp,
      coins: RPG.coins,
      unlockedDay: Game.unlockedDay,
      currentDay: Game.currentDay,
      maxCombo: RPG.combo || 0,
      streak: (typeof Streak !== 'undefined') ? Streak.data.count : 1,
      freezes: (typeof Streak !== 'undefined') ? Streak.data.freezes : 0,
      bagCapacity: RPG.getBagCapacity(),
      inventory: RPG.inventory || {},
      relics: RPG.relics || {},
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
      await db.collection('players').doc(this.profile.kenseiCode).set(payload, { merge: true });
      this.profile.lastSynced = Date.now();
      this.saveProfile();
      if (showToast) UI.showToast("⚡ Sukses Sinkron ke Cloud Kensei!", "success");
      return true;
    } catch(err) {
      console.warn("Cloud sync error:", err);
      if (showToast) UI.showToast("Gagal sync ke cloud (offline / koneksi jaringan)", "error");
      return false;
    }
  },

  autoSync: function() {
    if (this._syncTimer) clearTimeout(this._syncTimer);
    this._syncTimer = setTimeout(() => {
      this.syncToCloud(false);
    }, 2000);
  },

  restoreFromCloud: async function(code) {
    code = (code || '').trim().toUpperCase();
    if (!code) {
      UI.showToast("Masukkan Kode Kensei!", "error");
      return;
    }

    const db = (typeof firebase !== 'undefined' && firebase.firestore) ? firebase.firestore() : null;
    if (!db) {
      UI.showToast("Firestore tidak aktif / koneksi terputus", "error");
      return;
    }

    try {
      UI.showToast("Mencari data di Cloud...", "info");
      const doc = await db.collection('players').doc(code).get();
      if (!doc.exists) {
        UI.showToast(`Kode ${code} tidak ditemukan di Cloud!`, "error");
        return;
      }

      const d = doc.data();
      const confirmMsg = `Data Ditemukan!\n• Nickname: ${d.nickname}\n• Level: ${d.level} (${d.title})\n• Progres: Hari ke-${d.unlockedDay}\n• EXP: ${d.exp} ✨ | Koin: ${d.coins} 🪙\n\nApakah kamu yakin ingin memulihkan dan menimpa data perangkat ini?`;
      if (!confirm(confirmMsg)) return;

      this.profile.kenseiCode = d.kenseiCode || code;
      this.profile.nickname = d.nickname || 'Pendekar Kensei';
      this.profile.lastSynced = Date.now();
      this.saveProfile();

      RPG.level = d.level || 1;
      RPG.exp = d.exp || 0;
      RPG.coins = d.coins || 0;
      RPG.bagCapacity = d.bagCapacity || 6;
      RPG.inventory = d.inventory || {};
      RPG.relics = d.relics || {};
      RPG.save();

      Game.unlockedDay = d.unlockedDay || 1;
      Game.currentDay = Math.min(Game.unlockedDay, d.currentDay || 1);
      Game.saveGame();

      if (typeof Streak !== 'undefined') {
        Streak.data.count = d.streak || 1;
        Streak.data.freezes = d.freezes || 0;
        Streak.save();
      }

      RPG.updateUI();
      Game.loadDayData();
      if (typeof UI.renderMap === 'function') UI.renderMap();
      if (typeof UI.renderInventory === 'function') UI.renderInventory();

      UI.showToast("🎉 Data Berhasil Dipulihkan dari Cloud!", "success");
      UI.closeModal('cloud-modal');
    } catch(err) {
      console.error("Cloud restore error:", err);
      UI.showToast("Gagal memulihkan: " + err.message, "error");
    }
  },

  copyCode: function() {
    if (!navigator.clipboard) {
      UI.showToast(`Kode Anda: ${this.profile.kenseiCode}`, 'info');
      return;
    }
    navigator.clipboard.writeText(this.profile.kenseiCode).then(() => {
      UI.showToast(`Kode ${this.profile.kenseiCode} disalin ke clipboard! 📋`, 'success');
    }).catch(() => {
      UI.showToast(`Kode Anda: ${this.profile.kenseiCode}`, 'info');
    });
  }
};

const Leaderboard = {
  currentTab: 'exp',
  cachedList: [],

  setTab: function(tab) {
    this.currentTab = tab;
    document.querySelectorAll('.lb-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    this.render();
  },

  openModal: async function() {
    UI.openModal('leaderboard-modal');
    await this.fetchData();
  },

  fetchData: async function() {
    const listEl = document.getElementById('lb-list-stream');
    if (listEl) listEl.innerHTML = `<div class="lb-loading">⚡ Mengambil data Hall of Fame Kensei...</div>`;

    const db = (typeof firebase !== 'undefined' && firebase.firestore) ? firebase.firestore() : null;
    let players = [];

    if (db) {
      try {
        const snap = await db.collection('players').limit(60).get();
        snap.forEach(doc => {
          players.push(doc.data());
        });
      } catch(e) {
        console.warn("Leaderboard fetch error:", e);
      }
    }

    const myCode = (typeof Cloud !== 'undefined') ? Cloud.profile.kenseiCode : 'ME';
    const myName = (typeof Cloud !== 'undefined') ? Cloud.profile.nickname : 'Pendekar Kensei';
    const myRank = RPG.getTitleParts();
    const myEntry = {
      kenseiCode: myCode,
      nickname: myName,
      level: RPG.level,
      title: myRank.name,
      titleIcon: myRank.icon,
      exp: RPG.exp,
      coins: RPG.coins,
      maxCombo: RPG.combo || 0,
      streak: (typeof Streak !== 'undefined') ? Streak.data.count : 1,
      unlockedDay: Game.unlockedDay,
      isMe: true
    };

    const existingIdx = players.findIndex(p => p.kenseiCode === myCode);
    if (existingIdx >= 0) {
      players[existingIdx] = Object.assign(players[existingIdx], myEntry);
    } else {
      players.push(myEntry);
    }

    this.cachedList = players;
    this.render();
  },

  render: function() {
    const list = [...this.cachedList];
    const metric = this.currentTab;

    if (metric === 'exp') {
      list.sort((a, b) => (b.exp || 0) - (a.exp || 0) || (b.level || 0) - (a.level || 0));
    } else if (metric === 'streak') {
      list.sort((a, b) => (b.streak || 0) - (a.streak || 0) || (b.exp || 0) - (a.exp || 0));
    } else if (metric === 'combo') {
      list.sort((a, b) => (b.maxCombo || 0) - (a.maxCombo || 0) || (b.exp || 0) - (a.exp || 0));
    }

    const top1 = list[0] || null;
    const top2 = list[1] || null;
    const top3 = list[2] || null;

    const renderPodiumSlot = (p, rankNum, medal) => {
      if (!p) {
        return `
          <div class="podium-slot rank-${rankNum} podium-empty">
            <div class="podium-crown" style="opacity:0.35;">${medal}</div>
            <div class="podium-avatar" style="opacity:0.25; filter:grayscale(1);">🥋</div>
            <div class="podium-name" style="opacity:0.5; font-style:italic; font-size:11px;">Slot Kosong</div>
            <div class="podium-lvl" style="opacity:0.4; font-size:9.5px;">Menanti Murid</div>
          </div>
        `;
      }
      let valText = '';
      if (metric === 'exp') valText = `${(p.exp || 0).toLocaleString()} ✨`;
      else if (metric === 'streak') valText = `🔥 ${p.streak || 1} Hari`;
      else if (metric === 'combo') valText = `⚡ ${p.maxCombo || 0}x`;

      return `
        <div class="podium-slot rank-${rankNum} ${p.isMe ? 'is-me' : ''}">
          <div class="podium-crown">${medal}</div>
          <div class="podium-avatar">${p.titleIcon || '🥷'}</div>
          <div class="podium-name">${p.nickname}</div>
          <div class="podium-lvl">Lv.${p.level || 1} • ${p.title || 'Pendekar'}</div>
          <div class="podium-val">${valText}</div>
        </div>
      `;
    };

    const podiumEl = document.getElementById('lb-podium-container');
    if (podiumEl) {
      podiumEl.innerHTML = `
        ${renderPodiumSlot(top2, 2, '🥈')}
        ${renderPodiumSlot(top1, 1, '🥇')}
        ${renderPodiumSlot(top3, 3, '🥉')}
      `;
    }

    const streamEl = document.getElementById('lb-list-stream');
    if (streamEl) {
      const rest = list.slice(3, 50);
      if (rest.length === 0) {
        streamEl.innerHTML = `<div class="lb-empty">Belum ada ranking berikutnya. Jadilah yang pertama!</div>`;
      } else {
        streamEl.innerHTML = rest.map((p, idx) => {
          const rank = idx + 4;
          let valText = '';
          if (metric === 'exp') valText = `${(p.exp || 0).toLocaleString()} ✨`;
          else if (metric === 'streak') valText = `🔥 ${p.streak || 1} Hari`;
          else if (metric === 'combo') valText = `⚡ ${p.maxCombo || 0}x Combo`;

          return `
            <div class="lb-row ${p.isMe ? 'is-me' : ''}">
              <div class="lb-rank">#${rank}</div>
              <div class="lb-avatar">${p.titleIcon || '🥷'}</div>
              <div class="lb-info">
                <div class="lb-name">${p.nickname} ${p.isMe ? '<span class="lb-me-tag">ANDA</span>' : ''}</div>
                <div class="lb-sub">Lv.${p.level || 1} ${p.title || ''} • Hari ${p.unlockedDay || 1}</div>
              </div>
              <div class="lb-score">${valText}</div>
            </div>
          `;
        }).join('');
      }
    }

    const stickyEl = document.getElementById('lb-sticky-player');
    if (stickyEl) {
      const myIdx = list.findIndex(p => p.isMe);
      const myRank = myIdx >= 0 ? myIdx + 1 : list.length;
      const me = list[myIdx] || {
        nickname: Cloud.profile.nickname,
        level: RPG.level,
        title: RPG.getTitleParts().name,
        titleIcon: RPG.getTitleParts().icon,
        exp: RPG.exp,
        streak: Streak.data.count,
        maxCombo: RPG.combo || 0
      };

      let valText = '';
      if (metric === 'exp') valText = `${(me.exp || 0).toLocaleString()} ✨`;
      else if (metric === 'streak') valText = `🔥 ${me.streak || 1} Hari`;
      else if (metric === 'combo') valText = `⚡ ${me.maxCombo || 0}x`;

      stickyEl.innerHTML = `
        <div class="lb-sticky-inner">
          <div class="lb-rank" style="color:var(--primary); font-weight:900;">#${myRank}</div>
          <div class="lb-avatar">${me.titleIcon || '🥷'}</div>
          <div class="lb-info">
            <div class="lb-name">${me.nickname} <span class="lb-me-tag">STATUS ANDA</span></div>
            <div class="lb-sub">Lv.${me.level} • Sektor Hari ${Game.unlockedDay}</div>
          </div>
          <div class="lb-score" style="color:var(--gold); font-size:13px;">${valText}</div>
        </div>
      `;
    }
  }
};

const Boss = {
  list: {
    5: {
      id: 'boss_5',
      day: 5,
      sector: 1,
      name: "Ronin Partikel",
      kanjiName: "助詞の浪人",
      title: "Penjaga Gerbang Awal • Ronin Tanpa Tuan",
      avatar: "🥷",
      maxHp: 5,
      quote: "Partikel は, の, dan も adalah nafasku. Buktikan kamu layak melangkah lebih jauh!",
      desc: "Bos Sektor 1 yang menguji penguasaan partikel dasar dan kata benda perkenalan.",
      expReward: 100,
      coinReward: 50
    },
    10: {
      id: 'boss_10',
      day: 10,
      sector: 2,
      name: "Oni Keiyoushi",
      kanjiName: "形容詞の鬼",
      title: "Iblis Dua Wujud • Penguasa Sifat I & Na",
      avatar: "👺",
      maxHp: 6,
      quote: "Panas, dingin, indah, atau benci? Bedakan perubahan bentuk sifatku sebelum tebasan ini tiba!",
      desc: "Bos Sektor 2 yang menguji kecepatan konjugasi kata sifat I dan Na.",
      expReward: 140,
      coinReward: 70
    },
    15: {
      id: 'boss_15',
      day: 15,
      sector: 3,
      name: "Samurai Doushi",
      kanjiName: "動詞の侍",
      title: "Pendekar Tiga Aliran • Penguasa Bentuk Masu & Kamus",
      avatar: "🏯",
      maxHp: 7,
      quote: "Pedangku bergerak mengikuti irama grup kata kerja 1, 2, dan 3. Tangkis jika mampu!",
      desc: "Bos Sektor 3 yang menguji ketepatan golongan kata kerja dan perubahan bentuk.",
      expReward: 180,
      coinReward: 90
    },
    20: {
      id: 'boss_20',
      day: 20,
      sector: 4,
      name: "Kunoichi Kaimono",
      kanjiName: "買物のくのいち",
      title: "Bayangan Pasar • Ahli Bilangan, Waktu & Lokasi",
      avatar: "🌪️",
      maxHp: 8,
      quote: "Menghitung menit, tanggal, dan arah mata angin dalam kegelapan adalah keahlian mutlakku!",
      desc: "Bos Sektor 4 yang menguji pemahaman angka, jam, hari, dan penunjuk arah/tempat.",
      expReward: 220,
      coinReward: 110
    },
    25: {
      id: 'boss_25',
      day: 25,
      sector: 5,
      name: "Shogun Bunpo",
      kanjiName: "文法の将軍",
      title: "Panglima Benteng • Master Pola Kalimat N5",
      avatar: "👑",
      maxHp: 9,
      quote: "Bentuk negatif, lampau, ajakan, dan permohonan bersatu di bawah komandoku. Bersujudlah!",
      desc: "Bos Sektor 5 yang menguji susunan tata bahasa dan kalimat kompleks.",
      expReward: 260,
      coinReward: 130
    },
    30: {
      id: 'boss_30',
      day: 30,
      sector: 6,
      name: "Pendekar Sasoi",
      kanjiName: "勧誘の剣士",
      title: "Penjaga Sektor 6 • Penguasa Ajakan & Pertanyaan Sopan",
      avatar: "🎎",
      maxHp: 10,
      quote: "Issho ni ikimasen ka? Sebelum menembus sektor selanjutnya, buktikan kehalusan bahasa ajakanmu!",
      desc: "Bos Sektor 6 yang menguji kemahiran pola kalimat ajakan dan pertanyaan sopan.",
      expReward: 300,
      coinReward: 150
    },
    35: {
      id: 'boss_35',
      day: 35,
      sector: 7,
      name: "Monk Renketsu",
      kanjiName: "連結の僧侶",
      title: "Penjaga Sektor 7 • Penguasa Rantai Bentuk Te & Permohonan",
      avatar: "📿",
      maxHp: 10,
      quote: "Bentuk -te mengalir menyambungkan tindakan demi tindakan. Putuskan rantai ini jika mampu!",
      desc: "Bos Sektor 7 yang menguji keluwesan konjugasi bentuk Te dan kalimat penghubung.",
      expReward: 330,
      coinReward: 165
    },
    40: {
      id: 'boss_40',
      day: 40,
      sector: 8,
      name: "Hayate Hitei",
      kanjiName: "否定の疾風",
      title: "Penjaga Sektor 8 • Penguasa Bentuk Nai & Larangan",
      avatar: "🦅",
      maxHp: 11,
      quote: "Jangan lakukan, tidak boleh masuk! Tembus dinding sangkalan ini tanpa ragu!",
      desc: "Bos Sektor 8 yang menguji konjugasi bentuk negatif kasual Nai dan aturan keharusan.",
      expReward: 360,
      coinReward: 180
    },
    45: {
      id: 'boss_45',
      day: 45,
      sector: 9,
      name: "Kensei Jisho",
      kanjiName: "辞書の剣聖",
      title: "Penjaga Sektor 9 • Master Bentuk Kamus & Potensi Dekiru",
      avatar: "🐺",
      maxHp: 11,
      quote: "Bentuk kamus adalah akar dari segala kata kerja. Tunjukkan seberapa dalam pemahaman dasarmu!",
      desc: "Bos Sektor 9 yang menguji bentuk kamus orisinal dan pola kemampuan koto ga dekimasu.",
      expReward: 390,
      coinReward: 195
    },
    50: {
      id: 'boss_50',
      day: 50,
      sector: 10,
      name: "Ryu Bunkei",
      kanjiName: "複文の龍",
      title: "Penjaga Sektor 10 • Naga Kalimat Majemuk & Sebab-Akibat",
      avatar: "🐲",
      maxHp: 12,
      quote: "Kara dan Node adalah sayapku! Buktikan alasanmu berdiri tegak di hadapanku!",
      desc: "Bos Sektor 10 yang menguji susunan klausa majemuk dan hubungan sebab-akibat.",
      expReward: 420,
      coinReward: 210
    },
    55: {
      id: 'boss_55',
      day: 55,
      sector: 11,
      name: "Hagane Sonkei",
      kanjiName: "尊敬の鋼",
      title: "Penjaga Sektor 11 • Penguasa Bahasa Hormat & Kesopanan",
      avatar: "🛡️",
      maxHp: 12,
      quote: "Kekuatan tanpa rasa hormat hanyalah amarah hampa. Tundukkan egomu dengan tata krama!",
      desc: "Bos Sektor 11 yang menguji pemahaman derajat kesopanan dan ekspresi sopan N5.",
      expReward: 450,
      coinReward: 225
    },
    60: {
      id: 'boss_60',
      day: 60,
      sector: 12,
      name: "Raijin Goukei",
      kanjiName: "雷神の合算",
      title: "Penjaga Sektor 12 • Dewa Penguji Konvergensi Tata Bahasa",
      avatar: "⚡",
      maxHp: 13,
      quote: "Kilat menyatukan partikel, kata sifat, dan seluruh ragam kata kerja. Sambut ujian badai ini!",
      desc: "Bos Sektor 12 yang menguji konvergensi tata bahasa tingkat lanjut N5.",
      expReward: 480,
      coinReward: 240
    }
  },

  currentBoss: null,
  currentHp: 0,
  maxHp: 0,
  questionQueue: [],
  questionIndex: 0,
  bossDefeated: false,

  getBossForDay: function(day) {
    if (this.list[day]) return this.list[day];
    let sector = Math.ceil(day / 5);
    let nearest = Math.floor(day / 5) * 5;
    if (this.list[nearest]) return this.list[nearest];

    // Procedural Boss Generator dinamis untuk sektor tak terhingga di atas Hari 60
    let bossTitles = [
      { name: "Yomikata Shinobi", kanji: "読方の忍", avatar: "🥷", title: "Bayangan Penguji Sektor" },
      { name: "Kensei Gakusha", kanji: "剣聖の学者", avatar: "📜", title: "Cendekiawan Pendekar Sektor" },
      { name: "Shogun Senryaku", kanji: "戦略の将軍", avatar: "🏯", title: "Panglima Taktik Bahasa" },
      { name: "Kojin Seiryu", kanji: "青竜の古人", avatar: "🐉", title: "Penjaga Sektor Legendaris" },
      { name: "Senshi Fudou", kanji: "不動の戦士", avatar: "🗿", title: "Batu Karang Pertahanan Bahasa" }
    ];
    let pick = bossTitles[(sector - 1) % bossTitles.length];
    let calculatedHp = Math.min(15, 8 + Math.floor(sector * 0.4));
    return {
      id: 'boss_' + day,
      day: day,
      sector: sector,
      name: `${pick.name} Sektor ${sector}`,
      kanjiName: pick.kanji,
      title: `${pick.title} • Penjaga Hari ${day}`,
      avatar: pick.avatar,
      maxHp: calculatedHp,
      quote: `Kekuatanmu telah membawamu ke Sektor ${sector}. Tunjukkan bahwa penguasaanmu terus berkembang!`,
      desc: `Penjaga Sektor ${sector} yang menguji materi komprehensif hingga Hari ${day}.`,
      expReward: 200 + (sector * 25),
      coinReward: 100 + (sector * 12)
    };
  },

  isBossDay: function(day) {
    return (day % 5 === 0);
  },

  startBattle: function(day) {
    if (Game.hp <= 0) {
      UI.showToast("HP habis! Pulihkan diri sebelum menghadapi Bos.", "error");
      return;
    }

    let b = this.getBossForDay(day);
    this.currentBoss = b;
    this.currentHp = b.maxHp;
    this.maxHp = b.maxHp;
    this.bossDefeated = false;

    // Kumpulkan bank soal komprehensif dari sektor ini (5 hari terakhir)
    let minDay = Math.max(1, day - 4);
    let maxDay = day;

    let partikelPool = [];
    let artiPool = [];
    let vocabPool = [];

    for (let d = minDay; d <= maxDay; d++) {
      let dData = ManualDB['day' + d];
      if (dData) {
        if (dData.hafalan) vocabPool = vocabPool.concat(dData.hafalan.map(x => ({ ...x, _day: d, _type: 'hafalan' })));
        if (dData.materi) {
          partikelPool = partikelPool.concat(dData.materi.filter(x => x.jp).map(x => ({ ...x, _day: d, _type: 'partikel' })));
          artiPool = artiPool.concat(dData.materi.filter(x => x.a).map(x => ({ ...x, _day: d, _type: 'arti' })));
        }
        if (dData.kuisExtra) {
          partikelPool = partikelPool.concat(dData.kuisExtra.filter(x => x.jp).map(x => ({ ...x, _day: d, _type: 'partikel' })));
          artiPool = artiPool.concat(dData.kuisExtra.filter(x => x.a).map(x => ({ ...x, _day: d, _type: 'arti' })));
        }
      }
    }

    if (partikelPool.length === 0 && Game.sessionData.partikel) {
      partikelPool = Game.sessionData.partikel.map(x => ({ ...x, _type: 'partikel' }));
    }
    if (artiPool.length === 0 && Game.sessionData.arti) {
      artiPool = Game.sessionData.arti.map(x => ({ ...x, _type: 'arti' }));
    }
    if (vocabPool.length === 0 && Game.sessionData.hafalan) {
      vocabPool = Game.sessionData.hafalan.map(x => ({ ...x, _type: 'hafalan' }));
    }

    Engine.shuffle(partikelPool);
    Engine.shuffle(artiPool);
    Engine.shuffle(vocabPool);

    let queue = [];
    let totalNeeded = b.maxHp * 3;
    let pIdx = 0, aIdx = 0, vIdx = 0;

    for (let k = 0; k < totalNeeded; k++) {
      let mod = k % 3;
      if (mod === 0 && partikelPool.length > 0) {
        queue.push(partikelPool[pIdx++ % partikelPool.length]);
      } else if (mod === 1 && artiPool.length > 0) {
        queue.push(artiPool[aIdx++ % artiPool.length]);
      } else if (vocabPool.length > 0) {
        queue.push(vocabPool[vIdx++ % vocabPool.length]);
      } else if (partikelPool.length > 0) {
        queue.push(partikelPool[pIdx++ % partikelPool.length]);
      }
    }

    this.questionQueue = queue;
    this.questionIndex = 0;

    Game.currentTab = 'boss';
    document.getElementById('ui-day').innerText = `👑 BOS SEKTOR ${b.sector}`;
    const badge = document.getElementById('ui-zone');
    if (badge) {
      badge.className = "zone-badge zone-tempur";
      badge.innerText = "☠️ PERTARUNGAN BOS";
    }

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const card = document.getElementById('card-main');
    if (card) card.classList.add('hazard-battle-active');

    UI.showToast(`🚨 MEMASUKI ARENA BOS: ${b.name}! Bersiaplah!`, "warning");
    UI.loadStep();
  },

  retreatBattle: function() {
    if (confirm("Ingin mundur dari pertarungan Bos? Posisi HP Bos akan direset jika kamu kembali nanti.")) {
      UI.showToast("Mundur dari arena Bos ke markas.", "info");
      Game.init(Game.mode);
    }
  },

  claimVictory: function() {
    let b = this.currentBoss || this.getBossForDay(Game.currentDay);
    RPG.addReward(b.expReward, b.coinReward, null);
    UI.showToast(`👑 Sektor ${b.sector} Tuntas! Menaklukkan ${b.name}!`, "success");
    Game.completeDay();
  },

  checkHafalan: function(sel, cor, evt) {
    const btn = evt ? evt.currentTarget : null;
    let isCorrect = (sel === cor);
    if (isCorrect) {
      if (btn) btn.classList.add('choice-correct');
      if (navigator.vibrate) try { navigator.vibrate(40); } catch(_) {}
    } else {
      if (btn) {
        btn.classList.add('choice-wrong');
        setTimeout(() => btn.classList.remove('choice-wrong'), 500);
      }
      if (navigator.vibrate) try { navigator.vibrate([60, 40, 60]); } catch(_) {}
    }
    Boss.handleResult(isCorrect, cor, evt);
  },

  checkPartikel: function(evt) {
    let isCorrect = JSON.stringify(Game.currentMultiAns) === JSON.stringify(Game.targetMultiAns);
    Boss.handleResult(isCorrect, Game.targetMultiAns.join(" & "), evt);
  },

  checkArti: function(evt) {
    let rawVal = document.getElementById('answer-box').value;
    if (!rawVal) return;
    let cleanVal = rawVal.replace(/[。、！？,\?\s]/g, '');
    let isCorrect = (cleanVal === Game.currentAnsKanji) || (cleanVal === Game.currentAnsHiragana);
    let displayKey = Game.displayKanji !== Game.displayHiragana ? `${Game.displayKanji} / ${Game.displayHiragana}` : Game.displayKanji;
    Boss.handleResult(isCorrect, displayKey, evt);
  },

  handleResult: function(isCorrect, key, evt) {
    const fb = document.getElementById('ui-feedback');
    const inp = document.getElementById('answer-box');
    const card = document.getElementById('card-main');
    if (inp) inp.disabled = true;
    const btnSubmit = document.getElementById('btn-submit');
    if (btnSubmit) btnSubmit.classList.add('hidden');

    let b = this.currentBoss;
    let cur = this.questionQueue[this.questionIndex];

    if (isCorrect) {
      this.currentHp--;
      RPG.combo++;
      if (RPG.combo > Game.dailyStats.maxCombo) Game.dailyStats.maxCombo = RPG.combo;
      RPG.addReward(12, 6, evt);

      // Flash HP bar & avatar damaged
      const hpFill = document.getElementById('boss-hp-fill');
      const hpNum = document.getElementById('boss-hp-num');
      const avatarEl = document.querySelector('.boss-avatar-frame');
      const quoteEl = document.getElementById('boss-quote-text');

      if (hpFill) {
        let perc = Math.max(0, Math.round((this.currentHp / this.maxHp) * 100));
        hpFill.style.width = `${perc}%`;
        if (perc <= 30) hpFill.className = 'boss-hp-fill fill-danger';
        else if (perc <= 60) hpFill.className = 'boss-hp-fill fill-warning';
      }
      if (hpNum) hpNum.innerText = Math.max(0, this.currentHp);

      if (avatarEl) {
        avatarEl.classList.add('boss-avatar-damaged');
        setTimeout(() => avatarEl.classList.remove('boss-avatar-damaged'), 600);
      }

      RPG.spawnFloatingText("⚔️ -1 HP CRITICAL!", "#f43f5e", evt, 0, -40);

      if (card) {
        card.classList.remove('shake-hard');
        card.classList.add('card-correct');
        setTimeout(() => card.classList.remove('card-correct'), 500);
      }

      if (this.currentHp <= 0) {
        this.bossDefeated = true;
        if (fb) {
          fb.innerHTML = `👑 TEBASAN AKHIR MENGENAI BOS! ${b.name.toUpperCase()} TUMBANG!`;
          fb.style.color = "var(--gold)";
        }
        if (quoteEl) quoteEl.innerText = `"Mustahil... teknikmu melampaui dugaanku...!"`;
        UI.makeNextBtn("Lihat Hasil Kemenangan Sektor 🏆");
        const bn = document.getElementById('btn-next');
        if (bn) bn.onclick = () => UI.triggerNextAnim(() => { UI.loadStep(); });
      } else {
        if (fb) {
          fb.innerHTML = `SERANGAN BERHASIL! ⚔️ Sisa HP Bos: ${this.currentHp}`;
          fb.style.color = "var(--success)";
        }
        if (quoteEl) {
          if (this.currentHp <= 2) quoteEl.innerText = `"N-Nani?! Pertahananku mulai retak?!"`;
          else quoteEl.innerText = `"Tebasan yang tajam! Tapi tekadku belum runtuh!"`;
        }
        UI.makeNextBtn("Lanjut Menyerang ⚔️");
        const bn = document.getElementById('btn-next');
        if (bn) {
          bn.onclick = () => UI.triggerNextAnim(() => {
            Boss.questionIndex++;
            UI.loadStep();
          });
        }
      }
    } else {
      if (fb) {
        fb.innerHTML = `SERANGAN DITANGKIS BOS! ❌<br><span style="font-size:14px; color:var(--text-sub);">Kunci: ${key}</span>`;
        fb.style.color = "var(--danger)";
      }
      if (card) {
        card.classList.add('shake-hard');
        setTimeout(() => card.classList.remove('shake-hard'), 500);
      }

      RPG.spawnFloatingText("💥 TANGKISAN BOS!", "var(--danger)", evt, 0, -40);
      Game.decreaseHP(evt);

      if (cur && typeof Dojo !== 'undefined') {
        Dojo.recordMistake(cur._type, cur, Game.currentDay, key);
      }

      const quoteEl = document.getElementById('boss-quote-text');
      if (quoteEl) quoteEl.innerText = `"Fokusmu melemah! Rasakan serangan balikku!"`;

      if (Game.hp > 0) {
        UI.makeNextBtn("Bangkit & Serang Lagi ➔");
        const bn = document.getElementById('btn-next');
        if (bn) {
          bn.onclick = () => UI.triggerNextAnim(() => {
            Boss.questionIndex++;
            UI.loadStep();
          });
        }
      }
    }
  }
};

const Jumble = {
  mode: localStorage.getItem('yk_arti_mode') || 'jumble',
  targetTokens: [],
  assembled: [],
  pool: [],
  submitted: false,

  setMode: function(m) {
    this.mode = m;
    try { localStorage.setItem('yk_arti_mode', m); } catch(_) {}
    UI.loadStep();
  },

  setup: function(itm) {
    this.submitted = false;
    let targetArr = itm.jp.some(x => x.u) ? itm.jp.filter(x => x.u) : itm.jp;
    let tokens = [];

    (targetArr || []).forEach((seg, idx) => {
      let t = (seg.k || seg.text || '').trim();
      let r = (seg.r || '').trim();
      // Lewati tanda baca murni (titik, koma, tanda tanya, seru)
      if (!t || /^[。、！？,\?\s]+$/.test(t)) return;
      tokens.push({
        id: 'tok_' + idx + '_' + Math.random().toString(36).substr(2, 4),
        text: t,
        furigana: r,
        isParticle: !!seg.p,
        raw: seg
      });
    });

    this.targetTokens = tokens;

    let poolTokens = tokens.map((t, idx) => ({
      id: 'pool_' + idx + '_' + Math.random().toString(36).substr(2, 4),
      text: t.text,
      furigana: t.furigana,
      isParticle: t.isParticle,
      used: false
    }));

    // Generate 1-2 kata pengecoh (distractor chips)
    let usedTexts = new Set(poolTokens.map(p => p.text));
    const candParticles = ['は', 'が', 'を', 'に', 'で', 'と', 'の', 'も', 'へ', 'から'];
    let availParticles = candParticles.filter(p => !usedTexts.has(p));
    if (availParticles.length > 0) {
      let randP = availParticles[Math.floor(Math.random() * availParticles.length)];
      poolTokens.push({
        id: 'dist_p_' + Math.random().toString(36).substr(2, 4),
        text: randP,
        furigana: '',
        isParticle: true,
        isDistractor: true,
        used: false
      });
    }

    if (poolTokens.length <= 4) {
      const extraWords = ['ではありません', 'でした', 'ません', 'です', 'じゃない'];
      let availWords = extraWords.filter(w => !usedTexts.has(w));
      if (availWords.length > 0) {
        let randW = availWords[Math.floor(Math.random() * availWords.length)];
        poolTokens.push({
          id: 'dist_w_' + Math.random().toString(36).substr(2, 4),
          text: randW,
          furigana: '',
          isParticle: false,
          isDistractor: true,
          used: false
        });
      }
    }

    Engine.shuffle(poolTokens);
    this.pool = poolTokens;
    this.assembled = [];
  },

  pick: function(poolId) {
    if (this.submitted) return;
    let item = this.pool.find(p => p.id === poolId);
    if (!item || item.used) return;

    item.used = true;
    this.assembled.push({
      poolId: item.id,
      text: item.text,
      furigana: item.furigana,
      isParticle: item.isParticle
    });

    if (navigator.vibrate) try { navigator.vibrate(20); } catch(_) {}
    this.render();
  },

  remove: function(index) {
    if (this.submitted) return;
    if (index < 0 || index >= this.assembled.length) return;
    let removed = this.assembled.splice(index, 1)[0];
    let poolItem = this.pool.find(p => p.id === removed.poolId);
    if (poolItem) poolItem.used = false;

    if (navigator.vibrate) try { navigator.vibrate(15); } catch(_) {}
    this.render();
  },

  clear: function() {
    if (this.submitted) return;
    this.assembled = [];
    this.pool.forEach(p => p.used = false);
    this.render();
  },

  check: function(evt) {
    if (this.submitted || this.assembled.length === 0) return;

    let assembledKanji = this.assembled.map(x => x.text).join('').replace(/[。、！？,\?\s]/g, '');
    let assembledFurigana = this.assembled.map(x => (x.furigana || x.text)).join('').replace(/[。、！？,\?\s]/g, '');
    
    let isCorrect = (assembledKanji === Game.currentAnsKanji) || 
                    (assembledFurigana === Game.currentAnsHiragana) || 
                    (assembledKanji === Game.currentAnsHiragana);

    let displayKey = Game.displayKanji !== Game.displayHiragana ? `${Game.displayKanji} / ${Game.displayHiragana}` : Game.displayKanji;

    this.submitted = true;

    // Visual feedback pada balok tersusun
    const trackEl = document.getElementById('jumble-track');
    if (trackEl) {
      if (isCorrect) {
        trackEl.querySelectorAll('.jumble-chip').forEach(c => c.classList.add('chip-correct'));
      } else {
        trackEl.querySelectorAll('.jumble-chip').forEach(c => c.classList.add('chip-wrong'));
      }
    }

    if (Game.currentTab === 'boss') {
      Boss.handleResult(isCorrect, displayKey, evt);
    } else if (Game.currentTab === 'dojo') {
      Dojo.handleResult(isCorrect, displayKey, evt);
    } else {
      UI.showResult(isCorrect, displayKey, evt);
    }
  },

  render: function() {
    const trackEl = document.getElementById('jumble-track');
    const poolEl = document.getElementById('jumble-pool');
    const submitBtn = document.getElementById('btn-submit');

    if (!trackEl || !poolEl) return;

    if (this.assembled.length === 0) {
      trackEl.innerHTML = `<span class="jumble-placeholder-hint">Ketuk balok kata di bawah untuk menyusun kalimat...</span>`;
    } else {
      trackEl.innerHTML = this.assembled.map((tok, idx) => `
        <button type="button" class="jumble-chip is-slotted animate-pop" onclick="Jumble.remove(${idx})" title="Ketuk untuk membatalkan">
          ${tok.furigana ? `<ruby>${tok.text}<rt>${tok.furigana}</rt></ruby>` : `<span>${tok.text}</span>`}
          <span class="jumble-remove-cross">×</span>
        </button>
      `).join('');
    }

    poolEl.innerHTML = this.pool.map(tok => `
      <button type="button" class="jumble-chip ${tok.used ? 'is-used' : ''} ${tok.isParticle ? 'is-particle' : ''}" 
              ${tok.used ? 'disabled' : ''} 
              onclick="Jumble.pick('${tok.id}')">
        ${tok.furigana ? `<ruby>${tok.text}<rt>${tok.furigana}</rt></ruby>` : `<span>${tok.text}</span>`}
      </button>
    `).join('');

    if (submitBtn) {
      if (this.assembled.length > 0 && !this.submitted) {
        submitBtn.classList.remove('hidden');
      } else {
        submitBtn.classList.add('hidden');
      }
    }
  }
};

const Game = {
  adminMode: false, 
  mode: '', hp: 3, hpLostThisTurn: false, jumpscareTriggered: false,
  unlockedDay: parseInt(localStorage.getItem('yk_unlocked')) || 1, currentDay: 1, currentTab: 'hafalan', currentIndex: 0, currentAns: "", targetMultiAns: [], currentMultiAns: [],
  currentAnsKanji: "", currentAnsHiragana: "",
  sessionData: { hafalan: [], pengayaan: [], belajar: [], partikel: [], arti: [] },
  tabProgress: { hafalan: 0, belajar: 0, partikel: 0, arti: 0 }, 
  dungeonPool: [], dungeonScore: 0,
  dungeonRecord: parseInt(localStorage.getItem('yk_dungeon_record') || '0', 10),
  
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
    const card = document.getElementById('card-main');
    if (card) card.classList.remove('hazard-battle-active');
    UI.loadStep();
  },

  retreatDungeon: () => {
    if (confirm(`Apakah kamu ingin mundur terhormat di Gelombang ke-${Game.dungeonScore + 1}? EXP dan Koin yang kamu raih akan tetap aman.`)) {
      UI.showToast(`🏳️ Mundur ke markas dengan selamat! Skor bertahan: ${Game.dungeonScore}`, 'success');
      Game.currentTab = 'hafalan';
      Game.loadDayData();
      UI.switchTab('hafalan');
    }
  },
  dailyStats: { exp: 0, coin: 0, maxCombo: 0 },

  getMaxCurriculumDays: () => {
    let maxD = 30;
    if (typeof ManualDB === 'object') {
      Object.keys(ManualDB).forEach(k => {
        let m = k.match(/^day(\d+)$/);
        if (m) {
          let n = parseInt(m[1], 10);
          if (n > maxD) maxD = n;
        }
      });
    }
    if (typeof SYLLABUS !== 'undefined' && SYLLABUS.length > maxD) {
      maxD = SYLLABUS.length;
    }
    return Math.max(maxD, Game.unlockedDay || 1);
  },

  checkStoredMode: () => {
    let saved = localStorage.getItem('yk_mode');
    if (saved === 'pemula') { Game.init(saved); } else { UI.openSetupScreen(); }
  },
  init: (mode) => {
    if(Cooldown.check()) return;
    Game.mode = mode; localStorage.setItem('yk_mode', mode); document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('tab-hafalan').classList.remove('pro-hidden'); document.getElementById('tab-belajar').classList.remove('pro-hidden');
    document.getElementById('tab-partikel').classList.add('locked'); document.getElementById('tab-arti').classList.add('locked');

    Game.hp = parseInt(localStorage.getItem('yk_hp')) || 3; if(Game.hp<=0) Game.hp=3; 
    document.getElementById('main-app').classList.remove('hidden'); 
    Game.currentDay = Game.unlockedDay > 1 ? Game.unlockedDay : 1; 
    RPG.updateUI(); UI.renderHP(); Game.loadDayData(); UI.renderMap(); Dojo.updateBadge();
  },
    loadDayData: () => {
    document.getElementById('ui-day').innerHTML = `🗺️ Hari ${Game.currentDay} <span style="font-size:10px;">▼</span>`; 
    let dbKey = `day${Game.currentDay}`; let dayData = ManualDB[dbKey];
    
    Game.currentTab = null; 
    Game.currentIndex = 0;
    
    Game.tabProgress = { hafalan: 0, belajar: 0, partikel: 0, arti: 0 }; Game.jumpscareTriggered = false;
    Game.dailyStats = { exp: 0, coin: 0, maxCombo: 0 }; 
    Game.scouterUsedToday = false; 

    if(!dayData) {
       document.getElementById('ui-day').innerHTML = `🗺️ Hari ${Game.currentDay} (WIP) <span style="font-size:10px;">▼</span>`;
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
    let perks = RPG.getRankPerks();
    if (perks.resistChance > 0 && Math.random() < perks.resistChance) {
      RPG.spawnFloatingText("🛡️ TANGKIS GELAR!", "var(--success)", evt);
      UI.showToast(`🛡️ Refleks Gelar ${perks.name}! Serangan musuh berhasil ditangkis, HP & Combo aman!`, 'success');
      return;
    }
    // Relik Jimat Omamori (10% Peluang Kebal dari Kesalahan)
    if (RPG.hasRelic('omamori') && Math.random() < 0.10) {
      RPG.spawnFloatingText("📿 BERKAH OMAMORI!", "var(--gold)", evt);
      UI.showToast("📿 Berkah Jimat Omamori menyelamatkanmu dari kesalahan! HP & Combo aman.", "success");
      return;
    }
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
  openModal: (id) => { 
    if (id === 'map-modal') UI.renderMap();
    if (id === 'inventory-modal') UI.renderInventory();
    if (id === 'shop-modal') UI.renderShop();
    if (id === 'level-modal') UI.renderHierarchyModal();
    if (id === 'kamus-modal') {
      const list = document.getElementById('kamus-list');
      if (list && list.children.length === 0) UI.renderKamusList();
    }
    if (id === 'dojo-modal') Dojo.renderModal();
    if (id === 'cloud-modal') Cloud.updateUI();
    if (id === 'leaderboard-modal') Leaderboard.openModal();
    if (id === 'streak-modal') Streak.renderModal();
    const m = document.getElementById(id); 
    if (!m) return;
    m.classList.remove('hidden', 'modal-close'); 
    m.classList.add('modal-open'); 
    if (id === 'map-modal') {
      setTimeout(() => UI.scrollToCurrentMission(), 100);
    }
  },
  closeModal: (id) => { const m = document.getElementById(id); if (m) { m.classList.remove('modal-open'); m.classList.add('modal-close'); setTimeout(() => { m.classList.add('hidden'); m.classList.remove('modal-close'); }, 200); } },
  
  renderInventory: () => {
    const container = document.getElementById('inv-grid-container');
    if (!container) return;

    // Sinkronisasi status HP
    const hpEl = document.getElementById('inv-hp-display');
    if (hpEl) {
      let hearts = '';
      for (let i = 0; i < 3; i++) {
        hearts += i < Game.hp ? '❤️' : '🖤';
      }
      hpEl.innerText = hearts;
    }

    // Sinkronisasi status Shield
    const shieldEl = document.getElementById('inv-buff-shield');
    if (shieldEl) {
      if (Game.hasShield) {
        shieldEl.innerText = "AKTIF 🛡️";
        shieldEl.className = "inv-buff-badge active";
      } else {
        shieldEl.innerText = "TIDAK AKTIF";
        shieldEl.className = "inv-buff-badge";
      }
    }

    const itemsConfig = [
      {
        id: 'hp',
        name: 'Nano-Repair',
        icon: '❤️',
        desc: 'Memulihkan 1 poin HP yang hilang seketika.',
        canUse: Game.hp < 3,
        contextMsg: Game.hp >= 3 ? 'HP Penuh' : 'Gunakan (+1 HP)'
      },
      {
        id: 'shield',
        name: 'Aegis Shield',
        icon: '🛡️',
        desc: 'Melindungi 1x dari kehilangan HP & pecah combo di Zona Tempur.',
        canUse: !Game.hasShield && (Game.currentTab === 'partikel' || Game.currentTab === 'arti' || Game.currentTab === 'dungeon'),
        contextMsg: Game.hasShield ? 'Shield Aktif' : ((Game.currentTab === 'partikel' || Game.currentTab === 'arti' || Game.currentTab === 'dungeon') ? 'Aktifkan Shield' : 'Hanya di Tempur')
      },
      {
        id: 'intel',
        name: 'Gulungan Intel',
        icon: '📜',
        desc: 'Bocorkan arti kalimat Indonesia untuk soal Tab Partikel.',
        canUse: !Game.intelActive && Game.currentTab === 'partikel',
        contextMsg: Game.intelActive ? 'Sudah Terbuka' : (Game.currentTab === 'partikel' ? 'Buka Intel' : 'Hanya di Partikel')
      },
      {
        id: 'mata',
        name: 'Mata Kensei',
        icon: '👁️',
        desc: 'Ungkap kalimat Jepang asli untuk soal kuis Tab Arti.',
        canUse: !Game.mataActive && Game.currentTab === 'arti',
        contextMsg: Game.mataActive ? 'Sudah Terbuka' : (Game.currentTab === 'arti' ? 'Buka Kunci' : 'Hanya di Tab Arti')
      },
      {
        id: 'pandora',
        name: 'Kotak Pandora',
        icon: '🎁',
        desc: 'Buka langsung: Peluang dapat Full HP, Shield, Koin Cashback, atau Zonk!',
        canUse: true,
        contextMsg: 'Buka Kotak (Gacha)'
      }
    ];

    let totalItems = RPG.getTotalBagCount();
    if (totalItems === 0) {
      container.innerHTML = `
        <div class="inv-empty-state">
          <div class="inv-empty-icon">🎒</div>
          <div class="inv-empty-title">Tas Kamu Masih Kosong</div>
          <div class="inv-empty-desc">Kunjungi Terminal Cyber-Market untuk membeli persediaan item sebelum masuk ke Zona Tempur!</div>
        </div>
      `;
      return;
    }

    container.innerHTML = itemsConfig.map(item => {
      let count = RPG.getInvCount(item.id);
      let isDisabled = count <= 0 || !item.canUse;
      let btnText = count <= 0 ? 'Habis (0)' : item.contextMsg;

      return `
        <div class="inv-card ${count <= 0 ? 'empty-card' : ''}">
          <div class="inv-card-icon">${item.icon}</div>
          <div class="inv-card-info">
            <div class="inv-card-title-row">
              <span class="inv-card-name">${item.name}</span>
              <span class="inv-card-badge">x${count}</span>
            </div>
            <div class="inv-card-desc">${item.desc}</div>
          </div>
          <div class="inv-card-action">
            <button class="btn-use-item" ${isDisabled ? 'disabled' : ''} onclick="RPG.useItem('${item.id}')">${btnText}</button>
          </div>
        </div>
      `;
    }).join('');

    // Render Relik Aktif
    const relicContainer = document.getElementById('inv-relic-container');
    if (relicContainer) {
      const relicsConfig = [
        {
          id: 'muramasa',
          name: 'Pedang Muramasa',
          icon: '🗡️',
          desc: 'Pasif: +10% EXP setiap kuis dijawab benar.'
        },
        {
          id: 'omamori',
          name: 'Jimat Omamori',
          icon: '📿',
          desc: 'Pasif: 10% peluang kebal dari kesalahan kuis.'
        },
        {
          id: 'scouter',
          name: 'Lensa Scouter',
          icon: '👓',
          desc: 'Pasif: Radar partikel target 1x per hari.'
        }
      ];

      let ownedRelics = relicsConfig.filter(r => RPG.hasRelic(r.id));
      if (ownedRelics.length === 0) {
        relicContainer.innerHTML = `
          <div class="inv-relic-empty">
            <span class="relic-empty-icon">⛩️</span>
            <span>Belum ada relik permanen terpasang. Kunjungi Toko untuk membeli perlengkapan legendaris!</span>
          </div>
        `;
      } else {
        relicContainer.innerHTML = ownedRelics.map(r => `
          <div class="inv-relic-card">
            <div class="inv-relic-icon">${r.icon}</div>
            <div class="inv-relic-info">
              <div class="inv-relic-name">${r.name} <span class="relic-active-badge">AKTIF</span></div>
              <div class="inv-relic-desc">${r.desc}</div>
            </div>
          </div>
        `).join('');
      }
    }
  },

  playGachaAnimation: (result) => {
    UI.closeModal('inventory-modal');
    UI.closeModal('shop-modal');

    const modal = document.getElementById('gacha-modal');
    const chestWrap = document.getElementById('gacha-chest-wrap');
    const resultCard = document.getElementById('gacha-result-card');
    const statusText = document.getElementById('gacha-status-text');
    const chestIcon = document.getElementById('gacha-chest-icon');

    if (!modal) return;
    modal.classList.remove('hidden');

    // Reset visual state
    chestWrap.classList.remove('hidden', 'gacha-burst');
    chestWrap.classList.add('gacha-rattle');
    resultCard.classList.add('hidden');
    resultCard.className = `gacha-result-card hidden tier-${result.tier}`;
    chestIcon.textContent = '🎁';
    statusText.textContent = 'MEMBUKA SEGEL PANDORA...';

    // Phase 1: Chest Rattle (1.2 detik)
    setTimeout(() => {
      chestWrap.classList.remove('gacha-rattle');
      chestWrap.classList.add('gacha-burst');
      chestIcon.textContent = '✨';
      statusText.textContent = 'SEGEL TERBUKA!';

      // Phase 2: Burst of Light & Reveal Card (500ms)
      setTimeout(() => {
        chestWrap.classList.add('hidden');
        resultCard.classList.remove('hidden');
        resultCard.classList.add('animate-reveal');

        document.getElementById('gacha-rarity-banner').textContent = result.tierName;
        document.getElementById('gacha-item-icon').textContent = result.icon;
        document.getElementById('gacha-item-title').textContent = result.name;
        document.getElementById('gacha-item-desc').textContent = result.desc;

        // Floating celebratory alert
        if (result.tier === 'legendary') {
          RPG.spawnFloatingText("🌟 JACKPOT LEGENDARIS!", "var(--gold)", null, 0, -60);
        } else if (result.tier === 'epic') {
          RPG.spawnFloatingText("🟣 REWARD EPIC!", "#c084fc", null, 0, -60);
        }
      }, 500);
    }, 1200);
  },

  claimGachaReward: () => {
    const modal = document.getElementById('gacha-modal');
    if (modal) modal.classList.add('hidden');
    UI.showToast(`Hadiah Pandora Berhasil Diklaim! 🎁✨`, 'success');
    RPG.updateUI();
    if (typeof UI.renderInventory === 'function') UI.renderInventory();
  },

  closeGachaModal: () => {
    const modal = document.getElementById('gacha-modal');
    if (modal) modal.classList.add('hidden');
    RPG.updateUI();
    if (typeof UI.renderInventory === 'function') UI.renderInventory();
  },

  renderShop: () => {
    RPG.updateUI();
    if (typeof Streak !== 'undefined') Streak.updateUI();
  },

  showToast: (msg, type='success') => { const t = document.getElementById('toast'); t.innerText = msg; t.className = `show ${type}`; setTimeout(()=> t.className = '', 2500); },
  
  _savedScrollY: 0,
  syncBodyScrollLock: () => {
    const sb = document.getElementById('sidebar');
    const isSidebarActive = Boolean(sb && sb.classList.contains('active'));
    const shouldLock = isSidebarActive;

    const isLocked = document.body.classList.contains('sidebar-locked');
    if (shouldLock && !isLocked) {
      UI._savedScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      document.documentElement.classList.add('sidebar-locked');
      document.body.classList.add('sidebar-locked');
      document.body.style.top = `-${UI._savedScrollY}px`;
    } else if (!shouldLock && isLocked) {
      const restoreY = UI._savedScrollY || 0;
      document.documentElement.classList.remove('sidebar-locked');
      document.body.classList.remove('sidebar-locked');
      document.body.style.top = '';
      window.scrollTo(0, restoreY);
    }
  },

  toggleSidebar: () => { 
    const sb = document.getElementById('sidebar'); 
    const ov = document.getElementById('overlay'); 
    if (!sb) return;
    const isActive = sb.classList.toggle('active');
    if (ov) ov.classList.toggle('active', isActive);
    UI.syncBodyScrollLock();
  },

  closeSidebar: () => {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('overlay');
    if (sb && sb.classList.contains('active')) {
      sb.classList.remove('active');
      if (ov) ov.classList.remove('active');
      UI.syncBodyScrollLock();
    }
  },

  selectMission: (day) => {
    if (day <= Game.unlockedDay) {
      Game.currentDay = day;
      Game.loadDayData();
      UI.closeModal('map-modal');
      UI.showToast(`🎯 Memasuki Zona Hari ${day}`, 'success');
    } else {
      UI.showToast(`🔒 Zona Hari ${day} masih terkunci! Selesaikan Hari ${Game.unlockedDay} dahulu.`, 'error');
    }
  },

  scrollToCurrentMission: () => {
    const list = document.getElementById('map-day-list');
    if (!list) return;
    const target = list.querySelector('.mission-card.current') || list.querySelector('.mission-card.viewing') || list.querySelector('.mission-card');
    if (target) {
      const targetOffset = target.offsetTop - list.offsetTop - (list.clientHeight / 2) + (target.clientHeight / 2);
      list.scrollTo({ top: Math.max(0, targetOffset), behavior: 'smooth' });
    }
  },
  
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
    document.body.classList.toggle('hardcore-mode');
    let isHC = document.body.classList.contains('hardcore-mode');
    const badge = document.getElementById('hardcore-badge');
    const btnTile = document.getElementById('btn-hardcore');
    if (badge) {
      badge.textContent = isHC ? "AKTIF" : "OFF";
      badge.className = `sidebar-tile-status ${isHC ? 'status-active' : 'status-off'}`;
    }
    if (btnTile) {
      const title = btnTile.querySelector('.sidebar-tile-title');
      const desc = btnTile.querySelector('.sidebar-tile-desc');
      if (title) title.textContent = isHC ? "Mode Hardcore (Aktif)" : "Mode Hardcore";
      if (desc) desc.textContent = isHC ? "Furigana disembunyikan" : "Sembunyikan furigana kanji";
    }
    UI.showToast(isHC ? "Mode Hardcore Aktif! Insting Ninja." : "Furigana Kembali", "success");
    UI.toggleSidebar();
  },

  openSetupScreen: () => {
    const setup = document.getElementById('setup-screen');
    const mainApp = document.getElementById('main-app');
    if (!setup) return;
    
    // Update live telemetry in setup portal
    const rankEl = document.getElementById('setup-player-rank');
    const expEl = document.getElementById('setup-player-exp');
    const coinsEl = document.getElementById('setup-player-coins');
    const dayEl = document.getElementById('setup-player-day');
    const returnBtnWrap = document.getElementById('setup-return-btn-wrap');

    if (rankEl && typeof RPG !== 'undefined') {
      const parts = RPG.getTitleParts();
      rankEl.textContent = `${parts.title} Lv.${RPG.level}`;
    }
    if (expEl && typeof RPG !== 'undefined') {
      expEl.textContent = `${RPG.exp} ✨`;
    }
    if (coinsEl && typeof RPG !== 'undefined') {
      coinsEl.textContent = `${RPG.coins} 🪙`;
    }
    if (dayEl && typeof Game !== 'undefined') {
      let maxDays = typeof Game.getMaxCurriculumDays === 'function' ? Game.getMaxCurriculumDays() : 30;
      dayEl.textContent = `Hari ${Game.currentDay || 1} / ${maxDays}`;
    }
    if (returnBtnWrap) {
      returnBtnWrap.style.display = (typeof Game !== 'undefined' && Game.dayData && Game.dayData.length > 0) ? 'block' : 'none';
    }

    if (mainApp) mainApp.classList.add('hidden');
    setup.classList.remove('hidden');
  },

  closeSetupScreen: () => {
    const setup = document.getElementById('setup-screen');
    const mainApp = document.getElementById('main-app');
    if (setup) setup.classList.add('hidden');
    if (mainApp) mainApp.classList.remove('hidden');
  },

  showKanaModuleNotice: () => {
    UI.showToast("🔤 Modul Penguasaan Huruf Kana sedang disiapkan dalam rilis ekspansi berikutnya!", "warning");
  },

  showN4ModuleNotice: () => {
    let maxDays = typeof Game.getMaxCurriculumDays === 'function' ? Game.getMaxCurriculumDays() : 30;
    if (Game.unlockedDay <= maxDays) {
      UI.showToast(`🔒 Modul N4 akan terbuka setelah menuntaskan seluruh materi Ekspedisi N5!`, "warning");
    } else {
      UI.showToast("🏯 Kurikulum N4 sedang dalam tahap integrasi akhir. Bersiaplah!", "success");
    }
  },

  renderHierarchyModal: () => {
    const playerCard = document.getElementById('hierarchy-player-card');
    const tiersContainer = document.getElementById('hierarchy-tiers-container');
    if (!playerCard || !tiersContainer) return;

    const rank = RPG.getTitleParts();
    const perks = RPG.getRankPerks();
    const curLvl = RPG.level;

    // Next threshold
    let nextTierName = "";
    let nextLvlReq = 0;
    if (curLvl < 10) { nextTierName = "Ronin"; nextLvlReq = 10; }
    else if (curLvl < 30) { nextTierName = "Samurai"; nextLvlReq = 30; }
    else if (curLvl < 60) { nextTierName = "Daimyo"; nextLvlReq = 60; }
    else if (curLvl < 90) { nextTierName = "Shogun"; nextLvlReq = 90; }
    else if (curLvl < 150) { nextTierName = "Kensei"; nextLvlReq = 150; }

    let thresholdText = nextLvlReq > 0 
      ? `Lv. ${curLvl} / ${nextLvlReq} Menuju Gelar <b>${nextTierName}</b>`
      : `Tingkat Tertinggi Kensei Legendaris! 🌟`;

    // Active perks pills
    let pillsHtml = '';
    if (perks.expBonus > 0) pillsHtml += `<span class="perk-pill">✨ +${Math.round(perks.expBonus * 100)}% EXP</span>`;
    if (perks.coinBonus > 0) pillsHtml += `<span class="perk-pill gold">🪙 +${Math.round(perks.coinBonus * 100)}% Koin</span>`;
    if (perks.shopDiscount > 0) pillsHtml += `<span class="perk-pill gold">🏷️ Diskon ${Math.round(perks.shopDiscount * 100)}% Toko</span>`;
    if (perks.resistChance > 0) pillsHtml += `<span class="perk-pill green">🛡️ ${Math.round(perks.resistChance * 100)}% Tangkis HP</span>`;
    if (perks.comboBonusCoin) pillsHtml += `<span class="perk-pill gold">🔥 +1 Koin saat Combo ≥ 5</span>`;
    if (perks.doubleRewardChance > 0) pillsHtml += `<span class="perk-pill">💥 ${Math.round(perks.doubleRewardChance * 100)}% Crit 2x</span>`;
    if (!pillsHtml) pillsHtml = `<span class="perk-pill">🔰 Status Pemula (Tingkatkan level untuk bonus pasif)</span>`;

    playerCard.innerHTML = `
      <div class="player-rank-top">
        <div class="player-rank-avatar">${rank.icon}</div>
        <div class="player-rank-info">
          <div class="player-rank-tag">PANGKAT PENDEKAR ANDA</div>
          <div class="player-rank-title">${rank.icon} ${rank.name} <span style="font-size:14px; color:var(--primary);">(Lv.${curLvl})</span></div>
          <div class="player-rank-threshold">${thresholdText}</div>
        </div>
      </div>
      <div class="player-perks-pills">
        ${pillsHtml}
      </div>
    `;

    const tiers = [
      { name: "Pemula", icon: "🔰", min: 1, max: 9, rangeText: "Lv. 1 - 9", desc: "Akses dasar kurikulum, panduan furigana & pelatihan dasar." },
      { name: "Ronin", icon: "⚔️", min: 10, max: 29, rangeText: "Lv. 10 - 29", desc: "Pasif: +5% EXP kuis & Diskon 5% di Toko Suplai Pasar Gelap." },
      { name: "Samurai", icon: "🛡️", min: 30, max: 59, rangeText: "Lv. 30 - 59", desc: "Pasif: +10% EXP, +5% Koin, Diskon 5% Toko, dan 5% Peluang Tangkis Salah (Kebal -1 HP)." },
      { name: "Daimyo", icon: "🏯", min: 60, max: 89, rangeText: "Lv. 60 - 89", desc: "Pasif: +15% EXP & Koin, Diskon 10% Toko, dan +1 Koin Ekstra saat Combo ≥ 5." },
      { name: "Shogun", icon: "👑", min: 90, max: 149, rangeText: "Lv. 90 - 149", desc: "Pasif: +25% EXP & Koin, Diskon 15% Toko, 10% Tangkis Salah, dan 20% Peluang Hadiah Ganda (Critical 2x)!" },
      { name: "Kensei", icon: "⛩️", min: 150, max: 9999, rangeText: "Lv. 150+", desc: "Pasif: +40% EXP & Koin, Diskon 20% Toko, 15% Tangkis Salah, dan 25% Peluang Hadiah Ganda. Mahkota Legenda!" }
    ];

    tiersContainer.innerHTML = tiers.map(t => {
      let isCurrent = (curLvl >= t.min && (curLvl <= t.max || t.max === 9999));
      let isUnlocked = curLvl > t.max;
      let statusClass = isCurrent ? 'tier-active' : (isUnlocked ? 'tier-unlocked' : 'tier-locked');
      let statusText = isCurrent 
        ? `<span class="tier-status-text tier-status-active">● PANGKAT ANDA</span>`
        : (isUnlocked 
          ? `<span class="tier-status-text tier-status-unlocked">✓ TERLEWATI</span>` 
          : `<span class="tier-status-text tier-status-locked">🔒 TERKUNCI</span>`);

      return `
        <div class="hierarchy-tier-card ${statusClass}">
          <div class="hierarchy-tier-node"></div>
          <div class="tier-icon-free">${t.icon}</div>
          <div class="tier-info">
            <div class="tier-title-row">
              <span class="tier-name">${t.name}</span>
              <span class="tier-range">${t.rangeText}</span>
              ${statusText}
            </div>
            <div class="tier-desc">${t.desc}</div>
          </div>
        </div>
      `;
    }).join('');
  },

  currentKamusFilter: 'unlocked',

  openKamus: () => { 
    const input = document.getElementById('kamus-search'); 
    if (input) input.value = ""; 
    const clearBtn = document.getElementById('kamus-search-clear');
    if (clearBtn) clearBtn.classList.add('hidden');
    UI.setKamusFilter('unlocked');
    UI.openModal('kamus-modal'); 
  },    

  searchKamus: () => { 
    const input = document.getElementById('kamus-search');
    const clearBtn = document.getElementById('kamus-search-clear');
    let query = input ? input.value.trim().toLowerCase() : "";
    if (clearBtn) {
      if (query.length > 0) clearBtn.classList.remove('hidden');
      else clearBtn.classList.add('hidden');
    }
    UI.renderKamusList(query); 
  },

  clearKamusSearch: () => {
    const input = document.getElementById('kamus-search');
    const clearBtn = document.getElementById('kamus-search-clear');
    if (input) {
      input.value = "";
      input.focus();
    }
    if (clearBtn) clearBtn.classList.add('hidden');
    UI.renderKamusList("");
  },

  setKamusFilter: (filterKey) => {
    UI.currentKamusFilter = filterKey;
    ['unlocked', 'today', 'all', 'kanji'].forEach(k => {
      const chip = document.getElementById(`kchip-${k}`);
      if (chip) {
        if (k === filterKey) chip.classList.add('active');
        else chip.classList.remove('active');
      }
    });
    const input = document.getElementById('kamus-search');
    let query = input ? input.value.trim().toLowerCase() : "";
    UI.renderKamusList(query);
  },

  copyKamusWord: (kanji, romaji, arti) => {
    let copyText = romaji && romaji !== kanji ? `${kanji} (${romaji}) - ${arti}` : `${kanji} - ${arti}`;
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(copyText).then(() => {
        UI.showToast(`📋 Tersalin: ${kanji}`, 'success');
      }).catch(() => {
        UI.showToast(`📋 ${kanji}: ${arti}`, 'success');
      });
    } else {
      UI.showToast(`📋 ${kanji}: ${arti}`, 'success');
    }
  },

  renderKamusList: (query = "") => {
    const list = document.getElementById('kamus-list');
    if (!list) return;

    // Kumpulkan seluruh data kosakata N5 dari ManualDB secara dinamis
    let allWordsWithDay = [];
    let unlockedWordsWithDay = [];
    let todayWordsWithDay = [];

    const totalDays = typeof Game.getMaxCurriculumDays === 'function' ? Game.getMaxCurriculumDays() : 30;
    for (let i = 1; i <= totalDays; i++) {
      let dayData = ManualDB['day' + i];
      if (dayData && dayData.hafalan && Array.isArray(dayData.hafalan)) {
        dayData.hafalan.forEach(w => {
          let item = { ...w, day: i };
          allWordsWithDay.push(item);
          if (i <= Game.unlockedDay) {
            unlockedWordsWithDay.push(item);
          }
          if (i === Game.currentDay) {
            todayWordsWithDay.push(item);
          }
        });
      }
    }

    // Deduplikasi berdasarkan kata kanji/kana unik
    const deduplicate = (arr) => {
      let seen = new Set();
      let res = [];
      arr.forEach(item => {
        if (!seen.has(item.k)) {
          seen.add(item.k);
          res.push(item);
        }
      });
      return res;
    };

    let dedupUnlocked = deduplicate(unlockedWordsWithDay);
    let dedupToday = deduplicate(todayWordsWithDay);
    let dedupAll = deduplicate(allWordsWithDay);
    let dedupKanjiOnly = dedupAll.filter(w => /[\u4e00-\u9faf]/.test(w.k));

    // Update Counter Badges
    const badgeCountEl = document.getElementById('kamus-count-badge');
    if (badgeCountEl) {
      badgeCountEl.innerText = `${dedupUnlocked.length} / ${dedupAll.length} Terbuka`;
    }

    const chipUnlockedCount = document.getElementById('kchip-unlocked-count');
    if (chipUnlockedCount) chipUnlockedCount.innerText = dedupUnlocked.length;

    const chipTodayCount = document.getElementById('kchip-today-count');
    if (chipTodayCount) chipTodayCount.innerText = dedupToday.length;

    const chipAllCount = document.getElementById('kchip-all-count');
    if (chipAllCount) chipAllCount.innerText = dedupAll.length;

    // Filter berdasarkan tab aktif
    let sourcePool = dedupUnlocked;
    if (UI.currentKamusFilter === 'today') {
      sourcePool = dedupToday;
    } else if (UI.currentKamusFilter === 'all') {
      sourcePool = dedupAll;
    } else if (UI.currentKamusFilter === 'kanji') {
      sourcePool = dedupKanjiOnly;
    }

    // Filter berdasarkan query pencarian
    let filtered = sourcePool;
    if (query) {
      filtered = filtered.filter(w => 
        (w.k && w.k.toLowerCase().includes(query)) || 
        (w.r && w.r.toLowerCase().includes(query)) || 
        (w.a && w.a.toLowerCase().includes(query))
      );
    }

    if (filtered.length === 0) {
      let emptyMsg = query 
        ? `Tidak ditemukan kosakata yang cocok dengan "<b>${query}</b>".`
        : `Belum ada kosakata yang terbuka untuk kategori ini. Taklukkan ekspedisi untuk membuka koleksi kata!`;

      list.innerHTML = `
        <div class="kamus-empty-state">
          <div class="kamus-empty-icon">🔍</div>
          <div class="kamus-empty-title">Kosakata Tidak Ditemukan</div>
          <div class="kamus-empty-desc">${emptyMsg}</div>
        </div>
      `;
      return;
    }

    list.innerHTML = filtered.map(w => {
      let romajiDisplay = w.r && w.k !== w.r ? w.r : "";
      let safeK = (w.k || "").replace(/'/g, "\\'");
      let safeR = (w.r || "").replace(/'/g, "\\'");
      let safeA = (w.a || "").replace(/'/g, "\\'");

      return `
        <div class="kamus-card" onclick="UI.copyKamusWord('${safeK}', '${safeR}', '${safeA}')" title="Klik untuk salin kosakata">
          <div class="kamus-card-left">
            <div class="kamus-card-jp-row">
              <span class="kamus-card-kanji">${w.k}</span>
              ${romajiDisplay ? `<span class="kamus-card-romaji">${romajiDisplay}</span>` : ''}
            </div>
            <div class="kamus-card-arti">• ${w.a}</div>
          </div>
          <div class="kamus-card-right">
            <span class="kamus-day-tag">Hari ${w.day || 1}</span>
            <button type="button" class="kamus-copy-btn" onclick="event.stopPropagation(); UI.copyKamusWord('${safeK}', '${safeR}', '${safeA}')" title="Salin kata">📋</button>
          </div>
        </div>
      `;
    }).join('');
  },
  renderMap: () => {
    const list = document.getElementById('map-day-list'); 
    if (!list) return;
    list.innerHTML = ''; 
    const totalDays = typeof Game.getMaxCurriculumDays === 'function' ? Game.getMaxCurriculumDays() : 30;
    let progressDays = Math.min(Math.max(Game.unlockedDay - 1, 0), totalDays);
    let perc = Math.round((progressDays / totalDays) * 100);
    if (Game.unlockedDay > totalDays) perc = 100;

    const progressTextEl = document.getElementById('map-progress-text');
    if (progressTextEl) progressTextEl.innerText = `${perc}% SELESAI`;

    const progressFillEl = document.getElementById('map-progress-fill');
    if (progressFillEl) progressFillEl.style.width = `${perc}%`;

    const progressDetailEl = document.getElementById('map-progress-detail');
    if (progressDetailEl) {
      const activeDisplay = Math.min(Game.unlockedDay, totalDays);
      progressDetailEl.innerText = `Zona Terbuka: Hari ${activeDisplay} / ${totalDays}`;
    }

    const displayDays = totalDays;

    for (let i = 1; i <= displayDays; i++) {
      let stat = i < Game.unlockedDay ? 'completed' : (i === Game.unlockedDay ? 'current' : 'locked');
      let isViewing = (i === Game.currentDay);
      let topic = (typeof SYLLABUS !== 'undefined' && SYLLABUS[i - 1]) ? SYLLABUS[i - 1] : `Materi Ekspedisi Hari ${i}`;
      let category = (typeof getMissionCategory === 'function') ? getMissionCategory(i) : `SEKTOR ${i}`;

      let isBossDay = (i % 5 === 0);
      let bossData = isBossDay && typeof Boss !== 'undefined' ? Boss.getBossForDay(i) : null;
      if (isBossDay && bossData) {
        category = `👑 SEKTOR ${i / 5} • BOS: ${bossData.name.toUpperCase()}`;
      }

      let icon = stat === 'completed' ? (isBossDay ? '👑' : '⭐') : (stat === 'current' ? (isBossDay ? '⚔️' : '⚔️') : '🔒');
      let actionText = stat === 'completed' ? (isViewing ? 'SEDANG DIBUKA' : (isBossDay ? 'BOS DITAKLUKKAN' : 'Kaji Ulang ↺')) : (stat === 'current' ? (isBossDay ? 'TANTANG BOS 👑' : 'MASUK ▶') : '🔒');

      const card = document.createElement('div');
      card.className = `mission-card ${stat} ${isViewing ? 'viewing' : ''} ${isBossDay ? 'is-boss-card' : ''}`;
      card.title = `Hari ${i}: ${topic}`;
      card.onclick = () => UI.selectMission(i);

      card.innerHTML = `
        <div class="mission-left">
          <div class="mission-icon">${icon}</div>
          <div class="mission-day-num">D-${i < 10 ? '0' + i : i}</div>
        </div>
        <div class="mission-body">
          <div class="mission-meta-line">
            <span class="mission-category">${category}</span>
          </div>
          <div class="mission-title">${topic}</div>
        </div>
        <div class="mission-action">
          <span class="mission-action-pill ${stat === 'current' ? 'action-active' : (stat === 'completed' ? 'action-review' : 'action-locked')}">${actionText}</span>
        </div>
      `;

      list.appendChild(card);
    }
  },
  switchTab: (tId) => {
    if (Game.currentTab === tId) return; // Tab sudah aktif, abaikan agar tidak glitch re-render
    const tabEl = document.getElementById(`tab-${tId}`);
    if (tabEl && tabEl.classList.contains('locked')) {
      UI.showToast("🔒 Pelajari tab Pola terlebih dahulu untuk membuka Zona Tempur!", "warning");
      return;
    }
    if((tId === 'partikel' || tId === 'arti') && Game.hp <= 0) return;
    const card = document.getElementById('card-main');
    if (card) card.classList.remove('hazard-battle-active');
    if(Game.currentTab) Game.tabProgress[Game.currentTab] = Game.currentIndex;
    Game.currentTab = tId; Game.currentIndex = Game.tabProgress[tId]; 
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active')); 
    if (tabEl) tabEl.classList.add('active');
    const isAman = (tId === 'hafalan' || tId === 'belajar');
    const badge = document.getElementById('ui-zone'); 
    if (badge) {
      badge.className = `zone-badge ${isAman ? 'zone-aman' : 'zone-tempur'}`; 
      badge.innerText = isAman ? "🟢 ZONA AMAN" : "🔴 ZONA TEMPUR";
    }
    if(tId === 'belajar') { 
      const pTab = document.getElementById('tab-partikel');
      const aTab = document.getElementById('tab-arti');
      if (pTab) pTab.classList.remove('locked'); 
      if (aTab) aTab.classList.remove('locked'); 
    }
    UI.loadStep();
  },
  triggerNextAnim: (callback) => {
    const w = document.getElementById('card-content');
    const card = document.getElementById('card-main');
    
    // 1. Geser keluar ke kiri dengan momentum
    w.classList.remove('slide-enter-right');
    w.classList.add('slide-exit-left');

    setTimeout(() => {
      // 2. Eksekusi perpindahan data langkah
      callback();

      // 3. Posisikan konten baru di kanan secara instan
      w.classList.remove('slide-exit-left');
      w.classList.add('slide-enter-right');
      w.offsetHeight; // Paksa Reflow browser

      // 4. Masuk dengan efek pegas kinetik (Spring Easing)
      w.classList.remove('slide-enter-right');

      // 5. Picu kilatan cahaya halus di permukaan kartu
      if (card) {
        card.classList.remove('sheen-active');
        card.offsetHeight; // Reflow
        card.classList.add('sheen-active');
        setTimeout(() => card.classList.remove('sheen-active'), 550);
      }
    }, 200);
  },
  loadStep: () => {
    const t = Game.currentTab; const i = Game.currentIndex;
    const cardMain = document.getElementById('card-main');
    if (cardMain) {
      cardMain.setAttribute('data-tab', t);
      if (!Game.hasShield) { 
        cardMain.classList.remove('shield-active'); 
      } else { 
        cardMain.classList.add('shield-active'); 
      }
    }
    ['ui-jp', 'ui-arti', 'ui-feedback', 'input-area'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = '';
    }); 

    // Reset status revealed pada arti tanpa memicu forced layout reflow
    const artiEl = document.getElementById('ui-arti');
    if (artiEl) artiEl.classList.remove('revealed');

    const btnNext = document.getElementById('btn-next');
    if (btnNext) btnNext.classList.add('hidden');


    const isPro = (Game.mode === 'pro');
    const btnTips = document.getElementById('btn-tips'); const tipsModal = document.getElementById('tips-modal');
const tipsH2 = tipsModal.querySelector('h2'); const tipsContent = tipsModal.querySelector('div');
const tipsBubble = document.getElementById('tips-bubble'); 
btnTips.innerHTML = "💡 Tips"; // Reset nama tombol ke default
if (tipsBubble) tipsBubble.classList.add('hidden'); 
          const curDayData = ManualDB['day' + Game.currentDay];
          if (t === 'belajar' && curDayData && curDayData.tips && curDayData.tips.length > 0) {
              btnTips.classList.remove('hidden');
              btnTips.onclick = () => {
                  const formatTipText = (txt) => {
                      if (!txt) return '';
                      if (/<[a-z][\s\S]*>/i.test(txt)) return txt.replace(/\n/g, '<br>');
                      return txt
                          .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                          .replace(/\*\*(.*?)\*\*/g, '<b style="color:white;">$1</b>')
                          .replace(/\*(.*?)\*/g, '<i>$1</i>')
                          .replace(/\n/g, '<br>');
                  };
                  if (curDayData.tips.length === 1) {
                      const tip = curDayData.tips[0];
                      tipsH2.innerHTML = tip.title || "💡 TIPS MATERI";
                      tipsContent.innerHTML = formatTipText(tip.content);
                  } else {
                      tipsH2.innerHTML = "💡 TIPS MATERI HARI INI";
                      tipsContent.innerHTML = curDayData.tips.map((tip, idx) => `
                          <div style="${idx > 0 ? 'margin-top:16px; padding-top:16px; border-top:1px dashed rgba(255,255,255,0.2);' : ''}">
                              <div style="color:var(--warning); font-weight:bold; font-size:15px; margin-bottom:8px;">${tip.title || `Tips #${idx + 1}`}</div>
                              <div style="font-size:14px; line-height:1.6; color:var(--text-main);">${formatTipText(tip.content)}</div>
                          </div>
                      `).join('');
                  }
                  UI.openModal('tips-modal');
              };
          } else if (Game.currentDay === 2 && t === 'belajar' && (i === 7 || i === 11 || i === 14)) {
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
        const cardEl = document.getElementById('card-main');
        if (cardEl) cardEl.classList.remove('hazard-battle-active');
        const currentWave = Game.dungeonScore + 1;
        const isBossWave = (currentWave % 5 === 0);
        document.getElementById('stage-indicator').innerHTML = "";
        document.getElementById('ui-progress').style.width = `100%`;

        // Ambil 1 kata acak dari seluruh pool
        let pool = Game.dungeonPool;
        let target = pool[Math.floor(Math.random() * pool.length)];
        let rubyHtml = Engine.buildRubyFormat(target.k, target.r, null, false);
        
        document.getElementById('ui-jp').innerHTML = `
          <div class="dungeon-showcase animate-slide">
            <div class="dungeon-header">
              <span class="dungeon-wave-badge ${isBossWave ? 'boss-wave' : ''}">
                ${isBossWave ? '👑 GELOMBANG BOS ELIT' : `🏰 GELOMBANG KE-${currentWave}`}
              </span>
              <span class="dungeon-record-badge">🏆 REKOR: <b>${Game.dungeonRecord}</b></span>
            </div>

            <div class="dungeon-target-body">
              <span class="dungeon-prompt-label">${isBossWave ? '⚡ TANTANGAN BOS: APA ARTI KATA INI?' : 'TAKLUKKAN DENGAN ARTI YANG TEPAT:'}</span>
              <div class="dungeon-word-display">${rubyHtml}</div>
            </div>
          </div>
        `;

        // Bikin 3 opsi pengecoh dari pool yang sama
        let opts = [target.a];
        let wrongPool = Engine.shuffle([...pool].filter(x => x.a !== target.a));
        if (wrongPool[0]) opts.push(wrongPool[0].a);
        if (wrongPool[1]) opts.push(wrongPool[1].a);
        if (wrongPool[2]) opts.push(wrongPool[2].a);
        opts = Engine.shuffle(opts);

        const letters = ['A', 'B', 'C', 'D'];
        document.getElementById('input-area').innerHTML = `
          <div class="dungeon-options-grid animate-slide">
            ${opts.map((o, idx) => `
              <button class="dungeon-choice-btn ${isBossWave ? 'boss-choice' : ''}" onclick="Action.checkDungeon('${o.replace(/'/g, "\\'")}', '${target.a.replace(/'/g, "\\'")}', event)">
                <span class="dungeon-choice-pill">${letters[idx] || '⚔️'}</span>
                <span class="dungeon-choice-text">${o}</span>
              </button>
            `).join('')}
          </div>
          <div class="dungeon-footer-row">
            <button type="button" class="btn-dungeon-retreat" onclick="Game.retreatDungeon()">🏳️ Mundur Terhormat (Amankan Progres)</button>
          </div>
        `;
        return; // Setop fungsi di sini agar tidak menjalankan kuis reguler
    }
    
    if (t === 'dojo') {
        const cardEl = document.getElementById('card-main');
        if (cardEl) cardEl.classList.remove('hazard-battle-active');

        // Jika seluruh soal dalam sesi latihan selesai
        if (Dojo.sessionIndex >= Dojo.sessionList.length) {
            document.getElementById('stage-indicator').innerHTML = "";
            document.getElementById('ui-progress').style.width = `100%`;
            let total = Dojo.sessionList.length;
            let acc = total > 0 ? Math.round((Dojo.sessionCorrectCount / total) * 100) : 0;
            let earnedExp = Dojo.sessionCorrectCount * 8;

            document.getElementById('ui-jp').innerHTML = `
              <div class="dojo-finish-card animate-slide">
                <div class="dojo-finish-icon">🏆</div>
                <div class="dojo-finish-title">LATIHAN DOJO TUNTAS!</div>
                <div class="dojo-finish-desc">Hebat! Kamu telah menyelesaikan ${total} soal drill remedial. Kelemahanmu kini telah ditempa menjadi refleks baru yang kokoh!</div>
                <div class="dojo-finish-stats">
                  <div class="dstat-pill">🎯 Akurasi: <b>${acc}%</b></div>
                  <div class="dstat-pill">✨ EXP Diraih: <b>+${earnedExp}</b></div>
                </div>
              </div>
            `;
            document.getElementById('ui-arti').innerHTML = "";
            document.getElementById('input-area').innerHTML = `
              <div style="display:flex; flex-direction:column; gap:8px; width:100%; max-width:480px; margin:0 auto;">
                <button class="btn" style="background:var(--success); color:#000; font-weight:800;" onclick="Game.init(Game.mode)">🏠 Kembali ke Markas</button>
                <button class="btn btn-alt" onclick="Dojo.openModal()">🥋 Buka Bank Kesalahan</button>
              </div>
            `;
            return;
        }

        let cur = Dojo.sessionList[Dojo.sessionIndex];
        let total = Dojo.sessionList.length;
        let perc = Math.round(((Dojo.sessionIndex + 1) / total) * 100);
        document.getElementById('stage-indicator').innerHTML = "";
        document.getElementById('ui-arti').innerHTML = "";
        document.getElementById('ui-progress').style.width = `${perc}%`;

        if (cur.type === 'hafalan') {
            let itm = cur.item;
            let rubyHtml = Engine.buildRubyFormat(itm.k, itm.r, null, false);
            document.getElementById('ui-jp').innerHTML = `
              <div class="dojo-drill-showcase animate-slide">
                <div class="dojo-drill-header">
                  <div style="display:flex; align-items:center; gap:6px;">
                    <span class="dojo-badge-pill">🥋 DRILL KOSAKATA</span>
                    <span class="dojo-refleks-tag">Refleks: ${cur.mastery || 0}/2 ⭐</span>
                  </div>
                  <div class="vocab-counter-group">
                    <span class="vocab-counter-text">DRILL <b>${Dojo.sessionIndex + 1}</b> / ${total}</span>
                    <div class="vocab-mini-track">
                      <div class="vocab-mini-fill dojo-fill" style="width: ${perc}%;"></div>
                    </div>
                  </div>
                </div>
                <div class="dojo-drill-body">
                  <span class="dojo-prompt-label">TEMPA REFLEKS: APA ARTI KATA INI?</span>
                  <div class="dojo-word-display">${rubyHtml}</div>
                </div>
              </div>
            `;

            // Bikin 3 opsi pengecoh
            let opts = [itm.a];
            let pool = [];
            Object.keys(ManualDB).forEach(k => {
                if (ManualDB[k] && ManualDB[k].hafalan) {
                    pool = pool.concat(ManualDB[k].hafalan);
                }
            });
            let wrongPool = Engine.shuffle(pool.filter(x => x && x.a && x.a !== itm.a));
            if (wrongPool[0]) opts.push(wrongPool[0].a);
            if (wrongPool[1]) opts.push(wrongPool[1].a);
            opts = Engine.shuffle(opts);

            const letters = ['A', 'B', 'C'];
            document.getElementById('input-area').innerHTML = `
              <div class="quiz-options-grid animate-slide">
                ${opts.map((o, idx) => `
                  <button class="quiz-choice-btn" onclick="Dojo.checkHafalan('${o.replace(/'/g, "\\'")}', '${itm.a.replace(/'/g, "\\'")}', event)">
                    <span class="quiz-choice-pill">${letters[idx] || '◆'}</span>
                    <span class="quiz-choice-text">${o}</span>
                  </button>
                `).join('')}
              </div>
              <div class="dojo-retreat-row">
                <button type="button" class="btn-dojo-retreat" onclick="Dojo.retreatSession()">🏳️ Mundur ke Markas</button>
              </div>
            `;
            return;
        } else if (cur.type === 'partikel') {
            let itm = cur.item;
            let sentenceHtml = Engine.renderSentence(itm.jp, false, true, false, true);

            let targetArr = [];
            if (Array.isArray(itm.ansP)) {
                targetArr = itm.ansP;
            } else if (typeof itm.ansP === 'string' && itm.ansP.includes(',')) {
                targetArr = itm.ansP.split(',').map(s => s.trim()).filter(Boolean);
            } else if (itm.ansP) {
                targetArr = [String(itm.ansP).trim()];
            } else if (Array.isArray(itm.jp)) {
                targetArr = itm.jp.filter(s => s.p).map(s => (s.text || s.k || '').trim()).filter(Boolean);
            }
            let pSegments = (itm.jp || []).filter(s => s.p);
            if (pSegments.length > targetArr.length) {
                targetArr = pSegments.map(s => (s.text || s.k || '').trim()).filter(Boolean);
            }

            Game.targetMultiAns = targetArr;
            Game.currentMultiAns = new Array(targetArr.length).fill(null);

            let defaultOpts = itm.opts ? [...itm.opts] : ['は', 'の', 'も', 'と', 'で', 'に', 'を', 'では'];
            targetArr.forEach(p => {
                if (p && !defaultOpts.includes(p)) defaultOpts.push(p);
            });

            let optsHtml = '<div class="particle-chips-grid">';
            defaultOpts.forEach(p => {
                optsHtml += `<button type="button" class="particle-chip-btn" onclick="Action.fillMulti('${p}')">${p}</button>`;
            });
            optsHtml += '</div>';

            document.getElementById('ui-jp').innerHTML = `
              <div class="partikel-showcase animate-slide">
                <div class="partikel-header">
                  <div style="display:flex; align-items:center; gap:6px;">
                    <span class="dojo-badge-pill">🧩 DRILL PARTIKEL</span>
                    <span class="dojo-refleks-tag">Refleks: ${cur.mastery || 0}/2 ⭐</span>
                  </div>
                  <div class="vocab-counter-group">
                    <span class="vocab-counter-text">DRILL <b>${Dojo.sessionIndex + 1}</b> / ${total}</span>
                    <div class="vocab-mini-track">
                      <div class="vocab-mini-fill dojo-fill" style="width: ${perc}%;"></div>
                    </div>
                  </div>
                </div>
                <div class="partikel-body">
                  <span class="partikel-prompt-label">LENGKAPI PARTIKEL YANG TEPAT:</span>
                  <div class="partikel-sentence-display">${sentenceHtml}</div>
                </div>
              </div>
            `;

            document.getElementById('input-area').innerHTML = `
              <div class="partikel-action-area animate-slide">
                ${optsHtml}
                <button class="btn hidden" id="btn-submit" onclick="Dojo.checkPartikel(event)">EKSEKUSI JAWABAN</button>
              </div>
              <div class="dojo-retreat-row">
                <button type="button" class="btn-dojo-retreat" onclick="Dojo.retreatSession()">🏳️ Mundur ke Markas</button>
              </div>
            `;
            return;
        } else if (cur.type === 'arti') {
            let itm = cur.item;
            document.getElementById('ui-jp').innerHTML = `
              <div class="arti-quiz-showcase animate-slide">
                <div class="arti-quiz-header">
                  <div style="display:flex; align-items:center; gap:6px;">
                    <span class="dojo-badge-pill">⚔️ DRILL TERJEMAHAN</span>
                    <span class="dojo-refleks-tag">Refleks: ${cur.mastery || 0}/2 ⭐</span>
                  </div>
                  <div class="vocab-counter-group">
                    <span class="vocab-counter-text">DRILL <b>${Dojo.sessionIndex + 1}</b> / ${total}</span>
                    <div class="vocab-mini-track">
                      <div class="vocab-mini-fill dojo-fill" style="width: ${perc}%;"></div>
                    </div>
                  </div>
                </div>
                <div class="arti-quiz-body">
                  <span class="arti-quiz-prompt-label">${itm.qA || 'Terjemahkan kalimat ini ke bahasa Jepang:'}</span>
                  <div class="arti-quiz-sentence">${itm.a}</div>
                </div>
              </div>
            `;

            let targetArr = itm.jp.some(x => x.u) ? itm.jp.filter(x => x.u) : itm.jp;
            let aK = "", aH = "";
            targetArr.forEach(x => { aK += (x.k || x.text); aH += (x.r || x.text); });
            const cleanStr = (s) => s.replace(/<[^>]*>?/gm, '').replace(/[。、！？,\?\sQ:A:]/g, '');
            const displayStr = (s) => s.replace(/<[^>]*>?/gm, '').replace(/(<b>Q:<\/b>|<b>A:<\/b>|Q:|A:)/g, '').trim();

            Game.currentAnsKanji = cleanStr(aK);
            Game.currentAnsHiragana = cleanStr(aH);
            Game.displayKanji = displayStr(aK);
            Game.displayHiragana = displayStr(aH);

            let modeToggleHtml = `
              <div class="jumble-mode-toggle">
                <button type="button" class="jumble-toggle-btn ${Jumble.mode === 'jumble' ? 'active' : ''}" onclick="Jumble.setMode('jumble')">🧩 Susun Balok</button>
                <button type="button" class="jumble-toggle-btn ${Jumble.mode === 'typing' ? 'active' : ''}" onclick="Jumble.setMode('typing')">⌨️ Ketik Manual</button>
              </div>
            `;

            if (Jumble.mode === 'jumble') {
                Jumble.setup(itm);
                document.getElementById('input-area').innerHTML = `
                  <div class="jumble-container animate-slide">
                    ${modeToggleHtml}
                    <div class="jumble-track-wrapper">
                      <div class="jumble-track-header">
                        <span class="jumble-track-title">PITA REMEDIAL TERJEMAHAN:</span>
                        <button type="button" class="jumble-btn-reset" onclick="Jumble.clear()">↺ Kosongkan</button>
                      </div>
                      <div class="jumble-assembly-track" id="jumble-track"></div>
                    </div>
                    <div class="jumble-pool-wrapper">
                      <span class="jumble-pool-label">PILIH BALOK KATA BERIKUT:</span>
                      <div class="jumble-pool-grid" id="jumble-pool"></div>
                    </div>
                    <button class="btn btn-primary-gold hidden" id="btn-submit" onclick="Jumble.check(event)">💥 EKSEKUSI JAWABAN</button>
                  </div>
                  <div class="dojo-retreat-row">
                    <button type="button" class="btn-dojo-retreat" onclick="Dojo.retreatSession()">🏳️ Mundur ke Markas</button>
                  </div>
                `;
                Jumble.render();
            } else {
                document.getElementById('input-area').innerHTML = `
                  <div class="arti-input-container animate-slide">
                    ${modeToggleHtml}
                    <input type="text" id="answer-box" class="input-box cyber-input" placeholder="Ketik Hiragana / Kanji di sini..." autocomplete="off">
                    <button class="btn btn-primary-gold" id="btn-submit">EKSEKUSI JAWABAN</button>
                  </div>
                  <div class="dojo-retreat-row">
                    <button type="button" class="btn-dojo-retreat" onclick="Dojo.retreatSession()">🏳️ Mundur ke Markas</button>
                  </div>
                `;
                setTimeout(() => {
                  const inp = document.getElementById('answer-box');
                  if (inp) inp.focus();
                  const sub = document.getElementById('btn-submit');
                  if (sub) sub.onclick = Dojo.checkArti;
                }, 100);
            }
            return;
        }
    }
    
    if (t === 'boss') {
        const cardEl = document.getElementById('card-main');
        if (cardEl) cardEl.classList.remove('hazard-battle-active');

        let b = Boss.currentBoss || Boss.getBossForDay(Game.currentDay);

        // Jika Bos sudah dikalahkan (HP <= 0)
        if (Boss.bossDefeated || Boss.currentHp <= 0) {
            document.getElementById('stage-indicator').innerHTML = "";
            document.getElementById('ui-progress').style.width = `100%`;

            document.getElementById('ui-jp').innerHTML = `
              <div class="boss-victory-showcase animate-slide">
                <div class="boss-victory-badge">🏆 KEMENANGAN SEKTOR MUTLAK</div>
                <div class="boss-victory-avatar">${b.avatar}</div>
                <div class="boss-victory-title">BOS ${b.name.toUpperCase()} DITAKLUKKAN!</div>
                <div class="boss-victory-desc">Luar biasa! Seluruh pertahanan ${b.name} berhasil kamu runtuhkan. Sektor ${b.sector} (Hari ${b.day}) resmi dibebaskan dengan kehormatan tertinggi!</div>
                <div class="boss-reward-strip">
                  <div class="boss-reward-pill"><span>✨ EXP Sektor:</span> <b>+${b.expReward}</b></div>
                  <div class="boss-reward-pill"><span>🪙 Koin Rampasan:</span> <b>+${b.coinReward}</b></div>
                </div>
              </div>
            `;
            document.getElementById('ui-arti').innerHTML = "";
            document.getElementById('input-area').innerHTML = `
              <div style="display:flex; flex-direction:column; gap:8px; width:100%; max-width:480px; margin:0 auto;">
                <button class="btn btn-gold-victory" onclick="Boss.claimVictory()">Amankan Kemenangan Sektor 🏆</button>
              </div>
            `;
            return;
        }

        let cur = Boss.questionQueue[Boss.questionIndex];
        if (!cur) {
          Boss.questionIndex = 0;
          cur = Boss.questionQueue[0];
        }

        document.getElementById('stage-indicator').innerHTML = "";
        document.getElementById('ui-arti').innerHTML = "";
        let hpPerc = Math.max(0, Math.round((Boss.currentHp / Boss.maxHp) * 100));
        document.getElementById('ui-progress').style.width = `${hpPerc}%`;

        // Render Boss Arena HUD
        let bossHudHtml = `
          <div class="boss-arena-hud">
            <div class="boss-hud-top">
              <div class="boss-avatar-frame">
                <span class="boss-avatar-icon">${b.avatar}</span>
              </div>
              <div class="boss-hud-info">
                <div class="boss-name-row">
                  <span class="boss-name">${b.name}</span>
                  <span class="boss-kanji">${b.kanjiName}</span>
                </div>
                <div class="boss-title">${b.title}</div>
              </div>
              <div class="boss-hp-numeric">
                HP BOS: <b id="boss-hp-num">${Boss.currentHp}</b> / ${Boss.maxHp}
              </div>
            </div>
            <div class="boss-hp-track">
              <div class="boss-hp-fill ${hpPerc <= 30 ? 'fill-danger' : (hpPerc <= 60 ? 'fill-warning' : '')}" id="boss-hp-fill" style="width: ${hpPerc}%;"></div>
            </div>
            <div class="boss-quote-bubble">
              <span class="boss-quote-icon">💬</span>
              <span class="boss-quote-text" id="boss-quote-text">"${b.quote}"</span>
            </div>
          </div>
        `;

        if (cur._type === 'hafalan') {
            let itm = cur;
            let rubyHtml = Engine.buildRubyFormat(itm.k, itm.r, null, false);
            document.getElementById('ui-jp').innerHTML = `
              <div class="boss-showcase animate-slide">
                ${bossHudHtml}
                <div class="boss-prompt-row">
                  <span class="boss-prompt-tag tag-vocab">⚔️ SERANGAN KOSAKATA</span>
                  <span class="boss-prompt-label">APA ARTI KATA INI UNTUK MENYERANG BOS?</span>
                </div>
                <div class="boss-word-display">${rubyHtml}</div>
              </div>
            `;

            let opts = [itm.a];
            let pool = [];
            Object.keys(ManualDB).forEach(k => {
                if (ManualDB[k] && ManualDB[k].hafalan) {
                    pool = pool.concat(ManualDB[k].hafalan);
                }
            });
            let wrongPool = Engine.shuffle(pool.filter(x => x && x.a && x.a !== itm.a));
            if (wrongPool[0]) opts.push(wrongPool[0].a);
            if (wrongPool[1]) opts.push(wrongPool[1].a);
            opts = Engine.shuffle(opts);

            const letters = ['A', 'B', 'C'];
            document.getElementById('input-area').innerHTML = `
              <div class="quiz-options-grid animate-slide">
                ${opts.map((o, idx) => `
                  <button class="quiz-choice-btn btn-boss-choice" onclick="Boss.checkHafalan('${o.replace(/'/g, "\\'")}', '${itm.a.replace(/'/g, "\\'")}', event)">
                    <span class="quiz-choice-pill">${letters[idx] || '⚔️'}</span>
                    <span class="quiz-choice-text">${o}</span>
                  </button>
                `).join('')}
              </div>
              <div class="boss-retreat-row">
                <button type="button" class="btn-boss-retreat" onclick="Boss.retreatBattle()">🏳️ Mundur Sementara</button>
              </div>
            `;
            return;
        } else if (cur._type === 'partikel') {
            let itm = cur;
            let sentenceHtml = Engine.renderSentence(itm.jp, false, true, false, true);

            let targetArr = [];
            if (Array.isArray(itm.ansP)) {
                targetArr = itm.ansP;
            } else if (typeof itm.ansP === 'string' && itm.ansP.includes(',')) {
                targetArr = itm.ansP.split(',').map(s => s.trim()).filter(Boolean);
            } else if (itm.ansP) {
                targetArr = [String(itm.ansP).trim()];
            } else if (Array.isArray(itm.jp)) {
                targetArr = itm.jp.filter(s => s.p).map(s => (s.text || s.k || '').trim()).filter(Boolean);
            }
            let pSegments = (itm.jp || []).filter(s => s.p);
            if (pSegments.length > targetArr.length) {
                targetArr = pSegments.map(s => (s.text || s.k || '').trim()).filter(Boolean);
            }

            Game.targetMultiAns = targetArr;
            Game.currentMultiAns = new Array(targetArr.length).fill(null);

            let defaultOpts = itm.opts ? [...itm.opts] : ['は', 'の', 'も', 'と', 'で', 'に', 'を', 'では'];
            targetArr.forEach(p => {
                if (p && !defaultOpts.includes(p)) defaultOpts.push(p);
            });

            let optsHtml = '<div class="particle-chips-grid">';
            defaultOpts.forEach(p => {
                optsHtml += `<button type="button" class="particle-chip-btn chip-boss" onclick="Action.fillMulti('${p}')">${p}</button>`;
            });
            optsHtml += '</div>';

            document.getElementById('ui-jp').innerHTML = `
              <div class="boss-showcase animate-slide">
                ${bossHudHtml}
                <div class="boss-prompt-row">
                  <span class="boss-prompt-tag tag-partikel">🧩 SERANGAN PARTIKEL</span>
                  <span class="boss-prompt-label">LENGKAPI PARTIKEL UNTUK MENEMBUS PERTAHANAN BOS:</span>
                </div>
                <div class="partikel-sentence-display">${sentenceHtml}</div>
              </div>
            `;

            document.getElementById('input-area').innerHTML = `
              <div class="partikel-action-area animate-slide">
                ${optsHtml}
                <button class="btn hidden btn-boss-strike" id="btn-submit" onclick="Boss.checkPartikel(event)">💥 HANTAM BOS</button>
              </div>
              <div class="boss-retreat-row">
                <button type="button" class="btn-boss-retreat" onclick="Boss.retreatBattle()">🏳️ Mundur Sementara</button>
              </div>
            `;
            return;
        } else if (cur._type === 'arti') {
            let itm = cur;
            let targetArr = itm.jp.some(x => x.u) ? itm.jp.filter(x => x.u) : itm.jp;
            let aK = "", aH = "";
            targetArr.forEach(x => { aK += (x.k || x.text); aH += (x.r || x.text); });
            const cleanStr = (s) => s.replace(/<[^>]*>?/gm, '').replace(/[。、！？,\?\sQ:A:]/g, '');
            const displayStr = (s) => s.replace(/<[^>]*>?/gm, '').replace(/(<b>Q:<\/b>|<b>A:<\/b>|Q:|A:)/g, '').trim();

            Game.currentAnsKanji = cleanStr(aK);
            Game.currentAnsHiragana = cleanStr(aH);
            Game.displayKanji = displayStr(aK);
            Game.displayHiragana = displayStr(aH);

            document.getElementById('ui-jp').innerHTML = `
              <div class="boss-showcase animate-slide">
                ${bossHudHtml}
                <div class="boss-prompt-row">
                  <span class="boss-prompt-tag tag-arti">⚔️ SERANGAN TERJEMAHAN</span>
                  <span class="boss-prompt-label">${itm.qA || 'TERJEMAHKAN KALIMAT INI UNTUK MENYERANG BOS:'}</span>
                </div>
                <div class="arti-quiz-sentence" style="font-size:16px;">${itm.a}</div>
              </div>
            `;

            let modeToggleHtml = `
              <div class="jumble-mode-toggle">
                <button type="button" class="jumble-toggle-btn ${Jumble.mode === 'jumble' ? 'active' : ''}" onclick="Jumble.setMode('jumble')">🧩 Susun Balok</button>
                <button type="button" class="jumble-toggle-btn ${Jumble.mode === 'typing' ? 'active' : ''}" onclick="Jumble.setMode('typing')">⌨️ Ketik Manual</button>
              </div>
            `;

            if (Jumble.mode === 'jumble') {
                Jumble.setup(itm);
                document.getElementById('input-area').innerHTML = `
                  <div class="jumble-container animate-slide">
                    ${modeToggleHtml}
                    <div class="jumble-track-wrapper">
                      <div class="jumble-track-header">
                        <span class="jumble-track-title">PITA SERANGAN TERJEMAHAN:</span>
                        <button type="button" class="jumble-btn-reset" onclick="Jumble.clear()">↺ Kosongkan</button>
                      </div>
                      <div class="jumble-assembly-track" id="jumble-track"></div>
                    </div>
                    <div class="jumble-pool-wrapper">
                      <span class="jumble-pool-label">PILIH BALOK UNTUK MENYERANG BOS:</span>
                      <div class="jumble-pool-grid" id="jumble-pool"></div>
                    </div>
                    <button class="btn btn-primary-gold btn-boss-strike hidden" id="btn-submit" onclick="Jumble.check(event)">💥 HANTAM BOS</button>
                  </div>
                  <div class="boss-retreat-row">
                    <button type="button" class="btn-boss-retreat" onclick="Boss.retreatBattle()">🏳️ Mundur Sementara</button>
                  </div>
                `;
                Jumble.render();
            } else {
                document.getElementById('input-area').innerHTML = `
                  <div class="arti-input-container animate-slide">
                    ${modeToggleHtml}
                    <input type="text" id="answer-box" class="input-box cyber-input" placeholder="Ketik Hiragana / Kanji di sini..." autocomplete="off">
                    <button class="btn btn-primary-gold btn-boss-strike" id="btn-submit">💥 HANTAM BOS</button>
                  </div>
                  <div class="boss-retreat-row">
                    <button type="button" class="btn-boss-retreat" onclick="Boss.retreatBattle()">🏳️ Mundur Sementara</button>
                  </div>
                `;
                setTimeout(() => {
                  const inp = document.getElementById('answer-box');
                  if (inp) inp.focus();
                  const sub = document.getElementById('btn-submit');
                  if (sub) sub.onclick = Boss.checkArti;
                }, 100);
            }
            return;
        }
    }
    
    if (t === 'hafalan') {
      if(Game.sessionData.hafalan[0].k === "WIP") { document.getElementById('ui-jp').innerHTML = "UNDER CONSTRUCTION"; return; }
      const tHaf = Game.sessionData.hafalan.length; const tPeng = Game.sessionData.pengayaan.length; UI.updateProgress(i, tHaf + tPeng);
      if (i === tHaf && !Game.jumpscareTriggered) { 
        Game.jumpscareTriggered = true; 
        const js = document.getElementById('jumpscare-overlay'); 
        js.classList.add('show'); 
        if (navigator.vibrate) try { navigator.vibrate([70, 50, 90]); } catch(_) {}
        setTimeout(() => { 
          js.classList.remove('show'); 
          UI.loadStep(); 
        }, 1200); 
        return; 
      }
      if (i < tHaf) {
        const cardEl = document.getElementById('card-main');
        if (cardEl) cardEl.classList.remove('hazard-battle-active');
        const itm = Game.sessionData.hafalan[i]; 
        
        let isKanji = itm.k && /[\u4e00-\u9faf]/.test(itm.k);
        let isKatakana = itm.k && /^[\u30a0-\u30ff\sー・]+$/.test(itm.k);

        let badgeClass = "badge-hiragana";
        let badgeText = "🌸 かな HIRAGANA";

        if (isKanji) {
          badgeClass = "badge-kanji";
          badgeText = "🔰 漢字 KANJI";
        } else if (isKatakana) {
          badgeClass = "badge-katakana";
          badgeText = "🌐 カナ KATAKANA";
        }

        let rubyHtml = Engine.buildRubyFormat(itm.k, itm.r, null, false);
        let perc = Math.round(((i + 1) / tHaf) * 100);

        document.getElementById('stage-indicator').innerHTML = ""; 
        document.getElementById('ui-arti').innerHTML = ""; 

        document.getElementById('ui-jp').innerHTML = `
          <div class="vocab-showcase animate-slide">
            <div class="vocab-header">
              <span class="vocab-type-badge ${badgeClass}">${badgeText}</span>
              <div class="vocab-counter-group">
                <span class="vocab-counter-text">KOSAKATA <b>${i + 1}</b> / ${tHaf}</span>
                <div class="vocab-mini-track">
                  <div class="vocab-mini-fill" style="width: ${perc}%;"></div>
                </div>
              </div>
            </div>

            <div class="vocab-body">
              <div class="vocab-word-display">${rubyHtml}</div>
            </div>

            <div class="vocab-divider">
              <span class="vocab-divider-line"></span>
              <span class="vocab-divider-icon">❖</span>
              <span class="vocab-divider-line"></span>
            </div>

            <div class="vocab-meaning-box">
              <span class="vocab-meaning-label">ARTI BAHASA INDONESIA</span>
              <div class="vocab-meaning-text">${itm.a}</div>
            </div>
          </div>
        `;

        UI.makeNextBtn("Hafal →");
      } else if (i < tHaf + tPeng) {
        const cardEl = document.getElementById('card-main');
        if (cardEl) cardEl.classList.add('hazard-battle-active');
        const pIdx = i - tHaf;
        const itm = Game.sessionData.pengayaan[pIdx];
        const perc = Math.round(((pIdx + 1) / tPeng) * 100);

        document.getElementById('stage-indicator').innerHTML = "";
        document.getElementById('ui-arti').innerHTML = "";

        let rubyHtml = Engine.buildRubyFormat(itm.k, itm.r, null, false);

        document.getElementById('ui-jp').innerHTML = `
          <div class="quiz-showcase animate-slide">
            <div class="quiz-header">
              <div style="display:flex; align-items:center; gap:6px;">
                <span class="quiz-badge">🚨 KUIS DADAKAN</span>
                <span class="quiz-bonus-tag">⚡ 2X HADIAH</span>
              </div>
              <div class="vocab-counter-group">
                <span class="vocab-counter-text">DRILL <b>${pIdx + 1}</b> / ${tPeng}</span>
                <div class="vocab-mini-track">
                  <div class="vocab-mini-fill quiz-fill" style="width: ${perc}%;"></div>
                </div>
              </div>
            </div>

            <div class="quiz-question-body">
              <span class="quiz-prompt-label">APA ARTI KATA INI?</span>
              <div class="quiz-word-display">${rubyHtml}</div>
            </div>
          </div>
        `;

        let opts = [itm.a];
        let pool = Game.sessionData.hafalan.filter(x => x.a !== itm.a);
        Engine.shuffle(pool);
        if (pool[0]) opts.push(pool[0].a);
        if (pool[1]) opts.push(pool[1].a);
        Engine.shuffle(opts);

        const letters = ['A', 'B', 'C'];
        document.getElementById('input-area').innerHTML = `
          <div class="quiz-options-grid animate-slide">
            ${opts.map((o, idx) => `
              <button class="quiz-choice-btn" onclick="Action.checkPengayaan('${o.replace(/'/g, "\\'")}', '${itm.a.replace(/'/g, "\\'")}', event)">
                <span class="quiz-choice-pill">${letters[idx] || '◆'}</span>
                <span class="quiz-choice-text">${o}</span>
              </button>
            `).join('')}
          </div>
        `;
      } else {
        document.getElementById('stage-indicator').innerText = "";
        document.getElementById('ui-jp').innerHTML = `
          <div class="drill-complete-box animate-slide">
            <div class="drill-complete-icon">🎖️</div>
            <div class="drill-complete-title">Pemanasan Tuntas!</div>
            <div class="drill-complete-desc">Hebat! Seluruh kosakata hafalan dan kuis dadakan telah dikuasai. Sekarang kamu siap mempelajari tab Pola kalimat.</div>
          </div>
        `;
        document.getElementById('ui-arti').innerHTML = "";
        document.getElementById('input-area').innerHTML = `
          <div style="display:flex; flex-direction:column; gap:10px; width:100%; max-width:480px; margin:0 auto;">
            <button class="btn" style="background:var(--primary); color:#0f172a; font-weight:800;" onclick="UI.switchTab('belajar')">Lanjut ke Tab Pola →</button>
            <button class="btn btn-alt" onclick="Action.resetTab()">🔄 Ulas Kembali Sesi Hafalan</button>
          </div>
        `;
      }
    } else {
      const dL = Game.sessionData[t]; UI.updateProgress(i, dL.length); 
      if (i >= dL.length) { 
          document.getElementById('stage-indicator').innerText = ""; 
          if (t === 'belajar') {
              document.getElementById('ui-jp').innerHTML = `
                <div class="drill-complete-box animate-slide">
                  <div class="drill-complete-icon">🎉</div>
                  <div class="drill-complete-title">Pola Kalimat Tuntas!</div>
                  <div class="drill-complete-desc">Hebat! Seluruh contoh pola kalimat hari ini telah kamu pelajari. Tab Partikel & Tab Arti sekarang telah terbuka di Zona Tempur untuk menguji pemahamanmu!</div>
                </div>
              `;
              document.getElementById('ui-arti').innerHTML = "";
              document.getElementById('input-area').innerHTML = `
                <div style="display:flex; flex-direction:column; gap:10px; width:100%; max-width:480px; margin:0 auto;">
                  <button class="btn" style="background:var(--success); color:#000; font-weight:800;" onclick="UI.switchTab('partikel')">Tantang Kuis Partikel →</button>
                  <button class="btn btn-alt" onclick="Action.resetTab()">🔄 Ulas Kembali Pola Kalimat</button>
                </div>
              `;
              return;
          }
          let reviewBtn = `<button class="btn btn-alt" style="margin-bottom:10px;" onclick="Action.resetTab()">🔄 Ulas Kembali Sesi Ini</button>`;
         
          if(t === 'arti') {
              if (Game.currentDay % 5 === 0) {
                  let b = Boss.getBossForDay(Game.currentDay);
                  document.getElementById('ui-jp').innerHTML = `
                    <div class="boss-warning-showcase animate-slide">
                      <div class="boss-warning-badge">🚨 PERINGATAN DARURAT SEKTOR ${b.sector}</div>
                      <div class="boss-warning-avatar">${b.avatar}</div>
                      <div class="boss-warning-title">PENJAGA GERBANG MUNCUL!</div>
                      <div class="boss-warning-name">${b.name} <span class="boss-warning-jp">${b.kanjiName}</span></div>
                      <div class="boss-warning-subtitle">${b.title}</div>
                      <div class="boss-warning-quote">"${b.quote}"</div>
                    </div>
                  `;
                  document.getElementById('input-area').innerHTML = `
                    <div style="display:flex; flex-direction:column; gap:10px; width:100%; max-width:480px; margin:0 auto;">
                      <button class="btn btn-boss-engage" onclick="Boss.startBattle(${Game.currentDay})">
                        <span class="boss-btn-jp">決戦</span>
                        <span>HADAPI BOS: ${b.name.toUpperCase()} (HP ${b.maxHp})</span>
                        <span class="boss-btn-arrow">⚔️</span>
                      </button>
                      ${reviewBtn}
                    </div>
                  `;
              } else {
                  document.getElementById('ui-jp').innerHTML = "🎉 Sesi Tuntas!"; 
                  document.getElementById('input-area').innerHTML = `${reviewBtn}<button class="btn" style="background:var(--gold); color:#000; box-shadow: 0 0 15px rgba(251, 191, 36, 0.4);" onclick="Game.completeDay()">Selesaikan Misi 🏆</button>`; 
              }
          } else {
              document.getElementById('ui-jp').innerHTML = "🎉 Sesi Tuntas!"; 
              document.getElementById('input-area').innerHTML = reviewBtn; 
          }
          return; 
      }
      document.getElementById('stage-indicator').innerText = `${t.toUpperCase()} : ${i + 1} / ${dL.length}`; const itm = dL[i];
      if(itm.a === 'WIP') { document.getElementById('ui-jp').innerHTML = "Under Construction"; return; }

      if (t === 'belajar') {
        const perc = Math.round(((i + 1) / dL.length) * 100);
        document.getElementById('stage-indicator').innerHTML = ""; 
        document.getElementById('ui-arti').innerHTML = ""; 

        let sentenceHtml = Engine.renderSentence(itm.jp, false, false, false, false);

        // Periksa apakah ada tips materi untuk langkah/hari ini
        let hasTip = false;
        const curDayData = ManualDB['day' + Game.currentDay];
        if (curDayData && curDayData.tips && curDayData.tips.length > 0) hasTip = true;
        else if (Game.currentDay === 2 && (i === 7 || i === 11 || i === 14)) hasTip = true;
        else if (Game.currentDay === 3) hasTip = true;
        else if (Game.currentDay === 4 && i < 9) hasTip = true;

        let tipBtnHtml = hasTip ? `
          <button type="button" class="pola-tip-btn" onclick="UI.openModal('tips-modal')">
            <span class="pola-tip-icon">💡</span>
            <span class="pola-tip-text">Buka Catatan & Tips Materi</span>
          </button>
        ` : '';

        document.getElementById('ui-jp').innerHTML = `
          <div class="pola-showcase animate-slide">
            <div class="pola-header">
              <span class="pola-badge">📚 POLA KALIMAT</span>
              <div class="vocab-counter-group">
                <span class="vocab-counter-text">KALIMAT <b>${i + 1}</b> / ${dL.length}</span>
                <div class="vocab-mini-track">
                  <div class="vocab-mini-fill pola-fill" style="width: ${perc}%;"></div>
                </div>
              </div>
            </div>

            <div class="pola-body">
              <div class="pola-sentence-display">${sentenceHtml}</div>
            </div>

            <div class="vocab-divider">
              <span class="vocab-divider-line"></span>
              <span class="vocab-divider-icon">❖</span>
              <span class="vocab-divider-line"></span>
            </div>

            <div class="pola-meaning-box">
              <span class="pola-meaning-label">TERJEMAHAN BAHASA INDONESIA</span>
              <div class="pola-meaning-text" onclick="this.classList.toggle('revealed')">${itm.a}</div>
            </div>

            ${tipBtnHtml}
          </div>
        `;

        UI.makeNextBtn("Paham →");
      } else if (t === 'partikel') {
        const perc = Math.round(((i + 1) / dL.length) * 100);
        document.getElementById('stage-indicator').innerHTML = ""; 
        document.getElementById('ui-arti').innerHTML = ""; 

        let sentenceHtml = Engine.renderSentence(itm.jp, isPro, true, false, true); 
        
        let targetArr = [];
        if (Array.isArray(itm.ansP)) {
            targetArr = itm.ansP;
        } else if (typeof itm.ansP === 'string' && itm.ansP.includes(',')) {
            targetArr = itm.ansP.split(',').map(s => s.trim()).filter(Boolean);
        } else if (itm.ansP) {
            targetArr = [String(itm.ansP).trim()];
        } else if (Array.isArray(itm.jp)) {
            targetArr = itm.jp.filter(s => s.p).map(s => (s.text || s.k || '').trim()).filter(Boolean);
        }

        let pSegments = (itm.jp || []).filter(s => s.p);
        if (pSegments.length > targetArr.length) {
            targetArr = pSegments.map(s => (s.text || s.k || '').trim()).filter(Boolean);
        }

        Game.targetMultiAns = targetArr;
        Game.currentMultiAns = new Array(targetArr.length).fill(null);
        
        let defaultOpts = itm.opts ? [...itm.opts] : ['は', 'の', 'も', 'と', 'で', 'に', 'を', 'では'];
        targetArr.forEach(p => {
            if (p && !defaultOpts.includes(p)) defaultOpts.push(p);
        });

        // Relik Lensa Scouter: sorot partikel benar otomatis 1x per sesi harian
        let isScouterActive = RPG.hasRelic('scouter') && !Game.scouterUsedToday && targetArr.length > 0;
        if (isScouterActive) {
            Game.scouterUsedToday = true;
            setTimeout(() => {
                UI.showToast("👓 Radar Lensa Scouter aktif! Mendeteksi partikel target.", "warning");
            }, 300);
        }

        let optsHtml = '<div class="particle-chips-grid">';
        defaultOpts.forEach(p => { 
            let isTarget = isScouterActive && targetArr.includes(p);
            let scouterClass = isTarget ? 'scouter-detected' : '';
            let scouterBadge = isTarget ? '<span class="scouter-tag">👓 RADAR</span>' : '';
            optsHtml += `<button type="button" class="particle-chip-btn ${scouterClass}" onclick="Action.fillMulti('${p}')">${p}${scouterBadge}</button>`; 
        });
        optsHtml += '</div>'; 
        
        document.getElementById('ui-jp').innerHTML = `
          <div class="partikel-showcase animate-slide">
            <div class="partikel-header">
              <span class="partikel-badge">🧩 KUIS PARTIKEL</span>
              <div class="vocab-counter-group">
                <span class="vocab-counter-text">SOAL <b>${i + 1}</b> / ${dL.length}</span>
                <div class="vocab-mini-track">
                  <div class="vocab-mini-fill partikel-fill" style="width: ${perc}%;"></div>
                </div>
              </div>
            </div>

            <div class="partikel-body">
              <span class="partikel-prompt-label">LENGKAPI PARTIKEL YANG TEPAT:</span>
              <div class="partikel-sentence-display">${sentenceHtml}</div>
            </div>
          </div>
        `;

        document.getElementById('input-area').innerHTML = `
          <div class="partikel-action-area animate-slide">
            ${optsHtml}
            <button class="btn hidden" id="btn-submit" onclick="Action.checkMulti(event)">EKSEKUSI JAWABAN</button>
          </div>
        `;

        if (Game.intelActive) {
            let intelBox = `<div class="intel-box" style="margin-bottom:15px;"><b>Intel Arti:</b> ${itm.a}</div>`;
            document.getElementById('input-area').insertAdjacentHTML('afterbegin', intelBox);
        }
      } else if (t === 'arti') {
        const perc = Math.round(((i + 1) / dL.length) * 100);
        document.getElementById('stage-indicator').innerHTML = ""; 
        document.getElementById('ui-arti').innerHTML = ""; 

        let displayA = itm.a;
        if (itm.qA && itm.qA.toLowerCase().includes("garis bawah") && itm.ansA) {
            let safeAnsA = itm.ansA.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            let regex = new RegExp(`(${safeAnsA})`, "i");
            displayA = displayA.replace(regex, `<u style="text-decoration: underline; text-decoration-style: dashed; text-decoration-color: var(--primary); text-underline-offset: 4px;">$1</u>`);
        }
        let qSub = itm.qA ? itm.qA.replace("Terjemahkanlah kalimat bergaris bawah!", "Tulis bagian bergaris bawah dalam bhs Jepang:").replace("Terjemahkanlah jawaban A!", "Tulis jawaban A dalam bhs Jepang:").replace("Terjemahkan keseluruhan kalimat!", "Terjemahkan kalimat ke bhs Jepang:") : "Terjemahkan kalimat ini ke bahasa Jepang:";

        document.getElementById('ui-jp').innerHTML = `
          <div class="arti-quiz-showcase animate-slide">
            <div class="arti-quiz-header">
              <span class="arti-quiz-badge">⚔️ KUIS TERJEMAHAN</span>
              <div class="vocab-counter-group">
                <span class="vocab-counter-text">SOAL <b>${i + 1}</b> / ${dL.length}</span>
                <div class="vocab-mini-track">
                  <div class="vocab-mini-fill arti-fill" style="width: ${perc}%;"></div>
                </div>
              </div>
            </div>

            <div class="arti-quiz-body">
              <span class="arti-quiz-prompt-label">${qSub}</span>
              <div class="arti-quiz-sentence">${displayA}</div>
            </div>
          </div>
        `;
        
        let targetArr = itm.jp.some(x => x.u) ? itm.jp.filter(x => x.u) : itm.jp;
        let aK = "", aH = "";
        targetArr.forEach(x => { aK += (x.k || x.text); aH += (x.r || x.text); });
        
        const cleanStr = (s) => s.replace(/<[^>]*>?/gm, '').replace(/[。、！？,\?\sQ:A:]/g, '');
        const displayStr = (s) => s.replace(/<[^>]*>?/gm, '').replace(/(<b>Q:<\/b>|<b>A:<\/b>|Q:|A:)/g, '').trim();

        Game.currentAnsKanji = cleanStr(aK);
        Game.currentAnsHiragana = cleanStr(aH);
        
        Game.displayKanji = displayStr(aK);
        Game.displayHiragana = displayStr(aH);
        
        let modeToggleHtml = `
          <div class="jumble-mode-toggle">
            <button type="button" class="jumble-toggle-btn ${Jumble.mode === 'jumble' ? 'active' : ''}" onclick="Jumble.setMode('jumble')">🧩 Susun Balok</button>
            <button type="button" class="jumble-toggle-btn ${Jumble.mode === 'typing' ? 'active' : ''}" onclick="Jumble.setMode('typing')">⌨️ Ketik Manual</button>
          </div>
        `;

        if (Jumble.mode === 'jumble') {
            Jumble.setup(itm);
            document.getElementById('input-area').innerHTML = `
              <div class="jumble-container animate-slide">
                ${modeToggleHtml}
                
                <div class="jumble-track-wrapper">
                  <div class="jumble-track-header">
                    <span class="jumble-track-title">PITA SUSUNAN KALIMAT:</span>
                    <button type="button" class="jumble-btn-reset" onclick="Jumble.clear()">↺ Kosongkan</button>
                  </div>
                  <div class="jumble-assembly-track" id="jumble-track"></div>
                </div>

                <div class="jumble-pool-wrapper">
                  <span class="jumble-pool-label">PILIH BALOK KATA BERIKUT:</span>
                  <div class="jumble-pool-grid" id="jumble-pool"></div>
                </div>

                <button class="btn btn-primary-gold hidden" id="btn-submit" onclick="Jumble.check(event)">💥 EKSEKUSI JAWABAN</button>
              </div>
            `;
            Jumble.render();
        } else {
            document.getElementById('input-area').innerHTML = `
              <div class="arti-input-container animate-slide">
                ${modeToggleHtml}
                <input type="text" id="answer-box" class="input-box cyber-input" placeholder="Ketik Hiragana / Kanji di sini..." autocomplete="off">
                <button class="btn btn-primary-gold" id="btn-submit">EKSEKUSI JAWABAN</button>
              </div>
            `;
            setTimeout(() => { 
                const box = document.getElementById('answer-box');
                if (box) box.focus(); 
                const sub = document.getElementById('btn-submit');
                if (sub) sub.onclick = Action.checkInput; 
            }, 100);
        }
        
        if (Game.mataActive) {
            let jpText = Game.displayKanji !== Game.displayHiragana ? 
                         `${Game.displayKanji} (${Game.displayHiragana})` : 
                         Game.displayKanji;
            let mataBox = `<div class="intel-box" style="margin-bottom:15px; border-color:var(--gold); color:var(--gold);"><b>Mata Kensei:</b> ${jpText}</div>`;
            document.getElementById('input-area').insertAdjacentHTML('afterbegin', mataBox);
        }
      }
      
      if (Game.adminMode && t !== 'dungeon') {
          let cheatAnswer = "";

          // Tentukan jawaban berdasarkan tab yang sedang aktif
          if (t === 'partikel') {
              cheatAnswer = Game.targetMultiAns ? Game.targetMultiAns.join(" & ") : "";
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
    const uiHp = document.getElementById('ui-hp');
    if (uiHp) {
      uiHp.innerHTML = Array(3).fill(0).map((_,i) => {
        let isL = i >= Game.hp; let animC = (isL && i === Game.hp && Game.hpLostThisTurn) ? 'bleed' : '';
        return `<span class="heart ${isL ? 'lost' : ''} ${animC}">❤</span>`;
      }).join('');
    }
    const invHp = document.getElementById('inv-hp-display');
    if (invHp) {
      invHp.innerHTML = Array(3).fill(0).map((_,i) => i < Game.hp ? '❤️' : '🖤').join('');
    }
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
      // Rekam Kesalahan ke Dojo Remedial Otomatis
      if (Game.currentTab === 'partikel') {
          const itm = Game.sessionData.partikel[Game.currentIndex];
          if (itm) Dojo.recordMistake('partikel', itm, Game.currentDay, key);
      } else if (Game.currentTab === 'arti') {
          const itm = Game.sessionData.arti[Game.currentIndex];
          if (itm) Dojo.recordMistake('arti', itm, Game.currentDay, key);
      }

      if(Game.hasShield) {
          Game.hasShield = false; card.classList.remove('shield-active');
          UI.showToast("Aegis Shield Hancur! Kesalahan dimaafkan.", "warning");
          fb.innerHTML = "DITAHAN SHIELD 🛡️ Coba lagi!"; fb.style.color = "var(--primary)"; 
          if(inp) { inp.disabled = false; inp.value = ""; inp.focus(); document.getElementById('btn-submit').classList.remove('hidden'); }
          if(Game.currentTab === 'partikel') {
              Game.currentMultiAns.fill(null);
              Game.targetMultiAns.forEach((_, mIdx) => {
                  const b = document.getElementById(`mblank-${mIdx}`);
                  if(b) {
                      b.innerText = "_";
                      b.style.color = "var(--gold)";
                      b.style.borderBottomStyle = "dashed";
                  }
              });
              document.getElementById('btn-submit').classList.add('hidden');
          }
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
      const btn = evt ? evt.currentTarget : null;
      if(sel === cor) { 
          if (btn) btn.classList.add('choice-correct');
          RPG.addReward(10, 3, evt); // ⚡ 2X DOUBLE REWARD!
          if (navigator.vibrate) try { navigator.vibrate(30); } catch(_) {}
          setTimeout(() => {
              UI.triggerNextAnim(() => { Game.currentIndex++; UI.loadStep(); }); 
          }, 180);
      } else { 
          if (btn) {
              btn.classList.add('choice-wrong');
              setTimeout(() => btn.classList.remove('choice-wrong'), 500);
          }
          // Rekam Kesalahan ke Dojo
          const pIdx = Game.currentIndex - Game.sessionData.hafalan.length;
          const itm = Game.sessionData.pengayaan[pIdx];
          if (itm) Dojo.recordMistake('hafalan', itm, Game.currentDay, cor);

          document.getElementById('ui-feedback').innerHTML = "Pertahanan Terbobol! ❌ Coba lagi!"; 
          document.getElementById('ui-feedback').style.color = "var(--danger)"; 
          if (navigator.vibrate) try { navigator.vibrate([50, 40, 50]); } catch(_) {}
          RPG.combo = 0; RPG.updateUI(); 
      } 
  },

  checkDungeon: (sel, cor, evt) => {
      const isBossWave = ((Game.dungeonScore + 1) % 5 === 0);
      if(sel === cor) {
          Game.dungeonScore++; RPG.combo++;
          if(RPG.combo > Game.dailyStats.maxCombo) Game.dailyStats.maxCombo = RPG.combo;
          
          // High Score Tracking
          if(Game.dungeonScore > Game.dungeonRecord) {
              Game.dungeonRecord = Game.dungeonScore;
              localStorage.setItem('yk_dungeon_record', Game.dungeonRecord);
          }

          if(isBossWave) {
              // Boss wave bonus: +25 EXP, +50 Coins, +1 HP recovery if needed!
              RPG.addReward(25, 50, evt);
              if(Game.hp < 3) {
                  Game.hp++;
                  UI.renderHP();
                  UI.showToast(`👑 BOS ELIT DITAKLUKKAN! Bonus +50 Koin & Restorasi +1 HP! 🛡️`, 'success');
              } else {
                  UI.showToast(`👑 BOS ELIT DITAKLUKKAN! Bonus +50 Koin! 🪙`, 'success');
              }
          } else {
              RPG.addReward(6, 3, evt);
          }
          
          const card = document.getElementById('card-main');
          card.classList.remove('shake-hard'); card.classList.add('card-correct');
          setTimeout(()=>card.classList.remove('card-correct'), 500);
          if (navigator.vibrate) try { navigator.vibrate(30); } catch(_) {}
          
          UI.triggerNextAnim(() => { UI.loadStep(); }); 
      } else {
          // Rekam Kesalahan Dungeon ke Dojo
          if (Game.dungeonPool) {
              const target = Game.dungeonPool.find(x => x.a === cor);
              if (target) Dojo.recordMistake('hafalan', target, 'Dungeon', cor);
          }

          document.getElementById('ui-feedback').innerHTML = `SALAH ❌<br><span style="font-size:14px; color:var(--text-sub);">Kunci: ${cor}</span>`;
          document.getElementById('ui-feedback').style.color = "var(--danger)";
          
          const card = document.getElementById('card-main');
          card.classList.add('shake-hard'); setTimeout(()=>card.classList.remove('shake-hard'), 500);
          if (navigator.vibrate) try { navigator.vibrate([60, 40, 60]); } catch(_) {}
          
          Game.decreaseHP(evt);
          
          if(Game.hp > 0) {
              document.getElementById('input-area').innerHTML = `<button class="btn" onclick="UI.triggerNextAnim(() => { UI.loadStep(); })">⚔️ Lanjut Bertahan (Sisa HP: ${Game.hp})</button>`;
          } else {
              // Heroic Game Over Screen
              const isNewRecord = (Game.dungeonScore === Game.dungeonRecord && Game.dungeonScore > 0);
              document.getElementById('ui-jp').innerHTML = `
                <div class="dungeon-gameover-card animate-slide">
                  <div class="dungeon-gameover-icon">💀</div>
                  <div class="dungeon-gameover-title">PERTAHANAN GUGUR!</div>
                  <div style="font-size:13px; color:var(--text-sub);">Kamu telah berjuang gigih di Dungeon Ingatan.</div>
                  <div class="dungeon-stats-box">
                    <div class="dungeon-stat-row">
                      <span>Gelombang Bertahan:</span>
                      <span style="font-weight:800; color:var(--primary);">${Game.dungeonScore} Gelombang</span>
                    </div>
                    <div class="dungeon-stat-row">
                      <span>Rekor Terbaik:</span>
                      <span style="font-weight:800; color:var(--gold);">${Game.dungeonRecord} Gelombang</span>
                    </div>
                    ${isNewRecord ? `<div style="color:var(--success); font-weight:800; font-size:12px; margin-top:8px;">🎉 REKOR TERBARU TERCIPTA!</div>` : ''}
                  </div>
                </div>
              `;
              document.getElementById('input-area').innerHTML = `
                <div style="display:flex; flex-direction:column; gap:8px; width:100%; max-width:480px; margin:0 auto;">
                  <button class="btn" onclick="Game.startDungeon()">🔄 Coba Lagi Survival</button>
                  <button class="btn btn-alt" onclick="Game.init(Game.mode)">🏠 Kembali ke Markas</button>
                </div>
              `;
          }
      }
  },
  
  fillMulti: (p) => {
    let idx = Game.currentMultiAns.indexOf(null);
    if(idx === -1 && Game.currentMultiAns.length === 1) {
        idx = 0;
    }
    if(idx !== -1) {
        Game.currentMultiAns[idx] = p;
        const b = document.getElementById(`mblank-${idx}`);
        if(b) {
            b.innerText = p; 
            b.classList.add('filled');
            b.style.color = "var(--primary)"; 
            b.style.borderBottomStyle = "solid";
        }

        if(!Game.currentMultiAns.includes(null)) {
            document.getElementById('btn-submit').classList.remove('hidden');
        }
    } else {
        const btnSubmit = document.getElementById('btn-submit');
        if(btnSubmit) {
            btnSubmit.classList.add('shake-hard');
            setTimeout(() => btnSubmit.classList.remove('shake-hard'), 300);
        }
        UI.showToast("Slot penuh! Klik partikel pada kalimat di atas untuk mengubahnya.", "error");
    }
  },
  clearMulti: (idx) => {
    Game.currentMultiAns[idx] = null;
    const b = document.getElementById(`mblank-${idx}`);
    if(b) {
        b.innerText = "_"; 
        b.classList.remove('filled');
        b.style.color = "var(--gold)"; 
        b.style.borderBottomStyle = "dashed";
    }
    document.getElementById('btn-submit').classList.add('hidden');
  },
  checkMulti: (evt) => {
    let isCorrect = JSON.stringify(Game.currentMultiAns) === JSON.stringify(Game.targetMultiAns);
    UI.showResult(isCorrect, Game.targetMultiAns.join(" & "), evt);
  }
};
document.addEventListener('keydown', (e) => { 
  const isInputActive = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);

  if (e.key === 'Enter' || (e.code === 'Space' && !isInputActive)) { 
    if (e.code === 'Space' && !isInputActive) e.preventDefault();
    const bs = document.getElementById('btn-submit'); 
    const bn = document.getElementById('btn-next'); 
    if (bs && !bs.classList.contains('hidden')) bs.click(); 
    else if (bn && !bn.classList.contains('hidden')) bn.click(); 
  } else if ((e.key === 'ArrowUp' || e.key === 'f' || e.key === 'F') && !isInputActive) {
    if (Game.currentTab === 'hafalan') {
      const rubies = document.querySelectorAll('#ui-jp ruby');
      rubies.forEach(r => r.classList.toggle('show'));
    }
  } else if (!isInputActive && ['1', '2', '3', 'a', 'b', 'c', 'A', 'B', 'C'].includes(e.key)) {
    const keyMap = { '1': 0, '2': 1, '3': 2, 'a': 0, 'b': 1, 'c': 2, 'A': 0, 'B': 1, 'C': 2 };
    const idx = keyMap[e.key];
    const choices = document.querySelectorAll('.quiz-choice-btn');
    if (choices && choices[idx]) {
      choices[idx].click();
    }
  }
});

document.addEventListener('click', (e) => {
  const rubyEl = e.target.closest('ruby');
  if (rubyEl && navigator.vibrate) {
    try { navigator.vibrate(20); } catch(_) {}
  }
});

// Touch Gesture Swipe (Mobile swipe left to advance slide)
let touchStartX = 0;
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
  if (e.touches && e.touches[0]) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }
}, { passive: true });

document.addEventListener('touchend', (e) => {
  if (!e.changedTouches || !e.changedTouches[0]) return;
  const diffX = e.changedTouches[0].clientX - touchStartX;
  const diffY = e.changedTouches[0].clientY - touchStartY;

  // Pastikan swipe horizontal dominan dan minimal 60px
  if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
    if (diffX < 0) {
      // Swipe kiri -> Klik Lanjut/Hafal/Paham
      const bn = document.getElementById('btn-next');
      if (bn && !bn.classList.contains('hidden')) {
        bn.click();
      }
    }
  }
}, { passive: true });
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
            let parsedData = { hafalan: [], materi: [], kuisExtra: [], proKuisExtra: [], tips: [] };
            
            if (doc.fields) {
                for (let key of ['hafalan', 'materi', 'kuisExtra', 'proKuisExtra', 'tips']) {
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
                                        if (jpV.stringValue !== undefined) return jpV.stringValue;
                                        if (jpV.integerValue !== undefined) return parseInt(jpV.integerValue);
                                        if (jpV.mapValue && jpV.mapValue.fields) {
                                            let jpObj = {};
                                            for (let jpK in jpV.mapValue.fields) {
                                                if (jpV.mapValue.fields[jpK].stringValue !== undefined) jpObj[jpK] = jpV.mapValue.fields[jpK].stringValue;
                                                else if (jpV.mapValue.fields[jpK].booleanValue !== undefined) jpObj[jpK] = jpV.mapValue.fields[jpK].booleanValue;
                                                else if (jpV.mapValue.fields[jpK].integerValue !== undefined) jpObj[jpK] = parseInt(jpV.mapValue.fields[jpK].integerValue);
                                            }
                                            return jpObj;
                                        }
                                        return null;
                                    });
                                }
                            }
                            return obj;
                        });
                    }
                }
            }
            ManualDB[dayKey] = parsedData;
        });
    }

    if (document.body.contains(loadingMsg)) document.body.removeChild(loadingMsg);
    Dojo.init();
    Streak.init();
    Cloud.init();
    Game.checkStoredMode();

    // Prevent mobile touch scrolling leak through sidebar overlay
    const mainOverlay = document.getElementById('overlay');
    if (mainOverlay) {
      mainOverlay.addEventListener('touchmove', (e) => {
        if (e.cancelable) e.preventDefault();
      }, { passive: false });
    }
  } catch (error) {
    Dojo.init();
    Streak.init();
    Cloud.init();
    alert("Gagal mengunduh: " + error.message);
  }
};
