import React from 'react';
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
import { useIsMobile } from '../hooks/use-mobile';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Rocket className="h-8 w-8 text-nursing-primary" />
      <span className="text-xl font-bold text-nursing-primary hidden md:inline">
        Pulse of Nursing
      </span>
    </div>
  );
};

const Navigation: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { openAssistant } = useAIAssistant();
  const location = useLocation();
  const isMobile = useIsMobile();

  if (!isAuthenticated) return null;

  const navigationLinks = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/learn', icon: BookOpen, label: 'Learn' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
  ];

  return (
    <>
      {/* Desktop Navigation - Top Bar */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex items-center space-x-8">
              {navigationLinks.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 ${
                    location.pathname === path 
                      ? 'text-nursing-primary font-medium' 
                      : 'text-gray-600 hover:text-nursing-primary'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
            
            {/* Profile Link - Always at top on both desktop and mobile */}
            <Link
              to="/profile"
              className={`flex items-center gap-2 ${
                location.pathname === '/profile' 
                  ? 'text-nursing-primary' 
                  : 'text-gray-600 hover:text-nursing-primary'
              }`}
            >
              {user?.avatar ? (
                <Avatar className="h-8 w-8 border-2 border-nursing-primary">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <User className="h-6 w-6" />
              )}
              <span className="text-sm">Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Fixed Profile Section at Top for Mobile */}
        <div className="fixed top-0 right-0 z-30 bg-white border-b border-gray-200 py-3 px-4 w-full flex justify-between items-center">
          <Logo className="md:hidden" />
          <Link
            to="/profile"
            className={`flex items-center gap-2 ${
              location.pathname === '/profile' 
                ? 'text-nursing-primary' 
                : 'text-gray-600'
            }`}
          >
            {user?.avatar ? (
              <Avatar className="h-8 w-8 border-2 border-nursing-primary">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            ) : (
              <User className="h-6 w-6" />
            )}
          </Link>
        </div>

        {/* Bottom Navigation for Mobile Only */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 py-2">
          <div className="grid grid-cols-4 gap-1">
            {navigationLinks.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center py-2 ${
                  location.pathname === path 
                    ? 'text-nursing-primary' 
                    : 'text-gray-500'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs mt-1">{label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
