import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
