import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * POST /api/auth/logout
 * Cierra la sesión del usuario eliminando las cookies de autenticación
 */
export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // Eliminar cookies de sesión
    cookieStore.delete('XSRF-TOKEN');
    cookieStore.delete('pixela_session');
    
    return NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout error:', error);
    
    // Aunque falle, devolvemos 200 para permitir logout del cliente
    return NextResponse.json(
      { message: 'Logged out' },
      { status: 200 }
    );
  }
}
