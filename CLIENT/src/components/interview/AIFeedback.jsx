import React from 'react';
import { MessageSquare, Lightbulb, Zap } from 'lucide-react';

// Make sure the "export" keyword is exactly like this:
export const AIFeedback = ({ feedback = [] }) => {
  const mockFeedback = [
    { type: 'strength', text: 'Clear explanation of load balancing concepts.' },
    { type: 'improvement', text: 'Try to mention specific tools like Nginx or AWS ELB.' },
  ];

  const currentFeedback = feedback.length > 0 ? feedback : mockFeedback;

  return (
    <div className="glass-card p-6 min-h-[200px] border-cyan-500/20">
      <h3 className="text-sm uppercase text-slate-500 font-bold mb-4 flex items-center gap-2">
        <Zap size={16} className="text-cyan-400" />
        AI Real-time Insights
      </h3>
      
      <div className="space-y-4">
        {currentFeedback.map((item, index) => (
          <div key={index} className="flex gap-3 items-start">
            {item.type === 'strength' ? (
              <MessageSquare className="text-green-400 mt-1 shrink-0" size={16} />
            ) : (
              <Lightbulb className="text-yellow-400 mt-1 shrink-0" size={16} />
            )}
            <p className="text-sm text-slate-300 italic">"{item.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};