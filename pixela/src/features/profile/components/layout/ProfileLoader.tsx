const STYLES = {
  container: 'flex flex-col items-center justify-center p-8 space-y-4',
  spinner: 'w-12 h-12 border-4 border-pixela-primary/20 border-t-pixela-primary rounded-full animate-spin',
  text: 'text-gray-400 text-lg font-outfit'
} as const;

/**
 * Componente que muestra un estado de carga para el perfil
 * @returns {JSX.Element} Componente ProfileLoader
 */
export const ProfileLoader = () => {
  return (
    <div className={STYLES.container}>
      <div className={STYLES.spinner} />
      <p className={STYLES.text}>Cargando perfil...</p>
    </div>
  );
}; 