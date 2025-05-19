import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { pool } from "@/lib/neonClient";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";

// Define custom types for session
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

// Define authentication handlers with various providers
export const authOptions: NextAuthOptions = {
  // Configure authentication providers
  providers: [
    // Username/password login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Check if user exists in database
          const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [credentials.email]
          );

          const user = result.rows[0];

          if (!user) {
            return null;
          }

          // Verify password
          const passwordMatch = await compare(credentials.password, user.password);

          if (!passwordMatch) {
            return null;
          }

          // Return user object without password
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image || null,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      }
    }),
    // OAuth providers - Add your own client IDs and secrets in .env
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  // Database session handling
  session: {
    strategy: "jwt" as const,
  },
  // Secret for JWT
  secret: process.env.NEXTAUTH_SECRET || "your-development-secret-replace-in-production",
  // Pages configuration for custom auth pages
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  // Callbacks for custom logic
  callbacks: {
    // Add custom properties to session
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
    // Add custom logic to JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
};

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