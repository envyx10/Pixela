'use client';

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import FooterContent from "./footer/FooterContent";
import FooterScrollTopButton from "./footer/FooterScrollTopButton";

// Importar componentes visualmente pesados de forma dinámica
const DynamicFooterParticles = dynamic(
  () => import("./footer/FooterParticles"),
  { ssr: false } // Carga sólo en el cliente
);

const DynamicFooterBackgroundEffects = dynamic(
  () => import("./footer/FooterBackgroundEffects"),
  { ssr: false } // Carga sólo en el cliente
);

const DynamicFooterAnimations = dynamic(
  () => import("./footer/FooterAnimations"),
  { ssr: false } // Carga sólo en el cliente
);

/**
 * Componente Footer optimizado para Pixela
 * Implementa patrones de rendimiento como useMemo, división en subcomponentes
 * y carga dinámica para elementos visuales no críticos
 */
export default function Footer() {
  // Estados para animaciones y funcionalidad
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Gestionar eventos y animaciones
  useEffect(() => {
    // Marcar componente como montado
    setIsMounted(true);
    
    // Control del botón de scroll con throttling para mejor rendimiento
    const handleScroll = () => {
      // Usamos requestAnimationFrame para optimizar el rendimiento del scroll
      window.requestAnimationFrame(() => {
        setShowScrollButton(window.scrollY > 300);
      });
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Activar animación después de montar el componente
    const animationTimer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    
    // Limpiar event listeners y timers
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(animationTimer);
    };
  }, []);

  return (
    <footer className="relative bg-gradient-to-b from-[#181818] to-[#0a0a0a] overflow-hidden min-h-[420px] flex items-center justify-center">
      {/* Renderizar efectos visuales solo después de la primera carga */}
      {isMounted && (
        <>
          {/* Efectos visuales de fondo */}
          <DynamicFooterBackgroundEffects isAnimated={isAnimated} />
          
          {/* Partículas animadas */}
          <DynamicFooterParticles />
          
          {/* Estilos de animación */}
          <DynamicFooterAnimations />
        </>
      )}
      
      {/* Contenido principal del footer (cargado inmediatamente) */}
      <FooterContent isAnimated={isAnimated} />
      
      {/* Botón para volver arriba */}
      <FooterScrollTopButton showScrollButton={showScrollButton} />
    </footer>
  );
}