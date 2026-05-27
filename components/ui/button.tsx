import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium tracking-[-0.005em] transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-150 hover:[&_svg.arrow]:translate-x-0.5",
  {
    variants: {
      variant: {
        primary: "bg-fg text-bg hover:bg-white hover:-translate-y-px shadow-[0_1px_0_oklch(1_0_0_/_0.06)_inset]",
        ghost: "border border-line bg-transparent text-fg hover:border-fg-dim hover:bg-bg-elev",
        quiet: "bg-transparent text-fg-soft hover:text-fg",
        outline: "border border-line bg-bg-elev/40 text-fg hover:bg-bg-elev hover:border-fg-dim",
      },
      size: {
        sm: "h-8 px-3 text-[13px]",
        md: "h-[38px] px-4 text-sm",
        lg: "h-11 px-5 text-[14.5px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});

export { Button, buttonVariants };
