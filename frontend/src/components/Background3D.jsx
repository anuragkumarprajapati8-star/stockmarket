import React, { useEffect, useRef } from 'react';

const TICKER_COLORS = {
    "TSLA": "#FF375F", // Electric Red
    "INFY": "#4D8BFF", // Deep Blue
    "MSFT": "#4ECDC4", // Green
    "NIFTY": "#FFD166", // Gold
    "BTC": "#F7931A", // Orange
    "ETH": "#627EEA", // Ether Blue
    "AAPL": "#FFFFFF", // White
    "AMZN": "#FF9900", // Amazon Orange
    "META": "#0668E1", // Meta Blue
    "NVDA": "#76B900", // Nvidia Green
    "GOOGL": "#EA4335", // Google Red
    "default": "#06D6A0" // Cyber Cyan
};

const FloatingElement = ({ content, top, left, scale, depth, animationDelay, animationDuration, type = 'ticker' }) => {
    const isTicker = type === 'ticker';
    const color = isTicker ? (TICKER_COLORS[content] || TICKER_COLORS.default) : '#ffffff';

    // Calculate blur based on depth (lower depth = blurrier)
    // depth 1.0 = 0px blur, depth 0.2 = 4px blur
    const blurAmount = Math.max(0, (1 - depth) * 4);

    return (
        <div
            className="absolute will-change-transform transition-transform duration-100 ease-out"
            style={{
                top,
                left,
                transform: `translate(calc(var(--mouse-x, 0) * ${depth * 60}px), calc(var(--mouse-y, 0) * ${depth * 60}px)) scale(${scale})`,
                zIndex: Math.floor(depth * 10),
                filter: `blur(${blurAmount}px)`
            }}
        >
            {isTicker ? (
                <div
                    className="group flex items-center justify-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm shadow-sm text-sm font-bold animate-float pointer-events-auto transition-all duration-300 cursor-default select-none hover:scale-110 hover:bg-white/10"
                    style={{
                        animationDelay,
                        animationDuration,
                        '--hover-color': color
                    }}
                >
                    <span className="text-slate-500/50 dark:text-white/40 group-hover:text-[var(--hover-color)] group-hover:drop-shadow-[0_0_8px_var(--hover-color)] transition-colors">
                        {content}
                    </span>
                </div>
            ) : (
                // Abstract Geometric Shapes
                <div
                    style={{
                        animationDuration,
                    }}
                    className="opacity-20 dark:opacity-10 animate-spin-slow text-slate-400 dark:text-white"
                >
                    {content}
                </div>
            )
            }
        </div >
    );
};

const Background3D = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            // Calculate normalized mouse position (-1 to 1)
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;

            // Update CSS variables smoothly
            containerRef.current.style.setProperty('--mouse-x', x);
            containerRef.current.style.setProperty('--mouse-y', y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Tickers to display
    const tickers = [
        "AAPL", "TSLA", "NIFTY", "BANKNIFTY", "RELIANCE",
        "TCS", "BTC", "ETH", "GOOGL", "AMZN", "MSFT",
        "INFY", "HDFCBANK", "NVDA", "META", "GOLD", "CRUDE"
    ];

    // Abstract shapes (SVGs or characters)
    const shapes = [
        <div className="w-16 h-16 border-2 border-white/20 rounded-full" />, // Ring
        <div className="w-12 h-12 border border-white/10 rotate-45" />, // Diamond
        <div className="w-20 h-1 border-t border-white/10" />, // Line
        <div className="w-8 h-8 border-2 border-dashed border-white/20 rounded-full" />, // Dotted Ring
    ];

    const generateElements = (count, type) => {
        return Array.from({ length: count }).map((_, index) => {
            const content = type === 'ticker'
                ? tickers[index % tickers.length]
                : shapes[index % shapes.length];

            const top = `${Math.random() * 85 + 5}%`;
            const left = `${Math.random() * 90 + 5}%`;
            const animationDelay = `${Math.random() * 5}s`;
            const animationDuration = `${12 + Math.random() * 15}s`;
            const depth = 0.1 + Math.random() * 0.9; // 0.1 (far) to 1.0 (close)
            const scale = 0.5 + (depth * 0.7); // Scale correlates with depth

            return (
                <FloatingElement
                    key={`${type}-${index}`}
                    type={type}
                    content={content}
                    top={top}
                    left={left}
                    scale={scale}
                    depth={depth}
                    animationDelay={animationDelay}
                    animationDuration={animationDuration}
                />
            );
        });
    };

    return (
        <div ref={containerRef} className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Deep Space Gradient Base */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 dark:from-[#0B0F19] dark:via-[#0F172A] dark:to-[#1E293B] transition-colors duration-700"></div>

            {/* Retro Grid Floor (Only visible in Dark Mode) */}
            <div className="hidden dark:block absolute bottom-[-50%] left-[-50%] right-[-50%] top-[20%] opacity-20 [transform:perspective(500px)_rotateX(60deg)] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,transparent,black)] animate-[grid-move_20s_linear_infinite]"></div>

            {/* Floating Elements (Tickers + Shapes) */}
            <div className="absolute inset-0 overflow-hidden">
                {generateElements(5, 'shape')}
                {generateElements(17, 'ticker')}
            </div>

            {/* Ambient Glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen opacity-30 animate-pulse delay-1000"></div>
        </div>
    );
};

export default Background3D;
