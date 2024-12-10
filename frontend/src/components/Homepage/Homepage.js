import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

  // Handlers to navigate to different pages
  const handleCreateNote = () => {
    navigate('/create');
  };

  const handleViewNote = () => {
    navigate('/view');
  };

  return (
    <Container>
      <Box className="box">
        {/* Welcome Header */}
        <Typography variant="h3" className="welcome-text">
          Welcome to Crypto Note !
        </Typography>
        <Typography variant="h6">
          Create self-destructing notes and share them securely with friends.
        </Typography>

        <Box mt={4} display="flex" justifyContent="center" gap={2}>
          {/* Create Note Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="create-button"
            onClick={handleCreateNote}
          >
            Create a New Note
          </Button>

          {/* View Note Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="view-button"
            onClick={handleViewNote}
          >
            View a Note
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Homepage;
