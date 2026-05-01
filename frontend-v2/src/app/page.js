"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Map as MapIcon, 
  TrendingUp, 
  ChevronRight,
  Info
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { electionApi } from '@/lib/api';
import StatePanel from '@/components/StatePanel';
import ElectionAssistant from '@/components/ElectionAssistant';
import EventFeed from '@/components/EventFeed';

// Dynamic import for Leaflet to avoid SSR issues
const IndiaMap = dynamic(() => import('@/components/IndiaMap'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-100 animate-pulse rounded-xl" />
});

export default function Home() {
  const [selectedState, setSelectedState] = useState(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const handleStateSelect = (stateName) => {
    setSelectedState(stateName);
    setIsAssistantOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      {/* Sidebar - National Overview */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col shadow-sm z-10">
        <div className="p-6 border-bottom bg-[#0B3D91] text-white">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <TrendingUp className="text-blue-200" />
            Smart Election
          </h1>
          <p className="text-xs text-blue-100 mt-1 opacity-80">Election Commission of India</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <section>
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">
              National Timeline
            </h2>
            <EventFeed />
          </section>

          <section>
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">
              Major National Parties
            </h2>
            <div className="space-y-2">
              {['BJP', 'INC', 'AAP', 'BSP'].map(party => (
                <div key={party} className="p-3 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between group hover:border-blue-200 transition-colors cursor-default">
                  <span className="font-medium text-slate-700">{party}</span>
                  <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </aside>

      {/* Main Content - Map View */}
      <main className="flex-1 relative flex flex-col bg-[#f8fafc]">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <MapIcon size={16} className="text-blue-600" />
              Interactive India Explorer
            </span>
            <p className="text-xs text-slate-400 font-medium">Click on any state to view details</p>
          </div>
          <div className="flex items-center gap-3">
             <button 
                onClick={() => setIsAssistantOpen(true)}
                className="btn-primary flex items-center gap-2 text-sm"
              >
                <MessageSquare size={18} />
                Ask AI Assistant
              </button>
          </div>
        </header>

        {/* Map View Wrapper */}
        <div className="flex-1 p-8 relative overflow-hidden">
          <div className="w-full h-full glass-card overflow-hidden relative shadow-xl">
            <IndiaMap 
              onStateSelect={handleStateSelect} 
              selectedState={selectedState} 
            />
          </div>
        </div>

        {/* Sliding Side Panels */}
        <AnimatePresence>
          {selectedState && (
            <StatePanel 
              stateName={selectedState} 
              onClose={() => setSelectedState(null)} 
            />
          )}
          {isAssistantOpen && (
            <ElectionAssistant 
              onClose={() => setIsAssistantOpen(false)} 
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
