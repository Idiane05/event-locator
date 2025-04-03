// userModel.js

const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');  // PostgreSQL connection

// Register new user
async function registerUser(username, email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]  // Corrected the use of username
        );
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error registering user:", error);  // Log the full error
        throw new Error(error.message);  // Send the actual error message
    }
}
