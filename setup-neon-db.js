// Neon DB Connection Test
// Run with: node setup-neon-db.js

const { Pool } = require('pg');

// The connection string provided by the user
const connectionString = 'postgresql://neondb_owner:npg_pf1KbgNautc0@ep-little-darkness-a5cdapql-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require';

// Create a connection pool
const pool = new Pool({ connectionString });

// Setup database tables
const schema = `
-- Create team_profiles table
CREATE TABLE IF NOT EXISTS team_profiles (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL,
  tech_stack TEXT NOT NULL,
  skills TEXT NOT NULL,
  availability JSONB DEFAULT '[]'::JSONB,
  looking_for JSONB DEFAULT '[]'::JSONB
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_team_profiles_role ON team_profiles(role);
CREATE INDEX IF NOT EXISTS idx_team_profiles_looking_for ON team_profiles USING GIN (looking_for);

-- Ideas table
CREATE TABLE IF NOT EXISTS ideas (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  flowchart TEXT NOT NULL,
  user_id TEXT
);
`;

async function setupDatabase() {
  console.log('Connecting to Neon DB...');
  
  try {
    // Test connection
    const testResult = await pool.query('SELECT NOW() as current_time');
    console.log(`✅ Connection successful! Server time: ${testResult.rows[0].current_time}`);
    
    // Create tables
    console.log('Creating database tables...');
    await pool.query(schema);
    console.log('✅ Database tables created successfully!');
    
    // Test tables existence
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('team_profiles', 'ideas')
    `);
    
    console.log('Detected tables in database:');
    tablesResult.rows.forEach(row => {
      console.log(`- ${row.table_name}`);
    });
    
    console.log('\n✅ Setup complete! Your Neon DB is ready to use.');
  } catch (error) {
    console.error('❌ Error setting up database:', error);
  } finally {
    // Close the connection pool
    await pool.end();
  }
}

setupDatabase(); 