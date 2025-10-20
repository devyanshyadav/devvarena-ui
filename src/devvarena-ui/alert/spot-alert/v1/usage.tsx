import React from "react";
import SpotAlertV1 from "./component";
import { Heart, Star, Zap, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SomeAlertUsageV1() {
  return (
    <div className="p-6 space-y-8 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Info Variant</h3>
          <div className="space-y-3">
            <SpotAlertV1
              variant="info"
              title="Information"
              description="This is an informational message with useful details."
            />
            <SpotAlertV1
              variant="info"
              title="System Update"
              description="New features are now available in your dashboard."
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Success Variant</h3>
          <div className="space-y-3">
            <SpotAlertV1
              variant="success"
              title="Success!"
              description="Your changes have been saved successfully."
            />
            <SpotAlertV1
              variant="success"
              title="Payment Complete"
              description="Thank you! Your payment has been processed."
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Warning Variant</h3>
          <div className="space-y-3">
            <SpotAlertV1
              variant="warning"
              title="Warning"
              description="Please review your settings before continuing."
            />
            <SpotAlertV1
              variant="warning"
              title="Storage Almost Full"
              description="You have used 90% of your available storage space."
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Error Variant</h3>
          <div className="space-y-3">
            <SpotAlertV1
              variant="error"
              title="Error"
              description="Something went wrong. Please try again later."
            />
            <SpotAlertV1
              variant="error"
              title="Connection Failed"
              description="Unable to connect to the server. Check your internet connection."
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Custom Variant with Icons</h3>
          <div className="space-y-3">
            <SpotAlertV1
              variant="custom"
              customIcon={
                <Heart className="size-4 text-pink-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              }
              title="Thank You!"
              description="We appreciate your feedback and support."
            />
            <SpotAlertV1
              variant="custom"
              customIcon={
                <Star className="size-4 text-yellow-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              }
              title="Premium Feature"
              description="Upgrade to access advanced analytics and reporting."
            />
            <SpotAlertV1
              variant="custom"
              customIcon={
                <Zap className="size-4 text-purple-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              }
              title="Performance Boost"
              description="Your application is now running 50% faster."
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">With Custom Content</h3>
          <div className="space-y-3">
            <SpotAlertV1 variant="info" title="Custom Content">
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
            </SpotAlertV1>

            <SpotAlertV1
              variant="custom"
              customIcon={
                <Settings className="size-4 text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              }
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
            </SpotAlertV1>
          </div>
        </div>
      </div>
    </div>
  );
}
