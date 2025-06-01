'use client';

import { useDiscoverStore } from '../store';
import { DiscoverCard } from './DiscoverCard';
import { MediaType } from '../type';
import clsx from 'clsx';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface DiscoverGridProps {
    type: MediaType;
}

const DISCOVER_LIMIT = 7;

const STYLES = {
    container: "flex flex-col items-center gap-4 [@media(min-width:820px)_and_(max-width:1180px)]:pt-16",
    row: "flex gap-4",
    mobileGridContainer: "grid grid-cols-2 gap-2 px-1 sm:gap-3 sm:px-2 w-full",
    skeletonCard: "bg-gray-800/50 animate-pulse rounded-2xl w-[200px] h-[281px]",
    mobileSkeletonCard: "bg-gray-800/50 animate-pulse rounded-2xl w-full h-[240px] xs:h-[220px] sm:h-[240px]",
    cardContainer: "flex flex-col items-center gap-4 relative [@media(min-width:820px)_and_(max-width:1180px)]:pt-16",
    firstRow: "[&>*]:animate-float",
    secondRow: "[&>*]:animate-float [&>*:nth-child(2)]:animation-delay-200",
    thirdRow: "[&>*]:animate-float [&>*:nth-child(2)]:animation-delay-200"
} as const;

/**
 * Componente que muestra un grid de tarjetas de contenido multimedia.
 * - Desktop/Tablet (>768px): Diseño 2-3-2.
 * - Móvil (<=768px): Dos columnas, con ajustes para pantallas muy estrechas.
 * Se muestran (DISCOVER_LIMIT - 1) tarjetas si DISCOVER_LIMIT es impar en vistas móviles.
 */
export const DiscoverGrid = ({ type }: DiscoverGridProps) => {
    const { series, movies } = useDiscoverStore();
    const contentToDisplay = type === 'series' ? series : movies;
    const isMobile = useMediaQuery('(max-width: 768px)'); 

    const limit = isMobile ? (DISCOVER_LIMIT % 2 !== 0 ? DISCOVER_LIMIT - 1 : DISCOVER_LIMIT) : DISCOVER_LIMIT;
    const limitedContent = contentToDisplay.slice(0, limit);

    if (!limitedContent?.length) {
        if (isMobile) {
            const skeletonCount = limit;
            return (
                <div className={STYLES.mobileGridContainer}>
                    {[...Array(skeletonCount)].map((_, index) => (
                        <div key={index} className={STYLES.mobileSkeletonCard} />
                    ))}
                </div>
            );
        }
        return (
            <div className={STYLES.container}>
                <div className={STYLES.row}>
                    <div className={STYLES.skeletonCard} />
                    <div className={STYLES.skeletonCard} />
                </div>
                <div className={STYLES.row}>
                    <div className={STYLES.skeletonCard} />
                    <div className={STYLES.skeletonCard} />
                    <div className={STYLES.skeletonCard} />
                </div>
                <div className={STYLES.row}>
                    <div className={STYLES.skeletonCard} />
                    <div className={STYLES.skeletonCard} />
                </div>
            </div>
        );
    }

    if (isMobile) {
        return (
            <div className={STYLES.mobileGridContainer}>
                {limitedContent.map((media, index) => (
                    <DiscoverCard
                        key={media.id}
                        media={media}
                        type={type}
                        index={index}
                        isMobile={true}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className={STYLES.cardContainer}>
            <div className={clsx(STYLES.row, STYLES.firstRow)}>
                <DiscoverCard
                    media={limitedContent[0]}
                    type={type}
                    index={0}
                    isMobile={false}
                />
                <DiscoverCard
                    media={limitedContent[1]}
                    type={type}
                    index={1}
                    isMobile={false}
                />
            </div>
            <div className={clsx(STYLES.row, STYLES.secondRow)}>
                <DiscoverCard
                    media={limitedContent[2]}
                    type={type}
                    index={2}
                    isMobile={false}
                />
                <DiscoverCard
                    media={limitedContent[3]}
                    type={type}
                    index={3}
                    isMobile={false}
                />
                <DiscoverCard
                    media={limitedContent[4]}
                    type={type}
                    index={4}
                    isMobile={false}
                />
            </div>
            <div className={clsx(STYLES.row, STYLES.thirdRow)}>
                <DiscoverCard
                    media={limitedContent[5]}
                    type={type}
                    index={5}
                    isMobile={false}
                />
                <DiscoverCard
                    media={limitedContent[6]}
                    type={type}
                    index={6}
                    isMobile={false}
                />
            </div>
        </div>
    );
}; 