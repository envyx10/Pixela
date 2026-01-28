"use client";

import { BackdropImageProps } from '@/features/media/types/backdrop';

const STYLES = {
  container: "absolute inset-0 bg-cover bg-center",
  overlay: "absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/90 to-[#0F0F0F]/40"
} as const;

export const BackdropImage = ({ backdropUrl }: BackdropImageProps) => (
  <div 
    className={STYLES.container}
    style={{ 
      backgroundImage: `url(${backdropUrl})`, 
      backgroundPosition: 'center 15%',
      paddingTop: '2rem'
    }}
  >
    {/* Gradient Overlay */}
    <div className={STYLES.overlay} />
  </div>
); 