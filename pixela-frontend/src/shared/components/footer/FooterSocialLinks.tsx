'use client';

import Link from 'next/link';
import { FOOTER_CONTENT } from './constants/footer-content';

const STYLES = {
  container: 'flex flex-col',
  title: 'text-white font-bold text-lg mb-4 relative inline-block',
  titleUnderline: 'absolute -bottom-1 left-0 w-8 h-0.5 bg-[#ff007f]/50 rounded-full',
  linksContainer: 'flex flex-wrap gap-5 mt-2',
  link: 'text-white/80 hover:text-[#ff007f] transition-all transform hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#ff007f] rounded-full p-3 bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#ff007f]/50 hover:shadow-[0_0_15px_rgba(255,0,127,0.3)] group',
  icon: 'transform group-hover:rotate-[360deg] transition-transform duration-500'
} as const;

/**
 * Componente que renderiza los enlaces a redes sociales del footer
 * @returns {JSX.Element} Componente de enlaces sociales
 */
export const FooterSocialLinks = () => {
  return (
    <div className={STYLES.container}>
      <h3 className={STYLES.title}>
        Síguenos
        <div className={STYLES.titleUnderline}></div>
      </h3>
      <div className={STYLES.linksContainer}>
        {FOOTER_CONTENT.links.social.map(({ Icon, label, title, href }, index) => (
          <Link
            key={label}
            href={href}
            aria-label={label}
            className={STYLES.link}
            title={title}
            tabIndex={0}
            style={{ 
              transitionDelay: `${index * 50}ms`,
              backdropFilter: "blur(8px)"
            }}
          >
            <Icon size={20} className={STYLES.icon} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterSocialLinks; 