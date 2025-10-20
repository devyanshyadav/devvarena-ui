import { useState, useRef } from "react";
import { animate } from "framer-motion";

export interface AnimationConfig {
  x?: number; // X offset for mid-point (-100 to 100)
  y?: number; // Y offset for mid-point (-100 to 100)
  scale?: number; // Scale at mid-point (0 to 2)
  angle?: number; // Rotation angle in degrees (0 to 360)
  itemSpeed?: number; // Animation duration in seconds (0.1 to 2)
  bumpSpeed?: number; // Additional control for curve intensity (0 to 1)
}

const useAddToCart = (
  cartIconRef: React.RefObject<HTMLElement | HTMLDivElement | null> | undefined,
  animationConfig: AnimationConfig = {}
) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const hasCompletedRef = useRef(false);

  const {
    x = -100,
    y = 50,
    scale = 1,
    angle = 0,
    itemSpeed = 0.8,
    bumpSpeed = 0.3,
  } = animationConfig;

  const animateToCart = (imageSrc: string, onComplete?: () => void) => {
    if (isAnimating || !imageRef.current || !cartIconRef?.current) return;

    hasCompletedRef.current = false;
    setIsAnimating(true);

    const productRect = imageRef.current.getBoundingClientRect();
    const cartRect = cartIconRef?.current?.getBoundingClientRect();

    const startLeft = productRect.left;
    const startTop = productRect.top;
    const cartLeft = cartRect?.left + cartRect?.width / 2 - 20;
    const cartTop = cartRect?.top + cartRect?.height / 2 - 20;
    const startWidth = productRect.width;
    const startHeight = productRect.height;

    // Create animated image element
    const animatedImage = document.createElement("img");
    animatedImage.src = imageSrc;
    animatedImage.style.position = "fixed";
    animatedImage.style.left = `${startLeft}px`;
    animatedImage.style.top = `${startTop}px`;
    animatedImage.style.width = `${startWidth}px`;
    animatedImage.style.height = `${startHeight}px`;
    animatedImage.style.zIndex = "1000";
    animatedImage.style.pointerEvents = "none";
    animatedImage.style.opacity = "1";
    animatedImage.style.objectFit = "cover";
    document.body.appendChild(animatedImage);

    // Calculate mid-point with user-defined offsets
    const midLeft = startLeft + x;
    const midTop = startTop + y;

    // Animation keyframes with configurable parameters
    const keyframes = {
      left: [startLeft, midLeft, cartLeft],
      top: [startTop, midTop, cartTop],
      width: [startWidth, startWidth * scale, 40],
      height: [startHeight, startHeight * scale, 40],
      rotate: [0, angle, 0],
      opacity: [1, 1, 0],
    };

    animate(animatedImage, keyframes, {
      duration: itemSpeed,
      ease: "easeOut",
      times: [0, bumpSpeed, 1],
      onComplete: () => {
        // Add pulse animation to cart icon
        if (cartIconRef?.current) {
          // target badge number in it
          const badgeNumber =
            cartIconRef?.current?.querySelector(".cartNumber");
          if (badgeNumber) {
            badgeNumber.classList.add("scale-110");
          }
          setTimeout(() => {
            if (badgeNumber) {
              badgeNumber.classList.remove("scale-110");
            }
          }, 1000);
        }

        if (animatedImage && animatedImage.parentNode) {
          animatedImage.parentNode.removeChild(animatedImage);
        }
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          if (onComplete) onComplete();
          setIsAnimating(false);
        }
      },
    });
  };

  return { imageRef, isAnimating, animateToCart };
};

export default useAddToCart;
