import React, { useState, useRef } from 'react';
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

  const textareaRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const handleInsertVariable = (variable) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = messageTemplate;
    
    const newText = currentText.substring(0, start) + variable + currentText.substring(end);
    setMessageTemplate(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + variable.length, start + variable.length);
    }, 0);
  };

  const handleSaveDefaults = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setToast({
        title: 'Defaults Saved',
        message: 'Your automated notice templates have been successfully updated.',
        type: 'success'
      });
      setTimeout(() => setToast(null), 4000);
    }, 1200);
  };

  // Dummy Data
  // Houses State
  const [houses, setHouses] = useState([
    { id: 1, name: 'House A1', status: 'Occupied', type: 'Studio' },
    { id: 2, name: 'House A2', status: 'Occupied', type: '1-Bedroom' },
    { id: 3, name: 'House B1', status: 'Occupied', type: '2-Bedroom' },
    { id: 4, name: 'House B2', status: 'Vacant', type: 'Studio' },
    { id: 5, name: 'House C1', status: 'Occupied', type: 'Penthouse' },
  ]);

  // House Modal State
  const [isHouseModalOpen, setIsHouseModalOpen] = useState(false);
  const [editingHouse, setEditingHouse] = useState(null);
  const [houseForm, setHouseForm] = useState({ name: '', status: 'Vacant', type: 'Studio' });

  // House Handlers
  const handleOpenAddHouse = () => {
    setEditingHouse(null);
    setHouseForm({ name: '', status: 'Vacant', type: 'Studio' });
    setIsHouseModalOpen(true);
  };

  const handleOpenEditHouse = (house) => {
    setEditingHouse(house);
    setHouseForm({ name: house.name, status: house.status, type: house.type });
    setIsHouseModalOpen(true);
  };

  const handleDeleteHouse = (id) => {
    // Deprecated for generic confirmDelete
  };

  const handleSaveHouse = () => {
    if (!houseForm.name || !houseForm.type) return;
    
    if (editingHouse) {
      setHouses(houses.map(h => h.id === editingHouse.id ? { ...h, ...houseForm } : h));
    } else {
      const newId = houses.length > 0 ? Math.max(...houses.map(h => h.id)) + 1 : 1;
      setHouses([...houses, { id: newId, ...houseForm }]);
    }
    setIsHouseModalOpen(false);
  };

  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@residence.com', status: 'Active' },
    { id: 2, name: 'Sarah Manager', email: 'sarah@residence.com', status: 'Active' },
    { id: 3, name: 'Support Staff', email: 'support@residence.com', status: 'Inactive' },
  ]);

  // User Modal State
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({ name: '', email: '', status: 'Active' });

  // Delete Confirmation State
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, type: null, id: null, name: '' });

  // User Handlers
  const handleOpenAddUser = () => {
    setEditingUser(null);
    setUserForm({ name: '', email: '', status: 'Active' });
    setIsUserModalOpen(true);
  };

  const handleOpenEditUser = (user) => {
    setEditingUser(user);
    setUserForm({ name: user.name, email: user.email, status: user.status });
    setIsUserModalOpen(true);
  };

  const handleSaveUser = () => {
    if (!userForm.name || !userForm.email) return;

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userForm } : u));
    } else {
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      setUsers([...users, { id: newId, ...userForm }]);
    }
    setIsUserModalOpen(false);
  };

  const requestDelete = (type, id, name) => {
    setDeleteConfirm({ isOpen: true, type, id, name });
  };

  const confirmDelete = () => {
    if (deleteConfirm.type === 'house') {
      setHouses(houses.filter((h) => h.id !== deleteConfirm.id));
    } else if (deleteConfirm.type === 'user') {
      setUsers(users.filter((u) => u.id !== deleteConfirm.id));
    }
    setDeleteConfirm({ isOpen: false, type: null, id: null, name: '' });
  };

  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Bank Connection', description: 'Reconcile statement CSVs automatically.', icon: Globe, status: 'Connected', connected: true },
    { id: 2, name: 'DATEV Export', description: 'Standard accounting exports formats support.', icon: FileText, status: 'Not Connected', connected: false },
    { id: 3, name: 'Email Service', description: 'Send automated tenant notifications setups.', icon: Mail, status: 'Connected', connected: true },
  ]);

  const [integrationLoading, setIntegrationLoading] = useState(null);
  const [managingIntegration, setManagingIntegration] = useState(null);

  const handleConnectIntegration = (id) => {
    setIntegrationLoading(id);
    setTimeout(() => {
      setIntegrations(integrations.map(inv => inv.id === id ? { ...inv, connected: true, status: 'Connected' } : inv));
      setIntegrationLoading(null);
      setToast({
        title: 'Integration Connected',
        message: 'The service has been successfully connected and synced.',
        type: 'success'
      });
      setTimeout(() => setToast(null), 4000);
    }, 1500);
  };

  const handleDisconnectIntegration = (id) => {
    setIntegrations(integrations.map(inv => inv.id === id ? { ...inv, connected: false, status: 'Not Connected' } : inv));
    setManagingIntegration(null);
    setToast({
      title: 'Integration Disconnected',
      message: 'The service has been disconnected.',
      type: 'success'
    });
    setTimeout(() => setToast(null), 4000);
  };

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
      <div className="grid grid-cols-2 md:flex bg-white p-1.5 rounded-[1.25rem] border border-slate-100/80 shadow-sm shadow-slate-100/30 gap-2 w-full md:w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center md:justify-start gap-2.5 px-3 py-3 md:px-5 rounded-xl text-[13px] md:text-[14px] font-bold transition-all duration-300 w-full ${activeTab === tab.id ? 'bg-violet-600 text-white shadow-sm hover:shadow-md' : 'bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200'}`}
          >
            <tab.icon className={`w-4 h-4 shrink-0 ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`} />
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
              <button 
                onClick={handleOpenAddHouse}
                className="inline-flex items-center px-4 py-2 bg-violet-600 rounded-xl text-[13px] font-bold text-white hover:bg-violet-700 hover:shadow-md shadow-violet-100 transition-all active:scale-95 group focus:ring-4 focus:ring-violet-100"
              >
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
                    <button 
                      onClick={() => handleOpenEditHouse(house)}
                      className="p-2 hover:bg-slate-50 rounded-xl text-slate-500 hover:text-slate-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => requestDelete('house', house.id, house.name)}
                      className="p-2 hover:bg-rose-50 rounded-xl text-slate-400 hover:text-rose-600"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
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
              <button 
                onClick={handleOpenAddUser}
                className="inline-flex items-center px-4 py-2 bg-violet-600 rounded-xl text-[13px] font-bold text-white hover:bg-violet-700 hover:shadow-md shadow-violet-100 transition-all active:scale-95 group focus:ring-4 focus:ring-violet-100"
              >
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
                          <button 
                            onClick={() => handleOpenEditUser(user)}
                            className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-slate-800"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => requestDelete('user', user.id, user.name)}
                            className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
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
                  ref={textareaRef}
                  rows={5}
                  className="w-full p-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 font-bold text-slate-700 text-[14px] leading-relaxed resize-none focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all wrap text-wrap"
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                />
              </div>

              <div>
                  <p className="text-[11px] font-black uppercase text-slate-400 tracking-wide mb-3">Dynamic Variables</p>
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

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={handleSaveDefaults}
                  disabled={isSaving}
                  className="inline-flex items-center px-5 py-2.5 bg-violet-600 rounded-xl text-[13px] font-bold text-white hover:bg-violet-700 hover:shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] justify-center"
                >
                  {isSaving ? (
                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                  ) : null}
                  {isSaving ? 'Saving...' : t('saveDefaults')}
                </button>
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
                    <button 
                      onClick={() => item.connected ? setManagingIntegration(item) : handleConnectIntegration(item.id)}
                      disabled={integrationLoading === item.id}
                      className={`px-4 py-1.5 rounded-xl text-[12px] font-bold transition-all flex items-center justify-center min-w-[80px] ${item.connected ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm shadow-indigo-100 disabled:opacity-70'}`}
                    >
                      {integrationLoading === item.id ? (
                        <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        item.connected ? t('manage') : t('connect')
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* House Modal Component */}
      {isHouseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-300 m-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-extrabold text-slate-800">
                {editingHouse ? 'Edit Unit' : 'Add New Unit'}
              </h3>
              <button 
                onClick={() => setIsHouseModalOpen(false)}
                className="text-slate-400 hover:text-rose-500 transition-colors bg-slate-50 hover:bg-rose-50 p-2 rounded-xl"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2">Unit Name</label>
                <input 
                  type="text" 
                  value={houseForm.name}
                  onChange={e => setHouseForm({...houseForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all text-sm"
                  placeholder="e.g. House A3"
                />
              </div>
              
              <div>
                <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2">Unit Type</label>
                <input 
                  type="text" 
                  value={houseForm.type}
                  onChange={e => setHouseForm({...houseForm, type: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all text-sm"
                  placeholder="e.g. Studio, 1-Bedroom"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2">Occupancy Status</label>
                <select 
                  value={houseForm.status}
                  onChange={e => setHouseForm({...houseForm, status: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all cursor-pointer text-sm appearance-none"
                >
                  <option value="Vacant">Vacant</option>
                  <option value="Occupied">Occupied</option>
                </select>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setIsHouseModalOpen(false)}
                className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveHouse}
                disabled={!houseForm.name || !houseForm.type}
                className="px-6 py-2.5 bg-violet-600 rounded-xl font-bold text-white hover:bg-violet-700 hover:shadow-lg shadow-violet-100 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {editingHouse ? 'Save Changes' : 'Add Unit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Modal Component */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-300 m-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-extrabold text-slate-800">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h3>
              <button 
                onClick={() => setIsUserModalOpen(false)}
                className="text-slate-400 hover:text-rose-500 transition-colors bg-slate-50 hover:bg-rose-50 p-2 rounded-xl"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2">User Name</label>
                <input 
                  type="text" 
                  value={userForm.name}
                  onChange={e => setUserForm({...userForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all text-sm"
                  placeholder="e.g. John Doe"
                />
              </div>
              
              <div>
                <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={userForm.email}
                  onChange={e => setUserForm({...userForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all text-sm"
                  placeholder="e.g. user@residence.com"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2">Status</label>
                <select 
                  value={userForm.status}
                  onChange={e => setUserForm({...userForm, status: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all cursor-pointer text-sm appearance-none"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setIsUserModalOpen(false)}
                className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveUser}
                disabled={!userForm.name || !userForm.email}
                className="px-6 py-2.5 bg-violet-600 rounded-xl font-bold text-white hover:bg-violet-700 hover:shadow-lg shadow-violet-100 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {editingUser ? 'Save Changes' : 'Add User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 animate-in zoom-in-95 duration-300 m-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-rose-500"></div>
            
            <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center mb-6 border border-rose-100/50 shadow-sm shadow-rose-50">
              <Trash className="w-7 h-7 text-rose-500" />
            </div>
            
            <h3 className="text-xl font-extrabold text-slate-800 mb-2">Confirm Action</h3>
            <p className="text-[14px] font-medium text-slate-500 leading-relaxed mb-8">
              Are you sure you want to delete <span className="font-extrabold text-slate-700">{deleteConfirm.name}</span>? This action cannot be undone.
            </p>

            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setDeleteConfirm({ isOpen: false, type: null, id: null, name: '' })}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-100 hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm active:scale-95"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Integration Modal */}
      {managingIntegration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 animate-in zoom-in-95 duration-300 m-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-slate-200"></div>
            
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 border bg-emerald-50 text-emerald-600 border-emerald-100/60`}>
              <managingIntegration.icon className="w-7 h-7" />
            </div>
            
            <h3 className="text-xl font-extrabold text-slate-800 mb-1">{managingIntegration.name} Integration</h3>
            <p className="text-[13px] font-medium text-slate-500 leading-relaxed mb-8">
              This service is currently connected and actively syncing. Would you like to disconnect it?
            </p>

            <div className="flex flex-col gap-3 w-full">
              <button 
                onClick={() => setManagingIntegration(null)}
                className="w-full py-3 px-4 rounded-xl font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors text-[13px]"
              >
                Close Manager
              </button>
              <button 
                onClick={() => handleDisconnectIntegration(managingIntegration.id)}
                className="w-full py-3 px-4 rounded-xl font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 transition-all text-[13px]"
              >
                Disconnect Service
              </button>
            </div>
          </div>
        </div>
      )}

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
              <CheckCircle2 className="w-5 h-5" />
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
