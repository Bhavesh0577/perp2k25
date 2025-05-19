# Migration from Supabase to Neon DB

This document outlines the migration from Supabase to Neon DB in the HackFlow application.

## Migration Summary

We've migrated the database layer from Supabase to Neon DB, a PostgreSQL-compatible serverless database. The migration involved:

1. Creating a Neon DB client connection
2. Converting Supabase API calls to direct PostgreSQL queries
3. Setting up equivalent database schema in Neon DB
4. Updating server actions to use the new database connection

## Changes Made

### New Files
- `src/lib/neonClient.ts` - New Neon DB client
- `schema.sql` - Database schema definition
- `setup-neon-db.js` - Setup script for Neon DB
- `NEON_DB_SETUP.md` - Setup instructions

### Updated Files
- `src/lib/actions.ts` - Updated to use Neon DB for ideas
- `src/lib/teamActions.ts` - Updated to use Neon DB for team profiles
- `src/app/api/ideas/route.ts` - Updated API endpoints for ideas
- `src/app/team/page.tsx` - Fixed TypeScript errors
- `src/components/team/ProfileForm.tsx` - Updated imports and type handling
- `src/components/team/TeamMatchSuggestions.tsx` - Updated imports and type handling
- `package.json` - Added PostgreSQL dependencies

## How to Migrate

1. Install the required dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables in `.env.local`:
   ```
   NEON_DB_URL=postgresql://neondb_owner:npg_pf1KbgNautc0@ep-little-darkness-a5cdapql-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

3. Run the database setup script:
   ```bash
   npm run setup-db
   ```

4. Restart your development server:
   ```bash
   npm run dev
   ```

## Data Migration

If you have existing data in Supabase that needs to be migrated to Neon DB, you can:

1. Export your data from Supabase as CSV or JSON
2. Convert it to SQL INSERT statements
3. Execute the INSERT statements against your Neon DB

Example SQL to insert data:

```sql
-- Insert team profiles
INSERT INTO team_profiles (name, email, role, tech_stack, skills, availability, looking_for)
VALUES 
  ('John Doe', 'john@example.com', 'Frontend Developer', 'React, TypeScript', 'UI/UX, Performance optimization', '["weekdays", "evenings"]', '["Backend Developer", "UI/UX Designer"]'),
  ('Jane Smith', 'jane@example.com', 'Backend Developer', 'Node.js, PostgreSQL', 'API design, Database optimization', '["weekends", "afternoons"]', '["Frontend Developer", "DevOps Engineer"]');

-- Insert ideas
INSERT INTO ideas (title, description, flowchart, user_id)
VALUES
  ('AI Learning Platform', 'An AI-powered learning platform that adapts to the user''s learning style.', 'flowchart content here', null),
  ('Sustainable Delivery App', 'A delivery app that prioritizes eco-friendly routes and packaging.', 'flowchart content here', null);
```

## Troubleshooting

If you encounter any issues with the database connection:

1. Verify your Neon DB connection string in `.env.local`
2. Check that the required tables have been created
3. Run the setup script again with `npm run setup-db`
4. Check the server logs for any database connection errors

## Benefits of Neon DB

- Serverless PostgreSQL
- SQL standards compliance
- Automatic scaling
- Better performance for our application needs
- More direct control over database operations 