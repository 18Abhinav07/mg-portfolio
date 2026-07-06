import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

interface NestedIslandButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function NestedIslandButton({ children, icon, className, ...props }: NestedIslandButtonProps) {
  return (
    <button
      className={cn(
        "group relative flex items-center justify-between gap-4 bg-saffron text-slateWhite rounded-full pl-6 pr-2 py-2 font-medium tracking-wide shadow-md active:scale-[0.98] transition-[transform,box-shadow] duration-700 ease-spring outline-none focus-visible:ring-2 focus-visible:ring-saffron/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slateWhite",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {icon && (
        <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center transform transition-transform duration-700 ease-spring group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
          {icon}
        </div>
      )}
    </button>
  );
}
