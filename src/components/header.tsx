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
            width="125"
            height="40"
            viewBox="0 0 125 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Alertra Logo"
        >
            <path
                d="M20.625 12.5V39H28.125V26.5H43.9844C49.9115 26.5 54.6875 24.2865 54.6875 19.5C54.6875 14.7135 49.9115 12.5 43.9844 12.5H20.625ZM28.125 17.5781H37.3177C39.4688 17.5781 40.5469 18.2552 40.5469 19.5C40.5469 20.7448 39.4688 21.4219 37.3177 21.4219H28.125V17.5781Z"
                fill="black"
            />
            <path d="M57.8125 39H78.75L68.2812 39L86.4062 12.5H75.9375L57.8125 39Z" fill="black" />
            <path
                d="M110.859 12.5V39H103.359V26.5H87.5C81.5729 26.5 76.7969 24.2865 76.7969 19.5C76.7969 14.7135 81.5729 12.5 87.5 12.5H110.859ZM103.359 17.5781H94.1667C92.0156 17.5781 90.9375 18.2552 90.9375 19.5C90.9375 20.7448 92.0156 21.4219 94.1667 21.4219H103.359V17.5781Z"
                fill="black"
            />
            <path
                d="M48.8125 19.5C48.8125 15.6562 51.026 12.5 56.4062 12.5H65.8438C71.224 12.5 73.4375 15.6562 73.4375 19.5C73.4375 23.3438 71.224 26.5 65.8438 26.5H56.4062C51.026 26.5 48.8125 23.3438 48.8125 19.5ZM55.0625 17.2188H67.1875V21.7812H55.0625V17.2188Z"
                fill="#6C9DD2"
            />
            <path
                d="M46.7344 8.33333V3.125C46.7344 2.54948 46.2682 2.08333 45.6927 2.08333C45.1172 2.08333 44.651 2.54948 44.651 3.125V8.33333H46.7344Z"
                fill="#F57C00"
            />
            <path
                d="M41.7812 8.33333V3.125C41.7812 2.54948 41.3151 2.08333 40.7396 2.08333C40.1641 2.08333 39.6979 2.54948 39.6979 3.125V8.33333H41.7812Z"
                fill="#F44336"
            />
            <path
                d="M51.6771 6.25V1.04167C51.6771 0.466146 51.2109 0 50.6354 0C50.0599 0 49.5938 0.466146 49.5938 1.04167V6.25H51.6771Z"
                fill="#F5C518"
            />
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
