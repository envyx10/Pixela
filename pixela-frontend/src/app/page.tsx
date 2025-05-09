import { heroData } from "@/features/hero/content";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { TrendingSection } from "@/features/trending/components/TrendingSection";
import { getTrendingSeries, getTrendingMovies } from "@/features/trending/service";
import { getFeaturedBackdrops } from "@/features/hero/services/heroBackdropService";

export default async function Home() {

  const [trendingSeries, trendingMovies, featuredBackdrops] = await Promise.all([
    getTrendingSeries(30),
    getTrendingMovies(30),
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
    </main>
  );
}
