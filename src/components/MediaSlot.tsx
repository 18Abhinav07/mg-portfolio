/**
 * Asset placeholder. Renders a tinted, labelled slot wherever a real image or
 * video will be plugged in later. When `src` is supplied it renders the real
 * asset; until then it shows the placeholder code so the layout reads as
 * deliberate. Every code maps to a row in needed_asset.md.
 */

import { ImageSquare, PlayCircle } from '@phosphor-icons/react';
import { cn } from '../utils/cn';

interface MediaSlotProps {
  /** Placeholder code, e.g. PORTRAIT_MAIN. Mapped in needed_asset.md. */
  code: string;
  /** Optional human label shown under the code. */
  label?: string;
  variant?: 'image' | 'video';
  className?: string;
  /** Real asset path, once available. Overrides the placeholder. */
  src?: string;
  alt?: string;
}

export function MediaSlot({ code, label, variant = 'image', className, src, alt }: MediaSlotProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? label ?? code}
        className={cn('h-full w-full object-cover', className)}
        loading="lazy"
      />
    );
  }

  const Icon = variant === 'video' ? PlayCircle : ImageSquare;

  return (
    <div
      data-asset={code}
      className={cn(
        'grid h-full w-full place-items-center bg-[#e9edf1] text-parliament/35 select-none',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <Icon size={30} weight="thin" />
        <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-parliament/45">
          {code}
        </span>
        {label && <span className="font-hindi text-xs text-parliament/30">{label}</span>}
      </div>
    </div>
  );
}
