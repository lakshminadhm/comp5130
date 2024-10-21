const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const https = require('https');
const fs = require('fs');
const cors = require('cors');

dotenv.config();

const app = express();


// Enable CORS for below origins
app.use(cors({
    origin: 'https://localhost:3000',  // Allow requests only from this origin
    credentials: true
}));

app.options('*', cors()); // Enable preflight for all routes

// Connect to MongoDB
connectDB();

app.use(express.json());

const notesRouter = require('../backend/routes/routes.js');
app.use('/api', notesRouter);

// Load SSL certificates for HTTPS
const key = fs.readFileSync('../certs/key.pem');
const cert = fs.readFileSync('../certs/cert.pem');

// Create HTTPS server
const httpsServer = https.createServer({ key, cert }, app);

const PORT = process.env.PORT || 5000;

// Start the server using HTTPS
httpsServer.listen(PORT, () => console.log(`HTTPS Server running on port ${PORT}`));
