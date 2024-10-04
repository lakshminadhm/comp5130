import React from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate('/');
    }
    return (
        <header>
            <div onClick={handleClick}>
            <Typography variant="h4" align="center" style={{ fontWeight: 'bold' }}>
                priv<span style={{ color: 'red' }}>note</span>
            </Typography>
            <Typography variant="body2" align="center" color='gray'>privnote.com</Typography>
            </div>
        </header>

    );
}

export default Header;
