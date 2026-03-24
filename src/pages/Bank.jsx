import React, { useState } from 'react';
import { 
  Landmark, 
  Upload, 
  Search, 
  XCircle, 
  CheckCircle2, 
  AlertCircle, 
  UserPlus, 
  ExternalLink 
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

export default function Bank() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy data
  const [transactions, setTransactions] = useState([
    { id: 1001, date: '2026-03-22', description: 'RENT - Alice Smith', amount: 1200, status: 'Matched', suggestedResident: 'Alice Smith' },
    { id: 1002, date: '2026-03-21', description: 'BANK FEE - Monthly Maintenance', amount: -15, status: 'Unmatched', suggestedResident: null },
    { id: 1003, date: '2026-03-20', description: 'TRANSFER HOUSE B1 - Charlie Brown', amount: 1500, status: 'Unmatched', suggestedResident: 'Charlie Brown' },
    { id: 1004, date: '2026-03-19', description: 'PAYMENT FROM BOB JONES', amount: 1200, status: 'Matched', suggestedResident: 'Bob Jones' },
    { id: 1005, date: '2026-03-18', description: 'RENT CHARGE D14 - Evan Wright', amount: 1000, status: 'Unmatched', suggestedResident: 'Evan Wright' },
  ]);

  const handleConfirmMatch = (id) => {
    setTransactions(transactions.map(t => 
      t.id === id ? { ...t, status: 'Matched' } : t
    ));
  };

  const filteredTransactions = transactions.filter(t => 
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const base = "inline-flex items-center px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-[0.08em] shadow-sm border transition-all duration-300 ";
    if (status === 'Matched') {
      return <span className={base + "bg-emerald-50 text-emerald-700 border-emerald-100/50"}><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> {t('matched')}</span>;
    }
    return <span className={base + "bg-amber-50 text-amber-700 border-amber-100/50"}><AlertCircle className="w-3.5 h-3.5 mr-1" /> {t('unmatched')}</span>;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{t('bankTransactions')}</h2>
          <p className="text-slate-500 text-[15px] mt-1.5 font-medium">Reconcile and import transactions from statements.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="inline-flex items-center px-5 py-3 bg-white border border-slate-200 rounded-[1.25rem] text-[14px] font-bold text-slate-700 hover:bg-slate-50 hover:shadow-md transition-all active:scale-95 group focus:ring-4 focus:ring-slate-100">
            <Upload className="w-4 h-4 mr-2 text-slate-400 group-hover:text-slate-800 transition-colors" />
            {t('upload')} CSV
          </button>
          <button className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-[1.25rem] text-[14px] font-bold text-white hover:from-cyan-700 hover:to-blue-700 shadow-lg shadow-cyan-100 hover:-translate-y-0.5 transition-all active:scale-95 group focus:ring-4 focus:ring-cyan-100">
            <ExternalLink className="w-4 h-4 mr-2" />
            {t('connectBank')}
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80 overflow-hidden flex flex-col transition-all duration-500">
        
        {/* Filters / Search */}
        <div className="p-8 border-b border-slate-50 bg-white flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="relative w-full md:max-w-md group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-300 group-focus-within:text-cyan-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-12 py-3.5 border border-slate-200 rounded-2xl leading-5 bg-slate-50/30 hover:bg-slate-50 font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-400 sm:text-sm transition-all duration-300"
              placeholder={t('searchBankPlaceholder')}
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
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {filteredTransactions.length > 0 ? (
            <table className="min-w-full divide-y divide-slate-50">
              <thead className="bg-slate-50/50">
                <tr>
                  <th scope="col" className="px-8 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] w-32">{t('date')}</th>
                  <th scope="col" className="px-8 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">{t('details')}</th>
                  <th scope="col" className="px-8 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] w-32">{t('amount')}</th>
                  <th scope="col" className="px-8 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] w-32">{t('status')}</th>
                  <th scope="col" className="px-8 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] w-48">{t('matchAction')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredTransactions.map((tx) => (
                  <tr 
                    key={tx.id} 
                    className="hover:bg-indigo-50/30 border-b border-slate-50/80 transition-all duration-300 group cursor-default"
                  >
                    <td className="px-8 py-6 whitespace-nowrap text-[13px] font-bold text-slate-500">
                      {tx.date}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-slate-800 text-[15px] max-w-sm truncate group-hover:text-indigo-600 transition-colors">
                          {tx.description}
                        </span>
                        {tx.suggestedResident && (
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[11px] font-bold text-slate-400/80">Resident:</span>
                            <span className="text-[12px] font-black text-indigo-500/90">{tx.suggestedResident}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className={`text-[15px] font-black ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-700'}`}>
                        {tx.amount > 0 ? '+' : ''}€{Math.abs(tx.amount).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      {getStatusBadge(tx.status)}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-right">
                      {tx.status === 'Unmatched' ? (
                        <div className="flex items-center justify-end">
                          <button 
                            onClick={() => handleConfirmMatch(tx.id)}
                            title="Match this transaction"
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-[0.85rem] text-[11px] font-black uppercase tracking-wider shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            {t('confirmMatch')}
                          </button>
                        </div>
                      ) : (
                        <div className="text-right flex items-center justify-end">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500/80" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center px-10">
              <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-300 mb-6 border border-slate-100">
                <Landmark className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">No transactions found</h3>
              <p className="text-slate-500 mt-2 max-w-xs font-medium">We couldn't find any bank transactions matching your current search.</p>
            </div>
          )}
        </div>
        
        {/* Pagination Footer (Placeholder for show) */}
        <div className="px-10 py-8 border-t border-slate-50 bg-slate-50/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Showing <span className="text-slate-800">1 to {filteredTransactions.length}</span> of <span className="text-slate-800">{filteredTransactions.length}</span> transactions</span>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 border border-slate-200 bg-white text-slate-400 rounded-[1.25rem] text-sm font-bold opacity-50 cursor-not-allowed shadow-sm transition-all">Previous</button>
            <button className="px-6 py-2.5 border border-slate-200 bg-white text-slate-400 rounded-[1.25rem] text-sm font-bold opacity-50 cursor-not-allowed shadow-sm transition-all">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
