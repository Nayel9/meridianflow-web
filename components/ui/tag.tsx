import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "pass" | "fail" | "warn" | "info" | "default";

const tone: Record<Tone, string> = {
  default: "border-line-soft bg-bg-elev-2 text-fg-soft",
  pass: "border-pass-line bg-pass-soft text-pass",
  fail: "border-fail-line bg-fail-soft text-fail",
  warn: "border-warn-line bg-warn-soft text-warn",
  info: "border-accent-line bg-accent-soft text-accent",
};

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone | "" | "pass" | "fail" | "warn" | "info";
}

export function Tag({ className, tone: t = "default", children, ...rest }: TagProps) {
  const key = (t === "" ? "default" : t) as Tone;
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center gap-1.5 rounded-[4px] border px-[7px] font-mono text-[10.5px] uppercase tracking-[0.04em]",
        tone[key],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
