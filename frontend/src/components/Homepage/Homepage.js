import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './Homepage.css';

const Homepage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  // Handlers to navigate to different pages
  const handleCreateNote = () => {
    navigate('/create');
  };

  const handleViewNote = () => {
    navigate('/view');
  };

  return (
    <Container maxWidth="md">
      <Paper 
        elevation={3}
        sx={{
          p: 4,
          mt: 4,
          borderRadius: 2,
          background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          textAlign="center"
        >
          {/* Welcome Header */}
          <Typography
            variant="h3"
            sx={{
              fontSize: {
                xs: '1.8rem',
                sm: '2.2rem',
                md: '3rem',
              },
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              mb: 2,
            }}
          >
            {t('welcome_message')}
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{
              fontSize: {
                xs: '1rem',
                sm: '1.1rem',
                md: '1.5rem',
              },
              color: theme.palette.text.secondary,
              mb: 4,
              maxWidth: '600px',
            }}
          >
            {t('description')}
          </Typography>

          <Grid container spacing={3} justifyContent="center" mt={2}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                startIcon={<NoteAddIcon />}
                onClick={handleCreateNote}
                sx={{
                  py: 2,
                  fontSize: {
                    xs: '0.9rem',
                    md: '1.1rem'
                  },
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.2s',
                  }
                }}
              >
                {t('create_note')}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                startIcon={<VisibilityIcon />}
                onClick={handleViewNote}
                sx={{
                  py: 2,
                  fontSize: {
                    xs: '0.9rem',
                    md: '1.1rem'
                  },
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.2s',
                  }
                }}
              >
                {t('view_note')}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Homepage;
