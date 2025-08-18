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
  const navItems = [
    { name: 'Home', icon: <Heart size={24} />, page: 'Home' },
    { name: 'Appointments', icon: <CalendarDays size={24} />, page: 'Appointments' },
    { name: 'Medicine', icon: <Pill size={24} />, page: 'Medicine' },
    { name: 'Profile', icon: <User size={24} />, page: 'User' },
  ];

  const themeClasses = isDarkMode ? 'bg-[#36454F]' : 'bg-white';
  const iconActiveClasses = isDarkMode ? 'text-white' : 'text-primary';
  const iconInactiveClasses = isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-primary';
  const ringOffsetClass = isDarkMode ? 'dark:ring-offset-[#36454F]' : 'ring-offset-white';

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-24 px-4 z-30 flex justify-center items-center">
      <div className={cn('relative w-full max-w-lg h-16 rounded-full flex items-center justify-evenly shadow-lg', themeClasses)}>
        
        {/* Left items */}
        <div className="flex-1 flex justify-evenly items-center pr-10">
            {navItems.slice(0, 2).map((item) => (
                <button
                key={item.name}
                onClick={() => setCurrentPage(item.page as Page)}
                className={cn('flex flex-col items-center justify-center transition-colors duration-300 w-16 h-16 rounded-full', currentPage === item.page ? 'text-primary' : iconInactiveClasses)}
                aria-current={currentPage === item.page ? 'page' : undefined}
                >
                <div className={cn('w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300', currentPage === item.page ? 'bg-primary text-white scale-110 -translate-y-6 shadow-lg' : '')}>
                    {item.icon}
                </div>
                <span className={cn('text-xs mt-1 transition-opacity duration-300', currentPage === item.page ? 'opacity-0' : 'opacity-100')}>{item.name}</span>
                </button>
            ))}
        </div>

        {/* SOS Button placeholder */}
        <div className="w-20" />

        {/* Right items */}
        <div className="flex-1 flex justify-evenly items-center pl-10">
            {navItems.slice(2, 4).map((item) => (
                 <button
                 key={item.name}
                 onClick={() => setCurrentPage(item.page as Page)}
                 className={cn('flex flex-col items-center justify-center transition-colors duration-300 w-16 h-16 rounded-full', currentPage === item.page ? 'text-primary' : iconInactiveClasses)}
                 aria-current={currentPage === item.page ? 'page' : undefined}
                 >
                 <div className={cn('w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300', currentPage === item.page ? 'bg-primary text-white scale-110 -translate-y-6 shadow-lg' : '')}>
                     {item.icon}
                 </div>
                 <span className={cn('text-xs mt-1 transition-opacity duration-300', currentPage === item.page ? 'opacity-0' : 'opacity-100')}>{item.name}</span>
                 </button>
            ))}
        </div>

        {/* Central SOS Button */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <button
                onClick={onSosClick}
                className={cn(
                    "bg-red-600 text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-xl shadow-xl transition-transform transform hover:scale-105 active:scale-95 ring-4 ring-red-300/50",
                    ringOffsetClass
                )}
                aria-label="SOS Emergency Button"
            >
                SOS
            </button>
        </div>
      </div>
    </nav>
  );
}
