'use client';

import { Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuClick: () => void;
  isDarkMode: boolean;
  healthStatus: string;
}

const AlertraLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="120" height="28" viewBox="0 0 260 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M23.3333 4.5H28.9L16.4333 36.5H10.1L22.5667 4.5H23.3333Z" fill="currentColor" />
      <path d="M31.3 36.5V4.5H36.4333V36.5H31.3Z" fill="currentColor" />
      <path d="M49.6667 22.1V18.1H41.5667V4.5H36.4333V36.5H54.8V32.5H41.5667V26.1H49.6667V22.1Z" fill="currentColor" />
      <path d="M60.1 4.5H72.8333V8.5H65.2333V18.1H71.3V22.1H65.2333V32.5H72.8333V36.5H60.1V4.5Z" fill="currentColor" />
      <path d="M89.7333 4.5L82.1 18.9V36.5H76.9667V18.9L70.2333 4.5H76.2L79.5333 11.9L83.0333 4.5H89.7333Z" fill="currentColor" />
      <path d="M92.1667 4.5H97.3V36.5H92.1667V4.5Z" fill="currentColor" />
      <path d="M100.9 4.5H113.633V8.5H106.033V18.1H112.1V22.1H106.033V32.5H113.633V36.5H100.9V4.5Z" fill="currentColor" />
      <path d="M141.484 19.3C141.484 22.42 140.451 25.14 138.384 27.46C136.317 29.78 133.717 30.94 130.584 30.94C128.017 30.94 125.817 30.18 124.084 28.66C122.351 27.14 121.484 25.26 121.484 23.02V4.5H126.617V22.7C126.617 23.86 127.151 24.44 128.217 24.44C129.284 24.44 129.817 23.86 129.817 22.7V4.5H134.95V22.7C134.95 23.86 135.484 24.44 136.55 24.44C137.617 24.44 138.151 23.86 138.151 22.7V4.5H141.484V19.3Z" fill="currentColor" />
      <path d="M149.95 4.5H155.083V36.5H149.95V4.5Z" fill="currentColor" />
      <path d="M165.717 32.5C165.717 34.7 164.883 36.22 163.217 37.06C161.55 37.9 159.55 38.32 157.217 38.32C155.35 38.32 153.683 37.9 152.217 37.06C150.75 36.22 149.917 34.7 149.717 32.5H165.717ZM152.95 28.5C153.35 30.94 154.85 32.16 157.45 32.16C160.05 32.16 161.55 30.94 161.95 28.5H152.95Z" fill="currentColor" />
      <path d="M187.333 36.5H182.2V11.3L175.233 36.5H170.833L163.867 11.3V36.5H158.733V4.5H166.433L173.033 26.5L179.633 4.5H187.333V36.5Z" fill="currentColor" />
      <path d="M211.367 22.1C211.367 25.5 210.433 28.18 208.567 30.14C206.7 32.1 204.267 33.08 201.267 33.08C198.267 33.08 195.833 32.1 194.067 30.14C192.3 28.18 191.367 25.5 191.367 22.1C191.367 18.7 192.3 16.02 194.067 14.06C195.833 12.1 198.267 11.12 201.267 11.12C204.267 11.12 206.7 12.1 208.567 14.06C210.433 16.02 211.367 18.7 211.367 22.1ZM196.533 22.1C196.533 24.3 197.233 25.92 198.633 26.96C200.033 28 201.8 28.52 203.933 28.52C206.067 28.52 207.833 28 209.233 26.96C210.633 25.92 211.333 24.3 211.333 22.1C211.333 19.9 210.633 18.28 209.233 17.24C207.833 16.2 206.067 15.68 203.933 15.68C201.8 15.68 200.033 16.2 198.633 17.24C197.233 18.28 196.533 19.9 196.533 22.1Z" fill="currentColor" />
      <path d="M220.811 29.54C221.744 31.98 223.411 33.2 225.811 33.2C227.277 33.2 228.477 32.76 229.411 31.88C230.344 31 230.811 29.84 230.811 28.4C230.811 26.84 230.244 25.72 229.111 25.04C227.977 24.36 226.511 23.9 224.711 23.66L220.544 23.06C218.744 22.7 217.311 22.02 216.244 21.02C215.177 20.02 214.644 18.66 214.644 16.94C214.644 14.86 215.544 13.2 217.344 11.96C219.144 10.72 221.277 10.1 223.744 10.1C225.811 10.1 227.611 10.66 229.144 11.78C230.677 12.9 231.744 14.52 232.344 16.64L226.744 18.08C226.344 16.96 225.411 16.34 223.944 16.34C222.744 16.34 221.877 16.66 221.344 17.3C220.811 17.94 220.544 18.72 220.544 19.64C220.544 20.92 221.311 21.86 222.844 22.46L227.444 23.84C229.377 24.36 230.844 25.22 231.844 26.42C232.844 27.62 233.344 29.14 233.344 30.98C233.344 33.3 232.411 35.1 230.544 36.38C228.677 37.66 226.344 38.3 223.544 38.3C220.144 38.3 217.611 37.06 215.944 34.58L220.811 29.54Z" fill="currentColor" />
      <path d="M257.95,29.34a6.4,6.4,0,0,1-3.86-5.83,6.4,6.4,0,0,1,3.86-5.83,4,4,0,0,0,0-7.34,6.4,6.4,0,0,1-3.86-5.83,6.4,6.4,0,0,1,3.86-5.83,4,4,0,0,0,0-7.34,6.4,6.4,0,0,1,3.86-5.83V29.34Z" fill="currentColor" transform="translate(-15, 10) scale(1.5)" />
      <path d="M246.35,4.5a4,4,0,0,0,0,7.34,6.4,6.4,0,0,1,3.86,5.83,6.4,6.4,0,0,1-3.86,5.83,4,4,0,0,0,0,7.34,6.4,6.4,0,0,1,3.86,5.83,6.4,6.4,0,0,1-3.86,5.83,4,4,0,0,0,0,7.34H246.35V4.5Z" fill="currentColor" transform="translate(-15, 10) scale(1.5)"/>
    </svg>
)

export default function Header({ onMenuClick, isDarkMode, healthStatus }: HeaderProps) {
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
        <AlertraLogo className="h-7 text-primary" />
        <div 
          className={cn(
            'w-3 h-3 rounded-full transition-colors',
            getStatusColorClass(healthStatus),
            healthStatus !== 'normal' && 'animate-blink'
          )}
          title={`Health Status: ${healthStatus}`}
        ></div>
      </div>
      <button 
        onClick={onMenuClick}
        className={cn('p-2 rounded-full', isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200')}
        aria-label="Open settings menu"
      >
        <Settings size={24} />
      </button>
    </header>
  );
}
