'use client';

import { usePathname } from "next/navigation";
import "./globals.css";
import { Navbar } from "../shared/components/Navbar";
import { ToastContainer } from "../shared/components/ToastContainer";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect, startTransition } from "react";
import Footer from "../features/footer/Footer";
import { outfit, roboto } from "./ui/fonts";

const STYLES = {
  html: `${roboto.variable} ${outfit.variable}`,
  body: "antialiased bg-pixela-dark",
  container: "min-h-screen",
  main: "flex-grow"
} as const;

/**
 * Componente separado para manejo de autenticación
 * ✅ Optimizado para no bloquear el render inicial
 */
function AuthHandler() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    // ✅ Limpiar forceLogout inmediatamente (síncrono)
    localStorage.removeItem('forceLogout');
    
    // ✅ Mover checkAuth a transición no urgente
    startTransition(() => {
      // Pequeño delay para no bloquear el primer render
      setTimeout(() => {
//        checkAuth(); // Disabled during migration to avoid conflicts
      }, 50);
    });
  }, [checkAuth]);

  return null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/register');

  return (
    <html lang="es" className={STYLES.html}>
      <body className={STYLES.body}>
        <div className={STYLES.container}>
          {/* Toast notifications - Global */}
          <ToastContainer />
          
          {/* Ocultar Navbar y legacy AuthHandler en páginas de auth nuevas */}
          {!isAuthPage && (
            <>
                <AuthHandler />
                <Navbar />
            </>
          )}
          
          <main className={STYLES.main}>{children}</main>
          
          {!isAuthPage && <Footer />}
        </div>
      </body>
    </html>
  );
}
