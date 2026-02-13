import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 20000, // 20 seconds
});

export const getStockOverview = async (symbol) => {
    try {
        const response = await api.get(`/stock/overview?symbol=${symbol}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching stock overview:", error);
        throw error;
    }
};

export const getStockHistory = async (symbol) => {
    try {
        const response = await api.get(`/stock/history?symbol=${symbol}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching stock history:", error);
        throw error;
    }
};

export const predictLinear = async (symbol) => {
    const response = await api.get(`/predict/linear?symbol=${symbol}`);
    return response.data;
};

export const predictArima = async (symbol) => {
    const response = await api.get(`/predict/arima?symbol=${symbol}`);
    return response.data;
};

export const predictKnn = async (symbol, k = 5) => {
    const response = await api.get(`/predict/knn?symbol=${symbol}&k=${k}`);
    return response.data;
};

export const predictSvm = async (symbol) => {
    const response = await api.get(`/predict/svm?symbol=${symbol}`);
    return response.data;
};

export const predictCorrelation = async (symbol) => {
    const response = await api.get(`/predict/correlation?symbol=${symbol}`);
    return response.data;
};
