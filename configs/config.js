const dotenv = require('dotenv');
const { logger } = require('../utils');
const fs = require('fs');

try {
    if (process.env.NODE_ENV === 'development' && fs.existsSync('.env.development')) {
        dotenv.config({ path: '.env.development' });
        logger.info('Using .env.development');
    } else if (process.env.NODE_ENV === 'test' && fs.existsSync('.env.test')) {
        dotenv.config({ path: '.env.test' });
        logger.info('Using .env.test');
    } else if (process.env.NODE_ENV === 'production' && fs.existsSync('.env.production')) {
        dotenv.config({ path: '.env.production' });
        logger.info('Using .env.production');
    } else {
        logger.warn('Environtment file is not provided... using platform environtment variables');
    }
} catch (err) {
    logger.error(`[config] Error loading environment variables: ${err.message}`);
    process.exit(1);
}

module.exports = {
    SERVER: {
        PORT: process.env.SERVER_PORT,
        ENV: process.env.SERVER_ENV,
    },
    POSTGRES: {
        HOST: process.env.DB_HOST,
        PORT: process.env.DB_PORT,
        NAME: process.env.DB_NAME,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
    },
    VERCEL_POSTGRES: {
        HOST: process.env.POSTGRES_HOST,
        PORT: process.env.POSTGRES_PORT,
        NAME: process.env.POSTGRES_DATABASE,
        USER: process.env.POSTGRES_USER,
        PASSWORD: process.env.POSTGRES_PASSWORD,
    },
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};