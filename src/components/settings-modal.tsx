'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { mockData } from '@/lib/mock-data';

interface SettingsModalProps {
  setting: string;
  onClose: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

export default function SettingsModal({ setting, onClose, isDarkMode, setIsDarkMode }: SettingsModalProps) {
  const [notifications, setNotifications] = useState(mockData.settingsContent['Notifications'].content);
  const [guardians, setGuardians] = useState(mockData.settingsContent['Default Partners/Guardians'].assigned);
  const [otherContacts, setOtherContacts] = useState(mockData.settingsContent['Default Partners/Guardians'].others);
  const [connectedDevices, setConnectedDevices] = useState(mockData.settingsContent['Connected Devices'].content);
  const [isBluetoothOn, setIsBluetoothOn] = useState(true);

  const handleToggle = (index: number | null, type: string) => {
    if (type === 'Notifications' && index !== null) {
      const newNotifications = [...notifications];
      newNotifications[index].enabled = !newNotifications[index].enabled;
      setNotifications(newNotifications);
    } else if (type === 'Accessibility') {
      setIsDarkMode(!isDarkMode);
    }
  };

  const handleAssignGuardian = (contact: string) => {
    setGuardians([...guardians, contact]);
    setOtherContacts(otherContacts.filter((c) => c !== contact));
  };

  const handleRemoveGuardian = (contact: string) => {
    setGuardians(guardians.filter((c) => c !== contact));
    setOtherContacts([...otherContacts, contact]);
  };

  const handleDeviceStatus = (index: number) => {
    const newDevices = [...connectedDevices];
    newDevices[index].status = newDevices[index].status === 'Connected' ? 'Disconnected' : 'Connected';
    setConnectedDevices(newDevices);
  };

  const modalBgClasses = isDarkMode ? 'bg-card text-white' : 'bg-white text-slate-900';
  const listBgClasses = isDarkMode ? 'bg-slate-700' : 'bg-gray-100';
  const listTextClasses = isDarkMode ? 'text-white' : 'text-gray-700';

  const getModalContent = () => {
    switch (setting) {
      case 'Notifications':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-headline font-semibold mb-2">Notification Types</h3>
            <ul className="space-y-3">
              {notifications.map((notif, index) => (
                <li key={index} className={`flex items-center justify-between p-3 rounded-lg ${listBgClasses}`}>
                  <div>
                    <p className={`font-medium ${listTextClasses}`}>{notif.name}</p>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{notif.description}</p>
                  </div>
                  <button
                    onClick={() => handleToggle(index, 'Notifications')}
                    className={`relative w-10 h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out flex-shrink-0 ${notif.enabled ? 'bg-primary' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out ${notif.enabled ? 'translate-x-4' : 'translate-x-0'}`}></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'Connected Devices':
        return (
            <div className="space-y-4">
              <div className={`flex items-center justify-between p-3 rounded-lg ${listBgClasses}`}>
                <p className={`font-medium ${listTextClasses}`}>Bluetooth</p>
                <button
                  onClick={() => setIsBluetoothOn(!isBluetoothOn)}
                  className={`relative w-10 h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out flex-shrink-0 ${isBluetoothOn ? 'bg-primary' : 'bg-gray-300'}`}
                >
                  <span className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out ${isBluetoothOn ? 'translate-x-4' : 'translate-x-0'}`}></span>
                </button>
              </div>
              <h3 className="text-lg font-headline font-semibold mb-2 pt-2">My Devices</h3>
              <ul className="space-y-3">
                {connectedDevices.map((device, index) => (
                  <li key={index} className={`flex items-center justify-between p-3 rounded-lg ${listBgClasses} ${!isBluetoothOn && device.name.includes('Bluetooth') ? 'opacity-50' : ''}`}>
                    <div>
                      <p className={`font-medium ${listTextClasses}`}>{device.name}</p>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Last Sync: {device.lastSync}</p>
                    </div>
                    <button 
                      onClick={() => handleDeviceStatus(index)} 
                      className={`py-1 px-3 rounded-full text-sm font-semibold transition-colors text-white ${device.status === 'Connected' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-600'}`}
                      disabled={!isBluetoothOn && device.name.includes('Bluetooth')}
                    >
                      {device.status}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
      case 'Gesture Configuration':
        const gestures = mockData.settingsContent['Gesture Configuration'].content;
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-headline font-semibold mb-2">Configure Gestures</h3>
            <ul className="space-y-3">
              {gestures.map((item, index) => (
                <li key={index} className={`flex items-center justify-between p-3 rounded-lg ${listBgClasses}`}>
                  <p className={`font-medium ${listTextClasses}`}>{item.gesture}</p>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{item.action}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'Default Partners/Guardians':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-headline font-semibold mb-2">Assigned Guardians</h3>
            <ul className="space-y-2">
              {guardians.map((contact, index) => (
                <li key={index} className={`flex items-center justify-between p-3 rounded-lg ${listBgClasses}`}>
                  <p className={`font-medium ${listTextClasses}`}>{contact}</p>
                  <button onClick={() => handleRemoveGuardian(contact)} className="text-red-500 hover:text-red-700 transition-colors"><X size={16} /></button>
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-headline font-semibold mb-2 mt-6">Other Contacts</h3>
            <ul className="space-y-2">
              {otherContacts.map((contact, index) => (
                <li key={index} className={`flex items-center justify-between p-3 rounded-lg ${listBgClasses}`}>
                  <p className={`font-medium ${listTextClasses}`}>{contact}</p>
                  <button onClick={() => handleAssignGuardian(contact)} className="text-primary hover:opacity-80 transition-colors"><Plus size={16} /></button>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'Accessibility':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-headline font-semibold mb-2">Display Settings</h3>
            <div className={`flex items-center justify-between p-3 rounded-lg ${listBgClasses}`}>
              <p className={`font-medium ${listTextClasses}`}>Dark Mode</p>
              <button onClick={() => handleToggle(null, 'Accessibility')} className={`relative w-10 h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out flex-shrink-0 ${isDarkMode ? 'bg-primary' : 'bg-gray-300'}`}>
                <span className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`}></span>
              </button>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Adjust app settings for better accessibility, including font sizes, color contrast, and screen reader support.</p>
          </div>
        );
      case 'Help Center':
      case 'About Us':
        return <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>{mockData.settingsContent[setting]}</p>;
      default:
        return <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>No content available for this setting.</p>;
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`p-6 rounded-2xl shadow-xl max-w-lg w-full space-y-4 overflow-y-auto max-h-[90vh] ${modalBgClasses}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-headline font-bold">{setting}</h2>
          <button onClick={onClose} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
            <X size={24} />
          </button>
        </div>
        {getModalContent()}
      </div>
    </div>
  );
}
