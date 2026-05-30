// ==================== GAME DATA ====================
const games = [
    { name: "Grand Theft Auto V", appId: 271590, genre: ["动作", "开放世界", "犯罪"], rating: 9.5, desc: "洛圣都的传奇故事，三个主角的命运交织。", ach: [77, 77] },
    { name: "Counter-Strike 2", appId: 730, genre: ["射击", "竞技", "多人"], rating: 9.0, desc: "经典竞技射击，5v5战术对抗。", ach: [1, 1] },
    { name: "Alien Swarm: Reactive Drop", appId: 563560, genre: ["射击", "合作", "免费"], rating: 8.2, desc: "异形丛生，合作科幻射击游戏。", ach: [64, 198] },
    { name: "Wallpaper Engine", appId: 431960, genre: ["工具", "创意", "桌面"], rating: 9.6, desc: "动态壁纸引擎，打造个性化桌面。", ach: [3, 17] },
    { name: "Plants vs. Zombies: GW2", appId: 1924480, genre: ["射击", "休闲", "多人"], rating: 8.3, desc: "植物与僵尸的疯狂射击大战。", ach: [0, 63] },
    { name: "It Takes Two", appId: 1426210, genre: ["冒险", "合作", "平台"], rating: 9.4, desc: "双人合作冒险，讲述一对夫妻的奇妙旅程。", ach: [0, 20] },
    { name: "Detroit: Become Human", appId: 1222670, genre: ["冒险", "剧情", "互动"], rating: 9.3, desc: "底特律的未来，关于人工智能与人性的故事。", ach: [3, 48] },
    { name: "WRC 7", appId: 631520, genre: ["竞速", "赛车", "模拟"], rating: 7.8, desc: "世界汽车拉力锦标赛官方游戏。", ach: [3, 41] },
    { name: "7 Days to Die", appId: 251570, genre: ["生存", "恐怖", "开放世界"], rating: 8.0, desc: "末日僵尸生存，建造堡垒抵御尸潮。", ach: [8, 43] },
    { name: "GTA V Enhanced", appId: 3240220, genre: ["动作", "开放世界", "犯罪"], rating: 9.0, desc: "GTA V 增强版，画面升级体验更佳。", ach: [4, 77] },
    { name: "Hitman: Absolution", appId: 203140, genre: ["潜行", "动作", "暗杀"], rating: 7.9, desc: "化身代号47，执行精密暗杀任务。", ach: [11, 47] },
    { name: "Battlefield 1", appId: 1238810, genre: ["射击", "战争", "多人"], rating: 8.8, desc: "回到第一次世界大战，体验史诗般的战场。", ach: [3, 50] },
    { name: "PUBG: BATTLEGROUNDS", appId: 578080, genre: ["射击", "大逃杀", "多人"], rating: 8.0, desc: "百人跳伞求生，最后一个站着的人获胜。", ach: [0, 37] },
    { name: "Overwatch", appId: 2357570, genre: ["射击", "多人", "竞技"], rating: 8.4, desc: "守望先锋，英雄射击团队竞技。", ach: [0, 164] },
    { name: "Crime Scene Cleaner", appId: 2909530, genre: ["模拟", "休闲", "独立"], rating: 7.5, desc: "犯罪现场清理专家，专业模拟体验。" },
    { name: "Fallout Shelter", appId: 588430, genre: ["模拟", "策略", "免费"], rating: 7.8, desc: "避难所经营，管理你的地下社区。", ach: [0, 35] },
    { name: "100% Orange Juice", appId: 282800, genre: ["休闲", "策略", "桌游"], rating: 8.0, desc: "百分百橙汁，可爱的桌游风格派对游戏。", ach: [0, 359] },
    { name: "Half-Life 2", appId: 220, genre: ["射击", "科幻", "经典"], rating: 9.6, desc: "半条命2，FPS游戏的里程碑之作。", ach: [0, 69] },
    { name: "Metro: Last Light", appId: 43160, genre: ["射击", "恐怖", "末日"], rating: 8.9, desc: "地铁：最后的曙光，末日莫斯科的冒险。", ach: [0, 70] },
    { name: "Tell Me Why", appId: 1180660, genre: ["冒险", "剧情", "互动"], rating: 8.2, desc: "告诉我为什么，双胞胎的神秘往事。", ach: [0, 30] }
];

const steamImg = "https://cdn.akamai.steamstatic.com/steam/apps/";

