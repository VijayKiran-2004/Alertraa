'use client';

import { cn } from '@/lib/utils';

export function AppIcon({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative", className)} {...props} >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="50" cy="50" r="48" className="fill-primary" />
            <text x="50" y="68" textAnchor="middle" fontSize="60" className="fill-primary-foreground font-headline font-bold">A</text>
        </svg>
    </div>
  );
}
