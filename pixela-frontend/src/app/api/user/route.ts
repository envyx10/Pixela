import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

// GET /api/user - Get current authenticated user
export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      user_id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      photo_url: session.user.image,
      is_admin: (session.user as { isAdmin?: boolean }).isAdmin ?? false,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
