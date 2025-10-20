import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BaseButton from "@/devvarena-ui/button/base-button/v1/component";
import DocFeatures from "@/components/layout-comp/doc-features";

export default function DocsIndexPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold">Devvarena UI</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A collection of beautifully designed, feature-rich components built on
          top of shadcn/ui. Copy, paste, and customize to build stunning
          interfaces.
        </p>
      </div>
      <br />
      {/* Features */}
      <DocFeatures />

      {/* CTA */}
      <div>
        <Link href="/docs/installation">
          <BaseButton>
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </BaseButton>
        </Link>
      </div>
    </div>
  );
}
