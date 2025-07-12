
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
  Bell,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [notificationCount, setNotificationCount] = useState(3);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'questions', label: 'Questions', icon: MessageSquare, path: '/questions' },
    { id: 'tags', label: 'Tags', icon: Tags, path: '/tags' },
    { id: 'users', label: 'Users', icon: Users, path: '/users' },
    { id: 'trending', label: 'Trending', icon: TrendingUp, path: '/trending' },
    { id: 'stats', label: 'Stats', icon: BarChart3, path: '/stats' }
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
  };

  const isActive = (path: string) => location.pathname === path;

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
                className="w-full justify-start"
                onClick={() => navigate(item.path)}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
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
                      tag.trending ? 'border-orange-200 bg-orange-50 text-orange-700' : ''
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
                <span className="text-green-600">Active Today</span>
                <span className="font-medium text-green-600">{communityStats.activeToday}</span>
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
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search questions, tags, users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filters */}
                <Select value={activeFilter} onValueChange={setActiveFilter}>
                  <SelectTrigger className="w-32">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="unanswered">Unanswered</SelectItem>
                    <SelectItem value="recent">Recent</SelectItem>
                    <SelectItem value="votes">Most Votes</SelectItem>
                    <SelectItem value="views">Most Views</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-4 h-4" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>

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
