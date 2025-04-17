import React, { useState } from 'react';
import {
  Button, Checkbox, FormControlLabel, MenuItem, Select,
  TextField, Typography, Box, Container, Alert, Grid, Paper, useTheme
} from '@mui/material';
import './CreateNote.css';
import NoteReady from '../NoteReady/NoteReady';
import { postRequest } from '../../services/service';
import Loading from '../Loading/Loading';
import { useTranslation } from 'react-i18next';

function CreateNote() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [noteText, setNoteText] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [selfDestructTime, setSelfDestructTime] = useState('After reading it');
  const [confirmBeforeDestruction, setConfirmBeforeDestruction] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [referenceName, setReferenceName] = useState('');
  const [noteId, setNoteId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const SelfDestructTimes = {
    AFTER_READING: "After reading it",
    ONE_MINUTE: "1 Min",
    ONE_HOUR: "1 Hr",
    TWO_HOURS: "2 Hrs",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!noteText.trim()) {
      setError("Note cannot be empty.");
      return;
    }
    if (password && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const formData = {
      noteText,
      selfDestructTime,
      confirmBeforeDestruction,
      password,
      email,
      referenceName,
    };

    try {
      setLoading(true);
      const response = await postRequest('/api/note', formData, {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      });
      
      if (response && response.noteId) {
        setNoteId(response.noteId);
        setIsSubmitted(true);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError("An error occurred while submitting the note. Please try again.");
      console.error('Error creating note:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {isSubmitted ? (
      <NoteReady noteId={noteId} />
    ) : (
      <Container maxWidth="md">
        <Paper 
          elevation={3}
        sx={{
          p: 4,
          mt: 4,
          borderRadius: 2,
          background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
            {t('create_note')}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 2 }}>
            {t('create_note_description')}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ maxWidth: '600px', mx: 'auto' }}>
            {t('create_note_details')}
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {loading && <Loading progressText={t('submitting_note')} />}
        
        {!loading &&
          <form onSubmit={handleSubmit}>
            <TextField
              label={t('write_note_placeholder')}
              multiline
              fullWidth
              rows={6}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              sx={{ mb: 3 }}
              variant="outlined"
            />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  sx={{ py: 1.5 }}
                >
                  {t('create_note_button')}
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => setShowOptions(!showOptions)}
                  sx={{ py: 1.5 }}
                >
                  {showOptions ? t('hide_options') : t('show_options')}
                </Button>
              </Grid>
            </Grid>

            {showOptions && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  {t('note_options')}
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={t('reference_name')}
                      fullWidth
                      value={referenceName}
                      onChange={(e) => setReferenceName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={t('email')}
                      type="email"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={t('password')}
                      type="password"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={t('confirm_password')}
                      type="password"
                      fullWidth
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Select
                      value={selfDestructTime}
                      onChange={(e) => setSelfDestructTime(e.target.value)}
                      fullWidth
                      label={t('self_destruct_time')}
                    >
                      {Object.values(SelfDestructTimes).map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={confirmBeforeDestruction}
                          onChange={(e) => setConfirmBeforeDestruction(e.target.checked)}
                        />
                      }
                      label={t('confirm_before_destruction')}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </form>
        }
      </Paper>
    </Container>
    )}
    </>
  );
}

export default CreateNote;
