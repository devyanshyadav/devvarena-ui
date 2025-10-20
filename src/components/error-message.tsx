import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  message: string;
  variant?: "default" | "subtle";
  className?: string;
}

export function ErrorMessage({
  message,
  variant = "default",
  className,
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "      flex items-center justify-center min-h-32",
        variant === "subtle" && "text-gray-500 text-sm",
        variant === "default" && "text-gray-600",
        className
      )}
    >
      <p>{message}</p>
    </div>
  );
}
