'use client';

import { useState, useEffect } from 'react';
import { X, Ambulance, CheckCircle, Bell } from 'lucide-react';
import { createPortal } from 'react-dom';
import GoogleMap from './google-map';
import { mockData } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { SosStage } from '@/types';

interface SosActivePageProps {
  onClose: () => void;
  isDarkMode: boolean;
}

const NotifPopup = ({ message, onAcknowledge }: { message: string, onAcknowledge: () => void }) => (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-sm w-full text-center z-50 animate-fade-in">
        <Bell size={48} className="text-primary mx-auto mb-4 animate-beat" />
        <p className="font-semibold mb-4">{message}</p>
        <button
            onClick={onAcknowledge}
            className="w-full py-2 bg-primary text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
        >
            OK
        </button>
    </div>
);

export default function SosActivePage({ onClose, isDarkMode }: SosActivePageProps) {
  const [stage, setStage] = useState<SosStage>('searching');
  const [eta, setEta] = useState(15);
  const [showPopup, setShowPopup] = useState<string | null>(null);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    timeouts.push(setTimeout(() => {
        setShowPopup('Ambulance has been dispatched and is heading your way!');
        setStage('dispatched');
    }, 4000));

    timeouts.push(setTimeout(() => {
        setStage('en-route');
    }, 8000));

    timeouts.push(setTimeout(() => {
        setStage('arriving');
    }, 12000));

    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (stage === 'en-route' || stage === 'arriving') {
      const interval = setInterval(() => {
        setEta((prev) => (prev > 0 ? prev - 1 : 0));
      }, 60 * 1000); // every minute
      return () => clearInterval(interval);
    }
  }, [stage]);
  
  const getStageConfig = () => {
    switch(stage) {
      case 'searching':
        return {
          bgColor: 'bg-red-500/80',
          textColor: 'text-white',
          statusText: 'Contacting Emergency Services...',
        };
      case 'dispatched':
        return {
          bgColor: 'bg-red-500/80',
          textColor: 'text-white',
          statusText: 'Ambulance Dispatched!',
        };
      case 'en-route':
        return {
          bgColor: 'bg-orange-400/80',
          textColor: 'text-white',
          statusText: 'Ambulance is En Route',
        };
      case 'arriving':
        return {
          bgColor: 'bg-yellow-300/80',
          textColor: 'text-slate-800',
          statusText: 'Ambulance is Arriving Soon',
        };
      default:
        return { bgColor: 'bg-slate-900', textColor: 'text-white', statusText: 'SOS Active' };
    }
  };

  const { bgColor, textColor, statusText } = getStageConfig();

  return (
    <div className={cn('fixed inset-0 flex flex-col z-50 transition-colors duration-1000', bgColor)}>
      <header className="p-4 flex items-center justify-between text-white relative z-10">
        <h1 className={cn('text-2xl font-headline font-bold', textColor)}>{statusText}</h1>
        <button onClick={onClose} className={cn('p-2 rounded-full bg-black/20 hover:bg-black/40', textColor)}>
          <X size={24} />
        </button>
      </header>

      <main className="relative flex-1 flex flex-col">
        <div className="absolute inset-0">
          <GoogleMap location={mockData.location} showControls={false} isDarkMode={true} />
        </div>
        
        {stage === 'searching' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-64 h-64">
                    <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-scan-ping"></div>
                    <div className="absolute inset-4 rounded-full bg-blue-500/30 animate-scan-ping" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute inset-8 rounded-full bg-blue-500/30 animate-scan-ping" style={{ animationDelay: '1s' }}></div>
                </div>
            </div>
        )}

        {(stage === 'en-route' || stage === 'arriving') && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <path d="M 20 80 C 40 20, 60 20, 80 80" stroke="#4866FA" strokeWidth="2" strokeDasharray="4" fill="none" className="animate-pulse" />
                    <Ambulance size={8} className="text-white animate-ambulance-move" style={{ offsetPath: 'path("M 20 80 C 40 20, 60 20, 80 80")' }} />
                </svg>
            </div>
        )}
        
        <div className="relative mt-auto p-4 text-center">
            <div className={cn("p-6 rounded-2xl shadow-xl backdrop-blur-md bg-black/40", textColor)}>
                <Ambulance size={48} className="mx-auto mb-2" />
                <h2 className="text-2xl font-bold">{eta} minutes</h2>
                <p className="font-semibold">Estimated Time of Arrival</p>
                <p className="text-xs mt-2 opacity-80">Your location has been shared. Help is on the way. Please stay calm.</p>
            </div>
        </div>
      </main>

      {showPopup && createPortal(
        <NotifPopup message={showPopup} onAcknowledge={() => setShowPopup(null)} />,
        document.body
      )}
    </div>
  );
}
