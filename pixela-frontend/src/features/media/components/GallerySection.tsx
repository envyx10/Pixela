import { Image } from '../types';

interface GallerySectionProps {
  images: Image[];
  mediaTitle: string;
  onImageClick: (url: string) => void;
}

export const GallerySection = ({ images, mediaTitle, onImageClick }: GallerySectionProps) => {
  if (!images || images.length === 0) return null;
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Galería</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative group cursor-pointer"
            onClick={() => onImageClick(img.url)}
          >
            <img
              src={img.url}
              alt={`${mediaTitle} - ${img.tipo}`}
              className="w-full h-auto object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-sm font-medium">
              Ampliar
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 