'use client';

import { useState } from 'react';
import { Pill, Heart, Search } from 'lucide-react';
import SectionCard from './section-card';
import { mockData } from '@/lib/mock-data';
import type { Medicine } from '@/types';

interface ECommercePageProps {
  isDarkMode: boolean;
  wishlist: number[];
  toggleWishlist: (medicineId: number) => void;
  onAddToCart: (medicine: Medicine) => void;
}

export default function ECommercePage({ isDarkMode, wishlist, toggleWishlist, onAddToCart }: ECommercePageProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const medicines = mockData.eCommerce.medicines;
  const filteredMedicines = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const frequentlyBought = filteredMedicines.filter((m) => m.frequentlyBought);
  const otherMedicines = filteredMedicines.filter((m) => !m.frequentlyBought);

  const isWishlisted = (medicineId: number) => wishlist.includes(medicineId);

  const textClasses = isDarkMode ? 'text-white' : 'text-slate-900';
  const secondaryTextClasses = isDarkMode ? 'text-slate-400' : 'text-gray-500';
  const cardClasses = isDarkMode ? 'bg-slate-800' : 'bg-white';

  const renderMedicineCard = (medicine: Medicine) => (
    <div key={medicine.id} className={`p-4 rounded-xl shadow-md ${cardClasses} flex flex-col justify-between`}>
      <div>
        <div className="flex items-start space-x-3 mb-3">
          <Pill size={32} className="text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className={`text-base font-headline font-bold ${textClasses}`}>{medicine.name}</h3>
            <p className={`text-xs ${secondaryTextClasses}`}>{medicine.description}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3">
        <p className={`text-lg font-bold text-primary`}>${medicine.price}</p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleWishlist(medicine.id)}
            className={`p-2 rounded-full transition-colors ${
              isWishlisted(medicine.id)
                ? 'bg-red-100 text-red-500'
                : `${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} text-gray-500 dark:text-gray-400`
            }`}
            aria-label={isWishlisted(medicine.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} fill={isWishlisted(medicine.id) ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => onAddToCart(medicine)}
            className="px-3 py-1.5 text-sm bg-gradient-to-r from-primary to-accent text-white rounded-lg shadow-md hover:opacity-90 transition-opacity"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <SectionCard isDarkMode={isDarkMode}>
        <div className="mb-4">
          <h2 className="text-xl font-headline font-bold">Buy Medicines</h2>
          <div className="relative mt-4">
            <input
              type="text"
              placeholder="Search for medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full p-3 pl-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary ${
                isDarkMode ? 'bg-slate-700 text-white placeholder-slate-400 border-slate-600' : 'bg-gray-100 text-slate-900 placeholder-gray-500 border-gray-300'
              }`}
            />
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} />
          </div>
        </div>
      </SectionCard>

      {wishlist.length > 0 && (
        <SectionCard title="My Wishlist" isDarkMode={isDarkMode}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {medicines.filter((m) => isWishlisted(m.id)).map(renderMedicineCard)}
          </div>
        </SectionCard>
      )}

      {frequentlyBought.length > 0 && (
        <SectionCard title="Frequently Bought" isDarkMode={isDarkMode}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {frequentlyBought.map(renderMedicineCard)}
          </div>
        </SectionCard>
      )}

      <SectionCard title="All Medicines" isDarkMode={isDarkMode}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherMedicines.map(renderMedicineCard)}
        </div>
      </SectionCard>
    </div>
  );
}
