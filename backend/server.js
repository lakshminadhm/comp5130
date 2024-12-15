const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const { swaggerDocs, swaggerUi } = require('./swagger');
const { v4: uuidv4 } = require('uuid');
const logger = require('./config/logger'); // Custom logger

dotenv.config();

const app = express();

// Middleware to generate and attach a unique request ID
app.use((req, res, next) => {
    req.requestId = uuidv4();
    res.setHeader('X-Request-ID', req.requestId); // Add to response headers for tracking
    next();
});

// Middleware to log incoming requests
app.use((req, res, next) => {
    const { method, url, requestId } = req;
    logger.info({
        type: 'REQUEST',
        message: 'Incoming Request',
        method,
        url,
        requestId,
        timestamp: new Date().toISOString(),
    });
    next();
});

// Middleware to log outgoing responses
app.use((req, res, next) => {
    const { method, url, requestId } = req;

    res.on('finish', () => {
        const { statusCode } = res;

        logger.info({
            type: 'RESPONSE',
            message: 'Outgoing Response',
            method,
            url,
            requestId,
            statusCode,
            timestamp: new Date().toISOString(),
        });
    });

    next();
});

// Enable Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Enable CORS for specific origins
app.use(cors({
    origin: 'https://localhost:3000',  // Allow requests only from this origin
    credentials: true
}));

app.options('*', cors()); // Enable preflight for all routes

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Add routes
const notesRouter = require('../backend/routes/routes.js');
app.use('/api', notesRouter);

// HTTPS Server options with SSL certificates
const options = {
    key: fs.readFileSync('../certs/cryptonote.key'),
    cert: fs.readFileSync('../certs/cryptonote.crt'),
};

// Create HTTPS server
const httpsServer = https.createServer(options, app);

const PORT = process.env.PORT || 5000;

// Start the server
httpsServer.listen(PORT, () => {
    logger.info({
        type: 'SYSTEM',
        message: 'HTTPS Server started',
        port: PORT,
        timestamp: new Date().toISOString(),
    });
    logger.info({
        type: 'SYSTEM',
        message: 'API Docs available',
        url: `https://localhost:${PORT}/api-docs/`,
        timestamp: new Date().toISOString(),
    });
});
