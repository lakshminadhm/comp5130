import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField, useMediaQuery, useTheme } from '@mui/material';
import { deleteRequest } from '../../services/service';
import { useNavigate } from 'react-router-dom';

function NoteReady({ noteId }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const noteLink = "https://localhost:3000/view/" + noteId;
  const [copySuccess, setCopySuccess] = useState('');
  const [destroyMessage, setDestroyMessage] = useState('');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(noteLink)
      .then(() => {
        setCopySuccess('Link copied to clipboard!');
      })
      .catch(() => {
        setCopySuccess('Failed to copy link.');
      });
  };

  const handleDestroy = async () => {
    const response = await deleteRequest('/api/delete/' + noteId, { Authorization: `Bearer ${localStorage.getItem('token')}` });
    if (response?.errorCode === undefined) {
      setDestroyMessage('Note has been destroyed.');
      setTimeout(() => {
        navigate(`/`);
      }, 1500);
    } else {
      console.log('Failed to destroy the note');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ padding: isMobile ? '20px' : '40px', textAlign: 'center' }}>
      <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom>
        Note Link Ready
      </Typography>

      <TextField
        fullWidth
        value={noteLink}
        sx={{
          readOnly: true,
          backgroundColor: '#ffffcc',
          marginBottom: '16px',
        }}
        variant="outlined"
      />

      <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        The note will self-destruct after reading it.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: isMobile ? 'center' : 'space-between',
          gap: '10px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleCopyLink}
          sx={{
            flex: isMobile ? '1 0 auto' : '1',
          }}
        >
          Copy Link
        </Button>
        <Button
          variant="contained"
          color="secondary"
          href={`mailto:?subject=Secure Note Link&body=Here is the link to your secure note: ${noteLink}`}
          sx={{
            flex: isMobile ? '1 0 auto' : '1',
          }}
        >
          Email Link
        </Button>
      </Box>

      {copySuccess && (
        <Typography variant="body2" color="secondary" sx={{ marginTop: '12px' }}>
          {copySuccess}
        </Typography>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: isMobile ? 'center' : 'space-between',
          gap: '10px',
          marginTop: '20px',
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={handleDestroy}
          sx={{
            flex: isMobile ? '1 0 auto' : '1',
          }}
        >
          Destroy Note Now
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{
            flex: isMobile ? '1 0 auto' : '1',
          }}
        >
          Go to Home
        </Button>
      </Box>

      {destroyMessage && (
        <Typography variant="h6" color="error" sx={{ marginTop: '20px' }}>
          {destroyMessage}
        </Typography>
      )}
    </Container>
  );
}

export default NoteReady;
