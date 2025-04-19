
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Users, 
  MessageCircle, 
  User 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAIAssistant } from '../contexts/AIAssistantContext';

const Navigation: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { openAssistant } = useAIAssistant();
  const location = useLocation();

  if (!isAuthenticated) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className={`flex flex-col items-center ${
              location.pathname === '/' 
                ? 'text-nursing-primary' 
                : 'text-gray-500'
            }`}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link
            to="/learn"
            className={`flex flex-col items-center ${
              location.pathname === '/learn' 
                ? 'text-nursing-primary' 
                : 'text-gray-500'
            }`}
          >
            <BookOpen className="h-6 w-6" />
            <span className="text-xs mt-1">Learn</span>
          </Link>
          
          <Link
            to="/community"
            className={`flex flex-col items-center ${
              location.pathname === '/community' 
                ? 'text-nursing-primary' 
                : 'text-gray-500'
            }`}
          >
            <Users className="h-6 w-6" />
            <span className="text-xs mt-1">Community</span>
          </Link>
          
          <Link
            to="/chat"
            className={`flex flex-col items-center ${
              location.pathname === '/chat' 
                ? 'text-nursing-primary' 
                : 'text-gray-500'
            }`}
          >
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs mt-1">Chat</span>
          </Link>
          
          <Link
            to="/profile"
            className={`flex flex-col items-center ${
              location.pathname === '/profile' 
                ? 'text-nursing-primary' 
                : 'text-gray-500'
            }`}
          >
            {user?.avatar ? (
              <img
                className="h-6 w-6 rounded-full object-cover border-2 border-nursing-primary"
                src={user.avatar}
                alt={user.name}
              />
            ) : (
              <User className="h-6 w-6" />
            )}
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
