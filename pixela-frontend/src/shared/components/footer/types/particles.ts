/**
 * Interfaz que define la estructura de una partícula
 */
export interface Particle {
  id: number;
  size: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
}

/**
 * Interfaz que define las opciones de configuración para generar partículas
 */
export interface ParticleOptions {
  minSize: number;
  maxSize: number;
  minDuration: number;
  maxDuration: number;
  opacity?: number;
}

/**
 * Tipo que define las diferentes categorías de partículas
 */
export type ParticleCategory = 'small' | 'medium' | 'glow'; 