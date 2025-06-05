'use client';

import "./globals.css";
import { Navbar } from "../shared/components/Navbar";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect } from "react";
import Footer from "../features/footer/Footer";
import { outfit, roboto } from "./ui/fonts";

const STYLES = {
  html: `${roboto.variable} ${outfit.variable}`,
  body: "antialiased bg-pixela-dark",
  container: "min-h-screen",
  main: "flex-grow"
} as const;

/**
 * Layout principal de la aplicación
 * @param {Object} props - Propiedades del layout
 * @param {React.ReactNode} props.children - Contenido del layout
 * @returns {React.ReactNode} - Layout principal
 * @description Layout principal de la aplicación
 * @author Pixela
 * @version 1.0.0
 * @since 2025-06-04
 * @requires React
 * @requires Next.js
 * @requires Tailwind CSS
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
    <html lang="es" className={STYLES.html}>
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
