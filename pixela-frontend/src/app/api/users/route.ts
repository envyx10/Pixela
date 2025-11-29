import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';

// GET /api/users - List all users (admin only)
export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const isAdmin = (session.user as { isAdmin?: boolean }).isAdmin ?? false;
    
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: 'You are not authorized to list users' },
        { status: 403 }
      );
    }
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        photoUrl: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    const formattedUsers = users.map((user) => ({
      user_id: user.id,
      name: user.name,
      email: user.email,
      photo_url: user.photoUrl,
      is_admin: user.isAdmin,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    }));
    
    return NextResponse.json({
      message: 'Users listed successfully',
      users: formattedUsers,
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

// POST /api/users - Create a new user (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const isAdmin = (session.user as { isAdmin?: boolean }).isAdmin ?? false;
    
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: 'You are not authorized to create users' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const { name, email, password, password_confirmation, is_admin, photo_url } = body;
    
    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'name, email, and password are required' },
        { status: 400 }
      );
    }
    
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'password must be at least 8 characters' },
        { status: 400 }
      );
    }
    
    if (password_confirmation && password !== password_confirmation) {
      return NextResponse.json(
        { success: false, message: 'password and password_confirmation do not match' },
        { status: 400 }
      );
    }
    
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'A user with this email already exists' },
        { status: 400 }
      );
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin: is_admin ?? false,
        photoUrl: photo_url ?? null,
      },
    });
    
    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          user_id: user.id,
          name: user.name,
          email: user.email,
          photo_url: user.photoUrl,
          is_admin: user.isAdmin,
          created_at: user.createdAt,
          updated_at: user.updatedAt,
        },
      },
      { status: 201 }
    );
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
