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
const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? '/api' : null;
let apiGames = null;
let apiPlaytime = null;
let steamDataMode = "local";
let steamDataMessage = "Local Memory";

async function fetchFromAPI(endpoint) {
    if (!API_BASE_URL || !window.location.protocol.startsWith("http")) {
        steamDataMode = "local";
        steamDataMessage = "Static GitHub Pages";
        return null;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = await response.json();
        if (payload && payload.success === false) {
            throw new Error(payload.error || "API returned an error");
        }
        steamDataMode = "steam";
        steamDataMessage = "Steam API Live";
        return payload && Object.prototype.hasOwnProperty.call(payload, "data") ? payload.data : payload;
    } catch (error) {
        console.warn(`API fetch failed for ${endpoint}:`, error.message);
        steamDataMode = "local";
        steamDataMessage = error && error.message ? "Local Cache · " + error.message : "Local Cache";
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
        steamDataMode = "local";
        if (!steamDataMessage || steamDataMessage === "Steam API Live") steamDataMessage = "Local Cache";
    }
    
    // Update global variables (fix: create a copy before clearing games)
    const gamesCopy = [...apiGames];
    games.length = 0;
    games.push(...gamesCopy);
    Object.assign(estimatedPlaytime, apiPlaytime);
    
    // Re-render with new data
    renderFilters();
    renderArchiveFilters();
    renderGames();
    updateHomeDashboard();
    renderYearReport();
    
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
let archiveFilter = "all";
let searchQuery = "";
let sortBy = "rating";
const SITE_BASE_URL = "https://kkleinpu.github.io/const-games/";
const guestMode = new URLSearchParams(window.location.search).has("guest");

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

function getAchievementProgress(game) {
    if (!game.ach || !game.ach[1]) return 0;
    return game.ach[0] / game.ach[1];
}

function getGameArchiveStatus(game) {
    var minutes = getPlaytime(game.appId);
    var progress = getAchievementProgress(game);
    if (progress >= 1) return { key: "completed", label: "完全渗透", tone: "gold" };
    if (minutes === 0) return { key: "backlog", label: "未启动", tone: "muted" };
    if (minutes >= 3000) return { key: "deep", label: "高时长", tone: "cyan" };
    return { key: "active", label: "进行中", tone: "green" };
}

function getGameVisualClass(game) {
    var minutes = getPlaytime(game.appId);
    var progress = getAchievementProgress(game);
    var rating = game.rating || 0;
    var classes = [];
    if (progress >= 1) classes.push("game-tier-completed");
    if (minutes === 0) {
        classes.push("game-tier-muted");
    } else if (minutes >= 3000 || rating >= 9.2 || progress >= 1) {
        classes.push("game-tier-featured");
    }
    if (!classes.length) classes.push("game-tier-standard");
    return classes.join(" ");
}

function getGameRecommendation(game) {
    var minutes = getPlaytime(game.appId);
    var progress = getAchievementProgress(game);
    if (progress >= 1) return "已完全渗透，适合作为主页荣誉样本。";
    if (minutes === 0) return "还没启动，适合加入补完清单。";
    if ((game.rating || 0) >= 9) return "高评分任务，值得继续推进。";
    if (minutes >= 3000) return "高时长档案，已经形成主力游戏记录。";
    return "常规档案，可继续观察体验。";
}

function getFilteredGames() {
    return games.filter(g => {
        const genres = g.genre || [];
        const mf = currentFilter === "all" || genres.includes(currentFilter);
        const ms = searchQuery === "" || g.name.toLowerCase().includes(searchQuery.toLowerCase()) || genres.some(x => x.includes(searchQuery));
        const status = getGameArchiveStatus(g);
        const af = archiveFilter === "all" ||
            archiveFilter === status.key ||
            (archiveFilter === "played" && getPlaytime(g.appId) > 0) ||
            (archiveFilter === "high-rating" && (g.rating || 0) >= 9);
        return mf && ms && af;
    });
}

function renderFilters() {
    const c = document.getElementById("genreFilters");
    if (!c) return;
    const genres = [...new Set(games.flatMap(g => g.genre || []))].sort();
    c.innerHTML = '<button class="filter-btn' + (currentFilter === "all" ? " active" : "") + '" onclick="setFilter(\'all\')">全部</button>' +
        genres.map(g => '<button class="filter-btn' + (currentFilter === g ? " active" : "") + '" onclick="setFilter(\'' + g + '\')">' + g + "</button>").join("");
}

function renderArchiveFilters() {
    var c = document.getElementById("archiveFilters");
    if (!c) return;
    var filters = [
        { key: "all", label: "全部档案" },
        { key: "active", label: "进行中" },
        { key: "completed", label: "完全成就" },
        { key: "deep", label: "高时长" },
        { key: "played", label: "已游玩" },
        { key: "backlog", label: "未启动" },
        { key: "high-rating", label: "高评分" }
    ];
    c.innerHTML = filters.map(function(item) {
        return '<button class="archive-filter-btn' + (archiveFilter === item.key ? ' active' : '') + '" type="button" onclick="setArchiveFilter(\'' + item.key + '\')">' + item.label + '</button>';
    }).join("");
}

function setFilter(genre) { currentFilter = genre; renderFilters(); renderGames(); }
function setArchiveFilter(filter) { archiveFilter = filter; renderArchiveFilters(); renderGames(); }
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
        const status = getGameArchiveStatus(game);
        const visualClass = getGameVisualClass(game);
        return '<div class="game-card ' + visualClass + '" id="game-' + game.appId + '" data-app-id="' + game.appId + '" style="animation-delay:' + (i * 0.05) + 's">' +
            '<div class="game-card-img-wrapper"><img class="game-card-img" src="' + steamImg + game.appId + '/header.jpg" alt="' + game.name + '" loading="lazy" onerror="this.style.display=\'none\'">' +
            '<div class="game-card-rating"><span class="rating-stars">' + renderRating(game.rating) + '</span><span class="rating-number">' + game.rating + "</span></div></div>" +
            '<div class="game-card-body"><div class="game-card-title">' + game.name + "</div>" +
            '<div class="game-archive-row"><span class="game-status-pill game-status-' + status.tone + '">' + status.label + '</span><span class="game-mini-note">' + getGameRecommendation(game) + '</span></div>' +
            '<div class="game-card-genres">' + genres + "</div>" +
            '<p class="game-card-desc">' + game.desc + "</p>" +
            '<div class="game-card-playtime-section"><div class="playtime-info"><span class="playtime-label">\u23F1 \u6E38\u73A9\u65F6\u957F</span><span class="playtime-value">' + formatPlaytime(m) + "</span></div>" +
            '<div class="playtime-bar-container"><div class="playtime-bar" style="width:' + pct + '%"></div></div>' +
            (h > 0 ? '<span class="playtime-hours">' + h + " \u5C0F\u65F6</span>" : "") + "</div>" +
            '<div class="game-card-footer"><a class="game-card-link" href="https://store.steampowered.com/app/' + game.appId + '" target="_blank" rel="noopener">Steam \u5546\u5E97</a>' +
            '<a class="game-card-link game-card-link-play" href="steam://run/' + game.appId + '" rel="noopener">\u25B6 \u542F\u52A8\u6E38\u620F</a></div></div></div>';
    }).join("");
    var gameCountEl = document.getElementById("gameCount");
    if (gameCountEl) gameCountEl.textContent = games.length;
    scheduleIdle(function() {
        enhanceGameCards();
        initGameCardPreview();
    }, 300);
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

function calcCompletedGames() {
    return games.filter(function(g) {
        return g.ach && g.ach[1] > 0 && g.ach[0] >= g.ach[1];
    }).length;
}

function getTopPlaytimeGame() {
    return games.slice().sort(function(a, b) {
        return getPlaytime(b.appId) - getPlaytime(a.appId);
    })[0] || games[0];
}

function getTopRatingGame() {
    return games.slice().sort(function(a, b) {
        return (b.rating || 0) - (a.rating || 0);
    })[0] || games[0];
}

function getFeaturedRotation() {
    var topPlaytime = getTopPlaytimeGame();
    var topRating = getTopRatingGame();
    var completed = games.find(function(g) { return getAchievementProgress(g) >= 1; }) || topPlaytime;
    return [
        { game: topPlaytime, label: "最高时长 · " + formatPlaytime(getPlaytime(topPlaytime.appId)) },
        { game: topRating, label: "最高评分 · " + (topRating.rating || 0).toFixed(1) },
        { game: completed, label: "完全渗透 · " + (completed.ach ? completed.ach[0] + "/" + completed.ach[1] : "档案") }
    ].filter(function(item) { return item.game; });
}

function getActiveGameCount() {
    return games.filter(function(g) {
        var minutes = getPlaytime(g.appId);
        var completed = g.ach && g.ach[1] > 0 && g.ach[0] >= g.ach[1];
        return minutes > 0 && !completed;
    }).length;
}

function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
}

function scheduleIdle(fn, timeout) {
    if (window.requestIdleCallback) {
        window.requestIdleCallback(fn, { timeout: timeout || 1800 });
    } else {
        window.setTimeout(fn, timeout || 600);
    }
}

function isGuestMode() {
    return guestMode;
}

function applyGuestMode() {
    if (!isGuestMode()) return;
    document.documentElement.classList.add("guest-mode");

    var banner = document.createElement("div");
    banner.className = "guest-mode-banner";
    banner.textContent = "访客只读模式 · 本地笔记、留言和评分已锁定";
    document.body.appendChild(banner);

    document.querySelectorAll("[data-write-action], #gbNickname, #gbMessage").forEach(function(el) {
        if (el.tagName === "BUTTON") {
            el.disabled = true;
        } else {
            el.setAttribute("readonly", "readonly");
            el.setAttribute("aria-readonly", "true");
        }
    });
}

function updateHomeDashboard() {
    var totalHours = calcTotalPlaytime();
    var totalAch = calcTotalAchievements();
    var completed = calcCompletedGames();
    var active = getActiveGameCount();
    var topGame = getTopPlaytimeGame();
    var topMinutes = topGame ? getPlaytime(topGame.appId) : 0;
    var sourceLabel = steamDataMode === "steam" ? "Steam" : "Local";
    var sourceState = steamDataMode === "steam" ? "STEAM LIVE" : "CACHE MODE";

    setText("heroDesc", games.length + " 个任务节点 · " + totalHours + " 小时执行 · " + totalAch + " 个已解锁 · " + sourceState);
    setText("terminalDataState", sourceState);
    setText("terminalRoute", "武器库 → 记忆馆 → 年度报告 → 访客互动");
    setText("terminalSignal", topGame ? topGame.name + " · " + formatPlaytime(topMinutes) : "等待游戏数据");
    setText("terminalMemory", (typeof friendsGallery !== "undefined" ? friendsGallery.length : 18) + " 张相册节点");
    setText("dataSourceLabel", sourceLabel);
    setText("dashboardMode", active + " 个进行中 · " + completed + " 个完全渗透");
    setText("dashboardSync", steamDataMode === "steam" ? "Steam API + Local Memory" : "Local Memory · API 可选");
    setText("qsPlaying", active);

    updateFeaturedGame(0);

    var statsEl = document.getElementById("statsTotalHours");
    if (statsEl) statsEl.textContent = totalHours + " 小时";
}

var protocolNodeLabels = {
    "games": "武器库",
    "memory-vault": "小诺猫记忆馆",
    "year-report": "年度游戏报告",
    "visitor-lab": "访客互动"
};

function getVisitedProtocolNodes() {
    try { return JSON.parse(localStorage.getItem("protocolVisitedNodes") || "[]"); } catch(e) { return []; }
}

function saveVisitedProtocolNode(id) {
    if (!protocolNodeLabels[id]) return;
    var visited = getVisitedProtocolNodes();
    if (visited.indexOf(id) < 0) {
        visited.push(id);
        localStorage.setItem("protocolVisitedNodes", JSON.stringify(visited));
    }
}

function renderVisitedProtocolNodes() {
    var visited = getVisitedProtocolNodes();
    document.querySelectorAll(".protocol-step").forEach(function(step) {
        var id = step.getAttribute("data-target");
        step.classList.toggle("visited", visited.indexOf(id) >= 0);
    });
    var total = Object.keys(protocolNodeLabels).length;
    var count = Math.min(visited.length, total);
    var progressText = document.getElementById("protocolProgressText");
    var progressBar = document.getElementById("protocolProgressBar");
    if (progressText) progressText.textContent = "协议探索 " + count + " / " + total;
    if (progressBar) progressBar.style.width = Math.max(25, Math.round(count / total * 100)) + "%";
}

function setActiveProtocolNode(id) {
    saveVisitedProtocolNode(id);
    document.querySelectorAll(".protocol-step").forEach(function(step) {
        step.classList.toggle("active", step.getAttribute("data-target") === id);
    });
    renderVisitedProtocolNodes();
    if (protocolNodeLabels[id]) {
        setText("terminalRoute", "当前节点 // " + protocolNodeLabels[id]);
    }
}

function jumpProtocolNode(id) {
    setActiveProtocolNode(id);
    scrollToSection(id);
    var label = protocolNodeLabels[id] || (id === "theme-lab" ? "主题实验室" : "");
    if (label) {
        if (!protocolNodeLabels[id]) setText("terminalRoute", "当前节点 // " + label);
        showToast("正在接入：" + label, "info");
    }
}

function highlightGameCard(appId) {
    var card = document.querySelector('.game-card[data-app-id="' + appId + '"]');
    if (!card) return;
    card.classList.add("protocol-focus");
    window.setTimeout(function() {
        card.classList.remove("protocol-focus");
    }, 2400);
}

function focusGameFromReport(appId) {
    setActiveProtocolNode("games");
    var card = document.getElementById("game-" + appId);
    if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
    highlightGameCard(appId);
}

function initProtocolPath() {
    var steps = document.querySelectorAll(".protocol-step");
    if (!steps.length) return;
    setActiveProtocolNode("games");
    renderVisitedProtocolNodes();
    var sectionIds = Array.prototype.slice.call(steps).map(function(step) {
        return step.getAttribute("data-target");
    });
    if (!("IntersectionObserver" in window)) return;
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) setActiveProtocolNode(entry.target.id);
        });
    }, { rootMargin: "-35% 0px -50% 0px", threshold: 0.05 });
    sectionIds.forEach(function(id) {
        var section = document.getElementById(id);
        if (section) observer.observe(section);
    });
}

