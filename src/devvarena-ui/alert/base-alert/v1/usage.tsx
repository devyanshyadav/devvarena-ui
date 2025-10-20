import React from "react";
import BaseAlertV1 from "./component";
import { Heart, Star, Zap, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BaseAlertUsageV1() {
  return (
    <div className="p-6 space-y-8 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Info Variant</h3>
          <div className="space-y-3">
            <BaseAlertV1
              variant="info"
              title="Information"
              description="This is an informational message with useful details."
            />
            <BaseAlertV1
              variant="info"
              title="System Update"
              description="New features are now available in your dashboard."
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Success Variant</h3>
          <div className="space-y-3">
            <BaseAlertV1
              variant="success"
              title="Success!"
              description="Your changes have been saved successfully."
            />
            <BaseAlertV1
              variant="success"
              title="Payment Complete"
              description="Thank you! Your payment has been processed."
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Warning Variant</h3>
          <div className="space-y-3">
            <BaseAlertV1
              variant="warning"
              title="Warning"
              description="Please review your settings before continuing."
            />
            <BaseAlertV1
              variant="warning"
              title="Storage Almost Full"
              description="You have used 90% of your available storage space."
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Error Variant</h3>
          <div className="space-y-3">
            <BaseAlertV1
              variant="error"
              title="Error"
              description="Something went wrong. Please try again later."
            />
            <BaseAlertV1
              variant="error"
              title="Connection Failed"
              description="Unable to connect to the server. Check your internet connection."
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Custom Variant with Icons</h3>
          <div className="space-y-3">
            <BaseAlertV1
              variant="custom"
              customIcon={<Heart className="size-4 text-pink-500" />}
              title="Thank You!"
              description="We appreciate your feedback and support."
            />
            <BaseAlertV1
              variant="custom"
              customIcon={<Star className="size-4 text-yellow-500" />}
              title="Premium Feature"
              description="Upgrade to access advanced analytics and reporting."
            />
            <BaseAlertV1
              variant="custom"
              customIcon={<Zap className="size-4 text-purple-500" />}
              title="Performance Boost"
              description="Your application is now running 50% faster."
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Icon Shapes</h3>
          <div className="space-y-3">
            <BaseAlertV1
              variant="info"
              iconShape="square"
              title="Square Icon"
              description="Alert with square icon container (rounded-none)."
            />
            <BaseAlertV1
              variant="success"
              iconShape="rounded"
              title="Rounded Icon"
              description="Alert with rounded icon container (rounded-lg) - default."
            />
            <BaseAlertV1
              variant="warning"
              iconShape="circle"
              title="Circle Icon"
              description="Alert with circular icon container (rounded-full)."
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">With Custom Content</h3>
          <div className="space-y-3">
            <BaseAlertV1 variant="info" title="Custom Content">
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">
                  You can add any custom content here, including:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                  <li>Links and buttons</li>
                  <li>Additional text</li>
                  <li>Other components</li>
                </ul>
              </div>
            </BaseAlertV1>

            <BaseAlertV1
              variant="custom"
              customIcon={<Settings className="size-4 text-gray-500" />}
            >
              <div className="space-y-2">
                <h4 className="font-medium">Settings Updated</h4>
                <p className="text-sm text-muted-foreground">
                  Your notification preferences have been updated successfully.
                </p>
                <div className="flex gap-2 mt-3">
                  <Button className="rounded-full" size="sm">
                    View Settings
                  </Button>
                  <Button className="rounded-full" variant="outline" size="sm">
                    Undo
                  </Button>
                </div>
              </div>
            </BaseAlertV1>
          </div>
        </div>
      </div>
    </div>
  );
}