const estimatedPlaytime = {
    271590: 11202, 730: 6978, 563560: 5778, 431960: 4464,
    1924480: 2124, 1426210: 1320, 1222670: 1242, 631520: 888,
    251570: 642, 3240220: 552, 203140: 522, 1238810: 222,
    578080: 144, 2357570: 120, 2909530: 120, 588430: 120,
    282800: 0, 220: 0, 43160: 0, 1180660: 0
};

const allGenres = [...new Set(games.flatMap(g => g.genre))].sort();
let currentFilter = "all";
let searchQuery = "";
let sortBy = "rating";

function getPlaytime(appId) { return estimatedPlaytime[appId] || 0; }
function formatPlaytime(m) {
    if (m === 0) return "未游玩";
    const h = Math.floor(m / 60);
    return h >= 100 ? h + " 小时" : h + " 小时 " + (m % 60) + " 分钟";
}
function renderRating(r) {
    const s = Math.floor(r / 2);
    const h = r % 2 >= 0.5 ? 1 : 0;
    return "\u2605".repeat(s) + (h ? "\u00BD" : "") + "\u2606".repeat(5 - s - h);
}

function getFilteredGames() {
    return games.filter(g => {
        const mf = currentFilter === "all" || g.genre.includes(currentFilter);
        const ms = searchQuery === "" || g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.genre.some(x => x.includes(searchQuery));
        return mf && ms;
    });
}

function renderFilters() {
    const c = document.getElementById("genreFilters");
    c.innerHTML = '<button class="filter-btn' + (currentFilter === "all" ? " active" : "") + '" onclick="setFilter(\'all\')">全部</button>' +
        allGenres.map(g => '<button class="filter-btn' + (currentFilter === g ? " active" : "") + '" onclick="setFilter(\'' + g + '\')">' + g + "</button>").join("");
}

function setFilter(genre) { currentFilter = genre; renderFilters(); renderGames(); }
function handleSearch(e) { searchQuery = e.target.value; renderGames(); }

function setSort(s) {
    sortBy = s;
    document.querySelectorAll(".sort-btn").forEach(b => b.classList.toggle("active", b.dataset.sort === s));
    renderGames();
}

function renderGames() {
    const grid = document.getElementById("gamesGrid");
    const filtered = getFilteredGames();
    const maxPt = Math.max(...games.map(g => getPlaytime(g.appId)), 1);
    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "playtime") return getPlaytime(b.appId) - getPlaytime(a.appId);
        return a.name.localeCompare(b.name);
    });
    if (sorted.length === 0) {
        grid.innerHTML = '<div class="no-results">\uD83C\uDFAE \u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u6E38\u620F</div>';
        return;
    }
    grid.innerHTML = sorted.map((game, i) => {
        const m = getPlaytime(game.appId);
        const h = Math.floor(m / 60);
        const pct = Math.min((m / maxPt) * 100, 100);
        const genres = game.genre.map(g => '<span class="game-card-genre">' + g + "</span>").join("");
        return '<div class="game-card" style="animation-delay:' + (i * 0.05) + 's">' +
            '<div class="game-card-img-wrapper"><img class="game-card-img" src="' + steamImg + game.appId + '/header.jpg" alt="' + game.name + '" loading="lazy" onerror="this.style.display=\'none\'">' +
            '<div class="game-card-rating"><span class="rating-stars">' + renderRating(game.rating) + '</span><span class="rating-number">' + game.rating + "</span></div></div>" +
            '<div class="game-card-body"><div class="game-card-title">' + game.name + "</div>" +
            '<div class="game-card-genres">' + genres + "</div>" +
            '<p class="game-card-desc">' + game.desc + "</p>" +
            '<div class="game-card-playtime-section"><div class="playtime-info"><span class="playtime-label">\u23F1 \u6E38\u73A9\u65F6\u957F</span><span class="playtime-value">' + formatPlaytime(m) + "</span></div>" +
            '<div class="playtime-bar-container"><div class="playtime-bar" style="width:' + pct + '%"></div></div>' +
            (h > 0 ? '<span class="playtime-hours">' + h + " \u5C0F\u65F6</span>" : "") + "</div>" +
            '<div class="game-card-footer"><a class="game-card-link" href="https://store.steampowered.com/app/' + game.appId + '" target="_blank" rel="noopener">Steam \u5546\u5E97</a>' +
            '<a class="game-card-link game-card-link-play" href="steam://run/' + game.appId + '" rel="noopener">\u25B6 \u542F\u52A8\u6E38\u620F</a></div></div></div>';
    }).join("");
    document.getElementById("gameCount").textContent = filtered.length;
}

