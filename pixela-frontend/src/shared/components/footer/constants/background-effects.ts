/**
 * Configuración para los elementos decorativos del fondo
 */
export const BACKGROUND_CONFIG = {
  triangles: {
    count: 8,
    sizeRange: { min: 4, max: 10 },
    positionRange: { min: 5, max: 95 },
    rotationRange: { min: 0, max: 360 },
    durationRange: { min: 25, max: 40 },
    delayRange: { min: 0, max: 5 }
  },
  pixels: {
    count: 12,
    sizeRange: { min: 2, max: 5 },
    positionRange: { min: 0, max: 100 },
    durationRange: { min: 20, max: 30 },
    delayRange: { min: 0, max: 5 }
  },
  flowLines: {
    count: 8,
    heightRange: { min: 0.5, max: 1.5 },
    widthRange: { min: 10, max: 25 },
    positionRange: { min: 0, max: 100 },
    rotationRange: { min: -10, max: 10 },
    durationRange: { min: 8, max: 12 },
    delayRange: { min: 0, max: 3 }
  },
  bubbles: {
    count: 5,
    sizeRange: { min: 2, max: 8 },
    positionRange: { min: 5, max: 95 },
    delayRange: { min: 0, max: 5 }
  }
} as const;

/**
 * Estilos comunes para los elementos decorativos
 */
export const DECORATIVE_STYLES = {
  gradient: {
    background: "linear-gradient(135deg, #181818 60%, #ff007f 300%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text"
  },
  blur: {
    filter: "blur(0.5px)"
  }
} as const; 