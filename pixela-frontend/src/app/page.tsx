import { getHeroData } from "@/features/hero/content";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { TrendingSection } from "@/features/trending/components/TrendingSection";
import { DiscoverSection } from "@/features/discover/components/DiscoverSection";
import { getTrendingSeries, getTrendingMovies } from "@/features/trending/service";
import { getDiscoveredSeries, getDiscoveredMovies } from "@/features/discover/service";
import AboutSection from "@/features/about/components/AboutSection";
import { CinematicSpotlight } from "@/features/cinematic-spotlight";

//TODO Página de inicio o layout principal
export default async function Home() {
  const [heroData, trendingSeries, trendingMovies, discoveredSeries, discoveredMovies] = await Promise.all([
    getHeroData(),
    getTrendingSeries(20),
    getTrendingMovies(20),
    getDiscoveredSeries(),
    getDiscoveredMovies()
  ]);

  return (
    <main>
      <HeroSection {...heroData} />
      <TrendingSection series={trendingSeries} movies={trendingMovies} />
      <CinematicSpotlight />
      <DiscoverSection series={discoveredSeries} movies={discoveredMovies} />
      <AboutSection />
    </main>
  );
}
