"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';
import { electionApi } from '@/lib/api';

export default function ElectionAssistant({ onClose }) {
  const [messages, setMessages] = useState([
    { text: "Jai Hind! I'm your Smart Election Assistant. How can I help you understand the voting process today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await electionApi.sendMessage(text);
      if (res.success) {
        setMessages(prev => [...prev, { text: res.data.response, sender: 'bot' }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { text: "I'm having some trouble connecting right now. Please try again later.", sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      className="absolute top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-30 flex flex-col border-l border-slate-200"
    >
      <div className="p-6 bg-gradient-to-br from-[#0B3D91] to-blue-800 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Sparkles size={20} className="text-blue-200" />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">Election Bot</h2>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-blue-200">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Online Assistant
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                msg.sender === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
              }`}>
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-3 rounded-2xl text-sm ${
                msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-slate-100 text-slate-800 rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none animate-pulse text-slate-400 text-xs font-medium">
               Bot is thinking...
             </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-4 border-t border-slate-100 space-y-3">
        <div className="flex flex-wrap gap-2">
          {['How to vote?', 'Required IDs?', 'Polling Booth?'].map(q => (
            <button 
              key={q} 
              onClick={() => handleSend(q)}
              className="text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-200 px-2 py-1 rounded-md hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
        <div className="flex gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <input 
            type="text" 
            placeholder="Type your question..." 
            className="flex-1 bg-transparent border-none outline-none text-sm px-2 text-slate-800 placeholder:text-slate-400"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
