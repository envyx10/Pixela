import { useState, useEffect } from "react";
import FooterParticles from "./footer/FooterParticles";
import FooterBackgroundEffects from "./footer/FooterBackgroundEffects";
import FooterContent from "./footer/FooterContent";
import FooterScrollTopButton from "./footer/FooterScrollTopButton";
import FooterAnimations from "./footer/FooterAnimations";

/**
 * Componente Footer optimizado para Pixela
 * Implementa patrones de rendimiento como useMemo y división en subcomponentes
 */
export default function Footer() {
  // Estados para animaciones y funcionalidad
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  // Gestionar eventos y animaciones
  useEffect(() => {
    // Control del botón de scroll
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    
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
      {/* Efectos visuales de fondo */}
      <FooterBackgroundEffects isAnimated={isAnimated} />
      
      {/* Partículas animadas */}
      <FooterParticles />
      
      {/* Contenido principal del footer */}
      <FooterContent isAnimated={isAnimated} />
      
      {/* Botón para volver arriba */}
      <FooterScrollTopButton showScrollButton={showScrollButton} />
      
      {/* Estilos de animación */}
      <FooterAnimations />
    </footer>
  );
}