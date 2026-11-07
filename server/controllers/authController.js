const db = require('../config/database');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../config/auth/jwt');
const { successResponse, errorResponse } = require('../utils/response');

// Register a new commuter account
const register = async (req, res, next) => {
    try {
        const { full_name, email, password } = req.body;

        // Check required fields
        if (!full_name || !email || !password) {
            return errorResponse(
                res,
                'Full name, email, and password are required.',
                400
            );
        }

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return errorResponse(res, 'Please provide a valid email address.', 400);
        }

        // Validate password length
        if (password.length < 8) {
            return errorResponse(
                res,
                'Password must be at least 8 characters long.',
                400
            );
        }

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedName = full_name.trim();

        if (!normalizedName) {
            return errorResponse(res, 'Full name cannot be empty.', 400);
        }

        // Check if the email is already registered
        db.get(
            'SELECT id FROM users WHERE email = ?',
            [normalizedEmail],
            async (err, existingUser) => {
                if (err) {
                    return next(err);
                }

                if (existingUser) {
                    return errorResponse(res, 'Email is already registered.', 409);
                }

                try {
                    // Hash the password before saving it
                    const passwordHash = await hashPassword(password);

                    db.run(
                        `INSERT INTO users (full_name, email, password_hash, role)
                         VALUES (?, ?, ?, 'commuter')`,
                        [normalizedName, normalizedEmail, passwordHash],
                        function (insertErr) {
                            if (insertErr) {
                                // Handle duplicate email if another request registered it first
                                if (insertErr.code === 'SQLITE_CONSTRAINT') {
                                    return errorResponse(
                                        res,
                                        'Email is already registered.',
                                        409
                                    );
                                }

                                return next(insertErr);
                            }

                            const user = {
                                id: this.lastID,
                                full_name: normalizedName,
                                email: normalizedEmail,
                                role: 'commuter'
                            };

                            // Generate a token for the new commuter
                            const token = generateToken(user);

                            return successResponse(
                                res,
                                'Account registered successfully.',
                                { user, token },
                                201
                            );
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        );
    } catch (error) {
        return next(error);
    }
};


// Log in an existing user
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return errorResponse(
                res,
                'Email and password are required.',
                400
            );
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Find the user by email
        db.get(
            'SELECT * FROM users WHERE email = ?',
            [normalizedEmail],
            async (err, user) => {
                if (err) {
                    return next(err);
                }

                // Check if the account exists
                if (!user) {
                    return errorResponse(
                        res,
                        'Invalid email or password.',
                        401
                    );
                }

                try {
                    // Compare the entered password with the stored hash
                    const isPasswordValid = await comparePassword(
                        password,
                        user.password_hash
                    );

                    if (!isPasswordValid) {
                        return errorResponse(
                            res,
                            'Invalid email or password.',
                            401
                        );
                    }

                    // Exclude password hash from returned user data
                    const userData = {
                        id: user.id,
                        full_name: user.full_name,
                        email: user.email,
                        role: user.role
                    };

                    // Generate authentication token
                    const token = generateToken(userData);

                    return successResponse(
                        res,
                        'Login successful.',
                        {
                            user: userData,
                            token
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        );
    } catch (error) {
        return next(error);
    }
};

// Get the currently authenticated user's profile
const getCurrentUser = (req, res, next) => {
    const userId = req.user.id;

    db.get(
        `SELECT id, full_name, email, role
         FROM users
         WHERE id = ?`,
        [userId],
        (err, user) => {
            if (err) {
                return next(err);
            }

            // Check if the user still exists
            if (!user) {
                return errorResponse(
                    res,
                    'User account not found.',
                    404
                );
            }

            return successResponse(
                res,
                'User profile retrieved successfully.',
                { user }
            );
        }
    );
};

// Export controller functions
module.exports = {
    register,
    login,
    getCurrentUser
};