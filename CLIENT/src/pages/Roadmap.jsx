import React from 'react';
import { motion } from 'framer-motion';
import { useSkills } from '../context/SkillContext';
import { PathNode } from '../components/roadmap/PathNode';
import { ResourceCard } from '../components/roadmap/ResourceCard';
import { Sparkles, Trophy, BookOpen, ArrowRight } from 'lucide-react';

const Roadmap = () => {
  const { gaps, readinessScore } = useSkills();

  // Animations variants
  const containerVars = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="p-8 bg-[#020617] min-h-screen text-white pb-20">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
      >
        <div>
          <h2 className="text-4xl font-bold mb-2">
            AI-Generated <span className="text-cyan-400">Roadmap</span>
          </h2>
          <p className="text-slate-400 max-w-xl">
            We've mapped out a custom learning path to bridge your {gaps.length} identified skill gaps and reach 100% job readiness.
          </p>
        </div>

        <div className="glass-card px-6 py-4 flex items-center gap-4 border-cyan-500/30">
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-slate-500">Target Score</p>
            <p className="text-2xl font-black text-cyan-400">100%</p>
          </div>
          <div className="h-10 w-px bg-white/10" />
          <Trophy className="text-yellow-500" size={32} />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        
        {/* Left Column: The Learning Path Nodes */}
        <motion.div 
          variants={containerVars}
          initial="initial"
          animate="animate"
          className="xl:col-span-2 space-y-2"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-cyan-400" size={20} />
            <h3 className="text-xl font-semibold">Your Journey</h3>
          </div>

          {gaps.length > 0 ? (
            gaps.map((gap, index) => (
              <PathNode 
                key={gap}
                title={gap}
                // First gap is 'current', others are 'locked' until previous is done
                status={index === 0 ? 'current' : 'locked'}
                duration={index === 0 ? "Active: 2 Weeks" : "Pending"}
                description={`Comprehensive module covering ${gap} industry standards, best practices, and hands-on implementation.`}
              />
            ))
          ) : (
            <div className="glass-card p-12 text-center border-dashed">
              <BookOpen className="mx-auto text-slate-600 mb-4" size={48} />
              <p className="text-slate-400 mb-4">No analysis data found.</p>
              <button className="text-cyan-400 hover:underline">Return to Dashboard to upload resume</button>
            </div>
          )}
        </motion.div>

        {/* Right Column: Suggested Resources & Summary */}
        <div className="space-y-8">
          <div className="glass-card p-6 bg-gradient-to-br from-cyan-500/10 to-blue-600/10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-cyan-400" />
              Recommended Resources
            </h3>
            <div className="space-y-4">
              {/* This would eventually map through real data from Gemini */}
              <ResourceCard 
                type="Course" 
                title={`${gaps[0] || 'Modern'} Mastery 2026`} 
                provider="Udemy" 
              />
              <ResourceCard 
                type="Documentation" 
                title={`Official ${gaps[0] || 'Tech'} Guide`} 
                provider="MDN Web Docs" 
              />
            </div>
            <button className="w-full mt-6 py-3 text-sm font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-2 group">
              View All Resources <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="glass-card p-6 border-white/5">
            <h3 className="text-slate-300 font-bold mb-4">Next Milestone</h3>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-sm text-cyan-400 font-mono mb-1">Module 1 Assessment</p>
              <p className="text-white text-sm font-medium">Complete the {gaps[0] || 'Initial'} Project to unlock the next stage.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;