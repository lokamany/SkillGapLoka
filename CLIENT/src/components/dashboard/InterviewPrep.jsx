import React, { useState } from 'react';
import { Play, Send, Award } from 'lucide-react';

const InterviewPrep = () => {
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Welcome! I am your AI Interviewer. Are you ready to start the technical round for Software Engineering?' }
  ]);

  const handleStart = () => setStarted(true);

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">AI Interview Simulator</h1>
        <p className="text-slate-400">Practice real-time technical and behavioral questions.</p>
      </header>

      {!started ? (
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-12 rounded-[3rem] text-center">
          <div className="bg-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20">
            <Play className="text-slate-900 fill-current" size={24} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Ready to start?</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">The session will last 10 minutes and cover Data Structures, System Design, and Soft Skills.</p>
          <button onClick={handleStart} className="bg-cyan-500 text-slate-900 px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-transform">
            Start Interview
          </button>
        </div>
      ) : (
        <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] overflow-hidden flex flex-col h-[600px]">
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'ai' ? 'bg-slate-800 text-slate-200' : 'bg-cyan-600 text-white'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-800/50 border-t border-slate-700 flex gap-4">
            <input type="text" placeholder="Type your answer..." className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 text-white outline-none focus:border-cyan-500" />
            <button className="bg-cyan-500 p-4 rounded-xl text-slate-900 hover:bg-cyan-400">
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPrep;