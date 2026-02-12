"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/shared/components/Navbar";
import { ToastContainer } from "@/shared/components/ToastContainer";
import Footer from "@/features/footer/Footer";

/**
 * Componente que maneja el layout del cliente
 * Se encarga de mostrar u ocultar la navegación y el pie de página
 * según la ruta actual
 */
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.startsWith("/login") || pathname?.startsWith("/register");

  const STYLES = {
    container: "min-h-screen flex flex-col",
    main: "flex-grow",
  } as const;

  return (
    <div className={STYLES.container}>
      {/* Toast notifications - Global */}
      <ToastContainer />

      {/* Ocultar Navbar en páginas de auth */}
      {!isAuthPage && <Navbar />}

      <main className={STYLES.main}>{children}</main>

      {!isAuthPage && <Footer />}
    </div>
  );
}