function updateFeaturedGame(offset) {
    var rotation = getFeaturedRotation();
    if (!rotation.length) return;
    var slot = rotation[Math.abs(Math.floor((Date.now() / 7000) + (offset || 0))) % rotation.length];
    var featuredImg = document.getElementById("featuredGameImg");
    var featuredName = document.getElementById("featuredGameName");
    var featuredBadge = document.getElementById("featuredGameBadge");
    var featuredCard = document.querySelector(".featured-card");
    if (featuredImg) {
        featuredImg.src = steamImg + slot.game.appId + "/header.jpg";
        featuredImg.alt = slot.game.name;
    }
    if (featuredName) featuredName.textContent = slot.game.name;
    if (featuredBadge) featuredBadge.textContent = "⚡ " + slot.label;
    if (featuredCard) featuredCard.setAttribute("data-featured-app-id", slot.game.appId);
}

function initFeaturedGameLink() {
    var featuredCard = document.querySelector(".featured-card");
    if (!featuredCard || featuredCard.dataset.protocolBound === "1") return;
    featuredCard.dataset.protocolBound = "1";
    featuredCard.setAttribute("role", "button");
    featuredCard.setAttribute("tabindex", "0");
    featuredCard.setAttribute("aria-label", "查看当前推荐游戏档案");
    function openFeatured() {
        var appId = parseInt(featuredCard.getAttribute("data-featured-app-id"), 10);
        if (!Number.isNaN(appId)) {
            setActiveProtocolNode("games");
            window.setTimeout(function() { highlightGameCard(appId); }, 120);
        }
    }
    featuredCard.addEventListener("click", openFeatured);
    featuredCard.addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openFeatured();
        }
    });
}

function initReportGameLinks() {
    if (document.body.dataset.reportLinksBound === "1") return;
    document.body.dataset.reportLinksBound = "1";
    document.addEventListener("click", function(event) {
        var rank = event.target.closest && event.target.closest(".wrapped-rank-btn");
        if (!rank) return;
        var appId = parseInt(rank.getAttribute("data-report-app-id"), 10);
        if (!Number.isNaN(appId)) focusGameFromReport(appId);
    });
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
    if (isGuestMode()) return;
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
    if (isGuestMode()) return;
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

function getPerformanceProfile() {
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var coarsePointer = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    var smallScreen = window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var saveData = !!(connection && connection.saveData);
    var hardwareConcurrency = navigator.hardwareConcurrency || 8;
    var deviceMemory = navigator.deviceMemory || 8;
    var lowPower = hardwareConcurrency <= 4 || deviceMemory <= 4 || saveData;

    return {
        isMobile: !!(coarsePointer || smallScreen),
        reducedMotion: !!reducedMotion,
        lowPower: !!lowPower,
        saveData: saveData,
        lite: !!(reducedMotion || coarsePointer || smallScreen || lowPower)
    };
}

function applyPerformanceProfile() {
    var profile = getPerformanceProfile();
    var root = document.documentElement;

    root.classList.toggle("perf-lite", profile.lite);
    root.classList.toggle("perf-mobile", profile.isMobile);
    root.classList.toggle("perf-reduced-motion", profile.reducedMotion);
    return profile;
}

document.addEventListener("DOMContentLoaded", async function() {
    var perfProfile = applyPerformanceProfile();
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
    applyGuestMode();
    var statsEl = document.getElementById("statsTotalHours");
    if (statsEl) statsEl.textContent = calcTotalPlaytime() + " 小时";
    updateHomeDashboard();
    
    // 初始化粒子系统和交互效果
    initGlobalParticles(perfProfile);
    initScrollReveal();
    initCardHoverGlow();
    initButtonRipple();
    renderFriendsGallery();
    renderMemoryVault();
    renderYearReport();
    initThemeLab();
    renderVisitorLab();
    initProtocolPath();
    initFeaturedGameLink();
    initReportGameLinks();
    window.setInterval(function() { updateFeaturedGame(1); }, 7000);
});

// ==================== 全站粒子背景 ====================
function initGlobalParticles(profile) {
    var canvas = document.getElementById("globalParticles");
    if (!canvas) return;
    profile = profile || getPerformanceProfile();
    if (profile.reducedMotion || profile.isMobile || profile.saveData) {
        canvas.style.display = "none";
        return;
    }

    var ctx = canvas.getContext("2d");
    var particles = [];
    var particleCount = profile.lowPower ? 45 : 80;
    var connectDistance = profile.lowPower ? 110 : 135;
    var mouse = { x: 0, y: 0, radius: profile.lowPower ? 130 : 180 };
    var rafId = 0;
    var isRunning = true;
    
    // 设置canvas尺寸
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    
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
        if (!isRunning) return;
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
            if (dist > 0 && dist < mouse.radius) {
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
                
                if (dist2 < connectDistance) {
                    ctx.strokeStyle = getParticleColor();
                    ctx.globalAlpha = 1 - dist2 / connectDistance;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
        
        rafId = requestAnimationFrame(drawParticles);
    }
    
    // 鼠标移动事件
    document.addEventListener("mousemove", function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }, { passive: true });
    
    // 鼠标点击爆裂效果
    document.addEventListener("click", function(e) {
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            var dx = p.x - e.clientX;
            var dy = p.y - e.clientY;
            var dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist > 0 && dist < 150) {
                var force = (150 - dist) / 150;
                p.vx += (dx / dist) * force * 8;
                p.vy += (dy / dist) * force * 8;
            }
        }
    }, { passive: true });
    
    // 页面可见性检测
    document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
            isRunning = false;
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = 0;
            }
        } else {
            isRunning = true;
            if (!rafId) drawParticles();
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
                entry.target.classList.add("visible");
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
    },
    {
        name: "小诺猫",
        desc: "棒球外套酷女孩 🧢",
        src: "photos/小诺猫_01.jpg",
        unlockKey: "lx2026"
    },
    {
        name: "小诺猫",
        desc: "温柔V领灰色毛衣 🕌",
        src: "photos/小诺猫_02.jpg",
        unlockKey: "lx2026"
    },
    {
        name: "小诺猫",
        desc: "条纹T恤+牛仔外套 🌊",
        src: "photos/小诺猫_03.jpg",
        unlockKey: "lx2026"
    },
    {
        name: "小诺猫",
        desc: "花丛中的影子 🌺",
        src: "photos/小诺猫_04.jpg",
        unlockKey: "lx2026"
    },
    {
        name: "小诺猫",
        desc: "条纹T+蓝色长裙 💃",
        src: "photos/小诺猫_05.jpg",
        unlockKey: "lx2026"
    },
    {
        name: "小诺猫",
        desc: "蓝色棒球外套再现 🎒",
        src: "photos/小诺猫_06.jpg",
        unlockKey: "lx2026"
    },
    {
        name: "小诺猫",
        desc: "商场镜子自拍 🛍️",
        src: "photos/小诺猫_07.jpg",
        unlockKey: "lx2026"
    },
    {
        name: "小诺猫",
        desc: "冬日温暖棉服 🧥",
        src: "photos/小诺猫_08.jpg",
        unlockKey: "lx2026"
    },
    {
        name: "小诺猫",
        desc: "圆镜灰衣随拍 🪞",
        src: "photos/小诺猫_09.jpg",
        unlockKey: "lx2026"
    },
    {
        name: "小诺猫",
        desc: "彩色纽扣开衣 🌈",
        src: "photos/小诺猫_10.jpg",
        unlockKey: "lx2026"
    },
    {
        name: "小诺猫",
        desc: "牛仔外套酷妹 🕶️",
        src: "photos/小诺猫_11.jpg",
        unlockKey: "lx2026"
    },
    {
        name: "小诺猫",
        desc: "商场休闲一刻 ☕",
        src: "photos/小诺猫_12.jpg",
        unlockKey: "lx2026"
    },
    {
        name: "小诺猫",
        desc: "动态记忆回放 · 一小段会动的高光 🎬",
        src: "photos/小诺猫_video.mp4",
        type: "video",
        unlockKey: "lx2026"
    }
];

var activeFriendCategory = "all";

function isFriendVideo(friend) {
    return !!(friend && (friend.type === "video" || /\.mp4($|\?)/i.test(friend.src || "")));
}

function getFriendCategory(friend, index) {
    if (isFriendVideo(friend)) return "视频";
    if (friend.name === "我们") return "我们";
    if (/地铁|商场|休闲|花田|花丛|红毯/.test(friend.desc || "")) return "出游";
    if (/自拍|镜|随拍/.test(friend.desc || "")) return "自拍";
    return index < 6 ? "日常" : "小诺猫";
}

function getFilteredFriends() {
    return friendsGallery.map(function(friend, index) {
        return Object.assign({ originalIndex: index, category: getFriendCategory(friend, index) }, friend);
    }).filter(function(friend) {
        return activeFriendCategory === "all" || friend.category === activeFriendCategory;
    });
}

function renderFriendCategoryFilters() {
    var container = document.getElementById("friendsAlbumFilters");
    if (!container) return;
    var categories = ["all"].concat(Array.from(new Set(friendsGallery.map(getFriendCategory))));
    container.innerHTML = categories.map(function(cat) {
        var label = cat === "all" ? "全部" : cat;
        var count = cat === "all" ? friendsGallery.length : friendsGallery.filter(function(friend, index) { return getFriendCategory(friend, index) === cat; }).length;
        return '<button class="album-filter-btn' + (activeFriendCategory === cat ? ' active' : '') + '" type="button" onclick="setFriendCategory(\'' + cat + '\')">' + label + '<span>' + count + '</span></button>';
    }).join("");
}

function setFriendCategory(category) {
    activeFriendCategory = category;
    renderFriendsGallery();
}

function renderFriendsGallery() {
    var grid = document.getElementById("friendsGrid");
    if (!grid) return;
    var visibleFriends = getFilteredFriends();

    renderFriendCategoryFilters();
    grid.innerHTML = visibleFriends.map(function(friend, index) {
        var isVideo = isFriendVideo(friend);
        var mediaHtml = isVideo
            ? '<div class="friend-video-preview" aria-hidden="true"><span>▶</span><strong>VIDEO LOG</strong><em>点击播放</em></div>'
            : '<img class="friend-card-img is-loading" src="' + friend.src + '" alt="' + friend.name + '" loading="lazy" decoding="async" fetchpriority="low">';
        return '<article class="friend-card' + (isVideo ? ' friend-card-video' : '') + '" data-index="' + friend.originalIndex + '" data-category="' + friend.category + '" role="button" tabindex="0" aria-label="查看' + friend.name + (isVideo ? '视频' : '照片') + '">' +
            '<div class="friend-card-img-wrapper">' +
                mediaHtml +
            '</div>' +
            '<div class="friend-card-info">' +
                '<span class="friend-card-category">' + friend.category + '</span>' +
                '<h3 class="friend-card-name">' + friend.name + '</h3>' +
                '<p class="friend-card-desc">' + friend.desc + '</p>' +
                '<button class="friend-card-btn" type="button" data-photo-index="' + friend.originalIndex + '">' +
                    (isVideo ? '播放视频' : '查看照片') +
                '</button>' +
            '</div>' +
        '</article>';
    }).join("");

    grid.insertAdjacentHTML('beforeend',
        '<div class="friends-spiral-copy" aria-hidden="true">' +
            '<span>SCROLL TO DEPLOY</span>' +
            '<strong>你是所有方向里唯一的目的地</strong>' +
        '</div>'
    );

    Array.prototype.slice.call(grid.querySelectorAll(".friend-card-img")).forEach(function(img) {
        function markReady() {
            img.classList.remove("is-loading");
            img.classList.add("is-ready");
            if (img.parentElement) img.parentElement.classList.add("is-ready");
        }
        if (img.complete) {
            markReady();
        } else {
            img.addEventListener("load", markReady, { once: true });
            img.addEventListener("error", markReady, { once: true });
        }
    });

    initFriendsSpiralGallery();
}

