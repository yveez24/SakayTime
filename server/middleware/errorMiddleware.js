const { errorResponse } = require('../utils/response');

// Handles errors from routes and controllers
const errorMiddleware = (err, req, res, next) => {
    console.error('Backend Error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error.';

    return errorResponse(res, message, statusCode);
};

module.exports = errorMiddleware;