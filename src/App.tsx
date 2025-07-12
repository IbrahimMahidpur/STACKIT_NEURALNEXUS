
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SearchProvider } from "@/contexts/SearchContext";
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
                    element={
                      <ProtectedRoute>
                        <QuestionDetail />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/questions" 
                    element={
                      <ProtectedRoute>
                        <Questions />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/tags" 
                    element={
                      <ProtectedRoute>
                        <Tags />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/tags/:tagName" 
                    element={
                      <ProtectedRoute>
                        <Tags />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/users" 
                    element={
                      <ProtectedRoute>
                        <Users />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/users/:username" 
                    element={
                      <ProtectedRoute>
                        <Users />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/trending" 
                    element={
                      <ProtectedRoute>
                        <Trending />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/stats" 
                    element={
                      <ProtectedRoute>
                        <Stats />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </SearchProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
