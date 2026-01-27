import React from 'react';

// 1. High-Tech HUD Card (Glassmorphism + Tech Borders)
const GlassCard = ({ children, className = "" }) => (
  <div className={`relative group bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-500/30 ${className}`}>
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 rounded-tl-lg"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 rounded-tr-lg"></div>
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 rounded-bl-lg"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 rounded-br-lg"></div>
    {children}
  </div>
);

export default GlassCard;
