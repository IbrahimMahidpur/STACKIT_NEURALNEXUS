
import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, Lock } from 'lucide-react';
import { AuthDialog } from './AuthDialog';
import { useState } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const ProtectedRoute = ({ children, fallback }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  if (!user) {
    return (
      <>
        {fallback || (
          <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Authentication Required</h2>
                  <p className="text-muted-foreground">
                    Please sign in or create an account to access this feature.
                  </p>
                </div>

                <div className="flex flex-col space-y-3">
                  <Button onClick={() => setShowAuthDialog(true)}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button variant="outline" onClick={() => setShowAuthDialog(true)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
      </>
    );
  }

  return <>{children}</>;
};
