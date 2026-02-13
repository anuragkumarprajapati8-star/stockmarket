import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const actual = payload.find(p => p.name === 'Actual')?.value;
        const predicted = payload.find(p => p.name === 'Predicted')?.value;
        const diff = actual && predicted ? ((predicted - actual) / actual * 100).toFixed(2) : null;
        const isPositive = diff > 0;

        return (
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-lg ring-1 ring-slate-900/5">
                <p className="text-xs font-semibold text-slate-500 mb-2 border-b border-slate-100 pb-2">{label}</p>

                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-3 mb-1 min-w-[120px]">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.stroke }}></div>
                        <span className="text-xs font-medium text-slate-600 flex-1">{entry.name}:</span>
                        <span className="text-sm font-bold text-slate-900">{typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}</span>
                    </div>
                ))}

                {diff && (
                    <div className={`mt-2 text-xs font-bold px-2 py-1 rounded flex items-center justify-center ${isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        Diff: {diff > 0 ? '+' : ''}{diff}%
                    </div>
                )}
            </div>
        );
    }
    return null;
};

const PredictionChart = ({ data, modelName }) => {
    if (!data || !data.predictions || !data.actual) return null;

    // Combine actual and predicted data into a format Recharts understands
    const chartData = data.actual.map((val, index) => ({
        date: data.dates[index],
        Actual: val,
        Predicted: data.predictions[index]
    }));

    return (

        <div className="h-[450px] w-full mt-6 bg-white/50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 p-6 shadow-sm dark:shadow-[0_0_30px_-10px_rgba(157,78,221,0.2)] backdrop-blur-sm relative overflow-hidden group">
            {/* Decorative Grid Background for Chart */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-50"></div>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-white/5" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11, fill: '#64748B' }}
                        tickMargin={10}
                        axisLine={false}
                        tickLine={false}
                        className="dark:fill-slate-400"
                    />
                    <YAxis
                        domain={['auto', 'auto']}
                        tick={{ fontSize: 11, fill: '#64748B' }}
                        axisLine={false}
                        tickLine={false}
                        className="dark:fill-slate-400"
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '4 4' }} />
                    <Legend
                        verticalAlign="top"
                        height={36}
                        iconType="circle"
                        wrapperStyle={{ fontSize: '12px', fontWeight: 600, paddingTop: '10px' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Actual"
                        stroke="#06B6D4" /* Cyan 500 for Light Mode Fallback if needed, but styling overrides usually better */
                        className="stroke-blue-600 dark:stroke-[#06D6A0]"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6, fill: '#06D6A0', stroke: '#fff', strokeWidth: 2 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Predicted"
                        stroke="#8B5CF6"
                        className="stroke-amber-500 dark:stroke-[#9D4EDD]"
                        strokeWidth={3}
                        strokeDasharray="4 4"
                        dot={false}
                        activeDot={{ r: 6, fill: '#9D4EDD', stroke: '#fff', strokeWidth: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PredictionChart;
