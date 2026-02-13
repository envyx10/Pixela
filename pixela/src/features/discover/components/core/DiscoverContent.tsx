"use client";

import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCategoriesStore } from "@/features/categories/store/categoriesStore";
import { useDiscoverAnimation } from "@/features/discover/hooks/useDiscoverAnimation";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { headings } from "@/features/discover/content/headings";
import { DiscoverBackground } from "@/features/discover/components/layout/DiscoverBackground";

const STYLES = {
  // --- Contenedor y Degradados ---
  container:
    "relative w-full bg-pixela-dark flex flex-col justify-center overflow-hidden",
  gradientContainer: "absolute inset-0 w-full h-full z-0 pointer-events-none",
  mainGradient:
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] lg:w-[80vw] lg:h-[80vw] lg:left-[75%] 2k:w-[60vw] 2k:h-[60vw] 2k:left-[65%] rounded-full",
  secondaryGradient:
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] lg:w-[60vw] lg:h-[60vw] lg:left-[75%] 2k:w-[45vw] 2k:h-[45vw] 2k:left-[65%] rounded-full",

  // --- Layout de Escritorio ---
  desktopContainer:
    "min-h-[85vh] relative mt-16 flex items-center justify-center overflow-hidden",
  desktopContent:
    "relative z-20 w-[90%] xl:w-[85%] 2k:w-[70%] mx-auto flex flex-col items-start justify-center text-left pointer-events-none", // pointer-events-none para que el fondo no interfiera, pero habilitaremos el boton
  desktopLeftSection: "w-full max-w-3xl",
  desktopRightSection: "hidden", // Ocultamos la sección derecha (Grid)
  desktopActions:
    "flex flex-row items-center justify-start gap-8 2k:gap-6 mt-10 2k:mt-6 pointer-events-auto", // Reactivamos puntero para botones

  // --- Layout Móvil ---
  mobileContainer: "flex-col items-stretch gap-8 px-4 py-12",

  // --- Tipografía y Contenido ---
  discoverLabel:
    "text-lg font-semibold text-pixela-accent uppercase tracking-widest mb-4",
  mainHeadingDesktop:
    "text-6xl 2k:text-7xl font-black text-white leading-[0.9] mb-8 2k:mb-6 flex flex-col gap-0",
  // hollowText removed
  mainHeadingMobile:
    "text-6xl font-black text-pixela-accent font-outfit tracking-tighter uppercase leading-none text-left",
  description: "text-pixela-light/80 text-base 2k:text-lg max-w-full text-left",
  descriptionDesktop: "mb-8 2k:mb-6 mx-0 lg:max-w-xl",
  descriptionMobile: "py-8",
  accentText: "text-pixela-light font-semibold",

  // --- Botones y Acciones ---
  exploreButton:
    "group bg-gradient-to-r from-pixela-accent to-pixela-accent/80 text-pixela-dark px-8 py-3 rounded-full font-bold text-base transition-all duration-300 hover:shadow-xl hover:shadow-pixela-accent/30 relative overflow-hidden transform hover:-translate-y-px hover:scale-[1.02]",
  buttonContent: "relative z-10 flex items-center justify-center",
  buttonIcon: "w-4 h-4 ml-2 transition-transform duration-300",
  buttonIconHover: "group-hover:translate-x-1",
  buttonHoverEffect:
    "absolute inset-0 bg-white/20 w-0 group-hover:w-full transition-all duration-300",
} as const;

/**
 * Componente principal de la sección de descubrimiento
 * Maneja el estado global de series y películas
 * @returns {JSX.Element} - Elemento JSX que representa el contenido de la sección de descubrimiento
 * @param {DiscoverMediaType} activeType - Tipo de contenido activo (serie o película)
 * @param {Function} setActiveType - Función para actualizar el tipo de contenido activo
 * @param {string} heading - Encabezado de la sección de descubrimiento
 * @param {boolean} isMobile - Indica si la vista es móvil
 * @param {Function} handleExploreClick - Función para manejar el clic en el botón de explorar catálogo
 * @param {React.RefObject<HTMLDivElement>} containerRef - Referencia al contenedor principal
 * @param {React.RefObject<HTMLDivElement>} leftSectionRef - Referencia a la sección izquierda
 * @param {React.RefObject<HTMLDivElement>} gridRef - Referencia al grid de tarjetas
 */
