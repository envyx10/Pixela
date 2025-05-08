// app/not-found.tsx

import Image from 'next/image';
export default function NotFound() {
  return (
    <div className="p-0 text-center h-screen w-screen flex flex-col justify-center overflow-hidden relative">
    
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
