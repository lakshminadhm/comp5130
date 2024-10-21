const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get the token from the request header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // If no token is present, deny access
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Continue to the next middleware or route handler
        next();
    } catch (ex) {
        console.log(ex)
        console.error('JWT verification failed:', ex.message);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
