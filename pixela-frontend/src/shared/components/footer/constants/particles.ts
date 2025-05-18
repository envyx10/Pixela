import { ParticleOptions } from '../types/particles';

/**
 * Configuración de las partículas pequeñas
 */
export const SMALL_PARTICLES_CONFIG: ParticleOptions = {
  minSize: 1,
  maxSize: 3,
  minDuration: 20,
  maxDuration: 40,
  opacity: 0.4
};

/**
 * Configuración de las partículas medianas
 */
export const MEDIUM_PARTICLES_CONFIG: ParticleOptions = {
  minSize: 3,
  maxSize: 6,
  minDuration: 25,
  maxDuration: 35
};

/**
 * Configuración de las partículas con efecto de brillo
 */
export const GLOW_PARTICLES_CONFIG: ParticleOptions = {
  minSize: 4,
  maxSize: 8,
  minDuration: 15,
  maxDuration: 25,
  opacity: 0.2
};

/**
 * Cantidad de partículas por categoría
 */
export const PARTICLE_COUNTS = {
  small: 15,
  medium: 10,
  glow: 6
} as const; 