
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Hash, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Dashboard from '@/components/Dashboard';

const Tags = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [tags] = useState([
    {
      name: 'javascript',
      description: 'High-level, interpreted programming language for web development',
      questionCount: 1250,
      followerCount: 892,
      trending: true,
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      name: 'react',
      description: 'JavaScript library for building user interfaces',
      questionCount: 890,
      followerCount: 654,
      trending: true,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'nodejs',
      description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
      questionCount: 675,
      followerCount: 432,
      trending: false,
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'python',
      description: 'General-purpose programming language known for simplicity',
      questionCount: 543,
      followerCount: 398,
      trending: true,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      name: 'typescript',
      description: 'Typed superset of JavaScript that compiles to plain JavaScript',
      questionCount: 432,
      followerCount: 287,
      trending: false,
      color: 'bg-indigo-100 text-indigo-800'
    },
    {
      name: 'css',
      description: 'Style sheet language for describing HTML presentation',
      questionCount: 321,
      followerCount: 234,
      trending: false,
      color: 'bg-pink-100 text-pink-800'
    },
    {
      name: 'html',
      description: 'Standard markup language for web pages',
      questionCount: 298,
      followerCount: 189,
      trending: false,
      color: 'bg-orange-100 text-orange-800'
    },
    {
      name: 'database',
      description: 'Systems for storing, retrieving, and managing data',
      questionCount: 267,
      followerCount: 156,
      trending: false,
      color: 'bg-gray-100 text-gray-800'
    }
  ]);

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tag.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trendingTags = tags.filter(tag => tag.trending);

  return (
    <Dashboard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tags</h1>
            <p className="text-muted-foreground mt-1">
              Discover and follow topics that interest you
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search for tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 max-w-md"
          />
        </div>

        {/* Trending Tags Section */}
        {trendingTags.length > 0 && !searchTerm && (
          <div>
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 text-orange-500 mr-2" />
              <h2 className="text-xl font-semibold">Trending Tags</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trendingTags.map((tag) => (
                <Card 
                  key={tag.name} 
                  className="hover:shadow-md transition-shadow cursor-pointer border-orange-200"
                  onClick={() => navigate(`/tags/${tag.name}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={`${tag.color} font-medium`}>
                        <Hash className="w-3 h-3 mr-1" />
                        {tag.name}
                      </Badge>
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {tag.description}
                    </p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{tag.questionCount} questions</span>
                      <span>{tag.followerCount} followers</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Tags */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {searchTerm ? `Search Results (${filteredTags.length})` : 'All Tags'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTags.map((tag) => (
              <Card 
                key={tag.name} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/tags/${tag.name}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`${tag.color} font-medium`}>
                      <Hash className="w-3 h-3 mr-1" />
                      {tag.name}
                    </Badge>
                    {tag.trending && <TrendingUp className="w-4 h-4 text-orange-500" />}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {tag.description}
                  </p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{tag.questionCount} questions</span>
                    <span>{tag.followerCount} followers</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle follow/unfollow
                    }}
                  >
                    Follow
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {filteredTags.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Hash className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No tags found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse all tags
            </p>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default Tags;
