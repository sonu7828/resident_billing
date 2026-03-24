import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Receipt,
  CheckCircle2,
  Calendar
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

export default function Reports() {
  const { t } = useLanguage();
  const [selectedMonth, setSelectedMonth] = useState('March 2026');
  const [selectedHouse, setSelectedHouse] = useState('All');

  // Dummy aggregated data
  const summaryStats = {
    totalCharged: 12500,
    totalReceived: 8300,
    outstanding: 4200
  };

  const tableData = [
    { id: 1, name: 'Bob Jones', house: 'A2', charged: 2500, paid: 1300, outstanding: 1200 },
    { id: 2, name: 'Charlie Brown', house: 'B1', charged: 1500, paid: 1000, outstanding: 500 },
    { id: 3, name: 'Evan Wright', house: 'C1', charged: 3500, paid: 1500, outstanding: 2000 },
    { id: 4, name: 'Sarah Lee', house: 'A1', charged: 2500, paid: 2150, outstanding: 350 },
    { id: 5, name: 'Michael Clark', house: 'B2', charged: 2500, paid: 2350, outstanding: 150 },
  ];

  const chartData = [
    { name: 'Jan', received: 7200, outstanding: 2500 },
    { name: 'Feb', received: 8000, outstanding: 3100 },
    { name: 'Mar', received: 8300, outstanding: 4200 }, // Current
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{t('financialReports')}</h2>
          <p className="text-slate-500 text-[15px] mt-1.5 font-medium">Overview of financial performance and ledger health.</p>
        </div>

        {/* Filters Top */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <select 
              className="block w-full pl-10 pr-10 py-3 font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-[1.25rem] text-[13px] focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 appearance-none cursor-pointer shadow-sm shadow-slate-100/30 transition-all duration-300"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="January 2026">January 2026</option>
              <option value="February 2026">February 2026</option>
              <option value="March 2026">March 2026</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Calendar className="h-4 w-4 text-violet-500" />
            </div>
          </div>

          <div className="relative">
            <select 
              className="block w-full pl-4 pr-10 py-3 font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-[1.25rem] text-[13px] focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 appearance-none cursor-pointer shadow-sm shadow-slate-100/30 transition-all duration-300"
              value={selectedHouse}
              onChange={(e) => setSelectedHouse(e.target.value)}
            >
              <option value="All">All Houses</option>
              <option value="A1">House A1</option>
              <option value="A2">House A2</option>
              <option value="B1">House B1</option>
              <option value="B2">House B2</option>
              <option value="C1">House C1</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <Filter className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Charged */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80 p-6 flex items-center justify-between hover:scale-[1.02] transition-all duration-300">
          <div>
            <span className="block text-[12px] font-black uppercase text-slate-400 tracking-wider">{t('totalCharged')}</span>
            <span className="block text-3xl font-black text-slate-800 mt-2">€{summaryStats.totalCharged.toLocaleString()}</span>
            <div className="flex items-center text-emerald-500 text-[12px] font-bold mt-2">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12% from last month</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/50 shadow-sm shadow-indigo-50">
            <Receipt className="w-6 h-6" />
          </div>
        </div>

        {/* Total Received */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80 p-6 flex items-center justify-between hover:scale-[1.02] transition-all duration-300">
          <div>
            <span className="block text-[12px] font-black uppercase text-slate-400 tracking-wider">{t('totalReceived')}</span>
            <span className="block text-3xl font-black text-emerald-600 mt-2">€{summaryStats.totalReceived.toLocaleString()}</span>
            <div className="flex items-center text-emerald-500 text-[12px] font-bold mt-2">
              <CheckCircle2 className="w-4 h-4 mr-1" />
              <span>{t('healthy')}</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/50 shadow-sm shadow-emerald-50">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Outstanding Balance */}
        <div className="bg-gradient-to-br from-rose-500 directly via-rose-600 to-rose-700 rounded-[2rem] shadow-[0_12px_24px_rgba(225,29,72,0.15)] p-6 flex items-center justify-between hover:scale-[1.02] transition-all duration-300 text-white group">
          <div>
            <span className="block text-[11px] font-black uppercase text-rose-100/80 tracking-wider">{t('outstandingBalance')}</span>
            <span className="block text-3xl font-black mt-2">€{summaryStats.outstanding.toLocaleString()}</span>
            <div className="flex items-center text-rose-100 text-[12px] font-bold mt-2 bg-white/10 px-2 py-0.5 rounded-lg w-fit">
              <AlertCircle className="w-4 h-4 mr-1 text-rose-200" />
              <span>{t('needsSupport')}</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shadow-sm backdrop-blur-sm group-hover:rotate-6 transition-transform">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80 p-8 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h4 className="text-xl font-extrabold text-slate-800">{t('incomeVsOutstanding')}</h4>
            <p className="text-[13px] font-bold text-slate-400 mt-0.5">3-Month historic trending overview</p>
          </div>
          <div className="flex items-center gap-4 text-[13px] font-black uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600">{t('paid')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="text-slate-600">{t('outstanding')}</span>
            </div>
          </div>
        </div>

        {/* Visual Bar Graph mockup via flex columns */}
        <div className="h-[240px] flex items-end justify-around border-b border-slate-100 px-10 pb-2">
          {chartData.map((data, index) => {
            const maxVal = 10000; // visual buffer
            const receivedHeight = Math.min((data.received / maxVal) * 100, 100);
            const outstandingHeight = Math.min((data.outstanding / maxVal) * 100, 100);

            return (
              <div key={index} className="flex flex-col items-center gap-4 w-1/4">
                <div className="flex items-end gap-3 w-full justify-center h-[200px]">
                  {/* Received Bar */}
                  <div 
                    className="w-12 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-xl hover:opacity-90 transition-all duration-500 animate-grow relative group cursor-pointer"
                    style={{ height: `${receivedHeight}%` }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[11px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      €{data.received}
                    </div>
                  </div>
                  {/* Outstanding Bar */}
                  <div 
                    className="w-12 bg-gradient-to-t from-rose-500 to-rose-400 rounded-xl hover:opacity-90 transition-all duration-500 animate-grow relative group cursor-pointer"
                    style={{ height: `${outstandingHeight}%` }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[11px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      €{data.outstanding}
                    </div>
                  </div>
                </div>
                <span className="text-[13px] font-extrabold text-slate-500 tracking-wider">
                  {data.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Table & Export Section */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
        
        {/* Details Table */}
        <div className="xl:col-span-3 bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-50 bg-white">
            <h4 className="text-lg font-extrabold text-slate-800">{t('ledgerSummary')}</h4>
            <p className="text-[12px] font-bold text-slate-500">Detailed resident breakdowns</p>
          </div>
          <div className="w-full">
            <table className="min-w-full divide-y divide-slate-50 table-fixed">
              <thead className="bg-slate-50/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] flex-1">{t('resident')}</th>
                  <th scope="col" className="px-5 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] w-32">{t('charged')}</th>
                  <th scope="col" className="px-5 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] w-32">{t('paid')}</th>
                  <th scope="col" className="px-5 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] w-32">{t('outstanding')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {tableData.map((resident) => (
                  <tr key={resident.id} className="hover:bg-slate-50/50 transition-all duration-300">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-slate-800 text-[14px]">
                          {resident.name}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400/90 mt-0.5">
                          House {resident.house}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-[14px] font-bold text-slate-700">
                      €{resident.charged.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-[14px] font-extrabold text-emerald-600">
                      €{resident.paid.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-[14px] font-black text-rose-600">
                      €{resident.outstanding.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Support Container */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80 p-6 flex flex-col sticky top-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-slate-800">{t('exportOptions')}</h4>
              <p className="text-[12px] font-bold text-slate-400">Download formatted files</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full inline-flex items-center justify-between px-5 py-4 border border-slate-100 rounded-xl hover:bg-slate-50 hover:border-slate-200 shadow-sm shadow-slate-100/10 transition-all duration-300 group">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mr-3 font-black text-[11px]">CSV</div>
                <span className="text-[14px] font-bold text-slate-700">Detailed Ledger</span>
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </button>

            <button className="w-full inline-flex items-center justify-between px-5 py-4 border border-slate-100 rounded-xl hover:bg-slate-50 hover:border-slate-200 shadow-sm shadow-slate-100/10 transition-all duration-300 group">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mr-3 font-black text-[11px]">XLS</div>
                <span className="text-[14px] font-bold text-slate-700">Monthly Summary</span>
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </button>

            <button className="w-full inline-flex items-center justify-between px-5 py-4 border border-slate-200/50 bg-slate-50/50 rounded-xl hover:bg-slate-50 transition-all duration-300 group">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mr-3 font-black text-[11px] tracking-tight">DATEV</div>
                <span className="text-[14px] font-bold text-slate-600">Standard Export</span>
              </div>
              <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">UI only</span>
            </button>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-50 text-center">
            <p className="text-[11px] font-bold text-slate-400">Values based on {selectedMonth} dataset.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
