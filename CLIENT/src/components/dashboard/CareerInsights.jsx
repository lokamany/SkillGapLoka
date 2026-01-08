import React from 'react';
import { TrendingUp, Users, Target } from 'lucide-react';

const CareerInsights = ({ isPlaceholder }) => {
  const insights = [
    { title: 'Market Demand', value: '+24%', icon: TrendingUp, desc: 'High growth in AI roles' },
    { title: 'Competition', value: 'High', icon: Users, desc: 'Top 10% skills required' },
    { title: 'Match Rate', value: isPlaceholder ? '--' : '85%', icon: Target, desc: 'Based on your profile' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Career Insights</h3>
      <div className="grid gap-4">
        {insights.map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <item.icon className="text-cyan-400" size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">{item.title}</span>
                <span className="text-cyan-400 font-bold">{item.value}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerInsights;
