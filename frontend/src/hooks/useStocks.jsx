// src/useStocks.js
import { useQuery } from 'react-query';
import axiosInstance from '../axiosInstance';

const fetchStocks = async () => {
  const { data } = await axiosInstance.get('stocks/');
  return data;
};

export const useStocks = () => {
  return useQuery('stocks', fetchStocks);
};