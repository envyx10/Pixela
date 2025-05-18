import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { HeroContent } from "../type";

/**
 * Props para el componente AccentLine
 */
interface AccentLineProps {
  className?: string;
}

/**
 * Componente que muestra una línea de acento decorativa
 */
const AccentLine = ({ className = "" }: AccentLineProps) => (
  <div className={`w-24 h-1 bg-pixela-accent ${className}`} />
);

/**
 * Props para el componente HeroTitle
 */
interface HeroTitleProps {
  title: string;
  accentTitle: string;
}

/**
 * Componente que muestra el título principal del hero
 */
const HeroTitle = ({ title, accentTitle }: HeroTitleProps) => (
  <h1 className="text-7xl font-bold text-pixela-light mb-6 tracking-tight leading-[1.1]">
    {title}<br />
    <span className="text-pixela-accent">{accentTitle}</span>
  </h1>
);

/**
 * Props para el componente SecondaryButton
 */
interface SecondaryButtonProps {
  text: string;
  href: string;
}

/**
 * Componente que muestra el botón secundario con animación
 */
const SecondaryButton = ({ text, href }: SecondaryButtonProps) => (
  <Link 
    href={href}
    className="group flex items-center transition-all duration-300"
  >
    <span className="font-medium text-pixela-light group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.7)] transition-all duration-300 mr-2">
      {text}
    </span>
    <FiChevronDown className="h-6 w-6 animate-bounce text-pixela-light group-hover:text-pixela-accent opacity-80 group-hover:opacity-100" />
  </Link>
);

/**
 * Componente que muestra la sección de contenido del hero
 * Incluye título, descripción y botones de acción
 */
export const ContentSection = ({
  title,
  accentTitle,
  description,
  secondaryButtonText,
}: HeroContent) => {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10">
      <div className="max-w-[83.333%] mx-auto pb-36">
        <AccentLine className="mb-8" />
        
        <HeroTitle 
          title={title} 
          accentTitle={accentTitle} 
        />
        
        <p className="text-xl text-pixela-light/80 max-w-lg mb-12">
          {description}
        </p>
        
        <div className="flex items-center gap-8">
          <SecondaryButton 
            text={secondaryButtonText} 
            href="#tendencias" 
          />
        </div>
      </div>
    </div>
  );
}; 