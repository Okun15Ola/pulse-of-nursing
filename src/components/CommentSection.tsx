
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '../contexts/AuthContext';
import { usePost } from '../contexts/PostContext';
import { getUserById } from '../services/userService';
import { formatDistanceToNow } from 'date-fns';

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { user } = useAuth();
  const { getPostComments, addComment, likeComment, unlikeComment, deleteComment } = usePost();
  const [commentText, setCommentText] = useState('');
  
  if (!user) return null;
  
  const comments = getPostComments(postId);
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() !== '') {
      addComment(postId, commentText);
      setCommentText('');
    }
  };
  
  return (
    <div className="bg-gray-50 p-4">
      <form onSubmit={handleCommentSubmit} className="flex items-center mb-4">
        {user.avatar ? (
          <Avatar className="h-8 w-8 mr-2">
            <img src={user.avatar} alt={user.name} className="object-cover" />
          </Avatar>
        ) : (
          <Avatar className="h-8 w-8 mr-2 bg-nursing-primary text-white">
            <span>{user.name.charAt(0)}</span>
          </Avatar>
        )}
        <Input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1"
        />
        <Button type="submit" size="sm" className="ml-2 bg-nursing-primary hover:bg-nursing-secondary">
          Post
        </Button>
      </form>
      
      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment) => {
            const commentAuthor = getUserById(comment.userId);
            const isCommentLiked = comment.likes.includes(user.id);
            const canDeleteComment = comment.userId === user.id || user.role === 'admin';
            
            return (
              <div key={comment.id} className="flex">
                <Link to={`/profile/${comment.userId}`}>
                  {commentAuthor?.avatar ? (
                    <Avatar className="h-8 w-8 mr-2">
                      <img src={commentAuthor.avatar} alt={commentAuthor.name} className="object-cover" />
                    </Avatar>
                  ) : (
                    <Avatar className="h-8 w-8 mr-2 bg-nursing-primary text-white">
                      <span>{commentAuthor?.name.charAt(0)}</span>
                    </Avatar>
                  )}
                </Link>
                <div className="flex-1">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="flex justify-between items-start">
                      <Link to={`/profile/${comment.userId}`} className="font-medium text-gray-900 text-sm">
                        {commentAuthor?.name}
                      </Link>
                      {canDeleteComment && (
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full"
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this comment?')) {
                                deleteComment(comment.id);
                              }
                            }}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-800 text-sm mt-1">{comment.content}</p>
                  </div>
                  <div className="flex items-center mt-1 text-xs text-gray-500 space-x-3">
                    <span>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                    <button
                      onClick={() => isCommentLiked ? unlikeComment(comment.id) : likeComment(comment.id)}
                      className={`flex items-center ${isCommentLiked ? 'text-nursing-primary' : ''} hover:text-nursing-primary`}
                    >
                      <Heart className={`h-3 w-3 mr-1 ${isCommentLiked ? 'fill-current' : ''}`} />
                      {comment.likes.length > 0 && (
                        <span>{comment.likes.length} {comment.likes.length === 1 ? 'like' : 'likes'}</span>
                      )}
                      {comment.likes.length === 0 && 'Like'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-2 text-gray-500 text-sm">
          No comments yet. Be the first to comment!
        </div>
      )}
    </div>
  );
};

export default CommentSection;
