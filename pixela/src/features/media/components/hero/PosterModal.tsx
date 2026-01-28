"use client";

import { CloseButton } from './modal/CloseButton';
import { PosterImage } from './modal/PosterImage';
import { ModalBackdrop } from './modal/ModalBackdrop';

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  posterUrl: string;
  title: string;
}

const STYLES = {
  modalContainer: "relative w-[80vw] h-[80vh] flex items-center justify-center",
  imageWrapper: "w-full h-full flex items-center justify-center cursor-default"
} as const;

export function PosterModal({ isOpen, onClose, posterUrl, title }: PosterModalProps) {
  if (!isOpen) return null;
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Solo cierra si el clic fue directamente en el backdrop
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <ModalBackdrop isOpen={isOpen} onClose={handleBackdropClick}>
      <div className={STYLES.modalContainer} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <div className={STYLES.imageWrapper}>
          <PosterImage src={posterUrl} alt={title} />
        </div>
      </div>
    </ModalBackdrop>
  );
}  