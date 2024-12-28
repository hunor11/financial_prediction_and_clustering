// src/components/StocksFilter.jsx
import React from "react";
import { Box, TextField, Button, Slider, Typography } from "@mui/material";

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
    <Box
      sx={{
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        height: "60%",
        width: "80%",
      }}
    >
      <Box height={"30%"}>
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
      </Box>
      <Box width={"100%"}>
        <Typography marginTop={"5px"}>Price Range: </Typography>
        <Slider
          value={filters.price}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={10}
          sx={{ width: "95%" }}
        />
      </Box>
    </Box>
  );
};

export default StocksFilter;
