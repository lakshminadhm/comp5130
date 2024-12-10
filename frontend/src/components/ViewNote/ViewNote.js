import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, CircularProgress, Alert, TextField } from '@mui/material';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import Loading from '../Loading/Loading';
import NoteDestroyed from '../NoteDestroyed/NoteDestroyed';
import { deleteRequest, getRequest } from '../../services/service';

function ViewNote() {
  const { noteId: urlNoteId } = useParams(); // Extract the noteId from the URL if available
  const [noteId, setNoteId] = useState(urlNoteId || ''); // Use URL noteId or empty string
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(true); // Show confirmation by default
  const [confirmBeforeDestruction, setConfirmBeforeDestruction] = useState(true);
  const navigate = useNavigate();
  const [destroyed, setDestroyed] = useState(false);

  // Dummy data for demonstration purposes
  const dummyNoteData = {
    '123': {
      content: 'This is a dummy note for demonstration purposes. Please copy this content before it is destroyed!',
    },
  };

  // Fetch note details if URL noteId is provided
  useEffect(() => {
    if (noteId) {
      fetchNoteDetails(urlNoteId);
    }
  }, [urlNoteId]);

  // Handler to fetch note details
  const fetchNoteDetails = async (id) => {
    setLoading(true);
    setError(null);

    const response = await getRequest( '/api/note/'+id, {'Authorization': `Bearer ${localStorage.getItem('token')}`});
    console.log(response)
    if(response.errorCode){
      setError(response.errorMessage.message);
        // setDestroyed(true);      
    }
    else{
      setNote(response.text)
      setConfirmBeforeDestruction(response.confirmBeforeDestruction)
    }
    setLoading(false);
  };

  // Handler for manual note ID input change
  const handleNoteIdChange = (event) => {
    setNoteId(event.target.value);
  };

  // Handler for manual note ID form submission
  const handleViewNote = () => {
    if (noteId) {
      navigate(`/view/${noteId}`);
      fetchNoteDetails(noteId);
    }
  };

  const handleSelectText = () => {
    const textElement = document.getElementById('noteContent');
    if (textElement) {
      const range = document.createRange();
      range.selectNodeContents(textElement);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  
  const onConfirm = async () =>{
    setShowConfirmation(false)
    const response = await deleteRequest( '/api/delete/'+ noteId, {'Authorization': `Bearer ${localStorage.getItem('token')}`});
    console.log(response);
  }

  // If loading, show the loading indicator
  if (loading) {
    return (
      <Loading/>
    );
  }

  // If the note has been destroyed, show the NoteDestroyed component
  if (destroyed) {
    return (
      <NoteDestroyed
        noteId={noteId}
        destructionTime="2 minutes and 52 seconds" // Placeholder destruction time
      />
    );
  }

  // If there was an error, show an error message
  if (error) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', marginTop: 5 }}>
          {console.log(error)}
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  // If note data is available but the user has not confirmed, show confirmation dialog
  if (note && showConfirmation && !confirmBeforeDestruction) {
    return (
      <ConfirmationDialog
        noteId={noteId}
        onConfirm={onConfirm}
        onCancel={() => navigate('/')}
      />
    );
  }

  // If note data is available and confirmed, display the note content
  if (note) {
    return (
      <Container maxWidth="md">
        
        <Box
          sx={{
            marginTop: 5,
            padding: 4,
            border: "1px solid black",
            borderRadius: 2,
          }}
        >
          {/* Note Destruction Warning */}
          <Box
            sx={{
              backgroundColor: '#ffbaac',
              padding: 1,
              borderRadius: 10,
              marginBottom: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold', color:"red" }}>
              This note was destroyed. If you need to keep it, copy it before closing this window.
            </Typography>
          </Box>

          {/* Note Content */}
          <Box
            id="noteContent"
            sx={{
              backgroundColor: '#fff9c4',
              padding: 3,
              borderRadius: 2,
              minHeight: '150px',
              fontSize: '1.2rem',
              color: '#333',
            }}
          >
            {note}
          </Box>

          {/* Select Text Button */}
          <Box sx={{ textAlign: 'center', marginTop: 3 }}>
            <Button variant="contained" onClick={handleSelectText}>
              Select text
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  // Show manual note ID entry if no note data is yet available
  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4, padding: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Enter Note ID
        </Typography>
        <TextField
          label="Note ID"
          fullWidth
          value={noteId}
          onChange={handleNoteIdChange}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewNote}
          disabled={!noteId}
        >
          View Note
        </Button>
      </Box>
    </Container>
  );
}

export default ViewNote;
