/* ================================================================
   Gaming Hub — script.js (Visual Upgrade Edition)
   ================================================================ */

/* ==================== GAME DATA ==================== */
var games = [
  { name: "Grand Theft Auto V", appId: 271590, genre: ["动作","开放世界","犯罪"], rating: 9.5, score: 95, desc: "洛圣都的传奇故事，三个主角的命运交织。", ach: [77,77], hours: 186, lastPlayed: "2026-05-28", favorite: true },
  { name: "Counter-Strike 2", appId: 730, genre: ["射击","竞技","多人"], rating: 9.0, score: 90, desc: "经典竞技射击，5v5战术对抗。", ach: [1,1], hours: 116, lastPlayed: "2026-05-29", favorite: true },
  { name: "Alien Swarm: Reactive Drop", appId: 563560, genre: ["射击","合作","免费"], rating: 8.2, score: 82, desc: "异形丛生，合作科幻射击游戏。", ach: [64,198], hours: 96, lastPlayed: "2026-04-15", favorite: false },
  { name: "Wallpaper Engine", appId: 431960, genre: ["工具","创意","桌面"], rating: 9.6, score: 96, desc: "动态壁纸引擎，打造个性化桌面。", ach: [3,17], hours: 74, lastPlayed: "2026-05-20", favorite: true },
  { name: "Plants vs. Zombies: GW2", appId: 1924480, genre: ["射击","休闲","多人"], rating: 8.3, score: 83, desc: "植物与僵尸的疯狂射击大战。", ach: [0,63], hours: 35, lastPlayed: "2026-03-10", favorite: false },
  { name: "It Takes Two", appId: 1426210, genre: ["冒险","合作","平台"], rating: 9.4, score: 94, desc: "双人合作冒险，讲述一对夫妻的奇妙旅程。", ach: [20,20], hours: 22, lastPlayed: "2026-02-28", favorite: true },
  { name: "Detroit: Become Human", appId: 1222670, genre: ["冒险","剧情","互动"], rating: 9.3, score: 93, desc: "底特律的未来，关于人工智能与人性的故事。", ach: [3,48], hours: 21, lastPlayed: "2026-01-15", favorite: false },
  { name: "WRC 7", appId: 631520, genre: ["竞速","赛车","模拟"], rating: 7.8, score: 78, desc: "世界汽车拉力锦标赛官方游戏。", ach: [3,41], hours: 15, lastPlayed: "2025-12-20", favorite: false },
  { name: "7 Days to Die", appId: 251570, genre: ["生存","恐怖","开放世界"], rating: 8.0, score: 80, desc: "末日僵尸生存，建造堡垒抵御尸潮。", ach: [8,43], hours: 11, lastPlayed: "2025-11-05", favorite: false },
  { name: "GTA V Enhanced", appId: 3240220, genre: ["动作","开放世界","犯罪"], rating: 9.0, score: 90, desc: "GTA V 增强版，画面升级体验更佳。", ach: [4,77], hours: 9, lastPlayed: "2026-05-01", favorite: false },
  { name: "Hitman: Absolution", appId: 203140, genre: ["潜行","动作","暗杀"], rating: 7.9, score: 79, desc: "化身代号47，执行精密暗杀任务。", ach: [11,47], hours: 9, lastPlayed: "2025-10-18", favorite: false },
  { name: "Battlefield 1", appId: 1238810, genre: ["射击","战争","多人"], rating: 8.8, score: 88, desc: "回到第一次世界大战，体验史诗般的战场。", ach: [3,50], hours: 4, lastPlayed: "2025-09-22", favorite: false },
  { name: "PUBG: BATTLEGROUNDS", appId: 578080, genre: ["射击","大逃杀","多人"], rating: 8.0, score: 80, desc: "百人跳伞求生，最后一个站着的人获胜。", ach: [0,37], hours: 2, lastPlayed: "2025-08-14", favorite: false },
  { name: "Overwatch", appId: 2357570, genre: ["射击","多人","竞技"], rating: 8.4, score: 84, desc: "守望先锋，英雄射击团队竞技。", ach: [0,164], hours: 2, lastPlayed: "2025-07-30", favorite: false },
  { name: "Crime Scene Cleaner", appId: 2909530, genre: ["模拟","休闲","独立"], rating: 7.5, score: 75, desc: "犯罪现场清理专家，专业模拟体验。", ach: [0,0], hours: 2, lastPlayed: "2025-06-12", favorite: false },
  { name: "Fallout Shelter", appId: 588430, genre: ["模拟","策略","免费"], rating: 7.8, score: 78, desc: "避难所经营，管理你的地下社区。", ach: [0,35], hours: 2, lastPlayed: "2025-05-20", favorite: false },
  { name: "100% Orange Juice", appId: 282800, genre: ["休闲","策略","桌游"], rating: 8.0, score: 80, desc: "百分百橙汁，可爱的桌游风格派对游戏。", ach: [0,359], hours: 0, lastPlayed: "", favorite: false },
  { name: "Half-Life 2", appId: 220, genre: ["射击","科幻","经典"], rating: 9.6, score: 96, desc: "半条命2，FPS游戏的里程碑之作。", ach: [0,69], hours: 0, lastPlayed: "", favorite: false },
  { name: "Metro: Last Light", appId: 43160, genre: ["射击","恐怖","末日"], rating: 8.9, score: 89, desc: "地铁：最后的曙光，末日莫斯科的冒险。", ach: [0,70], hours: 0, lastPlayed: "", favorite: false },
  { name: "Tell Me Why", appId: 1180660, genre: ["冒险","剧情","互动"], rating: 8.2, score: 82, desc: "告诉我为什么，双胞胎的神秘往事。", ach: [0,30], hours: 0, lastPlayed: "", favorite: false }
];

