'use client';

import { X, Sun, Moon, Utensils, Dumbbell, Pill } from 'lucide-react';

interface DailyPlanModalProps {
  onClose: () => void;
  isDarkMode: boolean;
}

const PlanSection = ({ title, icon, children, isDarkMode }: { title: string; icon: React.ReactNode; children: React.ReactNode; isDarkMode: boolean }) => (
  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
    <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{icon}{title}</h3>
    <div className="space-y-2 text-sm">
      {children}
    </div>
  </div>
);

const PlanItem = ({ time, description, isDarkMode }: { time: string, description: string, isDarkMode: boolean }) => (
    <div className="flex items-center gap-3">
        <span className={`font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{time}</span>
        <p className={`${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>{description}</p>
    </div>
);

export default function DailyPlanModal({ onClose, isDarkMode }: DailyPlanModalProps) {
  const modalBgClasses = isDarkMode ? 'bg-[#36454F] text-white' : 'bg-white text-slate-900';

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`p-6 rounded-2xl shadow-xl max-w-lg w-full space-y-4 overflow-y-auto max-h-[90vh] ${modalBgClasses}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-headline font-bold">Your Daily Plan</h2>
          <button onClick={onClose} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
            <PlanSection title="Morning Routine" icon={<Sun size={20} className="text-yellow-500" />} isDarkMode={isDarkMode}>
                <PlanItem time="07:00 AM" description="Wake up & drink a glass of water." isDarkMode={isDarkMode} />
                <PlanItem time="07:30 AM" description="Morning walk for 30 minutes." isDarkMode={isDarkMode} />
                <PlanItem time="08:30 AM" description="Breakfast: Oatmeal with berries." isDarkMode={isDarkMode} />
            </PlanSection>

            <PlanSection title="Afternoon" icon={<Utensils size={20} className="text-orange-500" />} isDarkMode={isDarkMode}>
                <PlanItem time="01:00 PM" description="Lunch: Grilled chicken salad." isDarkMode={isDarkMode} />
                <PlanItem time="03:00 PM" description="Light snack: Apple slices." isDarkMode={isDarkMode} />
                <PlanItem time="05:00 PM" description="Evening exercise: 20 minutes of stretching." isDarkMode={isDarkMode} />
            </PlanSection>

            <PlanSection title="Evening Routine" icon={<Moon size={20} className="text-indigo-500" />} isDarkMode={isDarkMode}>
                <PlanItem time="07:00 PM" description="Dinner: Baked salmon with vegetables." isDarkMode={isDarkMode} />
                <PlanItem time="09:00 PM" description="Read a book or listen to calming music." isDarkMode={isDarkMode} />
                <PlanItem time="10:00 PM" description="Bedtime. Aim for 8 hours of sleep." isDarkMode={isDarkMode} />
            </PlanSection>

             <PlanSection title="Medication" icon={<Pill size={20} className="text-green-500" />} isDarkMode={isDarkMode}>
                <PlanItem time="08:30 AM" description="Take Lisinopril (10mg) with breakfast." isDarkMode={isDarkMode} />
                <PlanItem time="07:00 PM" description="Take Metformin (500mg) with dinner." isDarkMode={isDarkMode} />
            </PlanSection>
        </div>

         <div className="flex justify-end pt-4">
            <button
              onClick={onClose}
              className="py-2 px-6 bg-primary text-white rounded-md font-bold hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
      </div>
    </div>
  );
}
