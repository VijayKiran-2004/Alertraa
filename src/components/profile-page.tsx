'use client';

import { useState } from 'react';
import { User, Plus, X, PhoneCall, AlertTriangle, Users, Wallet, ShoppingCart } from 'lucide-react';
import SectionCard from './section-card';
import InfoList from './info-list';
import { mockData } from '@/lib/mock-data';
import type { EmergencyContact, AllContact, Medicine } from '@/types';

interface ProfilePageProps {
  onShowHealthHistory: () => void;
  onShowAddModal: (type: string) => void;
  onEmergencyClick: (date: string) => void;
  onAddToCart: (medicine: Medicine) => void;
  isDarkMode: boolean;
}

export default function ProfilePage({ onShowHealthHistory, onShowAddModal, onEmergencyClick, onAddToCart, isDarkMode }: ProfilePageProps) {
  const [assignedContacts, setAssignedContacts] = useState<EmergencyContact[]>(mockData.emergencyContacts);
  const [allContacts, setAllContacts] = useState<AllContact[]>(mockData.allContacts);

  const handleAddContact = (contactToAdd: AllContact) => {
    setAssignedContacts([...assignedContacts, { ...contactToAdd, instructions: 'N/A', prioritized: false }]);
  };

  const handleRemoveContact = (contactToRemove: EmergencyContact) => {
    setAssignedContacts(assignedContacts.filter((c) => c.name !== contactToRemove.name));
  };

  const handleMedicationAddToCart = (medicationName: string) => {
    const medicine = mockData.eCommerce.medicines.find(m => m.name.includes(medicationName));
    if (medicine) {
      onAddToCart(medicine);
    } else {
      console.warn(`Medicine "${medicationName}" not found in store.`);
    }
  };
  
  const getSeverityIconColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500';
      case 'major': return 'text-orange-500';
      case 'minor': return 'text-yellow-400';
      default: return 'text-gray-500';
    }
  };
  
  const textClasses = isDarkMode ? 'text-white' : 'text-slate-900';
  const secondaryTextClasses = isDarkMode ? 'text-slate-400' : 'text-gray-500';
  const listBgClasses = isDarkMode ? 'bg-slate-700' : 'bg-gray-100';
  const itemBgClasses = isDarkMode ? 'bg-slate-800' : 'bg-gray-100';
  
  return (
    <div className="space-y-6 animate-fade-in pb-24">
      <SectionCard isDarkMode={isDarkMode}>
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-primary/20 rounded-full">
            <User size={40} className="text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-headline font-bold">{mockData.userDetails.username}</h2>
            <div className={`text-sm ${secondaryTextClasses} mt-1`}>
              <span>{mockData.userDetails.age} years</span> &bull; <span>{mockData.userDetails.height}</span> &bull; <span>{mockData.userDetails.weight}</span>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard isDarkMode={isDarkMode}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-headline font-bold">Health Information</h2>
          <button onClick={onShowHealthHistory} className="px-4 py-2 rounded-lg shadow-md text-sm bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity animate-gradient-xy">
            History
          </button>
        </div>

        <div className="flex justify-between items-center mb-2">
          <h3 className={`text-md font-semibold ${textClasses}`}>Health Conditions & Medications</h3>
          <button onClick={() => onShowAddModal('Health')} className={`p-1.5 rounded-full transition-colors ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
            <Plus size={16} />
          </button>
        </div>
        <ul className="space-y-2 mb-4">
          {mockData.userDetails.healthConditions.map((condition, index) => (
            <li key={index} className={`p-3 rounded-lg ${listBgClasses}`}>
               <div className="flex justify-between items-center">
                    <div>
                        <p className={`font-medium ${textClasses}`}>{condition.name}</p>
                        <p className={`text-sm ${secondaryTextClasses}`}>Medication: {condition.medication} | Since: {condition.since}</p>
                    </div>
                    <button
                      onClick={() => handleMedicationAddToCart(condition.medication)}
                      className="p-2 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                      aria-label={`Add ${condition.medication} to cart`}
                    >
                      <ShoppingCart size={18} />
                    </button>
               </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center mb-2 mt-4">
          <h3 className={`text-md font-semibold ${textClasses}`}>Allergies & Precautions</h3>
          <button onClick={() => onShowAddModal('Allergy')} className={`p-1.5 rounded-full transition-colors ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
            <Plus size={16} />
          </button>
        </div>
        <ul className="space-y-2 mt-2">
          {mockData.userDetails.allergies.map((allergy, index) => (
            <li key={index} className={`p-3 rounded-lg ${listBgClasses}`}>
              <p className={`font-medium ${textClasses}`}>{allergy.name}</p>
              <p className={`text-sm ${secondaryTextClasses}`}>Reaction: {allergy.reaction}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Emergency Contacts" isDarkMode={isDarkMode}>
        <div className="space-y-4">
          {assignedContacts.map((contact, index) => (
            <div key={index} className={`p-4 rounded-2xl shadow-sm flex items-center justify-between ${itemBgClasses}`}>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className={`text-lg font-bold ${textClasses}`}>{contact.name}</h3>
                  {contact.prioritized && <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">Primary</span>}
                </div>
                <p className={`text-sm ${secondaryTextClasses}`}>{contact.relationship}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => handleRemoveContact(contact)} className={`p-2 rounded-full shadow-sm transition-colors ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                  <X size={20} />
                </button>
                <button className="p-2 rounded-full shadow-sm bg-gradient-to-r from-primary to-accent text-white animate-gradient-xy">
                  <PhoneCall size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Add New Contacts" isDarkMode={isDarkMode}>
        <ul className="space-y-2">
          {allContacts.filter(c => !assignedContacts.some(ac => ac.name === c.name)).map((contact, index) => (
            <li key={index} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${itemBgClasses}`}>
              <div>
                <p className={`font-medium ${textClasses}`}>{contact.name}</p>
                <p className={`text-sm ${secondaryTextClasses}`}>{contact.relationship}</p>
              </div>
              <button onClick={() => handleAddContact(contact)} className="text-primary hover:opacity-80 transition-opacity">
                <Plus size={20} />
              </button>
            </li>
          ))}
        </ul>
      </SectionCard>
      
      <SectionCard title="Emergency Information" isDarkMode={isDarkMode}>
        <InfoList title="Guardian Contacts" items={mockData.userDetails.guardianContacts} icon={<Users size={18} className="text-emerald-500" />} isDarkMode={isDarkMode} />
        <InfoList title="Insurance Info" items={mockData.userDetails.insurance} icon={<Wallet size={18} className="text-purple-500" />} isDarkMode={isDarkMode} />
      </SectionCard>
    </div>
  );
}
