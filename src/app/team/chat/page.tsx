'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatBox from '@/components/team/ChatBox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { io, Socket } from 'socket.io-client';
import { useUser } from '@clerk/nextjs';

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
  const [senderName, setSenderName] = useState('');
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user, isLoaded } = useUser();

  // Set up Socket.io connection
  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin, {
      path: '/api/socketio',
    });

    // Set up Socket.io event listeners
    socketInstance.on('connect', () => {
      console.log('Socket.io connected');
      setIsConnected(true);
      
      // Join the team room
      socketInstance.emit('join-team', teamId);
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket.io disconnected');
      setIsConnected(false);
    });

    socketInstance.on('connect_error', (err) => {
      console.error('Socket.io connection error:', err);
      toast.error('Chat connection failed. Trying to reconnect...');
    });

    // Listen for new messages
    socketInstance.on('new-message', (message: Message) => {
      setMessages(prevMessages => {
        // Check if message already exists (avoid duplicates)
        if (prevMessages.some(msg => msg.id === message.id)) {
          return prevMessages;
        }
        return [...prevMessages, message];
      });
    });

    // Store socket instance
    setSocket(socketInstance);

    // Clean up on unmount
    return () => {
      console.log('Disconnecting socket');
      socketInstance.off('new-message');
      socketInstance.off('connect');
      socketInstance.off('disconnect');
      socketInstance.off('connect_error');
      
      // Leave the team room
      socketInstance.emit('leave-team', teamId);
      socketInstance.disconnect();
    };
  }, [teamId]);

  // Set user name when Clerk user is loaded
  useEffect(() => {
    if (isLoaded && user) {
      setSenderName(user.fullName || user.firstName || user.username || 'Anonymous User');
    }
  }, [isLoaded, user]);

  // Fetch initial messages on mount
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
  }, [teamId]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || !socket || !isConnected) return;

    try {
      const userId = user?.id || 'anonymous';
      
      const newMessage = {
        id: `msg_${Date.now()}`,
        teamId,
        sender: userId,
        senderName,
        message: messageText,
        createdAt: new Date().toISOString(),
      };

      // Emit the message via Socket.io
      socket.emit('send-message', newMessage);
      
      // Optimistically add message to UI
      setMessages(prevMessages => [...prevMessages, newMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTeamId = e.target.value;
    setTeamId(newTeamId);
    
    // Leave the current team room and join the new one
    if (socket && isConnected) {
      socket.emit('leave-team', teamId);
      socket.emit('join-team', newTeamId);
    }
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
          {isConnected && (
            <div className="mt-1 flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs text-muted-foreground">Connected</span>
            </div>
          )}
          {!isConnected && loading && (
            <div className="mt-1 flex items-center">
              <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
              <span className="text-xs text-muted-foreground">Connecting...</span>
            </div>
          )}
          {!isConnected && !loading && (
            <div className="mt-1 flex items-center">
              <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
              <span className="text-xs text-muted-foreground">Disconnected</span>
            </div>
          )}
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
            currentUserId={user?.id || ''}
            loading={loading}
            onSendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
} 