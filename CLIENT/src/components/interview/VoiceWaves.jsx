import React from 'react';
import { motion } from 'framer-motion';

export const VoiceWaves = ({ isRecording }) => {
  return (
    <div className="flex items-center justify-center gap-1 h-20">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-cyan-500 rounded-full"
          animate={{
            height: isRecording ? [10, 40, 15, 50, 10] : 4
          }}
          transition={{
            repeat: Infinity,
            duration: 0.5 + Math.random() * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};