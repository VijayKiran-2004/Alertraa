'use client';

import { Heart, Droplet, Flame, Moon, ChevronRight, CheckSquare, Brain, FileText, Clock, Footprints } from 'lucide-react';
import SectionCard from './section-card';
import { mockData } from '@/lib/mock-data';
import ProgressRing from './progress-ring';
import { cn } from '@/lib/utils';
import type { DailyActivity } from '@/types';

interface HomePageProps {
  onMetricClick: (metric: string) => void;
  onMapClick: () => void;
  vitals: { heartRate: string; bloodPressure: string; bloodOxygen: string };
  dailyActivity: { steps: string; sleepHours: string; caloriesBurnt: string; distanceWalked: string };
  onEmergencyClick: (date: string) => void;
  isDarkMode: boolean;
  onShowDailyPlan: () => void;
}


export default function HomePage({ onMetricClick, onMapClick, vitals, dailyActivity, onEmergencyClick, onShowDailyPlan, isDarkMode }: HomePageProps) {
  const textClasses = isDarkMode ? 'text-white' : 'text-slate-900';
  const secondaryTextClasses = isDarkMode ? 'text-slate-400' : 'text-gray-500';
  const cardBg = isDarkMode ? 'bg-slate-800' : 'bg-white';
  const itemBg = isDarkMode ? 'bg-slate-700' : 'bg-slate-100';

  const Fire = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.66 12.21a12.21 12.21 0 0 0 7.13-7.13C16.8 3.31 16.24 3 16 3l-1.4.52a9.58 9.58 0 0 0-4.08 4.08L10 9c.05.24.3.8.79 1.29.78.78 2 1.33 3.21 1.06Z"/><path d="M12.44 14.33a9.42 9.42 0 0 0-1.52-2.33l-.2-.3-2.12-2.12-1.2-1.2a5.4 5.4 0 0 0-7.64 0c0 3 2.08 5.43 4.29 6.2 2.54.9 5.39.14 6.84-1.31Z"/></svg>

  const metrics = [
    { name: 'Heart Rate', value: vitals.heartRate, progress: parseInt(vitals.heartRate), icon: <Heart size={24} className="text-red-500" /> },
    { name: 'Sleep', value: dailyActivity.sleepHours, progress: 82, icon: <Moon size={24} className="text-indigo-500" /> },
    { name: 'Blood Pressure', value: vitals.bloodPressure, progress: parseInt(vitals.bloodPressure.split('/')[0]), icon: <Droplet size={24} className="text-blue-500" /> },
    { name: 'Calories Burnt', value: dailyActivity.caloriesBurnt, progress: 65, icon: <Fire size={24} className="text-red-500" /> },
    { name: 'Blood Oxygen', value: vitals.bloodOxygen, progress: parseInt(vitals.bloodOxygen), icon: <Flame size={24} className="text-orange-500" /> },
    { name: 'Distance Walked', value: dailyActivity.distanceWalked, progress: 75, icon: <Footprints size={24} className="text-green-500" /> },
  ];

  return (
    <div className="space-y-4 animate-fade-in pb-10">
      <div className='text-center mb-4'>
        <h1 className='text-xl font-bold text-primary'>ALERTRA</h1>
      </div>
      <div className={`grid grid-cols-2 gap-4 p-4 rounded-2xl shadow-md ${cardBg}`}>
        {metrics.map(metric => (
          <div key={metric.name} className={`p-4 rounded-xl flex items-center gap-3 cursor-pointer ${itemBg}`} onClick={() => onMetricClick(metric.name)}>
            <ProgressRing progress={metric.progress} isDarkMode={isDarkMode} icon={metric.icon} />
            <div className='text-left'>
                <p className={`text-sm font-bold ${textClasses}`}>{metric.name}</p>
                <p className={`text-sm ${secondaryTextClasses}`}>{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className={`p-4 rounded-2xl shadow-md ${cardBg}`}>
        <div className='flex justify-between items-start'>
            <div>
                <h3 className={`font-bold ${textClasses}`}>Maintaining Heart rate</h3>
                <p className={`text-xs mt-1 ${secondaryTextClasses}`}>You're maintaining heart rate by entering your optimal Strain range. Keep pushing yourself towards your target of 15.5 to see even greater results.</p>
            </div>
            <div className='flex-shrink-0 ml-2'>
                <CheckSquare size={32} className='text-primary'/>
            </div>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
         <div className={`p-4 rounded-2xl shadow-md ${cardBg}`}>
            <h4 className='text-sm font-bold flex justify-between items-center'>HEALTH MONITOR <ChevronRight size={18}/></h4>
            <div className='flex items-center gap-2 mt-2'>
                <CheckSquare size={24} className='text-primary'/>
                <div>
                    <p className={`text-xs font-semibold ${textClasses}`}>WITHIN RANGE</p>
                    <p className={`text-xs ${secondaryTextClasses}`}>5/5 Metrics</p>
                </div>
            </div>
         </div>
         <div className={`p-4 rounded-2xl shadow-md ${cardBg}`}>
            <h4 className='text-sm font-bold flex justify-between items-center'>STRESS LEVEL <ChevronRight size={18}/></h4>
             <div className='flex items-center gap-2 mt-2'>
                <Brain size={24} className='text-primary'/>
                <div>
                    <p className={`text-xs font-semibold ${textClasses}`}>WITHIN RANGE</p>
                    <p className={`text-xs ${secondaryTextClasses}`}>2/5 Stress</p>
                </div>
            </div>
         </div>
      </div>

      <div className={`p-4 rounded-2xl shadow-md ${cardBg}`}>
        <h3 className={`font-bold mb-2 ${textClasses}`}>My Day</h3>
        <button onClick={onShowDailyPlan} className={`w-full p-3 rounded-lg flex items-center gap-3 text-left ${itemBg}`}>
            <FileText size={24} className='text-primary'/>
            <span className={`flex-1 font-semibold ${textClasses}`}>Your Daily plan</span>
            <ChevronRight size={20}/>
        </button>
      </div>

      <div className={`p-4 rounded-2xl shadow-md ${cardBg}`}>
        <div className='flex justify-between items-center mb-2'>
            <h3 className={`font-bold ${textClasses}`}>TODAY'S ACTIVITIES</h3>
            <button><ChevronRight size={20}/></button>
        </div>
        <div className={`p-3 rounded-lg ${itemBg}`}>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <div className={cn('p-2 rounded-md', isDarkMode ? 'bg-slate-900' : 'bg-slate-600 text-white')}>
                        <Clock size={20}/>
                    </div>
                    <div>
                        <p className={`text-xs font-bold ${textClasses}`}>6:18 Hrs</p>
                        <p className={`text-xs ${secondaryTextClasses}`}>SLEEP</p>
                    </div>
                </div>
                <div className='text-right'>
                    <p className={`text-xs ${secondaryTextClasses}`}>11:08 PM</p>
                    <p className={`text-xs ${secondaryTextClasses}`}>05:34 AM</p>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
}
