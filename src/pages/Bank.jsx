import React, { useState, useRef } from 'react';
import { 
  Landmark, 
  Upload, 
  Search, 
  XCircle, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Trash2,
  RotateCcw,
  Filter,
  Link2,
  Wifi,
  Building2,
  FileUp,
  Info
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import { residents } from '../data/mockData';

export default function Bank() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [selectedResidentId, setSelectedResidentId] = useState('');
  const [connectedBank, setConnectedBank] = useState(null);
  const [csvUploadMsg, setCsvUploadMsg] = useState('');
  const fileInputRef = useRef(null);

  const [transactions, setTransactions] = useState([
    { id: 1001, date: '2026-03-22', description: 'RENT - Alice Smith', amount: 1200, status: 'Matched', matchedResident: 'Alice Smith' },
    { id: 1002, date: '2026-03-21', description: 'BANK FEE - Monthly Maintenance', amount: -15, status: 'Unmatched', matchedResident: null },
    { id: 1003, date: '2026-03-20', description: 'TRANSFER HOUSE B1 - Charlie Brown', amount: 1500, status: 'Unmatched', matchedResident: null },
    { id: 1004, date: '2026-03-19', description: 'PAYMENT FROM BOB JONES', amount: 1200, status: 'Matched', matchedResident: 'Bob Jones' },
    { id: 1005, date: '2026-03-18', description: 'RENT CHARGE D14 - Evan Wright', amount: 1000, status: 'Unmatched', matchedResident: null },
  ]);

  // --- CSV Upload ---
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCSVFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.endsWith('.csv')) {
      setCsvUploadMsg('Please upload a valid .csv file.');
      setTimeout(() => setCsvUploadMsg(''), 3000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      const lines = text.trim().split('\n').slice(1); // skip header row
      const newTxs = lines
        .map((line, i) => {
          const cols = line.split(',').map(c => c.replace(/"/g, '').trim());
          // Expected format: date,description,amount
          if (cols.length < 3) return null;
          const amount = parseFloat(cols[2]);
          if (isNaN(amount)) return null;
          return {
            id: Date.now() + i,
            date: cols[0] || new Date().toISOString().split('T')[0],
            description: cols[1] || 'Unknown',
            amount,
            status: 'Unmatched',
            matchedResident: null
          };
        })
        .filter(Boolean);

      if (newTxs.length === 0) {
        setCsvUploadMsg('No valid rows found. Format: date,description,amount');
      } else {
        setTransactions(prev => [...newTxs, ...prev]);
        setCsvUploadMsg(`✓ Imported ${newTxs.length} transaction(s) from ${file.name}`);
      }
      setTimeout(() => setCsvUploadMsg(''), 4000);
    };
    reader.readAsText(file);
    e.target.value = ''; // reset input
  };

  // --- Connect Bank ---
  const MOCK_BANKS = [
    { id: 'hdfc', name: 'HDFC Bank', color: 'from-blue-600 to-blue-700', icon: '🏦' },
    { id: 'sbi', name: 'State Bank of India', color: 'from-sky-600 to-sky-700', icon: '🏛️' },
    { id: 'icici', name: 'ICICI Bank', color: 'from-orange-500 to-orange-600', icon: '🏧' },
    { id: 'axis', name: 'Axis Bank', color: 'from-rose-600 to-rose-700', icon: '🏦' },
    { id: 'kotak', name: 'Kotak Mahindra', color: 'from-red-600 to-red-700', icon: '💳' },
  ];

  const DEMO_BANK_TRANSACTIONS = [
    { id: Date.now() + 100, date: '2026-03-24', description: 'NEFT CR - Diana Prince Rent', amount: 1500, status: 'Unmatched', matchedResident: null },
    { id: Date.now() + 101, date: '2026-03-23', description: 'UPI PAYMENT - Flat A2 Charge', amount: 1200, status: 'Unmatched', matchedResident: null },
    { id: Date.now() + 102, date: '2026-03-22', description: 'DEBIT - Bank Service Fee', amount: -25, status: 'Unmatched', matchedResident: null },
  ];

  const handleConnectBank = (bank) => {
    setConnectedBank(bank);
    // Simulate importing new transactions from connected bank
    setTransactions(prev => [...DEMO_BANK_TRANSACTIONS.map(tx => ({...tx, id: Date.now() + Math.random()})), ...prev]);
    setIsConnectModalOpen(false);
  };

  // --- Matching ---
  const openMatchModal = (tx) => {
    setSelectedTx(tx);
    setSelectedResidentId('');
    setIsMatchModalOpen(true);
  };

  const handleConfirmMatch = () => {
    if (!selectedResidentId) return;
    const resident = residents.find(r => r.id === selectedResidentId);
    setTransactions(prev => prev.map(tx =>
      tx.id === selectedTx.id
        ? { ...tx, status: 'Matched', matchedResident: resident?.name || '' }
        : tx
    ));
    setIsMatchModalOpen(false);
    setSelectedTx(null);
  };

  const handleUnmatch = (id) => {
    setTransactions(prev => prev.map(tx =>
      tx.id === id ? { ...tx, status: 'Unmatched', matchedResident: null } : tx
    ));
  };

  const handleDelete = (id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  // --- Filtering ---
  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || tx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const matchedCount = transactions.filter(t => t.status === 'Matched').length;
  const unmatchedCount = transactions.filter(t => t.status === 'Unmatched').length;
  const totalCredits = transactions.filter(t => t.amount > 0).reduce((a, b) => a + b.amount, 0);

  const getStatusBadge = (status) => {
    const base = "inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-[0.08em] shadow-sm border transition-all duration-300 ";
    if (status === 'Matched') {
      return <span className={base + "bg-emerald-50 text-emerald-700 border-emerald-100/50"}><CheckCircle2 className="w-3.5 h-3.5" /> {t('matched')}</span>;
    }
    return <span className={base + "bg-amber-50 text-amber-700 border-amber-100/50"}><AlertCircle className="w-3.5 h-3.5" /> {t('unmatched')}</span>;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".csv"
        className="hidden"
        onChange={handleCSVFile}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{t('bankTransactions')}</h2>
          <p className="text-slate-500 text-[15px] mt-1.5 font-medium">Reconcile and import transactions from statements.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleUploadClick}
            className="inline-flex items-center px-5 py-3 bg-white border border-slate-200 rounded-[1.25rem] text-[14px] font-bold text-slate-700 hover:bg-slate-50 hover:shadow-md transition-all active:scale-95 group focus:ring-4 focus:ring-slate-100"
          >
            <FileUp className="w-4 h-4 mr-2 text-slate-400 group-hover:text-slate-700 transition-colors" />
            {t('upload')} CSV
          </button>
          <button 
            onClick={() => setIsConnectModalOpen(true)}
            className="inline-flex items-center px-5 py-3 bg-violet-600 rounded-[1.25rem] text-[14px] font-bold text-white hover:bg-violet-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95 group focus:ring-4 focus:ring-violet-100"
          >
            <Wifi className="w-4 h-4 mr-2" />
            {connectedBank ? `Connected: ${connectedBank.name}` : t('connectBank')}
          </button>
        </div>
      </div>

      {/* CSV Upload Feedback */}
      {csvUploadMsg && (
        <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold border animate-in fade-in duration-300 ${csvUploadMsg.startsWith('✓') ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
          <Info className="w-4 h-4 shrink-0" />
          {csvUploadMsg}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
            <Landmark className="w-6 h-6 text-slate-500" />
          </div>
          <div>
            <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Total Transactions</p>
            <p className="text-2xl font-black text-slate-800">{transactions.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-[2rem] p-6 border border-emerald-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-[11px] font-black uppercase text-emerald-400 tracking-wider">Matched</p>
            <p className="text-2xl font-black text-emerald-700">{matchedCount}</p>
          </div>
        </div>
        <div className="bg-white rounded-[2rem] p-6 border border-amber-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p className="text-[11px] font-black uppercase text-amber-400 tracking-wider">Unmatched</p>
            <p className="text-2xl font-black text-amber-700">{unmatchedCount}</p>
          </div>
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
          <div className="flex gap-3">
            {['All', 'Matched', 'Unmatched'].map(opt => (
              <button
                key={opt}
                onClick={() => setStatusFilter(opt)}
                className={`px-5 py-3 rounded-2xl text-[13px] font-black uppercase tracking-widest border transition-all duration-200 ${statusFilter === opt ? 'bg-slate-800 text-white border-slate-800 shadow-sm' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="w-full">
          {filteredTransactions.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-50">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th scope="col" className="px-8 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] w-32">{t('date')}</th>
                      <th scope="col" className="px-8 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">{t('details')}</th>
                      <th scope="col" className="px-8 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] w-32">{t('amount')}</th>
                      <th scope="col" className="px-8 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] w-32">{t('status')}</th>
                      <th scope="col" className="px-8 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] w-56">{t('matchAction')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredTransactions.map((tx) => (
                      <tr 
                        key={tx.id} 
                        className="even:bg-slate-50/50 hover:bg-slate-50 border-b border-slate-50/80 transition-all duration-300 group cursor-default"
                      >
                        <td className="px-8 py-6 whitespace-nowrap text-[13px] font-bold text-slate-500">
                          {tx.date}
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="font-extrabold text-slate-800 text-[15px] max-w-sm truncate group-hover:text-cyan-700 transition-colors">
                              {tx.description}
                            </span>
                            {tx.matchedResident && (
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <Link2 className="w-3 h-3 text-emerald-400" />
                                <span className="text-[12px] font-black text-emerald-600/90">{tx.matchedResident}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className={`text-[15px] font-black ${tx.amount > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                            {tx.amount > 0 ? '+' : ''}€{Math.abs(tx.amount).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          {getStatusBadge(tx.status)}
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            {tx.status === 'Unmatched' ? (
                              <button 
                                onClick={() => openMatchModal(tx)}
                                className="inline-flex items-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-[0.85rem] text-[11px] font-black uppercase tracking-wider shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95"
                              >
                                <Link2 className="w-3.5 h-3.5 mr-1" />
                                {t('confirmMatch')}
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUnmatch(tx.id)}
                                className="p-2 text-slate-300 hover:text-amber-500 hover:bg-amber-50 rounded-xl border border-transparent hover:border-amber-100 transition-all duration-200"
                                title="Unmatch"
                              >
                                <RotateCcw className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(tx.id)}
                              className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-100 transition-all duration-200"
                              title="Delete transaction"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-slate-50/50">
                {filteredTransactions.map((tx) => (
                  <div key={tx.id} className="p-5 even:bg-slate-50/50 hover:bg-slate-50 transition-all duration-300 group cursor-default">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-slate-800 text-[15px] line-clamp-2 pr-2 leading-snug">{tx.description}</span>
                        <span className="text-[12px] font-bold text-slate-400 mt-1">{tx.date}</span>
                      </div>
                      <div className={`text-[16px] font-black whitespace-nowrap ${tx.amount > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {tx.amount > 0 ? '+' : ''}€{Math.abs(tx.amount).toLocaleString()}
                      </div>
                    </div>
                    
                    {tx.matchedResident && (
                      <div className="flex items-center gap-1.5 mb-4">
                        <Link2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[12px] font-black text-emerald-600">{tx.matchedResident}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4">
                      {getStatusBadge(tx.status)}
                      <div className="flex items-center justify-end gap-1">
                        {tx.status === 'Unmatched' ? (
                          <button 
                            onClick={() => openMatchModal(tx)}
                            className="inline-flex items-center justify-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-[11px] font-black uppercase tracking-wider shadow-sm active:scale-95 transition-all"
                          >
                            <Link2 className="w-3.5 h-3.5 mr-1" /> {t('confirmMatch') || 'Match'}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUnmatch(tx.id)}
                            className="p-2.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                            title="Unmatch"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(tx.id)}
                          className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center px-10">
              <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-300 mb-6 border border-slate-100">
                <Landmark className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">No transactions found</h3>
              <p className="text-slate-500 mt-2 max-w-xs font-medium">
                {statusFilter !== 'All' ? `No ${statusFilter.toLowerCase()} transactions.` : "Upload a CSV or connect your bank to get started."}
              </p>
              {statusFilter !== 'All' && (
                <button onClick={() => setStatusFilter('All')} className="mt-4 text-cyan-600 font-bold hover:underline text-sm">Show all</button>
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-10 py-6 border-t border-slate-50 bg-slate-50/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Showing <span className="text-slate-800">{filteredTransactions.length}</span> of <span className="text-slate-800">{transactions.length}</span> transactions
            <span className="ml-4 font-black text-emerald-600">Total Credits: €{totalCredits.toLocaleString()}</span>
          </span>
        </div>

      </div>

      {/* ── Match Resident Modal ── */}
      {isMatchModalOpen && selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 max-w-md w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Match to Resident</h3>
              <button onClick={() => setIsMatchModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Transaction Summary */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Transaction</p>
              <p className="font-extrabold text-slate-800 text-[15px]">{selectedTx.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500">{selectedTx.date}</span>
                <span className={`text-[17px] font-black ${selectedTx.amount > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {selectedTx.amount > 0 ? '+' : ''}€{Math.abs(selectedTx.amount).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider ml-1">Select Resident</label>
              <select
                required
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-400 transition-all appearance-none cursor-pointer"
                value={selectedResidentId}
                onChange={(e) => setSelectedResidentId(e.target.value)}
              >
                <option value="">-- Select a resident --</option>
                {residents.map(r => (
                  <option key={r.id} value={r.id}>{r.name} ({r.house})</option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 pt-2">
              <button 
                type="button"
                onClick={() => setIsMatchModalOpen(false)}
                className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-[11px]"
              >
                Cancel
              </button>
              <button 
                type="button"
                disabled={!selectedResidentId}
                onClick={handleConfirmMatch}
                className="flex-1 py-4 bg-violet-600 text-white font-black rounded-2xl hover:bg-violet-700 transition-all shadow-md hover:shadow-lg hover:shadow-violet-200 uppercase tracking-widest text-[11px] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Confirm Match
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Connect Bank Modal ── */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 max-w-md w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Connect Your Bank</h3>
                <p className="text-slate-400 text-sm font-medium mt-1">Select a bank to import transactions automatically.</p>
              </div>
              <button onClick={() => setIsConnectModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              {MOCK_BANKS.map(bank => (
                <button
                  key={bank.id}
                  onClick={() => handleConnectBank(bank)}
                  className="w-full flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-2xl transition-all duration-200 group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${bank.color} rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
                    {bank.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-extrabold text-slate-800 group-hover:text-cyan-700 transition-colors">{bank.name}</p>
                    <p className="text-xs font-bold text-slate-400">Demo connection · imports 3 sample transactions</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-cyan-500 ml-auto transition-colors" />
                </button>
              ))}
            </div>

            <div className="p-4 bg-cyan-50 rounded-2xl border border-cyan-100 flex gap-3 items-start">
              <Info className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
              <p className="text-[12px] font-bold text-cyan-700">This is a demo environment. In production, this would connect via a secure Open Banking API.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

