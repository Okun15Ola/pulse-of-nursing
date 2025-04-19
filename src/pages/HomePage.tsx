
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import { usePost } from '../contexts/PostContext';
import CreatePostForm from '../components/CreatePostForm';
import PostCard from '../components/PostCard';
import { Post } from '../models/types';


const HomePage: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { posts, getFollowingPosts } = usePost();
  const [activeTab, setActiveTab] = useState('following');
  
  if (!user) return null;

  // Posts from followed users and user's own posts
  const followingPosts = getFollowingPosts();
  
  // All posts
  const allPosts = [...posts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  // Filter admin announcements and job posts
  const adminPosts = posts.filter(post => post.isAdminPost);
  
  // Job posts
  const jobPosts = posts.filter(post => post.isJobPosting);

  const renderPosts = (postList: Post[]) => {
    if (postList.length === 0) {
      return (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-gray-500">No posts to display.</p>
          {activeTab === 'following' && (
            <p className="text-gray-500 text-sm mt-2">
              Follow other nurses to see their posts here.
            </p>
          )}
        </div>
      );
    }
    
    return postList.map(post => (
      <PostCard key={post.id} post={post} />
    ));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 mt-4">Your Feed</h1>
      
      <CreatePostForm />
      
      <Tabs 
        defaultValue="following" 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="mb-6"
      >
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-4">
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="jobs" className="hidden md:inline-flex">Jobs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="following" className="mt-6">
          {renderPosts(followingPosts)}
        </TabsContent>
        
        <TabsContent value="all" className="mt-6">
          {renderPosts(allPosts)}
        </TabsContent>
        
        <TabsContent value="announcements" className="mt-6">
          {renderPosts(adminPosts)}
        </TabsContent>
        
        <TabsContent value="jobs" className="mt-6">
          {renderPosts(jobPosts)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePage;
