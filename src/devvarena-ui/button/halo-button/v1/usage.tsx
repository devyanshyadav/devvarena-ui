import React from "react";
import HaloButtonv1 from "./component";

const AuroraButtonUsage = () => {
  return (
    <div className="w-full p-8 space-y-8 flex justify-center gap-10">
      <HaloButtonv1>Default</HaloButtonv1>
      <HaloButtonv1 gradientColor="purple" rounded="lg">
        Purple Button
      </HaloButtonv1>
      <HaloButtonv1 gradientColor="red" rounded="full">
        Red Button
      </HaloButtonv1>
    </div>
  );
};

export default AuroraButtonUsage;
