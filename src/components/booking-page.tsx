'use client';

import { CalendarDays, ClipboardCheck } from 'lucide-react';
import SectionCard from './section-card';
import { mockData } from '@/lib/mock-data';
import type { Appointment } from '@/types';

interface BookingPageProps {
  onBookVisit: () => void;
  onPastVisitClick: (visit: Appointment) => void;
  isDarkMode: boolean;
}

export default function BookingPage({ onBookVisit, onPastVisitClick, isDarkMode }: BookingPageProps) {
  const secondaryTextClasses = isDarkMode ? 'text-slate-400' : 'text-gray-500';
  const listBgClasses = isDarkMode ? 'bg-slate-700' : 'bg-gray-100';
  const listTextClasses = isDarkMode ? 'text-white' : 'text-gray-700';

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionCard isDarkMode={isDarkMode}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className={`text-sm font-headline ${secondaryTextClasses}`}>Available Visit Tokens</p>
            <p className="text-3xl font-bold text-primary">{mockData.appointments.tokens}</p>
          </div>
          <button
            onClick={onBookVisit}
            className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg shadow-md hover:opacity-90 transition-opacity animate-gradient-xy"
          >
            Book a Visit
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Upcoming Bookings" isDarkMode={isDarkMode}>
        {mockData.appointments.upcomingBookings.length > 0 ? (
          <ul className="space-y-2">
            {mockData.appointments.upcomingBookings.map((booking, index) => (
              <li key={index} className={`p-4 rounded-xl shadow-sm ${listBgClasses}`}>
                <div className="flex items-center space-x-3">
                  <CalendarDays size={20} className="text-emerald-500" />
                  <div>
                    <p className={`font-semibold ${listTextClasses}`}>{booking.date} at {booking.time}</p>
                    <p className={`text-sm ${secondaryTextClasses}`}>{booking.summary}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={`text-sm ${secondaryTextClasses}`}>You have no upcoming bookings.</p>
        )}
      </SectionCard>

      <SectionCard title="Past Visits" isDarkMode={isDarkMode}>
        {mockData.appointments.pastVisits.length > 0 ? (
          <ul className="space-y-2">
            {mockData.appointments.pastVisits.map((visit, index) => (
              <li key={index} onClick={() => onPastVisitClick(visit)} className={`p-4 rounded-xl shadow-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors ${listBgClasses}`}>
                <div className="flex items-center space-x-3">
                  <ClipboardCheck size={20} className="text-gray-500" />
                  <div>
                    <p className={`font-semibold ${listTextClasses}`}>{visit.date} at {visit.time}</p>
                    <p className={`text-sm ${secondaryTextClasses}`}>{visit.summary}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={`text-sm ${secondaryTextClasses}`}>No past visit history.</p>
        )}
      </SectionCard>
    </div>
  );
}
