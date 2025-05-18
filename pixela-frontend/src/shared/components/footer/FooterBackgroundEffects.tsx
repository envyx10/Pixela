'use client';

import { useMemo } from 'react';
import { BackgroundEffectProps, TriangleElement, PixelElement, FlowLine, Bubble } from './types/background-effects';
import { BACKGROUND_CONFIG, DECORATIVE_STYLES } from './constants/background-effects';

/**
 * Componente que renderiza los efectos visuales de fondo del footer
 * @param {BackgroundEffectProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente de efectos de fondo
 */
export const FooterBackgroundEffects = ({ isAnimated }: BackgroundEffectProps) => {
  // Generar elementos decorativos con useMemo para evitar recálculos
  const triangleElements = useMemo<TriangleElement[]>(() => {
    return Array.from({ length: BACKGROUND_CONFIG.triangles.count }, (_, i) => ({
      id: i,
      size: Math.random() * (BACKGROUND_CONFIG.triangles.sizeRange.max - BACKGROUND_CONFIG.triangles.sizeRange.min) + BACKGROUND_CONFIG.triangles.sizeRange.min,
      top: Math.random() * (BACKGROUND_CONFIG.triangles.positionRange.max - BACKGROUND_CONFIG.triangles.positionRange.min) + BACKGROUND_CONFIG.triangles.positionRange.min,
      left: Math.random() * (BACKGROUND_CONFIG.triangles.positionRange.max - BACKGROUND_CONFIG.triangles.positionRange.min) + BACKGROUND_CONFIG.triangles.positionRange.min,
      rotation: Math.random() * (BACKGROUND_CONFIG.triangles.rotationRange.max - BACKGROUND_CONFIG.triangles.rotationRange.min) + BACKGROUND_CONFIG.triangles.rotationRange.min,
      duration: Math.random() * (BACKGROUND_CONFIG.triangles.durationRange.max - BACKGROUND_CONFIG.triangles.durationRange.min) + BACKGROUND_CONFIG.triangles.durationRange.min,
      delay: Math.random() * (BACKGROUND_CONFIG.triangles.delayRange.max - BACKGROUND_CONFIG.triangles.delayRange.min) + BACKGROUND_CONFIG.triangles.delayRange.min
    }));
  }, []);

  const pixelElements = useMemo<PixelElement[]>(() => {
    return Array.from({ length: BACKGROUND_CONFIG.pixels.count }, (_, i) => ({
      id: i,
      size: Math.random() * (BACKGROUND_CONFIG.pixels.sizeRange.max - BACKGROUND_CONFIG.pixels.sizeRange.min) + BACKGROUND_CONFIG.pixels.sizeRange.min,
      top: Math.random() * (BACKGROUND_CONFIG.pixels.positionRange.max - BACKGROUND_CONFIG.pixels.positionRange.min) + BACKGROUND_CONFIG.pixels.positionRange.min,
      left: Math.random() * (BACKGROUND_CONFIG.pixels.positionRange.max - BACKGROUND_CONFIG.pixels.positionRange.min) + BACKGROUND_CONFIG.pixels.positionRange.min,
      duration: Math.random() * (BACKGROUND_CONFIG.pixels.durationRange.max - BACKGROUND_CONFIG.pixels.durationRange.min) + BACKGROUND_CONFIG.pixels.durationRange.min,
      delay: Math.random() * (BACKGROUND_CONFIG.pixels.delayRange.max - BACKGROUND_CONFIG.pixels.delayRange.min) + BACKGROUND_CONFIG.pixels.delayRange.min
    }));
  }, []);

  const flowLines = useMemo<FlowLine[]>(() => {
    return Array.from({ length: BACKGROUND_CONFIG.flowLines.count }, (_, i) => ({
      id: i,
      height: Math.random() * (BACKGROUND_CONFIG.flowLines.heightRange.max - BACKGROUND_CONFIG.flowLines.heightRange.min) + BACKGROUND_CONFIG.flowLines.heightRange.min,
      width: Math.random() * (BACKGROUND_CONFIG.flowLines.widthRange.max - BACKGROUND_CONFIG.flowLines.widthRange.min) + BACKGROUND_CONFIG.flowLines.widthRange.min,
      top: Math.random() * (BACKGROUND_CONFIG.flowLines.positionRange.max - BACKGROUND_CONFIG.flowLines.positionRange.min) + BACKGROUND_CONFIG.flowLines.positionRange.min,
      left: Math.random() * (BACKGROUND_CONFIG.flowLines.positionRange.max - BACKGROUND_CONFIG.flowLines.positionRange.min) + BACKGROUND_CONFIG.flowLines.positionRange.min,
      rotation: Math.random() * (BACKGROUND_CONFIG.flowLines.rotationRange.max - BACKGROUND_CONFIG.flowLines.rotationRange.min) + BACKGROUND_CONFIG.flowLines.rotationRange.min,
      duration: Math.random() * (BACKGROUND_CONFIG.flowLines.durationRange.max - BACKGROUND_CONFIG.flowLines.durationRange.min) + BACKGROUND_CONFIG.flowLines.durationRange.min,
      delay: Math.random() * (BACKGROUND_CONFIG.flowLines.delayRange.max - BACKGROUND_CONFIG.flowLines.delayRange.min) + BACKGROUND_CONFIG.flowLines.delayRange.min
    }));
  }, []);

  const bubbles = useMemo<Bubble[]>(() => {
    return Array.from({ length: BACKGROUND_CONFIG.bubbles.count }, (_, i) => ({
      id: i,
      size: Math.random() * (BACKGROUND_CONFIG.bubbles.sizeRange.max - BACKGROUND_CONFIG.bubbles.sizeRange.min) + BACKGROUND_CONFIG.bubbles.sizeRange.min,
      left: BACKGROUND_CONFIG.bubbles.positionRange.min + (i * 20) + Math.random() * 10,
      delay: Math.random() * (BACKGROUND_CONFIG.bubbles.delayRange.max - BACKGROUND_CONFIG.bubbles.delayRange.min) + BACKGROUND_CONFIG.bubbles.delayRange.min
    }));
  }, []);

  return (
    <>
      {/* Elementos decorativos de fondo */}
      <div className={`absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-1000 ${isAnimated ? 'opacity-30' : ''}`}>
        <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-[#ff007f]/10 filter blur-[80px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-purple-500/10 filter blur-[100px] animate-pulse-slow animation-delay-1000" />
        <div className="absolute top-[40%] right-[25%] w-40 h-40 rounded-full bg-blue-500/10 filter blur-[60px] animate-pulse-slow animation-delay-2000" />
      </div>
      
      {/* Grid de píxeles decorativo animado */}
      <div 
        className="absolute inset-0 w-full h-full" 
        style={{
          backgroundImage: "radial-gradient(circle, #ff007f 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          opacity: 0.08,
          animation: "pixelPulse 8s infinite alternate"
        }}
      />
      
      {/* Líneas de flujo estilo digital */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {flowLines.map(line => (
          <div 
            key={`line-${line.id}`}
            className="absolute bg-gradient-to-r from-[#ff007f]/5 to-transparent"
            style={{
              height: `${line.height}px`,
              width: `${line.width}%`,
              top: `${line.top}%`,
              left: `${line.left}%`,
              opacity: 0.3,
              transform: `rotate(${line.rotation}deg)`,
              ...DECORATIVE_STYLES.blur,
              animation: `flowLine ${line.duration}s infinite ease-in-out`,
              animationDelay: `${line.delay}s`
            }}
          />
        ))}
        
        {bubbles.map(bubble => (
          <div 
            key={`bubble-${bubble.id}`}
            className="absolute bottom-0 rounded-full bg-[#ff007f]/20 backdrop-blur-md"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              animation: `riseUp 15s infinite ease-in-out`,
              animationDelay: `${bubble.delay}s`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      {/* Elementos digitales decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Triángulos pequeños */}
        {triangleElements.map(triangle => (
          <div 
            key={`triangle-${triangle.id}`}
            className="absolute opacity-20"
            style={{
              width: `${triangle.size}px`,
              height: `${triangle.size}px`,
              top: `${triangle.top}%`,
              left: `${triangle.left}%`,
              borderLeft: `${triangle.size/2}px solid transparent`,
              borderRight: `${triangle.size/2}px solid transparent`,
              borderBottom: `${triangle.size}px solid rgba(255,0,127,0.6)`,
              transform: `rotate(${triangle.rotation}deg)`,
              animation: `spinFloat ${triangle.duration}s infinite linear`,
              animationDelay: `${triangle.delay}s`,
            }}
          />
        ))}

        {/* Píxeles cuadrados */}
        {pixelElements.map(pixel => (
          <div 
            key={`pixel-${pixel.id}`}
            className="absolute bg-[#ff007f]"
            style={{
              width: `${pixel.size}px`,
              height: `${pixel.size}px`,
              top: `${pixel.top}%`,
              left: `${pixel.left}%`,
              opacity: 0.3,
              animation: `pixelFloat ${pixel.duration}s infinite ease-in-out`,
              animationDelay: `${pixel.delay}s`,
            }}
          />
        ))}
      </div>
      
      {/* Fondo decorativo: PIXELA gigante */}
      <span
        className={`pointer-events-none select-none absolute inset-0 w-full h-full flex items-center justify-center font-black uppercase tracking-tighter z-0 leading-none text-transparent transition-opacity duration-1000 ${isAnimated ? 'opacity-40' : 'opacity-0'}`}
        style={{
          lineHeight: 1,
          fontSize: "clamp(200px, 30vw, 500px)",
          letterSpacing: "-0.05em",
          userSelect: "none",
          whiteSpace: "nowrap",
          ...DECORATIVE_STYLES.gradient
        }}
        aria-hidden
      >
        PIXELA
      </span>
    </>
  );
};

export default FooterBackgroundEffects; 