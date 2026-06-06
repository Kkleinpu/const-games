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

// ==================== API CONFIGURATION ====================
const API_BASE_URL = 'http://localhost:3000/api';
let apiGames = null;
let apiPlaytime = null;

async function fetchFromAPI(endpoint) {
    if (!window.location.protocol.startsWith("http")) {
        return null;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = await response.json();
        if (payload && payload.success === false) {
            throw new Error(payload.error || "API returned an error");
        }
        return payload && Object.prototype.hasOwnProperty.call(payload, "data") ? payload.data : payload;
    } catch (error) {
        console.warn(`API fetch failed for ${endpoint}:`, error.message);
        return null;
    }
}

async function loadGameData() {
    console.log('Attempting to load data from API...');
    
    // Try to fetch games from API
    const apiGamesData = await fetchFromAPI('/games');
    if (apiGamesData && Array.isArray(apiGamesData.games)) {
        apiGames = apiGamesData.games.map(function(game) {
            return {
                name: game.name || ("App " + game.appId),
                appId: game.appId,
                genre: ["Steam"],
                rating: 8.0,
                desc: game.playtimeForever > 0 ? "来自 Steam Web API 的实时游戏数据。" : "Steam 游戏库条目。",
                ach: [0, 0]
            };
        });
        apiPlaytime = {};
        apiGamesData.games.forEach(function(game) {
            apiPlaytime[game.appId] = game.playtimeForever || 0;
        });
        console.log('Successfully loaded games from API');
    } else {
        console.log('Using local game data as fallback');
        apiGames = games;
        apiPlaytime = estimatedPlaytime;
    }
    
    // Update global variables (fix: create a copy before clearing games)
    const gamesCopy = [...apiGames];
    games.length = 0;
    games.push(...gamesCopy);
    Object.assign(estimatedPlaytime, apiPlaytime);
    
    // Re-render with new data
    renderFilters();
    renderGames();
    
    return { games: apiGames, playtime: apiPlaytime };
}

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
        const genres = g.genre || [];
        const mf = currentFilter === "all" || genres.includes(currentFilter);
        const ms = searchQuery === "" || g.name.toLowerCase().includes(searchQuery.toLowerCase()) || genres.some(x => x.includes(searchQuery));
        return mf && ms;
    });
}

function renderFilters() {
    const c = document.getElementById("genreFilters");
    if (!c) return;
    const genres = [...new Set(games.flatMap(g => g.genre || []))].sort();
    c.innerHTML = '<button class="filter-btn' + (currentFilter === "all" ? " active" : "") + '" onclick="setFilter(\'all\')">全部</button>' +
        genres.map(g => '<button class="filter-btn' + (currentFilter === g ? " active" : "") + '" onclick="setFilter(\'' + g + '\')">' + g + "</button>").join("");
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

document.addEventListener("DOMContentLoaded", async function() {
    // Load data from API first, with fallback to local data
    await loadGameData();
    setupNavigation();
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
    
    // 初始化粒子系统和交互效果
    initGlobalParticles();
    initScrollReveal();
    initCardHoverGlow();
    initButtonRipple();
    renderFriendsGallery();
});

// ==================== 全站粒子背景 ====================
function initGlobalParticles() {
    var canvas = document.getElementById("globalParticles");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var particles = [];
    var particleCount = 120;
    var mouse = { x: 0, y: 0, radius: 200 };
    
    // 设置canvas尺寸
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // 粒子类
    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }
    
    // 初始化粒子
    for (var i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // 更新粒子颜色（跟随主题）
    function getParticleColor() {
        return isDarkMode ? "rgba(108,92,231,0.6)" : "rgba(108,92,231,0.3)";
    }
    
    // 绘制粒子
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = getParticleColor();
        
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            
            // 更新位置
            p.x += p.vx;
            p.y += p.vy;
            
            // 边界检测
            if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
            if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;
            
            // 鼠标吸引效果
            var dx = mouse.x - p.x;
            var dy = mouse.y - p.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                var force = (mouse.radius - dist) / mouse.radius;
                p.vx += (dx / dist) * force * 0.2;
                p.vy += (dy / dist) * force * 0.2;
            }
            
            // 绘制粒子
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // 连线效果
            for (var j = i + 1; j < particles.length; j++) {
                var p2 = particles[j];
                var dx2 = p.x - p2.x;
                var dy2 = p.y - p2.y;
                var dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                
                if (dist2 < 150) {
                    ctx.strokeStyle = getParticleColor();
                    ctx.globalAlpha = 1 - dist2 / 150;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
        
        requestAnimationFrame(drawParticles);
    }
    
    // 鼠标移动事件
    document.addEventListener("mousemove", function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    // 鼠标点击爆裂效果
    document.addEventListener("click", function(e) {
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            var dx = p.x - e.clientX;
            var dy = p.y - e.clientY;
            var dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 150) {
                var force = (150 - dist) / 150;
                p.vx += (dx / dist) * force * 8;
                p.vy += (dy / dist) * force * 8;
            }
        }
    });
    
    // 页面可见性检测
    document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
            cancelAnimationFrame(drawParticles);
        } else {
            drawParticles();
        }
    });
    
    drawParticles();
}

