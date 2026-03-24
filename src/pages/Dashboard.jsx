import React from 'react';
import { 
  Users, 
  TrendingUp, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  PlusCircle,
  Clock,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';

export default function Dashboard() {
  const summaryCards = [
    { 
      title: 'Total Outstanding', 
      value: '€12,450', 
      trend: '+12.5%', 
      icon: AlertCircle, 
      color: 'rose',
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'border-rose-100'
    },
    { 
      title: 'Received (Monthly)', 
      value: '€8,200', 
      trend: '+8.2%', 
      icon: TrendingUp, 
      color: 'emerald',
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100'
    },
    { 
      title: 'Overdue Residents', 
      value: '14', 
      trend: '-2 residents', 
      icon: Users, 
      color: 'amber',
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100'
    },
  ];

  const recentActivity = [
    { id: 1, type: 'Payment', resident: 'Alice Smith', amount: '€500', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'Charge', resident: 'System', amount: '€1,200', time: '5 hours ago', status: 'info' },
    { id: 3, type: 'Payment', resident: 'Bob Jones', amount: '€1,200', time: '1 day ago', status: 'success' },
    { id: 4, type: 'New Resident', resident: 'Charlie Brown', amount: '-', time: '2 days ago', status: 'active' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">Dashboard</h2>
          <p className="text-slate-500 text-lg mt-1.5 font-medium">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="inline-flex items-center px-6 py-3.5 bg-white border border-slate-200 rounded-[1.25rem] text-[15px] font-bold text-slate-700 hover:bg-slate-50 hover:shadow-md transition-all active:scale-95 group focus:ring-4 focus:ring-slate-100">
            <Plus className="w-5 h-5 mr-2.5 text-slate-400 group-hover:text-slate-800 transition-colors" />
            Add Resident
          </button>
          <button className="inline-flex items-center px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-[1.25rem] text-[15px] font-bold text-white hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-100 hover:-translate-y-0.5 transition-all active:scale-95 group focus:ring-4 focus:ring-indigo-100">
            <PlusCircle className="w-5 h-5 mr-2.5 group-hover:rotate-90 transition-transform duration-300" strokeWidth={3} />
            Add Payment
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {summaryCards.map((card, idx) => (
          <div 
            key={idx} 
            className={`bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80 group hover:-translate-y-2 transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/40 relative overflow-hidden`}
          >
            <div className="flex items-start justify-between relative z-10">
              <div className={`p-4 rounded-[1.5rem] ${card.bg} ${card.text} border ${card.border} transition-transform group-hover:scale-110 duration-500`}>
                <card.icon className="w-8 h-8" />
              </div>
              <div className={`flex items-center gap-1.5 text-sm font-black ${card.text} bg-white shadow-sm px-3 py-1.5 rounded-xl border ${card.border}`}>
                {card.trend}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-8 relative z-10">
              <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{card.title}</h3>
              <p className="text-4xl font-black text-slate-800 tracking-tighter">{card.value}</p>
            </div>
            {/* Background Accent */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${card.bg} rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700`}></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 flex flex-col min-h-[450px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Revenue Overview</h3>
              <p className="text-[15px] font-medium text-slate-500 mt-1">Monthly collection vs outstanding.</p>
            </div>
            <select className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-slate-100 transition-all cursor-pointer">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex-1 rounded-[2rem] bg-gradient-to-br from-slate-50/50 to-slate-100/20 border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 group">
             <div className="w-20 h-20 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <LayoutDashboard className="w-10 h-10 text-slate-200" />
             </div>
             <p className="text-lg font-black text-slate-400 tracking-wide uppercase">Chart Visualization Pending</p>
             <p className="text-[13px] font-bold text-slate-400 mt-2">Data rendering will be implemented in Phase 2</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Activity</h3>
            <button className="text-[13px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest hover:underline transition-all">View All</button>
          </div>
          <div className="space-y-4 flex-1">
            {recentActivity.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-center gap-5 p-4 rounded-[1.75rem] bg-white border border-slate-50 hover:bg-slate-50/80 hover:border-slate-100 hover:shadow-sm transition-all duration-300 group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                  activity.type === 'Payment' ? 'bg-emerald-50 text-emerald-500' : 
                  activity.type === 'Charge' ? 'bg-indigo-50 text-indigo-500' : 'bg-amber-50 text-amber-500'
                }`}>
                  {activity.type === 'Payment' ? <ArrowDownRight className="w-6 h-6" /> : 
                   activity.type === 'Charge' ? <ArrowUpRight className="w-6 h-6" /> : <Users className="w-6 h-6" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-extrabold text-slate-800 truncate text-[15px]">{activity.resident}</p>
                    <p className="font-black text-slate-800 text-[15px]">{activity.amount}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-300" />
                    <p className="text-[12px] font-bold text-slate-400">{activity.time}</p>
                    <span className="text-slate-200">/</span>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{activity.type}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-slate-400 transition-colors" />
              </div>
            ))}
          </div>
          
          {/* Quick Stats Footer */}
          <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
             <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Success Rate</p>
                <p className="text-lg font-black text-emerald-600">98.2%</p>
             </div>
             <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Alerts</p>
                <p className="text-lg font-black text-rose-500">03</p>
             </div>
             <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg Resolution</p>
                <p className="text-lg font-black text-indigo-500">4.5h</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
