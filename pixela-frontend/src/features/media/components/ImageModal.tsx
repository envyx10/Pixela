import { FaTimes, FaDownload } from 'react-icons/fa';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  onDownload?: (url: string) => void;
}

export const ImageModal = ({ isOpen, onClose, imageUrl, onDownload }: ImageModalProps) => {
  if (!isOpen || !imageUrl) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
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
            >
              <FaDownload className="w-6 h-6" />
            </button>
          )}
          <button 
            className="text-white hover:text-[#FF2D55] transition-colors duration-300"
            onClick={onClose}
          >
            <FaTimes className="w-8 h-8" />
          </button>
        </div>
        <img 
          src={imageUrl} 
          alt="Imagen ampliada"
          className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl shadow-black/50"
        />
      </div>
    </div>
  );
}; 