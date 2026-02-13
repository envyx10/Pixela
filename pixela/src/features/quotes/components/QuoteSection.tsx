import { QuoteSectionProps } from "@/features/quotes/types/quotes";
import clsx from "clsx";

const STYLES = {
  wrapper: "w-[90%] md:w-[85%] lg:w-[80%] 2k:w-[70%] mx-auto px-4 md:px-0",
  quote: "text-base md:text-lg italic text-gray-400 max-w-2xl text-balance",
  author: "text-sm md:text-base mt-3 text-gray-300",
};

/**
 * Props extendidas para soportar alineación
 */
type ExtendedQuoteSectionProps = QuoteSectionProps & {
  align?: "left" | "right";
};

/**
 * Componente de sección de cita
 * @param {ExtendedQuoteSectionProps} props - Props del componente
 * @returns {JSX.Element} Componente QuoteSection
 */
const QuoteSection = ({
  quote,
  align = "right",
}: ExtendedQuoteSectionProps) => {
  const containerClass = clsx(
    "flex py-8 md:py-12",
    align === "right"
      ? "justify-start text-left lg:justify-end lg:text-right"
      : "justify-start text-left lg:justify-start lg:text-left", // Si align es left, forzamos left en desktop también
  );

  return (
    <div className={STYLES.wrapper}>
      <div className={containerClass}>
        <div>
          <p className={STYLES.quote}>&quot;{quote.quote}&quot;</p>
          <p className={STYLES.author}>- {quote.author}</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteSection;