var STEAM_IMG = "https://cdn.akamai.steamstatic.com/steam/apps/";
var currentFilter = "all";
var currentSort = "recent";
var searchQuery = "";
var lastDailyGameIndex = -1;

/* ==================== UTILITIES ==================== */
function formatHours(h) {
  if (h === 0) return "未游玩";
  if (h >= 1000) return h.toLocaleString() + " 小时";
  return h + " 小时";
}

function getAchPercent(g) {
  if (!g.ach || g.ach[1] === 0) return 0;
  return Math.round((g.ach[0] / g.ach[1]) * 100);
}

function isPerfectGame(g) {
  return g.ach && g.ach[1] > 0 && g.ach[0] === g.ach[1];
}

function getProgressColor(pct) {
  if (pct >= 80) return "var(--accent-emerald)";
  if (pct >= 50) return "var(--accent-amber)";
  if (pct >= 20) return "var(--accent-blue)";
  return "var(--accent-rose)";
}

function getStatusTag(game) {
  if (isPerfectGame(game)) return '<span class="game-card-tag tag-perfect">✦ 完美</span>';
  if (game.hours > 0) return '<span class="game-card-tag tag-playing">进行中</span>';
  return '<span class="game-card-tag tag-backlog">待游玩</span>';
}

function setText(id, v) {
  var el = document.getElementById(id);
  if (el) el.textContent = v;
}

/* ==================== TOAST ==================== */
function showToast(message, type) {
  type = type || "info";
  var c = document.getElementById("toastContainer");
  if (!c) {
    c = document.createElement("div");
    c.id = "toastContainer";
    c.className = "toast-container";
    document.body.appendChild(c);
  }
  var t = document.createElement("div");
  t.className = "toast " + type;
  t.textContent = message;
  c.appendChild(t);
  requestAnimationFrame(function() { t.classList.add("show"); });
  setTimeout(function() {
    t.classList.remove("show");
    setTimeout(function() { t.remove(); }, 400);
  }, 2500);
}

/* ==================== THEME ==================== */
function toggleTheme() {
  var html = document.documentElement;
  var isLight = html.getAttribute("data-theme") === "light";
  html.setAttribute("data-theme", isLight ? "dark" : "light");
  var icon = isLight ? "🌙" : "☀️";
  var btns = document.querySelectorAll(".theme-toggle-mini");
  btns.forEach(function(b) { b.textContent = icon; });
  localStorage.setItem("gaming_hub_theme", isLight ? "dark" : "light");
  showToast(isLight ? "已切换至深色模式" : "已切换至浅色模式", "info");
}

function loadTheme() {
  var saved = localStorage.getItem("gaming_hub_theme");
  if (saved === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    var btns = document.querySelectorAll(".theme-toggle-mini");
    btns.forEach(function(b) { b.textContent = "☀️"; });
  }
}

