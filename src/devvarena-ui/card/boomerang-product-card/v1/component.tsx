import React from "react";
import useAddToCart, { AnimationConfig } from "./use-add-to-card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Product {
  name?: string;
  image?: string;
  price?: number;
  originalPrice?: number;
  subtitle?: string;
}

export interface CartIconProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  iconClassName?: string;
  badgeClassName?: string;
}

export interface BoomerangProductCardProps {
  product?: Product;
  cartIconRef?: React.RefObject<HTMLElement | HTMLDivElement | null>;
  animationConfig?: AnimationConfig | undefined;
  onItemAdded?: () => void;
}

const BoomerangProductCard: React.FC<BoomerangProductCardProps> = ({
  product = {},
  cartIconRef,
  animationConfig,
  onItemAdded,
}) => {
  const { imageRef, isAnimating, animateToCart } = useAddToCart(
    cartIconRef,
    animationConfig
  );

  const {
    name = "Product Name",
    image = "https://placehold.co/400x300/3b82f6/ffffff?text=Product",
    price = 0,
    originalPrice,
    subtitle = "One Size Fits All",
  } = product;

  const handleAddToCart = () => {
    if (cartIconRef) {
      animateToCart(image, onItemAdded);
    }
  };

  return (
    <div className="w-fit bg-secondary p-2 border border-border shadow-sm">
      <div className="flex gap-5 max-h-0 w-full origin-bottom items-center justify-center overflow-hidden px-2 transition-all duration-300 [&:has(+_.cartBtn:hover)]:blur-none blur-sm [&:has(+_.cartBtn:hover)]:max-h-40">
        <img
          className="m-1 aspect-square w-28 object-cover"
          ref={imageRef}
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/400x300/000000/ffffff?text=Product";
          }}
          src={image}
          alt={name}
        />
        <div className="my-auto space-y-1">
          <h2 className="font-medium">{name}</h2>
          <p className="font-mono text-sm uppercase">{subtitle}</p>
        </div>
      </div>
      <Button
        onClick={handleAddToCart}
        size="lg"
        className="cartBtn w-full rounded-none"
      >
        ${price}
        {originalPrice && originalPrice > price && (
          <span className="line-through opacity-50 ml-2">${originalPrice}</span>
        )}
        <span className="mx-1">●</span>
        {isAnimating ? "Adding..." : "Add to Cart"}
      </Button>
    </div>
  );
};

BoomerangProductCard.displayName = "BoomerangProductCard";

const CartIcon = React.forwardRef<HTMLDivElement, CartIconProps>(
  ({ count = 0, iconClassName, badgeClassName, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <ShoppingCart
          className={cn(
            "w-8 h-8 text-foreground cursor-pointer hover:text-primary transition-colors",
            iconClassName
          )}
        />
        {count > 0 && (
          <span
            className={cn(
              "cartNumber absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold duration-[0.2s] ease-in-out transition-all",
              badgeClassName
            )}
          >
            {count}
          </span>
        )}
      </div>
    );
  }
);

CartIcon.displayName = "CartIcon";

export { BoomerangProductCard, CartIcon, type AnimationConfig };
