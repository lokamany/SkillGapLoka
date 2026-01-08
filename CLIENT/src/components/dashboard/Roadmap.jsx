import React, { useState } from 'react';
import { 
  UploadCloud, Sparkles, Youtube, Award, Send, 
  Loader2, ExternalLink, CheckCircle2, Rocket, Briefcase,
  Map, GraduationCap, Search, Target
} from 'lucide-react';
import axios from 'axios';

const Roadmap = () => {
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [file, setFile] = useState(null);
  const [inputs, setInputs] = useState({
    interest: '',
    dreamRole: '',
    explore: '',
    cgpa: ''
  });

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const generateAIContent = async () => {
    if (!file) return alert("Please upload your profile/resume first!");
    if (!inputs.interest || !inputs.dreamRole) return alert("Please fill in your core interests and dream role!");
    
    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('interest', inputs.interest);
    formData.append('dreamRole', inputs.dreamRole);
    formData.append('explore', inputs.explore);
    formData.append('cgpa', inputs.cgpa);

    try {
      // Ensure your backend server is running and matches this URL
      const response = await axios.post('http://localhost:5000/api/resume/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setRoadmap(response.data);
    } catch (err) {
      console.error("Roadmap Generation Error:", err);
      alert("AI Service error. Check your backend console and GROQ API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-slate-300 font-sans selection:bg-cyan-500/30 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* --- PAGE HEADER --- */}
        <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-4">
            <Rocket size={12} /> Personalized Skill Engineering
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Architect</span>
          </h1>
        </div>

        {!roadmap ? (
          /* --- STEP 1: UPLOAD & INPUT FORM (The "Action" State) --- */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-500">
            
            {/* 01. PROFILE SOURCE UPLOAD */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900/40 border border-slate-800/50 p-8 rounded-[2.5rem] backdrop-blur-xl h-full shadow-2xl">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-6">
                  <UploadCloud size={14}/> 01. Profile Source
                </label>
                
                <label className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all ${file ? 'border-cyan-500 bg-cyan-500/5' : 'border-slate-800 hover:border-slate-700 bg-slate-950/30'}`}>
                  <div className="text-center px-4">
                    {file ? (
                      <>
                        <CheckCircle2 className="text-cyan-400 mx-auto mb-3" size={48} />
                        <p className="text-cyan-400 font-bold text-sm truncate max-w-[150px]">{file.name}</p>
                        <p className="text-slate-500 text-[10px] mt-2 uppercase font-black">File Selected</p>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="text-slate-600 mx-auto mb-3" size={48} />
                        <p className="text-slate-400 text-sm font-medium leading-relaxed">Upload Profile <br/> to See Roadmap</p>
                        <p className="text-slate-600 text-[10px] mt-2 uppercase">PDF Supported</p>
                      </>
                    )}
                  </div>
                  <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf" />
                </label>
              </div>
            </div>

            {/* 02. CAREER ASPIRATIONS */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900/40 border border-slate-800/50 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-xl shadow-2xl h-full">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-8">
                  <Briefcase size={14}/> 02. Career Aspirations
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-bold uppercase ml-2 tracking-widest">Your Interests</label>
                    <input name="interest" placeholder="e.g. AI, Backend Development" onChange={handleChange} className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-6 focus:border-cyan-500 outline-none transition-all text-white placeholder:text-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-bold uppercase ml-2 tracking-widest">Dream Role</label>
                    <input name="dreamRole" placeholder="e.g. Senior Software Engineer" onChange={handleChange} className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-6 focus:border-cyan-500 outline-none transition-all text-white placeholder:text-slate-700" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] text-slate-500 font-bold uppercase ml-2 tracking-widest">Technologies to Explore</label>
                    <input name="explore" placeholder="e.g. Docker, Kubernetes, LLMs" onChange={handleChange} className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-6 focus:border-cyan-500 outline-none transition-all text-white placeholder:text-slate-700" />
                  </div>
                </div>

                <button 
                  onClick={generateAIContent} 
                  disabled={loading}
                  className="w-full mt-10 bg-gradient-to-r from-cyan-600 to-blue-600 py-6 rounded-2xl font-black text-lg text-white shadow-lg shadow-cyan-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
                  {loading ? "Architecting Your Path..." : "Build My Custom Roadmap"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* --- STEP 2: THE GENERATED ROADMAP VIEW --- */
          <div className="space-y-12 animate-in slide-in-from-bottom-10 duration-1000">
            <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800/50 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-white">{roadmap.title}</h2>
                <p className="text-cyan-400 font-bold text-[10px] uppercase tracking-widest mt-1">{roadmap.summary}</p>
              </div>
              <button onClick={() => setRoadmap(null)} className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 text-[10px] font-black hover:text-white transition-all uppercase tracking-widest">New Architect</button>
            </div>

            {/* Visual Timeline Progress */}
            <div className="space-y-8 relative">
              <div className="absolute left-[2.45rem] top-10 bottom-10 w-px bg-cyan-500/10 hidden md:block"></div>
              {roadmap.path.map((step, i) => (
                <div key={i} className="group relative flex gap-8 bg-slate-900/20 border border-slate-800/40 p-8 rounded-[2rem] hover:bg-slate-900/40 transition-all">
                  <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-cyan-500 font-black z-10 group-hover:border-cyan-500 transition-colors shadow-xl">{i + 1}</div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-2">{step.phase} <span className="text-[10px] text-slate-500 ml-3 uppercase tracking-tighter">({step.duration})</span></h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">{step.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {step.skills.map((s, idx) => (
                        <span key={idx} className="bg-cyan-500/5 text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-lg border border-cyan-500/10 uppercase tracking-tighter">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resource Vault Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
              <div className="bg-red-500/[0.03] border border-red-500/10 p-8 rounded-[3rem]">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3"><Youtube className="text-red-500" /> Video Resource Hub</h3>
                {roadmap.resources.youtube.map((yt, i) => (
                  <a key={i} href={yt.url} target="_blank" rel="noreferrer" className="flex justify-between items-center p-5 bg-slate-950/40 rounded-2xl mb-3 border border-transparent hover:border-red-500/20 transition-all group">
                    <span className="text-sm font-bold text-slate-300 group-hover:text-white">{yt.topic}</span> <ExternalLink size={14}/>
                  </a>
                ))}
              </div>
              <div className="bg-cyan-500/[0.03] border border-cyan-500/10 p-8 rounded-[3rem]">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3"><Award className="text-cyan-500" /> Expert Credentials</h3>
                {roadmap.resources.certifications.map((cert, i) => (
                  <a key={i} href={cert.url} target="_blank" rel="noreferrer" className="block p-5 bg-slate-950/40 rounded-2xl mb-3 border border-transparent hover:border-cyan-500/20 transition-all group">
                    <p className="text-[10px] text-cyan-500 font-black uppercase mb-1">{cert.company}</p>
                    <p className="text-sm font-bold text-slate-200 group-hover:text-white leading-tight">{cert.name}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;