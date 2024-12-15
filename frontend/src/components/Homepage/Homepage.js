import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
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
    <Container maxWidth="md" sx={{p:0}}>
      <Box 
      minHeight={"50vh"}
        className="box" 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        textAlign="center"
        p={0}
      >
        {/* Welcome Header */}
        <Typography
          variant="h3"
          className="welcome-text"
          sx={{
            fontSize: {
              xs: '1.5rem', // Font size for mobile devices (xs: extra small)
              sm: '2rem',   // Font size for small devices
              md: '3rem',   // Font size for medium and above
            },
            fontWeight:'bold'            
          }}
          gutterBottom
        >
          Welcome to Crypto Note!
        </Typography>
        <Typography variant="h6" sx={{
            fontSize: {
              xs: '0.9rem', // Font size for mobile devices (xs: extra small)
              sm: '1rem',   // Font size for small devices
              md: '1.5rem',   // Font size for medium and above
            },           
          }}
          gutterBottom>
          Create self-destructing notes and share them securely with friends.
        </Typography>

        <Grid container spacing={2} justifyContent="center" mt={4}>
          <Grid item xs={12} sm={6}>
            {/* Create Note Button */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              className="create-button"
              onClick={handleCreateNote}
              sx={{
                fontSize:{
                  xs:'0.8rem',
                  md:'1rem'
                }
              }}
            >
              Create a New Note
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* View Note Button */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              className="view-button"
              onClick={handleViewNote}
              sx={{
                fontSize:{
                  xs:'0.8rem',
                  md:'1rem'
                }
              }}
            >
              View a Note
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Homepage;
