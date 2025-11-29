import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';

interface RouteParams {
  params: Promise<{ userId: string }>;
}

// PUT /api/users/[userId] - Update a user
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { userId } = await params;
    
    const authUserId = session.user.id;
    const isAdmin = (session.user as { isAdmin?: boolean }).isAdmin ?? false;
    
    // Only admin or the user themselves can update
    if (!isAdmin && authUserId !== userId) {
      return NextResponse.json(
        { success: false, message: 'You are not authorized to update this user' },
        { status: 403 }
      );
    }
    
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    const body = await request.json();
    const { name, email, password, photo_url, is_admin } = body;
    
    // Build update data
    const updateData: {
      name?: string;
      email?: string;
      password?: string;
      photoUrl?: string | null;
      isAdmin?: boolean;
    } = {};
    
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) {
      // Check if email is taken by another user
      const emailUser = await prisma.user.findUnique({
        where: { email },
      });
      if (emailUser && emailUser.id !== userId) {
        return NextResponse.json(
          { success: false, message: 'Email is already taken' },
          { status: 400 }
        );
      }
      updateData.email = email;
    }
    if (password !== undefined) {
      if (password.length < 8) {
        return NextResponse.json(
          { success: false, message: 'password must be at least 8 characters' },
          { status: 400 }
        );
      }
      updateData.password = await bcrypt.hash(password, 10);
    }
    if (photo_url !== undefined) updateData.photoUrl = photo_url;
    
    // Only admin can change is_admin
    if (is_admin !== undefined && isAdmin) {
      updateData.isAdmin = is_admin;
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
    
    return NextResponse.json({
      message: 'User updated successfully',
      user: {
        user_id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        photo_url: updatedUser.photoUrl,
        is_admin: updatedUser.isAdmin,
        created_at: updatedUser.createdAt,
        updated_at: updatedUser.updatedAt,
      },
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

// DELETE /api/users/[userId] - Delete a user
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { userId } = await params;
    
    const authUserId = session.user.id;
    const isAdmin = (session.user as { isAdmin?: boolean }).isAdmin ?? false;
    
    // Only admin or the user themselves can delete
    if (!isAdmin && authUserId !== userId) {
      return NextResponse.json(
        { success: false, message: 'You are not authorized to delete this user' },
        { status: 403 }
      );
    }
    
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    await prisma.user.delete({
      where: { id: userId },
    });
    
    return NextResponse.json({
      message: 'User deleted successfully',
      user: {
        user_id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
      },
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
