import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoCheckmarkDone, IoCopyOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import CopyCli from "./copy-cli";

interface PackageManagerSelectorProps {
  packages: string;
  className?: string;
}

const packageManagers = [
  { name: "npm", command: "npm install" },
  { name: "yarn", command: "yarn add" },
  { name: "pnpm", command: "pnpm add" },
  { name: "bun", command: "bun add" },
];

const PackageManagerSelector = ({
  packages,
  className,
}: PackageManagerSelectorProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      <Tabs defaultValue="npm" className="w-full">
        <TabsList className="grid w-fit grid-cols-4 bg-gradient-to-r from-transparent via-secondary/50 to-transparent rounded-3xl *:rounded-xl h-10">
          {packageManagers.map((pm) => (
            <TabsTrigger key={pm.name} value={pm.name} className="text-xs px-4">
              {pm.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {packageManagers.map((pm) => {
          const fullCommand = `${pm.command} ${packages}`;
          return (
            <TabsContent key={pm.name} value={pm.name} className="mt-4">
              <div className="relative">
                <div className="relative group">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{fullCommand}</code>
                  </pre>
                  <CopyCli
                    className="absolute top-2 right-2"
                    afterCopy={<IoCheckmarkDone />}
                    beforeCopy={<IoCopyOutline />}
                    textClip={fullCommand}
                  />
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default PackageManagerSelector;
