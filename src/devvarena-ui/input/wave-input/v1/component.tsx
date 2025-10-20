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

export interface WaveInputProps
  extends Omit<React.ComponentProps<"input">, "variant" | "placeholder">,
    VariantProps<typeof baseInputVariants> {
  variant?: "default" | "outline" | "ghost" | "underline";
  icon?: React.ReactNode;
  iconAlignment?: "left" | "right";
  label: string;
  waveDelay?: number;
}

const WaveInputV1 = React.forwardRef<HTMLInputElement, WaveInputProps>(
  (
    {
      className,
      variant = "default",
      icon,
      iconAlignment = "left",
      label,
      waveDelay = 50,
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

    const renderWaveLabel = () => {
      return label.split("").map((char, index) => (
        //dont transatlete bg
        <span
          key={index}
          className={cn(
            "transition-all duration-200",
            "group-focus-within:-translate-y-5 group-focus-within:text-sm group-focus-within:text-primary group-focus-within:bg-gradient-to-b from-background from-60% to-transparent",
            "group-[&:has(input:not(:placeholder-shown))]:-translate-y-5 group-[&:has(input:not(:placeholder-shown))]:text-sm group-[&:has(input:not(:placeholder-shown))]:text-primary group-[&:has(input:not(:placeholder-shown))]:bg-gradient-to-b from-background from-60% to-transparent"
          )}
          style={{
            transitionDelay: `${index * waveDelay}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    };

    return (
      <div className={cn("relative mt-6 group", underlineClasses)}>
        <Input
          id={generatedId}
          ref={ref}
          placeholder={label}
          autoComplete="off"
          required
          className={cn(
            baseInputVariants({ variant }),
            icon && (iconAlignment === "left" ? "pl-10" : "pr-10"),
            "peer !placeholder-transparent",
            className
          )}
          {...props}
        />
        <label
          htmlFor={generatedId}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 flex text-muted-foreground pointer-events-none transition-all duration-200",
            "group-focus-within:top-2 group-focus-within:translate-y-0 group-focus-within:text-primary",
            "group-[&:has(input:not(:placeholder-shown))]:top-2 group-[&:has(input:not(:placeholder-shown))]:translate-y-0 group-[&:has(input:not(:placeholder-shown))]:text-primary",
            icon && iconAlignment === "left" ? "left-10" : "left-4"
          )}
        >
          {renderWaveLabel()}
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

WaveInputV1.displayName = "WaveInputV1";

export default WaveInputV1;
