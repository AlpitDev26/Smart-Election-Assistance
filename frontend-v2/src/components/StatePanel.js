"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Landmark, Users, TrendingUp, Award, Building2, ShieldCheck, AlertCircle } from 'lucide-react';
import { electionApi } from '@/lib/api';

export default function StatePanel({ stateName, onClose }) {
  const [data, setData] = useState({ details: null, parties: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const fetchData = async () => {
      try {
        // Map legacy GeoJSON names to modern Database names
        const nameMap = {
          'Orissa': 'Odisha',
          'Uttaranchal': 'Uttarakhand',
          'NCT of Delhi': 'Delhi'
        };
        const normalizedName = nameMap[stateName] || stateName;

        const [statesRes, partiesRes] = await Promise.all([
          electionApi.getStates().catch(() => []),
          electionApi.getPartiesByState(normalizedName).catch(() => [])
        ]);
        
        const details = Array.isArray(statesRes) ? statesRes.find(s => s.stateName.toLowerCase() === normalizedName.toLowerCase()) : null;
        setData({
          details: details || { stateName, currentCm: "Data Pending (ECI Sync)", currentDeputyCm: "Pending", lokSabhaSeats: "-", vidhanSabhaSeats: "-" },
          parties: Array.isArray(partiesRes) ? partiesRes : []
        });
        setLoading(false);
      } catch (err) {
        console.error("State Data Fetch Error:", err);
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [stateName]);

  const StatTile = ({ label, value, icon: Icon, color }) => (
    <div style={{ 
      background: '#ffffff', 
      padding: '24px', 
      borderRadius: '28px', 
      border: '1px solid #f1f5f9', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={20} color="white" />
      </div>
      <div>
        <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</p>
        <p style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b' }}>{value ?? '0'}</p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      style={{ 
        position: 'absolute', 
        top: 0, 
        right: 0, 
        height: '100%', 
        width: '460px', 
        background: 'white', 
        boxShadow: '-20px 0 60px rgba(0,0,0,0.08)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid #f1f5f9'
      }}
    >
      <div style={{ padding: '40px 40px 30px', borderBottom: '1px solid #f8fafc' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div style={{ padding: '12px', background: '#eff6ff', borderRadius: '16px' }}>
            <Landmark size={24} color="#0B3D91" />
          </div>
          <button onClick={onClose} style={{ background: '#f8fafc', border: 'none', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}>
            <X size={20} color="#64748b" />
          </button>
        </div>
        <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', letterSpacing: '-1px' }}>{stateName}</h2>
        <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '3px', marginTop: '4px' }}>Political Intelligence Report</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 40px 40px' }} className="custom-scrollbar">
        {loading ? (
          <div style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <div style={{ width: '32px', height: '32px', border: '3px solid #0B3D91', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Analyzing State Data...</p>
          </div>
        ) : error ? (
          <div style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', textAlign: 'center' }}>
            <AlertCircle size={40} color="#ef4444" />
            <div>
              <p style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b' }}>Connection Offline</p>
              <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Unable to fetch intelligence from national server.</p>
            </div>
            <button onClick={() => window.location.reload()} style={{ background: '#0B3D91', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>Retry Sync</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '30px' }}>
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <ShieldCheck size={16} color="#0B3D91" />
                <h3 style={{ fontSize: '11px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>Constituency Matrix</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <StatTile label="Lok Sabha" value={data.details?.lokSabhaSeats} icon={Building2} color="#0B3D91" />
                <StatTile label="Vidhan Sabha" value={data.details?.vidhanSabhaSeats} icon={Award} color="#f97316" />
              </div>
            </section>

            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <Users size={16} color="#0B3D91" />
                <h3 style={{ fontSize: '11px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Leadership</h3>
              </div>
              <div style={{ 
                background: 'linear-gradient(135deg, #0B3D91 0%, #1e40af 100%)', 
                padding: '32px', 
                borderRadius: '32px', 
                color: 'white',
                boxShadow: '0 20px 40px -10px rgba(11,61,145,0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
                  <TrendingUp size={160} color="white" />
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p style={{ fontSize: '10px', fontWeight: '700', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Chief Minister</p>
                  <h4 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>{data.details?.currentCm || 'Data Pending'}</h4>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '20px' }} />
                  <p style={{ fontSize: '10px', fontWeight: '700', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Deputy Leadership</p>
                  <p style={{ fontSize: '14px', fontWeight: '600' }}>{data.details?.currentDeputyCm || 'N/A'}</p>
                </div>
              </div>
            </section>

            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <TrendingUp size={16} color="#0B3D91" />
                <h3 style={{ fontSize: '11px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>Regional Influence</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {data.parties?.length > 0 ? data.parties.map((party, i) => (
                  <div key={i} style={{ padding: '20px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: '#0B3D91', border: '1px solid #e2e8f0' }}>
                        {party.symbol?.substring(0, 1) || 'P'}
                      </div>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{party.name}</p>
                        <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>Leader: {party.leader}</p>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div style={{ padding: '20px', textAlign: 'center', border: '2px dashed #f1f5f9', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase' }}>No Regional Parties Mapped</p>
                    <p style={{ fontSize: '9px', color: '#cbd5e1' }}>Data sync pending with ECI database.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </motion.div>
  );
}
