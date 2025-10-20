"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UsageRenderer } from "@/components/docs-comp/usage-renderer";
import { FileItem } from "@/components/docs-comp/file-explorer";
import { CodeViewer } from "@/components/docs-comp/code-viewer";
import { ComponentDoc } from "@/lib/docs-runtime";
import { ComponentVersionFiles } from "@/lib/file-reader";
import { File, FileText, Image, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import CopyCli from "./copy-cli";
import { IoCheckmarkDone, IoCopyOutline } from "react-icons/io5";

interface ComponentPageClientProps {
  componentDoc: ComponentDoc;
  componentVersions: ComponentVersionFiles[];
  componentPath: string;
}

type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

const packageManagerCommands = {
  npm: "npx shadcn@latest add",
  yarn: "yarn shadcn@latest add",
  pnpm: "pnpm dlx shadcn@latest add",
  bun: "bunx --bun shadcn@latest add",
};

export function ComponentPageClient({
  componentDoc,
  componentVersions,
  componentPath,
}: ComponentPageClientProps) {
  const [selectedFile, setSelectedFile] = React.useState<FileItem | null>(null);
  const [selectedPackageManager, setSelectedPackageManager] =
    React.useState<PackageManager>("npm");

  // Initialize selected file when component versions change
  React.useEffect(() => {
    if (componentVersions.length > 0 && !selectedFile) {
      const firstVersion = componentVersions[0];
      const firstFile =
        firstVersion?.files.find((f) => f.name === "component.tsx") ||
        firstVersion?.files[0];
      if (firstFile) {
        setSelectedFile(firstFile);
      }
    }
  }, [componentVersions, selectedFile]);

  return (
    <div className="container mx-auto max-w-7xl">
      {/* Minimalist Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-semibold mb-4">
          {componentDoc.displayName}
        </h1>
        {/* <p className="text-base text-muted-foreground max-w-2xl  leading-relaxed">
          {componentDoc.description}
        </p> */}
      </div>

      {/* Component Sections - Each component gets its own tab section */}
      <div className="space-y-16">
        {componentVersions.map((version) => {
          const versionMeta = componentDoc.metadata?.components?.find(
            (c) => c.id === version.versionId
          );
          const hasVersionProps =
            versionMeta?.props && versionMeta.props.length > 0;

          const baseUrl = process.env["NEXT_PUBLIC_BASE_URL"];
          const cliCommand = `${packageManagerCommands[selectedPackageManager]} ${baseUrl}/api/r/${componentPath}/${version.versionId}`;

          return (
            <div key={version.versionId} className="space-y-4">
              {/* Component Header */}
              <div className="border-b border-border/50  flex divide-x">
                {/* <h2 className="text-xl font-semibold mb-2">{version.title}</h2> */}
                <p className="text-muted-foreground text-sm md:text-base mb-4">
                  {versionMeta?.description}
                </p>
              </div>

              {/* Component Tabs */}
              <Tabs defaultValue="preview" className="w-full">
                <div className="flex mb-6 justify-between flex-col-reverse md:flex-row gap-2">
                  <TabsList className="grid w-fit grid-cols-3 bg-gradient-to-r from-transparent via-secondary/50 to-transparent rounded-3xl *:rounded-xl h-10">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                    {hasVersionProps && (
                      <TabsTrigger value="props">Props</TabsTrigger>
                    )}
                  </TabsList>

                  {/* CLI Command */}
                  <div className="flex items-center bg-secondary  overflow-hidden rounded-xl px-1 justify-between">
                    <Select
                      value={selectedPackageManager}
                      onValueChange={(value) =>
                        setSelectedPackageManager(value as PackageManager)
                      }
                    >
                      <SelectTrigger className="w-20 rounded-xl border-0 border-r-2 shadow-none !bg-transparent rounded-r-none h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl *:p-0 *:*:!rounded-none *:*:px-2.5">
                        <SelectItem value="npm">npm</SelectItem>
                        <SelectItem value="yarn">yarn</SelectItem>
                        <SelectItem value="pnpm">pnpm</SelectItem>
                        <SelectItem value="bun">bun</SelectItem>
                      </SelectContent>
                    </Select>
                    <code className="text-sm max-w-xs text-nowrap truncate text-muted-foreground font-mono px-2 py-1 rounded">
                      {cliCommand}
                    </code>
                    <CopyCli
                      afterCopy={<IoCheckmarkDone />}
                      beforeCopy={<IoCopyOutline />}
                      textClip={cliCommand}
                    />
                  </div>
                </div>

                {/* Preview Tab */}
                <TabsContent value="preview" className="space-y-0">
                  <div className="border rounded-xl p-8">
                    <div className="flex items-center justify-center min-h-[300px]">
                      <UsageRenderer
                        componentId={`${componentPath}/${version.versionId}`}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Code Tab */}
                <TabsContent value="code" className="space-y-0">
                  <div className="border rounded-xl overflow-hidden bg-card">
                    <div className="flex h-[600px]">
                      <div className="w-52 shrink-0 border-r bg-muted/10 p-4">
                        <h4 className="font-medium text-sm mb-3 text-muted-foreground uppercase tracking-wider">
                          Files
                        </h4>
                        <div className="space-y-1">
                          {version.files.map((file) => {
                            const Icon =
                              file.type === "image"
                                ? Image
                                : file.name.endsWith(".tsx") ||
                                    file.name.endsWith(".ts")
                                  ? Code
                                  : file.name.endsWith(".json") ||
                                      file.name.endsWith(".md")
                                    ? FileText
                                    : File;
                            const isSelected = selectedFile?.path === file.path;

                            return (
                              <button
                                key={file.path}
                                onClick={() => setSelectedFile(file)}
                                className={cn(
                                  "flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md transition-colors text-left",
                                  isSelected
                                    ? "bg-accent text-accent-foreground"
                                    : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                                )}
                              >
                                <Icon className="h-4 w-4" />
                                <span className="truncate">{file.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <CodeViewer file={selectedFile} />
                    </div>
                  </div>
                </TabsContent>

                {/* Props Tab */}
                {hasVersionProps && (
                  <TabsContent value="props" className="space-y-0">
                    <div className="border rounded-xl overflow-hidden bg-card">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="px-6 py-4 text-left text-sm font-semibold">
                                Name
                              </th>
                              <th className="px-6 py-4 text-left text-sm font-semibold">
                                Type
                              </th>
                              <th className="px-6 py-4 text-left text-sm font-semibold">
                                Required
                              </th>
                              <th className="px-6 py-4 text-left text-sm font-semibold">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {versionMeta?.props?.map((prop) => (
                              <tr key={prop.name} className="hover:bg-muted/20">
                                <td className="px-6 py-4">
                                  <code className="font-mono text-sm font-medium">
                                    {prop.name}
                                  </code>
                                </td>
                                <td className="px-6 py-4">
                                  <code className="font-mono text-sm text-blue-600 dark:text-blue-400">
                                    {prop.type}
                                  </code>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                  {prop.required ? (
                                    <span className="text-red-600 dark:text-red-400 font-medium">
                                      Yes
                                    </span>
                                  ) : (
                                    <span className="text-muted-foreground">
                                      No
                                    </span>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                  {prop.description}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </div>
          );
        })}
      </div>
    </div>
  );
}
