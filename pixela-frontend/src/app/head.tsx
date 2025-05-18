/**
 * Metadatos y configuración del head de la aplicación
 */
const METADATA = {
  title: 'Pixela - Descubre y comparte apasionantes historias cinematográficas',
  description: 'Pixela es una comunidad para los amantes del cine y las series. Descubre historias que te conectan con grandes producciones audiovisuales.',
  ogTitle: 'Pixela - Pasión por el cine y las series',
  ogDescription: 'Descubre, colecciona y comparte experiencias audiovisuales en una comunidad de apasionados del cine y las series.',
  ogImage: '/images/pixela-og-image.jpg',
  ogUrl: 'https://pixela.io',
} as const;

/**
 * Componente que define los metadatos y configuración del head de la aplicación
 * 
 * @returns Componente de head con metadatos y configuración
 */
export default function Head() {
  return (
    <>
      <title>{METADATA.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={METADATA.description} />
      <link rel="icon" href="/favicon.ico" />
      
      {/* Precargar fuentes críticas */}
      <link 
        rel="preload" 
        href="/fonts/Outfit-Bold.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      />
      
      {/* Preconectar a dominios importantes */}
      <link rel="preconnect" href="https://image.tmdb.org" />
      
      {/* Metadatos para redes sociales */}
      <meta property="og:title" content={METADATA.ogTitle} />
      <meta property="og:description" content={METADATA.ogDescription} />
      <meta property="og:image" content={METADATA.ogImage} />
      <meta property="og:url" content={METADATA.ogUrl} />
      <meta property="og:type" content="website" />
    </>
  );
} 