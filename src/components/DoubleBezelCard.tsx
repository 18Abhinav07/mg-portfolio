import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

interface DoubleBezelCardProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

export function DoubleBezelCard({ children, className, innerClassName }: DoubleBezelCardProps) {
  return (
    <div className={cn(
      "bg-[#F1F3F5] rounded-2rem p-1.5 border border-parliament/5 ring-1 ring-parliament/5 shadow-sm",
      className
    )}>
      <div className={cn(
        "bg-slateWhite rounded-bezel-core w-full h-full shadow-bezel-inner relative overflow-hidden",
        innerClassName
      )}>
        {children}
      </div>
    </div>
  );
}
