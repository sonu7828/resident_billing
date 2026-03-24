import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Landmark, 
  Bell, 
  FileText, 
  Settings,
  X
} from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Residents', icon: Users, path: '/residents' },
  { name: 'Payments', icon: CreditCard, path: '/payments' },
  { name: 'Bank', icon: Landmark, path: '/bank' },
  { name: 'Reminders', icon: Bell, path: '/reminders' },
  { name: 'Reports', icon: FileText, path: '/reports' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      <div 
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-24 px-8 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-200">
              <span className="text-white font-bold text-lg leading-none">O</span>
            </div>
            <span className="text-2xl font-bold text-slate-800 tracking-tight">
              OPOS
            </span>
          </div>
          <button 
            className="p-2 text-slate-400 rounded-2xl hover:bg-slate-50 transition-colors lg:hidden active:bg-slate-100"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-5 py-4 space-y-2 overflow-y-auto">
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3.5 text-[15px] font-medium rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? 'text-indigo-700 bg-indigo-50/80 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_1px_2px_rgba(0,0,0,0.02)]'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {({ isActive }) => (
                <>
                  {/* Subtle active glow effect behind icon */}
                  {isActive && <div className="absolute left-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-full" />}
                  
                  <item.icon 
                    className={`w-5 h-5 mr-4 transition-transform duration-300 ${
                      isActive ? 'text-indigo-600 scale-110' : 'text-slate-400 group-hover:text-slate-500'
                    }`} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className="z-10">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
