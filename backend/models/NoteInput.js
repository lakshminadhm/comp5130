const mongoose = require('mongoose');

const NoteInputSchema = new mongoose.Schema({
  noteText: {
    type: String,
    required: true,  // Note text is required
  },
  selfDestructTime: {
    type: String,
    default: 'After reading it',  // Default self-destruction time
    enum: ['After reading it', '1 Hr','2 Hrs', '1 day', '1 week'],  // Example options for self-destruction time
  },
  confirmBeforeDestruction: {
    type: Boolean,
    default: false,  // Default is no confirmation before destruction
  },
  password: {
    type: String,
    default: '',  // Default password is an empty string if not provided
  },
  email: {
    type: String,
    default: '',  // Default email is an empty string
  },
  referenceName: {
    type: String,
    default: '',  // Default reference name is an empty string
  },
});

module.exports = mongoose.model('NoteInput', NoteInputSchema);
