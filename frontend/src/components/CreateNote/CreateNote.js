import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const CreateNote = () => {
  return (
    <Container maxWidth="sm">
      <Box>
        <Typography variant="h4">Create a New Note</Typography>
        <TextField label="Write your note here..." multiline fullWidth rows={4} />
        <Box>
          <Button variant="contained" color="primary">Create Note</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateNote;
