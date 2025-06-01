'use client';

import Link from 'next/link';
import FooterNewsletter from './FooterNewsletter';
import FooterSocialLinks from './FooterSocialLinks';

// Definición de enlaces para menús
type FooterLink = {
  name: string;
  href: string;
};

// Enlaces para las columnas - Extraídos como constantes para evitar re-creación en cada render
const explorerLinks: FooterLink[] = [
  { name: "Inicio", href: "/" },
  { name: "Tendencias", href: "/" },
  { name: "Categorías", href: "/" },

];

const companyLinks: FooterLink[] = [
  { name: "Sobre nosotros", href: "/sobre-nosotros" },
  { name: "Privacidad", href: "/privacidad" },
  { name: "Términos", href: "/terminos" },
  { name: "Contacto", href: "/contacto" }
];

// Estilos constantes para el footer
const STYLES = {
  container: "relative z-10 w-full",
  wrapper: "w-[83.33%] max-w-7xl mx-auto transition-all duration-700 [@media(min-width:820px)_and_(max-width:1180px)]:w-[90%]",
  mainGrid: "grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-8 md:gap-y-16 py-8 md:py-16 [@media(min-width:820px)_and_(max-width:1180px)]:grid-cols-8 [@media(min-width:820px)_and_(max-width:1180px)]:gap-x-8 [@media(min-width:820px)_and_(max-width:1180px)]:gap-y-12 [@media(min-width:820px)_and_(max-width:1180px)]:py-12",
  logoSection: "flex flex-col space-y-4 md:space-y-6 md:col-span-4 [@media(min-width:820px)_and_(max-width:1180px)]:col-span-8 [@media(min-width:820px)_and_(max-width:1180px)]:space-y-4",
  logoContainer: "flex items-center",
  logoWrapper: "relative",
  logoText: "tracking-tight font-black font-outfit text-3xl md:text-5xl [@media(min-width:820px)_and_(max-width:1180px)]:text-4xl",
  description: "text-white/80 text-sm md:text-base max-w-md lg:max-w-2xl xl:max-w-xl leading-relaxed mt-2 [@media(min-width:820px)_and_(max-width:1180px)]:text-sm [@media(min-width:820px)_and_(max-width:1180px)]:max-w-none [@media(min-width:820px)_and_(max-width:1180px)]:leading-normal",
  contactContainer: "flex flex-wrap gap-x-6 md:gap-x-8 gap-y-3 md:gap-y-4 mt-2 md:mt-3 [@media(min-width:820px)_and_(max-width:1180px)]:gap-x-6 [@media(min-width:820px)_and_(max-width:1180px)]:gap-y-3",
  contactGroup: "flex flex-col group",
  contactLabel: "text-white/50 text-xs uppercase tracking-widest group-hover:text-[#ff007f]/80 transition-colors duration-300",
  contactLink: "text-white hover:text-[#ff007f] transition flex items-center group",
  contactArrow: "ml-1 transform translate-x-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300",
  contactText: "text-white group-hover:text-[#ff007f]/90 transition-colors duration-300",
  mobileSeparator: "h-px w-full bg-white/5 md:hidden my-4",
  linksContainer: "grid grid-cols-2 gap-25 md:contents [@media(min-width:820px)_and_(max-width:1180px)]:contents",
  exploreSection: "md:col-span-2 md:col-start-6 text-left [@media(min-width:820px)_and_(max-width:1180px)]:col-span-3 [@media(min-width:820px)_and_(max-width:1180px)]:col-start-1",
  exploreTitle: "text-white font-bold text-base md:text-lg mb-4 md:mb-6 relative inline-block [@media(min-width:820px)_and_(max-width:1180px)]:text-base [@media(min-width:820px)_and_(max-width:1180px)]:mb-4",
  titleUnderline: "absolute -bottom-1 left-0 w-8 h-0.5 bg-[#ff007f]/50 rounded-full",
  exploreList: "space-y-4 [@media(min-width:820px)_and_(max-width:1180px)]:space-y-3",
  linkItem: "transform hover:translate-x-1 transition-transform duration-300",
  linkText: "text-white/70 hover:text-[#ff007f] transition flex items-center justify-start group",
  linkIndicator: "w-0 h-0.5 bg-[#ff007f] mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300",
  companySection: "md:col-span-2 text-left ml-auto [@media(min-width:820px)_and_(max-width:1180px)]:col-span-3 [@media(min-width:820px)_and_(max-width:1180px)]:col-start-4 [@media(min-width:820px)_and_(max-width:1180px)]:ml-0",
  companyTitle: "text-white font-bold text-base md:text-lg mb-4 md:mb-6 relative inline-block [@media(min-width:820px)_and_(max-width:1180px)]:text-base [@media(min-width:820px)_and_(max-width:1180px)]:mb-4",
  companyList: "space-y-4 [@media(min-width:820px)_and_(max-width:1180px)]:space-y-3",
  socialSection: "flex flex-col space-y-6 md:space-y-8 md:col-span-4 md:col-start-10 mt-6 md:mt-0 [@media(min-width:820px)_and_(max-width:1180px)]:col-span-2 [@media(min-width:820px)_and_(max-width:1180px)]:col-start-7 [@media(min-width:820px)_and_(max-width:1180px)]:space-y-5 [@media(min-width:820px)_and_(max-width:1180px)]:mt-0",
  copyrightSection: "pb-8 md:pb-12 transition-all duration-700 delay-100 [@media(min-width:820px)_and_(max-width:1180px)]:pb-10",
  copyrightContainer: "flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 [@media(min-width:820px)_and_(max-width:1180px)]:gap-3",
  copyrightText: "text-white/60 text-xs md:text-sm text-center sm:text-left [@media(min-width:820px)_and_(max-width:1180px)]:text-xs",
  copyrightLinks: "flex flex-wrap justify-center sm:justify-end gap-x-4 gap-y-2 [@media(min-width:820px)_and_(max-width:1180px)]:gap-x-3",
  copyrightLink: "text-white/60 hover:text-[#ff007f] text-xs md:text-sm transition-colors [@media(min-width:820px)_and_(max-width:1180px)]:text-xs",
  copyrightSeparator: "text-white/20 hidden sm:inline"
} as const;

