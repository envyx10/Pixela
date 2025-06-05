'use client';

import { useDiscoverStore } from '../store/discoverStore';
import { DiscoverSelector } from './DiscoverSelector';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';
import { useCategoriesStore } from '@/features/categories/store/categoriesStore';
import { DiscoverGrid } from './DiscoverGrid';

const STYLES = {
    container: "relative w-full min-h-screen bg-pixela-dark flex flex-col mt-8",
    gradientContainer: "absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden",
    mainGradient: "absolute top-1/2 left-[65%] -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[1100px] max-h-[1100px] lg:w-[75vw] lg:h-[75vw] lg:max-w-[850px] lg:max-h-[850px] lg:left-[70%] rounded-full bg-gradient-to-r from-pixela-accent/70 via-pixela-accent/35 to-transparent blur-[300px] opacity-85",
    secondaryGradient: "absolute top-1/2 left-[65%] -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] lg:w-[60vw] lg:h-[60vw] lg:max-w-[700px] lg:max-h-[700px] lg:left-[70%] rounded-full bg-gradient-to-l from-pixela-accent/80 via-pixela-accent/45 to-transparent blur-[300px] opacity-75",
    contentContainer: "flex-grow flex flex-col justify-center relative z-10",
    mainContent: "w-[90%] md:w-[85%] lg:w-[80%] mx-auto flex flex-col lg:flex-row items-center gap-8",
    leftSection: "w-full lg:w-[50%] lg:pr-8 ipad:w-full ipad:mx-0 ipad:px-4",
    title: "w-[90%] mx-auto text-[48px] sm:text-[64px] md:text-[96px] font-[900] text-pixela-accent font-outfit tracking-wider uppercase leading-none mb-8 text-center lg:w-full lg:mx-0 lg:text-left lg:text-[128px] ipad:text-left ipad:w-full ipad:mx-0",
    titleMobile: "block sm:hidden text-[64px] leading-[0.95] text-pixela-accent font-black font-outfit uppercase text-left w-full pl-0 ml-[-1rem] break-words",
    titleDesktop: "hidden sm:block text-[48px] sm:text-[64px] md:text-[96px] lg:text-[128px] font-[900] text-pixela-accent font-outfit tracking-wider uppercase leading-none mb-8 text-center lg:w-full lg:mx-0 lg:text-left lg:text-[128px] ipad:text-left ipad:w-full ipad:mx-0",
    description: "text-pixela-light text-sm md:text-base lg:text-lg mb-10 max-w-full lg:max-w-[75%] leading-relaxed ipad:text-left ipad:w-full ipad:mx-0",
    descriptionHighlight: "block mt-2 text-pixela-light/80 transform transition-all duration-500 hover:text-pixela-light hover:translate-x-1 opacity-0 animate-fade-in-up",
    accentText: "text-pixela-accent font-semibold",
    actionsContainer: "flex flex-col sm:flex-row items-center gap-6 ipad:items-start ipad:justify-start ipad:flex-row",
    exploreButton: "group bg-gradient-to-r from-pixela-accent to-pixela-accent/80 text-pixela-dark px-8 py-3 rounded-full font-bold text-base transition-all duration-300 hover:shadow-xl hover:shadow-pixela-accent/30 relative overflow-hidden w-full sm:w-auto ipad:w-1/2 ipad:whitespace-nowrap",
    buttonContent: "relative z-10 flex items-center justify-center sm:justify-start ipad:justify-center",
    buttonIcon: "w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300",
    buttonHover: "absolute inset-0 bg-white/20 w-0 group-hover:w-full transition-all duration-300",
    rightSection: "w-full lg:w-[50%]",
    mainTitle: "text-lg md:text-xl lg:text-2xl font-semibold mb-4",
    finalText: "mt-10 text-sm md:text-base lg:text-lg font-medium opacity-0 animate-fade-in-up transform transition-all duration-500 hover:text-pixela-light hover:translate-x-1",
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
                <div className={STYLES.mainGradient} style={{ maskImage: 'radial-gradient(circle at center, black 20%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 60%, transparent 80%)' }} />
                <div className={STYLES.secondaryGradient} style={{ maskImage: 'radial-gradient(circle at center, black 25%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0.3) 65%, transparent 85%)' }} />
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
                            <span className={`${STYLES.descriptionHighlight} delay-200`}>
                                Explora un <span className={STYLES.accentText}>universo</span> de películas y series seleccionadas para <span className={STYLES.accentText}>cautivar</span> tus sentidos.
                            </span>
                            <span className={`${STYLES.descriptionHighlight} delay-400`}>
                                Sumérgete en narrativas <span className={STYLES.accentText}>inolvidables</span>, personajes que se quedan contigo y mundos que despiertan tu <span className={STYLES.accentText}>imaginación</span>.
                            </span>
                            <span className={`${STYLES.descriptionHighlight} delay-600`}>
                                Ya sea que busques <span className={STYLES.accentText}>emoción</span>, <span className={STYLES.accentText}>misterio</span>, <span className={STYLES.accentText}>romance</span> o <span className={STYLES.accentText}>inspiración</span>, aquí empieza tu próximo <span className={STYLES.accentText}>viaje cinematográfico</span>.
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