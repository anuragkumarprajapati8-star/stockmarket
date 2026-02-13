import React, { useState } from 'react';
import { DollarSign, Briefcase, TrendingUp, BarChart3, PieChart, ChevronDown, ChevronUp } from 'lucide-react';

import Tilt from 'react-parallax-tilt';

const MetricCard = ({ label, value, icon: Icon, subtext, isLoading }) => (
    <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        perspective={1000}
        scale={1.02}
        transitionSpeed={1000}
        className="h-full"
    >
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-slate-900/10 hover:shadow-xl transition-all h-full transform-style-3d">
            <div className="flex items-start justify-between">
                <div className="w-full">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 translate-z-10">{label}</p>
                    {isLoading ? (
                        <Skeleton className="h-8 w-24 mb-1" />
                    ) : (
                        <p className="text-xl font-bold text-slate-800 dark:text-white translate-z-20">{value}</p>
                    )}
                    {isLoading ? (
                        <Skeleton className="h-3 w-16 mt-1" />
                    ) : (
                        subtext && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 translate-z-10">{subtext}</p>
                    )}
                </div>
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg translate-z-30 shadow-lg shadow-blue-500/10">
                    <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
            </div>
        </div>
    </Tilt>
);

const StockOverview = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!data) return null;

    // Determine currency symbol based on stock suffix
    const getCurrency = (symbol) => {
        if (symbol.endsWith('.NS') || symbol.endsWith('.BO')) return '₹';
        return '$';
    };

    const currency = getCurrency(data.symbol);

    return (
        <div className="mb-8 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 px-2">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-bold text-slate-900">{data.symbol}</h2>
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">{data.sector}</span>
                    </div>
                    <p className="text-slate-500 font-medium">{data.name}</p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                    <div className="flex items-baseline justify-end gap-1">
                        <span className="text-lg text-slate-400 font-medium">{currency}</span>
                        <span className="text-4xl font-bold text-slate-900">{data.previousClose?.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Previous Close</p>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <MetricCard
                    label="Market Cap"
                    value={data.marketCap ? (data.marketCap / 1e9).toFixed(2) + 'B' : 'N/A'}
                    icon={PieChart}
                />
                <MetricCard
                    label="P/E Ratio"
                    value={data.peRatio ? data.peRatio.toFixed(2) : 'N/A'}
                    icon={BarChart3}
                />
                <MetricCard
                    label="Dividend Yield"
                    value={data.dividendYield ? (data.dividendYield * 100).toFixed(2) + '%' : 'N/A'}
                    icon={DollarSign}
                />
                <MetricCard
                    label="Volume"
                    value={data.volume ? (data.volume / 1e6).toFixed(2) + 'M' : 'N/A'}
                    icon={TrendingUp}
                />
            </div>

            {/* Company Description (Collapsible) */}
            <div className="card bg-slate-50 border-none transition-all duration-300 ease-in-out">
                <div
                    className="flex items-center gap-2 mb-2 cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <Briefcase className="h-4 w-4 text-slate-500" />
                    <h3 className="font-semibold text-slate-700">Company Profile</h3>
                </div>

                <div className={`relative overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-16 opacity-80'}`}>
                    <p className="text-slate-600 leading-relaxed text-sm">
                        {data.description}
                    </p>
                    {!isExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>
                    )}
                </div>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-3 text-blue-600 text-xs font-bold uppercase tracking-wider hover:text-blue-700 flex items-center gap-1 transition-colors"
                >
                    {isExpanded ? (
                        <>Show Less <ChevronUp className="h-3 w-3" /></>
                    ) : (
                        <>Read More <ChevronDown className="h-3 w-3" /></>
                    )}
                </button>
            </div>
        </div>
    );
};

export default StockOverview;
