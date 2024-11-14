// src/pages/CurrenciesPage.jsx
import React from 'react';
import { useCurrencies } from '../hooks/useCurrencies';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import BaseBox from '../components/BaseBox';

const CurrenciesPage = () => {
  const { data, error, isLoading } = useCurrencies();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading currency rates</div>;

  return (
    <BaseBox>
      <Box 
        display={'flex'}
        justifyContent={'space-around'}
        alignItems={'center'}
        width={'80%'}
      >
          {data.map((rate) => (
            <Box
              width={'20%'}
            >
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
    </BaseBox>
  );
};

export default CurrenciesPage;