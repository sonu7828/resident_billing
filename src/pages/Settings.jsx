import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-50/80 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 p-8 sm:p-10 h-full min-h-[60vh]">
      <div className="flex items-center gap-5 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-white text-slate-600 flex items-center justify-center shadow-sm shadow-slate-200/50">
          <SettingsIcon className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Settings</h2>
          <p className="text-slate-500 font-medium mt-1.5 flex items-center gap-2">Configure system preferences</p>
        </div>
      </div>
      
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white h-64 flex items-center justify-center">
        <p className="text-slate-400 font-semibold uppercase tracking-widest">Settings Interface Placeholder</p>
      </div>
    </div>
  );
}
