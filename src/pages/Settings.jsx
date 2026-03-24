import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Home, 
  Users, 
  Bell, 
  Globe, 
  Plus, 
  Edit, 
  Trash, 
  FileText, 
  Mail, 
  Lock,
  CheckCircle2,
  XCircle
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

export default function Settings() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('houses');
  const [messageTemplate, setMessageTemplate] = useState(
    "Dear {Name}, your outstanding balance is {Amount}. Please make the payment as soon as possible."
  );

  // Dummy Data
  const houses = [
    { id: 1, name: 'House A1', status: 'Occupied', type: 'Studio' },
    { id: 2, name: 'House A2', status: 'Occupied', type: '1-Bedroom' },
    { id: 3, name: 'House B1', status: 'Occupied', type: '2-Bedroom' },
    { id: 4, name: 'House B2', status: 'Vacant', type: 'Studio' },
    { id: 5, name: 'House C1', status: 'Occupied', type: 'Penthouse' },
  ];

  const users = [
    { id: 1, name: 'Admin User', email: 'admin@residence.com', status: 'Active' },
    { id: 2, name: 'Sarah Manager', email: 'sarah@residence.com', status: 'Active' },
    { id: 3, name: 'Support Staff', email: 'support@residence.com', status: 'Inactive' },
  ];

  const integrations = [
    { id: 1, name: 'Bank Connection', description: 'Reconcile statement CSVs automatically.', icon: Globe, status: 'Connected', connected: true },
    { id: 2, name: 'DATEV Export', description: 'Standard accounting exports formats support.', icon: FileText, status: 'Not Connected', connected: false },
    { id: 3, name: 'Email Service', description: 'Send automated tenant notifications setups.', icon: Mail, status: 'Connected', connected: true },
  ];

  const tabs = [
    { id: 'houses', name: 'Houses', icon: Home },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'reminders', name: 'Reminder Settings', icon: Bell },
    { id: 'integrations', name: 'Integrations', icon: Globe },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6Border">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{t('settings')}</h2>
          <p className="text-slate-500 text-[15px] mt-1.5 font-medium">{t('manageSystem')}</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex bg-white p-1.5 rounded-[1.25rem] border border-slate-100/80 shadow-sm shadow-slate-100/30 overflow-x-auto gap-2 w-full md:w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-[14px] font-bold transition-all duration-300 ${activeTab === tab.id ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`} />
            <span className="whitespace-nowrap">{t(tab.id)}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80 p-8">

        {/* Houses Tab */}
        {activeTab === 'houses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-extrabold text-slate-800">{t('housesConfiguration')}</h4>
                <p className="text-[13px] font-bold text-slate-400 mt-0.5">Manage residential unit properties setups.</p>
              </div>
              <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl text-[13px] font-bold text-white hover:from-violet-700 hover:to-indigo-700 hover:shadow-md shadow-indigo-50 transition-all active:scale-95 group focus:ring-4 focus:ring-indigo-100">
                <Plus className="w-4 h-4 mr-1.5" /> {t('addUnit')}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {houses.map((house) => (
                <div key={house.id} className="p-5 border border-slate-100 rounded-2xl hover:border-slate-200 hover:shadow-md transition-all duration-300 group flex items-center justify-between">
                  <div>
                    <span className="block text-lg font-extrabold text-slate-800">{house.name}</span>
                    <span className="block text-[12px] font-bold text-slate-400 mt-0.5">{house.type}</span>
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider mt-2 shadow-sm ${house.status === 'Occupied' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-500 border border-slate-100'}`}>{house.status === 'Occupied' ? t('occupied') : t('vacant')}</span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-500 hover:text-slate-800"><Edit className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-rose-50 rounded-xl text-slate-400 hover:text-rose-600"><Trash className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-extrabold text-slate-800">{t('users')}</h4>
                <p className="text-[13px] font-bold text-slate-400 mt-0.5">Manage system users.</p>
              </div>
              <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl text-[13px] font-bold text-white hover:from-violet-700 hover:to-indigo-700 hover:shadow-md shadow-indigo-50 transition-all active:scale-95 group focus:ring-4 focus:ring-indigo-100">
                <Plus className="w-4 h-4 mr-1.5" /> {t('addUser')}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-50 table-fixed">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] flex-1">{t('details')}</th>
                    <th scope="col" className="px-5 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] w-32">{t('status')}</th>
                    <th scope="col" className="px-5 py-4 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] w-24">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-all duration-300">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-extrabold text-slate-800 text-[14px]">{user.name}</span>
                          <span className="text-[11px] font-bold text-slate-400 mt-0.5">{user.email}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>{user.status === 'Active' ? t('active') : t('inactive')}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-slate-800"><Edit className="w-3.5 h-3.5" /></button>
                          <button className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600"><Trash className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reminders Tab */}
        {activeTab === 'reminders' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h4 className="text-xl font-extrabold text-slate-800">{t('reminderNoticeEditor')}</h4>
              <p className="text-[13px] font-bold text-slate-400 mt-0.5">Customize defaults automated tenant notice templates.</p>
            </div>

            <div className="space-y-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              <div>
                <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2">{t('noticeBody')}</label>
                <textarea 
                  rows={5}
                  className="w-full p-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 font-bold text-slate-700 text-[14px] leading-relaxed resize-none focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all wrap text-wrap"
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                />
              </div>

              <div>
                  <p className="text-[11px] font-black uppercase text-slate-400 tracking-wide mb-3">Dynamic Variables</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[11px] font-bold border border-indigo-100/50">{"{Name}"}</span>
                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[11px] font-bold border border-indigo-100/50">{"{Amount}"}</span>
                  </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl text-[13px] font-bold text-white hover:from-violet-700 hover:to-indigo-700 hover:shadow-md transition-all active:scale-95">{t('saveDefaults')}</button>
              </div>
            </div>
          </div>
        )}

        {/* Integrations Tab */}
        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-extrabold text-slate-800">{t('availableIntegrations')}</h4>
              <p className="text-[13px] font-bold text-slate-400 mt-0.5">Connect external bookkeeping and processing tools setups.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {integrations.map((item) => (
                <div key={item.id} className="p-6 border border-slate-100 rounded-[2rem] hover:border-slate-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border shadow-sm ${item.connected ? 'bg-emerald-50 text-emerald-600 border-emerald-100/60' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <h5 className="text-lg font-extrabold text-slate-800">{item.name}</h5>
                    <p className="text-[12px] font-bold text-slate-400 mt-1 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-slate-50 flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider ${item.connected ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {item.connected ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {item.connected ? t('matched') : t('unmatched')}
                    </span>
                    <button className={`px-4 py-1.5 rounded-xl text-[12px] font-bold transition-all ${item.connected ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm shadow-indigo-100'}`}>
                      {item.connected ? t('manage') : t('connect')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
