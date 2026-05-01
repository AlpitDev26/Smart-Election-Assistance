"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Building, Award, ShieldCheck, History, Users, Info } from 'lucide-react';
import { electionApi } from '@/lib/api';

export default function StatePanel({ stateName, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(false);

    const fetchData = async () => {
      try {
        const [statesRes, partiesRes, electionsRes] = await Promise.all([
          electionApi.getStates().catch(() => ({ data: [] })),
          electionApi.getPartiesByState(stateName).catch(() => ({ data: [] })),
          electionApi.getElections(stateName).catch(() => ({ data: [] }))
        ]);

        if (!isMounted) return;

        const details = statesRes.data?.find(s => s.stateName === stateName);
        
        setData({
          details: details || { stateName, currentCm: "Data Loading...", currentDeputyCm: "N/A" },
          parties: partiesRes.data || [],
          elections: electionsRes.data || []
        });
        setLoading(false);
      } catch (err) {
        console.error("Panel fetch error:", err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [stateName]);

  const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={16} />
      </div>
      <div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}</p>
        <p className="text-sm font-bold text-slate-800">{value || '0'}</p>
      </div>
    </div>
  );

  return (
    <motion.aside
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute top-0 right-0 h-full w-[480px] bg-white shadow-2xl z-[2000] border-l border-slate-200 flex flex-col"
    >
      <div className="p-6 bg-[#0B3D91] text-white flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-bold">{stateName}</h2>
          <p className="text-blue-200 text-sm opacity-80 uppercase tracking-widest font-semibold">National Profile</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 animate-pulse font-medium">Fetching State Intelligence...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="p-4 bg-red-50 rounded-full mb-4">
              <Info className="text-red-500" size={32} />
            </div>
            <h4 className="text-slate-800 font-bold mb-2">Connection Issues</h4>
            <p className="text-slate-500 text-sm mb-6">We couldn't reach the backend server. Please make sure the Spring Boot app is running.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <>
            <section>
              <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="text-blue-600" size={18} />
                Constituency Breakdown
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <StatCard label="Lok Sabha" value={data.details?.lokSabhaSeats} icon={Building} color="bg-orange-100 text-orange-600" />
                <StatCard label="Vidhan Sabha" value={data.details?.vidhanSabhaSeats} icon={Award} color="bg-blue-100 text-blue-600" />
                <StatCard label="Rajya Sabha" value={data.details?.rajyaSabhaSeats} icon={MapPin} color="bg-green-100 text-green-600" />
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
                <Users className="text-blue-600" size={18} />
                Leadership & Governance
              </h3>
              
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Chief Minister</p>
                      <p className="font-bold text-slate-800">{data.details?.currentCm || 'N/A'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Deputy CM</p>
                      <p className="font-bold text-slate-800 text-sm">{data.details?.currentDeputyCm || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 opacity-80">
                  <div className="flex justify-between items-center grayscale-[50%]">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Former CM</p>
                      <p className="font-semibold text-slate-600">{data.details?.previousCm || 'N/A'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Former Deputy CM</p>
                      <p className="font-semibold text-slate-600 text-xs">{data.details?.previousDeputyCm || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
                <Users className="text-blue-600" size={18} />
                Political Parties
              </h3>
              {data.parties.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {data.parties.map((party, i) => (
                    <div key={i} className="p-3 border border-slate-100 rounded-xl bg-white shadow-sm flex justify-between items-center group hover:border-blue-200 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center font-bold text-blue-600 text-xs">
                          {party.symbol.substring(0, 1)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{party.name}</p>
                          <p className="text-[10px] text-slate-400">Leader: {party.leader}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase">{party.influence}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 border-2 border-dashed border-slate-100 rounded-2xl text-center">
                  <p className="text-slate-400 text-xs italic">Regional party data coming soon...</p>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </motion.aside>
  );
}
