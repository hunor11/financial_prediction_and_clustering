// src/components/Footer.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: "auto",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Author: Ács Hunor
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Babes-Bolyai University, Faculty of Mathematics and Informatics Data
        Science in Industry and Society, 2024-2025
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Project for the course Data Modelling
      </Typography>
    </Box>
  );
};

export default Footer;
