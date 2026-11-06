
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic test route
app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: 'SakayTime API is running!'
    });
});

// Database test route
app.get('/api/db-test', (req, res) => {
    db.get('SELECT 1 AS result', [], (err, row) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Database connection failed.',
                error: err.message
            });
        }

        res.json({
            success: true,
            message: 'SakayTime database is connected!',
            databaseTest: row.result
        });
    });
});

// Server configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`SakayTime server running on port ${PORT}`);
});
