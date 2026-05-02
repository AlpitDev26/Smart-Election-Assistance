"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
    fetch("/data/india_state.geojson")
      .then(res => res.json())
      .then(data => {
        setGeoData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Map fetch error:", err);
        setLoading(false);
      });
  }, []);

  const stateStyle = (feature) => {
    const stateName = feature.properties.NAME_1 || feature.properties.ST_NM || feature.properties.st_nm;
    const isActive = selectedState === stateName;
    return {
      fillColor: isActive ? '#0B3D91' : '#3b82f6',
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: isActive ? 0.7 : 0.4,
    };
  };

  const onEachState = (state, layer) => {
    const stateName = state.properties.NAME_1 || state.properties.ST_NM || state.properties.st_nm;
    layer.on({
      mouseover: (e) => { e.target.setStyle({ fillOpacity: 0.8, weight: 2 }); },
      mouseout: (e) => { e.target.setStyle({ fillOpacity: selectedState === stateName ? 0.7 : 0.4, weight: 1 }); },
      click: () => onStateSelect(stateName),
    });
    layer.bindTooltip(stateName, { sticky: true });
  };

  if (loading) return (
    <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', background:'#f8fafc'}}>
      <p style={{fontSize:'12px', fontWeight:'700', color:'#94a3b8', letterSpacing:'1px'}} className="animate-pulse">LOADING MAP DATA...</p>
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <MapContainer 
        center={[22, 78]} 
        zoom={4.5} 
        style={{ height: '100%', width: '100%' }} // CRITICAL: Ensures Leaflet takes full height
        zoomControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {geoData && (
          <GeoJSON 
            data={geoData} 
            style={stateStyle}
            onEachFeature={onEachState}
          />
        )}
      </MapContainer>
    </div>
  );
}
