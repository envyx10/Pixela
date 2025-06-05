import { Metadata } from 'next';

export const notFoundMetadata: Metadata = {
  title: 'Página no encontrada | Pixela',
  description: 'Lo sentimos, la página que buscas no existe. Vuelve a la página principal para seguir explorando.',
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: 'Página no encontrada | Pixela',
    description: 'Lo sentimos, la página que buscas no existe. Vuelve a la página principal para seguir explorando.',
    type: 'website',
  }
}; 