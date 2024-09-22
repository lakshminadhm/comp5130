const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');


dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());


const notesRouter = require('../backend/routes/routes.js');

app.use('/api', notesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


