import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', marginTop: 10 }}>
        <Typography variant="h4" gutterBottom>
          404 - Not Found
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4 }}>
          The page you are looking for does not exist. It may have been moved or deleted.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
