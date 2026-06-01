import { cn } from "@/lib/utils";

export function MeridianMark({
  size = 52,
  className,
  animated = false,
}: {
  size?: number;
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("text-accent", className)}
    >
      {/* halo arc */}
      <path d="M9 6 Q16 2 23 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45" fill="none"/>
      {/* left wing */}
      <path d="M2 16 L9 11 L9 16 Z" fill="currentColor" opacity="0.55"/>
      <path d="M2 16 L9 16 L9 21 Z" fill="currentColor" opacity="0.35"/>
      <path d="M5 13 L9 13 L9 19 Z" fill="currentColor" opacity="0.85"/>
      {/* right wing */}
      <path d="M30 16 L23 11 L23 16 Z" fill="currentColor" opacity="0.55"/>
      <path d="M30 16 L23 16 L23 21 Z" fill="currentColor" opacity="0.35"/>
      <path d="M27 13 L23 13 L23 19 Z" fill="currentColor" opacity="0.85"/>
      {/* diamond eye */}
      <path d="M16 5 L24 16 L16 27 L8 16 Z" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      {/* iris */}
      <path d="M16 11 L19 16 L16 21 L13 16 Z" fill="currentColor" className={animated ? "eye-iris" : ""}/>
      {/* pupil */}
      <circle cx="16" cy="16" r="1.4" className="fill-bg"/>
    </svg>
  );
}

export function Brand({
  size = 52,
  label = true,
  animated = false,
}: {
  size?: number;
  label?: boolean;
  animated?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[15px] font-medium tracking-[-0.01em]">
      <MeridianMark size={size} animated={animated} />
      {label ? <span>Meridian Flow</span> : null}
    </span>
  );
}
