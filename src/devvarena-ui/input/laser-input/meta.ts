import { Metadata } from "@/types/docs";

export const metadata: Metadata = {
  title: "Laser Input",
  description:
    "Interactive input component with laser tracking effects that follow mouse movement. Features customizable laser colors, size variants, and dynamic gradient generation based on cursor position.",
  category: "Form",
  tags: ["input", "laser", "tracking", "animation", "interactive", "modern"],
  relatedExamples: ["base-input", "floating-label-input", "wave-input"],
  components: [
    {
      id: "v1",
      title: "v1",
      description:
        "Input with mouse-tracking laser effect, customizable colors, size variants, and dynamic gradient positioning based on mouse movement",
      props: [
        {
          name: "size",
          type: "'sm' | 'md' | 'lg'",
          description:
            "Size variant determining padding: sm (p-1.5), md (p-2), lg (p-2.5) (default: 'md')",
          required: false,
        },
        {
          name: "rounded",
          type: "'sm' | 'md' | 'full'",
          description:
            "Border radius variant: sm (rounded-md), md (rounded-xl), full (rounded-full) (default: 'full')",
          required: false,
        },
        {
          name: "iconAlignment",
          type: "'left' | 'right'",
          description:
            "Position of the icon within the input field with automatic padding adjustment (default: 'left')",
          required: false,
        },
        {
          name: "icon",
          type: "React.ReactNode",
          description:
            "Icon element to display inside the input with absolute positioning",
          required: false,
        },
        {
          name: "laserColor",
          type: "string",
          description:
            "Custom color for the laser effect as CSS color value, supports hex, rgb, hsl, named colors (default: 'gray')",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes applied to the input element",
          required: false,
        },
        {
          name: "placeholder",
          type: "string",
          description: "Placeholder text displayed when input is empty",
          required: false,
        },
        {
          name: "value",
          type: "string",
          description: "Controlled input value for controlled component usage",
          required: false,
        },
        {
          name: "onChange",
          type: "(event: React.ChangeEvent<HTMLInputElement>) => void",
          description: "Change event handler for capturing user input",
          required: false,
        },
      ],
      notes: [
        "Features sophisticated mouse-tracking laser effect that follows cursor movement with real-time positioning",
        "Dynamic gradient generation based on mouse position: left (gradient to right), center (gradient from center), right (gradient from left)",
        "Custom laser colors supported via laserColor prop using inline CSS styles for full color spectrum support",
        "3 size variants with distinct padding: sm (p-1.5), md (p-2), lg (p-2.5) for different form contexts",
        "4 border radius options: none, sm (rounded-md), md (rounded-xl), full (rounded-full) for design flexibility",
        "State management with useState for hover, position, active, and gradient type tracking",
        "Mouse move handler calculates position relative to container with boundary constraints",
        "Focus state expands laser to full width with background: laserColor and opacity-50 transition",
        "Icon positioning system with absolute positioning and automatic input padding (pl-8/pr-8)",
        "Laser element uses w-24 base width, expands to w-full on focus with transition-all duration-200",
        "Z-index layering: laser (base), input container (z-20), icon (z-10) for proper visual hierarchy",
        "Overflow hidden on container prevents laser effects from extending beyond input boundaries",
        "ForwardRef implementation allows direct access to underlying input element",
        "Uses CSS custom properties (--laser-color) alongside inline styles for dynamic color application",
        "Hover and active states with conditional rendering and smooth opacity transitions",
        "Compatible with all standard HTML input attributes and events via props spreading",
        "TypeScript support with comprehensive interface extending input props minus conflicting 'size'",
        "Gradient positioning algorithm accounts for laser width (50px offset) and container boundaries",
      ],
    },
  ],
};
