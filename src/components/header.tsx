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
      height="40"
      viewBox="0 0 110 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-auto"
    >
      <path
        d="M68.663 50.1528H76.495V28.4208H91.139C91.139 23.3388 88.353 19.3488 82.779 16.4508C77.205 13.5528 69.373 12.1038 59.283 12.1038C49.193 12.1038 41.361 13.5528 35.787 16.4508C30.213 19.3488 27.427 23.3388 27.427 28.4208H42.071V50.1528H49.903V37.7388H57.735V50.1528H68.663Z"
        className="fill-primary"
      />
      <path
        d="M93.303 50.1528V28.4208C93.303 22.4248 91.139 17.5128 86.811 13.6848C82.483 9.8568 76.589 7.9428 69.125 7.9428C61.661 7.9428 55.767 9.8568 51.439 13.6848C47.111 17.5128 44.947 22.4248 44.947 28.4208V50.1528H52.779V28.4208C52.779 24.8708 53.943 22.1808 56.271 20.3508C58.599 18.5208 61.965 17.6058 66.369 17.6058C75.645 17.6058 80.325 21.6138 80.325 29.6448V50.1528H93.303Z"
        className="fill-primary"
      />
      <rect x="25" y="2" width="12" height="6" rx="3" fill="#F87171" />
      <rect x="44" y="2" width="12" height="6" rx="3" fill="#F97316" />
      <rect x="63" y="2" width="12" height="6" rx="3" fill="#FBBF24" />
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
