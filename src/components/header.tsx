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
  <div className="w-24 h-auto text-primary" {...props}>
    <svg viewBox="0 0 135 73" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M51.6 34.41H17.89V23.36C17.89 23.36 20.21 15.35 34.75 15.35C49.29 15.35 51.6 23.36 51.6 23.36V34.41Z"
        fill="#4866FA"
      />
      <path
        d="M0 72.06V41.67H17.89V72.06H0Z"
        fill="#4866FA"
      />
      <path
        d="M33.71 72.06V41.67H51.6V72.06H33.71Z"
        fill="#4866FA"
      />
      <path
        d="M109.84 72.06L75.14 41.67H95.96L130.66 72.06H109.84Z"
        fill="#4866FA"
      />
      <path
        d="M89.7899 34.41H56.0799V23.36C56.0799 23.36 58.3999 15.35 72.9399 15.35C87.4799 15.35 89.7899 23.36 89.7899 23.36V34.41Z"
        fill="#4866FA"
      />
      <g>
        <rect x="54.49" y="3.41" width="13.16" height="6.58" rx="3" transform="rotate(30 54.49 3.41)" fill="#F97316"/>
        <rect x="30.29" y="10.8" width="13.16" height="6.58" rx="3" transform="rotate(30 30.29 10.8)" fill="#EF4444"/>
        <rect x="78.69" y="1.2" width="13.16" height="6.58" rx="3" transform="rotate(30 78.69 1.2)" fill="#FBBF24"/>
      </g>
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
