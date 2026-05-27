import { cn } from "@/lib/utils";

export function MeridianMark({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("text-accent", className)}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 3 Q5 12 12 21" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M12 3 Q19 12 12 21" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M3 12 H21" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function Brand({ size = 22, label = true }: { size?: number; label?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[15px] font-medium tracking-[-0.01em]">
      <MeridianMark size={size} />
      {label ? <span>Meridian Flow</span> : null}
    </span>
  );
}
