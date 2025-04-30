'use client';

import "./globals.css";
import { Navbar } from "../shared/components/Navbar";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect } from "react";
import Footer from "../shared/components/Footer";
import { outfit, roboto } from "./ui/fonts";
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Extraemos checkAuth del store
  const checkAuth = useAuthStore((state) => state.checkAuth);

  // Llamamos a checkAuth al montar
  useEffect(() => {
    // Clear forceLogout before checking auth
    localStorage.removeItem('forceLogout');
    checkAuth();
  }, [checkAuth]);

  return (
    <html lang="en" className={`${roboto.variable} ${outfit.variable}`}>
      <head>
        {/* Script para manejar atributos añadidos por extensiones del navegador */}
        <Script id="handle-body-attributes" strategy="afterInteractive">
          {`
            (function() {
              // Solución para manejar atributos como cz-shortcut-listen añadidos por extensiones
              if (typeof window !== 'undefined') {
                const observer = new MutationObserver((mutations) => {
                  const bodyElement = document.querySelector('body');
                  if (bodyElement && bodyElement.hasAttribute('cz-shortcut-listen')) {
                    bodyElement.removeAttribute('cz-shortcut-listen');
                  }
                });
                
                observer.observe(document.body || document.documentElement, {
                  attributes: true,
                  childList: false,
                  subtree: false
                });
              }
            })();
          `}
        </Script>
      </head>
      <body className="bg-pixela-dark antialiased">
        <div className="min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
