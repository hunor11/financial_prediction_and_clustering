// src/hooks/useCurrencies.js
import { useQuery } from 'react-query';
import axiosInstance from '../axiosInstance';

const fetchCurrencies = async () => {
  const { data } = await axiosInstance.get('currencies/');
  return data;
};

export const useCurrencies = () => {
  return useQuery('currencyrates', fetchCurrencies);
};