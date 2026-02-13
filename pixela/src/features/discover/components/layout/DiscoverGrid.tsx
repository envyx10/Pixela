"use client";

import { useDiscoverStore } from "@/features/discover/store/discoverStore";
import { DiscoverCard } from "@/features/discover/components/ui/DiscoverCard";
import { DiscoverGridSkeleton } from "@/app/components/skeletons";
import clsx from "clsx";
// import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DiscoverGridProps } from "@/features/discover/types/components";

const DISCOVER_LIMIT = 7;

const STYLES = {
  // Mobile Grid
  // mobileGridContainer: "grid grid-cols-2 gap-3 px-2 w-full", // Legacy

  // Unified Responsive Grid
  // Mobile: grid-cols-2
  // Desktop (md+): grid-cols-4, grid-rows-2, height fixed, max-width
  responsiveContainer:
    "grid grid-cols-2 gap-3 px-2 w-full " +
    "md:grid-cols-4 md:grid-rows-2 md:gap-4 md:h-[600px] md:max-w-[1200px] md:px-0",

  // Grid Item Styles
  gridItem:
    "relative overflow-hidden group rounded-xl transition-all duration-500 hover:z-10",
  // itemLarge: "col-span-2 row-span-2", // Legacy - moved to helper
  // itemTall: "col-span-1 row-span-2", // Legacy
  // itemWide: "col-span-2 row-span-1", // Legacy
  // itemNormal: "col-span-1 row-span-1", // Legacy
} as const;

/**
 * Componente que muestra un grid de tarjetas de contenido multimedia.
 * - Desktop/Tablet (>768px): Diseño 2-3-2.
 * - Móvil (<=768px): Dos columnas, con ajustes para pantallas muy estrechas.
 * Se muestran (DISCOVER_LIMIT - 1) tarjetas si DISCOVER_LIMIT es impar en vistas móviles.
 */
export const DiscoverGrid = ({ type }: DiscoverGridProps) => {
  const { series, movies } = useDiscoverStore();
  const contentToDisplay = type === "serie" ? series : movies;
  // const isMobile = useMediaQuery("(max-width: 768px)"); // Removed

  // Pattern logic:
  // Mobile: Just show first item or simple grid? Original code showed simpler grid.
  // We can unify this. Let's make the container responsive.

  // Limiting content. Desktop shows 7 items (index 0-6).
  // Mobile originally showed 7 or 6. We'll stick to 7 limit and handle layout via CSS.
  const limitedContent = contentToDisplay.slice(0, DISCOVER_LIMIT);

  if (!limitedContent?.length) {
    return <DiscoverGridSkeleton />;
  }

  return (
    <div className={STYLES.responsiveContainer}>
      {limitedContent.map((media, index) => (
        <div
          key={media.id}
          className={clsx(STYLES.gridItem, getGridAreaClass(index))}
        >
          <DiscoverCard
            media={media}
            type={type}
            index={index}
            isMobile={false} // Card can adapt via CSS if needed, or we can pass a prop but usually Card is responsive internally
          />
        </div>
      ))}
    </div>
  );
};

// Helper puro para determinar la clase del area del grid
// Responsive: Mobile (default) vs Desktop (md/lg)
function getGridAreaClass(index: number): string {
  // Mobile: Todos son 1x1 default (definido en grid-cols-2)
  // Desktop (md+): Aplicamos el patrón bento

  // Clases base para todos (mobile first)
  const base = "col-span-1 row-span-1";

  // Clases desktop (md:)
  let desktop = "md:col-span-1 md:row-span-1";

  if (index === 0) desktop = "md:col-span-2 md:row-span-2"; // Large
  if (index === 1) desktop = "md:col-span-1 md:row-span-2"; // Tall

  return `${base} ${desktop}`;
}
