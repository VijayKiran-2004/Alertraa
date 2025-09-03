'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export function AlertraLogo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-20", className)} {...props}>
      <Image
        src="/logo.svg"
        alt="Alertra Logo"
        width={80}
        height={21}
        className="dark:invert"
        priority
      />
    </div>
  );
}
