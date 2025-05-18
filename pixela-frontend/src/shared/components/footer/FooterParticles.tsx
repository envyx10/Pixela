import { useMemo } from 'react';
import { Particle, ParticleCategory, ParticleOptions } from './types/particles';
import { 
  SMALL_PARTICLES_CONFIG, 
  MEDIUM_PARTICLES_CONFIG, 
  GLOW_PARTICLES_CONFIG,
  PARTICLE_COUNTS 
} from './constants/particles';

const STYLES = {
  container: 'absolute inset-0 w-full h-full overflow-hidden',
  particle: {
    small: 'absolute rounded-full bg-[#ff007f]',
    medium: 'absolute rounded-full bg-gradient-to-r from-[#ff007f]/60 to-[#ff00ff]/60',
    glow: 'absolute rounded-full'
  }
} as const;

/**
 * Genera un array de partículas basado en la configuración proporcionada
 * @param count - Número de partículas a generar
 * @param options - Configuración de las partículas
 * @returns Array de partículas generadas
 */
const generateParticles = (count: number, options: ParticleOptions): Particle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * (options.maxSize - options.minSize) + options.minSize,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * (options.maxDuration - options.minDuration) + options.minDuration,
    opacity: options.opacity ?? (Math.random() * 0.5 + 0.2)
  }));
};

/**
 * Renderiza una partícula individual con sus estilos y animaciones
 * @param particle - Datos de la partícula a renderizar
 * @param category - Categoría de la partícula (small, medium, glow)
 * @returns Elemento JSX de la partícula
 */
const ParticleElement = ({ particle, category }: { particle: Particle; category: ParticleCategory }) => {
  const getParticleStyles = () => {
    const baseStyles = {
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      top: `${particle.top}%`,
      left: `${particle.left}%`,
      opacity: particle.opacity,
      animationDelay: `${particle.delay}s`,
      willChange: 'transform, opacity, scale, filter'
    };

    switch (category) {
      case 'small':
        return {
          ...baseStyles,
          animation: `floatParticle ${particle.duration}s infinite ease-in-out`,
          className: STYLES.particle.small
        };
      case 'medium':
        return {
          ...baseStyles,
          animation: `pulseAndFloat ${particle.duration}s infinite ease-in-out`,
          className: STYLES.particle.medium
        };
      case 'glow':
        return {
          ...baseStyles,
          animation: `glowAndFloat ${particle.duration}s infinite ease-in-out`,
          className: STYLES.particle.glow,
          background: 'radial-gradient(circle, rgba(255,0,127,0.8) 0%, rgba(255,0,127,0) 70%)',
          filter: 'blur(1px)'
        };
    }
  };

  const styles = getParticleStyles();
  return (
    <div 
      key={`${category}-${particle.id}`}
      className={styles.className}
      style={styles}
    />
  );
};

/**
 * Componente que renderiza un conjunto de partículas animadas en el footer
 * @returns {JSX.Element} Componente de partículas del footer
 */
export const FooterParticles = () => {
  const particles = useMemo(() => ({
    small: generateParticles(PARTICLE_COUNTS.small, SMALL_PARTICLES_CONFIG),
    medium: generateParticles(PARTICLE_COUNTS.medium, MEDIUM_PARTICLES_CONFIG),
    glow: generateParticles(PARTICLE_COUNTS.glow, GLOW_PARTICLES_CONFIG)
  }), []);

  return (
    <div className={STYLES.container}>
      {Object.entries(particles).map(([category, particleList]) => 
        particleList.map(particle => (
          <ParticleElement 
            key={`${category}-${particle.id}`}
            particle={particle}
            category={category as ParticleCategory}
          />
        ))
      )}
    </div>
  );
};

export default FooterParticles; 