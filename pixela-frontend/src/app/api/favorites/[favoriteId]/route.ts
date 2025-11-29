import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

interface RouteParams {
  params: Promise<{ favoriteId: string }>;
}

// DELETE /api/favorites/[favoriteId] - Remove a favorite
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { favoriteId } = await params;
    
    const userId = session.user.id;
    
    const favorite = await prisma.favorite.findUnique({
      where: { id: favoriteId },
    });
    
    if (!favorite) {
      return NextResponse.json(
        { success: false, message: 'Favorite not found' },
        { status: 404 }
      );
    }
    
    if (favorite.userId !== userId) {
      return NextResponse.json(
        { success: false, message: 'You are not authorized to delete this favorite' },
        { status: 403 }
      );
    }
    
    await prisma.favorite.delete({
      where: { id: favoriteId },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Favorite item removed successfully',
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
