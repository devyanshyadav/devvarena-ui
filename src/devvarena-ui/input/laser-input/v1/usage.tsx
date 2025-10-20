import React from "react";
import LaserInputV1 from "./component";
import { Eye, Search } from "lucide-react";

export default function LaserInputV1Usage() {
  return (
    <div className="flex flex-col gap-2 max-w-lg mx-auto">
      <LaserInputV1
        placeholder="Search projects..."
        laserColor="#f97316"
        icon={<Search size={16} />}
      />

      <LaserInputV1
        placeholder="Enter password..."
        laserColor="#0066ff"
        type="password"
        icon={<Eye size={16} />}
        iconAlignment="right"
      />
    </div>
  );
}
