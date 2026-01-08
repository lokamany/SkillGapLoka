import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      
      // FIX: Ensure types are correct and trimmed
      const payload = {
        email: String(formData.email).toLowerCase().trim(),
        password: formData.password
      };
      
      if (!isLogin) payload.name = formData.name;

      const { data } = await axios.post(`http://localhost:5000/api${endpoint}`, payload);
      
      // Pass the successful response (user + token) to AuthContext
      await login(data);
      onClose();
    } catch (err) {
      console.error("Auth Error:", err);
      alert(err.response?.data?.message || "Authentication failed. Check your connection.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0f172a] border border-slate-800 p-8 rounded-[2rem] max-w-md w-full shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white">✕</button>
        
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text" placeholder="Full Name" required
              className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-cyan-500"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          )}
          <input
            type="email" placeholder="Email" required
            className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-cyan-500"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input
            type="password" placeholder="Password" required
            className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-cyan-500"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button className="w-full bg-cyan-500 text-slate-900 font-bold py-4 rounded-xl hover:bg-cyan-400 transition-all">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-cyan-400 font-bold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};