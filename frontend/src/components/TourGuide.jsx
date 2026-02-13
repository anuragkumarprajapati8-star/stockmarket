import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Check } from 'lucide-react';

const TOUR_STEPS = [
    {
        target: 'input[type="text"]',
        title: "Search Stocks",
        content: "Start by entering a stock symbol like 'TCS.NS' or 'AAPL'. We support global markets!",
        position: 'bottom'
    },
    {
        target: '.grid-cols-4',
        title: "Key Metrics",
        content: "Get a quick snapshot of the market with P/E Ratio, Market Cap, and Volume at a glance.",
        position: 'top'
    },
    {
        target: '.bg-blue-50',
        title: "AI Explanations",
        content: "Understand WHY a model was chosen with our Viva-ready explanations.",
        position: 'top'
    },
    {
        target: 'button[aria-label="Toggle Dark Mode"]',
        title: "Dark Mode",
        content: "Toggle between Light and Dark themes for comfortable viewing.",
        position: 'bottom'
    }
];

const TourGuide = () => {
    const [step, setStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasSeenTour = localStorage.getItem('hasSeenTour');
        if (!hasSeenTour) {
            // Small delay to let everything load
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleNext = () => {
        if (step < TOUR_STEPS.length - 1) {
            setStep(step + 1);
        } else {
            handleClose();
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('hasSeenTour', 'true');
    };

    if (!isVisible) return null;

    const currentStep = TOUR_STEPS[step];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            {/* Backdrop */}
            {/* <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" /> */}

            {/* Tooltip Card (Centered for simplicity in this MVP version) */}
            <div className="pointer-events-auto bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 border border-slate-100 dark:border-slate-700 animate-fade-in-up">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded-full">
                            Step {step + 1}/{TOUR_STEPS.length}
                        </span>
                    </div>
                    <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {currentStep.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                    {currentStep.content}
                </p>

                <div className="flex justify-between items-center">
                    <button
                        onClick={handleClose}
                        className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    >
                        Skip Tour
                    </button>
                    <button
                        onClick={handleNext}
                        className="btn-primary px-4 py-2 text-sm shadow-blue-500/20"
                    >
                        {step === TOUR_STEPS.length - 1 ? (
                            <>Finish <Check className="h-4 w-4" /></>
                        ) : (
                            <>Next <ChevronRight className="h-4 w-4" /></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TourGuide;
