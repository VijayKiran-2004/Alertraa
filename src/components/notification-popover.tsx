'use client';

import { useState } from 'react';
import { X, Bell, Settings } from 'lucide-react';
import { mockData } from '@/lib/mock-data';
import type { NotificationSetting } from '@/types';

interface NotificationPopoverProps {
  onClose: () => void;
  isDarkMode: boolean;
  onShowSettings: () => void;
}

export default function NotificationPopover({ onClose, isDarkMode, onShowSettings }: NotificationPopoverProps) {
  const [notifications, setNotifications] = useState<NotificationSetting[]>(mockData.settingsContent['Notifications'].content);

  const handleToggle = (index: number) => {
    const newNotifications = [...notifications];
    newNotifications[index].enabled = !newNotifications[index].enabled;
    setNotifications(newNotifications);
  };

  const popoverBgClasses = isDarkMode ? 'bg-[#36454F] text-white' : 'bg-white text-slate-900';
  const itemBgClasses = isDarkMode ? 'bg-slate-700' : 'bg-gray-100';
  const textClasses = isDarkMode ? 'text-white' : 'text-slate-900';
  const secondaryTextClasses = isDarkMode ? 'text-slate-400' : 'text-gray-500';

  const getSeverityColor = (severity: 'critical' | 'important' | 'normal') => {
    switch (severity) {
      case 'critical':
        return 'border-red-500';
      case 'important':
        return 'border-yellow-500';
      default:
        return 'border-transparent';
    }
  };

  return (
    <div className="fixed inset-0" onClick={onClose}>
      <div
        className={`absolute top-16 right-4 p-4 rounded-2xl shadow-xl max-w-sm w-full flex flex-col space-y-3 max-h-[50vh] animate-fade-in ${popoverBgClasses}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-headline font-bold flex items-center gap-2"><Bell size={22} /> Notifications</h2>
          <button onClick={onClose} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {notifications.map((notif, index) => (
            <div key={index} className={`p-3 rounded-lg flex items-center justify-between border-l-4 ${itemBgClasses} ${getSeverityColor(notif.severity)}`}>
              <div>
                <p className={`font-medium text-sm ${textClasses}`}>{notif.name}</p>
                <p className={`text-xs ${secondaryTextClasses}`}>{notif.description}</p>
              </div>
              <button
                onClick={() => handleToggle(index)}
                className={`relative w-10 h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out flex-shrink-0 ${notif.enabled ? 'bg-primary' : 'bg-gray-300 dark:bg-slate-600'}`}
              >
                <span className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out ${notif.enabled ? 'translate-x-4' : 'translate-x-0'}`}></span>
              </button>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onShowSettings}
            className="w-full py-2 px-3 text-sm text-center bg-gray-200/50 dark:bg-slate-700/50 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <Settings size={16} />
            Advanced Settings
          </button>
        </div>
      </div>
    </div>
  );
}
