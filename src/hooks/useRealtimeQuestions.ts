import { useState, useEffect, useCallback } from 'react';
import { useRealtime } from '@/contexts/RealtimeContext';
import { toast } from 'sonner';

interface Question {
  id: number;
  title: string;
  description: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    reputation: number;
    joinDate: string;
  };
  votes: number;
  views: number;
  timeAgo: string;
  createdAt: string;
}

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
  uniqueId?: string; // Add unique identifier to prevent duplicates
}

export const useRealtimeQuestions = () => {
  const {
    isConnected,
    publishQuestion,
    postAnswer,
    voteQuestion,
    voteAnswer,
    joinQuestionRoom,
    leaveQuestionRoom,
    onNewQuestion,
    onNewAnswer,
    onVoteUpdate,
  } = useRealtime();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentAnswers, setCurrentAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [processedAnswerIds, setProcessedAnswerIds] = useState<Set<string>>(new Set());

  // Listen for new questions
  useEffect(() => {
    const unsubscribe = onNewQuestion((newQuestion) => {
      setQuestions(prev => [newQuestion, ...prev]);
      toast.success(`New question: ${newQuestion.title}`);
    });

    return unsubscribe;
  }, [onNewQuestion]);

  // Listen for new answers
  useEffect(() => {
    const unsubscribe = onNewAnswer(({ questionId, answer }) => {
      if (currentQuestion?.id === questionId) {
        // Check if this answer has already been processed
        const answerKey = answer.uniqueId || `${answer.id}-${answer.author.name}`;
        
        if (processedAnswerIds.has(answerKey)) {
          console.log('Duplicate answer detected in frontend, skipping:', answerKey);
          return;
        }
        
        // Mark this answer as processed
        setProcessedAnswerIds(prev => new Set([...prev, answerKey]));
        
        // Add the answer to the current answers
        setCurrentAnswers(prev => [...prev, answer]);
        toast.success(`New answer from ${answer.author.name}`);
        
        // Clean up the processed ID after 5 minutes to prevent memory leaks
        setTimeout(() => {
          setProcessedAnswerIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(answerKey);
            return newSet;
          });
        }, 5 * 60 * 1000);
      }
    });

    return unsubscribe;
  }, [onNewAnswer, currentQuestion?.id, processedAnswerIds]);

  // Listen for vote updates
  useEffect(() => {
    const unsubscribe = onVoteUpdate(({ type, id, votes }) => {
      if (type === 'question') {
        if (currentQuestion?.id === id) {
          setCurrentQuestion(prev => prev ? { ...prev, votes } : null);
        }
        setQuestions(prev => 
          prev.map(q => q.id === id ? { ...q, votes } : q)
        );
      } else if (type === 'answer') {
        setCurrentAnswers(prev => 
          prev.map(a => a.id === id ? { ...a, votes } : a)
        );
      }
    });

    return unsubscribe;
  }, [onVoteUpdate, currentQuestion?.id]);

  const handlePublishQuestion = useCallback(async (questionData: Omit<Question, 'id' | 'votes' | 'views' | 'timeAgo' | 'createdAt'>) => {
    if (!isConnected) {
      toast.error('Not connected to real-time service');
      return false;
    }

    setIsLoading(true);
    try {
      publishQuestion(questionData);
      return true;
    } catch (error) {
      console.error('Error publishing question:', error);
      toast.error('Failed to publish question');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, publishQuestion]);

  const handlePostAnswer = useCallback(async (questionId: number, answerData: Omit<Answer, 'id' | 'votes' | 'timeAgo' | 'accepted' | 'comments'>) => {
    if (!isConnected) {
      toast.error('Not connected to real-time service');
      return false;
    }

    setIsLoading(true);
    try {
      postAnswer(questionId, answerData);
      return true;
    } catch (error) {
      console.error('Error posting answer:', error);
      toast.error('Failed to post answer');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, postAnswer]);

  const handleVoteQuestion = useCallback((questionId: number, voteType: 'up' | 'down') => {
    if (!isConnected) {
      toast.error('Not connected to real-time service');
      return;
    }

    voteQuestion(questionId, voteType);
  }, [isConnected, voteQuestion]);

  const handleVoteAnswer = useCallback((answerId: number, voteType: 'up' | 'down') => {
    if (!isConnected) {
      toast.error('Not connected to real-time service');
      return;
    }

    voteAnswer(answerId, voteType);
  }, [isConnected, voteAnswer]);

  const handleJoinQuestion = useCallback((questionId: number) => {
    if (!isConnected) {
      toast.error('Not connected to real-time service');
      return;
    }

    joinQuestionRoom(questionId);
  }, [isConnected, joinQuestionRoom]);

  const handleLeaveQuestion = useCallback((questionId: number) => {
    if (!isConnected) {
      return;
    }

    leaveQuestionRoom(questionId);
  }, [isConnected, leaveQuestionRoom]);

  const setQuestion = useCallback((question: Question | null) => {
    setCurrentQuestion(question);
    if (question) {
      handleJoinQuestion(question.id);
    }
  }, [handleJoinQuestion]);

  const setAnswers = useCallback((answers: Answer[]) => {
    setCurrentAnswers(answers);
  }, []);

  return {
    questions,
    currentQuestion,
    currentAnswers,
    isLoading,
    isConnected,
    handlePublishQuestion,
    handlePostAnswer,
    handleVoteQuestion,
    handleVoteAnswer,
    handleJoinQuestion,
    handleLeaveQuestion,
    setQuestion,
    setAnswers,
  };
}; 