// src/pages/StocksPage.jsx
import React, { useState } from 'react';
import { useStocks } from '../hooks/useStocks';
import BaseBox from '../components/BaseBox';
import StocksFilter from '../components/StocksFilter';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TablePagination, TableSortLabel, Typography } from '@mui/material';

const StocksPage = () => {
  const { data, error, isLoading } = useStocks();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('symbol');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({ symbol: '', name: '', sector: '', industry: '', price: [0, 1000] });

  const columnWidths = {
    symbol: '10%',
    name: '30%',
    sector: '20%',
    industry: '30%',
    current_price: '10%',
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading stocks</div>;

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const applyFilters = () => {
    setPage(0);
  };

  const filteredData = data.filter((stock) => {
    return (
      (filters.symbol === '' || stock.symbol.toLowerCase().includes(filters.symbol.toLowerCase())) &&
      (filters.name === '' || stock.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.sector === '' || stock.sector.toLowerCase().includes(filters.sector.toLowerCase())) &&
      (filters.industry === '' || stock.industry.toLowerCase().includes(filters.industry.toLowerCase())) &&
      (stock.current_price >= filters.price[0] && stock.current_price <= filters.price[1])
    );
  });

  const sortedData = filteredData.slice().sort((a, b) => {
    if (orderBy === 'current_price') {
      return order === 'asc' ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
    } else {
      return order === 'asc'
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    }
  });

  const lastUpdated = data.length > 0 ? data[0].last_updated : 'N/A';

  return (
    <BaseBox>
      <Box display="flex" width="100%" justifyContent={'space-evenly'}>
        <Box width="20%">
          <StocksFilter filters={filters} setFilters={setFilters} applyFilters={applyFilters} />
        </Box>
        <Box width="70%">
        <Typography variant="body2" color="textSecondary" align="right">
            Last updated: {lastUpdated}
        </Typography>
          <TableContainer component={Paper} style={{ maxHeight: 900 }}>
            <Table sx={{ tableLayout: 'fixed' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: columnWidths.symbol }}>
                    <TableSortLabel
                      active={orderBy === 'symbol'}
                      direction={orderBy === 'symbol' ? order : 'asc'}
                      onClick={() => handleRequestSort('symbol')}
                    >
                      Symbol
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: columnWidths.name }}>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={() => handleRequestSort('name')}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: columnWidths.sector }}>
                    <TableSortLabel
                      active={orderBy === 'sector'}
                      direction={orderBy === 'sector' ? order : 'asc'}
                      onClick={() => handleRequestSort('sector')}
                    >
                      Sector
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: columnWidths.industry }}>
                    <TableSortLabel
                      active={orderBy === 'industry'}
                      direction={orderBy === 'industry' ? order : 'asc'}
                      onClick={() => handleRequestSort('industry')}
                    >
                      Industry
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', width: columnWidths.current_price }}>
                    <TableSortLabel
                      active={orderBy === 'current_price'}
                      direction={orderBy === 'current_price' ? order : 'asc'}
                      onClick={() => handleRequestSort('current_price')}
                    >
                      Current Price
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((stock) => (
                  <TableRow key={stock.symbol}>
                    <TableCell sx={{ width: columnWidths.symbol }}>{stock.symbol}</TableCell>
                    <TableCell sx={{ width: columnWidths.name }}>{stock.name}</TableCell>
                    <TableCell sx={{ width: columnWidths.sector }}>{stock.sector}</TableCell>
                    <TableCell sx={{ width: columnWidths.industry }}>{stock.industry}</TableCell>
                    <TableCell sx={{ width: columnWidths.current_price }}>{stock.current_price}$</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </BaseBox>
  );
};

export default StocksPage;