"use client";
import { BoomerangProductCard, CartIcon, AnimationConfig } from "./component";
import { useState, useRef } from "react";

// Preset animation configurations
const animationPresets: Record<string, AnimationConfig> = {
  boomerang: {
    x: -100,
    y: 50,
    scale: 1,
    angle: 0,
    itemSpeed: 0.8,
    bumpSpeed: 0.3,
  },
  arc: {
    x: 0,
    y: -80,
    scale: 1.2,
    angle: 45,
    itemSpeed: 0.6,
    bumpSpeed: 0.5,
  },
  swoosh: {
    x: -150,
    y: -30,
    scale: 0.8,
    angle: -45,
    itemSpeed: 1,
    bumpSpeed: 0.4,
  },
  bounce: {
    x: -50,
    y: 100,
    scale: 1.5,
    angle: 90,
    itemSpeed: 0.9,
    bumpSpeed: 0.2,
  },
  spiral: {
    x: -80,
    y: -60,
    scale: 1.3,
    angle: -120,
    itemSpeed: 1.2,
    bumpSpeed: 0.35,
  },
  straight: {
    x: 0,
    y: 0,
    scale: 1,
    angle: 0,
    itemSpeed: 1,
    bumpSpeed: 0.5,
  },
};

export default function BoomerangProductCardExample() {
  const [cartCount, setCartCount] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState("boomerang");
  const cartIconRef = useRef<HTMLDivElement>(null);

  const product = {
    name: "Dev Cap-002",
    price: 129.99,
    originalPrice: 139.99,
    image: "/devvarena-ui-assets/card/cap-002.png",
    subtitle: "One size fits most",
  };

  const handleItemAdded = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-[60vh] flex-col relative flex items-center justify-center w-full p-8">
      {/* Cart Icon with Animation Preset Selector */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        <select
          value={selectedPreset}
          onChange={(e) => setSelectedPreset(e.target.value)}
          className="px-3 py-1.5 border text-sm border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="boomerang">Boomerang</option>
          <option value="arc">Arc</option>
          <option value="swoosh">Swoosh</option>
          <option value="bounce">Bounce</option>
          <option value="spiral">Spiral</option>
          <option value="straight">Straight</option>
        </select>

        <CartIcon ref={cartIconRef} count={cartCount} />
      </div>

      <div className="flex-1 w-full flex items-end justify-center gap-8">
        <BoomerangProductCard
          product={product}
          cartIconRef={cartIconRef}
          animationConfig={animationPresets[selectedPreset]}
          onItemAdded={handleItemAdded}
        />
      </div>
    </div>
  );
}
