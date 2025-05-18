/**
 * Props para el componente FooterScrollTopButton
 */
export interface ScrollTopButtonProps {
  /** Indica si el botón debe mostrarse */
  showScrollButton: boolean;
}

/**
 * Configuración de scroll
 */
export interface ScrollConfig {
  /** Posición vertical a la que scroll */
  top: number;
  /** Comportamiento del scroll */
  behavior: ScrollBehavior;
} 