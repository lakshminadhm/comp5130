import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    // Handle clicking on the title (navigates to homepage)
    const handleClick = () => {
        navigate('/');
    };

    // Handle logout functionality
    const handleLogout = () => {
        // Remove JWT token from localStorage
        localStorage.removeItem('token');

        // Redirect user to login page
        navigate('/login');
    };

    return (
        <header>
            <Box display="flex" justifyContent="space-between" alignItems="center" padding="10px">
                
                {/* Empty Box to push the title to the center */}
                <Box flex={1} />

                {/* Clicking the title navigates to the homepage */}
                <Box onClick={handleClick} style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                        crypto<span style={{ color: 'red' }}>Note</span>
                    </Typography>
                    <Typography variant="body2" color="gray">
                       A place to share your note securely
                    </Typography>
                </Box>

                {/* Empty Box to push the logout button to the right */}
                <Box flex={1} display="flex" justifyContent="flex-end">
                    {/* Conditional Logout Button (only visible if the token is in localStorage) */}
                    {localStorage.getItem('token') && (
                        <Button variant="contained" size="small" color="error" onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                </Box>
            </Box>
        </header>
    );
}

export default Header;