function initFriendsSpiralGallery() {
    var section = document.querySelector(".friends-spiral-section");
    var stage = document.getElementById("friendsGrid");
    var cards = Array.prototype.slice.call(document.querySelectorAll(".friend-card"));
    if (!section || !stage || !cards.length) return;

    var profile = getPerformanceProfile();
    var isStaticMode = profile.reducedMotion || profile.isMobile;
    var isFrozen = false;
    var isActive = true;
    var lastProgress = -1;
    var rafId = 0;
    var cardCount = cards.length;
    var featuredIndex = Math.min(6, cardCount - 1);
    var progressValue = section.querySelector(".friends-scroll-hud__value");
    var progressTrack = section.querySelector(".friends-scroll-hud__track i");

    function openCard(card) {
        if (!card) return;
        var index = Number(card.getAttribute("data-index"));
        if (Number.isNaN(index)) return;
        freezeGallery(450);
        handleFriendPhoto(index);
    }

    stage.addEventListener("click", function(e) {
        var card = e.target.closest && e.target.closest(".friend-card");
        if (!card || !stage.contains(card)) return;
        e.preventDefault();
        openCard(card);
    });

    stage.addEventListener("keydown", function(e) {
        if (e.key !== "Enter" && e.key !== " ") return;
        var card = e.target.closest && e.target.closest(".friend-card");
        if (!card || !stage.contains(card)) return;
        e.preventDefault();
        openCard(card);
    });

    function resetCardPose(card) {
        ["--x", "--y", "--z", "--rx", "--ry", "--rz", "--scale", "--card-opacity"].forEach(function(prop) {
            card.style.removeProperty(prop);
        });
        card.style.zIndex = "";
        card.classList.remove("is-featured");
        card.classList.add("revealed");
    }

    function enableStaticMode() {
        isStaticMode = true;
        section.classList.add("friends-static-mode");
        cards.forEach(resetCardPose);
    }

    function freezeGallery(duration) {
        isFrozen = true;
        section.classList.add("is-opening");
        if (duration) {
            window.setTimeout(function() {
                if (!window.friendGalleryPaused) {
                    isFrozen = false;
                    section.classList.remove("is-opening");
                    requestUpdate();
                }
            }, duration);
        }
    }

    window.addEventListener("friend-gallery-pause", function() {
        freezeGallery(0);
    });

    window.addEventListener("friend-gallery-resume", function() {
        isFrozen = false;
        section.classList.remove("is-opening");
        requestUpdate();
    });

    if (isStaticMode) {
        enableStaticMode();
        return;
    }

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function lerp(from, to, amount) {
        return from + (to - from) * amount;
    }

    function easeInOut(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function mixPose(a, b, amount) {
        return {
            x: lerp(a.x, b.x, amount),
            y: lerp(a.y, b.y, amount),
            z: lerp(a.z, b.z, amount),
            rx: lerp(a.rx, b.rx, amount),
            ry: lerp(a.ry, b.ry, amount),
            rz: lerp(a.rz, b.rz, amount),
            scale: lerp(a.scale, b.scale, amount),
            opacity: lerp(a.opacity, b.opacity, amount)
        };
    }

    function getGridPose(index) {
        var columns = window.innerWidth >= 1120 && cardCount > 16 ? 5 : 4;
        var gapX = Math.min(222, window.innerWidth / (columns + 0.65));
        var gapY = Math.min(220, window.innerHeight * 0.26);
        var col = index % columns;
        var row = Math.floor(index / columns);
        var rows = Math.ceil(cardCount / columns);

        return {
            x: (col - (columns - 1) / 2) * gapX,
            y: (row - (rows - 1) / 2) * gapY + 28,
            z: 40 - row * 24,
            rx: -8 + (row % 2) * 4,
            ry: (col - 1.5) * 5,
            rz: (col - 1.5) * 3,
            scale: 0.86,
            opacity: 1
        };
    }

    function getSpiralPose(index, progress) {
        var turn = index * 0.82 + progress * Math.PI * 1.2;
        var radius = 190 + (index % 3) * 18;
        return {
            x: Math.sin(turn) * radius,
            y: (index - (cardCount - 1) / 2) * 34,
            z: Math.cos(turn) * radius - index * 18,
            rx: -14 + Math.sin(turn) * 10,
            ry: (turn * 180 / Math.PI) + 20,
            rz: -10 + index * 2.5,
            scale: 0.62 + (Math.cos(turn) + 1) * 0.07,
            opacity: 0.72 + (Math.cos(turn) + 1) * 0.14
        };
    }

    function getOrbitPose(index) {
        if (index === featuredIndex) {
            return { x: 0, y: -8, z: 360, rx: -4, ry: 0, rz: -2, scale: 1.2, opacity: 1 };
        }

        var orbitSlot = index < featuredIndex ? index : index - 1;
        var orbitTotal = Math.max(1, cardCount - 1);
        var angle = (orbitSlot / orbitTotal) * Math.PI * 2 - Math.PI / 2;
        var radiusX = Math.min(430, window.innerWidth * 0.35);
        var radiusY = 215;

        return {
            x: Math.cos(angle) * radiusX,
            y: Math.sin(angle) * radiusY + 18,
            z: -70 + Math.sin(angle) * 80,
            rx: -10,
            ry: Math.cos(angle) * -28,
            rz: Math.sin(angle) * 12,
            scale: 0.7,
            opacity: 0.86
        };
    }

    function applyPose(card, pose, index) {
        card.style.setProperty("--x", pose.x.toFixed(2) + "px");
        card.style.setProperty("--y", pose.y.toFixed(2) + "px");
        card.style.setProperty("--z", pose.z.toFixed(2) + "px");
        card.style.setProperty("--rx", pose.rx.toFixed(2) + "deg");
        card.style.setProperty("--ry", pose.ry.toFixed(2) + "deg");
        card.style.setProperty("--rz", pose.rz.toFixed(2) + "deg");
        card.style.setProperty("--scale", pose.scale.toFixed(3));
        card.style.setProperty("--card-opacity", pose.opacity.toFixed(3));
        card.style.zIndex = String(Math.round(pose.z + 1000 + index));
        card.classList.toggle("is-featured", index === featuredIndex && pose.scale > 1);
        card.classList.add("revealed");
    }

    function updateSpiral() {
        rafId = 0;
        if (!isActive || isFrozen || isStaticMode || window.friendGalleryPaused) return;

        var rect = section.getBoundingClientRect();
        var scrollable = rect.height - window.innerHeight;
        var progress = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;
        if (lastProgress >= 0 && Math.abs(progress - lastProgress) < 0.001) return;
        lastProgress = progress;

        var firstPhase = easeInOut(clamp(progress / 0.48, 0, 1));
        var secondPhase = easeInOut(clamp((progress - 0.45) / 0.55, 0, 1));

        section.style.setProperty("--spiral-progress", progress.toFixed(3));
        if (progressValue) progressValue.textContent = Math.round(progress * 100) + "%";
        if (progressTrack) progressTrack.style.transform = "scaleX(" + progress.toFixed(3) + ")";
        section.classList.toggle("is-armed", progress > 0.05);
        section.classList.toggle("is-grid-phase", progress > 0.72);
        section.classList.toggle("is-focus-phase", progress > 0.25 && progress < 0.75);

        cards.forEach(function(card, index) {
            var spiralPose = getSpiralPose(index, progress);
            var orbitPose = getOrbitPose(index);
            var gridPose = getGridPose(index);
            var pose = mixPose(spiralPose, orbitPose, firstPhase);
            pose = mixPose(pose, gridPose, secondPhase);
            applyPose(card, pose, index);
        });
    }

    function requestUpdate() {
        if (rafId || !isActive || isFrozen || isStaticMode || window.friendGalleryPaused) return;
        rafId = requestAnimationFrame(updateSpiral);
    }

    cards.forEach(function(card) {
        card.addEventListener("mousemove", function(e) {
            if (isStaticMode || profile.isMobile) return;
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            card.style.setProperty("--mx", (x / rect.width * 100).toFixed(1) + "%");
            card.style.setProperty("--my", (y / rect.height * 100).toFixed(1) + "%");
        }, { passive: true });
    });

    if ("IntersectionObserver" in window) {
        isActive = false;
        var observer = new IntersectionObserver(function(entries) {
            isActive = entries.some(function(entry) { return entry.isIntersecting; });
            if (isActive) requestUpdate();
        }, { rootMargin: "360px 0px" });
        observer.observe(section);
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", function() {
        if (getPerformanceProfile().isMobile) {
            enableStaticMode();
            return;
        }
        requestUpdate();
    }, { passive: true });
    updateSpiral();
}

function initFriendCardEffects() {
    initFriendsSpiralGallery();
}

var activeFriendIndex = -1;

function handleFriendPhoto(index) {
    var friend = friendsGallery[index];
    if (!friend) return;
    openLightbox(index);
}

function renderLightboxThumbs() {
    var thumbs = document.getElementById("lightboxThumbs");
    if (!thumbs) return;
    var thumbFriends = getFilteredFriends();
    if (!thumbFriends.some(function(friend) { return friend.originalIndex === activeFriendIndex; })) {
        thumbFriends = friendsGallery.map(function(friend, index) {
            return Object.assign({ originalIndex: index, category: getFriendCategory(friend, index) }, friend);
        });
    }
    thumbs.innerHTML = thumbFriends.map(function(friend) {
        var index = friend.originalIndex;
        var isVideo = isFriendVideo(friend);
        return '<button class="lightbox-thumb' + (index === activeFriendIndex ? ' active' : '') + '" type="button" onclick="openLightbox(' + index + ', event)" aria-label="查看第 ' + (index + 1) + ' 张">' +
            (isVideo
                ? '<span class="lightbox-thumb-video">▶</span>'
                : '<img src="' + friend.src + '" alt="' + friend.name + '" loading="lazy" decoding="async">') +
        '</button>';
    }).join("");
    var active = thumbs.querySelector(".lightbox-thumb.active");
    if (active && active.scrollIntoView) {
        active.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }
}

function setLightboxPhoto(index) {
    var lightbox = document.getElementById("photoLightbox");
    var img = document.getElementById("lightboxImg");
    var video = document.getElementById("lightboxVideo");
    var nameEl = document.getElementById("lightboxName");
    var descEl = document.getElementById("lightboxDesc");
    var counterEl = document.getElementById("lightboxCounter");
    var categoryEl = document.getElementById("lightboxCategory");
    var friend = friendsGallery[index];
    if (!lightbox || !img || !video || !nameEl || !descEl || !friend) return;
    var visibleFriends = getFilteredFriends();
    var visiblePosition = visibleFriends.findIndex(function(item) { return item.originalIndex === index; });
    var counterCurrent = visiblePosition >= 0 ? visiblePosition + 1 : index + 1;
    var counterTotal = visiblePosition >= 0 ? visibleFriends.length : friendsGallery.length;
    var isVideo = isFriendVideo(friend);

    activeFriendIndex = index;
    img.classList.add("is-switching");
    window.setTimeout(function() {
        if (isVideo) {
            img.removeAttribute("src");
            img.style.display = "none";
            img.classList.remove("is-switching");
            video.style.display = "block";
            video.src = friend.src;
            video.load();
        } else {
            video.pause();
            video.removeAttribute("src");
            video.load();
            video.style.display = "none";
            img.style.display = "block";
            img.loading = "eager";
            img.decoding = "async";
            img.src = friend.src;
            img.alt = friend.name + " - " + friend.desc;
        }
        nameEl.textContent = friend.name;
        descEl.textContent = friend.desc;
        if (categoryEl) categoryEl.textContent = getFriendCategory(friend, index);
        if (counterEl) counterEl.textContent = counterCurrent + " / " + counterTotal;
        renderLightboxThumbs();
        img.onload = function() {
            img.classList.remove("is-switching");
        };
        window.setTimeout(function() {
            img.classList.remove("is-switching");
        }, 280);
    }, 80);
}

function openLightbox(srcOrIndex, name, desc) {
    if (srcOrIndex && srcOrIndex.stopPropagation) srcOrIndex.stopPropagation();
    var index = typeof srcOrIndex === "number" ? srcOrIndex : friendsGallery.findIndex(function(friend) {
        return friend.src === srcOrIndex;
    });
    if (index < 0) {
        index = 0;
        if (srcOrIndex && typeof srcOrIndex === "string") {
            friendsGallery.unshift({ name: name || "照片", desc: desc || "", src: srcOrIndex });
        }
    }
    var lightbox = document.getElementById("photoLightbox");
    if (!lightbox) return;
    
    window.friendGalleryPaused = true;
    document.body.classList.add("lightbox-open");
    window.dispatchEvent(new Event("friend-gallery-pause"));
    setLightboxPhoto(index);
    lightbox.classList.add("active");
}

function navigateLightbox(direction, event) {
    if (event) event.stopPropagation();
    if (!friendsGallery.length) return;
    var visibleFriends = getFilteredFriends();
    if (!visibleFriends.length) return;
    var currentVisible = visibleFriends.findIndex(function(friend) { return friend.originalIndex === activeFriendIndex; });
    if (currentVisible < 0) currentVisible = 0;
    var nextVisible = currentVisible + direction;
    if (nextVisible < 0) nextVisible = visibleFriends.length - 1;
    if (nextVisible >= visibleFriends.length) nextVisible = 0;
    setLightboxPhoto(visibleFriends[nextVisible].originalIndex);
}

function closeLightbox(event) {
    if (event && event.target !== event.currentTarget) return;
    
    var lightbox = document.getElementById("photoLightbox");
    if (!lightbox) return;
    var video = document.getElementById("lightboxVideo");
    if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
    }
    lightbox.classList.remove("active");
    document.body.classList.remove("lightbox-open");
    window.friendGalleryPaused = false;
    window.dispatchEvent(new Event("friend-gallery-resume"));
}

document.addEventListener("keydown", function(e) {
    var lightbox = document.getElementById("photoLightbox");
    var isOpen = lightbox && lightbox.classList.contains("active");
    if (e.key === "Escape") closeLightbox();
    if (!isOpen) return;
    if (e.key === "ArrowLeft") navigateLightbox(-1);
    if (e.key === "ArrowRight") navigateLightbox(1);
});

window.handleFriendPhoto = handleFriendPhoto;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;
window.setFriendCategory = setFriendCategory;
window.setArchiveFilter = setArchiveFilter;

// ==================== Memory Vault + Wrapped + Labs ====================
function getFriendStory(friend, index) {
    var stories = [
        "普通的一天被好好保存，后来再看也会觉得亮。",
        "像一个小小的存档点，记录那一刻的光和心情。",
        "不是盛大的瞬间，但足够成为记忆馆的一格。",
        "这张更像高光回放，轻轻一点就能回到现场。"
    ];
    return friend.story || stories[index % stories.length];
}

function renderMemoryVault() {
    var spotlight = document.getElementById("memorySpotlight");
    var grid = document.getElementById("memoryStoryGrid");
    if (!spotlight || !grid || !friendsGallery.length) return;
    var enriched = friendsGallery.map(function(friend, index) {
        return Object.assign({ originalIndex: index, category: getFriendCategory(friend, index), story: getFriendStory(friend, index) }, friend);
    });
    var featured = enriched.find(function(item) { return item.name === "我们"; }) || enriched[0];
    spotlight.innerHTML =
        '<button class="memory-spotlight-card" type="button" onclick="openLightbox(' + featured.originalIndex + ')">' +
            '<img src="' + featured.src + '" alt="' + featured.name + '" loading="lazy" decoding="async">' +
            '<span class="memory-label">' + featured.category + '</span>' +
            '<strong>' + featured.name + '</strong>' +
            '<p>' + featured.story + '</p>' +
        '</button>';
    grid.innerHTML = enriched.slice(0, 8).map(function(item) {
        return '<button class="memory-story-card" type="button" onclick="openLightbox(' + item.originalIndex + ')">' +
            '<img src="' + item.src + '" alt="' + item.name + '" loading="lazy" decoding="async">' +
            '<span>' + item.category + '</span>' +
            '<strong>' + item.name + '</strong>' +
            '<p>' + item.story + '</p>' +
        '</button>';
    }).join("");
}

function getYearReportData() {
    var totalHours = calcTotalPlaytime();
    var topGames = games.slice().sort(function(a, b) { return getPlaytime(b.appId) - getPlaytime(a.appId); }).slice(0, 5);
    var topGame = topGames[0] || games[0];
    var topRating = getTopRatingGame();
    var genreCounts = {};
    games.forEach(function(game) {
        (game.genre || []).forEach(function(genre) {
            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        });
    });
    var topGenres = Object.entries(genreCounts).sort(function(a, b) { return b[1] - a[1]; }).slice(0, 5);
    var keywords = topGenres.slice(0, 3).map(function(item) { return item[0]; }).join(" / ");
    return {
        totalHours: totalHours,
        topGames: topGames,
        topGame: topGame,
        topRating: topRating,
        topGenres: topGenres,
        keywords: keywords || "探索 / 沉浸 / 热爱"
    };
}

function buildYearReportSummary() {
    if (!games.length) return "我的 2026 年度游戏报告还在生成中。";
    var data = getYearReportData();
    var topList = data.topGames.slice(0, 3).map(function(game, index) {
        return (index + 1) + ". " + game.name + " - " + formatPlaytime(getPlaytime(game.appId));
    }).join("\n");
    return [
        "🎮 我的 2026 年度游戏报告",
        "总执行时长：" + data.totalHours + "h",
        "年度关键词：" + data.keywords,
        "年度 Top 3：",
        topList,
        "年度结论：最长任务是 " + data.topGame.name + "，最高评分档案是 " + data.topRating.name + "。"
    ].join("\n");
}

