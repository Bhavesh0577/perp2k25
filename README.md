# HackFlow

AI-powered Hackathon Platform with idea generation, flowchart visualization, and project tracking.

## Features

- AI Idea Generator using Perplexity API
- Flowchart visualization with Mermaid.js
- PostgreSQL database integration with Prisma
- Idea saving and retrieval

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Setup environment variables:
   ```
   node setup-env.js
   ```
4. Edit the `.env` file with your actual Supabase and Perplexity API credentials:
   ```
   DATABASE_URL="postgresql://postgres.lsttfcjdvfkeucatrssh:your-actual-password@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.lsttfcjdvfkeucatrssh:your-actual-password@aws-0-ap-south-1.pooler.supabase.com:5432/postgres" 
   PERPLEXITY_API_KEY="your-perplexity-api-key"
   ```
5. Push the Prisma schema to your database:
   ```
   npx prisma db push
   ```
6. Generate Prisma client:
   ```
   npx prisma generate
   ```
7. Run the development server:
   ```
   npm run dev
   ```
8. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The database has a single table:

**Idea**
- `id`: UUID (primary key)
- `created_at`: Timestamp (default: now)
- `title`: String
- `description`: String 
- `flowchart`: String (Mermaid syntax)
- `user_id`: String (optional)

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL (via Supabase)
- Mermaid.js
- Perplexity API
