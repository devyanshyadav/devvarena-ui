import { Metadata } from "@/types/docs";

export const metadata: Metadata = {
  title: "Feature Card",
  description:
    "Modern feature card component with gradient borders, layered icon effects, and customizable styling. Perfect for showcasing key features, services, or benefits with an eye-catching design.",
  category: "Display",
  tags: ["card", "feature", "gradient", "icon", "showcase"],
  relatedExamples: ["profile-card", "base-card", "product-card"],
  components: [
    {
      id: "v1",
      title: "v1",
      description:
        "Feature card with gradient border effects, dual-layered icon display, and customizable colors. Features glassmorphism backdrop and centered content layout.",
      props: [
        {
          name: "icon",
          type: "React.ReactNode",
          description:
            "Icon element displayed with dual-layer gradient effect at card top",
          required: false,
        },
        {
          name: "title",
          type: "string",
          description: "Feature title displayed as primary heading",
          required: false,
        },
        {
          name: "description",
          type: "string",
          description:
            "Feature description text displayed below title with gray-400 color",
          required: false,
        },
        {
          name: "color",
          type: "hex string",
          description:
            "Starting color for gradient effects (default: '#ef662b')",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes applied to root card element",
          required: false,
        },
      ],
      notes: [
        "Features a dual-layer border system: outer 6px border with gradient background overlay",
        "Icon displayed with dual-layer effect: one layer translated with saturate filter, one absolute with brightness filter",
        "Gradient background uses linear-gradient with 15% opacity gradientFrom color fading to transparent at 50%",
        "Inner card uses glassmorphism effect with backdrop-blur-3xl and semi-transparent background",
        "Icon gradient applied using WebKit properties: background-clip: text and text-fill-color: transparent",
        "Max width constrained to max-w-xs (20rem) for consistent sizing across implementations",
        "Rounded-3xl outer corners (1.5rem) with rounded-2xl inner corners (1rem) for layered aesthetic",
        "Text hierarchy: xl font-semibold white title, sm gray-400 description with relaxed line-height",
        "Icon size set to text-8xl (6rem) for prominent display with proper leading-normal spacing",
        "Fully customizable color scheme through color prop",
        "Accepts any React node as icon prop, allowing use of icon libraries or custom SVGs",
        "ForwardRef implementation for direct access to root div element",
        "Extends HTMLDivElement attributes allowing standard div props like onClick, onHover, etc.",
        "Center-aligned content layout with flex col items-center justify-center structure",
        "Grid-based icon positioning using place-items-center for perfect centering",
        "TypeScript interface ensures type safety with comprehensive prop definitions",
      ],
    },
  ],
};
