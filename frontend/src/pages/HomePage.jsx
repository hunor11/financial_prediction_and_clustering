// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/stocks');
  };

  return (
    <div>
      <h1>Welcome to the Stock Information App</h1>
      <Button variant="contained" color="primary" onClick={handleNavigate}>
        Go to Stocks Page
      </Button>
    </div>
  );
};

export default HomePage;