import React from "react";
import HaloButtonv2 from "./component";

const AuroraButtonUsage = () => {
  return (
    <div className="w-full p-8 space-y-8 flex justify-center gap-10">
      <HaloButtonv2 animate={false}>Without animation</HaloButtonv2>
      <HaloButtonv2>With animation</HaloButtonv2>
    </div>
  );
};

export default AuroraButtonUsage;
