import { Metadata } from "@/types/docs";

export const metadata: Metadata = {
  title: "File Tree Input",
  description:
    "Interactive hierarchical file tree component with expandable nodes, custom icons, and selection tracking. Perfect for file explorers and nested data structures.",
  category: "Form",
  tags: [
    "input",
    "tree",
    "file-explorer",
    "hierarchical",
    "expandable",
    "navigation",
  ],
  relatedExamples: ["base-input", "floating-label-input", "laser-input"],
  components: [
    {
      id: "v1",
      title: "v1",
      description:
        "Expandable file tree with custom icons, smooth animations, size variants, and complete path tracking for nested file structures.",
      props: [
        {
          name: "data",
          type: "FileTreeNode[]",
          description:
            "Tree nodes array with structure: { id, label, icon?, children? }",
          required: true,
        },
        {
          name: "initialExpandedNodes",
          type: "string[]",
          description: "Node IDs to expand on initial render",
          required: false,
        },
        {
          name: "value",
          type: "string | null",
          description: "Selected node path",
          required: false,
        },
        {
          name: "onChange",
          type: "(selection: FileTreeSelection) => void",
          description:
            "Callback on node select returning { id: string | null, path: string | null }",
          required: false,
        },
        {
          name: "iconOnOpen",
          type: "React.ReactNode",
          description: "Icon for expanded folders (default: ChevronDown)",
          required: false,
        },
        {
          name: "iconOnClose",
          type: "React.ReactNode",
          description: "Icon for collapsed folders (default: ChevronRight)",
          required: false,
        },
        {
          name: "childrenIcon",
          type: "React.ReactNode",
          description: "Icon for leaf nodes/files",
          required: false,
        },
        {
          name: "size",
          type: "'sm' | 'md' | 'lg'",
          description:
            "Component size: sm (compact), md (default), lg (spacious)",
          required: false,
        },
      ],
      notes: [
        "**Node Structure**: Requires { id, label } with optional icon and children array",
        "**Expandable**: Folders with children can be expanded/collapsed with smooth animations",
        "**Selection**: Click nodes to select, returns both id and full file path",
        "**Path Tracking**: Automatically builds paths like src/app/layout.tsx",
        "**Size Variants**: sm (px-2 py-0.5), md (px-3 py-1), lg (px-4 py-1.5)",
        "**Icons**: Fully customizable expand/collapse and leaf node icons",
        "**Styling**: Uses Tailwind CSS with semantic tokens and hover effects",
        "**Nesting**: Supports unlimited hierarchy depth for complex structures",
        "**TypeScript**: Full type safety with FileTreeNode and FileTreeSelection",
        "**Accessibility**: Semantic HTML with ul/li structure",
      ],
    },
  ],
};