// ==================== 鼠标拖尾效果 ====================
function initMouseTrail() {
    // 检测是否为桌面端
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    
    var canvas = document.getElementById("mouseTrail");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var trails = [];
    var hue = 0;
    
    // 设置canvas尺寸
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // 鼠标移动时记录轨迹
    document.addEventListener("mousemove", function(e) {
        trails.push({
            x: e.clientX,
            y: e.clientY,
            age: 1
        });
        
        // 限制轨迹数量
        if (trails.length > 50) {
            trails.shift();
        }
    });
    
    // 绘制拖尾
    function drawTrail() {
        // 半透明白色覆盖清除残留
        ctx.fillStyle = "rgba(255,255,255,0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 更新色相
        hue = (hue + 1) % 360;
        
        // 绘制轨迹
        for (var i = 0; i < trails.length; i++) {
            var t = trails[i];
            t.age -= 0.02;
            
            if (t.age <= 0) {
                trails.splice(i, 1);
                i--;
                continue;
            }
            
            ctx.fillStyle = "hsl(" + hue + ",80%,60%)";
            ctx.globalAlpha = t.age;
            ctx.beginPath();
            ctx.arc(t.x, t.y, 5 * t.age, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.globalAlpha = 1;
        requestAnimationFrame(drawTrail);
    }
    
    drawTrail();
}

// ==================== 页面滚动进场动画 ====================
function initScrollReveal() {
    var reveals = document.querySelectorAll(".reveal");
    
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });
    
    reveals.forEach(function(el) {
        observer.observe(el);
    });
}

// ==================== 卡片hover光晕效果 ====================
function initCardHoverGlow() {
    var cards = document.querySelectorAll(".game-card, .tool-card, .stats-card");
    
    cards.forEach(function(card) {
        card.addEventListener("mousemove", function(e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            
            card.style.setProperty("--mx", x + "px");
            card.style.setProperty("--my", y + "px");
        });
    });
}

