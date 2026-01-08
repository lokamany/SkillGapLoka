import React, { useState } from 'react';
import { Youtube, Upload, Sparkles, Loader2, Lightbulb, Target } from 'lucide-react';
import axios from 'axios';
import { useSkills } from '../../context/SkillContext';

const SkillRoadmap = () => {
  const { roadmap, setRoadmap } = useSkills();
  const [feedback, setFeedback] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ interests: '', dreamRole: '', techToExplore: '' });

  const handleGenerate = async () => {
    if (!form.dreamRole || !form.techToExplore) {
      alert("Please fill in your Dream Role and Tech goals.");
      return;
    }

    setLoading(true);
    const data = new FormData();
    if (file) data.append("pdf", file);
    data.append("interests", form.interests);
    data.append("dreamRole", form.dreamRole);
    data.append("techToExplore", form.techToExplore);

    try {
      const response = await axios.post("http://127.0.0.1:5001/api/generate-skill-roadmap", data);
      if (response.data.success) {
        setRoadmap(response.data.roadmap);
        setFeedback(response.data.feedback);
      }
    } catch (err) {
      alert("Backend is offline. Run 'node server.js'");
    } finally { setLoading(false); }
  };

  if (!roadmap || roadmap.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-10 space-y-10">
        <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">Roadmap <span className="text-cyan-400">Architect</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] flex flex-col justify-center text-center">
            <Upload className="mx-auto text-slate-600 mb-4" size={32} />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="text-xs text-slate-500 mb-2 mx-auto" />
            <p className="text-[10px] text-slate-600 uppercase font-black tracking-widest">Optional: Upload Resume</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] space-y-4">
            <input placeholder="Dream Role" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white text-sm" onChange={(e) => setForm({...form, dreamRole: e.target.value})} />
            <input placeholder="Tech to Learn" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white text-sm" onChange={(e) => setForm({...form, techToExplore: e.target.value})} />
            <button onClick={handleGenerate} disabled={loading} className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-xl transition-all">
              {loading ? <Loader2 className="animate-spin mx-auto" /> : "GENERATE LOCAL PATH"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-10 space-y-12 animate-in fade-in duration-700">
      <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-[2.5rem] flex gap-6 items-center">
        <Target className="text-cyan-400" size={32} />
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-tighter">Strategic Feedback</h2>
          <p className="text-slate-400 text-xs italic">"{feedback?.overall}"</p>
        </div>
      </div>

      <div className="relative space-y-10">
        <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-slate-800"></div>
        {roadmap.map((item, idx) => (
          <div key={idx} className="relative pl-24 group">
            <div className="absolute left-0 w-16 h-16 bg-slate-950 border-2 border-slate-800 rounded-2xl flex items-center justify-center text-white font-black text-xl">{idx + 1}</div>
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem]">
              <h3 className="text-xl font-bold text-white">{item.step}</h3>
              <p className="text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-4">{item.topic}</p>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 flex gap-3 text-slate-400 text-xs italic">
                <Lightbulb className="text-yellow-500 shrink-0" size={16} /> {item.tip}
              </div>
              <div className="flex gap-3">
                {item.resources.map((res, i) => (
                  <a key={i} href={`https://www.youtube.com/results?search_query=${res}+${item.topic}`} target="_blank" className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl text-[10px] font-black text-slate-400 border border-slate-800 hover:text-white transition">
                    <Youtube size={14} className="text-red-500" /> {res}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillRoadmap;