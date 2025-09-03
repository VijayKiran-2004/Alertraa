'use client';

import { Settings, ShoppingCart, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AlertraLogo } from './alertra-logo';

interface HeaderProps {
  onMenuClick: () => void;
  isDarkMode: boolean;
  healthStatus: string;
  cartCount: number;
  onCartClick: () => void;
  onNotificationClick: () => void;
}

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
    <header className={cn('px-4 flex items-center justify-between sticky top-0 z-20', themeClasses)}>
      <div className="flex items-center space-x-3">
         <div className={cn('w-10 h-10 rounded-full transition-colors duration-500', getStatusColorClass(healthStatus))} />
         <AlertraLogo className="!w-32" />
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
