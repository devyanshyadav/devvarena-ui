import { ExampleMetadata } from "@/types/docs";

export const metadata: ExampleMetadata = {
  title: "Profile Card",
  description:
    "Enhanced profile card component with customizable user information, company badges, statistics, and interactive elements. Features gradient background design and flexible content sections.",
  category: "Display",
  tags: ["card", "profile", "user", "avatar", "contact", "stats"],
  relatedExamples: ["base-card", "feature-card", "product-card"],
  components: [
    {
      id: "v1",
      title: "v1",
      description:
        "Professional profile card with customizable user info, company branding, rating statistics, and interactive bookmark functionality with rounded gradient design",
      props: [
        {
          name: "name",
          type: "string",
          description:
            "Profile holder's full name displayed as primary heading",
          required: true,
        },
        {
          name: "title",
          type: "string",
          description: "Professional role or job title displayed below name",
          required: true,
        },
        {
          name: "description",
          type: "string",
          description:
            "Optional professional description with line-clamp-2 truncation",
          required: false,
        },
        {
          name: "profileImage",
          type: "string",
          description: "URL for user profile image displayed as rounded circle",
          required: true,
        },
        {
          name: "profileImageAlt",
          type: "string",
          description:
            "Alt text for profile image accessibility, defaults to name",
          required: false,
        },
        {
          name: "backgroundImage",
          type: "string",
          description:
            "URL for header background pattern image (default: pattern-bg.png)",
          required: false,
        },
        {
          name: "company",
          type: "{ name: string; icon?: React.ReactNode; color?: string; }",
          description:
            "Company information with name, optional icon, and custom color",
          required: false,
        },
        {
          name: "rating",
          type: "number",
          description: "User rating displayed with star icon (default: 5.0)",
          required: false,
        },
        {
          name: "hourlyRate",
          type: "string | number",
          description:
            "Hourly rate with automatic $ formatting for numbers (default: $150)",
          required: false,
        },
        {
          name: "projectCount",
          type: "number",
          description: "Number of projects/completions (default: 24)",
          required: false,
        },
        {
          name: "timeUnit",
          type: "string",
          description:
            "Unit label for project count display (default: 'Month')",
          required: false,
        },
        {
          name: "onContact",
          type: "() => void",
          description: "Contact button click handler function",
          required: false,
        },
        {
          name: "onBookmark",
          type: "() => void",
          description: "Bookmark toggle button click handler",
          required: false,
        },
        {
          name: "contactButtonText",
          type: "string",
          description:
            "Custom text for contact button (default: 'Get In Touch')",
          required: false,
        },
        {
          name: "isBookmarked",
          type: "boolean",
          description:
            "Bookmark state for filled/unfilled icon display (default: false)",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes applied to root card element",
          required: false,
        },
        {
          name: "showStats",
          type: "boolean",
          description:
            "Toggle visibility of rating, rate, and project stats (default: true)",
          required: false,
        },
      ],
      notes: [
        "Built on shadcn/ui Card components with enhanced visual design and customization options",
        "Gradient background design using from-secondary to-card with rounded-[40px] corners",
        "Layered header structure: 7.5rem background image with overlaid profile section using -translate-y-9",
        "Profile image positioned as 16x16 rounded-full circle with bg-cover background styling",
        "Company badge with customizable icon, name, and background color using inline styles",
        "Statistics section displays rating (Star icon), hourly rate (Flag icon), and project count (Clock icon)",
        "Interactive bookmark button with filled/unfilled state using conditional Bookmark icon fill",
        "Contact button features gradient shadow effect using CSS pseudo-element with after:bg-gradient-to-b",
        "Flexible rate formatting: automatic $ prefix for number inputs, passthrough for string inputs",
        "Optional description with text-xs and line-clamp-2 for clean text overflow handling",
        "Accessibility features: proper alt text for images, role='img' for background images",
        "Company color customization via inline backgroundColor style when color prop provided",
        "Conditional rendering: company section, description, bookmark button, and stats based on props",
        "ForwardRef implementation allows direct access to underlying Card element",
        "TypeScript interface with comprehensive prop definitions for type safety",
        "Responsive design with mx-2 content padding and flex layouts for optimal spacing",
        "Icon color coding: yellow-400 (rating), blue-500 (rate), purple-500 (projects) for visual hierarchy",
      ],
    },
  ],
};
