"use client";

interface ModalBackdropProps {
  isOpen: boolean;
  onClose: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
}

const STYLES = {
  backdrop: "fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
} as const;

export const ModalBackdrop = ({ isOpen, onClose, children }: ModalBackdropProps) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className={STYLES.backdrop}
      onClick={onClose}
    >
      {children}
    </div>
  );
}; 