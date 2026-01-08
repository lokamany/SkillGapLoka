import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

// Use a named export so Dashboard.jsx can find it
export const SkillRadarChart = ({ currentSkills }) => {
  // Fallback data if no skills are analyzed yet
  const data = currentSkills && currentSkills.length > 0 ? currentSkills : [
    { subject: 'Technical', A: 0, B: 100 },
    { subject: 'Communication', A: 0, B: 100 },
    { subject: 'Leadership', A: 0, B: 100 },
    { subject: 'Problem Solving', A: 0, B: 100 },
    { subject: 'Tooling', A: 0, B: 100 },
  ];

  return (
    <div className="w-full h-full min-h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          
          {/* Industry Benchmark */}
          <Radar
            name="Industry"
            dataKey="B"
            stroke="#1e293b"
            fill="#1e293b"
            fillOpacity={0.3}
          />
          
          {/* User Proficiency */}
          <Radar
            name="User"
            dataKey="A"
            stroke="#22d3ee"
            fill="#22d3ee"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};