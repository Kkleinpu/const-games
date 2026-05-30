require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Steam API 配置
const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = process.env.STEAM_ID;

// 验证环境变量
if (!STEAM_API_KEY || !STEAM_ID) {
    console.error('错误：请在 .env 文件中配置 STEAM_API_KEY 和 STEAM_ID');
    console.error('请复制 .env.example 为 .env 并填写配置');
    process.exit(1);
}

// 静态文件服务
app.use(express.static(path.join(__dirname)));

// API 路由

// 获取玩家资料
app.get('/api/steam/profile', async (req, res) => {
    try {
        const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.response && data.response.players && data.response.players.length > 0) {
            const player = data.response.players[0];
            res.json({
                success: true,
                data: {
                    steamId: player.steamid,
                    personaName: player.personaname,
                    avatarFull: player.avatarfull,
                    profileUrl: player.profileurl,
                    countryCode: player.loccountrycode,
                    stateCode: player.loccityid,
                    timeCreated: player.timecreated,
                    lastLogoff: player.lastlogoff,
                    personaState: player.personastate,
                    communityVisibilityState: player.communityvisibilitystate
                }
            });
        } else {
            res.json({ success: false, error: '无法获取玩家资料' });
        }
    } catch (error) {
        console.error('获取玩家资料失败:', error);
        res.json({ success: false, error: error.message });
    }
});

// 获取游戏列表和游玩时长
app.get('/api/steam/games', async (req, res) => {
    try {
        const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&include_appinfo=1&include_played_free_games=1&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.response && data.response.games) {
            const games = data.response.games.map(game => ({
                appId: game.appid,
                name: game.name,
                playtimeForever: game.playtime_forever,
                playtime2weeks: game.playtime_2weeks || 0,
                imgIconUrl: game.img_icon_url,
                rtimeLastPlayed: game.rtime_last_played
            }));
            
            // 按游玩时长排序
            games.sort((a, b) => b.playtimeForever - a.playtimeForever);
            
            res.json({
                success: true,
                data: {
                    gameCount: data.response.game_count,
                    games: games
                }
            });
        } else {
            res.json({ success: false, error: '无法获取游戏列表' });
        }
    } catch (error) {
        console.error('获取游戏列表失败:', error);
        res.json({ success: false, error: error.message });
    }
});

// 获取最近游玩游戏
app.get('/api/steam/recent', async (req, res) => {
    try {
        const url = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.response && data.response.games) {
            const games = data.response.games.map(game => ({
                appId: game.appid,
                name: game.name,
                playtime2weeks: game.playtime_2weeks,
                playtimeForever: game.playtime_forever,
                imgIconUrl: game.img_icon_url
            }));
            
            res.json({
                success: true,
                data: {
                    totalCount: data.response.total_count,
                    games: games
                }
            });
        } else {
            res.json({ success: true, data: { totalCount: 0, games: [] } });
        }
    } catch (error) {
        console.error('获取最近游玩游戏失败:', error);
        res.json({ success: false, error: error.message });
    }
});

// 获取 Steam 等级
app.get('/api/steam/level', async (req, res) => {
    try {
        const url = `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.response) {
            res.json({
                success: true,
                data: {
                    level: data.response.player_level
                }
            });
        } else {
            res.json({ success: false, error: '无法获取 Steam 等级' });
        }
    } catch (error) {
        console.error('获取 Steam 等级失败:', error);
        res.json({ success: false, error: error.message });
    }
});

// 获取游戏成就
app.get('/api/steam/achievements/:appId', async (req, res) => {
    try {
        const { appId } = req.params;
        const url = `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&appid=${appId}&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.playerstats && data.playerstats.achievements) {
            const achievements = data.playerstats.achievements;
            const achieved = achievements.filter(a => a.achieved === 1).length;
            const total = achievements.length;
            
            res.json({
                success: true,
                data: {
                    appId: parseInt(appId),
                    gameName: data.playerstats.gameName,
                    achieved: achieved,
                    total: total,
                    percentage: Math.round((achieved / total) * 100)
                }
            });
        } else {
            res.json({ success: false, error: '无法获取成就数据（游戏可能没有成就系统）' });
        }
    } catch (error) {
        console.error('获取游戏成就失败:', error);
        res.json({ success: false, error: error.message });
    }
});

// 根路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🎮 Gaming Hub 服务器运行在 http://localhost:${PORT}`);
    console.log(`📡 Steam API 代理已就绪`);
    console.log(`👤 Steam ID: ${STEAM_ID}`);
});