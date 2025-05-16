'use client';

import { useDiscoverStore } from '../store';
import { DiscoverCard } from './DiscoverCard';

interface DiscoverGridProps {
    type: 'series' | 'movies';
}

const DISCOVER_LIMIT = 7;

export const DiscoverGrid = ({ type }: DiscoverGridProps) => {
    const series = useDiscoverStore((state) => state.series);
    const movies = useDiscoverStore((state) => state.movies);

    const content = type === 'series' ? series : movies;
    const limitedContent = content.slice(0, DISCOVER_LIMIT);

    if (!limitedContent || limitedContent.length === 0) {
        return (
            <div className="flex flex-col items-center gap-4">
                {/* Primera fila - 2 cards */}
                <div className="flex gap-4">
                    <div className="bg-gray-800/50 animate-pulse rounded-2xl w-[200px] h-[281px]" />
                    <div className="bg-gray-800/50 animate-pulse rounded-2xl w-[200px] h-[281px]" />
                </div>
                
                {/* Segunda fila - 3 cards */}
                <div className="flex gap-4">
                    <div className="bg-gray-800/50 animate-pulse rounded-2xl w-[200px] h-[281px]" />
                    <div className="bg-gray-800/50 animate-pulse rounded-2xl w-[200px] h-[281px]" />
                    <div className="bg-gray-800/50 animate-pulse rounded-2xl w-[200px] h-[281px]" />
                </div>
                
                {/* Tercera fila - 2 cards */}
                <div className="flex gap-4">
                    <div className="bg-gray-800/50 animate-pulse rounded-2xl w-[200px] h-[281px]" />
                    <div className="bg-gray-800/50 animate-pulse rounded-2xl w-[200px] h-[281px]" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-4 relative">
            {/* Primera fila - 2 cards */}
            <div className="flex gap-4 [&>*]:animate-float">
                <DiscoverCard
                    media={limitedContent[0]}
                    type={type}
                    index={0}
                />
                <DiscoverCard
                    media={limitedContent[1]}
                    type={type}
                    index={1}
                />
            </div>
            
            {/* Segunda fila - 3 cards */}
            <div className="flex gap-4 [&>*]:animate-float [&>*:nth-child(2)]:animation-delay-200">
                <DiscoverCard
                    media={limitedContent[2]}
                    type={type}
                    index={2}
                />
                <DiscoverCard
                    media={limitedContent[3]}
                    type={type}
                    index={3}
                />
                <DiscoverCard
                    media={limitedContent[4]}
                    type={type}
                    index={4}
                />
            </div>
            
            {/* Tercera fila - 2 cards */}
            <div className="flex gap-4 [&>*]:animate-float [&>*:nth-child(2)]:animation-delay-200">
                <DiscoverCard
                    media={limitedContent[5]}
                    type={type}
                    index={5}
                />
                <DiscoverCard
                    media={limitedContent[6]}
                    type={type}
                    index={6}
                />
            </div>
        </div>
    );
}; 