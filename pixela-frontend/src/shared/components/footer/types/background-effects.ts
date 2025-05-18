/**
 * Propiedades del componente de efectos de fondo
 */
export interface BackgroundEffectProps {
  isAnimated: boolean;
}

/**
 * Interfaz para los elementos triangulares decorativos
 */
export interface TriangleElement {
  id: number;
  size: number;
  top: number;
  left: number;
  rotation: number;
  duration: number;
  delay: number;
}

/**
 * Interfaz para los elementos de píxeles decorativos
 */
export interface PixelElement {
  id: number;
  size: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
}

/**
 * Interfaz para las líneas de flujo decorativas
 */
export interface FlowLine {
  id: number;
  height: number;
  width: number;
  top: number;
  left: number;
  rotation: number;
  duration: number;
  delay: number;
}

/**
 * Interfaz para los elementos de burbujas decorativas
 */
export interface Bubble {
  id: number;
  size: number;
  left: number;
  delay: number;
} 