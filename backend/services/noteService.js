const genericService = require('./genericService');
const Note = require('../models/Note');
const crypto = require('crypto');
const cryptoFunc = require('../crypto/cryptoFunc');
const { decrypt } = require('dotenv');

// Create a new note
exports.createNote = async (inputNote) => {
    const salt = generateSalt(); // Generate a unique salt
    const hash = hashNoteContent(inputNote, salt); // Hash the note with the salt
    // console.log(hash)

    encryptedText = cryptoFunc.encrypt(inputNote.noteText, hash)    

    const selfDestructOptions = {
        'After reading it': null,  // If it's set to 'After reading it', you may handle it differently later
        '1 hour': 1 * 60 * 60 * 1000,  // 1 hour in milliseconds
        '1 day': 24 * 60 * 60 * 1000,  // 1 day in milliseconds
        '1 week': 7 * 24 * 60 * 60 * 1000,  // 1 week in milliseconds
      };
      
      // Calculate expiration time based on selfDestructTime
      const destructTimeInMilliseconds = selfDestructOptions[inputNote.selfDestructTime] || 0;
      const expiresAt = destructTimeInMilliseconds ? new Date(Date.now() + destructTimeInMilliseconds) : null;
      
      const newNote = new Note({
        encryptedText: encryptedText,
        password: inputNote.password || null,  // If no password, store null
        expiresAt: expiresAt,  // Set calculated expiration date
        customId: hash,  // The unique ID for this note
        selfDestructTime: inputNote.selfDestructTime,  // Store the self-destruct time option
        confirmBeforeDestruction: inputNote.confirmBeforeDestruction || false,  // Use the value from input, or default to false
        email: inputNote.email || '',  // Store email, default to an empty string if not provided
        referenceName: inputNote.referenceName || '',  // Store reference name, default to empty string if not provided
      });
      
    
    const response = await Note.create(newNote); // Save the note
    
    return { message: 'Note created', noteId: response.customId }; // Return the customId to the user
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