'use client';

import "./globals.css";
import { Navbar } from "../shared/components/Navbar";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect } from "react";
import Footer from "../shared/components/Footer";
import { outfit, roboto } from "./ui/fonts";

const STYLES = {
  html: 'antialiased',
  body: 'bg-pixela-dark antialiased',
  container: 'min-h-screen',
  main: 'flex-grow',
} as const;

/**
 * Layout principal de la aplicación
 * 
 * @param children - Contenido a renderizar dentro del layout
 * @returns Componente de layout principal
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    localStorage.removeItem('forceLogout');
    checkAuth();
  }, [checkAuth]);

  return (
    <html lang="es" className={`${roboto.variable} ${outfit.variable} ${STYLES.html}`}>
      <body className={STYLES.body}>
        <div className={STYLES.container}>
          <Navbar />
          <main className={STYLES.main}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
