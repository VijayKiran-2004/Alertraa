'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface BookingModalProps {
  onClose: () => void;
  isDarkMode: boolean;
}

export default function BookingModal({ onClose, isDarkMode }: BookingModalProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleBook = () => {
    if (date && time) {
      console.log(`Booking nurse visit for ${date} at ${time}.`);
      onClose();
    }
  };

  const modalBgClasses = isDarkMode ? 'bg-card text-white' : 'bg-white text-slate-900';
  const inputBgClasses = isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-100 border-gray-300 text-slate-900';
  const labelTextClasses = isDarkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`p-6 rounded-2xl shadow-xl max-w-sm w-full space-y-4 ${modalBgClasses}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-headline font-bold">Book a Visit</h2>
          <button onClick={onClose} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
            <X size={24} />
          </button>
        </div>

        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Booking a visit will use one of your available tokens.</p>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="booking-date" className={`text-sm font-medium mb-1 ${labelTextClasses}`}>Date</label>
            <input
              type="date"
              id="booking-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${inputBgClasses}`}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="booking-time" className={`text-sm font-medium mb-1 ${labelTextClasses}`}>Time</label>
            <input
              type="time"
              id="booking-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${inputBgClasses}`}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md font-bold hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleBook}
            disabled={!date || !time}
            className="py-2 px-4 bg-gradient-to-r from-primary to-accent text-white rounded-md font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all animate-gradient-xy"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
