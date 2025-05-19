'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Main page component that provides the Suspense boundary
export default function AuthErrorPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Suspense fallback={<ErrorCardSkeleton />}>
        <ErrorCard />
      </Suspense>
    </div>
  );
}

// Simple skeleton while loading
function ErrorCardSkeleton() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Loading...</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-20 animate-pulse bg-muted rounded-md"></div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <div className="h-10 w-24 animate-pulse bg-muted rounded-md"></div>
        <div className="h-10 w-24 animate-pulse bg-muted rounded-md"></div>
      </CardFooter>
    </Card>
  );
}

// Client component that uses the useSearchParams hook
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function ErrorCard() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>('An unknown error occurred');
  
  useEffect(() => {
    const error = searchParams?.get('error');
    
    if (error) {
      switch (error) {
        case 'Configuration':
          setErrorMessage('There is a problem with the server configuration.');
          break;
        case 'AccessDenied':
          setErrorMessage('Access denied. You do not have permission to sign in.');
          break;
        case 'Verification':
          setErrorMessage('The verification link is invalid or has expired.');
          break;
        case 'OAuthSignin':
        case 'OAuthCallback':
        case 'OAuthCreateAccount':
        case 'EmailCreateAccount':
        case 'Callback':
          setErrorMessage('There was a problem signing in with your account provider.');
          break;
        case 'OAuthAccountNotLinked':
          setErrorMessage('Your email is already used with a different account. Please sign in using the original provider.');
          break;
        case 'EmailSignin':
          setErrorMessage('There was a problem sending the email or the link has expired.');
          break;
        case 'CredentialsSignin':
          setErrorMessage('The email or password you entered is incorrect.');
          break;
        default:
          setErrorMessage('An unknown error occurred during authentication.');
      }
    }
  }, [searchParams]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
        <CardDescription>There was a problem signing you in</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button asChild variant="outline">
          <Link href="/">Go Home</Link>
        </Button>
        <Button asChild>
          <Link href="/auth/signin">Try Again</Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 