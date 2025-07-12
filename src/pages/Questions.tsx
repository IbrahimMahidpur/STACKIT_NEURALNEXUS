
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Eye, MessageSquare, ArrowUp, ArrowDown, Check, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Dashboard from '@/components/Dashboard';

const Questions = () => {
  const navigate = useNavigate();
  const [questions] = useState([
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
      accepted: true
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
    },
    {
      id: 4,
      title: "Python list comprehension with conditional logic",
      excerpt: "How can I create a list comprehension that includes conditional statements? Looking for clean, pythonic solutions...",
      tags: ["python", "list-comprehension", "conditionals"],
      author: { name: "David Kim", avatar: "/placeholder.svg", reputation: 3200 },
      votes: 12,
      answers: 5,
      views: 298,
      timeAgo: "8 hours ago",
      accepted: true
    },
    {
      id: 5,
      title: "Database normalization vs denormalization trade-offs",
      excerpt: "When should I denormalize my database for performance? What are the trade-offs I need to consider?",
      tags: ["database", "sql", "normalization", "performance"],
      author: { name: "Lisa Zhang", avatar: "/placeholder.svg", reputation: 4560 },
      votes: 31,
      answers: 12,
      views: 1245,
      timeAgo: "1 day ago",
      accepted: true
    }
  ]);

  const handleQuestionClick = (id: number) => {
    navigate(`/question/${id}`);
  };

  return (
    <Dashboard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">All Questions</h1>
            <p className="text-muted-foreground mt-1">
              {questions.length.toLocaleString()} questions found
            </p>
          </div>
          <Button onClick={() => navigate('/ask')}>Ask Question</Button>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((question) => (
            <Card 
              key={question.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleQuestionClick(question.id)}
            >
              <CardContent className="p-6">
                <div className="flex gap-6">
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
                    <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors mb-2">
                      {question.title}
                    </h3>
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
    </Dashboard>
  );
};

export default Questions;
