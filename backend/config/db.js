const mongoose = require('mongoose');
const logger = require('../config/logger'); // Import the logger

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    logger.info({
      type: 'SYSTEM',
      message: 'MongoDB connected successfully',
      place: 'DB',
      timestamp: new Date().toISOString(),
      function:'connectDB'
    });
  } catch (err) {
    logger.error({
      type: 'SYSTEM',
      message: 'MongoDB connection failed',
      place: 'DB',
      timestamp: new Date().toISOString(),
      error: err.message,
      function:'connectDB'
    });

    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB;
