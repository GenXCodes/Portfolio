const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a connection pool for better performance
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Chuckn0riz',
    database: process.env.DB_NAME || 'portfolio_db',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

// Test the database connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Database connection successful');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        return false;
    }
}

// Helper function to execute queries
async function query(sql, params) {
    try {
        const [results] = await pool.execute(sql, params);
        return results;
    } catch (error) {
        console.error('Database query error:', error.message);
        throw error;
    }
}

module.exports = {
    pool,
    testConnection,
    query
};