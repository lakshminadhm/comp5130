import React from 'react';
import { Container, Typography, Box, Button, TextField } from '@mui/material';

function NoteReady() {
  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Box 
        sx={{ 
          backgroundColor: '#f5f5f5', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' 
        }}
      >
        {/* Header */}
        <Typography variant="h4" align="center" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
          priv<span style={{ color: 'red' }}>note</span>
        </Typography>

        {/* Note link */}
        <Typography variant="h6" align="center" gutterBottom>
          Note link ready
        </Typography>
        
        <TextField
          fullWidth
          value="https://privnote.com/ZfM9ZcUW#BIXwSkSNV"
          InputProps={{
            readOnly: true,
            style: { backgroundColor: '#ffffcc', padding: '10px' }
          }}
          variant="outlined"
        />

        <Typography variant="body1" align="center" style={{ margin: '10px 0' }}>
          The note will self-destruct after reading it.
        </Typography>

        {/* Buttons */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '10px', 
            marginTop: '20px' 
          }}
        >
          <Button variant="contained" color="primary">
            Select link
          </Button>
          <Button variant="contained" color="secondary">
            E-mail link
          </Button>
        </Box>

        {/* Destroy note button */}
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Button variant="contained" color="error">
            Destroy note now
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default NoteReady;
