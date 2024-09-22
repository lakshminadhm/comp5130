// services/genericService.js
const Note = require('../models/Note');

// Generic function to create a document
exports.create = async (model, data) => {
    const document = new model(data);
    await document.save();
    return document;
};

// Generic function to find one document by query
exports.findOne = async (model, query) => {
    return await model.findOne(query);
};

// Generic function to update one document
exports.updateOne = async (model, query, update) => {
    return await model.updateOne(query, update);
};

