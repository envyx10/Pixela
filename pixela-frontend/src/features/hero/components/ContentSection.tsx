import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { HeroContent } from "../type";
import clsx from "clsx";

const styles = {
  accentLine: {
    base: "w-24 h-1 bg-pixela-accent",
    withMargin: "mb-8"
  },
  heroTitle: {
    base: "text-7xl font-bold text-pixela-light mb-6 tracking-tight leading-[1.1]",
    accent: "text-pixela-accent"
  },
  secondaryButton: {
    base: "group flex items-center transition-all duration-300",
    text: "font-medium text-pixela-light group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.7)] transition-all duration-300 mr-2",
    icon: "h-6 w-6 animate-bounce text-pixela-light group-hover:text-pixela-accent opacity-80 group-hover:opacity-100"
  },
  contentSection: {
    base: "absolute inset-x-0 bottom-0 z-10",
    container: "max-w-[83.333%] mx-auto pb-36",
    description: "text-xl text-pixela-light/80 max-w-lg mb-12",
    buttonsContainer: "flex items-center gap-8"
  }
} as const;

/**
 * Props para el componente AccentLine
 */
interface AccentLineProps {
  className?: string;
}

/**
 * Componente que muestra una línea de acento decorativa
 */
const AccentLine = ({ className }: AccentLineProps) => (
  <div className={clsx(styles.accentLine.base, className)} />
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
  <h1 className={styles.heroTitle.base}>
    {title}<br />
    <span className={styles.heroTitle.accent}>{accentTitle}</span>
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
    className={styles.secondaryButton.base}
  >
    <span className={styles.secondaryButton.text}>
      {text}
    </span>
    <FiChevronDown className={styles.secondaryButton.icon} />
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
    <div className={styles.contentSection.base}>
      <div className={styles.contentSection.container}>
        <AccentLine className={styles.accentLine.withMargin} />
        
        <HeroTitle 
          title={title} 
          accentTitle={accentTitle} 
        />
        
        <p className={styles.contentSection.description}>
          {description}
        </p>
        
        <div className={styles.contentSection.buttonsContainer}>
          <SecondaryButton 
            text={secondaryButtonText} 
            href="#tendencias" 
          />
        </div>
      </div>
    </div>
  );
}; 