import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';

const ConfirmationDialog = ({ noteId, onConfirm, onCancel }) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 5,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: 'center',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Read and destroy?
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            textAlign: 'center',
          }}
        >
          You're about to read and destroy the note with id <strong>{noteId}</strong>.
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: 3,
            justifyContent: 'center',
          }}
        >
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={onConfirm}
            >
              Yes, show me the note
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={onCancel}
            >
              No, not now
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ConfirmationDialog;
