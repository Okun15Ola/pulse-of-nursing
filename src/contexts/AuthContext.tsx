
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole } from '../models/types';
import { mockUsers, currentUser as mockCurrentUser } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, name: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('pulseUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('pulseUser');
      }
    } else {
      // For demo purposes, auto-login with mock user
      setUser(mockCurrentUser);
      localStorage.setItem('pulseUser', JSON.stringify(mockCurrentUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('pulseUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pulseUser');
  };

  const register = async (email: string, name: string, password: string): Promise<boolean> => {
    // Check if email is already in use
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return false;
    }

    // In a real app, this would make an API call to create a user
    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      email,
      name,
      password, // In a real app, this would be hashed
      role: 'user' as UserRole,
      followers: [],
      following: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add to mock users and set as current user
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('pulseUser', JSON.stringify(newUser));
    return true;
  };

  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin,
    login,
    logout,
    register
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
