import React from "react";
import BaseButton from "./component";
import { Plus, Download, Heart, Settings, Trash2 } from "lucide-react";

const BaseButtonUsage = () => {
  return (
    <div className="w-full p-8 space-y-8">
      {/* Gradient Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Gradient Variants</h3>
        <div className="flex flex-wrap gap-3">
          <BaseButton gradient="default">Default</BaseButton>
          <BaseButton gradient="blue">Blue</BaseButton>
          <BaseButton gradient="green">Green</BaseButton>
          <BaseButton gradient="yellow">Yellow</BaseButton>
          <BaseButton gradient="red">Red</BaseButton>
          <BaseButton gradient="purple">Purple</BaseButton>
          <BaseButton gradient="orange">Orange</BaseButton>
        </div>
      </div>

      {/* Effects */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Effects</h3>
        <div className="flex flex-wrap gap-4">
          <BaseButton gradient="blue" effect="glow">
            Glow
          </BaseButton>
          <BaseButton gradient="green" effect="lift">
            Lift
          </BaseButton>
          <BaseButton gradient="purple" effect="pulse">
            Pulse
          </BaseButton>
          <BaseButton gradient="blue" effect="loader">
            Loader
          </BaseButton>
          <BaseButton variant="outline" className="rounded-md" effect="ping">
            Ping
          </BaseButton>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sizes</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <BaseButton gradient="blue" size="sm">
            Small
          </BaseButton>
          <BaseButton gradient="blue">Default</BaseButton>
          <BaseButton gradient="blue" size="lg">
            Large
          </BaseButton>
          <BaseButton gradient="blue" size="icon">
            <Plus className="h-4 w-4" />
          </BaseButton>
        </div>
      </div>

      {/* With Icons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Icons</h3>
        <div className="flex flex-wrap gap-4">
          <BaseButton gradient="green">
            <Download className="w-4 h-4 mr-2" />
            Download
          </BaseButton>
          <BaseButton gradient="red">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </BaseButton>
          <BaseButton gradient="purple">
            <Heart className="w-4 h-4 mr-2" />
            Like
          </BaseButton>
          <BaseButton gradient="orange">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </BaseButton>
        </div>
      </div>

      {/* Standard shadcn variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Standard Variants (fallback to shadcn)
        </h3>
        <div className="flex flex-wrap gap-4">
          <BaseButton variant="default">Default</BaseButton>
          <BaseButton variant="secondary">Secondary</BaseButton>
          <BaseButton variant="outline">Outline</BaseButton>
          <BaseButton variant="ghost">Ghost</BaseButton>
          <BaseButton variant="link">Link</BaseButton>
          <BaseButton variant="destructive">Destructive</BaseButton>
        </div>
      </div>

      {/* Interactive Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Examples</h3>
        <div className="flex flex-wrap gap-4">
          <BaseButton gradient="green" disabled>
            Disabled
          </BaseButton>
          <BaseButton gradient="purple" effect="lift" className="px-8">
            Custom padding
          </BaseButton>
        </div>
      </div>
    </div>
  );
};

export default BaseButtonUsage;
