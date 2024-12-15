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
    required: false,
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
  },
  selfDestructTime: {
    type: String,
    default: 'After reading it',
    enum: ['After reading it','1 Min', '1 Hr', '2 Hrs', '1 day', '1 week'], // You can add more options as needed
  },
  confirmBeforeDestruction: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    default: '',
  },
  referenceName: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Note', NoteSchema);
