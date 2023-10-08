const { Pool } = require('pg');
const CONFIG = require('../configs');
const { logger } = require('../utils');

let dbConfig;

if (CONFIG.SERVER.ENV === 'production') {
  dbConfig = {
    host: CONFIG.VERCEL_POSTGRES.HOST,
    port: CONFIG.VERCEL_POSTGRES.PORT,
    database: CONFIG.VERCEL_POSTGRES.NAME,
    user: CONFIG.VERCEL_POSTGRES.USER,
    password: CONFIG.VERCEL_POSTGRES.PASSWORD,
    ssl: true,
    max: 5,   // maximum number of clients the pool should contain
    connectionTimeoutMillis: 10000, // number of milliseconds to wait before timing out when connecting a new client
  };
} else if (CONFIG.SERVER.ENV === 'development') {
  dbConfig = {
    host: CONFIG.POSTGRES.HOST,
    port: CONFIG.POSTGRES.PORT,
    database: CONFIG.POSTGRES.NAME,
    user: CONFIG.POSTGRES.USER,
    password: CONFIG.POSTGRES.PASSWORD,
    max: 5,
    connectionTimeoutMillis: 10000,
  };
} else {
  logger.error('[postgres] Server environtment is not defined');
  process.exit(1);
}

const pool = new Pool(dbConfig);

// Function to ping the database to check the connection
const providePostgresConn = async () => {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    logger.info(`Connected to the ${CONFIG.SERVER.ENV} database, dbName=${dbConfig.database}, host=${dbConfig.host}, port=${dbConfig.port}`);
  } catch (err) {
    logger.error('[providePostgresConn] Failed connecting to the database:', err);
    process.exit(1); // Exit the application if the database connection fails
  }
};

module.exports = {
  pool,
  providePostgresConn,
};
