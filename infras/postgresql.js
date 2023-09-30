const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// Edit the config in .env
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionString: "postgres://default:AoarMLF4QG8x@ep-flat-art-89761230-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
});

module.exports = pool;
