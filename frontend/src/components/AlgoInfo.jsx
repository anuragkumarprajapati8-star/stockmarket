import React from 'react';
import { TrendingUp, Clock, Network, GitGraph, Activity } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const AlgoInfo = () => {
    const algorithms = [
        {
            name: 'Linear Regression',
            icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
            description: 'A fundamental statistical method that models the relationship between a dependent variable (stock price) and one or more independent variables (time, past prices). It assumes a linear trend, making it useful for identifying the general direction of the market.'
        },
        {
            name: 'ARIMA (AutoRegressive Integrated Moving Average)',
            icon: <Clock className="w-8 h-8 text-green-500" />,
            description: 'A popular time-series forecasting model that captures temporal structures in data. It uses past values (AutoRegressive), differencing to make data stationary (Integrated), and past forecast errors (Moving Average) to predict future prices.'
        },
        {
            name: 'KNN (K-Nearest Neighbors)',
            icon: <Network className="w-8 h-8 text-purple-500" />,
            description: 'A non-parametric algorithm that predicts the stock price based on the average of the \'k\' most similar historical data points. It assumes that similar market conditions in the past will lead to similar future outcomes.'
        },
        {
            name: 'SVM (Support Vector Machine)',
            icon: <GitGraph className="w-8 h-8 text-orange-500" />,
            description: 'A powerful machine learning model that finds the optimal hyperplane to separate data in a high-dimensional space. In regression (SVR), it attempts to fit the best line within a threshold of error, effectively handling non-linear trends.'
        },
        {
            name: 'Correlation Analysis',
            icon: <Activity className="w-8 h-8 text-red-500" />,
            description: 'This method calculates the statistical relationship between the current price movement and historical lagging periods. It helps identify cyclical patterns and how strongly past price changes influence current trends.'
        }
    ];

    return (
        <div className="mt-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 text-center">
                Why These Algorithms?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {algorithms.map((algo, index) => (
                    <Tilt key={index} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} className="h-full">
                        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all h-full flex flex-col">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                                    {algo.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                                    {algo.name}
                                </h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed flex-grow">
                                {algo.description}
                            </p>
                        </div>
                    </Tilt>
                ))}
            </div>
        </div>
    );
};

export default AlgoInfo;
