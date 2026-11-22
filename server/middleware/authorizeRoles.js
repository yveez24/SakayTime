const { errorResponse } = require('../utils/response');

// Allow access only to users with the specified roles
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // Check if the user is authenticated
        if (!req.user) {
            return errorResponse(
                res,
                'Authentication is required.',
                401
            );
        }

        // Check if the user's role is allowed
        if (!allowedRoles.includes(req.user.role)) {
            return errorResponse(
                res,
                'You do not have permission to access this resource.',
                403
            );
        }

        next();
    };
};

module.exports = authorizeRoles;