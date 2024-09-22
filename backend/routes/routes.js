const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

// POST /note - Create a note
router.post('/note', notesController.createNote);

// GET /note/:id - Retrieve a note by ID
router.get('/note/:id', notesController.getNoteById);

// DELETE /delete/:id - Delete a note
router.delete('/delete/:id', notesController.deleteNote);

module.exports = router;
