import React from 'react';
import { Box, Typography } from '@mui/material';

const PredictionResult = ({ data }) => {
    if (!data) return null;

    const predictedPrices = data.predicted_prices || [];
    const firstPredictedPrice = predictedPrices.length > 0 ? predictedPrices[0] : null;

    return (
        <Box mt={3}>
            <Typography variant="h6">Prediction Results</Typography>
            <Typography>Symbol: {data.symbol}</Typography>
            {/* Check if there are predicted prices and display them */}
            {predictedPrices.length > 0 ? (
                predictedPrices.map((price, index) => (
                    <Typography key={index}>
                        Predicted Price {index + 1}: ${price.toFixed(2)}
                    </Typography>
                ))
            ) : (
                <Typography>No predictions available</Typography>
            )}
        </Box>
    );
};

export default PredictionResult;
