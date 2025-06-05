import { Metadata } from 'next';

export const categoriesMetadata: Metadata = {
  title: 'Categorías | Pixela',
  description: 'Explora películas y series por categorías. Encuentra contenido por género, año, calificación y más.',
  openGraph: {
    title: 'Categorías | Pixela',
    description: 'Explora películas y series por categorías. Encuentra contenido por género, año, calificación y más.',
    type: 'website',
  }
};

export const categoryDetailsMetadata = (categoryName: string): Metadata => ({
  title: `${categoryName} | Pixela`,
  description: `Explora las mejores películas y series de ${categoryName}. Encuentra contenido seleccionado por nuestros expertos.`,
  openGraph: {
    title: `${categoryName} | Pixela`,
    description: `Explora las mejores películas y series de ${categoryName}. Encuentra contenido seleccionado por nuestros expertos.`,
    type: 'website',
  }
}); 