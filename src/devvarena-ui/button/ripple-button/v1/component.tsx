"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  type MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./ripple.module.css";

interface Ripple {
  x: number;
  y: number;
  size: number;
  key: number;
}

const baseButtonVariants = cva(
  "transition-all duration-200 font-medium shadow-sm hover:shadow-md",
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

interface RippleButtonProps
  extends React.ComponentProps<typeof Button>,
    VariantProps<typeof baseButtonVariants> {
  rippleColor?: string;
  duration?: string;
  disableRipple?: boolean;
  gradient?: VariantProps<typeof baseButtonVariants>["gradient"];
  effect?: VariantProps<typeof baseButtonVariants>["effect"];
}

export const RippleButtonV1 = forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    {
      className,
      children,
      gradient,
      effect,
      variant,
      rippleColor = "rgba(255, 255, 255, 0.5)",
      duration = "600ms",
      disableRipple = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const createRipple = useCallback((event: MouseEvent<HTMLButtonElement>) => {
      const { currentTarget, clientX, clientY } = event;
      const { left, top, width, height } =
        currentTarget.getBoundingClientRect();

      const size = Math.max(width, height);
      const x = clientX - left - size / 2;
      const y = clientY - top - size / 2;

      setRipples((prev) => [...prev, { x, y, size, key: Date.now() }]);
    }, []);

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        if (!disableRipple) {
          createRipple(event);
        }
        onClick?.(event);
      },
      [createRipple, onClick, disableRipple]
    );

    useEffect(() => {
      if (!ripples.length) return;

      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, parseInt(duration));

      return () => clearTimeout(timer);
    }, [ripples.length, duration]);

    const hasGradient = gradient && gradient !== "none";
    return (
      <Button
        className={cn(
          "relative overflow-hidden",
          hasGradient && baseButtonVariants({ gradient, effect }),
          className
        )}
        variant={hasGradient ? undefined : variant}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {!disableRipple && ripples.length > 0 && (
          <span className="pointer-events-none absolute inset-0 rounded-inherit overflow-hidden">
            {ripples.map(({ x, y, size, key }) => (
              <span
                key={key}
                className={cn(
                  "absolute rounded-full opacity-50",
                  styles["rippling"]
                )}
                style={
                  {
                    width: size,
                    height: size,
                    top: y,
                    left: x,
                    backgroundColor: rippleColor,
                    transform: "scale(0)",
                    "--duration": duration,
                  } as React.CSSProperties & { "--duration": string }
                }
              />
            ))}
          </span>
        )}
      </Button>
    );
  }
);

RippleButtonV1.displayName = "RippleButtonV1";

export default RippleButtonV1;
