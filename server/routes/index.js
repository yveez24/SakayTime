
const express = require('express');
const authRoutes = require('./authRoutes');
const transportationRoutes = require('./transportationRoutes');
const favoritesRoutes = require('./favoritesRoutes');

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

// Transportation routes
router.use('/transportation', transportationRoutes);

// Favorites routes
router.use('/favorites', favoritesRoutes);

module.exports = router;
