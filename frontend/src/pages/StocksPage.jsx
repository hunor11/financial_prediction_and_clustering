// src/pages/StocksPage.jsx
import React, { useState, useEffect } from "react";
import { useStocks } from "../hooks/useStocks";
import { useCurrencies } from "../hooks/useCurrencies";
import BaseBox from "../components/BaseBox";
import StocksFilter from "../components/StocksFilter";
import StockDetail from "../components/StockDetail";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination,
  TableSortLabel,
  Typography,
} from "@mui/material";

const StocksPage = () => {
  const { data, error, isLoading } = useStocks();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("symbol");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    symbol: "",
    name: "",
    sector: "",
    price: [0, 1000],
  });
  const [selectedStock, setSelectedStock] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [rates, setRates] = useState({
    HUF: 1,
    RON: 1,
    EUR: 1,
    USD: 1,
  });
  const [maxPrice, setMaxPrice] = useState(1000);
  const {
    data: currency,
    error: currencyError,
    isLoading: currencyLoading,
  } = useCurrencies("USD");
  const [updatedData, setUpdatedData] = useState([]);

  useEffect(() => {
    if (currency) {
      console.log(currency);
      const newRates = {
        HUF: currency.find((rate) => rate.target_currency === "HUF").rate,
        RON: currency.find((rate) => rate.target_currency === "RON").rate,
        EUR: currency.find((rate) => rate.target_currency === "EUR").rate,
        USD: 1,
      };
      console.log(newRates);
      setRates(newRates);
    }
  }, [currency]);

  useEffect(() => {
    if (data) {
      const newData = data.map((stock) => ({
        ...stock,
        current_price: (stock.current_price * rates[baseCurrency]).toFixed(2),
      }));
      setUpdatedData(newData);
      setMaxPrice(
        newData.reduce(
          (max, stock) => Math.max(max, parseFloat(stock.current_price)),
          0
        )
      );
    }
  }, [data, rates, baseCurrency]);

  const columnWidths = {
    symbol: "15%",
    name: "40%",
    sector: "25%",
    current_price: "20%",
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading stocks</div>;

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
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

  const handleRowClick = (symbol) => {
    setSelectedStock(symbol);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedStock(null);
  };

  const filteredData = updatedData.filter((stock) => {
    return (
      (filters.symbol === "" ||
        stock.symbol.toLowerCase().includes(filters.symbol.toLowerCase())) &&
      (filters.name === "" ||
        stock.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.sector === "" ||
        stock.sector.toLowerCase().includes(filters.sector.toLowerCase())) &&
      stock.current_price >= filters.price[0] &&
      stock.current_price <= filters.price[1]
    );
  });

  const sortedData = filteredData.slice().sort((a, b) => {
    if (orderBy === "current_price") {
      return order === "asc"
        ? a[orderBy] - b[orderBy]
        : b[orderBy] - a[orderBy];
    } else {
      return order === "asc"
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    }
  });

  const lastUpdated = data.length > 0 ? data[0].last_updated : "N/A";

  return (
    <BaseBox>
      <Box display="flex" width="90%" justifyContent={"space-evenly"}>
        <Box width="20%">
          <StocksFilter
            filters={filters}
            setFilters={setFilters}
            applyFilters={applyFilters}
            baseCurrency={baseCurrency}
            setBaseCurrency={setBaseCurrency}
            maxPrice={maxPrice}
          />
        </Box>
        <Box width="70%">
          <Typography variant="body2" color="textSecondary" align="right">
            Last updated: {lastUpdated}
          </Typography>
          <TableContainer component={Paper} style={{ maxHeight: 900 }}>
            <Table sx={{ tableLayout: "fixed" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#f5f5f5",
                      width: columnWidths.symbol,
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === "symbol"}
                      direction={orderBy === "symbol" ? order : "asc"}
                      onClick={() => handleRequestSort("symbol")}
                    >
                      Symbol
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#f5f5f5",
                      width: columnWidths.name,
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === "name"}
                      direction={orderBy === "name" ? order : "asc"}
                      onClick={() => handleRequestSort("name")}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#f5f5f5",
                      width: columnWidths.sector,
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === "sector"}
                      direction={orderBy === "sector" ? order : "asc"}
                      onClick={() => handleRequestSort("sector")}
                    >
                      Sector
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#f5f5f5",
                      width: columnWidths.current_price,
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === "current_price"}
                      direction={orderBy === "current_price" ? order : "asc"}
                      onClick={() => handleRequestSort("current_price")}
                    >
                      Current Price
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((stock) => (
                    <TableRow
                      key={stock.symbol}
                      onClick={() => handleRowClick(stock.symbol)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell sx={{ width: columnWidths.symbol }}>
                        {stock.symbol}
                      </TableCell>
                      <TableCell sx={{ width: columnWidths.name }}>
                        {stock.name}
                      </TableCell>
                      <TableCell sx={{ width: columnWidths.sector }}>
                        {stock.sector}
                      </TableCell>
                      <TableCell sx={{ width: columnWidths.current_price }}>
                        {stock.current_price}
                      </TableCell>
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
      <StockDetail
        open={dialogOpen}
        onClose={handleCloseDialog}
        symbol={selectedStock}
      />
    </BaseBox>
  );
};

export default StocksPage;
