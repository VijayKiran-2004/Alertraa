'use client';

import { mockData } from '@/lib/mock-data';

interface GoogleMapProps {
  isDarkMode: boolean;
}

export default function GoogleMap({ isDarkMode }: GoogleMapProps) {
  const { latitude, longitude } = mockData.location;
  // Using a generic embed from Google Maps. Replace with a proper Maps API implementation for full features.
  const mapSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&amp;output=embed&amp;maptype=roadmap&amp;${isDarkMode ? 'styles=dark' : ''}`;

  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl shadow-inner">
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapSrc}
        style={{ border: 0 }}
      ></iframe>
    </div>
  );
}
