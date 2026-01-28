'use client';

import { Suspense, ReactNode, useMemo } from 'react';
import { HeroSectionSkeleton } from './skeletons/PageSkeletons';

/**
 * Configuración de la sesión
 * - STORAGE_KEY: Clave para identificar si el usuario ha visitado la página
 * - MINIMAL_FALLBACK_STYLES: Estilos para el fallback mínimo
 */
const CONFIG = {
  STORAGE_KEY: 'pixela_visited',
  MINIMAL_FALLBACK_STYLES: "relative w-full min-h-[80vh] sm:min-h-[85vh] md:min-h-screen lg:h-screen 2k:h-[70vh] bg-pixela-dark"
} as const;

/**
 * Props para el wrapper condicional de Suspense
 * @param {ReactNode} children - Componentes hijos a envolver
 */
interface ConditionalSuspenseWrapperProps {
  children: ReactNode;
}

/**
 * Detecta si es primera visita de la sesión con manejo seguro para SSR
 * @returns {boolean} true si es primera visita, false si ya ha visitado
 */
const detectFirstVisit = (): boolean => {
  // SSR safety: asumir primera visita cuando no hay window
  if (typeof window === 'undefined') return true;
  
  const hasVisited = sessionStorage.getItem(CONFIG.STORAGE_KEY);
  
  // Marcar como visitado solo si es primera vez
  if (!hasVisited) {
    sessionStorage.setItem(CONFIG.STORAGE_KEY, 'true');
    return true;
  }
  
  return false;
};

/**
 * Wrapper inteligente que optimiza Suspense según el contexto de navegación:
 * - Primera visita: Fallback mínimo para experiencia directa del Hero
 * - Navegación interna: Skeleton completo para feedback apropiado
 * 
 * Optimizado para Next.js 15 con mínimos re-renders
 */
export const ConditionalSuspenseWrapper = ({ children }: ConditionalSuspenseWrapperProps) => {

  const showMinimalFallback = useMemo(() => detectFirstVisit(), []);

  /**
   * Componente fallback optimizado según contexto
   * @returns {JSX.Element} Componente fallback
   */
  const fallbackComponent = showMinimalFallback ? (
    <div 
      className={CONFIG.MINIMAL_FALLBACK_STYLES} 
      aria-hidden="true"
      role="status"
      aria-label="Cargando contenido"
    />
  ) : (
    <HeroSectionSkeleton />
  );

  return (
    <Suspense fallback={fallbackComponent}>
      {children}
    </Suspense>
  );
  
};