/* ==================== MOBILE NAV ==================== */
function toggleMobileNav() {
  var nav = document.getElementById("mobileNav");
  var overlay = document.getElementById("mobileOverlay");
  if (nav) nav.classList.toggle("show");
  if (overlay) overlay.classList.toggle("show");
  document.body.classList.toggle("nav-open");
}

/* ==================== CLOCK ==================== */
function updateClock() {
  var now = new Date();
  var h = String(now.getHours()).padStart(2, "0");
  var m = String(now.getMinutes()).padStart(2, "0");
  var s = String(now.getSeconds()).padStart(2, "0");
  var timeStr = h + ":" + m + ":" + s;
  var shortTime = h + ":" + m;

  setText("heroClockTime", timeStr);
  setText("navClock", shortTime);

  var days = ["日", "一", "二", "三", "四", "五", "六"];
  var dateStr = now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() + "日 星期" + days[now.getDay()];
  setText("heroClockDate", dateStr);
}

/* ==================== QUOTES ==================== */
var quotes = [
  { text: "游戏不只是娱乐，是另一种生活的可能。", author: "" },
  { text: "人生就像一场游戏，重要的是享受过程。", author: "" },
  { text: "在游戏中，每个人都可以成为英雄。", author: "" },
  { text: "真正的玩家，从不轻言放弃。", author: "" },
  { text: "游戏是第九艺术。", author: "" },
  { text: "通关不是目的，探索才是意义。", author: "" },
  { text: "每一次Game Over，都是新开始的准备。", author: "" },
  { text: "最好的游戏，是能让你忘记时间的游戏。", author: "" },
  { text: "在虚拟世界中找到真实的自己。", author: "" },
  { text: "游戏教会我们：坚持就能通关。", author: "" },
  { text: "不是游戏需要你，是你需要游戏。", author: "" },
  { text: "游戏世界里，没有不可能。", author: "" }
];

function refreshQuote() {
  var q = quotes[Math.floor(Math.random() * quotes.length)];
  var mainEl = document.getElementById("quoteText");
  if (mainEl) mainEl.textContent = q.text;
}

/* ==================== FILTER & SORT ==================== */
function getFilteredGames() {
  return games.filter(function(g) {
    var matchFilter = currentFilter === "all" ||
      (currentFilter === "perfect" && isPerfectGame(g)) ||
      (currentFilter === "favorites" && g.favorite) ||
      (currentFilter === "recent" && g.lastPlayed);
    var matchSearch = !searchQuery ||
      g.name.toLowerCase().indexOf(searchQuery) !== -1 ||
      g.genre.some(function(t) { return t.indexOf(searchQuery) !== -1; });
    return matchFilter && matchSearch;
  });
}

function getSortedGames(filtered) {
  var arr = filtered.slice();
  switch (currentSort) {
    case "hours":
      arr.sort(function(a, b) { return b.hours - a.hours; });
      break;
    case "score":
      arr.sort(function(a, b) { return b.score - a.score; });
      break;
    case "name":
      arr.sort(function(a, b) { return a.name.localeCompare(b.name); });
      break;
    case "achievements":
      arr.sort(function(a, b) { return getAchPercent(b) - getAchPercent(a); });
      break;
    case "recent":
    default:
      arr.sort(function(a, b) {
        if (!a.lastPlayed && !b.lastPlayed) return 0;
        if (!a.lastPlayed) return 1;
        if (!b.lastPlayed) return -1;
        return b.lastPlayed.localeCompare(a.lastPlayed);
      });
  }
  return arr;
}

