'use client';

import { useState } from 'react';
import { Pill, ShoppingCart } from 'lucide-react';
import PrescribedMedicinePage from './prescribed-medicine-page';
import ECommercePage from './ecommerce-page';
import SectionCard from './section-card';

interface MedicinePageProps {
  isDarkMode: boolean;
}

export default function MedicinePage({ isDarkMode }: MedicinePageProps) {
  const [activeTab, setActiveTab] = useState('Prescriptions');

  const activeTabClasses = 'border-b-2 border-primary text-primary font-bold';
  const inactiveTabClasses = `border-b-2 border-transparent ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className={isDarkMode ? 'bg-[#36454F]' : 'bg-white'}>
        <div className={`flex justify-around ${isDarkMode ? 'border-b border-slate-700' : 'border-b'}`}>
          <button
            onClick={() => setActiveTab('Prescriptions')}
            className={`flex-1 text-center p-4 transition-colors flex items-center justify-center gap-2 ${activeTab === 'Prescriptions' ? activeTabClasses : inactiveTabClasses}`}
          >
            <Pill size={20} />
            <span className="hidden sm:inline">My Prescriptions</span>
          </button>
          <button
            onClick={() => setActiveTab('E-commerce')}
            className={`flex-1 text-center p-4 transition-colors flex items-center justify-center gap-2 ${activeTab === 'E-commerce' ? activeTabClasses : inactiveTabClasses}`}
          >
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">Buy Medicines</span>
          </button>
        </div>
      </div>
      {activeTab === 'Prescriptions' ? (
        <PrescribedMedicinePage isDarkMode={isDarkMode} />
      ) : (
        <ECommercePage isDarkMode={isDarkMode} />
      )}
    </div>
  );
}
