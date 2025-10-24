import { Metadata } from "@/types/docs";

export const metadata: Metadata = {
  title: "Action Glow Button",
  description:
    "Premium button component with radial gradient glow effects and smooth animations. Features layered design with outer glow wrapper and inner content styling for enhanced visual impact.",
  category: "Form",
  tags: ["button", "glow", "gradient", "radial", "animation", "interactive"],
  relatedExamples: ["base-button", "ripple-button", "halo-button"],
  credit: {
    name: "@ShruPosts",
    type: "design",
    url: "https://x.com/ShruPosts/status/1966507126928580909",
  },
  components: [
    {
      id: "v1",
      title: "v1",
      description:
        "Button with radial gradient glow effect using layered design and customizable color variants with scale animations",
      props: [
        {
          name: "glowColor",
          type: "'blue' | 'purple' | 'green'",
          description:
            "Color variant for the radial glow effect and matching shadows (default: 'blue')",
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
          description:
            "Additional CSS classes applied to the inner span element",
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
        "Uses layered design with outer button wrapper and inner span for complex glow effect composition",
        "3 color variants with comprehensive styling: blue, purple, green with matching gradients and shadows",
        "Outer wrapper uses radial gradients 'bg-radial from-{color}-200 from-30% via-{color}-350 to-{color}-600'",
        "Inner span uses tighter radial gradients 'from-{color}-300 from-15% via-{color}-350 to-{color}-600'",
        "Multi-layered hover effects: outer scale-[1.05] with enhanced shadows, inner ring opacity changes",
        "Active state feedback with scale-[1.1] for enhanced user interaction feel",
        "Fixed dimensions: h-10 inner height with px-7 horizontal padding for consistent sizing",
        "Color-matched shadow system with hover enhancement: shadow-{color}-600/40 to shadow-{color}-600/60",
        "Ring effects on inner span with color-matched opacity: ring-{color}-200/10 to ring-{color}-200/20",
        "Comprehensive transition system: duration-300 for all interactive states with smooth animations",
        "asChild prop enables polymorphic rendering via Radix UI Slot for flexible component composition",
        "White text with font-semibold for optimal contrast against dark gradient backgrounds",
        "Rounded-full design language throughout both wrapper and inner elements",
        "TypeScript support with component props extending button attributes and VariantProps",
        "Gap-2 spacing for proper content alignment within inner span",
        "Shadow-md base styling with enhanced shadow effects on hover states",
        "Active state uses scale transform for immediate visual feedback on interaction",
      ],
    },
  ],
};
