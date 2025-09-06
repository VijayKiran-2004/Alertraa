'use client';

import { X, Pill, Heart, FileText, Stethoscope } from 'lucide-react';
import type { Appointment, Prescription } from '@/types';

interface PastVisitDetailsModalProps {
  visit: Appointment;
  onClose: () => void;
  isDarkMode: boolean;
  onViewPrescription: (prescription: Prescription) => void;
}

export default function PastVisitDetailsModal({ visit, onClose, isDarkMode, onViewPrescription }: PastVisitDetailsModalProps) {
  const modalBgClasses = isDarkMode ? 'bg-card text-white' : 'bg-white text-slate-900';
  const listBgClasses = isDarkMode ? 'bg-slate-700' : 'bg-gray-100';
  const listTextClasses = isDarkMode ? 'text-white' : 'text-gray-700';
  const textMuted = isDarkMode ? 'text-slate-400' : 'text-gray-500';

  if (!visit.details) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`p-6 rounded-2xl shadow-xl max-w-lg w-full space-y-4 overflow-y-auto max-h-[90vh] ${modalBgClasses}`}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-headline font-bold">Visit Details</h2>
            <p className={textMuted}>{visit.date} at {visit.time}</p>
          </div>
          <button onClick={onClose} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Stethoscope size={20} /> Nurse's Notes</h3>
            <div className={`p-4 rounded-lg ${listBgClasses}`}>
              <p className={`text-sm ${listTextClasses}`}>{visit.details.notes}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Heart size={20} /> Vitals Recorded</h3>
            <div className={`grid grid-cols-2 gap-2 text-center`}>
              <div className={`p-3 rounded-lg ${listBgClasses}`}>
                <p className={`text-xs ${textMuted}`}>Heart Rate</p>
                <p className={`font-bold ${listTextClasses}`}>{visit.details.vitals.heartRate}</p>
              </div>
              <div className={`p-3 rounded-lg ${listBgClasses}`}>
                <p className={`text-xs ${textMuted}`}>Blood Pressure</p>
                <p className={`font-bold ${listTextClasses}`}>{visit.details.vitals.bloodPressure}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Pill size={20} /> Prescriptions</h3>
            {visit.details.prescriptions.length > 0 ? (
              <ul className="space-y-2">
                {visit.details.prescriptions.map((p, index) => (
                  <li key={index} className={`p-3 rounded-lg flex items-center justify-between ${listBgClasses}`}>
                    <div>
                      <p className={`font-medium ${listTextClasses}`}>{p.name}</p>
                      <p className={`text-sm ${textMuted}`}>{p.description}</p>
                    </div>
                    <button
                      onClick={() => onViewPrescription(p)}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      View
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`text-sm p-3 rounded-lg ${listBgClasses} ${textMuted}`}>No new prescriptions were given during this visit.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
