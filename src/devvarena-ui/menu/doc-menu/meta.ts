import { Metadata } from "@/types/docs";

export const metadata: Metadata = {
  title: "Doc Menu",
  description:
    "Collaborative document menu component featuring horizontal avatar list with masked overflow, action buttons for sharing and inviting. Perfect for document collaboration interfaces and team management.",
  category: "Navigation",
  tags: ["menu", "avatar", "collaboration", "invite", "share", "document"],
  relatedExamples: ["avatar-group", "user-list", "team-menu"],
  credit: {
    name: "@Neesh774",
    type: "design",
    url: "https://x.com/Neesh774/status/1978245607769677927",
  },
  components: [
    {
      id: "v1",
      title: "v1",
      description:
        "Horizontal avatar list menu with gradient mask effect, tooltips for user details, and action buttons for copying link and inviting users. Features smooth hover interactions and customizable user display.",
      props: [
        {
          name: "users",
          type: "UserAvatar[]",
          description:
            "Array of user objects with optional id, name, avatarUrl, tooltipContent, and description properties",
          required: false,
        },
        {
          name: "maxVisibleUsers",
          type: "number",
          description: "Maximum number of user avatars to display (default: 4)",
          required: false,
        },
        {
          name: "onCopyLink",
          type: "() => void",
          description:
            "Callback function triggered when copy link button is clicked",
          required: false,
        },
        {
          name: "onInvite",
          type: "() => void",
          description:
            "Callback function triggered when invite button is clicked",
          required: false,
        },
        {
          name: "copyLinkIcon",
          type: "React.ReactNode",
          description:
            "Custom icon for copy link button (default: FiLink from react-icons)",
          required: false,
        },
        {
          name: "inviteIcon",
          type: "React.ReactNode",
          description:
            "Custom icon for invite button (default: LucideMailPlus from lucide-react)",
          required: false,
        },
        {
          name: "inviteButtonText",
          type: "string",
          description: "Text label for invite button (default: 'Invite')",
          required: false,
        },
        {
          name: "showCopyLinkButton",
          type: "boolean",
          description: "Toggle visibility of copy link button (default: true)",
          required: false,
        },
        {
          name: "showInviteButton",
          type: "boolean",
          description: "Toggle visibility of invite button (default: true)",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes applied to root menu element",
          required: false,
        },
      ],
      notes: [
        "Built with shadcn/ui Button and Tooltip components for consistent styling",
        "Features horizontal avatar list with -space-x-4 for overlapping effect",
        "Gradient mask effect using [mask-image:_linear-gradient(to_right,_transparent_0,_white_40px,white_calc(100%-40px),_transparent_100%)]",
        "Smooth hover interactions: avatars expand horizontally (mx-[1px]) on hover with transition-all duration-200",
        "Adjacent sibling selector [&:has(+_button:hover)]:!mx-[1px] ensures spacing when hovering next avatar",
        "Each avatar is 60x60px (h-[60px] w-[60px]) with rounded-full, border, and background styling",
        "Container width dynamically calculated based on maxVisibleUsers: calc(maxVisibleUsers * 55px)",
        "Tooltips display user name and description, with support for custom tooltipContent via UserAvatar interface",
        "Action buttons section with 50px height, rounded-xl corners for consistent design",
        "Copy link button is square (50x50px) showing only icon, invite button shows icon + text",
        "UserAvatar interface: { id?: string; name?: string; avatarUrl?: string; tooltipContent?: React.ReactNode; description?: string; }",
        "Conditional rendering for both action buttons via showCopyLinkButton and showInviteButton props",
        "ForwardRef implementation allows direct access to root div element",
        "Extends HTMLDivElement attributes for full div prop support (onClick, onMouseEnter, etc.)",
        "Muted background with border-2 border-border and rounded-3xl for soft container appearance",
        "Uses Tooltip from shadcn/ui with custom padding and content formatting",
        "Fully responsive with flex layouts and proper spacing between avatar list and action buttons",
        "TypeScript interfaces ensure type safety for both component props and UserAvatar objects",
      ],
    },
  ],
};
