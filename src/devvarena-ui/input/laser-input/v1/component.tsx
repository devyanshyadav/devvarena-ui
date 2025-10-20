"use client";
import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

type LaserInputProps = {
  size?: "sm" | "md" | "lg";
  rounded?: "sm" | "md" | "full";
  iconAlignment?: "left" | "right";
  icon?: React.ReactNode;
  laserColor?: string;
  className?: string;
} & Omit<React.ComponentProps<"input">, "size">;

const LaserInputV1 = forwardRef<HTMLInputElement, LaserInputProps>(
  (
    {
      size = "md",
      rounded = "full",
      iconAlignment = "left",
      icon,
      laserColor = "gray",
      className,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [childPosition, setChildPosition] = useState<number>(0);
    const [active, setActive] = useState<boolean>(false);
    const [gradientType, setGradientType] = useState<
      "center" | "left" | "right"
    >("center");

    const handleMouseMove = (e: React.MouseEvent) => {
      const parentRect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - parentRect.left - 50;

      if (x < 0) {
        setChildPosition(0);
        setGradientType("left");
      } else if (x > parentRect.width - 100) {
        setChildPosition(parentRect.width - 96);
        setGradientType("right");
      } else {
        setChildPosition(x);
        setGradientType("center");
      }
    };

    const getLaserStyle = () => {
      const baseStyle = {
        left: `${active ? 0 : childPosition}px`,
        "--laser-color": laserColor,
      } as React.CSSProperties;

      if (active) {
        return {
          ...baseStyle,
          background: laserColor,
        };
      }

      switch (gradientType) {
        case "left":
          return {
            ...baseStyle,
            background: `linear-gradient(to right, ${laserColor}, ${laserColor}, transparent)`,
          };
        case "right":
          return {
            ...baseStyle,
            background: `linear-gradient(to right, transparent, ${laserColor}, ${laserColor})`,
          };
        case "center":
        default:
          return {
            ...baseStyle,
            background: `linear-gradient(to right, transparent, ${laserColor}, transparent)`,
          };
      }
    };
    const InputSizes = {
      sm: "p-1.5",
      md: "p-2",
      lg: "p-2.5",
    };
    const InputRoundness = {
      none: "rounded-none",
      sm: "rounded-md",
      md: "rounded-xl",
      full: "rounded-full",
    };
    const InputSize = InputSizes[size] || InputSizes.md;
    const InputRounded = InputRoundness[rounded] || InputRoundness.md;

    return (
      <div
        className={cn(InputRounded, "relative w-full overflow-hidden p-[3px]")}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <span
          className={cn(
            "absolute top-0 bottom-0 rounded-lg",
            isHovered || active ? "block" : "hidden",
            active ? "w-full transition-all duration-200 opacity-50" : "w-24"
          )}
          style={getLaserStyle()}
        />

        <div
          className={cn(
            InputRounded,
            "relative z-20 text-sm flex items-center justify-center flex-grow border border-input bg-background gap-2 outline outline-input",
            InputSize,
            iconAlignment === "right" && "flex-row-reverse"
          )}
        >
          {icon && (
            <div
              className={cn(
                "absolute text-primary z-10 top-1/2 -translate-y-1/2",
                iconAlignment === "right" ? "right-3" : "left-3"
              )}
            >
              {icon}
            </div>
          )}
          <input
            ref={ref}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            className={cn(
              "w-full outline-0 !bg-transparent",
              icon && (iconAlignment === "left" ? "pl-8" : "pr-8"),
              className
            )}
            {...props}
          />
        </div>
      </div>
    );
  }
);

LaserInputV1.displayName = "LaserInputV1";

export default LaserInputV1;
