import { useState, useEffect, useCallback } from "react";
import { FiHeart, FiStar, FiActivity } from "react-icons/fi";
import { favoritesAPI } from "@/api/favorites/favorites";
import { reviewsAPI } from "@/api/reviews/reviews";

export const useProfileStats = () => {
  const [stats, setStats] = useState([
    { label: "Favoritos", value: "0", icon: FiHeart },
    { label: "Reseñas", value: "0", icon: FiStar },
    { label: "Nivel", value: "Novato", icon: FiActivity },
  ]);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const [favorites, reviews] = await Promise.all([
        favoritesAPI.listWithDetails(),
        reviewsAPI.list(),
      ]);

      const favCount = favorites.length;
      const reviewCount = reviews.length;

      // Determine level based on activity
      let level = "Novato";
      if (reviewCount > 5 || favCount > 10) level = "Aficionado";
      if (reviewCount > 15 || favCount > 30) level = "Cinéfilo";
      if (reviewCount > 30 || favCount > 50) level = "Crítico";
      if (reviewCount > 50 || favCount > 100) level = "Maestro";

      setStats([
        { label: "Favoritos", value: favCount.toString(), icon: FiHeart },
        { label: "Reseñas", value: reviewCount.toString(), icon: FiStar },
        { label: "Nivel", value: level, icon: FiActivity },
      ]);
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, refreshStats: fetchStats };
};
