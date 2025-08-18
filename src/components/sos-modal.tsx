'use client';

import { AlertTriangle } from 'lucide-react';

interface SosModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isDarkMode: boolean;
}

export default function SosModal({ onConfirm, onCancel, isDarkMode }: SosModalProps) {
  const modalBgClasses = isDarkMode ? 'bg-[#36454F] text-white' : 'bg-white text-slate-900';
  const textMutedClasses = isDarkMode ? 'text-slate-400' : 'text-gray-600';
  const cancelBtnClasses = 'py-3 px-4 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 dark:bg-slate-600 dark:text-white dark:hover:bg-slate-500 transition-colors';

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`p-6 rounded-2xl shadow-xl border border-red-500/50 max-w-sm w-full space-y-4 ${modalBgClasses}`}>
        <div className="flex items-center justify-center text-red-500 mb-2 animate-pulse-fast">
          <AlertTriangle size={48} />
        </div>
        <h2 className="text-xl font-headline font-bold text-center">Emergency Alert</h2>
        <p className={`text-center ${textMutedClasses}`}>Are you sure you want to send an SOS alert to your emergency contacts?</p>
        <div className="flex justify-between space-x-4 pt-4">
          <button
            onClick={onCancel}
            className={`flex-1 ${cancelBtnClasses}`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
