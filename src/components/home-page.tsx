'use client';

import { Heart, Route, MapPin, Droplet, Flame, Moon, ChevronRight, CheckSquare, Brain, FileText, Clock } from 'lucide-react';
import SectionCard from './section-card';
import { mockData } from '@/lib/mock-data';
import ProgressRing from './progress-ring';
import { cn } from '@/lib/utils';

interface HomePageProps {
  onMetricClick: (metric: string) => void;
  onMapClick: () => void;
  vitals: { heartRate: string; bloodPressure: string; bloodOxygen: string };
  onEmergencyClick: (date: string) => void;
  isDarkMode: boolean;
}


export default function HomePage({ onMetricClick, onMapClick, vitals, onEmergencyClick, isDarkMode }: HomePageProps) {
  const textClasses = isDarkMode ? 'text-white' : 'text-slate-900';
  const secondaryTextClasses = isDarkMode ? 'text-slate-400' : 'text-gray-500';
  const cardBg = isDarkMode ? 'bg-slate-800' : 'bg-white';
  const itemBg = isDarkMode ? 'bg-slate-700' : 'bg-slate-100';

  const metrics = [
    { name: 'Heart Rate', value: 72, progress: 72, unit: 'bpm' },
    { name: 'Sleep', value: 80, progress: 80, unit: '%' },
    { name: 'Recovery', value: 70, progress: 70, unit: '%' },
    { name: 'Strain', value: 14.2, progress: (14.2/20 * 100), unit: '' },
  ];

  return (
    <div className="space-y-4 animate-fade-in pb-10">
      <div className='text-center mb-4'>
        <h1 className='text-xl font-bold text-primary'>ALERTRA</h1>
      </div>
      <div className={`grid grid-cols-4 gap-3 p-4 rounded-2xl shadow-md ${cardBg}`}>
        {metrics.map(metric => (
          <div key={metric.name} className="flex flex-col items-center gap-2">
            <ProgressRing progress={metric.progress} isDarkMode={isDarkMode}/>
            <div className='text-center'>
                <p className={`text-xs font-bold ${textClasses}`}>{metric.name}</p>
                <p className={`text-xs ${secondaryTextClasses}`}>{metric.value}{metric.unit}</p>
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
        <button className={`w-full p-3 rounded-lg flex items-center gap-3 text-left ${itemBg}`}>
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
