
import { BarChart3, Users, MessageSquare, TrendingUp, Eye, Award, Calendar, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Dashboard from '@/components/Dashboard';

const Stats = () => {
  const communityStats = {
    totalQuestions: 12543,
    totalAnswers: 28901,
    totalUsers: 5643,
    activeToday: 234,
    questionsToday: 45,
    answersToday: 89,
    newUsersToday: 12,
    totalViews: 156789
  };

  const topTags = [
    { name: 'javascript', questions: 1250, percentage: 22 },
    { name: 'react', questions: 890, percentage: 16 },
    { name: 'python', questions: 675, percentage: 12 },
    { name: 'nodejs', questions: 543, percentage: 10 },
    { name: 'css', questions: 432, percentage: 8 }
  ];

  const monthlyGrowth = [
    { month: 'Jan', questions: 234, answers: 567, users: 89 },
    { month: 'Feb', questions: 345, answers: 678, users: 102 },
    { month: 'Mar', questions: 456, answers: 789, users: 134 },
    { month: 'Apr', questions: 567, answers: 890, users: 156 },
    { month: 'May', questions: 678, answers: 1012, users: 178 },
    { month: 'Jun', questions: 789, answers: 1134, users: 201 }
  ];

  return (
    <Dashboard>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-8 h-8 text-blue-500" />
          <div>
            <h1 className="text-3xl font-bold">Community Statistics</h1>
            <p className="text-muted-foreground mt-1">
              Insights and analytics about our growing community
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{communityStats.totalQuestions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{communityStats.questionsToday} today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Answers</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{communityStats.totalAnswers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{communityStats.answersToday} today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{communityStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{communityStats.newUsersToday} today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{communityStats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Across all questions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Today */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Today's Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{communityStats.activeToday}</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{communityStats.questionsToday}</div>
                <div className="text-sm text-muted-foreground">New Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{communityStats.answersToday}</div>
                <div className="text-sm text-muted-foreground">New Answers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Most Popular Tags</CardTitle>
            <p className="text-sm text-muted-foreground">
              Based on question count and community engagement
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topTags.map((tag, index) => (
                <div key={tag.name} className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">#{tag.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {tag.questions} questions
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${tag.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-sm font-medium">{tag.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Monthly Growth</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Community growth over the past 6 months
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {monthlyGrowth.map((month) => (
                <div key={month.month} className="grid grid-cols-4 gap-4 items-center">
                  <div className="font-medium">{month.month}</div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">{month.questions}</div>
                    <div className="text-xs text-muted-foreground">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{month.answers}</div>
                    <div className="text-xs text-muted-foreground">Answers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-600">{month.users}</div>
                    <div className="text-xs text-muted-foreground">New Users</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Response Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-green-600">87%</div>
                <div className="text-sm text-muted-foreground">Questions get answered</div>
                <div className="text-xs text-muted-foreground">
                  Average response time: 2.3 hours
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-blue-600">4.2</div>
                <div className="text-sm text-muted-foreground">Average answers per question</div>
                <div className="text-xs text-muted-foreground">
                  92% user satisfaction rate
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Dashboard>
  );
};

export default Stats;
