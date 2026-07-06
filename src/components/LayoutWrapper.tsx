import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export function Section({ children, className, id }: { children: ReactNode, className?: string, id?: string }) {
  return (
    <section id={id} className={cn("w-full min-h-[100dvh] py-24 md:py-40 px-4 md:px-8 max-w-7xl mx-auto relative", className)}>
      {children}
    </section>
  );
}
