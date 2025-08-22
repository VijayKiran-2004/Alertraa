'use client';

import { Heart, User, Pill, FileText, Link as LinkIcon} from 'lucide-react';
import { cn } from '@/lib/utils';

type Page = 'Home' | 'Booking' | 'User' | 'Medicine';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onSosClick: () => void;
  isDarkMode: boolean;
}

export default function Navbar({ currentPage, setCurrentPage, onSosClick, isDarkMode }: NavbarProps) {
  const navItems = [
    { name: 'Home', icon: <Heart size={24} />, page: 'Home' },
    { name: 'Booking', icon: <FileText size={24} />, page: 'Booking' },
    { name: 'Medicine', icon: <Pill size={24} />, page: 'Medicine' },
    { name: 'Profile', icon: <User size={24} />, page: 'User' },
  ];

  const navBarBgClasses = 'bg-gradient-to-r from-blue-200 via-emerald-100 to-slate-100 dark:from-blue-400 dark:via-emerald-200 dark:to-slate-800';
  const iconActiveClasses = 'bg-gradient-to-r from-primary to-accent text-white';
  const iconInactiveClasses = isDarkMode ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-black/5';

  return (
    <nav className={cn('fixed bottom-0 left-0 right-0 h-20 px-4 z-30 flex items-center justify-center')}>
      <div className={cn('w-full max-w-md h-16 rounded-full flex items-center justify-around shadow-lg', navBarBgClasses)}>
        <div className="flex-1 flex justify-around items-center">
          {navItems.slice(0, 2).map((item) => (
            <button
              key={item.name}
              onClick={() => setCurrentPage(item.page as Page)}
              className={cn('flex flex-col items-center justify-center transition-colors duration-300 w-16 h-16 rounded-full', currentPage === item.page ? iconActiveClasses : iconInactiveClasses)}
              aria-current={currentPage === item.page ? 'page' : undefined}
            >
              {item.icon}
            </button>
          ))}
        </div>

        <div className="relative w-20 flex items-center justify-center">
            <button
                onClick={onSosClick}
                className={cn(
                    "bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg shadow-xl transition-transform transform hover:scale-105 active:scale-95 border-4 border-background",
                    'absolute -top-10'
                )}
                aria-label="SOS Emergency Button"
            >
                SOS
            </button>
        </div>
        
        <div className="flex-1 flex justify-around items-center">
          {navItems.slice(2, 4).map((item) => (
            <button
              key={item.name}
              onClick={() => setCurrentPage(item.page as Page)}
              className={cn('flex flex-col items-center justify-center transition-colors duration-300 w-16 h-16 rounded-full', currentPage === item.page ? iconActiveClasses : iconInactiveClasses)}
              aria-current={currentPage === item.page ? 'page' : undefined}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
