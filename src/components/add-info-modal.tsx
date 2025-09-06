'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface AddInfoModalProps {
  type: string;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function AddInfoModal({ type, onClose, isDarkMode }: AddInfoModalProps) {
  const [formState, setFormState] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Adding new ${type} info:`, formState);
    // Here you would add logic to save the data
    onClose();
  };

  const getFields = () => {
    switch (type) {
      case 'Health':
        return [
          { name: 'conditionName', label: 'Health Condition Name', type: 'text' },
          { name: 'diagnosisDate', label: 'Diagnosis Date', type: 'text' },
          { name: 'status', label: 'Status', type: 'text' },
          { name: 'medicationName', label: 'Medication Name', type: 'text' },
          { name: 'dosage', label: 'Dosage', type: 'text' },
          { name: 'frequency', label: 'Frequency', type: 'text' },
          { name: 'duration', label: 'Duration', type: 'text' },
        ];
      case 'Allergy':
        return [
          { name: 'allergyName', label: 'Allergy Name', type: 'text' },
          { name: 'reaction', label: 'Reaction', type: 'text' },
          { name: 'precaution', label: 'Precaution', type: 'text' },
        ];
      default:
        return [];
    }
  };

  const modalBgClasses = isDarkMode ? 'bg-card text-white' : 'bg-white text-slate-900';
  const inputBgClasses = isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-100 border-gray-300 text-slate-900';
  const labelTextClasses = isDarkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`p-6 rounded-2xl shadow-xl max-w-lg w-full space-y-4 overflow-y-auto max-h-[90vh] ${modalBgClasses}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-headline font-bold">Add New {type === 'Health' ? 'Health Info' : 'Allergy Info'}</h2>
          <button onClick={onClose} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {getFields().map((field) => (
            <div key={field.name} className="flex flex-col">
              <label htmlFor={field.name} className={`text-sm font-medium mb-1 ${labelTextClasses}`}>{field.label}</label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${inputBgClasses}`}
                required
              />
            </div>
          ))}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md font-bold hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-gradient-to-r from-primary to-accent text-white rounded-md font-bold hover:opacity-90 transition-opacity animate-gradient-xy"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
