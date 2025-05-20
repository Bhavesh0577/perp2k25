'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface WithAuthProps {
  children: ReactNode;
  redirectUrl?: string;
}

export default function WithAuth({ children, redirectUrl = '/sign-in' }: WithAuthProps) {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Get the current path to redirect back after login
      const currentPath = window.location.pathname;
      router.push(`${redirectUrl}?redirect_url=${currentPath}`);
    }
  }, [isLoaded, isSignedIn, router, redirectUrl]);

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-10 w-1/3 mx-auto" />
        </div>
      </div>
    );
  }

  // If not authenticated, don't render children
  if (!isSignedIn) {
    return null; // Will be redirected by the useEffect
  }

  // User is authenticated, render the children
  return <>{children}</>;
} 