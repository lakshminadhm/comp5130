const genericService = require('./genericService');
const Note = require('../models/Note');
const crypto = require('crypto');
const cryptoFunc = require('../crypto/cryptoFunc');
const { decrypt } = require('dotenv');

// Create a new note
exports.createNote = async (inputNote) => {
    const salt = generateSalt(); // Generate a unique salt
    const hash = hashNoteContent(inputNote, salt); // Hash the note with the salt
    console.log(hash)

    encryptedText = cryptoFunc.encrypt(inputNote.text, hash)    

    const newNote = new Note({
        encryptedText:encryptedText,
        password: inputNote.password,
        expiresAt: new Date(Date.now()).setHours(1),
        customId: hash,
      });
    
    const response = await Note.create(newNote); // Save the note
    const noteUrl = `http://localhost:5000/api/note/${response.customId}`;
    return { message: 'Note created', link: noteUrl }; // Return the customId to the user
};

// Get a note by customId, checking if it's deleted in the service
exports.getNoteById = async (customId) => {
    const query = { customId, isDeleted: false };
    const note = await genericService.findOne(Note, query);
    if (!note) {
        return null; // no note found
    }
    decryptedText = cryptoFunc.decrypt(note.encryptedText, customId)
    return {text: decryptedText}; // Return the note
};

// Delete a note
exports.deleteNote = async (customId) => {
    const result = await genericService.updateOne(Note, { customId }, { $set: { isDeleted: true } });
    if (result.matchedCount === 0) {
        return { error: "Failed to delete or note not found" }; // Handle failure
    }
    return { message: "Note has been deleted" }; // Handle success
};




// Function to generate a random salt
function generateSalt() {
    return crypto.randomBytes(32).toString('hex'); // 16 bytes => 32 hex characters
}

// Function to hash the note content with the salt
function hashNoteContent(content, salt) {
    return crypto.createHash('sha256').update(content + salt).digest('hex');
}