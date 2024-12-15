const jwt = require('jsonwebtoken');
const logger = require('../config/logger'); // Import the logger

const authMiddleware = (req, res, next) => {
    const requestId = req.requestId || 'N/A'; // Use requestId if available
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from header

    logger.info({
        type: 'REQUEST',
        message: 'Authentication Request',
        place: 'AuthMiddleware',
        requestId,
        timestamp: new Date().toISOString(),
        endpoint: req.originalUrl,
    });

    // If no token is present, log and deny access
    if (!token) {
        logger.warn({
            type: 'RESPONSE',
            message: 'Access Denied: No Token Provided',
            place: 'AuthMiddleware',
            requestId,
            timestamp: new Date().toISOString(),
            statusCode: 401,
        });

        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = decoded;

        logger.info({
            type: 'RESPONSE',
            message: 'Authentication Successful',
            place: 'AuthMiddleware',
            requestId,
            timestamp: new Date().toISOString(),
            statusCode: 200,
            user: { id: decoded.id, email: decoded.email }, // Include minimal user info
        });

        // Continue to the next middleware or route handler
        next();
    } catch (ex) {
        logger.error({
            type: 'RESPONSE',
            message: 'JWT Verification Failed',
            place: 'AuthMiddleware',
            requestId,
            timestamp: new Date().toISOString(),
            statusCode: 400,
            error: ex.message,
        });

        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
