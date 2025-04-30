export default function Head() {
  return (
    <>
      <title>Pixela - Descubre y comparte apasionantes historias cinematográficas</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta 
        name="description" 
        content="Pixela es una comunidad para los amantes del cine y las series. Descubre historias que te conectan con grandes producciones audiovisuales." 
      />
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
      <meta property="og:title" content="Pixela - Pasión por el cine y las series" />
      <meta 
        property="og:description" 
        content="Descubre, colecciona y comparte experiencias audiovisuales en una comunidad de apasionados del cine y las series." 
      />
      <meta property="og:image" content="/images/pixela-og-image.jpg" />
      <meta property="og:url" content="https://pixela.io" />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Pixela - Pasión por el cine y las series" />
      <meta 
        name="twitter:description" 
        content="Descubre, colecciona y comparte experiencias audiovisuales en una comunidad de apasionados del cine y las series." 
      />
      <meta name="twitter:image" content="/images/pixela-twitter-card.jpg" />
    </>
  );
} 