# Neon DB Setup for HackFlow

This project now uses Neon DB instead of Supabase for database storage. Follow these instructions to set up your database.

## Database Connection

The application is configured to use the following Neon DB connection string:

```
postgresql://neondb_owner:npg_pf1KbgNautc0@ep-little-darkness-a5cdapql-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
```

## Environment Setup

1. Create a `.env.local` file in the root of your project
2. Add the following environment variable:

```
NEON_DB_URL=postgresql://neondb_owner:npg_pf1KbgNautc0@ep-little-darkness-a5cdapql-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
```

## Database Schema Setup

The required tables can be created using the SQL in the `schema.sql` file.

You can execute the schema file in several ways:

### Using `psql` CLI

```bash
psql "postgresql://neondb_owner:npg_pf1KbgNautc0@ep-little-darkness-a5cdapql-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require" -f schema.sql
```

### Using Neon Dashboard

1. Log in to the Neon dashboard
2. Select your project
3. Go to the SQL Editor
4. Copy and paste the contents of `schema.sql`
5. Execute the SQL

## Required Tables

The application needs two tables:

1. `team_profiles` - For storing user profiles in the team formation feature
2. `ideas` - For storing hackathon ideas

The schema for these tables is defined in `schema.sql`.

## Dependencies

This update requires the following npm package:

```bash
npm install pg
```

And for TypeScript support:

```bash
npm install @types/pg --save-dev
```

## Manual Connection Test

To test if your connection is working, you can run this simple Node.js script:

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_pf1KbgNautc0@ep-little-darkness-a5cdapql-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require'
});

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connection successful!', res.rows[0]);
  } catch (err) {
    console.error('Error connecting to database:', err);
  } finally {
    await pool.end();
  }
}

testConnection();
```

Save this as `test-db.js` and run it with `node test-db.js`. 