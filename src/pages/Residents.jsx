import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  XCircle,
  Users as UsersIcon,
  Edit2,
  Trash2
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import { residents as initialResidents } from '../data/mockData';

export default function Residents() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [residents, setResidents] = useState(initialResidents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [houseFilter, setHouseFilter] = useState('All');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [newResident, setNewResident] = useState({
    name: '',
    house: 'A1',
    email: '',
    charge: 1200
  });

  const [editingResident, setEditingResident] = useState(null);
  const [residentToDelete, setResidentToDelete] = useState(null);

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

  const filteredResidents = residents.filter(r => {
    const nameMatch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    const idMatch = r.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = nameMatch || idMatch;
    const matchesHouse = houseFilter === 'All' || r.house === houseFilter;
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesHouse && matchesStatus;
  });

  const handleEditClick = (resident) => {
    setEditingResident({ ...resident });
    setIsEditModalOpen(true);
  };

  const handleUpdateResident = (e) => {
    e.preventDefault();
    setResidents(residents.map(r => r.id === editingResident.id ? editingResident : r));
    setIsEditModalOpen(false);
    setEditingResident(null);
  };

  const handleDeleteClick = (resident) => {
    setResidentToDelete(resident);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setResidents(residents.filter(r => r.id !== residentToDelete.id));
    setIsDeleteModalOpen(false);
    setResidentToDelete(null);
  };

  const handleAddResident = (e) => {
    e.preventDefault();
    if (!newResident.name || !newResident.email) {
      alert('Please fill in all required fields.');
      return;
    }
    const residentToAdd = {
      ...newResident,
      id: Math.floor(Math.random() * 900 + 100).toString(),
      balance: 0,
      status: 'Paid'
    };
    setResidents([residentToAdd, ...residents]);
    setIsAddModalOpen(false);
    setNewResident({ name: '', house: 'A1', email: '', charge: 1200 });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{t('residents')}</h2>
          <p className="text-slate-500 text-[15px] mt-1.5 font-medium">Manage and view all resident balances and data.</p>
        </div>
        <div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-violet-600 rounded-[1.25rem] text-[15px] font-bold text-white hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 group focus:ring-4 focus:ring-violet-100"
          >
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
        <div className="w-full">
          {filteredResidents.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
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
                        className="even:bg-slate-50/50 hover:bg-slate-50 transition-all duration-300 group cursor-default"
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
                              onClick={() => handleEditClick(resident)}
                              className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 border border-transparent rounded-2xl transition-all duration-300 active:scale-90"
                              title="Edit Resident"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteClick(resident)}
                              className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 border border-transparent rounded-2xl transition-all duration-300 active:scale-90"
                              title="Delete Resident"
                            >
                              <Trash2 className="w-5 h-5" />
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
                {filteredResidents.map((resident) => (
                  <div key={resident.id} className="p-5 hover:bg-slate-50/50 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col">
                        <button 
                          onClick={() => navigate(`/residents/${resident.id}`)}
                          className="font-extrabold text-slate-800 text-[16px] hover:text-indigo-600 transition-colors text-left"
                        >
                          {resident.name}
                        </button>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                            {resident.house}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Outst.</span>
                        <span className={`text-[15px] font-black mt-0.5 ${resident.balance > 0 ? 'text-rose-600' : 'text-slate-400'}`}>
                          €{resident.balance.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 border-t border-slate-50 pt-4">
                      {getStatusBadge(resident.status)}
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => navigate(`/residents/${resident.id}`)}
                          className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-xl transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditClick(resident)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(resident)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
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
              <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mb-6 border border-slate-100">
                <UsersIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">No residents found</h3>
              <p className="text-slate-500 mt-2 max-w-xs font-medium">We couldn't find any residents matching your current search or filter criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setHouseFilter('All');
                  setStatusFilter('All');
                }}
                className="mt-6 text-indigo-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-10 py-8 border-t border-slate-50 bg-slate-50/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Showing <span className="text-slate-800">1 to {filteredResidents.length}</span> of <span className="text-slate-800">{filteredResidents.length}</span> residents</span>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 border border-slate-200 bg-white text-slate-400 rounded-[1.25rem] text-sm font-bold opacity-50 cursor-not-allowed shadow-sm transition-all">Previous</button>
            <button className="px-6 py-2.5 border border-slate-200 bg-white text-slate-400 rounded-[1.25rem] text-sm font-bold opacity-50 cursor-not-allowed shadow-sm transition-all">Next</button>
          </div>
        </div>

      </div>

      {/* Add Resident Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Add New Resident</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddResident} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider ml-1">Full Name</label>
                <input 
                  type="text"
                  required
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all placeholder:font-medium"
                  placeholder="Enter resident name"
                  value={newResident.name}
                  onChange={(e) => setNewResident({...newResident, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider ml-1">House No.</label>
                  <select 
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 appearance-none cursor-pointer transition-all"
                    value={newResident.house}
                    onChange={(e) => setNewResident({...newResident, house: e.target.value})}
                  >
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider ml-1">Monthly Charge</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">€</span>
                    <input 
                      type="number"
                      required
                      className="w-full pl-8 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all placeholder:font-medium"
                      placeholder="0.00"
                      value={newResident.charge}
                      onChange={(e) => setNewResident({...newResident, charge: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider ml-1">Email Address</label>
                <input 
                  type="email"
                  required
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all placeholder:font-medium"
                  placeholder="resident@example.com"
                  value={newResident.email}
                  onChange={(e) => setNewResident({...newResident, email: e.target.value})}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-[11px]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-violet-600 text-white font-black rounded-2xl hover:bg-violet-700 transition-all shadow-md hover:shadow-lg hover:shadow-violet-200 uppercase tracking-widest text-[11px]"
                >
                  Save Resident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Resident Modal */}
      {isEditModalOpen && editingResident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Edit Resident</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateResident} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider ml-1">Full Name</label>
                <input 
                  type="text"
                  required
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all placeholder:font-medium"
                  placeholder="Enter resident name"
                  value={editingResident.name}
                  onChange={(e) => setEditingResident({...editingResident, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider ml-1">House No.</label>
                  <select 
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 appearance-none cursor-pointer transition-all"
                    value={editingResident.house}
                    onChange={(e) => setEditingResident({...editingResident, house: e.target.value})}
                  >
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider ml-1">Monthly Charge</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">€</span>
                    <input 
                      type="number"
                      required
                      className="w-full pl-8 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all placeholder:font-medium"
                      placeholder="0.00"
                      value={editingResident.charge}
                      onChange={(e) => setEditingResident({...editingResident, charge: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider ml-1">Email Address</label>
                <input 
                  type="email"
                  required
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 transition-all placeholder:font-medium"
                  placeholder="resident@example.com"
                  value={editingResident.email}
                  onChange={(e) => setEditingResident({...editingResident, email: e.target.value})}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-[11px]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-violet-600 text-white font-black rounded-2xl hover:bg-violet-700 transition-all shadow-md hover:shadow-lg hover:shadow-violet-200 uppercase tracking-widest text-[11px]"
                >
                  Update Resident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && residentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl space-y-8 animate-in zoom-in-95 duration-300 text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-rose-50 rounded-[2rem] flex items-center justify-center text-rose-500 mb-6 border border-rose-100 shadow-sm">
                <Trash2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Delete Resident?</h3>
              <p className="text-slate-500 mt-2 font-medium">
                Are you sure you want to delete <span className="font-extrabold text-slate-800">{residentToDelete.name}</span>? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-[11px]"
              >
                No, Keep
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-4 bg-rose-600 text-white font-black rounded-2xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-100 uppercase tracking-widest text-[11px]"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
