import React, { useState } from 'react';
import {
  Button, Checkbox, FormControlLabel, MenuItem, Select,
  TextField, Typography, Box, Container, Alert, Grid
} from '@mui/material';
import './CreateNote.css';
import NoteReady from '../NoteReady/NoteReady';
import { postRequest } from '../../services/service';
import Loading from '../Loading/Loading';

function CreateNote() {
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
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      });
      setNoteId(response.noteId);
      setIsSubmitted(true);
    } catch (err) {
      setError("An error occurred while submitting the note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {loading && <Loading progressText="Submitting Note..." />}
        {!loading && (isSubmitted ? (
          <NoteReady noteId={noteId} />
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Write your note here..."
              multiline
              fullWidth
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  sx={{ py: 1.5 }}
                >
                  Create Note
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => setShowOptions(!showOptions)}
                  sx={{ py: 1.5 }}
                >
                  {showOptions ? "Disable" : "Show"} Options
                </Button>
              </Grid>
            </Grid>

            {showOptions && (
              <Box sx={{ mt: 2 }}>
                {/* Self-Destruct Options */}
                <Typography variant="h6" sx={{ mb: 2 }}>Self-Destruct Time</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Select
                      value={selfDestructTime}
                      onChange={(e) => setSelfDestructTime(e.target.value)}
                      fullWidth
                    >
                      {Object.entries(SelfDestructTimes).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={confirmBeforeDestruction}
                          onChange={() => setConfirmBeforeDestruction(!confirmBeforeDestruction)}
                        />
                      }
                      label="No confirmation before destroying"
                    />
                  </Grid>
                </Grid>

                {/* Password Section */}
                <Typography variant="h6" sx={{ mt: 2 }}>Password Protection</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Password"
                      type="password"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Grid>
                </Grid>

                {/* Notification Section */}
                <Typography variant="h6" sx={{ mt: 2 }}>Notification</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Email for destruction notification"
                      type="email"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Reference name"
                      fullWidth
                      value={referenceName}
                      onChange={(e) => setReferenceName(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </form>
        ))}
      </Box>
    </Container>
  );
}

export default CreateNote;
