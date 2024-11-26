import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button, Box, Pagination } from '@mui/material';
import useNews from '../hooks/useNews';

const FinancialNewsPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useNews('finance', page); // Fetch the news data

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (isLoading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5">Loading news...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5" color="error">
          Error: {error.message}
        </Typography>
      </Box>
    );
  }

  const filteredArticles = data.articles.filter(article => article.title !== '[Removed]');
  data.articles = filteredArticles;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Today's Financial News
      </Typography>
      <Grid container spacing={3}>
        {data.articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: 300, // Set fixed height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {article.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                  {new Date(article.publishedAt).toLocaleDateString()} - {article.source.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3, // Limit to 3 lines
                  }}
                >
                  {article.author ? `By ${article.author}` : 'Author Unknown'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={Math.ceil(data.totalResults / 10)} // Adjust the total pages based on the total results
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default FinancialNewsPage;
