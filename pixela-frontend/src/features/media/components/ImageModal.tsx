import { FaTimes, FaDownload } from 'react-icons/fa';
import Image from 'next/image';
import { useEffect } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  onDownload?: (url: string) => void;
}

export const ImageModal = ({ isOpen, onClose, imageUrl, onDownload }: ImageModalProps) => {
  if (!isOpen || !imageUrl) return null;
  
  // Evita que el body pueda scrollear cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Maneja el cierre del modal con la tecla Escape
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);
  
  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label="Imagen ampliada"
    >
      <div className="relative w-[90vw] h-[80vh] flex items-center justify-center">
        <div className="absolute -top-12 right-0 flex items-center gap-4">
          {onDownload && (
            <button
              className="text-white hover:text-[#FF2D55] transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                onDownload(imageUrl);
              }}
              aria-label="Descargar imagen"
            >
              <FaDownload className="w-6 h-6" />
            </button>
          )}
          <button 
            className="text-white hover:text-[#FF2D55] transition-colors duration-300"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <FaTimes className="w-8 h-8" />
          </button>
        </div>
        
        {/* Usar Image de next/image para tamaños pequeños o img para imágenes que requieren calidad máxima */}
        {imageUrl.includes('thumbnail') || imageUrl.includes('preview') ? (
          <Image 
            src={imageUrl} 
            alt="Imagen ampliada"
            className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl shadow-black/50"
            width={1200}
            height={800}
            sizes="90vw"
            priority
          />
        ) : (
          <img 
            src={imageUrl} 
            alt="Imagen ampliada"
            className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl shadow-black/50"
            loading="eager"
          />
        )}
      </div>
    </div>
  );
}; 