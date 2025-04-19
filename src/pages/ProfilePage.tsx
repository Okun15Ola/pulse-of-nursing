
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { BriefcaseIcon, MapPinIcon, CalendarIcon, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePost } from '../contexts/PostContext';
import { getUserById, followUser, unfollowUser } from '../services/userService';
import PostCard from '../components/PostCard';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const { getUserPosts } = usePost();
  const [profileUser, setProfileUser] = useState(currentUser);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  
  useEffect(() => {
    // If ID is provided in URL, fetch that user, otherwise show current user
    const userToShow = id ? getUserById(id) : currentUser;
    if (userToShow) {
      setProfileUser(userToShow);
      setFollowers(userToShow.followers);
      setFollowing(userToShow.following);
      
      if (currentUser) {
        setIsFollowing(currentUser.following.includes(userToShow.id));
      }
    }
  }, [id, currentUser]);
  
  const handleFollowToggle = () => {
    if (!currentUser || !profileUser) return;
    
    if (isFollowing) {
      unfollowUser(currentUser.id, profileUser.id);
      setIsFollowing(false);
      setFollowers(prev => prev.filter(id => id !== currentUser.id));
    } else {
      followUser(currentUser.id, profileUser.id);
      setIsFollowing(true);
      setFollowers(prev => [...prev, currentUser.id]);
    }
  };
  
  if (!profileUser || !currentUser) return null;
  
  const userPosts = getUserPosts(profileUser.id);
  const isOwnProfile = currentUser.id === profileUser.id;
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Card className="mb-6 overflow-hidden">
        {/* Cover image */}
        <div className="h-48 bg-gradient-to-r from-nursing-primary to-nursing-secondary"></div>
        
        <div className="relative px-6 pb-6">
          {/* Profile image */}
          <div className="absolute -top-16 flex justify-between w-full pr-6">
            {/* Avatar */}
            <div>
              {profileUser.avatar ? (
                <Avatar className="h-32 w-32 border-4 border-white">
                  <img 
                    src={profileUser.avatar} 
                    alt={profileUser.name} 
                    className="object-cover"
                  />
                </Avatar>
              ) : (
                <Avatar className="h-32 w-32 border-4 border-white bg-nursing-primary text-white text-4xl">
                  <span>{profileUser.name.charAt(0)}</span>
                </Avatar>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex items-start pt-4 space-x-2">
              {isOwnProfile ? (
                <Button asChild variant="outline" className="flex items-center">
                  <Link to="/settings">
                    <Settings className="mr-1 h-4 w-4" /> Edit Profile
                  </Link>
                </Button>
              ) : (
                <Button
                  variant={isFollowing ? "outline" : "default"}
                  onClick={handleFollowToggle}
                  className={isFollowing ? "" : "bg-nursing-primary hover:bg-nursing-secondary"}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              )}
            </div>
          </div>
          
          {/* Profile info */}
          <div className="mt-20">
            <h1 className="text-2xl font-bold text-gray-900">{profileUser.name}</h1>
            <p className="text-sm text-gray-600 mt-1">{profileUser.email}</p>
            
            {profileUser.role === 'admin' && (
              <span className="inline-block bg-nursing-primary text-white text-xs px-2 py-0.5 rounded-full mt-2">
                Administrator
              </span>
            )}
            
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-sm text-gray-500">
              {profileUser.specialty && (
                <div className="flex items-center">
                  <BriefcaseIcon className="h-4 w-4 mr-1" />
                  <span>{profileUser.specialty}</span>
                </div>
              )}
              
              {profileUser.location && (
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span>{profileUser.location}</span>
                </div>
              )}
              
              {profileUser.yearsOfExperience && (
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>{profileUser.yearsOfExperience} years experience</span>
                </div>
              )}
            </div>
            
            {profileUser.bio && (
              <p className="mt-4 text-gray-700">{profileUser.bio}</p>
            )}
            
            <div className="flex items-center space-x-4 mt-4 text-sm">
              <span>
                <span className="font-semibold">{followers.length}</span> followers
              </span>
              <span>
                <span className="font-semibold">{following.length}</span> following
              </span>
              <span>
                <span className="font-semibold">{userPosts.length}</span> posts
              </span>
            </div>
          </div>
        </div>
      </Card>
      
      <Tabs defaultValue="posts">
        <TabsList className="mb-6">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts">
          <div className="space-y-4">
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <Card className="p-6 text-center text-gray-500">
                <p>No posts yet.</p>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="about">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">About {profileUser.name}</h2>
            
            <div className="space-y-4">
              {profileUser.bio && (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Bio</h3>
                    <p className="text-gray-700">{profileUser.bio}</p>
                  </div>
                  <Separator />
                </>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Specialty</h3>
                  <p className="text-gray-700">{profileUser.specialty || 'Not specified'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
                  <p className="text-gray-700">{profileUser.location || 'Not specified'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Experience</h3>
                  <p className="text-gray-700">
                    {profileUser.yearsOfExperience 
                      ? `${profileUser.yearsOfExperience} years` 
                      : 'Not specified'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                  <p className="text-gray-700">{profileUser.email}</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
