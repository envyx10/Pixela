"use client";

interface BackdropImageProps {
  backdropUrl: string;
}

export const BackdropImage = ({ backdropUrl }: BackdropImageProps) => (
  <div 
    className="absolute inset-0 bg-cover bg-center"
    style={{ 
      backgroundImage: `url(${backdropUrl})`, 
      backgroundPosition: 'center 15%',
      paddingTop: '2rem'
    }}
  >
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/90 to-[#0F0F0F]/40" />
  </div>
); 