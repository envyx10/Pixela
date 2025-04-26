'use client';

import { Outfit, Roboto } from "next/font/google";
import "./globals.css";
import { Navbar } from "../shared/components/Navbar";

/* Fuentes para el texto */
const roboto = Roboto({
  subsets: ["latin"],
  weight:  ["400"],
  variable: "--font-roboto",
});

/* Fuente sans para la interfaz */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${outfit.variable}`}>
      <body className="bg-pixela-dark">
        <div className="min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}
