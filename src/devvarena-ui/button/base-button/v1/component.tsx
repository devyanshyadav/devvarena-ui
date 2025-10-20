import { Button, buttonVariants } from "@/components/ui/button";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const baseButtonVariants = cva(
  "rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-md",
  {
    variants: {
      gradient: {
        default: "bg-gradient-to-br from-primary from-60% to-slate-400",
        blue: "bg-gradient-to-br from-blue-600 from-60% to-blue-400 text-white hover:from-blue-700 hover:to-blue-500",
        yellow:
          "bg-gradient-to-br from-yellow-600 from-60% to-yellow-300 text-white hover:from-yellow-700 hover:to-yellow-400",
        red: "bg-gradient-to-br from-red-600 from-60% to-red-400 text-white hover:from-red-700 hover:to-red-500",
        green:
          "bg-gradient-to-br from-green-600 from-60% to-green-300 text-white hover:from-green-700 hover:to-green-400",
        purple:
          "bg-gradient-to-br from-purple-600 from-60% to-purple-400 text-white hover:from-purple-700 hover:to-purple-500",
        orange:
          "bg-gradient-to-br from-orange-600 from-60% to-orange-400 text-white hover:from-orange-700 hover:to-orange-500",
        none: "",
      },
      effect: {
        none: "",
        glow: "hover:shadow-[4px_8px_19px_-3px] hover:shadow-primary/25",
        lift: "hover:-translate-y-0.5",
        pulse: "hover:animate-pulse",
        loader:
          "before:content-[''] before:inline-block before:w-4 before:h-4 before:border-2 before:border-white before:border-b-transparent before:rounded-full before:animate-spin",
        ping: "relative",
      },
    },
    defaultVariants: {
      gradient: "default",
      effect: "none",
    },
  }
);

export interface BaseButtonProps
  extends Omit<ButtonProps, "variant">,
    VariantProps<typeof baseButtonVariants> {
  variant?: ButtonProps["variant"] | "gradient";
}

const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    { className, gradient, effect, variant = "gradient", children, ...props },
    ref
  ) => {
    const isGradientVariant = variant === "gradient";

    const renderContent = () => {
      if (!effect?.includes("ping")) return null;

      return (
        <span className="absolute -top-1 -right-1 flex size-3">
          <span
            className={`absolute inline-flex h-full w-full bg-blue-500 animate-ping rounded-full opacity-75`}
          ></span>
          <span
            className={`relative inline-flex size-3 bg-blue-500 rounded-full`}
          ></span>
        </span>
      );
    };

    if (isGradientVariant) {
      return (
        <Button
          className={cn(baseButtonVariants({ gradient, effect }), className)}
          variant="default"
          ref={ref}
          {...props}
        >
          {children}
          {renderContent()}
        </Button>
      );
    }

    return (
      <Button
        className={cn(
          effect === "glow" && "hover:shadow-lg",
          effect === "lift" && "hover:-translate-y-0.5 transition-transform",
          effect === "pulse" && "hover:animate-pulse",
          "relative",
          className
        )}
        variant={variant}
        ref={ref}
        {...props}
      >
        {children}
        {renderContent()}
      </Button>
    );
  }
);

BaseButton.displayName = "BaseButton";

export default BaseButton;
