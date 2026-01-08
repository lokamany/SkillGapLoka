
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // 1. Send signup request to Backend
            const { data } = await axios.post('http://localhost:5000/api/auth/signup', {
                name: formData.name,
                email: formData.email.toLowerCase().trim(), // Clean the string
                password: formData.password
            });

            // 2. Automatically log them in after successful signup
            login(data);
            
            // 3. Take them to the dashboard to upload their first resume
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-[#0f172a] border border-slate-800 p-8 rounded-2xl shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Create Account</h2>
                    <p className="text-slate-400 mt-2">Start your AI career analysis today.</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-[#020617] border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="John Doe"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-[#020617] border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="name@company.com"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-[#020617] border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="••••••••"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-center text-slate-500 mt-8 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-cyan-500 hover:underline">Log in</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;