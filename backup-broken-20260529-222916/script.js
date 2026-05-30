// LX Gaming Hub - Enhanced Script
(function(){
"use strict";

const GAMES = [
  { id:1, name:"艾尔登法环",nameEn:"Elden Ring",genre:"动作 RPG",img:"https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",rating:9.5,playtime:287,achievements:42,totalAchievements:42,perfect:true,developer:"FromSoftware",tags:["魂系","开放世界","RPG"],recent:true },
  { id:2, name:"赛博朋克 2077",nameEn:"Cyberpunk 2077",genre:"动作 RPG",img:"https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg",rating:8.8,playtime:156,achievements:38,totalAchievements:44,perfect:false,developer:"CD Projekt Red",tags:["开放世界","RPG","赛博朋克"],recent:true },
  { id:3, name:"博德之门 3",nameEn:"Baldur's Gate 3",genre:"RPG",img:"https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg",rating:9.7,playtime:203,achievements:54,totalAchievements:54,perfect:true,developer:"Larian Studios",tags:["RPG","回合制","D&D"],recent:true },
  { id:4, name:"黑神话：悟空",nameEn:"Black Myth: Wukong",genre:"动作",img:"https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg",rating:9.3,playtime:68,achievements:28,totalAchievements:36,perfect:false,developer:"游戏科学",tags:["动作","中国神话","魂系"],recent:true },
  { id:5, name:"GTA V",nameEn:"Grand Theft Auto V",genre:"动作冒险",img:"https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg",rating:9.0,playtime:312,achievements:62,totalAchievements:78,perfect:false,developer:"Rockstar Games",tags:["开放世界","动作","犯罪"],recent:true },
  { id:6, name:"荒野大镖客：救赎 2",nameEn:"Red Dead Redemption 2",genre:"动作冒险",img:"https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg",rating:9.6,playtime:178,achievements:41,totalAchievements:52,perfect:false,developer:"Rockstar Games",tags:["开放世界","西部","剧情"],recent:false },
  { id:7, name:"巫师 3：狂猎",nameEn:"The Witcher 3",genre:"RPG",img:"https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg",rating:9.4,playtime:195,achievements:72,totalAchievements:78,perfect:false,developer:"CD Projekt Red",tags:["RPG","开放世界","奇幻"],recent:false },
  { id:8, name:"只狼：影逝二度",nameEn:"Sekiro",genre:"动作",img:"https://cdn.akamai.steamstatic.com/steam/apps/814380/header.jpg",rating:9.2,playtime:84,achievements:34,totalAchievements:34,perfect:true,developer:"FromSoftware",tags:["魂系","动作","忍者"],recent:false },
  { id:9, name:"空洞骑士",nameEn:"Hollow Knight",genre:"类银河战士",img:"https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg",rating:9.1,playtime:62,achievements:48,totalAchievements:63,perfect:false,developer:"Team Cherry",tags:["独立","类银河战士","平台"],recent:false },
  { id:10, name:"哈迪斯",nameEn:"Hades",genre:"Roguelike",img:"https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg",rating:9.0,playtime:93,achievements:32,totalAchievements:49,perfect:false,developer:"Supergiant Games",tags:["Roguelike","动作","独立"],recent:false },
  { id:11, name:"命运 2",nameEn:"Destiny 2",genre:"射击",img:"https://cdn.akamai.steamstatic.com/steam/apps/1085660/header.jpg",rating:8.2,playtime:456,achievements:18,totalAchievements:30,perfect:false,developer:"Bungie",tags:["射击","MMO","科幻"],recent:true },
  { id:12, name:"CS2",nameEn:"Counter-Strike 2",genre:"射击",img:"https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg",rating:8.5,playtime:520,achievements:0,totalAchievements:0,perfect:false,developer:"Valve",tags:["射击","竞技","FPS"],recent:true },
  { id:13, name:"泰拉瑞亚",nameEn:"Terraria",genre:"沙盒",img:"https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg",rating:8.9,playtime:145,achievements:85,totalAchievements:104,perfect:false,developer:"Re-Logic",tags:["沙盒","生存","多人"],recent:false },
  { id:14, name:"死亡细胞",nameEn:"Dead Cells",genre:"Roguelike",img:"https://cdn.akamai.steamstatic.com/steam/apps/588650/header.jpg",rating:8.7,playtime:78,achievements:16,totalAchievements:34,perfect:false,developer:"Motion Twin",tags:["Roguelike","动作","独立"],recent:false },
  { id:15, name:"蔚蓝",nameEn:"Celeste",genre:"平台",img:"https://cdn.akamai.steamstatic.com/steam/apps/504230/header.jpg",rating:9.0,playtime:32,achievements:22,totalAchievements:32,perfect:false,developer:"Maddy Makes Games",tags:["平台","独立","像素"],recent:false },
  { id:16, name:"极乐迪斯科",nameEn:"Disco Elysium",genre:"RPG",img:"https://cdn.akamai.steamstatic.com/steam/apps/632470/header.jpg",rating:9.3,playtime:58,achievements:8,totalAchievements:20,perfect:false,developer:"ZA/UM",tags:["RPG","推理","剧情"],recent:false },
  { id:17, name:"死亡搁浅",nameEn:"Death Stranding",genre:"动作冒险",img:"https://cdn.akamai.steamstatic.com/steam/apps/1190460/header.jpg",rating:8.6,playtime:45,achievements:35,totalAchievements:63,perfect:false,developer:"Kojima Productions",tags:["动作","步行模拟","科幻"],recent:false },
  { id:18, name:"文明 6",nameEn:"Civilization VI",genre:"策略",img:"https://cdn.akamai.steamstatic.com/steam/apps/289070/header.jpg",rating:8.5,playtime:186,achievements:52,totalAchievements:98,perfect:false,developer:"Firaxis Games",tags:["策略","回合制","历史"],recent:false },
  { id:19, name:"星露谷物语",nameEn:"Stardew Valley",genre:"模拟",img:"https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg",rating:9.0,playtime:120,achievements:32,totalAchievements:40,perfect:false,developer:"ConcernedApe",tags:["模拟","农场","独立"],recent:false },
  { id:20, name:"双人成行",nameEn:"It Takes Two",genre:"冒险",img:"https://cdn.akamai.steamstatic.com/steam/apps/1426210/header.jpg",rating:8.9,playtime:18,achievements:12,totalAchievements:22,perfect:false,developer:"Hazelight Studios",tags:["合作","冒险","解谜"],recent:false },
  { id:21, name:"怪物猎人：世界",nameEn:"Monster Hunter: World",genre:"动作",img:"https://cdn.akamai.steamstatic.com/steam/apps/582010/header.jpg",rating:8.8,playtime:234,achievements:42,totalAchievements:50,perfect:false,developer:"Capcom",tags:["动作","狩猎","多人"],recent:false },
  { id:22, name:"全面战争：三国",nameEn:"Total War: Three Kingdoms",genre:"策略",img:"https://cdn.akamai.steamstatic.com/steam/apps/779340/header.jpg",rating:8.1,playtime:96,achievements:25,totalAchievements:60,perfect:false,developer:"Creative Assembly",tags:["策略","历史","三国"],recent:false },
  { id:23, name:"求生之路 2",nameEn:"Left 4 Dead 2",genre:"射击",img:"https://cdn.akamai.steamstatic.com/steam/apps/550/header.jpg",rating:8.8,playtime:167,achievements:42,totalAchievements:45,perfect:false,developer:"Valve",tags:["射击","僵尸","合作"],recent:false },
  { id:24, name:"传送门 2",nameEn:"Portal 2",genre:"解谜",img:"https://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg",rating:9.5,playtime:28,achievements:48,totalAchievements:51,perfect:false,developer:"Valve",tags:["解谜","科幻","经典"],recent:false },
  { id:25, name:"暗黑破坏神 4",nameEn:"Diablo IV",genre:"ARPG",img:"https://cdn.akamai.steamstatic.com/steam/apps/2344520/header.jpg",rating:7.8,playtime:89,achievements:20,totalAchievements:25,perfect:false,developer:"Blizzard",tags:["ARPG","暗黑","多人"],recent:true },
  { id:26, name:"战神",nameEn:"God of War",genre:"动作",img:"https://cdn.akamai.steamstatic.com/steam/apps/1593500/header.jpg",rating:9.3,playtime:42,achievements:25,totalAchievements:36,perfect:false,developer:"Santa Monica Studio",tags:["动作","北欧","剧情"],recent:false },
  { id:27, name:"最后生还者",nameEn:"The Last of Us",genre:"动作冒险",img:"https://cdn.akamai.steamstatic.com/steam/apps/1888930/header.jpg",rating:8.9,playtime:15,achievements:18,totalAchievements:28,perfect:false,developer:"Naughty Dog",tags:["动作","末日","剧情"],recent:false },
  { id:28, name:"潜水员戴夫",nameEn:"DAVE THE DIVER",genre:"冒险",img:"https://cdn.akamai.steamstatic.com/steam/apps/1868140/header.jpg",rating:8.7,playtime:36,achievements:30,totalAchievements:42,perfect:false,developer:"MINTROCKET",tags:["冒险","模拟","独立"],recent:false },
  { id:29, name:"动物井",nameEn:"Animal Well",genre:"解谜",img:"https://cdn.akamai.steamstatic.com/steam/apps/813230/header.jpg",rating:9.1,playtime:14,achievements:10,totalAchievements:16,perfect:false,developer:"Billy Basso",tags:["解谜","独立","探索"],recent:false },
  { id:30, name:"小丑牌",nameEn:"Balatro",genre:"Roguelike",img:"https://cdn.akamai.steamstatic.com/steam/apps/2379780/header.jpg",rating:9.0,playtime:52,achievements:15,totalAchievements:20,perfect:false,developer:"LocalThunk",tags:["Roguelike","卡牌","独立"],recent:true }
];

var QUICK_LINKS = [
  {name:"Steam 商店",url:"https://store.steampowered.com/",icon:"🎮"},
  {name:"SteamDB",url:"https://steamdb.info/",icon:"📊"},
  {name:"HowLongToBeat",url:"https://howlongtobeat.com/",icon:"⏱️"},
  {name:"ProtonDB",url:"https://www.protondb.com/",icon:"🐧"},
  {name:"IsThereAnyDeal",url:"https://isthereanydeal.com/",icon:"💰"},
  {name:"PCGamingWiki",url:"https://www.pcgamingwiki.com/",icon:"📖"}
];

var TOOLS = [
  {name:"成就追踪器",desc:"查看和追踪你的游戏成就进度",icon:"🏆",action:"achievements"},
  {name:"游戏推荐",desc:"基于你的游戏库推荐下一款游戏",icon:"🎯",action:"recommend"},
  {name:"时长统计",desc:"详细的游玩时间分析报告",icon:"📊",action:"playtime"},
  {name:"游戏日志",desc:"记录你的游戏体验和心得",icon:"📝",action:"journal"},
  {name:"价格追踪",desc:"追踪游戏价格变动和折扣信息",icon:"💰",action:"prices"},
  {name:"性能监控",desc:"监控游戏帧率和硬件状态",icon:"🖥️",action:"performance"}
];

var currentSort = "recent";
var currentGenre = "全部";
var searchQuery = "";
var pomodoroInterval = null;
var pomodoroTime = 25 * 60;
var pomodoroRunning = false;
var pomodoroTotal = 25 * 60;

document.addEventListener("DOMContentLoaded", function() {
  updateClock();
  setInterval(updateClock, 1000);
  initNav();
  initGames();
  initTools();
  initStats();
  initWidgets();
  initParticles();
});

function updateClock() {
  var now = new Date();
  var h = String(now.getHours()).padStart(2, "0");
  var m = String(now.getMinutes()).padStart(2, "0");
  var s = String(now.getSeconds()).padStart(2, "0");
  var navEl = document.getElementById("navClock");
  if (navEl) navEl.textContent = h + ":" + m + ":" + s;
  var heroTime = document.getElementById("heroTime");
  if (heroTime) heroTime.textContent = h + ":" + m;
  var heroDate = document.getElementById("heroDate");
  if (heroDate) {
    var days = ["日","一","二","三","四","五","六"];
    heroDate.textContent = now.getFullYear() + "年" + (now.getMonth()+1) + "月" + now.getDate() + "日 星期" + days[now.getDay()];
  }
  var heroTip = document.getElementById("heroTip");
  if (heroTip) {
    var tips = ["🎮 适度游戏益脑，沉迷游戏伤身","☕ 记得喝水，休息一下眼睛","🌟 每天进步一点点，成就满满","🎯 今天的目标完成了吗？","💪 坚持就是胜利！"];
    heroTip.textContent = tips[Math.floor(now.getTime() / 60000) % tips.length];
  }
}

function initNav() {
  var toggle = document.getElementById("menuToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function() { links.classList.toggle("open"); });
    links.querySelectorAll("a").forEach(function(a) { a.addEventListener("click", function() { links.classList.remove("open"); }); });
  }
  var sections = ["hero","games","stats","tools","widgets"];
  window.addEventListener("scroll", function() {
    var navLinks = document.querySelectorAll(".nav-links a");
    var current = "hero";
    sections.forEach(function(id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) current = id;
    });
    navLinks.forEach(function(a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  });
}

function initParticles() {
  var container = document.getElementById("particles");
  if (!container) return;
  for (var i = 0; i < 30; i++) {
    var p = document.createElement("div");
    var size = Math.random() * 3 + 1;
    var dur = Math.random() * 10 + 5;
    p.style.cssText = "position:absolute;border-radius:50%;background:rgba(124,108,240," + (Math.random()*0.3+0.1) + ");width:" + size + "px;height:" + size + "px;left:" + (Math.random()*100) + "%;top:" + (Math.random()*100) + "%;animation:particleFloat " + dur + "s ease-in-out infinite";
    container.appendChild(p);
  }
}

function initGames() {
  renderGames();
  var search = document.getElementById("gameSearch");
  if (search) search.addEventListener("input", function(e) { searchQuery = e.target.value.toLowerCase(); renderGames(); });
  document.querySelectorAll(".filter-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      document.querySelectorAll(".filter-btn").forEach(function(b) { b.classList.remove("active"); });
      btn.classList.add("active");
      currentGenre = btn.dataset.genre;
      renderGames();
    });
  });
  var sortSelect = document.getElementById("sortSelect");
  if (sortSelect) sortSelect.addEventListener("change", function(e) { currentSort = e.target.value; renderGames(); });
}

