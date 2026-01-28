'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TextInput } from '@/features/auth/components/TextInput';
import { RoundedButton } from '@/features/auth/components/RoundedButton';
import { VscMail, VscLock } from 'react-icons/vsc';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Estas credenciales no coinciden con nuestros registros.');
      } else {
        router.push('/');
        router.refresh(); // Actualizar componentes servidor
      }
    } catch (err) {
      setError('Ocurrió un error inesperado. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="py-4 space-y-6 w-full max-w-xs mx-auto px-4">
      {/* Title */}
      <h2 className="text-[24px] font-['Outfit'] text-white font-bold mb-8">
        Bienvenido a Pixela | <span className="text-gray-500">Iniciar sesión</span>
      </h2>

      {/* Email Address */}
      <div className="relative mb-5">
        <TextInput 
          id="email" 
          name="email"
          type="email"
          placeholder="Email"
          icon={<VscMail />}
          required 
          autoFocus 
          autoComplete="username"
        />
      </div>

      {/* Password */}
      <div className="relative mb-5">
        <TextInput 
          id="password"
          name="password"
          type="password"
          placeholder="Contraseña"
          icon={<VscLock />}
          required 
          autoComplete="current-password"
        />
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="text-[#ec1b69] text-[14px] font-['Outfit']">
          {error}
        </div>
      )}

      {/* Iniciar button */}
      <div className="mb-6">
        <RoundedButton type="submit" disabled={loading}>
          {loading ? 'Iniciando...' : 'Iniciar'}
        </RoundedButton>
      </div>
      
      {/* Enlaces de ayuda */}
      <div className="flex flex-col gap-4">
        <Link 
          href="/forgot-password" // TODO: Implementar
          className="text-[15px] font-['Outfit'] text-gray-400 hover:text-[#ec1b69] transition-colors duration-300"
        >
          ¿Olvidaste tu contraseña?
        </Link>
          
        <div className="text-[15px] font-['Outfit'] text-gray-400">
          ¿No tienes cuenta?
          <Link 
            href="/register" 
            className="ml-2 text-[#ec1b69] hover:text-[#ec1b69]/80 transition-colors duration-300"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </form>
  );
}
