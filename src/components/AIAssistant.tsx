
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAIAssistant } from '../contexts/AIAssistantContext';

const AIAssistant: React.FC = () => {
  const { messages, isOpen, sendMessage, closeAssistant, clearConversation } = useAIAssistant();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      sendMessage(inputValue);
      setInputValue('');
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-4 right-4 w-80 sm:w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 flex flex-col max-h-[80vh] scale-in-center">
      <div className="flex items-center justify-between p-4 bg-nursing-primary text-white rounded-t-lg">
        <h3 className="text-lg font-semibold">Nurse Assistant</h3>
        <div className="flex">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-nursing-secondary rounded-full p-2 h-8 w-8"
            onClick={clearConversation}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-nursing-secondary rounded-full p-2 h-8 w-8 ml-1"
            onClick={closeAssistant}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3" style={{ maxHeight: '300px' }}>
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p>Ask me anything about nursing practices, education, or using this platform!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  max-w-[80%] rounded-lg p-3 
                  ${message.role === 'user' 
                    ? 'bg-nursing-primary text-white rounded-tr-none' 
                    : 'bg-white border border-gray-200 rounded-tl-none'}
                `}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs text-right mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <Separator />
      
      <form onSubmit={handleSubmit} className="p-3 flex items-center gap-2">
        <Input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1"
        />
        <Button type="submit" size="sm" className="bg-nursing-primary hover:bg-nursing-secondary">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default AIAssistant;
