import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Alert,
  TextField,
  Grid,
} from '@mui/material';
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

  useEffect(() => {
    if (noteId) {
      fetchNoteDetails(urlNoteId);
    }
  }, [urlNoteId]);

  const fetchNoteDetails = async (id) => {
    setLoading(true);
    setError(null);

    const response = await getRequest('/api/note/' + id, {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    if (response.errorCode) {
      setError(response.errorMessage.message);
    } else {
      setNote(response.text);
      setConfirmBeforeDestruction(response.confirmBeforeDestruction);
    }
    setLoading(false);
  };

  const handleNoteIdChange = (event) => {
    setNoteId(event.target.value);
  };

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

  const onConfirm = async () => {
    setShowConfirmation(false);
    const response = await deleteRequest('/api/delete/' + noteId, {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    console.log(response);
  };

  if (loading) {
    return <Loading />;
  }

  if (destroyed) {
    return (
      <NoteDestroyed
        noteId={noteId}
        destructionTime="2 minutes and 52 seconds" // Placeholder destruction time
      />
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', marginTop: 5 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  if (note && showConfirmation && !confirmBeforeDestruction) {
    return (
      <ConfirmationDialog
        noteId={noteId}
        onConfirm={onConfirm}
        onCancel={() => navigate('/')}
      />
    );
  }

  if (note) {
    return (
      <Container maxWidth="md">
        <Box
          sx={{
            marginTop: 5,
            padding: 4,
            border: '1px solid black',
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: '#ffbaac',
              padding: 1,
              borderRadius: 1,
              marginBottom: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'red' }}>
              This note was destroyed. If you need to keep it, copy it before
              closing this window.
            </Typography>
          </Box>

          <Box
            id="noteContent"
            sx={{
              backgroundColor: '#fff9c4',
              padding: 3,
              borderRadius: 1,
              minHeight: '150px',
              fontSize: '1.2rem',
              color: '#333',
            }}
          >
            {note}
          </Box>

          <Box sx={{ textAlign: 'center', marginTop: 3 }}>
            <Button variant="contained" onClick={handleSelectText}>
              Select text
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} sx={{ marginTop: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom textAlign="center">
            Enter Note ID
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Note ID"
            fullWidth
            value={noteId}
            onChange={handleNoteIdChange}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            // fullWidth
            onClick={handleViewNote}
            disabled={!noteId}
          >
            View Note
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ViewNote;
