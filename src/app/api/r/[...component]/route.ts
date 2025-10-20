import { NextRequest, NextResponse } from "next/server";
import { getComponentVersions } from "@/lib/file-reader";
import { getComponentDoc } from "@/lib/docs-runtime";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ component: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const fullPath = resolvedParams.component;

    // Parse path: ['card', 'profile-card', 'default'] or ['card', 'profile-card']
    let componentPath: string;
    let versionId: string | undefined;

    if (fullPath.length >= 3) {
      // Has version specified: /card/profile-card/default
      componentPath = fullPath.slice(0, -1).join("/");
      versionId = fullPath[fullPath.length - 1];
    } else {
      // No version specified: /card/profile-card (use first version)
      componentPath = fullPath.join("/");
      versionId = undefined;
    }

    // Get component data
    const componentDoc = getComponentDoc(componentPath);
    const componentVersions = getComponentVersions(componentPath);

    if (!componentDoc || componentVersions.length === 0) {
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 }
      );
    }

    // Find the requested version or use first as default
    const targetVersion = versionId
      ? componentVersions.find((v) => v.versionId === versionId)
      : componentVersions[0];

    if (!targetVersion) {
      return NextResponse.json(
        { error: `Component version '${versionId}' not found` },
        { status: 404 }
      );
    }

    // Get all files except meta.ts
    const componentFiles = targetVersion.files.filter(
      (f) => f.name !== "meta.ts"
    );

    if (componentFiles.length === 0) {
      return NextResponse.json(
        { error: "No component files found" },
        { status: 404 }
      );
    }

    // Get component metadata for the specific version
    const versionMeta = componentDoc.metadata?.components?.find(
      (c) => c.id === targetVersion.versionId
    );
    const fallbackMeta = componentDoc.metadata?.components?.[0];

    // Format for shadcn CLI compatibility with flat structure
    const componentName = `${componentPath.split("/").pop()}-${targetVersion.versionId}`;
    const flatFolderName = componentName.replace("-", ""); // halobutton-v2 -> halobuttonv2

    const registryData = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: componentName,
      type: "registry:ui",
      title:
        versionMeta?.title ||
        fallbackMeta?.title ||
        componentDoc.metadata?.title ||
        componentPath,
      description:
        versionMeta?.description ||
        fallbackMeta?.description ||
        componentDoc.metadata?.description ||
        "",
      registryDependencies: [
        "button", // Add shadcn button dependency
      ],
      files: componentFiles.map((file) => ({
        path: `devvarena-ui/${flatFolderName}/${file.name}`,
        content: file.content,
        type: "registry:ui",
        target: `devvarena-ui/${flatFolderName}/${file.name}`,
      })),
    };

    return NextResponse.json(registryData, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Registry API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
