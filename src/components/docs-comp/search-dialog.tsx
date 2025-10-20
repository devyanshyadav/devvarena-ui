"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ComponentInfo {
  id: string;
  name: string;
  displayName: string;
  category: string;
}

interface SearchDialogProps {
  components: ComponentInfo[];
}

export function SearchDialog({ components }: SearchDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const router = useRouter();

  // Filter components based on search
  const filteredComponents = React.useMemo(() => {
    if (!search.trim()) return components;

    const query = search.toLowerCase();
    return components.filter(
      (component) =>
        component.displayName.toLowerCase().includes(query) ||
        component.name.toLowerCase().includes(query) ||
        (component.category && component.category.toLowerCase().includes(query))
    );
  }, [components, search]);

  // Group filtered components by category
  const groupedResults = React.useMemo(() => {
    const groups: Record<string, ComponentInfo[]> = {};

    filteredComponents.forEach((component) => {
      if (!component.category) return;

      const category = component.category;

      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(component);
    });

    return groups;
  }, [filteredComponents]);

  const handleSelect = (componentId: string) => {
    router.push(`/docs/${componentId}`);
    setOpen(false);
    setSearch("");
  };

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex text-nowrap items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground bg-accent/50 rounded-2xl border hover:bg-accent transition-colors">
          <Search className="h-4 w-4" />
          <span>Search comp...</span>
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl rounded-3xl p-2">
        <DialogTitle className="sr-only">Search Components</DialogTitle>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute  left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 shadow-none !bg-transparent !outline-0 !border-none !ring-0 focus:ring-0 focus:ring-offset-0"
              autoFocus
            />
          </div>

          <div className="max-h-96 overflow-y-auto bg-gradient-to-br from-secondary to-transparent rounded-2xl p-4">
            {Object.keys(groupedResults).length === 0 && search ? (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No components found for &quot;{search}&quot;
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(groupedResults).map(
                  ([category, components]) => (
                    <div key={category}>
                      <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {category}
                      </h4>
                      <div className="space-y-1">
                        {components.map((component) => (
                          <button
                            key={component.id}
                            onClick={() => handleSelect(component.id)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left text-sm transition-colors hover:bg-gradient-to-r hover:from-secondary hover:to-transparent hover:text-secondary-foreground"
                            )}
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {component.displayName}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {component.id}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