function animateCounter(el, target, dur) {
    dur = dur || 1500;
    const t0 = performance.now();
    (function tick(t) {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
    })(t0);
}

function setupNavigation() {
    const links = document.querySelectorAll(".nav-links a");
    window.addEventListener("scroll", function() {
        var current = "";
        ["home", "games", "tools", "stats"].forEach(function(id) {
            var s = document.getElementById(id);
            if (s && s.getBoundingClientRect().top <= 200) current = id;
        });
        links.forEach(function(a) { a.classList.toggle("active", a.getAttribute("href") === "#" + current); });
    });
}

function setupScrollAnimations() {
    var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) { e.target.style.opacity = "1"; e.target.style.transform = "translateY(0)"; }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll(".game-card, .stats-card, .tool-card").forEach(function(el) {
        el.style.opacity = "0"; el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s ease-out"; obs.observe(el);
    });
}

function calcTotalPlaytime() {
    var total = 0;
    games.forEach(function(g) { total += getPlaytime(g.appId); });
    return Math.floor(total / 60);
}

function calcTotalAchievements() {
    var total = 0;
    games.forEach(function(g) { if (g.ach) total += g.ach[0]; });
    return total;
}

// ==================== CLOCK WIDGET ====================
function updateClock() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, "0");
    var m = String(now.getMinutes()).padStart(2, "0");
    var s = String(now.getSeconds()).padStart(2, "0");
    var timeStr = h + ":" + m + ":" + s;
    var heroTime = document.getElementById("heroClockTime");
    if (heroTime) heroTime.textContent = timeStr;
    var navClock = document.getElementById("navClock");
    if (navClock) navClock.textContent = h + ":" + m;
    var days = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
    var dateStr = now.getFullYear() + "\u5E74" + (now.getMonth() + 1) + "\u6708" + now.getDate() + "\u65E5 \u661F\u671F" + days[now.getDay()];
    var dateEl = document.getElementById("heroClockDate");
    if (dateEl) dateEl.textContent = dateStr;
    var tipEl = document.getElementById("heroClockTip");
    if (tipEl) {
        var hour = now.getHours();
        if (hour >= 0 && hour < 6) tipEl.textContent = "\uD83C\uDF19 \u591C\u6DF1\u4E86\uFF0C\u6CE8\u610F\u4F11\u606F\uFF01";
        else if (hour >= 6 && hour < 9) tipEl.textContent = "\uD83C\uDF05 \u65E9\u4E0A\u597D\uFF0C\u65B0\u7684\u4E00\u5929\u5F00\u59CB\u5566\uFF01";
        else if (hour >= 9 && hour < 12) tipEl.textContent = "\u2600\uFE0F \u4E0A\u5348\u597D\uFF0C\u6765\u4E00\u628A\u6E38\u620F\u653E\u677E\u4E00\u4E0B\uFF1F";
        else if (hour >= 12 && hour < 14) tipEl.textContent = "\uD83C\uDF71 \u5348\u996D\u65F6\u95F4\uFF0C\u522B\u5FD8\u4E86\u5403\u996D\uFF01";
        else if (hour >= 14 && hour < 18) tipEl.textContent = "\u2615 \u4E0B\u5348\u65F6\u5149\uFF0C\u9002\u5408\u6765\u4E00\u628A\u6E38\u620F\uFF01";
        else if (hour >= 18 && hour < 22) tipEl.textContent = "\uD83C\uDF06 \u665A\u4E0A\u597D\uFF0C\u4ECA\u5929\u73A9\u4EC0\u4E48\u6E38\u620F\uFF1F";
        else tipEl.textContent = "\uD83C\uDFAE \u591C\u95F4\u6E38\u620F\u65F6\u95F4\uFF0C\u4F46\u522B\u592A\u665A\u54E6\uFF01";
    }
}

