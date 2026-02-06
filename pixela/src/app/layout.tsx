"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import { Navbar } from "../shared/components/Navbar";
import { ToastContainer } from "../shared/components/ToastContainer";
import Footer from "../features/footer/Footer";
import { outfit, roboto } from "./ui/fonts";
import { Providers } from "./providers";

const STYLES = {
  html: `${roboto.variable} ${outfit.variable}`,
  body: "antialiased bg-pixela-dark",
  container: "min-h-screen flex flex-col",
  main: "flex-grow",
} as const;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.startsWith("/login") || pathname?.startsWith("/register");

  return (
    <html lang="es" className={STYLES.html}>
      <body className={STYLES.body} suppressHydrationWarning={true}>
        <Providers>
          <div className={STYLES.container}>
            {/* Toast notifications - Global */}
            <ToastContainer />

            {/* Ocultar Navbar en páginas de auth */}
            {!isAuthPage && <Navbar />}

            <main className={STYLES.main}>{children}</main>

            {!isAuthPage && <Footer />}
          </div>
        </Providers>
      </body>
    </html>
  );
}
