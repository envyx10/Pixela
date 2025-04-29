'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a la página de login de Laravel
    window.location.href = 'http://localhost/login';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-pixela-dark">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-pixela-light mb-4">Redirigiendo al login...</h1>
        <p className="text-pixela-light/80">Si no eres redirigido automáticamente, haz clic <a href="http://localhost/login" className="text-pixela-accent hover:underline">aquí</a></p>
      </div>
    </div>
  );
} 