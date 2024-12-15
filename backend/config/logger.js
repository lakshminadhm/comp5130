const { createLogger, format, transports } = require('winston');

// Create a logger instance
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json() // Logs in JSON format
    ),
    transports: [
        new transports.Console(), // Logs to console
        new transports.File({ filename: 'logs/app.log' }) // Logs to file
    ],
});

// Add a method to enhance logger with request ID
logger.withRequestId = (requestId) => {
    return {
        info: (message, details = {}) => logger.info({ requestId, message, ...details }),
        warn: (message, details = {}) => logger.warn({ requestId, message, ...details }),
        error: (message, details = {}) => logger.error({ requestId, message, ...details }),
        debug: (message, details = {}) => logger.debug({ requestId, message, ...details }),
    };
};

module.exports = logger;
