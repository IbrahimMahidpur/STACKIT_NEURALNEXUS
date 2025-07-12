
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Eye, MessageSquare, ArrowUp, Check, User, Search, TrendingUp, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Dashboard from '@/components/Dashboard';
import { AuthDialog } from '@/components/AuthDialog';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  
  const [featuredQuestions] = useState([
    {
      id: 1,
      title: "How to implement a binary search tree in JavaScript?",
      excerpt: "I'm learning data structures and need help understanding how to properly implement a BST with insertion, deletion...",
      tags: ["javascript", "data-structures", "algorithms"],
      author: { name: "Sarah Chen", avatar: "/placeholder.svg", reputation: 2840 },
      votes: 15,
      answers: 3,
      views: 284,
      timeAgo: "2 hours ago",
      accepted: true
    },
    {
      id: 2,
      title: "React Hook useEffect dependency array best practices",
      excerpt: "When should I include variables in the useEffect dependency array? I'm getting infinite re-renders...",
      tags: ["react", "hooks", "javascript"],
      author: { name: "Mike Johnson", avatar: "/placeholder.svg", reputation: 1520 },
      votes: 23,
      answers: 7,
      views: 456,
      timeAgo: "4 hours ago",
      accepted: true,
      trending: true
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox - when to use which?",
      excerpt: "I'm confused about when to use CSS Grid versus Flexbox for layouts. Can someone explain the key differences?",
      tags: ["css", "layout", "flexbox", "grid"],
      author: { name: "Emma Wilson", avatar: "/placeholder.svg", reputation: 890 },
      votes: 8,
      answers: 2,
      views: 123,
      timeAgo: "6 hours ago",
      accepted: false
    }
  ]);

  const quickStats = {
    totalQuestions: 12543,
    answeredToday: 89,
    activeUsers: 234,
    newMembers: 12
  };

  const handleQuestionClick = (id: number) => {
    if (!user) {
      setShowAuthDialog(true);
      return;
    }
    navigate(`/question/${id}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setShowAuthDialog(true);
      return;
    }
    if (searchQuery.trim()) {
      navigate(`/questions?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleProtectedAction = (action: () => void) => {
    if (!user) {
      setShowAuthDialog(true);
      return;
    }
    action();
  };

  return (
    <Dashboard>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome to StackIt</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your collaborative learning platform where developers help developers. 
            Ask questions, share knowledge, and grow together.
          </p>
          
          {/* Authentication prompt for non-logged users */}
          {!user && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Join our community today!</h3>
                <p className="text-muted-foreground">
                  Sign up or log in to ask questions, provide answers, and engage with the developer community.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button onClick={() => setShowAuthDialog(true)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                  <Button variant="outline" onClick={() => setShowAuthDialog(true)}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Log In
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Quick Search */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mt-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder={user ? "Search for questions, tags, or topics..." : "Sign in to search questions..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg"
                disabled={!user}
              />
              <Button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                disabled={!user}
              >
                Search
              </Button>
            </div>
          </form>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">{quickStats.totalQuestions.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Questions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">{quickStats.answeredToday}</div>
              <div className="text-sm text-muted-foreground">Answered Today</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">{quickStats.activeUsers}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">{quickStats.newMembers}</div>
              <div className="text-sm text-muted-foreground">New Members</div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Questions */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Featured Questions</h2>
            <Button 
              variant="outline" 
              onClick={() => handleProtectedAction(() => navigate('/questions'))}
            >
              View All Questions
            </Button>
          </div>

          <div className="space-y-4">
            {featuredQuestions.map((question) => (
              <Card 
                key={question.id} 
                className={`hover:shadow-md transition-shadow ${user ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'}`}
                onClick={() => handleQuestionClick(question.id)}
              >
                <CardContent className="p-6">
                  {!user && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
                      <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">Sign in to view question details</p>
                        <Button size="sm" onClick={(e) => { e.stopPropagation(); setShowAuthDialog(true); }}>
                          Sign In
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-6 relative">
                    {/* Stats */}
                    <div className="flex flex-col items-center space-y-2 text-sm text-muted-foreground min-w-[80px]">
                      <div className="flex items-center space-x-1">
                        <ArrowUp className="w-4 h-4" />
                        <span className="font-medium">{question.votes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span className={question.accepted ? "text-green-600 font-medium" : ""}>
                          {question.answers}
                        </span>
                        {question.accepted && <Check className="w-3 h-3 text-green-600" />}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{question.views}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                          {question.title}
                        </h3>
                        {question.trending && (
                          <TrendingUp className="w-5 h-5 text-orange-500 ml-2" />
                        )}
                      </div>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {question.excerpt}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {question.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Author and Time */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={question.author.avatar} alt={question.author.name} />
                            <AvatarFallback>
                              <User className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{question.author.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {question.author.reputation.toLocaleString()} reputation
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          {question.timeAgo}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4 py-8">
          {user ? (
            <>
              <h3 className="text-2xl font-semibold">Ready to contribute?</h3>
              <div className="flex justify-center space-x-4">
                <Button size="lg" onClick={() => navigate('/ask')}>
                  Ask a Question
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/questions')}>
                  Answer Questions
                </Button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-semibold">Join our community today!</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Get started by creating an account to ask questions, provide answers, and build your reputation.
              </p>
              <div className="flex justify-center space-x-4">
                <Button size="lg" onClick={() => setShowAuthDialog(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up Free
                </Button>
                <Button size="lg" variant="outline" onClick={() => setShowAuthDialog(true)}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Log In
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </Dashboard>
  );
};

export default Index;
