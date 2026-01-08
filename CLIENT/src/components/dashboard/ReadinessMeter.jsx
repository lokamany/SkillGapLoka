import React from 'react';
import { motion } from 'framer-motion';

// Use a named export
export const ReadinessMeter = ({ score }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-48 h-48 transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="#1e293b"
          strokeWidth="12"
          fill="transparent"
        />
        <motion.circle
          cx="96"
          cy="96"
          r={radius}
          stroke="#22d3ee"
          strokeWidth="12"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold text-white">{score}%</span>
        <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Ready</span>
      </div>
    </div>
  );
};