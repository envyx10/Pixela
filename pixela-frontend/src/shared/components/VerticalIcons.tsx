'use client';

import Link from "next/link"
import { MdFavorite, MdRateReview } from "react-icons/md"
import { FiUser } from "react-icons/fi"

export const VerticalIcons = () => {
  return (
    <div className="absolute right-0 top-[40vh] flex flex-col items-center space-y-6 -translate-x-48 z-20 group">
      <Link 
        href="/profile"
        className="text-pixela-light/80 hover:text-pixela-accent transition-colors duration-300 group/item flex flex-col items-center w-6"
        title="Perfil"
      >
        <FiUser className="h-6 w-6" />
        <span className="text-xs mt-1 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 bg-pixela-dark/50 px-2 py-1 rounded whitespace-nowrap">
          Perfil
        </span>
      </Link>
      <Link 
        href="/favorites"
        className="text-pixela-light/80 hover:text-pixela-accent transition-colors duration-300 group/item flex flex-col items-center w-6"
        title="Favoritos"
      >
        <MdFavorite className="h-6 w-6" />
        <span className="text-xs mt-1 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 bg-pixela-dark/50 px-2 py-1 rounded whitespace-nowrap">
          Favoritos
        </span>
      </Link>
      <Link 
        href="/reviews"
        className="text-pixela-light/80 hover:text-pixela-accent transition-colors duration-300 group/item flex flex-col items-center w-6"
        title="Reseñas"
      >
        <MdRateReview className="h-6 w-6" />
        <span className="text-xs mt-1 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 bg-pixela-dark/50 px-2 py-1 rounded whitespace-nowrap">
          Reseñas
        </span>
      </Link>
      <style jsx global>{`
        .embla-btn-pulse {
          pointer-events: auto;
        }
        .group:hover .embla-btn-pulse {
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}; 