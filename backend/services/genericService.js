const logger = require('../config/logger'); // Import the logger

// Generic function to create a document
exports.create = async (model, data, requestId) => {
    const modelName = model.modelName || 'UnknownModel'; // Get the model name for better logs

    logger.info({
        type: 'REQUEST',
        message: 'Create Document Request',
        class: 'GenericService',
        model: modelName,
        function:'create',
        requestId,
        timestamp: new Date().toISOString(),
        payload: data,
    });

    try {
        const document = new model(data);
        await document.save();

        logger.info({
            type: 'RESPONSE',
            message: 'Document Created Successfully',
            class: 'GenericService',
            function:'create',
            model: modelName,
            requestId,
            timestamp: new Date().toISOString(),
            documentId: document._id,
        });

        return document;
    } catch (error) {
        logger.error({
            type: 'RESPONSE',
            message: 'Error Creating Document',
            class: 'GenericService',
            function:'create',
            model: modelName,
            requestId,
            timestamp: new Date().toISOString(),
            error: error.message,
        });

        throw new Error('Failed to create document');
    }
};

// Generic function to find one document by query
exports.findOne = async (model, query, requestId) => {
    const modelName = model.modelName || 'UnknownModel'; // Get the model name for better logs

    logger.info({
        type: 'REQUEST',
        message: 'Find Document Request',
        class: 'GenericService',
        function:'findOne',
        model: modelName,
        requestId,
        timestamp: new Date().toISOString(),
        query,
    });

    try {
        const document = await model.findOne(query);

        if (document) {
            logger.info({
                type: 'RESPONSE',
                message: 'Document Found Successfully',
                class: 'GenericService',
                model: modelName,
                function:'findOne',
                requestId,
                timestamp: new Date().toISOString(),
                documentId: document._id,
            });
        } else {
            logger.warn({
                type: 'RESPONSE',
                message: 'Document Not Found',
                class: 'GenericService',
                function:'findOne',
                model: modelName,
                requestId,
                timestamp: new Date().toISOString(),
            });
        }

        return document;
    } catch (error) {
        logger.error({
            type: 'RESPONSE',
            message: 'Error Finding Document',
            class: 'GenericService',
            function:'findOne',
            model: modelName,
            requestId,
            timestamp: new Date().toISOString(),
            error: error.message,
        });

        throw new Error('Failed to find document');
    }
};

// Generic function to update one document
exports.updateOne = async (model, query, update, requestId) => {
    const modelName = model.modelName || 'UnknownModel'; // Get the model name for better logs

    logger.info({
        type: 'REQUEST',
        message: 'Update Document Request',
        class: 'GenericService',
        function:'updateOne',
        model: modelName,
        requestId,
        timestamp: new Date().toISOString(),
        query,
        update,
    });

    try {
        const result = await model.updateOne(query, update);

        if (result.matchedCount > 0) {
            logger.info({
                type: 'RESPONSE',
                message: 'Document Updated Successfully',
                class: 'GenericService',
                function:'updateOne',
                model: modelName,
                requestId,
                timestamp: new Date().toISOString(),
                matchedCount: result.matchedCount,
            });
        } else {
            logger.warn({
                type: 'RESPONSE',
                message: 'No Document Matched for Update',
                class: 'GenericService',
                function:'updateOne',
                model: modelName,
                requestId,
                timestamp: new Date().toISOString(),
            });
        }

        return result;
    } catch (error) {
        logger.error({
            type: 'RESPONSE',
            message: 'Error Updating Document',
            class: 'GenericService',
            function:'updateOne',
            model: modelName,
            requestId,
            timestamp: new Date().toISOString(),
            error: error.message,
        });

        throw new Error('Failed to update document');
    }
};
