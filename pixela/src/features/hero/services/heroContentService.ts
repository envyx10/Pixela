import { getFeaturedBackdrops } from '@/features/hero/services/heroBackdropService';
import { HeroData } from "../types/content";

/**
 * Datos estáticos para la sección Hero.
 * Estos datos se combinan con imágenes dinámicas obtenidas de la API
 * para crear el contenido final del hero.
 */
export async function getHeroData(): Promise<HeroData> {
  const images = await getFeaturedBackdrops();
  
  return {
    title: "Explora el universo",
    accentTitle: "cinematográfico",
    description: "Descubre, colecciona y comparte experiencias audiovisuales en una comunidad de apasionados del cine y las series.",
    secondaryButtonText: "Descubrir más",
    images,
  };
} 