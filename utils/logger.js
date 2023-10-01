const winston = require("winston")

const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console(), // Log to the console
      // Add more transports as needed (e.g., file transport)
    ],
});

module.exports = logger;