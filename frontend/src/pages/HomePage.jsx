// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import BaseBox from '../components/BaseBox';
import CurrenciesPage from './CurrenciesPage';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/stocks');
  };

  return (
    <>
      <Box
        height={'30%'}
        textAlign={'center'}
      >
        <h1>Welcome to the Stock Information App</h1>
      </Box>

      <CurrenciesPage />
    </>

  );
};

export default HomePage;