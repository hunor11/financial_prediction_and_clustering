// src/hooks/useNews.js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchFinancialNews = async ({ queryKey }) => {
  const [_, query, page] = queryKey;
  const apiKey = process.env.REACT_APP_API_KEY_NEWS;
  if (!apiKey) {
    throw new Error('API key is not defined');
  }

  // Calculate the date one month ago
  const fromDate = new Date();
  fromDate.setMonth(fromDate.getMonth() - 1);
  const fromDateString = fromDate.toISOString().split('T')[0];

  const response = await axios.get('https://newsapi.org/v2/everything', {
    params: {
      q: query,
      from: fromDateString,
      sortBy: 'publishedAt',
      apiKey: apiKey,
      page: page,
      pageSize: 9, // Adjust the page size as needed
    },
  });

  return response.data;
};

const useNews = (query = 'finance', page = 1) => {
  return useQuery(['financialNews', query, page], fetchFinancialNews, {
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export default useNews;