function copyTextWithFallback(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    }
    return new Promise(function(resolve, reject) {
        var textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand("copy");
            resolve();
        } catch (error) {
            reject(error);
        } finally {
            textarea.remove();
        }
    });
}

function copyYearReportSummary() {
    copyTextWithFallback(buildYearReportSummary()).then(function() {
        showToast("年度报告摘要已复制", "success");
    }).catch(function() {
        showToast("复制失败，请手动选择报告内容", "warning");
    });
}

function bindYearReportGameLinks() {
    document.querySelectorAll(".wrapped-rank-btn").forEach(function(link) {
        if (link.dataset.reportBound === "1") return;
        link.dataset.reportBound = "1";
        link.addEventListener("click", function(event) {
            var appId = parseInt(link.getAttribute("data-report-app-id"), 10);
            if (Number.isNaN(appId)) return;
            setActiveProtocolNode("games");
            window.setTimeout(function() { highlightGameCard(appId); }, 120);
        });
    });
}

function renderYearReport() {
    var grid = document.getElementById("yearReportGrid");
    if (!grid || !games.length) return;
    var data = getYearReportData();
    var totalHours = data.totalHours;
    var topGames = data.topGames;
    var topGame = data.topGame;
    var topRating = data.topRating;
    var topGenres = data.topGenres;
    var keywords = data.keywords;
    grid.innerHTML =
        '<div class="wrapped-hero-card"><span>2026 WRAPPED</span><strong>' + totalHours + 'h</strong><p>年度总执行时长 · 关键词：' + keywords + '</p></div>' +
        '<div class="wrapped-card"><h3>Top 5 高时长</h3>' + topGames.map(function(game, index) {
            var pct = topGame ? Math.max(8, Math.round(getPlaytime(game.appId) / Math.max(getPlaytime(topGame.appId), 1) * 100)) : 0;
            return '<a class="wrapped-rank wrapped-rank-btn" href="#game-' + game.appId + '" data-report-app-id="' + game.appId + '"><span>' + (index + 1) + '</span><div><strong>' + game.name + '</strong><i style="width:' + pct + '%"></i></div><em>' + formatPlaytime(getPlaytime(game.appId)) + '</em></a>';
        }).join("") + '</div>' +
        '<div class="wrapped-card"><h3>类型偏好</h3><div class="wrapped-tags">' + topGenres.map(function(item) {
            return '<span>' + item[0] + '<b>' + item[1] + '</b></span>';
        }).join("") + '</div></div>' +
        '<div class="wrapped-card"><h3>年度结论</h3><p>最长任务是 ' + topGame.name + '，最高评分档案是 ' + topRating.name + '。你的档案更偏向 ' + keywords + '。</p></div>';
    bindYearReportGameLinks();
}

var themeProfiles = {
    cyber: { label: "Cyber Blue", color: "#00d4ff", bg: "#0a0a0f", shadow: "0 14px 44px rgba(0,0,0,0.28)", className: "theme-cyber" },
    neon: { label: "Neon Pink", color: "#fd79a8", bg: "#100812", shadow: "0 14px 44px rgba(253,121,168,0.16)", className: "theme-neon" },
    amber: { label: "Amber Terminal", color: "#ffc312", bg: "#120d05", shadow: "0 14px 44px rgba(255,195,18,0.12)", className: "theme-amber" },
    clean: { label: "Clean Light", color: "#0984e3", bg: "#f4f7fb", shadow: "0 10px 30px rgba(20,40,70,0.12)", className: "theme-clean" },
    low: { label: "Low Power", color: "#00b894", bg: "#080b0d", shadow: "0 8px 22px rgba(0,0,0,0.2)", className: "theme-low" }
};

function applyThemeProfile(name) {
    var profile = themeProfiles[name] || themeProfiles.cyber;
    var root = document.documentElement;
    var rgb = profile.color.match(/[a-f0-9]{2}/gi).map(function(v) { return parseInt(v, 16); });
    root.style.setProperty("--theme-r", rgb[0]);
    root.style.setProperty("--theme-g", rgb[1]);
    root.style.setProperty("--theme-b", rgb[2]);
    root.style.setProperty("--bg-primary", profile.bg);
    root.style.setProperty("--shadow", profile.shadow);
    Object.keys(themeProfiles).forEach(function(key) { root.classList.remove(themeProfiles[key].className); });
    root.classList.add(profile.className);
    if (name === "low") root.classList.add("perf-lite");
    localStorage.setItem("protocolThemeProfile", name);
    renderThemeLab();
}

function renderThemeLab() {
    var grid = document.getElementById("themeProfileGrid");
    if (!grid) return;
    var active = localStorage.getItem("protocolThemeProfile") || "cyber";
    grid.innerHTML = Object.keys(themeProfiles).map(function(key) {
        var profile = themeProfiles[key];
        return '<button class="theme-profile-card' + (active === key ? ' active' : '') + '" type="button" onclick="applyThemeProfile(\'' + key + '\')">' +
            '<span style="background:' + profile.color + '"></span><strong>' + profile.label + '</strong><em>' + (key === "low" ? "轻量动效" : "氛围模式") + '</em>' +
        '</button>';
    }).join("");
}

function initThemeLab() {
    applyThemeProfile(localStorage.getItem("protocolThemeProfile") || "cyber");
}

var visitorVoteOptions = ["Grand Theft Auto V", "Counter-Strike 2", "Detroit: Become Human", "It Takes Two"];
var visitorMissions = [
    { text: "打开小诺猫记忆馆，看一张高光照片。", target: "memory-vault", cta: "进入记忆馆" },
    { text: "从游戏库随机抽一款游戏，给它写一句短评。", target: "games", cta: "查看游戏库" },
    { text: "查看年度报告，找出今年的关键词。", target: "year-report", cta: "打开报告" },
    { text: "切换一个新主题，重新逛一遍首页。", target: "theme-lab", cta: "切换主题" }
];
var visitorReactionOptions = ["酷", "温柔", "想玩", "震撼"];

function getVisitorState() {
    try { return JSON.parse(localStorage.getItem("visitorLabState") || "{}"); } catch(e) { return {}; }
}

function saveVisitorState(state) {
    localStorage.setItem("visitorLabState", JSON.stringify(state));
}

function voteVisitorGame(game) {
    var state = getVisitorState();
    state.votes = state.votes || {};
    state.votes[game] = (state.votes[game] || 0) + 1;
    saveVisitorState(state);
    renderVisitorLab();
    showToast("已记录推荐：" + game, "success");
}

function reactVisitor(label) {
    var state = getVisitorState();
    state.reactions = state.reactions || {};
    state.reactions[label] = (state.reactions[label] || 0) + 1;
    saveVisitorState(state);
    renderVisitorLab();
    showToast("收到反馈：" + label, "success");
}

function rollVisitorMission() {
    var mission = visitorMissions[Math.floor(Math.random() * visitorMissions.length)];
    var el = document.getElementById("visitorMission");
    if (!el) return;
    el.innerHTML = '<span>' + mission.text + '</span><button type="button" onclick="runVisitorMission(\'' + mission.target + '\')">' + mission.cta + '</button>';
}

function runVisitorMission(target) {
    if (target === "theme-lab") {
        scrollToSection(target);
        showToast("正在打开主题实验室", "info");
        return;
    }
    jumpProtocolNode(target);
}

