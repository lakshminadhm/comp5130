const logger = require('./config/logger');

console.log('checkinggg');
logger.info('This is an info log');
logger.warn('This is a warning log');
logger.error('This is an error log', { errorDetails: 'Invalid input' });
