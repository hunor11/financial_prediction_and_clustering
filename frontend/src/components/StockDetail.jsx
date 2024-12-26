// src/components/StockDetail.jsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useStockDetails } from "../hooks/useStockDetails";
import Plot from "react-plotly.js"; // Import Plotly component

const StockDetail = ({ open, onClose, symbol }) => {
  const { data: stock, error, isLoading } = useStockDetails(symbol);
  const [forecast, setForecast] = useState(null);
  const [forecastError, setForecastError] = useState(null);

  // Format the historical prices data for Plotly
  const formatHistoricalPrices = (prices) => {
    const dates = prices.map((price) => price.date);
    const closePrices = prices.map((price) => price.close);
    return { dates, closePrices };
  };

  const renderChart = (historicalPrices) => {
    const { dates, closePrices } = formatHistoricalPrices(historicalPrices);

    // Extend dates and prices for forecast
    const forecastDates = [];
    const forecastPrices = [];
    forecastDates.push(dates[0]);
    forecastPrices.push(closePrices[0]);
    if (forecast) {
      for (let i = 1; i <= 10; i++) {
        // forecastDates.push(`Day ${dates.length + i}`);
        // make forecast dates into the same format as historical dates
        const date = new Date(dates[0]);
        date.setDate(date.getDate() + i);
        forecastDates.push(date.toISOString().split("T")[0]);
        forecastPrices.push(forecast[i - 1]);
      }
    }

    return (
      <Plot
        data={[
          {
            type: "scatter",
            mode: "lines", // Only line, no markers
            x: dates.slice(), // Historical dates
            y: closePrices.slice(), // Historical prices
            marker: { color: "blue" },
            name: "Historical Prices",
          },
          {
            type: "scatter",
            mode: "lines", // Only line, no markers
            x: forecastDates, // Forecast dates
            y: forecastPrices, // Forecast prices
            marker: { color: "red" },
            name: "Forecast",
          },
        ]}
        layout={{
          title: "Historical Prices & Forecast: " + symbol,
          xaxis: { title: "Date" },
          yaxis: { title: "Close Price (USD)" },
        }}
        style={{ width: "100%", height: "400px" }}
      />
    );
  };

  useEffect(() => {
    if (
      stock &&
      stock.historical_prices &&
      stock.historical_prices.length >= 60
    ) {
      const last60Days = stock.historical_prices
        .slice(0, 60)
        .map((price) => price.close);
      last60Days.reverse();

      console.log(last60Days);
      //   console.log(stock.historical_prices.map((price) => price.close));

      fetch("http://localhost:5001/forecast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prices: last60Days }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.forecast) {
            setForecast(data.forecast);
            setForecastError(null);
          } else {
            setForecastError("Error fetching forecast");
          }
        })
        .catch(() => setForecastError("Error fetching forecast"));
    }
  }, [stock]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Stock Details</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">Error loading stock details</Typography>
        ) : (
          stock && (
            <div>
              <Typography variant="h6">
                {stock.name} ({stock.symbol})
              </Typography>
              <Typography variant="body1">Sector: {stock.sector}</Typography>
              <Typography variant="body1">
                Industry: {stock.industry}
              </Typography>
              <Typography variant="body1">
                Market Cap: {stock.market_cap}
              </Typography>
              <Typography variant="body1">
                Current Price: {stock.current_price}
              </Typography>
              <Typography variant="body1">
                P/E Ratio: {stock.pe_ratio}
              </Typography>
              <Typography variant="body1">
                Dividend Yield: {stock.dividend_yield}
              </Typography>
              <Typography variant="body1">EPS: {stock.eps}</Typography>
              <Typography variant="body1">CEO: {stock.ceo}</Typography>
              <Typography variant="body1">
                Headquarters: {stock.headquarters}
              </Typography>
              {/* <Typography variant="body1">Founded: {stock.founded}</Typography>
              <Typography variant="body1">
                Description: {stock.description}
              </Typography> */}
              {/* Plotly chart for historical data */}
              {stock.historical_prices && renderChart(stock.historical_prices)}
            </div>
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StockDetail;
