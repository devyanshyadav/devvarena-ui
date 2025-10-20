import { ExampleMetadata } from "@/types/docs";

export const metadata: ExampleMetadata = {
  title: "Base Button",
  description:
    "Enhanced button component with gradient backgrounds, special hover effects, and customizable styling. Extends shadcn/ui Button with visual enhancements and interactive effects.",
  category: "Form",
  tags: ["button", "gradient", "effects", "hover", "animation", "interactive"],
  relatedExamples: ["ripple-button", "halo-button", "action-glow-button"],
  components: [
    {
      id: "v1",
      title: "v1",
      description:
        "Button component with gradient backgrounds, hover effects, and extended styling options beyond standard shadcn button variants",
      props: [
        {
          name: "gradient",
          type: "'default' | 'blue' | 'yellow' | 'red' | 'green' | 'purple' | 'orange' | 'none'",
          description:
            "Gradient color scheme for the button background when using 'gradient' variant",
          required: false,
        },
        {
          name: "effect",
          type: "'none' | 'glow' | 'lift' | 'pulse' | 'loader' | 'ping'",
          description:
            "Special visual effects applied on hover or as active states",
          required: false,
        },
        {
          name: "variant",
          type: "ButtonProps['variant'] | 'gradient'",
          description:
            "Button variant - uses shadcn variants or 'gradient' for custom gradient styling",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes to apply to the button element",
          required: false,
        },
        {
          name: "children",
          type: "React.ReactNode",
          description:
            "Button content including text, icons, or other elements",
          required: false,
        },
        {
          name: "asChild",
          type: "boolean",
          description:
            "Render as child component (inherited from shadcn Button)",
          required: false,
        },
      ],
      notes: [
        "Built on shadcn/ui Button component with enhanced gradient and effect capabilities",
        "Dual variant system: 'gradient' variant enables custom gradients, other variants use standard shadcn styling",
        "7 gradient options: default (primary to slate), blue, yellow, red, green, purple, orange, and none",
        "6 visual effects: none, glow (shadow on hover), lift (translate-y transform), pulse (animation), loader (spinning border), ping (notification dot)",
        "Gradient backgrounds use 'bg-gradient-to-br from-{color}-600 from-60% to-{color}-400' pattern with hover state transitions",
        "Ping effect renders animated notification dot positioned absolutely at top-right with blue-500 color",
        "Loader effect uses CSS pseudo-element with spinning border animation positioned before content",
        "Effect combinations work with both gradient and standard variants for enhanced interactivity",
        "ForwardRef implementation allows direct access to underlying Button element",
        "Maintains full compatibility with shadcn/ui Button props including size, disabled, asChild, etc.",
        "BaseButtonVariants uses cva for type-safe variant management with default gradient and effect variants",
        "Conditional rendering logic switches between gradient custom styling and shadcn variant styling",
        "TypeScript support with comprehensive prop typing extending ButtonProps and VariantProps",
        "Smooth transition-all duration-200 for consistent animation timing across all interactions",
        "Enhanced shadow effects with hover:shadow-md and specialized glow shadows for visual depth",
      ],
    },
  ],
};
