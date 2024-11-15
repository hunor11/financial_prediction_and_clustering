import { useQuery } from 'react-query';
import axiosInstance from '../axiosInstance';

const fetchCurrencyRates = async (baseCurrency) => {
  const { data } = await axiosInstance.get(`currencies/symbol/${baseCurrency}/`);
  return data;
};

export const useCurrencies = (baseCurrency) => {
  return useQuery(['currencyRates', baseCurrency], () => fetchCurrencyRates(baseCurrency), {
    enabled: !!baseCurrency, // Only fetch if baseCurrency is not null
  });
};