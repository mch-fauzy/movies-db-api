const dotenv = require('dotenv');
const { logger } = require('../utils');
const fs = require('fs');

const Environtment = () => {
    try {
        if (fs.existsSync('.env')) {
            dotenv.config({ path: '.env' });
            logger.info('[Environtment] Loaded default environment: .env');
        } else {
            logger.error('[Environtment] Default .env file not found');
            process.exit(1);
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
    VERCEL_POSTGRES: {
        URL: process.env.POSTGRES_URL
    },
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
};