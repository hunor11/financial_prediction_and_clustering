import React, { useState, useEffect } from "react";
import BaseBox from "../components/BaseBox";
import Plotly from "react-plotly.js";
import { useStocks } from "../hooks/useStocks";
import { Slider, Typography, Box } from "@mui/material";
import { kMeansCluster, quantile } from "simple-statistics";

const ClusteringPage = () => {
  const { data, error, isLoading } = useStocks();
  const [clusters, setClusters] = useState([]);
  const [clusterLabels, setClusterLabels] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Store valid stocks
  const [K, setK] = useState(3);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Helper function to normalize a single feature
    const normalize = (values) => {
      const min = Math.min(...values);
      const max = Math.max(...values);
      return values.map((v) => (v - min) / (max - min));
    };

    const validStocks = [];
    const stocks = data
      .map((stock, index) => {
        const values = [stock.pe_ratio, stock.dividend_yield, stock.eps];
        if (values.every((value) => typeof value === "number")) {
          validStocks.push(index); // Save valid indices
          return values;
        }
        return null;
      })
      .filter((stock) => stock != null);

    setFilteredData(validStocks.map((i) => data[i])); // Save valid stock data

    if (stocks.length < 2) {
      console.error("Not enough data for clustering");
      return;
    }

    // Transpose the array to normalize each feature separately
    const transposed = stocks[0].map((_, colIndex) =>
      stocks.map((row) => row[colIndex])
    );
    const normalizedFeatures = transposed.map((feature) => normalize(feature));

    // Transpose back to original structure
    const normalizedStocks = normalizedFeatures[0].map((_, rowIndex) =>
      normalizedFeatures.map((col) => col[rowIndex])
    );

    // Perform clustering
    const k = Math.min(K, normalizedStocks.length); // Number of clusters
    try {
      const kmeansResult = kMeansCluster(normalizedStocks, k);
      setClusterLabels(kmeansResult); // Save cluster labels
    } catch (error) {
      console.error("Clustering error:", error);
    }
  }, [data, K]);

  const handleKChange = (event, newValue) => {
    setK(newValue);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading stocks</div>;

  const plotData = [
    {
      x: filteredData.map((stock) => stock.pe_ratio),
      y: filteredData.map((stock) => stock.dividend_yield),
      z: filteredData.map((stock) => stock.eps), // Adding EPS for the z-axis
      mode: "markers",
      type: "scatter3d", // Use scatter3d for a 3D plot
      marker: {
        color: clusterLabels.labels || [],
        size: 10,
        colorscale: "Viridis", // Color scale for the clusters
        opacity: 0.8,
      },
      text: filteredData.map((stock) => stock.name), // Stock names for hover
    },
  ];

  const layout = {
    title: "Stock Clusters in 3D",
    width: 1200, // Set the width of the Plotly chart
    height: 600, // Set the height of the Plotly chart
    scene: {
      xaxis: { title: "P/E Ratio" },
      yaxis: { title: "Dividend Yield" },
      zaxis: { title: "EPS" }, // Label for the z-axis
    },
  };

  return (
    <BaseBox height={"100%"}>
      <Box sx={{ width: 300, margin: "auto", padding: 2 }}>
        <Typography gutterBottom>Number of Clusters (k)</Typography>
        <Slider
          value={K}
          onChange={handleKChange}
          aria-labelledby="k-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />
      </Box>
      <Plotly data={plotData} layout={layout} />
    </BaseBox>
  );
};

export default ClusteringPage;
