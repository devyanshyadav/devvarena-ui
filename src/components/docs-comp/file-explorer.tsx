"use client";

import * as React from "react";
import { File, FileText, Image, Code, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentVersionFiles } from "@/lib/file-reader";

export interface FileItem {
  name: string;
  path: string;
  type: "file" | "image";
  content?: string;
  language?: string;
}

interface FileExplorerProps {
  files: FileItem[];
  versions: ComponentVersionFiles[];
  onFileSelect: (file: FileItem) => void;
  selectedFile?: string;
}

export function FileExplorer({
  files: _files,
  versions,
  onFileSelect,
  selectedFile,
}: FileExplorerProps) {
  const [expandedVersions, setExpandedVersions] = React.useState<Set<string>>(
    new Set()
  );

  const toggleVersion = (versionId: string) => {
    setExpandedVersions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(versionId)) {
        newSet.delete(versionId);
      } else {
        newSet.add(versionId);
      }
      return newSet;
    });
  };

  const getFileIcon = (fileName: string, type: string) => {
    if (type === "image") return Image;

    const ext = fileName.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "tsx":
      case "jsx":
      case "ts":
      case "js":
        return Code;
      case "json":
      case "md":
      case "txt":
        return FileText;
      default:
        return File;
    }
  };

  // Show component versions structure
  return (
    <div className="w-52 shrink-0 border-r bg-muted/10 p-4">
      <h4 className="font-medium text-sm mb-3 text-muted-foreground uppercase tracking-wider">
        Components
      </h4>
      <div className="space-y-1">
        {versions.map((version) => (
          <div key={version.versionId}>
            <button
              onClick={() => toggleVersion(version.versionId)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md transition-colors text-left hover:bg-accent/50 text-muted-foreground hover:text-foreground"
            >
              <Folder className="h-4 w-4" />
              <span className="truncate font-medium">{version.title}</span>
            </button>

            {expandedVersions.has(version.versionId) && (
              <div className="ml-4 mt-1 space-y-1">
                {version.files.map((file) => {
                  const Icon = getFileIcon(file.name, file.type);
                  const isSelected = selectedFile === file.path;

                  return (
                    <button
                      key={file.path}
                      onClick={() => onFileSelect(file)}
                      className={cn(
                        "flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md transition-colors text-left",
                        isSelected
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="truncate">{file.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
