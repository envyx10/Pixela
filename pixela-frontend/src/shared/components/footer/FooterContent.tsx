'use client';

import Link from 'next/link';
import FooterNewsletter from './FooterNewsletter';
import FooterSocialLinks from './FooterSocialLinks';
import { FOOTER_CONTENT } from './constants/footer-content';

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
    <div className="relative z-10 w-full">
      <div className={`w-[83.33%] max-w-7xl mx-auto transition-all duration-700 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Grids principales */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-16 py-16">
          {/* Columna 1: Logo y descripción */}
          <div className="flex flex-col space-y-6 md:col-span-4">
            <div className="flex items-center">
              <div className="relative">
                <span
                  className="tracking-tight font-black font-outfit text-4xl md:text-5xl"
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
            <p className="text-white/80 text-sm max-w-md leading-relaxed mt-2">
              {FOOTER_CONTENT.description}
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-4 mt-3">
              <div className="flex flex-col group">
                <span className="text-white/50 text-xs uppercase tracking-widest group-hover:text-[#ff007f]/80 transition-colors duration-300">Email</span>
                <Link href={`mailto:${FOOTER_CONTENT.contact.email}`} className="text-white hover:text-[#ff007f] transition flex items-center group">
                  {FOOTER_CONTENT.contact.email}
                  <span className="ml-1 transform translate-x-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
                </Link>
              </div>
              <div className="flex flex-col group">
                <span className="text-white/50 text-xs uppercase tracking-widest group-hover:text-[#ff007f]/80 transition-colors duration-300">Ubicación</span>
                <span className="text-white group-hover:text-[#ff007f]/90 transition-colors duration-300">{FOOTER_CONTENT.contact.location}</span>
              </div>
            </div>
          </div>

          {/* Separador para móviles */}
          <div className="h-px w-full bg-white/5 md:hidden my-4"></div>

          {/* Columna 2: Links de exploración */}
          <div className="md:col-span-2 md:col-start-6">
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Explorar
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#ff007f]/50 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              {FOOTER_CONTENT.links.explorer.map((item) => (
                <li key={item.name} className="transform hover:translate-x-1 transition-transform duration-300">
                  <Link 
                    href={item.href}
                    className="text-white/70 hover:text-[#ff007f] transition flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-[#ff007f] mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Links de compañía */}
          <div className="md:col-span-2 mt-8 md:mt-0">
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Compañía
              <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#ff007f]/50 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              {FOOTER_CONTENT.links.company.map((item) => (
                <li key={item.name} className="transform hover:translate-x-1 transition-transform duration-300">
                  <Link 
                    href={item.href}
                    className="text-white/70 hover:text-[#ff007f] transition flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-[#ff007f] mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Separador para móviles */}
          <div className="h-px w-full bg-white/5 md:hidden my-4"></div>

          {/* Columna 4: Newsletter + redes sociales */}
          <div className="flex flex-col space-y-8 md:col-span-4 md:col-start-10">
            <FooterNewsletter />
            <FooterSocialLinks />
          </div>
        </div>

        {/* Copyright */}
        <div className={`pb-12 transition-all duration-700 delay-100 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Pixela.io. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4 mt-3 sm:mt-0">
              <Link href="/cookies" className="text-white/60 hover:text-[#ff007f] text-sm transition-colors">Política de cookies</Link>
              <span className="text-white/20">|</span>
              <Link href="/accesibilidad" className="text-white/60 hover:text-[#ff007f] text-sm transition-colors">Accesibilidad</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContent; 