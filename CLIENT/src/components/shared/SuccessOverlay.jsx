import { motion } from 'framer-motion';
import { CheckCircle, Trophy } from 'lucide-react';

export const SuccessOverlay = ({ onComplete }) => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center"
  >
    <motion.div 
      initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }}
      className="text-center"
    >
      <div className="relative inline-block">
        <Trophy className="text-yellow-500 mb-6" size={80} />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }}
          className="absolute -top-2 -right-2 bg-cyan-500 rounded-full p-2"
        >
          <CheckCircle className="text-black" size={20} />
        </motion.div>
      </div>
      <h2 className="text-4xl font-black text-white mb-2">Analysis Complete!</h2>
      <p className="text-slate-400 mb-8">Gemini AI has mapped your path to success.</p>
      <button 
        onClick={onComplete}
        className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-all"
      >
        View My Roadmap
      </button>
    </motion.div>
  </motion.div>
);