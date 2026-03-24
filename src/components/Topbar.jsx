import { Menu, UserCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Topbar({ onMenuClick }) {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="flex items-center justify-between h-20 px-4 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sm:px-6 lg:px-8 z-10 sticky top-0">
      <div className="flex items-center flex-1">
        <button
          type="button"
          className="p-2 -ml-2 mr-4 text-slate-500 rounded-xl lg:hidden hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={onMenuClick}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>
        <h1 className="text-xl font-semibold text-slate-800 tracking-tight truncate">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center ml-4 gap-4">
        {/* Language Toggle */}
        <div className="flex bg-slate-100/80 p-0.5 rounded-xl border border-slate-100/50 text-[11px] font-black tracking-wider">
          <button 
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1.5 rounded-lg transition-all ${language === 'en' ? 'bg-white text-indigo-600 shadow-sm border border-slate-100/20 font-extrabold' : 'text-slate-400 hover:text-slate-600 font-bold'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLanguage('de')}
            className={`px-2.5 py-1.5 rounded-lg transition-all ${language === 'de' ? 'bg-white text-indigo-600 shadow-sm border border-slate-100/20 font-extrabold' : 'text-slate-400 hover:text-slate-600 font-bold'}`}
          >
            DE
          </button>
        </div>

        {/* User Profile Placeholder */}
        <button className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 group transition-all hover:ring-2 hover:ring-indigo-500/30">
          <span className="sr-only">Open user menu</span>
          <UserCircle className="w-9 h-9 text-slate-300 group-hover:text-slate-400 transition-colors" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
