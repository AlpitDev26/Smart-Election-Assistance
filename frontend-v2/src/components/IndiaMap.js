"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fixing Leaflet default icon issues in React
const fixLeafletIcon = () => {
  if (typeof window === 'undefined') return;
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

export default function IndiaMap({ onStateSelect, selectedState }) {
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fixLeafletIcon();
    
    // FETCHING HIGH-DEFINITION NATIONAL GEOJSON
    // This source contains official state boundaries of India
    fetch("https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson")
      .then(res => res.json())
      .then(data => {
        setGeoData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load official map, using secondary source:", err);
        // Fallback source if primary is down
        fetch("https://raw.githubusercontent.com/HindustanTimesLabs/shapefiles/master/india/states/india_states.json")
          .then(res => res.json())
          .then(data => {
            setGeoData(data);
            setLoading(false);
          });
      });
  }, []);

  const onEachState = (state, layer) => {
    // Handling different naming conventions in various GeoJSON sources
    const stateName = state.properties.NAME_1 || state.properties.ST_NM || state.properties.st_nm;
    
    layer.on({
      mouseover: (e) => {
        const l = e.target;
        l.setStyle({
          weight: 2,
          color: '#0B3D91',
          fillOpacity: 0.8,
        });
      },
      mouseout: (e) => {
        const l = e.target;
        l.setStyle({
          weight: 1,
          color: '#fff',
          fillOpacity: selectedState === stateName ? 0.7 : 0.3,
        });
      },
      click: () => {
        onStateSelect(stateName);
      },
    });

    // Optional: Add tooltip with State Name
    layer.bindTooltip(stateName, { sticky: true, className: 'state-tooltip' });
  };

  const stateStyle = (feature) => {
    const stateName = feature.properties.NAME_1 || feature.properties.ST_NM || feature.properties.st_nm;
    const isActive = selectedState === stateName;
    return {
      fillColor: isActive ? '#0B3D91' : '#3b82f6',
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: isActive ? 0.7 : 0.3,
    };
  };

  if (loading) return (
    <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-400 font-medium">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="animate-pulse text-sm">Loading High-Definition Map...</p>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full relative group">
      {/* Legend / Info Overlay */}
      <div className="absolute top-4 right-4 z-[1000] bg-white/90 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-xl pointer-events-none">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-blue-500 rounded-sm" />
          <p className="text-[10px] font-bold text-slate-700 uppercase">Interactive Region</p>
        </div>
        <p className="text-[9px] text-slate-500">Click any state to explore</p>
      </div>

      <MapContainer 
        center={[22, 78]} 
        zoom={4.5} 
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ height: '100%', width: '100%', background: '#f8fafc' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />
        <GeoJSON 
          data={geoData} 
          style={stateStyle}
          onEachFeature={onEachState}
        />
      </MapContainer>

      <style jsx global>{`
        .state-tooltip {
          background: #0B3D91 !important;
          color: white !important;
          border: none !important;
          padding: 4px 8px !important;
          border-radius: 6px !important;
          font-weight: 600 !important;
          font-size: 11px !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  );
}
