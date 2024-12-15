const { v4: uuidv4 } = require('uuid');

const requestIdMiddleware = (req, res, next) => {
    req.requestId = uuidv4(); // Generate a unique request ID
    next(); // Pass control to the next middleware or route handler
};

module.exports = requestIdMiddleware;
