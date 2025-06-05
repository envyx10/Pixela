
//TODO: Página de error 404 - Agregar imagen y mejorar la funcionalidad

import Image from 'next/image';
export default function NotFound() {
  return (
    <div className="relative flex flex-col justify-center w-screen h-screen p-0 overflow-hidden text-center">
    
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image 
          src="/images/404.png" 
          alt="404" 
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
