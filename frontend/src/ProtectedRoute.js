import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token, redirect to login
    return (<Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6" color="error" gutterBottom>
          You have been logged out. Please login again!
        </Typography>
        <Button variant="contained" href="/login" color="primary">
          Login
        </Button>
      </Box>)
  }

  const renderExpiredMessage = () => {
    // localStorage.removeItem('token'); // Clear the toke
    return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h6" color="error" gutterBottom>
        Session Expired. Please login again!
      </Typography>
      <Button variant="contained" href="/login" color="primary">
        Login
      </Button>
    </Box>
  )};

  try {
    // Decode the token
    const decodedToken = jwtDecode(token);

    // Check token expiration
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decodedToken.exp < currentTime) {
      // Token is expired
      localStorage.removeItem('token');
      console.warn("Token expired. Redirecting to login...");
      return renderExpiredMessage();
    }
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem('token'); // Clear invalid token
    return <Navigate to="/login" />;
  }

  // If token is valid, render the protected element
  return element;
};

export default ProtectedRoute;
