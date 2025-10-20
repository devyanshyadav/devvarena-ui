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
          "border-0 border-input !bg-transparent rounded-none focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface FloatingLabelInputProps
  extends Omit<React.ComponentProps<"input">, "variant" | "placeholder">,
    VariantProps<typeof baseInputVariants> {
  variant?: "default" | "outline" | "ghost" | "underline";
  icon?: React.ReactNode;
  iconAlignment?: "left" | "right";
  label: string;
  labelOrigin?: "left" | "center" | "right";
}

const FloatingLabelInputV1 = React.forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(
  (
    {
      className,
      variant = "default",
      icon,
      iconAlignment = "left",
      label,
      labelOrigin = "left",
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = id || label.toLowerCase().replace(/\s+/g, "");

    const underlineClasses =
      variant === "underline"
        ? "border-secondary border-b-4 after:content-[''] after:absolute after:h-1 after:bg-primary after:-bottom-1 after:w-full after:scale-x-0 after:transition after:duration-300 after:origin-center has-[:focus]:after:scale-x-100"
        : "";

    const originClasses = {
      left: "origin-left",
      center: "origin-center",
      right: "origin-right",
    };

    return (
      <div className={cn("relative mt-6", underlineClasses)}>
        <Input
          id={generatedId}
          ref={ref}
          placeholder={label}
          autoComplete="off"
          required
          className={cn(
            baseInputVariants({ variant }),
            icon && (iconAlignment === "left" ? "pl-10" : "pr-10"),
            className,
            "peer !placeholder-transparent"
          )}
          {...props}
        />
        <label
          htmlFor={generatedId}
          className={cn(
            "absolute top-1/2 bg-transparent text-sm -translate-y-1/2 text-muted-foreground pointer-events-none transform duration-150 ease-in-out",
            "peer-focus:-top-3 peer-focus:bg-gradient-to-b from-background from-60% to-transparent peer-focus:translate-y-0 peer-focus:scale-85 peer-focus:text-primary",
            "peer-[&:not(:placeholder-shown)]:-top-3 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:scale-85 peer-[&:not(:placeholder-shown)]:text-primary",
            "px-1",
            icon && iconAlignment === "left" ? "left-10" : "left-4",
            originClasses[labelOrigin]
          )}
        >
          {label}
        </label>
        {icon && (
          <div
            className={cn(
              "absolute peer-active:scale-90 transition-all text-muted-foreground z-10 top-1/2 -translate-y-1/2",
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

FloatingLabelInputV1.displayName = "FloatingLabelInputV1";

export default FloatingLabelInputV1;
