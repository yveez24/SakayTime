const express = require('express');

const router = express.Router();

// API health check
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'SakayTime API is running!'
    });
});

module.exports = router;
