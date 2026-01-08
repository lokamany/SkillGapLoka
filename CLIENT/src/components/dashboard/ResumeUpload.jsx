import React, { useState } from 'react';
import { Upload, Linkedin, Send, CheckCircle, FileText, Award, AlertCircle, FileSearch, ShieldCheck, RefreshCw } from 'lucide-react';
import { useSkills } from '../../context/SkillContext';

const ResumeUpload = () => {
  const { analyzeResume, loading, auditData } = useSkills();
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [certFile, setCertFile] = useState(null);

  // Calculate how many items are provided
  const currentCount = (resumeFile ? 1 : 0) + (linkedinUrl.trim().length > 5 ? 1 : 0) + (certFile ? 1 : 0);
  const isReady = currentCount >= 2;

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      
      {/* INPUTS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2 text-white"><FileText className="text-cyan-400" /> Primary Data</h3>
          
          <div className="relative border-2 border-dashed border-slate-700 rounded-2xl p-6 text-center bg-slate-950/50 hover:border-cyan-500/50 transition-colors cursor-pointer">
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setResumeFile(e.target.files[0])} />
            <Upload className={`mx-auto mb-2 ${resumeFile ? 'text-green-400' : 'text-slate-500'}`} />
            <p className="text-xs text-slate-300 font-medium">{resumeFile ? resumeFile.name : "Resume (PDF/DOC)"}</p>
          </div>

          <div className="relative">
            <Linkedin className="absolute left-4 top-3.5 text-blue-400" size={18} />
            <input 
              type="url" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-500 outline-none" 
              placeholder="LinkedIn URL" 
              value={linkedinUrl} 
              onChange={(e) => setLinkedinUrl(e.target.value)} 
            />
          </div>
        </div>

        <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2 text-white"><Award className="text-yellow-400" /> Optional Certs</h3>
          
          <div className="relative border-2 border-dashed border-slate-700 rounded-2xl p-10 text-center bg-slate-950/50 hover:border-yellow-500/50 transition-colors cursor-pointer">
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setCertFile(e.target.files[0])} />
            <Award className={`mx-auto mb-2 ${certFile ? 'text-yellow-400' : 'text-slate-500'}`} />
            <p className="text-xs text-slate-300 font-medium">{certFile ? certFile.name : "Certificate (Image/PDF)"}</p>
          </div>

          {/* 🔥 UPDATED ACTION BUTTON HERE */}
          <button 
            disabled={!isReady || loading}
            onClick={() => analyzeResume(resumeFile, linkedinUrl, certFile)}
            className={`w-full py-4 rounded-xl font-black transition-all flex justify-center items-center gap-2 ${
              isReady && !loading 
                ? 'bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/20 hover:scale-[1.02]' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-70'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="animate-spin" size={18} />
                {currentCount === 3 ? "Heavy AI Scan in Progress..." : "AI is Thinking..."}
              </span>
            ) : !isReady ? (
              <span className="flex items-center gap-2 text-sm uppercase tracking-wider">
                <ShieldCheck size={18} /> Need {2 - currentCount} more item{2 - currentCount > 1 ? 's' : ''}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send size={18} /> Start AI Audit
              </span>
            )}
          </button>
        </div>
      </div>

      {/* AI RESPONSE SECTION */}
      {auditData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
          {/* Resume Results */}
          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-[3rem] backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-black text-slate-400 uppercase text-xs tracking-widest">Resume Audit</h4>
              <span className="text-3xl font-black text-cyan-400">{auditData.resume.score}%</span>
            </div>
            <div className="space-y-4">
              <p className="text-red-400 font-bold text-sm flex items-center gap-2">
                <AlertCircle size={16}/> Missing Skills:
              </p>
              <div className="flex flex-wrap gap-2">
                {auditData.resume.missingSkills.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-full font-bold">
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500 italic mt-2">{auditData.resume.criticalGaps}</p>
            </div>
          </div>

          {/* LinkedIn Results */}
          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-[3rem] backdrop-blur-md">
            <h4 className="font-black text-slate-400 uppercase text-xs tracking-widest mb-6">LinkedIn Gaps</h4>
            <ul className="space-y-3">
              {auditData.linkedin.missingElements.map((m, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <CheckCircle size={16} className="text-cyan-500 mt-0.5 shrink-0" /> {m}
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl text-xs text-blue-300 italic">
              💡 Tip: {auditData.linkedin.optimizationTip}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;