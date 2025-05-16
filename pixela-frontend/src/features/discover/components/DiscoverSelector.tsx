'use client';

interface DiscoverSelectorProps {
    activeType: 'series' | 'movies';
    onTypeChange: (type: 'series' | 'movies') => void;
}

export const DiscoverSelector = ({ activeType, onTypeChange }: DiscoverSelectorProps) => {
    return (
        <div className="flex bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10 relative shadow-lg shadow-black/20">
            <button
                className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                    activeType === 'series'
                        ? 'bg-pixela-accent text-pixela-dark shadow-md shadow-pixela-accent/20'
                        : 'text-pixela-light hover:bg-white/10'
                }`}
                onClick={() => onTypeChange('series')}
            >
                Series
            </button>
            
            <button
                className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                    activeType === 'movies'
                        ? 'bg-pixela-accent text-pixela-dark shadow-md shadow-pixela-accent/20'
                        : 'text-pixela-light hover:bg-white/10'
                }`}
                onClick={() => onTypeChange('movies')}
            >
                Películas
            </button>
        </div>
    );
}; 