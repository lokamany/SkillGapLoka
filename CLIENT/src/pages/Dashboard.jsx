import React, { useState } from 'react';
import Sidebar from '../components/layout/sidebar';
import MarketOverview from '../components/dashboard/MarketOverview';
import Roadmap from '../components/dashboard/Roadmap';
import Profile from './Profile'; 
// Fix 1: Ensure the import name matches the component name
// Ensure this path matches the folder structure
import CommCoach from '../components/dashboard/CommCoach';
import { useAuth } from '../context/AuthContext';
import { User, ShieldCheck, Zap } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  
  // This state controls which component is visible in the main area
  const [activeTab, setActiveTab] = useState('overview');
  
  const profileStats = {
    level: 12,
    xp: 4200,
    nextLevelAt: 5000,
    rank: "Pro Analyst"
  };

  // --- CONTENT ROUTER ---
  const renderContent = () => {
    switch (activeTab) {
      case 'overview': 
        return <MarketOverview />;
      case 'roadmap': 
        return <Roadmap />;
      case 'profile': 
        return <Profile />;
      case 'communication': 
        // Fix 2: Changed <Commcoach /> to <CommCoach /> to match the import
        return <CommCoach />; 
      default: 
        return <MarketOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050816] overflow-hidden font-sans">
      {/* SIDEBAR: Clicking the AI Communication button updates activeTab to 'communication' */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-72 h-screen overflow-y-auto">
        {/* --- GLOBAL HEADER --- */}
        <header className="h-20 border-b border-slate-800/40 flex items-center justify-between px-10 sticky top-0 bg-[#050816]/80 backdrop-blur-xl z-40">
          <div className="flex items-center gap-8">
            <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 italic">
              ReadyAI // Control Center
            </div>
            
            {/* XP PROGRESS BAR */}
            <div className="hidden lg:flex items-center gap-4 bg-slate-950/50 px-4 py-2 rounded-xl border border-slate-800">
               <span className="text-[10px] font-black text-slate-500 uppercase">LVL {profileStats.level}</span>
               <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee] transition-all duration-1000" 
                    style={{ width: `${(profileStats.xp / profileStats.nextLevelAt) * 100}%` }}
                  ></div>
               </div>
               <Zap size={14} className="text-cyan-400 animate-pulse" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 pr-6 border-r border-slate-800/50">
               <div className="text-right">
                  <p className="text-[10px] font-black text-slate-500 uppercase">Rank</p>
                  <p className="text-white font-bold text-xs">{profileStats.rank}</p>
               </div>
               <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <ShieldCheck size={18} className="text-white" />
               </div>
            </div>

            <div 
              onClick={() => setActiveTab('profile')} 
              className={`flex items-center gap-3 p-1.5 rounded-2xl cursor-pointer transition-all border ${
                activeTab === 'profile' ? 'border-cyan-500 bg-cyan-500/10' : 'border-transparent hover:bg-slate-800/50'
              }`}
            >
               <div className="text-right pl-2 hidden sm:block">
                  <p className="text-white text-xs font-bold">{user?.email?.split('@')[0] || 'User'}</p>
                  <p className="text-cyan-500 text-[10px] font-black uppercase tracking-tighter">View Profile</p>
               </div>
               <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                  <User size={20} />
               </div>
            </div>
          </div>
        </header>

        {/* --- DYNAMIC PAGE CONTENT --- */}
        <div className="flex-1 animate-in fade-in duration-700">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;