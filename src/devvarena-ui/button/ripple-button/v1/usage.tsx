import React from "react";
import RippleButtonV1 from "./component";

const RippleButtonUsageV1 = () => {
  return (
    <div className="w-full p-8 space-y-8">
      <div className="flex flex-wrap justify-center gap-3">
        <RippleButtonV1 rippleColor="gray" variant="default">
          Default
        </RippleButtonV1>
        <RippleButtonV1 variant="secondary">Secondary</RippleButtonV1>
        <RippleButtonV1 variant="outline">Outline</RippleButtonV1>
        <RippleButtonV1 variant="destructive">Destructive</RippleButtonV1>
        <RippleButtonV1 variant="ghost">Ghost</RippleButtonV1>
      </div>
      <br />

      {/* BaseButton Gradient Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">
          Compatible with BaseButton
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          <RippleButtonV1 rippleColor="gray" gradient="default">
            Default
          </RippleButtonV1>
          <RippleButtonV1 gradient="blue">Blue Gradient</RippleButtonV1>
          <RippleButtonV1 gradient="purple">Purple Gradient</RippleButtonV1>
          <RippleButtonV1 gradient="green">Green Gradient</RippleButtonV1>
          <RippleButtonV1 gradient="red">Red Gradient</RippleButtonV1>
        </div>
      </div>
    </div>
  );
};

export default RippleButtonUsageV1;
