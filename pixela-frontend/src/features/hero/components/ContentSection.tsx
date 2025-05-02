import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { HeroContent } from "../type";

export const ContentSection = ({
  title,
  accentTitle,
  description,
  secondaryButtonText,
}: HeroContent) => {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10">
      <div className="max-w-[83.333%] mx-auto pb-36">
        {/* Línea de acento superior */}
        <div className="w-24 h-1 bg-pixela-accent mb-8"></div>
        
        {/* Título grande y audaz */}
        <h1 className="text-7xl font-bold text-pixela-light mb-6 tracking-tight leading-[1.1]">
          {title}<br />
          <span className="text-pixela-accent">{accentTitle}</span>
        </h1>
        
        {/* Descripción */}
        <p className="text-xl text-pixela-light/80 max-w-lg mb-12">
          {description}
        </p>
        
        {/* Botones - Diseño mejorado */}
        <div className="flex items-center gap-8">
          {/* Botón secundario con icono al lado */}
          <Link 
            href="#tendencias"
            className="group flex items-center transition-all duration-300"
          >
            <span className="font-medium text-pixela-light group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.7)] transition-all duration-300 mr-2">
              {secondaryButtonText}
            </span>
            <FiChevronDown className="h-6 w-6 animate-bounce text-pixela-light group-hover:text-pixela-accent opacity-80 group-hover:opacity-100" />
          </Link>
        </div>
      </div>
    </div>
  );
}; 