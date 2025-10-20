import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

const actionGlowButtonVariants = cva(
  // outer button wrapper
  "cursor-pointer h-fit rounded-full p-[5px] shadow-md transition-all duration-300 active:scale-[1.1]",
  {
    variants: {
      glowColor: {
        blue: "bg-radial from-blue-200 from-30% via-blue-350 to-blue-600 shadow-blue-600/40 hover:scale-[1.05] hover:shadow-lg hover:shadow-blue-600/60",
        purple:
          "bg-radial from-purple-200 from-30% via-purple-350 to-purple-600 shadow-purple-600/40 hover:scale-[1.05] hover:shadow-lg hover:shadow-purple-600/60",
        green:
          "bg-radial from-green-200 from-30% via-green-350 to-green-600 shadow-green-600/40 hover:scale-[1.05] hover:shadow-lg hover:shadow-green-600/60",
      },
    },
    defaultVariants: {
      glowColor: "blue",
    },
  }
);

const innerSpanVariants = cva(
  "group flex gap-2 rounded-full h-10 px-7 items-center font-semibold text-white ring transition-all duration-300 hover:shadow-inner",
  {
    variants: {
      glowColor: {
        blue: "bg-radial from-blue-300 from-15% via-blue-350 to-blue-600 ring-blue-200/10 hover:ring-blue-200/20",
        purple:
          "bg-radial from-purple-300 from-15% via-purple-350 to-purple-600 ring-purple-200/10 hover:ring-purple-200/20",
        green:
          "bg-radial from-green-300 from-15% via-green-350 to-green-600 ring-green-200/10 hover:ring-green-200/20",
      },
    },
    defaultVariants: {
      glowColor: "blue",
    },
  }
);

function ActionGlowButtonV1({
  className,
  glowColor,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof actionGlowButtonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp className={cn(actionGlowButtonVariants({ glowColor }))} {...props}>
      <span className={cn(innerSpanVariants({ glowColor }), className)}>
        {children}
      </span>
    </Comp>
  );
}

ActionGlowButtonV1.displayName = "ActionGlowButtonV1";

export default ActionGlowButtonV1;
