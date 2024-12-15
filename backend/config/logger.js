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

// Log the initialization of the logger
logger.info({
    type: 'SYSTEM',
    message: 'Logger initialized',
    timestamp: new Date().toISOString(),
    transports: ['Console', 'File'], // Indicate where the logs are being sent
    logLevel: logger.level, // Current log level
    class:'Loggger'
});

// Add a method to enhance logger with request ID
logger.withRequestId = (requestId) => {
    logger.debug({
        type: 'SYSTEM',
        message: 'Logger enhanced with request ID',
        requestId,
        timestamp: new Date().toISOString(),
        class:'Loggger'
    });

    return {
        info: (message, details = {}) => logger.info({ requestId, message, ...details }),
        warn: (message, details = {}) => logger.warn({ requestId, message, ...details }),
        error: (message, details = {}) => logger.error({ requestId, message, ...details }),
        debug: (message, details = {}) => logger.debug({ requestId, message, ...details }),
    };
};

// Handle potential errors with logging (e.g., file write issues)
logger.on('error', (err) => {
    console.error({
        type: 'ERROR',
        message: 'Logger transport error',
        error: err.message,
        timestamp: new Date().toISOString(),
        class:'Loggger'
    });
});

module.exports = logger;
