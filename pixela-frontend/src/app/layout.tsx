'use client';

import "./globals.css";
import { Navbar } from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import { useAuthStore } from "../store/auth.store";
import { useEffect } from "react";
import { outfit, roboto } from "./ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${outfit.variable}`}>
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
