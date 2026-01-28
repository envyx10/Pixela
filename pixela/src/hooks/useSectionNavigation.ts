'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Hook personalizado para manejar la navegación a secciones específicas
 * de la página principal con soporte para navegación entre páginas.
 * 
 * @returns {Object} Objeto con funciones de navegación
 */
export const useSectionNavigation = () => {
  const router = useRouter();

  /**
   * Navega a una sección específica de la página principal
   * Si estamos en otra página, primero navega a la página principal
   * y luego hace scroll a la sección
   * 
   * @param {string} sectionId - ID de la sección a la que navegar
   * @param {Function} [callback] - Función opcional a ejecutar después de la navegación
   */
  const navigateToSection = useCallback((sectionId: string, callback?: () => void) => {
    const isHomePage = window.location.pathname === '/';
    
    // Si ya estamos en la página principal, solo hacer scroll
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        if (callback) callback();
      }
      return;
    }
    
    // Si estamos en otra página, navegar a la página principal
    router.push('/');
    
    // Intentar hacer scroll a la sección después de que la página se cargue
    const attemptScroll = (retryCount = 0, maxRetries = 5) => {
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          if (callback) callback();
        } else if (retryCount < maxRetries) {
          // Intentar nuevamente con un retraso exponencial
          attemptScroll(retryCount + 1, maxRetries);
        }
      }, 300 * Math.pow(1.5, retryCount)); // Retraso exponencial: 300ms, 450ms, 675ms, etc.
    };
    
    attemptScroll();
  }, [router]);

  /**
   * Navega al inicio de la página principal con scroll suave
   * 
   * @param {Function} [callback] - Función opcional a ejecutar después de la navegación
   */
  const navigateToTop = useCallback((callback?: () => void) => {
    const isHomePage = window.location.pathname === '/';
    
    // Si ya estamos en la página principal, solo hacer scroll
    if (isHomePage) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      if (callback) callback();
      return;
    }
    
    // Si estamos en otra página, navegar a la página principal
    router.push('/');
    
    // Ejecutar el callback después de la navegación
    if (callback) {
      setTimeout(() => {
        callback();
      }, 300);
    }
  }, [router]);

  return {
    navigateToSection,
    navigateToTop
  };
}; 