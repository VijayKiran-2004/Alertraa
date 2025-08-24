'use client';

import { useState, useEffect } from 'react';
import { X, Bell, User, Shield, Phone } from 'lucide-react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import type { SosStage } from '@/types';
import MapPlaceholder from './map-placeholder';
import { mockData } from '@/lib/mock-data';

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

const RealisticAmbulanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19.5,8H17V6.5a.5.5,0,0,0-.5-.5h-2a.5.5,0,0,0-.5.5V8H12V6.5a.5.5,0,0,0-.5-.5h-2a.5.5,0,0,0-.5.5V8H4.5A2.5,2.5,0,0,0,2,10.5v6A2.5,2.5,0,0,0,4.5,19h.72a2,2,0,0,0,3.56,0h6.44a2,2,0,0,0,3.56,0H19.5A2.5,2.5,0,0,0,22,16.5v-6A2.5,2.5,0,0,0,19.5,8ZM7,18a1,1,0,1,1-1-1A1,1,0,0,1,7,18Zm4.5-5.5h-2a.5.5,0,0,1-.5-.5v-2a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5v2A.5.5,0,0,1,11.5,12.5Zm.5-6h2V8H12ZM17,18a1,1,0,1,1-1-1A1,1,0,0,1,17,18Z"/>
    </svg>
);

export default function SosActivePage({ onClose, isDarkMode }: SosActivePageProps) {
  const [stage, setStage] = useState<SosStage>('searching');
  const [eta, setEta] = useState(15);
  const [showPopup, setShowPopup] = useState<string | null>(null);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    timeouts.push(setTimeout(() => {
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
        <div className="h-1/2 relative">
          <MapPlaceholder isDarkMode={isDarkMode} showRoute={stage === 'en-route' || stage === 'arriving'} />
          
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
                  <svg className="w-full h-full" viewBox="0 0 200 150">
                      <path id="ambulance-path" d="M 0 80 L 50 75 L 100 90 L 150 85 L 200 95" stroke="transparent" fill="none" />
                       <g style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.5))' }}>
                          <RealisticAmbulanceIcon width={16} height={16} className="text-white">
                            <animateMotion dur="12s" repeatCount="1" fill="freeze">
                                <mpath href="#ambulance-path" />
                            </animateMotion>
                          </RealisticAmbulanceIcon>
                      </g>
                  </svg>
              </div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={cn("p-4 rounded-2xl shadow-xl backdrop-blur-md bg-black/40 w-full text-center md:text-left", textColor)}>
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <RealisticAmbulanceIcon width={32} height={32} className="flex-shrink-0" />
                        <div>
                            <p className="text-lg font-semibold">Estimated Arrival</p>
                            <h2 className="text-4xl font-bold">{eta} min</h2>
                        </div>
                    </div>
                </div>

                <div className={cn("p-4 rounded-2xl shadow-xl backdrop-blur-md bg-black/40 w-full", textColor)}>
                    <h3 className="font-bold mb-2 flex items-center gap-2"><Phone size={16} /> Contacts Notified</h3>
                    <ul className="space-y-1 text-sm">
                       {mockData.emergencyContacts.map((contact) => (
                         <li key={contact.name} className="flex justify-between items-center opacity-90">
                           <span>{contact.name} ({contact.relationship})</span>
                           <span>Notified</span>
                         </li>
                       ))}
                    </ul>
                </div>
            </div>

            <div className={cn("p-4 rounded-2xl shadow-xl backdrop-blur-md bg-black/40 w-full flex-1", textColor)}>
                 <h3 className="font-bold mb-2 flex items-center gap-2"><Shield size={16} /> Critical Health Info</h3>
                 <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                        <p className="font-semibold opacity-80">Allergies</p>
                        <ul className="list-disc list-inside">
                            {mockData.userDetails.allergies.map(a => <li key={a.name}>{a.name}</li>)}
                        </ul>
                    </div>
                     <div>
                        <p className="font-semibold opacity-80">Conditions</p>
                        <ul className="list-disc list-inside">
                            {mockData.userDetails.healthConditions.map(c => <li key={c.name}>{c.name}</li>)}
                        </ul>
                    </div>
                 </div>
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
