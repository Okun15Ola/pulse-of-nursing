
import { User } from '../models/types';
import { mockUsers } from '../data/mockData';

export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};

export const getUsersByIds = (userIds: string[]): User[] => {
  return mockUsers.filter(user => userIds.includes(user.id));
};

export const followUser = (currentUserId: string, userToFollowId: string): boolean => {
  const currentUser = mockUsers.find(user => user.id === currentUserId);
  const userToFollow = mockUsers.find(user => user.id === userToFollowId);
  
  if (!currentUser || !userToFollow) {
    return false;
  }
  
  // Add to following list if not already following
  if (!currentUser.following.includes(userToFollowId)) {
    currentUser.following.push(userToFollowId);
    userToFollow.followers.push(currentUserId);
    
    // Update in localStorage if it's the current user
    const storedUser = localStorage.getItem('pulseUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.id === currentUserId) {
        parsedUser.following = currentUser.following;
        localStorage.setItem('pulseUser', JSON.stringify(parsedUser));
      }
    }
    
    return true;
  }
  
  return false;
};

export const unfollowUser = (currentUserId: string, userToUnfollowId: string): boolean => {
  const currentUser = mockUsers.find(user => user.id === currentUserId);
  const userToUnfollow = mockUsers.find(user => user.id === userToUnfollowId);
  
  if (!currentUser || !userToUnfollow) {
    return false;
  }
  
  // Remove from following list if following
  const followingIndex = currentUser.following.indexOf(userToUnfollowId);
  if (followingIndex !== -1) {
    currentUser.following.splice(followingIndex, 1);
    
    const followerIndex = userToUnfollow.followers.indexOf(currentUserId);
    if (followerIndex !== -1) {
      userToUnfollow.followers.splice(followerIndex, 1);
    }
    
    // Update in localStorage if it's the current user
    const storedUser = localStorage.getItem('pulseUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.id === currentUserId) {
        parsedUser.following = currentUser.following;
        localStorage.setItem('pulseUser', JSON.stringify(parsedUser));
      }
    }
    
    return true;
  }
  
  return false;
};

export const searchUsers = (query: string): User[] => {
  if (!query) return [];
  
  const lowerQuery = query.toLowerCase();
  return mockUsers.filter(user => 
    user.name.toLowerCase().includes(lowerQuery) || 
    user.specialty?.toLowerCase().includes(lowerQuery) ||
    user.location?.toLowerCase().includes(lowerQuery)
  );
};

export const getSuggestedUsers = (currentUserId: string, limit: number = 5): User[] => {
  const currentUser = mockUsers.find(user => user.id === currentUserId);
  if (!currentUser) return [];
  
  // Filter out users the current user already follows and the current user
  const potentialUsers = mockUsers.filter(user => 
    user.id !== currentUserId && 
    !currentUser.following.includes(user.id)
  );
  
  // Return random selection of users up to the limit
  return potentialUsers.sort(() => 0.5 - Math.random()).slice(0, limit);
};
