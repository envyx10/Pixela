'use client';

import { useEffect } from 'react';
import { useDiscoverStore } from '../store';
import { TrendingSerie, TrendingMovie } from '../type';
import { DiscoverContent } from './DiscoverContent';

interface DiscoverSectionProps {
    series: TrendingSerie[];
    movies: TrendingMovie[];
}

export const DiscoverSection = ({ series, movies }: DiscoverSectionProps) => {
    const setSeries = useDiscoverStore((state) => state.setSeries);
    const setMovies = useDiscoverStore((state) => state.setMovies);

    useEffect(() => {
        if (series && series.length > 0) {
            setSeries(series);
        }
        if (movies && movies.length > 0) {
            setMovies(movies);
        }
    }, [series, movies, setSeries, setMovies]);

    return <DiscoverContent />;
}; 