"use client";

import React, { useState } from "react";
import { FileTreeInputV1, type FileTreeNode } from "./component";
import { FiFolder, FiFile, FiFileText } from "react-icons/fi";
import { LucideFolder, LucideFolderOpen } from "lucide-react";

const projectStructure: FileTreeNode[] = [
  {
    id: "src",
    label: "src",
    icon: <FiFolder className="w-4 h-4 text-amber-500" />,
    children: [
      {
        id: "app",
        label: "app",
        icon: <FiFolder className="w-4 h-4 text-amber-500" />,
        children: [
          {
            id: "layout",
            label: "layout.tsx",
            icon: <FiFileText className="w-4 h-4 text-blue-500" />,
          },
          {
            id: "page",
            label: "page.tsx",
            icon: <FiFileText className="w-4 h-4 text-blue-500" />,
          },
          {
            id: "globals",
            label: "globals.css",
            icon: <FiFile className="w-4 h-4 text-purple-500" />,
          },
        ],
      },
      {
        id: "components",
        label: "components",
        icon: <FiFolder className="w-4 h-4 text-amber-500" />,
        children: [
          {
            id: "button",
            label: "Button.tsx",
            icon: <FiFileText className="w-4 h-4 text-blue-500" />,
          },
          {
            id: "card",
            label: "Card.tsx",
            icon: <FiFileText className="w-4 h-4 text-blue-500" />,
          },
        ],
      },
      {
        id: "lib",
        label: "lib",
        icon: <FiFolder className="w-4 h-4 text-amber-500" />,
        children: [
          {
            id: "utils",
            label: "utils.ts",
            icon: <FiFileText className="w-4 h-4 text-blue-500" />,
          },
        ],
      },
    ],
  },
  {
    id: "public",
    label: "public",
    icon: <FiFolder className="w-4 h-4 text-amber-500" />,
    children: [
      {
        id: "favicon",
        label: "favicon.ico",
        icon: <FiFile className="w-4 h-4 text-gray-500" />,
      },
    ],
  },
  {
    id: "package.json",
    label: "package.json",
    icon: <FiFile className="w-4 h-4 text-red-500" />,
  },
];

export default function FileTreeInputV1Usage() {
  const [selection, setSelection] = useState<{
    id: string | null;
    path: string | null;
  } | null>(null);

  return (
    <div className="flex gap-4 flex-col mx-auto max-w-60">
      <FileTreeInputV1
        data={projectStructure}
        initialExpandedNodes={["src", "app"]}
        iconOnOpen={<LucideFolderOpen className="w-4 h-4" />}
        iconOnClose={<LucideFolder className="w-4 h-4" />}
        onChange={(selection) => setSelection(selection)}
      />
      {selection?.id && (
        <div className="text-xs space-y-2">
          <div>
            <p className="text-muted-foreground mb-1">ID:</p>
            <code className="bg-muted px-2 py-1 rounded block">
              {selection.id}
            </code>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Path:</p>
            <code className="bg-muted px-2 py-1 rounded block break-all">
              {selection.path}
            </code>
          </div>
        </div>
      )}
    </div>
  );
}