// ==================== THEME TOGGLE ====================
var isDarkMode = true;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    var root = document.documentElement;
    if (isDarkMode) {
        root.style.setProperty("--bg-primary", "#0a0a0f");
        root.style.setProperty("--bg-secondary", "#12121a");
        root.style.setProperty("--bg-card", "rgba(26,26,46,0.8)");
        root.style.setProperty("--bg-card-hover", "rgba(34,34,58,0.9)");
        root.style.setProperty("--bg-card-solid", "#1a1a2e");
        root.style.setProperty("--text-primary", "#e8e8f0");
        root.style.setProperty("--text-secondary", "#8888a0");
        root.style.setProperty("--border", "rgba(255,255,255,0.06)");
        root.style.setProperty("--glass", "rgba(255,255,255,0.03)");
        document.getElementById("themeIcon").textContent = "\uD83C\uDF19";
    } else {
        root.style.setProperty("--bg-primary", "#f0f0f5");
        root.style.setProperty("--bg-secondary", "#e8e8f0");
        root.style.setProperty("--bg-card", "rgba(255,255,255,0.85)");
        root.style.setProperty("--bg-card-hover", "rgba(245,245,250,0.95)");
        root.style.setProperty("--bg-card-solid", "#ffffff");
        root.style.setProperty("--text-primary", "#1a1a2e");
        root.style.setProperty("--text-secondary", "#666680");
        root.style.setProperty("--border", "rgba(0,0,0,0.08)");
        root.style.setProperty("--glass", "rgba(255,255,255,0.5)");
        document.getElementById("themeIcon").textContent = "\u2600\uFE0F";
    }
    localStorage.setItem("gamingHubTheme", isDarkMode ? "dark" : "light");
}

var lastDailyGameIndex = -1;
function rollDailyGame() {
    var container = document.getElementById("dailyGame");
    var idx;
    do { idx = Math.floor(Math.random() * games.length); } while (idx === lastDailyGameIndex && games.length > 1);
    lastDailyGameIndex = idx;
    var game = games[idx];
    var genres = game.genre.map(function(g) { return '<span class="game-card-genre">' + g + '</span>'; }).join("");
    container.innerHTML = '<div class="daily-game-content">' +
        '<img class="daily-game-img" src="' + steamImg + game.appId + '/header.jpg" alt="' + game.name + '" loading="lazy">' +
        '<div class="daily-game-info"><div class="daily-game-name">' + game.name + '</div>' +
        '<div class="daily-game-genres">' + genres + '</div>' +
        '<p class="daily-game-desc">' + game.desc + '</p></div></div>';
}

function saveNotes() {
    var input = document.getElementById("notesInput");
    var cc = document.getElementById("notesCharCount");
    var ss = document.getElementById("notesSaveStatus");
    if (input) {
        localStorage.setItem("gamingHubNotes", input.value);
        if (cc) cc.textContent = input.value.length + " \u5B57";
        if (ss) { ss.textContent = "\u5DF2\u4FDD\u5B58 \u2713"; setTimeout(function() { ss.textContent = "\u81EA\u52A8\u4FDD\u5B58"; }, 1500); }
    }
}
function loadNotes() {
    var input = document.getElementById("notesInput");
    var cc = document.getElementById("notesCharCount");
    var saved = localStorage.getItem("gamingHubNotes");
    if (input && saved) { input.value = saved; if (cc) cc.textContent = saved.length + " \u5B57"; }
}
function clearNotes() {
    var input = document.getElementById("notesInput");
    var cc = document.getElementById("notesCharCount");
    if (input) { input.value = ""; localStorage.removeItem("gamingHubNotes"); if (cc) cc.textContent = "0 \u5B57"; }
}

