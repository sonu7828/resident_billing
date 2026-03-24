import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Bell, 
  Home, 
  Wallet, 
  CreditCard,
  AlertCircle,
  FileText,
  ArrowDownRight,
  ArrowUpRight
} from 'lucide-react';

export default function ResidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy resident data
  const resident = {
    id: id || '102',
    name: 'Bob Jones',
    house: 'A2',
    monthlyCharge: 1200,
    status: 'Overdue'
  };

  // Dummy summary totals
  const summary = {
    totalCharged: 3600,
    totalPaid: 1800,
    outstanding: 1800
  };

  // Dummy ledger data (Charges = positive, Payments = negative)
  const ledger = [
    { id: 1, date: 'Mar 01, 2026', type: 'Charge', description: 'March Rent', amount: 1200, paid: 0, balance: 1200, status: 'Overdue' },
    { id: 2, date: 'Feb 05, 2026', type: 'Payment', description: 'Bank Transfer', amount: -600, paid: null, balance: null, status: 'Completed' },
    { id: 3, date: 'Feb 01, 2026', type: 'Charge', description: 'February Rent', amount: 1200, paid: 600, balance: 600, status: 'Partial' },
    { id: 4, date: 'Jan 05, 2026', type: 'Payment', description: 'Bank Transfer', amount: -1200, paid: null, balance: null, status: 'Completed' },
    { id: 5, date: 'Jan 01, 2026', type: 'Charge', description: 'January Rent', amount: 1200, paid: 1200, balance: 0, status: 'Paid' },
  ];

  const getStatusBadge = (status) => {
    const base = "inline-flex items-center px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-[0.08em] shadow-sm border transition-all duration-300 ";
    switch (status) {
      case 'Paid':
      case 'Completed':
        return <span className={base + "bg-emerald-50 text-emerald-700 border-emerald-100/50"}>{status}</span>;
      case 'Partial':
        return <span className={base + "bg-amber-50 text-amber-700 border-amber-100/50"}>{status}</span>;
      case 'Overdue':
        return <span className={base + "bg-rose-50 text-rose-700 border-rose-100/50"}>{status}</span>;
      default:
        return <span className={base + "bg-slate-50 text-slate-600 border-slate-100/50"}>{status}</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <button 
            onClick={() => navigate('/residents')} 
            className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-800 hover:bg-slate-50 hover:shadow-md transition-all active:scale-90 focus:ring-4 focus:ring-slate-100"
            title="Back to Residents"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">{resident.name}</h2>
              {getStatusBadge(resident.status)}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-500">
              <div className="flex items-center gap-2 bg-slate-100/80 px-4 py-2 rounded-2xl text-slate-700 border border-slate-200 shadow-sm">
                <Home className="w-4 h-4 text-slate-400" /> 
                House {resident.house}
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm text-slate-600">
                <Wallet className="w-4 h-4 text-slate-300" />
                €{resident.monthlyCharge.toLocaleString()} / month
              </div>
              <div className="text-slate-400/60 uppercase tracking-widest text-[11px] font-black pl-2">ID: {resident.id}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="inline-flex items-center px-6 py-3 bg-white border border-slate-200 rounded-[1.25rem] text-[15px] font-bold text-slate-700 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-all active:scale-95 group focus:ring-4 focus:ring-amber-50">
            <Bell className="w-5 h-5 mr-2.5 text-slate-300 group-hover:text-amber-500" />
            Send Reminder
          </button>
          <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[1.25rem] text-[15px] font-bold text-white hover:from-emerald-600 hover:to-teal-600 shadow-sm shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-100 transition-all active:scale-95 group focus:ring-4 focus:ring-emerald-50">
            <Plus className="w-5 h-5 mr-2.5 group-hover:rotate-90 transition-transform" strokeWidth={3} />
            Add Payment
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Charged */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100/80 flex items-center gap-6 group hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
          <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-100 shadow-inner group-hover:text-indigo-500 transition-colors">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Charged</p>
            <p className="text-3xl font-black text-slate-800">€{summary.totalCharged.toLocaleString()}</p>
          </div>
        </div>

        {/* Total Paid */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100/80 flex items-center gap-6 group hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
          <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-50 text-emerald-400 flex items-center justify-center border border-emerald-100 shadow-inner group-hover:text-emerald-500 transition-colors">
            <CreditCard className="w-8 h-8" />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Paid</p>
            <p className="text-3xl font-black text-slate-800">€{summary.totalPaid.toLocaleString()}</p>
          </div>
        </div>

        {/* Outstanding Balance (Highlighted) */}
        <div className="bg-gradient-to-br from-rose-50 to-orange-50/50 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(225,29,72,0.06)] border border-rose-100/60 flex items-center gap-6 group hover:-translate-y-1 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-125 transition-transform duration-700"></div>
          <div className="w-16 h-16 rounded-[1.5rem] bg-white text-rose-500 flex items-center justify-center shadow-lg shadow-rose-200/50 z-10 transition-transform group-hover:scale-110">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="z-10">
            <p className="text-[11px] font-black text-rose-800/60 uppercase tracking-[0.2em] mb-1">Current Balance</p>
            <p className="text-4xl font-black text-rose-600 tracking-tighter">€{summary.outstanding.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Ledger Table Section */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Ledger <span className="text-slate-300 font-medium px-2">—</span> <span className="text-indigo-600 uppercase text-xs tracking-[0.2em]">Open Item Model</span></h3>
            <p className="text-[15px] font-medium text-slate-500 mt-1.5 focus-visible:outline-none">Audit history of charges and payments.</p>
          </div>
          <div className="flex gap-2.5 p-1.5 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
            <button className="px-6 py-2.5 bg-white text-slate-800 rounded-xl text-sm font-black shadow-sm border border-slate-200/50 transition-all">Ledger</button>
            <button className="px-6 py-2.5 bg-transparent text-slate-400 hover:text-slate-800 rounded-xl text-sm font-bold transition-all">Payments</button>
            <button className="px-6 py-2.5 bg-transparent text-slate-400 hover:text-slate-800 rounded-xl text-sm font-bold transition-all">Notes</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-50">
            <thead className="bg-slate-50/50">
              <tr>
                <th scope="col" className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Date</th>
                <th scope="col" className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Type / Detail</th>
                <th scope="col" className="px-10 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Amount</th>
                <th scope="col" className="px-10 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Paid</th>
                <th scope="col" className="px-10 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Balance</th>
                <th scope="col" className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 border-b border-slate-100">
              {ledger.map((row) => (
                <tr key={row.id} className="hover:bg-indigo-50/10 transition-all duration-300 group">
                  <td className="px-10 py-6 whitespace-nowrap">
                    <div className="text-[15px] font-bold text-slate-600">{row.date}</div>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all duration-300 ${row.type === 'Charge' ? 'bg-indigo-50 text-indigo-500 border-indigo-100 group-hover:rotate-6' : 'bg-emerald-50 text-emerald-500 border-emerald-100 group-hover:-rotate-6'}`}>
                        {row.type === 'Charge' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-800 text-[16px]">{row.type}</div>
                        <div className="text-[12px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{row.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap text-right">
                    <div className={`text-[17px] font-black ${row.amount > 0 ? 'text-slate-800' : 'text-emerald-600'}`}>
                      {row.amount > 0 ? '' : '-'}€{Math.abs(row.amount).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap text-right">
                    <div className="text-[16px] font-bold text-slate-600">
                      {row.paid !== null ? `€${row.paid.toLocaleString()}` : '—'}
                    </div>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap text-right bg-slate-50/20 group-hover:bg-transparent transition-colors">
                    <div className={`text-[17px] font-black ${row.balance > 0 ? 'text-rose-600' : 'text-slate-300'}`}>
                      {row.balance !== null ? `€${row.balance.toLocaleString()}` : '—'}
                    </div>
                    {row.balance > 0 && <div className="text-[9px] font-black text-rose-300 uppercase tracking-widest leading-none mt-1">Due now</div>}
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap pl-10">
                    {getStatusBadge(row.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
