import React from "react";
import { Button } from "@/components/ui/button";
import { MdSecurity } from "react-icons/md";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title?: string;
  description?: string;
  icon?: React.ElementType;
  buttonText?: string;
  color?: string;
  className?: string;
  iconSize?: number;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      title = "Security",
      description = "Your privacy is our priority with enterprise-grade security and regular audits.",
      icon: Icon = MdSecurity,
      color = "#ef662b",
      buttonText = "Learn More",
      className,
      iconSize = 144,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{
          background: `radial-gradient(circle at 100% 0%, ${color} 0px, transparent 55%), radial-gradient(circle at 0% 0%, ${color}c4 0px, transparent 55%), radial-gradient(circle at 47.952586206896555% 0%, transparent 55%)`,
        }}
        className={cn(
          "w-xs rounded-4xl group border-[6px] border-slate-150 dark:border-[#353535] px-[2px] p-0.5 transition-colors duration-300",
          "bg-white dark:bg-black",
          className
        )}
      >
        <div
          style={{
            boxShadow: `inset -2px 27px 49px -29px ${color}b8`,
          }}
          className="relative flex h-full w-full flex-col items-center justify-center rounded-3xl bg-white/80 dark:bg-[#060606]/80 p-4 backdrop-blur-3xl transition-all duration-300"
        >
          {/* Big icon */}
          <div className="grid place-items-center p-8">
            <Icon
              size={iconSize}
              style={{ color }}
              className="translate-y-1 transition-all group-hover:translate-x-1 brightness-150"
            />
            <Icon size={iconSize} style={{ color }} className="absolute" />
          </div>

          <div className="w-full space-y-2.5 text-left text-xl font-semibold text-[#060606] dark:text-white transition-colors duration-300">
            <h2 className="flex items-center gap-2 transition-all group-hover:translate-x-1">
              <Icon aria-hidden size={22} style={{ color }} />
              {title}
            </h2>

            <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
              {description}
            </p>

            <Button
              size="lg"
              className="rounded-lg border border-[#d4d4d4] bg-gradient-to-b from-[#ffffff] to-[#f3f3f3] text-[#060606] dark:border-[#353535] dark:from-[#353535] dark:to-[#060606] dark:text-white transition-all duration-300"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
