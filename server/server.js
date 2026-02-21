const express = require('express');
const cors = require('cors');
const path = require('path');
const {
    initializeDatabase,
    recordClick,
    getTotalInteractions,
    getUniqueUsers,
    getRepeatUsers,
    getTopUsers,
    getClicksByAgent,
    getUserDetails,
    getUserInteractionCount,
    getAgentDetails,
    getAgentUsageCount,
    getMetricsComparison
} = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from parent directory (the main website)
app.use(express.static(path.join(__dirname, '..')));

// Initialize database on startup
initializeDatabase();

// Helper function to get date ranges based on period
function getDateRange(period) {
    const now = new Date();
    const end = now.toISOString();
    let start, previousStart, previousEnd;
    
    switch (period) {
        case 'day':
            start = new Date(now.setDate(now.getDate() - 1)).toISOString();
            previousEnd = start;
            previousStart = new Date(now.setDate(now.getDate() - 1)).toISOString();
            break;
        case 'week':
            start = new Date(now.setDate(now.getDate() - 7)).toISOString();
            previousEnd = start;
            previousStart = new Date(now.setDate(now.getDate() - 7)).toISOString();
            break;
        case 'month':
            start = new Date(now.setMonth(now.getMonth() - 1)).toISOString();
            previousEnd = start;
            previousStart = new Date(now.setMonth(now.getMonth() - 1)).toISOString();
            break;
        case 'year':
            start = new Date(now.setFullYear(now.getFullYear() - 1)).toISOString();
            previousEnd = start;
            previousStart = new Date(now.setFullYear(now.getFullYear() - 1)).toISOString();
            break;
        default:
            start = new Date(now.setDate(now.getDate() - 7)).toISOString();
            previousEnd = start;
            previousStart = new Date(now.setDate(now.getDate() - 7)).toISOString();
    }
    
    return { 
        start, 
        end: new Date().toISOString(), 
        previousStart, 
        previousEnd 
    };
}

// ============================================
// API ENDPOINTS
// ============================================

// Track a gem click
app.post('/api/track-click', (req, res) => {
    try {
        const { gemName, gemCategory, userEmail, userName } = req.body;
        const ipAddress = req.ip || req.connection.remoteAddress;
        const userAgent = req.headers['user-agent'];
        
        if (!gemName) {
            return res.status(400).json({ error: 'gemName is required' });
        }
        
        const result = recordClick({
            gemName,
            gemCategory,
            userEmail: userEmail || null,
            userName: userName || null,
            ipAddress,
            userAgent
        });
        
        res.json({ 
            success: true, 
            message: 'Click recorded',
            id: result.lastInsertRowid 
        });
    } catch (error) {
        console.error('Error recording click:', error);
        res.status(500).json({ error: 'Failed to record click' });
    }
});

// Get dashboard metrics
app.get('/api/analytics/metrics', (req, res) => {
    try {
        const now = new Date();
        
        // Today's range
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
        const todayEnd = now.toISOString();
        
        // Yesterday's range
        const yesterdayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toISOString();
        const yesterdayEnd = todayStart;
        
        // This week's range (last 7 days)
        const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        
        // Last week's range (7-14 days ago)
        const lastWeekStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString();
        const lastWeekEnd = weekStart;
        
        // All time (for total)
        const allTimeStart = '2020-01-01T00:00:00.000Z';
        
        // Calculate metrics
        const totalInteractions = getTotalInteractions(allTimeStart, todayEnd);
        
        const dailyActiveUsers = getUniqueUsers(todayStart, todayEnd);
        const yesterdayActiveUsers = getUniqueUsers(yesterdayStart, yesterdayEnd);
        const dailyChange = yesterdayActiveUsers > 0 
            ? Math.round(((dailyActiveUsers - yesterdayActiveUsers) / yesterdayActiveUsers) * 100)
            : 0;
        
        const weeklyActiveUsers = getUniqueUsers(weekStart, todayEnd);
        const lastWeeklyActiveUsers = getUniqueUsers(lastWeekStart, lastWeekEnd);
        const weeklyChange = lastWeeklyActiveUsers > 0
            ? Math.round(((weeklyActiveUsers - lastWeeklyActiveUsers) / lastWeeklyActiveUsers) * 100)
            : 0;
        
        const dailyRepeatUsers = getRepeatUsers(todayStart, todayEnd);
        const yesterdayRepeatUsers = getRepeatUsers(yesterdayStart, yesterdayEnd);
        const dailyRepeatChange = yesterdayRepeatUsers > 0
            ? Math.round(((dailyRepeatUsers - yesterdayRepeatUsers) / yesterdayRepeatUsers) * 100)
            : 0;
        
        const weeklyRepeatUsers = getRepeatUsers(weekStart, todayEnd);
        const lastWeeklyRepeatUsers = getRepeatUsers(lastWeekStart, lastWeekEnd);
        const weeklyRepeatChange = lastWeeklyRepeatUsers > 0
            ? Math.round(((weeklyRepeatUsers - lastWeeklyRepeatUsers) / lastWeeklyRepeatUsers) * 100)
            : 0;
        
        // Weekly interactions for trend
        const weeklyInteractions = getTotalInteractions(weekStart, todayEnd);
        const lastWeekInteractions = getTotalInteractions(lastWeekStart, lastWeekEnd);
        const interactionsChange = lastWeekInteractions > 0
            ? Math.round(((weeklyInteractions - lastWeekInteractions) / lastWeekInteractions) * 100)
            : 0;
        
        res.json({
            totalInteractions: {
                value: totalInteractions,
                change: interactionsChange,
                trend: interactionsChange >= 0 ? 'up' : 'down'
            },
            dailyActiveUsers: {
                value: dailyActiveUsers,
                change: dailyChange,
                trend: dailyChange >= 0 ? 'up' : 'down'
            },
            weeklyActiveUsers: {
                value: weeklyActiveUsers,
                change: weeklyChange,
                trend: weeklyChange >= 0 ? 'up' : 'down'
            },
            dailyRepeatUsers: {
                value: dailyRepeatUsers,
                change: dailyRepeatChange,
                trend: dailyRepeatChange >= 0 ? 'up' : 'down'
            },
            weeklyRepeatUsers: {
                value: weeklyRepeatUsers,
                change: weeklyRepeatChange,
                trend: weeklyRepeatChange >= 0 ? 'up' : 'down'
            }
        });
    } catch (error) {
        console.error('Error fetching metrics:', error);
        res.status(500).json({ error: 'Failed to fetch metrics' });
    }
});

