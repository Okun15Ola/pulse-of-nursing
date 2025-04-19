
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string; // Note: This would be hashed in a real application
  role: UserRole;
  bio?: string;
  avatar?: string;
  specialty?: string;
  location?: string;
  yearsOfExperience?: number;
  followers: string[]; // Array of user IDs who follow this user
  following: string[]; // Array of user IDs this user follows
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  images?: string[];
  video?: string;
  likes: string[]; // Array of user IDs who liked this post
  commentsCount: number;
  isAdminPost: boolean;
  isJobPosting: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  likes: string[]; // Array of user IDs who liked this comment
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

export interface AIAssistantMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
