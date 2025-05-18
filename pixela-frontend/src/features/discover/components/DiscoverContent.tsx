'use client';

import { DiscoverGrid } from './DiscoverGrid';
import { useDiscoverStore } from '../store';
import { DiscoverSelector } from './DiscoverSelector';
import { IoIosArrowForward } from 'react-icons/io';

const STYLES = {
  container: "relative w-full min-h-screen bg-pixela-dark flex flex-col",
  gradientContainer: "absolute inset-0 w-full h-full z-0 pointer-events-none",
  mainGradient: "absolute top-1/2 left-[65%] -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full bg-gradient-to-r from-pixela-accent/50 via-pixela-accent/20 to-transparent blur-[300px] opacity-70",
  secondaryGradient: "absolute top-1/2 left-[65%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-l from-pixela-accent/60 via-pixela-accent/30 to-transparent blur-[250px] opacity-60",
  contentContainer: "flex-grow flex flex-col justify-center relative z-10",
  mainContent: "w-[80%] mx-auto flex items-center gap-8",
  leftSection: "w-[50%] pr-8",
  title: "text-[128px] font-[900] text-pixela-accent font-outfit tracking-wider uppercase leading-none mb-8",
  description: "text-pixela-light text-xl mb-10 max-w-[90%] leading-relaxed",
  descriptionHighlight: "block mt-2 text-pixela-light/80",
  actionsContainer: "flex items-center gap-6",
  exploreButton: "group bg-gradient-to-r from-pixela-accent to-pixela-accent/80 text-pixela-dark px-8 py-3 rounded-full font-bold text-base transition-all duration-300 hover:shadow-xl hover:shadow-pixela-accent/30 relative overflow-hidden",
  buttonContent: "relative z-10 flex items-center",
  buttonIcon: "w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300",
  buttonHover: "absolute inset-0 bg-white/20 w-0 group-hover:w-full transition-all duration-300",
  rightSection: "w-[50%]",
  mainTitle: "text-3xl font-semibold mb-4",
  finalText: "mt-6 text-xl font-medium"
} as const;

/**
 * Componente principal que muestra la sección de descubrimiento
 * Incluye el título, descripción, selector de tipo y grid de contenido
 */
export const DiscoverContent = () => {
    const { activeType, setActiveType } = useDiscoverStore();

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
                            Descubre
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
                            <button className={STYLES.exploreButton}>
                                <span className={STYLES.buttonContent}>
                                    Explorar más
                                    <IoIosArrowForward className={STYLES.buttonIcon} />
                                </span>
                                <span className={STYLES.buttonHover} />
                            </button>
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