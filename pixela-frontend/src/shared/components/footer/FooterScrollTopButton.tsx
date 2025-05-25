'use client';

import { IoIosArrowUp } from "react-icons/io";

type ScrollTopButtonProps = {
  showScrollButton: boolean;
};

const STYLES = {
  button: "fixed md:absolute right-6 bottom-6 md:bottom-8 z-20 border border-[#ff007f]/50 bg-black/60 backdrop-blur-md hover:bg-[#ff007f] text-white rounded-full p-3 shadow-lg shadow-[#ff007f]/10 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#ff007f] overflow-hidden",
  buttonVisible: "opacity-100 translate-y-0 scale-100",
  buttonHidden: "opacity-0 translate-y-10 scale-90 pointer-events-none",
  icon: "relative z-10 transition-transform duration-300 group-hover:scale-110",
  gradient: "absolute inset-0 bg-gradient-to-br from-[#ff007f] to-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
} as const;

export const FooterScrollTopButton: React.FC<ScrollTopButtonProps> = ({ showScrollButton }) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className={`${STYLES.button} ${
        showScrollButton ? STYLES.buttonVisible : STYLES.buttonHidden
      }`}
      aria-label="Volver arriba"
    >
      <IoIosArrowUp className={STYLES.icon} size={22} />
      <div className={STYLES.gradient}></div>
    </button>
  );
};

export default FooterScrollTopButton; 