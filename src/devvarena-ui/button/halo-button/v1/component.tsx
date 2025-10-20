import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

const haloButtonVariants = cva(
  "px-5 py-2.5 after:content-[''] after:absolute after:-inset-0.5 bg-secondary text-primary shadow-xs  relative after:-z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none h-fit focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      gradientColor: {
        blue: "after:bg-gradient-to-tl after:from-blue-500/20 after:from-60% after:to-blue-500 hover:after:bg-blue-500/20",
        purple:
          "after:bg-gradient-to-tl after:from-purple-500/20 after:from-60% after:to-purple-500 hover:after:bg-purple-500/20",
        green:
          "after:bg-gradient-to-tl after:from-green-500/20 after:from-60% after:to-green-500 hover:after:bg-green-500/20",
        red: "after:bg-gradient-to-tl after:from-red-500/20 after:from-60% after:to-red-500 hover:after:bg-red-500/20",
        orange:
          "after:bg-gradient-to-tl after:from-orange-500/20 after:from-60% after:to-orange-500 hover:after:bg-orange-500/20",
        yellow:
          "after:bg-gradient-to-tl after:from-yellow-500/20 after:from-60% after:to-yellow-500 hover:after:bg-yellow-500/20",
        pink: "after:bg-gradient-to-tl after:from-pink-500/20 after:from-60% after:to-pink-500 hover:after:bg-pink-500/20",
        cyan: "after:bg-gradient-to-tl after:from-cyan-500/20 after:from-60% after:to-cyan-500 hover:after:bg-cyan-500/20",
      },
      rounded: {
        none: "rounded-none after:rounded-none",
        sm: "rounded-sm after:rounded-sm",
        lg: "rounded-lg after:rounded-lg",
        xl: "rounded-xl after:rounded-xl",
        full: "rounded-full after:rounded-full",
      },
    },
    defaultVariants: {
      gradientColor: "blue",
      rounded: "xl",
    },
  }
);

function HaloButtonv1({
  className,
  gradientColor,
  rounded,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof haloButtonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(haloButtonVariants({ gradientColor, rounded, className }))}
      {...props}
    />
  );
}

HaloButtonv1.displayName = "HaloButtonv1";

export default HaloButtonv1;
