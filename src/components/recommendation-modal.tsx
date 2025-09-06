'use client';

import { X } from 'lucide-react';
import type { MaintenanceTip } from '@/types';

interface RecommendationModalProps {
  tip: MaintenanceTip;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function RecommendationModal({ tip, onClose, isDarkMode }: RecommendationModalProps) {
  const modalBgClasses = isDarkMode ? 'bg-card text-white' : 'bg-white text-slate-900';
  const textMutedClasses = isDarkMode ? 'text-slate-400' : 'text-gray-600';

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`p-6 rounded-2xl shadow-xl max-w-md w-full space-y-4 ${modalBgClasses}`}>
        <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
                <span className="text-primary">{tip.icon}</span>
                <h2 className="text-2xl font-headline font-bold">{tip.title}</h2>
            </div>
          <button onClick={onClose} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
            <X size={24} />
          </button>
        </div>
        
        <p className={`${textMutedClasses}`}>
          {tip.text}
        </p>

        <div className="pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-6 bg-primary text-white rounded-md font-bold hover:opacity-90 transition-opacity"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
