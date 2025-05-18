'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { HiArrowRight } from 'react-icons/hi';
import FooterNewsletter from './FooterNewsletter';
import FooterSocialLinks from './FooterSocialLinks';
import { FOOTER_CONTENT } from './constants/footer-content';

const STYLES = {
  container: 'relative z-10 w-full',
  contentWrapper: 'w-[83.33%] max-w-7xl mx-auto transition-all duration-700',
  animatedContent: 'opacity-100 translate-y-0',
  hiddenContent: 'opacity-0 translate-y-10',
  mainGrid: 'grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-16 py-16',
  logoColumn: 'flex flex-col space-y-6 md:col-span-4',
  logoContainer: 'flex items-center',
  logoWrapper: 'relative',
  logo: 'tracking-tight font-black font-outfit text-4xl md:text-5xl',
  description: 'text-white/80 text-sm max-w-md leading-relaxed mt-2',
  contactContainer: 'flex flex-wrap gap-x-8 gap-y-4 mt-3',
  contactGroup: 'flex flex-col group',
  contactLabel: 'text-white/50 text-xs uppercase tracking-widest group-hover:text-[#ff007f]/80 transition-colors duration-300',
  contactLink: 'text-white hover:text-[#ff007f] transition flex items-center group',
  contactArrow: 'ml-1 transform translate-x-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300',
  contactText: 'text-white group-hover:text-[#ff007f]/90 transition-colors duration-300',
  mobileDivider: 'h-px w-full bg-white/5 md:hidden my-4',
  linksColumn: 'md:col-span-2 md:col-start-6',
  linksTitle: 'text-white font-bold text-lg mb-6 relative inline-block',
  linksUnderline: 'absolute -bottom-1 left-0 w-8 h-0.5 bg-[#ff007f]/50 rounded-full',
  linksList: 'space-y-4',
  linkItem: 'transform hover:translate-x-1 transition-transform duration-300',
  link: 'text-white/70 hover:text-[#ff007f] transition flex items-center group',
  linkIndicator: 'w-0 h-0.5 bg-[#ff007f] mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300',
  companyColumn: 'md:col-span-2 mt-8 md:mt-0',
  newsletterColumn: 'flex flex-col space-y-8 md:col-span-4 md:col-start-10',
  copyright: 'pb-12 transition-all duration-700 delay-100',
  copyrightContainer: 'flex flex-col sm:flex-row justify-between items-center',
  copyrightText: 'text-white/60 text-sm',
  copyrightLinks: 'flex space-x-4 mt-3 sm:mt-0',
  copyrightLink: 'text-white/60 hover:text-[#ff007f] text-sm transition-colors',
  copyrightDivider: 'text-white/20'
} as const;

type FooterContentProps = {
  isAnimated: boolean;
};

/**
 * Componente principal del footer que contiene toda la estructura y contenido
 * @param {FooterContentProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente de footer
 */
export const FooterContent: React.FC<FooterContentProps> = ({ isAnimated }) => {
  return (
    <div className={STYLES.container}>
      <div className={clsx(STYLES.contentWrapper, isAnimated ? STYLES.animatedContent : STYLES.hiddenContent)}>
        {/* Grids principales */}
        <div className={STYLES.mainGrid}>
          {/* Columna 1: Logo y descripción */}
          <div className={STYLES.logoColumn}>
            <div className={STYLES.logoContainer}>
              <div className={STYLES.logoWrapper}>
                <span
                  className={STYLES.logo}
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
              {FOOTER_CONTENT.description}
            </p>
            <div className={STYLES.contactContainer}>
              <div className={STYLES.contactGroup}>
                <span className={STYLES.contactLabel}>Email</span>
                <Link href={`mailto:${FOOTER_CONTENT.contact.email}`} className={STYLES.contactLink}>
                  {FOOTER_CONTENT.contact.email}
                  <HiArrowRight className={STYLES.contactArrow} />
                </Link>
              </div>
              <div className={STYLES.contactGroup}>
                <span className={STYLES.contactLabel}>Ubicación</span>
                <span className={STYLES.contactText}>{FOOTER_CONTENT.contact.location}</span>
              </div>
            </div>
          </div>

          {/* Separador para móviles */}
          <div className={STYLES.mobileDivider}></div>

          {/* Columna 2: Links de exploración */}
          <div className={STYLES.linksColumn}>
            <h3 className={STYLES.linksTitle}>
              Explorar
              <div className={STYLES.linksUnderline}></div>
            </h3>
            <ul className={STYLES.linksList}>
              {FOOTER_CONTENT.links.explorer.map((item) => (
                <li key={item.name} className={STYLES.linkItem}>
                  <Link 
                    href={item.href}
                    className={STYLES.link}
                  >
                    <span className={STYLES.linkIndicator}></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Links de compañía */}
          <div className={STYLES.companyColumn}>
            <h3 className={STYLES.linksTitle}>
              Compañía
              <div className={STYLES.linksUnderline}></div>
            </h3>
            <ul className={STYLES.linksList}>
              {FOOTER_CONTENT.links.company.map((item) => (
                <li key={item.name} className={STYLES.linkItem}>
                  <Link 
                    href={item.href}
                    className={STYLES.link}
                  >
                    <span className={STYLES.linkIndicator}></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Separador para móviles */}
          <div className={STYLES.mobileDivider}></div>

          {/* Columna 4: Newsletter + redes sociales */}
          <div className={STYLES.newsletterColumn}>
            <FooterNewsletter />
            <FooterSocialLinks />
          </div>
        </div>

        {/* Copyright */}
        <div className={clsx(STYLES.copyright, isAnimated ? STYLES.animatedContent : STYLES.hiddenContent)}>
          <div className={STYLES.copyrightContainer}>
            <p className={STYLES.copyrightText}>
              © {new Date().getFullYear()} Pixela.io. Todos los derechos reservados.
            </p>
            <div className={STYLES.copyrightLinks}>
              <Link href="/cookies" className={STYLES.copyrightLink}>Política de cookies</Link>
              <span className={STYLES.copyrightDivider}>|</span>
              <Link href="/accesibilidad" className={STYLES.copyrightLink}>Accesibilidad</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContent; 