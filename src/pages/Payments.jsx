import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Search, 
  Calendar, 
  Download, 
  ArrowUpRight, 
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  Banknote,
  Globe,
  XCircle,
  FileX
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

export default function Payments() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy Payment Data
  const payments = [
    { id: 'PAY-001', residentId: '101', resident: 'Alice Smith', house: 'A1', amount: 500, date: 'Mar 15, 2026', method: 'Bank Transfer', status: 'Completed' },
    { id: 'PAY-002', residentId: '102', resident: 'Bob Jones', house: 'A2', amount: 1200, date: 'Mar 12, 2026', method: 'Cash', status: 'Completed' },
    { id: 'PAY-003', residentId: '103', resident: 'Charlie Brown', house: 'B1', amount: 300, date: 'Mar 10, 2026', method: 'Bank Transfer', status: 'Pending' },
    { id: 'PAY-004', residentId: '104', resident: 'Diana Prince', house: 'B2', amount: 1500, date: 'Mar 08, 2026', method: 'Online', status: 'Completed' },
    { id: 'PAY-005', residentId: '105', resident: 'Evan Wright', house: 'C1', amount: 800, date: 'Mar 05, 2026', method: 'Bank Transfer', status: 'Completed' },
  ];

  const getStatusBadge = (status) => {
    const base = "inline-flex items-center px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-[0.08em] shadow-sm border transition-all duration-300 gap-1.5 ";
    if (status === 'Completed') {
      return (
        <span className={base + "bg-emerald-50 text-emerald-700 border-emerald-100/50"}>
          <CheckCircle2 className="w-3.5 h-3.5" />
          {t('completed')}
        </span>
      );
    }
    return (
      <span className={base + "bg-amber-50 text-amber-700 border-amber-100/50"}>
        <Clock className="w-3.5 h-3.5" />
        {t('pending')}
      </span>
    );
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'Bank Transfer': return <Banknote className="w-4 h-4" />;
      case 'Cash': return <CreditCard className="w-4 h-4" />;
      case 'Online': return <Globe className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  const filteredPayments = payments.filter(p => 
    p.resident.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{t('paymentsHistory')}</h2>
          <p className="text-slate-500 text-[15px] mt-1.5 font-medium">Tracking all financial transactions across the system.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="inline-flex items-center px-6 py-3 bg-white border border-slate-200 rounded-[1.25rem] text-[15px] font-bold text-slate-700 hover:bg-slate-50 hover:shadow-md transition-all active:scale-95 group focus:ring-4 focus:ring-slate-100">
            <Download className="w-4 h-4 mr-2.5 text-slate-400 group-hover:translate-y-0.5 transition-transform" />
            {t('export')} CSV
          </button>
          <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-[1.25rem] text-[15px] font-bold text-white hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg hover:shadow-emerald-100 hover:-translate-y-0.5 transition-all active:scale-95 group focus:ring-4 focus:ring-emerald-100">
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" strokeWidth={3} />
            {t('recordPayment')}
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80 overflow-hidden flex flex-col transition-all duration-500">
        
        {/* Filters bar */}
        <div className="p-8 border-b border-slate-50 bg-white flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="relative w-full md:max-w-md group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-12 py-3.5 border border-slate-200 rounded-2xl leading-5 bg-slate-50/30 hover:bg-slate-50 font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 sm:text-sm transition-all duration-300"
              placeholder={t('searchPaymentsPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-slate-500 transition-colors"
              >
                <XCircle className="h-5 w-5" />
              </button>
            )}
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 transition-all hover:shadow-sm">
              <Calendar className="w-4 h-4 mr-2.5 text-slate-400" />
              {t('thisMonth')}
            </button>
            <button className="flex-1 md:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 transition-all hover:shadow-sm">
              <Filter className="w-4 h-4 mr-2.5 text-slate-400" />
              {t('moreFilters')}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {filteredPayments.length > 0 ? (
            <table className="min-w-full divide-y divide-slate-50">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">{t('idDate')}</th>
                  <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">{t('resident')}</th>
                  <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">{t('house')}</th>
                  <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">{t('method')}</th>
                  <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">{t('status')}</th>
                  <th className="px-10 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">{t('amount')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-emerald-50/10 transition-all duration-300 group">
                    <td className="px-10 py-6 whitespace-nowrap">
                      <div className="font-extrabold text-slate-700 text-[15px]">{payment.id}</div>
                      <div className="text-xs font-bold text-slate-400 mt-0.5">{payment.date}</div>
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap">
                      <button 
                        onClick={() => navigate(`/residents/${payment.residentId}`)}
                        className="font-extrabold text-slate-800 text-[16px] hover:text-emerald-600 hover:underline decoration-2 underline-offset-4 transition-all duration-200 cursor-pointer text-left"
                      >
                        {payment.resident}
                      </button>
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap">
                      <span className="text-[12px] font-black text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 uppercase tracking-widest">{payment.house}</span>
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-2.5 text-[14px] font-bold text-slate-600">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 group-hover:border-emerald-100 transition-all duration-300">
                          {getMethodIcon(payment.method)}
                        </div>
                        {payment.method}
                      </div>
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap text-right">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center justify-end gap-2 group-hover:translate-x-[-4px] transition-transform duration-300">
                          <div className="text-[18px] font-black text-emerald-600">
                            €{payment.amount.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1 opacity-60">
                          {t('appliedOutstanding')}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
             <div className="py-24 flex flex-col items-center justify-center text-center px-10">
              <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mb-6 border border-slate-100">
                <FileX className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">No transactions found</h3>
              <p className="text-slate-500 mt-2 max-w-xs font-medium">No payment records were found for the current period or search.</p>
            </div>
          )}
        </div>

        {/* Total Summary Footer */}
        <div className="px-10 py-8 bg-emerald-50/20 border-t border-emerald-100/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
             </div>
             <div>
                <p className="text-[11px] font-black text-emerald-700/60 uppercase tracking-[0.1em] leading-none mb-1">{t('reconciliationStatus')}</p>
                <p className="text-sm font-bold text-emerald-800">{t('allAllocated')}</p>
             </div>
          </div>
          <div className="flex items-center gap-8">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('totalReceived')}</span>
            <span className="text-4xl font-black text-slate-800 tracking-tighter">€4,500.00</span>
          </div>
        </div>

      </div>
    </div>
  );
}
