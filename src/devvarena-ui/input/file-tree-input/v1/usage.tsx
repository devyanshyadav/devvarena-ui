"use client";

import React, { useState } from "react";
import { FileTreeInputV1, type FileTreeNode } from "./component";
import { FiFile, FiFileText } from "react-icons/fi";
import { LucideFolder, LucideFolderOpen } from "lucide-react";

const projectStructure: FileTreeNode[] = [
  {
    id: "src",
    label: "src",

    children: [
      {
        id: "app",
        label: "app",
        icon: {
          open: <LucideFolderOpen className="w-4 h-4 text-amber-500" />,
          close: <LucideFolder className="w-4 h-4 text-amber-500" />,
        },
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
    children: [
      {
        id: "favicon",
        label: "favicon.ico",
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
        value={selection?.path || null}
        iconOnOpen={<LucideFolderOpen className="w-4 h-4" />}
        iconOnClose={<LucideFolder className="w-4 h-4" />}
        childrenIcon={<FiFile className="w-4 h-4 text-gray-500" />}
        initialExpandedNodes={["src", "app"]}
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
