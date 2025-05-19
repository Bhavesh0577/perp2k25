import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/neonClient';

// GET /api/ideas - Get all ideas (or filter by user_id)
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('user_id');
    
    // Build SQL query
    let queryText = 'SELECT * FROM ideas';
    const queryParams = [];
    
    // Add filter if user_id is provided
    if (userId) {
      queryText += ' WHERE user_id = $1';
      queryParams.push(userId);
    }
    
    // Sort by creation date descending
    queryText += ' ORDER BY created_at DESC';
    
    // Execute the query
    const result = await pool.query(queryText, queryParams);
    
    return NextResponse.json({ 
      success: true,
      data: result.rows 
    });
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch ideas'
    }, { status: 500 });
  }
}

// POST /api/ideas - Create a new idea
export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const { title, description, flowchart, user_id } = await request.json();
    
    // Validate required fields
    if (!title || !description || !flowchart) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 });
    }
    
    // Insert the idea
    const result = await pool.query(
      `INSERT INTO ideas (title, description, flowchart, user_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, description, flowchart, user_id || null]
    );
    
    // Return the newly created idea
    return NextResponse.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating idea:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create idea'
    }, { status: 500 });
  }
} 