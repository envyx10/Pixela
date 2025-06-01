'use client';

import { useDiscoverStore } from '../store';
import { DiscoverSelector } from './DiscoverSelector';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';
import { useCategoriesStore } from '@/features/categories/store';
import { DiscoverGrid } from './DiscoverGrid';

const STYLES = {
    container: "relative w-full min-h-screen bg-pixela-dark flex flex-col [@media(min-width:820px)_and_(max-width:1180px)]:min-h-0 [@media(min-width:820px)_and_(max-width:1180px)]:h-auto [@media(min-width:820px)_and_(max-width:1180px)]:pt-16",
    gradientContainer: "absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden [@media(min-width:820px)_and_(max-width:1180px)]:hidden",
    mainGradient: "absolute top-1/2 left-[65%] -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[1100px] max-h-[1100px] rounded-full bg-gradient-to-r from-pixela-accent/50 via-pixela-accent/20 to-transparent blur-[300px] opacity-70",
    secondaryGradient: "absolute top-1/2 left-[65%] -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-l from-pixela-accent/60 via-pixela-accent/30 to-transparent blur-[250px] opacity-60",
    contentContainer: "flex-grow flex flex-col justify-center relative z-10 [@media(min-width:820px)_and_(max-width:1180px)]:py-4 [@media(min-width:820px)_and_(max-width:1180px)]:min-h-0 [@media(min-width:820px)_and_(max-width:1180px)]:h-auto",
    mainContent: "w-[90%] md:w-[85%] lg:w-[80%] mx-auto flex flex-col lg:flex-row items-center gap-8 [@media(min-width:820px)_and_(max-width:1180px)]:gap-2 [@media(min-width:820px)_and_(max-width:1180px)]:py-0 [@media(min-width:820px)_and_(max-width:1180px)]:h-auto",
    leftSection: "w-full lg:w-[50%] lg:pr-8 [@media(min-width:820px)_and_(max-width:1180px)]:h-auto",
    title: "w-[90%] mx-auto text-[48px] sm:text-[64px] md:text-[96px] font-[900] text-pixela-accent font-outfit tracking-wider uppercase leading-none mb-8 text-center lg:w-full lg:mx-0 lg:text-left lg:text-[128px] [@media(min-width:820px)_and_(max-width:1180px)]:text-[110px] [@media(min-width:820px)_and_(max-width:1180px)]:text-left [@media(min-width:820px)_and_(max-width:1180px)]:w-[83.33%] [@media(min-width:820px)_and_(max-width:1180px)]:mx-0 [@media(min-width:820px)_and_(max-width:1180px)]:mb-2",
    titleMobile: "block sm:hidden text-[64px] leading-[0.95] text-pixela-accent font-black font-outfit uppercase text-left w-full pl-0 ml-[-1rem] break-words",
    titleDesktop: "hidden sm:block text-[48px] sm:text-[64px] md:text-[96px] lg:text-[128px] font-[900] text-pixela-accent font-outfit tracking-wider uppercase leading-none mb-8 text-center lg:w-full lg:mx-0 lg:text-left [@media(min-width:820px)_and_(max-width:1180px)]:text-[110px] [@media(min-width:820px)_and_(max-width:1180px)]:text-left [@media(min-width:820px)_and_(max-width:1180px)]:w-[83.33%] [@media(min-width:820px)_and_(max-width:1180px)]:mx-0 [@media(min-width:820px)_and_(max-width:1180px)]:mb-2",
    description: "text-pixela-light text-base md:text-lg lg:text-xl mb-10 max-w-full lg:max-w-[90%] leading-relaxed [@media(min-width:820px)_and_(max-width:1180px)]:text-left [@media(min-width:820px)_and_(max-width:1180px)]:mb-3 [@media(min-width:820px)_and_(max-width:1180px)]:leading-normal [@media(min-width:820px)_and_(max-width:1180px)]:h-auto",
    descriptionHighlight: "block mt-2 text-pixela-light/80 [@media(min-width:820px)_and_(max-width:1180px)]:mt-1",
    actionsContainer: "flex flex-col sm:flex-row items-center gap-6 [@media(min-width:820px)_and_(max-width:1180px)]:gap-3 [@media(min-width:820px)_and_(max-width:1180px)]:mt-2 [@media(min-width:820px)_and_(max-width:1180px)]:h-auto",
    exploreButton: "group bg-gradient-to-r from-pixela-accent to-pixela-accent/80 text-pixela-dark px-8 py-3 rounded-full font-bold text-base transition-all duration-300 hover:shadow-xl hover:shadow-pixela-accent/30 relative overflow-hidden w-full sm:w-auto [@media(min-width:820px)_and_(max-width:1180px)]:py-2",
    buttonContent: "relative z-10 flex items-center justify-center sm:justify-start",
    buttonIcon: "w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300",
    buttonHover: "absolute inset-0 bg-white/20 w-0 group-hover:w-full transition-all duration-300",
    rightSection: "w-full lg:w-[50%] [@media(min-width:820px)_and_(max-width:1180px)]:h-auto [@media(min-width:820px)_and_(max-width:1180px)]:pt-8",
    mainTitle: "text-xl md:text-2xl lg:text-3xl font-semibold mb-4 [@media(min-width:820px)_and_(max-width:1180px)]:mb-1",
    finalText: "mt-6 text-base md:text-lg lg:text-xl font-medium [@media(min-width:820px)_and_(max-width:1180px)]:mt-2",
} as const;

