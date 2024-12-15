import React from 'react';
import { Typography, Button, Box, MenuItem, Select  } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';

function Header() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Breakpoint for small screens


    const { t, i18n } = useTranslation(); // Initialize translation hook

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage); // Change the language
    };


    // Handle clicking on the title (navigates to homepage)
    const handleClick = () => {
        localStorage.getItem('token') ? navigate('/') : navigate('/login') ;
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
            <Box
                display="flex"
                // flexDirection={isMobile ? 'column' : 'row'}
                justifyContent='center'
                alignItems="center"
                padding={isMobile ? '10px 5px' : '10px'}
                // bgcolor="#f5f5f5"
                borderBottom="1px solid #ddd"
            >
                {/* Empty Box to push the title to the center */}
                <Box flex={1}>
                    <Select
                        value={i18n.language} // Current language
                        onChange={handleLanguageChange}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"} 
                        sx={{
                            '& .MuiSelect-select': {
                              padding: '5px 10px', // Adjust padding here
                            },
                          }}                       
                    >
                        <MenuItem value="en">EN</MenuItem>
                        <MenuItem value="fr">FR</MenuItem>
                        <MenuItem value="telugu">Telugu</MenuItem>
                    </Select>
                </Box>
                {/* Clicking the title navigates to the homepage */}
                <Box 
                    onClick={handleClick}
                    sx={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        marginBottom: isMobile ? '10px' : '0',
                    }}
                >
                    <Typography variant={isMobile ? 'h5' : 'h4'} style={{ fontWeight: 'bold' }}>
                        crypto<span style={{ color: 'red' }}>Note</span>
                    </Typography>
                    <Typography
                        variant={isMobile ? 'body2' : 'body1'}
                        color="gray"
                        style={{ fontSize: isMobile ? '0.8rem' : 'inherit' }}
                    >
                        A place to share your note securely
                    </Typography>
                </Box>

                {/* Logout Button (conditionally displayed if the token is in localStorage) */}
                <Box flex={1} display="flex" justifyContent="flex-end">
                    {localStorage.getItem('token') && (                    
                        <Button
                            variant="contained"
                            // size='small'
                            color="error"
                            onClick={handleLogout}
                            sx={{ fontSize: isMobile ? '0.6rem' : 'inherit', minWidth:0, height: {xs:"20px", md:"35px"}, width: {xs:"10px", md:"100px"} }}
                        >
                            <LogoutIcon fontSize="small"/> {!isMobile ? "Logout":""}
                        </Button>                    
                    )}
                </Box>
            </Box>
        </header>
    );
}

export default Header;
