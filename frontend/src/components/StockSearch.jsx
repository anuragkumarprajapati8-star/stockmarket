import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, TrendingUp } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const StockSearch = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef(null);

    // Keyboard shortcut to focus search input
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (query.trim()) {
            setIsSearching(true);
            await onSearch(query.toUpperCase());
            setIsSearching(false);
        }
    };

    return (
        <Tilt
            tiltMaxAngleX={3}
            tiltMaxAngleY={3}
            perspective={1000}
            scale={1.01}
            transitionSpeed={1500}
            className="max-w-3xl mx-auto mb-10 mt-6"
        >
            <div className="card bg-white/50 dark:bg-white/5 backdrop-blur-xl border-white/20 dark:border-white/10 shadow-xl dark:shadow-[0_0_40px_-10px_rgba(6,214,160,0.1)] transition-all duration-300 transform-style-3d">
                <div className="text-center mb-8 translate-z-10">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-cyan-400 dark:to-blue-500 mb-2">Market Command Center</h2>
                    <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-cyan-100/60">
                        <p>Enter a stock ticker to initialize analysis.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex gap-4 relative translate-z-20">
                    <div className="relative flex-1 group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search Symbol (e.g., TCS.NS)..."
                            className="input-field pl-11 pr-16 text-lg focus:shadow-[0_0_20px_rgba(6,214,160,0.3)] dark:focus:shadow-[0_0_20px_rgba(6,214,160,0.2)] transition-shadow duration-300"
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded">
                                <span className="text-sm">⌘</span>K
                            </kbd>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSearching || !query}
                        className="relative overflow-hidden btn-primary min-w-[140px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 border-hidden"
                    >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                            {isSearching ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Analyzing...</span>
                                </>
                            ) : (
                                <>
                                    <TrendingUp className="h-4 w-4" />
                                    <span>Analyze</span>
                                </>
                            )}
                        </div>
                    </button>
                </form>
            </div>
        </Tilt>
    );
};

export default StockSearch;
