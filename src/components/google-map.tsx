'use client';

import type { Location } from '@/types';

interface GoogleMapProps {
  location: Location;
  isDarkMode: boolean; // Dark mode might not be supported by default in embed
  showControls?: boolean;
}

export default function GoogleMap({ location, isDarkMode, showControls = false }: GoogleMapProps) {
  const mapUrl = `https://maps.google.com/maps?q=${location.latitude},${location.longitude}&hl=en&z=15&output=embed`;

  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl shadow-inner bg-slate-200 dark:bg-slate-700">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src={mapUrl}
        style={{
            filter: isDarkMode ? 'invert(1) grayscale(0.6)' : 'none',
            borderRadius: '0.75rem'
        }}
        title="Live Location Map"
        aria-label="Live Location Map"
      ></iframe>
    </div>
  );
}
