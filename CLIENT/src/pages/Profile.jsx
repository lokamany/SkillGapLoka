import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { jsPDF } from 'jspdf';
import { 
  Sparkles, Briefcase, Trophy, RefreshCw, FileText, Upload, 
  Link as LinkIcon, Target, Youtube, BookOpen,
  GraduationCap, User, CheckCircle, Search, ExternalLink,
  ChevronRight, Lightbulb, Map, AlertTriangle, Camera, Download
} from 'lucide-react';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  
  // UI States
  const [isScanning, setIsScanning] = useState(false);
  const [analysisMode, setAnalysisMode] = useState("AI Optimizer");
  
  // Input States
  const [resume, setResume] = useState(null);
  const [linkedInUrl, setLinkedInUrl] = useState(user?.linkedInUrl || "");

  // --- 🔄 SYNC DATA ---
  const fetchLatestProfile = useCallback(async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`http://127.0.0.1:5001/api/user/get-profile/${user.email}`);
      const data = await res.json();
      if (data && !data.error) {
        setUser(prev => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error("Sync Error:", err);
    }
  }, [user?.email, setUser]);

  useEffect(() => { fetchLatestProfile(); }, [fetchLatestProfile]);

  // --- 🚀 DUAL ANALYSIS LOGIC ---
  const handleDeepScan = async () => {
    if (!resume && !linkedInUrl) return alert("Upload Resume (PDF/Photo) or LinkedIn URL");
    
    setIsScanning(true);
    setAnalysisMode("AI Optimizer");

    const formData = new FormData();
    formData.append('email', user.email);
    formData.append('linkedInUrl', linkedInUrl);
    if (resume) formData.append('resume', resume);

    try {
      let res = await fetch('http://127.0.0.1:5001/api/user/deep-scan', {
        method: 'POST',
        body: formData
      });
      let data = await res.json();

      if (!data.success || data.busy) {
        setAnalysisMode("Local Engine (Accuracy Mode)");
        const localRes = await fetch('http://127.0.0.1:5001/api/user/local-scan', {
          method: 'POST',
          body: formData
        });
        data = await localRes.json();
      }

      if (data.success) setUser(data.user);
    } catch (err) {
      alert("Check backend on Port 5001.");
    } finally {
      setIsScanning(false);
    }
  };

  // --- 📊 PIE CHART MATH ---
  const mastered = Array.isArray(user?.skills) ? user.skills.length : 0;
  const missing = Array.isArray(user?.missingSkills) ? user.missingSkills.length : 0;
  const total = mastered + missing;
  const coveragePercent = total > 0 ? Math.round((mastered / total) * 100) : 0;

  // --- 📄 PDF GENERATOR LOGIC ---
  const handleDownloadPlan = () => {
    if (!user || !user.missingSkills) return alert("Please perform a scan first.");

    const doc = new jsPDF();
    const primaryColor = "#06b6d4"; // Cyan-500

    // Header Branding
    doc.setFillColor(15, 23, 42); // Slate-900
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("CAREER EVOLUTION PLAN", 20, 25);
    doc.setFontSize(10);
    doc.text(`Generated for: ${user.name || user.email}`, 20, 32);

    // ATS Score Badge
    doc.setFillColor(6, 182, 212);
    doc.roundedRect(160, 15, 30, 15, 2, 2, 'F');
    doc.setTextColor(15, 23, 42);
    doc.text("ATS SCORE", 163, 22);
    doc.setFontSize(14);
    doc.text(`${user.atsScore || 0}%`, 168, 28);

    // Body Content
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(14);
    doc.text("Current Readiness Overview", 20, 55);
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 58, 190, 58);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const summary = `Based on our AI analysis, you have mastered ${mastered} key industry skills. 
To reach 100% market readiness, you need to focus on ${missing} identified gaps.`;
    doc.text(summary, 20, 68, { maxWidth: 170 });

    // Phases
    const phases = [
      { 
        title: "PHASE 1: RESUME OPTIMIZATION", 
        desc: `Update your experience bullet points to include: ${user.missingSkills.slice(0, 3).join(', ')}.` 
      },
      { 
        title: "PHASE 2: SKILL DEPLOYMENT", 
        desc: `Build a portfolio project specifically utilizing ${user.missingSkills[1] || 'Core industry tech'}.` 
      },
      { 
        title: "PHASE 3: MARKET VISIBILITY", 
        desc: `Highlight your mastery in ${user.skills?.slice(0, 2).join(', ') || 'Professional Skills'} on LinkedIn.` 
      }
    ];

    let yPos = 90;
    phases.forEach((phase, i) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(6, 182, 212);
      doc.text(phase.title, 20, yPos);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      doc.text(phase.desc, 20, yPos + 7, { maxWidth: 170 });
      yPos += 25;
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("© 2026 AI Career Partner - Confidential Analysis Report", 70, 285);

    // Save
    doc.save(`Career_Plan_${user.name || 'User'}.pdf`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-[#020617] min-h-screen text-white font-sans">
      
      {/* HEADER BIO */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
        <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-1 rounded-full">
           <div className="bg-slate-900 p-6 rounded-full"><User size={40} className="text-cyan-400" /></div>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-black tracking-tight">{user?.name || "Professional Identity"}</h2>
          <p className="text-slate-400 text-sm mt-2 italic leading-relaxed font-medium">
            "{user?.bio || "Scan your credentials to generate an AI bio and ATS analysis."}"
          </p>
        </div>
        <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 text-center min-w-[140px]">
           <p className="text-slate-500 text-[10px] font-black uppercase mb-1">ATS Accuracy</p>
           <h2 className="text-4xl font-black text-cyan-400">{user?.atsScore || 0}%</h2>
        </div>
      </div>

      {/* INPUTS & PIE CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-[2.5rem] space-y-4 shadow-xl">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl p-6 cursor-pointer hover:bg-slate-900/50 transition-all group">
            <div className="flex gap-3 mb-2">
                <FileText size={20} className="text-slate-500 group-hover:text-cyan-400 transition-colors"/>
                <Camera size={20} className="text-slate-500 group-hover:text-cyan-400 transition-colors"/>
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                {resume ? resume.name : "Drop PDF or Photo"}
            </span>
            <input type="file" className="hidden" accept="image/*,application/pdf" onChange={(e) => setResume(e.target.files[0])} />
          </label>
          <div className="relative">
            <LinkIcon size={14} className="absolute left-4 top-4 text-slate-500"/>
            <input 
                type="text" value={linkedInUrl} onChange={(e) => setLinkedInUrl(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 p-3 pl-10 rounded-xl text-xs outline-none focus:border-blue-500 transition-all"
                placeholder="LinkedIn Profile URL"
            />
          </div>
          <button onClick={handleDeepScan} disabled={isScanning} className="w-full py-4 bg-cyan-500 text-slate-900 rounded-xl font-black uppercase text-[10px] flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all">
            {isScanning ? <RefreshCw className="animate-spin" size={14}/> : <Search size={14}/>}
            {isScanning ? `Running ${analysisMode}` : "Analyze My Career"}
          </button>
        </div>

        <div className="lg:col-span-2 bg-[#0f172a] border border-slate-800 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-10 shadow-xl">
          <div className="relative w-44 h-44 shrink-0">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path className="text-slate-800" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
              <path className="text-cyan-500 transition-all duration-1000 ease-out" strokeDasharray={`${coveragePercent}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-3xl font-black tracking-tighter">{coveragePercent}%</span>
               <span className="text-[8px] font-black uppercase text-slate-500">Skill Coverage</span>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tight">Mastery Insight</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
                Analysis reveals mastery in <b>{mastered} skills</b>. Improving the <b>{missing} identified gaps</b> will boost your ATS compatibility by up to 40%.
            </p>
            <div className="flex gap-6">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-cyan-500"></div><span className="text-[10px] font-black uppercase">Mastered</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-slate-800"></div><span className="text-[10px] font-black uppercase">Missing</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* SKILL GAPS & RESOURCES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0f172a] border border-red-500/20 rounded-[2.5rem] p-8 shadow-xl">
          <h3 className="text-red-500 font-black text-xs uppercase flex items-center gap-2 mb-6"><Target size={18}/> Skill Gaps & Resources</h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {user?.missingSkills?.length > 0 ? user.missingSkills.map((skill, i) => (
              <div key={i} className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 flex flex-col gap-3 hover:border-red-500/30 transition-all">
                <div className="flex justify-between items-center">
                    <span className="text-white font-black text-xs uppercase">{skill}</span>
                    <span className="text-[8px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded font-black uppercase tracking-widest">Urgent Gap</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <a href={`https://www.youtube.com/results?search_query=${skill}+tutorial+2026`} target="_blank" rel="noreferrer" className="bg-slate-800 text-slate-400 p-2 rounded-lg flex flex-col items-center gap-1 hover:bg-red-600 hover:text-white transition-all group">
                    <Youtube size={16} className="group-hover:scale-110 transition-transform"/><span className="text-[8px] font-black uppercase tracking-tighter">YouTube</span>
                  </a>
                  <a href={`https://www.google.com/search?q=${skill}+complete+handbook+filetype:pdf`} target="_blank" rel="noreferrer" className="bg-slate-800 text-slate-400 p-2 rounded-lg flex flex-col items-center gap-1 hover:bg-cyan-600 hover:text-white transition-all group">
                    <BookOpen size={16} className="group-hover:scale-110 transition-transform"/><span className="text-[8px] font-black uppercase tracking-tighter">PDF Docs</span>
                  </a>
                  <a href={`https://www.coursera.org/search?query=${skill}`} target="_blank" rel="noreferrer" className="bg-slate-800 text-slate-400 p-2 rounded-lg flex flex-col items-center gap-1 hover:bg-blue-600 hover:text-white transition-all group">
                    <GraduationCap size={16} className="group-hover:scale-110 transition-transform"/><span className="text-[8px] font-black uppercase tracking-tighter">Course</span>
                  </a>
                </div>
              </div>
            )) : (
              <div className="text-center py-10 opacity-30"><AlertTriangle size={30} className="mx-auto mb-2"/><p className="text-[10px] font-bold uppercase">No Skill Gap Identified</p></div>
            )}
          </div>
        </div>

        {/* PROFESSIONAL IDP (ROADMAP) */}
        <div className="bg-[#0f172a] border border-yellow-500/20 rounded-[2.5rem] p-8 shadow-xl">
          <h3 className="text-yellow-500 font-black text-xs uppercase flex items-center gap-2 mb-6"><Map size={18}/> Professional IDP (Action Plan)</h3>
          <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-800">
            <div className="relative pl-8 group">
              <div className="absolute left-0 top-1 w-6 h-6 bg-slate-900 border-2 border-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"><div className="w-2 h-2 bg-cyan-500 rounded-full"></div></div>
              <h4 className="text-xs font-black uppercase text-white mb-1">Phase 1: Resume Injection</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">Update experience bullet points to include <b>{user?.missingSkills?.[0] || 'Technical Stack'}</b> keywords.</p>
            </div>
            <div className="relative pl-8 group">
              <div className="absolute left-0 top-1 w-6 h-6 bg-slate-900 border-2 border-slate-700 rounded-full flex items-center justify-center transition-colors"><ChevronRight size={12} className="text-slate-700"/></div>
              <h4 className="text-xs font-black uppercase text-white mb-1">Phase 2: Project Deployment</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">Build a portfolio case-study utilizing <b>{user?.missingSkills?.[1] || 'Core Skills'}</b>.</p>
            </div>
            <div className="relative pl-8 group">
              <div className="absolute left-0 top-1 w-6 h-6 bg-slate-900 border-2 border-slate-700 rounded-full flex items-center justify-center transition-colors"><Lightbulb size={12} className="text-slate-700"/></div>
              <h4 className="text-xs font-black uppercase text-white mb-1">Phase 3: Network Outreach</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">Leverage <b>{user?.skills?.[0] || 'Mastered Area'}</b> to connect with recruiters in your field.</p>
            </div>
          </div>
          
          <button 
            onClick={handleDownloadPlan}
            className="w-full mt-8 py-3 bg-yellow-500 text-slate-900 rounded-xl font-black uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all shadow-lg active:scale-95"
          >
            <Download size={14}/> Download PDF Plan
          </button>
        </div>
      </div>

      {/* --- LIVE MATCHED JOBS SECTION --- */}
      <div className="bg-[#0f172a] border border-green-500/20 rounded-[2.5rem] p-8 shadow-xl">
        <h3 className="text-green-500 font-black text-xs uppercase flex items-center gap-2 mb-6"><Briefcase size={18}/> Live Career Compatibility</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user?.matchedJobs?.length > 0 ? user.matchedJobs.map((job, i) => (
            <div key={i} className="bg-slate-900/80 p-6 rounded-[2rem] border border-slate-800 flex flex-col justify-between hover:border-green-500/40 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                  <div className="bg-green-500/10 text-green-500 text-[10px] font-black px-2 py-1 rounded-lg border border-green-500/20">
                    {job.matchScore}% Match
                  </div>
              </div>
              <div>
                <h4 className="text-white font-black text-sm tracking-tight group-hover:text-green-400 transition-colors mt-2">{job.title}</h4>
                <p className="text-slate-500 text-[10px] font-black uppercase mb-6 tracking-widest">{job.company}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                    {job.requiredSkills?.slice(0, 3).map((s, idx) => (
                        <span key={idx} className="text-[8px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-black uppercase">{s}</span>
                    ))}
                </div>
              </div>
              
              <a 
                href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.title + " " + job.company)}`} 
                target="_blank" 
                rel="noreferrer"
                className="w-full py-3 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl font-black uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-green-500 hover:text-slate-900 transition-all"
              >
                Quick Apply <ExternalLink size={12}/>
              </a>
            </div>
          )) : (
            <div className="col-span-full py-20 text-center">
                <p className="text-slate-600 text-xs italic">Awaiting credentials to calculate compatible vacancies...</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;