export const DiscoverContent = () => {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  // const [activeType, setActiveType] = useState<DiscoverMediaType>("serie"); // Removed unused state
  const [heading, setHeading] = useState(headings[0]);

  useEffect(() => {
    setHeading(headings[Math.floor(Math.random() * headings.length)]);
  }, []);

  const setSelectedMediaType = useCategoriesStore(
    (state) => state.setSelectedMediaType,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const leftSectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useDiscoverAnimation({
    containerRef,
    leftSectionRef,
    gridRef,
  });

  const handleExploreClick = () => {
    // Default to series or modify if needed, since activeType selector is removed
    setSelectedMediaType("series");
  };

  /**
   * Contenido de la descripción de la sección de descubrimiento
   * @returns {JSX.Element} - Elemento JSX que representa el contenido de la descripción
   * @param {boolean} isMobile - Indica si la vista es móvil
   * @param {string} STYLES.description - Estilos de la descripción
   * @param {string} STYLES.descriptionMobile - Estilos de la descripción para móvil
   * @param {string} STYLES.descriptionDesktop - Estilos de la descripción para escritorio
   * @param {string} STYLES.accentText - Estilos del texto de acento
   * @param {string} STYLES.exploreButton - Estilos del botón de explorar catálogo
   * @param {string} STYLES.buttonContent - Estilos del contenido del botón
   */
  const descriptionContent = (
    <div
      className={`${STYLES.description} ${isMobile ? STYLES.descriptionMobile : STYLES.descriptionDesktop}`}
    >
      <p>
        Explora un catálogo seleccionado para{" "}
        <span className={STYLES.accentText}>cautivar</span> tus sentidos y
        sumérgete en narrativas inolvidables que despiertan tu{" "}
        <span className={STYLES.accentText}>imaginación</span>.
      </p>
      <p className="mt-4">
        Ya sea que busques emoción, misterio o inspiración, aquí empieza tu
        próximo viaje cinematográfico.
      </p>
    </div>
  );

  return (
    <div
      className={`${STYLES.container} ${isMobile ? STYLES.mobileContainer : STYLES.desktopContainer}`}
    >
      {/* --- Fondo para ESCRITORIO --- */}
      {!isMobile && (
        <div className={STYLES.gradientContainer}>
          <DiscoverBackground />
        </div>
      )}

      {/* --- Contenido para MÓVIL --- */}
      {isMobile && (
        <>
          <h2 className={STYLES.mainHeadingMobile}>
            DES-
            <br />
            CUBRE
          </h2>
          {descriptionContent}
          {/* Eliminados Selector y Grid en Móvil también para consistencia con la petición */}
          <Link
            href="/categories"
            className={`${STYLES.exploreButton} w-full`}
            onClick={handleExploreClick}
          >
            <span className={STYLES.buttonContent}>
              Explorar catálogo
              <IoIosArrowForward className={STYLES.buttonIcon} />
            </span>
          </Link>
        </>
      )}

      {/* --- Contenido para ESCRITORIO --- */}
      {!isMobile && (
        <div ref={containerRef} className={STYLES.desktopContent}>
          <div ref={leftSectionRef} className={STYLES.desktopLeftSection}>
            <p className={STYLES.discoverLabel}>DESCUBRE</p>
            <h2 className={STYLES.mainHeadingDesktop}>
              {heading.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </h2>
            {descriptionContent}
            <div className={STYLES.desktopActions}>
              {/* Eliminado DiscoverSelector */}
              <Link
                href="/categories"
                className={`${STYLES.exploreButton} w-auto`}
                onClick={handleExploreClick}
              >
                <span className={STYLES.buttonContent}>
                  Explorar catálogo
                  <IoIosArrowForward
                    className={`${STYLES.buttonIcon} ${STYLES.buttonIconHover}`}
                  />
                </span>
                <span className={STYLES.buttonHoverEffect} />
              </Link>
            </div>
          </div>

          {/* Eliminado Grid derecho */}
        </div>
      )}
    </div>
  );
};
