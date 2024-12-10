import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loading = ({progressText}) => {
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
      <Typography marginLeft={3}>{progressText}</Typography>
    </Box>
  );
};

export default Loading;
