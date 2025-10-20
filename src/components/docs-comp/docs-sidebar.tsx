"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SearchDialog } from "./search-dialog";

interface ComponentInfo {
  id: string;
  name: string;
  displayName: string;
  category: string;
}

interface ComponentGroup {
  category: string;
  components: {
    id: string;
    name: string;
    displayName: string;
  }[];
}

interface DocsSidebarProps {
  components: ComponentInfo[];
}

export function DocsSidebar({ components }: DocsSidebarProps) {
  const pathname = usePathname();

  // Group components by category
  const groupedComponents = React.useMemo(() => {
    const groups: Record<string, ComponentGroup> = {};

    components.forEach((component) => {
      // Skip components without a category
      if (!component.category) return;

      const category = component.category;

      if (!groups[category]) {
        groups[category] = {
          category: category,
          components: [],
        };
      }

      groups[category].components.push({
        id: component.id,
        name: component.name,
        displayName: component.displayName,
      });
    });

    return Object.values(groups);
  }, [components]);

  // Get all categories to open by default
  const defaultOpenCategories = React.useMemo(() => {
    return groupedComponents.map((group) => group.category);
  }, [groupedComponents]);

  return (
    <div className="w-full space-y-3">
      {/* Search Dialog */}
      <div>
        <SearchDialog components={components} />
      </div>

      <div className="space-y-1">
        <Link
          href="/docs"
          className={cn(
            "block px-3 py-2 text-sm font-medium rounded-2xl transition-colors",
            pathname === "/docs"
              ? "bg-secondary text-secondary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          )}
        >
          Introduction
        </Link>

        <Link
          href="/docs/installation"
          className={cn(
            "block px-3 py-2 text-sm font-medium rounded-2xl transition-colors",
            pathname === "/docs/installation"
              ? "bg-secondary text-secondary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          )}
        >
          Installation
        </Link>
      </div>

      <Accordion
        type="multiple"
        defaultValue={defaultOpenCategories}
        className="w-full"
      >
        {groupedComponents.map((group) => (
          <AccordionItem
            key={group.category}
            value={group.category}
            className="!border-none"
          >
            <AccordionTrigger className="px-3 py-2 text-sm font-medium capitalize hover:no-underline hover:bg-secondary/50 rounded-2xl ">
              {group.category}
              <span className="ml-auto mr-2 text-xs text-muted-foreground">
                {group.components.length}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-2">
              <div className="ml-3 space-y-1 !border-l">
                {group.components.map((component) => {
                  const href = `/docs/${component.id}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={component.id}
                      href={href}
                      className={cn(
                        "block px-3 py-2 text-sm rounded-2xl transition-colors",
                        isActive
                          ? " text-secondary-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {component.displayName}
                    </Link>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
