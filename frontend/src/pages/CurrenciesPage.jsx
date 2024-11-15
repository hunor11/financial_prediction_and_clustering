// src/pages/CurrenciesPage.jsx
import React, { useState } from 'react';
import { useCurrencies } from '../hooks/useCurrencies';
import { Box, Card, CardContent, Typography, Select, MenuItem, Button } from '@mui/material';
import BaseBox from '../components/BaseBox';

const CurrenciesPage = () => {
  const [baseCurrency, setBaseCurrency] = useState('');
  const { data, error, isLoading } = useCurrencies(baseCurrency);

  const handleFetchRates = () => {
    // Trigger the hook to fetch rates for the specified base currency
    setBaseCurrency(baseCurrency);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading currency rates</div>;
  const lastUpdated = data && data.length > 0 ? data[0].last_updated : 'N/A';

  return (
    <BaseBox>
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent={'space-around'} 
        width="100%"
        height={'100%'}
      >
        <Select
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          displayEmpty
          margin="normal"
        >
          <MenuItem value="" disabled>Select Base Currency</MenuItem>
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="HUF">HUF</MenuItem>
          <MenuItem value="RON">RON</MenuItem>
        </Select>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error loading currency rates</div>}
        {data && (
          <Box display="flex" justifyContent="space-around" alignItems="center" width="80%" mt={2}>
            {data.map((rate) => (
              <Box width="20%" key={`${rate.base_currency}-${rate.target_currency}`}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {rate.base_currency} to {rate.target_currency}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rate: {rate.rate}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        )}
        <Typography variant="body2" color="textSecondary" align="right" sx={{ width: '80%' }}>
          Last updated: {lastUpdated}
        </Typography>
      </Box>
    </BaseBox>
  );
};

export default CurrenciesPage;