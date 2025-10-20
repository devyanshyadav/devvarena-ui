import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CopyCli from "@/components/docs-comp/copy-cli";
import PackageManagerSelector from "@/components/docs-comp/package-manager-selector";
import { IoCheckmarkDone, IoCopyOutline } from "react-icons/io5";
import Link from "next/link";
import BaseButton from "@/devvarena-ui/button/base-button/v1/component";

const CodeBlock = ({
  children,
  title,
}: {
  children: string;
  title?: string;
}) => {
  return (
    <div className="relative">
      {title && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            {title}
          </span>
        </div>
      )}
      <div className="relative group">
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
};

const InstallationPage = () => {
  return (
    <div className="space-y-8 max-w-3xl *:bg-transparent *:shadow-none *:border-none">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold">Installation</h1>
            <p className="text-lg text-muted-foreground">
              Get started with Devvarena UI
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">React 19+</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
        </div>
      </div>

      {/* Step 1: Install shadcn/ui */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 text-sm flex items-center justify-center">
              1
            </span>
            Install shadcn/ui
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 relative pr-0">
          <CodeBlock>{`npx shadcn@latest init`}</CodeBlock>
          <CopyCli
            className="absolute top-2 right-2"
            afterCopy={<IoCheckmarkDone />}
            beforeCopy={<IoCopyOutline />}
            textClip="npx shadcn@latest init"
          />
        </CardContent>
      </Card>

      {/* Step 2: Install Dependencies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 text-sm flex items-center justify-center">
              2
            </span>
            Install Dependencies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PackageManagerSelector packages="lucide-react react-icons class-variance-authority" />
        </CardContent>
      </Card>

      {/* Step 3: Copy Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 text-sm flex items-center justify-center">
              3
            </span>
            Copy Components
          </CardTitle>
          <CardDescription>
            Browse and copy the components you need
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Component Structure</h4>
            <pre className="text-xs text-muted-foreground">
              {`src/components/devvarena-ui/
├── button/
├── input/
├── card/
└── alert/`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Ready */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>Ready to go!</CardTitle>
          <CardDescription>
            Start building with Devvarena UI components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BaseButton>
            <Link href="/docs/alert/base-alert">Browse 1st Component</Link>
          </BaseButton>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstallationPage;
