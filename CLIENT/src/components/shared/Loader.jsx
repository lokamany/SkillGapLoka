import React from 'react';
import { motion } from 'framer-motion';

// Using a named export to match Dashboard.jsx
export const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-[#020617] flex flex-col items-center justify-center z-50">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mb-4"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-cyan-400 font-medium tracking-widest uppercase text-xs"
      >
        {message}
      </motion.p>
    </div>
  );
};