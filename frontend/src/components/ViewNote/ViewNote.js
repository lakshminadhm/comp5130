import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Alert,
  TextField,
  Grid,
  Paper,
  IconButton,
  Tooltip,
  Snackbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WarningIcon from '@mui/icons-material/Warning';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import Loading from '../Loading/Loading';
import NoteDestroyed from '../NoteDestroyed/NoteDestroyed';
import { deleteRequest, getRequest } from '../../services/service';
import { useTranslation } from 'react-i18next';

function ViewNote() {
  const { t } = useTranslation();
  const { noteId: urlNoteId } = useParams();
  const [noteId, setNoteId] = useState(urlNoteId || '');
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmBeforeDestruction, setConfirmBeforeDestruction] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [destroyed, setDestroyed] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const noteRef = useRef();

  useEffect(() => {
    if (urlNoteId) {
      fetchNoteDetails(urlNoteId);
    }
  }, [urlNoteId]);

  const fetchNoteDetails = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getRequest('/api/note/' + id, {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      });

      if (response.errorCode) {
        setError(response.errorMessage.message);
      } else {
        setNote(response.text);
        setConfirmBeforeDestruction(response.confirmBeforeDestruction);
        if (response.confirmBeforeDestruction) {
          setShowConfirmation(true);
        }
      }
    } catch (err) {
      setError(t('error_fetching_note'));
    } finally {
      setLoading(false);
    }
  };

  const handleNoteIdChange = (event) => {
    setNoteId(event.target.value);
  };

  const handleViewNote = () => {
    if (noteId.trim()) {
      navigate(`/view/${noteId.trim()}`);
    }
  };

  const handleCopyText = async () => {
    try {
      if (note) {
        await navigator.clipboard.writeText(note);
        showSnackbar(t('text_copied'), 'success');
      }
    } catch (err) {
      showSnackbar(t('copy_failed'), 'error');
    }
  };

  const handleSelectText = () => {
    const el = noteRef.current;
    if (el) {
      const range = document.createRange();
      range.selectNodeContents(el);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      showSnackbar(t('text_selected'), 'success');
    }
  };

  const onConfirm = async () => {
    setShowConfirmation(false);
    try {
      const response = await deleteRequest('/api/delete/' + noteId, {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      });
      if (!response.errorCode) {
        setDestroyed(true);
      } else {
        showSnackbar(t('error_destroying_note'), 'error');
      }
    } catch (err) {
      showSnackbar(t('error_destroying_note'), 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) return <Loading />;
  if (destroyed) return <NoteDestroyed noteId={noteId} />;

  if (error) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Alert severity="error">{error}</Alert>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            variant="outlined"
            color="primary"
            sx={{ mt: 2 }}
          >
            {t('go_back')}
          </Button>
        </Box>
      </Container>
    );
  }

  if (note && showConfirmation && confirmBeforeDestruction) {
    return (
      <ConfirmationDialog
        noteId={noteId}
        onConfirm={onConfirm}
        onCancel={() => navigate('/')}
      />
    );
  }

  if (note) {
    return (
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            marginTop: 5,
            padding: { xs: 2, sm: 4 },
            borderRadius: 2,
            background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(255, 186, 172, 0.3)',
              padding: 2,
              borderRadius: 1,
              marginBottom: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <WarningIcon color="error" />
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'error.main' }}>
              {t('note_destroy_warning')}
            </Typography>
          </Box>

          <Box
            id="noteContent"
            sx={{
              backgroundColor: 'rgba(255, 249, 196, 0.5)',
              padding: 3,
              borderRadius: 1,
              minHeight: '200px',
              fontSize: '1.2rem',
              color: 'text.primary',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              position: 'relative',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              '&:hover': {
                borderColor: 'primary.main',
              },
            }}
          >
            {note}
            <Tooltip title={t('copy_text')}>
              <IconButton
                onClick={handleCopyText}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              marginTop: 3,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSelectText}
              startIcon={<ContentCopyIcon />}
              sx={{
                py: 1.5,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {t('select_text')}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/')}
              startIcon={<ArrowBackIcon />}
              sx={{
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'white',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {t('go_back')}
            </Button>
          </Box>
        </Paper>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 5, p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              gutterBottom
              textAlign="center"
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              {t('enter_note_id')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t('note_id')}
              fullWidth
              value={noteId}
              onChange={handleNoteIdChange}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root:hover fieldset': {
                  borderColor: 'primary.main',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleViewNote}
              disabled={!noteId.trim()}
            >
              {t('view_note')}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ViewNote;
