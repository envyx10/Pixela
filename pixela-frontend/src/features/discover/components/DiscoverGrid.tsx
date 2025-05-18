'use client';

import { useDiscoverStore } from '../store';
import { DiscoverCard } from './DiscoverCard';
import { MediaType } from '../type';
import clsx from 'clsx';

interface DiscoverGridProps {
    type: MediaType;
}

const DISCOVER_LIMIT = 7;

const STYLES = {
    container: "flex flex-col items-center gap-4",
    row: "flex gap-4",
    skeletonCard: "bg-gray-800/50 animate-pulse rounded-2xl w-[200px] h-[281px]",
    cardContainer: "flex flex-col items-center gap-4 relative",
    firstRow: "[&>*]:animate-float",
    secondRow: "[&>*]:animate-float [&>*:nth-child(2)]:animation-delay-200",
    thirdRow: "[&>*]:animate-float [&>*:nth-child(2)]:animation-delay-200"
} as const;

/**
 * Componente que muestra un grid de tarjetas de contenido multimedia
 * con un diseño específico de 2-3-2 cards
 */
export const DiscoverGrid = ({ type }: DiscoverGridProps) => {
    const { series, movies } = useDiscoverStore();
    const content = type === 'series' ? series : movies;
    const limitedContent = content.slice(0, DISCOVER_LIMIT);

    if (!limitedContent?.length) {
        return (
            <div className={STYLES.container}>
                {/* Primera fila - 2 cards */}
                <div className={STYLES.row}>
                    <div className={STYLES.skeletonCard} />
                    <div className={STYLES.skeletonCard} />
                </div>
                
                {/* Segunda fila - 3 cards */}
                <div className={STYLES.row}>
                    <div className={STYLES.skeletonCard} />
                    <div className={STYLES.skeletonCard} />
                    <div className={STYLES.skeletonCard} />
                </div>
                
                {/* Tercera fila - 2 cards */}
                <div className={STYLES.row}>
                    <div className={STYLES.skeletonCard} />
                    <div className={STYLES.skeletonCard} />
                </div>
            </div>
        );
    }

    return (
        <div className={STYLES.cardContainer}>
            {/* Primera fila - 2 cards */}
            <div className={clsx(STYLES.row, STYLES.firstRow)}>
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
            <div className={clsx(STYLES.row, STYLES.secondRow)}>
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
            <div className={clsx(STYLES.row, STYLES.thirdRow)}>
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