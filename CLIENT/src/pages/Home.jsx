import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const Home = () => {
  // Animation Variants for staggered entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.3 } 
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-white overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />

      {/* Main Content */}
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center"
      >
        {/* Animated Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-cyan-100">AI-Powered Career Readiness</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6">
          Bridge the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Skill Gap</span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-lg text-slate-400 mb-10 leading-relaxed">
          Upload your resume and let our AI analyze your path to employment. Identify missing skills, get custom roadmaps, and practice with our voice assistant.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group relative px-8 py-4 bg-cyan-500 text-black font-bold rounded-xl transition-all hover:bg-cyan-400 flex items-center gap-2">
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl font-bold hover:bg-white/10 transition-all">
            Watch Demo
          </button>
        </motion.div>

        {/* Stats / Proof Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: <Zap />, label: "Instant Analysis", desc: "PDF to Skill Matrix in seconds" },
            { icon: <ShieldCheck />, label: "Industry Aligned", desc: "Mapping to 500+ job roles" },
            { icon: <Sparkles />, label: "AI Interview", desc: "Voice-based feedback loop" },
          ].map((feature, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.label}</h3>
              <p className="text-slate-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Home;