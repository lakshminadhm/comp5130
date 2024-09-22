const mongoose = require('mongoose');

const NoteInputSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: null,
  }  
});

module.exports = mongoose.model('NoteInput', NoteInputSchema);
