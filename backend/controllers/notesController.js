const noteService = require('../services/noteService');

exports.createNote = async (req, res) => {
    try {
        const inputNote = req.body;
        const response = await noteService.createNote(inputNote);
        res.json(response); // Send the response from the service
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
};

exports.getNoteById = async (req, res) => {
    const customId = req.params.id;
    try {
        const note = await noteService.getNoteById(customId);
        if (!note) {
            return res.status(404).json({ message: 'Note not found or deleted' });
        }        
        res.json(note); // Return the note
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
};

exports.deleteNote = async (req, res) => {
    const customId = req.params.id;
    try {
        const response = await noteService.deleteNote(customId);
        if (response.error) {
            return res.json(response.error); // Handle error
        }
        res.json(response.message); // Handle success
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
};
