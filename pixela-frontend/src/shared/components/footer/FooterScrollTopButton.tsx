'use client';

import { IoIosArrowUp } from "react-icons/io";
import { ScrollTopButtonProps } from './types/scroll-top-button';
import { SCROLL_BUTTON_STYLES, SCROLL_CONFIG } from './constants/scroll-top-button';

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
      className={`${SCROLL_BUTTON_STYLES.base} ${
        showScrollButton ? SCROLL_BUTTON_STYLES.visible : SCROLL_BUTTON_STYLES.hidden
      }`}
      aria-label="Volver arriba"
    >
      <IoIosArrowUp 
        className={SCROLL_BUTTON_STYLES.icon} 
        size={22} 
      />
      <div className={SCROLL_BUTTON_STYLES.gradient} />
    </button>
  );
};

export default FooterScrollTopButton; 