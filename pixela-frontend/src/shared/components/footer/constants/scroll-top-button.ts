/**
 * Configuración de estilos para el botón de scroll
 */
export const SCROLL_BUTTON_STYLES = {
  base: 'fixed md:absolute right-6 bottom-6 md:bottom-8 z-20 border border-[#ff007f]/50 bg-black/60 backdrop-blur-md hover:bg-[#ff007f] text-white rounded-full p-3 shadow-lg shadow-[#ff007f]/10 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#ff007f] overflow-hidden',
  visible: 'opacity-100 translate-y-0 scale-100',
  hidden: 'opacity-0 translate-y-10 scale-90 pointer-events-none',
  icon: 'relative z-10 transition-transform duration-300 group-hover:scale-110',
  gradient: 'absolute inset-0 bg-gradient-to-br from-[#ff007f] to-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300'
} as const;

/**
 * Configuración de scroll
 */
export const SCROLL_CONFIG = {
  top: 0,
  behavior: 'smooth' as const
} as const; 