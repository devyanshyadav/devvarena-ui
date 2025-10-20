import { Input } from "@/components/ui/input";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const baseInputVariants = cva(
  "rounded-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-input bg-secondary",
        outline: "!bg-transparent",
        ghost: "!border-none bg-muted",
        underline:
          "border-0  border-input !bg-transparent rounded-none focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BaseInputProps
  extends Omit<React.ComponentProps<"input">, "variant">,
    VariantProps<typeof baseInputVariants> {
  variant?: "default" | "outline" | "ghost" | "underline";
  icon?: React.ReactNode;
  iconAlignment?: "left" | "right";
}

const BaseInputV1 = React.forwardRef<HTMLInputElement, BaseInputProps>(
  (
    { className, variant = "default", icon, iconAlignment = "left", ...props },
    ref
  ) => {
    const underlineClasses =
      variant === "underline"
        ? "border-secondary border-b-4 after:content-[''] after:absolute after:h-1 after:bg-primary after:-bottom-1 after:w-full after:scale-x-0 after:transition after:duration-300 after:origin-center has-[:focus]:after:scale-x-100"
        : "";

    return (
      <div className={cn("relative flex items-center", underlineClasses)}>
        <Input
          className={cn(
            baseInputVariants({ variant }),
            icon && (iconAlignment === "left" ? "pl-10" : "pr-10"),
            className,
            "peer"
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div
            className={cn(
              "absolute peer-active:scale-90 transition-all text-muted-foreground z-10  top-1/2 -translate-y-1/2",
              iconAlignment === "right" ? "right-3" : "left-3"
            )}
          >
            {icon}
          </div>
        )}
      </div>
    );
  }
);

BaseInputV1.displayName = "BaseInputV1";

export default BaseInputV1;
