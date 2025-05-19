import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  
  return session?.user;
}

// Middleware for protected API routes
export async function isAuthenticated(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  const session = await getSession();
  
  if (!session?.user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }
  
  return handler(request);
}

// Middleware for checking if user owns a resource
export async function isResourceOwner(
  request: NextRequest,
  userId: string,
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  const session = await getSession();
  
  if (!session?.user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }
  
  if (session.user.id !== userId) {
    return NextResponse.json(
      { error: "Unauthorized access" },
      { status: 403 }
    );
  }
  
  return handler(request);
} 