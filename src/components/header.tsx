'use client';

import { Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuClick: () => void;
  isDarkMode: boolean;
  healthStatus: string;
}

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
        <h1 className="text-2xl font-headline font-bold text-primary">Alertra</h1>
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