function getFilteredGames() {
  var filtered = GAMES.filter(function(g) {
    var matchSearch = !searchQuery || g.name.toLowerCase().includes(searchQuery) || g.nameEn.toLowerCase().includes(searchQuery);
    var matchGenre = currentGenre === "全部" || g.genre === currentGenre;
    return matchSearch && matchGenre;
  });
  filtered.sort(function(a, b) {
    if (currentSort === "recent") return b.id - a.id;
    if (currentSort === "rating") return b.rating - a.rating;
    if (currentSort === "playtime") return b.playtime - a.playtime;
    if (currentSort === "name") return a.name.localeCompare(b.name);
    return 0;
  });
  return filtered;
}

function renderGames() {
  var grid = document.getElementById("gamesGrid");
  if (!grid) return;
  var games = getFilteredGames();
  if (games.length === 0) {
    grid.innerHTML = '<div class="empty-state"><div class="empty-icon">🎮</div><p>没有找到匹配的游戏</p></div>';
    return;
  }
  grid.innerHTML = games.map(function(g) {
    var achPct = g.totalAchievements > 0 ? Math.round(g.achievements / g.totalAchievements * 100) : 0;
    var badgeClass = g.rating >= 9.5 ? "legendary" : g.rating >= 9 ? "epic" : g.rating >= 8.5 ? "rare" : "common";
    var badges = '<span class="rating-badge ' + badgeClass + '">' + g.rating + '</span>';
    if (g.perfect) badges += '<span class="perfect-badge">💯 白金</span>';
    if (g.recent) badges += '<span class="recent-badge">近期</span>';
    return '<div class="game-card" data-id="' + g.id + '">' +
      '<div class="game-img"><img src="' + g.img + '" alt="' + g.name + '" loading="lazy"><div class="game-badges">' + badges + '</div></div>' +
      '<div class="game-info"><h3>' + g.name + '</h3><p class="game-meta">' + g.genre + ' · ' + g.developer + '</p>' +
      '<div class="game-stats"><span>⏱ ' + g.playtime + 'h</span>' +
      (g.totalAchievements > 0 ? '<span>🏆 ' + g.achievements + '/' + g.totalAchievements + '</span>' : '') +
      '</div>' +
      (g.totalAchievements > 0 ? '<div class="ach-bar"><div class="ach-fill" style="width:' + achPct + '%"></div></div>' : '') +
      '</div></div>';
  }).join("");
}

