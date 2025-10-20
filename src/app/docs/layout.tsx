import * as React from "react";
import { DocsSidebar } from "@/components/docs-comp/docs-sidebar";
import { discoverComponents } from "@/lib/docs-runtime";
import Header from "@/components/layout-comp/header";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get components on server-side
  const components = discoverComponents();

  return (
    <div>
      <div className="p-2 px-4 flex items-center h-16 border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex w-full items-center gap-3">
          <Header components={components} />
        </div>
      </div>
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-60 shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="sticky top-16 p-4 h-[calc(100vh-4rem)] overflow-y-auto">
            <div>
              <DocsSidebar components={components} />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden mx-auto max-w-[1400px] p-5 md:pl-10">
          <div className="w-full container max-w-4xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
