import React, { useState } from 'react';
import BaseBox from '../components/BaseBox';
import PredictionForm from '../components/PredictionForm';
import PredictionResult from '../components/PredictionResult';
import { useStockPrediction } from '../hooks/useStockPrediction';
import { Box, Typography } from '@mui/material';

const PredictionPage = () => {
    const [formData, setFormData] = useState(null);
    const { data, error, isLoading } = useStockPrediction(
        formData?.symbol,
        formData?.duration
    );

    const handleFormSubmit = (formValues) => {
        setFormData(formValues);
    };

    return (
        <BaseBox>
            <Box>
                <Typography variant="h4" mb={3}>
                    Stock Prediction
                </Typography>
                <PredictionForm onSubmit={handleFormSubmit} />
                {isLoading && <Typography>Loading prediction...</Typography>}
                {error && <Typography color="error">Error loading prediction</Typography>}
                <PredictionResult data={data} />
            </Box>
        </BaseBox>
    );
};

export default PredictionPage;
