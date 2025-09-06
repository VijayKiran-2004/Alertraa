'use client';

import { Bell, Smartphone, Move, Users, Globe, LifeBuoy, Info, X, LogOut } from 'lucide-react';

interface BurgerMenuProps {
  onClose: () => void;
  onShowSettingsModal: (setting: string) => void;
  isDarkMode: boolean;
  onLogout: () => void;
}

export default function BurgerMenu({ onClose, onShowSettingsModal, isDarkMode, onLogout }: BurgerMenuProps) {
  const menuBgClasses = isDarkMode ? 'bg-card text-white' : 'bg-white text-slate-900';
  const itemClasses = isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100';

  const settingsItems = [
    { title: 'Notifications', icon: <Bell size={20} /> },
    { title: 'Connected Devices', icon: <Smartphone size={20} /> },
    { title: 'Gesture Configuration', icon: <Move size={20} /> },
    { title: 'Default Partners/Guardians', icon: <Users size={20} /> },
    { title: 'Accessibility', icon: <Globe size={20} /> },
    { title: 'Help Center', icon: <LifeBuoy size={20} /> },
    { title: 'About Us', icon: <Info size={20} /> },
  ];

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-end z-50" onClick={onClose}>
      <div 
        className={`w-72 h-full p-6 shadow-lg transform transition-transform duration-300 ease-in-out ${menuBgClasses} animate-fade-in flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-headline font-bold">Settings</h3>
            <button onClick={onClose} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
              <X size={24} />
            </button>
          </div>
          <ul className="space-y-2">
            {settingsItems.map((item, index) => (
              <li
                key={index}
                onClick={() => { onShowSettingsModal(item.title); onClose(); }}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${itemClasses} transition-colors`}
              >
                <span className="text-primary">{item.icon}</span>
                <p className="text-md">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto">
            <button
              onClick={onLogout}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${itemClasses} transition-colors`}
            >
              <span className="text-red-500"><LogOut size={20} /></span>
              <p className="text-md">Logout</p>
            </button>
          </div>
      </div>
    </div>
  );
}
