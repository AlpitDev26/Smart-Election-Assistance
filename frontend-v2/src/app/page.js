"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Map as MapIcon, 
  TrendingUp, 
  Newspaper,
  Bell,
  Globe,
  Database,
  Users
} from 'lucide-react';
import dynamic from 'next/dynamic';
import StatePanel from '@/components/StatePanel';
import ElectionAssistant from '@/components/ElectionAssistant';
import EventFeed from '@/components/EventFeed';

const IndiaMap = dynamic(() => import('@/components/IndiaMap'), { 
  ssr: false,
  loading: () => <div style={{width:'100%', height:'100%', background:'#f1f5f9', borderRadius:'24px', display:'flex', alignItems:'center', justifyContent:'center'}}>Loading Map...</div>
});

export default function Home() {
  const [selectedState, setSelectedState] = useState(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <div className="app-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{padding: '32px 32px 24px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px'}}>
            <div style={{padding:'8px', background:'#0B3D91', borderRadius:'12px'}}>
              <TrendingUp color="white" size={20} />
            </div>
            <h1 style={{fontSize:'20px', fontWeight:'700', letterSpacing:'-0.5px'}}>Smart Election</h1>
          </div>
          <p style={{fontSize:'10px', color:'#94a3b8', fontWeight:'700', textTransform:'uppercase', letterSpacing:'2px'}}>ECI Intelligence Hub</p>
        </div>

        <div className="scroll-area custom-scrollbar">
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px', padding:'0 8px'}}>
            <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
              <Newspaper size={18} color="#0B3D91" />
              <h2 style={{fontSize:'11px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'1px'}}>Live Updates</h2>
            </div>
            <div style={{background:'#fef2f2', padding:'4px 10px', borderRadius:'20px', display:'flex', alignItems:'center', gap:'6px'}}>
              <div style={{width:'6px', height:'6px', background:'#ef4444', borderRadius:'50%'}} />
              <span style={{fontSize:'9px', fontWeight:'700', color:'#ef4444', textTransform:'uppercase'}}>Live</span>
            </div>
          </div>
          
          <EventFeed />
          
          <div style={{marginTop:'40px', padding:'20px', background:'#eff6ff', borderRadius:'24px', border:'1px solid #dbeafe'}}>
            <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px'}}>
              <Globe size={14} color="#2563eb" />
              <p style={{fontSize:'10px', fontWeight:'700', color:'#1e40af', textTransform:'uppercase'}}>Official Source</p>
            </div>
            <p style={{fontSize:'11px', color:'#1e40af', opacity:0.8, lineHeight:1.6}}>
              Data synchronized with Election Commission of India National Data Warehouse.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-header">
          <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
            <div style={{background:'white', padding:'10px 20px', borderRadius:'16px', border:'1px solid #e2e8f0', display:'flex', alignItems:'center', gap:'10px', boxShadow:'0 2px 4px rgba(0,0,0,0.02)'}}>
              <MapIcon size={18} color="#0B3D91" />
              <span style={{fontSize:'14px', fontWeight:'700'}}>National Interactive Explorer</span>
            </div>
          </div>

          <div style={{display:'flex', alignItems:'center', gap:'24px'}}>
             <div style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'12px', fontWeight:'700', color:'#94a3b8'}}>
                <div style={{width:'8px', height:'8px', background:'#22c55e', borderRadius:'50%'}} />
                SERVER ONLINE
             </div>
             <button onClick={() => setIsAssistantOpen(true)} className="btn-primary">
                <MessageSquare size={18} />
                Ask Election Bot
              </button>
          </div>
        </header>

        <div className="glass-card-container">
          <div className="map-viewport">
            <IndiaMap 
              onStateSelect={(name) => {setSelectedState(name); setIsAssistantOpen(false);}} 
              selectedState={selectedState} 
            />
          </div>

          <div className="stats-ribbon">
             <div className="stat-card">
                <p style={{fontSize:'10px', color:'#94a3b8', fontWeight:'700', textTransform:'uppercase', marginBottom:'4px'}}>Lok Sabha Seats</p>
                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <span style={{fontSize:'24px', fontWeight:'700'}}>543</span>
                  <Database size={16} color="#3b82f6" opacity={0.5} />
                </div>
             </div>
             <div className="stat-card">
                <p style={{fontSize:'10px', color:'#94a3b8', fontWeight:'700', textTransform:'uppercase', marginBottom:'4px'}}>Vidhan Sabha Seats</p>
                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <span style={{fontSize:'24px', fontWeight:'700'}}>4,123</span>
                  <Users size={16} color="#f97316" opacity={0.5} />
                </div>
             </div>
             <div className="stat-card">
                <p style={{fontSize:'10px', color:'#94a3b8', fontWeight:'700', textTransform:'uppercase', marginBottom:'4px'}}>Total Electorate</p>
                <span style={{fontSize:'24px', fontWeight:'700'}}>96.8 Cr</span>
             </div>
             <div className="stat-card">
                <p style={{fontSize:'10px', color:'#94a3b8', fontWeight:'700', textTransform:'uppercase', marginBottom:'4px'}}>Polling Stations</p>
                <span style={{fontSize:'24px', fontWeight:'700'}}>12.5 L</span>
             </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedState && (
            <StatePanel 
              key={selectedState}
              stateName={selectedState} 
              onClose={() => setSelectedState(null)} 
            />
          )}
          {isAssistantOpen && (
            <ElectionAssistant 
              key="assistant"
              onClose={() => setIsAssistantOpen(false)} 
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
