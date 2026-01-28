import { Metadata } from 'next';

export const moviesMetadata: Metadata = {
  title: 'Películas | Pixela',
  description: 'Explora nuestra colección de películas. Encuentra las mejores películas, desde los últimos estrenos hasta clásicos atemporales.',
  openGraph: {
    title: 'Películas | Pixela',
    description: 'Explora nuestra colección de películas. Encuentra las mejores películas, desde los últimos estrenos hasta clásicos atemporales.',
    type: 'website',
  }
};

export const movieDetailsMetadata = (title: string): Metadata => ({
  title: `${title} | Pixela`,
  description: `Descubre todo sobre ${title}. Sinopsis, reparto, calificaciones y más en Pixela.`,
  openGraph: {
    title: `${title} | Pixela`,
    description: `Descubre todo sobre ${title}. Sinopsis, reparto, calificaciones y más en Pixela.`,
    type: 'article',
  }
}); 