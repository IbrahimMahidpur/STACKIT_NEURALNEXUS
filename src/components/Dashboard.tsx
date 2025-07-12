
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  MessageSquare, 
  Tags, 
  Users, 
  TrendingUp, 
  BarChart3,
  Moon,
  Sun,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchBar } from './SearchBar';
import { NotificationDropdown } from './NotificationDropdown';
import { useToast } from '@/hooks/use-toast';

interface DashboardProps {
  children: React.ReactNode;
}

export interface FilterOptions {
  sortBy: 'newest' | 'votes' | 'views' | 'activity';
  timeRange: 'day' | 'week' | 'month' | 'year' | 'all';
  status: 'all' | 'unanswered' | 'answered' | 'accepted';
}

const Dashboard = ({ children }: DashboardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'newest',
    timeRange: 'all',
    status: 'all'
  });

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/', count: null },
    { id: 'questions', label: 'Questions', icon: MessageSquare, path: '/questions', count: 12543 },
    { id: 'tags', label: 'Tags', icon: Tags, path: '/tags', count: 1520 },
    { id: 'users', label: 'Users', icon: Users, path: '/users', count: 5643 },
    { id: 'trending', label: 'Trending', icon: TrendingUp, path: '/trending', count: null },
    { id: 'stats', label: 'Stats', icon: BarChart3, path: '/stats', count: null }
  ];

  const popularTags = [
    { name: 'javascript', count: 1250, trending: true },
    { name: 'react', count: 890, trending: true },
    { name: 'nodejs', count: 675, trending: false },
    { name: 'python', count: 543, trending: true },
    { name: 'typescript', count: 432, trending: false },
    { name: 'css', count: 321, trending: false }
  ];

  const communityStats = {
    totalQuestions: 12543,
    totalAnswers: 28901,
    totalUsers: 5643,
    activeToday: 234
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    toast({
      title: isDarkMode ? 'Light mode enabled' : 'Dark mode enabled',
      description: `Switched to ${isDarkMode ? 'light' : 'dark'} theme`
    });
  };

  const isActive = (path: string) => location.pathname === path;

  const handleFilterChange = (filterType: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    toast({
      title: 'Filter applied',
      description: `Sorted by ${value}`
    });

    // You can emit an event or call a callback here to notify parent components
    // For now, we'll just update the state
    console.log('Applied filters:', newFilters);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex bg-background text-foreground">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border min-h-screen">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-primary">StackIt</h1>
            <p className="text-sm text-muted-foreground mt-1">Knowledge Community</p>
          </div>
          
          <nav className="px-4 space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={isActive(item.path) ? "default" : "ghost"}
                className="w-full justify-between"
                onClick={() => navigate(item.path)}
              >
                <div className="flex items-center">
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </div>
                {item.count && (
                  <Badge variant="secondary" className="text-xs">
                    {item.count.toLocaleString()}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>

          {/* Popular Tags Section */}
          <div className="p-4 mt-8">
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
              Popular Tags
            </h3>
            <div className="space-y-2">
              {popularTags.slice(0, 6).map((tag) => (
                <div key={tag.name} className="flex items-center justify-between">
                  <Badge 
                    variant="secondary" 
                    className={`cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors ${
                      tag.trending ? 'border-orange-200 bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-300' : ''
                    }`}
                    onClick={() => navigate(`/tags/${tag.name}`)}
                  >
                    {tag.name}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{tag.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="p-4 mt-6">
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
              Community Stats
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Questions</span>
                <span className="font-medium">{communityStats.totalQuestions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Answers</span>
                <span className="font-medium">{communityStats.totalAnswers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Users</span>
                <span className="font-medium">{communityStats.totalUsers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600 dark:text-green-400">Active Today</span>
                <span className="font-medium text-green-600 dark:text-green-400">{communityStats.activeToday}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="bg-card border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                {/* Search */}
                <div className="flex-1 max-w-md">
                  <SearchBar />
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  
                  <Select 
                    value={filters.sortBy} 
                    onValueChange={(value) => handleFilterChange('sortBy', value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="votes">Most Votes</SelectItem>
                      <SelectItem value="views">Most Views</SelectItem>
                      <SelectItem value="activity">Recent Activity</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select 
                    value={filters.timeRange} 
                    onValueChange={(value) => handleFilterChange('timeRange', value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                      <SelectItem value="all">All Time</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select 
                    value={filters.status} 
                    onValueChange={(value) => handleFilterChange('status', value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Questions</SelectItem>
                      <SelectItem value="unanswered">Unanswered</SelectItem>
                      <SelectItem value="answered">Answered</SelectItem>
                      <SelectItem value="accepted">Accepted Answer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <NotificationDropdown />

                {/* Dark Mode Toggle */}
                <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>

                {/* Ask Question Button */}
                <Button onClick={() => navigate('/ask')}>
                  Ask Question
                </Button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
