'use client';

import "./globals.css";
import { Navbar } from "../shared/components/Navbar";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect } from "react";
import { outfit, roboto } from "./ui/fonts";

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
      <body className="bg-pixela-dark antialiased">
        <div className="min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}
