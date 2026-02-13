import React from 'react';
import { Network } from 'lucide-react';

const CorrelationHeatmap = () => {
    // Demo data
    const correlations = [
        { symbol: 'TCS', tcs: 1, infy: 0.85, rel: 0.4 },
        { symbol: 'INFY', tcs: 0.85, infy: 1, rel: 0.35 },
        { symbol: 'RELIANCE', tcs: 0.4, rel: 0.35, infy: 1 },
    ];

    return (
        <div className="card h-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-50 rounded-lg">
                        <Network className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Market Correlations</h3>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-4 py-3 font-semibold">Symbol</th>
                            <th className="px-4 py-3 font-semibold text-center">TCS</th>
                            <th className="px-4 py-3 font-semibold text-center">INFY</th>
                            <th className="px-4 py-3 font-semibold text-center">REL</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {correlations.map((row) => (
                            <tr key={row.symbol} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-4 py-3 font-bold text-slate-700">{row.symbol}</td>
                                <td className="px-4 py-3 text-center">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${row.tcs === 1 ? 'bg-slate-100 text-slate-400' :
                                            row.tcs > 0.7 ? 'bg-green-100 text-green-700' : 'text-slate-600'
                                        }`}>
                                        {row.tcs}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${row.infy === 1 ? 'bg-slate-100 text-slate-400' :
                                            row.infy > 0.7 ? 'bg-green-100 text-green-700' : 'text-slate-600'
                                        }`}>
                                        {row.infy}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${row.rel === 1 ? 'bg-slate-100 text-slate-400' :
                                            row.rel > 0.7 ? 'bg-green-100 text-green-700' : 'text-slate-600'
                                        }`}>
                                        {row.rel}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                Correlation values indicate the strength of relationship between stock price movements. High correlation ({'>'}0.7) implies stocks move together.
            </p>
        </div>
    );
};

export default CorrelationHeatmap;
