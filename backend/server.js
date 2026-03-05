const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Database connection test
const { testConnection } = require('./src/config/database');

// Import routes
const testimonialRoutes = require('./src/routes/testimonialRoutes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;
const API_PREFIX = process.env.API_PREFIX || '/api';

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Portfolio Testimonials API',
        version: '1.0.0'
    });
});

// API Routes
app.use(`${API_PREFIX}/testimonials`, testimonialRoutes);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
async function startServer() {
    try {
        // Test database connection
        const dbConnected = await testConnection();
        if (!dbConnected) {
            console.warn('⚠️  Database connection failed. API will run in limited mode.');
        }

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📊 Health check: http://localhost:${PORT}/health`);
            console.log(`🔗 Testimonials API: http://localhost:${PORT}${API_PREFIX}/testimonials`);
            console.log(`🌐 CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
            console.log(`💾 Database: ${dbConnected ? '✅ Connected' : '❌ Not connected'}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Server shutting down...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Server shutting down...');
    process.exit(0);
});

// Start the server
startServer();