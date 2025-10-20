import { ExampleMetadata } from "@/types/docs";

export const metadata: ExampleMetadata = {
  title: "Halo Button",
  description:
    "Beautiful button component with gradient halo effects around the button border. Features customizable gradient colors and border radius options using CSS pseudo-elements.",
  category: "Form",
  tags: ["button", "gradient", "halo", "glow", "border", "interactive"],
  relatedExamples: ["base-button", "ripple-button", "action-glow-button"],
  components: [
    {
      id: "v1",
      title: "v1",
      description:
        "Button with gradient halo effect using CSS pseudo-elements and customizable gradient colors and border radius",
      props: [
        {
          name: "gradientColor",
          type: "'blue' | 'purple' | 'green' | 'red' | 'orange' | 'yellow' | 'pink' | 'cyan'",
          description:
            "Color scheme for the gradient halo effect surrounding the button (default: 'blue')",
          required: false,
        },
        {
          name: "rounded",
          type: "'none' | 'sm' | 'lg' | 'xl' | 'full'",
          description:
            "Border radius applied to both button and halo pseudo-element (default: 'xl')",
          required: false,
        },
        {
          name: "asChild",
          type: "boolean",
          description:
            "Render as child component using Radix UI Slot for polymorphic behavior",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes applied to the button element",
          required: false,
        },
        {
          name: "children",
          type: "React.ReactNode",
          description:
            "Button content including text, icons, or other elements",
          required: false,
        },
      ],
      notes: [
        "Uses CSS ::after pseudo-element positioned with -inset-0.5 to create gradient halo border effect",
        "8 gradient color options with consistent pattern: blue, purple, green, red, orange, yellow, pink, cyan",
        "Gradient pattern uses 'bg-gradient-to-tl from-{color}/20 from-60% to-{color}' for subtle to bold effect",
        "5 border radius options affecting both button and halo: none, sm, lg, xl, full",
        "Hover state changes halo to single color with reduced opacity for interactive feedback",
        "Halo positioned behind button with after:-z-10 to maintain proper layering",
        "Built on primary color scheme with bg-primary, text-primary-foreground, and hover:bg-primary/90",
        "Comprehensive button styling including focus-visible states with ring effects",
        "asChild prop enables polymorphic rendering via Radix UI Slot for flexible component composition",
        "SVG icon support with automatic sizing ([&_svg:not([class*='size-'])]:size-5) and pointer-events-none",
        "Accessibility features: outline-none with focus-visible ring, disabled states, proper ARIA support",
        "Uses class-variance-authority for type-safe variant management with default values",
        "No external animation dependencies - relies on CSS transition-all for smooth interactions",
        "TypeScript support with component props extending button attributes and VariantProps",
        "Maintains consistent spacing (px-5 py-2.5) and typography (text-sm font-medium)",
        "Shadow-xs base styling with hover state changes for visual depth",
        "Gap-2 for proper spacing between button content elements",
      ],
    },
  ],
};