/* ==================== GAME CARDS ==================== */
function renderGames() {
  var grid = document.getElementById("gameGrid");
  if (!grid) return;

  var filtered = getFilteredGames();
  var sorted = getSortedGames(filtered);

  if (sorted.length === 0) {
    grid.innerHTML = '<div class="empty-state"><span class="empty-icon">🎮</span><div class="empty-title">没有找到匹配的游戏</div><div class="empty-desc">试试更换搜索词或筛选条件</div></div>';
    return;
  }

  grid.innerHTML = sorted.map(function(g, i) {
    var pct = getAchPercent(g);
    var color = getProgressColor(pct);
    var steamUrl = "https://store.steampowered.com/app/" + g.appId;
    return '<div class="game-card" onclick="openGameModal(' + games.indexOf(g) + ')">' +
      '<div class="game-card-img-wrap">' +
        '<img class="game-card-img" src="' + STEAM_IMG + g.appId + '/header.jpg" alt="' + g.name + '" loading="lazy" onerror="this.src=\'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 460 215%22><rect fill=%22%231a1a2e%22 width=%22460%22 height=%22215%22/><text x=%2250%%25%22 y=%2250%%25%22 fill=%22%23666%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2216%22>No Image</text></svg>\'">' +
        '<div class="game-card-overlay">' +
          '<span class="game-card-badge">' + g.rating.toFixed(1) + '</span>' +
          getStatusTag(g) +
          (g.favorite ? '<span class="game-card-fav">❤️</span>' : '') +
        '</div>' +
      '</div>' +
      '<div class="game-card-body">' +
        '<h3 class="game-card-name">' + g.name + '</h3>' +
        '<div class="game-card-genres">' + g.genre.map(function(t) { return '<span class="game-card-genre">' + t + '</span>'; }).join("") + '</div>' +
        '<div class="game-card-desc">' + g.desc + '</div>' +
        '<div class="game-card-bottom">' +
          '<div class="game-card-hours">' + (g.hours > 0 ? '⏱ ' + g.hours + 'h' : '—') + '</div>' +
          '<div class="game-card-ach">' +
            '<div class="ach-progress-ring">' +
              '<div class="ach-progress-fill" style="width:' + pct + '%;background:' + color + '"></div>' +
            '</div>' +
            (g.ach[1] > 0 ? '<span class="ach-text" style="color:' + color + '">' + g.ach[0] + '/' + g.ach[1] + '</span>' : '<span class="ach-text">—</span>') +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join("");
}

/* ==================== GAME MODAL ==================== */
function openGameModal(index) {
  var g = games[index];
  if (!g) return;
  var pct = getAchPercent(g);
  var color = getProgressColor(pct);
  var steamUrl = "https://store.steampowered.com/app/" + g.appId;

  var modal = document.getElementById("gameModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "gameModal";
    modal.className = "modal-overlay";
    modal.onclick = function(e) { if (e.target === modal) closeGameModal(); };
    document.body.appendChild(modal);
  }

  modal.innerHTML = '<div class="modal-content">' +
    '<button class="modal-close" onclick="closeGameModal()">✕</button>' +
    '<div class="modal-hero">' +
      '<img class="modal-hero-img" src="' + STEAM_IMG + g.appId + '/library_600x900.jpg" alt="' + g.name + '" onerror="this.src=\'' + STEAM_IMG + g.appId + '/header.jpg\'">' +
      '<div class="modal-hero-info">' +
        '<h2 class="modal-hero-title">' + g.name + '</h2>' +
        '<div class="modal-hero-genres">' + g.genre.map(function(t) { return '<span class="game-card-genre">' + t + '</span>'; }).join("") + '</div>' +
        '<p class="modal-hero-desc">' + g.desc + '</p>' +
        '<div class="modal-hero-stats">' +
          '<div class="modal-stat"><span class="modal-stat-val">' + g.rating.toFixed(1) + '</span><span class="modal-stat-lbl">评分</span></div>' +
          '<div class="modal-stat"><span class="modal-stat-val">' + (g.hours > 0 ? g.hours + 'h' : '—') + '</span><span class="modal-stat-lbl">时长</span></div>' +
          '<div class="modal-stat"><span class="modal-stat-val" style="color:' + color + '">' + pct + '%</span><span class="modal-stat-lbl">成就</span></div>' +
          '<div class="modal-stat"><span class="modal-stat-val">' + (g.lastPlayed || '—') + '</span><span class="modal-stat-lbl">最后游玩</span></div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="modal-actions">' +
      '<a class="modal-btn primary" href="' + steamUrl + '" target="_blank">🔗 Steam 商店</a>' +
      '<button class="modal-btn secondary" onclick="toggleFavorite(' + index + ')">' + (g.favorite ? '❤️ 已收藏' : '🤍 收藏') + '</button>' +
      '<button class="modal-btn secondary" onclick="closeGameModal()">关闭</button>' +
    '</div>' +
  '</div>';

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeGameModal() {
  var modal = document.getElementById("gameModal");
  if (modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }
}

function toggleFavorite(index) {
  games[index].favorite = !games[index].favorite;
  renderGames();
  showToast(games[index].favorite ? "已收藏 " + games[index].name : "已取消收藏", "info");
  closeGameModal();
}

/* ==================== TOOL MODALS ==================== */
function openToolModal(toolId) {
  var panel = document.getElementById("toolsPanel");
  if (panel) panel.scrollIntoView({ behavior: "smooth" });
}

/* ==================== TIMER ==================== */
var timerInterval = null;
var timerSeconds = 25 * 60;
var timerRunning = false;
var timerSessions = 0;

function updateTimerDisplay() {
  var m = Math.floor(timerSeconds / 60);
  var s = timerSeconds % 60;
  setText("timerDisplay", String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0"));
  var pct = (timerSeconds / (25 * 60)) * 100;
  var fill = document.getElementById("timerProgress");
  if (fill) fill.style.width = pct + "%";
}

function toggleTimer() {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    var btn = document.getElementById("timerToggle");
    if (btn) { btn.textContent = "继续"; btn.classList.remove("active"); }
  } else {
    if (timerSeconds <= 0) timerSeconds = 25 * 60;
    timerRunning = true;
    var btn = document.getElementById("timerToggle");
    if (btn) { btn.textContent = "暂停"; btn.classList.add("active"); }
    timerInterval = setInterval(function() {
      timerSeconds--;
      updateTimerDisplay();
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        timerSessions++;
        setText("timerSessions", timerSessions);
        var btn = document.getElementById("timerToggle");
        if (btn) { btn.textContent = "开始"; btn.classList.remove("active"); }
        showToast("🍅 番茄钟完成！休息一下吧~", "success");
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerSeconds = 25 * 60;
  updateTimerDisplay();
  var btn = document.getElementById("timerToggle");
  if (btn) { btn.textContent = "开始"; btn.classList.remove("active"); }
}

function setTimer(mins) {
  clearInterval(timerInterval);
  timerRunning = false;
  timerSeconds = mins * 60;
  updateTimerDisplay();
  var btn = document.getElementById("timerToggle");
  if (btn) { btn.textContent = "开始"; btn.classList.remove("active"); }
  showToast("计时器已设置为 " + mins + " 分钟", "info");
}

/* ==================== NOTES ==================== */
var currentNoteTab = "quick";
var notesData = { quick: "", game: "", todo: "" };

function loadNotes() {
  try {
    var saved = localStorage.getItem("gaming_hub_notes");
    if (saved) notesData = JSON.parse(saved);
  } catch (e) {}
  var area = document.getElementById("notesArea");
  if (area) area.value = notesData[currentNoteTab] || "";
}

function saveNotes() {
  var area = document.getElementById("notesArea");
  if (area) notesData[currentNoteTab] = area.value;
  localStorage.setItem("gaming_hub_notes", JSON.stringify(notesData));
  var status = document.getElementById("notesStatus");
  if (status) status.textContent = "已保存 " + new Date().toLocaleTimeString();
}

function switchNoteTab(tab) {
  saveNotes();
  currentNoteTab = tab;
  document.querySelectorAll(".notes-tab").forEach(function(t) {
    t.classList.toggle("active", t.getAttribute("data-note") === tab);
  });
  var area = document.getElementById("notesArea");
  if (area) area.value = notesData[tab] || "";
  var placeholders = { quick: "写下你的想法...", game: "游戏攻略、心得...", todo: "待办事项..." };
  if (area) area.placeholder = placeholders[tab] || "";
}

function clearNotes() {
  var area = document.getElementById("notesArea");
  if (area) area.value = "";
  notesData[currentNoteTab] = "";
  saveNotes();
  showToast("笔记已清空", "info");
}

/* ==================== DAILY GAME ==================== */
function getWeightedRandomGame() {
  var weighted = [];
  games.forEach(function(g, i) {
    var w = 1;
    if (g.favorite) w += 5;
    if (g.hours > 0 && g.hours < 20) w += 3;
    if (g.hours === 0) w += 2;
    for (var j = 0; j < w; j++) weighted.push(i);
  });
  var pick;
  do {
    pick = weighted[Math.floor(Math.random() * weighted.length)];
  } while (pick === lastDailyGameIndex && weighted.length > 1);
  lastDailyGameIndex = pick;
  return games[pick];
}

function refreshDailyGame() {
  var g = getWeightedRandomGame();
  var img = document.getElementById("dailyGameImg");
  var name = document.getElementById("dailyGameName");
  var genre = document.getElementById("dailyGameGenre");
  var tags = document.getElementById("dailyGameTags");
  var quote = document.getElementById("dailyGameQuote");

  if (img) {
    img.src = STEAM_IMG + g.appId + "/header.jpg";
    img.alt = g.name;
    img.onerror = function() { img.style.display = "none"; };
  }
  if (name) name.textContent = g.name;
  if (genre) genre.textContent = g.genre[0] + (g.favorite ? " · ❤️ 收藏" : "");
  if (tags) {
    tags.innerHTML = g.genre.slice(0, 3).map(function(t) {
      return '<span class="daily-game-tag">' + t + '</span>';
    }).join("");
  }
  if (quote) quote.textContent = g.desc;

  var card = document.querySelector(".daily-game-card");
  if (card) {
    card.style.opacity = "0";
    card.style.transform = "translateY(8px)";
    setTimeout(function() {
      card.style.transition = "all 0.4s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 50);
  }
}

/* ==================== NAVBAR SCROLL ==================== */
function initNavbar() {
  window.addEventListener("scroll", function() {
    var nav = document.getElementById("mainNav");
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
  });
}

/* ==================== STATS CALC ==================== */
function calcStats() {
  var totalGames = games.length;
  var totalHours = games.reduce(function(s, g) { return s + g.hours; }, 0);
  var perfectGames = games.filter(isPerfectGame).length;
  var avgScore = Math.round(games.reduce(function(s, g) { return s + g.score; }, 0) / totalGames);
  var totalAch = games.reduce(function(s, g) { return s + g.ach[0]; }, 0);

  setText("heroTotalGames", totalGames);
  setText("heroTotalHours", totalHours + "h");
  setText("heroPerfectGames", perfectGames);
  setText("heroAvgScore", avgScore);
  setText("statTotalGames", totalGames);
  setText("statTotalHours", totalHours);
  setText("statPerfectGames", perfectGames);
  setText("statAvgScore", avgScore);
  setText("statAchievements", totalAch);
  setText("gameCountNum", totalGames);
}

/* ==================== COUNTER TOOL ==================== */
var counterValue = 0;
function updateCounter() { setText("counterVal", counterValue); }
function counterInc() { counterValue++; updateCounter(); }
function counterDec() { counterValue--; updateCounter(); }
function counterReset() { counterValue = 0; updateCounter(); }

/* ==================== DICE ==================== */
function rollDice() {
  var result = Math.floor(Math.random() * 6) + 1;
  var el = document.getElementById("diceResult");
  if (el) {
    el.textContent = result;
    el.style.transform = "scale(1.3) rotate(15deg)";
    setTimeout(function() { el.style.transform = "scale(1)"; }, 200);
  }
  showToast("🎲 掷出了 " + result + "！", "info");
}

/* ==================== RANDOM QUOTE TOOL ==================== */
function showRandomQuote() {
  var q = quotes[Math.floor(Math.random() * quotes.length)];
  var el = document.getElementById("randomQuoteResult");
  if (el) el.textContent = q.text;
}

/* ==================== FILTER BUTTONS ==================== */
function initFilterButtons() {
  document.querySelectorAll(".filter-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      document.querySelectorAll(".filter-btn").forEach(function(b) { b.classList.remove("active"); });
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      renderGames();
    });
  });
}

function initSortSelect() {
  var select = document.getElementById("sortSelect");
  if (select) {
    select.addEventListener("change", function() {
      currentSort = select.value;
      renderGames();
    });
  }
}

function initSearch() {
  var input = document.getElementById("searchInput");
  if (input) {
    input.addEventListener("input", function() {
      searchQuery = input.value.trim().toLowerCase();
      renderGames();
    });
  }
}

/* ==================== NOTES AUTO-SAVE ==================== */
function initNotes() {
  loadNotes();
  var area = document.getElementById("notesArea");
  if (area) {
    var debounceTimer;
    area.addEventListener("input", function() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(saveNotes, 800);
    });
  }
}

/* ==================== INIT ==================== */
document.addEventListener("DOMContentLoaded", function() {
  loadTheme();
  updateClock();
  setInterval(updateClock, 1000);
  refreshQuote();
  setInterval(refreshQuote, 15000);
  calcStats();
  renderGames();
  refreshDailyGame();
  initNavbar();
  initFilterButtons();
  initSortSelect();
  initSearch();
  initNotes();
  updateTimerDisplay();
});
