import React, { useState, useEffect } from 'react';
import { 
  X, 
  Euro, 
  Calendar, 
  CreditCard, 
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AddPaymentModal({ isOpen, onClose, initialResident = '' }) {
  const [residentId, setResidentId] = useState(initialResident);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [method, setMethod] = useState('Bank Transfer');

  // Dummy resident data for outstanding balance lookup
  const residentsData = {
    '101': { name: 'Alice Smith', outstanding: 0 },
    '102': { name: 'Bob Jones', outstanding: 1200 },
    '103': { name: 'Charlie Brown', outstanding: 500 },
    '104': { name: 'Diana Prince', outstanding: 0 },
    '105': { name: 'Evan Wright', outstanding: 2000 },
  };

  const selectedResident = residentsData[residentId] || { name: '', outstanding: 0 };
  const numAmount = parseFloat(amount) || 0;
  const remainingBalance = Math.max(0, selectedResident.outstanding - numAmount);

  // Status Color Logic
  const getStatusColor = () => {
    if (numAmount >= selectedResident.outstanding && selectedResident.outstanding > 0) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (numAmount > 0 && remainingBalance > 0) return 'text-amber-600 bg-amber-50 border-amber-100';
    if (remainingBalance > 0) return 'text-rose-600 bg-rose-50 border-rose-100';
    return 'text-slate-400 bg-slate-50 border-slate-100';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50">
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Add Payment</h3>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          
          {/* Resident Selection */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">Resident</label>
            <select 
              className="block w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
              value={residentId}
              onChange={(e) => setResidentId(e.target.value)}
            >
              <option value="">Select a resident...</option>
              {Object.entries(residentsData).map(([id, res]) => (
                <option key={id} value={id}>{res.name} (House {id.slice(-1)})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                   <Euro className="w-5 h-5" />
                </div>
                <input 
                  type="number"
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <input 
                  type="date"
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">Payment Method</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <select 
                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option>Bank Transfer</option>
                <option>Cash</option>
                <option>Online Payment</option>
              </select>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex gap-3 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 items-start">
            <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-indigo-700 leading-relaxed">
              Payment will be automatically applied to the oldest outstanding charges first (OPOS Logic).
            </p>
          </div>

          {/* Summary Preview */}
          <div className="bg-slate-50/80 rounded-[2rem] p-6 space-y-4 border border-slate-100 shadow-inner">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-400 uppercase tracking-widest">Outstanding Total</span>
              <span className="text-slate-800">€{selectedResident.outstanding.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-400 uppercase tracking-widest">Payment Amount</span>
              <span className="text-emerald-600 font-bold">€{numAmount.toLocaleString()}</span>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
              <span className="text-[13px] font-black text-slate-500 uppercase tracking-widest">Remaining Balance</span>
              <div className={`px-4 py-2 rounded-xl border font-black text-lg transition-colors ${getStatusColor()}`}>
                €{remainingBalance.toLocaleString()}
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-8 bg-slate-50/50 flex items-center justify-end gap-3 border-t border-slate-100">
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-white border border-slate-200/80 rounded-2xl text-[15px] font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button 
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-[15px] font-black text-white hover:from-emerald-600 hover:to-teal-600 shadow-md shadow-emerald-100 transition-all active:scale-95"
            onClick={() => {
              /* Handle Save Logic */
              alert(`Payment of €${numAmount} saved for ${selectedResident.name}`);
              onClose();
            }}
          >
            Save Payment
          </button>
        </div>

      </div>
    </div>
  );
}
