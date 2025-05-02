import { heroData } from "@/features/hero/content";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { TrendingSection } from "@/features/trending/components/TrendingSection";
import { getTrendingSeries, getTrendingMovies } from "@/features/trending/service";

//TODO Página de inicio o layout principal
export default async function Home() {
  const [trendingSeries, trendingMovies] = await Promise.all([
    getTrendingSeries(20),
    getTrendingMovies(20)
  ]);

  return (
    <main>
      <HeroSection {...heroData} />
      <TrendingSection series={trendingSeries} movies={trendingMovies} />
    </main>
  );
}
