import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, CircularProgress } from '@mui/material'; // Add CircularProgress for the loading spinner
import { Link, useNavigate } from 'react-router-dom';
import { postRequest } from '../../services/service';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState(''); // New state for validation errors
    const [isLoading, setIsLoading] = useState(false); // New state for loading
    const navigate = useNavigate(); // useNavigate hook for redirection

    const validateForm = () => {
        // Check if username is non-empty
        if (username.trim() === '') {
            setValidationError('Username is required.');
            return false;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setValidationError('Please enter a valid email address.');
            return false;
        }

        // Check for password length
        if (password.length < 6) {
            setValidationError('Password should be at least 6 characters long.');
            return false;
        }

        // Clear validation error if everything is valid
        setValidationError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Return early if validation fails

        setIsLoading(true); // Set loading state to true
        try {
            const request = { "username": username, "email": email, "password": password };
            const response = await postRequest('/api/register', request);

            if (response?.errorCode == undefined) {
                console.log(response)
                alert(response.message)
                navigate('/login'); // Redirect to homepage after registration
            } else {
                console.log(response)
                setError(response.errorMessage.message);
            }
        } catch (error) {
            setError('Error registering, please try again.');
        } finally {
            setIsLoading(false); // Set loading state back to false
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Register
                </Typography>
                {validationError && <Typography color="error">{validationError}</Typography>} {/* Show validation error */}
                {error && <Typography color="error">{error}</Typography>} {/* Show server-side error */}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={isLoading} // Disable input fields while loading
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading} // Disable input fields while loading
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading} // Disable input fields while loading
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={isLoading} // Disable the button while loading
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                    </Button>
                </form>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                            Login here
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterForm;
