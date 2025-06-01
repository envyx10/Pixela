'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ParticleFieldProps {
  particleCount?: number;
  colors?: string[];
  className?: string;
}

const ParticleField: React.FC<ParticleFieldProps> = ({
  particleCount = 20,
  colors = ['#EC1B69', '#FFFFFF'],
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particles: HTMLDivElement[] = [];

    // Crear partículas minimalistas estilo Pixela
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full pointer-events-none';
      
      // Tamaños más pequeños y sutiles
      const size = Math.random() * 3 + 1; // 1-4px
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Solo usar colores de Pixela
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.backgroundColor = color;
      particle.style.opacity = `${Math.random() * 0.4 + 0.1}`; // 0.1-0.5 para más sutil
      
      // Posición inicial aleatoria
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      container.appendChild(particle);
      particles.push(particle);
    }

    // Animaciones sutiles estilo Pixela
    const ctx = gsap.context(() => {
      particles.forEach((particle, index) => {
        // Floating muy sutil
        gsap.to(particle, {
          y: Math.random() * 20 - 10,
          x: Math.random() * 15 - 7.5,
          duration: Math.random() * 4 + 4, // 4-8 segundos
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.2
        });

        // Opacity pulse muy sutil
        gsap.to(particle, {
          opacity: Math.random() * 0.3 + 0.2,
          duration: Math.random() * 3 + 3, // 3-6 segundos
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 2
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      // Limpiar partículas
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, [particleCount, colors]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleField; 