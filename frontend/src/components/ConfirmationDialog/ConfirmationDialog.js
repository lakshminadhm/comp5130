import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

const ConfirmationDialog = ({ noteId, onConfirm, onCancel }) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 5, padding: 4, boxShadow: 3, borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Read and destroy?
        </Typography>
        <Typography variant="body1" gutterBottom>
          You're about to read and destroy the note with id <strong>{noteId}</strong>.
        </Typography>
        <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
          >
            Yes, show me the note
          </Button>
          <Button
            variant="outlined"
            onClick={onCancel}
          >
            No, not now
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ConfirmationDialog;
