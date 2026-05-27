"use client";

import { useLang } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-line bg-bg-elev px-2 py-1 font-mono text-[11px] tracking-[0.06em] text-fg-mute",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setLang("fr")}
        aria-pressed={lang === "fr"}
        className={cn(
          "rounded-full px-1.5 py-[2px] uppercase transition-colors",
          lang === "fr" ? "bg-bg-elev-2 text-fg" : "text-fg-mute hover:text-fg-soft",
        )}
      >
        FR
      </button>
      <span aria-hidden="true" className="text-fg-dim">
        /
      </span>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={cn(
          "rounded-full px-1.5 py-[2px] uppercase transition-colors",
          lang === "en" ? "bg-bg-elev-2 text-fg" : "text-fg-mute hover:text-fg-soft",
        )}
      >
        EN
      </button>
    </div>
  );
}
