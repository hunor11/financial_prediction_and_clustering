// src/components/StockDetail.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CircularProgress } from '@mui/material';
import { useStockDetails } from '../hooks/useStockDetails';

const StockDetail = ({ open, onClose, symbol }) => {
  const { data: stock, error, isLoading } = useStockDetails(symbol);

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
              <Typography variant="h6">{stock.name} ({stock.symbol})</Typography>
              <Typography variant="body1">Sector: {stock.sector}</Typography>
              <Typography variant="body1">Industry: {stock.industry}</Typography>
              <Typography variant="body1">Market Cap: {stock.market_cap}</Typography>
              <Typography variant="body1">Current Price: {stock.current_price}</Typography>
              <Typography variant="body1">P/E Ratio: {stock.pe_ratio}</Typography>
              <Typography variant="body1">Dividend Yield: {stock.dividend_yield}</Typography>
              <Typography variant="body1">EPS: {stock.eps}</Typography>
              <Typography variant="body1">CEO: {stock.ceo}</Typography>
              <Typography variant="body1">Headquarters: {stock.headquarters}</Typography>
              <Typography variant="body1">Founded: {stock.founded}</Typography>
              <Typography variant="body1">Description: {stock.description}</Typography>
            </div>
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StockDetail;