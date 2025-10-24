import { Metadata } from "@/types/docs";

export const metadata: Metadata = {
  title: "Boomerang Product Card",
  description:
    "Interactive e-commerce product card with animated add-to-cart feature. Includes CartIcon component with beating badge animation. Features configurable Framer Motion animations with preset options (boomerang, arc, swoosh, bounce, spiral, straight).",
  category: "E-commerce",
  tags: ["card", "product", "animation", "cart", "e-commerce", "framer-motion"],
  relatedExamples: ["cart-icon", "product-card", "shopping-cart"],
  credit: {
    name: "@jh3yy",
    type: "design",
    url: "https://x.com/jh3yy/status/1979343730483302475",
  },
  components: [
    {
      id: "v1",
      title: "v1",
      description:
        "Product card with hover-reveal details and customizable add-to-cart animation. Includes reusable CartIcon component with animated badge. Animation trajectory, scale, rotation, and timing fully configurable via AnimationConfig.",
      props: [
        {
          name: "product",
          type: "Product",
          description:
            "Product data: { name?: string; image?: string; price?: number; originalPrice?: number; subtitle?: string; }",
          required: false,
        },
        {
          name: "cartIconRef",
          type: "React.RefObject<HTMLElement | HTMLDivElement | null>",
          description: "Reference to CartIcon component where animation ends",
          required: false,
        },
        {
          name: "animationConfig",
          type: "AnimationConfig",
          description:
            "Animation settings: { x?: number; y?: number; scale?: number; angle?: number; itemSpeed?: number; bumpSpeed?: number; }",
          required: false,
        },
        {
          name: "onItemAdded",
          type: "() => void",
          description: "Callback triggered when animation completes",
          required: false,
        },
      ],
      notes: [
        "**Focus**: Component is designed to showcase the useAddToCart hook - the main feature",
        "**Two Components**: BoomerangProductCard (product card) and CartIcon (cart with badge)",
        "**CartIcon Props**: { count?: number; iconClassName?: string; badgeClassName?: string; }",
        "**Badge Animation**: Heartbeat effect (scale 1 → 1.3 → 1) runs 2x when item added",
        "**useAddToCart Hook**: Core feature - handles Framer Motion animation from product to cart",
        "**AnimationConfig Interface**: { x?: number; y?: number; scale?: number; angle?: number; itemSpeed?: number; bumpSpeed?: number; }",
        "**Parameter Ranges**: x/y (-200 to 200), scale (0 to 2), angle (0 to 360), itemSpeed (0.1 to 2s), bumpSpeed (0 to 1)",
        "**Default Animation**: x=-100, y=50, scale=1, angle=0, itemSpeed=0.8s, bumpSpeed=0.3 (boomerang effect)",
        "**Animation Presets**: Six built-in configs - boomerang, arc, swoosh, bounce, spiral, straight",
        "**Animation Path**: Three-point Bezier curve - start → mid-point (with offsets) → cart icon",
        "**X Offset**: Horizontal trajectory (negative = left, positive = right)",
        "**Y Offset**: Vertical trajectory (negative = up, positive = down)",
        "**Scale**: Image size at mid-point (1 = original size)",
        "**Angle**: Rotation during animation (applied at mid-point, returns to 0)",
        "**ItemSpeed**: Total animation duration in seconds",
        "**BumpSpeed**: Mid-point timing (0 = start, 1 = end, 0.3 = 30% through animation)",
        "**Hover Effect**: Product details reveal on button hover with blur transition",
        "**Fixed Styling**: Component has built-in styles (bg-secondary, w-28 image, etc.) - not customizable",
        "**Fixed Content**: Button text 'Add to Cart'/'Adding...', subtitle always visible",
        "**Price Display**: Shows price with optional strike-through originalPrice when provided",
        "**Image Fallback**: Placeholder on error",
        "**CartIcon Integration**: Works seamlessly with CartIcon component via cartIconRef",
        "**Type Safety**: Full TypeScript interfaces for all props and animation config",
        "**Auto Cleanup**: Animation removes DOM elements on completion",
      ],
    },
  ],
};