// Get top users
app.get('/api/analytics/top-users', (req, res) => {
    try {
        const period = req.query.period || 'month';
        const { start, end } = getDateRange(period);
        
        const topUsers = getTopUsers(start, end, 10);
        
        res.json({
            period,
            users: topUsers.map((user, index) => ({
                rank: index + 1,
                user: user.user_email,
                interactions: user.interactions,
                mostUsedGem: user.most_used_gem
            }))
        });
    } catch (error) {
        console.error('Error fetching top users:', error);
        res.status(500).json({ error: 'Failed to fetch top users' });
    }
});

// Get clicks by agent
app.get('/api/analytics/clicks-by-agent', (req, res) => {
    try {
        const period = req.query.period || 'week';
        const { start, end } = getDateRange(period);
        
        const clicks = getClicksByAgent(start, end);
        const maxClicks = clicks.length > 0 ? clicks[0].clicks : 1;
        
        res.json({
            period,
            agents: clicks.map(item => ({
                label: item.gem_name,
                value: item.clicks,
                percentage: Math.round((item.clicks / maxClicks) * 100)
            }))
        });
    } catch (error) {
        console.error('Error fetching clicks by agent:', error);
        res.status(500).json({ error: 'Failed to fetch clicks by agent' });
    }
});

// Get user details
app.get('/api/analytics/user/:email', (req, res) => {
    try {
        const userEmail = decodeURIComponent(req.params.email);
        const period = req.query.period || 'week';
        const { start, end } = getDateRange(period);
        
        const details = getUserDetails(userEmail, start, end);
        const totalCount = getUserInteractionCount(userEmail, start, end);
        
        res.json({
            user: userEmail,
            period,
            totalInteractions: totalCount,
            interactions: details.map(item => ({
                date: item.date,
                time: item.time,
                gem: item.gem_name
            }))
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Failed to fetch user details' });
    }
});

// Get agent details
app.get('/api/analytics/agent/:name', (req, res) => {
    try {
        const agentName = decodeURIComponent(req.params.name);
        const period = req.query.period || 'week';
        const { start, end } = getDateRange(period);
        
        const details = getAgentDetails(agentName, start, end);
        const totalCount = getAgentUsageCount(agentName, start, end);
        
        res.json({
            agent: agentName,
            period,
            totalUses: totalCount,
            uses: details.map(item => ({
                date: item.date,
                time: item.time,
                user: item.user_email || 'Anonymous'
            }))
        });
    } catch (error) {
        console.error('Error fetching agent details:', error);
        res.status(500).json({ error: 'Failed to fetch agent details' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║     CLG Custom Gems Analytics Server                      ║
╠═══════════════════════════════════════════════════════════╣
║  Server running at: http://localhost:${PORT}                 ║
║  API endpoints:                                           ║
║    POST /api/track-click     - Record gem clicks          ║
║    GET  /api/analytics/metrics - Dashboard metrics        ║
║    GET  /api/analytics/top-users - Top users              ║
║    GET  /api/analytics/clicks-by-agent - Clicks per gem   ║
║    GET  /api/analytics/user/:email - User details         ║
║    GET  /api/analytics/agent/:name - Agent details        ║
║    GET  /api/health          - Health check               ║
╚═══════════════════════════════════════════════════════════╝
    `);
});