var pomoState = { running: false, totalSeconds: 1500, remainingSeconds: 1500, interval: null, sessions: 0 };
function pomodoroToggle() { pomoState.running ? pomodoroPause() : pomodoroStart(); }
function pomodoroStart() {
    pomoState.running = true;
    var btn = document.getElementById("pomodoroStartBtn");
    if (btn) btn.textContent = "\u23F8 \u6682\u505C";
    pomoState.interval = setInterval(function() {
        pomoState.remainingSeconds--;
        if (pomoState.remainingSeconds <= 0) { pomoState.remainingSeconds = 0; pomodoroComplete(); }
        updatePomodoroDisplay();
    }, 1000);
}
function pomodoroPause() {
    pomoState.running = false;
    var btn = document.getElementById("pomodoroStartBtn");
    if (btn) btn.textContent = "\u25B6 \u7EE7\u7EED";
    if (pomoState.interval) { clearInterval(pomoState.interval); pomoState.interval = null; }
}
function pomodoroReset() {
    pomodoroPause();
    var mode = document.getElementById("pomodoroMode");
    pomoState.totalSeconds = parseInt(mode.value) * 60;
    pomoState.remainingSeconds = pomoState.totalSeconds;
    var btn = document.getElementById("pomodoroStartBtn");
    if (btn) btn.textContent = "\u25B6 \u5F00\u59CB";
    updatePomodoroDisplay();
}
function pomodoroComplete() {
    pomodoroPause();
    var mode = document.getElementById("pomodoroMode");
    if (parseInt(mode.value) >= 25) {
        pomoState.sessions++;
        var el = document.getElementById("pomodoroSessions");
        if (el) el.textContent = "\u4ECA\u65E5\u5B8C\u6210\uFF1A" + pomoState.sessions + " \u4E2A\u756A\u8304 \uD83C\uDF45";
    }
    try { var ctx = new (window.AudioContext || window.webkitAudioContext)(); var o = ctx.createOscillator(); var g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value = 800; g.gain.value = 0.3; o.start(); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5); o.stop(ctx.currentTime + 0.5); } catch(e) {}
    var btn = document.getElementById("pomodoroStartBtn");
    if (btn) btn.textContent = "\u25B6 \u5F00\u59CB";
}
function pomodoroChangeMode() { pomodoroReset(); }
function updatePomodoroDisplay() {
    var m = Math.floor(pomoState.remainingSeconds / 60);
    var s = pomoState.remainingSeconds % 60;
    var timeEl = document.getElementById("pomodoroTime");
    if (timeEl) timeEl.textContent = String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    var prog = document.getElementById("pomodoroProgress");
    if (prog) {
        var pct = 1 - (pomoState.remainingSeconds / pomoState.totalSeconds);
        var circ = 2 * Math.PI * 42;
        prog.style.strokeDashoffset = circ * (1 - pct);
        prog.style.stroke = pct > 0.8 ? "#fd79a8" : "#6c5ce7";
    }
    var label = document.getElementById("pomodoroLabel");
    if (label) {
        var mode = document.getElementById("pomodoroMode");
        var mv = parseInt(mode.value);
        if (pomoState.running) { label.textContent = mv >= 25 ? "\uD83C\uDF45 \u4E13\u6CE8\u4E2D..." : "\u2615 \u4F11\u606F\u4E2D..."; }
        else { label.textContent = mv >= 25 ? "\u4E13\u6CE8\u65F6\u95F4" : "\u4F11\u606F\u65F6\u95F4"; }
    }
}

var calcState = { display: "0", prev: null, op: null, fresh: true };
function calcInput(val) {
    if (val === "C") { calcState = { display: "0", prev: null, op: null, fresh: true }; }
    else if (val === "\u00B1") { calcState.display = String(-parseFloat(calcState.display)); }
    else if (val === "%") { calcState.display = String(parseFloat(calcState.display) / 100); }
    else if (["+","-","\u00D7","\u00F7"].includes(val)) { calcState.prev = parseFloat(calcState.display); calcState.op = val; calcState.fresh = true; }
    else if (val === "=") {
        if (calcState.prev !== null && calcState.op) {
            var curr = parseFloat(calcState.display); var result;
            switch (calcState.op) {
                case "+": result = calcState.prev + curr; break;
                case "-": result = calcState.prev - curr; break;
                case "\u00D7": result = calcState.prev * curr; break;
                case "\u00F7": result = curr === 0 ? "Error" : calcState.prev / curr; break;
            }
            calcState.display = typeof result === "number" ? String(Math.round(result * 1e10) / 1e10) : result;
            calcState.prev = null; calcState.op = null; calcState.fresh = true;
        }
    } else if (val === ".") {
        if (calcState.fresh) { calcState.display = "0."; calcState.fresh = false; }
        else if (!calcState.display.includes(".")) { calcState.display += "."; }
    } else {
        if (calcState.fresh) { calcState.display = val; calcState.fresh = false; }
        else { calcState.display = calcState.display === "0" ? val : calcState.display + val; }
    }
    var el = document.getElementById("calcDisplay");
    if (el) el.textContent = calcState.display;
}

