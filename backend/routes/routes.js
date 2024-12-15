const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const userController = require('../controllers/userController'); // Import user controller
const authMiddleware = require('../services/authMiddleWare');

/**
 * @swagger
 * /healthcheck:
 *   get:
 *     tags: [Health Check]
 *     summary: Perform a health check
 *     description: Checks the health of the API.
 *     responses:
 *       200:
 *         description: API is healthy
 */
router.get('/healthcheck', notesController.healthCheck);

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [User]
 *     summary: Register a new user
 *     description: Creates a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid input data
 */
router.post('/register', userController.register); // Registration route

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [User]
 *     summary: Login user
 *     description: Authenticates a user and returns a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', userController.login); // Login route

/**
 * @swagger
 * /note/{id}:
 *   get:
 *     tags: [Note]
 *     summary: Get a note by ID
 *     description: Retrieves a specific note based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the note
 *     responses:
 *       200:
 *         description: Note found
 *       404:
 *         description: Note not found
 */
router.get('/note/:id', authMiddleware, notesController.getNoteById);

/**
 * @swagger
 * /user/:
 *   put:
 *     summary: Edit user details
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the user
 *               email:
 *                 type: string
 *                 description: The updated email of the user
 *               password:
 *                 type: string
 *                 description: The updated password for the user
 *             example:
 *               name: "John Doe"
 *               email: "johndoe@example.com"
 *               password: "newpassword123"
 *     responses:
 *       200:
 *         description: User details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "User details updated successfully."
 *       400:
 *         description: Bad request, invalid or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Invalid email format."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Server error while updating user details."
 */
router.put('/user/', authMiddleware, userController.editUserDetails);

/**
 * @swagger
 * /note:
 *   post:
 *     tags: [Note]
 *     summary: Create a new note
 *     description: Creates a new note. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: My Note Title
 *               content:
 *                 type: string
 *                 example: This is the content of the note.
 *     responses:
 *       201:
 *         description: Note successfully created
 *       401:
 *         description: Unauthorized
 */
router.post('/note', authMiddleware, notesController.createNote);

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     tags: [Note]
 *     summary: Delete a note by ID
 *     description: Deletes a specific note based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the note
 *     responses:
 *       200:
 *         description: Note successfully deleted
 *       404:
 *         description: Note not found
 */
router.delete('/delete/:id', authMiddleware, notesController.deleteNote);

module.exports = router;
