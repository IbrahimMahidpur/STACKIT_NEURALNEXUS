
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Award, MessageSquare, TrendingUp, Search, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Dashboard from '@/components/Dashboard';

const Users = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [users] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      username: 'sarahc',
      avatar: '/placeholder.svg',
      reputation: 4250,
      badge: 'Expert',
      badgeColor: 'bg-purple-100 text-purple-800',
      location: 'San Francisco, CA',
      joinDate: '2023-01-15',
      questionsAsked: 23,
      answersGiven: 89,
      bestAnswers: 45,
      specialties: ['JavaScript', 'React', 'Node.js'],
      bio: 'Full-stack developer with 8+ years of experience. Love helping others learn programming.',
      trending: true
    },
    {
      id: 2,
      name: 'Alex Rodriguez',
      username: 'alexr',
      avatar: '/placeholder.svg',
      reputation: 3890,
      badge: 'Contributor',
      badgeColor: 'bg-blue-100 text-blue-800',
      location: 'Austin, TX',
      joinDate: '2022-11-08',
      questionsAsked: 15,
      answersGiven: 67,
      bestAnswers: 32,
      specialties: ['Python', 'Data Science', 'Machine Learning'],
      bio: 'Data scientist passionate about ML and helping others understand complex algorithms.',
      trending: true
    },
    {
      id: 3,
      name: 'Emma Wilson',
      username: 'emmaw',
      avatar: '/placeholder.svg',
      reputation: 2340,
      badge: 'Helper',
      badgeColor: 'bg-green-100 text-green-800',
      location: 'London, UK',
      joinDate: '2023-03-22',
      questionsAsked: 31,
      answersGiven: 54,
      bestAnswers: 18,
      specialties: ['CSS', 'UI/UX', 'Frontend'],
      bio: 'Frontend developer and designer. Focused on creating beautiful user experiences.',
      trending: false
    },
    {
      id: 4,
      name: 'Mike Johnson',
      username: 'mikej',
      avatar: '/placeholder.svg',
      reputation: 1890,
      badge: 'Learner',
      badgeColor: 'bg-yellow-100 text-yellow-800',
      location: 'Toronto, CA',
      joinDate: '2023-06-10',
      questionsAsked: 45,
      answersGiven: 28,
      bestAnswers: 12,
      specialties: ['Java', 'Spring Boot', 'Backend'],
      bio: 'Backend developer learning new technologies and sharing knowledge along the way.',
      trending: false
    },
    {
      id: 5,
      name: 'Lisa Zhang',
      username: 'lisaz',
      avatar: '/placeholder.svg',
      reputation: 5670,
      badge: 'Mentor',
      badgeColor: 'bg-red-100 text-red-800',
      location: 'Seattle, WA',
      joinDate: '2022-08-03',
      questionsAsked: 12,
      answersGiven: 124,
      bestAnswers: 78,
      specialties: ['Database', 'SQL', 'System Design'],
      bio: 'Senior engineer with expertise in databases and distributed systems.',
      trending: true
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const trendingUsers = users.filter(user => user.trending);

  return (
    <Dashboard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Community Members</h1>
            <p className="text-muted-foreground mt-1">
              Connect with knowledgeable developers in our community
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name, username, or expertise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 max-w-md"
          />
        </div>

        {/* Trending Contributors */}
        {trendingUsers.length > 0 && !searchTerm && (
          <div>
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 text-orange-500 mr-2" />
              <h2 className="text-xl font-semibold">Trending Contributors</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trendingUsers.map((user) => (
                <Card 
                  key={user.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer border-orange-200"
                  onClick={() => navigate(`/users/${user.username}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          <User className="w-6 h-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{user.name}</h3>
                          <TrendingUp className="w-4 h-4 text-orange-500" />
                        </div>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                        <Badge className={`${user.badgeColor} text-xs mt-1`}>
                          <Award className="w-3 h-3 mr-1" />
                          {user.badge}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {user.bio}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {user.specialties.slice(0, 3).map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
                      <div>
                        <div className="font-medium text-foreground">{user.reputation}</div>
                        <div>Reputation</div>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{user.answersGiven}</div>
                        <div>Answers</div>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{user.bestAnswers}</div>
                        <div>Best</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Users */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {searchTerm ? `Search Results (${filteredUsers.length})` : 'All Members'}
          </h2>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <Card 
                key={user.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/users/${user.username}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-6">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        <User className="w-8 h-8" />
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <Badge className={`${user.badgeColor}`}>
                          <Award className="w-3 h-3 mr-1" />
                          {user.badge}
                        </Badge>
                        {user.trending && <TrendingUp className="w-4 h-4 text-orange-500" />}
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-3">@{user.username}</p>
                      
                      <p className="text-sm mb-4 line-clamp-2">{user.bio}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {user.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{user.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="font-medium text-foreground">{user.reputation}</div>
                            <div className="text-xs">Reputation</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-foreground">{user.questionsAsked}</div>
                            <div className="text-xs">Questions</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-foreground">{user.answersGiven}</div>
                            <div className="text-xs">Answers</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-green-600">{user.bestAnswers}</div>
                            <div className="text-xs">Best</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {filteredUsers.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No users found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse all members
            </p>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default Users;
