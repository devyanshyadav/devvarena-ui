"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export type FileTreeNode = {
  id: string;
  label: string;
  icon?:
    | React.ReactNode
    | {
        open: React.ReactNode;
        close: React.ReactNode;
      };
  children?: FileTreeNode[];
};

export type FileTreeSelection = {
  id: string | null;
  path: string | null;
};

interface FileTreeInputProps {
  data: FileTreeNode[];
  onChange?: (selection: FileTreeSelection) => void;
  childrenIcon?: React.ReactNode;
  initialExpandedNodes?: string[];
  iconOnOpen?: React.ReactNode;
  iconOnClose?: React.ReactNode;
  value?: string | null;
  size?: "sm" | "md" | "lg";
}

const getSizeClasses = (size: "sm" | "md" | "lg" = "md") => {
  const sizeMap = {
    sm: {
      padding: "px-2 py-0.5",
      text: "text-xs",
    },
    md: {
      padding: "px-3 py-1",
      text: "text-sm",
    },
    lg: {
      padding: "px-4 py-1.5",
      text: "text-base",
    },
  };
  return sizeMap[size];
};

const getIconForState = (
  icon:
    | React.ReactNode
    | { open: React.ReactNode; close: React.ReactNode }
    | undefined,
  isOpen: boolean,
  fallback?: React.ReactNode
): React.ReactNode => {
  if (!icon) return fallback;
  if (typeof icon === "object" && "open" in icon && "close" in icon) {
    return isOpen ? icon.open : icon.close;
  }
  return icon;
};

interface TreeNodeComponentProps {
  node: FileTreeNode;
  parentPath: string;
  onSelect: (selection: FileTreeSelection) => void;
  childrenIcon?: React.ReactNode;
  initialExpandedNodes?: string[];
  iconOnOpen?: React.ReactNode;
  iconOnClose?: React.ReactNode;
  value?: string | null;
  size?: "sm" | "md" | "lg";
}

const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({
  node,
  parentPath,
  onSelect,
  childrenIcon,
  initialExpandedNodes = [],
  iconOnOpen,
  iconOnClose,
  value = null,
  size = "md",
}) => {
  const sizeClasses = getSizeClasses(size);
  const currentPath = parentPath ? `${parentPath}/${node.id}` : node.id;
  const hasChildren = (node.children || []).length > 0;

  const handleSelect = () => {
    onSelect({
      id: node.id,
      path: currentPath,
    });
  };

  if (!hasChildren) {
    // Leaf node - simple clickable item with icon on left
    const displayIcon = getIconForState(node.icon, false, childrenIcon);
    return (
      <button
        onClick={handleSelect}
        className={`flex items-center border border-transparent hover:bg-gradient-to-r from-secondary to-secondary/10 hover:border-border/50 hover:*:translate-x-1 *:transition-all justify-start select-none gap-2 w-full m-0.5 ${
          sizeClasses.padding
        } rounded-md cursor-pointer hover:bg-secondary/30 transition-colors text-left ${
          value === currentPath ? "!bg-secondary *:opacity-100" : "*:opacity-70"
        }`}
      >
        <span className="shrink-0">{displayIcon}</span>
        <span className={sizeClasses.text}>{node.label}</span>
      </button>
    );
  }

  const defaultValue = initialExpandedNodes.includes(node.id) ? node.id : null;

  return (
    <Accordion type="single" collapsible defaultValue={defaultValue || ""}>
      <AccordionItem value={node.id} className="border-0">
        <AccordionTrigger
          className={`justify-start w-60 select-none gap-2 ${
            sizeClasses.padding
          } rounded-md hover:bg-secondary/30 border border-transparent hover:bg-gradient-to-r from-secondary to-secondary/10 !bg-transparent hover:border-border/50 hover:no-underline [&[data-state=open]]:bg-secondary/20 [&>svg]:-order-1 [&[data-state=closed]>svg]:-rotate-90 hover:*:translate-x-1 *:transition-all [&[data-state=open]>svg]:rotate-0 m-0.5 [&[data-state=closed]>.flex>.icon-close]:block [&[data-state=closed]>.flex>.icon-open]:hidden [&[data-state=open]>.flex>.icon-close]:hidden [&[data-state=open]>.flex>.icon-open]:block ${
            value === currentPath
              ? "!bg-secondary *:opacity-100"
              : "*:opacity-70"
          }`}
          onClick={handleSelect}
        >
          <span className="flex items-center gap-2 shrink-0">
            <span className="shrink-0 icon-close">
              {getIconForState(node.icon, false, iconOnClose)}
            </span>
            <span className="shrink-0 icon-open hidden">
              {getIconForState(node.icon, true, iconOnOpen)}
            </span>
            <span className={sizeClasses.text}>{node.label}</span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="pb-0 px-0">
          <div className="space-y-0 border-l border-border/80 ml-5 m-0.5">
            {node.children?.map((child) => (
              <TreeNodeComponent
                key={child.id}
                node={child}
                parentPath={currentPath}
                onSelect={onSelect}
                childrenIcon={childrenIcon}
                initialExpandedNodes={initialExpandedNodes}
                size={size}
                iconOnOpen={iconOnOpen}
                iconOnClose={iconOnClose}
                value={value}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const FileTreeInputV1: React.FC<FileTreeInputProps> = ({
  data,
  onChange,
  childrenIcon,
  initialExpandedNodes = [],
  iconOnOpen,
  iconOnClose,
  value = null,
  size = "md",
}) => {
  const handleSelect = (selection: FileTreeSelection) => {
    onChange?.(selection);
  };

  return (
    <div className="rounded-xl bg-card shadow-sm p-2 border border-border space-y-1 ">
      {data.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          parentPath=""
          onSelect={handleSelect}
          childrenIcon={childrenIcon}
          initialExpandedNodes={initialExpandedNodes}
          size={size}
          iconOnOpen={iconOnOpen}
          iconOnClose={iconOnClose}
          value={value}
        />
      ))}
    </div>
  );
};

FileTreeInputV1.displayName = "FileTreeInputV1";

export { FileTreeInputV1 };
