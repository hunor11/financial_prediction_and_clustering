// src/pages/CurrenciesPage.jsx
import React from 'react';
import { useCurrencies } from '../hooks/useCurrencies';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import BaseBox from '../components/BaseBox';

const CurrenciesPage = () => {
  const { data, error, isLoading } = useCurrencies();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading currency rates</div>;
  const lastUpdated = data.length > 0 ? data[0].last_updated : 'N/A';

  return (
    <BaseBox>
      <Box 
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'90%'}
        height={'100%'}
        flexDirection={'column'}
      >
        <Box 
          width={'100%'}
          height={'80%'} 
          display={'flex'} 
          flexDirection={'row'} 
          justifyContent={'space-around'}
          alignItems={'center'}
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
          <Typography variant="body2" color="textSecondary" align="right" sx={{ width: '80%' }}>
          Last updated: {lastUpdated}
        </Typography>
      </Box>
    </BaseBox>
  );
};

export default CurrenciesPage;