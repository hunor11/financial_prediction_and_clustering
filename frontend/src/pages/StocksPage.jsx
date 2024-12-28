// src/pages/StocksPage.jsx
import React, { useState } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
    industry: "",
    price: [0, 1000],
  });
  const [selectedStock, setSelectedStock] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const baseCurrency = "USD";

  const {
    data: cdata,
    error: cerror,
    isLoading: cisLoading,
  } = useCurrencies(baseCurrency);

  const columnWidths = {
    symbol: "15%",
    name: "40%",
    sector: "25%",
    current_price: "20%",
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading stocks</div>;

  if (cisLoading) return <div>Loading currencies...</div>;
  if (cerror) return <div>Currency error...</div>;

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

  const convertPrice = (price, tcurrency, cdata) => {
    // if (!currencyRates || !currencyRates.length) return price;

    // console.log(baseCurrency, selectedCurrency)
    if (baseCurrency === selectedCurrency) {
      console.log("they match");
      return price;
    }

    let changed = 0;

    cdata.map((rate) => {
      if (rate.target_currency == tcurrency) {
        console.log(
          rate.target_currency,
          tcurrency + " sakkor " + rate.rate + " " + price * rate.rate
        );
        changed = (price * rate.rate).toFixed(2);
      }
    });

    return changed;
  };

  const filteredData = data.filter((stock) => {
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
        <Box
          width="20%"
          height={"90%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <StocksFilter
            filters={filters}
            setFilters={setFilters}
            applyFilters={applyFilters}
          />
          <Box>
            <hr width={"100%"} />
            <FormControl fullWidth margin="normal">
              <Select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
              >
                <MenuItem value="USD">Display price in: USD</MenuItem>
                <MenuItem value="EUR">Display price in: EUR</MenuItem>
                <MenuItem value="HUF">Display price in: HUF</MenuItem>
                <MenuItem value="RON">Display price in: RON</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
                      Current Price ({selectedCurrency})
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
                        {convertPrice(
                          stock.current_price,
                          selectedCurrency,
                          cdata
                        )}{" "}
                        {selectedCurrency}
                        {/* {stock.current_price}$ */}
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
