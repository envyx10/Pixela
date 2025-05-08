"use client";

import Image from 'next/image';

interface PosterImageProps {
  src: string;
  alt: string;
}

export const PosterImage = ({ src, alt }: PosterImageProps) => (
  <div className="transform-gpu overflow-hidden rounded-lg shadow-2xl shadow-black/50 group">
    <Image 
      src={src} 
      alt={alt}
      className="transition duration-300 group-hover:scale-105 origin-center"
      width={800}
      height={1200}
      priority
      style={{
        objectFit: 'contain',
        maxHeight: '70vh',
        width: 'auto'
      }}
    />
  </div>
); 