'use client';

import React from 'react';

interface InfoListProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  isDarkMode: boolean;
}

export default function InfoList({ title, items, icon, isDarkMode }: InfoListProps) {
  const textClasses = isDarkMode ? 'text-white' : 'text-gray-700';
  const itemBgClasses = isDarkMode ? 'bg-slate-700' : 'bg-gray-100';

  return (
    <div className="mt-4 first:mt-0">
      <h3 className={`text-md font-headline font-semibold mb-2 flex items-center space-x-2 ${textClasses}`}>
        {icon}
        <span>{title}</span>
      </h3>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className={`text-sm p-2 rounded-lg ${itemBgClasses}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
