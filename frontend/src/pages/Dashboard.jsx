import React, { useState } from 'react';
import StockSearch from '../components/StockSearch';
import StockOverview from '../components/StockOverview';
import ModelSelector from '../components/ModelSelector';
import PredictionChart from '../components/PredictionChart';
import EvaluationMetrics from '../components/EvaluationMetrics';
import CorrelationHeatmap from '../components/CorrelationHeatmap';
import AlgoInfo from '../components/AlgoInfo';
import { getStockOverview, predictLinear, predictArima, predictKnn, predictSvm, predictCorrelation } from '../services/api';

const Dashboard = () => {
    const [stockData, setStockData] = useState(null);
    const [predictionData, setPredictionData] = useState(null);
    const [selectedModel, setSelectedModel] = useState('linear');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentSymbol, setCurrentSymbol] = useState(null);

    const handleSearch = async (symbol) => {
        setLoading(true);
        setError(null);
        setStockData(null);
        setPredictionData(null);
        setCurrentSymbol(symbol);

        try {
            // 1. Fetch Overview
            const overview = await getStockOverview(symbol);
            setStockData(overview);

            // 2. Fetch Initial Prediction (Linear)
            await fetchPrediction(symbol, selectedModel);
        } catch (err) {
            setError("Failed to fetch data. Please check the stock symbol.");
        } finally {
            setLoading(false);
        }
    };

    const fetchPrediction = async (symbol, model) => {
        setLoading(true);
        try {
            let data;
            switch (model) {
                case 'linear': data = await predictLinear(symbol); break;
                case 'arima': data = await predictArima(symbol); break;
                case 'knn': data = await predictKnn(symbol); break;
                case 'svm': data = await predictSvm(symbol); break;
                case 'correlation': data = await predictCorrelation(symbol); break;
                default: data = await predictLinear(symbol);
            }
            setPredictionData(data);
        } catch (err) {
            console.error(err);
            setError(`Failed to run ${model} model.`);
        } finally {
            setLoading(false);
        }
    };

    const handleModelChange = (modelId) => {
        setSelectedModel(modelId);
        if (currentSymbol) {
            fetchPrediction(currentSymbol, modelId);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Stock Market Analysis</h1>

            <StockSearch onSearch={handleSearch} />

            {/* Show error if any */}
            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200 animate-fade-in">
                    {error}
                </div>
            )}

            {/* Show Loading Skeletons OR Data */}
            {(loading || stockData) && (
                <div className="animate-fade-in">
                    <StockOverview data={stockData} loading={loading} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Model Predictions</h2>

                            {/* Pass loading to selector if needed, or just keep it interactive */}
                            <ModelSelector
                                selectedModel={selectedModel}
                                onSelectModel={handleModelChange}
                            />

                            {loading && !predictionData && (
                                <div className="space-y-4">
                                    <div className="flex gap-4 mb-6">
                                        {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-100 rounded-lg flex-1 animate-pulse" />)}
                                    </div>
                                    <div className="h-[400px] bg-slate-100 rounded-xl animate-pulse" />
                                </div>
                            )}

                            {!loading && predictionData && (
                                <>
                                    <EvaluationMetrics metrics={predictionData} />
                                    <PredictionChart
                                        data={predictionData}
                                        modelName={predictionData.model}
                                    />

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                                        <h4 className="font-bold text-blue-800 mb-2">Viva Explanation Strategy</h4>
                                        <p className="text-blue-900 text-sm">
                                            "We used <strong>{predictionData.model}</strong> because
                                            {selectedModel === 'linear' && " it provides a baseline trend utilizing least squares estimation."}
                                            {selectedModel === 'arima' && " it effectively models temporal dependencies in time-series data."}
                                            {selectedModel === 'knn' && " it captures local patterns by averaging similar historical instances."}
                                            {selectedModel === 'svm' && " it finds the optimal hyperplane in high-dimensional space to capture non-linear trends."}
                                            {selectedModel === 'correlation' && " it identifies the most significant time-lag in history to predict future movements based on past cycles."}
                                            "
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="lg:col-span-1">
                            <CorrelationHeatmap />
                        </div>
                    </div>
                </div>
            )}

            <AlgoInfo />
        </div>
    );
};

export default Dashboard;
