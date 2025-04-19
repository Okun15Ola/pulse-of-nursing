
import React, { createContext, useState, useContext } from 'react';
import { Post, Comment } from '../models/types';
import { mockPosts, mockComments } from '../data/mockData';
import { useAuth } from './AuthContext';

interface PostContextType {
  posts: Post[];
  comments: Comment[];
  addPost: (content: string, images?: string[], video?: string, isJobPosting?: boolean) => void;
  deletePost: (postId: string) => void;
  likePost: (postId: string) => void;
  unlikePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  deleteComment: (commentId: string) => void;
  likeComment: (commentId: string) => void;
  unlikeComment: (commentId: string) => void;
  getPostComments: (postId: string) => Comment[];
  getUserPosts: (userId: string) => Post[];
  getFollowingPosts: () => Post[];
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [comments, setComments] = useState<Comment[]>(mockComments);

  const addPost = (content: string, images?: string[], video?: string, isJobPosting: boolean = false) => {
    if (!user) return;

    const newPost: Post = {
      id: `${posts.length + 1}`,
      userId: user.id,
      content,
      images,
      video,
      likes: [],
      commentsCount: 0,
      isAdminPost: user.role === 'admin',
      isJobPosting: isJobPosting && user.role === 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setPosts([newPost, ...posts]);
  };

  const deletePost = (postId: string) => {
    if (!user) return;
    
    setPosts(posts.filter(post => post.id !== postId));
    setComments(comments.filter(comment => comment.postId !== postId));
  };

  const likePost = (postId: string) => {
    if (!user) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId && !post.likes.includes(user.id)) {
        return { ...post, likes: [...post.likes, user.id] };
      }
      return post;
    }));
  };

  const unlikePost = (postId: string) => {
    if (!user) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes.filter(id => id !== user.id) };
      }
      return post;
    }));
  };

  const addComment = (postId: string, content: string) => {
    if (!user) return;
    
    const newComment: Comment = {
      id: `${comments.length + 1}`,
      postId,
      userId: user.id,
      content,
      likes: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setComments([...comments, newComment]);
    
    // Update comment count on the post
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, commentsCount: post.commentsCount + 1 };
      }
      return post;
    }));
  };

  const deleteComment = (commentId: string) => {
    if (!user) return;
    
    const comment = comments.find(c => c.id === commentId);
    if (!comment) return;

    setComments(comments.filter(c => c.id !== commentId));
    
    // Update comment count on the post
    setPosts(posts.map(post => {
      if (post.id === comment.postId) {
        return { ...post, commentsCount: post.commentsCount - 1 };
      }
      return post;
    }));
  };

  const likeComment = (commentId: string) => {
    if (!user) return;
    
    setComments(comments.map(comment => {
      if (comment.id === commentId && !comment.likes.includes(user.id)) {
        return { ...comment, likes: [...comment.likes, user.id] };
      }
      return comment;
    }));
  };

  const unlikeComment = (commentId: string) => {
    if (!user) return;
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes.filter(id => id !== user.id) };
      }
      return comment;
    }));
  };

  const getPostComments = (postId: string) => {
    return comments.filter(comment => comment.postId === postId);
  };

  const getUserPosts = (userId: string) => {
    return posts.filter(post => post.userId === userId);
  };

  const getFollowingPosts = () => {
    if (!user) return [];
    
    // Get posts from users the current user follows and the user's own posts
    return posts.filter(post => 
      post.userId === user.id || 
      user.following.includes(post.userId) ||
      post.isAdminPost
    );
  };

  return (
    <PostContext.Provider 
      value={{ 
        posts, 
        comments,
        addPost, 
        deletePost, 
        likePost, 
        unlikePost, 
        addComment, 
        deleteComment, 
        likeComment, 
        unlikeComment,
        getPostComments,
        getUserPosts,
        getFollowingPosts
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = (): PostContextType => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
};
