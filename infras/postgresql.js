const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// Edit the config in .env
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

module.exports = pool;
