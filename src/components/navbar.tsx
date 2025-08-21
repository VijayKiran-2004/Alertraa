'use client';

import { Heart, User, Pill, FileText, Link as LinkIcon} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

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
  
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const newIndex = navItems.findIndex(item => item.page === currentPage);
    setActiveIndex(newIndex);
  }, [currentPage, navItems]);

  const themeClasses = isDarkMode ? 'bg-[#36454F]' : 'bg-white';
  const iconActiveClasses = isDarkMode ? 'text-white' : 'text-primary';
  const iconInactiveClasses = isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-primary';
  const bumpPosition = ['left-[12.5%]', 'left-[37.5%]', 'left-[62.5%]', 'left-[87.5%]'];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-24 px-4 z-30 flex justify-center items-center">
      <div className={cn('relative w-full max-w-md h-16 rounded-full flex items-center justify-around shadow-lg', themeClasses)}>

        <div 
            className={cn(
                "absolute -bottom-2 w-16 h-8 bg-primary transition-all duration-500 ease-in-out transform -translate-x-1/2", 
                bumpPosition[activeIndex]
            )}
            style={{
                clipPath: 'path("M 0 10 C 5 25, 59 25, 64 10 C 64 10, 64 32, 0 32 Z")'
            }}
        />
        
        {navItems.map((item) => (
            <button
            key={item.name}
            onClick={() => setCurrentPage(item.page as Page)}
            className={cn('flex flex-col items-center justify-center transition-colors duration-300 z-10 w-16 h-16', currentPage === item.page ? iconActiveClasses : iconInactiveClasses)}
            aria-current={currentPage === item.page ? 'page' : undefined}
            >
            <div className={cn('w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300', currentPage === item.page ? 'scale-110 -translate-y-1' : '')}>
                {item.icon}
            </div>
            </button>
        ))}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <button
                onClick={onSosClick}
                className={cn(
                    "bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center font-bold text-lg shadow-xl transition-transform transform hover:scale-105 active:scale-95 border-4",
                    isDarkMode ? 'border-[#36454F]' : 'border-white'
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
