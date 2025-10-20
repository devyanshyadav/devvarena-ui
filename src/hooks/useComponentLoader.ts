import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

interface UseComponentLoaderResult {
  Component: React.ComponentType | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for dynamically loading component usage examples
 *
 * @param componentId - The ID of the component to load (e.g., "button/rainbow-button")
 * @returns Object containing the loaded component, loading state, and error state
 */
export function useComponentLoader(
  componentId: string
): UseComponentLoaderResult {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadComponent() {
      try {
        setLoading(true);
        setError(null);

        // Use Next.js dynamic imports for better production support
        const DynamicComponent = dynamic(
          () => import(`../devvarena-ui/${componentId}/usage`),
          {
            loading: () => null,
            ssr: false,
          }
        );

        if (!mounted) return; // Prevent state update if unmounted

        setComponent(() => DynamicComponent);
      } catch (err) {
        if (!mounted) return;

        console.warn(`Could not load usage component for ${componentId}:`, err);
        setError(`Could not load preview for ${componentId}`);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadComponent();

    // Cleanup function to prevent memory leaks
    return () => {
      mounted = false;
    };
  }, [componentId]);

  return { Component, loading, error };
}
