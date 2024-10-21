import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { postRequest } from '../../services/service';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState('');  // New state for validation errors
    const navigate = useNavigate();  // useNavigate hook for redirection

    const validateForm = () => {
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setValidationError('Please enter a valid email address.');
            return false;
        }

        // Check for non-empty password
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
        if (!validateForm()) return;  // Return early if validation fails

        try {
            const request = { "email": email, "password": password };
            const response = await postRequest('/api/login', request);

            if (response) {
                localStorage.setItem('token', response.token);  // Store JWT in localStorage
                navigate('/');  // Redirect to homepage after login
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.log(error)
            setError('Error logging in, please try again.');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                {validationError && <Typography color="error">{validationError}</Typography>} {/* Show validation error */}
                {error && <Typography color="error">{error}</Typography>} {/* Show server-side error */}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}>
                        Login
                    </Button>
                </form>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        Don't have an account?{' '}
                        <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
                            Register here
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginForm;
