import React from 'react';
import { FileText } from 'lucide-react';

export default function Reports() {
  return (
    <div className="bg-gradient-to-br from-rose-50 to-pink-50/50 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-rose-100/50 p-8 sm:p-10 h-full min-h-[60vh]">
      <div className="flex items-center gap-5 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-white text-rose-500 flex items-center justify-center shadow-sm shadow-rose-100/50">
          <FileText className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Financial Reports</h2>
          <p className="text-rose-900/60 font-medium mt-1.5 flex items-center gap-2">Export and analyze data</p>
        </div>
      </div>
      
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white h-64 flex items-center justify-center">
        <p className="text-rose-800/40 font-semibold uppercase tracking-widest">Reports Module Placeholder</p>
      </div>
    </div>
  );
}
