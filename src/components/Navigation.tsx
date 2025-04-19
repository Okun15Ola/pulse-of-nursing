
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

const Navigation: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { openAssistant } = useAIAssistant();
  const location = useLocation();
  const isMobile = useIsMobile();

  if (!isAuthenticated) return null;

  const renderProfileSection = () => (
    <Link
      to="/profile"
      className={`flex items-center gap-2 ${
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
      <span className="text-sm hidden md:inline">Profile</span>
    </Link>
  );

  const navigationLinks = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/learn', icon: BookOpen, label: 'Learn' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              {navigationLinks.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 ${
                    location.pathname === path 
                      ? 'text-nursing-primary' 
                      : 'text-gray-500'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
            {renderProfileSection()}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Fixed Profile Section at Top */}
        <div className="fixed top-0 right-0 z-30 bg-white border-b border-gray-200 py-4 px-4 w-full">
          <div className="flex justify-end">
            {renderProfileSection()}
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 py-2">
          <div className="grid grid-cols-4 gap-1">
            {navigationLinks.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center ${
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