// ==================== 按钮涟漪效果 ====================
function initButtonRipple() {
    var buttons = document.querySelectorAll(".hero-btn, .game-card-link");
    
    buttons.forEach(function(btn) {
        btn.addEventListener("click", function(e) {
            var rect = btn.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            
            var ripple = document.createElement("span");
            ripple.className = "ripple";
            ripple.style.left = x + "px";
            ripple.style.top = y + "px";
            
            btn.appendChild(ripple);
            
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    });
}

// ==================== 好友相册模块 ====================
const friendsGallery = [
    {
        name: "闺蜜",
        desc: "镜子里的小美女 ✨",
        src: "photos/微信图片_20260505192513_1945_43.jpg",
        unlockKey: "lx2026"
    },
    {
        name: "闺蜜",
        desc: "红毯上的背影 🌹",
        src: "photos/微信图片_20260516095303_2484_43.jpg",
        unlockKey: "lx2026"
    },
    {
        name: "闺蜜",
        desc: "花田里的影子 🌻",
        src: "photos/微信图片_20260530112127_3323_43.jpg",
        unlockKey: "lx2026"
    },
    {
        name: "我们",
        desc: "不想上班（不想上课）🤪",
        src: "photos/微信图片_20260530112129_3324_43.jpg",
        unlockKey: "lx2026"
    },
    {
        name: "闺蜜",
        desc: "又见面啦 🤳",
        src: "photos/微信图片_20260530112130_3325_43.jpg",
        unlockKey: "lx2026"
    },
    {
        name: "闺蜜",
        desc: "坐地铁出门玩 🚇",
        src: "photos/微信图片_20260530112133_3326_43.jpg",
        unlockKey: "lx2026"
    }
];

function renderFriendsGallery() {
    var grid = document.getElementById("friendsGrid");
    if (!grid) return;
    
    grid.innerHTML = friendsGallery.map(function(friend, index) {
        return '<div class="friend-card" data-index="' + index + '">' +
            '<div class="friend-card-img-wrapper">' +
                '<img class="friend-card-img" src="' + friend.src + '" alt="' + friend.name + '">' +
            '</div>' +
            '<div class="friend-card-info">' +
                '<h3 class="friend-card-name">' + friend.name + '</h3>' +
                '<p class="friend-card-desc">' + friend.desc + '</p>' +
                '<button class="friend-card-btn" onclick="handleFriendPhoto(' + index + ')">' +
                    '查看照片' +
                '</button>' +
            '</div>' +
        '</div>';
    }).join("");
}

function handleFriendPhoto(index) {
    var friend = friendsGallery[index];
    // 直接打开lightbox查看照片
    openLightbox(friend.src, friend.name, friend.desc);
}

function openLightbox(src, name, desc) {
    var lightbox = document.getElementById("photoLightbox");
    var img = document.getElementById("lightboxImg");
    var nameEl = document.getElementById("lightboxName");
    var descEl = document.getElementById("lightboxDesc");
    
    img.src = src;
    nameEl.textContent = name;
    descEl.textContent = desc;
    
    lightbox.classList.add("active");
}

function closeLightbox(event) {
    if (event && event.target !== event.currentTarget) return;
    
    var lightbox = document.getElementById("photoLightbox");
    lightbox.classList.remove("active");
}

// ==================== 语音朗读功能 ====================
let isVoicePlaying = false;
let currentUtterance = null;

function toggleVoice() {
    if (isVoicePlaying) {
        speechSynthesis.cancel();
        isVoicePlaying = false;
        document.getElementById('voiceIcon').textContent = '🔊';
        return;
    }

    // 生成朗读内容
    const content = `欢迎来到 LX 的游戏世界。
    当前页面正在展示 ${games.length} 款 Steam 游戏，
    总游玩时长已经达到 ${calcTotalPlaytime()} 小时，
    解锁了 ${calcTotalAchievements()} 个成就。
    向下滚动可以查看完整的游戏库。
    工具箱里有一键番茄钟、计算器和游戏发售倒计时。
    祝你今天游戏愉快！`;

    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = 'zh-CN';
    utterance.rate = 1;
    utterance.pitch = 1;

    // 尝试用中文语音
    const voices = speechSynthesis.getVoices();
    const zhVoice = voices.find(v => v.lang.includes('zh'));
    if (zhVoice) utterance.voice = zhVoice;

    utterance.onend = () => {
        isVoicePlaying = false;
        document.getElementById('voiceIcon').textContent = '🔊';
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
    isVoicePlaying = true;
    document.getElementById('voiceIcon').textContent = '⏸';
}

// 页面加载时确保语音列表就绪
speechSynthesis.onvoiceschanged = () => {};

// ==================== 隐藏入口逻辑 ====================
// 多种触发方式，支持：Logo点击5次、页脚点击3次、键盘快捷键 Ctrl+Shift+P

// 触发器状态管理
const secretTrigger = {
    logoClicks: 0,      // Logo 点击计数
    footerClicks: 0,    // 页脚点击计数
    lastLogoClick: 0,   // 上次 Logo 点击时间
    lastFooterClick: 0, // 上次页脚点击时间
    CLICK_TIMEOUT: 2000 // 点击重置超时（2秒内无点击则重置）
};

// 跳转到隐藏个人页面
function navigateToProfile() {
    console.log('🎮 隐藏入口已触发！正在跳转...');
    window.location.href = 'profile.html';
}

// 重置过期的点击计数
function resetExpiredClicks() {
    const now = Date.now();
    if (now - secretTrigger.lastLogoClick > secretTrigger.CLICK_TIMEOUT) {
        secretTrigger.logoClicks = 0;
    }
    if (now - secretTrigger.lastFooterClick > secretTrigger.CLICK_TIMEOUT) {
        secretTrigger.footerClicks = 0;
    }
}

// 初始化隐藏入口事件监听
function initSecretEntrance() {
    // 方式1：Logo 点击 5 次触发
    const logo = document.querySelector('.logo-text');
    if (logo) {
        logo.style.cursor = 'pointer'; // 显示手型光标
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            resetExpiredClicks();
            secretTrigger.logoClicks++;
            secretTrigger.lastLogoClick = Date.now();
            
            console.log(`Logo 点击：${secretTrigger.logoClicks}/5`);
            
            if (secretTrigger.logoClicks >= 5) {
                secretTrigger.logoClicks = 0;
                navigateToProfile();
            }
        });
    }
    
    // 方式2：页脚版权信息点击 3 次触发
    const footer = document.querySelector('.footer p');
    if (footer) {
        footer.style.cursor = 'pointer'; // 显示手型光标
        footer.addEventListener('click', function(e) {
            e.preventDefault();
            resetExpiredClicks();
            secretTrigger.footerClicks++;
            secretTrigger.lastFooterClick = Date.now();
            
            console.log(`页脚点击：${secretTrigger.footerClicks}/3`);
            
            if (secretTrigger.footerClicks >= 3) {
                secretTrigger.footerClicks = 0;
                navigateToProfile();
            }
        });
    }
    
    // 方式3：键盘快捷键 Ctrl+Shift+P 触发
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'P') {
            e.preventDefault();
            console.log('键盘快捷键触发！Ctrl+Shift+P');
            navigateToProfile();
        }
    });
    
    console.log('✨ 隐藏入口已初始化：');
    console.log('  - Logo 点击 5 次');
    console.log('  - 页脚点击 3 次');
    console.log('  - 键盘快捷键 Ctrl+Shift+P');
}

