import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import {
  HeroContent,
  HeroTitleProps,
  AccentLineProps,
  SecondaryButtonProps,
  HeroImage,
} from "@/features/hero/types/content";
import clsx from "clsx";
import { ProgressIndicator } from "@/features/hero/components/ui/ProgressIndicator";

const STYLES = {
  // Línea decorativa de acento
  accentLine: {
    base: "w-16 md:w-24 lg:w-24 h-1 bg-pixela-accent",
    withMargin: "mb-4 md:mb-6 lg:mb-8",
  },

  // Título principal del hero
  heroTitle: {
    base: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2k:text-8xl font-bold text-pixela-light mb-4 md:mb-5 lg:mb-6 2k:mb-4 tracking-tight leading-[1.1] drop-shadow-sm",
    accent: "text-pixela-accent",
  },

  // Botón secundario con animación
  secondaryButton: {
    base: "group flex items-center transition-all duration-300",
    text: "font-medium text-pixela-light group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.7)] transition-all duration-300 mr-2 text-sm sm:text-base lg:text-base",
    icon: "h-5 w-5 sm:h-5 sm:w-5 lg:h-6 lg:w-6 animate-bounce text-pixela-light group-hover:text-pixela-accent opacity-80 group-hover:opacity-100",
  },

  // Sección de contenido principal
  contentSection: {
    base: "absolute inset-x-0 bottom-0 z-10 px-4 sm:px-5 md:px-6 lg:px-0 2k:px-8",
    container:
      "w-full max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-[83.333%] 2k:max-w-[60%] mx-auto pb-20 sm:pb-24 md:pb-28 lg:pb-36 2k:pb-24",
    description:
      "text-base sm:text-lg md:text-lg lg:text-xl 2k:text-2xl text-pixela-light/80 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-lg 2k:max-w-2xl mb-6 md:mb-8 lg:mb-12 2k:mb-8 drop-shadow-sm backdrop-blur-[2px] sm:backdrop-blur-0",
    buttonsContainer:
      "flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:gap-8 2k:gap-6 ipad:flex-col ipad:items-start ipad:gap-6",
    buttonWrapper: "ipad:w-full",
    progressWrapper: "hidden ipad:block ipad:w-full",
  },
} as const;

/**
 * Componente para la línea de acento
 * @param {AccentLineProps} props - Propiedades de la línea
 * @returns {JSX.Element} Componente de línea
 */
const AccentLine = ({ className }: AccentLineProps) => (
  <div className={clsx(STYLES.accentLine.base, className)} />
);

/**
 * Componente para el título del hero
 * @param {HeroTitleProps} props - Propiedades del título
 * @returns {JSX.Element} Componente de título
 */
const HeroTitle = ({ title, accentTitle }: HeroTitleProps) => (
  <h1 className={STYLES.heroTitle.base}>
    {title}
    <br />
    <span className={STYLES.heroTitle.accent}>{accentTitle}</span>
  </h1>
);

/**
 * Componente para el botón secundario
 * @param {SecondaryButtonProps} props - Propiedades del botón
 * @returns {JSX.Element} Componente de botón
 */
const SecondaryButton = ({ text, href }: SecondaryButtonProps) => (
  <Link href={href} className={STYLES.secondaryButton.base}>
    <span className={STYLES.secondaryButton.text}>{text}</span>
    <FiChevronDown className={STYLES.secondaryButton.icon} />
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
  images,
}: HeroContent & { images: HeroImage[] }) => {
  return (
    <div className={STYLES.contentSection.base}>
      <div className={STYLES.contentSection.container}>
        <AccentLine className={STYLES.accentLine.withMargin} />

        <HeroTitle title={title} accentTitle={accentTitle} />

        <p className={STYLES.contentSection.description}>{description}</p>

        <div className={STYLES.contentSection.buttonsContainer}>
          <div className={STYLES.contentSection.buttonWrapper}>
            <SecondaryButton text={secondaryButtonText} href="#tendencias" />
          </div>
          <div className={STYLES.contentSection.progressWrapper}>
            <ProgressIndicator images={images} />
          </div>
        </div>
      </div>
    </div>
  );
};
