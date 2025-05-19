'use client';

import { useState } from 'react';
import ProfileForm from '@/components/team/ProfileForm';
import TeamMatchSuggestions from '@/components/team/TeamMatchSuggestions';
import { TeamProfile } from '@/lib/neonClient';

export default function TeamPage() {
  const [userProfile, setUserProfile] = useState<(TeamProfile & { id: string }) | null>(null);
  const [showMatches, setShowMatches] = useState(false);

  const handleProfileSubmit = (profile: TeamProfile & { id: string }) => {
    setUserProfile(profile);
    setShowMatches(true);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Smart Team Formation</h1>
        <p className="text-muted-foreground">
          Create your profile and find the perfect teammates for your next hackathon
        </p>
      </div>

      {!showMatches ? (
        <ProfileForm onSubmit={handleProfileSubmit} />
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Your Potential Teammates</h2>
            <button 
              className="text-sm text-primary hover:underline" 
              onClick={() => setShowMatches(false)}
            >
              Edit Your Profile
            </button>
          </div>
          {userProfile && <TeamMatchSuggestions userProfile={userProfile} />}
        </div>
      )}
    </div>
  );
} 