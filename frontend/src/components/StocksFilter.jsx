// src/components/StocksFilter.jsx
import React from 'react';
import { Box, TextField, Button, Slider, Typography } from '@mui/material';

const StocksFilter = ({ filters, setFilters, applyFilters }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePriceChange = (event, newValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: newValue,
    }));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <TextField
        label="Symbol"
        name="symbol"
        value={filters.symbol}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Name"
        name="name"
        value={filters.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Sector"
        name="sector"
        value={filters.sector}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Industry"
        name="industry"
        value={filters.industry}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Typography gutterBottom>Price Range</Typography>
      <Slider
        value={filters.price}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
        step={10}
      />
      <Button variant="contained" color="primary" onClick={applyFilters} fullWidth>
        Apply Filters
      </Button>
    </Box>
  );
};

export default StocksFilter;