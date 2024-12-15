const noteService = require('../services/noteService');
const logger = require('../config/logger'); // Import the logger

exports.healthCheck = async (req, res) => {
    const requestId = req.requestId; // Use the requestId generated in middleware

    logger.info({
        type: 'REQUEST',
        message: 'Health Check Request',
        requestId,
        timestamp: new Date().toISOString(),
    });

    res.json(true);

    logger.info({
        type: 'RESPONSE',
        message: 'Health Check Response',
        requestId,
        statusCode: 200,
        timestamp: new Date().toISOString(),
    });
};

exports.createNote = async (req, res) => {
    const requestId = req.requestId; // Use the requestId generated in middleware

    logger.info({
        type: 'REQUEST',
        message: 'Create Note Request',
        requestId,
        timestamp: new Date().toISOString(),
        payload: req.body,
    });

    try {
        const inputNote = req.body;
        const response = await noteService.createNote(inputNote);

        logger.info({
            type: 'RESPONSE',
            message: 'Note Created Successfully',
            requestId,
            statusCode: 200,
            timestamp: new Date().toISOString(),
            response,
        });

        res.json(response); // Send the response from the service
    } catch (error) {
        logger.error({
            type: 'RESPONSE',
            message: 'Error Creating Note',
            requestId,
            statusCode: 500,
            error: error.message,
            timestamp: new Date().toISOString(),
        });

        res.status(500).send('Server Error');
    }
};

exports.getNoteById = async (req, res) => {
    const requestId = req.requestId; // Use the requestId generated in middleware
    const customId = req.params.id;

    logger.info({
        type: 'REQUEST',
        message: 'Get Note By ID Request',
        requestId,
        customId,
        timestamp: new Date().toISOString(),
    });

    try {
        const note = await noteService.getNoteByIdAndStatus(customId);

        if (note.errorCode !== undefined) {
            logger.warn({
                type: 'RESPONSE',
                message: 'Note Not Found or Deleted',
                requestId,
                customId,
                statusCode: note.errorCode,
                timestamp: new Date().toISOString(),
                errorMessage: note.errorMessage,
            });

            return res.status(note.errorCode).json({ message: note.errorMessage });
        }

        logger.info({
            type: 'RESPONSE',
            message: 'Note Retrieved Successfully',
            requestId,
            customId,
            statusCode: 200,
            timestamp: new Date().toISOString(),
            note,
        });

        res.json(note); // Return the note
    } catch (error) {
        logger.error({
            type: 'RESPONSE',
            message: 'Error Retrieving Note',
            requestId,
            customId,
            statusCode: 500,
            error: error.message,
            timestamp: new Date().toISOString(),
        });

        res.status(500).send('Server Error');
    }
};

exports.deleteNote = async (req, res) => {
    const requestId = req.requestId; // Use the requestId generated in middleware
    const customId = req.params.id;

    logger.info({
        type: 'REQUEST',
        message: 'Delete Note Request',
        requestId,
        customId,
        timestamp: new Date().toISOString(),
    });

    try {
        const response = await noteService.deleteNote(customId);

        if (response.error) {
            logger.warn({
                type: 'RESPONSE',
                message: 'Error Deleting Note',
                requestId,
                customId,
                statusCode: 400,
                timestamp: new Date().toISOString(),
                error: response.error,
            });

            return res.status(400).json({ message: response.error });
        }

        logger.info({
            type: 'RESPONSE',
            message: 'Note Deleted Successfully',
            requestId,
            customId,
            statusCode: 200,
            timestamp: new Date().toISOString(),
            response: response.message,
        });

        res.json({ message: response.message }); // Handle success
    } catch (error) {
        logger.error({
            type: 'RESPONSE',
            message: 'Error Deleting Note',
            requestId,
            customId,
            statusCode: 500,
            error: error.message,
            timestamp: new Date().toISOString(),
        });

        res.status(500).send('Server Error');
    }
};
