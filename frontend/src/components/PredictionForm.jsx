import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';

const PredictionForm = ({ onSubmit }) => {
    const [symbol, setSymbol] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ symbol, duration });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} alignItems="center">
            <TextField
                label="Stock Symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                required
                fullWidth
            />
            <TextField
                label="Duration (Days)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                type="number"
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
                Predict
            </Button>
        </Box>
    );
};

export default PredictionForm;
