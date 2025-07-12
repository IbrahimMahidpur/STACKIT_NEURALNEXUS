
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowUp, ArrowDown, Share, Bookmark, Flag, MessageSquare, CheckCircle, Clock, Eye, ArrowLeft, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import RichTextEditor from '@/components/RichTextEditor';
import AnswerCard from '@/components/AnswerCard';
import { useRealtimeQuestions } from '@/hooks/useRealtimeQuestions';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    currentQuestion, 
    currentAnswers, 
    isLoading, 
    isConnected,
    handlePostAnswer, 
    handleVoteQuestion, 
    handleVoteAnswer,
    setQuestion,
    setAnswers
  } = useRealtimeQuestions();
  
  const [newAnswer, setNewAnswer] = useState('');
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  // Mock question data - in a real app, this would come from an API
  const mockQuestion = {
    id: parseInt(id || '1'),
    title: "How to implement a binary search tree in JavaScript?",
    description: `I'm learning data structures and need help understanding how to properly implement a BST with insertion, deletion, and search methods.

Here's what I have so far:

\`\`\`javascript
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  insert(value) {
    // Need help implementing this
  }
}
\`\`\`

I understand the basic concept but I'm struggling with the recursive implementation. Could someone help me complete this implementation and explain the best practices?

**What I've tried:**
- Looked at various online tutorials
- Attempted recursive and iterative approaches
- Getting confused with the node references

**Expected behavior:**
- Insert values maintaining BST property
- Search for values efficiently
- Delete nodes while preserving tree structure`,
    tags: ["javascript", "data-structures", "algorithms", "binary-tree"],
    author: { 
      name: "Sarah Chen", 
      avatar: "/placeholder.svg", 
      reputation: 2840,
      joinDate: "2023-01-15"
    },
    votes: 15,
    views: 284,
    timeAgo: "2 hours ago",
    createdAt: "2024-01-15T10:30:00Z"
  };

  // Mock answers data - in a real app, this would come from an API
  const mockAnswers = [
    {
      id: 1,
      content: `Here's a complete implementation of a Binary Search Tree in JavaScript:

\`\`\`javascript
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  insert(value) {
    this.root = this._insertRecursive(this.root, value);
  }
  
  _insertRecursive(node, value) {
    // Base case: if node is null, create new node
    if (node === null) {
      return new TreeNode(value);
    }
    
    // Recursive case: traverse left or right
    if (value < node.value) {
      node.left = this._insertRecursive(node.left, value);
    } else if (value > node.value) {
      node.right = this._insertRecursive(node.right, value);
    }
    
    return node;
  }
  
  search(value) {
    return this._searchRecursive(this.root, value);
  }
  
  _searchRecursive(node, value) {
    if (node === null || node.value === value) {
      return node;
    }
    
    if (value < node.value) {
      return this._searchRecursive(node.left, value);
    }
    
    return this._searchRecursive(node.right, value);
  }
  
  delete(value) {
    this.root = this._deleteRecursive(this.root, value);
  }
  
  _deleteRecursive(node, value) {
    if (node === null) return node;
    
    if (value < node.value) {
      node.left = this._deleteRecursive(node.left, value);
    } else if (value > node.value) {
      node.right = this._deleteRecursive(node.right, value);
    } else {
      // Node to be deleted found
      
      // Case 1: Node has no children
      if (node.left === null && node.right === null) {
        return null;
      }
      
      // Case 2: Node has one child
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;
      
      // Case 3: Node has two children
      // Find inorder successor (smallest in right subtree)
      node.value = this._findMin(node.right);
      node.right = this._deleteRecursive(node.right, node.value);
    }
    
    return node;
  }
  
  _findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node.value;
  }
}
\`\`\`

**Key Points:**

1. **Insertion**: Always maintains BST property by comparing values and going left (smaller) or right (larger)
2. **Search**: Uses the BST property to efficiently find values in O(log n) time on average
3. **Deletion**: Handles three cases - no children, one child, or two children

**Usage Example:**
\`\`\`javascript
const bst = new BST();
bst.insert(50);
bst.insert(30);
bst.insert(70);
bst.insert(20);
bst.insert(40);

console.log(bst.search(30)); // Returns the node
console.log(bst.search(100)); // Returns null
\`\`\`

The recursive approach is cleaner and more intuitive once you understand the pattern!`,
      author: { 
        name: "Alex Rodriguez", 
        avatar: "/placeholder.svg", 
        reputation: 4250,
        badges: ["Expert", "Teacher"]
      },
      votes: 23,
      timeAgo: "1 hour ago",
      accepted: true,
      comments: [
        {
          id: 1,
          content: "Great explanation! The three deletion cases are particularly well explained.",
          author: "Mike Johnson",
          timeAgo: "45 minutes ago"
        },
        {
          id: 2,
          content: "This helped me understand the recursive pattern. Thank you!",
          author: "Sarah Chen",
          timeAgo: "30 minutes ago"
        }
      ]
    },
    {
      id: 2,
      content: `Just to add to Alex's excellent answer, here's an iterative approach for insertion if you prefer that style:

\`\`\`javascript
insertIterative(value) {
  const newNode = new TreeNode(value);
  
  if (this.root === null) {
    this.root = newNode;
    return;
  }
  
  let current = this.root;
  
  while (true) {
    if (value < current.value) {
      if (current.left === null) {
        current.left = newNode;
        break;
      }
      current = current.left;
    } else if (value > current.value) {
      if (current.right === null) {
        current.right = newNode;
        break;
      }
      current = current.right;
    } else {
      // Value already exists
      break;
    }
  }
}
\`\`\`

Some developers find the iterative approach easier to debug, especially when starting out. Both approaches have the same time complexity!`,
      author: { 
        name: "Emma Wilson", 
        avatar: "/placeholder.svg", 
        reputation: 1890,
        badges: ["Contributor"]
      },
      votes: 8,
      timeAgo: "45 minutes ago",
      accepted: false,
      comments: []
    }
  ];

  // Initialize question and answers on component mount
  useEffect(() => {
    setQuestion(mockQuestion);
    setAnswers(mockAnswers);
  }, [id, setQuestion, setAnswers]);

  const handleVote = (type: 'up' | 'down') => {
    if (!user) {
      toast.error('Please sign in to vote');
      return;
    }

    if (!isConnected) {
      toast.error('Not connected to real-time service');
      return;
    }

    if (userVote === type) {
      // Remove vote
      setUserVote(null);
    } else {
      // Add vote or change vote
      setUserVote(type);
    }

    if (currentQuestion) {
      handleVoteQuestion(currentQuestion.id, type);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!user) {
      toast.error('Please sign in to post an answer');
      return;
    }

    if (!newAnswer.trim()) {
      toast.error('Please enter an answer');
      return;
    }

    if (!isConnected) {
      toast.error('Not connected to real-time service');
      return;
    }

    if (!currentQuestion) {
      toast.error('Question not found');
      return;
    }

    const answerData = {
      content: newAnswer.trim(),
      author: {
        name: user.name,
        avatar: user.avatar || "/placeholder.svg",
        reputation: user.reputation
      }
    };

    const success = await handlePostAnswer(currentQuestion.id, answerData);
    
    if (success) {
      setNewAnswer('');
    }
  };

  const question = currentQuestion || mockQuestion;
  const answers = currentAnswers || mockAnswers;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Questions
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Question */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {question.title}
                      </h1>
                      {/* Connection Status */}
                      <div className="flex items-center gap-2">
                        {isConnected ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <Wifi className="w-4 h-4" />
                            <span className="text-sm">Live</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-600">
                            <WifiOff className="w-4 h-4" />
                            <span className="text-sm">Offline</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Asked {question.timeAgo}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {question.views} views
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {question.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex gap-4">
                  {/* Voting */}
                  <div className="flex flex-col items-center space-y-2">
                    <Button
                      variant={userVote === 'up' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => handleVote('up')}
                      disabled={!isConnected || !user}
                      title={!user ? 'Sign in to vote' : ''}
                    >
                      <ArrowUp className="w-5 h-5" />
                    </Button>
                    
                    <span className="text-lg font-semibold text-gray-900">
                      {question.votes}
                    </span>
                    
                    <Button
                      variant={userVote === 'down' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => handleVote('down')}
                      disabled={!isConnected || !user}
                      title={!user ? 'Sign in to vote' : ''}
                    >
                      <ArrowDown className="w-5 h-5" />
                    </Button>

                    <Button variant="ghost" size="sm">
                      <Bookmark className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="prose prose-sm max-w-none mb-6">
                      <div className="whitespace-pre-wrap text-gray-700">
                        {question.description}
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Share className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Flag className="w-4 h-4 mr-1" />
                          Flag
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={question.author.avatar} alt={question.author.name} />
                          <AvatarFallback>
                            {question.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-blue-900">
                            {question.author.name}
                          </div>
                          <div className="text-sm text-blue-700">
                            {question.author.reputation} reputation
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Answers */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {answers.length} Answers
                </h2>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Oldest</Button>
                  <Button variant="default" size="sm">Votes</Button>
                  <Button variant="ghost" size="sm">Newest</Button>
                </div>
              </div>

              <div className="space-y-6">
                {answers.map((answer, index) => (
                  <div key={answer.id}>
                    <AnswerCard 
                      answer={answer} 
                      onVote={(voteType) => handleVoteAnswer(answer.id, voteType)}
                      isConnected={isConnected}
                    />
                    {index < answers.length - 1 && <Separator className="my-6" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Answer Form */}
            {user ? (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Your Answer</h3>
                  <p className="text-sm text-gray-600">
                    Please provide a detailed answer with code examples if applicable.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RichTextEditor
                    value={newAnswer}
                    onChange={setNewAnswer}
                    placeholder="Write your answer here. Include code examples, explanations, and any relevant details..."
                  />
                  
                  <div className="flex gap-4">
                    <Button 
                      onClick={handleSubmitAnswer}
                      disabled={!newAnswer.trim() || isLoading || !isConnected}
                    >
                      {isLoading ? 'Posting...' : 'Post Your Answer'}
                    </Button>
                    <Button variant="outline">
                      Save Draft
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Sign in to Answer</h3>
                    <p className="text-sm text-gray-600">
                      You need to be signed in to post an answer to this question.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button onClick={() => navigate('/login')}>
                        Sign In
                      </Button>
                      <Button variant="outline" onClick={() => navigate('/signup')}>
                        Sign Up
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Question Stats */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Question Stats</h3>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Asked</span>
                  <span>{question.timeAgo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Viewed</span>
                  <span>{question.views} times</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active</span>
                  <span>1 hour ago</span>
                </div>
              </CardContent>
            </Card>

            {/* Related Questions */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Related Questions</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "How to balance a binary search tree?",
                  "BST vs Hash Table performance comparison",
                  "Implementing AVL tree in JavaScript",
                  "Tree traversal algorithms explained"
                ].map((title, index) => (
                  <Link
                    key={index}
                    to={`/question/${index + 10}`}
                    className="block text-sm text-blue-600 hover:text-blue-800 line-clamp-2"
                  >
                    {title}
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Hot Network Questions */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Hot Network Questions</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Why is my React component re-rendering infinitely?",
                  "Best practices for API error handling",
                  "PostgreSQL vs MongoDB for large datasets",
                  "Understanding JavaScript closures with examples"
                ].map((title, index) => (
                  <Link
                    key={index}
                    to={`/question/${index + 20}`}
                    className="block text-sm text-blue-600 hover:text-blue-800 line-clamp-2"
                  >
                    {title}
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestionDetail;
