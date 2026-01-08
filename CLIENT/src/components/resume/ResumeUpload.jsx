import React from 'react';

export const ResumeUpload = ({ onUpload }) => {
  const handleFileChange = (e) => {
    // Access the first file in the selection
    const file = e.target.files[0];
    
    // Only proceed if a file exists and it is a PDF
    if (file && file.type === "application/pdf") {
      onUpload(file);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-2xl cursor-pointer bg-slate-800/50 hover:bg-slate-800 hover:border-cyan-500/50 transition-all">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-10 h-10 mb-3 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="mb-2 text-sm text-slate-300">
            <span className="font-bold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-black">PDF Only</p>
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept=".pdf" 
          onChange={handleFileChange} 
        />
      </label>
    </div>
  );
};