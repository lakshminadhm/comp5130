const genericService = require('./genericService');
const Note = require('../models/Note');
const crypto = require('crypto');
const cryptoFunc = require('../crypto/cryptoFunc');
const logger = require('../config/logger');

// Create a new note
exports.createNote = async (inputNote) => {
    const requestId = inputNote.requestId || 'MISSING';

    logger.info({
        type: 'REQUEST',
        message: 'Create Note Request',
        requestId,
        timestamp: new Date().toISOString(),
        payload: inputNote,
        class: 'NoteService',
        function:'createNote'
    });

    try {
        const salt = generateSalt(); // Generate a unique salt
        const hash = hashNoteContent(inputNote.noteText, salt); // Hash the note with the salt
        const encryptedText = cryptoFunc.encrypt(inputNote.noteText, hash);

        const selfDestructOptions = {
            'After reading it': null,
            '1 Min': 1 * 60 * 1000,
            '1 Hr': 1 * 60 * 60 * 1000,
            '2 Hrs': 2 * 60 * 60 * 1000,
            '1 day': 24 * 60 * 60 * 1000,
            '1 week': 7 * 24 * 60 * 60 * 1000,
        };

        const destructTimeInMilliseconds = selfDestructOptions[inputNote.selfDestructTime] || 0;
        const expiresAt = destructTimeInMilliseconds ? new Date(Date.now() + destructTimeInMilliseconds) : null;

        const newNote = new Note({
            encryptedText: encryptedText,
            password: inputNote.password || null,
            expiresAt: expiresAt,
            customId: hash,
            selfDestructTime: inputNote.selfDestructTime,
            confirmBeforeDestruction: inputNote.confirmBeforeDestruction || false,
            email: inputNote.email || '',
            referenceName: inputNote.referenceName || '',
        });

        const response = await Note.create(newNote); // Save the note

        logger.info({
            type: 'RESPONSE',
            message: 'Note Created Successfully',
            class: 'NoteService',
            function:'createNote',
            requestId,
            statusCode: 201,
            timestamp: new Date().toISOString(),
            noteId: response.customId,
        });

        return { message: 'Note created', noteId: response.customId }; // Return the customId to the user
    } catch (error) {
        logger.error({
            type: 'RESPONSE',
            message: 'Error Creating Note',
            class: 'NoteService',
            function:'createNote',
            requestId,
            statusCode: 500,
            timestamp: new Date().toISOString(),
            error: error.message,
        });

        throw new Error('Failed to create note');
    }
};

// Get a note by customId
exports.getNoteById = async ({ customId, requestId }) => {

    logger.info({
        type: 'REQUEST',
        message: 'Get Note By ID Request',
        class: 'NoteService',
        function:'getNoteById',
        requestId,
        customId,
        timestamp: new Date().toISOString(),
    });

    try {
        const query = { customId, isDeleted: false };
        const note = await genericService.findOne(Note, query, requestId);

        if (!note) {
            logger.warn({
                type: 'RESPONSE',
                message: 'Note Not Found',
                class: 'NoteService',
                function:'getNoteById',
                requestId,
                customId,
                statusCode: 404,
                timestamp: new Date().toISOString(),
            });

            return null; // No note found
        }

        const decryptedText = cryptoFunc.decrypt(note.encryptedText, customId);

        logger.info({
            type: 'RESPONSE',
            message: 'Note Retrieved Successfully',
            class: 'NoteService',
            function:'getNoteById',
            requestId,
            customId,
            statusCode: 200,
            timestamp: new Date().toISOString(),
            note: { text: decryptedText },
        });

        return { text: decryptedText, confirmBeforeDestruction: note.confirmBeforeDestruction };
    } catch (error) {
        logger.error({
            type: 'RESPONSE',
            message: 'Error Retrieving Note',
            class: 'NoteService',
            function:'getNoteById',
            requestId,
            customId,
            statusCode: 500,
            timestamp: new Date().toISOString(),
            error: error.message,
        });

        throw new Error('Failed to retrieve note');
    }
};

