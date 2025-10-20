import React from "react";
import { Blocks, Code2, Terminal } from "lucide-react";

const DocFeatures = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left *:bg-secondary *:rounded-2xl *:p-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-tr from-secondary to-accent">
              <Blocks className="h-5 w-5 " />
            </div>
            <h3 className="font-semibold">shadcn/ui Compatible</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Built on top of shadcn/ui with seamless integration.
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-tr from-secondary to-accent">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="font-semibold">TypeScript First</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Full TypeScript support with comprehensive type definitions.
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-tr from-secondary to-accent">
              <Terminal className="h-5 w-5" />
            </div>
            <h3 className="font-semibold">CLI Installation</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Install components instantly with our CLI tool.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocFeatures;