type FooterContentProps = {
  isAnimated: boolean;
};

export const FooterContent: React.FC<FooterContentProps> = ({ isAnimated }) => {
  return (
    <div className={STYLES.container}>
      <div className={`${STYLES.wrapper} ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Grids principales */}
        <div className={STYLES.mainGrid}>
          {/* Columna 1: Logo y descripción */}
          <div className={STYLES.logoSection}>
            <div className={STYLES.logoContainer}>
              <div className={STYLES.logoWrapper}>
                <span
                  className={STYLES.logoText}
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    background: "linear-gradient(to right, #ff007f, #ff00ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  PIXELA
                </span>
              </div>
            </div>
            <p className={STYLES.description}>
              Descubriendo historias que nos conectan. Pixela une a los amantes del cine y las series en una experiencia visual donde compartir, opinar y disfrutar del séptimo arte es parte del viaje.
            </p>
            <div className={STYLES.contactContainer}>
              <div className={STYLES.contactGroup}>
                <span className={STYLES.contactLabel}>Email</span>
                <Link href="mailto:pixel@pixela.io" className={STYLES.contactLink}>
                  pixel@pixela.io
                  <span className={STYLES.contactArrow}>→</span>
                </Link>
              </div>
              <div className={STYLES.contactGroup}>
                <span className={STYLES.contactLabel}>Ubicación</span>
                <span className={STYLES.contactText}>Málaga, España</span>
              </div>
            </div>
          </div>

          {/* Separador para móviles */}
          <div className={STYLES.mobileSeparator}></div>

          {/* Contenedor para Explorar y Compañía */}
          <div className={STYLES.linksContainer}>
            {/* Columna 2: Links de exploración */}
            <div className={STYLES.exploreSection}>
              <h3 className={STYLES.exploreTitle}>
                Explorar
                <div className={STYLES.titleUnderline}></div>
              </h3>
              <ul className={STYLES.exploreList}>
                {explorerLinks.map((item, index) => (
                  <li key={index} className={STYLES.linkItem}>
                    <Link 
                      href={item.href}
                      className={STYLES.linkText}
                    >
                      <span className={STYLES.linkIndicator}></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna 3: Links de compañía */}
            <div className={STYLES.companySection}>
              <h3 className={STYLES.companyTitle}>
                Compañía
                <div className={STYLES.titleUnderline}></div>
              </h3>
              <ul className={STYLES.companyList}>
                {companyLinks.map((item, index) => (
                  <li key={index} className={STYLES.linkItem}>
                    <Link 
                      href={item.href}
                      className={STYLES.linkText}
                    >
                      <span className={STYLES.linkIndicator}></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Separador para móviles */}
          <div className={STYLES.mobileSeparator}></div>

          {/* Columna 4: Newsletter + redes sociales */}
          <div className={STYLES.socialSection}>
            <FooterNewsletter />
            <FooterSocialLinks />
          </div>
        </div>

        {/* Copyright */}
        <div className={`${STYLES.copyrightSection} ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className={STYLES.copyrightContainer}>
            <p className={STYLES.copyrightText}>
              © 2025 Pixela.io. Todos los derechos reservados.
            </p>
            <div className={STYLES.copyrightLinks}>
              <Link href="/cookies" className={STYLES.copyrightLink}>Política de cookies</Link>
              <span className={STYLES.copyrightSeparator}>|</span>
              <Link href="/accesibilidad" className={STYLES.copyrightLink}>Accesibilidad</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContent; 