const { Pool } = require('pg');
const CONFIG = require('../configs');

// Edit the config in .env
const pool = new Pool({
  host: CONFIG.POSTGRES.HOST,
  port: CONFIG.POSTGRES.PORT,
  database: CONFIG.POSTGRES.NAME,
  user: CONFIG.POSTGRES.USER,
  password: CONFIG.POSTGRES.PASSWORD,
});

module.exports = pool;
