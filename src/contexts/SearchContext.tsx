
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SearchResult {
  id: string;
  type: 'question' | 'user' | 'tag';
  title: string;
  description?: string;
  url: string;
  metadata?: {
    votes?: number;
    answers?: number;
    views?: number;
    reputation?: number;
    questionCount?: number;
  };
}

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  isSearching: boolean;
  performSearch: (searchQuery: string) => Promise<void>;
  clearResults: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search data
  const mockData = {
    questions: [
      {
        id: '1',
        type: 'question' as const,
        title: 'How to implement React hooks?',
        description: 'I need help understanding React hooks and their implementation',
        url: '/question/1',
        metadata: { votes: 15, answers: 3, views: 1200 }
      },
      {
        id: '2',
        type: 'question' as const,
        title: 'JavaScript array methods explained',
        description: 'Comprehensive guide to JavaScript array methods',
        url: '/question/2',
        metadata: { votes: 8, answers: 1, views: 890 }
      }
    ],
    users: [
      {
        id: '1',
        type: 'user' as const,
        title: 'John Doe',
        description: 'Full Stack Developer',
        url: '/users/john-doe',
        metadata: { reputation: 1250, questionCount: 15 }
      }
    ],
    tags: [
      {
        id: '1',
        type: 'tag' as const,
        title: 'javascript',
        description: '1,250 questions',
        url: '/tags/javascript',
        metadata: { questionCount: 1250 }
      },
      {
        id: '2',
        type: 'tag' as const,
        title: 'react',
        description: '890 questions',
        url: '/tags/react',
        metadata: { questionCount: 890 }
      }
    ]
  };

  const performSearch = async (searchQuery: string) => {
    setIsSearching(true);
    setQuery(searchQuery);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!searchQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    const searchLower = searchQuery.toLowerCase();
    const filteredResults: SearchResult[] = [];

    // Search questions
    mockData.questions.forEach(question => {
      if (question.title.toLowerCase().includes(searchLower) || 
          question.description.toLowerCase().includes(searchLower)) {
        filteredResults.push(question);
      }
    });

    // Search users
    mockData.users.forEach(user => {
      if (user.title.toLowerCase().includes(searchLower) || 
          user.description.toLowerCase().includes(searchLower)) {
        filteredResults.push(user);
      }
    });

    // Search tags
    mockData.tags.forEach(tag => {
      if (tag.title.toLowerCase().includes(searchLower)) {
        filteredResults.push(tag);
      }
    });

    setResults(filteredResults);
    setIsSearching(false);
  };

  const clearResults = () => {
    setResults([]);
    setQuery('');
  };

  return (
    <SearchContext.Provider value={{
      query,
      setQuery,
      results,
      isSearching,
      performSearch,
      clearResults
    }}>
      {children}
    </SearchContext.Provider>
  );
};
