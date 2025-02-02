// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

// PAGES
import HomePage from "./pages/HomePage";
import StocksPage from "./pages/StocksPage";
import CurrenciesPage from "./pages/CurrenciesPage";
import NewsPage from "./pages/NewsPage";
import ClusteringPage from "./pages/ClusteringPage";
import PredictionsPage from "./pages/PredictionsPage";

// COMPONENTS
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Box } from "@mui/material";


import "./App.css";

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

              {/* <Route path="/currencies" element={<CurrenciesPage />} /> */}

              <Route path="/news" element={<NewsPage />} />
              <Route path="/clustering" element={<ClusteringPage />} />
              <Route path="/predictions" element={<PredictionsPage />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
