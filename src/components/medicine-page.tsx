'use client';

import { useState } from 'react';
import { Pill, ShoppingCart } from 'lucide-react';
import PrescribedMedicinePage from './prescribed-medicine-page';
import ECommercePage from './ecommerce-page';
import type { Medicine } from '@/types';

interface MedicinePageProps {
  isDarkMode: boolean;
  cartCount: number;
  onShowCart: () => void;
  wishlist: number[];
  toggleWishlist: (medicineId: number) => void;
  onAddToCart: (medicine: Medicine) => void;
}

export default function MedicinePage({ isDarkMode, cartCount, onShowCart, wishlist, toggleWishlist, onAddToCart }: MedicinePageProps) {
  const [activeTab, setActiveTab] = useState('Prescriptions');

  const activeTabClasses = 'border-b-2 border-primary text-primary font-bold';
  const inactiveTabClasses = `border-b-2 border-transparent ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`;
  const tabBaseClasses = 'flex-1 text-center p-4 transition-colors flex items-center justify-center gap-2 relative';

  const EcommerceTab = activeTab === 'E-commerce' ? 'div' : 'button';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className={isDarkMode ? 'bg-[#36454F]' : 'bg-white'}>
        <div className={`flex justify-around ${isDarkMode ? 'border-b border-slate-700' : 'border-b'}`}>
          <button
            onClick={() => setActiveTab('Prescriptions')}
            className={`${tabBaseClasses} ${activeTab === 'Prescriptions' ? activeTabClasses : inactiveTabClasses}`}
          >
            <Pill size={20} />
            <span className="hidden sm:inline">My Prescriptions</span>
          </button>
          <EcommerceTab
            onClick={() => setActiveTab('E-commerce')}
            className={`${tabBaseClasses} ${activeTab === 'E-commerce' ? activeTabClasses : inactiveTabClasses}`}
          >
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">Buy Medicines</span>
            {activeTab === 'E-commerce' && cartCount > 0 && (
                <button onClick={(e) => { e.stopPropagation(); onShowCart();}} className="absolute top-2 right-2 sm:top-1/2 sm:-translate-y-1/2 sm:right-4 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                </button>
            )}
          </EcommerceTab>
        </div>
      </div>
      {activeTab === 'Prescriptions' ? (
        <PrescribedMedicinePage isDarkMode={isDarkMode} />
      ) : (
        <ECommercePage isDarkMode={isDarkMode} wishlist={wishlist} toggleWishlist={toggleWishlist} onAddToCart={onAddToCart} />
      )}
    </div>
  );
}
