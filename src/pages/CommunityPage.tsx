
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import UserCard from '../components/UserCard';
import { mockUsers } from '../data/mockData';
import { searchUsers, getSuggestedUsers } from '../services/userService';
import { User } from '../models/types';
import { Search } from 'lucide-react';

const CommunityPage: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');
  
  useEffect(() => {
    if (user) {
      const suggested = getSuggestedUsers(user.id, 6);
      setSuggestedUsers(suggested);
    }
  }, [user]);
  
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // In a real app, this would be debounced
      const results = searchUsers(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      const results = searchUsers(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    }
  };
  
  const refreshSuggestions = () => {
    if (user) {
      const newSuggestions = getSuggestedUsers(user.id, 6);
      setSuggestedUsers(newSuggestions);
    }
  };
  
  if (!user) return null;

  // Get the users that the current user is following
  const following = mockUsers.filter(u => user.following.includes(u.id));
  
  // Get the users following the current user
  const followers = mockUsers.filter(u => user.id !== u.id && u.following.includes(user.id));
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Nursing Community</h1>
          <p className="text-gray-600">Connect with other nursing professionals</p>
        </div>
        
        <form onSubmit={handleSearch} className="mt-4 md:mt-0 max-w-md w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by name, specialty, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-16"
            />
            <Button 
              type="submit" 
              className="absolute right-1 top-1 bottom-1 bg-nursing-primary hover:bg-nursing-secondary"
              disabled={isSearching || !searchQuery.trim()}
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </form>
      </div>
      
      {searchQuery.trim() && (
        <Card className="mb-8 p-6">
          <h2 className="text-lg font-semibold mb-4">Search Results</h2>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map(user => (
                <UserCard key={user.id} user={user} onFollowChange={refreshSuggestions} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No users found matching your search criteria.</p>
          )}
        </Card>
      )}
      
      <Tabs defaultValue="discover" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="following">Following ({following.length})</TabsTrigger>
          <TabsTrigger value="followers">Followers ({followers.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="discover">
          <h2 className="text-lg font-semibold mb-4">Suggested Connections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedUsers.length > 0 ? (
              suggestedUsers.map(suggestedUser => (
                <UserCard key={suggestedUser.id} user={suggestedUser} onFollowChange={refreshSuggestions} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center py-4">
                No suggested users at this time. Check back later!
              </p>
            )}
          </div>
          
          {suggestedUsers.length > 0 && (
            <div className="mt-4 text-center">
              <Button variant="outline" onClick={refreshSuggestions}>
                Show More Suggestions
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="following">
          <h2 className="text-lg font-semibold mb-4">People You Follow</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {following.length > 0 ? (
              following.map(followedUser => (
                <UserCard key={followedUser.id} user={followedUser} onFollowChange={refreshSuggestions} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center py-4">
                You're not following anyone yet. Discover and connect with other nurses!
              </p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="followers">
          <h2 className="text-lg font-semibold mb-4">Your Followers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {followers.length > 0 ? (
              followers.map(follower => (
                <UserCard key={follower.id} user={follower} onFollowChange={refreshSuggestions} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center py-4">
                You don't have any followers yet. Keep engaging with the community!
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityPage;
