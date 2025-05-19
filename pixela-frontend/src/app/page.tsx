import { heroData } from "@/features/hero/content";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { TrendingSection } from "@/features/trending/components/TrendingSection";
import { DiscoverSection } from "@/features/discover/components/DiscoverSection";
import AboutSection from "@/features/about/components/AboutSection";
import { getTrendingSeries, getTrendingMovies } from "@/features/trending/service";
import { getDiscoveredSeries, getDiscoveredMovies } from "@/features/discover/service";
import { getFeaturedBackdrops } from "@/features/hero/services/heroBackdropService";
import CleanVerifiedParam from "@/shared/components/CleanVerifiedParam";
/**
 * Número de elementos a obtener para las secciones de tendencias
 */
const TRENDING_ITEMS_LIMIT = 30;

/**
 * Obtiene todos los datos necesarios para la página principal
 * @returns Promise con los datos de todas las secciones
 */
const fetchHomePageData = async () => {
  const [
    trendingSeries,
    trendingMovies,
    discoveredSeries,
    discoveredMovies,
    featuredBackdrops
  ] = await Promise.all([
    getTrendingSeries(TRENDING_ITEMS_LIMIT),
    getTrendingMovies(TRENDING_ITEMS_LIMIT),
    getDiscoveredSeries(),
    getDiscoveredMovies(),
    getFeaturedBackdrops()
  ]);

  return {
    trendingSeries,
    trendingMovies,
    discoveredSeries,
    discoveredMovies,
    featuredBackdrops
  };
};

/**
 * Página principal de la aplicación
 * 
 * @returns Componente de la página principal
 */
export default async function Home() {
  const {
    trendingSeries,
    trendingMovies,
    discoveredSeries,
    discoveredMovies,
    featuredBackdrops
  } = await fetchHomePageData();
   
  const dynamicHeroData = {
    ...heroData,
    images: featuredBackdrops
  };

  return (
    <main className="min-h-screen">
      <CleanVerifiedParam />
      <HeroSection {...dynamicHeroData} />
      <TrendingSection 
        series={trendingSeries} 
        movies={trendingMovies} 
      />
      <DiscoverSection 
        series={discoveredSeries} 
        movies={discoveredMovies} 
      />
      <AboutSection />
    </main>
  );
}
