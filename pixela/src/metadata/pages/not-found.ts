import { Metadata } from 'next';

export const notFoundMetadata: Metadata = {
  title: '404 - Página No Encontrada | Pixela',
  description: 'Parece que la página que buscas se perdió en el multiverso cinematográfico. Regresa al inicio para seguir explorando el mundo del cine y las series.',
  keywords: ['404', 'página no encontrada', 'error', 'pixela', 'cine', 'series'],
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: '404 - Página No Encontrada | Pixela',
    description: 'Parece que la página que buscas se perdió en el multiverso cinematográfico. Regresa al inicio para seguir explorando.',
    type: 'website',
    images: [
      {
        url: '/images/404-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Pixela - Página 404'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '404 - Página No Encontrada | Pixela',
    description: 'Parece que la página que buscas se perdió en el multiverso cinematográfico.',
    images: ['/images/404-og.jpg']
  }
}; 