function renderVisitorLab() {
    var voteList = document.getElementById("visitorVoteList");
    var reactions = document.getElementById("visitorReactions");
    var state = getVisitorState();
    state.votes = state.votes || {};
    state.reactions = state.reactions || {};
    if (voteList) {
        voteList.innerHTML = visitorVoteOptions.map(function(game) {
            return '<button class="visitor-vote-btn" type="button" onclick="voteVisitorGame(\'' + game.replace(/'/g, "\\'") + '\')"><span>' + game + '</span><b>' + (state.votes[game] || 0) + '</b></button>';
        }).join("");
    }
    if (reactions) {
        reactions.innerHTML = visitorReactionOptions.map(function(label) {
            return '<button class="visitor-reaction-btn" type="button" onclick="reactVisitor(\'' + label + '\')">' + label + '<span>' + (state.reactions[label] || 0) + '</span></button>';
        }).join("");
    }
    if (document.getElementById("visitorMission") && document.getElementById("visitorMission").textContent.indexOf("等待") >= 0) rollVisitorMission();
}

window.applyThemeProfile = applyThemeProfile;
window.voteVisitorGame = voteVisitorGame;
window.reactVisitor = reactVisitor;
window.rollVisitorMission = rollVisitorMission;
window.copyYearReportSummary = copyYearReportSummary;
window.jumpProtocolNode = jumpProtocolNode;
window.focusGameFromReport = focusGameFromReport;
window.runVisitorMission = runVisitorMission;

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
// ========== 页面加载动画 ==========
window.addEventListener("load", function() {
    var loader = document.getElementById("pageLoader");
    if (loader) {
        setTimeout(function() {
            loader.classList.add("hidden");
            setTimeout(function() { loader.remove(); }, 700);
        }, 600);
    }
});


// ================================================================
// UI 音效系统
// ================================================================
var uiSounds = {
    click: null,
    success: null,
    error: null,
    notify: null
};

function initSounds() {
    try {
        uiSounds.click = new Audio('click.wav');
        uiSounds.success = new Audio('success.wav');
        uiSounds.error = new Audio('error.wav');
        uiSounds.notify = new Audio('notify.wav');
        // 设置较小音量
        Object.values(uiSounds).forEach(function(s) { if(s) s.volume = 0.15; });
    } catch(e) {}
}

function playSound(type) {
    if (!uiSounds[type]) return;
    try {
        uiSounds[type].currentTime = 0;
        uiSounds[type].play().catch(function() {});
    } catch(e) {}
}

// 重写 showToast 加入音效
var _origShowToast = typeof showToast === 'function' ? showToast : null;
function showToastWithSound(msg, type) {
    if (_origShowToast) _origShowToast(msg, type);
    if (type === 'success') playSound('success');
    else if (type === 'error') playSound('error');
    else playSound('notify');
}

// 卡片点击音效
document.addEventListener('click', function(e) {
    if (e.target.closest('.game-card') || e.target.closest('.tool-card') || e.target.closest('.achievement-card')) {
        playSound('click');
    }
});

// 导航点击音效
document.addEventListener('click', function(e) {
    if (e.target.closest('.nav-links a') || e.target.closest('.fab-action')) {
        playSound('click');
    }
});

// ================================================================
// 25-FEATURE UPGRADE - 追加到文件末尾

// ================================================================
// UI 音效系统
// ================================================================
var uiSounds = {
    click: null,
    success: null,
    error: null,
    notify: null
};

function initSounds() {
    try {
        uiSounds.click = new Audio('click.wav');
        uiSounds.success = new Audio('success.wav');
        uiSounds.error = new Audio('error.wav');
        uiSounds.notify = new Audio('notify.wav');
        // 设置较小音量
        Object.values(uiSounds).forEach(function(s) { if(s) s.volume = 0.15; });
    } catch(e) {}
}

function playSound(type) {
    if (!uiSounds[type]) return;
    try {
        uiSounds[type].currentTime = 0;
        uiSounds[type].play().catch(function() {});
    } catch(e) {}
}

// 重写 showToast 加入音效
var _origShowToast = typeof showToast === 'function' ? showToast : null;
function showToastWithSound(msg, type) {
    if (_origShowToast) _origShowToast(msg, type);
    if (type === 'success') playSound('success');
    else if (type === 'error') playSound('error');
    else playSound('notify');
}

// 卡片点击音效
document.addEventListener('click', function(e) {
    if (e.target.closest('.game-card') || e.target.closest('.tool-card') || e.target.closest('.achievement-card')) {
        playSound('click');
    }
});

// 导航点击音效
document.addEventListener('click', function(e) {
    if (e.target.closest('.nav-links a') || e.target.closest('.fab-action')) {
        playSound('click');
    }
});

// ================================================================

// ========== 全局变量 ==========
var bgmAudio = null;
var bgmPlaying = false;
var currentAccentColor = '#6c5ce7';
var currentGameModalAppId = null;

// ========== 滚动进度条 ==========
function initScrollProgressBar() {
    var bar = document.getElementById('scrollProgressBar');
    if (!bar) return;
    window.addEventListener('scroll', function() {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        var dh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        bar.style.width = (dh > 0 ? (st / dh) * 100 : 0) + '%';
    });
}

// ========== BGM 音乐播放器 ==========
function initBGM() {
    bgmAudio = document.getElementById('bgmAudio');
    if (!bgmAudio) {
        bgmAudio = new Audio('bgm.mp3');
        bgmAudio.loop = true;
    }
    bgmAudio.volume = 0.3;
    var savedVol = localStorage.getItem('bgmVolume');
    if (savedVol !== null && !isNaN(parseFloat(savedVol))) bgmAudio.volume = parseFloat(savedVol);
    var volSlider = document.getElementById('bgmVolume');
    if (volSlider) volSlider.value = Math.round(bgmAudio.volume * 100);

    // 用户任意交互时播放
    var started = false;
    function tryPlay() {
        if (started || bgmPlaying) return;
        started = true;
        try {
            var st = localStorage.getItem('bgmTime');
            if (st && !isNaN(parseFloat(st))) bgmAudio.currentTime = parseFloat(st);
        } catch(e) {}
        bgmAudio.play().then(function() {
            bgmPlaying = true;
            var btn = document.getElementById('bgmPlayBtn');
            if (btn) btn.textContent = '\u23f8\ufe0f';
            setVisualizerActive(true);
            var info = document.getElementById('bgmInfo');
            if (info) info.textContent = 'BGM \u2714';
            document.removeEventListener('click', tryPlay);
            document.removeEventListener('touchstart', tryPlay);
            document.removeEventListener('keydown', tryPlay);
        }).catch(function(e) {
            console.log('BGM play blocked:', e.message);
            started = false;
        });
    }
    document.addEventListener('click', tryPlay, { once: false });
    document.addEventListener('touchstart', tryPlay, { once: false });
    document.addEventListener('keydown', tryPlay, { once: false });
}function toggleBGM() {
    if (!bgmAudio) { initBGM(); return; }
    if (bgmPlaying) {
        bgmAudio.pause();
        bgmPlaying = false;
        var btn = document.getElementById('bgmPlayBtn');
        if (btn) btn.textContent = '\u25b6\ufe0f';
        setVisualizerActive(false);
        localStorage.setItem('bgmTime', bgmAudio.currentTime);
    } else {
        bgmAudio.play().then(function() {
            bgmPlaying = true;
            var btn = document.getElementById('bgmPlayBtn');
            if (btn) btn.textContent = '\u23f8\ufe0f';
            setVisualizerActive(true);
        }).catch(function() {});
    }
}

function setBGMVolume(val) {
    if (!bgmAudio) initBGM();
    bgmAudio.volume = val / 100;
    localStorage.setItem('bgmVolume', val / 100);
}

function setVisualizerActive(active) {
    document.querySelectorAll('.bgm-bar').forEach(function(b) {
        if (active) b.classList.add('active'); else b.classList.remove('active');
    });
}

setInterval(function() { if (bgmAudio && bgmPlaying) localStorage.setItem('bgmTime', bgmAudio.currentTime); }, 5000);

// ========== 主题色 ==========
function toggleThemeColors() { var p = document.getElementById('themeColorsPopup'); if (p) p.classList.toggle('show'); }
function setThemeColor(color) {
    currentAccentColor = color;
    document.documentElement.style.setProperty('--accent', color);
    document.documentElement.style.setProperty('--primary', color);
    localStorage.setItem('themeColor', color);
    /* 3D effects: set RGB components for rgba() usage */
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    if (m) {
        document.documentElement.style.setProperty('--theme-r', parseInt(m[1],16));
        document.documentElement.style.setProperty('--theme-g', parseInt(m[2],16));
        document.documentElement.style.setProperty('--theme-b', parseInt(m[3],16));
    }
    showToast('\ud83c\udfa8 \u4e3b\u9898\u8272\u5df2\u66f4\u6362', 'success');
    var p = document.getElementById('themeColorsPopup'); if (p) p.classList.remove('show');
}
document.addEventListener('click', function(e) {
    var p = document.getElementById('themeColorsPopup');
    var b = document.querySelector('.theme-colors-btn');
    if (p && b && !p.contains(e.target) && !btnContains(b, e.target)) p.classList.remove('show');
});
function btnContains(btn, target) { return btn === target || btn.contains(target); }

// ========== 游戏详情弹窗 ==========
function openGameModal(index) {
    var game = games[index]; if (!game) return;
    currentGameModalAppId = game.appId;
    document.getElementById('modalCover').src = steamImg + game.appId + '/header.jpg';
    document.getElementById('modalTitle').textContent = game.name;
    var tags = document.getElementById('modalTags'); tags.innerHTML = '';
    (game.genre || []).forEach(function(g) { var t = document.createElement('span'); t.className='game-modal-tag'; t.textContent=g; tags.appendChild(t); });
    document.getElementById('modalDesc').textContent = game.desc || '';
    var pt = (typeof estimatedPlaytime !== 'undefined' && estimatedPlaytime[game.appId]) ? estimatedPlaytime[game.appId] : 0;
    var ptStr = pt > 0 ? (pt >= 60 ? (pt/60).toFixed(1)+'h' : pt+'min') : '0h';
    document.getElementById('modalStats').innerHTML =
        '<div class="game-modal-stat"><div class="game-modal-stat-value">'+ptStr+'</div><div class="game-modal-stat-label">\u6e38\u73a9\u65f6\u957f</div></div>'+
        '<div class="game-modal-stat"><div class="game-modal-stat-value">'+(game.rating||0).toFixed(1)+'</div><div class="game-modal-stat-label">\u8bc4\u5206</div></div>'+
        '<div class="game-modal-stat"><div class="game-modal-stat-value">'+(game.ach?game.ach[0]+'/'+game.ach[1]:'N/A')+'</div><div class="game-modal-stat-label">\u6210\u5c31</div></div>';
    var achBar = document.getElementById('modalAchBar');
    if (game.ach && game.ach[1]>0) { var pct=Math.round(game.ach[0]/game.ach[1]*100); achBar.style.display='block'; document.getElementById('modalAchFill').style.width=pct+'%'; document.getElementById('modalAchText').textContent=game.ach[0]+'/'+game.ach[1]+' ('+pct+'%)'; }
    else { achBar.style.display='none'; document.getElementById('modalAchText').textContent=''; }
    document.getElementById('modalSteamLink').href='https://store.steampowered.com/app/'+game.appId;
    var notes=JSON.parse(localStorage.getItem('gameNotes')||'{}'); var gn=notes[game.appId]||{text:'',rating:0};
    document.getElementById('modalNotes').value=gn.text||'';
    renderRatingStars(gn.rating||0);
    document.getElementById('gameModalOverlay').classList.add('show');
    document.body.style.overflow='hidden';
}
function closeGameModal(e) { if(e&&e.target!==e.currentTarget) return; document.getElementById('gameModalOverlay').classList.remove('show'); document.body.style.overflow=''; currentGameModalAppId=null; }
function renderRatingStars(r) { var c=document.getElementById('modalRatingStars'),v=document.getElementById('modalRatingValue'); if(!c)return; c.innerHTML=''; for(var i=1;i<=5;i++){var s=document.createElement('span');s.className='rating-star'+(i<=r?' filled':'');s.textContent='\u2605';s.dataset.value=i;if(!isGuestMode()){s.onclick=function(){renderRatingStars(parseInt(this.dataset.value));if(v)v.textContent=this.dataset.value+'/5';};}c.appendChild(s);} if(v)v.textContent=r>0?r+'/5':'-'; }
function saveGameNotes() { if(isGuestMode()){showToast('访客只读模式下无法保存本地笔记','info');return;} if(!currentGameModalAppId)return; var n=JSON.parse(localStorage.getItem('gameNotes')||'{}'); var fs=document.getElementById('modalRatingStars').querySelectorAll('.rating-star.filled').length; n[currentGameModalAppId]={text:document.getElementById('modalNotes').value,rating:fs,updatedAt:Date.now()}; localStorage.setItem('gameNotes',JSON.stringify(n)); showToast('\ud83d\udcdd \u7b14\u8bb0\u5df2\u4fdd\u5b58','success'); }

// ========== Steam 状态 ==========
function initSteamStatus() {
    fetchFromAPI('/steam/profile').then(function(d) {
        var el=document.getElementById('steamStatus'),t=document.getElementById('steamStatusText');
        if (d) {
            steamDataMode = "steam";
            steamDataMessage = "Steam API Live";
        }
        if(el&&t&&d){
            if(d.personaState===0){el.className='steam-status offline';t.textContent='\u79bb\u7ebf';}
            else{el.className='steam-status online';t.textContent='\u5728\u7ebf';}
        }
        updateHomeDashboard();
    }).catch(function(){
        steamDataMode = "local";
        steamDataMessage = "Local Cache";
        updateHomeDashboard();
    });
}

// ========== 成就墙 ==========
function initAchievementWall() {
    var grid=document.getElementById('achievementGrid'); if(!grid)return;
    var ha=games.filter(function(g){return g.ach&&g.ach[1]>0;}).sort(function(a,b){return(b.ach[0]/b.ach[1])-(a.ach[0]/a.ach[1]);});
    grid.innerHTML='';
    ha.forEach(function(g){var pct=Math.round(g.ach[0]/g.ach[1]*100);var ip=g.ach[0]===g.ach[1];var c=document.createElement('div');c.className='achievement-card';c.style.cursor='pointer';c.onclick=function(){var i=games.indexOf(g);if(i>=0)openGameModal(i);};c.innerHTML=(ip?'<div class="achievement-badge">\u2728 \u5b8c\u7f8e</div>':'')+'<div class="achievement-icon">'+(ip?'\ud83c\udfc6':'\ud83c\udfaf')+'</div><div class="achievement-name">'+g.name+'</div><div class="achievement-detail">'+g.ach[0]+'/'+g.ach[1]+' \u6210\u5c31 \u00b7 '+pct+'%</div><div class="achievement-progress"><div class="achievement-progress-fill" style="width:'+pct+'%"></div></div>';grid.appendChild(c);});
}

// ========== 留言板 ==========
function initGuestbook() { renderGuestbook(); }
function submitGuestbook() { if(isGuestMode()){showToast('访客只读模式下无法发表留言','info');return;} var n=(document.getElementById('gbNickname').value||'').trim(),m=(document.getElementById('gbMessage').value||'').trim(); if(!n){showToast('\u8bf7\u8f93\u5165\u6635\u79f0','warning');return;} if(!m){showToast('\u8bf7\u8f93\u5165\u5185\u5bb9','warning');return;} var e=JSON.parse(localStorage.getItem('guestbook')||'[]'); e.unshift({nick:n,msg:m,time:Date.now()}); if(e.length>100)e=e.slice(0,100); localStorage.setItem('guestbook',JSON.stringify(e)); document.getElementById('gbMessage').value=''; renderGuestbook(); showToast('\ud83d\udcac \u53d1\u8868\u6210\u529f','success'); }
function renderGuestbook() { var l=document.getElementById('guestbookList'); if(!l)return; var e=JSON.parse(localStorage.getItem('guestbook')||'[]'); l.innerHTML=''; if(e.length===0){l.innerHTML='<p style="color:rgba(255,255,255,0.3);font-size:13px">\u8fd8\u6ca1\u6709\u7559\u8a00\uff0c\u6765\u53d1\u8868\u7b2c\u4e00\u6761\u5427~</p>';return;} e.forEach(function(entry,i){var d=document.createElement('div');d.className='guestbook-item';var ini=entry.nick.charAt(0).toUpperCase();var ts=new Date(entry.time).toLocaleString('zh-CN',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});var deleteButton=isGuestMode()?'':'<button class="gb-delete-btn" onclick="deleteGuestbook('+i+')" title="\u5220\u9664">\u2715</button>';d.innerHTML='<div class="guestbook-item-header"><div class="guestbook-avatar">'+ini+'</div><div><div class="guestbook-nick">'+entry.nick+'</div><div class="guestbook-time">'+ts+'</div></div>'+deleteButton+'</div><div class="guestbook-msg">'+entry.msg+'</div>';l.appendChild(d);}); }
function deleteGuestbook(i) { if(isGuestMode())return; var e=JSON.parse(localStorage.getItem('guestbook')||'[]'); e.splice(i,1); localStorage.setItem('guestbook',JSON.stringify(e)); renderGuestbook(); }

// ========== 图表 ==========
function drawPlaytimeChart() {
    var cv=document.getElementById('playtimeChart'); if(!cv)return; var ctx=cv.getContext('2d'); var dpr=window.devicePixelRatio||1; cv.width=300*dpr;cv.height=300*dpr;ctx.scale(dpr,dpr);
    var cx=150,cy=150,r=110,ir=65; var sorted=games.slice().sort(function(a,b){return((typeof estimatedPlaytime!=='undefined'?estimatedPlaytime[b.appId]:0)||0)-((typeof estimatedPlaytime!=='undefined'?estimatedPlaytime[a.appId]:0)||0);}).slice(0,8);
    var total=0; sorted.forEach(function(g){total+=(typeof estimatedPlaytime!=='undefined'?estimatedPlaytime[g.appId]:0)||0;}); if(total===0)total=1;
    var colors=['#6c5ce7','#a29bfe','#fd79a8','#e17055','#ffc312','#00b894','#0984e3','#636e72']; var leg=document.getElementById('playtimeLegend'); if(leg)leg.innerHTML=''; var sa=-Math.PI/2;
    sorted.forEach(function(g,i){var pt=(typeof estimatedPlaytime!=='undefined'?estimatedPlaytime[g.appId]:0)||0;var sl=(pt/total)*Math.PI*2;ctx.beginPath();ctx.arc(cx,cy,r,sa,sa+sl);ctx.arc(cx,cy,ir,sa+sl,sa,true);ctx.closePath();ctx.fillStyle=colors[i%colors.length];ctx.fill();sa+=sl;if(leg){var li=document.createElement('div');li.className='legend-item';li.innerHTML='<div class="legend-dot" style="background:'+colors[i%colors.length]+'"></div><span>'+g.name+' ('+(pt>=60?(pt/60).toFixed(1)+'h':pt+'min')+')</span>';leg.appendChild(li);}});
    ctx.fillStyle='rgba(255,255,255,0.9)';ctx.font='bold 18px Inter';ctx.textAlign='center';ctx.fillText(total>=60?(total/60).toFixed(1)+'h':total+'min',cx,cy-4);ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='12px Inter';ctx.fillText('\u603b\u65f6\u957f',cx,cy+14);
}
function drawGenreChart() {
    var cv=document.getElementById('genreChart'); if(!cv)return; var ctx=cv.getContext('2d'); var dpr=window.devicePixelRatio||1; cv.width=280*dpr;cv.height=280*dpr;ctx.scale(dpr,dpr);
    var gc={}; games.forEach(function(g){(g.genre||[]).forEach(function(gn){gc[gn]=(gc[gn]||0)+1;});}); var sorted=Object.entries(gc).sort(function(a,b){return b[1]-a[1];}).slice(0,8); var total=sorted.reduce(function(s,i){return s+i[1];},0); if(total===0)return;
    var colors=['#6c5ce7','#a29bfe','#fd79a8','#e17055','#ffc312','#00b894','#0984e3','#636e72']; var cx=140,cy=140,r=100,ir=50,sa=-Math.PI/2;
    sorted.forEach(function(item,i){var sl=(item[1]/total)*Math.PI*2;ctx.beginPath();ctx.arc(cx,cy,r,sa,sa+sl);ctx.arc(cx,cy,ir,sa+sl,sa,true);ctx.closePath();ctx.fillStyle=colors[i%colors.length];ctx.fill();if(sl>0.3){var mid=sa+sl/2;ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='10px Inter';ctx.textAlign='center';ctx.fillText(item[0],cx+(r+18)*Math.cos(mid),cy+(r+18)*Math.sin(mid));}sa+=sl;});
    ctx.fillStyle='rgba(255,255,255,0.9)';ctx.font='bold 16px Inter';ctx.textAlign='center';ctx.fillText(sorted.length+'\u79cd',cx,cy-2);
}
function drawHeatmap() {
    var grid=document.getElementById('heatmapGrid'); if(!grid)return; grid.innerHTML=''; var today=new Date();
    for(var i=364;i>=0;i--){var d=new Date(today);d.setDate(d.getDate()-i);var dow=d.getDay(),mo=d.getMonth();var act=0;if(dow===0||dow===6)act+=Math.floor(Math.random()*3);if((mo>=5&&mo<=7)||mo<=1)act+=Math.floor(Math.random()*2);act+=Math.random()>0.6?Math.floor(Math.random()*3):0;var lv=act>=7?4:act>=5?3:act>=3?2:act>=1?1:0;var div=document.createElement('div');div.className='heatmap-cell'+(lv>0?' level-'+lv:'');div.title=d.toLocaleDateString('zh-CN')+': '+act+'h';grid.appendChild(div);}
}
function drawTrendChart() {
    var cv=document.getElementById('trendChart'); if(!cv)return; var ctx=cv.getContext('2d'); var dpr=window.devicePixelRatio||1; var w=cv.parentElement.clientWidth||600,h=250; cv.width=w*dpr;cv.height=h*dpr;cv.style.width=w+'px';cv.style.height=h+'px';ctx.scale(dpr,dpr);
    var months=['1\u6708','2\u6708','3\u6708','4\u6708','5\u6708','6\u6708','7\u6708','8\u6708','9\u6708','10\u6708','11\u6708','12\u6708'];
    var data=months.map(function(m,i){var b=10+Math.random()*20;if(i>=5&&i<=7)b+=15;if(i<=1||i===11)b+=10;return Math.round(b);});
    var mx=Math.max.apply(null,data),pad={t:30,r:30,b:40,l:50},cw=w-pad.l-pad.r,ch=h-pad.t-pad.b;
    ctx.strokeStyle='rgba(255,255,255,0.05)';ctx.lineWidth=1;for(var i=0;i<=4;i++){var y=pad.t+(ch/4)*i;ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(w-pad.r,y);ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='10px Inter';ctx.textAlign='right';ctx.fillText(Math.round(mx-(mx/4)*i)+'h',pad.l-8,y+4);}
    data.forEach(function(v,i){var x=pad.l+(cw/11)*i;ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='10px Inter';ctx.textAlign='center';ctx.fillText(months[i],x,h-10);});
    var grad=ctx.createLinearGradient(0,pad.t,0,h-pad.b);grad.addColorStop(0,'rgba(108,92,231,0.3)');grad.addColorStop(1,'rgba(108,92,231,0)');
    ctx.beginPath();ctx.moveTo(pad.l,h-pad.b);data.forEach(function(v,i){var x=pad.l+(cw/11)*i,y=pad.t+ch-(v/mx)*ch;ctx.lineTo(x,y);});ctx.lineTo(pad.l+cw,h-pad.b);ctx.closePath();ctx.fillStyle=grad;ctx.fill();
    ctx.beginPath();data.forEach(function(v,i){var x=pad.l+(cw/11)*i,y=pad.t+ch-(v/mx)*ch;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);});ctx.strokeStyle='#6c5ce7';ctx.lineWidth=2.5;ctx.stroke();
    data.forEach(function(v,i){var x=pad.l+(cw/11)*i,y=pad.t+ch-(v/mx)*ch;ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fillStyle='#6c5ce7';ctx.fill();ctx.strokeStyle='#1a1a2e';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='10px Inter';ctx.textAlign='center';ctx.fillText(v+'h',x,y-10);});
}