function initTools() {
  var grid = document.getElementById("toolsGrid");
  if (!grid) return;
  grid.innerHTML = TOOLS.map(function(t) {
    return '<div class="tool-card" data-tool="' + t.action + '"><div class="tool-icon">' + t.icon + '</div><div class="tool-info"><h4>' + t.name + '</h4><p>' + t.desc + '</p></div></div>';
  }).join("");
  grid.querySelectorAll(".tool-card").forEach(function(card) {
    card.addEventListener("click", function() {
      var tool = card.dataset.tool;
      if (tool === "achievements") showNotification("成就追踪器已加载", "success");
      else if (tool === "recommend") showNotification("正在分析游戏偏好...", "success");
      else if (tool === "playtime") showNotification("游玩时长统计已生成", "success");
      else showNotification("功能开发中", "success");
    });
  });
}

function initStats() {
  var stats = { total: GAMES.length, playtime: 0, perfect: 0, avg: 0 };
  GAMES.forEach(function(g) {
    stats.playtime += g.playtime;
    if (g.perfect) stats.perfect++;
    stats.avg += g.rating;
  });
  stats.avg = (stats.avg / GAMES.length).toFixed(1);
  animateCounter("totalGames", 0, stats.total, 1500);
  animateCounter("totalPlaytime", 0, stats.playtime, 2000);
  animateCounter("avgRating", 0, parseFloat(stats.avg), 1500);
  animateCounter("perfectGames", 0, stats.perfect, 1000);
}

