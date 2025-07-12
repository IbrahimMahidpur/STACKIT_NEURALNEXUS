import React, { useState, useEffect } from 'react';
import { X, MessageSquare, HelpCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  type: 'question' | 'answer';
  title: string;
  author: string;
  timestamp: Date;
  questionId?: number;
}

interface RealTimeNotificationProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
  onViewQuestion?: (questionId: number) => void;
}

const RealTimeNotification: React.FC<RealTimeNotificationProps> = ({
  notifications,
  onDismiss,
  onViewQuestion
}) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <Card key={notification.id} className="shadow-lg border-l-4 border-green-500 animate-in slide-in-from-right">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1">
                  {notification.type === 'question' ? (
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                  ) : (
                    <MessageSquare className="w-5 h-5 text-green-600" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {notification.type === 'question' ? 'New Question' : 'New Answer'}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {notification.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-sm text-gray-900 truncate">
                    {notification.title}
                  </h4>
                  
                  <p className="text-xs text-gray-600">
                    by {notification.author}
                  </p>
                  
                  {notification.questionId && onViewQuestion && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-6 text-xs"
                      onClick={() => onViewQuestion(notification.questionId!)}
                    >
                      View Question
                    </Button>
                  )}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => onDismiss(notification.id)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RealTimeNotification; 