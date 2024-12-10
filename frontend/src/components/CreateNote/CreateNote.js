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
  const [noteLink, setNoteLink] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Enum-like object for self-destruct times
  const SelfDestructTimes = {
    AFTER_READING: "After reading it",
    ONE_HOUR: "1 Hr",
    TWO_HOURS: "2 Hrs",
  };

  // Handlers for each field
  const handleNoteChange = (event) => setNoteText(event.target.value);
  const handleSelfDestructChange = (event) => setSelfDestructTime(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleReferenceNameChange = (event) => setReferenceName(event.target.value);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error before submission

    if(noteText === ''){
      setError("Note can not be empty.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const formData = {
      noteText,
      selfDestructTime,
      confirmBeforeDestruction,
      password,
      email,
      referenceName
    };

    try {
      setLoading(true);
      // API call
      console.log(localStorage.getItem('token'))
      const response = await postRequest('/api/note', formData,{'Authorization': `Bearer ${localStorage.getItem('token')}`});

      // if (!response.ok) {
      //     throw new Error('Failed to submit the note. Please try again.');
      // }

      const result = response

      setNoteLink(result.noteId);

      setIsSubmitted(true);
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while submitting the note. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // // Conditionally render NoteReady or the form
  // if (isSubmitted) {
  //   return <NoteReady noteText={noteLink} />;
  // }

  return (
    <Container maxWidth="md">
      <Box>
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
  
        {loading && <Loading progressText={"Submitting Note..."}></Loading>}
  
        {!loading && (
          isSubmitted ? (
            <NoteReady noteLink={noteLink} />  // Conditionally render NoteReady component
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Write your note here..."
                multiline
                fullWidth
                rows={4}
                value={noteText}
                onChange={handleNoteChange}
                sx={{ marginBottom: 2 }}
              />
  
              <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 2 }}>Create Note</Button>
              <Button variant="outlined" onClick={() => setShowOptions(!showOptions)}>
                {showOptions ? "Hide" : "Show"} options
              </Button>
  
              {showOptions && (
                <Box className="options-section" sx={{ marginTop: 2 }}>
                  {/* Self-destruct options */}
                  <Typography variant="h6" sx={{ marginBottom: 2 }}>Self-Destruct Time</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Select
                        value={selfDestructTime}
                        onChange={handleSelfDestructChange}
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
                        label="Do not ask for confirmation before showing and destroying the note"
                      />
                    </Grid>
                  </Grid>
  
                  {/* Password Section */}
                  <Typography variant="h6" sx={{ marginTop: 2 }}>Manual Password</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Enter a custom password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Confirm password"
                        type="password"
                        fullWidth
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                    </Grid>
                  </Grid>
  
                  {/* Destruction Notification Section */}
                  <Typography variant="h6" sx={{ marginTop: 2 }}>Destruction Notification</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Email to notify when note is destroyed"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Reference name for the note (optional)"
                        fullWidth
                        value={referenceName}
                        onChange={handleReferenceNameChange}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}
            </form>
          )
        )}
      </Box>
    </Container>
  );
  
}

export default CreateNote;
