/**
 * Tipos para el componente FooterBackgroundEffects 
 * @type
 * @returns {BackgroundEffectProps}
 * @description Propiedades para el componente FooterBackgroundEffects
 * @param {boolean} isAnimated - Indica si el componente debe estar animado
 * @returns {BackgroundEffectProps} 
 */
export type BackgroundEffectProps = {
  isAnimated: boolean;
};

/**
 * Tipos para las partículas del footer
 * @type
 * @returns {Particle}
 * @returns {ParticleOptions}
 * @description Tipos relacionados con las partículas animadas del footer
 */
export type Particle = {
  id: number;
  size: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
};

/**
 * Tipos para las opciones de las partículas del footer
 * @type
 * @returns {ParticleOptions}
 * @description Tipos relacionados con las opciones de las partículas animadas del footer
 */
export type ParticleOptions = {
  minSize: number;
  maxSize: number;
  minDuration: number;
  maxDuration: number;
  opacity?: number;
};

/**
 * Tipos para el botón de scroll al inicio
 * @type
 * @returns {ScrollTopButtonProps}
 * @description Propiedades para el botón de scroll al inicio del footer
 */
export type ScrollTopButtonProps = {
  showScrollButton: boolean;
}; 