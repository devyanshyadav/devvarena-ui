import { notFound } from "next/navigation";
import { getComponentDoc, discoverComponents } from "@/lib/docs-runtime";
import { getComponentVersions } from "@/lib/file-reader";
import { ComponentPageClient } from "../../../components/docs-comp/component-page-client";

export default async function ComponentDocPage({
  params,
}: {
  params: Promise<{ componentId: string[] }>;
}) {
  const { componentId } = await params;
  const componentPath = componentId.join("/");
  const componentDoc = getComponentDoc(componentPath);
  const componentVersions = getComponentVersions(componentPath);

  if (!componentDoc) {
    notFound();
  }

  return (
    <ComponentPageClient
      componentDoc={componentDoc}
      componentVersions={componentVersions}
      componentPath={componentPath}
    />
  );
}

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const components = discoverComponents();
    const componentIds = components.map((component) => ({
      componentId: component.id.split("/"),
    }));

    console.log(
      "Generated static params for components:",
      componentIds.map((c) => c.componentId.join("/"))
    );
    return componentIds;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
