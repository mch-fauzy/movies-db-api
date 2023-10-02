const { Pool } = require('pg');
const CONFIG = require('../configs');

// Edit the config in .env
const pool = new Pool({
  connectionString: CONFIG.VERCEL_POSTGRES.URL + "?sslmode=require",
});

module.exports = pool;