/**
 * Componente principal que muestra la sección de descubrimiento
 * Incluye el título, descripción, selector de tipo y grid de contenido
 */
export const DiscoverContent = () => {
    const { activeType, setActiveType } = useDiscoverStore();
    const setSelectedMediaType = useCategoriesStore((state) => state.setSelectedMediaType);

    const handleExploreClick = () => {
        setSelectedMediaType('all');
    };

    return (
        <div id="discover" className={STYLES.container}>
            <div className={STYLES.gradientContainer}>
                <div className={STYLES.mainGradient} style={{ maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)' }} />
                <div className={STYLES.secondaryGradient} style={{ maskImage: 'radial-gradient(circle at center, black 40%, transparent 60%)' }} />
            </div>
            
            <div className={STYLES.contentContainer}>
                <div className={STYLES.mainContent}>
                    <div className={STYLES.leftSection}>
                        <h2 className={STYLES.title}>
                            <span className={STYLES.titleMobile}>DES-<br/>CUBRE</span>
                            <span className={STYLES.titleDesktop}>Descubre</span>
                        </h2>
                        <p className={STYLES.description}>
                            <span className={STYLES.mainTitle}>
                                Descubre historias que te atrapan
                            </span>
                            <span className={STYLES.descriptionHighlight}>
                                Explora un universo de películas y series seleccionadas para cautivar tus sentidos.
                            </span>
                            <span className={STYLES.descriptionHighlight}>
                                Sumérgete en narrativas inolvidables, personajes que se quedan contigo y mundos que despiertan tu imaginación.
                            </span>
                            <span className={STYLES.descriptionHighlight}>
                                Ya sea que busques emoción, misterio, romance o inspiración, aquí empieza tu próximo viaje cinematográfico.
                            </span>
                            <span className={STYLES.finalText}>
                                Déjate llevar. Elige lo inesperado. Descubre lo que el cine puede hacer por ti.
                            </span>
                        </p>
                        <div className={STYLES.actionsContainer}>
                            <Link 
                                href="/categories" 
                                className={STYLES.exploreButton}
                                onClick={handleExploreClick}
                            >
                                <span className={STYLES.buttonContent}>
                                    Explorar más
                                    <IoIosArrowForward className={STYLES.buttonIcon} />
                                </span>
                                <span className={STYLES.buttonHover} />
                            </Link>
                            <DiscoverSelector 
                                activeType={activeType}
                                onTypeChange={setActiveType}
                            />
                        </div>
                    </div>
                    
                    <div className={STYLES.rightSection}>
                        <DiscoverGrid type={activeType} />
                    </div>
                </div>
            </div>
        </div>
    );
}; 