const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 12;

// Hash a password before saving it to the database
const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

// Compare a login password with its stored hash
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    hashPassword,
    comparePassword
};