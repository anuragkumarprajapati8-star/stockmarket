import React from 'react';

const MetricBox = ({ label, value, subtext, colorClass }) => (
    <div className="bg-slate-50 p-4 rounded-lg flex-1 text-center border border-slate-100">
        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{label}</p>
        <p className={`text-xl font-bold ${colorClass}`}>{value}</p>
        <p className="text-[10px] text-slate-400 mt-1">{subtext}</p>
    </div>
);

const EvaluationMetrics = ({ metrics }) => {
    if (!metrics) return null;

    return (
        <div className="flex gap-4 mb-6">
            <MetricBox
                label="MSE"
                value={metrics.mse?.toFixed(4)}
                subtext="Mean Squared Error"
                colorClass="text-slate-700"
            />
            <MetricBox
                label="RMSE"
                value={metrics.rmse?.toFixed(4)}
                subtext="Root Mean Squared Error"
                colorClass="text-purple-600"
            />
            <MetricBox
                label="R² Score"
                value={metrics.r2?.toFixed(4)}
                subtext="Predictive Accuracy"
                colorClass="text-green-600"
            />
            <MetricBox
                label="Correlation"
                value={metrics.correlation ? (metrics.correlation * 100).toFixed(1) + '%' : 'N/A'}
                subtext="Directional Accuracy"
                colorClass="text-blue-600"
            />
        </div>
    );
};

export default EvaluationMetrics;
