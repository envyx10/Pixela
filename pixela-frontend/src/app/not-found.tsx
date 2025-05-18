// app/not-found.tsx

import Image from 'next/image';

const STYLES = {
  container: 'p-0 text-center h-screen w-full flex flex-col justify-center overflow-hidden relative',
  background: 'absolute top-0 left-0 w-full h-full -z-10',
  image: 'object-cover',
} as const;

/**
 * Página de error 404 personalizada
 * 
 * @returns Componente de página no encontrada
 */
export default function NotFound() {
  return (
    <div className={STYLES.container}>
      <div className={STYLES.background}>
        <Image 
          src="/images/404.png" 
          alt="Página no encontrada - Error 404" 
          fill
          className={STYLES.image}
          priority
        />
      </div>
    </div>
  );
}
