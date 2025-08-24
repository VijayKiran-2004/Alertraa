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
      width="120"
      height="30"
      viewBox="0 0 205 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      <path
        d="M23.3347 43.1231L17.5547 25.1311L11.7747 43.1231H0.254688L14.7947 0.883057H20.3147L34.8547 43.1231H23.3347Z"
        fill="currentColor"
      />
      <path
        d="M51.1161 43.1231H39.8361V0.883057H51.1161V43.1231Z"
        fill="currentColor"
      />
      <path
        d="M68.5322 43.1231H57.2522V12.1871L68.5322 0.883057V43.1231Z"
        fill="currentColor"
      />
      <path
        d="M87.0375 25.1311L81.2575 43.1231H69.7375L84.2775 0.883057H89.7975L104.338 43.1231H92.8175L87.0375 25.1311Z"
        fill="currentColor"
      />
      <path
        d="M125.79 32.2231C122.95 32.2231 120.458 31.5111 118.31 30.0871C116.162 28.6631 114.602 26.6911 113.63 24.1711C112.658 21.6511 112.172 18.7351 112.172 15.4231V0.883057H123.452V15.6391C123.452 20.3551 124.472 22.7131 126.512 22.7131C127.532 22.7131 128.322 22.4291 128.882 21.8611C129.442 21.2931 129.722 20.4771 129.722 19.4131V0.883057H141.002V20.1271C141.002 23.3311 140.432 26.0431 139.292 28.2631C138.152 30.4831 136.522 32.1471 134.402 33.2551C132.282 34.3631 129.722 34.9171 126.722 34.9171C126.402 34.9171 126.098 34.8991 125.79 34.8631V32.2231Z"
        fill="currentColor"
      />
      <path
        d="M165.713 43.1231H144.953V32.2231H152.093V22.2871H144.953V10.9111H152.093V0.883057H144.953V0.883057H144.593V0.883057H144.413H144.053H143.873H141.002H129.722H118.442H112.172H100.892H89.6122H78.3322H67.0522H55.7722H44.4921H33.2121H21.9321H10.6521H0.254688V10.9111H10.6521V32.2231H0.254688V43.1231H10.6521H21.9321H33.2121H44.4921H55.7722H67.0522H78.3322H89.6122H100.892H112.172H115.46V10.9111H123.452H129.722H132.29V10.9111H141.002H156.173H165.713V10.9111H156.173V22.2871H165.713V32.2231H156.173V43.1231H165.713Z"
        fill="currentColor"
      />
      <path
        d="M185.242 43.1231H173.962V0.883057H185.242V43.1231Z"
        fill="currentColor"
      />
      <path
        d="M204.091 25.1311L198.311 43.1231H186.791L201.331 0.883057H206.851L221.391 43.1231H209.871L204.091 25.1311Z"
        fill="currentColor"
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
