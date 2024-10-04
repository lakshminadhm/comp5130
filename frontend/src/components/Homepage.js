import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, MenuItem, Select, TextField, Typography, Box, Container, Alert } from '@mui/material';
import './Homepage.css';
import Header from './Header/Header';
import NoteReady from './NoteReady/NoteReady';

function Homepage() {
    const [noteText, setNoteText] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [selfDestructTime, setSelfDestructTime] = useState('After reading it');
    const [confirmBeforeDestruction, setConfirmBeforeDestruction] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [referenceName, setReferenceName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);  // State to track form submission
    const [loading, setLoading] = useState(false);          // State for API loading status
    const [error, setError] = useState(null);               // State for handling errors

    const handleNoteChange = (event) => setNoteText(event.target.value);
    const handleSelfDestructChange = (event) => setSelfDestructTime(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleReferenceNameChange = (event) => setReferenceName(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Reset error message before submission
        setError(null);

        // Prepare form data for API
        const formData = {
            noteText,
            selfDestructTime,
            confirmBeforeDestruction,
            password,
            confirmPassword,
            email,
            referenceName
        };

        try {
            setLoading(true);  // Set loading state
            const response = await fetch('https://api.example.com/notes', { // Replace with actual API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit the note. Please try again.');
            }

            const result = await response.json();
            console.log(result);

            // Proceed with rendering NoteReady on success
            setIsSubmitted(true);
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred while submitting the note. Please try again.');
        } finally {
            setLoading(false);  // Reset loading state
        }
    };

    // Define the enum-like object
    const SelfDestructTimes = {
        AFTER_READING: "After reading it",
        ONE_HOUR: "1 Hr",
        TWO_HOURS: "2 Hrs",
    };

    // Conditionally render NoteReady or the form
    if (isSubmitted) {
        return <NoteReady noteText={noteText} />;
    }

    return (
        <Container maxWidth="md">
            <Box>
                <Header />

                {/* Display error message if there is any */}
                {error && (
                    <Alert severity="error" sx={{ marginBottom: 2 }}>
                        {error}
                    </Alert>
                )}

                {loading && <Typography>Submitting note...</Typography>}

                {!loading && (
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
                                <Box sx={{ display: 'flex', flexDirection: "horizantal" }}>
                                    <Box component="section" sx={{ width: "50%" }}>
                                        <Typography variant="h6" >Self-Destruct Time</Typography>
                                        <Select
                                            value={selfDestructTime}
                                            onChange={handleSelfDestructChange}
                                            fullWidth
                                            sx={{ marginBottom: 2 }}
                                        >
                                            {Object.entries(SelfDestructTimes).map(([key, value]) => (
                                                <MenuItem key={key} value={value}>
                                                    {value}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Box>

                                    <Box component="section" sx={{ alignContent: 'center', padding: "0 0 0 10px", width: "50%" }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={confirmBeforeDestruction}
                                                    onChange={() => setConfirmBeforeDestruction(!confirmBeforeDestruction)}
                                                />
                                            }
                                            label="Do not ask for confirmation before showing and destroying the note"
                                        />
                                    </Box>
                                </Box>
                                {/* Manual Password Section */}
                                <Typography variant="h6" sx={{ marginTop: 2 }}>Manual Password</Typography>
                                <Box sx={{ display: 'flex', flexDirection: "horizantal", width: "90%" }}>
                                    <TextField
                                        label="Enter a custom password"
                                        type="password"
                                        fullWidth
                                        value={password}
                                        onChange={handlePasswordChange}
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        label="Confirm password"
                                        type="password"
                                        fullWidth
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        sx={{ marginBottom: 2, paddingLeft: "10px" }}
                                    />
                                </Box>
                                {/* Destruction Notification Section */}
                                <Typography variant="h6" sx={{ marginTop: 2 }}>Destruction Notification</Typography>
                                <Box sx={{ display: 'flex', flexDirection: "horizantal", width: "90%" }}>
                                    <TextField
                                        label="Email to notify when note is destroyed"
                                        type="email"
                                        fullWidth
                                        value={email}
                                        onChange={handleEmailChange}
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        label="Reference name for the note (optional)"
                                        fullWidth
                                        value={referenceName}
                                        onChange={handleReferenceNameChange}
                                        sx={{ marginBottom: 2, paddingLeft: "10px" }}
                                    />
                                </Box>
                            </Box>
                        )}
                    </form>
                )}
            </Box>
        </Container>
    );
}

export default Homepage;