function refreshWeather() {
    var conditions = [
        { icon: "\u2600\uFE0F", temp: 28, desc: "\u6674\u6717", humidity: "45%", wind: "8 km/h", feels: "30\u00B0C", vis: "15 km" },
        { icon: "\u26C5", temp: 24, desc: "\u591A\u4E91", humidity: "60%", wind: "12 km/h", feels: "25\u00B0C", vis: "12 km" },
        { icon: "\uD83C\uDF27\uFE0F", temp: 18, desc: "\u5C0F\u96E8", humidity: "85%", wind: "15 km/h", feels: "16\u00B0C", vis: "5 km" },
        { icon: "\uD83C\uDF24\uFE0F", temp: 26, desc: "\u6674\u95F4\u591A\u4E91", humidity: "55%", wind: "10 km/h", feels: "27\u00B0C", vis: "10 km" }
    ];
    var c = conditions[Math.floor(Math.random() * conditions.length)];
    document.getElementById("weatherIcon").textContent = c.icon;
    document.getElementById("weatherTemp").textContent = c.temp + "\u00B0C";
    document.getElementById("weatherDesc").textContent = c.desc;
    document.getElementById("weatherHumidity").textContent = c.humidity;
    document.getElementById("weatherWind").textContent = c.wind;
    document.getElementById("weatherFeelsLike").textContent = c.feels;
    document.getElementById("weatherVisibility").textContent = c.vis;
}

var upcomingGames = [
    { name: "GTA VI", icon: "\uD83C\uDF34", date: "2026-09-17" },
    { name: "Fable", icon: "\uD83E\uDDDA", date: "2026-10-15" },
    { name: "DOOM: The Dark Ages", icon: "\u2694\uFE0F", date: "2026-06-15" },
    { name: "Borderlands 4", icon: "\uD83D\uDD2B", date: "2026-12-01" }
];
function renderCountdowns() {
    var container = document.getElementById("countdownList");
    if (!container) return;
    var now = new Date();
    container.innerHTML = upcomingGames.map(function(game) {
        var diff = new Date(game.date) - now;
        var days = Math.ceil(diff / 86400000);
        var uc = days <= 30 ? " urgent" : "";
        var bt = days > 0 ? days + " \u5929" : "\u5DF2\u53D1\u552E";
        return '<div class="countdown-item"><span class="countdown-icon">' + game.icon + '</span>' +
            '<div class="countdown-info"><div class="countdown-name">' + game.name + '</div>' +
            '<div class="countdown-date">\u53D1\u552E\u65E5\u671F\uFF1A' + game.date + '</div></div>' +
            '<span class="countdown-badge' + uc + '">' + bt + '</span></div>';
    }).join("");
}

function detectSystemInfo() {
    var r = document.getElementById("sysResolution"); if (r) r.textContent = screen.width + " \u00D7 " + screen.height;
    var l = document.getElementById("sysLang"); if (l) l.textContent = navigator.language || "-";
    var tz = document.getElementById("sysTimezone"); if (tz) { try { tz.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch(e) { tz.textContent = "UTC"; } }
    var on = document.getElementById("sysOnline"); if (on) on.textContent = navigator.onLine ? "\u5728\u7EBF \uD83D\uDFE2" : "\u79BB\u7EBF \uD83D\uDD34";
    var br = document.getElementById("sysBrowser");
    if (br) { var ua = navigator.userAgent; if (ua.includes("Firefox")) br.textContent = "Firefox"; else if (ua.includes("Edg")) br.textContent = "Edge"; else if (ua.includes("Chrome")) br.textContent = "Chrome"; else if (ua.includes("Safari")) br.textContent = "Safari"; else br.textContent = "\u5176\u4ED6"; }
    var os = document.getElementById("sysOS");
    if (os) { var ua2 = navigator.userAgent; if (ua2.includes("Win")) os.textContent = "Windows"; else if (ua2.includes("Mac")) os.textContent = "macOS"; else if (ua2.includes("Linux")) os.textContent = "Linux"; else os.textContent = "\u5176\u4ED6"; }
}

document.addEventListener("DOMContentLoaded", function() {
    renderFilters(); renderGames(); setupNavigation();
    var savedTheme = localStorage.getItem("gamingHubTheme");
    if (savedTheme === "light") { isDarkMode = true; toggleTheme(); }
    setTimeout(function() {
        animateCounter(document.getElementById("gameCount"), games.length);
        animateCounter(document.getElementById("totalHours"), calcTotalPlaytime());
        animateCounter(document.getElementById("achievementCount"), calcTotalAchievements());
    }, 500);
    setTimeout(setupScrollAnimations, 600);
    updateClock(); setInterval(updateClock, 1000);
    loadNotes(); updatePomodoroDisplay(); renderCountdowns(); refreshWeather(); detectSystemInfo();
    var statsEl = document.getElementById("statsTotalHours");
    if (statsEl) statsEl.textContent = calcTotalPlaytime() + " 小时";
});
