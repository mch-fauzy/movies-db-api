const dotenv = require('dotenv');
const { logger } = require('../utils');
const fs = require('fs');

const Environtment = () => {
    try {
        if (fs.existsSync('.env')) {
            dotenv.config({ path: '.env' });
            logger.info('[Environtment] Loaded default environment: .env');
        } else {
            logger.warn('[Environtment] Default .env file not found');
        }
    } catch {
        logger.error("[Environtment] Error loading environment variables");
        process.exit(1);
    }
}

Environtment();

module.exports = {
    APP: {
      PORT: process.env.APP_PORT,
    },
    POSTGRES: {
        HOST: process.env.DB_HOST,
        PORT: process.env.DB_PORT,
        NAME: process.env.DB_NAME,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
    },
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
};
