
import { User, Post, Comment, Message, AIAssistantMessage } from '../models/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'sarah.johnson@example.com',
    name: 'Sarah Johnson',
    password: 'hashed_password', // In a real app, this would be properly hashed
    role: 'admin',
    bio: 'Lead nurse practitioner with 15 years of experience in emergency medicine.',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=187&auto=format&fit=crop',
    specialty: 'Emergency Medicine',
    location: 'Boston, MA',
    yearsOfExperience: 15,
    followers: ['2', '3', '4'],
    following: ['2', '5'],
    createdAt: new Date('2022-01-15'),
    updatedAt: new Date('2022-01-15'),
  },
  {
    id: '2',
    email: 'michael.chen@example.com',
    name: 'Michael Chen',
    password: 'hashed_password',
    role: 'user',
    bio: 'Pediatric nurse with a passion for patient education.',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
    specialty: 'Pediatrics',
    location: 'San Francisco, CA',
    yearsOfExperience: 8,
    followers: ['1', '3'],
    following: ['1', '3', '4'],
    createdAt: new Date('2022-02-10'),
    updatedAt: new Date('2022-02-10'),
  },
  {
    id: '3',
    email: 'lisa.rodriguez@example.com',
    name: 'Lisa Rodriguez',
    password: 'hashed_password',
    role: 'user',
    bio: 'Cardiac nurse specialized in post-surgical care.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
    specialty: 'Cardiac Care',
    location: 'Chicago, IL',
    yearsOfExperience: 10,
    followers: ['1', '2', '5'],
    following: ['1', '2', '5'],
    createdAt: new Date('2022-01-20'),
    updatedAt: new Date('2022-01-20'),
  },
  {
    id: '4',
    email: 'james.wilson@example.com',
    name: 'James Wilson',
    password: 'hashed_password',
    role: 'user',
    bio: 'ICU nurse with focus on respiratory care.',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop',
    specialty: 'Intensive Care',
    location: 'Seattle, WA',
    yearsOfExperience: 12,
    followers: ['2'],
    following: ['1'],
    createdAt: new Date('2022-03-05'),
    updatedAt: new Date('2022-03-05'),
  },
  {
    id: '5',
    email: 'emily.patel@example.com',
    name: 'Emily Patel',
    password: 'hashed_password',
    role: 'user',
    bio: 'Oncology nurse dedicated to compassionate care.',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
    specialty: 'Oncology',
    location: 'Austin, TX',
    yearsOfExperience: 6,
    followers: ['3'],
    following: ['3'],
    createdAt: new Date('2022-02-25'),
    updatedAt: new Date('2022-02-25'),
  },
];

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1', // Sarah Johnson (admin)
    content: 'Important Update: Our hospital is hosting a career fair next month. Great opportunity for new graduates! #NursingCareers',
    images: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop'],
    likes: ['2', '3', '4', '5'],
    commentsCount: 3,
    isAdminPost: true,
    isJobPosting: true,
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2023-04-10'),
  },
  {
    id: '2',
    userId: '2', // Michael Chen
    content: 'Just finished my certification in pediatric advanced life support. Always learning! #NursingEducation #PALS',
    likes: ['1', '3', '5'],
    commentsCount: 2,
    isAdminPost: false,
    isJobPosting: false,
    createdAt: new Date('2023-04-09'),
    updatedAt: new Date('2023-04-09'),
  },
  {
    id: '3',
    userId: '3', // Lisa Rodriguez
    content: 'Reflecting on a challenging but rewarding shift today. So grateful for my amazing team. #NursingLife',
    images: ['https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1780&auto=format&fit=crop'],
    likes: ['1', '2', '4'],
    commentsCount: 1,
    isAdminPost: false,
    isJobPosting: false,
    createdAt: new Date('2023-04-08'),
    updatedAt: new Date('2023-04-08'),
  },
  {
    id: '4',
    userId: '1', // Sarah Johnson (admin)
    content: 'Job Opportunity: We\'re looking for experienced cardiac care nurses to join our team at Boston Memorial. Apply through the link below!',
    likes: ['2', '3', '5'],
    commentsCount: 4,
    isAdminPost: true,
    isJobPosting: true,
    createdAt: new Date('2023-04-07'),
    updatedAt: new Date('2023-04-07'),
  },
  {
    id: '5',
    userId: '4', // James Wilson
    content: 'Attended an amazing conference on respiratory care innovations. Sharing my notes and key takeaways in the comments.',
    likes: ['1', '3'],
    commentsCount: 2,
    isAdminPost: false,
    isJobPosting: false,
    createdAt: new Date('2023-04-06'),
    updatedAt: new Date('2023-04-06'),
  },
  {
    id: '6',
    userId: '5', // Emily Patel
    content: 'Looking for recommendations on comfortable shoes for 12-hour shifts. My feet are begging for help! #NursingLife',
    likes: ['1', '2', '3', '4'],
    commentsCount: 5,
    isAdminPost: false,
    isJobPosting: false,
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2023-04-05'),
  },
];

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: '1',
    postId: '1', // Sarah's career fair post
    userId: '3', // Lisa Rodriguez
    content: 'Will there be opportunities for experienced nurses looking to switch specialties?',
    likes: ['1', '4'],
    createdAt: new Date('2023-04-10T12:30:00'),
    updatedAt: new Date('2023-04-10T12:30:00'),
  },
  {
    id: '2',
    postId: '1', // Sarah's career fair post
    userId: '1', // Sarah Johnson (reply)
    content: '@Lisa Yes, absolutely! We\'ll have representatives from all departments.',
    likes: ['3'],
    createdAt: new Date('2023-04-10T13:15:00'),
    updatedAt: new Date('2023-04-10T13:15:00'),
  },
  {
    id: '3',
    postId: '2', // Michael's certification post
    userId: '5', // Emily Patel
    content: 'Congratulations! I\'ve been thinking about getting this certification too.',
    likes: ['2'],
    createdAt: new Date('2023-04-09T14:20:00'),
    updatedAt: new Date('2023-04-09T14:20:00'),
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '2', // Michael Chen
    receiverId: '1', // Sarah Johnson
    content: 'Hi Sarah, do you have a moment to discuss the upcoming career fair?',
    read: true,
    createdAt: new Date('2023-04-09T09:30:00'),
  },
  {
    id: '2',
    senderId: '1', // Sarah Johnson
    receiverId: '2', // Michael Chen
    content: 'Of course, Michael! What would you like to know?',
    read: true,
    createdAt: new Date('2023-04-09T09:35:00'),
  },
  {
    id: '3',
    senderId: '2', // Michael Chen
    receiverId: '1', // Sarah Johnson
    content: 'I\'m interested in helping with the pediatric nursing booth. Is that still available?',
    read: true,
    createdAt: new Date('2023-04-09T09:40:00'),
  },
  {
    id: '4',
    senderId: '3', // Lisa Rodriguez
    receiverId: '1', // Sarah Johnson
    content: 'Sarah, I saw your post about the career fair. I\'d like to volunteer!',
    read: false,
    createdAt: new Date('2023-04-10T10:15:00'),
  },
];

// Mock AI Assistant Messages
export const mockAIAssistantMessages: AIAssistantMessage[] = [
  {
    role: 'user',
    content: 'What are the best practices for preventing nurse burnout?',
    timestamp: new Date('2023-04-09T15:30:00'),
  },
  {
    role: 'assistant',
    content: 'Great question! Preventing nurse burnout involves several strategies:\n\n1. Self-care routines: Prioritize sleep, nutrition, and exercise\n2. Boundaries: Establish clear work-life boundaries\n3. Support network: Connect with colleagues who understand your challenges\n4. Mindfulness practices: Even brief meditation can help manage stress\n5. Regular breaks: Take your entitled breaks during shifts\n6. Seek help: Use employee assistance programs when needed\n\nWould you like more specific information about any of these areas?',
    timestamp: new Date('2023-04-09T15:31:00'),
  },
];

// Current logged-in user (for UI purposes)
export const currentUser = mockUsers[0]; // Sarah Johnson (admin)
