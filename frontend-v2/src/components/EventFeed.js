"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Radio, ChevronRight, Clock, ShieldCheck } from 'lucide-react';
import { electionApi } from '@/lib/api';

export default function EventFeed() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    electionApi.getEvents()
      .then(res => {
        setEvents(Array.isArray(res) ? res : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getTagColor = (type) => {
    switch(type) {
      case 'Live': return { bg: '#fef2f2', text: '#ef4444' };
      case 'Urgent': return { bg: '#fff7ed', text: '#f97316' };
      case 'Update': return { bg: '#f0f9ff', text: '#0ea5e9' };
      default: return { bg: '#f8fafc', text: '#64748b' };
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ height: '100px', background: '#f8fafc', borderRadius: '24px', animation: 'pulse 2s infinite' }} />
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {events.map((event, index) => {
        const colors = getTagColor(event.eventType);
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => event.url && window.open(event.url, '_blank')}
            style={{ 
              padding: '20px', 
              background: 'white', 
              borderRadius: '24px', 
              border: '1px solid #f1f5f9', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
              cursor: event.url ? 'pointer' : 'default',
              transition: 'all 0.3s ease',
              overflow: 'hidden'
            }}
            className="news-card"
            onMouseOver={(e) => { 
              if (event.url) {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }
            }}
            onMouseOut={(e) => { 
              if (event.url) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)';
                e.currentTarget.style.borderColor = '#f1f5f9';
              }
            }}
          >
            {event.image && (
              <div style={{ width: '100%', height: '120px', marginBottom: '16px', borderRadius: '16px', overflow: 'hidden' }}>
                <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ 
                background: colors.bg, 
                color: colors.text, 
                padding: '4px 10px', 
                borderRadius: '8px', 
                fontSize: '10px', 
                fontWeight: '800', 
                textTransform: 'uppercase', 
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {event.eventType === 'Live' && <Radio size={10} className="animate-pulse" />}
                {event.eventType}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', fontSize: '10px', fontWeight: '600' }}>
                <Clock size={12} />
                {new Date(event.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              </div>
            </div>
            
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', marginBottom: '8px', lineHeight: '1.4' }}>
              {event.title}
            </h3>
            <p style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {event.description}
            </p>
          </motion.div>
        );
      })}

      <div style={{ padding: '20px', textAlign: 'center' }}>
         <p style={{ fontSize: '10px', fontWeight: '800', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Updates Verified
         </p>
      </div>
    </div>
  );
}
