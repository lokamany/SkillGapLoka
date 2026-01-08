import React from 'react';

const SkillMatrix = ({ data }) => {
  // If no data, show a simple list or empty state
  const displayData = data?.length > 0 ? data : [
    { subject: 'Technical', A: 0 },
    { subject: 'Soft Skills', A: 0 },
    { subject: 'Leadership', A: 0 }
  ];

  return (
    <div className="h-64 flex flex-col justify-center">
      <div className="space-y-4">
        {displayData.map((skill, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">{skill.subject}</span>
              <span className="text-cyan-400">{skill.A}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-cyan-500 h-full transition-all duration-1000" 
                style={{ width: `${skill.A}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillMatrix;