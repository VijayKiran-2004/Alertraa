'use client';

import { Heart, User, Pill } from 'lucide-react';
import { cn } from '@/lib/utils';

type Page = 'Home' | 'Appointments' | 'User' | 'Medicine';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onSosClick: () => void;
  isDarkMode: boolean;
}

const CalendarDays = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
)

export default function Navbar({ currentPage, setCurrentPage, onSosClick, isDarkMode }: NavbarProps) {
  const allNavItems = [
    { name: 'Home', icon: <Heart size={24} />, page: 'Home' },
    { name: 'Appointments', icon: <CalendarDays size={24} />, page: 'Appointments' },
    { name: 'SOS', text: 'SOS', page: 'SOS', isSpecial: true },
    { name: 'Medicine', icon: <Pill size={24} />, page: 'Medicine' },
    { name: 'Profile', icon: <User size={24} />, page: 'User' },
  ];

  const themeClasses = isDarkMode ? 'bg-[#36454F] border-slate-700' : 'bg-white/80 backdrop-blur-sm border-gray-200';
  const inactiveIconClasses = isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-gray-500 hover:text-primary';
  const activeGradientClasses = 'bg-gradient-to-r from-primary to-accent text-white shadow-md animate-fade-in';

  return (
    <nav className={cn('fixed bottom-0 left-0 right-0 border-t shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] p-2 z-30', themeClasses)}>
      <div className="flex justify-evenly items-center max-w-lg mx-auto">
        {allNavItems.map((item) => {
          if (item.isSpecial) {
            return (
              <button
                key={item.name}
                onClick={onSosClick}
                className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg shadow-xl transition-transform transform hover:scale-110 active:scale-95 ring-4 ring-red-300/50 -translate-y-4"
                aria-label="SOS Emergency Button"
              >
                {item.text}
              </button>
            );
          }

          return (
            <button
              key={item.name}
              onClick={() => setCurrentPage(item.page as Page)}
              className={cn(
                'flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 min-w-[60px] h-14',
                currentPage === item.page ? activeGradientClasses : inactiveIconClasses
              )}
              aria-current={currentPage === item.page ? 'page' : undefined}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
