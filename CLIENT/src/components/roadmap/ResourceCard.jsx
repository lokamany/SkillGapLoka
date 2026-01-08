import React from 'react';
import { ExternalLink } from 'lucide-react';

export const ResourceCard = ({ type, title, provider }) => (
  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
    <div className="flex justify-between items-start">
      <div>
        <span className="text-[10px] uppercase tracking-tighter text-cyan-400 font-bold">{type}</span>
        <h4 className="text-white text-sm font-semibold mt-1 group-hover:text-cyan-300">{title}</h4>
        <p className="text-slate-500 text-xs mt-1">{provider}</p>
      </div>
      <ExternalLink size={14} className="text-slate-600 group-hover:text-cyan-400" />
    </div>
  </div>
);