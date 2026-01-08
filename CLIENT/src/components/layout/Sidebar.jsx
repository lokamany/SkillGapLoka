import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, Mic2, UserCircle, Settings, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { id: 'market', icon: LayoutDashboard, label: 'Market Overview', path: '/market' },
    { id: 'profile', icon: UserCircle, label: 'My Profile', path: '/profile' },
    { id: 'roadmap', icon: Map, label: 'Skill Roadmap', path: '/roadmap' },
    { id: 'communication', icon: Mic2, label: 'AI Communication', path: '/dashboard' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-72 border-r border-slate-800 flex flex-col bg-[#020617] h-screen fixed left-0 top-0 z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
          <Sparkles className="text-slate-900" size={20} />
        </div>
        <span className="text-2xl font-black text-white">ReadyAI</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <Link 
            key={item.id}
            to={item.path}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
              location.pathname === item.path 
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
              : 'text-slate-500 hover:bg-slate-800/40 hover:text-white'
            }`}
          >
            <item.icon size={22} />
            <span className="font-semibold text-[15px]">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <button onClick={logout} className="flex items-center gap-4 px-4 py-3 font-bold text-red-400/70 hover:text-red-400 w-full">
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;