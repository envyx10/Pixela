'use client';

import clsx from 'clsx';
import { DiscoverSelectorProps } from '@/features/discover/types/components';

const STYLES = {
    container: "flex bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10 relative shadow-lg shadow-black/20 w-full sm:w-auto ipad:w-full",
    button: "px-6 py-2 rounded-full transition-all duration-300 font-medium min-w-[120px] flex-1",
    activeButton: "bg-pixela-accent text-pixela-dark shadow-md shadow-pixela-accent/20",
    inactiveButton: "text-pixela-light hover:bg-white/10"
} as const;

const MEDIA_TYPES = {
    serie: 'Series',
    pelicula: 'Películas'
} as const;

/**
 * Componente selector que permite cambiar entre series y películas
 * Muestra un botón para cada tipo de contenido con estilos diferentes según el estado activo
 */
export const DiscoverSelector = ({ activeType, onTypeChange }: DiscoverSelectorProps) => {
    return (
        <div className={STYLES.container}>
            {(Object.keys(MEDIA_TYPES) as ('serie' | 'pelicula')[]).map((type) => (
                <button
                    key={type}
                    className={clsx(STYLES.button, {
                        [STYLES.activeButton]: activeType === type,
                        [STYLES.inactiveButton]: activeType !== type
                    })}
                    onClick={() => onTypeChange(type)}
                >
                    {MEDIA_TYPES[type]}
                </button>
            ))}
        </div>
    );
}; 