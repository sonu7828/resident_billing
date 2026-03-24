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
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { useLanguage } from '../context/LanguageContext';

export default function Dashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const summaryCards = [
    { 
      title: 'outstandingBalance', 
      value: '€12,450', 
      trend: '+12.5%', 
      icon: AlertCircle, 
      color: 'rose',
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'border-rose-100'
    },
    { 
      title: 'totalReceived', 
      value: '€8,200', 
      trend: '+8.2%', 
      icon: TrendingUp, 
      color: 'emerald',
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100'
    },
    { 
      title: 'overdueResidents', 
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
    { id: 1, type: 'Payment', resident: 'Alice Smith', amount: '€500', time: '2 hours ago', status: 'success', residentId: '101' },
    { id: 2, type: 'Charge', resident: 'System', amount: '€1,200', time: '5 hours ago', status: 'info', residentId: null },
    { id: 3, type: 'Payment', resident: 'Bob Jones', amount: '€1,200', time: '1 day ago', status: 'success', residentId: '102' },
    { id: 4, type: 'New Resident', resident: 'Charlie Brown', amount: '-', time: '2 days ago', status: 'active', residentId: '103' },
  ];

  const chartData = [
    { month: 'Oct', collection: 4200, outstanding: 2100 },
    { month: 'Nov', collection: 3800, outstanding: 1800 },
    { month: 'Dec', collection: 5100, outstanding: 2400 },
    { month: 'Jan', collection: 4600, outstanding: 1900 },
    { month: 'Feb', collection: 5400, outstanding: 1500 },
    { month: 'Mar', collection: 6200, outstanding: 1200 },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">{t('dashboard')}</h2>
          <p className="text-slate-500 text-lg mt-1.5 font-medium">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/residents')}
            className="inline-flex items-center px-6 py-3.5 bg-slate-100 border border-transparent rounded-[1.25rem] text-[15px] font-bold text-slate-700 hover:bg-slate-200 transition-all active:scale-95 group focus:ring-4 focus:ring-slate-100"
          >
            <Plus className="w-5 h-5 mr-2.5 text-slate-500 group-hover:text-slate-800 transition-colors" />
            {t('addResident')}
          </button>
          <button 
            onClick={() => navigate('/payments')}
            className="inline-flex items-center px-6 py-3.5 bg-violet-600 rounded-[1.25rem] text-[15px] font-bold text-white hover:bg-violet-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95 group focus:ring-4 focus:ring-violet-100"
          >
            <PlusCircle className="w-5 h-5 mr-2.5 group-hover:rotate-90 transition-transform duration-300" strokeWidth={3} />
            {t('addPayment')}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {summaryCards.map((card, idx) => (
          <div 
            key={idx} 
            className={`${card.bg} rounded-[2.5rem] p-8 shadow-sm border ${card.border} group hover:-translate-y-2 transition-all duration-500 hover:shadow-md relative overflow-hidden`}
          >
            <div className="flex items-start justify-between relative z-10">
              <div className={`p-4 rounded-[1.5rem] bg-white ${card.text} shadow-sm transition-transform group-hover:scale-110 duration-500 border border-slate-100/50`}>
                <card.icon className="w-8 h-8" />
              </div>
              <div className={`flex items-center gap-1.5 text-sm font-black text-slate-700 bg-white/80 shadow-sm px-3 py-1.5 rounded-xl border border-white`}>
                {card.trend}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-8 relative z-10">
              <h3 className={`text-[13px] font-black ${card.text} opacity-80 uppercase tracking-[0.2em] mb-2`}>{t(card.title)}</h3>
              <p className="text-4xl font-black text-slate-800 tracking-tighter">{card.value}</p>
            </div>
            {/* Background Accent */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-white rounded-full blur-2xl opacity-40 group-hover:scale-150 transition-transform duration-700`}></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real Chart */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 flex flex-col min-h-[480px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">{t('revenueOverview')}</h3>
              <p className="text-[15px] font-medium text-slate-500 mt-1">Monthly collection vs outstanding.</p>
            </div>
            <select className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-slate-100 transition-all cursor-pointer">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex-1 w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }}
                  itemStyle={{ fontWeight: 800, fontSize: '13px' }}
                />
                <Bar 
                  dataKey="collection" 
                  fill="url(#colorCollection)" 
                  radius={[6, 6, 0, 0]} 
                  barSize={32}
                />
                <Bar 
                  dataKey="outstanding" 
                  fill="#e2e8f0" 
                  radius={[6, 6, 0, 0]} 
                  barSize={32}
                />
                <defs>
                  <linearGradient id="colorCollection" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={1}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={1}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-violet-600"></div>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{t('totalReceived')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{t('outstanding')}</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">{t('activity')}</h3>
            <button 
              onClick={() => navigate('/payments')}
              className="text-[13px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest hover:underline transition-all"
            >
              {t('viewAll')}
            </button>
          </div>
          <div className="space-y-4 flex-1">
            {recentActivity.map((activity) => (
              <div 
                key={activity.id} 
                onClick={() => activity.residentId && navigate(`/residents/${activity.residentId}`)}
                className={`flex items-center gap-5 p-4 rounded-[1.75rem] border border-slate-50 hover:bg-slate-50/80 hover:border-slate-100 hover:shadow-sm transition-all duration-300 group ${activity.residentId ? 'cursor-pointer' : 'cursor-default'}`}
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
