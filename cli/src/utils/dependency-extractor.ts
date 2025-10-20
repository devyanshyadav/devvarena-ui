interface ExtractedDependencies {
  npmDependencies: string[];
  shadcnDependencies: string[];
}

interface ImportStatement {
  source: string;
  importPath: string;
}

/**
 * Extract import statements from TypeScript/JavaScript code
 */
function extractImportStatements(content: string): ImportStatement[] {
  const imports: ImportStatement[] = [];

  // Regex to match various import patterns:
  // import { Button } from '@/components/ui/button'
  // import motion from 'framer-motion'
  // import React from 'react'
  // import { cn } from '@/lib/utils'
  const importRegex =
    /import\s+(?:{[^}]*}|[^{}\s]+|(?:{[^}]*})\s*,\s*[^{}\s]+)\s+from\s+['"]([^'"]+)['"]/g;

  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const importPath = match[1];

    imports.push({
      source: fullMatch.trim(),
      importPath: importPath.trim(),
    });
  }

  return imports;
}

/**
 * Check if import path indicates a shadcn component
 */
function isShadcnImport(importPath: string): boolean {
  // Check for patterns like:
  // '@/components/ui/button' -> shadcn component 'button'
  // '@/components/ui/card' -> shadcn component 'card'
  return importPath.startsWith("@/components/ui/");
}

/**
 * Extract shadcn component name from import path
 */
function extractShadcnComponentName(importPath: string): string {
  // '@/components/ui/button' -> 'button'
  // '@/components/ui/dropdown-menu' -> 'dropdown-menu'
  const parts = importPath.split("/");
  return parts[parts.length - 1];
}

/**
 * Check if import is an internal/local import that should be ignored
 */
function isInternalImport(importPath: string): boolean {
  return (
    importPath.startsWith("@/") ||
    importPath.startsWith("./") ||
    importPath.startsWith("../") ||
    importPath.startsWith("/") ||
    importPath === "react" ||
    importPath.startsWith("react/") ||
    importPath.startsWith("next/") ||
    importPath.startsWith("next-")
  );
}

/**
 * Map common import patterns to actual npm package names
 */
function mapToNpmPackage(importPath: string): string {
  const packageMappings: Record<string, string> = {
    "framer-motion": "framer-motion",
    "lucide-react": "lucide-react",
    "class-variance-authority": "class-variance-authority",
    "@radix-ui/react-slot": "@radix-ui/react-slot",
    "@radix-ui/react-dropdown-menu": "@radix-ui/react-dropdown-menu",
    "@radix-ui/react-dialog": "@radix-ui/react-dialog",
    "@radix-ui/react-popover": "@radix-ui/react-popover",
    "@radix-ui/react-tooltip": "@radix-ui/react-tooltip",
    "@radix-ui/react-tabs": "@radix-ui/react-tabs",
    "@radix-ui/react-accordion": "@radix-ui/react-accordion",
    "date-fns": "date-fns",
    dayjs: "dayjs",
    moment: "moment",
    lodash: "lodash",
    axios: "axios",
    zod: "zod",
    "react-hook-form": "react-hook-form",
    "@hookform/resolvers": "@hookform/resolvers",
  };

  // Check for scoped packages like @radix-ui/react-*
  if (importPath.startsWith("@")) {
    const scopedMatch = importPath.match(/^(@[^/]+\/[^/]+)/);
    if (scopedMatch) {
      return scopedMatch[1];
    }
  }

  // Direct mapping
  if (packageMappings[importPath]) {
    return packageMappings[importPath];
  }

  // For non-scoped packages, use the base package name
  const baseName = importPath.split("/")[0];
  return baseName;
}

/**
 * Extract dependencies from component files
 */
export function extractDependenciesFromFiles(
  files: { path: string; content: string }[]
): ExtractedDependencies {
  const npmDependencies = new Set<string>();
  const shadcnDependencies = new Set<string>();

  for (const file of files) {
    // Only analyze .tsx, .ts, .jsx, .js files
    if (!/\.(tsx?|jsx?)$/.test(file.path)) {
      continue;
    }

    const imports = extractImportStatements(file.content);

    for (const importStatement of imports) {
      const { importPath } = importStatement;

      // Skip empty or malformed imports
      if (!importPath || importPath.length === 0) {
        continue;
      }

      // Check if it's a shadcn import
      if (isShadcnImport(importPath)) {
        const componentName = extractShadcnComponentName(importPath);
        shadcnDependencies.add(componentName);
        continue;
      }

      // Skip internal imports
      if (isInternalImport(importPath)) {
        continue;
      }

      // Add to npm dependencies
      const packageName = mapToNpmPackage(importPath);
      if (packageName) {
        npmDependencies.add(packageName);
      }
    }
  }

  return {
    npmDependencies: Array.from(npmDependencies).sort(),
    shadcnDependencies: Array.from(shadcnDependencies).sort(),
  };
}

/**
 * Analyze a single file's dependencies (useful for testing)
 */
export function analyzeSingleFile(
  content: string,
  filePath: string
): ExtractedDependencies {
  return extractDependenciesFromFiles([
    {
      content,
      path: filePath,
    },
  ]);
}

/**
 * Get user-friendly dependency summary
 */
export function getDependencySummary(
  dependencies: ExtractedDependencies
): string {
  const { npmDependencies, shadcnDependencies } = dependencies;

  let summary = "";

  if (npmDependencies.length > 0) {
    summary += `NPM packages: ${npmDependencies.join(", ")}\n`;
  }

  if (shadcnDependencies.length > 0) {
    summary += `Shadcn components: ${shadcnDependencies.join(", ")}`;
  }

  return summary || "No external dependencies found";
}
