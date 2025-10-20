import { ExampleMetadata } from "@/types/docs";

export const metadata: ExampleMetadata = {
  title: "Base Input",
  description:
    "Enhanced input component with multiple styling variants and configurable icon positioning. Extends shadcn/ui Input with additional visual options and interactive effects.",
  category: "Form",
  tags: ["input", "variants", "icons", "form", "text", "field"],
  relatedExamples: ["floating-label-input", "laser-input", "wave-input"],
  components: [
    {
      id: "v1",
      title: "v1",
      description:
        "Input component with multiple visual variants (default, outline, ghost, underline) and configurable icon positioning with animations",
      props: [
        {
          name: "variant",
          type: "'default' | 'outline' | 'ghost' | 'underline'",
          description:
            "Visual styling variant determining background, border, and focus behavior (default: 'default')",
          required: false,
        },
        {
          name: "icon",
          type: "React.ReactNode",
          description:
            "Icon element to display inside the input field with automatic positioning and animations",
          required: false,
        },
        {
          name: "iconAlignment",
          type: "'left' | 'right'",
          description:
            "Position of the icon within the input field, adjusts padding accordingly (default: 'left')",
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
        "Built on shadcn/ui Input component with enhanced variants and icon capabilities",
        "4 distinct visual variants with unique styling approaches",
        "Default variant: border-input background with bg-secondary and standard focus ring",
        "Outline variant: transparent background with visible border for clean minimal appearance",
        "Ghost variant: muted background with no border for subtle integration",
        "Underline variant: transparent with bottom border, animated scale effect, and custom focus styling",
        "Underline animation uses CSS pseudo-element with scale-x-0 to scale-x-100 transition on focus",
        "Icon positioning system with automatic padding: pl-10 for left icons, pr-10 for right icons",
        "Icon animations include peer-active:scale-90 for tactile feedback on input interaction",
        "Uses peer class strategy for coordinated styling between input and icon elements",
        "Icon container positioned absolutely with top-1/2 -translate-y-1/2 for perfect vertical centering",
        "ForwardRef implementation allows direct access to underlying input element",
        "Maintains full compatibility with standard HTML input attributes and events",
        "TypeScript support with comprehensive interface extending input props and VariantProps",
        "Consistent rounded-xl design language with focus-visible:ring-2 focus-visible:ring-offset-2",
        "Smooth transition-all duration-200 for all interactive states and variant changes",
        "Z-index management with z-10 for icons to ensure proper layering above input styling",
        "Text-muted-foreground for icons provides consistent visual hierarchy",
      ],
    },
  ],
};
