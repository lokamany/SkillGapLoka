import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { History, Lock, ShieldCheck, RefreshCw, Clock } from 'lucide-react';

const SettingsPage = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('history');
  const [newPass, setNewPass] = useState('');

  const updatePass = async () => {
    await fetch('http://localhost:5000/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, newPassword: newPass })
    });
    alert("Password updated!");
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex gap-6 border-b border-slate-800 pb-4">
        <button onClick={() => setActiveSection('history')} className={`text-[10px] font-black uppercase tracking-widest ${activeSection === 'history' ? 'text-cyan-400' : 'text-slate-500'}`}>Scan History</button>
        <button onClick={() => setActiveSection('security')} className={`text-[10px] font-black uppercase tracking-widest ${activeSection === 'security' ? 'text-cyan-400' : 'text-slate-500'}`}>Security</button>
      </div>

      {activeSection === 'history' ? (
        <div className="bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-[10px] text-slate-500 uppercase font-black">
              <tr><th className="p-4">Date</th><th className="p-4">ATS</th><th className="p-4">Certs</th></tr>
            </thead>
            <tbody className="text-xs text-slate-300">
              {user?.scanHistory?.map((s, i) => (
                <tr key={i} className="border-t border-slate-800 hover:bg-white/5">
                  <td className="p-4 flex items-center gap-2"><Clock size={12}/> {new Date(s.date).toLocaleDateString()}</td>
                  <td className="p-4 font-bold text-cyan-400">{s.atsScore}%</td>
                  <td className="p-4">+{s.certValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="max-w-md bg-[#0f172a] border border-slate-800 p-8 rounded-3xl space-y-6">
          <h3 className="text-white font-black uppercase text-xs flex items-center gap-2"><Lock size={16}/> Reset Password</h3>
          <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none focus:border-cyan-500" placeholder="New Password"/>
          <button onClick={updatePass} className="w-full py-3 bg-cyan-500 text-slate-900 font-black rounded-xl uppercase text-[10px]">Update Key</button>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;