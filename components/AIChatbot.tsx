import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Shakibul's AI Assistant. Ask me anything about his design process or experience.", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(userMsg.text);
    
    const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end text-base">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 w-[350px] h-[500px] rounded-xl shadow-2xl flex flex-col overflow-hidden mb-4 transition-colors duration-300"
          >
            {/* Header */}
            <div className="p-4 bg-gray-50 dark:bg-[#1a1a1a] flex justify-between items-center border-b border-black/5 dark:border-white/5 transition-colors">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-yellow-500 dark:text-yellow-400" />
                <span className="text-sm font-bold text-black dark:text-white">AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-800">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      msg.role === 'user' 
                        ? 'bg-black text-white dark:bg-white dark:text-black rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 dark:bg-[#222] dark:text-gray-200 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-[#222] p-3 rounded-lg rounded-bl-none flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-gray-500 dark:text-gray-400" />
                    <span className="text-xs text-gray-500">Thinking...</span>
                  </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-gray-50 dark:bg-[#1a1a1a] border-t border-black/5 dark:border-white/5 transition-colors">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about my work..."
                  className="w-full bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black text-white dark:bg-white dark:text-black rounded-full hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white dark:bg-white dark:text-black p-4 rounded-full shadow-lg hover:opacity-90 transition-all flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </motion.button>
    </div>
  );
};