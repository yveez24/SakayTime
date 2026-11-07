
const express = require('express');
const authRoutes = require('./authRoutes');

const router = express.Router();

// API health check
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'SakayTime API is running!'
    });
});

// Authentication routes
router.use('/auth', authRoutes);

module.exports = router;
