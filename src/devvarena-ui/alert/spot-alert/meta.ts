import { Metadata } from "@/types/docs";

export const metadata: Metadata = {
  title: "Spot Alert",
  description:
    "Modern alert component with distinctive circular overlapping background design and semantic variants. Features unique floating circular icons with layered opacity effects and flexible content support.",
  category: "Feedback",
  tags: [
    "alert",
    "notification",
    "variants",
    "icons",
    "feedback",
    "ui",
    "circular",
    "spot",
  ],
  relatedExamples: ["base-alert", "dialog", "toast", "card"],
  components: [
    {
      id: "v1",
      title: "v1",
      description:
        "Alert component with circular overlapping background design, semantic color variants, and floating icon spots",
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
        "Built on shadcn/ui Alert component with unique circular overlapping background design",
        "5 semantic variants: info (sky blue), success (green), warning (yellow), error (red), custom (primary theme color)",
        "Default icons automatically assigned: Info, CircleCheck, AlertTriangle, XCircle for respective variants",
        "Distinctive floating circular background with two overlapping layers at different opacity levels (5% and 10%)",
        "Circular background positioned absolutely with -top-3 -left-3 offset for floating effect",
        "Icon positioned with absolute centering using top-1/2 left-1/2 -translate transforms",
        "Content area uses pl-10 left padding to accommodate the floating circular background design",
        "Fixed circular dimensions (h-14 w-14) with aspect-square to maintain perfect circles",
        "Nested circular structure: outer circle (bg-{color}/5) contains inner circle (bg-{color}/10) with icon",
        "ForwardRef implementation allows direct access to underlying Alert element",
        "Custom variant supports any custom icon via customIcon prop while maintaining visual consistency",
        "Flexible content model supports both structured (title/description) and freeform (children) content",
        "TypeScript support with comprehensive prop typing for type safety",
        "Maintains full accessibility features inherited from shadcn/ui Alert component",
        "Color-coded styling provides immediate semantic feedback with layered visual depth",
        "Unique visual identity differentiating from standard rectangular alert designs",
        "Responsive design with consistent spacing and typography scaling",
      ],
    },
  ],
};
