// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./pages/HomePage";
import StocksPage from "./pages/StocksPage";
import CurrenciesPage from "./pages/CurrenciesPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Import the Footer component
import "./App.css";
import { Box } from "@mui/material";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Box flexGrow={1}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/stocks" element={<StocksPage />} />
              <Route path="/currencies" element={<CurrenciesPage />} />
            </Routes>
          </Box>
          <Footer /> {/* Add the Footer component */}
        </Box>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
