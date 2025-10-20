import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import styles from "./HaloButton.module.css";

const haloButtonVariants = cva(
  "px-6 py-2.5 after:content-[''] after:absolute after:-inset-0.5 bg-gradient-to-br from-primary-foreground to-secondary text-secondary-foreground relative after:-z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none h-fit focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] after:bg-[conic-gradient(#488cfb,#29dbbc,#ddf505,#ff9f0e,#e440bb,#655adc,#488cfb)] after:[mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] after:[-webkit-mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000)] after:[mask-origin:content-box,padding-box] after:[-webkit-mask-origin:content-box,padding-box] after:[mask-clip:content-box,padding-box] after:[-webkit-mask-clip:content-box,padding-box] after:[filter:hue-rotate(0deg)] active:after:p-[5px]",
  {
    variants: {
      rounded: {
        none: "rounded-none after:rounded-none",
        sm: "rounded-sm after:rounded-sm",
        md: "rounded-md after:rounded-md",
        lg: "rounded-lg after:rounded-lg",
        xl: "rounded-xl after:rounded-xl",
      },
    },
    defaultVariants: {
      rounded: "xl",
    },
  }
);

function HaloButtonv2({
  className,
  rounded,
  asChild = false,
  animate = true,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof haloButtonVariants> & {
    asChild?: boolean;
    animate?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        haloButtonVariants({ rounded }),
        animate && styles["halo-animation"],
        className
      )}
      {...props}
    />
  );
}

HaloButtonv2.displayName = "HaloButtonv2";

export default HaloButtonv2;
