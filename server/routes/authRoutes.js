const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Register a new commuter account
router.post('/register', register);

// Log in an existing user
router.post('/login', login);

module.exports = router;