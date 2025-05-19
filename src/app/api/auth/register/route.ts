import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { pool } from '@/lib/neonClient';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, password } = body;
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email and password are required' },
        { status: 400 }
      );
    }
    
    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' }, 
        { status: 400 }
      );
    }
    
    // Check if password is strong enough
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash password
    const hashedPassword = await hash(password, 10);
    
    // Generate a UUID for the user
    const userId = uuidv4();
    
    // Create avatar URL using UI Avatars
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
    
    // Insert new user
    await pool.query(
      'INSERT INTO users (id, name, email, password, image) VALUES ($1, $2, $3, $4, $5)',
      [userId, name, email, hashedPassword, avatarUrl]
    );
    
    // Return success response (excluding password)
    return NextResponse.json({
      id: userId,
      name,
      email,
      image: avatarUrl,
      created_at: new Date(),
    });
    
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
} 