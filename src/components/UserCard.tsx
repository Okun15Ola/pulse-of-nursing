
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { User } from '../models/types';
import { useAuth } from '../contexts/AuthContext';
import { followUser, unfollowUser } from '../services/userService';

interface UserCardProps {
  user: User;
  onFollowChange?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onFollowChange }) => {
  const { user: currentUser } = useAuth();
  
  if (!currentUser) return null;
  
  const isFollowing = currentUser.following.includes(user.id);
  const isSelf = currentUser.id === user.id;
  
  const handleFollowToggle = () => {
    if (isSelf) return;
    
    if (isFollowing) {
      unfollowUser(currentUser.id, user.id);
    } else {
      followUser(currentUser.id, user.id);
    }
    
    if (onFollowChange) {
      onFollowChange();
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <Link to={`/profile/${user.id}`} className="flex items-center">
            {user.avatar ? (
              <Avatar className="h-10 w-10">
                <img src={user.avatar} alt={user.name} className="object-cover" />
              </Avatar>
            ) : (
              <Avatar className="h-10 w-10 bg-nursing-primary text-white">
                <span>{user.name.charAt(0)}</span>
              </Avatar>
            )}
            <div className="ml-3">
              <h3 className="font-medium text-gray-900">{user.name}</h3>
              {user.specialty && (
                <p className="text-xs text-gray-500">{user.specialty}</p>
              )}
            </div>
          </Link>
          
          {!isSelf && (
            <Button 
              onClick={handleFollowToggle}
              variant={isFollowing ? "outline" : "default"}
              size="sm"
              className={isFollowing ? "" : "bg-nursing-primary hover:bg-nursing-secondary"}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
        
        {user.bio && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{user.bio}</p>
        )}
        
        <div className="mt-2 flex items-center text-xs text-gray-500 space-x-2">
          {user.location && (
            <span>{user.location}</span>
          )}
          {user.yearsOfExperience && (
            <span>• {user.yearsOfExperience} years experience</span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
