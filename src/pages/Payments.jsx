import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { residents } from '../data/mockData';

export default function Payments() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const [paymentsState, setPaymentsState] = useState([
    { id: 'PAY-001', residentId: '101', resident: 'Alice Smith', house: 'A1', amount: 500, date: '2026-03-15', method: 'Bank Transfer', status: 'Completed' },
    { id: 'PAY-002', residentId: '102', resident: 'Bob Jones', house: 'A2', amount: 1200, date: '2026-03-12', method: 'Cash', status: 'Completed' },
    { id: 'PAY-003', residentId: '103', resident: 'Charlie Brown', house: 'B1', amount: 300, date: '2026-03-10', method: 'Bank Transfer', status: 'Pending' },
    { id: 'PAY-004', residentId: '104', resident: 'Diana Prince', house: 'B2', amount: 1500, date: '2026-03-08', method: 'Online', status: 'Completed' },
    { id: 'PAY-005', residentId: '105', resident: 'Evan Wright', house: 'C1', amount: 800, date: '2026-03-05', method: 'Bank Transfer', status: 'Completed' },
  ]);

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'All',
    method: 'All',
    house: 'All',
    thisMonthOnly: false
  });

  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    residentId: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    method: 'Bank Transfer',
    status: 'Completed'
  });

  // Handle autofill from navigation state
  useEffect(() => {
    if (location.state?.residentId) {
      setNewPayment(prev => ({ ...prev, residentId: location.state.residentId }));
      setIsRecordModalOpen(true);
    }
  }, [location.state?.residentId]); // Refined dependency

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Resident', 'House', 'Method', 'Status', 'Amount'];
    const rows = filteredPayments.map(p => [
      p.id, p.date, p.resident, p.house, p.method, p.status, p.amount
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `payments_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRecordPayment = (e) => {
    e.preventDefault();
    const resident = residents.find(r => r.id === newPayment.residentId);
    if (!resident) return;

    const paymentToAdd = {
      ...newPayment,
      id: `PAY-${Math.floor(Math.random() * 900 + 100)}`,
      resident: resident.name,
      house: resident.house,
      amount: parseFloat(newPayment.amount)
    };

    setPaymentsState([paymentToAdd, ...paymentsState]);
    setIsRecordModalOpen(false);
    setNewPayment({
      residentId: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      method: 'Bank Transfer',
      status: 'Completed'
    });
  };

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
      case 'Cash': return <Banknote className="w-4 h-4" />; 
      case 'Online': return <Globe className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  const filteredPayments = paymentsState.filter(p => {
    const matchesSearch = p.resident.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'All' || p.status === filters.status;
    const matchesMethod = filters.method === 'All' || p.method === filters.method;
    const matchesHouse = filters.house === 'All' || p.house === filters.house;
    
    let matchesMonth = true;
    if (filters.thisMonthOnly) {
      // Parse date parts directly to avoid UTC timezone offset issues
      const [year, month] = p.date.split('-').map(Number);
      const now = new Date();
      matchesMonth = month - 1 === now.getMonth() && year === now.getFullYear();
    }

    return matchesSearch && matchesStatus && matchesMethod && matchesHouse && matchesMonth;
  });

  const isAnyFilterActive = searchTerm || filters.status !== 'All' || filters.method !== 'All' || filters.house !== 'All' || filters.thisMonthOnly;

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilters({ status: 'All', method: 'All', house: 'All', thisMonthOnly: false });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{t('paymentsHistory')}</h2>
          <p className="text-slate-500 text-[15px] mt-1.5 font-medium">Tracking all financial transactions across the system.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleExportCSV}
            className="inline-flex items-center px-6 py-3 bg-white border border-slate-200 rounded-[1.25rem] text-[15px] font-bold text-slate-700 hover:bg-slate-50 hover:shadow-md transition-all active:scale-95 group focus:ring-4 focus:ring-slate-100"
          >
            <Download className="w-4 h-4 mr-2.5 text-slate-400 group-hover:translate-y-0.5 transition-transform" />
            {t('export')} CSV
          </button>
          <button 
            onClick={() => setIsRecordModalOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-violet-600 rounded-[1.25rem] text-[15px] font-bold text-white hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200 hover:-translate-y-0.5 transition-all active:scale-95 group focus:ring-4 focus:ring-violet-100"
          >
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" strokeWidth={3} />
            {t('recordPayment')}
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80 overflow-hidden flex flex-col transition-all duration-500">
        
        {/* Filters bar */}
        <div className="p-8 border-b border-slate-50 bg-white space-y-6">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
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
              <button 
                onClick={() => setFilters(f => ({ ...f, thisMonthOnly: !f.thisMonthOnly }))}
                className={`flex-1 md:w-auto inline-flex items-center justify-center px-6 py-3.5 border rounded-2xl text-[13px] font-bold transition-all hover:shadow-sm ${filters.thisMonthOnly ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-50'}`}
              >
                <Calendar className={`w-4 h-4 mr-2.5 ${filters.thisMonthOnly ? 'text-emerald-500' : 'text-slate-400'}`} />
                {t('thisMonth')}
              </button>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex-1 md:w-auto inline-flex items-center justify-center px-6 py-3.5 border rounded-2xl text-[13px] font-bold transition-all hover:shadow-sm ${showFilters ? 'bg-slate-800 border-slate-800 text-white' : 'bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-50'}`}
              >
                <Filter className={`w-4 h-4 mr-2.5 ${showFilters ? 'text-slate-300' : 'text-slate-400'}`} />
                {t('moreFilters')}
              </button>
            </div>
          </div>

          {/* Clear Filters Row */}
          {isAnyFilterActive && (
            <div className="flex items-center justify-between pt-2 animate-in fade-in duration-200">
              <p className="text-sm font-bold text-slate-500">
                Showing <span className="text-slate-800">{filteredPayments.length}</span> result{filteredPayments.length !== 1 ? 's' : ''}
              </p>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1.5 text-[13px] font-black text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-4 py-2 rounded-xl transition-all duration-200"
              >
                <XCircle className="w-4 h-4" />
                Clear All Filters
              </button>
            </div>
          )}

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-50 animate-in slide-in-from-top-4 duration-300">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider ml-1">Status</label>
                <select 
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="All">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider ml-1">Method</label>
                <select 
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                  value={filters.method}
                  onChange={(e) => setFilters({...filters, method: e.target.value})}
                >
                  <option value="All">All Methods</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider ml-1">House</label>
                <select 
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                  value={filters.house}
                  onChange={(e) => setFilters({...filters, house: e.target.value})}
                >
                  <option value="All">All Houses</option>
                  <option value="A1">House A1</option>
                  <option value="A2">House A2</option>
                  <option value="B1">House B1</option>
                  <option value="B2">House B2</option>
                  <option value="C1">House C1</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="w-full">
          {filteredPayments.length > 0 ? (
            <>
              {/* Desktop View */}
              <div className="hidden md:block overflow-x-auto">
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
                    {filteredPayments.map((payment) => {
                      const displayDate = new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                      return (
                        <tr key={payment.id} className="even:bg-slate-50/50 hover:bg-slate-50 transition-all duration-300 group cursor-default">
                          <td className="px-10 py-6 whitespace-nowrap">
                            <div className="font-extrabold text-slate-700 text-[15px]">{payment.id}</div>
                            <div className="text-xs font-bold text-slate-400 mt-0.5">{displayDate}</div>
                          </td>
                          <td className="px-10 py-6 whitespace-nowrap">
                            <button 
                              onClick={() => navigate(`/residents/${payment.residentId}`)}
                              className="font-extrabold text-slate-800 text-[16px] hover:text-violet-600 hover:underline decoration-2 underline-offset-4 transition-all duration-200 cursor-pointer text-left"
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
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* Mobile View */}
              <div className="md:hidden divide-y divide-slate-50/50">
                {filteredPayments.map((payment) => {
                  const displayDate = new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  return (
                    <div key={payment.id} className="p-5 even:bg-slate-50/50 hover:bg-slate-50 transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-col">
                          <button 
                            onClick={() => navigate(`/residents/${payment.residentId}`)}
                            className="font-extrabold text-slate-800 text-[15px] hover:text-emerald-600 transition-colors text-left"
                          >
                            {payment.resident}
                          </button>
                          <span className="text-[12px] font-bold text-slate-400 mt-0.5">{payment.id} • {displayDate}</span>
                        </div>
                        <div className="text-[16px] font-black text-emerald-600 whitespace-nowrap">
                          €{payment.amount.toLocaleString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[11px] font-black text-slate-500 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 uppercase">{payment.house}</span>
                        <div className="flex items-center gap-1.5 text-[12px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                          {getMethodIcon(payment.method)} {payment.method}
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                        {getStatusBadge(payment.status)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
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
          <div className="flex items-center gap-8 text-right">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('totalReceived')}</span>
            <span className="text-4xl font-black text-slate-800 tracking-tighter">€{filteredPayments.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</span>
          </div>
        </div>

      </div>

      {/* Record Payment Modal */}
      {isRecordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Record Payment</h3>
              <button 
                onClick={() => setIsRecordModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider ml-1">Resident</label>
                <select 
                  required
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 transition-all appearance-none cursor-pointer"
                  value={newPayment.residentId}
                  onChange={(e) => setNewPayment({...newPayment, residentId: e.target.value})}
                >
                  <option value="">Select a resident</option>
                  {residents.map(r => (
                    <option key={r.id} value={r.id}>{r.name} ({r.house})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider ml-1">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">€</span>
                    <input 
                      type="number"
                      required
                      className="w-full pl-8 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 transition-all"
                      placeholder="0.00"
                      value={newPayment.amount}
                      onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider ml-1">Date</label>
                  <input 
                    type="date"
                    required
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 transition-all"
                    value={newPayment.date}
                    onChange={(e) => setNewPayment({...newPayment, date: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider ml-1">Payment Method</label>
                <select 
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 transition-all appearance-none cursor-pointer"
                  value={newPayment.method}
                  onChange={(e) => setNewPayment({...newPayment, method: e.target.value})}
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="Online">Online</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider ml-1">Status</label>
                <select 
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 transition-all appearance-none cursor-pointer"
                  value={newPayment.status}
                  onChange={(e) => setNewPayment({...newPayment, status: e.target.value})}
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  type="button"
                  onClick={() => setIsRecordModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-[11px]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-violet-600 text-white font-black rounded-2xl hover:bg-violet-700 transition-all shadow-md hover:shadow-lg hover:shadow-violet-200 uppercase tracking-widest text-[11px]"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
