import React from 'react';
import { Activity, GitMerge, MoreHorizontal, TrendingUp } from 'lucide-react';

const ModelSelector = ({ selectedModel, onSelectModel }) => {
    const models = [
        { id: 'linear', name: 'Linear Reg.', icon: TrendingUp },
        { id: 'arima', name: 'ARIMA', icon: Activity },
        { id: 'knn', name: 'KNN', icon: GitMerge },
        { id: 'svm', name: 'SVM', icon: MoreHorizontal },
        { id: 'correlation', name: 'Correlation', icon: TrendingUp },

    ];

    return (
        <div className="flex border-b border-slate-200 mb-6 w-full">
            {models.map((model) => {
                const Icon = model.icon;
                const isActive = selectedModel === model.id;

                return (
                    <button
                        key={model.id}
                        onClick={() => onSelectModel(model.id)}
                        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all relative ${isActive
                            ? 'text-blue-600'
                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                            }`}
                    >
                        <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                        {model.name}
                        {isActive && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full"></div>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default ModelSelector;