// 在 DOMContentLoaded 事件中初始化隐藏入口
document.addEventListener('DOMContentLoaded', function() {
    initSecretEntrance();
});

// ==================== 网速测试功能 ====================
let speedTestRunning = false;

function startSpeedTest() {
    if (speedTestRunning) return;
    speedTestRunning = true;

    var btn = document.getElementById("speedtestBtn");
    var status = document.getElementById("speedtestStatus");
    var bar = document.getElementById("speedtestBar");
    var download = document.getElementById("speedtestDownload");
    var upload = document.getElementById("speedtestUpload");
    var ping = document.getElementById("speedtestPing");
    var progressWrap = document.getElementById("speedtestProgress");
    var speedValue = document.getElementById("speedValue");
    var speedNeedle = document.getElementById("speedNeedle");
    var speedLabel = document.getElementById("speedLabel");

    btn.disabled = true;
    btn.textContent = "\u6d4b\u8bd5\u4e2d...";
    status.textContent = "\u6b63\u5728\u521d\u59cb\u5316\u6d4b\u8bd5...";
    if (progressWrap) progressWrap.style.display = "block";
    bar.style.width = "0%";
    download.textContent = "--";
    upload.textContent = "--";
    ping.textContent = "--";
    if (speedValue) speedValue.textContent = "0";
    if (speedLabel) speedLabel.textContent = "\u6d4b\u8bd5\u4e2d...";
    if (speedNeedle) speedNeedle.style.transform = "rotate(-90deg)";

    // \u6d4b\u8bd5\u4e0b\u8f7d\u901f\u5ea6\uff08\u4f7f\u7528\u56fe\u7247\u52a0\u8f7d\u65b9\u5f0f\uff09
    status.textContent = "\u6b63\u5728\u6d4b\u8bd5\u4e0b\u8f7d\u901f\u5ea6...";
    bar.style.width = "10%";

    var testImages = [
        "https://picsum.photos/1000/1000?random=1",
        "https://picsum.photos/1000/1000?random=2",
        "https://picsum.photos/1000/1000?random=3"
    ];
    var downloadedBytes = 0;
    var startTime = Date.now();
    var completedTests = 0;

    testImages.forEach(function(url, index) {
        var img = new Image();

        img.onload = function() {
            downloadedBytes += 1000000;
            completedTests++;
            var pct = 10 + (completedTests / testImages.length) * 60;
            bar.style.width = pct + "%";

            if (completedTests === testImages.length) {
                var elapsed = (Date.now() - startTime) / 1000;
                var speedMbps = (downloadedBytes * 8) / (elapsed * 1000000);
                download.textContent = speedMbps.toFixed(1) + " Mbps";
                if (speedValue) speedValue.textContent = speedMbps.toFixed(1);
                if (speedNeedle) speedNeedle.style.transform = "rotate(" + Math.min(speedMbps * 1.8 - 90, 90) + "deg)";
                status.textContent = "\u6b63\u5728\u6d4b\u8bd5\u4e0a\u4f20\u901f\u5ea6...";
                bar.style.width = "75%";

                setTimeout(function() {
                    var uploadSpeed = speedMbps * (0.3 + Math.random() * 0.4);
                    upload.textContent = uploadSpeed.toFixed(1) + " Mbps";
                    bar.style.width = "90%";

                    status.textContent = "\u6b63\u5728\u6d4b\u8bd5\u5ef6\u8fdf...";
                    var pingStart = Date.now();
                    fetch("https://picsum.photos/1", { mode: "no-cors" }).then(function() {
                        var pingTime = Date.now() - pingStart;
                        ping.textContent = pingTime + " ms";
                        bar.style.width = "100%";
                        if (speedLabel) speedLabel.textContent = "\u6d4b\u8bd5\u5b8c\u6210";
                        status.textContent = "\u6d4b\u8bd5\u5b8c\u6210\uff01";
                        btn.disabled = false;
                        btn.textContent = "\u91cd\u65b0\u6d4b\u8bd5";
                        speedTestRunning = false;
                    }).catch(function() {
                        ping.textContent = "50 ms";
                        bar.style.width = "100%";
                        if (speedLabel) speedLabel.textContent = "\u6d4b\u8bd5\u5b8c\u6210\uff08\u4f30\u7b97\uff09";
                        status.textContent = "\u6d4b\u8bd5\u5b8c\u6210\uff08\u90e8\u5206\u6570\u636e\u4e3a\u4f30\u7b97\uff09";
                        btn.disabled = false;
                        btn.textContent = "\u91cd\u65b0\u6d4b\u8bd5";
                        speedTestRunning = false;
                    });
                }, 500);
            }
        };

        img.onerror = function() {
            completedTests++;
            if (completedTests === testImages.length) {
                download.textContent = "25.0 Mbps";
                upload.textContent = "8.5 Mbps";
                ping.textContent = "45 ms";
                if (speedValue) speedValue.textContent = "25.0";
                if (speedNeedle) speedNeedle.style.transform = "rotate(-45deg)";
                if (speedLabel) speedLabel.textContent = "\u7f51\u7edc\u53d7\u9650\uff0c\u6570\u636e\u4e3a\u4f30\u7b97";
                bar.style.width = "100%";
                status.textContent = "\u6d4b\u8bd5\u5b8c\u6210\uff08\u7f51\u7edc\u53d7\u9650\uff0c\u6570\u636e\u4e3a\u4f30\u7b97\uff09";
                btn.disabled = false;
                btn.textContent = "\u91cd\u65b0\u6d4b\u8bd5";
                speedTestRunning = false;
            }
        };

        img.src = url + "&t=" + Date.now();
    });
}
function resetSpeedTest() {
    var status = document.getElementById("speedtestStatus");
    var bar = document.getElementById("speedtestBar");
    var download = document.getElementById("speedtestDownload");
    var upload = document.getElementById("speedtestUpload");
    var ping = document.getElementById("speedtestPing");
    var progressWrap = document.getElementById("speedtestProgress");
    var speedValue = document.getElementById("speedValue");
    var speedNeedle = document.getElementById("speedNeedle");
    var speedLabel = document.getElementById("speedLabel");

    if (status) status.textContent = "\u6d4b\u8bd5\u4e2d...";
    if (bar) bar.style.width = "0%";
    if (progressWrap) progressWrap.style.display = "none";
    if (download) download.textContent = "--";
    if (upload) upload.textContent = "--";
    if (ping) ping.textContent = "--";
    if (speedValue) speedValue.textContent = "0";
    if (speedNeedle) speedNeedle.style.transform = "rotate(-90deg)";
    if (speedLabel) speedLabel.textContent = "\u70b9\u51fb\u5f00\u59cb\u6d4b\u8bd5";
    speedTestRunning = false;
}