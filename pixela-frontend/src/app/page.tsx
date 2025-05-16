import { heroData } from "@/features/hero/content";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { TrendingSection } from "@/features/trending/components/TrendingSection";
import { DiscoverSection } from "@/features/discover/components/DiscoverSection";
import AboutSection from "@/features/about/components/AboutSection";
import { getTrendingSeries, getTrendingMovies } from "@/features/trending/service";
import { getDiscoveredSeries, getDiscoveredMovies } from "@/features/discover/service";
import { getFeaturedBackdrops } from "@/features/hero/services/heroBackdropService";

export default async function Home() {
  const [
    trendingSeries,
    trendingMovies,
    discoveredSeries,
    discoveredMovies,
    featuredBackdrops
  ] = await Promise.all([
    getTrendingSeries(30),
    getTrendingMovies(30),
    getDiscoveredSeries(),
    getDiscoveredMovies(),
    getFeaturedBackdrops()
  ]);
   
  const dynamicHeroData = {
    ...heroData,
    images: featuredBackdrops
  };

  return (
    <main>
      <HeroSection {...dynamicHeroData} />
      <TrendingSection series={trendingSeries} movies={trendingMovies} />
      <DiscoverSection series={discoveredSeries} movies={discoveredMovies} />
      <AboutSection />
    </main>
  );
}
