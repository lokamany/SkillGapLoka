import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from '../components/auth/AuthModal';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      // If they are logged in, send them to work
      navigate('/dashboard');
    } else {
      // If not, open the pop-up modal
      setIsAuthOpen(true);
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-8 max-w-7xl mx-auto">
        <div className="text-2xl font-black text-cyan-500 tracking-tighter">READYAI</div>
        <button 
          onClick={() => setIsAuthOpen(true)}
          className="px-6 py-2 border border-slate-800 rounded-full text-sm font-medium hover:bg-slate-800 transition-all"
        >
          Sign In
        </button>
      </nav>

      {/* Hero */}
      <main className="max-w-4xl mx-auto px-6 pt-32 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight"
        >
          Master Your <br />
          <span className="text-cyan-500">Career Path.</span>
        </motion.h1>
        
        <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          The AI-powered skill gap analyzer that helps you land your dream role by identifying exactly what you need to learn.
        </p>

        {/* Updated Button Logic */}
        <button
          onClick={handleGetStarted}
          className="px-12 py-6 bg-cyan-500 text-slate-900 font-black rounded-2xl text-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] active:scale-95"
        >
          Get Started Free
        </button>

        {/* The Modal - Only renders when triggered */}
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </main>
    </div>
  );
};

export default LandingPage;