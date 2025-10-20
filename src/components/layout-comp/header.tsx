import React from "react";
import Menu from "./menu";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu as MenuIcon } from "lucide-react";
import { DocsSidebar } from "../docs-comp/docs-sidebar";
import { ComponentInfo } from "@/lib/docs-runtime";
const Header = ({ components }: { components?: ComponentInfo[] }) => {
  return (
    <div className="flex items-center w-full justify-between">
      {/* Mobile drawer trigger */}
      <div className="flex items-center gap-2">
        {components && (
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="size-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Documentation</DrawerTitle>
                <DrawerDescription>
                  Browse components and examples
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 pb-4 max-h-[70vh] overflow-y-auto">
                <DocsSidebar components={components || []} />
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
        <Link href="/" className="flex items-end gap-0.5">
          <Image
            src="/logo.png"
            alt="logo"
            className="dark:invert-0 invert "
            width={40}
            height={40}
          />
          <span className="font-medium mb-0.5">/UI</span>
        </Link>
      </div>
      <Menu />
    </div>
  );
};

export default Header;
