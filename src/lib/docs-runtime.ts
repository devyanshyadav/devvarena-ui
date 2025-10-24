import fs from "fs";
import path from "path";
import type { Metadata } from "@/types/docs";

export interface ComponentInfo {
  id: string; // e.g., "button/rainbow-button"
  category: string; // e.g., "button"
  name: string; // e.g., "rainbow-button"
  displayName: string; // e.g., "Rainbow Button"
}

export interface ComponentDoc {
  id: string; // "button/rainbow-button"
  name: string; // "rainbow-button"
  displayName: string; // "Rainbow Button"
  category: string; // "button"
  description: string;
  dependencies: string[];
  componentCode: string; // code from component.tsx
  usageCode: string; // code from usage.tsx
  metadata: Metadata | null; // from meta.ts
  generatedAt: string;
}

function readMetaFile(metaPath: string): Metadata | null {
  try {
    if (!fs.existsSync(metaPath)) {
      return null;
    }

    const metaContent = fs.readFileSync(metaPath, "utf-8");

    // Find the start of the metadata object
    const startMatch = metaContent.match(
      /export\s+const\s+metadata:\s*Metadata\s*=\s*{/
    );
    if (!startMatch) {
      return null;
    }

    const startIndex = (startMatch.index ?? 0) + startMatch[0].length - 1; // Include the opening brace

    // Find the matching closing brace
    let braceCount = 0;
    let endIndex = startIndex;

    for (let i = startIndex; i < metaContent.length; i++) {
      const char = metaContent[i];
      if (char === "{") {
        braceCount++;
      } else if (char === "}") {
        braceCount--;
        if (braceCount === 0) {
          endIndex = i;
          break;
        }
      }
    }

    if (braceCount !== 0) {
      console.warn("Could not find matching closing brace in meta.ts");
      return null;
    }

    const metadataString = metaContent.substring(startIndex, endIndex + 1);

    try {
      // eslint-disable-next-line no-eval
      const metadata = eval(`(${metadataString})`);
      return metadata;
    } catch (evalError) {
      console.warn("Could not parse metadata from meta.ts:", evalError);
      return null;
    }
  } catch (error) {
    console.warn("Error reading meta file:", error);
    return null;
  }
}

function getDefaultComponentMetadata(category: string) {
  // Default metadata for categories - you can expand this
  const categoryMetadata = {
    button: {
      description: "Button components with various styles and interactions.",
      dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    },
    card: {
      description: "Card components for displaying content.",
      dependencies: ["clsx", "tailwind-merge"],
    },
    // Add more categories as needed
  };

  return (
    (
      categoryMetadata as Record<
        string,
        { description: string; dependencies: string[] }
      >
    )[category] || {
      description: `${category.charAt(0).toUpperCase() + category.slice(1)} components`,
      dependencies: [],
    }
  );
}

export function discoverComponents(): ComponentInfo[] {
  try {
    const devuiDir = path.join(process.cwd(), "src", "devvarena-ui");

    if (!fs.existsSync(devuiDir)) {
      console.warn("Devui directory not found:", devuiDir);
      return [];
    }

    const components: ComponentInfo[] = [];

    // Get all category directories (button, card, etc.)
    const categories = fs.readdirSync(devuiDir).filter((item) => {
      const itemPath = path.join(devuiDir, item);
      return fs.statSync(itemPath).isDirectory();
    });

    // For each category, find all components
    for (const category of categories) {
      const categoryPath = path.join(devuiDir, category);

      try {
        const componentDirs = fs.readdirSync(categoryPath).filter((item) => {
          const itemPath = path.join(categoryPath, item);
          if (!fs.statSync(itemPath).isDirectory()) return false;

          // All components must have variant folders - check for at least one variant
          try {
            const subEntries = fs.readdirSync(itemPath);
            return subEntries.some((subItem) => {
              const subItemPath = path.join(itemPath, subItem);
              if (!fs.statSync(subItemPath).isDirectory()) return false;
              const subComponentFile = path.join(subItemPath, "component.tsx");
              return fs.existsSync(subComponentFile);
            });
          } catch {
            return false;
          }
        });

        // Add each component family only
        for (const componentName of componentDirs) {
          components.push({
            id: `${category}/${componentName}`,
            category,
            name: componentName,
            displayName: componentName
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
          });
        }
      } catch (error) {
        console.warn(
          `Could not read category directory: ${categoryPath}`,
          error
        );
      }
    }

    return components.sort((a, b) => a.id.localeCompare(b.id));
  } catch (error) {
    console.error("Error discovering components:", error);
    return [];
  }
}

export function getComponentDoc(componentId: string): ComponentDoc | null {
  try {
    const [category, componentName] = componentId.split("/");

    if (!category || !componentName) {
      console.warn(`Invalid component ID format: ${componentId}`);
      return null;
    }

    const componentDir = path.join(
      process.cwd(),
      "src",
      "devvarena-ui",
      category,
      componentName
    );

    if (!fs.existsSync(componentDir)) {
      return null;
    }

    // Read component files
    const _componentFile = path.join(componentDir, "component.tsx");
    const _usageFile = path.join(componentDir, "usage.tsx");
    const metaFile = path.join(componentDir, "meta.ts");

    // Component family page - use first version as representative
    let componentCode = "";
    let usageCode = "";

    try {
      const subEntries = fs.readdirSync(componentDir);
      const firstVersion = subEntries.find((subItem) => {
        const subItemPath = path.join(componentDir, subItem);
        if (!fs.statSync(subItemPath).isDirectory()) return false;
        const subComponentFile = path.join(subItemPath, "component.tsx");
        return fs.existsSync(subComponentFile);
      });

      if (firstVersion) {
        const versionComponentFile = path.join(
          componentDir,
          firstVersion,
          "component.tsx"
        );
        const versionUsageFile = path.join(
          componentDir,
          firstVersion,
          "usage.tsx"
        );
        componentCode = fs.readFileSync(versionComponentFile, "utf-8");
        usageCode = fs.existsSync(versionUsageFile)
          ? fs.readFileSync(versionUsageFile, "utf-8")
          : "";
      } else {
        console.warn(`No component versions found in: ${componentDir}`);
        return null;
      }
    } catch (error) {
      console.warn(`Error reading component versions: ${componentDir}`, error);
      return null;
    }

    const metadata = readMetaFile(metaFile);

    // Get category defaults
    const categoryMeta = getDefaultComponentMetadata(category);

    // Component family page
    return {
      id: componentId,
      name: componentName,
      displayName: componentName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      category,
      description: metadata?.description || categoryMeta.description,
      dependencies: categoryMeta.dependencies,
      componentCode,
      usageCode,
      metadata,
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error reading component doc for ${componentId}:`, error);
    return null;
  }
}

export function getAllComponentSummaries() {
  const components = discoverComponents();

  return components
    .map((component) => {
      const categoryMeta = getDefaultComponentMetadata(component.category);

      // Try to get metadata for more accurate description
      const componentDir = path.join(
        process.cwd(),
        "src",
        "devvarena-ui",
        component.category,
        component.name
      );
      const metaFile = path.join(componentDir, "meta.ts");
      const metadata = readMetaFile(metaFile);

      return {
        id: component.id,
        name: component.displayName,
        category: component.category,
        description: metadata?.description || categoryMeta.description,
        dependencies: categoryMeta.dependencies,
      };
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}
