'use client';

import { Heart, AlertTriangle, Route, ChevronRight, MapPin, Droplet, Flame } from 'lucide-react';
import SectionCard from './section-card';
import GoogleMap from './google-map';
import { mockData } from '@/lib/mock-data';

interface HomePageProps {
  onMetricClick: (metric: string) => void;
  onMapClick: () => void;
  vitals: { heartRate: string; bloodPressure: string; bloodOxygen: string };
  onEmergencyClick: (date: string) => void;
  isDarkMode: boolean;
}

const Gauge = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
const Footprints = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 16v-2.38c0-.97.5-1.84 1.3-2.39l1.4-1.05a2.5 2.5 0 0 1 3.6 0l1.4 1.05c.8.55 1.3 1.42 1.3 2.39V16"/><path d="M12 16v-2.38c0-.97.5-1.84 1.3-2.39l1.4-1.05a2.5 2.5 0 0 1 3.6 0l1.4 1.05c.8.55 1.3 1.42 1.3 2.39V16"/><path d="M4.68 12.55a2.5 2.5 0 0 1 0-5.1"/><path d="M12.68 12.55a2.5 2.5 0 0 1 0-5.1"/></svg>
const Moon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>

export default function HomePage({ onMetricClick, onMapClick, vitals, onEmergencyClick, isDarkMode }: HomePageProps) {
  const textClasses = isDarkMode ? 'text-white' : 'text-slate-900';
  const secondaryTextClasses = isDarkMode ? 'text-slate-400' : 'text-gray-500';
  const hoverClasses = isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100';

  const getSeverityIconColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500';
      case 'major': return 'text-orange-500';
      case 'minor': return 'text-yellow-400';
      default: return 'text-gray-500';
    }
  };

  const metrics = [
    { name: 'Heart Rate', value: vitals.heartRate, icon: <Heart size={24} className="text-red-500 animate-beat" />, onClick: () => onMetricClick('Heart Rate') },
    { name: 'Blood Pressure', value: vitals.bloodPressure, icon: <Gauge size={24} className="text-primary animate-pulse-fast" />, onClick: () => onMetricClick('Blood Pressure') },
    { name: 'Blood Oxygen', value: vitals.bloodOxygen, icon: <Droplet size={24} className="text-red-500" />, onClick: () => onMetricClick('Blood Oxygen') },
    { name: 'Steps Walked', value: mockData.dailyActivity.steps, icon: <Footprints size={24} className="text-pink-500" />, onClick: () => onMetricClick('Steps') },
    { name: 'Distance Walked', value: mockData.dailyActivity.distanceWalked, icon: <Route size={24} className="text-orange-500" />, onClick: () => onMetricClick('Distance Walked') },
    { name: 'Calories Burnt', value: mockData.dailyActivity.caloriesBurnt, icon: <Flame size={24} className="text-lime-500" />, onClick: () => onMetricClick('Calories Burnt') },
    { name: 'Sleep Hours', value: mockData.dailyActivity.sleepHours, icon: <Moon size={24} className="text-indigo-500" />, onClick: () => onMetricClick('Sleep Hours') },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionCard title="Health & Activity Summary" isDarkMode={isDarkMode}>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map(metric => (
                 <button key={metric.name} onClick={metric.onClick} className={`flex items-center space-x-3 text-left p-3 rounded-lg transition-colors ${hoverClasses}`}>
                    {metric.icon}
                    <div>
                        <p className={`text-sm ${secondaryTextClasses}`}>{metric.name}</p>
                        <p className={`text-lg font-semibold ${textClasses}`}>{metric.value}</p>
                    </div>
                </button>
            ))}
        </div>
      </SectionCard>

      <SectionCard title="Live Location" isDarkMode={isDarkMode}>
        <button onClick={onMapClick} className="w-full relative block">
          <div className="w-full h-48 rounded-xl overflow-hidden shadow-inner cursor-pointer relative">
            <GoogleMap location={mockData.location} showControls={false} isDarkMode={isDarkMode} />
          </div>
        </button>
        <div className="flex items-start space-x-3 mt-4">
          <MapPin size={24} className="text-primary mt-1 flex-shrink-0" />
          <div>
            <p className={`text-sm ${secondaryTextClasses}`}>Current Location</p>
            <p className={`text-lg font-semibold ${textClasses}`}>{mockData.location.address}</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Recent Emergencies" isDarkMode={isDarkMode}>
        {mockData.emergencies.length > 0 ? (
          <ul className="space-y-2">
            {mockData.emergencies.map((event, index) => (
              <li
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-colors ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => onEmergencyClick(event.date)}
              >
                <AlertTriangle size={18} className={getSeverityIconColor(event.severity)} />
                <p className={`text-sm flex-1 ${textClasses}`}>
                  <span className='font-semibold'>{event.date}</span>: {event.summary}
                </p>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No recent emergencies.</p>
        )}
      </SectionCard>
    </div>
  );
}
