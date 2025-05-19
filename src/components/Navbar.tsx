'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { RocketIcon, UsersIcon, SearchIcon, SparklesIcon, BarChartIcon, MessageSquareIcon, LogOutIcon, LogInIcon, UserIcon } from 'lucide-react';
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  const navItems = [
    { label: 'Generate Idea', path: '/generate-idea', icon: <SparklesIcon className="h-4 w-4" /> },
    { label: 'Saved Ideas', path: '/idea', icon: <RocketIcon className="h-4 w-4" /> },
    { label: 'Analysis', path: '/analysis', icon: <BarChartIcon className="h-4 w-4" /> },
    { label: 'Team Chat', path: '/team/chat', icon: <MessageSquareIcon className="h-4 w-4" /> },
    { label: 'Team Formation', path: '/team', icon: <UsersIcon className="h-4 w-4" /> },
    { label: 'Hackathon Finder', path: '/finder', icon: <SearchIcon className="h-4 w-4" /> },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <RocketIcon className="h-5 w-5 text-primary" />
              <span className="text-xl font-bold">HackFlow</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {/* Authentication UI */}
            {status === 'loading' ? (
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>
            ) : session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                      <AvatarFallback>{session.user.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session.user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link href="/auth/signin">
                  <LogInIcon className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
            
            <div className="md:hidden">
              {/* Mobile menu hamburger - can be expanded in future */}
              <button className="p-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 