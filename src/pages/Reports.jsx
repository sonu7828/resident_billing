import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
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

  // Initial base data
  const baseTableData = [
    { id: 1, name: 'Bob Jones', house: 'A2', charged: 2500, paid: 1300, outstanding: 1200 },
    { id: 2, name: 'Charlie Brown', house: 'B1', charged: 1500, paid: 1000, outstanding: 500 },
    { id: 3, name: 'Evan Wright', house: 'C1', charged: 3500, paid: 1500, outstanding: 2000 },
    { id: 4, name: 'Sarah Lee', house: 'A1', charged: 2500, paid: 2150, outstanding: 350 },
    { id: 5, name: 'Michael Clark', house: 'B2', charged: 2500, paid: 2350, outstanding: 150 },
  ];

  // Derive dynamic table data based on filters
  let filteredTableData = baseTableData.filter(d => selectedHouse === 'All' || d.house === selectedHouse);
  
  // Make data change slightly based on the month to show interaction
  const isJan = selectedMonth.includes('January');
  const isFeb = selectedMonth.includes('February');
  
  if (isJan) {
    filteredTableData = filteredTableData.map(d => ({ ...d, charged: d.charged * 0.8, paid: d.paid * 0.7, outstanding: (d.charged * 0.8) - (d.paid * 0.7) }));
  } else if (isFeb) {
    filteredTableData = filteredTableData.map(d => ({ ...d, charged: d.charged * 0.9, paid: d.paid * 0.8, outstanding: (d.charged * 0.9) - (d.paid * 0.8) }));
  }

  // Calculate dynamic stats
  const totalChargedAcc = filteredTableData.reduce((acc, curr) => acc + curr.charged, 0);
  const totalReceivedAcc = filteredTableData.reduce((acc, curr) => acc + curr.paid, 0);
  const totalOutstandingAcc = filteredTableData.reduce((acc, curr) => acc + curr.outstanding, 0);

  const summaryStats = {
    totalCharged: totalChargedAcc,
    totalReceived: totalReceivedAcc,
    outstanding: totalOutstandingAcc
  };

  const chartData = [
    { name: 'Oct', received: 4200, outstanding: 2100 },
    { name: 'Nov', received: 3800, outstanding: 1800 },
    { name: 'Dec', received: 5100, outstanding: 2400 },
    { name: 'Jan', received: 4600, outstanding: 1900 },
    { name: 'Feb', received: 5400, outstanding: 1500 },
    { name: 'Mar', received: 6200, outstanding: 1200 },
  ];

  const handleExportCSV = () => {
    const headers = ['Resident', 'House', 'Charged', 'Paid', 'Outstanding'];
    const csvContent = [
      headers.join(','),
      ...filteredTableData.map(r => `${r.name},${r.house},${r.charged},${r.paid},${r.outstanding}`)
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Ledger_Report_${selectedMonth.replace(' ', '_')}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleExportXLS = () => {
    // Basic CSV implementation for XLS for demonstration
    const headers = ['Resident', 'House', 'Charged', 'Paid', 'Outstanding'];
    let tsvContent = "Resident\tHouse\tCharged\tPaid\tOutstanding\n";
    filteredTableData.forEach(r => {
      tsvContent += `${r.name}\t${r.house}\t${r.charged}\t${r.paid}\t${r.outstanding}\n`;
    });
    
    const blob = new Blob([tsvContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Monthly_Summary_${selectedMonth.replace(' ', '_')}.xls`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

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
        <div className="bg-gradient-to-br from-white to-violet-50/50 rounded-[2rem] shadow-sm border border-slate-200/60 p-6 flex items-center justify-between hover:scale-[1.02] transition-all duration-300">
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
        <div className="bg-gradient-to-br from-white to-emerald-50/50 rounded-[2rem] shadow-sm border border-slate-200/60 p-6 flex items-center justify-between hover:scale-[1.02] transition-all duration-300">
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
        <div className="bg-gradient-to-br from-white to-rose-50/50 rounded-[2rem] shadow-sm border border-slate-200/60 p-6 flex items-center justify-between hover:scale-[1.02] transition-all duration-300">
          <div>
            <span className="block text-[12px] font-black uppercase text-slate-400 tracking-wider">{t('outstandingBalance')}</span>
            <span className="block text-3xl font-black text-rose-600 mt-2">€{summaryStats.outstanding.toLocaleString()}</span>
            <div className="flex items-center text-rose-500 text-[12px] font-bold mt-2">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span>{t('needsSupport')}</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100/50 shadow-sm shadow-rose-50">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <div>
            <h4 className="text-xl font-extrabold text-slate-800">{t('incomeVsOutstanding')}</h4>
            <p className="text-[13px] font-bold text-slate-400 mt-0.5">3-Month historic trending overview</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[13px] font-black uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-violet-500"></span>
              <span className="text-slate-600">{t('totalReceived') || 'TOTAL RECEIVED'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-200"></span>
              <span className="text-slate-600">{t('outstanding') || 'OUTSTANDING'}</span>
            </div>
          </div>
        </div>

        {/* Dashboard-style Bar Chart using Recharts */}
        <div className="h-[300px] w-full pt-4 pr-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
              barSize={32}
              barGap={6}
            >
              <defs>
                <linearGradient id="gradientReceived" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={1}/>
                </linearGradient>
                <linearGradient id="gradientOutstanding" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e2e8f0" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#f1f5f9" stopOpacity={1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 13, fontWeight: 700 }}
                dy={12}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 13, fontWeight: 700 }}
                dx={-10}
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', fontWeight: 'bold', color: '#1e293b', padding: '12px 16px' }}
                itemStyle={{ fontWeight: '800' }}
              />
              <Bar 
                dataKey="received" 
                name={t('totalReceived') || 'Total Received'} 
                fill="url(#gradientReceived)" 
                radius={[8, 8, 8, 8]} 
                animationDuration={1500}
                animationEasing="ease-out"
              />
              <Bar 
                dataKey="outstanding" 
                name={t('outstanding') || 'Outstanding'} 
                fill="url(#gradientOutstanding)" 
                radius={[8, 8, 8, 8]} 
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
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
            {/* Desktop Table View */}
            <div className="hidden md:block">
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
                  {filteredTableData.length > 0 ? (
                    filteredTableData.map((resident) => (
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
                          €{resident.charged.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-[14px] font-extrabold text-emerald-600">
                          €{resident.paid.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-[14px] font-black text-rose-600">
                          €{resident.outstanding.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-slate-500 font-bold">
                        No data available for the selected house.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-slate-50/50">
              {filteredTableData.length > 0 ? (
                filteredTableData.map((resident) => (
                  <div key={resident.id} className="p-5 hover:bg-slate-50/50 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-slate-800 text-[16px]">{resident.name}</span>
                        <span className="text-[12.5px] font-bold text-slate-400 mt-1">House {resident.house}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{t('charged') || 'CHARGED'}</span>
                        <span className="text-[14px] font-bold text-slate-700 mt-0.5">€{resident.charged.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-slate-50/70 rounded-[1.25rem] border border-slate-100/80">
                      <div className="flex-1 flex flex-col">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{t('paid')}</span>
                        <span className="text-[16px] font-extrabold text-emerald-600 mt-1">€{resident.paid.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="w-px h-8 bg-slate-200"></div>
                      <div className="flex-1 flex flex-col">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{t('outstanding')}</span>
                        <span className="text-[16px] font-black text-rose-600 mt-1">€{resident.outstanding.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-slate-500 font-bold">
                  No data available for the selected house.
                </div>
              )}
            </div>
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
            <button onClick={handleExportCSV} className="w-full inline-flex items-center justify-between px-5 py-4 border border-slate-100 rounded-xl hover:bg-slate-50 hover:border-slate-200 shadow-sm shadow-slate-100/10 transition-all duration-300 group cursor-pointer">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mr-3 font-black text-[11px]">CSV</div>
                <span className="text-[14px] font-bold text-slate-700">Detailed Ledger</span>
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </button>

            <button onClick={handleExportXLS} className="w-full inline-flex items-center justify-between px-5 py-4 border border-slate-100 rounded-xl hover:bg-slate-50 hover:border-slate-200 shadow-sm shadow-slate-100/10 transition-all duration-300 group cursor-pointer">
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
