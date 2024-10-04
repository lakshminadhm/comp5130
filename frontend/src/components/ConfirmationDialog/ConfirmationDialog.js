import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

const ConfirmationDialog = ({ noteId, onConfirm, onCancel }) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 5, padding: 4, boxShadow: 3, borderRadius: 2, textAlign: 'center' }}>
        Note View ConfirmationDialog
      </Box>
    </Container>
  );
};

export default ConfirmationDialog;
