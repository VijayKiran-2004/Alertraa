'use client';

import { Settings, ShoppingCart, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuClick: () => void;
  isDarkMode: boolean;
  healthStatus: string;
  cartCount: number;
  onCartClick: () => void;
  onNotificationClick: () => void;
}

const AlertraLogo = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>
    <svg 
      width="100" 
      height="32" 
      viewBox="0 0 125 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Alertra Logo"
    >
      <path d="M43.9844 26.5H28.125V39H20.625V12.5H43.9844C49.9115 12.5 54.6875 14.7135 54.6875 19.5C54.6875 24.2865 49.9115 26.5 43.9844 26.5ZM37.3177 17.5781H28.125V21.4219H37.3177C39.4688 21.4219 40.5469 20.7448 40.5469 19.5C40.5469 18.2552 39.4688 17.5781 37.3177 17.5781Z" fill="#6C9DD2"/>
      <path d="M51.9961 1.04169C51.9961 0.46617 51.5299 0 50.9544 0C50.3789 0 49.9127 0.46617 49.9127 1.04169V6.25002H51.9961V1.04169Z" fill="#F5C518"/>
      <path d="M38.8711 3.12502C38.8711 2.54949 38.4049 2.08333 37.8294 2.08333C37.2539 2.08333 36.7877 2.54949 36.7877 3.12502V8.33335H38.8711V3.12502Z" fill="#F44336"/>
      <path d="M45.9121 1.04169C45.9121 0.46617 45.4459 0 44.8704 0C44.2949 0 43.8287 0.46617 43.8287 1.04169V6.25002H45.9121V1.04169Z" fill="#F57C00"/>
      <path d="M78.75 39H57.8125L75.9375 12.5H86.4062L68.2812 39H78.75Z" fill="#6C9DD2"/>
      <path dM="M62.5 13.5C62.5 6.04167 68.5417 0 76.0417 0C83.5417 0 89.5833 6.04167 89.5833 13.5H62.5Z" fill="#6C9DD2"/>
      <path d="M87.5 26.5H103.359V39H110.859V12.5H87.5C81.5729 12.5 76.7969 14.7135 76.7969 19.5C76.7969 24.2865 81.5729 26.5 87.5 26.5ZM94.1667 17.5781H103.359V21.4219H94.1667C92.0156 21.4219 90.9375 20.7448 90.9375 19.5C90.9375 18.2552 92.0156 17.5781 94.1667 17.5781Z" fill="#6C9DD2"/>
    </svg>
  </div>
);


export default function Header({ onMenuClick, isDarkMode, healthStatus, cartCount, onCartClick, onNotificationClick }: HeaderProps) {
  const themeClasses = isDarkMode
    ? 'bg-background text-white border-b border-slate-700'
    : 'bg-background text-slate-900 border-b';
  
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'normal':
        return 'bg-emerald-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <header className={cn('p-4 flex items-center justify-between sticky top-0 z-20', themeClasses)}>
      <div className="flex items-center space-x-3">
         <div className={cn('w-10 h-10 rounded-full transition-colors duration-500', getStatusColorClass(healthStatus))} />
         <AlertraLogo />
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <button
          onClick={onCartClick}
          className={cn('p-2 rounded-full relative transition-transform transform hover:scale-110 active:scale-95', isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200')}
          aria-label="Open shopping cart"
        >
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
        <button
          onClick={onNotificationClick}
          className={cn('p-2 rounded-full relative transition-transform transform hover:scale-110 active:scale-95', isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200')}
          aria-label="Open notifications"
        >
          <Bell size={24} />
        </button>
        <button 
          onClick={onMenuClick}
          className={cn('p-2 rounded-full transition-transform transform hover:scale-110 active:scale-95', isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200')}
          aria-label="Open settings menu"
        >
          <Settings size={24} />
        </button>
      </div>
    </header>
  );
}
