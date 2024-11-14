// src/hooks/useStockDetails.js
import { useQuery } from 'react-query';
import axiosInstance from '../axiosInstance';

const fetchStockDetails = async (symbol) => {
  const { data } = await axiosInstance.get(`stocks/${symbol}/`);
  return data;
};

export const useStockDetails = (symbol) => {
  return useQuery(['stockDetails', symbol], () => fetchStockDetails(symbol), {
    enabled: !!symbol, // Only fetch if symbol is not null
  });
};