import { Metadata } from 'next';

export const seriesMetadata: Metadata = {
  title: 'Series | Pixela',
  description: 'Descubre las mejores series de televisión. Desde los últimos estrenos hasta series clásicas, encuentra tu próxima serie favorita en Pixela.',
  openGraph: {
    title: 'Series | Pixela',
    description: 'Descubre las mejores series de televisión. Desde los últimos estrenos hasta series clásicas, encuentra tu próxima serie favorita en Pixela.',
    type: 'website',
  }
};

export const seriesDetailsMetadata = (title: string): Metadata => ({
  title: `${title} | Pixela`,
  description: `Explora ${title}. Temporadas, episodios, reparto, calificaciones y más en Pixela.`,
  openGraph: {
    title: `${title} | Pixela`,
    description: `Explora ${title}. Temporadas, episodios, reparto, calificaciones y más en Pixela.`,
    type: 'article',
  }
}); 