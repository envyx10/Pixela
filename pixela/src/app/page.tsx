import nextDynamic from "next/dynamic";
import { Suspense } from "react";
import { getHeroData } from "@/features/hero/services/heroContentService";
import { HeroSection } from "@/features/hero/components/core/HeroSection";
import {
  getTrendingSeries,
  getTrendingMovies,
} from "@/features/trending/services/trendingService";
import {
  getDiscoveredSeries,
  getDiscoveredMovies,
} from "@/features/discover/service/discover";
import { getRandomQuote } from "@/features/quotes/service";
import { ConditionalSuspenseWrapper } from "@/app/components/ConditionalSuspenseWrapper";

// Dynamic imports for below-the-fold content to improve initial bundle size
const TrendingSection = nextDynamic(() =>
  import("@/features/trending/components/core/TrendingSection").then(
    (mod) => mod.TrendingSection,
  ),
);
const DiscoverSection = nextDynamic(() =>
  import("@/features/discover/components/layout/DiscoverSection").then(
    (mod) => mod.DiscoverSection,
  ),
);
const AboutSection = nextDynamic(
  () => import("@/features/about/components/AboutSection"),
);

// Fuerza renderizado dinámico para contenido fresco
export const dynamic = "force-dynamic";

// Constantes de configuración centralizadas
const CONFIG = {
  TRENDING_ITEMS_COUNT: 15,
  STYLES: {
    main: "flex-grow 2k:max-w-[100vw] 2k:mx-auto",
    section: "scroll-mt-24 2k:scroll-mt-16",
  },
} as const;

/**
 * Carga y renderiza únicamente el Hero Section.
 * Al estar separado, permite que el skeleton principal desaparezca mucho antes.
 */
async function HeroLoader() {
  const heroData = await getHeroData();
  return <HeroSection {...heroData} />;
}

/**
 * Carga el resto del contenido de la página.
 * Se renderizará cuando sus datos estén listos, sin bloquear el Hero.
 */
async function RestOfPageLoader() {
  const [trendingData, discoveredData] = await Promise.all([
    Promise.all([
      getTrendingSeries(CONFIG.TRENDING_ITEMS_COUNT),
      getTrendingMovies(CONFIG.TRENDING_ITEMS_COUNT),
    ]),
    Promise.all([getDiscoveredSeries(), getDiscoveredMovies()]),
  ]);

  const [trendingSeries, trendingMovies] = trendingData;
  const [discoveredSeries, discoveredMovies] = discoveredData;
  const randomQuote = getRandomQuote();

  return (
    <>
      <div id="trending" className={CONFIG.STYLES.section}>
        <TrendingSection
          series={trendingSeries}
          movies={trendingMovies}
          quote={randomQuote}
        />
      </div>

      <div id="discover" className={CONFIG.STYLES.section}>
        <DiscoverSection series={discoveredSeries} movies={discoveredMovies} />
      </div>

      <div id="about" className={CONFIG.STYLES.section}>
        <AboutSection />
      </div>
    </>
  );
}

/**
 * Página principal con carga progresiva simplificada.
 * El Hero carga primero, y el resto de la página aparece después sin skeletons intermedios.
 */
export default function Home() {
  return (
    <main className={CONFIG.STYLES.main}>
      {/* El skeleton principal solo espera a que HeroLoader termine */}
      <ConditionalSuspenseWrapper>
        <HeroLoader />
      </ConditionalSuspenseWrapper>

      {/* El resto del contenido carga en segundo plano y aparece cuando está listo */}
      <Suspense fallback={null}>
        <RestOfPageLoader />
      </Suspense>
    </main>
  );
}
