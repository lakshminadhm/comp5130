const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  encryptedText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    default: null,
  },
  views: {
    type: Number,
    default: 0,
  },
  customId: {
    type: String,
    unique: true, // Ensure this is unique
    required: true,
  }
});

module.exports = mongoose.model('Note', NoteSchema);
