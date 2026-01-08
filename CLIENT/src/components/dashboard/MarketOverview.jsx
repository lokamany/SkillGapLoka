import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, Briefcase, Trophy, BarChart3, Target, Zap, 
  ChevronRight, Search, Activity, Calendar, X, CheckCircle2, 
  Clock, DollarSign, BookOpen
} from 'lucide-react';

const MarketOverview = () => {
  const [activeSubTab, setActiveSubTab] = useState('analysis');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDetail, setSelectedDetail] = useState(null); // 🔥 Tracks clicked job/skill

  // --- EXTENDED DYNAMIC DATA ---
  const marketData = {
    jobs: [
      { 
        id: 'da', title: "Data Analyst", company: "MetaScale", salary: "$110k - $145k", 
        trend: "+18%", tags: ["SQL", "Python", "Tableau"],
        requirements: ["Mastery of SQL (Window Functions)", "Python (Pandas/NumPy)", "A/B Testing experience", "Tableau or PowerBI"],
        description: "Analyze large datasets to provide actionable insights for product growth.",
        difficulty: "Medium"
      },
      { 
        id: 'ai', title: "AI Engineer", company: "NeuralNet", salary: "$160k - $210k", 
        trend: "+32%", tags: ["PyTorch", "LLMs"],
        requirements: ["Deep learning frameworks (PyTorch/TensorFlow)", "Experience with RAG & Fine-tuning LLMs", "GPU Optimization"],
        description: "Building next-generation autonomous agents and LLM pipelines.",
        difficulty: "Hard"
      },
      { 
        id: 'sr', title: "Senior React Dev", company: "Vercel", salary: "$150k - $190k", 
        trend: "+12%", tags: ["Next.js", "TypeScript"],
        requirements: ["Advanced Next.js App Router", "Server Components mastery", "Performance Profiling", "Design Systems"],
        description: "Lead frontend architecture for high-scale web applications.",
        difficulty: "Hard"
      }
    ],
    skills: [
      { id: 's1', name: "React & Next.js", demand: 94, color: 'bg-cyan-500', roadmap: "Focus on Server Actions and Middleware." },
      { id: 's2', name: "AI Prompt Eng.", demand: 82, color: 'bg-purple-500', roadmap: "Learn Chain-of-Thought prompting and Vector DBs." },
      { id: 's3', name: "Cloud Architecture", demand: 76, color: 'bg-blue-500', roadmap: "AWS Certified Solutions Architect path is recommended." }
    ]
  };

  const filteredJobs = useMemo(() => {
    return marketData.jobs.filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const renderSubContent = () => {
    switch (activeSubTab) {
      case 'analysis':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 p-8 rounded-[2.5rem]">
              <h4 className="text-white font-black uppercase text-[10px] tracking-[0.2em] mb-8 flex items-center gap-2">
                <BarChart3 size={16} className="text-cyan-400"/> Live Skill Demand (Click to Analyze)
              </h4>
              <div className="space-y-8">
                {marketData.skills.map(item => (
                  <div key={item.id} className="group cursor-pointer" onClick={() => setSelectedDetail({type: 'skill', ...item})}>
                    <div className="flex justify-between text-xs mb-3 font-bold group-hover:text-cyan-400 transition-colors">
                      <span>{item.name}</span>
                      <span>{item.demand}%</span>
                    </div>
                    <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/50">
                      <div className={`h-full ${item.color} shadow-[0_0_15px_rgba(34,211,238,0.3)]`} style={{width: `${item.demand}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-transparent border border-purple-500/20 p-8 rounded-[2.5rem]">
              <Target className="text-purple-400 mb-4" size={32} />
              <h4 className="text-white font-bold text-lg">Career Gap Analysis</h4>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed italic">
                "You are currently matching 72% of Senior roles. Click a job card to see what's missing from your stack."
              </p>
            </div>
          </div>
        );

      case 'jobs':
        return (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" placeholder="Search Data Analyst, AI, React..." 
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-cyan-500/50 outline-none transition-all shadow-inner"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {filteredJobs.map((job) => (
                <div key={job.id} onClick={() => setSelectedDetail({type: 'job', ...job})} className="flex items-center justify-between p-6 bg-slate-900/40 border border-slate-800 rounded-[2rem] hover:border-cyan-500/50 transition-all group cursor-pointer hover:bg-slate-900/80">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center font-bold text-white group-hover:bg-cyan-500 group-hover:text-black transition-all">
                      {job.title[0]}
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{job.title}</h4>
                      <p className="text-slate-500 text-xs">{job.company} • <span className="text-cyan-500/80 font-bold">{job.salary}</span></p>
                    </div>
                  </div>
                  <div className="hidden md:flex gap-2">
                    {job.tags.map(t => <span key={t} className="px-3 py-1 bg-slate-800 text-slate-400 rounded-lg text-[10px] font-bold">{t}</span>)}
                  </div>
                  <ChevronRight size={18} className="text-slate-700 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="p-10 space-y-12 max-w-7xl mx-auto relative">
      
      {/* --- FLOATING DETAIL OVERLAY (MODAL) --- */}
      {selectedDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-end p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md h-full bg-slate-900 border border-slate-800 rounded-[3rem] shadow-2xl p-8 overflow-y-auto animate-in slide-in-from-right-8 relative">
            <button onClick={() => setSelectedDetail(null)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
              <X size={24} />
            </button>

            {selectedDetail.type === 'job' ? (
              <div className="space-y-8 mt-4">
                <div className="space-y-2">
                  <div className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2">Requirement Analysis</div>
                  <h2 className="text-3xl font-black text-white">{selectedDetail.title}</h2>
                  <p className="text-slate-400 font-medium">{selectedDetail.company}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-800/50 rounded-2xl">
                    <DollarSign size={16} className="text-cyan-400 mb-2"/>
                    <p className="text-[10px] font-black text-slate-500 uppercase">Avg. Salary</p>
                    <p className="text-white font-bold text-sm">{selectedDetail.salary}</p>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-2xl">
                    <Activity size={16} className="text-orange-400 mb-2"/>
                    <p className="text-[10px] font-black text-slate-500 uppercase">Difficulty</p>
                    <p className="text-white font-bold text-sm">{selectedDetail.difficulty}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2"><BookOpen size={18} className="text-cyan-500"/> Core Requirements</h4>
                  <div className="space-y-3">
                    {selectedDetail.requirements.map((req, i) => (
                      <div key={i} className="flex gap-3 items-start p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <CheckCircle2 size={16} className="text-cyan-500 shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-4 bg-cyan-500 text-slate-950 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:bg-white transition-all">
                  Start Training for this role
                </button>
              </div>
            ) : (
              // Skill Detail
              <div className="space-y-8 mt-4">
                <div className="space-y-2">
                   <div className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2">Skill Roadmap</div>
                   <h2 className="text-3xl font-black text-white">{selectedDetail.name}</h2>
                </div>
                <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800">
                  <p className="text-slate-400 leading-relaxed text-sm italic">"{selectedDetail.roadmap}"</p>
                </div>
                <div className="bg-slate-800/30 p-6 rounded-3xl">
                   <h4 className="text-white font-bold mb-4">Recommended Courses</h4>
                   <ul className="space-y-2 text-xs text-slate-500">
                     <li>• Advanced Architecture Patterns (8h)</li>
                     <li>• {selectedDetail.name} Mastery (12h)</li>
                   </ul>
                </div>
                <button onClick={() => setSelectedDetail(null)} className="w-full py-4 border border-slate-700 text-white rounded-2xl font-black uppercase tracking-widest">Close</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- MAIN PAGE CONTENT --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Readiness', val: '84%', icon: Activity, color: 'text-cyan-400' },
          { label: 'Active Jobs', val: '1.2k', icon: Briefcase, color: 'text-white' },
          { label: 'Global Rank', val: '#142', icon: Trophy, color: 'text-purple-400' }
        ].map((s, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] shadow-xl">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <s.icon size={12}/> {s.label}
            </p>
            <h3 className={`text-6xl font-black italic tracking-tighter ${s.color}`}>{s.val}</h3>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        <div className="flex gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 w-fit shadow-inner">
          {['analysis', 'jobs', 'leaderboard'].map(t => (
            <button key={t} onClick={() => setActiveSubTab(t)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeSubTab === t ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div>{renderSubContent()}</div>
      </div>

      {/* --- CONSISTENCY ENGINE --- */}
      <div className="bg-slate-950 border border-slate-800 rounded-[3rem] p-10 shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h3 className="text-3xl font-black text-white italic tracking-tighter flex items-center gap-3">
              <Calendar className="text-cyan-500" /> Consistency Engine
            </h3>
            <p className="text-slate-500 text-sm mt-1">12-day streak active.</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-6 py-3 rounded-2xl shadow-inner">
             <Zap className="text-orange-400" size={20} fill="currentColor" />
             <span className="text-white font-black text-xl">12</span>
          </div>
        </div>
        <div className="flex items-end justify-between gap-4 h-48 px-4">
          {[40, 75, 50, 95, 60, 85, 100].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center group">
              <div className={`w-full rounded-2xl transition-all duration-500 ${i === 6 ? 'bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'bg-slate-800'}`} style={{ height: `${val}%` }}></div>
              <p className={`text-[10px] font-black mt-6 ${i === 6 ? 'text-cyan-400' : 'text-slate-600'}`}>{['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][i]}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default MarketOverview;