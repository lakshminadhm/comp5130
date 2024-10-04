import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField } from '@mui/material';

function NoteReady() {
  const [copySuccess, setCopySuccess] = useState('');

  const noteLink = "https://privnote.com/ZfM9ZcUW#BIXwSkSNV";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(noteLink)
      .then(() => {
        setCopySuccess('Link copied to clipboard!');
      })
      .catch(() => {
        setCopySuccess('Failed to copy link.');
      });
  };

  const handleDestroy = () => {
    // handle destroy logic
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
            href={`mailto:?subject=Secure Note Link&body=Here is the link to your secure note: ${noteLink}`}
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

        {/* Destroy note button */}
        <Box sx={{ textAlign: 'center', marginTop: '20px' }} onClick={handleDestroy}>
          <Button variant="contained" color="error">
            Destroy note now
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default NoteReady;
