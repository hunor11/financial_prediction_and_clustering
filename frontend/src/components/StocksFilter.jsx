// src/components/StocksFilter.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Slider, Typography } from "@mui/material";
import { borders } from "@mui/system";

const StocksFilter = ({
  filters,
  setFilters,
  applyFilters,
  baseCurrency,
  setBaseCurrency,
  maxPrice,
}) => {
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
        height: "80%",
        width: "80%",
      }}
    >
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
      <Box>
        <Button
          sx={{
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            borderRight: "0px",
          }}
          variant={baseCurrency === "USD" ? "contained" : "outlined"}
          onClick={() => setBaseCurrency("USD")}
        >
          USD
        </Button>
        <Button
          sx={{
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "0px",
            borderTopLeftRadius: "0px",
          }}
          variant={baseCurrency === "EUR" ? "contained" : "outlined"}
          onClick={() => setBaseCurrency("EUR")}
        >
          EUR
        </Button>
        <Button
          sx={{
            borderBottomLeftRadius: "0px",
            borderTopLeftRadius: "0px",
            borderLeft: "0px",
          }}
          variant={baseCurrency === "HUF" ? "contained" : "outlined"}
          onClick={() => setBaseCurrency("HUF")}
        >
          HUF
        </Button>
      </Box>
      <Typography gutterBottom marginTop={"10px"}>
        Price Range:{" "}
      </Typography>
      <Slider
        value={filters.price}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={maxPrice}
        step={10}
        sx={{ width: "95%" }}
      />
    </Box>
  );
};

export default StocksFilter;
