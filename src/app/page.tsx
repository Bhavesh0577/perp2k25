'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { RocketIcon, LightbulbIcon, NetworkIcon, UsersIcon, BarChart3Icon, MessageSquareIcon, ArrowRightIcon, CheckIcon, CodeIcon, StarIcon, HeartIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [statsLoaded, setStatsLoaded] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Start stats counter animation after a delay
    const timer = setTimeout(() => {
      setStatsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // If the user is not authenticated, redirect to sign in
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
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

  // Stats counter animation
  const stats = [
    { label: "Hackathons", value: "500+" },
    { label: "Ideas Generated", value: "10k+" },
    { label: "Teams Formed", value: "2,500+" },
    { label: "Success Rate", value: "94%" }
  ];

  const features = [
    {
      icon: <LightbulbIcon className="h-10 w-10" />,
      title: "Generate Ideas",
      description: "Create innovative hackathon project ideas using AI assistance.",
      link: "/generate-idea",
      cta: "Generate Now"
    },
    {
      icon: <NetworkIcon className="h-10 w-10" />,
      title: "Create Flowcharts",
      description: "Visualize your project's architecture and data flow with interactive diagrams.",
      link: "/idea",
      cta: "View Saved Ideas"
    },
    {
      icon: <BarChart3Icon className="h-10 w-10" />,
      title: "Analyze Projects",
      description: "Get competitive analysis of your project compared to past winners.",
      link: "/analysis",
      cta: "Analyze Project"
    },
    {
      icon: <UsersIcon className="h-10 w-10" />,
      title: "Team Formation",
      description: "Find teammates with complementary skills for your project.",
      link: "/team",
      cta: "Find Team"
    },
    {
      icon: <MessageSquareIcon className="h-10 w-10" />,
      title: "Team Chat",
      description: "Collaborate in real-time with your team members.",
      link: "/team/chat",
      cta: "Start Chatting"
    },
    {
      icon: <RocketIcon className="h-10 w-10" />,
      title: "Hackathon Finder",
      description: "Discover upcoming hackathons that match your interests.",
      link: "/finder",
      cta: "Find Hackathons"
    }
  ];

  const testimonials = [
    {
      quote: "HackFlow completely transformed how we approach hackathons. The AI idea generation is a game-changer!",
      author: "Sarah Chen",
      role: "Software Engineer"
    },
    {
      quote: "Found an amazing team using HackFlow. We won our first hackathon together!",
      author: "Michael Rodriguez",
      role: "UI/UX Designer"
    },
    {
      quote: "The flowchart feature saved us hours of planning. Our project architecture was crystal clear from the start.",
      author: "Priya Sharma",
      role: "Full Stack Developer"
    }
  ];

  // Only render the original content if authenticated
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with 3D elements */}
        <section className="relative w-full py-20 md:py-32 overflow-hidden">
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background z-0"></div>
          
          {/* 3D-like floating elements */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxODE4MTgiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYgMzBoLTJWMGgydjMwem0tMTAgMGgtMlYwaDF2MzB6bTIwIDBINDRWMGgxdjMwem0tMjAgMEgyNFYwaDJ2MzB6TTEyIDMwSDEwVjBoMnYzMHptMjAgMGgtMVYwaDF2MzB6TTIyIDMwaC0xVjBoMXYzMHptMjAgMGgtMlYwaDJ2MzB6IiBmaWxsPSIjMjkyOTI5IiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTYwIDMwSDMwVjBoMzB2MzB6IiBmaWxsPSIjMjkyOTI5IiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-5 dark:opacity-[0.025]"></div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className={`space-y-4 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full backdrop-blur-sm border border-primary/20">
                  <span className="mr-1">✨</span> Supercharge Your Hackathon Experience
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
                  <span className="relative">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-primary dark:to-primary/80">HackFlow</span>
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent rounded-full"></span>
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-xl text-muted-foreground md:text-2xl">
                  The all-in-one platform for hackathon participants to ideate, organize, and collaborate.
                </p>
              </div>
              <div className={`transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="h-12 px-6 text-base group relative overflow-hidden" asChild>
                    <Link href="/generate-idea">
                      <span className="relative z-10 flex items-center">
                        Generate Your Idea
                        <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 dark:from-primary dark:to-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="h-12 px-6 text-base border-primary/20 dark:border-primary/20 group relative overflow-hidden" asChild>
                    <Link href="/idea">
                      <span className="relative z-10">View Saved Ideas</span>
                      <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating 3D cards */}
          <div className={`container relative z-10 mt-16 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="flex gap-4 justify-center flex-wrap">
              {["AI-Powered", "Team-Based", "Interactive", "Data-Driven"].map((tag, i) => (
                <div 
                  key={i} 
                  className="px-4 py-2 bg-background/40 dark:bg-muted/10 backdrop-blur-lg rounded-lg border border-muted/30 dark:border-muted/10 text-sm font-medium"
                  style={{ 
                    transform: `perspective(1000px) rotateX(${Math.sin(i) * 5}deg) rotateY(${Math.cos(i) * 5}deg)`,
                    animationDelay: `${i * 0.2}s`
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-16 md:py-20 border-y border-muted/10">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className={`text-center transition-all duration-700 ease-out ${statsLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm md:text-base text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section with Interactive Feature Tabs */}
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Everything You Need</span>
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground">
                Streamline your hackathon journey with our comprehensive toolset
              </p>
            </div>

            {/* Feature tabs navigation */}
            <div className="relative mb-12">
              <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-2 justify-center">
                {features.map((feature, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveFeature(i)}
                    className={`relative px-4 py-2 flex items-center gap-2 whitespace-nowrap rounded-lg transition-all ${
                      activeFeature === i 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-muted/60 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className="text-lg">{feature.icon}</div>
                    <span>{feature.title}</span>
                    {activeFeature === i && (
                      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured item detail with a glass card */}
            <div className="mx-auto max-w-4xl">
              <div className="relative overflow-hidden rounded-xl border border-muted/20 dark:border-muted/10 bg-background/60 backdrop-blur-lg p-8 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-60"></div>
                <div className="absolute -top-40 -right-40 h-80 w-80 bg-primary/10 rounded-full blur-3xl"></div>
                
                <div className="relative flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3 flex-shrink-0">
                    <div className="aspect-square w-full max-w-[240px] mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary">
                      <div className="transform transition-transform hover:scale-110 duration-300">
                        {features[activeFeature].icon}
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold mb-4">{features[activeFeature].title}</h3>
                    <p className="text-muted-foreground mb-6">{features[activeFeature].description}</p>
                    <div className="space-y-4">
                      {['Fast and Reliable', 'User-Friendly Interface', 'Integrated Experience'].map((point, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="rounded-full p-1 bg-primary/10 text-primary mt-0.5">
                            <CheckIcon className="h-4 w-4" />
                          </div>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8">
                      <Button className="group" asChild>
                        <Link href={features[activeFeature].link} className="flex items-center">
                          {features[activeFeature].cta}
                          <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature cards */}
            <div className="mx-auto max-w-[1200px] grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-20">
              {features.map((feature, i) => (
                <div 
                  key={i} 
                  className={`group relative h-full transition-all duration-300 ${
                    activeFeature === i ? 'ring-2 ring-primary/40 shadow-lg' : ''
                  }`}
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <Card className="h-full border border-muted/30 dark:border-muted/10 bg-background/60 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/20 group-hover:shadow-lg group-hover:shadow-primary/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <CardHeader className="pb-2">
                      <div className="mb-2 bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-4">
                      <Button className="w-full group" variant="outline" asChild>
                        <Link href={feature.link} className="flex items-center justify-center">
                          {feature.cta}
                          <ArrowRightIcon className="ml-2 h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-muted/10 dark:bg-muted/5">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
                Loved by Hackathon Enthusiasts
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground">
                See what our users have to say about their experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <div 
                  key={i} 
                  className="relative bg-background dark:bg-card border border-muted/20 dark:border-muted/10 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="mb-6 text-primary">
                    {[...Array(5)].map((_, j) => (
                      <StarIcon key={j} className="inline-block h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-foreground mb-4">"{testimonial.quote}"</blockquote>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section with 3D Card */}
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[900px] relative overflow-hidden rounded-2xl border border-primary/20 bg-background dark:bg-card p-8 md:p-12 shadow-xl transition-transform hover:shadow-primary/10 hover:-translate-y-1 duration-300">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent"></div>
              <div className="absolute -top-40 -right-40 h-80 w-80 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent"></div>
              
              <div className="relative space-y-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-2">
                  <HeartIcon className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Build Your Next Hackathon Project?
                </h2>
                <p className="text-lg text-muted-foreground md:text-xl max-w-[600px] mx-auto">
                  Our AI-powered platform helps you every step of the way, from idea generation to team formation.
                </p>
                <div className="pt-4">
                  <Button size="lg" className="h-12 px-8 text-base group relative overflow-hidden" asChild>
                    <Link href="/generate-idea">
                      <span className="relative z-10 flex items-center">
                        Get Started Now
                        <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-8">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <RocketIcon className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">HackFlow</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Building the next generation of tools for hackathon participants and teams.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                {features.slice(0, 4).map((feature, i) => (
                  <li key={i}>
                    <Link href={feature.link} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {feature.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-muted/20 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} HackFlow. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
