const { Pool } = require('pg');

// Create a new Pool instance to manage the database connection
const pool = new Pool({
    user: process.env.PG_USER,       // Your PostgreSQL username
    host: process.env.PG_HOST,       // Your PostgreSQL host (usually localhost)
    database: process.env.PG_DATABASE, // Your PostgreSQL database name
    password: process.env.PG_PASSWORD, // Your PostgreSQL password
    port: process.env.PG_PORT,       // Your PostgreSQL port (default is 5432)
});

module.exports = { pool };
