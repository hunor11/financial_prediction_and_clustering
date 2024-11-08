// src/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/", // Replace with your Django server URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
