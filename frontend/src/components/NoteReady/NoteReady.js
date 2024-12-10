import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField } from '@mui/material';
import { deleteRequest } from '../../services/service';
import { useNavigate } from 'react-router-dom';

function NoteReady({ noteId }) {
  const navigate = useNavigate();

  const noteLink = "https://localhost:3000/view/"+ noteId;
  const [copySuccess, setCopySuccess] = useState('');
  const [destroyMessage, setDestroyMessage] = useState('');

  // const noteLink = "https://privnote.com/ZfM9ZcUW#BIXwSkSNV";

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
    const response = await deleteRequest( '/api/delete/'+ noteId, {'Authorization': `Bearer ${localStorage.getItem('token')}`});
    console.log(response);
    
    if (response?.errorCode === undefined) {
      setDestroyMessage('Note has been destroyed.'); // Set destroy message
      setTimeout(() => {
        navigate(`/`); // Navigate to home after 1 second
      }, 1500);
    } else {
      console.log('Failed to destroy the note');
    }
  }

  return (
    <Container >
      <Box>

        {/* Note link */}
        <Typography variant="h6" align="center" gutterBottom>
          Note link ready
        </Typography>

        <TextField
          fullWidth
          value={noteLink}
          InputProps={{
            readOnly: true,
            style: { backgroundColor: '#ffffcc', padding: '10px' }
          }}
          variant="outlined"
        />

        <Typography variant="body1" align="center" style={{ margin: '10px 0' }}>
          The note will self-destruct after reading it.
        </Typography>

        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '20px'
          }}
        >
          <Button variant="contained" color="primary" onClick={handleCopyLink}>
            Copy link
          </Button>
          <Button
            variant="contained"
            color="secondary"
            href={`mailto:?subject=Secure Note Link&body=Here is the link to your secure note: ${noteId}`}
          >
            E-mail link
          </Button>
        </Box>

        {/* Copy Success Message */}
        {copySuccess && (
          <Typography variant="body2" color="secondary" sx={{ marginTop: 2, textAlign: 'center' }}>
            {copySuccess}
          </Typography>
        )}

        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px'
          }}
           >
          <Button variant="contained" color="error" onClick={handleDestroy}>
            Destroy note now
          </Button>

          <Button variant="contained" onClick={()=>navigate('/')}>
            Go to Home
          </Button>
        </Box>

        {/* Destroy Message */}
        {destroyMessage && (
            <Typography variant="h6" color="error" align="center" sx={{ marginTop: 2 }}>
              {destroyMessage}
            </Typography>
        )}
      </Box>     

    </Container>
  );
}

export default NoteReady;
