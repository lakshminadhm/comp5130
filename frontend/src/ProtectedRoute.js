import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { authService } from './services/authService';

const ProtectedRoute = ({ element }) => {
  const token = authService.getToken();
  console.log(token);
  if (!token) {
    // If no token, redirect to login
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6" color="error" gutterBottom>
          You have been logged out. Please login again!
        </Typography>
        <Button variant="contained" href="/login" color="primary">
          Login
        </Button>
      </Box>
    );
  }

  if (!authService.isTokenValid()) {
    authService.removeToken();
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6" color="error" gutterBottom>
          Session Expired. Please login again!
        </Typography>
        <Button variant="contained" href="/login" color="primary">
          Login
        </Button>
      </Box>
    );
  }

  // If token is valid, render the protected element
  return element;
};

export default ProtectedRoute;
