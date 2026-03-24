import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  XCircle, 
  Filter, 
  Send, 
  FileText, 
  Download, 
  HelpCircle, 
  AlertCircle 
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import { residents as mockResidents } from '../data/mockData';

export default function Reminders() {
  const { t } = useLanguage();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [houseFilter, setHouseFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('Overdue'); // Default
  const [selectedResidents, setSelectedResidents] = useState([]);
  
  const [messageTemplate, setMessageTemplate] = useState(
    "Dear {Name}, your outstanding balance is {Amount}. Please make the payment as soon as possible."
  );

  const textareaRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState(null);

  const handleInsertVariable = (variable) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = messageTemplate;
    
    // Insert variable
    const newText = currentText.substring(0, start) + variable + currentText.substring(end);
    setMessageTemplate(newText);
    
    // Set cursor position after variable
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + variable.length, start + variable.length);
    }, 0);
  };

  const handleSendBatch = () => {
    if (selectedResidents.length === 0) return;
    
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setToast({
        title: 'Reminders Sent Successfully',
        message: `Successfully sent payment reminders to ${selectedResidents.length} resident(s).`,
        type: 'success'
      });
      setSelectedResidents([]); // Clear selection
      
      // Auto dismiss toast
      setTimeout(() => {
        setToast(null);
      }, 4000);
    }, 1500);
  };

  // Use mock data but extended with email for reminders
  const residents = mockResidents.map(r => ({
    ...r,
    outstanding: r.balance,
    email: r.email || `${r.name.toLowerCase().replace(' ', '.')}@example.com`
  }));

  // Handle autofill from navigation state
  useEffect(() => {
    if (location.state?.residentId) {
      const resident = residents.find(r => r.id === location.state.residentId);
      if (resident) {
        setStatusFilter('All');
        setSearchTerm(resident.name);
        setSelectedResidents([resident.id]);
      }
    }
  }, [location.state]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedResidents(filteredResidents.map(r => r.id));
    } else {
      setSelectedResidents([]);
    }
  };

  const handleSelectResident = (id) => {
    if (selectedResidents.includes(id)) {
      setSelectedResidents(selectedResidents.filter(item => item !== id));
    } else {
      setSelectedResidents([...selectedResidents, id]);
    }
  };

  const filteredResidents = residents.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHouse = houseFilter === 'All' || r.house === houseFilter;
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesHouse && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const base = "inline-flex items-center px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-[0.08em] shadow-sm border transition-all duration-300 ";
    if (status === 'Overdue') {
      return <span className={base + "bg-rose-50 text-rose-700 border-rose-100/50"}><AlertCircle className="w-3.5 h-3.5 mr-1" /> {t('overdue')}</span>;
    }
    return <span className={base + "bg-amber-50 text-amber-700 border-amber-100/50"}><HelpCircle className="w-3.5 h-3.5 mr-1" /> {t('partial')}</span>;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{t('paymentReminders')}</h2>
          <p className="text-slate-500 text-[15px] mt-1.5 font-medium">Manage and send reminders for overdue residents.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center px-5 py-3 bg-white border border-slate-200 rounded-[1.25rem] text-[14px] font-bold text-slate-700 hover:bg-slate-50 hover:shadow-md transition-all active:scale-95 group focus:ring-4 focus:ring-slate-100">
            <Download className="w-4 h-4 mr-2 text-slate-400 group-hover:text-slate-800 transition-colors" />
            {t('export')}
          </button>
          <button 
            onClick={handleSendBatch}
            className="inline-flex items-center px-6 py-3.5 bg-violet-600 rounded-[1.25rem] text-[15px] font-bold text-white hover:bg-violet-700 hover:shadow-lg shadow-violet-200 hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group focus:ring-4 focus:ring-violet-100"
            disabled={selectedResidents.length === 0 || isSending}
          >
            {isSending ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Send className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
            )}
            {isSending ? (t('sending') || 'Sending...') : `${t('send')} (${selectedResidents.length})`}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
        
        {/* Table/List Area */}
        <div className="xl:col-span-3 bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80 overflow-hidden flex flex-col">
          
          {/* Filters Bar */}
          <div className="p-6 border-b border-slate-50 bg-white flex flex-col md:flex-row gap-4 justify-between items-center">
            
            <div className="relative w-full md:max-w-xs group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-300 group-focus-within:text-violet-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50/30 hover:bg-slate-50 font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 sm:text-sm transition-all duration-300"
                placeholder={t('findResidentPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              {/* Status Tabs */}
              <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-100">
                <button 
                  onClick={() => setStatusFilter('Overdue')}
                  className={`px-3 py-1.5 text-[12px] font-black uppercase tracking-wider rounded-lg transition-all ${statusFilter === 'Overdue' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {t('overdue')}
                </button>
                <button 
                  onClick={() => setStatusFilter('All')}
                  className={`px-3 py-1.5 text-[12px] font-black uppercase tracking-wider rounded-lg transition-all ${statusFilter === 'All' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {t('all')}
                </button>
              </div>

              {/* House Dropdown */}
              <div className="relative">
                <select 
                  className="block w-full pl-4 pr-10 py-2.5 font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 appearance-none cursor-pointer transition-all duration-300"
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
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <Filter className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="w-full">
            {filteredResidents.length > 0 ? (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block">
                  <table className="min-w-full divide-y divide-slate-50 table-fixed">
                    <thead className="bg-slate-50/50">
                      <tr>
                        <th scope="col" className="px-6 py-5 text-left w-12">
                          <input 
                            type="checkbox" 
                            className="rounded text-violet-600 focus:ring-violet-500 h-4 w-4 border-slate-300 transition-all cursor-pointer"
                            onChange={handleSelectAll}
                            checked={filteredResidents.length > 0 && selectedResidents.length === filteredResidents.length}
                          />
                        </th>
                        <th scope="col" className="px-5 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] flex-1">Details</th>
                        <th scope="col" className="px-5 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] w-24">House</th>
                        <th scope="col" className="px-5 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] w-32">Outstanding</th>
                        <th scope="col" className="px-5 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] w-32">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredResidents.map((resident) => (
                        <tr 
                          key={resident.id} 
                          className={`transition-all duration-300 group cursor-default ${
                            resident.status === 'Overdue' ? 'bg-rose-50/40 border-l-4 border-rose-400' : 'even:bg-slate-50/50 hover:bg-slate-50'
                          } ${selectedResidents.includes(resident.id) ? '!bg-indigo-50/20' : ''}`}
                        >
                          <td className="px-6 py-5">
                            <input 
                              type="checkbox" 
                              className="rounded text-violet-600 focus:ring-violet-500 h-4 w-4 border-slate-300 transition-all cursor-pointer"
                              checked={selectedResidents.includes(resident.id)}
                              onChange={() => handleSelectResident(resident.id)}
                            />
                          </td>
                          <td className="px-5 py-5">
                            <div className="flex flex-col">
                              <span className="font-extrabold text-slate-800 text-[15px] group-hover:text-indigo-600 transition-colors break-words">
                                {resident.name}
                              </span>
                              <span className="text-[12px] font-semibold text-slate-400/90 mt-0.5 break-all">
                                {resident.email}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-5 whitespace-nowrap text-[13px] font-bold text-slate-500">
                            {resident.house}
                          </td>
                          <td className="px-5 py-5 whitespace-nowrap">
                            <div className="text-[15px] font-black text-rose-600">
                              €{resident.outstanding.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-5 py-5 whitespace-nowrap">
                            {getStatusBadge(resident.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-slate-50/50 pb-4">
                  {/* Select All Checkbox for Mobile */}
                  <div className="p-4 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
                     <label htmlFor="selectAllMobile" className="text-[13px] font-extrabold text-slate-700 cursor-pointer flex items-center gap-3">
                        <input 
                          id="selectAllMobile"
                          type="checkbox" 
                          className="rounded text-violet-600 focus:ring-violet-500 h-5 w-5 border-slate-300 transition-all cursor-pointer"
                          onChange={handleSelectAll}
                          checked={filteredResidents.length > 0 && selectedResidents.length === filteredResidents.length}
                        />
                        Select All {filteredResidents.length} Residents
                     </label>
                  </div>
                  
                  {filteredResidents.map((resident) => (
                    <div 
                      key={resident.id} 
                      className={`p-5 transition-all duration-300 group cursor-default ${
                        resident.status === 'Overdue' ? 'bg-rose-50/40 border-l-4 border-rose-400' : 'even:bg-slate-50/50 hover:bg-slate-50'
                      } ${selectedResidents.includes(resident.id) ? '!bg-indigo-50/20' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start gap-3">
                          <input 
                            type="checkbox" 
                            className="mt-1 rounded text-violet-600 focus:ring-violet-500 h-5 w-5 border-slate-300 transition-all cursor-pointer"
                            checked={selectedResidents.includes(resident.id)}
                            onChange={() => handleSelectResident(resident.id)}
                          />
                          <div className="flex flex-col">
                            <span className="font-extrabold text-slate-800 text-[16px]">{resident.name}</span>
                            <span className="text-[12.5px] font-bold text-slate-400 mt-1">{resident.email}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">House</span>
                          <span className="text-[14px] font-bold text-slate-700 mt-0.5">{resident.house}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-slate-50/70 rounded-[1.25rem] border border-slate-100/80">
                        <div className="flex-1 flex flex-col">
                           <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Outstanding</span>
                           <span className="text-[16px] font-black text-rose-600 mt-1">€{resident.outstanding.toLocaleString()}</span>
                        </div>
                        <div className="w-px h-8 bg-slate-200"></div>
                        <div className="flex-1 flex flex-col items-end">
                           <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">Status</span>
                           <div>{getStatusBadge(resident.status)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="py-24 flex flex-col items-center justify-center text-center px-10">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 mb-4 border border-slate-100">
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{t('allCaughtUp')}</h3>
                <p className="text-slate-500 mt-2 max-w-xs font-medium">No residents found matching your overdue criteria filter.</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Editor Container */}
        <div className="xl:col-span-1 bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80 p-6 flex flex-col sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-extrabold text-slate-800">{t('message')}</h4>
                <p className="text-[12px] font-bold text-slate-400">Template editor</p>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2">{t('noticeBody')}</label>
              <textarea 
                ref={textareaRef}
                rows={4}
                className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 font-bold text-slate-700 text-[14px] leading-relaxed resize-none focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all wrap text-wrap"
                value={messageTemplate}
                onChange={(e) => setMessageTemplate(e.target.value)}
              />
            </div>

            <div>
                <p className="text-[11px] font-black uppercase text-slate-400 tracking-wide mb-3">{t('variables')}</p>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => handleInsertVariable('{Name}')}
                    className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-[11px] font-bold border border-indigo-100/50 transition-colors cursor-pointer"
                  >
                    {"{Name}"}
                  </button>
                  <button 
                    onClick={() => handleInsertVariable('{Amount}')}
                    className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-[11px] font-bold border border-indigo-100/50 transition-colors cursor-pointer"
                  >
                    {"{Amount}"}
                  </button>
                </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
               <div className="flex items-center justify-between text-[13px] font-bold text-slate-500 mb-3">
                  <span>{t('audience')}</span>
                  <span className="text-slate-800 font-extrabold">{selectedResidents.length}</span>
               </div>
               <div className="flex items-center justify-between text-[13px] font-bold text-slate-500 mb-5">
                  <span>{t('channel')}</span>
                  <span className="text-slate-800 font-extrabold flex items-center gap-1">Email <Send className="w-3.5 h-3.5 text-violet-600" /></span>
               </div>
               
               <button 
                  onClick={handleSendBatch}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-violet-600 rounded-[1rem] text-[13px] font-bold text-white hover:bg-violet-700 shadow-md shadow-violet-100 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group focus:ring-4 focus:ring-violet-100 transition-all font-black uppercase tracking-wider h-12"
                  disabled={selectedResidents.length === 0 || isSending}
                >
                  {isSending ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    t('sendBatch')
                  )}
               </button>
            </div>
        </div>

      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 pr-12 relative flex items-start gap-4 max-w-sm">
            <button 
              onClick={() => setToast(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              toast.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
            }`}>
              {toast.type === 'success' ? <Bell className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <div>
              <h5 className="text-[15px] font-extrabold text-slate-800">{toast.title}</h5>
              <p className="text-[13px] font-medium text-slate-500 mt-1 leading-relaxed">
                {toast.message}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
