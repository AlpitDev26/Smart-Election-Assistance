"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Sparkles, ShieldCheck, RefreshCcw } from 'lucide-react';
import { electionApi } from '@/lib/api';

export default function ElectionAssistant() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hello! I am your Verified Election Intelligence Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (text) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMsg = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await electionApi.sendMessage(messageText);
      const botMsg = { 
        role: 'bot', 
        content: response.reply || response.data?.reply || "I've analyzed that request. How else can I assist?" 
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: "I'm having trouble connecting to the intelligence server. Please ensure the backend is running on Port 8080." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'white' }}>
      {/* Verified Header */}
      <div style={{ padding: '24px', background: '#0B3D91', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '14px' }}>
            <Bot size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', letterSpacing: '0.5px' }}>Election Bot</h3>
              <ShieldCheck size={14} color="#10b981" />
            </div>
            <p style={{ fontSize: '10px', color: '#93c5fd', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Intelligence Online</p>
          </div>
        </div>
        <Sparkles size={18} color="#93c5fd" className="animate-pulse" />
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}
        className="custom-scrollbar"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            style={{ 
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <div style={{ 
              padding: '16px 20px', 
              borderRadius: msg.role === 'user' ? '24px 24px 4px 24px' : '24px 24px 24px 4px',
              background: msg.role === 'user' ? '#0B3D91' : '#f8fafc',
              color: msg.role === 'user' ? 'white' : '#1e293b',
              boxShadow: msg.role === 'user' ? '0 10px 20px -5px rgba(11,61,145,0.3)' : '0 4px 6px rgba(0,0,0,0.02)',
              fontSize: '13px',
              lineHeight: '1.6',
              border: msg.role === 'bot' ? '1px solid #f1f5f9' : 'none'
            }}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ alignSelf: 'flex-start' }}>
            <div style={{ padding: '16px 20px', borderRadius: '24px', background: '#f8fafc', display: 'flex', gap: '4px' }}>
              <span className="dot-pulse" style={{ width: '4px', height: '4px', background: '#94a3b8', borderRadius: '50%' }} />
              <span className="dot-pulse" style={{ width: '4px', height: '4px', background: '#94a3b8', borderRadius: '50%', animationDelay: '0.2s' }} />
              <span className="dot-pulse" style={{ width: '4px', height: '4px', background: '#94a3b8', borderRadius: '50%', animationDelay: '0.4s' }} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Suggestion Chips */}
      <div style={{ padding: '0 24px', display: 'flex', gap: '8px', overflowX: 'auto', whiteSpace: 'nowrap' }} className="no-scrollbar">
        {['How to vote?', 'Check Voter ID', 'State Statistics'].map((chip) => (
          <button
            key={chip}
            onClick={() => handleSend(chip)}
            style={{ 
              padding: '8px 16px', 
              background: 'white', 
              border: '1px solid #e2e8f0', 
              borderRadius: '100px', 
              fontSize: '11px', 
              fontWeight: '700', 
              color: '#475569',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = '#0B3D91'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ padding: '24px' }}>
        <div style={{ 
          background: '#f8fafc', 
          borderRadius: '20px', 
          padding: '8px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          border: '1px solid #f1f5f9'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            style={{ 
              flex: 1, 
              background: 'transparent', 
              border: 'none', 
              padding: '12px 16px', 
              fontSize: '13px', 
              outline: 'none',
              color: '#1e293b'
            }}
          />
          <button
            onClick={() => handleSend()}
            style={{ 
              background: '#0B3D91', 
              color: 'white', 
              border: 'none', 
              padding: '12px', 
              borderRadius: '14px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .dot-pulse { animation: pulse 1.5s infinite ease-in-out; }
        @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
