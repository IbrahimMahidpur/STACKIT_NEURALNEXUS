
import { useState } from 'react';
import { Search, Plus, Filter, TrendingUp, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Header';
import QuestionCard from '@/components/QuestionCard';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Mock data for questions
  const questions = [
    {
      id: 1,
      title: "How to implement a binary search tree in JavaScript?",
      description: "I'm learning data structures and need help understanding how to properly implement a BST with insertion, deletion, and search methods.",
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
      title: "Best practices for React state management in large applications?",
      description: "Working on a large React app and struggling with state management. What are the current best practices for managing complex state?",
      tags: ["react", "state-management", "redux", "zustand"],
      author: { name: "Mike Johnson", avatar: "/placeholder.svg", reputation: 1520 },
      votes: 8,
      answers: 5,
      views: 156,
      timeAgo: "4 hours ago",
      accepted: false
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox: When to use which?",
      description: "I'm confused about when to use CSS Grid versus Flexbox. Can someone explain the differences and use cases?",
      tags: ["css", "css-grid", "flexbox", "layout"],
      author: { name: "Emma Wilson", avatar: "/placeholder.svg", reputation: 890 },
      votes: 23,
      answers: 7,
      views: 421,
      timeAgo: "6 hours ago",
      accepted: true
    },
    {
      id: 4,
      title: "How to optimize PostgreSQL queries for better performance?",
      description: "My database queries are running slow. Looking for tips on optimizing PostgreSQL performance for a production application.",
      tags: ["postgresql", "database", "performance", "sql"],
      author: { name: "David Kim", avatar: "/placeholder.svg", reputation: 3240 },
      votes: 12,
      answers: 4,
      views: 198,
      timeAgo: "8 hours ago",
      accepted: false
    }
  ];

  const stats = [
    { label: "Questions", value: "2.4k", icon: TrendingUp },
    { label: "Answers", value: "8.1k", icon: Clock },
    { label: "Users", value: "1.2k", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">StackIt</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A minimal Q&A platform for collaborative learning and structured knowledge sharing
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-12">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button asChild className="h-12">
              <Link to="/ask">
                <Plus className="w-4 h-4 mr-2" />
                Ask Question
              </Link>
            </Button>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex gap-2 mb-6">
          {['newest', 'popular', 'unanswered', 'active'].map((sort) => (
            <Button
              key={sort}
              variant={sortBy === sort ? 'default' : 'ghost'}
              onClick={() => setSortBy(sort)}
              className="capitalize"
            >
              {sort}
            </Button>
          ))}
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions
            .filter(q => 
              searchQuery === '' || 
              q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            .map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
        </div>

        {/* Empty State */}
        {questions.filter(q => 
          searchQuery === '' || 
          q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        ).length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or ask a new question.</p>
              <Button asChild>
                <Link to="/ask">Ask the First Question</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Index;
