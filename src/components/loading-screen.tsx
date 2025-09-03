'use client';

import { AlertraaLogo } from '@/components/alertraa-logo';

export default function LoadingScreen({ isDarkMode }: { isDarkMode: boolean }) {
  const bgClasses = isDarkMode ? 'bg-slate-900' : 'bg-slate-50';
  const spinnerClasses = isDarkMode ? 'border-t-white' : 'border-t-slate-900';

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center transition-colors duration-300 ${bgClasses}`}>
      <AlertraaLogo className="!w-48 mb-8" />
      <div className={`w-12 h-12 border-4 ${spinnerClasses} border-solid border-slate-900/20 rounded-full animate-spin`}></div>
    </div>
  );
}
