import { useQuery } from 'react-query';
import axiosInstance from '../axiosInstance';

const fetchStockPrediction = async (symbol, duration) => {
    const { data } = await axiosInstance.get(`stocks/predict/`, {
        params: { symbol, duration },
    });
    return data;
};

export const useStockPrediction = (symbol, duration) => {
    return useQuery(
        ['stockPrediction', symbol, duration],
        () => fetchStockPrediction(symbol, duration),
        {
            enabled: !!symbol && !!duration, // Fetch only if symbol and duration are provided
        }
    );
};
