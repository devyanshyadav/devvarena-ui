"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

type ResponsiveNavProps = {
  navigation: {
    name: string;
    href: string;
    icon: React.ReactNode;
  }[];
};

const ResponsiveNav = ({ navigation }: ResponsiveNavProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[240px] h-[calc(100vh-1rem)] m-auto mr-3 rounded-2xl border sm:w-[300px]"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded bg-primary" />
            <span>DevUI</span>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col space-y-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

          <div className="border-t pt-3">
            <Link
              href="https://github.com/devyanshyadav/devvarena-ui"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <FaGithub className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResponsiveNav;
