import React from 'react';
import { Typography } from '@mui/material';

function Header() {
    return (
        <header>
            
            <Typography variant="h4" align="center" style={{ fontWeight: 'bold' }}>
                priv<span style={{ color: 'red' }}>note</span>
            </Typography>
            <Typography variant="body2" align="center" color='gray'>privnote.com</Typography>

        </header>

    );
}

export default Header;
