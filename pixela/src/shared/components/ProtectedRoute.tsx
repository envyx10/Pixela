'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import Error403 from '@/app/error-403';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const STYLES = {
  loadingContainer: "min-h-screen bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0F0F0F] flex items-center justify-center pt-20",
  loadingContent: "text-center",
  loadingSpinner: "animate-spin rounded-full h-12 w-12 border-b-2 border-pixela-accent mx-auto mb-4",
  loadingText: "text-gray-300"
} as const;

export function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  requireAdmin = false 
}: ProtectedRouteProps) {
  const { isAuthenticated, user, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [authError, setAuthError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Verificar si hay un logout forzado
        if (localStorage.getItem('forceLogout')) {
          setIsLoggingOut(true);
          localStorage.removeItem('forceLogout');
          
          // Timeout más corto para logout (500ms)
          setTimeout(() => {
            router.push('/');
            
            // Asegurar limpieza después de redirección
            setTimeout(() => {
              localStorage.removeItem('forceLogout');
            }, 100);
          }, 500);
          return;
        }
        
        // Dar tiempo suficiente para verificación de auth en producción (2.5 segundos)
        const authPromise = checkAuth();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout de verificación')), 2500)
        );
        
        await Promise.race([authPromise, timeoutPromise]);
        
      } catch (error) {
        console.error('Error checking auth:', error);
        
        // Solo marcar error si realmente requiere autenticación
        if (requireAuth) {
          setAuthError(true);
        }
      } finally {
        // Asegurar que el estado se actualice
        setIsLoading(false);
        setIsChecked(true);
      }
    };

    initAuth();
  }, [checkAuth, requireAuth, router]);

  // Verificar si hay un logout en progreso
  if (typeof window !== 'undefined' && localStorage.getItem('forceLogout')) {
    return (
      <div className={STYLES.loadingContainer}>
        <div className={STYLES.loadingContent}>
          <div className={STYLES.loadingSpinner}></div>
          <p className={STYLES.loadingText}>Cerrando sesión...</p>
        </div>
      </div>
    );
  }

  // Mostrar mensaje de logout
  if (isLoggingOut) {
    return (
      <div className={STYLES.loadingContainer}>
        <div className={STYLES.loadingContent}>
          <div className={STYLES.loadingSpinner}></div>
          <p className={STYLES.loadingText}>Cerrando sesión...</p>
        </div>
      </div>
    );
  }

  // Mostrar loading mientras verificamos autenticación
  if (isLoading || !isChecked) {
    return (
      <div className={STYLES.loadingContainer}>
        <div className={STYLES.loadingContent}>
          <div className={STYLES.loadingSpinner}></div>
          <p className={STYLES.loadingText}>Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Verificar si requiere autenticación SOLO después de timeout o error real
  if (requireAuth && (!isAuthenticated || authError)) {
    return <Error403 />;
  }

  // Verificar si requiere privilegios de administrador
  if (requireAdmin && (!isAuthenticated || !user?.is_admin)) {
    return <Error403 />;
  }

  // Si pasa todas las verificaciones, renderizar children
  return <>{children}</>;
} 