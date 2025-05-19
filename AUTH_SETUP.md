# Authentication Setup for HackFlow

This project uses NextAuth.js for authentication. Below is a guide on how to set up authentication.

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
# Database
DATABASE_URL="postgresql://neondb_owner:npg_pf1KbgNautc0@ep-little-darkness-a5cdapql-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secret_here" # Generate with: openssl rand -base64 32

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""

# Perplexity API
PERPLEXITY_API_KEY="your_perplexity_key_here"
```

## Database Setup

The authentication system requires a users table. You can set up the database by visiting:

1. `/api/setup` endpoint in your browser
2. Or clicking the "Setup Database" button on the Ideas page

This will create all necessary tables including the users table.

## Credentials for Testing

A demo user is automatically created during setup:

- Email: demo@example.com
- Password: password123

## OAuth Configuration (Optional)

To enable social logins:

### Google Auth

1. Go to the [Google Developer Console](https://console.developers.google.com/)
2. Create a new project
3. Configure the OAuth consent screen
4. Create OAuth credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Add the client ID and secret to your `.env.local` file

### GitHub Auth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Add Homepage URL: `http://localhost:3000`
4. Add authorization callback URL: `http://localhost:3000/api/auth/callback/github`
5. Add the client ID and secret to your `.env.local` file

## Authentication Pages

The following authentication pages are available:

- Sign In: `/auth/signin`
- Sign Up: `/auth/signup`
- Sign Out: `/auth/signout`
- Error: `/auth/error`

## Session Usage

You can access the session in your components using the `useSession` hook:

```jsx
import { useSession } from 'next-auth/react';

export default function MyComponent() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  
  if (!session) {
    return <p>Not signed in</p>;
  }
  
  return (
    <div>
      <p>Signed in as {session.user.name}</p>
    </div>
  );
}
```

For server components, you can use the auth.ts utilities:

```jsx
import { getCurrentUser } from '@/lib/auth';

export default async function ServerComponent() {
  const user = await getCurrentUser();
  
  if (!user) {
    return <p>Not signed in</p>;
  }
  
  return (
    <div>
      <p>Signed in as {user.name}</p>
    </div>
  );
}
``` 