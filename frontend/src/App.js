// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./pages/HomePage";
import StocksPage from "./pages/StocksPage";
import CurrenciesPage from "./pages/CurrenciesPage";
import Navbar from "./components/Navbar";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stocks" element={<StocksPage />} />
          <Route path="/currencies" element={<CurrenciesPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
