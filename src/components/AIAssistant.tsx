import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Bot, X } from 'lucide-react';

// Helper function to format the response
const formatAiResponse = (response: string) => {
  return response
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\* (.*?)\*/g, '<li>$1</li>')
    .replace(/\n/g, '<br />')
    .replace(/(?:\r\n|\r|\n)/g, '<br />')
    .replace(/\n\n/g, '<br /><br />');
};

const AiAssistant = () => {
  const [open, setOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setLoading(true);
    setUserMessage('');

    try {
      const endpoint =
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAJC5ncK3jDkm2ypxonYKOEq4M5zZYpXfY';
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are a highly knowledgeable and empathetic AI assistant in a nurse community. 
Always answer questions professionally, with a focus on medical accuracy, clarity, and compassion.
Avoid giving non-medical advice unless asked explicitly. Ensure a warm, supportive tone in all replies.
User says: ${userMessage}`,
              },
            ],
          },
        ],
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      const result = await axios.post(endpoint, payload, { headers });

      const aiText = result.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      const formatted = formatAiResponse(aiText);

      if (!messages.some((m) => m.sender === 'ai' && m.text === formatted)) {
        setMessages((prev) => [...prev, { sender: 'ai', text: formatted }]);
      }
    } catch (err) {
      console.error('Error fetching AI response:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 sm:right-4 md:right-6 lg:right-8 sm:bottom-16 md:bottom-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
          title="Open AI Assistant"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {/* Chat Popup */}
      {open && (
        <div className="relative bg-white w-[90vw] max-w-md h-[500px] rounded-2xl shadow-2xl p-4 flex flex-col sm:w-[80vw] md:w-[70vw]">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-1">
            <Bot className="w-5 h-5" /> Nurse AI Assistant
          </h2>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto border border-gray-200 p-3 rounded-xl mb-3 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`text-sm max-w-[80%] px-4 py-2 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'ml-auto bg-blue-100 text-right'
                    : 'bg-gray-100'
                }`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ))}

            {loading && (
              <div className="text-sm bg-gray-100 px-4 py-2 rounded-2xl w-fit">
                NurseAI is typing...
              </div>
            )}

            {/* Auto-scroll target */}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;
