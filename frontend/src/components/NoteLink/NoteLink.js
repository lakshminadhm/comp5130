import React from 'react';
import { Box, Button, Typography } from '@mui/material';

function NoteLink({ noteLink, handleCopyLink }) {
    noteLink = "hellohow"
  return (
    <Box className="note-link-container" sx={{
      maxWidth: 600,
      margin: '0 auto',
      padding: 2,
      border: '1px solid #ccc',
      borderRadius: 2,
      boxShadow: 2,
      backgroundColor: '#f9f9f9'
    }}>
      <header>
        <Typography variant="h4" component="h1" align="center">privnote</Typography>
        <Typography variant="body2" align="center">privnote.com</Typography>
      </header>
      <Box className="note-link-box" sx={{
        textAlign: 'center',
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
        backgroundColor: '#fff'
      }}>
        <Typography variant="h5">Note link ready</Typography>
        <Box className="note-link" sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 2
        }}>
          <Box sx={{
            backgroundColor: 'yellow',
            padding: '5px 10px',
            borderRadius: 1,
            marginRight: 1
          }}>
            {noteLink}
          </Box>
          <Button variant="contained" color="primary" onClick={handleCopyLink}>
            Copy link
          </Button>
        </Box>
        <Box className="note-link-actions">
          <Button variant="outlined" sx={{ margin: 1 }}>Select</Button>
          <Button variant="outlined" sx={{ margin: 1 }}>E-mail it</Button>
          <Button variant="outlined" sx={{ margin: 1 }}>Delete this note</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default NoteLink;
