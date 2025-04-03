const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');  // PostgreSQL connection

// Register new user
async function registerUser(name, surname, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        'INSERT INTO users (name, surname, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, surname, email',
        [name, surname, email, hashedPassword]
    );
    return result.rows[0];
}

// Authenticate user
async function authenticateUser(email, password) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return null;

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user;
}

module.exports = { registerUser, authenticateUser };
