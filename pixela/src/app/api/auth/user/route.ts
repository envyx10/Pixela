import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Transform Prisma model to UserResponse interface format (snake_case)
    // to maintain compatibility with the frontend types
    const responseData = {
      user_id: user.id,
      name: user.name,
      email: user.email,
      photo_url: user.photoUrl,
      is_admin: user.isAdmin,
      // Security: Never send the password hash to the client
      password: '', 
      created_at: user.createdAt.toISOString(),
      updated_at: user.updatedAt.toISOString(),
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('[API_AUTH_USER]', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
