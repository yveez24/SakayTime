const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

// Generate authentication token
const generateToken = (user) => {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured.');
    }

    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRES_IN
        }
    );
};

// Verify authentication token
const verifyToken = (token) => {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured.');
    }

    return jwt.verify(token, JWT_SECRET);
};

module.exports = {
    generateToken,
    verifyToken
};