function animateCounter(id, start, end, duration) {
  var el = document.getElementById(id);
  if (!el) return;
  var startTime = null;
  var isFloat = !Number.isInteger(end);
  function step(ts) {
    if (!startTime) startTime = ts;
    var progress = Math.min((ts - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = start + (end - start) * eased;
    el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initWidgets() {
  // Pomodoro
  updatePomodoroDisplay();
  var pStart = document.getElementById("pomodoroStart");
  var pReset = document.getElementById("pomodoroReset");
  if (pStart) pStart.addEventListener("click", togglePomodoro);
  if (pReset) pReset.addEventListener("click", resetPomodoro);

  // Notes
  var notes = document.getElementById("notesArea");
  var saved = localStorage.getItem("gaming-hub-notes");
  if (notes && saved) notes.value = saved;
  var notesSave = document.getElementById("notesSave");
  if (notesSave) notesSave.addEventListener("click", function() {
    var area = document.getElementById("notesArea");
    if (area) { localStorage.setItem("gaming-hub-notes", area.value); showNotification("笔记已保存", "success"); }
  });

  // Quick Links
  var linksGrid = document.getElementById("quickLinksGrid");
  if (linksGrid) {
    linksGrid.innerHTML = QUICK_LINKS.map(function(l) {
      return '<a href="' + l.url + '" target="_blank" class="link-card"><span class="link-icon">' + l.icon + '</span><span>' + l.name + '</span></a>';
    }).join("");
  }

  // Contact
  var contactForm = document.getElementById("contactForm");
  if (contactForm) contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    showNotification("消息已发送！", "success");
    contactForm.reset();
  });
}

function togglePomodoro() {
  if (pomodoroRunning) {
    clearInterval(pomodoroInterval);
    pomodoroRunning = false;
    var btn = document.getElementById("pomodoroStart");
    if (btn) btn.textContent = "开始";
  } else {
    pomodoroRunning = true;
    var btn = document.getElementById("pomodoroStart");
    if (btn) btn.textContent = "暂停";
    pomodoroInterval = setInterval(function() {
      pomodoroTime--;
      updatePomodoroDisplay();
      if (pomodoroTime <= 0) {
        clearInterval(pomodoroInterval);
        pomodoroRunning = false;
        showNotification("🍅 番茄钟完成！休息一下吧", "success");
        pomodoroTime = pomodoroTotal;
        updatePomodoroDisplay();
        var btn = document.getElementById("pomodoroStart");
        if (btn) btn.textContent = "开始";
      }
    }, 1000);
  }
}

function resetPomodoro() {
  clearInterval(pomodoroInterval);
  pomodoroRunning = false;
  pomodoroTime = pomodoroTotal;
  updatePomodoroDisplay();
  var btn = document.getElementById("pomodoroStart");
  if (btn) btn.textContent = "开始";
}

function updatePomodoroDisplay() {
  var min = Math.floor(pomodoroTime / 60);
  var sec = pomodoroTime % 60;
  var display = document.getElementById("pomodoroTime");
  if (display) display.textContent = String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
  var progress = document.getElementById("pomodoroProgress");
  if (progress) {
    var pct = ((pomodoroTotal - pomodoroTime) / pomodoroTotal) * 100;
    progress.style.background = "conic-gradient(#7c6cf0 " + pct + "%, rgba(255,255,255,0.1) 0%)";
  }
}

function showNotification(msg, type) {
  var existing = document.querySelector(".notification");
  if (existing) existing.remove();
  var div = document.createElement("div");
  div.className = "notification " + (type || "");
  div.textContent = msg;
  document.body.appendChild(div);
  setTimeout(function() { div.classList.add("show"); }, 10);
  setTimeout(function() { div.classList.remove("show"); setTimeout(function() { div.remove(); }, 300); }, 3000);
}

document.addEventListener("DOMContentLoaded", function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".game-card, .tool-card, .stat-card, .widget").forEach(function(el) {
    el.classList.add("fade-in");
    observer.observe(el);
  });
});
