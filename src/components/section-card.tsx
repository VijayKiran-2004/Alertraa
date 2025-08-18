'use client';

import React from 'react';

interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
  isDarkMode: boolean;
}

export default function SectionCard({ title, children, isDarkMode }: SectionCardProps) {
  const cardClasses = isDarkMode ? 'bg-[#36454F]' : 'bg-white';
  const titleClasses = isDarkMode ? 'text-white' : 'text-slate-900';

  return (
    <div className={`p-6 rounded-2xl shadow-md ${cardClasses}`}>
      {title && <h2 className={`text-xl font-headline font-bold mb-4 ${titleClasses}`}>{title}</h2>}
      {children}
    </div>
  );
}
