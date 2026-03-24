import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  PlusCircle, 
  Bell,
  XCircle,
  Users as UsersIcon
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

export default function Residents() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [houseFilter, setHouseFilter] = useState('All');

  // Dummy data
  const residents = [
    { id: '101', name: 'Alice Smith', house: 'A1', charge: 1200, balance: 0, status: 'Paid' },
    { id: '102', name: 'Bob Jones', house: 'A2', charge: 1200, balance: 1200, status: 'Overdue' },
    { id: '103', name: 'Charlie Brown', house: 'B1', charge: 1500, balance: 500, status: 'Partial' },
    { id: '104', name: 'Diana Prince', house: 'B2', charge: 1500, balance: 0, status: 'Paid' },
    { id: '105', name: 'Evan Wright', house: 'C1', charge: 1000, balance: 2000, status: 'Overdue' },
  ];

  const getStatusBadge = (status) => {
    const base = "inline-flex items-center px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-[0.08em] shadow-sm border transition-all duration-300 ";
    switch (status) {
      case 'Paid':
        return <span className={base + "bg-emerald-50 text-emerald-700 border-emerald-100/50"}>{t('paid')}</span>;
      case 'Partial':
        return <span className={base + "bg-amber-50 text-amber-700 border-amber-100/50"}>{t('partial')}</span>;
      case 'Overdue':
        return <span className={base + "bg-rose-50 text-rose-700 border-rose-100/50"}>{t('overdue')}</span>;
      default:
        return <span className={base + "bg-slate-50 text-slate-600 border-slate-100/50"}>{status}</span>;
    }
  };

  const filteredResidents = residents.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{t('residents')}</h2>
          <p className="text-slate-500 text-[15px] mt-1.5 font-medium">Manage and view all resident balances and data.</p>
        </div>
        <div>
          <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[1.25rem] text-[15px] font-bold text-white hover:from-violet-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-indigo-100 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 group focus:ring-4 focus:ring-indigo-100">
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" strokeWidth={3} />
            {t('addResident')}
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80 overflow-hidden flex flex-col transition-all duration-500">
        
        {/* Filters */}
        <div className="p-8 border-b border-slate-50 bg-white flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="relative w-full md:max-w-md group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-300 group-focus-within:text-violet-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-12 py-3.5 border border-slate-200 rounded-2xl leading-5 bg-slate-50/30 hover:bg-slate-50 font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 sm:text-sm transition-all duration-300"
              placeholder={t('searchPlaceholder')}
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
            <div className="relative flex-1 md:w-48">
              <select 
                className="block w-full pl-5 pr-10 py-3.5 font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl text-[13px] focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 appearance-none cursor-pointer transition-all duration-300"
                value={houseFilter}
                onChange={(e) => setHouseFilter(e.target.value)}
              >
                <option value="All">{t('allHouses')}</option>
                <option value="A1">House A1</option>
                <option value="A2">House A2</option>
                <option value="B1">House B1</option>
                <option value="B2">House B2</option>
                <option value="C1">House C1</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                <Filter className="h-4 w-4" />
              </div>
            </div>
            <div className="relative flex-1 md:w-48">
              <select 
                className="block w-full pl-5 pr-10 py-3.5 font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl text-[13px] focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 appearance-none cursor-pointer transition-all duration-300"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">{t('allStatuses')}</option>
                <option value="Paid">{t('paid')}</option>
                <option value="Partial">{t('partial')}</option>
                <option value="Overdue">{t('overdue')}</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                <Filter className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {filteredResidents.length > 0 ? (
            <table className="min-w-full divide-y divide-slate-50">
              <thead className="bg-slate-50/50">
                <tr>
                  <th scope="col" className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">{t('resident')}</th>
                  <th scope="col" className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">{t('house')}</th>
                  <th scope="col" className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">{t('monthlyCharge')}</th>
                  <th scope="col" className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">{t('outstanding')}</th>
                  <th scope="col" className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">{t('status')}</th>
                  <th scope="col" className="px-10 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredResidents.map((resident) => (
                  <tr 
                    key={resident.id} 
                    className="hover:bg-indigo-50/20 transition-all duration-300 group cursor-default"
                  >
                    <td className="px-10 py-6 whitespace-nowrap">
                      <button 
                        onClick={() => navigate(`/residents/${resident.id}`)}
                        className="font-extrabold text-slate-800 text-[16px] hover:text-indigo-600 hover:underline decoration-2 underline-offset-4 transition-all duration-200 cursor-pointer text-left"
                      >
                        {resident.name}
                      </button>
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap">
                      <div className="text-[13px] font-bold text-slate-600 bg-slate-100/60 px-3 py-1.5 rounded-xl border border-slate-200 inline-flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2"></span>
                        {resident.house}
                      </div>
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap text-[15px] text-slate-600 font-bold">
                      €{resident.charge.toLocaleString()}
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap">
                      <div className={`text-[16px] font-black ${resident.balance > 0 ? 'text-rose-600' : 'text-slate-300'}`}>
                        €{resident.balance.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap">
                      {getStatusBadge(resident.status)}
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-3 transition-all duration-300">
                        <button 
                          className="p-2.5 text-indigo-500 bg-indigo-50/0 hover:bg-indigo-50 hover:shadow-sm border border-transparent hover:border-indigo-100 rounded-2xl transition-all duration-300 active:scale-90"
                          title="View Details"
                          onClick={() => navigate(`/residents/${resident.id}`)}
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button 
                          className="p-2.5 text-emerald-500 bg-emerald-50/0 hover:bg-emerald-50 hover:shadow-sm border border-transparent hover:border-emerald-100 rounded-2xl transition-all duration-300 active:scale-90"
                          title="Add Payment"
                        >
                          <PlusCircle className="w-5 h-5" />
                        </button>
                        <button 
                          className="p-2.5 text-amber-500 bg-amber-50/0 hover:bg-amber-50 hover:shadow-sm border border-transparent hover:border-amber-100 rounded-2xl transition-all duration-300 active:scale-90"
                          title="Send Reminder"
                        >
                          <Bell className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center px-10">
              <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mb-6 border border-slate-100">
                <UsersIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">No residents found</h3>
              <p className="text-slate-500 mt-2 max-w-xs font-medium">We couldn't find any residents matching your current search or filter criteria.</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-6 text-indigo-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        <div className="px-10 py-8 border-t border-slate-50 bg-slate-50/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Showing <span className="text-slate-800">1 to {filteredResidents.length}</span> of <span className="text-slate-800">{filteredResidents.length}</span> residents</span>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 border border-slate-200 bg-white text-slate-400 rounded-[1.25rem] text-sm font-bold opacity-50 cursor-not-allowed shadow-sm transition-all">Previous</button>
            <button className="px-6 py-2.5 border border-slate-200 bg-white text-slate-400 rounded-[1.25rem] text-sm font-bold opacity-50 cursor-not-allowed shadow-sm transition-all">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
