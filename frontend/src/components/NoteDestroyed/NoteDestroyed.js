import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const NoteDestroyed = ({ noteId, destructionTime }) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 5, padding: 4, boxShadow: 3, borderRadius: 2, backgroundColor:"#fed8a6" }}>
        <Typography variant="h4" gutterBottom>
          Note destroyed
        </Typography>
        <Typography variant="body1" gutterBottom>
          The note with id <strong>{noteId}</strong> was read and destroyed in {destructionTime}.
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          If you haven't read this note it means someone else has. If you read it but forgot to write it down, then you need to ask whoever sent it to re-send it.
        </Typography>
      </Box>
    </Container>
  );
};

export default NoteDestroyed;
