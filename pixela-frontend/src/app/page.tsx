import { getHeroData } from "@/features/hero/content";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { TrendingSection } from "@/features/trending/components/TrendingSection";
import { DiscoverSection } from "@/features/discover/components/DiscoverSection";
import { getTrendingSeries, getTrendingMovies } from "@/features/trending/service";
import { getDiscoveredSeries, getDiscoveredMovies } from "@/features/discover/service";
import AboutSection from "@/features/about/components/AboutSection";

const STYLES = {
  main: "flex-grow",
  section: "scroll-mt-24"
} as const;

/**
 * Componente principal de la página de inicio que renderiza las diferentes secciones
 * de la aplicación incluyendo el héroe, tendencias, descubrimientos y la sección about.
 * 
 * @async
 * @returns {Promise<JSX.Element>} Componente de la página de inicio con todas sus secciones
 */
export default async function Home() {
  const [heroData, trendingSeries, trendingMovies, discoveredSeries, discoveredMovies] = await Promise.all([
    getHeroData(),
    getTrendingSeries(20),
    getTrendingMovies(20),
    getDiscoveredSeries(),
    getDiscoveredMovies()
  ]);

  return (
    <main className={STYLES.main}>
      <HeroSection {...heroData} />
      <div id="trending" className={STYLES.section}>
        <TrendingSection series={trendingSeries} movies={trendingMovies} />
      </div>
      <div id="discover" className={STYLES.section}>
        <DiscoverSection series={discoveredSeries} movies={discoveredMovies} />
      </div>
      <div id="about" className={STYLES.section}>
        <AboutSection />
      </div>
    </main>
  );
}
