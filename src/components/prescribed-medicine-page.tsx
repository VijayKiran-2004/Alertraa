'use client';

import { useState } from 'react';
import { Upload, ShoppingCart } from 'lucide-react';
import SectionCard from './section-card';
import { mockData } from '@/lib/mock-data';
import type { Prescription, Medicine } from '@/types';

interface PrescribedMedicinePageProps {
  isDarkMode: boolean;
  onAddToCart: (medicine: Medicine) => void;
}

export default function PrescribedMedicinePage({ isDarkMode, onAddToCart }: PrescribedMedicinePageProps) {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockData.userDetails.prescriptions);

  const handleUpload = () => {
    const newPrescription: Prescription = {
      id: Math.random(),
      name: `Prescription from Dr. House`,
      date: new Date().toISOString().slice(0, 10),
      doctor: 'Dr. House',
      file: 'new_rx.pdf',
      price: '25.00',
      description: 'Newly uploaded prescription.',
      frequentlyBought: false,
    };
    setPrescriptions([...prescriptions, newPrescription]);
    console.log('Prescription uploaded successfully!');
  };

  const textClasses = isDarkMode ? 'text-white' : 'text-slate-900';
  const secondaryTextClasses = isDarkMode ? 'text-slate-400' : 'text-gray-500';
  const listBgClasses = isDarkMode ? 'bg-slate-800' : 'bg-gray-100';

  return (
    <div className="space-y-6">
      <SectionCard title="My Prescriptions" isDarkMode={isDarkMode}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <p className={secondaryTextClasses}>Digital copies of your doctor's prescriptions.</p>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg shadow-md hover:opacity-90 transition-opacity flex items-center space-x-2 animate-gradient-xy"
          >
            <Upload size={18} />
            <span>Upload New</span>
          </button>
        </div>
        <ul className="space-y-3">
          {prescriptions.length > 0 ? (
            prescriptions.map((prescription) => (
              <li key={prescription.id} className={`p-4 rounded-xl shadow-sm ${listBgClasses}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-semibold ${textClasses}`}>{prescription.name}</p>
                    <p className={`text-sm ${secondaryTextClasses}`}>From {prescription.doctor} on {prescription.date}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <a href="#" className="text-sm font-medium text-primary hover:underline">
                      View PDF
                    </a>
                    <button
                      onClick={() => onAddToCart(prescription)}
                      className="p-2 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                      aria-label={`Add ${prescription.name} to cart`}
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className={secondaryTextClasses}>No prescriptions found. Upload one to get started!</p>
          )}
        </ul>
      </SectionCard>
    </div>
  );
}
