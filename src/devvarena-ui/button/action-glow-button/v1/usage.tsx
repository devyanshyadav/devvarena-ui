import React from "react";
import ActionGlowButtonV1 from "./component";

const ActionGlowUsageV1 = () => {
  return (
    <div className="w-full p-8 space-y-8 flex justify-center gap-10">
      <ActionGlowButtonV1>Default</ActionGlowButtonV1>
      <ActionGlowButtonV1 glowColor="purple">Purple Button</ActionGlowButtonV1>
      <ActionGlowButtonV1 className="py-1" glowColor="green">
        Red Button
      </ActionGlowButtonV1>
    </div>
  );
};

export default ActionGlowUsageV1;
