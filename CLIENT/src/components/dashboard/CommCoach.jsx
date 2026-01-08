import React, { useState, useEffect, useRef } from 'react';
import { Mic, Youtube, AlertCircle, RefreshCw, Volume2, Sparkles, TrendingUp } from 'lucide-react';

const CommCoach = () => {
  const [status, setStatus] = useState('idle'); 
  const [transcript, setTranscript] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([
    { date: '2026-01-08', score: 85, duration: '42s' }
  ]);
  
  const recognitionRef = useRef(null);
  const synthRef = window.speechSynthesis;

  // 1. Initialize Ears (Speech Recognition)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let current = "";
        for (let i = 0; i < event.results.length; i++) {
          current += event.results[i][0].transcript;
        }
        setTranscript(current);

        // TRIGGER PHRASE DETECTION
        if (current.toLowerCase().includes("over to you")) {
          handleTriggerFinish();
        }
      };
    }
  }, []);

  // 2. AI Mouth Logic
  const aiSpeak = (text, nextStatus) => {
    synthRef.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1; 
    utterance.onend = () => {
      if (nextStatus === 'listening') startListening();
      else setStatus(nextStatus);
    };
    setStatus('ai-speaking');
    synthRef.speak(utterance);
  };

  const startListening = () => {
    setTranscript("");
    setStatus('listening');
    try {
      recognitionRef.current.start();
    } catch (e) { console.log("Mic ready"); }
  };

  const handleStart = () => {
    aiSpeak("Hello. I'm ready. Describe your background and say 'Over to you' when you're done.", 'listening');
  };

  const handleTriggerFinish = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    
    // Validate duration (approx 30s check)
    if (transcript.split(" ").length < 20) {
      aiSpeak("That was too short. Try to speak for at least 30 seconds for a better score.", 'listening');
      return;
    }

    setStatus('analyzing');
    setTimeout(() => {
      const score = Math.floor(Math.random() * (96 - 78 + 1)) + 78;
      const result = {
        score,
        tips: ["Good energy.", "Clear keywords.", "Smooth hand-off to AI."],
        youtube: ["Public Speaking", "Interview Skills"]
      };
      
      setAnalysis(result);
      setHistory(prev => [{
        date: new Date().toLocaleDateString(),
        score,
        duration: '45s'
      }, ...prev]);

      aiSpeak(`Analysis complete. You scored ${score} percent.`, 'result');
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20 p-6">
      <style>{`
        @keyframes wave { 0%, 100% { height: 8px; } 50% { height: 40px; } }
        .animate-wave { animation: wave 0.7s ease-in-out infinite; }
      `}</style>

      <h1 className="text-3xl font-black text-white flex items-center gap-3 italic">
        <Sparkles className="text-cyan-400" /> Comm Coach
      </h1>

      <div className="grid grid-cols-1 gap-8">
        {status === 'idle' && (
          <div className="bg-slate-900/40 border border-slate-800 p-16 rounded-[3rem] text-center">
            <Volume2 className="text-cyan-400 mx-auto mb-6" size={48} />
            <h2 className="text-2xl font-bold text-white mb-8">AI Conversation Mode</h2>
            <button onClick={handleStart} className="bg-cyan-500 text-slate-900 px-14 py-4 rounded-2xl font-black text-lg">
              Start Session
            </button>
          </div>
        )}

        {(status === 'ai-speaking' || status === 'listening') && (
          <div className="bg-slate-950 border-2 border-slate-800 p-12 rounded-[3.5rem] text-center">
            {status === 'ai-speaking' ? (
              <div className="flex flex-col items-center">
                <div className="flex gap-2 h-10 mb-4">
                   {[...Array(5)].map((_, i) => <div key={i} className="w-1.5 bg-cyan-400 rounded-full animate-wave" style={{animationDelay: `${i*0.1}s`}}></div>)}
                </div>
                <p className="text-cyan-400 font-black uppercase text-xs">AI is Speaking...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-2xl text-slate-300 italic">"{transcript || "I'm listening..."}"</p>
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest italic">Say "Over to you" to stop</p>
              </div>
            )}
          </div>
        )}

        {status === 'result' && analysis && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in zoom-in">
            <div className="bg-cyan-500/5 border border-cyan-500/20 p-8 rounded-[2.5rem]">
              <div className="text-5xl font-black text-cyan-400 mb-2">{analysis.score}%</div>
              <p className="text-slate-500 text-[10px] font-black uppercase mb-6">Session Score</p>
              <div className="space-y-3">
                {analysis.tips.map((tip, i) => (
                  <div key={i} className="text-sm text-slate-300 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    • {tip}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8">
               <button onClick={() => setStatus('idle')} className="w-full py-4 bg-white text-black rounded-xl font-black uppercase text-xs">Try Again</button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-900/20 border border-slate-800 rounded-[3rem] p-10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-8">
          <TrendingUp className="text-cyan-400" size={20}/> History
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {history.map((item, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem]">
              <div className="text-[10px] font-black text-slate-600 uppercase mb-2">{item.date}</div>
              <div className="text-2xl font-black text-white">{item.score}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// IMPORTANT: DO NOT REMOVE THIS LINE
export default CommCoach;