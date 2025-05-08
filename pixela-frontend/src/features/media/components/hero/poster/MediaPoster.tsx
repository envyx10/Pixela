"use client";

import Image from 'next/image';

interface MediaPosterProps {
  posterUrl: string;
  title: string;
  onClick: () => void;
}

export const MediaPoster = ({ posterUrl, title, onClick }: MediaPosterProps) => (
  <div className="w-64 flex-shrink-0">
    <div 
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full aspect-[2/3]">
        <Image 
          src={posterUrl} 
          alt={title}
          className="rounded-lg shadow-2xl shadow-black/50 transition duration-300 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, 256px"
          priority
          style={{objectFit: 'cover'}}
        />
      </div>
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
        <span className="text-white text-sm font-medium">Ampliar</span>
      </div>
    </div>
  </div>
); 