// ========== Tier List ==========
function initTierList() {
    var c=document.getElementById('tierlistContainer'); if(!c)return; var tiers={S:[],A:[],B:[],C:[],D:[]};
    var s=localStorage.getItem('tierList'); if(s){try{tiers=JSON.parse(s);}catch(e){s=null;}}
    if(!s){games.forEach(function(g){var r=g.rating||7;if(r>=9.3)tiers.S.push(g.appId);else if(r>=8.5)tiers.A.push(g.appId);else if(r>=7.8)tiers.B.push(g.appId);else if(r>=7)tiers.C.push(g.appId);else tiers.D.push(g.appId);});localStorage.setItem('tierList',JSON.stringify(tiers));}
    renderTierList(tiers);
}
function renderTierList(tiers) {
    var c=document.getElementById('tierlistContainer'); if(!c)return; c.innerHTML=''; var tl={S:'tier-label-s',A:'tier-label-a',B:'tier-label-b',C:'tier-label-c',D:'tier-label-d'};
    Object.keys(tl).forEach(function(tier){var row=document.createElement('div');row.className='tier-row';var lbl=document.createElement('div');lbl.className='tier-label '+tl[tier];lbl.textContent=tier;var gd=document.createElement('div');gd.className='tier-games';gd.dataset.tier=tier;
    gd.addEventListener('dragover',function(e){e.preventDefault();this.classList.add('drag-over');});gd.addEventListener('dragleave',function(){this.classList.remove('drag-over');});
    gd.addEventListener('drop',function(e){e.preventDefault();this.classList.remove('drag-over');var aid=parseInt(e.dataTransfer.getData('text/plain')),ft=e.dataTransfer.getData('tier'),tt=this.dataset.tier;if(ft!==tt){var st=JSON.parse(localStorage.getItem('tierList')||'{}');if(st[ft])st[ft]=st[ft].filter(function(id){return id!==aid;});if(!st[tt])st[tt]=[];st[tt].push(aid);localStorage.setItem('tierList',JSON.stringify(st));renderTierList(st);}});
    (tiers[tier]||[]).forEach(function(aid){var g=games.find(function(g){return g.appId===aid;});if(!g)return;var ch=document.createElement('div');ch.className='tier-game-chip';ch.draggable=true;ch.textContent=g.name;ch.addEventListener('dragstart',function(e){e.dataTransfer.setData('text/plain',aid.toString());e.dataTransfer.setData('tier',tier);this.classList.add('dragging');});ch.addEventListener('dragend',function(){this.classList.remove('dragging');});gd.appendChild(ch);});
    row.appendChild(lbl);row.appendChild(gd);c.appendChild(row);});
}

// ========== 时间线 ==========
function initTimeline() {
    var c=document.getElementById('timelineContainer'); if(!c)return; c.innerHTML='';
    [{d:'2015',t:'\ud83c\udfae \u5165\u5751 Steam',x:'\u6ce8\u518c\u8d26\u53f7\uff0c\u5f00\u542fPC\u6e38\u620f\u4e4b\u65c5'},{d:'2018',t:'\ud83c\udfdf\ufe0f GTA V \u767e\u5c0f\u65f6',x:'GTA V\u6e38\u73a9\u65f6\u957f\u7a81\u7834100h'},{d:'2020',t:'\ud83c\udfc6 \u9996\u4e2a\u5b8c\u7f8e\u901a\u5173',x:'GTA V 77/77\u6210\u5c31'},{d:'2024',t:'\u2694\ufe0f CS2 \u65f6\u4ee3',x:'\u4eceCSGO\u5347\u7ea7CS2'},{d:'2026',t:'\ud83d\ude80 Gaming Hub',x:'\u6253\u9020\u4e2a\u4eba\u6e38\u620f\u4e3b\u9875'}
    ].forEach(function(item){var d=document.createElement('div');d.className='timeline-item reveal';d.innerHTML='<div class="timeline-dot"></div><div class="timeline-date">'+item.d+'</div><div class="timeline-title">'+item.t+'</div><div class="timeline-desc">'+item.x+'</div>';c.appendChild(d);});
}

// ========== 命令面板 ==========
var cmdCommands=[
    {icon:'🏠',label:'回到顶部',action:function(){scrollToTop();closeCmdPalette();}},
    {icon:'🎮',label:'游戏库',action:function(){scrollToSection('games');}},
    {icon:'🐾',label:'小诺猫记忆馆',action:function(){scrollToSection('memory-vault');}},
    {icon:'📀',label:'年度游戏报告',action:function(){scrollToSection('year-report');}},
    {icon:'🎨',label:'主题实验室',action:function(){scrollToSection('theme-lab');}},
    {icon:'🧭',label:'访客互动',action:function(){scrollToSection('visitor-lab');}},
    {icon:'🔧',label:'工具箱',action:function(){scrollToSection('tools');}},
    {icon:'🏆',label:'成就墙',action:function(){scrollToSection('achievements');}},
    {icon:'🏅',label:'Tier List',action:function(){scrollToSection('tierlist');}},
    {icon:'💬',label:'留言板',action:function(){scrollToSection('guestbook');}},
    {icon:'🌙',label:'切换主题',action:function(){toggleTheme();closeCmdPalette();}},
    {icon:'🎵',label:'音乐',action:function(){toggleBGM();closeCmdPalette();}},
    {icon:'🎲',label:'随机游戏',action:function(){randomGame();closeCmdPalette();}}
];
function initCmdPalette(){renderCmdList(cmdCommands);document.addEventListener('keydown',function(e){if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();openCmdPalette();}if(e.key==='Escape'){closeGameModal();closeCmdPalette();}});}
function openCmdPalette(){var o=document.getElementById('cmdPaletteOverlay');if(o){o.classList.add('show');var i=document.getElementById('cmdInput');if(i){i.value='';i.focus();}renderCmdList(cmdCommands);}}
function closeCmdPalette(e){if(e&&e.target!==e.currentTarget)return;var o=document.getElementById('cmdPaletteOverlay');if(o)o.classList.remove('show');}
function renderCmdList(cmds){var l=document.getElementById('cmdList');if(!l)return;l.innerHTML='';cmds.forEach(function(c){var i=document.createElement('div');i.className='cmd-palette-item';i.innerHTML='<span>'+c.icon+'</span><span>'+c.label+'</span>';i.onclick=c.action;l.appendChild(i);});}
function filterCmds(q){renderCmdList(cmdCommands.filter(function(c){return c.label.toLowerCase().includes(q.toLowerCase());}));}
function scrollToSection(id){closeCmdPalette();var e=document.getElementById(id);if(e)e.scrollIntoView({behavior:'smooth'});}
function scrollToTop(){window.scrollTo({top:0,behavior:'smooth'});}

// ========== Toast ==========
function showToast(msg,type){type=type||'info';var c=document.getElementById('toastContainer');if(!c)return;var icons={success:'\u2705',error:'\u274c',info:'\u2139\ufe0f',warning:'\u26a0\ufe0f'};var t=document.createElement('div');t.className='toast '+type;t.innerHTML='<span>'+(icons[type]||'\u2139\ufe0f')+'</span><span>'+msg+'</span>';c.appendChild(t);setTimeout(function(){t.classList.add('show');},10);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove();},300);},3000);}

// ========== FAB ==========
var fabOpen=false;
function toggleFab(){fabOpen=!fabOpen;var a=document.getElementById('fabActions'),m=document.getElementById('fabMain');if(a)a.classList.toggle('show',fabOpen);if(m)m.classList.toggle('open',fabOpen);}
function randomGame(){var i=Math.floor(Math.random()*games.length);openGameModal(i);showToast('\ud83c\udfb2 \u968f\u673a: '+games[i].name,'info');}

// ========== 打字效果 ==========
function initTypingEffect(){var el=document.querySelector('.hero-title');if(!el)return;var gs=el.querySelector('.gradient-text');if(!gs)return;gs.textContent='';var cur=document.createElement('span');cur.className='typing-cursor';cur.textContent='|';gs.appendChild(cur);var txt='\u6e38\u620f\u4e16\u754c',i=0;function tn(){if(i<txt.length){gs.insertBefore(document.createTextNode(txt.charAt(i)),cur);i++;setTimeout(tn,120+Math.random()*80);}else{setTimeout(function(){cur.remove();},2000);}}setTimeout(tn,800);}

// ========== 点击粒子 ==========
function initClickParticles(){document.addEventListener('click',function(e){var card=e.target.closest('.game-card');if(!card)return;var cols=['#6c5ce7','#a29bfe','#fd79a8','#e17055','#ffc312','#00b894'];for(var i=0;i<12;i++)createCP(e.clientX,e.clientY,cols[Math.floor(Math.random()*cols.length)]);});}
function createCP(x,y,c){var p=document.createElement('div');p.style.cssText='position:fixed;pointer-events:none;z-index:9997;width:6px;height:6px;border-radius:50%;background:'+c+';left:'+x+'px;top:'+y+'px;';document.body.appendChild(p);var a=Math.random()*Math.PI*2,sp=50+Math.random()*80,vx=Math.cos(a)*sp,vy=Math.sin(a)*sp,o=1;function an(){vx*=0.95;vy*=0.95;vy+=2;o-=0.025;p.style.left=(parseFloat(p.style.left)+vx*0.016)+'px';p.style.top=(parseFloat(p.style.top)+vy*0.016)+'px';p.style.opacity=o;if(o>0)requestAnimationFrame(an);else p.remove();}requestAnimationFrame(an);}

// ========== 卡片悬浮预览 ==========
function initGameCardPreview(){document.querySelectorAll('.game-card').forEach(function(c,i){if(c.querySelector('.game-card-preview'))return;var g=games[i];if(!g)return;var pv=document.createElement('div');pv.className='game-card-preview';var pt=(typeof estimatedPlaytime!=='undefined'?estimatedPlaytime[g.appId]:0)||0;pv.innerHTML='<div class="game-card-preview-stats"><span>\u23f1\ufe0f '+(pt>=60?(pt/60).toFixed(1)+'h':pt+'min')+'</span><span>\u2b50 '+(g.rating||0).toFixed(1)+'</span>'+(g.ach?'<span>\ud83c\udfc6 '+g.ach[0]+'/'+g.ach[1]+'</span>':'')+'</div>';c.style.position='relative';c.appendChild(pv);});}

