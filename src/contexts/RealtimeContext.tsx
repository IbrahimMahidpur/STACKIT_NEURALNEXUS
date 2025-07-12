import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
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

interface Notification {
  type: 'question' | 'answer';
  title: string;
  author: string;
  questionId: number;
  timestamp: Date;
}

interface RealtimeContextType {
  socket: Socket | null;
  isConnected: boolean;
  activeUsers: number;
  publishQuestion: (question: Omit<Question, 'id' | 'votes' | 'views' | 'timeAgo' | 'createdAt'>) => void;
  postAnswer: (questionId: number, answer: Omit<Answer, 'id' | 'votes' | 'timeAgo' | 'accepted' | 'comments'>) => void;
  voteQuestion: (questionId: number, voteType: 'up' | 'down') => void;
  voteAnswer: (answerId: number, voteType: 'up' | 'down') => void;
  joinQuestionRoom: (questionId: number) => void;
  leaveQuestionRoom: (questionId: number) => void;
  onQuestionUpdate: (callback: (question: Question) => void) => void;
  onAnswerUpdate: (callback: (answer: Answer) => void) => void;
  onNewQuestion: (callback: (question: Question) => void) => void;
  onNewAnswer: (callback: (data: { questionId: number; answer: Answer }) => void) => void;
  onVoteUpdate: (callback: (data: { type: 'question' | 'answer'; id: number; votes: number }) => void) => void;
  onNotification: (callback: (notification: Notification) => void) => void;
  onActiveUsersUpdate: (callback: (count: number) => void) => void;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export const useRealtime = () => {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
};

interface RealtimeProviderProps {
  children: React.ReactNode;
}

export const RealtimeProvider: React.FC<RealtimeProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(import.meta.env.VITE_WEBSOCKET_URL || 'http://localhost:3001', {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
      toast.success('Connected to real-time updates');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
      toast.error('Lost connection to real-time updates');
    });

    newSocket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      toast.error('Failed to connect to real-time updates');
    });

    // Listen for active users updates
    newSocket.on('active_users_update', (count: number) => {
      setActiveUsers(count);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const publishQuestion = useCallback((question: Omit<Question, 'id' | 'votes' | 'views' | 'timeAgo' | 'createdAt'>) => {
    if (socket && isConnected) {
      socket.emit('publish_question', question);
      toast.success('Question published successfully!');
    } else {
      toast.error('Not connected to real-time service');
    }
  }, [socket, isConnected]);

  const postAnswer = useCallback((questionId: number, answer: Omit<Answer, 'id' | 'votes' | 'timeAgo' | 'accepted' | 'comments'>) => {
    if (socket && isConnected) {
      socket.emit('post_answer', { questionId, answer });
      toast.success('Answer posted successfully!');
    } else {
      toast.error('Not connected to real-time service');
    }
  }, [socket, isConnected]);

  const voteQuestion = useCallback((questionId: number, voteType: 'up' | 'down') => {
    if (socket && isConnected) {
      socket.emit('vote_question', { questionId, voteType });
    } else {
      toast.error('Not connected to real-time service');
    }
  }, [socket, isConnected]);

  const voteAnswer = useCallback((answerId: number, voteType: 'up' | 'down') => {
    if (socket && isConnected) {
      socket.emit('vote_answer', { answerId, voteType });
    } else {
      toast.error('Not connected to real-time service');
    }
  }, [socket, isConnected]);

  const joinQuestionRoom = useCallback((questionId: number) => {
    if (socket && isConnected) {
      socket.emit('join_question_room', { questionId });
      console.log(`Joined question room: ${questionId}`);
    }
  }, [socket, isConnected]);

  const leaveQuestionRoom = useCallback((questionId: number) => {
    if (socket && isConnected) {
      socket.emit('leave_question_room', { questionId });
      console.log(`Left question room: ${questionId}`);
    }
  }, [socket, isConnected]);

  const onQuestionUpdate = useCallback((callback: (question: Question) => void) => {
    if (socket) {
      socket.on('question_updated', callback);
      return () => socket.off('question_updated', callback);
    }
  }, [socket]);

  const onAnswerUpdate = useCallback((callback: (answer: Answer) => void) => {
    if (socket) {
      socket.on('answer_updated', callback);
      return () => socket.off('answer_updated', callback);
    }
  }, [socket]);

  const onNewQuestion = useCallback((callback: (question: Question) => void) => {
    if (socket) {
      socket.on('new_question', callback);
      return () => socket.off('new_question', callback);
    }
  }, [socket]);

  const onNewAnswer = useCallback((callback: (data: { questionId: number; answer: Answer }) => void) => {
    if (socket) {
      socket.on('new_answer', callback);
      return () => socket.off('new_answer', callback);
    }
  }, [socket]);

  const onVoteUpdate = useCallback((callback: (data: { type: 'question' | 'answer'; id: number; votes: number }) => void) => {
    if (socket) {
      socket.on('vote_updated', callback);
      return () => socket.off('vote_updated', callback);
    }
  }, [socket]);

  const onNotification = useCallback((callback: (notification: Notification) => void) => {
    if (socket) {
      socket.on('notification', callback);
      return () => socket.off('notification', callback);
    }
  }, [socket]);

  const onActiveUsersUpdate = useCallback((callback: (count: number) => void) => {
    if (socket) {
      socket.on('active_users_update', callback);
      return () => socket.off('active_users_update', callback);
    }
  }, [socket]);

  const value: RealtimeContextType = {
    socket,
    isConnected,
    activeUsers,
    publishQuestion,
    postAnswer,
    voteQuestion,
    voteAnswer,
    joinQuestionRoom,
    leaveQuestionRoom,
    onQuestionUpdate,
    onAnswerUpdate,
    onNewQuestion,
    onNewAnswer,
    onVoteUpdate,
    onNotification,
    onActiveUsersUpdate,
  };

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  );
}; 