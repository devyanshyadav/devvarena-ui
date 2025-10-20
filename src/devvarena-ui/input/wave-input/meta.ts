import { ExampleMetadata } from "@/types/docs";

export const metadata: ExampleMetadata = {
  title: "Wave Input",
  description:
    "Input component with animated wave label effects where each character moves individually with staggered timing. Features multiple variants, icon support, and customizable wave animation delays.",
  category: "Form",
  tags: ["input", "wave", "animation", "staggered", "form", "field"],
  relatedExamples: ["base-input", "floating-label-input", "laser-input"],
  components: [
    {
      id: "v1",
      title: "v1",
      description:
        "Input with character-by-character wave animation, multiple visual variants, and customizable delay timing for staggered effects",
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
            "Icon element to display inside the input field with automatic positioning",
          required: false,
        },
        {
          name: "iconAlignment",
          type: "'left' | 'right'",
          description:
            "Position of the icon within the input field, adjusts label positioning accordingly (default: 'left')",
          required: false,
        },
        {
          name: "label",
          type: "string",
          description:
            "Label text that splits into individual characters for wave animation effect",
          required: true,
        },
        {
          name: "waveDelay",
          type: "number",
          description:
            "Delay in milliseconds between each character animation in the wave sequence (default: 50)",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes applied to the input element",
          required: false,
        },
        {
          name: "id",
          type: "string",
          description:
            "HTML id attribute for input-label association (auto-generated from label if not provided)",
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
        "Built on shadcn/ui Input with enhanced wave animation functionality using character-by-character effects",
        "Label text split into individual span elements for independent character animations",
        "Each character animates with customizable delay using transitionDelay inline style",
        "Wave animation includes -translate-y-5, text size reduction, and color change to text-primary",
        "4 distinct visual variants with unique styling: default, outline, ghost, underline",
        "Underline variant features animated bottom border with scale-x-0 to scale-x-100 transition",
        "Icon support with automatic spacing adjustments: left icons adjust label to left-10, others to left-4",
        "Uses group CSS strategy for coordinated animations: group-focus-within and group-[&:has(input:not(:placeholder-shown))]",
        "Background gradient on animated characters (from-background from-60% to-transparent) for visibility",
        "Character spacing preserved with non-breaking space (\\u00A0) replacement for space characters",
        "Wave animation triggers on both focus state and when input has value for persistent positioning",
        "Label positioning uses top-1/2 -translate-y-1/2 initially, animates to top-2 translate-y-0",
        "Automatic ID generation from label text using toLowerCase and space replacement if id not provided",
        "Required attribute and placeholder-transparent ensure proper animation behavior",
        "Icon positioning with peer-active:scale-90 animation for tactile feedback",
        "ForwardRef implementation allows direct access to underlying input element",
        "TypeScript support with interface extending input props and excluding conflicting 'placeholder'",
        "Container uses mt-6 and group class to accommodate wave animation space and coordinate effects",
        "Individual character transitions use duration-200 with staggered delays for smooth wave progression",
      ],
    },
  ],
};
