
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, MoreHorizontal, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { usePost } from '../contexts/PostContext';
import { getUserById } from '../services/userService';
import { formatDistanceToNow } from 'date-fns';
import { Post } from '../models/types';
import CommentSection from './CommentSection';

interface PostCardProps {
  post: Post;
  showComments?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, showComments = false }) => {
  const { user } = useAuth();
  const { likePost, unlikePost, deletePost } = usePost();
  const [isCommentsOpen, setIsCommentsOpen] = useState(showComments);
  const [showOptions, setShowOptions] = useState(false);
  
  if (!user) return null;
  
  const postAuthor = getUserById(post.userId);
  const isLiked = post.likes.includes(user.id);
  const isOwnPost = user.id === post.userId;
  const canDelete = isOwnPost || user.role === 'admin';
  
  const handleLikeToggle = () => {
    if (isLiked) {
      unlikePost(post.id);
    } else {
      likePost(post.id);
    }
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
    }
    setShowOptions(false);
  };
  
  const toggleComments = () => {
    setIsCommentsOpen(!isCommentsOpen);
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Link to={`/profile/${post.userId}`}>
              {postAuthor?.avatar ? (
                <Avatar className="h-10 w-10 border-2 border-nursing-light">
                  <img 
                    src={postAuthor.avatar} 
                    alt={postAuthor.name} 
                    className="object-cover"
                  />
                </Avatar>
              ) : (
                <Avatar className="h-10 w-10 bg-nursing-primary text-white">
                  <span>{postAuthor?.name.charAt(0)}</span>
                </Avatar>
              )}
            </Link>
            <div className="ml-3">
              <div className="flex items-center">
                <Link to={`/profile/${post.userId}`} className="font-medium text-gray-900 mr-2">
                  {postAuthor?.name}
                </Link>
                {post.isAdminPost && (
                  <span className="bg-nursing-primary text-white text-xs px-2 py-0.5 rounded-full">
                    Admin
                  </span>
                )}
                {post.isJobPosting && (
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full ml-1 flex items-center">
                    <Briefcase className="h-3 w-3 mr-1" />
                    Job
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                {post.updatedAt > post.createdAt && ' (edited)'}
              </p>
            </div>
          </div>
          
          {canDelete && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full h-8 w-8 p-0"
                onClick={() => setShowOptions(!showOptions)}
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
              
              {showOptions && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                  <button
                    onClick={handleDelete}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Delete post
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-3">
          <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
        </div>
        
        {post.images && post.images.length > 0 && (
          <div className="mt-3 overflow-hidden rounded-md">
            <img 
              src={post.images[0]} 
              alt="Post content" 
              className="w-full object-cover max-h-80"
            />
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <div>
            {post.likes.length > 0 && (
              <span>{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}</span>
            )}
          </div>
          <div>
            {post.commentsCount > 0 && (
              <span>{post.commentsCount} {post.commentsCount === 1 ? 'comment' : 'comments'}</span>
            )}
          </div>
        </div>
        
        <Separator className="my-3" />
        
        <div className="flex space-x-2">
          <Button
            variant={isLiked ? "default" : "ghost"}
            size="sm"
            onClick={handleLikeToggle}
            className={`flex-1 ${isLiked ? 'bg-nursing-primary hover:bg-nursing-secondary' : 'hover:bg-gray-100'}`}
          >
            <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
            {isLiked ? 'Liked' : 'Like'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleComments}
            className="flex-1 hover:bg-gray-100"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Comment
          </Button>
        </div>
      </div>
      
      {isCommentsOpen && (
        <CommentSection postId={post.id} />
      )}
    </Card>
  );
};

export default PostCard;
