'use client';

import Link from 'next/link';
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

// Definición del tipo de red social
type SocialLink = {
  Icon: React.ElementType;
  label: string;
  title: string;
  href: string;
};

// Array de redes sociales - Extraído para evitar re-renderizados innecesarios
const socialLinks: SocialLink[] = [
  { Icon: FaInstagram, label: "Instagram", title: "Síguenos en Instagram", href: "https://instagram.com/pixela" },
  { Icon: FaXTwitter, label: "X", title: "Síguenos en X (Twitter)", href: "https://x.com/pixela" },
  { Icon: FaYoutube, label: "YouTube", title: "Nuestro canal de YouTube", href: "https://youtube.com/pixela" },
];

// Estilos constantes para las redes sociales
const STYLES = {
  container: "div",
  title: "text-white font-bold text-base md:text-lg mb-3 md:mb-4 relative inline-block [@media(min-width:820px)_and_(max-width:1180px)]:text-base [@media(min-width:820px)_and_(max-width:1180px)]:mb-3",
  titleUnderline: "absolute -bottom-1 left-0 w-8 h-0.5 bg-[#ff007f]/50 rounded-full",
  linksContainer: "flex flex-wrap gap-3 md:gap-5 mt-1 md:mt-2 [@media(min-width:820px)_and_(max-width:1180px)]:gap-3 [@media(min-width:820px)_and_(max-width:1180px)]:mt-1",
  socialLink: "text-white/80 hover:text-[#ff007f] transition-all transform hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#ff007f] rounded-full p-2.5 md:p-3 bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#ff007f]/50 hover:shadow-[0_0_15px_rgba(255,0,127,0.3)] group [@media(min-width:820px)_and_(max-width:1180px)]:p-2.5",
  icon: "transform group-hover:rotate-[360deg] transition-transform duration-500 [@media(min-width:820px)_and_(max-width:1180px)]:text-base"
} as const;

export const FooterSocialLinks = () => {
  return (
    <div>
      <h3 className={STYLES.title}>
        Síguenos
        <div className={STYLES.titleUnderline}></div>
      </h3>
      <div className={STYLES.linksContainer}>
        {socialLinks.map(({ Icon, label, title, href }, index) => (
          <Link
            key={index}
            href={href}
            aria-label={label}
            className={STYLES.socialLink}
            title={title}
            tabIndex={0}
            style={{ 
              transitionDelay: `${index * 50}ms`,
              backdropFilter: "blur(8px)"
            }}
          >
            <Icon size={18} className={STYLES.icon} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterSocialLinks; 