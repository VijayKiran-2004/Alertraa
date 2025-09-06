'use client';

import { X, Plus, Minus } from 'lucide-react';
import GoogleMap from './google-map';
import { mockData } from '@/lib/mock-data';

interface EnlargedMapModalProps {
  onClose: () => void;
  isDarkMode: boolean;
}

export default function EnlargedMapModal({ onClose, isDarkMode }: EnlargedMapModalProps) {
  const headerBgClasses = isDarkMode ? 'bg-card border-slate-700 text-white' : 'bg-white border-gray-200 text-slate-900';

  return (
    <div className="fixed inset-0 flex flex-col z-50 animate-fade-in" style={{ backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' }}>
      <div className={`p-4 border-b flex items-center justify-between shadow-sm ${headerBgClasses}`}>
        <h2 className="text-2xl font-headline font-bold">Live Location</h2>
        <button onClick={onClose} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
          <X size={24} />
        </button>
      </div>
      <div className="relative flex-1">
        <GoogleMap
          location={mockData.location}
          showControls={true}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}
