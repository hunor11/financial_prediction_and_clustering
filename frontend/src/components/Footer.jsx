// src/components/Footer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Authors: Ács Hunor, Magyari-Sáska Attila
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Babes-Bolyai University, Faculty of Mathematics and Informatics
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Data Science in Industry and Society
      </Typography>
    </Box>
  );
};

export default Footer;