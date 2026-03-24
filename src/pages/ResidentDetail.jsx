import React, { useState } from 'react';
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
  ArrowUpRight,
  MessageSquare,
  History,
  XCircle
} from 'lucide-react';
import { residents, ledgerData } from '../data/mockData';

export default function ResidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Ledger');

  // Find resident data
  const resident = residents.find(r => r.id === id) || residents[1]; // Fallback to Bob if not found
  const ledger = ledgerData[resident.id] || [];

  const [notes, setNotes] = useState([
    { id: 1, date: 'Mar 10, 2026', author: 'Admin', text: 'Spoke with resident about the partial payment. They promised to clear the balance by next week.' },
    { id: 2, date: 'Feb 15, 2026', author: 'System', text: 'Annual maintenance charge applied to account.' }
  ]);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [newNote, setNewNote] = useState('');

  // Calculate summary based on ledger
  const summary = {
    totalCharged: ledger.filter(l => l.type === 'Charge').reduce((acc, curr) => acc + curr.amount, 0),
    totalPaid: Math.abs(ledger.filter(l => l.type === 'Payment').reduce((acc, curr) => acc + curr.amount, 0)),
    outstanding: resident.balance
  };

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

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    
    const noteToAdd = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: 'Admin',
      text: newNote
    };
    
    setNotes([noteToAdd, ...notes]);
    setNewNote('');
    setIsNoteModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12">
      
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
                €{resident.charge.toLocaleString()} / month
              </div>
              <div className="text-slate-400/60 uppercase tracking-widest text-[11px] font-black pl-2">ID: {resident.id}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/reminders', { state: { residentId: resident.id } })}
            className="inline-flex items-center px-6 py-3 bg-white border border-slate-200 rounded-[1.25rem] text-[15px] font-bold text-slate-700 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-all active:scale-95 group focus:ring-4 focus:ring-amber-50"
          >
            <Bell className="w-5 h-5 mr-2.5 text-slate-300 group-hover:text-amber-500" />
            Send Reminder
          </button>
          <button 
            onClick={() => navigate('/payments', { state: { residentId: resident.id } })}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[1.25rem] text-[15px] font-bold text-white hover:from-emerald-600 hover:to-teal-600 shadow-sm shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-100 transition-all active:scale-95 group focus:ring-4 focus:ring-emerald-50">
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

      {/* Tabs Section */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">{activeTab} <span className="text-slate-300 font-medium px-2">—</span> <span className="text-indigo-600 uppercase text-xs tracking-[0.2em]">Data View</span></h3>
            <p className="text-[15px] font-medium text-slate-500 mt-1.5 focus-visible:outline-none">
              {activeTab === 'Ledger' ? 'Audit history of charges and payments.' : 
               activeTab === 'Payments' ? 'History of all payments received.' : 'Private notes and internal remarks.'}
            </p>
          </div>
          <div className="flex gap-2.5 p-1.5 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
            <button 
              onClick={() => setActiveTab('Ledger')}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'Ledger' ? 'bg-white text-slate-800 shadow-sm border border-slate-200/50' : 'text-slate-400 hover:text-slate-800'}`}
            >
              Ledger
            </button>
            <button 
              onClick={() => setActiveTab('Payments')}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'Payments' ? 'bg-white text-slate-800 shadow-sm border border-slate-200/50' : 'text-slate-400 hover:text-slate-800'}`}
            >
              Payments
            </button>
            <button 
              onClick={() => setActiveTab('Notes')}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'Notes' ? 'bg-white text-slate-800 shadow-sm border border-slate-200/50' : 'text-slate-400 hover:text-slate-800'}`}
            >
              Notes
            </button>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          {activeTab === 'Ledger' && (
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
          )}
          {activeTab === 'Payments' && (
            <div className="py-24 flex flex-col items-center justify-center text-center px-10">
              <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mb-6 border border-slate-100">
                <History className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Payment history will appear here</h3>
              <p className="text-slate-500 mt-2 max-w-xs font-medium">All financial transactions for {resident.name} will be tracked in this section.</p>
            </div>
          )}
          {activeTab === 'Notes' && (
            <div className="p-10 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-black text-slate-800 uppercase tracking-widest">Internal Remarks</h4>
                <button 
                  onClick={() => setIsNoteModalOpen(true)}
                  className="inline-flex items-center px-5 py-2.5 bg-indigo-50 text-indigo-600 font-black rounded-xl hover:bg-indigo-100 transition-all border border-indigo-100 text-xs uppercase tracking-widest"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Note
                </button>
              </div>
              
              <div className="grid gap-6">
                {notes.length > 0 ? notes.map((note) => (
                  <div key={note.id} className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 hover:border-indigo-100 transition-all group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:text-indigo-500 transition-colors uppercase">
                          {note.author[0]}
                        </div>
                        <span className="text-[13px] font-black text-slate-700 uppercase tracking-wider">{note.author}</span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-400">{note.date}</span>
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed">{note.text}</p>
                  </div>
                )) : (
                   <div className="py-24 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mb-6 border border-slate-100">
                      <MessageSquare className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">No notes yet</h3>
                    <p className="text-slate-500 mt-2 max-w-xs font-medium">Start adding notes to track specific events or internal feedback for this resident.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Note Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Add Note</h3>
              <button 
                onClick={() => setIsNoteModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddNote} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider ml-1">Note Content</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium text-slate-700 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all placeholder:text-slate-400"
                  placeholder="Type your internal note here..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsNoteModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-[11px]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-black rounded-2xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-indigo-100 uppercase tracking-widest text-[11px]"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
