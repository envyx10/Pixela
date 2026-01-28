'use client';

import { useState, useEffect } from 'react';

/**
 * Hook personalizado para detectar si la pantalla coincide con una media query.
 * @param query La media query string (ej: '(max-width: 768px)')
 * @returns true si la media query coincide, false en caso contrario.
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    documentChangeHandler();

    mediaQueryList.addEventListener('change', documentChangeHandler);

    return () => {
      mediaQueryList.removeEventListener('change', documentChangeHandler);
    };
  }, [query]);

  return matches;
}; 