// Get a note by customId with status check
exports.getNoteByIdAndStatus = async ({ customId, requestId }) => {

    logger.info({
        type: 'REQUEST',
        message: 'Get Note By ID and Status Request',
        class: 'NoteService',
        function:'getNoteByIdAndStatus',
        requestId,
        customId,
        timestamp: new Date().toISOString(),
    });

    try {
        const query = { customId };
        const note = await genericService.findOne(Note, query, requestId);

        if (!note) {
            logger.warn({
                type: 'RESPONSE',
                message: 'Note Not Found',
                class: 'NoteService',
                function:'getNoteByIdAndStatus',
                requestId,
                customId,
                statusCode: 404,
                timestamp: new Date().toISOString(),
            });

            return { errorCode: 404, errorMessage: 'Note not found' };
        }

        if (note.isDeleted || (note.expiresAt !== null && new Date(note.expiresAt) < new Date())) {
            logger.warn({
                type: 'RESPONSE',
                message: 'Note Deleted or Expired',
                class: 'NoteService',
                function:'getNoteByIdAndStatus',
                requestId,
                customId,
                statusCode: 403,
                timestamp: new Date().toISOString(),
            });

            return { errorCode: 403, errorMessage: 'Note is deleted or expired' };
        }

        const decryptedText = cryptoFunc.decrypt(note.encryptedText, customId);

        logger.info({
            type: 'RESPONSE',
            message: 'Note Retrieved Successfully',
            class: 'NoteService',
            function:'getNoteByIdAndStatus',
            requestId,
            customId,
            statusCode: 200,
            timestamp: new Date().toISOString(),
            note: { text: decryptedText },
        });

        return { text: decryptedText, confirmBeforeDestruction: note.confirmBeforeDestruction };
    } catch (error) {
        logger.error({
            type: 'RESPONSE',
            message: 'Error Retrieving Note with Status Check',
            class: 'NoteService',
            function:'getNoteByIdAndStatus',
            requestId,
            customId,
            statusCode: 500,
            timestamp: new Date().toISOString(),
            error: error.message,
        });

        throw new Error('Failed to retrieve note');
    }
};

// Delete a note
exports.deleteNote = async ({ customId, requestId }) => {

    logger.info({
        type: 'REQUEST',
        message: 'Delete Note Request',
        class: 'NoteService',
        function:'deleteNote',
        requestId,
        customId,
        timestamp: new Date().toISOString(),
    });

    try {
        const result = await genericService.updateOne(Note, { customId }, { $set: { isDeleted: true } }, requestId);

        if (result.matchedCount === 0) {
            logger.warn({
                type: 'RESPONSE',
                message: 'Note Not Found or Failed to Delete',
                class: 'NoteService',
                function:'deleteNote',
                requestId,
                customId,
                statusCode: 404,
                timestamp: new Date().toISOString(),
            });

            return { error: 'Failed to delete or note not found' };
        }

        logger.info({
            type: 'RESPONSE',
            message: 'Note Deleted Successfully',
            class: 'NoteService',
            function:'deleteNote',
            requestId,
            customId,
            statusCode: 200,
            timestamp: new Date().toISOString(),
        });

        return { message: 'Note has been deleted' };
    } catch (error) {
        logger.error({
            type: 'RESPONSE',
            message: 'Error Deleting Note',
            class: 'NoteService',
            function:'deleteNote',
            requestId,
            customId,
            statusCode: 500,
            timestamp: new Date().toISOString(),
            error: error.message,
        });

        throw new Error('Failed to delete note');
    }
};

// Function to generate a random salt
function generateSalt() {
    return crypto.randomBytes(32).toString('hex');
}

// Function to hash the note content with the salt
function hashNoteContent(content, salt) {
    return crypto.createHash('sha256').update(content + salt).digest('hex').slice(0, 32);
}
