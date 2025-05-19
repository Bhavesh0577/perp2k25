// Run this script to setup your .env file
// Usage: node setup-env.js

const fs = require('fs');
const path = require('path');

const envContent = `# Connect to Supabase via connection pooling
DATABASE_URL="postgresql://postgres.lsttfcjdvfkeucatrssh:Perp2k25@123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection to the database. Used for migrations
DIRECT_URL="postgresql://postgres.lsttfcjdvfkeucatrssh:Perp2k25@123@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"

# Perplexity API key
PERPLEXITY_API_KEY="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"
`;

fs.writeFileSync(path.join(__dirname, '.env'), envContent);
console.log('.env file created successfully!');
console.log('Please replace [YOUR-PASSWORD] with your actual Supabase database password');
console.log('Also replace the Perplexity API key with your actual key'); 