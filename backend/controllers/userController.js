const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger'); // Import the logger

// Register a new user
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const requestId = req.requestId; // Use the requestId generated in middleware

    logger.info({
        type: 'REQUEST',
        message: 'Registering new user',
        email,
        requestId,
        timestamp: new Date().toISOString(),
    });

    try {
        let user = await User.findOne({ email });
        if (user) {
            logger.warn({
                type: 'RESPONSE',
                message: 'User already exists',
                email,
                requestId,
                statusCode: 400,
                timestamp: new Date().toISOString(),
            });
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user and hash the password
        user = new User({ username, email, password });
        await user.save();

        logger.info({
            type: 'RESPONSE',
            message: 'User registered successfully',
            email,
            requestId,
            statusCode: 201,
            timestamp: new Date().toISOString(),
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        logger.error({
            type: 'RESPONSE',
            message: 'Error during registration',
            email,
            requestId,
            error: error.message,
            statusCode: 500,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({ message: 'Server error' });
    }
};

// Login a user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const requestId = req.requestId; // Use the requestId generated in middleware

    logger.info({
        type: 'REQUEST',
        message: 'User login attempt',
        email,
        requestId,
        timestamp: new Date().toISOString(),
    });

    try {
        const user = await User.findOne({ email });
        if (!user) {
            logger.warn({
                type: 'RESPONSE',
                message: 'User not found',
                email,
                requestId,
                statusCode: 404,
                timestamp: new Date().toISOString(),
            });
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.warn({
                type: 'RESPONSE',
                message: 'Invalid credentials',
                email,
                requestId,
                statusCode: 400,
                timestamp: new Date().toISOString(),
            });
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        logger.info({
            type: 'RESPONSE',
            message: 'User login successful',
            email,
            requestId,
            statusCode: 200,
            timestamp: new Date().toISOString(),
        });

        res.json({ token });
    } catch (error) {
        logger.error({
            type: 'RESPONSE',
            message: 'Error during login',
            email,
            requestId,
            error: error.message,
            statusCode: 500,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({ message: 'Server error' });
    }
};

// Edit user details (stubbed function)
exports.editUserDetails = async (req, res) => {
    const requestId = req.requestId; // Use the requestId generated in middleware

    logger.info({
        type: 'REQUEST',
        message: 'Edit user details attempt',
        requestId,
        timestamp: new Date().toISOString(),
    });

    try {
        // Stubbed response
        logger.info({
            type: 'RESPONSE',
            message: 'Edit user details successful',
            requestId,
            statusCode: 200,
            timestamp: new Date().toISOString(),
        });
        res.status(200).json({ message: 'User details edited successfully' });
    } catch (error) {
        logger.error({
            type: 'RESPONSE',
            message: 'Error editing user details',
            requestId,
            error: error.message,
            statusCode: 500,
            timestamp: new Date().toISOString(),
        });
        res.status(500).json({ message: 'Server error' });
    }
};
