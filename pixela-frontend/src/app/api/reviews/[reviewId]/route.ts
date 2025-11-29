import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

interface RouteParams {
  params: Promise<{ reviewId: string }>;
}

// PUT /api/reviews/[reviewId] - Update a review
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { reviewId } = await params;
    
    const body = await request.json();
    const { rating, review: reviewText } = body;
    
    // Validation
    if (rating === undefined) {
      return NextResponse.json(
        { success: false, message: 'rating is required' },
        { status: 400 }
      );
    }
    
    if (typeof rating !== 'number' || rating < 0 || rating > 10) {
      return NextResponse.json(
        { success: false, message: 'rating must be a number between 0 and 10' },
        { status: 400 }
      );
    }
    
    if (reviewText && reviewText.length > 600) {
      return NextResponse.json(
        { success: false, message: 'review must be at most 600 characters' },
        { status: 400 }
      );
    }
    
    const userId = session.user.id;
    const isAdmin = (session.user as { isAdmin?: boolean }).isAdmin ?? false;
    
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });
    
    if (!existingReview) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      );
    }
    
    if (existingReview.userId !== userId && !isAdmin) {
      return NextResponse.json(
        { success: false, message: 'You are not authorized to update this review.' },
        { status: 403 }
      );
    }
    
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        rating: rating,
        review: reviewText || null,
      },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Review updated successfully',
      data: updatedReview,
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

// DELETE /api/reviews/[reviewId] - Delete a review
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { reviewId } = await params;
    
    const userId = session.user.id;
    const isAdmin = (session.user as { isAdmin?: boolean }).isAdmin ?? false;
    
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });
    
    if (!existingReview) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      );
    }
    
    if (existingReview.userId !== userId && !isAdmin) {
      return NextResponse.json(
        { success: false, message: 'You are not authorized to delete this review.' },
        { status: 403 }
      );
    }
    
    await prisma.review.delete({
      where: { id: reviewId },
    });
    
    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully',
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
