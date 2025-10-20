import React from "react";
import BaseInputV1 from "./component";
import { Search, Mail, Eye, Lock } from "lucide-react";

export default function BaseInputUsageV1() {
  return (
    <div className="p-6 space-y-8 max-w-lg mx-auto">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Default Variant</h3>
        <div className="space-y-2">
          <BaseInputV1 placeholder="Enter text..." />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Outline Variant</h3>
        <div className="space-y-2">
          <BaseInputV1 variant="outline" placeholder="Outline input..." />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Ghost Variant</h3>
        <div className="space-y-2">
          <BaseInputV1 variant="ghost" placeholder="Ghost input..." />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Underline Variant</h3>
        <div className="space-y-2">
          <BaseInputV1 variant="underline" placeholder="Underline input..." />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">With Icons - Left Alignment</h3>
        <div className="space-y-2">
          <BaseInputV1
            variant="outline"
            placeholder="Search..."
            icon={<Search size={16} />}
            iconAlignment="left"
          />
          <BaseInputV1
            variant="default"
            placeholder="Email address"
            type="email"
            icon={<Mail size={16} />}
            iconAlignment="left"
          />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">With Icons - Right Alignment</h3>
        <div className="space-y-2">
          <BaseInputV1
            variant="outline"
            placeholder="Password"
            type="password"
            icon={<Eye size={16} />}
            iconAlignment="right"
          />
          <BaseInputV1
            variant="underline"
            placeholder="Secure field"
            icon={<Lock size={16} />}
            iconAlignment="right"
          />
        </div>
      </div>
    </div>
  );
}
