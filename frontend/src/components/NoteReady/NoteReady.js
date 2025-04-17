import React, { useState } from 'react';
import { 
  Typography, Box, Button, TextField, useMediaQuery, useTheme,
  Paper, Alert, Snackbar, IconButton, Tooltip, Container
} from '@mui/material';
import { deleteRequest } from '../../services/service';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import {QRCodeSVG} from 'qrcode.react';

function NoteReady({ noteId }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const baseUrl = process.env.REACT_APP_BASE_URL || window.location.origin;
  const noteLink = `${baseUrl}/view/${noteId}`;
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isDestroying, setIsDestroying] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(noteLink);
      showSnackbar(t('link_copied_success'), 'success');
    } catch (error) {
      showSnackbar(t('link_copied_error'), 'error');
    }
  };

  const handleDestroy = async () => {
    try {
      setIsDestroying(true);
      const response = await deleteRequest(`/api/delete/${noteId}`, {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      });
      
      if (response?.errorCode === undefined) {
        showSnackbar(t('note_destroyed_success'), 'success');
        setTimeout(() => navigate('/'), 2000);
      } else {
        showSnackbar(t('note_destroyed_error'), 'error');
      }
    } catch (error) {
      showSnackbar(t('note_destroyed_error'), 'error');
    } finally {
      setIsDestroying(false);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="md">
    <Paper 
      elevation={3}
      sx={{
        p: { xs: 2, sm: 4 },
        borderRadius: 2,
        background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant={isMobile ? 'h5' : 'h4'} 
          component="h1" 
          gutterBottom 
          color="primary"
          sx={{ fontWeight: 'bold' }}
        >
          {t('note_ready_title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {t('note_ready_description')}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          value={noteLink}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Tooltip title={t('copy_link')}>
                <IconButton onClick={handleCopyLink} size="large">
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            ),
          }}
          sx={{
            backgroundColor: 'rgba(255, 255, 204, 0.3)',
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Box sx={{ 
          p: 2, 
          backgroundColor: 'white', 
          borderRadius: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <QRCodeSVG 
            value={noteLink} 
            size={128} 
            level="H"
            includeMargin={true}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<EmailIcon />}
          href={`mailto:?subject=${encodeURIComponent(t('email_subject'))}&body=${encodeURIComponent(t('email_body', { link: noteLink }))}`}
          fullWidth
        >
          {t('email_link')}
        </Button>

        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDestroy}
          disabled={isDestroying}
          fullWidth
        >
          {isDestroying ? t('destroying_note') : t('destroy_note')}
        </Button>

        <Button
          variant="outlined"
          color="primary"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          fullWidth
          sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}
        >
          {t('go_to_home')}
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
    </Container>
  );
}

export default NoteReady;
