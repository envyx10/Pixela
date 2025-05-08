"use client";

import Image from 'next/image';

interface CreatorAvatarProps {
  photo?: string;
  name: string;
}

export const CreatorAvatar = ({ photo, name }: CreatorAvatarProps) => (
  <div className="flex items-center gap-2">
    {photo && (
      <div className="relative w-10 h-10">
        <Image 
          src={photo} 
          alt={name}
          className="rounded-full object-cover border-2 border-red-600/30"
          fill
          sizes="40px"
          style={{objectFit: 'cover'}}
        />
      </div>
    )}
    <span className="text-white font-medium">{name}</span>
  </div>
); 