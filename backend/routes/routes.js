const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const userController = require('../controllers/userController'); // Import user controller
const authMiddleware = require('../services/authMiddleWare');

// Health check route
router.get('/healthcheck', notesController.healthCheck);

// User-related routes
router.post('/register', userController.register); // Registration route
router.post('/login', userController.login); // Login route

// Note-related routes
router.get('/note/:id', notesController.getNoteById);
router.post('/note', authMiddleware, notesController.createNote);
router.delete('/delete/:id', notesController.deleteNote);



module.exports = router;
