
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowDown, MessageSquare, Eye, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Question {
  id: number;
  title: string;
  description: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    reputation: number;
  };
  votes: number;
  answers: number;
  views: number;
  timeAgo: string;
  accepted: boolean;
}

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Vote and Stats Column */}
          <div className="flex flex-col items-center space-y-2 text-sm text-gray-600 min-w-[60px]">
            <div className="text-center">
              <div className="font-semibold text-gray-900">{question.votes}</div>
              <div className="text-xs">votes</div>
            </div>
            <div className="text-center">
              <div className={`font-semibold ${question.accepted ? 'text-green-600' : 'text-gray-900'}`}>
                {question.answers}
              </div>
              <div className="text-xs">answers</div>
              {question.accepted && (
                <CheckCircle className="w-4 h-4 text-green-600 mx-auto mt-1" />
              )}
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">{question.views}</div>
              <div className="text-xs">views</div>
            </div>
          </div>

          {/* Question Content */}
          <div className="flex-1 min-w-0">
            <div className="mb-3">
              <Link 
                to={`/question/${question.id}`}
                className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors line-clamp-2"
              >
                {question.title}
              </Link>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">
              {question.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {question.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Author and Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={question.author.avatar} alt={question.author.name} />
                  <AvatarFallback className="text-xs">
                    {question.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <Link 
                    to={`/user/${question.author.name.toLowerCase().replace(' ', '-')}`}
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    {question.author.name}
                  </Link>
                  <span className="text-gray-500 ml-1">({question.author.reputation})</span>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {question.timeAgo}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
