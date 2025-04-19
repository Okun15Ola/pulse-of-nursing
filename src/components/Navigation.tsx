
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, MessageCircle, User, LogOut, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAIAssistant } from '../contexts/AIAssistantContext';

const Navigation: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { openAssistant } = useAIAssistant();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30">
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-nursing-primary">Pulse of Nursing</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/' 
                    ? 'border-nursing-primary text-nursing-dark' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Home className="mr-1 h-5 w-5" /> Home
              </Link>
              <Link
                to="/learn"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/learn' 
                    ? 'border-nursing-primary text-nursing-dark' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BookOpen className="mr-1 h-5 w-5" /> Learn
              </Link>
              <Link
                to="/community"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/community' 
                    ? 'border-nursing-primary text-nursing-dark' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="mr-1 h-5 w-5" /> Community
              </Link>
              <Link
                to="/chat"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/chat' 
                    ? 'border-nursing-primary text-nursing-dark' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <MessageCircle className="mr-1 h-5 w-5" /> Chat
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button
              variant="ghost"
              className="text-nursing-primary hover:bg-nursing-light rounded-full"
              onClick={openAssistant}
            >
              <div className="flex items-center">
                <span className="bg-nursing-primary text-white p-1 rounded-full">
                  AI
                </span>
                <span className="ml-2">Assistant</span>
              </div>
            </Button>
            
            <div className="ml-3 relative">
              <div className="group inline-block relative">
                <Link to="/profile" className="flex items-center space-x-2">
                  {user?.avatar ? (
                    <img
                      className="h-8 w-8 rounded-full object-cover border-2 border-nursing-primary"
                      src={user.avatar}
                      alt={user.name}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-nursing-primary flex items-center justify-center text-white">
                      <User size={16} />
                    </div>
                  )}
                  <span className="font-medium text-sm text-gray-700">{user?.name}</span>
                </Link>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10 invisible group-hover:visible">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-nursing-light"
                  >
                    <User className="inline-block h-4 w-4 mr-2" /> Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-nursing-light"
                  >
                    <Settings className="inline-block h-4 w-4 mr-2" /> Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-nursing-light"
                  >
                    <LogOut className="inline-block h-4 w-4 mr-2" /> Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-nursing-primary hover:bg-nursing-light rounded-full mr-2"
              onClick={openAssistant}
            >
              <span className="bg-nursing-primary text-white p-1 rounded-full text-xs">
                AI
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle classes based on isMenuOpen state */}
      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              location.pathname === '/' 
                ? 'bg-nursing-light border-nursing-primary text-nursing-primary' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800'
            }`}
            onClick={toggleMenu}
          >
            <Home className="inline-block mr-2 h-5 w-5" /> Home
          </Link>
          <Link
            to="/learn"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              location.pathname === '/learn' 
                ? 'bg-nursing-light border-nursing-primary text-nursing-primary' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800'
            }`}
            onClick={toggleMenu}
          >
            <BookOpen className="inline-block mr-2 h-5 w-5" /> Learn
          </Link>
          <Link
            to="/community"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              location.pathname === '/community' 
                ? 'bg-nursing-light border-nursing-primary text-nursing-primary' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800'
            }`}
            onClick={toggleMenu}
          >
            <Users className="inline-block mr-2 h-5 w-5" /> Community
          </Link>
          <Link
            to="/chat"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              location.pathname === '/chat' 
                ? 'bg-nursing-light border-nursing-primary text-nursing-primary' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800'
            }`}
            onClick={toggleMenu}
          >
            <MessageCircle className="inline-block mr-2 h-5 w-5" /> Chat
          </Link>
          <Link
            to="/profile"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              location.pathname === '/profile' 
                ? 'bg-nursing-light border-nursing-primary text-nursing-primary' 
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800'
            }`}
            onClick={toggleMenu}
          >
            <User className="inline-block mr-2 h-5 w-5" /> Profile
          </Link>
          <button
            onClick={() => {
              logout();
              toggleMenu();
            }}
            className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800"
          >
            <LogOut className="inline-block mr-2 h-5 w-5" /> Sign out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
