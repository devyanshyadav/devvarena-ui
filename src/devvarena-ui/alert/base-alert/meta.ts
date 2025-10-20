import { ExampleMetadata } from "@/types/docs";

export const metadata: ExampleMetadata = {
  title: "Base Alert",
  description:
    "Enhanced alert component with gradient backgrounds, semantic variants, customizable icon shapes, and flexible content support. Built on shadcn/ui Alert with visual styling improvements.",
  category: "Feedback",
  tags: [
    "alert",
    "notification",
    "variants",
    "icons",
    "feedback",
    "ui",
    "gradient",
  ],
  relatedExamples: ["spot-alert", "dialog", "toast", "card"],
  components: [
    {
      id: "v1",
      title: "v1",
      description:
        "Alert component with gradient backgrounds, semantic color variants, and customizable icon container shapes",
      props: [
        {
          name: "variant",
          type: "'info' | 'success' | 'warning' | 'error' | 'custom'",
          description:
            "Visual variant determining the alert's color scheme and default icon",
          required: false,
        },
        {
          name: "title",
          type: "string",
          description: "Alert title text displayed in AlertTitle component",
          required: false,
        },
        {
          name: "description",
          type: "string",
          description:
            "Alert description text displayed in AlertDescription component",
          required: false,
        },
        {
          name: "customIcon",
          type: "React.ReactNode",
          description:
            "Custom icon element to display instead of default variant icon (primarily used with 'custom' variant)",
          required: false,
        },
        {
          name: "iconShape",
          type: "'square' | 'rounded' | 'circle'",
          description:
            "Shape style of the icon container - square (sharp corners), rounded (rounded corners), or circle (fully rounded)",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description:
            "Additional CSS classes to apply to the root Alert element",
          required: false,
        },
        {
          name: "children",
          type: "React.ReactNode",
          description:
            "Custom content to render in the alert body, used alongside or instead of title/description props",
          required: false,
        },
      ],
      notes: [
        "Built on shadcn/ui Alert component with enhanced gradient background styling",
        "5 semantic variants: info (sky blue), success (green), warning (yellow), error (red), custom (primary theme color)",
        "Default icons automatically assigned: Info, CircleCheck, AlertTriangle, XCircle for respective variants",
        "Gradient backgrounds use 'from-card from-70% to-{color}/20' pattern for subtle visual distinction",
        "Icon container has consistent styling with bg-card, border, shadow, and customizable shape via iconShape prop",
        "ForwardRef implementation allows direct access to underlying Alert element",
        "Custom variant supports any custom icon via customIcon prop while maintaining theme consistency",
        "Flexible content model supports both structured (title/description) and freeform (children) content",
        "Icon shapes provide visual variety: square (rounded-none), rounded (rounded-lg), circle (rounded-full)",
        "TypeScript support with comprehensive prop typing via class-variance-authority VariantProps",
        "Maintains full accessibility features inherited from shadcn/ui Alert component",
        "Color-coded styling provides immediate semantic feedback to users",
        "Responsive design with proper spacing and typography scaling",
      ],
    },
  ],
};