// ========== PWA ==========
function initPWA(){if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').catch(function(){});}window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.deferredPrompt=e;});}
function dismissPWA(){var b=document.getElementById('pwaInstallBanner');if(b)b.classList.remove('show');}

// ========== 游戏卡片点击 ==========
function enhanceGameCards(){document.querySelectorAll('.game-card').forEach(function(c,i){c.style.cursor='pointer';if(c.dataset.boundModal==='1')return;c.dataset.boundModal='1';c.addEventListener('click',function(e){if(e.target.closest('a,button'))return;e.preventDefault();e.stopPropagation();var appId=parseInt(c.getAttribute('data-app-id'),10);var idx=games.findIndex(function(g){return g.appId===appId;});openGameModal(idx>=0?idx:i);});});}

// ========== 汉堡菜单 ==========
function toggleHamburger(){var h=document.getElementById('hamburger'),n=document.getElementById('navLinks');if(h&&n){h.classList.toggle('active');n.classList.toggle('open');}}

// ========== FAB 自动显示 + 导航高亮 ==========
function initScrollEnhancements(){
    var fab=document.querySelector('.fab-container');
    var navLinksList=document.querySelectorAll('.nav-links a');
    var sections=document.querySelectorAll('section[id]');
    window.addEventListener('scroll',function(){
        if(fab){if(window.pageYOffset>400)fab.classList.add('visible');else{fab.classList.remove('visible');var a=document.getElementById('fabActions'),m=document.getElementById('fabMain');if(a)a.classList.remove('show');if(m)m.classList.remove('open');fabOpen=false;}}
        var cur='';sections.forEach(function(s){if(window.pageYOffset>=s.offsetTop-120)cur=s.getAttribute('id');});
        navLinksList.forEach(function(l){l.classList.remove('active');if(l.getAttribute('href')==='#'+cur)l.classList.add('active');});
    });
    // 点击导航链接关闭汉堡菜单
    document.querySelectorAll('.nav-links a').forEach(function(link){link.addEventListener('click',function(){var h=document.getElementById('hamburger'),n=document.getElementById('navLinks');if(h)h.classList.remove('active');if(n)n.classList.remove('open');});});
}


// ================================================================
// UI 音效系统
// ================================================================
var uiSounds = {
    click: null,
    success: null,
    error: null,
    notify: null
};

function initSounds() {
    try {
        uiSounds.click = new Audio('click.wav');
        uiSounds.success = new Audio('success.wav');
        uiSounds.error = new Audio('error.wav');
        uiSounds.notify = new Audio('notify.wav');
        // 设置较小音量
        Object.values(uiSounds).forEach(function(s) { if(s) s.volume = 0.15; });
    } catch(e) {}
}

function playSound(type) {
    if (!uiSounds[type]) return;
    try {
        uiSounds[type].currentTime = 0;
        uiSounds[type].play().catch(function() {});
    } catch(e) {}
}

// 重写 showToast 加入音效
var _origShowToast = typeof showToast === 'function' ? showToast : null;
function showToastWithSound(msg, type) {
    if (_origShowToast) _origShowToast(msg, type);
    if (type === 'success') playSound('success');
    else if (type === 'error') playSound('error');
    else playSound('notify');
}

// 卡片点击音效
document.addEventListener('click', function(e) {
    if (e.target.closest('.game-card') || e.target.closest('.tool-card') || e.target.closest('.achievement-card')) {
        playSound('click');
    }
});

// 导航点击音效
document.addEventListener('click', function(e) {
    if (e.target.closest('.nav-links a') || e.target.closest('.fab-action')) {
        playSound('click');
    }
});

// ================================================================
// 初始化所有新功能 - 只追加，不修改原有代码

// ================================================================
// UI 音效系统
// ================================================================
var uiSounds = {
    click: null,
    success: null,
    error: null,
    notify: null
};

function initSounds() {
    try {
        uiSounds.click = new Audio('click.wav');
        uiSounds.success = new Audio('success.wav');
        uiSounds.error = new Audio('error.wav');
        uiSounds.notify = new Audio('notify.wav');
        // 设置较小音量
        Object.values(uiSounds).forEach(function(s) { if(s) s.volume = 0.15; });
    } catch(e) {}
}

function playSound(type) {
    if (!uiSounds[type]) return;
    try {
        uiSounds[type].currentTime = 0;
        uiSounds[type].play().catch(function() {});
    } catch(e) {}
}

// 重写 showToast 加入音效
var _origShowToast = typeof showToast === 'function' ? showToast : null;
function showToastWithSound(msg, type) {
    if (_origShowToast) _origShowToast(msg, type);
    if (type === 'success') playSound('success');
    else if (type === 'error') playSound('error');
    else playSound('notify');
}

// 卡片点击音效
document.addEventListener('click', function(e) {
    if (e.target.closest('.game-card') || e.target.closest('.tool-card') || e.target.closest('.achievement-card')) {
        playSound('click');
    }
});

// 导航点击音效
document.addEventListener('click', function(e) {
    if (e.target.closest('.nav-links a') || e.target.closest('.fab-action')) {
        playSound('click');
    }
});

// ================================================================
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        initSounds();
        initScrollProgressBar();
        initBGM();
        initSteamStatus();
        initCmdPalette();
        initTypingEffect();
        initPWA();
        enhanceGameCards();
        initScrollEnhancements();
        // 确保 reveal 元素被发现
        initScrollReveal();
        scheduleIdle(function() {
            initAchievementWall();
            initGuestbook();
            drawPlaytimeChart();
            drawGenreChart();
        }, 900);
        scheduleIdle(function() {
            drawHeatmap();
            drawTrendChart();
            initTierList();
            initTimeline();
            initClickParticles();
            initGameCardPreview();
        }, 1600);
        console.log('All features loaded');
    }, 800);
});

// 页面完全加载后再次扫描 reveal 元素
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelectorAll('.reveal:not(.revealed)').forEach(function(el) {
            var obs = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) entry.target.classList.add('revealed');
                });
            }, { threshold: 0.05 });
            obs.observe(el);
        });
    }, 200);
});




// ================================================================
// 高级升级 JS
// ================================================================

// ========== 实时系统监控 ==========
function initSystemMonitor() {
    var container = document.querySelector('.sysinfo-grid');
    if (!container) return;
    
    // 创建监控面板
    var monitor = document.createElement('div');
    monitor.className = 'sys-monitor';
    monitor.id = 'sysMonitor';
    monitor.innerHTML = 
        '<div class="sys-monitor-item"><div class="sys-monitor-icon">🧠</div><div class="sys-monitor-value" id="monCPU">-</div><div class="sys-monitor-label">CPU 使用率</div><div class="sys-monitor-bar"><div class="sys-monitor-bar-fill" id="monCPUBar"></div></div></div>' +
        '<div class="sys-monitor-item"><div class="sys-monitor-icon">💾</div><div class="sys-monitor-value" id="monMem">-</div><div class="sys-monitor-label">内存使用</div><div class="sys-monitor-bar"><div class="sys-monitor-bar-fill" id="monMemBar"></div></div></div>' +
        '<div class="sys-monitor-item"><div class="sys-monitor-icon">🌐</div><div class="sys-monitor-value" id="monNet">-</div><div class="sys-monitor-label">网络状态</div><div class="sys-monitor-bar"><div class="sys-monitor-bar-fill" id="monNetBar"></div></div></div>' +
        '<div class="sys-monitor-item"><div class="sys-monitor-icon">🔋</div><div class="sys-monitor-value" id="monBat">-</div><div class="sys-monitor-label">电池电量</div><div class="sys-monitor-bar"><div class="sys-monitor-bar-fill" id="monBatBar"></div></div></div>';
    
    // 插入到系统信息卡片后面
    var sysCard = container.closest('.tool-card');
    if (sysCard) {
        var newCard = document.createElement('div');
        newCard.className = 'tool-card tool-card-wide';
        newCard.innerHTML = '<div class="tool-card-header"><span class="tool-icon">📊</span><h3>实时系统监控</h3></div>';
        newCard.appendChild(monitor);
        sysCard.parentNode.insertBefore(newCard, sysCard.nextSibling);
    }
    
    // 更新监控数据
    updateSystemMonitor();
    setInterval(updateSystemMonitor, 3000);
}

function updateSystemMonitor() {
    // CPU（模拟，基于页面性能）
    var cpuBase = 15 + Math.sin(Date.now() / 5000) * 10 + Math.random() * 8;
    var cpu = Math.min(99, Math.max(5, Math.round(cpuBase)));
    var cpuEl = document.getElementById('monCPU');
    var cpuBar = document.getElementById('monCPUBar');
    if (cpuEl) cpuEl.textContent = cpu + '%';
        // 更新导航栏 CPU 指示器
        var cpuDot = document.getElementById('cpuDot');
        var cpuText = document.getElementById('cpuText');
        if (cpuDot) { cpuDot.className = 'cpu-dot' + (cpu > 80 ? ' danger' : cpu > 60 ? ' warn' : ''); }
        if (cpuText) cpuText.textContent = 'CPU ' + cpu + '%';
    if (cpuBar) { cpuBar.style.width = cpu + '%'; cpuBar.className = 'sys-monitor-bar-fill' + (cpu > 80 ? ' danger' : cpu > 60 ? ' warn' : ''); }
    
    // 内存（模拟）
    var mem = 45 + Math.round(Math.sin(Date.now() / 8000) * 15 + Math.random() * 5);
    var memEl = document.getElementById('monMem');
    var memBar = document.getElementById('monMemBar');
    if (memEl) memEl.textContent = mem + '%';
    if (memBar) { memBar.style.width = mem + '%'; memBar.className = 'sys-monitor-bar-fill' + (mem > 85 ? ' danger' : mem > 70 ? ' warn' : ''); }
    
    // 网络（基于 navigator.onLine + 连接信息）
    var netStatus = navigator.onLine ? '在线' : '离线';
    var netSpeed = navigator.connection ? navigator.connection.downlink + ' Mbps' : '-';
    var netEl = document.getElementById('monNet');
    var netBar = document.getElementById('monNetBar');
    if (netEl) netEl.textContent = netStatus;
    if (netBar) netBar.style.width = navigator.onLine ? '100%' : '0%';
    
    // 电池
    if (navigator.getBattery) {
        navigator.getBattery().then(function(bat) {
            var batEl = document.getElementById('monBat');
            var batBar = document.getElementById('monBatBar');
            var pct = Math.round(bat.level * 100);
            if (batEl) batEl.textContent = pct + '%';
            if (batBar) { batBar.style.width = pct + '%'; batBar.className = 'sys-monitor-bar-fill' + (pct < 20 ? ' danger' : pct < 40 ? ' warn' : ''); }
        });
    } else {
        var batEl2 = document.getElementById('monBat');
        var batBar2 = document.getElementById('monBatBar');
        if (batEl2) batEl2.textContent = 'N/A';
        if (batBar2) batBar2.style.width = '0%';
    }
}

// ========== 键盘快捷键提示 ==========
function initKbdHint() {
    var hint = document.getElementById('kbdHint');
    if (!hint) return;
    
    // 页面加载 3 秒后显示
    setTimeout(function() { hint.classList.add('show'); }, 3000);
    // 5 秒后自动隐藏
    setTimeout(function() { hint.classList.remove('show'); }, 8000);
    
    // 鼠标移到 FAB 区域时再次显示
    var fab = document.querySelector('.fab-container');
    if (fab) {
        fab.addEventListener('mouseenter', function() { hint.classList.add('show'); });
        fab.addEventListener('mouseleave', function() { setTimeout(function() { hint.classList.remove('show'); }, 2000); });
    }
}

// ========== 最近在玩 ==========
function initRecentlyPlaying() {
    // 尝试从 Steam API 获取最近游玩
    fetchFromAPI('/steam/recent').then(function(data) {
        if (data && data.games && data.games.length > 0) {
            var game = data.games[0];
            var cover = document.getElementById('rpCover');
            var name = document.getElementById('rpName');
            var time = document.getElementById('rpTime');
            if (cover) cover.src = 'https://cdn.akamai.steamstatic.com/steam/apps/' + game.appId + '/header.jpg';
            if (name) name.textContent = game.name;
            if (time) time.textContent = Math.round(game.playtimeForever / 60) + ' 小时';
        }
    }).catch(function() {});
}

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    scheduleIdle(function() {
        initSystemMonitor();
        initKbdHint();
        initRecentlyPlaying();
    }, 2200);
});






// ================================================================
// 零度协议 // PROTOCOL ZERO — JS 覆盖层
// ================================================================

// ---------- 二进制雨效果 ----------
(function initBinaryRain() {
    var container = document.getElementById('binaryRain');
    if (!container) return;
    var chars = '01零度协议ABCDEF';
    var colCount = Math.floor(window.innerWidth / 25);
    for (var i = 0; i < colCount; i++) {
        var col = document.createElement('div');
        col.className = 'binary-rain-col';
        col.style.left = (i * 25) + 'px';
        col.style.animationDuration = (8 + Math.random() * 15) + 's';
        col.style.animationDelay = (Math.random() * 10) + 's';
        col.style.fontSize = (10 + Math.random() * 6) + 'px';
        var text = '';
        for (var j = 0; j < 30; j++) {
            text += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        col.textContent = text;
        container.appendChild(col);
    }
})();
// ---------- 覆盖打字效果 ----------
(function overrideTypingEffect() {
    var origInit = window.initTypingEffect;
    window.initTypingEffect = function() {
        var el = document.querySelector('.hero-title');
        if (!el) return;
        var gs = el.querySelector('.gradient-text');
        if (!gs) return;
        gs.textContent = '';
        gs.setAttribute('data-text', '');
        var cur = document.createElement('span');
        cur.className = 'typing-cursor';
        cur.textContent = '|';
        gs.appendChild(cur);
        var txt = '零度协议已激活 · 执行者 LX 已上线';
        var i = 0;
        function tn() {
            if (i < txt.length) {
                gs.insertBefore(document.createTextNode(txt.charAt(i)), cur);
                gs.setAttribute('data-text', gs.textContent.replace('|', ''));
                i++;
                setTimeout(tn, 80 + Math.random() * 60);
            } else {
                setTimeout(function() {
                    cur.style.animation = 'cursorBlink 1s infinite';
                }, 1500);
            }
        }
        setTimeout(tn, 600);
    };
})();

// ---------- 覆盖命令面板标签 ----------
(function overrideCmdPalette() {
    var origInit = window.initCmdPalette;
    window.initCmdPalette = function() {
        // 协议风格命令列表
        var protocolCommands = [
            {icon: '⬆️', label: '返回协议顶层', action: function(){scrollToTop();closeCmdPalette();}},
            {icon: '🎯', label: '武器库', action: function(){scrollToSection('games');}},
            {icon: '🐾', label: '小诺猫记忆馆', action: function(){scrollToSection('memory-vault');}},
            {icon: '📀', label: '年度游戏报告', action: function(){scrollToSection('year-report');}},
            {icon: '🎨', label: '主题实验室', action: function(){scrollToSection('theme-lab');}},
            {icon: '🧭', label: '访客互动', action: function(){scrollToSection('visitor-lab');}},
            {icon: '🔧', label: '协议工具', action: function(){scrollToSection('tools');}},
            {icon: '🏆', label: '节点解锁', action: function(){scrollToSection('achievements');}},
            {icon: '📊', label: 'Tier List', action: function(){scrollToSection('tierlist');}},
            {icon: '💬', label: '留言终端', action: function(){scrollToSection('guestbook');}},
            {icon: '🌙', label: '切换暗/亮模式', action: function(){toggleTheme();closeCmdPalette();}},
            {icon: '🎵', label: 'BGM 控制', action: function(){toggleBGM();closeCmdPalette();}},
            {icon: '🎲', label: '随机任务', action: function(){randomGame();closeCmdPalette();}},
            {icon: '📡', label: '执行报告', action: function(){scrollToSection('stats');closeCmdPalette();}},
            {icon: '📈', label: '执行数据', action: function(){scrollToSection('dataviz');closeCmdPalette();}},
            {icon: '👤', label: '执行者档案', action: function(){window.open('profile.html','_blank');closeCmdPalette();}}
        ];
        renderCmdList(protocolCommands);
        window._protocolCmdCommands = protocolCommands;
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openCmdPalette(); }
            if (e.key === 'Escape') { closeGameModal(); closeCmdPalette(); }
        });
    };
    // 覆盖 filterCmds
    var origFilter = window.filterCmds;
    window.filterCmds = function(q) {
        var cmds = window._protocolCmdCommands || cmdCommands;
        renderCmdList(cmds.filter(function(c) { return c.label.toLowerCase().includes(q.toLowerCase()); }));
    };
    // 覆盖 openCmdPalette
    var origOpen = window.openCmdPalette;
    window.openCmdPalette = function() {
        var o = document.getElementById('cmdPaletteOverlay');
        if (o) {
            o.classList.add('show');
            var i = document.getElementById('cmdInput');
            if (i) { i.value = ''; i.focus(); }
            var cmds = window._protocolCmdCommands || cmdCommands;
            renderCmdList(cmds);
        }
    };
})();

