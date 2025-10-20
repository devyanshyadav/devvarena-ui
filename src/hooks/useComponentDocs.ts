import { useMemo } from "react";
import {
  getAllComponentSummaries,
  getComponentDoc,
  discoverComponents,
  type ComponentDoc,
} from "@/lib/docs-runtime";

/**
 * Custom hook for getting all component summaries
 * Typically used for the docs index page to display all components
 *
 * @returns Array of component summaries
 */
export function useComponentSummaries() {
  return useMemo(() => getAllComponentSummaries(), []);
}

/**
 * Custom hook for getting detailed component documentation
 * Used for individual component pages
 *
 * @param componentId - The ID of the component (e.g., "button/rainbow-button")
 * @returns Component documentation object or null if not found
 */
export function useComponentDoc(componentId: string): ComponentDoc | null {
  return useMemo(() => {
    if (!componentId) return null;
    return getComponentDoc(componentId);
  }, [componentId]);
}

/**
 * Custom hook for discovering all available components
 * Returns complete component information including metadata
 *
 * @returns Array of all discovered components
 */
export function useAvailableComponents() {
  return useMemo(() => discoverComponents(), []);
}
