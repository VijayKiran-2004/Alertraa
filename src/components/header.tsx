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
  <div
    className="text-2xl font-bold font-headline tracking-wider text-primary"
    {...props}
  >
    ALERTRA
  </div>
);


export default function Header({ onMenuClick, isDarkMode, healthStatus, cartCount, onCartClick, onNotificationClick }: HeaderProps) {
  const themeClasses = isDarkMode
    ? 'bg-[#36454F] text-white border-slate-700'
    : 'bg-white text-slate-900 border-gray-200';
  
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
    <header className={cn('p-4 border-b shadow-sm flex items-center justify-between sticky top-0 z-20', themeClasses)}>
      <div className="w-10"></div>
      <div className="flex items-center space-x-2">
        <AlertraLogo className="h-7 text-primary font-extrabold" />
        <div 
          className={cn(
            'w-3 h-3 rounded-full transition-colors',
            getStatusColorClass(healthStatus),
            healthStatus !== 'normal' && 'animate-blink'
          )}
          title={`Health Status: ${healthStatus}`}
        ></div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onNotificationClick}
          className={cn('p-2 rounded-full relative transition-transform transform hover:scale-110 active:scale-95', isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200')}
          aria-label="Open notifications"
        >
          <Bell size={24} />
        </button>
        <button
          onClick={onCartClick}
          className={cn('p-2 rounded-full relative transition-transform transform hover:scale-110 active:scale-95', isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200')}
          aria-label="Open cart"
        >
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
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
