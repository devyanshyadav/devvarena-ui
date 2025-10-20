"use client";

import * as React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FileItem } from "./file-explorer";

interface CodeViewerProps {
  file: FileItem | null;
}

export function CodeViewer({ file }: CodeViewerProps) {
  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p className="text-sm">Select a file to view its content</p>
        </div>
      </div>
    );
  }

  if (file.type === "image") {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <img
            src={`/devvarena-ui-assets/${file.name}`}
            alt={file.name}
            className="max-w-full max-h-96 object-contain rounded-lg shadow-sm"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
          <div className="hidden text-muted-foreground">
            <p className="text-sm">Image not found: {file.name}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="px-4 py-2 border-b bg-muted/20">
        <p className="text-sm font-mono text-muted-foreground">{file.name}</p>
      </div>
      <div className="flex-1 overflow-auto code-viewer bg-[#171717]">
        <SyntaxHighlighter
          language={file.language || "typescript"}
          style={tomorrow}
          customStyle={{
            margin: 0,
            background: "transparent",
            padding: "1rem",
          }}
        >
          {file.content || "// No content available"}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
