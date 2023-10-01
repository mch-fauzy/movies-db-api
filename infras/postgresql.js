const { Pool } = require('pg');

// Edit the config in .env
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

module.exports = pool;
