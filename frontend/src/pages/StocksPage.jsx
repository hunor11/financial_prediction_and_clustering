// src/pages/StocksPage.jsx
import React, { useState } from 'react';
import { useStocks } from '../hooks/useStocks';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TablePagination } from '@mui/material';

const StocksPage = () => {
  const { data, error, isLoading } = useStocks();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading stocks</div>;

  return (
    <Box 
      className="base"
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      height={'100vh'}
    >
      <StocksTable data={data} />
    </Box>
  );
};

const StocksTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box width={'80%'}>
      <TableContainer component={Paper} style={{ maxHeight: 900 }}>
        <Table sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '5%' }}>Symbol</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '35%' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '20%' }}>Sector</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '30%' }}>Industry</TableCell>
              {/* <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '15%' }}>Market Cap</TableCell> */}
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '10%' }}>Current Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell sx={{ width: '5%' }}>{stock.symbol}</TableCell>
                <TableCell sx={{ width: '35%' }}>{stock.name}</TableCell>
                <TableCell sx={{ width: '20%' }}>{stock.sector}</TableCell>
                <TableCell sx={{ width: '30%' }}>{stock.industry}</TableCell>
                {/* <TableCell sx={{ width: '15%' }}>{stock.market_cap}</TableCell> */}
                <TableCell sx={{ width: '10%' }}>{stock.current_price}$</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default StocksPage;