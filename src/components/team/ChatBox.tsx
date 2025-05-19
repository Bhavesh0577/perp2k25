'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SendIcon, AlertCircleIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Message = {
  id: string;
  teamId: string;
  sender: string;
  senderName?: string;
  message: string;
  createdAt: string;
};

interface ChatBoxProps {
  messages: Message[];
  currentUserId: string;
  loading: boolean;
  onSendMessage: (message: string) => void;
}

export default function ChatBox({ 
  messages, 
  currentUserId, 
  loading, 
  onSendMessage 
}: ChatBoxProps) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [errorState, setErrorState] = useState<boolean>(false);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      try {
        setErrorState(false);
        onSendMessage(newMessage);
        setNewMessage('');
      } catch (error) {
        setErrorState(true);
        console.error('Error sending message:', error);
      }
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  // Format timestamp to readable time
  const formatTime = (timestamp: string): string => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return 'Unknown time';
    }
  };

  return (
    <Card className="flex flex-col h-[70vh] shadow-md">
      <CardHeader className="pb-3 border-b">
        <div className="flex justify-between items-center">
          <CardTitle>Team Messages</CardTitle>
          <Badge variant="outline">{messages.length} messages</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto pt-4 pb-0 px-4">
        {loading ? (
          <div className="space-y-6 py-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-12 w-[80%] ml-10" />
              </div>
            ))}
          </div>
        ) : messages.length > 0 ? (
          <div className="space-y-6">
            {messages.map((msg, index) => {
              const isCurrentUser = msg.sender === currentUserId;
              const showSender = index === 0 || messages[index - 1].sender !== msg.sender;
              const senderDisplayName = msg.senderName || msg.sender;
              const initials = getInitials(senderDisplayName);

              return (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}
                >
                  {showSender && (
                    <div className={`flex items-center gap-2 mb-1 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                      <Avatar className="h-6 w-6 text-xs">
                        <AvatarFallback className={isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}>
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-muted-foreground">
                        {senderDisplayName}
                      </span>
                    </div>
                  )}
                  
                  <div className={`flex items-end gap-2 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                    <div 
                      className={`px-4 py-2 rounded-lg max-w-[80%] ${
                        isCurrentUser 
                          ? 'bg-primary text-primary-foreground rounded-tr-none' 
                          : 'bg-muted rounded-tl-none'
                      }`}
                    >
                      {msg.message}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <div className="bg-muted/50 p-3 rounded-full">
              <MessageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-muted-foreground">No messages yet</p>
              <p className="text-sm text-muted-foreground">
                Send a message to start the conversation!
              </p>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
            autoComplete="off"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <SendIcon className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

function MessageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
} 