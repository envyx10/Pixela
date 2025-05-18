'use client';

import { IoIosArrowUp } from "react-icons/io";
import clsx from 'clsx';
import { ScrollTopButtonProps } from './types/scroll-top-button';
import { SCROLL_CONFIG } from './constants/scroll-top-button';

const STYLES = {
  button: {
    base: 'fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[#ff007f] text-white shadow-lg hover:bg-[#ff00a2] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff007f] group overflow-hidden',
    visible: 'opacity-100 translate-y-0',
    hidden: 'opacity-0 translate-y-10 pointer-events-none'
  },
  icon: 'relative z-10 transition-transform duration-300 group-hover:-translate-y-1',
  gradient: 'absolute inset-0 bg-gradient-to-r from-[#ff007f] to-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300'
} as const;

/**
 * Componente que renderiza un botón para volver al inicio de la página
 * @param {ScrollTopButtonProps} props - Propiedades del componente
 * @returns {JSX.Element} Botón de scroll
 */
export const FooterScrollTopButton = ({ showScrollButton }: ScrollTopButtonProps) => {
  /**
   * Maneja el evento de click para scroll al inicio de la página
   */
  const handleScrollToTop = () => {
    window.scrollTo(SCROLL_CONFIG);
  };

  return (
    <button
      onClick={handleScrollToTop}
      className={clsx(
        STYLES.button.base,
        showScrollButton ? STYLES.button.visible : STYLES.button.hidden
      )}
      aria-label="Volver arriba"
    >
      <IoIosArrowUp 
        className={STYLES.icon} 
        size={22} 
      />
      <div className={STYLES.gradient} />
    </button>
  );
};

export default FooterScrollTopButton; 