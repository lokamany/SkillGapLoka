import React from 'react';
import { CheckCircle2, Circle, Lock } from 'lucide-react';

export const PathNode = ({ title, status, duration, description }) => {
  return (
    <div className="relative flex gap-6 pb-10 group">
      {/* Connector Line */}
      <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-white/10 group-last:hidden" />
      
      {/* Icon Status */}
      <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 border border-white/20">
        {status === 'completed' && <CheckCircle2 className="text-cyan-400" size={20} />}
        {status === 'current' && <Circle className="text-cyan-400 animate-pulse" size={20} />}
        {status === 'locked' && <Lock className="text-slate-500" size={16} />}
      </div>

      {/* Content Card */}
      <div className="glass-card flex-1 p-5 hover:border-cyan-500/50 transition-colors">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-white font-bold">{title}</h4>
          <span className="text-xs text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-md">{duration}</span>
        </div>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
    </div>
  );
};