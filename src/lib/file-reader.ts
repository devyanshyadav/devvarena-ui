import fs from "fs";
import path from "path";
import { FileItem } from "@/components/docs-comp/file-explorer";

// Cache for file contents to avoid re-reading
const fileCache = new Map<string, string>();
const assetCache = new Map<string, FileItem[]>();

export interface ComponentVersionFiles {
  versionId: string;
  title: string;
  files: FileItem[];
}

/**
 * Get all component versions in a family
 */
export function getComponentVersions(
  componentId: string
): ComponentVersionFiles[] {
  try {
    const componentPath = path.join(
      process.cwd(),
      "src",
      "devvarena-ui",
      componentId
    );

    if (!fs.existsSync(componentPath)) {
      return [];
    }

    const versions: ComponentVersionFiles[] = [];
    const entries = fs.readdirSync(componentPath, { withFileTypes: true });

    // Get all component version folders
    const versionFolders = entries.filter((entry) => {
      if (!entry.isDirectory()) return false;

      // Check if this directory contains component.tsx or usage.tsx
      const versionFolderPath = path.join(componentPath, entry.name);
      try {
        const subEntries = fs.readdirSync(versionFolderPath, {
          withFileTypes: true,
        });
        return subEntries.some(
          (subEntry) =>
            subEntry.isFile() &&
            (subEntry.name === "component.tsx" || subEntry.name === "usage.tsx")
        );
      } catch {
        return false;
      }
    });

    // Process each component version
    for (const versionFolder of versionFolders) {
      const versionFiles = readVersionFiles(componentId, versionFolder.name);
      if (versionFiles.length > 0) {
        versions.push({
          versionId: versionFolder.name,
          title:
            versionFolder.name.charAt(0).toUpperCase() +
            versionFolder.name.slice(1),
          files: versionFiles,
        });
      }
    }

    return versions;
  } catch (error) {
    console.error(
      `Error reading component variants for ${componentId}:`,
      error
    );
    return [];
  }
}

/**
 * Read files from a specific component version folder
 */
function readVersionFiles(componentId: string, versionId: string): FileItem[] {
  const versionPath = path.join(
    process.cwd(),
    "src",
    "devvarena-ui",
    componentId,
    versionId
  );

  if (!fs.existsSync(versionPath)) {
    return [];
  }

  const files: FileItem[] = [];
  const entries = fs.readdirSync(versionPath, { withFileTypes: true });

  for (const entry of entries) {
    // Only process files, skip directories
    if (entry.isFile()) {
      // Exclude meta.ts files
      if (entry.name === "meta.ts") {
        continue;
      }

      const filePath = path.join(versionPath, entry.name);
      const relativePath = `${componentId}/${versionId}/${entry.name}`;

      // Determine file type
      const isImage = /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(entry.name);

      let content = "";
      let language = "";

      if (!isImage) {
        // Check cache first
        const cacheKey = relativePath;
        if (fileCache.has(cacheKey)) {
          content = fileCache.get(cacheKey)!;
        } else {
          try {
            // Check file size before reading (limit to 1MB)
            const stats = fs.statSync(filePath);
            if (stats.size > 1024 * 1024) {
              content = "// File too large to display";
            } else {
              content = fs.readFileSync(filePath, "utf-8");
              fileCache.set(cacheKey, content);
            }
          } catch (err) {
            console.warn(`Could not read file ${filePath}:`, err);
            content = "// Could not read file content";
          }
        }

        // Determine language based on extension
        const ext = entry.name.split(".").pop()?.toLowerCase();
        switch (ext) {
          case "tsx":
          case "jsx":
            language = "typescript";
            break;
          case "ts":
            language = "typescript";
            break;
          case "js":
            language = "javascript";
            break;
          case "json":
            language = "json";
            break;
          case "md":
            language = "markdown";
            break;
          case "css":
            language = "css";
            break;
          default:
            language = "text";
        }
      }

      files.push({
        name: entry.name,
        path: relativePath,
        type: isImage ? "image" : "file",
        content,
        language,
      });
    }
  }

  // Only check for component-specific assets if component uses assets
  const componentContent =
    files.find((f) => f.name === "component.tsx")?.content || "";
  if (componentContent.includes("/devvarena-ui-assets/")) {
    // Check cache first for assets
    if (!assetCache.has("all-assets")) {
      const assetsPath = path.join(
        process.cwd(),
        "public",
        "devvarena-ui-assets"
      );
      const assetFiles: FileItem[] = [];

      if (fs.existsSync(assetsPath)) {
        const assetEntries = fs.readdirSync(assetsPath, {
          withFileTypes: true,
        });

        for (const assetEntry of assetEntries) {
          if (assetEntry.isFile()) {
            const isImage = /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(
              assetEntry.name
            );

            if (isImage) {
              assetFiles.push({
                name: assetEntry.name,
                path: `devvarena-ui-assets/${assetEntry.name}`,
                type: "image",
                content: "",
                language: "",
              });
            }
          }
        }
      }
      assetCache.set("all-assets", assetFiles);
    }

    // Add cached assets to files
    files.push(...assetCache.get("all-assets")!);
  }

  // Sort files: component.tsx first, then usage.tsx, then others alphabetically
  files.sort((a, b) => {
    const order = ["component.tsx", "usage.tsx"];
    const aIndex = order.indexOf(a.name);
    const bIndex = order.indexOf(b.name);

    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    return a.name.localeCompare(b.name);
  });

  return files;
}
