
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Flame, Eye, MessageSquare, ArrowUp, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Dashboard from '@/components/Dashboard';

const Trending = () => {
  const navigate = useNavigate();
  
  const [trendingQuestions] = useState([
    {
      id: 1,
      title: "How to implement real-time notifications in React?",
      excerpt: "Looking for the best approach to implement real-time notifications using WebSockets or Server-Sent Events...",
      tags: ["react", "websockets", "notifications"],
      author: { name: "David Kim", avatar: "/placeholder.svg", reputation: 3200 },
      votes: 45,
      answers: 12,
      views: 2340,
      timeAgo: "3 hours ago",
      trendScore: 95
    },
    {
      id: 2,
      title: "Next.js 14 App Router vs Pages Router - Complete Migration Guide",
      excerpt: "Comprehensive guide on migrating from Pages Router to App Router in Next.js 14 with code examples...",
      tags: ["nextjs", "migration", "app-router"],
      author: { name: "Sarah Chen", avatar: "/placeholder.svg", reputation: 4250 },
      votes: 67,
      answers: 8,
      views: 3450,
      timeAgo: "5 hours ago",
      trendScore: 92
    },
    {
      id: 3,
      title: "AI-Powered Code Review: Best Practices and Tools in 2024",
      excerpt: "Exploring the latest AI tools for code review, their integration with CI/CD pipelines, and best practices...",
      tags: ["ai", "code-review", "devops"],
      author: { name: "Alex Rodriguez", avatar: "/placeholder.svg", reputation: 3890 },
      votes: 89,
      answers: 15,
      views: 4230,
      timeAgo: "1 day ago",
      trendScore: 88
    }
  ]);

  const [trendingTags] = useState([
    { name: 'ai', questions: 234, growth: '+45%', color: 'bg-purple-100 text-purple-800' },
    { name: 'nextjs', questions: 189, growth: '+32%', color: 'bg-blue-100 text-blue-800' },
    { name: 'typescript', questions: 156, growth: '+28%', color: 'bg-indigo-100 text-indigo-800' },
    { name: 'react-native', questions: 143, growth: '+25%', color: 'bg-cyan-100 text-cyan-800' },
    { name: 'rust', questions: 98, growth: '+67%', color: 'bg-orange-100 text-orange-800' }
  ]);

  const [trendingUsers] = useState([
    {
      name: 'Sarah Chen',
      username: 'sarahc',
      avatar: '/placeholder.svg',
      reputation: 4250,
      badge: 'Expert',
      recentAnswers: 12,
      weeklyGrowth: '+156'
    },
    {
      name: 'Alex Rodriguez', 
      username: 'alexr',
      avatar: '/placeholder.svg',
      reputation: 3890,
      badge: 'Contributor',
      recentAnswers: 8,
      weeklyGrowth: '+134'
    },
    {
      name: 'Lisa Zhang',
      username: 'lisaz',
      avatar: '/placeholder.svg',
      reputation: 5670,
      badge: 'Mentor',
      recentAnswers: 15,
      weeklyGrowth: '+189'
    }
  ]);

  return (
    <Dashboard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Flame className="w-8 h-8 text-orange-500" />
          <div>
            <h1 className="text-3xl font-bold">Trending</h1>
            <p className="text-muted-foreground mt-1">
              Discover what's hot in the community right now
            </p>
          </div>
        </div>

        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">🔥 Hot Questions</h2>
              <div className="text-sm text-muted-foreground">
                Based on votes, views, and engagement
              </div>
            </div>

            {trendingQuestions.map((question, index) => (
              <Card 
                key={question.id}
                className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-orange-500"
                onClick={() => navigate(`/question/${question.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Trend Rank */}
                    <div className="flex flex-col items-center min-w-[60px]">
                      <div className="text-2xl font-bold text-orange-500">#{index + 1}</div>
                      <div className="text-xs text-muted-foreground">Trend Score</div>
                      <div className="text-sm font-medium">{question.trendScore}</div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col items-center space-y-2 text-sm text-muted-foreground min-w-[80px]">
                      <div className="flex items-center space-x-1">
                        <ArrowUp className="w-4 h-4" />
                        <span className="font-medium">{question.votes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{question.answers}</span>
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
                        <TrendingUp className="w-5 h-5 text-orange-500 ml-2" />
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
          </TabsContent>

          <TabsContent value="tags" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">📈 Trending Tags</h2>
              <div className="text-sm text-muted-foreground">
                Tags with highest growth this week
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trendingTags.map((tag, index) => (
                <Card 
                  key={tag.name}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/tags/${tag.name}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className={`${tag.color} font-medium`}>
                        #{tag.name}
                      </Badge>
                      <div className="text-2xl font-bold text-orange-500">#{index + 1}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Questions</span>
                        <span className="font-medium">{tag.questions}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Growth</span>
                        <span className="font-medium text-green-600">{tag.growth}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">⭐ Top Contributors</h2>
              <div className="text-sm text-muted-foreground">
                Most active users this week
              </div>
            </div>

            <div className="space-y-4">
              {trendingUsers.map((user, index) => (
                <Card 
                  key={user.username}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/users/${user.username}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className="text-3xl font-bold text-orange-500">#{index + 1}</div>
                      
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          <User className="w-6 h-6" />
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold">{user.name}</h3>
                          <Badge variant="outline">{user.badge}</Badge>
                          <TrendingUp className="w-4 h-4 text-orange-500" />
                        </div>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                          <div className="font-medium">{user.reputation}</div>
                          <div className="text-xs text-muted-foreground">Reputation</div>
                        </div>
                        <div>
                          <div className="font-medium">{user.recentAnswers}</div>
                          <div className="text-xs text-muted-foreground">Answers</div>
                        </div>
                        <div>
                          <div className="font-medium text-green-600">{user.weeklyGrowth}</div>
                          <div className="text-xs text-muted-foreground">Growth</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Dashboard>
  );
};

export default Trending;