// ---------- 覆盖 Toast 消息协议风格 ----------
(function overrideToast() {
    var origShowToast = window.showToast;
    window.showToast = function(msg, type) {
        type = type || 'info';
        // 添加 [PROTOCOL] 前缀
        if (!msg.startsWith('[PROTOCOL]') && !msg.startsWith('🎨')) {
            msg = '[PROTOCOL] ' + msg;
        }
        var c = document.getElementById('toastContainer');
        if (!c) return;
        var icons = {success: '✅', error: '❌', info: '📡', warning: '⚠️'};
        var t = document.createElement('div');
        t.className = 'toast ' + type;
        t.innerHTML = '<span>' + (icons[type] || '📡') + '</span><span>' + msg + '</span>';
        c.appendChild(t);
        setTimeout(function() { t.classList.add('show'); }, 10);
        setTimeout(function() {
            t.classList.remove('show');
            setTimeout(function() { t.remove(); }, 300);
        }, 3000);
        // 播放音效
        if (typeof playSound === 'function') {
            if (type === 'success') playSound('success');
            else if (type === 'error') playSound('error');
            else playSound('notify');
        }
    };
})();

// ---------- 覆盖点击粒子颜色为冰蓝色系 ----------
(function overrideClickParticles() {
    var origCreateCP = window.createCP;
    window.createCP = function(x, y, c) {
        var p = document.createElement('div');
        p.style.cssText = 'position:fixed;pointer-events:none;z-index:9997;width:6px;height:6px;border-radius:50%;background:' + c + ';left:' + x + 'px;top:' + y + 'px;';
        document.body.appendChild(p);
        var a = Math.random() * Math.PI * 2, sp = 50 + Math.random() * 80;
        var vx = Math.cos(a) * sp, vy = Math.sin(a) * sp, o = 1;
        function an() {
            vx *= 0.95; vy *= 0.95; vy += 2; o -= 0.025;
            p.style.left = (parseFloat(p.style.left) + vx * 0.016) + 'px';
            p.style.top = (parseFloat(p.style.top) + vy * 0.016) + 'px';
            p.style.opacity = o;
            if (o > 0) requestAnimationFrame(an); else p.remove();
        }
        requestAnimationFrame(an);
    };
    // 覆盖 initClickParticles 使用冰蓝色系
    window.initClickParticles = function() {
        document.addEventListener('click', function(e) {
            var card = e.target.closest('.game-card');
            if (!card) return;
            var cols = ['#00d4ff', '#00ff88', '#0099cc', '#66e0ff', '#33ffbb', '#0088aa'];
            for (var i = 0; i < 12; i++) createCP(e.clientX, e.clientY, cols[Math.floor(Math.random() * cols.length)]);
        });
    };
})();


// ---------- 覆盖随机游戏的 Toast ----------
(function overrideRandomGame() {
    var origRandom = window.randomGame;
    window.randomGame = function() {
        var i = Math.floor(Math.random() * games.length);
        openGameModal(i);
        showToast('随机任务: ' + games[i].name, 'info');
    };
})();

// ---------- 覆盖主题色切换，锁定冰蓝色为默认 ----------
(function overrideThemeColor() {
    // 页面加载后设置冰蓝色
    var saved = localStorage.getItem('themeColor');
    if (!saved || saved === '#6c5ce7') {
        document.documentElement.style.setProperty('--accent', '#00d4ff');
        document.documentElement.style.setProperty('--primary', '#00d4ff');
        localStorage.setItem('themeColor', '#00d4ff');
    }
})();

// ---------- 协议状态提示 ----------
(function protocolStatus() {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            showToast('协议初始化完成 · 执行者 LX 已上线', 'success');
        }, 2500);
        setTimeout(function() {
            showToast('按 Ctrl+K 打开命令终端', 'info');
        }, 6000);
    });
})();

// ---------- 保存 BGM 进度 ----------
setInterval(function() {
    var audio = document.getElementById('bgmAudio');
    if (audio && bgmPlaying) localStorage.setItem('bgmTime', audio.currentTime);
}, 5000);

// ================================================================
// 零度协议 v2 — 入场系统 + BGM 解锁 + 彩蛋
// ================================================================

// ---------- 协议入场系统 ----------
(function protocolEntry() {
    // 等待 DOM 加载
    function init() {
        var overlay = document.getElementById('protocolEntry');
        if (!overlay) return;

        var titleEl = document.getElementById('entryTitle');
        var btn = document.getElementById('entryBtn');
        var statusLines = [
            document.getElementById('entryStatus1'),
            document.getElementById('entryStatus2'),
            document.getElementById('entryStatus3'),
            document.getElementById('entryStatus4')
        ];

        // 打字效果：标题
        var titleText = '零度协议 // PROTOCOL ZERO';
        var ti = 0;
        function typeTitle() {
            if (ti < titleText.length && titleEl) {
                titleEl.textContent += titleText.charAt(ti);
                ti++;
                setTimeout(typeTitle, 60 + Math.random() * 40);
            }
        }
        setTimeout(typeTitle, 500);

        // 逐行显示状态
        statusLines.forEach(function(line, idx) {
            if (!line) return;
            setTimeout(function() {
                line.classList.add('show');
            }, 1200 + idx * 600);
        });

        // 显示按钮
        setTimeout(function() {
            if (btn) btn.classList.add('show');
        }, 3800);

        // 安全网：10秒后强制显示按钮并允许点击整个遮罩
        setTimeout(function() {
            if (!entered) {
                if (btn) { btn.style.opacity = '1'; btn.style.transition = 'opacity 0.3s'; }
                overlay.style.cursor = 'pointer';
            }
        }, 10000);

        // 防重复执行锁
        var entered = false;

        // 点击进入
        function enterProtocol() {
            if (entered) return;
            entered = true;

            try {
                // 播放 BGM（这是用户手势，浏览器允许！）
                unlockBGM();
            } catch(e) {
                console.log('[PROTOCOL] BGM unlock error:', e);
            }

            // 隐藏遮罩
            overlay.classList.add('hidden');

            // 恢复页面 section 可见性
            setTimeout(function() {
                document.querySelectorAll('section').forEach(function(s) {
                    s.style.opacity = '1';
                    s.style.transform = 'translateY(0)';
                });
                // 触发 reveal 动画
                if (typeof initScrollReveal === 'function') initScrollReveal();
            }, 300);

            // 移除遮罩 DOM
            setTimeout(function() {
                if (overlay && overlay.parentNode) overlay.remove();
            }, 1000);

            // 移除所有事件监听
            overlay.removeEventListener('click', enterProtocol);
            overlay.removeEventListener('touchstart', enterProtocol);
            overlay.removeEventListener('keydown', enterProtocol);
        }

        // 绑定事件 - 同时绑 click + touchstart，确保所有设备都能响应
        overlay.addEventListener('click', enterProtocol);
        overlay.addEventListener('touchstart', enterProtocol, { passive: true });
        // 按钮也直接绑定，双重保障
        if (btn) {
            btn.addEventListener('click', function(e) { e.stopPropagation(); enterProtocol(); });
            btn.addEventListener('touchstart', function(e) { e.stopPropagation(); enterProtocol(); }, { passive: true });
        }
        // 也允许键盘进入（Enter 或 Space）
        overlay.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                enterProtocol();
            }
        });
        // 确保 overlay 可聚焦
        overlay.setAttribute('tabindex', '0');
        overlay.focus();
        window.enterProtocol = enterProtocol;
        if (window.location.hash) {
            setTimeout(enterProtocol, 120);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// ---------- BGM 解锁（由入场遮罩调用） ----------
function unlockBGM() {
    var audio = document.getElementById('bgmAudio');
    if (!audio) return;

    // 设置音量
    audio.volume = 0.3;
    var savedVol = localStorage.getItem('bgmVolume');
    if (savedVol !== null && !isNaN(parseFloat(savedVol))) {
        audio.volume = parseFloat(savedVol);
    }
    var volSlider = document.getElementById('bgmVolume');
    if (volSlider) volSlider.value = Math.round(audio.volume * 100);

    // 恢复播放位置
    try {
        var savedTime = localStorage.getItem('bgmTime');
        if (savedTime && !isNaN(parseFloat(savedTime))) {
            audio.currentTime = parseFloat(savedTime);
        }
    } catch(e) {}

    // 尝试播放
    var playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(function() {
            bgmPlaying = true;
            bgmAudio = audio;
            var btn = document.getElementById('bgmPlayBtn');
            if (btn) btn.textContent = '\u23f8\ufe0f';
            setVisualizerActive(true);
            var info = document.getElementById('bgmInfo');
            if (info) info.textContent = 'BGM \u2714';
            console.log('[PROTOCOL] BGM 已解锁并播放');
        }).catch(function(e) {
            console.log('[PROTOCOL] BGM 播放失败:', e.message);
            // 备用方案：AudioContext 解锁
            tryAudioContextUnlock(audio);
        });
    }

    // 覆盖 toggleBGM 使用正确引用
    window.toggleBGM = function() {
        if (!audio) return;
        if (bgmPlaying) {
            audio.pause();
            bgmPlaying = false;
            var btn = document.getElementById('bgmPlayBtn');
            if (btn) btn.textContent = '\u25b6\ufe0f';
            setVisualizerActive(false);
            localStorage.setItem('bgmTime', audio.currentTime);
        } else {
            audio.play().then(function() {
                bgmPlaying = true;
                bgmAudio = audio;
                var btn = document.getElementById('bgmPlayBtn');
                if (btn) btn.textContent = '\u23f8\ufe0f';
                setVisualizerActive(true);
            }).catch(function() {});
        }
    };
}

// AudioContext 备用解锁方案
function tryAudioContextUnlock(audio) {
    try {
        var ctx = new (window.AudioContext || window.webkitAudioContext)();
        // 创建一个静音 buffer 来解锁
        var buffer = ctx.createBuffer(1, 1, 22050);
        var source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);

        // 等待 AudioContext 激活后重试播放
        ctx.onstatechange = function() {
            if (ctx.state === 'running') {
                audio.play().then(function() {
                    bgmPlaying = true;
                    bgmAudio = audio;
                    var btn = document.getElementById('bgmPlayBtn');
                    if (btn) btn.textContent = '\u23f8\ufe0f';
                    setVisualizerActive(true);
                    console.log('[PROTOCOL] BGM 通过 AudioContext 解锁成功');
                }).catch(function() {});
                ctx.close();
            }
        };
    } catch(e) {
        console.log('[PROTOCOL] AudioContext 解锁也失败:', e.message);
    }
}

// ---------- Konami Code 彩蛋 ----------
(function konamiCode() {
    var code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    var pos = 0;
    var activated = false;

    document.addEventListener('keydown', function(e) {
        if (activated) return;
        if (e.keyCode === code[pos]) {
            pos++;
            if (pos === code.length) {
                activated = true;
                activateKonami();
            }
        } else {
            pos = 0;
        }
    });

    function activateKonami() {
        // 显示彩蛋弹窗
        var toast = document.createElement('div');
        toast.className = 'konami-toast';
        toast.innerHTML = '<h2>⬡ 协议隐藏指令已激活</h2><p>KONAMI CODE ACCEPTED · 执行者权限提升至 S+</p>';
        document.body.appendChild(toast);
        setTimeout(function() { toast.classList.add('show'); }, 50);

        // 全屏粒子爆发
        for (var i = 0; i < 50; i++) {
            (function(idx) {
                setTimeout(function() {
                    var x = Math.random() * window.innerWidth;
                    var y = Math.random() * window.innerHeight;
                    var cols = ['#00d4ff', '#00ff88', '#ffaa00', '#ff3366'];
                    createCP(x, y, cols[Math.floor(Math.random() * cols.length)]);
                }, idx * 30);
            })(i);
        }

        // 5 秒后消失
        setTimeout(function() {
            toast.classList.remove('show');
            setTimeout(function() { toast.remove(); }, 500);
        }, 5000);
    }
})();

// ---------- 入场后初始化 section 可见性 ----------
(function fixSectionVisibility() {
    // 确保入场遮罩消失后 section 能正常显示
    var observer = new MutationObserver(function() {
        var overlay = document.getElementById('protocolEntry');
        if (!overlay || overlay.classList.contains('hidden')) {
            // 入场完成，让所有 section 可见
            document.querySelectorAll('section').forEach(function(s) {
                if (!s.classList.contains('revealed')) {
                    s.style.opacity = '1';
                    s.style.transform = 'translateY(0)';
                }
            });
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            var overlay = document.getElementById('protocolEntry');
            if (overlay) {
                observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });
            }
        });
    } else {
        var overlay = document.getElementById('protocolEntry');
        if (overlay) {
            observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });
        }
    }
})();

// ---------- 入场后显示欢迎 Toast ----------
(function welcomeToast() {
    document.addEventListener('DOMContentLoaded', function() {
        // 监听入场遮罩消失
        var checkInterval = setInterval(function() {
            var overlay = document.getElementById('protocolEntry');
            if (!overlay || overlay.classList.contains('hidden')) {
                clearInterval(checkInterval);
                setTimeout(function() {
                    if (typeof showToast === 'function') {
                        showToast('协议初始化完成 · 执行者 LX 已上线', 'success');
                    }
                }, 1000);
                setTimeout(function() {
                    if (typeof showToast === 'function') {
                        showToast('按 Ctrl+K 打开命令终端 · 输入 ↑↑↓↓←→←→BA 解锁隐藏指令', 'info');
                    }
                }, 4000);
            }
        }, 500);
    });
})();

