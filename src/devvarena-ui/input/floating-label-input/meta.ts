import { Metadata } from "@/types/docs";

export const metadata: Metadata = {
  title: "Floating Label Input",
  description:
    "Enhanced input component with animated floating labels that move when focused or filled. Features multiple variants, icon support, and customizable label transform origin for smooth animations.",
  category: "Form",
  tags: ["input", "floating", "label", "animation", "form", "field"],
  relatedExamples: ["base-input", "laser-input", "wave-input"],
  components: [
    {
      id: "v1",
      title: "v1",
      description:
        "Input with floating label animation, multiple visual variants, and configurable label transform origin for directional animations",
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
            "Label text that serves as placeholder and floats above input when focused or filled",
          required: true,
        },
        {
          name: "labelOrigin",
          type: "'left' | 'center' | 'right'",
          description:
            "Transform origin for the floating label animation direction (default: 'left')",
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
        "Built on shadcn/ui Input with enhanced floating label functionality using peer CSS selectors",
        "Label animates from placeholder position (center) to floating position (top) on focus or when filled",
        "4 distinct visual variants with unique styling: default, outline, ghost, underline",
        "Underline variant features animated bottom border with scale-x-0 to scale-x-100 transition",
        "Icon support with automatic spacing adjustments: left icons adjust label to left-10, others to left-4",
        "Label origin controls transform animation direction using origin-left, origin-center, origin-right classes",
        "Uses peer CSS strategy for coordinated label animations: peer-focus and peer-[&:not(:placeholder-shown)]",
        "Label transforms include scale-85, -top-3 positioning, and color change to text-primary",
        "Background gradient on floating label (from-background from-60% to-transparent) for visibility",
        "Automatic ID generation from label text using toLowerCase and space replacement if id not provided",
        "Required attribute and placeholder-transparent ensure proper floating behavior and animations",
        "Persistent label positioning maintained for both focus states and when input has value",
        "Icon positioning with peer-active:scale-90 animation for tactile feedback",
        "ForwardRef implementation allows direct access to underlying input element",
        "TypeScript support with interface extending input props and excluding conflicting 'placeholder'",
        "Container uses mt-6 to accommodate floating label space above input",
        "Label positioning accounts for icon alignment to prevent overlap with input icons",
        "Transform duration-150 ease-in-out provides smooth label animation transitions",
      ],
    },
  ],
};
