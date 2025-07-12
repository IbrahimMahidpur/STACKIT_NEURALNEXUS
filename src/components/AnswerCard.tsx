
import { useState } from 'react';
import { ArrowUp, ArrowDown, Share, Flag, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Answer {
  id: number;
  content: string;
  author: {
    name: string;
    avatar: string;
    reputation: number;
    badges?: string[];
  };
  votes: number;
  timeAgo: string;
  accepted: boolean;
  comments: Array<{
    id: number;
    content: string;
    author: string;
    timeAgo: string;
  }>;
}

interface AnswerCardProps {
  answer: Answer;
  onVote?: (voteType: 'up' | 'down') => void;
  isConnected?: boolean;
}

const AnswerCard = ({ answer, onVote, isConnected = true }: AnswerCardProps) => {
  const { user } = useAuth();
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [showComments, setShowComments] = useState(false);

  const handleVote = (type: 'up' | 'down') => {
    if (!user) {
      toast.error('Please sign in to vote');
      return;
    }

    if (!isConnected) {
      toast.error('Not connected to real-time service');
      return;
    }

    if (userVote === type) {
      // Remove vote
      setUserVote(null);
    } else {
      // Add vote or change vote
      setUserVote(type);
    }

    // Call the parent's onVote handler
    if (onVote) {
      onVote(type);
    }
  };

  return (
    <div className="relative">
      {/* Accepted Answer Indicator */}
      {answer.accepted && (
        <div className="absolute -left-4 top-4">
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
        </div>
      )}

      <div className="flex gap-4">
        {/* Voting */}
        <div className="flex flex-col items-center space-y-2">
          <Button
            variant={userVote === 'up' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleVote('up')}
            disabled={!isConnected || !user}
            title={!user ? 'Sign in to vote' : ''}
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
          
          <span className={`text-lg font-semibold ${answer.accepted ? 'text-green-600' : 'text-gray-900'}`}>
            {answer.votes}
          </span>
          
          <Button
            variant={userVote === 'down' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleVote('down')}
            disabled={!isConnected || !user}
            title={!user ? 'Sign in to vote' : ''}
          >
            <ArrowDown className="w-5 h-5" />
          </Button>

          {answer.accepted && (
            <div className="text-xs text-green-600 font-medium mt-2">
              Accepted
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="prose prose-sm max-w-none mb-6">
            <div className="whitespace-pre-wrap text-gray-700">
              {answer.content}
            </div>
          </div>

          {/* Actions and Author */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Share className="w-4 h-4 mr-1" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <Flag className="w-4 h-4 mr-1" />
                Flag
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                {answer.comments.length > 0 ? `${answer.comments.length} comments` : 'Add comment'}
              </Button>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Avatar className="w-8 h-8">
                <AvatarImage src={answer.author.avatar} alt={answer.author.name} />
                <AvatarFallback>
                  {answer.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 text-sm">
                    {answer.author.name}
                  </span>
                  {answer.author.badges?.map((badge) => (
                    <Badge key={badge} variant="outline" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-gray-600">
                  {answer.author.reputation} • answered {answer.timeAgo}
                </div>
              </div>
            </div>
          </div>

          {/* Comments */}
          {showComments && answer.comments.length > 0 && (
            <div className="ml-4 pl-4 border-l-2 border-gray-200 space-y-3">
              {answer.comments.map((comment) => (
                <div key={comment.id} className="text-sm">
                  <span className="text-gray-700">{comment.content}</span>
                  <span className="text-gray-500 ml-2">
                    – <span className="font-medium">{comment.author}</span> {comment.timeAgo}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
