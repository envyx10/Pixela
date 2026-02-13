"use client";

import { useDiscoverStore } from "@/features/discover/store/discoverStore";
import { DiscoverCard } from "@/features/discover/components/ui/DiscoverCard";
import { DiscoverGridSkeleton } from "@/app/components/skeletons";
import clsx from "clsx";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DiscoverGridProps } from "@/features/discover/types/components";

const DISCOVER_LIMIT = 7;

const STYLES = {
  // Mobile Grid
  mobileGridContainer: "grid grid-cols-2 gap-3 px-2 w-full",

  // Desktop Bento Grid
  desktopContainer:
    "grid grid-cols-4 grid-rows-2 gap-4 h-[600px] w-full max-w-[1200px]",

  // Grid Item Styles
  gridItem:
    "relative overflow-hidden group rounded-xl transition-all duration-500 hover:z-10",
  itemLarge: "col-span-2 row-span-2", // 2x2 Big Card
  itemTall: "col-span-1 row-span-2", // 1x2 Tall Card
  itemWide: "col-span-2 row-span-1", // 2x1 Wide Card
  itemNormal: "col-span-1 row-span-1", // 1x1 Normal Card
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
  const isMobile = useMediaQuery("(max-width: 768px)");

  const limit = isMobile
    ? DISCOVER_LIMIT % 2 !== 0
      ? DISCOVER_LIMIT - 1
      : DISCOVER_LIMIT
    : DISCOVER_LIMIT;
  const limitedContent = contentToDisplay.slice(0, limit);

  if (!limitedContent?.length) {
    return <DiscoverGridSkeleton />;
  }

  if (isMobile) {
    return (
      <div className={STYLES.mobileGridContainer}>
        {limitedContent.map((media, index) => (
          <DiscoverCard
            key={media.id}
            media={media}
            type={type}
            index={index}
            isMobile={true}
          />
        ))}
      </div>
    );
  }

  // Desktop Bento Layout
  // Pattern:
  // [ Large (0) ] [ Tall (1) ] [ Normal (2) ]
  // [ Large (0) ] [ Tall (1) ] [ Normal (3) ]
  return (
    <div className={STYLES.desktopContainer}>
      {limitedContent.map((media, index) => (
        <div
          key={media.id}
          className={clsx(STYLES.gridItem, getGridAreaClass(index))}
        >
          <DiscoverCard
            media={media}
            type={type}
            index={index}
            isMobile={false}
          />
        </div>
      ))}
    </div>
  );
};

// Helper puro para determinar la clase del area del grid
function getGridAreaClass(index: number): string {
  if (index === 0) return STYLES.itemLarge; // Primer elemento grande (2x2)
  if (index === 1) return STYLES.itemTall; // Segundo elemento alto (1x2)
  return STYLES.itemNormal; // El resto son 1x1
}
