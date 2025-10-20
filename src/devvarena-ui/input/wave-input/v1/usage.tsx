import React from "react";
import FloatingLabelInputV1 from "./component";
import { Search, Mail, Eye, Lock, User, Phone } from "lucide-react";

export default function FloatingLabelInputUsageV1() {
  return (
    <div className="p-6 space-y-8 max-w-lg mx-auto">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Floating Label Input V1</h2>
        <p className="text-muted-foreground">
          Input component with animated floating labels and icon support
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Default Variant</h3>
          <div className="space-y-4">
            <FloatingLabelInputV1
              className="w-full h-20"
              waveDelay={10}
              type="file"
              label="Full Name"
            />
            <FloatingLabelInputV1 label="Company" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Outline Variant</h3>
          <div className="space-y-4">
            <FloatingLabelInputV1 variant="outline" label="First Name" />
            <FloatingLabelInputV1 variant="outline" label="Last Name" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Ghost Variant</h3>
          <div className="space-y-4">
            <FloatingLabelInputV1 variant="ghost" label="Username" />
            <FloatingLabelInputV1 variant="ghost" label="Nickname" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Underline Variant</h3>
          <div className="space-y-4">
            <FloatingLabelInputV1 variant="underline" label="City" />
            <FloatingLabelInputV1 variant="underline" label="Country" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">With Icons - Left Alignment</h3>
          <div className="space-y-4">
            <FloatingLabelInputV1
              variant="outline"
              label="Search"
              icon={<Search size={16} />}
              iconAlignment="left"
            />
            <FloatingLabelInputV1
              variant="default"
              label="Email Address"
              type="email"
              icon={<Mail size={16} />}
              iconAlignment="left"
            />
            <FloatingLabelInputV1
              variant="ghost"
              label="Full Name"
              icon={<User size={16} />}
              iconAlignment="left"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">
            With Icons - Right Alignment
          </h3>
          <div className="space-y-4">
            <FloatingLabelInputV1
              variant="outline"
              label="Password"
              type="password"
              icon={<Eye size={16} />}
              iconAlignment="right"
            />
            <FloatingLabelInputV1
              variant="underline"
              label="Security Key"
              icon={<Lock size={16} />}
              iconAlignment="right"
            />
            <FloatingLabelInputV1
              variant="default"
              label="Phone Number"
              type="tel"
              icon={<Phone size={16} />}
              iconAlignment="right"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Different Input Types</h3>
          <div className="space-y-4">
            <FloatingLabelInputV1
              variant="outline"
              label="Email"
              type="email"
              icon={<Mail size={16} />}
            />
            <FloatingLabelInputV1
              variant="outline"
              label="Password"
              type="password"
              icon={<Lock size={16} />}
              iconAlignment="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
