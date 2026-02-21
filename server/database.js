const Database = require('better-sqlite3');
const path = require('path');

// Create database file in server directory
const dbPath = path.join(__dirname, 'analytics.db');
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Initialize database tables
function initializeDatabase() {
    // Create clicks table to store all gem click events
    db.exec(`
        CREATE TABLE IF NOT EXISTS clicks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            gem_name TEXT NOT NULL,
            gem_category TEXT,
            user_email TEXT,
            user_name TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            ip_address TEXT,
            user_agent TEXT
        )
    `);

    // Create index for faster queries
    db.exec(`
        CREATE INDEX IF NOT EXISTS idx_clicks_timestamp ON clicks(timestamp);
        CREATE INDEX IF NOT EXISTS idx_clicks_gem_name ON clicks(gem_name);
        CREATE INDEX IF NOT EXISTS idx_clicks_user_email ON clicks(user_email);
    `);

    console.log('Database initialized successfully');
}

// Record a click event
function recordClick({ gemName, gemCategory, userEmail, userName, ipAddress, userAgent }) {
    const stmt = db.prepare(`
        INSERT INTO clicks (gem_name, gem_category, user_email, user_name, ip_address, user_agent)
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    return stmt.run(gemName, gemCategory, userEmail, userName, ipAddress, userAgent);
}

// Get total interactions for a time period
function getTotalInteractions(startDate, endDate) {
    const stmt = db.prepare(`
        SELECT COUNT(*) as total FROM clicks
        WHERE timestamp >= ? AND timestamp <= ?
    `);
    return stmt.get(startDate, endDate).total;
}

// Get unique users (daily/weekly)
function getUniqueUsers(startDate, endDate) {
    const stmt = db.prepare(`
        SELECT COUNT(DISTINCT user_email) as total FROM clicks
        WHERE timestamp >= ? AND timestamp <= ?
        AND user_email IS NOT NULL AND user_email != ''
    `);
    return stmt.get(startDate, endDate).total;
}

// Get repeat users (users with more than one interaction)
function getRepeatUsers(startDate, endDate) {
    const stmt = db.prepare(`
        SELECT COUNT(*) as total FROM (
            SELECT user_email FROM clicks
            WHERE timestamp >= ? AND timestamp <= ?
            AND user_email IS NOT NULL AND user_email != ''
            GROUP BY user_email
            HAVING COUNT(*) > 1
        )
    `);
    return stmt.get(startDate, endDate).total;
}

// Get top users by interaction count
function getTopUsers(startDate, endDate, limit = 5) {
    const stmt = db.prepare(`
        SELECT 
            user_email,
            COUNT(*) as interactions,
            (SELECT gem_name FROM clicks c2 
             WHERE c2.user_email = clicks.user_email 
             AND c2.timestamp >= ? AND c2.timestamp <= ?
             GROUP BY gem_name 
             ORDER BY COUNT(*) DESC 
             LIMIT 1) as most_used_gem
        FROM clicks
        WHERE timestamp >= ? AND timestamp <= ?
        AND user_email IS NOT NULL AND user_email != ''
        GROUP BY user_email
        ORDER BY interactions DESC
        LIMIT ?
    `);
    return stmt.all(startDate, endDate, startDate, endDate, limit);
}

// Get clicks per agent/gem
function getClicksByAgent(startDate, endDate) {
    const stmt = db.prepare(`
        SELECT gem_name, COUNT(*) as clicks
        FROM clicks
        WHERE timestamp >= ? AND timestamp <= ?
        GROUP BY gem_name
        ORDER BY clicks DESC
    `);
    return stmt.all(startDate, endDate);
}

// Get user interaction details
function getUserDetails(userEmail, startDate, endDate, limit = 50) {
    const stmt = db.prepare(`
        SELECT 
            DATE(timestamp) as date,
            TIME(timestamp) as time,
            gem_name
        FROM clicks
        WHERE user_email = ?
        AND timestamp >= ? AND timestamp <= ?
        ORDER BY timestamp DESC
        LIMIT ?
    `);
    return stmt.all(userEmail, startDate, endDate, limit);
}

// Get total interactions for a user
function getUserInteractionCount(userEmail, startDate, endDate) {
    const stmt = db.prepare(`
        SELECT COUNT(*) as total FROM clicks
        WHERE user_email = ?
        AND timestamp >= ? AND timestamp <= ?
    `);
    return stmt.get(userEmail, startDate, endDate).total;
}

// Get agent usage details
function getAgentDetails(gemName, startDate, endDate, limit = 50) {
    const stmt = db.prepare(`
        SELECT 
            DATE(timestamp) as date,
            TIME(timestamp) as time,
            user_email
        FROM clicks
        WHERE gem_name = ?
        AND timestamp >= ? AND timestamp <= ?
        ORDER BY timestamp DESC
        LIMIT ?
    `);
    return stmt.all(gemName, startDate, endDate, limit);
}

// Get total uses for an agent
function getAgentUsageCount(gemName, startDate, endDate) {
    const stmt = db.prepare(`
        SELECT COUNT(*) as total FROM clicks
        WHERE gem_name = ?
        AND timestamp >= ? AND timestamp <= ?
    `);
    return stmt.get(gemName, startDate, endDate).total;
}

// Get comparison metrics (for trend calculations)
function getMetricsComparison(currentStart, currentEnd, previousStart, previousEnd) {
    const currentInteractions = getTotalInteractions(currentStart, currentEnd);
    const previousInteractions = getTotalInteractions(previousStart, previousEnd);
    
    const currentUsers = getUniqueUsers(currentStart, currentEnd);
    const previousUsers = getUniqueUsers(previousStart, previousEnd);
    
    const currentRepeat = getRepeatUsers(currentStart, currentEnd);
    const previousRepeat = getRepeatUsers(previousStart, previousEnd);
    
    return {
        interactions: {
            current: currentInteractions,
            previous: previousInteractions,
            change: previousInteractions > 0 
                ? Math.round(((currentInteractions - previousInteractions) / previousInteractions) * 100) 
                : 0
        },
        uniqueUsers: {
            current: currentUsers,
            previous: previousUsers,
            change: previousUsers > 0 
                ? Math.round(((currentUsers - previousUsers) / previousUsers) * 100) 
                : 0
        },
        repeatUsers: {
            current: currentRepeat,
            previous: previousRepeat,
            change: previousRepeat > 0 
                ? Math.round(((currentRepeat - previousRepeat) / previousRepeat) * 100) 
                : 0
        }
    };
}

module.exports = {
    db,
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
};

