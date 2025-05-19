'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatBox from '@/components/team/ChatBox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';

// In a real application, this would come from authentication
const MOCK_USER = {
  id: 'user-1',
  name: 'Current User',
};

// In a real application, this would be selected by the user
const MOCK_TEAM_ID = 'team-1';

type Message = {
  id: string;
  teamId: string;
  sender: string;
  senderName?: string;
  message: string;
  createdAt: string;
};

export default function TeamChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [teamId, setTeamId] = useState(MOCK_TEAM_ID);
  const [senderName, setSenderName] = useState(MOCK_USER.name);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch messages on mount and periodically
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages?teamId=${teamId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch messages');
        }
        
        const data = await response.json();
        setMessages(data.messages || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Failed to load messages. You may need to initialize the database first.');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchMessages();

    // Poll for new messages every 3 seconds
    const interval = setInterval(fetchMessages, 3000);

    // Clean up on unmount
    return () => clearInterval(interval);
  }, [teamId]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    try {
      const newMessage = {
        teamId,
        sender: MOCK_USER.id,
        senderName,
        message: messageText,
      };

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      // Immediately refresh messages
      const refreshResponse = await fetch(`/api/messages?teamId=${teamId}`);
      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamId(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenderName(e.target.value);
  };

  const initializeDatabase = async () => {
    try {
      setIsInitializing(true);
      const response = await fetch('/api/initialize');
      
      if (!response.ok) {
        throw new Error('Failed to initialize database');
      }
      
      toast.success('Database initialized successfully! Refreshing messages...');
      
      // Refresh messages after initialization
      const refreshResponse = await fetch(`/api/messages?teamId=${teamId}`);
      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        setMessages(data.messages || []);
        setError(null);
      }
    } catch (error) {
      console.error('Error initializing database:', error);
      toast.error('Failed to initialize database');
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Team Chat</h1>
          <p className="text-muted-foreground">
            Collaborate in real-time with your team members
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={initializeDatabase} 
            disabled={isInitializing}
          >
            {isInitializing ? 'Initializing...' : 'Setup Database'}
          </Button>
          <Button asChild variant="outline">
            <Link href="/team/profile">Manage Team Profile</Link>
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-destructive/10 p-4 rounded-lg text-destructive">
          <p className="font-medium">Error: {error}</p>
          <p className="text-sm mt-1">Try clicking the "Setup Database" button to initialize the required database tables.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name</label>
                <Input
                  value={senderName}
                  onChange={handleNameChange}
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Team ID</label>
                <Input
                  value={teamId}
                  onChange={handleTeamChange}
                  placeholder="Enter team ID"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <ChatBox
            messages={messages}
            currentUserId={MOCK_USER.id}
            loading={loading}
            onSendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
} 