import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

export function SectionHead({
  eyebrow,
  title,
  sub,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-[720px] mb-10 sm:mb-12 lg:mb-16",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="section-title mt-4 mb-4 text-fg">{title}</h2>
      {sub ? <p className="section-sub">{sub}</p> : null}
    </Reveal>
  );
}
