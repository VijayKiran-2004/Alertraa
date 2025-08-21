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
    { name: 'Medicine', icon: <LinkIcon size={24} />, page: 'Medicine' },
    { name: 'Profile', icon: <User size={24} />, page: 'User' },
  ];

  const themeClasses = isDarkMode ? 'bg-[#36454F]' : 'bg-white';
  const iconActiveClasses = isDarkMode ? 'text-white bg-primary' : 'text-white bg-primary';
  const iconInactiveClasses = isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-primary';

  return (
    <nav className={cn('fixed bottom-0 left-0 right-0 h-20 px-4 z-30 flex items-center justify-center')}>
      <div className={cn('w-full max-w-md h-16 rounded-full flex items-center justify-around shadow-lg', themeClasses)}>
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
                    "bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg shadow-xl transition-transform transform hover:scale-105 active:scale-95 border-4",
                    isDarkMode ? 'border-[#36454F]' : 'border-white',
                    'absolute -top-4'
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
