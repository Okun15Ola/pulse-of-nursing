
import React, { createContext, useState, useContext } from 'react';
import { AIAssistantMessage } from '../models/types';
import { mockAIAssistantMessages } from '../data/mockData';

interface AIAssistantContextType {
  messages: AIAssistantMessage[];
  isOpen: boolean;
  sendMessage: (content: string) => void;
  openAssistant: () => void;
  closeAssistant: () => void;
  clearConversation: () => void;
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined);

export const AIAssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<AIAssistantMessage[]>(mockAIAssistantMessages);
  const [isOpen, setIsOpen] = useState(false);

  const openAssistant = () => setIsOpen(true);
  const closeAssistant = () => setIsOpen(false);

  const clearConversation = () => {
    setMessages([]);
  };

  const sendMessage = (content: string) => {
    // Add user message
    const userMessage: AIAssistantMessage = {
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      const aiResponses: Record<string, string> = {
        default: "I'm your nursing assistant AI. I can provide information on nursing practices, continuing education, or answer questions about the platform. How can I assist you today?",
      };
      
      // Check for keywords and provide relevant responses
      let responseContent = aiResponses.default;
      
      if (content.toLowerCase().includes('burnout')) {
        responseContent = "Burnout is a serious issue in nursing. I recommend scheduling regular self-care activities, setting clear work-life boundaries, and connecting with supportive colleagues. Many hospitals also offer employee assistance programs that provide free counseling sessions.";
      } else if (content.toLowerCase().includes('education') || content.toLowerCase().includes('course')) {
        responseContent = "Continuing education is essential for nurses. Our 'Learn' section offers various courses on clinical skills, leadership, and specialty areas. Many of these courses offer CE credits that can be applied toward your license renewal.";
      } else if (content.toLowerCase().includes('job') || content.toLowerCase().includes('career')) {
        responseContent = "For job opportunities, check out the admin posts on the home feed marked as 'Job Posting'. You can also network with other nurses in the Community section who might know of openings at their facilities.";
      } else if (content.toLowerCase().includes('hello') || content.toLowerCase().includes('hi')) {
        responseContent = "Hello! I'm the Pulse of Nursing assistant. I can help answer questions about nursing practice, continuing education, or using this platform. What would you like to know about today?";
      }
      
      const assistantMessage: AIAssistantMessage = {
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };
      
      setMessages(currentMessages => [...currentMessages, assistantMessage]);
    }, 1000);
  };

  return (
    <AIAssistantContext.Provider 
      value={{ messages, isOpen, sendMessage, openAssistant, closeAssistant, clearConversation }}
    >
      {children}
    </AIAssistantContext.Provider>
  );
};

export const useAIAssistant = (): AIAssistantContextType => {
  const context = useContext(AIAssistantContext);
  if (context === undefined) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  return context;
};
