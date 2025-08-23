'use client';

import { X, Pill, Stethoscope } from 'lucide-react';
import type { Prescription } from '@/types';
import { mockData } from '@/lib/mock-data';

interface PrescriptionDetailsModalProps {
  prescription: Prescription;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function PrescriptionDetailsModal({ prescription, onClose, isDarkMode }: PrescriptionDetailsModalProps) {
  const modalBgClasses = isDarkMode ? 'bg-[#36454F] text-white' : 'bg-white text-slate-900';
  const textMuted = isDarkMode ? 'text-slate-400' : 'text-gray-500';
  const paperBg = isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200';
  
  const { userDetails } = mockData;
  const { doctorDetails } = prescription;

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`p-6 rounded-2xl shadow-xl max-w-lg w-full space-y-4 overflow-y-auto max-h-[90vh] ${modalBgClasses}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-headline font-bold">Prescription Details</h2>
          <button onClick={onClose} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
            <X size={24} />
          </button>
        </div>

        <div className={`p-6 border rounded-lg ${paperBg}`}>
          <header className="flex justify-between items-start pb-4 border-b border-dashed">
            <div>
              <h3 className="font-bold text-lg">{doctorDetails.name}</h3>
              <p className={`text-sm ${textMuted}`}>{doctorDetails.clinic}</p>
              <p className={`text-sm ${textMuted}`}>{doctorDetails.address}</p>
              <p className={`text-sm ${textMuted}`}>Tel: {doctorDetails.phone}</p>
            </div>
            <div className="text-primary">
              <Stethoscope size={40} />
            </div>
          </header>

          <section className="py-4 border-b border-dashed">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className={`font-semibold`}>Patient Name:</p>
                    <p>{userDetails.username}</p>
                </div>
                 <div>
                    <p className={`font-semibold`}>Age:</p>
                    <p>{userDetails.age}</p>
                </div>
                 <div>
                    <p className={`font-semibold`}>Date:</p>
                    <p>{prescription.date}</p>
                </div>
            </div>
          </section>

          <section className="py-4">
            <div className="flex items-center gap-2 mb-4">
                <Pill size={24} />
                <h3 className="text-xl font-bold font-headline">Rx</h3>
            </div>
            
            <div className="space-y-3">
                <div>
                    <p className="font-bold text-lg">{prescription.name}</p>
                    <p className={textMuted}>{prescription.description}</p>
                </div>
                <div className={`text-sm p-3 rounded-md ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
                    <span className="font-semibold">Instructions:</span> Take one tablet daily with food.
                </div>
            </div>
          </section>

          <footer className="pt-8 text-right">
            <p className="font-bold">{doctorDetails.name}</p>
            <p className={`text-sm ${textMuted}`}>License: {doctorDetails.license}</p>
          </footer>
        </div>

      </div>
    </div>
  );
}
