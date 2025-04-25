import { FaTimes } from 'react-icons/fa';

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  posterUrl: string;
  title: string;
}

export const PosterModal = ({ isOpen, onClose, posterUrl, title }: PosterModalProps) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative w-[80vw] h-[80vh] flex items-center justify-center">
        <button 
          className="absolute -top-12 right-0 text-white hover:text-[#FF2D55] transition-colors duration-300"
          onClick={onClose}
        >
          <FaTimes className="w-8 h-8" />
        </button>
        <img 
          src={posterUrl} 
          alt={title}
          className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl shadow-black/50"
        />
      </div>
    </div>
  );
}; 