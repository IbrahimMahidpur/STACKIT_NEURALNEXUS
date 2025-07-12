
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { RealtimeProvider } from "@/contexts/RealtimeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import AskQuestion from "./pages/AskQuestion";
import QuestionDetail from "./pages/QuestionDetail";
import Questions from "./pages/Questions";
import Tags from "./pages/Tags";
import Users from "./pages/Users";
import Trending from "./pages/Trending";
import Stats from "./pages/Stats";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SearchProvider>
            <RealtimeProvider>
              <TooltipProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route 
                      path="/ask" 
                      element={
                        <ProtectedRoute>
                          <AskQuestion />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/question/:id" 
                      element={<QuestionDetail />}
                    />
                    <Route 
                      path="/questions" 
                      element={<Questions />}
                    />
                    <Route 
                      path="/tags" 
                      element={<Tags />}
                    />
                    <Route 
                      path="/tags/:tagName" 
                      element={<Tags />}
                    />
                    <Route 
                      path="/users" 
                      element={<Users />}
                    />
                    <Route 
                      path="/users/:username" 
                      element={<Users />}
                    />
                    <Route 
                      path="/trending" 
                      element={<Trending />}
                    />
                    <Route 
                      path="/stats" 
                      element={<Stats />}
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </RealtimeProvider>
          </SearchProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
