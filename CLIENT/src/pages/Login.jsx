import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth() || {}; // Safety fallback to avoid 'null' errors
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulate successful authentication
    if (login) {
      login({ email, name: 'Job Seeker', id: '123' });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-flex p-4 rounded-3xl bg-cyan-500/10 mb-6">
            <ShieldCheck className="text-cyan-400" size={40} />
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 mt-3 font-medium">Continue your path to employment readiness</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-2xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input 
                  type="email"
                  required
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 outline-none transition-all"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input 
                  type="password"
                  required
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-95 shadow-xl shadow-cyan-500/20"
            >
              Sign In <LogIn size={20} />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors">
                Join Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;