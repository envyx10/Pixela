/**
 * Componentes de skeleton para la sección discover, rediseñados para una estética moderna y sutil.
 * 
 */

/**
 * Skeleton para una tarjeta individual de la sección "Descubrir".
 */
const DiscoverCardSkeleton = ({ delay }: { delay: number }) => (
  <div 
    className="w-full aspect-[2/3] bg-pixela-dark/30 rounded-2xl animate-pulse"
    style={{ animationDelay: `${delay}ms` }}
  />
);

/**
 * Skeleton mejorado para toda la página de "Descubrir".
 * Utiliza un grid adaptable y una animación de pulso sutil.
 */
export const DiscoverGridSkeleton = () => {
  const STYLES = {
    container: "w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8",
    header: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
    title: "h-9 w-64 bg-pixela-light/10 rounded-lg animate-pulse",
    selectors: "flex gap-3",
    selector: "h-10 w-32 bg-pixela-dark/30 rounded-lg animate-pulse",
    grid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2k:grid-cols-7 gap-4 sm:gap-6",
  };

  return (
    <div className={STYLES.container}>
      <div className={STYLES.header}>
        <div className={STYLES.title} />
        <div className={STYLES.selectors}>
          <div className={STYLES.selector} style={{ animationDelay: '100ms' }} />
          <div className={STYLES.selector} style={{ animationDelay: '200ms' }} />
        </div>
      </div>

      <div className={STYLES.grid}>
        {[...Array(14)].map((_, index) => (
          <DiscoverCardSkeleton key={index} delay={index * 80} />
        ))}
      </div>
    </div>
  );
}; 