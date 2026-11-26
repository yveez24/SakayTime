
const express = require('express');

const {
    getFavorites,
    addFavorite,
    removeFavorite
} = require('../controllers/favoritesController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All favorites endpoints require authentication
router.use(authMiddleware);

// Retrieve the logged-in user's favorites
router.get('/', getFavorites);

// Add a route to favorites
router.post('/:routeId', addFavorite);

// Remove a route from favorites
router.delete('/:routeId', removeFavorite);

module.exports = router;

