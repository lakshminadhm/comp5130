import React, { useEffect, useState, useRef } from 'react';
import { TextField, Button, Typography, Container, Box, CircularProgress, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { postRequest } from '../../services/service';
import { authService } from '../../services/authService';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const abortControllerRef = useRef(null);

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setValidationError('Please enter a valid email address.');
            return false;
        }

        if (password.length < 6) {
            setValidationError('Password should be at least 6 characters long.');
            return false;
        }

        setValidationError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Cancel any ongoing request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new AbortController for this request
        abortControllerRef.current = new AbortController();
        setIsLoading(true);
        setError(null);

        try {
            const request = { "email": email, "password": password };
            const response = await postRequest(
                '/api/login',
                request,
                {},
                abortControllerRef.current.signal
            );

            if (response) {
                authService.setToken(response.token);
                navigate('/');
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                return; // Request was cancelled, do nothing
            }
            setError(error.message || 'An error occurred during login. Please try again.');
        } finally {
            setIsLoading(false);
            abortControllerRef.current = null;
        }
    };

    useEffect(() => {
        const token = authService.getToken();
        if (token && authService.isTokenValid()) {
            navigate('/');
        }

        // Cleanup function to cancel any ongoing request
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [navigate]);

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                {validationError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {validationError}
                    </Alert>
                )}
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
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
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                    </Button>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant="body2">
                            Don't have an account?{' '}
                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                Register here
                            </Link>
                        </Typography>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default LoginForm;
