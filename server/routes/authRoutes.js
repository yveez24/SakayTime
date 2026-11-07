const express = require('express');
const {
    register,
    login,
    getCurrentUser
} = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register a new commuter account
router.post('/register', register);

// Log in an existing user
router.post('/login', login);

// Get the currently authenticated user's profile
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;