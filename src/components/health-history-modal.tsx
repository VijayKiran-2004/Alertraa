'use client';

import { X } from 'lucide-react';
import { mockData } from '@/lib/mock-data';

interface HealthHistoryModalProps {
  onClose: () => void;
  isDarkMode: boolean;
}

export default function HealthHistoryModal({ onClose, isDarkMode }: HealthHistoryModalProps) {
  const modalBgClasses = isDarkMode ? 'bg-card text-white' : 'bg-white text-slate-900';
  const listBgClasses = isDarkMode ? 'bg-slate-700' : 'bg-gray-100';
  const listTextClasses = isDarkMode ? 'text-white' : 'text-gray-700';

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`p-6 rounded-2xl shadow-xl max-w-lg w-full space-y-4 overflow-y-auto max-h-[90vh] ${modalBgClasses}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-headline font-bold">Health History</h2>
          <button onClick={onClose} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
            <X size={24} />
          </button>
        </div>

        <ul className="space-y-4">
          {mockData.healthHistoryDetails.map((entry, index) => (
            <li key={index} className={`p-4 rounded-lg shadow-sm ${listBgClasses}`}>
              <div className="flex items-center justify-between text-sm mb-2">
                <p className={`font-bold text-md ${listTextClasses}`}>{entry.date}</p>
                <p className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-semibold">{entry.type}</p>
              </div>

              <p className={`text-sm mt-1 ${listTextClasses}`}>{entry.description}</p>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {entry.condition && (
                  <div>
                    <p className={`font-medium text-muted-foreground`}>Condition:</p>
                    <p className={listTextClasses}>{entry.condition}</p>
                  </div>
                )}
                {entry.medication && (
                  <div>
                    <p className={`font-medium text-muted-foreground`}>Medication:</p>
                    <p className={listTextClasses}>{entry.medication}</p>
                  </div>
                )}
                {entry.duration && (
                  <div>
                    <p className={`font-medium text-muted-foreground`}>Duration:</p>
                    <p className={listTextClasses}>{entry.duration}</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
