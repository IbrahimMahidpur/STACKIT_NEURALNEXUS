
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, Search, Menu, X, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state
  const unreadNotifications = 3;

  const user = {
    name: "John Doe",
    avatar: "/placeholder.svg",
    reputation: 1250
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">StackIt</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/questions" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Questions
            </Link>
            <Link to="/tags" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Tags
            </Link>
            <Link to="/users" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Users
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative p-2">
                      <Bell className="w-5 h-5" />
                      {unreadNotifications > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                          {unreadNotifications}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="p-2 font-semibold">Notifications</div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-3">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">New answer on your question</p>
                        <p className="text-xs text-gray-500">How to implement a binary search tree in JavaScript?</p>
                        <p className="text-xs text-gray-400">2 minutes ago</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">Your answer was accepted</p>
                        <p className="text-xs text-gray-500">CSS Grid vs Flexbox: When to use which?</p>
                        <p className="text-xs text-gray-400">1 hour ago</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">@sarah mentioned you</p>
                        <p className="text-xs text-gray-500">In the React state management discussion</p>
                        <p className="text-xs text-gray-400">3 hours ago</p>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 p-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="hidden lg:block text-left">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.reputation} rep</div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => setIsLoggedIn(true)}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button onClick={() => setIsLoggedIn(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="px-2 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/questions"
                className="px-2 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Questions
              </Link>
              <Link
                to="/tags"
                className="px-2 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tags
              </Link>
              <Link
                to="/users"
                className="px-2 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Users
              </Link>
              
              {!isLoggedIn && (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setIsLoggedIn(true)}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  <Button className="w-full justify-start" onClick={() => setIsLoggedIn(true)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
