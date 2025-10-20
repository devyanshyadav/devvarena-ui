import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertTriangle, XCircle, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SomeAlertProps {
  variant?: "info" | "success" | "warning" | "error" | "custom";
  title?: string;
  description?: string;
  customIcon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const SpotAlertV1 = React.forwardRef<HTMLDivElement, SomeAlertProps>(
  (
    {
      variant = "info",
      title,
      description,
      customIcon,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const getIconClasses = () => {
      const baseClasses =
        "size-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
      switch (variant) {
        case "success":
          return `${baseClasses} text-green-500`;
        case "warning":
          return `${baseClasses} text-yellow-500`;
        case "error":
          return `${baseClasses} text-red-500`;
        case "custom":
          return `${baseClasses} text-primary`;
        default:
          return `${baseClasses} text-sky-500`;
      }
    };

    const getBackgroundClasses = () => {
      const baseClasses =
        "absolute rounded-full -top-3 -left-3 h-14 w-14 aspect-square p-1";
      switch (variant) {
        case "success":
          return `${baseClasses} bg-green-500/5`;
        case "warning":
          return `${baseClasses} bg-yellow-500/5`;
        case "error":
          return `${baseClasses} bg-red-500/5`;
        case "custom":
          return `${baseClasses} bg-primary/5`;
        default:
          return `${baseClasses} bg-sky-500/5`;
      }
    };

    const getInnerBackgroundClasses = () => {
      const baseClasses = "absolute rounded-full inset-2 aspect-square p-1";
      switch (variant) {
        case "success":
          return `${baseClasses} bg-green-500/10`;
        case "warning":
          return `${baseClasses} bg-yellow-500/10`;
        case "error":
          return `${baseClasses} bg-red-500/10`;
        case "custom":
          return `${baseClasses} bg-primary/10`;
        default:
          return `${baseClasses} bg-sky-500/10`;
      }
    };

    const getDefaultIcon = () => {
      switch (variant) {
        case "success":
          return <CircleCheck className={getIconClasses()} />;
        case "warning":
          return <AlertTriangle className={getIconClasses()} />;
        case "error":
          return <XCircle className={getIconClasses()} />;
        case "custom":
          return customIcon || <Info className={getIconClasses()} />;
        case "info":
        default:
          return <Info className={getIconClasses()} />;
      }
    };

    return (
      <Alert
        ref={ref}
        className={cn(
          "rounded-xl overflow-hidden ring-1 ring-border border-2 bg-card border-background shadow-sm relative flex gap-3 p-3",
          className
        )}
        {...props}
      >
        <div className={getBackgroundClasses()}>
          <div className={getInnerBackgroundClasses()}>{getDefaultIcon()}</div>
        </div>
        <div className="flex flex-col gap-1 pl-10">
          {title && <AlertTitle className="font-medium">{title}</AlertTitle>}
          {description && <AlertDescription>{description}</AlertDescription>}
          {children}
        </div>
      </Alert>
    );
  }
);

SpotAlertV1.displayName = "SpotAlertV1";

export default SpotAlertV1;
