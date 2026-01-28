"use client";

import { useRef, useEffect } from 'react';

/**
 * Hook personalizado para crear un efecto de borde interactivo que sigue al mouse.
 * @template T - Tipo del elemento HTML al que se aplica el efecto.
 * @returns El ref que debe ser asignado al elemento contenedor de la tarjeta.
 */
export const useInteractiveBorder = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      element.style.setProperty('--mouse-x', `${x}px`);
      element.style.setProperty('--mouse-y', `${y}px`);
    };

    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return ref;
}; 