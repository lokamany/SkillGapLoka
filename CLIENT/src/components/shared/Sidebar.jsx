import React from 'react';
import { 
  LayoutDashboard, Map, Mic2, UserCircle, 
  Settings, LogOut, Sparkles 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Market Overview' },
    { id: 'profile', icon: UserCircle, label: 'My Profile' },
    { id: 'roadmap', icon: Map, label: 'Skill Roadmap' },
    { id: 'communication', icon: Mic2, label: 'AI Communication' }, // Click triggers 'communication'
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-72 border-r border-slate-800 flex flex-col bg-[#020617] h-screen fixed left-0 top-0 z-50">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
            <Sparkles className="text-slate-900" size={20} />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">ReadyAI</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all group ${
              activeTab === item.id 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]' 
                : 'text-slate-500 hover:bg-slate-800/40 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-4">
              <item.icon size={22} className={activeTab === item.id ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className="font-semibold text-[15px]">{item.label}</span>
            </div>
            {activeTab === item.id && (
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <button onClick={logout} className="w-full flex items-center gap-4 px-4 py-3 text-red-400/70 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all font-bold">
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;