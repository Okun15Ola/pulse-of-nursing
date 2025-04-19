
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { mockMessages, mockUsers } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { Message } from '../models/types';
import { formatDistanceToNow } from 'date-fns';
import { Send } from 'lucide-react';

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get unique users involved in conversations
  const getUniqueUsers = () => {
    if (!user) return [];
    
    const userIds = new Set<string>();
    
    messages.forEach(msg => {
      if (msg.senderId === user.id) {
        userIds.add(msg.receiverId);
      } else if (msg.receiverId === user.id) {
        userIds.add(msg.senderId);
      }
    });
    
    return Array.from(userIds)
      .map(id => mockUsers.find(u => u.id === id))
      .filter(Boolean);
  };
  
  const uniqueUsers = getUniqueUsers();
  
  // Set initial selected user if available
  useEffect(() => {
    if (uniqueUsers.length > 0 && !selectedUser) {
      setSelectedUser(uniqueUsers[0]?.id || null);
    }
  }, [uniqueUsers, selectedUser]);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedUser]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Filter messages for the selected conversation
  const getConversationMessages = () => {
    if (!user || !selectedUser) return [];
    
    return messages.filter(msg => 
      (msg.senderId === user.id && msg.receiverId === selectedUser) ||
      (msg.senderId === selectedUser && msg.receiverId === user.id)
    ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !selectedUser || !newMessage.trim()) return;
    
    const newMsg: Message = {
      id: `${messages.length + 1}`,
      senderId: user.id,
      receiverId: selectedUser,
      content: newMessage.trim(),
      read: false,
      createdAt: new Date(),
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };
  
  // Get unread message count for a user
  const getUnreadCount = (userId: string) => {
    if (!user) return 0;
    
    return messages.filter(msg => 
      msg.senderId === userId && 
      msg.receiverId === user.id && 
      !msg.read
    ).length;
  };
  
  const conversationMessages = getConversationMessages();
  const selectedUserData = mockUsers.find(u => u.id === selectedUser);
  
  if (!user) return null;
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>
      
      <div className="flex flex-col md:flex-row h-[calc(80vh-150px)] gap-4">
        {/* Contacts sidebar */}
        <Card className="md:w-1/3 lg:w-1/4 overflow-hidden flex flex-col">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="font-semibold">Conversations</h2>
          </div>
          <div className="overflow-y-auto flex-1">
            {uniqueUsers.length > 0 ? (
              uniqueUsers.map(contact => {
                if (!contact) return null;
                const unreadCount = getUnreadCount(contact.id);
                
                return (
                  <button
                    key={contact.id}
                    className={`w-full text-left p-4 flex items-center border-b hover:bg-gray-50 transition-colors ${
                      selectedUser === contact.id ? 'bg-nursing-light' : ''
                    }`}
                    onClick={() => setSelectedUser(contact.id)}
                  >
                    {contact.avatar ? (
                      <Avatar className="h-10 w-10">
                        <img src={contact.avatar} alt={contact.name} className="object-cover" />
                      </Avatar>
                    ) : (
                      <Avatar className="h-10 w-10 bg-nursing-primary text-white">
                        <span>{contact.name.charAt(0)}</span>
                      </Avatar>
                    )}
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{contact.name}</span>
                        {unreadCount > 0 && (
                          <span className="bg-nursing-primary text-white text-xs px-2 py-0.5 rounded-full">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {contact.specialty || 'Nurse'}
                      </p>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-gray-500">
                <p>No conversations yet.</p>
                <p className="text-sm mt-1">Start chatting with colleagues from the community page!</p>
              </div>
            )}
          </div>
        </Card>
        
        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              {/* Chat header */}
              <Card className="p-4 flex items-center bg-gray-50 border-b">
                {selectedUserData?.avatar ? (
                  <Avatar className="h-10 w-10">
                    <img src={selectedUserData.avatar} alt={selectedUserData.name} className="object-cover" />
                  </Avatar>
                ) : (
                  <Avatar className="h-10 w-10 bg-nursing-primary text-white">
                    <span>{selectedUserData?.name.charAt(0)}</span>
                  </Avatar>
                )}
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">{selectedUserData?.name}</h3>
                  <p className="text-xs text-gray-500">{selectedUserData?.specialty || 'Nurse'}</p>
                </div>
              </Card>
              
              {/* Messages */}
              <Card className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4">
                {conversationMessages.length > 0 ? (
                  conversationMessages.map(msg => {
                    const isOwnMessage = msg.senderId === user.id;
                    
                    return (
                      <div key={msg.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                        <div 
                          className={`max-w-[80%] rounded-lg p-3 ${
                            isOwnMessage 
                              ? 'bg-nursing-primary text-white rounded-tr-none' 
                              : 'bg-gray-100 rounded-tl-none'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex-1 flex items-center justify-center text-center text-gray-500">
                    <div>
                      <p>No messages yet.</p>
                      <p className="text-sm mt-1">Send a message to start the conversation!</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </Card>
              
              {/* Message input */}
              <Card className="p-3">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    className="bg-nursing-primary hover:bg-nursing-secondary"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </Card>
            </>
          ) : (
            <Card className="flex-1 flex items-center justify-center text-center text-gray-500 p-6">
              <div>
                <p>Select a conversation to start chatting</p>
                <p className="text-sm mt-1">
                  Or find new colleagues in the <a href="/community" className="text-nursing-primary hover:underline">Community</a> section
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
