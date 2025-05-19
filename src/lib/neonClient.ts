import { Pool } from 'pg';

// Neon DB connection
const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_pf1KbgNautc0@ep-little-darkness-a5cdapql-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require';

// Create PostgreSQL pool
export const pool = new Pool({
  connectionString,
});

// Log connection status for debugging
console.log('Database connection string configured:', connectionString ? 'Yes (Found)' : 'No (Missing)');

// Export types
export type Idea = {
  id?: string;
  created_at?: Date | string;
  title: string;
  description: string;
  flowchart: string;
  user_id?: string;
};

export type TeamProfile = {
  id?: string;
  created_at?: Date | string;
  name: string;
  email: string;
  role: string;
  techStack: string;
  skills: string;
  availability: string[];
  lookingFor: string[];
  githubRepo?: string;
  discordLink?: string;
}; 