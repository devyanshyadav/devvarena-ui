"use client";

import { useComponentLoader } from "@/hooks/useComponentLoader";
import { ErrorMessage } from "@/components/error-message";

interface UsageRendererProps {
  componentId: string;
}

export function UsageRenderer({ componentId }: UsageRendererProps) {
  const { Component, loading, error } = useComponentLoader(componentId);

  if (loading) {
    return (
      <div className="h-full grid place-items-center">
        <span className="componentLoader"></span>
      </div>
    );
  }

  if (error || !Component) {
    return (
      <ErrorMessage
        message={error || "Component preview not available"}
        variant="subtle"
      />
    );
  }

  return (
    <div className="w-full">
      <Component />
    </div>
  );
}
