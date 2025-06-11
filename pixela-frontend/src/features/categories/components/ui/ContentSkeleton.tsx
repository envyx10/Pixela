import { ContentSkeletonProps } from '@/features/categories/types/content';

const STYLES = {
    // Contenedor principal y grid
    container: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6',
    card: 'w-full flex flex-col relative group overflow-hidden animate-pulse',

    // Contenedor del poster y efectos visuales
    posterContainer: 'relative w-full aspect-[2/3] overflow-hidden rounded-lg bg-gradient-to-br from-pixela-dark/40 via-pixela-dark/30 to-pixela-dark/50',
    shimmer: 'absolute inset-0 bg-gradient-to-r from-transparent via-pixela-accent/15 to-transparent animate-shimmer',
    noiseEffect: 'noise-effect opacity-3',

    // Overlay y contenido superpuesto
    overlay: 'absolute inset-0 bg-gradient-to-t from-pixela-dark/95 via-pixela-dark/60 to-transparent',
    overlayContent: 'absolute bottom-0 left-0 right-0 p-3 md:p-4 space-y-2',

    // Elementos de texto y detalles - Más realistas
    title: 'h-3 md:h-4 bg-pixela-light/20 rounded animate-pulse',
    titleShort: 'w-3/4',
    titleMedium: 'w-5/6',
    titleLong: 'w-full',
    
    details: 'flex items-center gap-2 mt-2',
    rating: 'h-3 w-8 md:h-4 md:w-10 bg-pixela-accent/20 rounded animate-pulse',
    year: 'h-3 w-8 md:h-4 md:w-10 bg-pixela-light/15 rounded animate-pulse',
    type: 'h-3 w-12 md:h-4 md:w-16 bg-pixela-light/15 rounded animate-pulse',
    
    // Pulsos variados para elementos
    pulse: 'animate-pulse',
    pulseSlow: 'animate-pulse [animation-duration:2s]',
    pulseFast: 'animate-pulse [animation-duration:1s]'
} as const;

/**
 * Componente que muestra un esqueleto de carga para las tarjetas de contenido.
 * Imita la estructura visual de las cards de películas y series con animaciones mejoradas.
 * 
 * @component
 * @param {ContentSkeletonProps} props - Propiedades del componente
 * @returns {JSX.Element} El esqueleto de carga renderizado
 */
export const ContentSkeleton = ({ count = 12 }: ContentSkeletonProps) => {
    // Generar variaciones de títulos para más realismo
    const getTitleVariation = (index: number) => {
        const variations = [STYLES.titleShort, STYLES.titleMedium, STYLES.titleLong];
        return variations[index % variations.length];
    };

    // Generar delays escalonados para efecto más natural
    const getAnimationDelay = (index: number) => {
        return `${(index * 100) % 800}ms`;
    };

    return (
        <div className={STYLES.container}>
            {Array.from({ length: count }).map((_, index) => (
                <div 
                    key={index} 
                    className={STYLES.card}
                    style={{
                        animationDelay: getAnimationDelay(index)
                    }}
                >
                    <div className={STYLES.posterContainer}>
                        <div className={STYLES.shimmer} />
                        <div className={STYLES.noiseEffect} />
                        <div className={STYLES.overlay}>
                            <div className={STYLES.overlayContent}>
                                <div className={`${STYLES.title} ${getTitleVariation(index)}`} />
                                <div className={STYLES.details}>
                                    <div className={`${STYLES.rating} ${index % 2 === 0 ? STYLES.pulse : STYLES.pulseSlow}`} />
                                    <div className={`${STYLES.year} ${index % 3 === 0 ? STYLES.pulseFast : STYLES.pulse}`} />
                                    <div className={`${STYLES.type} ${index % 2 === 1 ? STYLES.pulseSlow : STYLES.pulse}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};