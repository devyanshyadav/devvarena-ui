import { ExampleMetadata } from "@/types/docs";

export const metadata: ExampleMetadata = {
  title: "Ripple Button",
  description:
    "Interactive button component with Material Design ripple effects. Combines shadcn/ui Button compatibility with BaseButton gradient features and customizable ripple animations.",
  category: "Form",
  tags: [
    "button",
    "ripple",
    "material",
    "animation",
    "interactive",
    "gradient",
  ],
  relatedExamples: ["base-button", "halo-button", "action-glow-button"],
  components: [
    {
      id: "v1",
      title: "v1",
      description:
        "Button with Material Design ripple effect, compatible with both shadcn button variants and BaseButton gradient features",
      props: [
        {
          name: "rippleColor",
          type: "string",
          description:
            "Color of the ripple effect as CSS color value (default: 'rgba(255, 255, 255, 0.5)')",
          required: false,
        },
        {
          name: "duration",
          type: "string",
          description:
            "Duration of the ripple animation as CSS time value (default: '600ms')",
          required: false,
        },
        {
          name: "disableRipple",
          type: "boolean",
          description: "Completely disable the ripple effect when true",
          required: false,
        },
        {
          name: "gradient",
          type: "'default' | 'blue' | 'yellow' | 'red' | 'green' | 'purple' | 'orange' | 'none'",
          description:
            "BaseButton gradient variant that enables gradient styling mode",
          required: false,
        },
        {
          name: "effect",
          type: "'none' | 'glow' | 'lift' | 'pulse' | 'loader' | 'ping'",
          description:
            "BaseButton visual effects applied alongside ripple animation",
          required: false,
        },
        {
          name: "variant",
          type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
          description:
            "shadcn Button variant used when gradient prop is not set or is 'none'",
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
            "Button content wrapped in relative z-10 span for proper layering above ripple",
          required: false,
        },
        {
          name: "onClick",
          type: "(event: MouseEvent<HTMLButtonElement>) => void",
          description:
            "Click handler that triggers both ripple effect and custom click logic",
          required: false,
        },
      ],
      notes: [
        "Combines Material Design ripple effect with shadcn/ui Button and BaseButton gradient/effect system",
        "Dual mode system: gradient prop enables BaseButton styling, otherwise uses standard shadcn variants",
        "Ripple animation calculated dynamically based on click coordinates and button dimensions",
        "Uses CSS Modules (ripple.module.css) for ripple animation with custom CSS properties",
        "Ripple positioning uses getBoundingClientRect() for accurate click-to-ripple positioning",
        "State management with useState for ripple array and useEffect for automatic cleanup after duration",
        "Children content wrapped in 'relative z-10' span to ensure visibility above ripple effects",
        "Ripple elements use pointer-events-none to prevent interaction interference",
        "Custom handleClick callback that conditionally creates ripples and calls provided onClick",
        "Automatic ripple cleanup with setTimeout based on duration prop to prevent memory leaks",
        "Compatible with all BaseButton gradient colors (default, blue, yellow, red, green, purple, orange)",
        "Supports BaseButton effects (glow, lift, pulse, loader, ping) alongside ripple animation",
        "ForwardRef implementation for direct access to underlying Button element",
        "TypeScript support with comprehensive interface extending Button props and baseButtonVariants",
        "CSS transform: scale(0) initial state with animation to full scale for ripple effect",
        "Configurable ripple color and duration via props with sensible defaults",
        "Button overflow:hidden and relative positioning for proper ripple containment",
      ],
    },
  ],
};
