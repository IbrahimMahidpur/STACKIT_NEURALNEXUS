
import { useState, useEffect, useRef } from 'react';
import { Search, User, Tag, MessageSquare, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSearch } from '@/contexts/SearchContext';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const { results, isSearching, performSearch, clearResults } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (inputValue.trim()) {
      const debounceTimer = setTimeout(() => {
        performSearch(inputValue);
      }, 300);

      return () => clearTimeout(debounceTimer);
    } else {
      clearResults();
    }
  }, [inputValue, performSearch, clearResults]);

  const handleResultClick = (url: string) => {
    navigate(url);
    setIsOpen(false);
    setInputValue('');
    clearResults();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'question':
        return <MessageSquare className="w-4 h-4" />;
      case 'user':
        return <User className="w-4 h-4" />;
      case 'tag':
        return <Tag className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  return (
    <div ref={searchRef} className="relative flex-1 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search questions, tags, users..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-4"
        />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin" />
        )}
      </div>

      {isOpen && (inputValue.trim() || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center">
              <Loader2 className="w-6 h-6 mx-auto mb-2 animate-spin" />
              <p className="text-sm text-muted-foreground">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <Button
                  key={`${result.type}-${result.id}`}
                  variant="ghost"
                  className="w-full justify-start p-3 h-auto text-left"
                  onClick={() => handleResultClick(result.url)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className="mt-0.5">
                      {getIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm truncate">
                          {result.title}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {result.type}
                        </Badge>
                      </div>
                      {result.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {result.description}
                        </p>
                      )}
                      {result.metadata && (
                        <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                          {result.metadata.votes !== undefined && (
                            <span>{result.metadata.votes} votes</span>
                          )}
                          {result.metadata.answers !== undefined && (
                            <span>{result.metadata.answers} answers</span>
                          )}
                          {result.metadata.views !== undefined && (
                            <span>{result.metadata.views} views</span>
                          )}
                          {result.metadata.reputation !== undefined && (
                            <span>{result.metadata.reputation} rep</span>
                          )}
                          {result.metadata.questionCount !== undefined && (
                            <span>{result.metadata.questionCount} questions</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          ) : inputValue.trim() ? (
            <div className="p-4 text-center text-muted-foreground">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No results found for "{inputValue}"</p>
              <p className="text-xs mt-1">Try different keywords or check spelling</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
