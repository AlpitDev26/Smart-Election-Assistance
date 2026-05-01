"use client";

import React, { useState, useEffect } from 'react';
import { electionApi } from '@/lib/api';

export default function EventFeed() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    electionApi.getEvents().then(res => {
      if (res.success) setEvents(res.data);
    });
  }, []);

  return (
    <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 ml-1">
      {events.map((event, i) => (
        <div key={i} className="relative pl-8 group">
          <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center z-10 transition-transform group-hover:scale-110">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
            <h4 className="text-sm font-bold text-slate-800 leading-tight mt-1">{event.title}</h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{event.description}</p>
          </div>
        </div>
      ))}
      {events.length === 0 && <p className="text-xs text-slate-400 italic text-center">No events found</p>}
    </div>
  );
}
