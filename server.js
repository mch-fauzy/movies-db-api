const app = require('./app');
const infras = require('./infras');
const { logger } = require('./utils');
const CONFIG = require('./configs');
const PORT = CONFIG.SERVER.PORT;

infras.providePostgresConn()
  .then(() => {
    const server = app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        logger.error(`[server] Port ${PORT} is already in use. Please choose a different port.`);
      } else {
        logger.error(`[server] An error occurred while starting the server: ${err.message}`);
      }
      process.exit(1);
    });
  })
  .catch((err) => {
    logger.error(`[server] Unexpected error: ${err.message}`);
    process.exit(1);
  });
