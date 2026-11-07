const { verifyToken } = require('../config/auth/jwt');
const { errorResponse } = require('../utils/response');

// Verify the user's authentication token
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return errorResponse(
            res,
            'Authentication token is required.',
            401
        );
    }

    // Extract the token
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const decoded = verifyToken(token);

        // Attach authenticated user information to the request
        req.user = decoded;

        next();
    } catch (error) {
        return errorResponse(
            res,
            'Invalid or expired authentication token.',
            401
        );
    }
};

module.exports = authMiddleware;