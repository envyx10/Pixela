export default function Head() {
  return (
    <>
      <title>Pixela - Descubre y comparte apasionantes historias cinematográficas</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta 
        name="description" 
        content="Pixela es una comunidad para los amantes del cine y las series. Descubre historias que te conectan con grandes producciones audiovisuales." 
      />
      <meta name="keywords" content="streaming, películas, series, cine, comunidad, TMDB, Pixela" />
      <meta name="author" content="Pixela" />
      <meta name="theme-color" content="#000000" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Precargar fuentes críticas */}
      <link 
        rel="preload" 
        href="/fonts/Outfit-Bold.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      />
      <link 
        rel="preload" 
        href="/fonts/Outfit-Regular.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      />
      
      {/* Preconectar a dominios importantes */}
      <link rel="preconnect" href="https://image.tmdb.org" />
      <link rel="dns-prefetch" href="https://image.tmdb.org" />
      
      {/* Metadatos para redes sociales */}
      <meta property="og:title" content="Pixela - Pasión por el cine y las series" />
      <meta 
        property="og:description" 
        content="Descubre, colecciona y comparte experiencias audiovisuales en una comunidad de apasionados del cine y las series." 
      />
      <meta property="og:image" content="/images/pixela-og-image.jpg" />
      <meta property="og:url" content="https://pixela.io" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Pixela" />
      <meta property="og:locale" content="es_ES" />
    
      {/* Configuraciones de seguridad */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="robots" content="index, follow" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* Configuraciones de caché y rendimiento */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
    </>
  );
} 