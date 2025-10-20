import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertTriangle, XCircle, CircleCheck } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "rounded-xl ring-1 ring-border/50 border-2 shadow-sm relative flex gap-3 p-3",
  {
    variants: {
      variant: {
        info: "bg-gradient-to-l from-card from-70% to-sky-400/20 border-background",
        success:
          "bg-gradient-to-l from-card from-70% to-green-400/20 border-background",
        warning:
          "bg-gradient-to-l from-card from-70% to-yellow-400/20 border-background",
        error:
          "bg-gradient-to-l from-card from-70% to-red-400/20 border-background",
        custom:
          "bg-gradient-to-l from-card from-70% to-secondary border-background",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const iconVariants = cva("size-4", {
  variants: {
    variant: {
      info: "text-sky-500",
      success: "text-green-500",
      warning: "text-yellow-500",
      error: "text-red-500",
      custom: "text-primary",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export interface BaseAlertProps extends VariantProps<typeof alertVariants> {
  variant?: "info" | "success" | "warning" | "error" | "custom";
  title?: string;
  description?: string;
  customIcon?: React.ReactNode;
  iconShape?: "square" | "rounded" | "circle";
  className?: string;
  children?: React.ReactNode;
}

const BaseAlertV1 = React.forwardRef<HTMLDivElement, BaseAlertProps>(
  (
    {
      variant = "info",
      title,
      description,
      customIcon,
      iconShape = "rounded",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const getDefaultIcon = () => {
      switch (variant) {
        case "success":
          return <CircleCheck className={iconVariants({ variant })} />;
        case "warning":
          return <AlertTriangle className={iconVariants({ variant })} />;
        case "error":
          return <XCircle className={iconVariants({ variant })} />;
        case "custom":
          return customIcon || <Info className={iconVariants({ variant })} />;
        case "info":
        default:
          return <Info className={iconVariants({ variant })} />;
      }
    };

    const getIconShapeClasses = () => {
      switch (iconShape) {
        case "square":
          return "rounded-none";
        case "circle":
          return "rounded-full";
        case "rounded":
        default:
          return "rounded-lg";
      }
    };

    return (
      <Alert
        ref={ref}
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <div
          className={cn(
            "flex items-center bg-card justify-center shadow-sm border p-2",
            getIconShapeClasses()
          )}
        >
          {getDefaultIcon()}
        </div>
        <div className="flex flex-col gap-1">
          {title && <AlertTitle className="font-medium">{title}</AlertTitle>}
          {description && <AlertDescription>{description}</AlertDescription>}
          {children}
        </div>
      </Alert>
    );
  }
);

BaseAlertV1.displayName = "BaseAlertV1";

export default BaseAlertV1;
